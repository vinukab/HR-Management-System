import { useState, useEffect } from "react";
import axios from "axios";
import classNames from "classnames";

export default function CreateEmployee() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [maritalStatus, setMaritalStatus] = useState("single");
  const [NIC, setNIC] = useState("");
  const [address, setAddress] = useState("");
  const [status, setStatus] = useState("active");
  const [leaveCountId, setLeaveCountId] = useState("");
  const [jobTitleId, setJobTitleId] = useState("");
  const [payGradeId, setPayGradeId] = useState("");
  const [supervisorId, setSupervisorId] = useState("");
  const [profilePic, setProfilePic] = useState("../default_profile.png");
  const [departmentId, setDepartmentId] = useState("");
  const [branchId, setBranchId] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isUser, setIsUser] = useState(false);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [jobTitles, setJobTitles] = useState([]);
  const [payGrades, setPayGrades] = useState([]);
  const [supervisors, setSupervisors] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [branches, setBranches] = useState([]);

  const toggleIsUser = () => {setIsUser(!isUser)};

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [
          jobTitlesResponse,
          payGradesResponse,
          supervisorsResponse,
          departmentsResponse,
          branchesResponse,
        ] = await Promise.all([
          axios.get("http://localhost:5000/getjobTitles"),
          axios.get("http://localhost:5000/getpayGrades"),
          axios.get("http://localhost:5000/getsupervisors"),
          axios.get("http://localhost:5000/getdepartments"),
          axios.get("http://localhost:5000/getbranches"),
        ]);

        setJobTitles(jobTitlesResponse.data);
        setPayGrades(payGradesResponse.data);
        setSupervisors(supervisorsResponse.data);
        setDepartments(departmentsResponse.data);
        setBranches(branchesResponse.data);

        setJobTitleId(jobTitlesResponse.data[0].job_title_id);
        setPayGradeId(payGradesResponse.data[0].pay_grade_id);
        setSupervisorId(supervisorsResponse.data[0].employee_id);
        setDepartmentId(departmentsResponse.data[0].department_id);
        setBranchId(branchesResponse.data[0].branch_id);
      } catch (err) {
        setError(err.response?.data?.message || "Network or server issue");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleProfilePicChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfilePic(URL.createObjectURL(file));
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
    formData.append("jobTitleId", jobTitleId);
    formData.append("payGradeId", payGradeId);
    formData.append("supervisorId", supervisorId);
    formData.append("departmentId", departmentId);
    formData.append("branchId", branchId);

    if (document.getElementById("upload").files[0]) {
      formData.append("profilePic", document.getElementById("upload").files[0]);
    }

    try {
      const response = await axios.post(
        "http://localhost:5000/createEmployee",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log("Employee created:", response.data);
    } catch (error) {
      console.error("Error creating employee:", error.response?.data || error.message);
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>; <p>Error: {error}</p>;

  return (
    <div className="m-1 bg-white rounded-lg shadow-md">
      <form onSubmit={handleSubmit} className="p-5 w-full">
        <div className="grid grid-cols-3 gap-4">
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
            <textarea
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
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
          </div>
  
          {/* Job Title ID */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Job Title</label>
            <select
              name="jobTitleId"
              value={jobTitleId}
              onChange={(e) => setJobTitleId(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              required
            >
              {jobTitles.map((jobTitle) => (
                <option key={jobTitle.job_title_id} value={jobTitle.job_title_id}>
                  {jobTitle.name}
                </option>
              ))}
            </select>
          </div>
  
          {/* Pay Grade ID */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Pay Grade</label>
            <select
              name="payGradeId"
              value={payGradeId}
              onChange={(e) => setPayGradeId(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              required
            >
              {payGrades.map((payGrade) => (
                <option key={payGrade.pay_grade_id} value={payGrade.pay_grade_id}>
                  {payGrade.grade}
                </option>
              ))}
            </select>
          </div>
  
          {/* Supervisor ID */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Supervisor</label>
            <select
              name="supervisorId"
              value={supervisorId}
              onChange={(e) => setSupervisorId(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              required
            >
              {supervisors.map((supervisor) => (
                <option key={supervisor.employee_id} value={supervisor.employee_id}>
                  {supervisor.username}
                </option>
              ))}
            </select>
          </div>
  
          {/* Department ID */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Department</label>
            <select
              name="departmentId"
              value={departmentId}
              onChange={(e) => setDepartmentId(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              required
            >
              {departments.map((department) => (
                <option key={department.department_id} value={department.department_id}>
                  {department.name}
                </option>
              ))}
            </select>
          </div>
  
          {/* Branch ID */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Branch</label>
            <select
              name="branchId"
              value={branchId}
              onChange={(e) => setBranchId(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              required
            >
              {branches.map((branch) => (
                <option key={branch.branch_id} value={branch.branch_id}>
                  {branch.branch_name}
                </option>
              ))}
            </select>
          </div>
  
          {/* User account creation */}
          <div className={classNames({ "hidden": !isUser, "block text-sm font-medium text-gray-700": true })}>
            <label className="block text-sm font-medium text-gray-700">Username</label>
            <input
              type="text"
              name="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              required
            />
          </div>
  
          <div className={classNames({ "hidden": !isUser, "block text-sm font-medium text-gray-700": true })}>
            <label className="block text-sm font-medium text-gray-700">Password</label>
            <input
              type="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              required
            />
          </div>
  
          <div>
            <input type="checkbox" id="isUser" name="isUser" checked={isUser} onChange={toggleIsUser} />
            <label htmlFor="isUser">Create a user account</label>
          </div>
  
          {/* Submit Button */}
          <div>
            <button
              type="submit"
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Create Employee
            </button>
          </div>
        </div>
      </form>
    </div>
  );  
}
