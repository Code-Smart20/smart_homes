import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import GAuth from '../Components/GAuth';
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';
import { getAuth, createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { db } from '../firebase';
import { doc, serverTimestamp, setDoc } from 'firebase/firestore';
import { toast } from 'react-toastify';


const Signup = () => {
  
  // capturing inputs from formData
  const [formData, setFormData] = useState({
    name: "",
    email: '',
    password: '',
  });

  //initializing useNavigate hook
  const navigate = useNavigate();

  // state to track password visibility
  const [showPassword, setShowPassword] = useState(false);

  // function to change password visibility
  function TogglePass() {
    setShowPassword((prev) => !prev);
  }

  // destructuring of state from object
  const { name, email, password } = formData;
 
  // function to track input changes
  function onChange(e) {
    setFormData((prev) => ({
      ...prev,
      [e.target.id]: e.target.value,
    }));
  }

  // function to handle SignUp
  async function FormSubmit(e) {
    e.preventDefault();

    try {
      const auth = getAuth();

      // signUp User With Email and Password
      const userCredentials = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredentials.user;

      // Upadate AuThenticated users Name
      await updateProfile(auth.currentUser, {
        displayName: name,
      });


      // Removing some sensitve Datas before Storage
      const NewformData = { ...formData };
      delete NewformData.password;
      NewformData.time = serverTimestamp();

      //setting a Database
      await setDoc(doc(db, 'users', user.uid), NewformData);
      
      // After successfully Adding to Database Navigate to Homepage
      navigate('/');
    } catch (error) {
      toast.error("Something Went Wrong with the Registration Process");
    }
  }

  return (
    <section>
      <h1 className='text-3xl text-center mt-6 font-bold text-white'>Sign Up</h1>
      <div className='flex justify-center flex-wrap items-center px-6 py-12 max-w-6xl mx-auto'>
        <div className='md:w-[67%] lg:w-[50%] mb-12 md:mb-6'>
          <img
            src='https://plus.unsplash.com/premium_photo-1663089688180-444ff0066e5d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTN8fGtleXxlbnwwfHwwfHx8MA%3D%3D'
            alt='key'
            className='w-full rounded-2xl'
          />
        </div>
        <div className='w-full md:w-[67%] lg:w-[40%] lg:ml-20'>
          <form onSubmit={FormSubmit}>
            <input
              type='text'
              id='name'
              value={name}
              onChange={onChange}
              placeholder='Full Name'
              className='mb-6 w-full px-4 py-2 text-xl text-blue-950 bg-white border-gray-300 rounded transition ease-in-out focus:bg-blue-950 focus:text-white'
            />
            <input
              type='email'
              id='email'
              value={email}
              onChange={onChange}
              placeholder='Email Address'
              className='mb-6 w-full px-4 py-2 text-xl text-blue-950 bg-white border-gray-300 rounded transition ease-in-out focus:bg-blue-950 focus:text-white'
            />
            <div className='relative mb-6'>
              <input
                type={showPassword ? 'text' : 'password'}
                id='password'
                value={password}
                onChange={onChange}
                placeholder='Password'
                className='w-full px-4 py-2 text-xl text-gray-700 bg-white border-gray-300 rounded transition ease-in-out focus:bg-blue-950 focus:text-white'
              />
              {showPassword ? (
                <AiFillEyeInvisible
                  onClick={TogglePass}
                  className='absolute right-3 top-3 text-xl cursor-pointer'
                />
              ) : (
                <AiFillEye
                  onClick={TogglePass}
                  className='absolute right-3 top-3 text-xl cursor-pointer'
                />
              )}
            </div>
            <div className='flex justify-between whitespace-nowrap text-sm sm:text-lg'>
              <p className='mb-6 text-white'>
                Have an account?
                <Link
                  to='/sign_in'
                  className='text-red-600 hover:red-700 transition duration-200 ease-in-out ml-1'
                >
                  Sign In
                </Link>
              </p>
              <p>
                <Link
                  to='/forgot'
                  className='text-blue-600 hover:text-blue-700 transition duration-200 ease-in-out'
                >
                  Forgot password?
                </Link>
              </p>
            </div>
            <button
              type='submit'
              className='w-full bg-blue-600 text-white px-7 py-3 text-sm font-medium uppercase rounded shadow-md hover:bg-blue-700 transition duration-200 ease-in-out hover:shadow-lg active:bg-blue-800'
            >
              Sign Up
            </button>
            <div className='flex items-center my-4 before:border-t before:flex-1 before:border-gray-300 after:border-t after:flex-1 after:border-gray-300'>
              <p className='text-center font-semibold mx-4 text-white'>OR</p>
            </div>
          </form>
          <GAuth />
        </div>
      </div>
    </section>
  );
};

export default Signup;