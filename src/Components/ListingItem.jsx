import React from "react";
import { MdLocationOn } from "react-icons/md";
import { Link } from "react-router-dom";
import moment from "moment";
import { FaTrash } from "react-icons/fa";
import {MdEdit} from "react-icons/md"

const ListingItem = ({
  bathrooms,
  bedrooms,
  discounted,
  regular,
  offer,
  name,
  firstImage,
  description,
  timestamp,
  type,
  address,
  id,
  onDelete,
  onEdit,

}) => {
  return (
    <li
      className="bg-yellow-500 m-2 flex flex-col relative justify-between items-center shadow-md hover:shadow-xl rounded-md overflow-hidden transition-shadow duration-150"
      key={id}
    >
      <Link className="contents" to={`/category/${type}/${id}`}>
        {firstImage ? (
          <img
            className="h-[200px] w-full object-cover hover:scale-105 transition-transform duration-200 ease-in"
            src={firstImage}
            alt="First Listing"
            loading="lazy"
          />
        ) : (
          <p className="text-center text-gray-500">No image available</p>
        )}

        {/* Format timestamp using Moment */}
        <p className="absolute top-2 left-2 bg-green-700 uppercase text-xs font-semibold rounded-md px-2 py-1 shadow-lg">
          {moment (timestamp).fromNow()}
        </p>

        <div className="w-full p-4">
          {/* Address */}
          <div className="flex items-center space-x-2 mb-2">
            <MdLocationOn className="h-4 w-4 text-green-600" />
            <p className="font-semibold text-sm text-gray-600 truncate">
              {address}
            </p>
          </div>

          {/* Listing name */}
          <p className="font-semibold text-xl truncate">{name}</p>
          <p className="font-semibold text-xl truncate">{description}</p>

          {/* Price */}
          <p className="text-[#457b9d] mt-2 font-semibold">
            {offer ? discounted : regular}
            {type === "rent" && " / month"}
          </p>

          {/* Details */}
          <div className="flex items-center justify-between mt-3">
            <div className="flex items-center space-x-1">
              <p className="font-bold text-xs">
                {bedrooms > 1 ? `${bedrooms} Beds` : "1 Bed"}
              </p>

              <p className="font-bold text-xs">
                {bathrooms > 1 ? `${bathrooms} Baths` : "1 Bath"}
              </p>

            </div>
            
          </div>
        </div>
      </Link>
      {
        
          onDelete && (
            <FaTrash onClick ={()=> onDelete(id)}
            className ="absolute bottom-2 right-2 h-[14px] cursor-pointer text-red-500"/>
         
           ) 
      }
      
      {
        
          onEdit && (
            <MdEdit onClick ={()=> onEdit(id)}
            className ="absolute bottom-2 right-7 h-4 cursor-pointer "/>
         
           ) 
      }
    </li>
  );
};

export default ListingItem;
