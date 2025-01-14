'use client';
import { useState } from 'react';
import axios from 'axios';
import Title from "@/app/layouts/Titlebar";
import { useRouter } from 'next/navigation';
import SideBar from '../../../../layouts/Sidebar';

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
      router.push(`/profile/${employee_id}`);
    } catch (error) {
      console.error('There was an error creating the user!', error);
      setError('Failed to create user.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
    <SideBar activePanel = {1}/>
    
    <div className="ml-56">
         <div className="m-1 bg-white rounded-lg shadow-md">
      <Title title="Create User" />
        
      <div className="grid grid-cols-3 gap-4 p-5 bg-gray-800">
        {/* Left Side - Image */}
        <div className="col-span-1 flex justify-center items-center h-[36.9rem]">
          <img src="https://img.freepik.com/free-photo/rag-doll-blue-with-arms-two_1156-238.jpg?t=st=1730223852~exp=1730227452~hmac=4076edc7ac50ad6d60c088623bfacbf4473ce803b864854b00e73ea5a4341660&w=740" className="max-w-full max-h-full" alt="Logo" />
        </div>

        {/* Right Side - Form */}
        <div className="col-span-2">
          {loading && <p>Loading...</p>}
          {error && <p className="text-red-500">{error}</p>}

          <form onSubmit={handleSubmit} className="p-5 w-full space-y-4">
            <div>
            <div>
            <h2 className="text-2xl font-semibold text-white text-center">Create User</h2>
              <label className="text-white border-gray-700">Username</label>
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
            </div>

            <div>
              <label className="text-white border-gray-700">Password</label>
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
              <label className="text-white border-gray-700">Role</label>
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
                className="text-white px-4 py-2 rounded-md bg-[#1e40af] hover:bg-[#1d4ed8]"
              >
                Create User
              </button>
              <button
                type="button"
                onClick={ ()=>{router.push(`/profile/${employee_id}`);}}
                className="text-white px-4 py-2 rounded-md bg-[#1e40af] hover:bg-[#1d4ed8]"
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
