import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; // Import Router for routing
import FinancialManagement from './components/FinancialManagement';
import Header from './components/Header.js';
import Footer from './components/Footer.js';
import SignIn from './components/SignIn.js'; // Assuming SignIn component exists
import SignUp from './components/SignUp.js'; // Assuming SignUp component exists
import Dashboard from './components/Dashboard'; // Import the Dashboard component
import Profile from './components/Profile'; // Import the Profile component

const App = () => {
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<FinancialManagement />} />
            <Route path="/login" element={<SignIn />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/dashboard" element={<Dashboard />} /> {/* Add Dashboard route */}
            <Route path="/profile" element={<Profile />} /> 
            {/* Add other routes as necessary */}
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
};

export default App;
