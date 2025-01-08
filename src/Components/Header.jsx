import { getAuth, onAuthStateChanged } from 'firebase/auth';
import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const Header = () => {
  const [pageState, setpageState] = useState("Sign In");

  const location = useLocation();
  const navigate = useNavigate();

  // Check if user is authenticated
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(getAuth(), (user) => {
      setpageState(user ? "Profile" : "Sign In");
    });

    return () => unsubscribe();
  }, []);

  // Match current path
  function PathMatch(route) {
    return route === location.pathname.split('?')[0];
  }

  return (
    <div className="bg-blue-950 border-b-8 shadow-sm sticky top-0 z-40">
      <header className="bg-blue-950 text-white h-20 font-bold flex justify-between items-center px-3 max-w-6xl mx-auto">
        <div onClick={() => navigate("/")}>
          <h3 className="cursor-pointer">
            Sm<span className="text-red-800">art</span> homes
          </h3>
        </div>
        <div>
          <ul className="flex space-x-10 justify-between items-center">
            <li
              onClick={() => navigate("/")}
              className={`py-3 text-sm font-semibold cursor-pointer text-gray-400 border-b-[3px] border-b-transparent ${
                PathMatch("/") && "text-white border-b-green-300"
              }`}
            >
              Home
            </li>
            <li
              onClick={() => navigate("/offers")}
              className={`py-3 text-sm font-semibold cursor-pointer text-gray-400 border-b-[3px] border-b-transparent ${
                PathMatch("/offers") && "text-white border-b-green-300"
              }`}
            >
              Offers
            </li>
            <li
              onClick={() => navigate(pageState === "Profile" ? "/profile" : "/sign_in")}
              className={`py-3 text-sm font-semibold cursor-pointer text-gray-400 border-b-[3px] border-b-transparent ${
                PathMatch(pageState === "Profile" ? "/profile" : "/sign_in") &&
                "text-white border-b-green-300"
              }`}
            >
              {pageState}
            </li>
          </ul>
        </div>
      </header>
    </div>
  );
};

export default Header;
