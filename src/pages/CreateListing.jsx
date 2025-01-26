import { addDoc, collection, doc, serverTimestamp, setDoc } from "firebase/firestore";
import React, { useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router";
import axios from "axios";
import { db } from "../firebase";
import Spinner from "../Components/Spinner";
import { getAuth } from "firebase/auth";


const CreateListing = () => {

  // formdata Information
  const [formData, setFormData] = useState({
    type: "rent",
    name: "",
    email:"",
    bedrooms: 1,
    bathrooms: 1,
    parking: false,
    furnished: false,
    description: "",
    offer: false,
    regularPrice: 0,
    location:"",
    discountedPrice: 0,
    images:[],
    latitude: 0,
    longitude:0
  });

  // destructuring formData
  const {
    type,
    name,
    email,
    bedrooms,
    bathrooms,
    parking,
    furnished,
    description,
    offer,
    location,
    regularPrice,
    discountedPrice,
    images,
    latitude,
    longitude,
  } = formData;

  const auth = getAuth();

 //loading State
 const [loading,setLoading] = useState(false)

 // initializing use Navigate
 const navigate = useNavigate();

  // Function to handle form input changes
  const onChange = (e) => {
    let boolean = null;

    if (e.target.value === "true"){
        boolean = true
    }

    if(e.target.value === "false"){
      boolean = false
    }

    if(e.target.files){
      setFormData((prev)=>({
        ...prev,
        images: e.target.files
      }))
    }

    if(!e.target.files){
      setFormData((prev)=>({
        ...prev,
        [e.target.id]: boolean ?? e.target.value,
      }))
    }
  };

  // Submit Function
  async function onSubmit(e) {
    e.preventDefault();
    setLoading(true);
  
    const geolocation = { 
      latitude,
      longitude
    };
  
    // Checking discounted price
    if (+discountedPrice >= +regularPrice) {
      setLoading(false);
      toast.error("Discounted price should be less than regular price");
      return;
    }
  
    // Checking for Images Length
    if (images.length > 6) {
      setLoading(false);
      toast.error("Maximum Six Images Allowed");
      return;
    }
  
    // Store Image to Cloudinary Function
    async function StoreImg(file) {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", "smart_homes_preset");
      formData.append("cloud_name", "dxddiv8ls");
  
      try {
        const response = await axios.post(
          "https://api.cloudinary.com/v1_1/dxddiv8ls/image/upload",
          formData
        );
        const secureUrl = response.data.secure_url;
        return secureUrl;
      } catch (error) {
        toast.error("Error uploading image:", error);
        return null;
      }
    }
  
    // Function to upload Images to a Storage Service provider
    async function Imgurls() {
      const uploadedUrls = await Promise.all(
        [...images].map(image => StoreImg(image))
      );
      
      // url Filters
      return uploadedUrls.filter(url => url !== null);
    }
  
    // Save to the Database
    {/** 
    const saveDetail = async (Info, docId) => {
      const docRef = doc(db, "listings", docId); // Use the user ID as the document ID
      await setDoc(docRef, {
        Info
      });
    };**/}

    // Save to the Database
const saveDetail = async (Info) => {
  try {
    const docRef = await addDoc(collection(db, "listings"), {
      Info
    });
    console.log("Document written with ID: ", docRef.id);
  } catch (e) {
    console.error("Error adding document: ", e);
  }
};


  
    // Calling the Imgurls function
    const uploadedImageUrls = await Imgurls();
  
    // Creating new formData with the necessary fields
    const newFormData = {
      ...formData,
      Imgurls: uploadedImageUrls,
      geolocation,
      timestamp: serverTimestamp(),
      userRef: auth.currentUser.uid
    };
  
    // Removing unused Data from newFormData
    delete newFormData.images;
    if (!newFormData.offer) delete newFormData.discountedPrice;
    delete newFormData.latitude;
    delete newFormData.longitude;
  
    // Save new formData in the database with the user ID as the document ID
    await saveDetail(newFormData);
  
    toast.success("Listing created successfully");
  
    // Navigating to the specific category
    navigate("/profile");
  
    setLoading(false);
  }
  
if (loading){
  return <Spinner/>
  }

  return (
    <main className="max-w-lg mx-auto px-6 bg-blue-900 rounded-lg mb-10">
      <h1 className="text-3xl text-center text-white mt-6 font-bold py-3">
        Create a Listing
      </h1>

      <form className="py-6" onSubmit={onSubmit}>
        {/* Type: Rent or Sell */}
        <p className="text-lg text-white mt-6 font-semibold">Sell / Rent</p>
        <div className="flex">
          <button
            type="button"
            id="type"
            value="sale"
            onClick={onChange}
            className={`mr-3 px-7 py-3 font-medium text-sm uppercase shadow-md rounded ${
              type === "sale" ? "bg-blue-600 text-white" : "bg-white text-black"
            }`}
          >
            Sell
          </button>
          <button
            type="button"
            id="type"
            value="rent"
            onClick={onChange}
            className={`ml-3 px-7 py-3 font-medium text-sm uppercase shadow-md rounded ${
              type === "rent" ? "bg-blue-600 text-white" : "bg-white text-black"
            }`}
          >
            Rent
          </button>
        </div>

        {/* Name */}
        <p className="text-lg text-white mt-6 font-semibold">Name</p>
        <input
          type="text"
          id="name"
          value={name}
          onChange={onChange}
          placeholder="Name"
          maxLength="32"
          minLength="10"
          required
          className="w-full px-4 py-2 text-lg text-gray-700 bg-white border rounded mb-6"
        />

         {/* Email */}
         <p className="text-lg text-white mt-3 font-semibold">Email</p>
        <input
          type="text"
          id="email"
          value={email}
          onChange={onChange}
          placeholder="Contact Email"
          required
          className="w-full px-4 py-2 text-lg text-gray-700 bg-white border rounded mb-3"
        />
         
         
         {/**Address field */}
        <p className="text-lg text-white mt-3 font-semibold">Address</p>
        <input
          type="text"
          id="location"
          value={location}
          onChange={onChange}
          placeholder="Address"
          maxLength="32"
          minLength="10"
          required
          className="w-full px-4 py-2 text-lg text-gray-700 bg-white border rounded mb-6"
        />

        {/* Bedrooms and Bathrooms */}
        <div className="flex space-x-6 mb-6">
          <div>
            <p className="text-lg text-white font-semibold">Beds</p>
            <input
              type="number"
              id="bedrooms"
              value={bedrooms}
              onChange={onChange}
              min="1"
              max="50"
              required
              className="w-full px-4 py-2 text-lg text-gray-700 bg-white border rounded text-center"
            />
          </div>
          <div>
            <p className="text-lg text-white font-semibold">Baths</p>
            <input
              type="number"
              id="bathrooms"
              value={bathrooms}
              onChange={onChange}
              min="1"
              max="50"
              required
              className="w-full px-4 py-2 text-lg text-gray-700 bg-white border rounded text-center"
            />
          </div>
        </div>

        {/* Parking */}
        <p className="text-lg text-white font-semibold">Parking spot</p>
        <div className="flex">
          <button
            type="button"
            id="parking"
            value="true"
            onClick={onChange}
            className={`mr-3 px-7 py-3 font-medium text-sm uppercase shadow-md rounded ${
              parking ? "bg-blue-600 text-white" : "bg-white text-black"
            }`}
          >
            Yes
          </button>
          <button
            type="button"
            id="parking"
            value="false"
            onClick={onChange}
            className={`ml-3 px-7 py-3 font-medium text-sm uppercase shadow-md rounded ${
              !parking ? "bg-blue-600 text-white" : "bg-white text-black"
            }`}
          >
            No
          </button>
        </div>

        {/* Furnished */}
        <p className="text-lg text-white mt-6 font-semibold">Furnished</p>
        <div className="flex">
          <button
            type="button"
            id="furnished"
            value="true"
            onClick={onChange}
            className={`mr-3 px-7 py-3 font-medium text-sm uppercase shadow-md rounded ${
              furnished ? "bg-blue-600 text-white" : "bg-white text-black"
            }`}
          >
            Yes
          </button>
          <button
            type="button"
            id="furnished"
            value="false"
            onClick={onChange}
            className={`ml-3 px-7 py-3 font-medium text-sm uppercase shadow-md rounded ${
              !furnished ? "bg-blue-600 text-white" : "bg-white text-black"
            }`}
          >
            No
          </button>
        </div>
  
        {/* Description */}
        <p className="text-lg text-white font-semibold mt-6">Description</p>
        <textarea
          id="description"
          value={description}
          onChange={onChange}
          placeholder="Description"
          required
          className="w-full px-4 py-2 text-lg text-gray-700 bg-white border rounded mb-6"
        />
         
         {/**latitude */}
        <div className="flex space-x-6 justify-start">
          <div>
            <p className="text-lg font-semibold ">latitude</p>
            <input className ="w-full px-4 py-2 text-xl text-gray-700 bg-white border border-gray-300 rounded transition duration-150 ease-in-out focus:bg:white
            focus:text-gray-700 focus:border-slate-600 text-center" type="number"  id="latitude" value={latitude} onChange={onChange} min="-90" max="90" required/>
          </div>

          <div>
            <p className="text-lg font-semibold ">longitude</p>
            <input className ="w-full px-4 py-2 text-xl text-gray-700 bg-white border border-gray-300 rounded transition duration-150 ease-in-out focus:bg:white
            focus:text-gray-700 focus:border-slate-600 text-center" type="number"  id="longitude" value={longitude} onChange={onChange} min="-180" max="180" required/>
          </div>
        </div>

        {/* Offer */}
        <p className="text-lg text-white font-semibold mt-6">Offer</p>
        <div className="flex">
          <button
            type="button"
            id="offer"
            value="true"
            onClick={onChange}
            className={`mr-3 px-7 py-3 font-medium text-sm uppercase shadow-md rounded ${
              offer ? "bg-blue-600 text-white" : "bg-white text-black"
            }`}
          >
            Yes
          </button>
          <button
            type="button"
            id="offer"
            value="false"
            onClick={onChange}
            className={`ml-3 px-7 py-3 font-medium text-sm uppercase shadow-md rounded ${
              !offer ? "bg-blue-600 text-white" : "bg-white text-black"
            }`}
          >
            No
          </button>
        </div>

        {/* Price */}
        <p className="text-lg text-white mt-6 font-semibold">Regular Price</p>
        <div className="flex items-center">
          <input
            type="number"
            id="regularPrice"
            value={regularPrice}
            onChange={onChange}
            min="50"
            max="400000000"
            required
            className="w-full px-4 py-2 text-lg text-gray-700 bg-white border rounded"
          />
          {type === "rent" && <span className="ml-2 text-white">$/Month</span>}
        </div>

        {offer && (
          <div>
            <p className="text-lg text-white mt-6 font-semibold">
              Discounted Price
            </p>
            <input
              type="number"
              id="discountedPrice"
              value={discountedPrice}
              onChange={onChange}
              min="50"
              max="400000000"
              required

              className="w-full px-4 py-2 text-lg text-gray-700 bg-white border rounded"
            />
          </div>
        )}
        
        <div className="mb-6 mt-6">
          <p className="text-lg font-semibold">Images</p>
          <p className="text-white">The first Image will be the cover and Max Image is 6</p>
          <input type="file" className="w-full px-3 py-2.5 text-red-700 bg-white border
           border-gray-300 rounded transition duration-150 ease-in-out focus:bg-white focus:border-slate-600" 
          id="images" onChange={onChange} 
          accept=".jpg,.png,.jpeg" multiple required/>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full px-7 py-3 mt-6 bg-blue-600 text-white font-medium
           text-lg uppercase rounded shadow-md hover:bg-blue-700 transition duration-150"
           
        >
          Create Listing
        </button>
      </form>
    </main>
  );
};

export default CreateListing;
