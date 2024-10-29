'use client'
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const LeaveTypeSettings = () => {
  const [leaveTypes, setLeaveTypes] = useState([]);
  const [editableLeaveTypes, setEditableLeaveTypes] = useState([]); // Editable state
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editing, setEditing] = useState(false);

  // Fetch leave types from the backend when the component mounts
  useEffect(() => {
    const fetchLeaveTypes = async () => {
        try {
          const response = await axios.get('http://localhost:5000/leave/alltypes', { withCredentials: true });
          setLeaveTypes(response.data); // Set the leave types data
          setEditableLeaveTypes(response.data); // Initialize editable state
          setLoading(false);
        } catch (err) {
          console.error('Error fetching leave types:', err.response ? err.response.data : err.message);
          setError('Error fetching leave types');
          setLoading(false);
        }
    };
      

    fetchLeaveTypes();
  }, []);

  // Handle input changes in editable fields
  const handleInputChange = (index, field, value) => {
    const updatedLeaveTypes = [...editableLeaveTypes];
    updatedLeaveTypes[index][field] = value;
    setEditableLeaveTypes(updatedLeaveTypes);
  };

  // Save the edited leave types
  const saveLeaveTypes = async () => {
    try {
      await axios.put('http://localhost:5000/leave/alltypes', editableLeaveTypes, { withCredentials: true });
      setLeaveTypes(editableLeaveTypes); // Update the main state with edited data
      setEditing(false); // Exit edit mode
    } catch (err) {
      console.error('Error saving leave types:', err);
      setError('Error saving leave types');
    }
  };

  if (loading) return <p>Loading leave types...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Leave Type Settings</h2>
      {editing ? (
        <div>
          <ul className="list-disc list-inside mb-4">
            {editableLeaveTypes.map((leaveType, index) => (
              <li key={leaveType.leave_type_id} className="mb-2">
                <input
                  type="text"
                  value={leaveType.type_name}
                  onChange={(e) => handleInputChange(index, 'type_name', e.target.value)}
                  className="border border-gray-300 rounded p-1 mr-2"
                />
                <input
                  type="number"
                  value={leaveType.default_days}
                  onChange={(e) => handleInputChange(index, 'default_days', e.target.value)}
                  className="border border-gray-300 rounded p-1 mr-2"
                />
              </li>
            ))}
          </ul>
          <button onClick={saveLeaveTypes} className="px-4 py-2 bg-green-500 text-white rounded mr-2">Save</button>
          <button onClick={() => setEditing(false)} className="px-4 py-2 bg-red-500 text-white rounded">Cancel</button>
        </div>
      ) : (
        <div>
          <ul className="list-disc list-inside mb-4">
            {leaveTypes.map((leaveType) => (
              <li key={leaveType.leave_type_id} className="mb-2">
                <strong>{leaveType.type_name}</strong> - Default Days: {leaveType.default_days}
              </li>
            ))}
          </ul>
          <button onClick={() => setEditing(true)} className="px-4 py-2 bg-blue-500 text-white rounded">Edit</button>
        </div>
      )}
    </div>
  );
};

export default LeaveTypeSettings;
