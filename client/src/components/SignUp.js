import React, { useState } from 'react';
import { FaTimes } from 'react-icons/fa';
import { SERVER } from '../constant.js';

const SignUp = ({ onClose, toggle }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [fullName, setfullName] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true); // Start submitting

    if (!fullName || !email || !password || !confirmPassword) {
      setErrorMessage('Please fill in all fields.');
      setIsSubmitting(false);
      return;
    } 
    if (password.length < 6) {
      setErrorMessage('Password must be at least 6 characters long.');
      setIsSubmitting(false);
      return;
    }
    if (password !== confirmPassword) {
      setErrorMessage('Passwords do not match.');
      setIsSubmitting(false);
      return;
    }
    
    console.log(fullName, email, password, confirmPassword);  
    // Simulate an API call for sign-up
    try {
      const response = await fetch(`${SERVER}/user/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({fullName, email, password }),
        credentials: 'include',
      });

      if (!response.ok) {
        throw new Error('Failed to sign up');
      }

      // Reset form fields on success
      setEmail('');
      setPassword('');
      setConfirmPassword('');
      setfullName('');
      setErrorMessage('');
      onClose(); // Close modal on successful sign-up
    } catch (error) {
      setErrorMessage(error.message || 'An error occurred. Please try again.');
    } finally {
      setIsSubmitting(false); // End submitting
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white shadow-lg rounded-lg p-8 w-96 relative transform transition-all duration-300 scale-100 hover:scale-105">
        <button className="absolute top-4 right-4 text-gray-600 hover:text-gray-800" onClick={onClose}>
          <FaTimes className="text-lg" />
        </button>
        <h2 className="text-2xl font-bold mb-6 text-center text-teal-600">Sign Up</h2>
        {errorMessage && <p className="text-red-500 text-sm mb-4">{errorMessage}</p>}
        <form className="flex flex-col space-y-4" onSubmit={handleSubmit}>
          
          <input
            type="text"
            value={fullName}
            onChange={(e) => setfullName(e.target.value)}
            placeholder="Full Name"
            className="p-2 border border-teal-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 transition duration-200"
            required
          />
          
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            className="p-2 border border-teal-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 transition duration-200"
            required
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            className="p-2 border border-teal-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 transition duration-200"
            required
          />
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="Confirm Password"
            className="p-2 border border-teal-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 transition duration-200"
            required
          />
          <button
            type="submit"
            disabled={isSubmitting} // Disable button while submitting
            className={`bg-teal-600 text-white p-2 rounded-md transition duration-200 ${isSubmitting ? 'opacity-50 cursor-not-allowed' : 'hover:bg-teal-500'}`}
          >
            {isSubmitting ? 'Signing Up...' : 'Sign Up'}
          </button>
        </form>
        <p className="text-sm text-center mt-4">
          Already have an account? 
          <button className="text-teal-600 hover:underline ml-1" onClick={() => toggle()}>
            Sign In
          </button>
        </p>
      </div>
    </div>
  );
};

export default SignUp;
