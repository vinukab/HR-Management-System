import { useState, useEffect } from "react";
import axios from "axios";

export default function JobDetailsUpdater({ onSuccess, employee_id }) {
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
          axios.get("http://localhost:5000/enum/job-titles",{ withCredentials: true }),
          axios.get("http://localhost:5000/enum/pay-grades",{ withCredentials: true }),
          axios.get("http://localhost:5000/enum/supervisors",{ withCredentials: true }),
          axios.get("http://localhost:5000/enum/departments",{ withCredentials: true }),
          axios.get("http://localhost:5000/enum/branches",{ withCredentials: true })
        ]);

        setJobTitles(jobTitlesResponse.data);
        setPayGrades(payGradesResponse.data);
        setSupervisors(supervisorsResponse.data);
        setDepartments(departmentsResponse.data);
        setBranches(branchesResponse.data);

        // Set default values
        setJobTitleId(jobTitlesResponse.data[0]?.job_title_id || "");
        setPayGradeId(payGradesResponse.data[0]?.pay_grade_id || "");
        setSupervisorId(supervisorsResponse.data[0]?.employee_id || "");
        setDepartmentId(departmentsResponse.data[0]?.department_id || "");
        setBranchId(branchesResponse.data[0]?.branch_id || "");
      } catch (err) {
        setError(err.response?.data?.message || "Network or server issue");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

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
    console.log(updatedDetails);
    try {
      const response = await axios.put(
        "http://localhost:5000/updateJobDetails", // Adjust URL as needed
        updatedDetails,{ withCredentials: true }
      );
      console.log("Job details updated successfully:", response.data);
      onSuccess(employee_id, 3);
    } catch (error) {
      console.error("Error updating job details:", error.response?.data || error.message);
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
            className="px-6 py-2 bg-blue-600 text-white rounded-md shadow hover:bg-blue-700 focus:outline-none"
          >
            Update Job Details
          </button>
        </div>
      </form>
    </div>
  );
}
