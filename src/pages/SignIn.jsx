import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import GAuth from '../Components/GAuth';
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';
import { signInWithEmailAndPassword, getAuth } from 'firebase/auth';
import { toast } from 'react-toastify';

const SignIn = () => {
  // State to hold email and password input data
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  // State to toggle password visibility
  const [showPassword, setShowPassword] = useState(false);

  // useNavigate hook to redirect users after sign-in
  const navigate = useNavigate();

  // Toggle password visibility
  function togglePass() {
    setShowPassword((prev) => !prev);
  }

  // Destructure email and password from formData
  const { email, password } = formData;

  // Update formData state on input change
  function onChange(e) {
    setFormData((prev) => ({
      ...prev,
      [e.target.id]: e.target.value,
    }));
  }

  // Handle user sign-in process
  async function handleSignIn(e) {
    e.preventDefault();

    try {
      const auth = getAuth();
      const userCredentials = await signInWithEmailAndPassword(auth, email, password);

      // If sign-in is successful, navigate to the home page
      if (userCredentials.user) {
        navigate('/');
      }
    } catch (error) {
      toast.error("Incorrect user data")
      navigate("/sign_up")
    }
  }

  return (
    <section>
      <h1 className='text-3xl text-center mt-6 font-bold text-white'>Sign In</h1>

      <div className='flex justify-center flex-wrap items-center px-6 py-12 max-w-6xl mx-auto'>
        <div className='md:w-[67%] lg:w-[50%] mb-12 md:mb-6'>
          <img 
            src="https://plus.unsplash.com/premium_photo-1663089688180-444ff0066e5d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTN8fGtleXxlbnwwfHwwfHx8MA%3D%3D" 
            alt="A premium key illustration for secure access" 
            className='w-full rounded-2xl'
          />
        </div>

        <div className='w-full md:w-[67%] lg:w-[40%] lg:ml-20'>
          <form onSubmit={handleSignIn}>
            <input 
              type="email" 
              id="email" 
              value={email} 
              onChange={onChange} 
              placeholder="Email Address" 
              className='mb-6 w-full px-4 py-2 text-xl text-blue-950 bg-white border-gray-300 rounded transition ease-in-out focus:bg-blue-950 focus:text-white'
            />

            <div className='relative mb-6'>
              <input 
                type={showPassword ? "text" : "password"} 
                id="password" 
                value={password} 
                onChange={onChange} 
                placeholder="Password" 
                className='w-full px-4 py-2 text-xl text-gray-700 bg-white border-gray-300 rounded transition ease-in-out focus:bg-blue-950 focus:text-white'
              />
              {showPassword 
                ? <AiFillEyeInvisible onClick={togglePass} className='absolute right-3 top-3 text-xl cursor-pointer' aria-label="Hide password" /> 
                : <AiFillEye onClick={togglePass} className='absolute right-3 top-3 text-xl cursor-pointer' aria-label="Show password" />}
            </div>

            <div className='flex justify-between whitespace-nowrap text-sm sm:text-lg'>
              <p className='mb-6 text-white'>Don't have an account?
                <Link to="/sign_up" className='text-red-600 hover:text-red-700 transition duration-200 ease-in-out ml-1'>Register</Link>
              </p>
              <p>
                <Link to="/forgot" className='text-blue-600 hover:text-blue-700 transition duration-200 ease-in-out'>Forgot password?</Link>
              </p>
            </div>

            {/* Sign-in button */}
            <button 
              type='submit' 
              className='w-full bg-blue-600 text-white px-7 py-3 text-sm font-medium uppercase rounded shadow-md hover:bg-blue-700 transition duration-200 ease-in-out hover:shadow-lg active:bg-blue-800 p-2'
            >
              Sign In
            </button>

            <div className='flex items-center my-4 before:border-t before:flex-1 before:border-gray-300 after:border-t after:flex-1 after:border-gray-300'>
              <p className='text-center font-semibold mx-4 text-white'>OR</p>
            </div>
          </form>

          {/* Google authentication button */}
          <GAuth />
        </div>
      </div>
    </section>
  );
};

export default SignIn;
