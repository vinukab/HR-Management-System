"use client";

import { useEffect, useState } from "react";
import { ResponsiveContainer, Bar, BarChart, CartesianGrid, XAxis, YAxis, Cell } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

export const description = "Employees by Department";

const chartConfig = {
  employee_count: {
    label: "Employees",
    color: "hsl(var(--chart-1))",
  },
};

export default function EmployeeByDepartment() {
  const [chartData, setChartData] = useState([]);

  // Fetch data from the backend
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:5000/a/emp-report', {
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
    <Card>
      <CardHeader>
        <CardTitle style={{ textAlign: 'center' }}>Employee by Department</CardTitle>
        <CardDescription style={{ textAlign: 'center' }}>Employees grouped by their department</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <div style={{ display: 'flex', justifyContent: 'space-between', margin: '0 auto' }}>
            <div style={{ width: '35%', height: '900px', overflow: 'auto' }}>
              <h3 className="text-center text-xl font-semibold mb-4">Employee Distribution Table</h3>
              <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-md">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="border border-gray-200 py-2 px-4 text-left">Department</th>
                    <th className="border border-gray-200 py-2 px-4 text-left">Number of Employees</th>
                  </tr>
                </thead>
                <tbody>
                  {chartData.map((department, index) => (
                    <tr key={index} className={index % 2 === 0 ? "bg-gray-50" : "bg-white"}>
                      <td className="border border-gray-200 py-2 px-4">{department.department_name}</td>
                      <td className="border border-gray-200 py-2 px-4">{department.employee_count}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div style={{ width: '60%', height: '600px' }}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis
                    dataKey="department_name"
                    tickLine={false}
                    tickMargin={10}
                    axisLine={false}
                    angle={-90}
                    textAnchor="end"
                    height={150}
                  />
                  <YAxis />
                  <ChartTooltip
                    cursor={false}
                    content={<ChartTooltipContent indicator="dashed" />}
                    
                  />
                  <Bar dataKey="employee_count" radius={4}>
                    {chartData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={['#243642', '#387478', '#629584', '#E2F1E7', '#ECDFCC'][index % 5]} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm"></CardFooter>
    </Card>
  );
}
