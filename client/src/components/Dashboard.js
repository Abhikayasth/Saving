import React, { useState, useEffect } from 'react';
import History from './History';
import Records from './Records';

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState('history');
  const [lastSignIn, setLastSignIn] = useState(new Date().toLocaleString());
  const [lastSignUp, setLastSignUp] = useState(new Date().toLocaleString());

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  useEffect(() => {
    // Simulate fetching last sign-in and sign-up times
    // Replace with actual fetch from API if needed
    setLastSignIn('2024-11-05 10:00 AM');
    setLastSignUp('2024-10-01 08:30 AM');
  }, []);

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold text-center mb-6">Dashboard</h1>

      {/* Overview Section */}
      <div className="text-center mb-8">
        <p className="text-lg mb-2">
          Welcome to your dashboard! Here you can view your <span className="font-semibold">History</span> of activities
          and <span className="font-semibold">Records</span> for quick reference.
        </p>
        <p className="text-md text-gray-500">
          Last Sign-In: <span className="font-semibold">{lastSignIn}</span> | Last Sign-Up: <span className="font-semibold">{lastSignUp}</span>
        </p>
      </div>

      {/* Tab Buttons with Enhanced Styling */}
      <div className="flex justify-center my-4">
        <button
          className={`p-3 mx-2 rounded-lg transition-colors duration-300 ${
            activeTab === 'history' ? 'bg-teal-600 text-white' : 'bg-gray-200 hover:bg-gray-300'
          }`}
          onClick={() => handleTabChange('history')}
        >
          History
        </button>
        <button
          className={`p-3 mx-2 rounded-lg transition-colors duration-300 ${
            activeTab === 'records' ? 'bg-teal-600 text-white' : 'bg-gray-200 hover:bg-gray-300'
          }`}
          onClick={() => handleTabChange('records')}
        >
          Records
        </button>
      </div>

      {/* Active Tab Content */}
      <div className="transition-all duration-500 ease-in-out mt-6">
        {activeTab === 'history' ? <History /> : <Records />}
      </div>
    </div>
  );
};

export default Dashboard;
