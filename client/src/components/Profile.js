import React, { useState } from 'react';
import { FaUser, FaEnvelope, FaPhone, FaMapMarkerAlt, FaCalendarAlt, FaWallet } from 'react-icons/fa';
import { IoIosLogIn } from 'react-icons/io';

const Profile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [userData, setUserData] = useState({
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@example.com',
    phone: '+1234567890',
    address: '123 Main St, Suite 4B',
    city: 'San Francisco',
    lastLogin: '2024-10-25 15:30',
    signupDate: '2023-05-15',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Updated User Data:', userData);
    setIsEditing(false);
  };

  return (
    <div className="container mx-auto p-6 max-w-md bg-gray-50 rounded-lg shadow-lg">
      <div className="flex flex-col items-center mb-6">
        <div className="relative w-24 h-24 mb-4">
          <img
            src="https://via.placeholder.com/96"
            alt="User Avatar"
            className="rounded-full shadow-md"
          />
          <button
            className="absolute bottom-0 right-0 bg-teal-600 text-white p-1 rounded-full hover:bg-teal-700 transition"
            aria-label="Edit Profile Picture"
          >
            <FaUser />
          </button>
        </div>
        <h2 className="text-2xl font-semibold text-teal-700">Profile</h2>
        <p className="text-sm text-gray-600">Profile Completeness: <span className="font-semibold">80%</span></p>
        <div className="w-full bg-gray-200 rounded-full h-2 mb-6">
          <div className="bg-teal-600 h-2 rounded-full" style={{ width: '80%' }}></div>
        </div>
      </div>

      {isEditing ? (
        <form onSubmit={handleSubmit} className="bg-white p-4 rounded-lg shadow-md">
          {/* First Name */}
          <div className="mb-4 flex items-center">
            <FaUser className="text-gray-500 mr-2" />
            <input
              type="text"
              name="firstName"
              value={userData.firstName}
              onChange={handleChange}
              placeholder="First Name"
              className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 transition"
              required
            />
          </div>

          {/* Last Name */}
          <div className="mb-4 flex items-center">
            <FaUser className="text-gray-500 mr-2" />
            <input
              type="text"
              name="lastName"
              value={userData.lastName}
              onChange={handleChange}
              placeholder="Last Name"
              className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 transition"
              required
            />
          </div>

          {/* Email */}
          <div className="mb-4 flex items-center">
            <FaEnvelope className="text-gray-500 mr-2" />
            <input
              type="email"
              name="email"
              value={userData.email}
              onChange={handleChange}
              placeholder="Email"
              className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 transition"
              required
            />
          </div>

          {/* Phone Number */}
          <div className="mb-4 flex items-center">
            <FaPhone className="text-gray-500 mr-2" />
            <input
              type="text"
              name="phone"
              value={userData.phone}
              onChange={handleChange}
              placeholder="Phone Number"
              className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 transition"
            />
          </div>

          {/* Address */}
          <div className="mb-4 flex items-center">
            <FaMapMarkerAlt className="text-gray-500 mr-2" />
            <input
              type="text"
              name="address"
              value={userData.address}
              onChange={handleChange}
              placeholder="Address"
              className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 transition"
            />
          </div>

          {/* City */}
          <div className="mb-4 flex items-center">
            <FaMapMarkerAlt className="text-gray-500 mr-2" />
            <input
              type="text"
              name="city"
              value={userData.city}
              onChange={handleChange}
              placeholder="City"
              className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 transition"
            />
          </div>

          {/* Save Button */}
          <button
            type="submit"
            className="w-full bg-teal-600 text-white py-2 rounded-lg font-semibold hover:bg-teal-700 transition"
          >
            Save Changes
          </button>
        </form>
      ) : (
        <div className="bg-white p-4 rounded-lg shadow-md">
          <p className="text-sm font-semibold mb-2">
            <FaUser className="inline-block text-gray-500 mr-1" />
            Name: {userData.firstName} {userData.lastName}
          </p>
          <p className="text-sm font-semibold mb-2">
            <FaEnvelope className="inline-block text-gray-500 mr-1" />
            Email: {userData.email}
          </p>
          <p className="text-sm font-semibold mb-2">
            <FaPhone className="inline-block text-gray-500 mr-1" />
            Phone: {userData.phone}
          </p>
          <p className="text-sm font-semibold mb-2">
            <FaMapMarkerAlt className="inline-block text-gray-500 mr-1" />
            Address: {userData.address}, {userData.city}
          </p>

          {/* Debit/Credit Information */}
          <div className="my-4 p-4 bg-gray-100 rounded-lg shadow-sm">
            <h3 className="text-lg font-semibold text-teal-700 flex items-center">
              <FaWallet className="mr-2" />
              Debit/Credit Information
            </h3>
            <p className="text-sm text-gray-600 mt-2">No payment methods linked.</p>
            <button className="text-teal-600 hover:underline text-sm">Add Payment Method</button>
          </div>

          {/* Last Login and Signup Dates */}
          <div className="mt-4 text-center text-gray-600">
            <p className="flex items-center justify-center">
              <IoIosLogIn className="mr-2" />
              Last Login: {userData.lastLogin}
            </p>
            <p className="flex items-center justify-center mt-1">
              <FaCalendarAlt className="mr-2" />
              Signup Date: {userData.signupDate}
            </p>
          </div>

          <button
            onClick={() => setIsEditing(true)}
            className="mt-6 w-full bg-teal-600 text-white py-2 rounded-lg font-semibold hover:bg-teal-700 transition"
          >
            Edit Profile
          </button>
        </div>
      )}
    </div>
  );
};

export default Profile;
