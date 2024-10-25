"use client";
import { useEffect, useState } from "react";
import axios from "axios";  // Don't forget to import axios
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import SideBar from "@/app/layouts/Sidebar";
import Titlebar from "@/app/layouts/Titlebar";

const Profile = () => {
  const [employee, setEmployee] = useState(null); // State to hold employee data

  useEffect(() => {
    fetchEmployee();
  }, []);

  const fetchEmployee = async () => {
    try {
      const employeeId = 'EMP001'; // Replace with the actual ID you want to fetch dynamically
      const response = await axios.get(`http://localhost:5000/employee/${employeeId}`); // Replace with your actual API endpoint
      console.log(response.data); // Log the full response data for debugging
      setEmployee(response.data); // Directly set the employee data
    } catch (error) {
      console.error("Error fetching employee data:", error);
    }
  };

  if (!employee) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100 p-8 flex">
      {/* Sidebar */}
      <div className="w-1/4">
        <SideBar />
      </div>

      {/* Main Profile Content */}
      <div className="flex-1">
        <div className="container mx-auto">
          {/* Title Bar */}
          <Titlebar title="User Profile" />

          {/* Header */}
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-semibold">User Profile</h1>
            <button className="bg-blue-500 text-white px-4 py-2 rounded-lg">Edit</button>
          </div>

          <div className="flex space-x-8">
            {/* Left Column - Profile Picture and General Information */}
            <div className="w-1/3">
              <Card className="bg-white p-6 rounded-lg shadow-md">
                <CardContent>
                  <div className="flex flex-col items-center">
                    <img
                      src={employee.profile_pic || "/default-profile.png"} // Profile picture or default if not available
                      alt="User Profile"
                      className="rounded-full w-32 h-32 object-cover mb-4"
                    />
                    <CardTitle className="text-xl font-semibold text-center mb-2">
                      {`${employee.first_name} ${employee.last_name}`}
                    </CardTitle>
                    <p className="text-center text-gray-600 mb-4">{employee.job_title_id}</p>

                    {/* General Information */}
                    <div className="space-y-2 text-sm text-gray-600">
                      <p><strong>Mobile:</strong> {employee.phone_number || "N/A"}</p> {/* Assuming you have a phone_number field */}
                      <p><strong>Email:</strong> {employee.email || "N/A"}</p> {/* Replace with employee's actual email */}
                      <p><strong>Department:</strong> {employee.department_id}</p>
                      <p><strong>Branch:</strong> {employee.branch_id}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Right Column - Personal Information and Office Information */}
            <div className="flex-1 space-y-8">
              {/* Personal Information */}
              <Card className="bg-white p-6 rounded-lg shadow-md">
                <CardHeader>
                  <CardTitle className="text-lg font-semibold">Personal Information</CardTitle>
                </CardHeader>
                <CardContent className="grid grid-cols-2 gap-6 text-sm text-gray-600">
                  <div>
                    <p><strong>NIC Number:</strong> {employee.NIC_number}</p>
                    <p><strong>Date of Birth:</strong> {employee.birth_date}</p>
                    <p><strong>Marital Status:</strong> {employee.marital_status}</p>
                  </div>
                  <div>
                    <p><strong>Gender:</strong> {employee.gender}</p>
                    <p><strong>Address:</strong> {employee.address}</p>
                  </div>
                </CardContent>
              </Card>

              {/* Office Information */}
              <Card className="bg-white p-6 rounded-lg shadow-md">
                <CardHeader>
                  <CardTitle className="text-lg font-semibold">Office Information</CardTitle>
                </CardHeader>
                <CardContent className="grid grid-cols-2 gap-6 text-sm text-gray-600">
                  <div>
                    <p><strong>Job Title:</strong> {employee.job_title_id}</p>
                    <p><strong>Pay Grade:</strong> {employee.pay_grade_id}</p>
                    <p><strong>Status:</strong> {employee.status}</p>
                  </div>
                  <div>
                    <p><strong>Supervisor:</strong> {employee.supervisor_id || "N/A"}</p> {/* Assuming supervisor_id links to another employee */}
                    <p><strong>Department:</strong> {employee.department_id}</p>
                    <p><strong>Branch:</strong> {employee.branch_id}</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
