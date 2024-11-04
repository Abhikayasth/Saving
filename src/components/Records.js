import React, { useState } from 'react';

const Records = () => {
  const [records, setRecords] = useState([]);
  const [newRecord, setNewRecord] = useState('');

  const addRecord = () => {
    if (newRecord.trim()) {
      const newRecords = [...records, { id: Date.now(), text: newRecord }];
      setRecords(newRecords);
      setNewRecord('');
    }
  };

  return (
    <div className="mt-4">
      <h2 className="text-2xl font-semibold">Manage Records</h2>
      <div className="flex mt-4">
        <input
          type="text"
          value={newRecord}
          onChange={(e) => setNewRecord(e.target.value)}
          placeholder="New record..."
          className="border border-gray-300 p-2 flex-grow rounded-l-md"
        />
        <button 
          onClick={addRecord} 
          className="bg-teal-600 text-white p-2 rounded-r-md"
        >
          Add Record
        </button>
      </div>
      <ul className="mt-2">
        {records.length === 0 ? (
          <li>No records found.</li>
        ) : (
          records.map((record) => (
            <li key={record.id} className="p-2 border-b">
              {record.text}
            </li>
          ))
        )}
      </ul>
    </div>
  );
};

export default Records;
