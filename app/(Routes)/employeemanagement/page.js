'use client'
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Card, CardContent, CardTitle, CardDescription } from '@/components/ui/card';
import { Bell, LayoutDashboard, Mail } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import User from "../../models/userModel";
import SideBar from '../../layouts/Sidebar'; // Import the SideBar component

const EmployeeDirectory = () => {
  const [employees, setEmployees] = useState([]); // State to store all employees
  const [searchTerm, setSearchTerm] = useState(''); // State for search input
  const [filteredEmployees, setFilteredEmployees] = useState([]); // State for filtered employees
  const [defaultView, setDefaultView] = useState(true); // State to toggle between default and search view
  const router = useRouter();

  // Fetch all employees when component loads
  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const response = await axios.get('http://localhost:5000/employee'); // Fetch all employees
        setEmployees(response.data); // Set employee data
        setFilteredEmployees(response.data.slice(0, 3)); // Show only the first 3 by default
      } catch (error) {
        console.error('Error fetching employees:', error);
      }
    };

    fetchEmployees();
  }, []);

  // Update filtered employees when search term changes
  useEffect(() => {
    if (searchTerm === '') {
      setFilteredEmployees(employees.slice(0, 3)); // Reset to first 3 if search is empty
      setDefaultView(true); // Toggle back to default view
    } else {
      const filtered = employees.filter((employee) =>
        `${employee.first_name} ${employee.last_name}`
          .toLowerCase()
          .includes(searchTerm.toLowerCase())
      );
      setFilteredEmployees(filtered); // Update with search results
      setDefaultView(false); // Switch from default view to search view
    }
  }, [searchTerm, employees]);

  // Sign out function
  const signOut = async () => {
    try {
      User.logout();
      router.push('/');
    } catch (error) {
      console.error('Error during sign out:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      {/* Sidebar Component - Fixed on the left */}
      <SideBar activePanel={0} role={'Admin'} />

      {/* Main Content Container with Margin for the Sidebar */}
      <div className="lg:ml-60">
        <div className="container mx-auto">
          {/* Title Component - Navbar with Search */}
          <div className="flex flex-col mb-8">
            <div className="flex flex-row items-center justify-between h-20 rounded-xl px-4 bg-gradient-to-r m-1 from-indigo-500 via-purple-500 to-pink-500">
              <div className="flex items-center space-x-2 bg-white p-2 rounded-xl w-5/12 h-10 max-w-96">
                <LayoutDashboard />
                {/* Search Bar */}
                <textarea
                  className="w-full h-full border-none focus:outline-none resize-none text-sm"
                  placeholder="Search..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)} // Update search term state
                ></textarea>
              </div>
              <div className="flex space-x-4 text-gray-600">
                <Bell />
                <Mail />
                <Popover>
                  <PopoverTrigger>
                    <div className="flex flex-row items-center space-x-2">
                      <Avatar>
                        <AvatarImage src="http://localhost:5000/uploads/Gaming_5000x3125.jpg" />
                        <AvatarFallback>CN</AvatarFallback>
                      </Avatar>
                      <div className="flex flex-col text-xs">
                        <div className="font-semibold">Thimira Sahan</div>
                        <div className="text-xs">Admin</div>
                      </div>
                    </div>
                  </PopoverTrigger>
                  <PopoverContent className="w-50 -ml-12">
                    <div className="flex gap-2">
                      <Avatar>
                        <AvatarImage src="https://github.com/vercel.png" />
                        <AvatarFallback>VC</AvatarFallback>
                      </Avatar>
                      <div className="">
                        <h4 className="text-sm font-semibold">@Thimira Sahan</h4>
                        <p className="text-sm">Admin</p>
                        <div className="flex items-center pt-2">
                          <Button onClick={signOut}>
                            Logout
                          </Button>
                        </div>
                      </div>
                    </div>
                  </PopoverContent>
                </Popover>
              </div>
            </div>
          </div>

          <div className="flex space-x-8">
            {/* Left Column - Employee Cards */}
            <div className="w-full space-y-6">
              {/* Render Employee Cards */}
              {filteredEmployees.length > 0 ? (
                filteredEmployees.map((employee) => (
                  <Card key={employee.employee_id} className="bg-white p-6 rounded-lg shadow-md">
                    <CardContent className="flex items-center">
                      <img
                        src={employee.profile_pic || '/default-profile.jpg'} // Use employee profile picture or default
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
                    <div className="p-4 flex space-x-2">
                      <span className="inline-block bg-blue-100 text-blue-800 text-sm font-medium px-2 py-1 rounded">
                        {employee.status}
                      </span>
                      {/* Add more badges if necessary */}
                    </div>
                  </Card>
                ))
              ) : (
                <p className="text-gray-500">No employees found.</p> // Message if no employees match search
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployeeDirectory;
