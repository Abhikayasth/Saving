import React, { useState } from 'react';

const Records = () => {
  const [records, setRecords] = useState([]);
  const [newRecord, setNewRecord] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [editingRecordId, setEditingRecordId] = useState(null);
  const [editedText, setEditedText] = useState('');

  // Add a new record
  const addRecord = () => {
    if (newRecord.trim()) {
      const newRecords = [...records, { id: Date.now(), text: newRecord }];
      setRecords(newRecords);
      setNewRecord('');
    }
  };

  // Start editing a record
  const startEditing = (id, text) => {
    setEditingRecordId(id);
    setEditedText(text);
  };

  // Save edited record
  const saveEdit = (id) => {
    const updatedRecords = records.map((record) =>
      record.id === id ? { ...record, text: editedText } : record
    );
    setRecords(updatedRecords);
    setEditingRecordId(null);
    setEditedText('');
  };

  // Delete a record
  const deleteRecord = (id) => {
    const filteredRecords = records.filter((record) => record.id !== id);
    setRecords(filteredRecords);
  };

  // Filtered records based on search term
  const filteredRecords = records.filter((record) =>
    record.text.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="mt-4">
      <h2 className="text-2xl font-semibold mb-4">Manage Records</h2>

      {/* Search Bar */}
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Search records..."
        className="border border-gray-300 p-2 rounded-md w-full mb-4"
      />

      {/* Add New Record */}
      <div className="flex">
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

      {/* Records List */}
      <ul className="mt-4 space-y-2">
        {filteredRecords.length === 0 ? (
          <li className="text-gray-500">No records found.</li>
        ) : (
          filteredRecords.map((record) => (
            <li key={record.id} className="p-3 border rounded-md bg-white shadow-sm flex justify-between items-center">
              {editingRecordId === record.id ? (
                <input
                  type="text"
                  value={editedText}
                  onChange={(e) => setEditedText(e.target.value)}
                  className="p-2 border border-gray-300 rounded-md flex-grow mr-2"
                />
              ) : (
                <span>{record.text}</span>
              )}

              <div className="flex space-x-2">
                {editingRecordId === record.id ? (
                  <button
                    onClick={() => saveEdit(record.id)}
                    className="bg-blue-500 text-white p-2 rounded-md"
                  >
                    Save
                  </button>
                ) : (
                  <button
                    onClick={() => startEditing(record.id, record.text)}
                    className="bg-gray-200 hover:bg-gray-300 p-2 rounded-md"
                  >
                    Edit
                  </button>
                )}
                <button
                  onClick={() => deleteRecord(record.id)}
                  className="bg-red-500 text-white p-2 rounded-md"
                >
                  Delete
                </button>
              </div>
            </li>
          ))
        )}
      </ul>
    </div>
  );
};

export default Records;
