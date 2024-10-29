'use client';
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const OrganizationDetails = () => {
  const [organization, setOrganization] = useState({
    organization_id: '',
    organization_name: '',
    address: '',
    registration_number: '',
    latitude: '',
    longitude: ''
  });
  const [editing, setEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch organization details when the component mounts
  useEffect(() => {
    const fetchOrganizationDetails = async () => {
      try {
        const response = await axios.get('http://localhost:5000/organization', { withCredentials: true });
        setOrganization(response.data); // Set the organization details
        setLoading(false);
      } catch (err) {
        console.error('Error fetching organization details:', err);
        setError('Error fetching organization details');
        setLoading(false);
      }
    };

    fetchOrganizationDetails();
  }, []);

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setOrganization({ ...organization, [name]: value });
  };

  // Save the edited organization details
  const saveOrganizationDetails = async () => {
    try {
      await axios.put('http://localhost:5000/organization/update', organization, { withCredentials: true });
      setEditing(false); // Exit edit mode
    } catch (err) {
      console.error('Error saving organization details:', err);
      setError('Error saving organization details');
    }
  };

  if (loading) return <p>Loading organization details...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Organization Details</h2>
      {editing ? (
        <div>
          <input
            type="text"
            name="organization_name"
            value={organization.organization_name}
            onChange={handleInputChange}
            className="border border-gray-300 rounded p-2 mb-2 w-full"
            placeholder="Organization Name"
          />
          <input
            type="text"
            name="address"
            value={organization.address}
            onChange={handleInputChange}
            className="border border-gray-300 rounded p-2 mb-2 w-full"
            placeholder="Address"
          />
          <input
            type="text"
            name="registration_number"
            value={organization.registration_number}
            onChange={handleInputChange}
            className="border border-gray-300 rounded p-2 mb-2 w-full"
            placeholder="Registration Number"
          />
          <input
            type="number"
            name="latitude"
            value={organization.latitude}
            onChange={handleInputChange}
            className="border border-gray-300 rounded p-2 mb-2 w-full"
            placeholder="Latitude"
          />
          <input
            type="number"
            name="longitude"
            value={organization.longitude}
            onChange={handleInputChange}
            className="border border-gray-300 rounded p-2 mb-2 w-full"
            placeholder="Longitude"
          />
          <button onClick={saveOrganizationDetails} className="px-4 py-2 bg-green-500 text-white rounded mr-2">Save</button>
          <button onClick={() => setEditing(false)} className="px-4 py-2 bg-red-500 text-white rounded">Cancel</button>
        </div>
      ) : (
        <div>
          <p><strong>Name:</strong> {organization.organization_name}</p>
          <p><strong>Address:</strong> {organization.address}</p>
          <p><strong>Registration Number:</strong> {organization.registration_number}</p>
          <p><strong>Latitude:</strong> {organization.latitude}</p>
          <p><strong>Longitude:</strong> {organization.longitude}</p>
          <button onClick={() => setEditing(true)} className="px-4 py-2 bg-blue-500 text-white rounded">Edit</button>
        </div>
      )}
    </div>
  );
};

export default OrganizationDetails;
