import React, { useState, useEffect } from 'react';
import { getAuth, onAuthStateChanged, updateProfile } from 'firebase/auth';
import { useNavigate } from 'react-router';
import { doc, updateDoc } from 'firebase/firestore';
import { db } from '../firebase';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';

const Profile = () => {
const auth = getAuth();
const navigate = useNavigate();

const [formData, setFormData] = useState({
  name: '',
  email: '',
});

const [isEditing, setIsEditing] = useState(false);

// Destructure formData
const { name, email } = formData;

// Fetch user data when component mounts or auth state changes
useEffect(() => {
const unsubscribe = onAuthStateChanged(auth, (user) => {
if (user) {
setFormData({
name: user.displayName || '',
email: user.email || '',
});

} else {

navigate('/'); // Redirect if user is not authenticated

}

});

return () => unsubscribe(); // Cleanup on unmount

}, [auth, navigate]);


// Handle logout
function onLogout() {
  auth.signOut();
  navigate('/');
}


// Handle input changes

function onChange(e) {

  setFormData((prevData) => ({
    ...prevData,
    [e.target.id]: e.target.value,
  }));
  }

  async function onSubmit(){
   try {
      if(auth.currentUser.displayName !== name){

  //update Profile
      await updateProfile(auth.currentUser,{
      displayName:name,

  });


    //update the name in firestore
    const docRef = doc(db,"users", auth.currentUser.uid);

    //update the name at firestore

    await updateDoc(docRef,{name,})
  }

    toast.success("profile details updated succesfully")

  } catch (error) {
    toast.error("unable to update profile Details")
  }
  }

  // Handle "Edit" click
    function onEditClick() {
      isEditing && onSubmit()

      setIsEditing((prevState)=> !prevState)
	}

return (
  <section className="max-w-6xl mx-auto flex justify-center items-center flex-col">
    <h1 className="text-3xl text-center mt-6 font-bold text-white">My Profile</h1>

    <div className="w-full md:w-[50%] mt-6 px-3">
      <form>

      <input type="text" id="name" value={name} disabled={!isEditing} onChange={onChange} className={`w-full px-4 text-xl text-gray-700 bg-white border border-gray-300 rounded transition ease-in-out ${
           isEditing ? 'focus:bg-gray-200' : ''}`}
      />
      <input type="email" id="email" value={email} Disabled className="w-full px-4 text-xl mt-6 text-gray-700 bg-white border border-gray-300 rounded transition ease-in-out"

      />

      <div className="flex justify-between mt-6 whitespace-nowrap text-sm sm:text-lg">
          <p className="flex items-center text-white"> Do you want to change your Name?
            <span onClick={onEditClick} className="text-red-600 hover:text-red-700 transition ease-in-out duration-200 ml-1 cursor-pointer">
               {isEditing ? 'Save' : 'Edit'}
           </span>
         </p>
         <p onClick={onLogout} className="text-blue-600 hover:text-blue-800 transition duration-200 ease-in-out cursor-pointer" >
          Sign Out
        </p>

      </div>
     </form>
     <button className=" text-white my-6 w-full bg-blue-600 uppercase px-7 py-3 text-sm font-medium rounded shadow-medium hover:bg-blue-800 transition duration-150 ease-in-out hover:shadow-lg active:bg-blue-800" type="submit"
>
        <Link to="/create_listing">
            Sell or Rent A Home
        </Link>
     </button>
    </div>

  </section>

);

};

export default Profile;
