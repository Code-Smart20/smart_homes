import React from 'react'
import Sliders from '../Components/Sliders'



const Home = () => {

  const images = 
  [  
    "https://i0.wp.com/urbanshelternigeria.com/wp-content/uploads/2016/03/BRICK-CITY-VALLEY-3-BEDROOM-SEMI-DETACHED-scaled-1.jpg?resize=1170%2C785&ssl=1",
    "https://i0.wp.com/urbanshelternigeria.com/wp-content/uploads/2016/03/4Bedroom-Town-House-at-The-Hills-Resideces-Located-at-The-Guzape-District-Abuja-scaled-1.jpg?resize=1170%2C785&ssl=1",
    "https://i0.wp.com/urbanshelternigeria.com/wp-content/uploads/2016/02/4-bed-close-up-768x432-1.png?resize=768%2C432&ssl=1",
    "https://i0.wp.com/urbanshelternigeria.com/wp-content/uploads/2016/03/4Bedroom-Town-House-at-The-Hills-Resideces-Located-at-The-Guzape-District-Abuja-scaled-1.jpg?resize=1170%2C785&ssl=1",
  ];
 

  return (
    <div>
      <Sliders images={images}/>
    </div>
    )
}

export default Home; 
