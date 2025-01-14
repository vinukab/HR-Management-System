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

export default function CustomReportsField() {
  const [chartData, setChartData] = useState([]);

  // Fetch data from the backend
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:5000/report/emp-stats', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
          },
        });
        const data = await response.json();
        setChartData(data);
      } catch (error) {
        console.error('Error fetching chart data:', error);
      }
    };
    fetchData();
  }, []);

  return (
    <Card className=" bg-gray-800 ">
      <CardHeader >
        <CardTitle className="text-blue-400 text-left">Department-wise Details</CardTitle>
        <CardDescription className="text-gray-300 text-left">Details of nationalities, blood groups, and hobbies by department</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <table className="min-w-full table-auto border-separate border-spacing-0 text-left ">
            <thead className="bg-gray-700 text-gray-300">
              {/* Grouped Headers */}
              <tr>
                <th className="px-4 py-2 border-b border-gray-400 border-r border-l border-t rounded-tl-md" rowSpan="2">Department</th>
                <th className="px-4 py-2 border-b border-gray-400 border-r text-center border-t" colSpan="6">Blood Types</th>
                <th className="px-4 py-2 border-b border-gray-400 border-r text-center border-t" colSpan="3">Nationalities</th>
                <th className="px-4 py-2 border-b border-gray-400 border-r text-center border-t rounded-tr-md" colSpan="3">Hobbies</th>
              </tr>
              {/* Sub-Headers for Blood Types, Nationalities, and Hobbies */}
              <tr className="bg-gray-700">
                <th className="px-4 py-2 border-b border-gray-400 border-r">A+</th>
                <th className="px-4 py-2 border-b border-gray-400 border-r">A-</th>
                <th className="px-4 py-2 border-b border-gray-400 border-r">B+</th>
                <th className="px-4 py-2 border-b border-gray-400 border-r">B-</th>
                <th className="px-4 py-2 border-b border-gray-400 border-r" >O+</th>
                <th className="px-4 py-2 border-b border-gray-400 border-r">O-</th>
                <th className="px-4 py-2 border-b border-gray-400 border-r">Pakistani</th>
                <th className="px-4 py-2 border-b border-gray-400 border-r">Sri Lankan</th>
                <th className="px-4 py-2 border-b border-gray-400 border-r">Bangladeshi</th>
                <th className="px-4 py-2 border-b border-gray-400 border-r ">Sports</th>
                <th className="px-4 py-2 border-b border-gray-400 border-r">Reading</th>
                <th className="px-4 py-2 border-b border-gray-400 border-r">Traveling</th>
              </tr>
            </thead>
            <tbody>
              {chartData.map((row, index) => (
                <tr key={index} className={`hover:bg-gray-200 ${index % 2 === 0 ? 'bg-gray-100' : 'bg-gray-50'}`}>
                  <td className="px-4 py-2 border-b border-gray-300 border-l border-r">{row.department}</td>
                  <td className="px-4 py-2 border-b border-gray-300 text-center first-line: border-r">{row.A_Positive}</td>
                  <td className="px-4 py-2 border-b border-gray-300 text-center border-r">{row.A_Negative}</td>
                  <td className="px-4 py-2 border-b border-gray-300 text-center border-r">{row.B_Positive}</td>
                  <td className="px-4 py-2 border-b border-gray-300 text-center border-r">{row.B_Negative}</td>
                  <td className="px-4 py-2 border-b border-gray-300 text-center border-r">{row.O_Positive}</td>
                  <td className="px-4 py-2 border-b border-gray-300 border-r text-center">{row.O_Negative}</td>
                  <td className="px-4 py-2 border-b border-gray-300 text-center border-r">{row.Pakistani}</td>
                  <td className="px-4 py-2 border-b border-gray-300 text-center border-r">{row.SriLankan}</td>
                  <td className="px-4 py-2 border-b border-gray-300 border-r text-center">{row.Bangladeshi}</td>
                  <td className="px-4 py-2 border-b border-gray-300 text-center border-r">{row.Hobbies_Sports}</td>
                  <td className="px-4 py-2 border-b border-gray-300 text-center border-r">{row.Hobbies_Reading}</td>
                  <td className="px-4 py-2 border-b border-gray-300 text-center border-r">{row.Hobbies_Traveling}</td>
                </tr>
              ))}
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
