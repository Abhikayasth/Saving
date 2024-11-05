import React, { useState } from 'react';

const History = () => {
  const [historyItems] = useState([
    { id: 1, action: 'Logged In', timestamp: '2024-11-05 10:00 AM', type: 'info' },
    { id: 2, action: 'Signed Up', timestamp: '2024-10-01 08:30 AM', type: 'info' },
    { id: 3, action: 'Credit', timestamp: '2024-11-04 11:00 AM', amount: 200, type: 'credit' },
    { id: 4, action: 'Debit', timestamp: '2024-11-03 01:00 PM', amount: 50, type: 'debit' },
  ]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState('all');

  const filteredItems = historyItems
    .filter(item => filter === 'all' || item.type === filter)
    .filter(item => item.action.toLowerCase().includes(searchTerm.toLowerCase()));

  return (
    <div className="mt-4">
      <h2 className="text-2xl font-semibold mb-4">User History</h2>

      {/* Search and Filter Section */}
      <div className="flex justify-between items-center mb-4">
        <input
          type="text"
          className="p-2 border rounded-md w-1/2"
          placeholder="Search history..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <select
          className="p-2 border rounded-md"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        >
          <option value="all">All</option>
          <option value="credit">Credit</option>
          <option value="debit">Debit</option>
          <option value="info">Info</option>
        </select>
      </div>

      {/* History List */}
      <ul className="mt-2 space-y-2">
        {filteredItems.length === 0 ? (
          <li className="text-gray-500">No history records found.</li>
        ) : (
          filteredItems.map((item) => (
            <li key={item.id} className="p-3 border rounded-md bg-white shadow-sm flex justify-between items-center">
              <div>
                <span className="font-semibold">{item.action}</span> at {item.timestamp}
              </div>
              {item.type === 'credit' && (
                <span className="text-green-600 font-bold">+${item.amount}</span>
              )}
              {item.type === 'debit' && (
                <span className="text-red-600 font-bold">-${item.amount}</span>
              )}
            </li>
          ))
        )}
      </ul>
    </div>
  );
};

export default History;
