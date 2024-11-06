import React, { useState } from 'react';
import logo from '../images/Logo.png'; // Replace with your logo path
import { FaSearch } from 'react-icons/fa';
import SignIn from './SignIn'; // Import SignIn Component
import SignUp from './SignUp'; // Import SignUp Component

const Header = () => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isAuthOpen, setIsAuthOpen] = useState(false); // State to manage auth modal
  const [isSignUp, setIsSignUp] = useState(false); // State to manage sign up or sign in

  const handleSearchToggle = () => {
    setIsSearchOpen((prev) => !prev);
  };

  const handleAuthToggle = () => {
    setIsAuthOpen((prev) => !prev);
  };

  const toggleSignUp = () => {
    setIsSignUp((prev) => !prev);
  };

  const name = localStorage.getItem('fullName');
  const email = localStorage.getItem('email');

  const closeAuthModal = () => {
    setIsAuthOpen(false);
    setIsSignUp(false); // Reset to SignIn when closing the modal
  };

  return (
    <>
      <header className="bg-gradient-to-r from-teal-600 to-teal-700 text-white shadow-lg p-4 transition-all duration-300 ease-in-out border-b-4 border-teal-800">
        <div className="container mx-auto flex flex-col md:flex-row justify-between items-center relative">
          {/* Logo and Title */}
          <div className="flex items-center mb-4 md:mb-0">
            <img
              src={logo}
              alt="Madhav Financial Management Logo"
              className="h-16 w-16 rounded-full border-2 border-white shadow-md mr-2 transition-transform duration-200 hover:scale-110"
            />
            <h1 className="text-2xl font-extrabold text-white transition-transform duration-300 hover:scale-105">
              Madhav Financial Management
            </h1>
          </div>

          {/* Desktop Search Bar */}
          <div className="hidden md:flex flex-grow mx-40">
            <input
              type="text"
              placeholder="Search transactions..."
              className="w-80 p-2 rounded-l-md bg-gray-200 text-gray-800 border-2 border-blue-500 focus:outline-none focus:ring-2 focus:ring-teal-500 transition duration-200 shadow-md"
            />
            <button className="bg-blue-800 p-2 rounded-r-md hover:bg-teal-700 transition duration-200 flex items-center justify-center shadow-md">
              <FaSearch className="text-white" />
            </button>
          </div>

          {/* Create Account Button */}
          <div className="flex items-center">
            {name && email ? (
              <div className="flex items-center space-x-4">
                <span className="text-lg font-semibold">{name}</span>
                {/* <button
                  onClick={handleAuthToggle}
                  className="bg-teal-500 hover:bg-teal-600 text-white font-bold py-2 px-4 rounded"
                >
                  Logout
                </button> */}
              </div>
            ) : (
              <button
                onClick={handleAuthToggle}
                className="bg-teal-500 hover:bg-teal-600 text-white font-bold py-2 px-4 rounded"
              >
                Create Account
              </button>
            )}
          </div>

          {/* Search Bar Toggle Button for Mobile */}
          <div className="flex items-center md:hidden ml-4">
            <button
              className="bg-teal-800 p-4 rounded-md hover:bg-teal-700 transition duration-200 flex items-center justify-center shadow-md"
              onClick={handleSearchToggle}
              aria-label="Toggle search"
            >
              <FaSearch className="text-white" />
            </button>
          </div>
        </div>

        {/* Mobile Search Overlay */}
        {isSearchOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-70 flex flex-col items-center justify-between z-40 p-4">
            {/* Top Section with Logo and Title */}
            <div className="flex items-center mb-4 w-full justify-center">
              <img
                src={logo}
                alt="Madhav Financial Management Logo"
                className="h-16 w-16 rounded-full border-2 border-white shadow-md mr-2 transition-transform duration-200 hover:scale-110"
              />
              <h1 className="text-xl font-extrabold text-white">Madhav Financial Management</h1>
            </div>
            {/* Search Input */}
            <input
              type="text"
              placeholder="Search transactions..."
              className="w-full p-3 rounded-md text-gray-800 border-2 border-teal-300 focus:outline-none focus:ring-2 focus:ring-teal-500 transition duration-200 shadow-md mb-4"
            />
            {/* Buttons Section */}
            <div className="flex justify-between w-full">
              <button
                className="bg-teal-800 text-white px-4 py-2 rounded-md hover:bg-teal-700 transition duration-200"
                onClick={handleSearchToggle}
              >
                Search
              </button>
              <button
                className="bg-white text-teal-600 px-4 py-2 rounded-md font-semibold hover:bg-teal-100 transition duration-200"
                onClick={handleSearchToggle} // Close the search overlay
              >
                Close
              </button>
            </div>
          </div>
        )}
      </header>

      {/* Auth Modal */}
      {isAuthOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-70 flex flex-col items-center justify-center z-50"
          onClick={closeAuthModal} // Close modal on background click
        >
          <div className="bg-white p-8 rounded-md shadow-lg" onClick={(e) => e.stopPropagation()}>
            {isSignUp ? <SignUp onClose={handleAuthToggle} toggle={toggleSignUp}/> : <SignIn onClose={handleAuthToggle} toggle={toggleSignUp}/>}
            <button
              className="mt-4 text-teal-600 font-semibold"
              onClick={toggleSignUp} // Toggle between Sign In and Sign Up
            >
              {isSignUp ? 'Already have an account? Sign In' : "Don't have an account? Sign Up"}
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Header;
