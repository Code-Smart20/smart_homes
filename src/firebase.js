// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore} from "firebase/firestore"

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB3A81tF75FiONF9IVmorflUpvISxl_d4A",
  authDomain: "smart-homes-7306f.firebaseapp.com",
  projectId: "smart-homes-7306f",
  storageBucket: "smart-homes-7306f.firebasestorage.app",
  messagingSenderId: "901662424697",
  appId: "1:901662424697:web:3fa001a6c0a0b4d8a05ea8"
};

// Initialize Firebase
initializeApp(firebaseConfig);
export const db = getFirestore();
