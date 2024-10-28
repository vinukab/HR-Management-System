'use client';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid'; // Use UUID for generating unique leave_type_id

const LeaveTypeSettings = () => {
  const [leaveTypes, setLeaveTypes] = useState([]);
  const [newLeaveType, setNewLeaveType] = useState({ type_name: '', default_days: '', pay_grade_id: '' });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch leave types from the backend when the component mounts
  useEffect(() => {
    const fetchLeaveTypes = async () => {
      try {
        const response = await axios.get('http://localhost:5000/leave/alltypes', { withCredentials: true });
        setLeaveTypes(response.data); // Set the leave types data
        setLoading(false);
      } catch (err) {
        console.error('Error fetching leave types:', err);
        setError('Error fetching leave types');
        setLoading(false);
      }
    };

    fetchLeaveTypes();
  }, []);

  // Handle input changes for adding a new leave type
  const handleNewLeaveTypeChange = (e) => {
    const { name, value } = e.target;
    setNewLeaveType({ ...newLeaveType, [name]: value });
  };

  // Add a new leave type
  const addLeaveType = async () => {
    try {
      const newLeave = { ...newLeaveType, leave_type_id: uuidv4() }; // Generate unique leave_type_id
      await axios.post('http://localhost:5000/leave/add', newLeave, { withCredentials: true });
      setLeaveTypes([...leaveTypes, newLeave]); // Update the leave types list
      setNewLeaveType({ type_name: '', default_days: '', pay_grade_id: '' }); // Reset the form
    } catch (err) {
      console.error('Error adding leave type:', err);
      setError('Error adding leave type');
    }
  };

  // Delete a leave type
  const deleteLeaveType = async (leave_type_id) => {
    console.log('Attempting to delete leave type with ID:', leave_type_id); // Log ID
    try {
      const response = await axios.delete(`http://localhost:5000/leave/delete/${leave_type_id}`, { withCredentials: true });
      console.log('Delete response:', response.data); // Log response from backend
      if (response.data.affectedRows > 0) { // Check if a row was deleted
        setLeaveTypes(leaveTypes.filter((type) => type.leave_type_id !== leave_type_id)); // Remove deleted leave type
      } else {
        console.error('No matching leave type found to delete');
        setError('No matching leave type found to delete');
      }
    } catch (err) {
      console.error('Error deleting leave type:', err);
      setError('Error deleting leave type');
    }
  };

  if (loading) return <p>Loading leave types...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Leave Type Settings</h2>
      
      {/* Form to Add New Leave Type */}
      <div className="mb-6">
        <h3 className="text-xl font-semibold mb-2">Add New Leave Type</h3>
        <input
          type="text"
          name="type_name"
          value={newLeaveType.type_name}
          onChange={handleNewLeaveTypeChange}
          className="border border-gray-300 rounded p-2 mb-2 w-full"
          placeholder="Leave Type Name"
        />
        <input
          type="number"
          name="default_days"
          value={newLeaveType.default_days}
          onChange={handleNewLeaveTypeChange}
          className="border border-gray-300 rounded p-2 mb-2 w-full"
          placeholder="Default Days"
        />
        <input
          type="text"
          name="pay_grade_id"
          value={newLeaveType.pay_grade_id}
          onChange={handleNewLeaveTypeChange}
          className="border border-gray-300 rounded p-2 mb-2 w-full"
          placeholder="Pay Grade ID"
        />
        <button onClick={addLeaveType} className="px-4 py-2 bg-green-500 text-white rounded">Add Leave Type</button>
      </div>

      {/* List of Existing Leave Types */}
      <ul className="list-disc list-inside mb-4">
        {leaveTypes.map((leaveType) => (
          <li key={leaveType.leave_type_id} className="mb-2">
            <strong>{leaveType.type_name}</strong> - Default Days: {leaveType.default_days} - Pay Grade ID: {leaveType.pay_grade_id}
            <button
              onClick={() => deleteLeaveType(leaveType.leave_type_id)}
              className="ml-4 px-3 py-1 bg-red-500 text-white rounded"
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default LeaveTypeSettings;
