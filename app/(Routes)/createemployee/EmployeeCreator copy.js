import { useState, useEffect } from "react";
import axios from "axios";

export default function EmployeeCreator() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [maritalStatus, setMaritalStatus] = useState("single");
  const [NIC, setNIC] = useState("");
  const [address, setAddress] = useState("");
  const [status, setStatus] = useState("Permanent");
  const [leaveCountId, setLeaveCountId] = useState("");
  const [jobTitleId, setJobTitleId] = useState("");
  const [payGradeId, setPayGradeId] = useState("");
  const [supervisorId, setSupervisorId] = useState("");
  const [profilePic, setProfilePic] = useState("../default_profile.png");
  const [departmentId, setDepartmentId] = useState("");
  const [branchId, setBranchId] = useState("");
  const [gender, setGender] = useState('male');
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
          axios.get("http://localhost:5000/enum/job-titles"),
          axios.get("http://localhost:5000/enum/pay-grades"),
          axios.get("http://localhost:5000/enum/supervisors"),
          axios.get("http://localhost:5000/enum/departments"),
          axios.get("http://localhost:5000/enum/branches"),
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
    formData.append("gender", gender);

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
    } catch (error) {
      console.error("Error creating employee:", error.response?.data || error.message);
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>; <p>Error: {error}</p>;

  return (
    <div className="m-1 bg-white rounded-lg shadow-md">
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

      {/* Form Content in Two Columns */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
            <option value="Intern parttime">Intern Part-Time</option>
            <option value="Intern fulltime">Intern Full-Time</option>
            <option value="Contract parttime">Contract Part-Time</option>
            <option value="Contract fulltime">Contract Full-Time</option>
            <option value="Permanent">Permanent</option>
            <option value="Freelance">Freelance</option>
          </select>
        </div>
        {/* gender */}
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

        {/* Address */}
        <div className="col-span-2">
          <label className="block text-sm font-medium text-gray-700">Address</label>
          <textarea
            name="address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            required
          />
        </div>

        {/* Job Title */}
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
                {jobTitle.job_title_name}
              </option>
            ))}
          </select>
        </div>

        {/* Pay Grade */}
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

        {/* Supervisor */}
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

        {/* Department */}
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
                {department.department_name}
              </option>
            ))}
          </select>
        </div>

        {/* Branch */}
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
        {isUser && (
          <>
            <div>
              <label className="block text-sm font-medium text-gray-700">Username</label>
              <input
                type="text"
                name="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Password</label>
              <input
                type="password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
          </>
        )}
      </div>

      {/* Submit Button */}
      <div className="flex justify-center mt-6">
        <button
          type="submit"
          className="px-6 py-2 bg-blue-600 text-white rounded-md shadow hover:bg-blue-700 focus:outline-none"
        >
          Submit
        </button>
      </div>
    </div>
  </form>
</div>
  );  
}
