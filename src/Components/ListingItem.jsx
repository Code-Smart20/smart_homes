import React from 'react'

const ListingItem = ({ firstImage,description,timestamp, id }) => {
  

  return (
    <div key={id} className="listing-item">
      {firstImage ? (
        <img src={firstImage} alt="First Listing" className="listing-image" />
      ) : (
        <p>No image available</p>
      )}
      <p>{description}</p>
      <p>{timestamp}</p>
    </div>
  );
};


export default ListingItem