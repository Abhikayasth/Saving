import React, { useState } from 'react';
import { FaArrowDown, FaArrowUp, FaSearch } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';

const FinancialManagement = () => {
  const [entries, setEntries] = useState([]);
  const [formData, setFormData] = useState({
    date: '',
    description: '',
    amount: '',
    type: 'debit',
  });
  const [filter, setFilter] = useState('');
  const [savingsTarget, setSavingsTarget] = useState(600); // Default savings target

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setEntries([{ ...formData, id: Date.now() }, ...entries]);
    setFormData({ date: '', description: '', amount: '', type: 'debit' });
  };

  const filteredEntries = entries.filter(entry =>
    entry.description.toLowerCase().includes(filter.toLowerCase())
  );

  const totalDebit = entries
    .filter(entry => entry.type === 'debit')
    .reduce((acc, entry) => acc + parseFloat(entry.amount), 0);
  const totalCredit = entries
    .filter(entry => entry.type === 'credit')
    .reduce((acc, entry) => acc + parseFloat(entry.amount), 0);
  const profitLoss = totalCredit - totalDebit;

  return (
    <div className="flex flex-col items-center p-4 min-h-screen bg-gradient-to-b from-blue-50 to-indigo-100">
      <h2 className="text-3xl font-bold mb-6 text-center text-indigo-700">
        Financial Management
      </h2>

      {/* Entry Form */}
      <form
        className="w-full max-w-md bg-white rounded-lg shadow-lg p-6 mb-4 transition-transform duration-300 hover:shadow-xl"
        onSubmit={handleSubmit}
      >
        <h3 className="text-xl font-semibold mb-4 text-indigo-600 text-center">Add Transaction</h3>
        <div className="mb-4">
          <label className="block text-gray-700 font-semibold mb-1" htmlFor="date">
            Date
          </label>
          <input
            type="date"
            id="date"
            name="date"
            value={formData.date}
            onChange={handleInputChange}
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400 transition duration-200"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-semibold mb-1" htmlFor="description">
            Description
          </label>
          <input
            type="text"
            id="description"
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400 transition duration-200"
            placeholder="Enter description"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-semibold mb-1" htmlFor="amount">
            Amount
          </label>
          <input
            type="number"
            id="amount"
            name="amount"
            value={formData.amount}
            onChange={handleInputChange}
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400 transition duration-200"
            placeholder="Enter amount"
            required
          />
        </div>
        <div className="mb-6">
          <label className="block text-gray-700 font-semibold mb-1">Type</label>
          <select
            name="type"
            value={formData.type}
            onChange={handleInputChange}
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400 transition duration-200"
          >
            <option value="debit">Debit</option>
            <option value="credit">Credit</option>
          </select>
        </div>
        <button
          type="submit"
          className="w-full p-2 bg-gradient-to-r from-indigo-500 to-blue-500 text-white font-semibold rounded-md hover:scale-105 transition-transform duration-300 shadow-lg hover:shadow-xl"
        >
          Add Entry
        </button>
      </form>

      {/* Savings Target Input */}
      <div className="w-full max-w-md mb-4 bg-white rounded-lg shadow-lg p-6 transition-transform duration-300 hover:shadow-xl">
        <h3 className="text-xl font-semibold mb-2 text-indigo-600">Set Savings Target</h3>
        <input
          type="number"
          value={savingsTarget}
          onChange={(e) => setSavingsTarget(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400 transition duration-200"
          placeholder="Set your savings target"
        />
      </div>

      {/* Summary Section */}
      <div className="w-full max-w-md mb-4 bg-white rounded-lg shadow-lg p-6 transition-transform duration-300 hover:shadow-xl">
        <h3 className="text-xl font-semibold mb-2 text-indigo-600">Summary</h3>
        <div className="flex flex-col gap-2">
          <p>Total Debit: ₹{totalDebit.toFixed(2)}</p>
          <p>Total Credit: ₹{totalCredit.toFixed(2)}</p>
          <p className={`font-bold ${profitLoss >= 0 ? 'text-green-600' : 'text-red-600'}`}>
            Profit/Loss: ₹{profitLoss.toFixed(2)}
          </p>
          <p>Savings Target: ₹{savingsTarget}</p>
        </div>
      </div>

      {/* Filter Section */}
      <div className="relative w-full max-w-md mb-4">
        <input
          type="text"
          placeholder="Search by description"
          className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400 transition duration-200"
          onChange={(e) => setFilter(e.target.value)}
        />
        <FaSearch className="absolute right-3 top-3 text-gray-500" />
      </div>

      {/* Display Entries */}
      <div className="w-full max-w-md mt-6">
        <h3 className="text-xl font-semibold mb-4 text-indigo-600">Transaction History</h3>
        <div className="bg-white rounded-lg shadow-md overflow-hidden transition-transform duration-300 hover:shadow-xl">
          <table className="w-full">
            <thead>
              <tr className="bg-indigo-200 text-left text-indigo-800">
                <th className="p-4">Date</th>
                <th className="p-4">Description</th>
                <th className="p-4">Amount</th>
                <th className="p-4">Type</th>
              </tr>
            </thead>
            <AnimatePresence>
              <tbody>
                {filteredEntries.length > 0 ? (
                  filteredEntries.map((entry) => (
                    <motion.tr
                      key={entry.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      className="border-b hover:bg-indigo-50 transition-all duration-200"
                    >
                      <td className="p-4">{entry.date}</td>
                      <td className="p-4">{entry.description}</td>
                      <td className="p-4 font-medium">₹{parseFloat(entry.amount).toFixed(2)}</td>
                      <td className="p-4 flex items-center gap-2">
                        {entry.type === 'debit' ? (
                          <FaArrowDown className="text-red-500 animate-pulse" />
                        ) : (
                          <FaArrowUp className="text-green-500 animate-pulse" />
                        )}
                        <span className={entry.type === 'debit' ? 'text-red-600' : 'text-green-600'}>
                          {entry.type.charAt(0).toUpperCase() + entry.type.slice(1)}
                        </span>
                      </td>
                    </motion.tr>
                  ))
                ) : (
                  <tr>
                    <td className="p-4 text-center" colSpan="4">
                      No entries found.
                    </td>
                  </tr>
                )}
              </tbody>
            </AnimatePresence>
          </table>
        </div>
      </div>
    </div>
  );
};

export default FinancialManagement;
