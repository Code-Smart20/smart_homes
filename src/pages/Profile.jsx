import React, { useEffect,useState } from 'react';
import { getAuth, updateProfile } from 'firebase/auth';
import { useNavigate } from 'react-router';
import { collection, deleteDoc, doc, getDocs, orderBy, query, updateDoc, where } from 'firebase/firestore';
import { db } from '../firebase';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import ListingItem from '../Components/ListingItem'
import Spinner from '../Components/Spinner';


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
          where("userRef", "==", auth.currentUser.uid), orderBy("timestamp", "desc")  // Filtering for the current user's listings
        );
  
        // Execute the query
        const querySnap = await getDocs(q);
  
        let fetchedListings = [];
        querySnap.forEach((doc) => {
          fetchedListings.push({
            id: doc.id,
            data: doc.data(),
          });
        });

        // Set the fetched listings to the state
        setListings(fetchedListings);        
        setLoading(false);
      } catch (error) {
        console.error("Error fetching listings: ", error);
        setLoading(false);
      }
    }

    fetchListings();
  }, [auth.currentUser]);

  async function onDelete(listingId){
    if (window.confirm("Are sure you want to Delete this Listing?")){

      //deleting a particular listing
      await deleteDoc(doc(db, "listings",listingId));

      //updating the Listing Array
      const updatedlistings = listings.filter((listing)=>{
         return  listing.id !== listingId
      });
      setListings(updatedlistings)
      console.log(listingId)
      toast.success("succesfully deleted the listing");
    }

  }

  function onEdit(listingId){
    
    navigate(`/edit_listing/${listingId}`)

  }
  
  if(loading){
    return <Spinner/>
  }

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

        <ul className='sm:grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 mt-6 mb-6'>
            {listings && (
              listings.map((listing) => {
                const { id, data } = listing;
              
                return (
                  <ListingItem
                    key={id}
                    data={data}
                    id={id}
                    onDelete={() => onDelete(id)}
                    onEdit={() => onEdit(id)}
                  />
                );
              })
            )}
        </ul>

      </div>
    </>
  );
};

export default Profile;
