'use client';
import { useState } from 'react';
import axios from 'axios';
import Title from "@/app/layouts/Titlebar"; // Ensure this path is correct
import { useRouter } from 'next/navigation';
import SideBar from '@/app/layouts/Sidebar';

const CreateUser = ({ params }) => {
  const employee_id = params.employee_id;
  const [user, setUser] = useState({
    username: '',
    password: '',
    role: 'Employee',
    employee_id: employee_id || ''
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({
      ...user,
      [name]: value
    });
  };
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.post('http://localhost:5000/employee/createUser', user, { withCredentials: true });
      
      setUser({
        username: '',
        password: '',
        role: 'Employee',
        employee_id: employee_id || ''
      });
      router.push(`/createemployee/addemergencyperson/${employee_id}`);
    } catch (error) {
      console.error('There was an error creating the user!', error);
      setError('Failed to create user.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
    <SideBar/>
    <div className="ml-56">
         <div className="m-1 bg-white rounded-lg shadow-md">
      <Title title="Create User" />

      <div className="grid grid-cols-3 gap-4 p-5">
        {/* Left Side - Image */}
        <div className="col-span-1 flex justify-center items-center h-full">
          <img src="Job_Details.png" className="max-w-full max-h-full" alt="Logo" />
        </div>

        {/* Right Side - Form */}
        <div className="col-span-2">
          {loading && <p>Loading...</p>}
          {error && <p className="text-red-500">{error}</p>}

          <form onSubmit={handleSubmit} className="p-5 w-full space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Username</label>
              <input
                type="text"
                name="username"
                value={user.username}
                placeholder="Username"
                onChange={handleChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Password</label>
              <input
                type="password"
                name="password"
                value={user.password}
                placeholder="Password"
                onChange={handleChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Role</label>
              <select
                name="role"
                value={user.role}
                onChange={handleChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                required
              >
                <option value="Admin">Admin</option>
                <option value="HR Manager">HR Manager</option>
                <option value="Employee">Employee</option>
                <option value="Supervisor">Supervisor</option>
              </select>
            </div>

            <div className="flex justify-between mt-4">
              <button
                type="submit"
                className="bg-black text-white px-4 py-2 rounded-md hover:bg-gray-700"
              >
                Create User
              </button>
              <button
                type="button"
                onClick={ ()=>{router.push(`/createemployee/addemergencyperson/${employee_id}`);}}
                className="bg-black text-white px-4 py-2 rounded-md hover:bg-gray-700"
              >
                Skip
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
    </div>
   </>
  );
};

export default CreateUser;
