import React from 'react';
import { FcGoogle } from 'react-icons/fc';
import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { getDoc, doc, serverTimestamp, setDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom'; 

function GAuth() {
  const navigate = useNavigate(); 

  async function onGoogleSign() {
    try {
      const auth = getAuth();
      const provider = new GoogleAuthProvider();

      // Sign in with Google
      const result = await signInWithPopup(auth, provider);

      const user = result.user;

      // Check for user in existing database
      const docRef = doc(db, "user", user.uid);

      // Check if the user already exists in the database
      const docSnap = await getDoc(docRef);

      // Add the new user to the database if not found
      if (!docSnap.exists()) {
        await setDoc(docRef, {
          name: user.displayName,
          email: user.email,
          timestamp: serverTimestamp(),
        });
      }

      // Navigate to the home page
      navigate("/");
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <button
      type="button"
      onClick={onGoogleSign} 
      className="flex items-center justify-center w-full text-white px-7 py-3 bg-red-700 uppercase text-sm font-medium hover:bg-red-800 active:bg-red-900 shadow-md hover:shadow-lg active:shadow-lg transition duration-150 ease-in-out rounded"
    >
      <FcGoogle className="text-2xl font-bold bg-white rounded-full mr-2" />
      Continue With Google
    </button>
  );
}

export default GAuth;
