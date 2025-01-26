import React, { useEffect, useState } from 'react';
import Sliders from '../Components/Sliders';
import FAQ from '../Components/FAQ';
import ListingItem from '../Components/ListingItem';
import { collection, getDocs, query } from 'firebase/firestore';
import { db } from '../firebase';
import { getAuth } from 'firebase/auth';
import Spinner from '../Components/Spinner';

const Home = () => {
  const [offerListings, setOffersListings] = useState(null);
  const [loading, setLoading] = useState(true); // Set loading to true initially
  const auth = getAuth();

  useEffect(() => {
    async function fetchListings() {
      try {
        // Reference to the listings collection
        const listingRef = collection(db, "listings");

        // Query to fetch listings
        const q = query(listingRef);

        console.log("Query: ", q);

        // Execute the query
        const querySnap = await getDocs(q);

        // Debugging: Check the query snapshot size
        console.log("Query Snapshot Size:", querySnap.size);

        let fetchedListings = [];
        querySnap.forEach((doc) => {
          fetchedListings.push({
            id: doc.id,
            data: doc.data(),
          });
        });

        // Set the fetched listings to the state
        setOffersListings(fetchedListings);
        console.log(fetchedListings); // Log the fetched listings

      } catch (error) {
        console.error("Error fetching listings: ", error);
      } finally {
        setLoading(false); // Set loading to false after fetch
      }
    }

    // Initial fetch
    fetchListings();

  }, []); // Empty dependency array to fetch once when the component mounts

  const images = [
    "https://i0.wp.com/urbanshelternigeria.com/wp-content/uploads/2016/03/BRICK-CITY-VALLEY-3-BEDROOM-SEMI-DETACHED-scaled-1.jpg?resize=1170%2C785&ssl=1",
    "https://i0.wp.com/urbanshelternigeria.com/wp-content/uploads/2016/03/4Bedroom-Town-House-at-The-Hills-Resideces-Located-at-The-Guzape-District-Abuja-scaled-1.jpg?resize=1170%2C785&ssl=1",
    "https://i0.wp.com/urbanshelternigeria.com/wp-content/uploads/2016/02/4-bed-close-up-768x432-1.png?resize=768%2C432&ssl=1",
    "https://i0.wp.com/urbanshelternigeria.com/wp-content/uploads/2016/03/4Bedroom-Town-House-at-The-Hills-Resideces-Located-at-The-Guzape-District-Abuja-scaled-1.jpg?resize=1170%2C785&ssl=1",
  ];

  return (
    <div>
      <Sliders images={images} />

      <h2 className="text-3xl text-center mt-10 font-bold text-white">Recent Listings</h2>
      <ul className="sm:grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 mb-6 max-w-6xl px-3 mt-6 mx-auto">
  {offerListings?.map((listing) => {
    const { id, data } = listing;
    const firstImage = data.Info.Imgurls ? data.Info.Imgurls[0] : null;
    const description = data.Info.description || "No description available";
    const type = data.Info.type;
    const timestamp = data.Info.timestamp
      ? new Date(data.Info.timestamp.seconds * 1000).toLocaleString()
      : "No timestamp available"; // Convert timestamp to a readable string
    const address = data.Info.location;
    const name = data.Info.name;
    const discounted = data.Info.discountedPrice;
    const offer = data.Info.offer;
    const regular = data.Info.regularPrice;
    const bathrooms = data.Info.bathrooms;
    const bedrooms = data.Info.bedroom;
    const email = data.Info.email;

    return (
      <ListingItem
        key={id}
        firstImage={firstImage}
        address={address}
        description={description}
        timestamp={timestamp}
        type={type}
        id={id}
        name={name}
        discounted={discounted}
        regular={regular}
        offer={offer}
        email={email}
        bathrooms={bathrooms}
        bedrooms={bedrooms}
      />
    );
  })}
</ul>      
      <FAQ />
    </div>
  );
};

export default Home;
