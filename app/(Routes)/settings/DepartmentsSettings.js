import { useState, useEffect } from 'react';
import axios from 'axios';

export default function DepartmentsSettings() {
    const [branches, setBranches] = useState([]);
    const [departmentName, setDepartmentName] = useState('');
    const [selectedBranch, setSelectedBranch] = useState(null);
    const [departments, setDepartments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const branchesResponse = await axios.get('http://localhost:5000/branch/all', { withCredentials: true });
                setBranches(branchesResponse.data);
                const departmentsResponse = await axios.get('http://localhost:5000/department', { withCredentials: true });
                setDepartments(departmentsResponse.data);
                setLoading(false);
            } catch (err) {
                console.error('Error fetching data:', err);
                setError('Error fetching data');
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    const handleDelete = async (departmentId) => {
        try {
            const response = await axios.delete(`http://localhost:5000/department/${departmentId}`);
            if (response.status === 200) {
                setDepartments(departments.filter(department => department.department_id !== departmentId));
            } else {
                alert('Failed to delete department');
            }
        } catch (error) {
            console.error('Error deleting department:', error);
            alert('Failed to delete department');
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('http://localhost:5000/department', {
                departmentName,
                branchId: selectedBranch.branch_id,
            });

            if (response.status === 200) {
                setDepartments([...departments, { department_id: response.data.id, department_name: departmentName, branch_name: selectedBranch.branch_name }]);
                setDepartmentName('');
                setSelectedBranch(null);
            } else {
                console.error('Error adding department:', response.status);
                alert('Failed to add department');
            }
        } catch (error) {
            console.error('Error adding department:', error);
            alert('Failed to add department');
        }
    };

    if (loading) return <p>Loading data...</p>;
    if (error) return <p className="text-red-500">{error}</p>;

    return (
        <div className="container mx-auto p-6">
            <h2 className="text-3xl font-bold mb-6 text-center">Department Management</h2>
            
            {/* Form to Add New Department */}
            <div className="bg-white shadow-md rounded-lg p-6 mb-6">
                <h3 className="text-2xl font-semibold mb-4">Add New Department</h3>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-gray-700 mb-2">Department Name:</label>
                        <input
                            type="text"
                            value={departmentName}
                            onChange={(e) => setDepartmentName(e.target.value)}
                            className="border border-gray-300 rounded-lg p-2 w-full"
                            placeholder="Enter Department Name"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 mb-2">Branch:</label>
                        <select
                            value={selectedBranch ? selectedBranch.branch_id : ''}
                            onChange={(e) => setSelectedBranch(branches.find(branch => branch.branch_id === e.target.value))}
                            className="border border-gray-300 rounded-lg p-2 w-full"
                            required
                        >
                            <option value="">Select a branch</option>
                            {branches.map((branch) => (
                                <option key={branch.branch_id} value={branch.branch_id}>
                                    {branch.branch_name}
                                </option>
                            ))}
                        </select>
                    </div>
                    <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">Add Department</button>
                </form>
            </div>

            {/* List of Existing Departments */}
            {branches.map((branch) => (
                <div key={branch.branch_id} className="bg-white shadow-md rounded-lg p-6 mb-6">
                    <h3 className="text-2xl font-semibold mb-4">{branch.branch_name}</h3>
                    <ul className="list-disc list-inside mb-4">
                        {departments
                            .filter(department => department.branch_name === branch.branch_name)
                            .map((department) => (
                                <li key={department.department_id} className="mb-2 flex justify-between items-center">
                                    <span className="font-medium">{department.department_name}</span>
                                    <button
                                        onClick={() => handleDelete(department.department_id)}
                                        className="ml-4 px-3 py-1 bg-red-500 text-white rounded-lg hover:bg-red-600"
                                    >
                                        Delete
                                    </button>
                                </li>
                            ))}
                    </ul>
                </div>
            ))}
        </div>
    );
}
