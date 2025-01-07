import React, { useState } from 'react';
import { getAuth} from 'firebase/auth';
import { useNavigate } from 'react-router';

const Profile = () => {
  const auth = getAuth();
  const navigate = useNavigate()
  console.log(auth.currentUser)
  

  const [formData, setFormData] = useState({
    name: auth.currentUser.displayName,
    email: auth.currentUser.email
  });

  // Destructure formData
  const { name, email } = formData;

  // Handle logout
  function onLogout() {
    auth.signOut();
    navigate('/');
  }
         
  return (
    <section className="max-w-6xl mx-auto flex justify-center items-center flex-col">
      <h1 className="text-3xl text-center mt-6 font-bold text-white">My Profile</h1>

      <div className="w-full md:w-[50%] mt-6 px-3">
        <form>
          <input
            type="text"
            id="name"
            value={name}
            disabled
            className="w-full px-4 text-xl text-gray-700 bg-white border border-gray-300 rounded transition ease-in-out"
          />

          <input
            type="email"
            id="email"
            value={email}
            disabled
            className="w-full px-4 text-xl mt-6 text-gray-700 bg-white border border-gray-300 rounded transition ease-in-out"
          />

          <div className="flex justify-between mt-6 whitespace-nowrap text-sm sm:text-lg">
            <p className="flex items-center text-white">
              Do you want to change your Name?
              <span className="text-red-600 hover:text-red-700 transition ease-in-out duration-200 ml-1 cursor-pointer">
  Edit
              </span>

            </p>
            <p
              onClick={onLogout}
              className="text-blue-600 hover:text-blue-800 transition duration-200 ease-in-out cursor-pointer"
            >
              Sign Out
            </p>
          </div>
        </form>
      </div>
    
    </section>
  );
};

export default Profile;
