import React, { useState, useEffect } from 'react';
import axios from 'axios';

const JobTitleSettings = () => {
    const [jobTitles, setJobTitles] = useState([]);
    const [formData, setFormData] = useState({
        job_title_name: ''
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const apiUrl = 'http://localhost:5000';

    // Fetch Job Titles
    const fetchJobTitles = async () => {
        try {
            const response = await axios.get(`${apiUrl}/jobtitle`, { withCredentials: true });
            setJobTitles(response.data);
            setLoading(false);
        } catch (err) {
            console.error('Error fetching job titles:', err);
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchJobTitles();
    }, []);

    // Handle Form Input Change
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    // Add Job Title
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post(`${apiUrl}/jobtitle`, formData, { withCredentials: true });
            fetchJobTitles();
            setFormData({ job_title_name: '' });
        } catch (err) {
            console.error('Error saving job title:', err);
            setError('Error saving job title');
        }
    };

    // Delete Job Title
    const handleDelete = async (id) => {
        try {
            await axios.delete(`${apiUrl}/jobtitle/${id}`, { withCredentials: true });
            fetchJobTitles();
        } catch (err) {
            console.error('Error deleting job title:', err);
            setError('Error deleting job title');
        }
    };

    if (loading) return <p>Loading job titles...</p>;
    if (error) return <p className="text-red-500">{error}</p>;

    return (
        <div>
            <h2 className="text-2xl font-semibold mb-4">Job Titles Management</h2>
            
            {/* Form to Add Job Title */}
            <div className="mb-6">
                <h3 className="text-xl font-semibold mb-2">Add New Job Title</h3>
                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        name="job_title_name"
                        placeholder="Job Title Name"
                        value={formData.job_title_name}
                        onChange={handleChange}
                        className="border border-gray-300 rounded p-2 mb-2 w-full"
                        required
                    />
                    <button type="submit" className="px-4 py-2 bg-green-500 text-white rounded">Add</button>
                </form>
            </div>

            {/* List of Existing Job Titles */}
            <ul className="list-disc list-inside mb-4">
                {jobTitles.map((job) => (
                    <li key={job.job_title_id} className="mb-2">
                        <strong>{job.job_title_name}</strong>
                        <button
                            onClick={() => handleDelete(job.job_title_id)}
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

export default JobTitleSettings;
