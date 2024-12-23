import React from 'react'
import { useLocation,useNavigate } from 'react-router-dom'


const Header = () => {

    // getting current Url of the page
    const location = useLocation();

    // use Navigate for navigating to different pages
    const navigate = useNavigate();

    // function to match Current path
    function PathMatch(Route) {
        return Route === location.pathname  
    }
    

  return (
   <div className='bg-blue-950 border-b-8 shadow-sm sticky top-0 z-40'>
             <header className='bg-blue-950 text-white h-20 font-bold flex 
                            justify-between items-center px-3 max-w-6xl mx-auto'>

            <div onClick={()=> navigate("/")}>
                <h3 className='cursor-pointer'>Sm<span className='text-red-800'>art</span> homes</h3>
            </div>
            <div>
                <ul className='flex space-x-10 justify-between items-center'>
                    <li onClick={()=> navigate("/")} className={`py-3 text-sm font-semibold
                       cursor-pointer text-gray-400 border-b-[3px] border-b-transparent ${PathMatch("/") && "text-white border-b-green-700"}`}>Home</li>
                    <li onClick={()=> navigate("/offers")}  className={`py-3 text-sm font-semibold
                       cursor-pointer text-gray-400 border-b-[3px] border-b-transparent ${PathMatch("/offers") && "text-white border-b-green-700"}`}>Offers</li>
                    <li onClick={()=> navigate("/sign_in")}  className={`py-3 text-sm font-semibold
                       cursor-pointer text-gray-400 border-b-[3px] border-b-transparent ${PathMatch("/sign_in") && "text-white border-b-green-700"}`}>Sign In</li>

                </ul>
            </div>

        </header>
   </div>
  )
}

export default Header