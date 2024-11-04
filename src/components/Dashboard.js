import React, { useState } from 'react';
import History from './History';
import Records from './Records';

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState('history'); // Default tab is history

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold text-center">Dashboard</h1>
      <div className="flex justify-center my-4">
        <button 
          className={`p-2 mx-2 ${activeTab === 'history' ? 'bg-teal-600 text-white' : 'bg-gray-200'}`} 
          onClick={() => handleTabChange('history')}
        >
          History
        </button>
        <button 
          className={`p-2 mx-2 ${activeTab === 'records' ? 'bg-teal-600 text-white' : 'bg-gray-200'}`} 
          onClick={() => handleTabChange('records')}
        >
          Records
        </button>
      </div>
      {activeTab === 'history' ? <History /> : <Records />}
    </div>
  );
};

export default Dashboard;
