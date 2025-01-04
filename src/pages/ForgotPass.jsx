import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import GAuth from '../Components/GAuth';
import { getAuth, sendPasswordResetEmail } from 'firebase/auth';

const ForgotPass = () => {
  const [email, setEmail] = useState("");

  // Function To Track The Changes in the FormData
  function handleChange(e) {
    setEmail(e.target.value);
  }

  async function handleForgotPass(e) {
    e.preventDefault();

    try {
      const auth = getAuth();
      await sendPasswordResetEmail(auth, email);
      
    } catch (error) {
      console.log("error changing password",error.message);
      alert("check if user has signed in previously")
    }
  }

  return (
    <section>
      <h1 className="text-3xl text-center mt-6 font-bold text-white">Forgot Password</h1>

      <div className="flex justify-center flex-wrap items-center px-6 py-12 max-w-6xl mx-auto">
        <div className="md:w-[67%] lg:w-[50%] mb-12 md:mb-6">
          <img
            src="https://plus.unsplash.com/premium_photo-1663089688180-444ff0066e5d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTN8fGtleXxlbnwwfHwwfHx8MA%3D%3D"
            alt="key"
            className="w-full rounded-2xl"
          />
        </div>

        <div className="w-full md:w-[67%] lg:w-[40%] lg:ml-20">
          <form onSubmit={handleForgotPass}>
            <input
              type="email"
              id="email"
              value={email}
              onChange={handleChange}
              placeholder="Email Address"
              className="mb-6 w-full px-4 py-2 text-xl text-blue-950 bg-white border-gray-300 rounded transition ease-in-out focus:bg-blue-950 focus:text-white"
            />

            <div className="flex justify-between whitespace-nowrap text-sm sm:text-lg">
              <p className="mb-6 text-white">
                Don't have an account?
                <Link
                  to="/sign_up"
                  className="text-red-600 hover:red-700 transition duration-200 ease-in-out ml-1"
                >
                  Register
                </Link>
              </p>
              <p>
                <Link
                  to="/sign_in"
                  className="text-blue-600 hover:text-blue-700 transition duration-200 ease-in-out"
                >
                  Sign In
                </Link>
              </p>
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 text-white px-7 py-3 text-sm font-medium uppercase rounded shadow-md hover:bg-blue-700 transition duration-200 ease-in-out hover:shadow-lg active:bg-blue-800"
            >
              Send Reset Password
            </button>

            <div className="flex items-center my-4 before:border-t before:flex-1 before:border-gray-300 after:border-t after:flex-1 after:border-gray-300">
              <p className="text-center font-semibold mx-4 text-white">OR</p>
            </div>
          </form>

          <GAuth />
        </div>
      </div>
    </section>
  );
};

export default ForgotPass;
