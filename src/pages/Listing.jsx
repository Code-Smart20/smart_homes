import React, { useEffect, useState } from "react";
import { db } from "../firebase";
import { useParams } from "react-router";
import { doc, getDoc } from "firebase/firestore";
import Spinner from "../Components/Spinner";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Navigation, Pagination } from "swiper";


const Listing = () => {
  const [listing, setListing] = useState(null);
  const [loading, setLoading] = useState(true);

  const { ListingId } = useParams();
  console.log(ListingId);

  useEffect(() => {
    async function fetchlisting() {
      setLoading(true);
      const docRef = doc(db, "listings", ListingId);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        setListing(docSnap.data());
        setLoading(false);
      }
    }
    fetchlisting();
  }, [ListingId]);

  if (loading) {
    return <Spinner />;
  }

  
  const images = listing?.ImgUrls || [
    "https://pmt.ng/_next/image?url=%2F_next%2Fstatic%2Fimages%2Fbike_man-91e5ced0e378071a4ebbabf0d9f4b8c0.png&w=1920&q=75", 
    "https://pmt.ng/_next/image?url=%2F_next%2Fstatic%2Fimages%2Fbus3-e235cad1c22bcf13364799b949c3df42.png&w=1920&q=75", 
    "https://pmt.ng/_next/image?url=%2F_next%2Fstatic%2Fimages%2Fecommerce-8741c9be576f20e31a6c74db3a870cac.png&w=1920&q=75"
  ];

  return (
    <main>
      <Swiper 
        spaceBetween={50}
        slidesPerView={3}
        navigation 
        pagination={{ clickable: true }}
        modules={[Navigation, Pagination]}
        onSlideChange={() => console.log("slide change")}
        onSwiper={(swiper) => console.log(swiper)}
      >
        {images.map((url, index) => (
          <SwiperSlide key={index}>
            <div
              className="w-full overflow-hidden h-[300px]"
              style={{
                background: `url(${url}) center no-repeat`,
                backgroundSize: "cover",
              }}
            />
          </SwiperSlide>
        ))}
      </Swiper>

      <div className="flex flex-col m-4 md:flex-row max-w-6xl lg:mx-auto
       p-4 rounded-lg border-3 shadow-lg bg-white lg:space-x-5">
        <div className="bg-pink-300 w-full h-[200px] lg-[400px]">

        </div>
        <div className="bg-blue-300 w-full h-[200px] lg-[400px]">

        </div>
      </div>
    </main>
  );
};

export default Listing;
