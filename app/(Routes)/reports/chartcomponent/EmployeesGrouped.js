"use client";

import { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function EmployeeDepartmentTable() {
  const [data, setData] = useState([]);

  // Fetch data from the backend
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:5000/report/employees-grouped");
        const result = await response.json();
        setData(result);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  // Get unique departments, job titles, and pay grades
  const departments = [...new Set(data.map(item => item.department_name))];
  const jobTitles = [...new Set(data.map(item => item.job_title_name))];
  const payGrades = [...new Set(data.map(item => item.pay_grade))];

  return (
    <Card className="h-full  bg-gray-800 ">
      <CardHeader>
        <CardTitle className="text-blue-400 text-left">Employee Department Table</CardTitle>
        <CardDescription className="text-gray-300 text-left">
          Displays the number of employees grouped by Job Title and Pay Grade per Department
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-full  bg-white rounded">
          <table className="min-w-full table-auto border-separate border-spacing-0 text-left">
            <thead className="bg-gray-700 text-gray-300">
              <tr>
                <th rowSpan="2" className="px-4 py-2 border border-gray-400  rounded-tl-md">Department</th>
                <th colSpan={jobTitles.length} className="px-4 py-2 border border-gray-400  text-center">Job Titles</th>
                <th colSpan={payGrades.length} className="px-4 py-2 border border-gray-400  text-center rounded-tr-md">Pay Grades</th>
              </tr>
              <tr >
                {jobTitles.map((title, index) => (
                  <th key={index} className="px-4 py-2 border border-gray-400 bg-gray-700 text-gray-300">{title}</th>
                ))}
                {payGrades.map((grade, index) => (
                  <th key={index} className="px-4 py-2 border border-gray-400 bg-gray-700 text-gray-300">{grade}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {departments.map((department) => {
                const departmentData = data.filter(item => item.department_name === department);
                const jobTitleCounts = jobTitles.map(jobTitle => {
                  const jobTitleData = departmentData.find(item => item.job_title_name === jobTitle);
                  return jobTitleData ? jobTitleData.employee_count : 0;
                });
                const payGradeCounts = payGrades.map(payGrade => {
                  const payGradeData = departmentData.find(item => item.pay_grade === payGrade);
                  return payGradeData ? payGradeData.employee_count : 0;
                });

                return (
                  <tr key={department} className="hover:bg-gray-200">
                    <td className="border border-gray-400 px-4 py-2">{department}</td>
                    {jobTitleCounts.map((count, index) => (
                      <td key={`job-${index}`} className="border border-gray-400 px-4 py-2 text-center">
                        {count}
                      </td>
                    ))}
                    {payGradeCounts.map((count, index) => (
                      <td key={`grade-${index}`} className="border border-gray-400 px-4 py-2 text-center">
                        {count}
                      </td>
                    ))}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </CardContent>
      <CardFooter className="text-sm text-gray-500">
        {/* Optional footer content */}
      </CardFooter>
    </Card>
  );
}
