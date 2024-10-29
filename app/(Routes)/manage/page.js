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
    <div className="min-h-screen bg-gray-100 p-8">
      <SideBar activePanel={3} role={'Admin'} />

      <div className="lg:ml-60">
        <div className="container mx-auto">
          <div className="flex flex-col mb-8">
            <div className="flex items-center space-x-2 bg-white p-2 rounded-xl w-5/12 h-10 max-w-96">
              <LayoutDashboard />
              <input
                className="w-full border-none focus:outline-none text-sm"
                placeholder="Search..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>

          <div className="flex space-x-8">
            <div className="w-full space-y-6">
              {filteredEmployees.length > 0 ? (
                filteredEmployees.map((employee) => (
                  <Card key={employee.employee_id} className="bg-white p-6 rounded-lg shadow-md">
                    <CardContent className="flex items-center">
                      <Link href={`profile/${employee.employee_id}`} className="bg-blue-500 text-white px-2 py-1 rounded ml-2">Visit</Link>
                      <img
                        src={`http://localhost:5000${employee.profile_pic || '/default-profile.jpg'}`}
                        alt={`${employee.first_name} ${employee.last_name}`}
                        className="rounded-full w-16 h-16 object-cover"
                      />
                      <div className="ml-6">
                        <CardTitle className="text-xl font-semibold">
                          {`${employee.first_name} ${employee.last_name}`}
                        </CardTitle>
                        <CardDescription>{employee.job_title}</CardDescription>
                        <p className="text-gray-600">{employee.department}</p>
                        <a href={`mailto:${employee.email}`} className="text-blue-600">{employee.email}</a>
                      </div>
                    </CardContent>
                    <div className="p-4">
                      <span className="inline-block bg-blue-100 text-blue-800 text-sm font-medium px-2 py-1 rounded">
                        {employee.status}
                      </span>
                    </div>
                  </Card>
                ))
              ) : (
                <p className="text-gray-500">No employees found.</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployeeDirectory;
