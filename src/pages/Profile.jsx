import React, { useEffect, useRef, useState } from 'react';
import { getAuth, updateProfile } from 'firebase/auth';
import { useNavigate } from 'react-router';
import { collection, doc, getDocs, orderBy, query, updateDoc, where } from 'firebase/firestore';
import { db } from '../firebase';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import ListingItem from '../Components/ListingItem'

const Profile = () => {
const auth = getAuth();
const navigate = useNavigate();

const [listings,setListings] = useState([])
const [loading,setLoading] = useState(true)


const [formData, setFormData] = useState({
  name: auth.currentUser.displayName,
  email: auth.currentUser.email,
});

const [isEditing, setIsEditing] = useState(false);

// Destructure formData
const { name, email } = formData;

// Handle logout
function onLogout() {
  auth.signOut();
  navigate('/');
}

// Handle input changes
function onChange(e) {

  setFormData((prevData) => ({
    ...prevData,
    [e.target.id]: e.target.value,
  }));
  }

  async function onSubmit(){
   try {
      if(auth.currentUser.displayName !== name){

  //update Profile
      await updateProfile(auth.currentUser,{
      displayName:name,

  });


    //update the name in firestore
    const docRef = doc(db,"users", auth.currentUser.uid);

    //update the name at firestore

    await updateDoc(docRef,{name,})
  }

    toast.success("profile details updated succesfully")

  } catch (error) {
    toast.error("unable to update profile Details")
  }
  }

  // Handle "Edit" click
    function onEditClick() {
      isEditing && onSubmit()

      setIsEditing((prevState)=> !prevState)
	}
  
  // function to fetch users Specific Data on page Load
  useEffect(() => {
    async function fetchListings() {
      try {
        // Reference to the listings collection
        const listingRef = collection(db, "listings");
  
  
        // Query to fetch listings where the userRef matches the current user UID
        const q = query(
          listingRef,
          where("Info.userRef", "==", auth.currentUser.uid)  // Filtering for the current user's listings
        );
  
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
        setListings(fetchedListings)  
             
  
        
        setLoading(false);
      } catch (error) {
        console.error("Error fetching listings: ", error);
        setLoading(false);
      }
    }
  
    // Initial fetch
    let isMounted = true;
    fetchListings();
  
    // Cleanup function to prevent memory leaks
    return () => {
      isMounted = false;
    };
  }, [auth.currentUser]);
  
  
return (
    <>
      <section className="max-w-6xl mx-auto flex justify-center items-center flex-col">
        <h1 className="text-3xl text-center mt-6 font-bold text-white">My Profile</h1>

        <div className="w-full md:w-[50%] mt-6 px-3">
          <form>
            <input
              type="text"
              id="name"
              value={name}
              disabled={!isEditing}
              onChange={onChange}
              className={`w-full px-4 text-xl text-gray-700 bg-white border border-gray-300 rounded transition ease-in-out ${isEditing ? 'focus:bg-gray-200' : ''}`}
            />
            <input
              type="email"
              id="email"
              value={email}
              disabled
              className="w-full px-4 text-xl mt-6 text-gray-700 bg-white border border-gray-300 rounded transition ease-in-out"
            />

            <div className="flex justify-between mt-6 whitespace-nowrap text-sm sm:text-lg">
              <p className="flex items-center text-white">
                Do you want to change your Name?
                <span
                  onClick={onEditClick}
                  className="text-red-600 hover:text-red-700 transition ease-in-out duration-200 ml-1 cursor-pointer"
                >
                  {isEditing ? 'Save' : 'Edit'}
                </span>
              </p>
              <p
                onClick={onLogout}
                className="text-blue-600 hover:text-blue-800 transition duration-200 ease-in-out cursor-pointer"
              >
                Sign Out
              </p>
            </div>
          </form>

          <button
            className="text-white my-6 w-full bg-blue-600 uppercase px-7 py-3 text-sm font-medium rounded shadow-medium hover:bg-blue-800 transition duration-150 ease-in-out hover:shadow-lg active:bg-blue-800"
            type="submit"
          >
            <Link to="/create_listing">Sell or Rent A Home</Link>
          </button>
        </div>
      </section>

      <div className='max-w-6xl px-3 mt-6 mx-auto'>
        <h2 className='text-2xl text-center font-semibold'>My Listings</h2>

        <ul className='sm:grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl-grid-cols-5 mt-6 mb-6'>
        {listings.length > 0 ? (
          listings.map((listing) => {
            const {id, data }= listing;
            const firstImage = data.Info.Imgurls ? data.Info.Imgurls[0] : null;
            const description = data.Info.description || 'No description available';
            const type = data.Info.type;
            const timestamp = data.Info.timestamp
              ? new Date(data.Info.timestamp.seconds * 1000).toLocaleString()
              : 'No timestamp available'; // Convert timestamp to a readable string
            const address = data.Info.address;
            const name = data.Info.name
            const discounted = data.Info.discountedPrice
            const offer = data.Info.offer
            const regular = data.Info.regularPrice
           const  bathrooms = data.Info.bathrooms
           const bedrooms = data.Info.bedroom
            


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

                bathrooms = {bathrooms}
                bedrooms ={bedrooms}

              />
            );
          })
        ) : (
          <p>No listings available</p>
        )}
      </ul>
      </div>
    </>
  );
};


export default Profile;
