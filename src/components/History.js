import React, { useState } from 'react';

const History = () => {
  const [historyItems, setHistoryItems] = useState([]);

  // Simulate fetching history records
  const fetchHistory = () => {
    // Example data
    const data = [
      { id: 1, action: 'Logged In', timestamp: new Date().toLocaleString() },
      { id: 2, action: 'Signed Up', timestamp: new Date().toLocaleString() },
    ];
    setHistoryItems(data);
  };

  return (
    <div className="mt-4">
      <button className="bg-teal-600 text-white p-2 mb-4" onClick={fetchHistory}>
        Load History
      </button>
      <h2 className="text-2xl font-semibold">User History</h2>
      <ul className="mt-2">
        {historyItems.length === 0 ? (
          <li>No history records found.</li>
        ) : (
          historyItems.map((item) => (
            <li key={item.id} className="p-2 border-b">
              {item.action} at {item.timestamp}
            </li>
          ))
        )}
      </ul>
    </div>
  );
};

export default History;
