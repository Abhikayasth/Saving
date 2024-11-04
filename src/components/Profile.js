// Profile.js
import React, { useState } from 'react';

const Profile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [userData, setUserData] = useState({
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@example.com',
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
    // Here, you would typically send the updated data to your server
    console.log('Updated User Data:', userData);
    setIsEditing(false); // Exit edit mode after submission
  };

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">Profile</h2>
      {isEditing ? (
        <form onSubmit={handleSubmit} className="bg-white p-4 rounded shadow-md">
          <div className="mb-4">
            <label className="block text-sm font-semibold mb-2">First Name</label>
            <input
              type="text"
              name="firstName"
              value={userData.firstName}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-semibold mb-2">Last Name</label>
            <input
              type="text"
              name="lastName"
              value={userData.lastName}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-semibold mb-2">Email</label>
            <input
              type="email"
              name="email"
              value={userData.email}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded"
              required
            />
          </div>
          <button
            type="submit"
            className="bg-teal-600 text-white px-4 py-2 rounded hover:bg-teal-700 transition"
          >
            Save Changes
          </button>
        </form>
      ) : (
        <div className="bg-white p-4 rounded shadow-md">
          <p className="text-sm font-semibold">First Name: {userData.firstName}</p>
          <p className="text-sm font-semibold">Last Name: {userData.lastName}</p>
          <p className="text-sm font-semibold">Email: {userData.email}</p>
          <button
            onClick={() => setIsEditing(true)}
            className="mt-4 bg-teal-600 text-white px-4 py-2 rounded hover:bg-teal-700 transition"
          >
            Edit Profile
          </button>
        </div>
      )}
    </div>
  );
};

export default Profile;
