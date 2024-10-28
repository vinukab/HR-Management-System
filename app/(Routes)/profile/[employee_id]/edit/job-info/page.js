'use client';
import { useState, useEffect } from "react";
import axios from "axios";

export default function JobDetailsUpdater({ params, onSuccess }) {
  const employee_id = params.employee_id; 
  const [jobTitleId, setJobTitleId] = useState("");
  const [payGradeId, setPayGradeId] = useState("");
  const [supervisorId, setSupervisorId] = useState("");
  const [departmentId, setDepartmentId] = useState("");
  const [branchId, setBranchId] = useState("");

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [jobTitles, setJobTitles] = useState([]);
  const [payGrades, setPayGrades] = useState([]);
  const [supervisors, setSupervisors] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [branches, setBranches] = useState([]);
  const [updating, setUpdating] = useState(false); // New state for updating status

  // Fetch all enums and employee job details
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [
          jobTitlesResponse,
          payGradesResponse,
          supervisorsResponse,
          departmentsResponse,
          branchesResponse,
          employeeResponse,
        ] = await Promise.all([
          axios.get("http://localhost:5000/enum/job-titles",{withCredentials:true}),
          axios.get("http://localhost:5000/enum/pay-grades",{withCredentials:true}),
          axios.get("http://localhost:5000/enum/supervisors",{withCredentials:true}),
          axios.get("http://localhost:5000/enum/departments",{withCredentials:true}),
          axios.get("http://localhost:5000/enum/branches",{withCredentials:true}),
          axios.get(`http://localhost:5000/employee/${employee_id}/official`,{withCredentials:true}),
        ]);

        setJobTitles(jobTitlesResponse.data);
        setPayGrades(payGradesResponse.data);
        setSupervisors(supervisorsResponse.data);
        setDepartments(departmentsResponse.data);
        setBranches(branchesResponse.data);

        const employee = employeeResponse.data;
        setJobTitleId(employee.job_title_id);
        setPayGradeId(employee.pay_grade_id);
        setSupervisorId(employee.supervisor_id);
        setDepartmentId(employee.department_id);
        setBranchId(employee.branch_id);
      } catch (err) {
        setError(err.response?.data?.message || "Network or server issue");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [employee_id]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const updatedDetails = {
      employeeId: employee_id,
      jobTitleId,
      payGradeId,
      supervisorId,
      departmentId,
      branchId,
    };

    setUpdating(true); // Set updating to true

    try {
      const response = await axios.put(
        "http://localhost:5000/updateJobDetails",
        updatedDetails
      );
      console.log("Job details updated successfully:", response.data);
      if (onSuccess) {
        onSuccess(employee_id, 3); // Notify parent component of success
      }
    } catch (error) {
      setError(error.response?.data?.message || "Error updating job details.");
      console.error("Error updating job details:", error.response?.data || error.message);
    } finally {
      setUpdating(false); // Reset updating status
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="m-1 bg-white rounded-lg shadow-md">
      <form onSubmit={handleSubmit} className="p-5 w-full">
        <div className="grid grid-cols-1 gap-4">
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
        </div>

        {/* Submit Button */}
        <div className="flex justify-center mt-6">
          <button
            type="submit"
            className={`px-6 py-2 ${updating ? 'bg-gray-400' : 'bg-blue-600'} text-white rounded-md shadow hover:${updating ? '' : 'bg-blue-700'} focus:outline-none`}
            disabled={updating} // Disable button while updating
          >
            {updating ? 'Updating...' : 'Update Job Details'}
          </button>
        </div>
      </form>
    </div>
  );
}
