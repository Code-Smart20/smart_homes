import React, { useState } from "react";
import { MdLocationOn } from "react-icons/md";
import { Link } from "react-router-dom";
import moment from "moment";
import { FaTrash } from "react-icons/fa";
import { MdEdit } from "react-icons/md";

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
  email,
}) => {
  const [contactlandlord, setContactlandlord] = useState(true);

  // Toggle the contact landlord state
  const handleContactClick = () => {
    setContactlandlord((prev) => !prev);
  };
  
  function HandleEmail(email){
    const mailtoLink = `mailto:${email}`;
    // Open the email client
    window.location.href = mailtoLink;
  }

  return (
    <li
      className="bg-white text-blue-950 m-2 flex flex-col relative justify-between items-center shadow-md hover:shadow-xl rounded-md overflow-hidden transition-shadow duration-150"
      key={id}
    >
      <Link className="contents" to={`/category/${type}/${id}`}>
        {firstImage && (
          <img
            className="h-[200px] w-full object-cover hover:scale-105 transition-transform duration-200 ease-in"
            src={firstImage}
            alt="First Listing"
            loading="lazy"
          />
        )}

        {/* Format timestamp using Moment */}
        <p className="absolute top-2 left-2 text-white bg-blue-950 uppercase text-xs font-semibold rounded-md px-2 py-1 shadow-lg">
          {moment(timestamp).fromNow()}
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

        {/* Email Button */}
        {contactlandlord && !onEdit && !onDelete && (
              <a onClick={()=>HandleEmail(email)}
                className="bg-blue-900 mb-10 text-white px-4 py-2 rounded-md cursor-pointer hover:bg-blue-600 transition duration-200"
              >
                Contact Landlord
              </a>
            )
          }

      {/* Delete Icon */}
      {onDelete && (
        <FaTrash
          onClick={() => onDelete(id)}
          className="absolute bottom-2 right-2 h-[14px] cursor-pointer text-red-500"
        />
      )}

      {/* Edit Icon */}
      {onEdit && (
        <MdEdit
          onClick={() => onEdit(id)}
          className="absolute bottom-2 right-7 h-4 cursor-pointer"
        />
      )}
    </li>
  );
};

export default ListingItem;

