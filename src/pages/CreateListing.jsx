import React, { useState } from "react";

const CreateListing = () => {
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
  });

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
  } = formData;

   // Function to track form changes
   const onChange = () => {
    
  };

   const onButtonClick=()=>{
    
   }
  return (
    <main className="max-w-lg mx-auto px-6 bg-blue-900 rounded-lg mb-10">
      <h1 className="text-3xl text-center text-white mt-6 font-bold py-6">
        Create a Listing
      </h1>

      <form className="py-6">
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
};

export default CreateListing;


