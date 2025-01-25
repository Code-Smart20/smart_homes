import React from "react";
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";

const Footer = () => {
  return (
    <footer
      className="bg-transparent text-white py-8 relative mt-10"
      style={{
        backgroundImage: `url("https://i0.wp.com/urbanshelternigeria.com/wp-content/uploads/2016/03/BRICK-CITY-VALLEY-3-BEDROOM-SEMI-DETACHED-scaled-1.jpg?resize=1170%2C785&ssl=1"
)`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-50"></div>

      {/* Footer Content */}
      <div className="relative container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* About Us Section */}
          <div>
            <h3 className="text-xl font-semibold mb-4">About Us</h3>
            <p className="text-white">
              We are a leading real estate platform, helping you find your dream home or property with ease.
            </p>
          </div>

          {/* Quick Links Section */}
          <div>
            <h3 className="text-xl font-semibold mb-4">Quick Links</h3>
            <ul className="text-white">
              <li className="mb-2">
                <a href="/" className="hover:text-blue-600 transition duration-200">
                  Home
                </a>
              </li>
              <li className="mb-2">
                <a href="/create_listing" className="hover:text-blue-400 transition duration-200">
                  CreateListings
                </a>
              </li>
              <li className="mb-2">
                <a href="/Offers" className="hover:text-blue-400 transition duration-200">
                  Offers
                </a>
              </li>
              <li className="mb-2">
                <a href="/profile" className="hover:text-blue-400 transition duration-200">
                  Profile
                </a>
              </li>
              <li className="mb-2">
                <a href="/contact" className="hover:text-blue-400 transition duration-200">
                  Contact Us
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Info Section */}
          <div>
            <h3 className="text-xl font-semibold mb-4">Contact Info</h3>
            <ul className="text-white">
              <li className="mb-2">123 Main Street, City, Country</li>
              <li className="mb-2">Email: info@realestate.com</li>
              <li className="mb-2">Phone: +1 (123) 456-7890</li>
            </ul>
          </div>

          {/* Social Media Section */}
          <div>
            <h3 className="text-xl font-semibold mb-4">Follow Us</h3>
            <div className="flex space-x-4">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white hover:text-blue-600 transition duration-200"
              >
                <FaFacebook size={24} />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white hover:text-blue-600 transition duration-200"
              >
                <FaTwitter size={24} />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white hover:text-blue-600 transition duration-200"
              >
                <FaInstagram size={24} />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white hover:text-blue-600 transition duration-200"
              >
                <FaLinkedin size={24} />
              </a>
            </div>
          </div>
        </div>

        {/* Copyright Section */}
        <div className="border-t border-white mt-8 pt-8 text-center text-white">
          <p>&copy; {new Date().getFullYear()} Real Estate. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
