'use client';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid'; // Use UUID for generating unique branch_id

const BranchDetails = () => {
  const [branches, setBranches] = useState([]);
  const [newBranch, setNewBranch] = useState({ branch_name: '', address: '' });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch branches from the backend when the component mounts
  useEffect(() => {
    const fetchBranches = async () => {
      try {
        const response = await axios.get('http://localhost:5000/branch/all', { withCredentials: true });
        setBranches(response.data); // Set the branches data
        setLoading(false);
      } catch (err) {
        console.error('Error fetching branches:', err);
        setError('Error fetching branches');
        setLoading(false);
      }
    };

    fetchBranches();
  }, []);

  // Handle input changes for adding a new branch
  const handleNewBranchChange = (e) => {
    const { name, value } = e.target;
    setNewBranch({ ...newBranch, [name]: value });
  };

  // Add a new branch
  const addBranch = async () => {
    try {
      const newBranchData = { ...newBranch, branch_id: uuidv4() }; // Generate unique branch_id
      await axios.post('http://localhost:5000/branch/add', newBranchData, { withCredentials: true });
      setBranches([...branches, newBranchData]); // Update the branches list
      setNewBranch({ branch_name: '', address: '' }); // Reset the form
    } catch (err) {
      console.error('Error adding branch:', err);
      setError('Error adding branch');
    }
  };

  // Delete a branch
  const deleteBranch = async (branch_id) => {
    try {
      await axios.delete(`http://localhost:5000/branch/delete/${branch_id}`, { withCredentials: true });
      setBranches(branches.filter((branch) => branch.branch_id !== branch_id)); // Remove deleted branch
    } catch (err) {
      console.error('Error deleting branch:', err);
      setError('Error deleting branch');
    }
  };

  if (loading) return <p>Loading branches...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Branch Management</h2>
      
      {/* Form to Add New Branch */}
      <div className="mb-6">
        <h3 className="text-xl font-semibold mb-2">Add New Branch</h3>
        <input
          type="text"
          name="branch_name"
          value={newBranch.branch_name}
          onChange={handleNewBranchChange}
          className="border border-gray-300 rounded p-2 mb-2 w-full"
          placeholder="Branch Name"
        />
        <input
          type="text"
          name="address"
          value={newBranch.address}
          onChange={handleNewBranchChange}
          className="border border-gray-300 rounded p-2 mb-2 w-full"
          placeholder="Address"
        />
        <button onClick={addBranch} className="px-4 py-2 bg-green-500 text-white rounded">Add Branch</button>
      </div>

      {/* List of Existing Branches */}
      <ul className="list-disc list-inside mb-4">
        {branches.map((branch) => (
          <li key={branch.branch_id} className="mb-2">
            <strong>{branch.branch_name}</strong> - Address: {branch.address}
            <button
              onClick={() => deleteBranch(branch.branch_id)}
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

export default BranchDetails;
