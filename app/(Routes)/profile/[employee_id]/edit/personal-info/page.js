'use client';
import { useState, useEffect } from "react";
import axios from "axios";
import SideBar from "../../../../../layouts/Sidebar";

export default function UpdatePersonalDetails({ params }) {
  const employeeId = params.employee_id;
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [maritalStatus, setMaritalStatus] = useState("single");
  const [NIC, setNIC] = useState("");
  const [address, setAddress] = useState("");
  const [status, setStatus] = useState("Permanent");
  const [gender, setGender] = useState("male");
  const [profilePic, setProfilePic] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [file, setFile] = useState(null);

  useEffect(() => {
    const fetchEmployeeData = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/employee/${employeeId}/personal`);
        const employee = response.data;

        setFirstName(employee.first_name);
        setLastName(employee.last_name);
        setBirthDate(employee.birth_date.split("T")[0]);
        setMaritalStatus(employee.marital_status);
        setNIC(employee.NIC_number);
        setAddress(employee.address);
        setGender(employee.gender);
        setProfilePic(employee.profile_pic);
      } catch (err) {
        setError(err.response?.data?.message || "Network or server issue");
      } finally {
        setLoading(false);
      }
    };

    fetchEmployeeData();
  }, [employeeId]);

  const handleProfilePicChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      setProfilePic(URL.createObjectURL(selectedFile));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("firstName", firstName);
    formData.append("lastName", lastName);
    formData.append("birthDate", birthDate);
    formData.append("maritalStatus", maritalStatus);
    formData.append("NIC", NIC);
    formData.append("address", address);
    formData.append("status", status);
    formData.append("gender", gender);

    if (file) {
      formData.append("profilePic", file);
    }

    try {
      await axios.put(`http://localhost:5000/employee/${employeeId}/personal`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      alert("Employee details updated successfully!");
      setError(""); // Clear previous errors on successful update
    } catch (err) {
      setError(err.response?.data?.message || "Failed to update employee details");
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="text-red-500">Error: {error}</p>;

  return (
    <>
    <SideBar activePanel={2}/>
    <div className="m-1 bg-white rounded-lg shadow-md ml-56">
      <form onSubmit={handleSubmit} className="p-5 w-full">
        <div className="flex flex-col">
          {/* Profile Picture */}
          <div className="row-span-4 flex flex-col items-center space-y-4">
            <div
              className="w-72 h-72 m-5 rounded-full bg-gray-300 bg-cover bg-center cursor-pointer"
              style={{ backgroundImage: `url(${profilePic})` }}
              onClick={() => document.getElementById("upload").click()}
            />
            <input
              type="file"
              id="upload"
              accept="image/*"
              className="hidden"
              onChange={handleProfilePicChange}
            />
          </div>

          {/* Form Content */}
          <div className="grid grid-cols-1 gap-4">
            {/* First Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700">First Name</label>
              <input
                type="text"
                name="firstName"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                required
              />
            </div>

            {/* Last Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700">Last Name</label>
              <input
                type="text"
                name="lastName"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                required
              />
            </div>

            {/* Birth Date */}
            <div>
              <label className="block text-sm font-medium text-gray-700">Birth Date</label>
              <input
                type="date"
                name="birthDate"
                value={birthDate}
                onChange={(e) => setBirthDate(e.target.value)}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                required
              />
            </div>

            {/* Marital Status */}
            <div>
              <label className="block text-sm font-medium text-gray-700">Marital Status</label>
              <select
                name="maritalStatus"
                value={maritalStatus}
                onChange={(e) => setMaritalStatus(e.target.value)}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                required
              >
                <option value="single">Single</option>
                <option value="married">Married</option>
                <option value="divorced">Divorced</option>
                <option value="widowed">Widowed</option>
              </select>
            </div>

            {/* NIC Number */}
            <div>
              <label className="block text-sm font-medium text-gray-700">NIC Number</label>
              <input
                type="text"
                name="NIC"
                value={NIC}
                onChange={(e) => setNIC(e.target.value)}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                required
              />
            </div>

            {/* Address */}
            <div>
              <label className="block text-sm font-medium text-gray-700">Address</label>
              <input
                type="text"
                name="address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                required
              />
            </div>

            {/* Status */}
            <div>
              <label className="block text-sm font-medium text-gray-700">Status</label>
              <select
                name="status"
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                required
              >
                <option value="Permanent">Permanent</option>
                <option value="Contract">Contract</option>
                <option value="Probation">Probation</option>
              </select>
            </div>

            {/* Gender */}
            <div>
              <label className="block text-sm font-medium text-gray-700">Gender</label>
              <select
                name="gender"
                value={gender}
                onChange={(e) => setGender(e.target.value)}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                required
              >
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>
            </div>
          </div>

          {/* Submit Button */}
          <div className="mt-4">
            <button
              type="submit"
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 px-4 rounded"
            >
              Update Details
            </button>
          </div>
        </div>
      </form>
    </div>
    </>
  );
}
