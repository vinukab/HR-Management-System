'use client'
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Card, CardContent, CardTitle, CardDescription } from '@/components/ui/card';
import { LayoutDashboard } from "lucide-react";
import SideBar from '../../layouts/Sidebar';
import Link from 'next/link';
import { useRouter } from "next/navigation";

const EmployeeDirectory = () => {
  const [employees, setEmployees] = useState([]);
  const [searchTerm, setSearchTerm] = useState(''); 
  const [filteredEmployees, setFilteredEmployees] = useState([]); 
  const [defaultView, setDefaultView] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const response = await axios.get('http://localhost:5000/employee',{withCredentials: true});
        setEmployees(response.data);
        setFilteredEmployees(response.data.slice(0, 3)); 
      } catch (error) {
        console.error('Error fetching employees:', error);
      }
    };
    fetchEmployees();
  }, []);

  useEffect(() => {
    const filtered = employees.filter((employee) =>
      `${employee.first_name} ${employee.last_name}`.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredEmployees(filtered.length ? filtered : employees.slice(0, 3));
    setDefaultView(!searchTerm);
  }, [searchTerm, employees]);

  return (
    <div className="min-h-screen bg-gray-700 p-8">
      <SideBar activePanel={3} role={'Admin'} />

      <div className="lg:ml-60">
        <div className="container mx-auto">
          <div className="flex flex-col mb-8">
            <div className="flex items-center space-x-3 bg-white p-3 rounded-xl w-full md:w-1/2 lg:w-5/12 h-12 shadow-sm">
              <LayoutDashboard className="text-gray-500" />
              <input
                className="w-full border-none focus:outline-none text-sm placeholder-gray-400"
                placeholder="Search employees..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredEmployees.length > 0 ? (
              filteredEmployees.map((employee) => (
                <Card key={employee.employee_id} className="bg-gradient-to-r from-gray-900 via-gray-900 to-gray-800 text-blue-400 p-6 rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-300 border-gray-700">
                  <CardContent className="flex items-center space-x-4">
                    <img
                      src={`http://localhost:5000${employee.profile_pic || '/default-profile.jpg'}`}
                      alt={`${employee.first_name} ${employee.last_name}`}
                      className="rounded-full w-16 h-16 object-cover border-2 border-white shadow-md"
                    />
                    <div className="flex-1">
                      <CardTitle className="text-xl font-semibold ">
                        {`${employee.first_name} ${employee.last_name}`}
                      </CardTitle>
                      <CardDescription className="text-sm text-gray-300">{employee.job_title}</CardDescription>
                      <p className="text-gray-400">{employee.department}</p>
                      <a href={`mailto:${employee.email}`} className="text-blue-200 hover:underline text-sm">
                        {employee.email}
                    </a>
                    </div>
                    <Link href={`profile/${employee.employee_id}`} className="bg-white text-blue-800 px-3 py-1 rounded-full text-xs font-medium shadow-md">
                      Visit
                    </Link>
                  </CardContent>
                  <div className="pt-4">
                    <span className="inline-block bg-blue-100 text-blue-900 text-xs font-semibold px-3 py-1 rounded-full">
                      {employee.status}
                    </span>
                  </div>
                </Card>
              ))
            ) : (
              <p className="text-gray-500 col-span-full text-center">No employees found.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployeeDirectory;
