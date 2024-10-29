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
        const response = await fetch('http://localhost:5000/report/emp-report', {
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
    <Card className="h-full bg-gray-800 ">
      <CardHeader>
        <CardTitle className="text-blue-400 text-left">Employee by Department</CardTitle>
        <CardDescription className="text-gray-300 text-left">Employees grouped by their department</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <div style={{ display: 'flex', justifyContent: 'space-between'}}>
            <div style={{ width: '60%', height: '14rem' }}> {/* Adjusted height to h-56 */}
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData} barSize={40} barCategoryGap="5%">
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis
                    dataKey="department_name"
                    tickLine={false}
                    tickMargin={10}
                    axisLine={false}
                    hide={true}
                    tickFormatter={(value) => value.slice(0, 3)}
                  />
                  <YAxis height={50} />
                  <ChartTooltip
                    cursor={false}
                    content={<ChartTooltipContent indicator="dashed" />}
                  />
                  <Bar dataKey="employee_count" radius={10}>
                    {chartData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={['#60a5fa','#67e8f9' , '#93c5fd', '#22d3ee' , '#38bdf8'][index % 5]} />
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
