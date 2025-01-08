import { addDoc, collection, doc, serverTimestamp, setDoc } from "firebase/firestore";
import React, { useState } from "react";
import { toast } from "react-toastify";
import { db } from "../firebase";
import { useNavigate } from "react-router";
import { getAuth } from "firebase/auth";

const CreateListing = () => {
  // formdata Information
  const [formData, setFormData] = useState({
    type: "rent",
    name: "",
    bedrooms: 1,
    bathrooms: 1,
    parking: false,
    furnished: false,
    description: "",
    offer: false,
    regularPrice: 0,
    discountedPrice: 0,
    latitude: 0,
    longitude:0
  });

  // destructuring formData
  const {
    type,
    name,
    bedrooms,
    bathrooms,
    parking,
    furnished,
    description,
    offer,
    regularPrice,
    discountedPrice,
    latitude,
    longitude,
  } = formData;

  {/** 
   // Function to track form changes
   const onChange = () => {
    let boolean = null;
    if (e.target.value === "true"){
      boolean = true
    }

    if (e.target.value === "false"){
      boolean = false
    }
    
    if(!e.target.boolean){
      setFormData((prev)=>({
        ...prev,
        [e.target.id]: e.target.value
      })
    )}
  };
  */
 //loading State
 const [loading,setLoading] =useState(false)
 const navigate = useNavigate();

 const user = getAuth();
 

  // Function to handle form input changes
  const onChange = (e) => {
    let value = e.target.value;

    // Convert to boolean if necessary
    if (value === "true") value = true;
    if (value === "false") value = false;

    // Update formData state
    setFormData((prevState) => ({
      ...prevState,
      [e.target.id]: value, // Update the corresponding property
    }));
  };

  //submiting data to the backend
   async function onSubmit(e){
      e.preventDefault()

      setLoading(true);
     
      if(+discountedPrice >= +regularPrice){
          toast.error("Discounted price needs to be less than Regular price");
          return
      }

      // getting the geolocation values in an object
      let geolocation = {
           lat: latitude,
           long: longitude
      }
      
      // making a copy of the formData
      const FormDataCopy ={
        ...formData,
        geolocation,
        timestamp: serverTimestamp(),
        
        userRef: auth.currentUser.uid
      }

      //remove some Data
      !FormDataCopy.offer && delete FormDataCopy.discountedPrice;
      delete FormDataCopy.latitude
      delete FormDataCopy.longitude

      const docRef = await addDoc(collection(db,'listings'),FormDataCopy)
      
      setLoading(false);

      toast.success("listing succesfully submitted")
      navigate(`/category/${FormDataCopy.type}/${docRef.id}`)

   }

  const onButtonClick = (e) => {
    const { id, value } = e.target;

    setFormData((prevState) => ({
      ...prevState,
      [id]: value === "true" ? true : value === "false" ? false : value,
    }));
  };

if (loading){
  <h4>Loading Your Data to the Database</h4>
}

  return (
    <main className="max-w-lg mx-auto px-6 bg-blue-900 rounded-lg mb-10">
      <h1 className="text-3xl text-center text-white mt-6 font-bold py-6">
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
            onClick={onButtonClick}
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
            onClick={onButtonClick}
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
            onClick={onButtonClick}
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
            onClick={onButtonClick}
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
            onClick={onButtonClick}
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
            onClick={onButtonClick}
            className={`ml-3 px-7 py-3 font-medium text-sm uppercase shadow-md rounded ${
              !furnished ? "bg-blue-600 text-white" : "bg-white text-black"
            }`}
          >
            No
          </button>
        </div>
  
        {/* Description */}
        <p className="text-lg text-white font-semibold">Description</p>
        <textarea
          id="description"
          value={description}
          onChange={onChange}
          placeholder="Description"
          required
          className="w-full px-4 py-2 text-lg text-gray-700 bg-white border rounded mb-6"
        />
        {/**
         {/* Address *
         <p className="text-lg text-white font-semibold">Description</p>
        <textarea
          id="address"
      
          onChange={onChange}
          placeholder="Description"
          required
          className="w-full px-4 py-2 text-lg text-gray-700 bg-white border rounded mb-6"
        />
        **/}
         
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
        <p className="text-lg text-white font-semibold">Offer</p>
        <div className="flex">
          <button
            type="button"
            id="offer"
            value="true"
            onClick={onButtonClick}
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
            onClick={onButtonClick}
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

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full px-7 py-3 mt-6 bg-blue-600 text-white font-medium text-lg uppercase rounded shadow-md hover:bg-blue-700 transition duration-150"
        >
          Create Listing
        </button>
      </form>
    </main>
  );
}};

export default CreateListing;
