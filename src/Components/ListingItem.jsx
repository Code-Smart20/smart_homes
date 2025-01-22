import React from 'react'
import { MdLocationOn } from 'react-icons/md';

import { Link } from 'react-router-dom';

const ListingItem = ({ firstImage,description,timestamp, type,id }) => {
  
  return (
    <li key={id} className="listing-item">
      <Link to={`/category/${type}/${id}`}>
      {firstImage ? (
        <img src={firstImage} alt="First Listing" className="listing-image" />

      ) : (
        <p>No image available</p>
      )}
      
      <div>
        <div>
          <MdLocationOn/>
          <p>{}</p>
        </div>
              <p>{}</p>
      </div>
      <p>{description}</p>
      <p>{timestamp}</p>
      </Link>
     
    </li>
  );
};

export default ListingItem;