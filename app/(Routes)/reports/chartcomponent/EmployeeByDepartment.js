"use client";

import { useEffect, useState } from "react";
import { TrendingUp } from "lucide-react";
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
  ChartConfig,
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
        const response = await fetch('/api/employees-by-department');
        //const data = await response.json(); // Uncomment in production

        const data = [
          { department_name: 'HR', employee_count: 12 },
          { department_name: 'Engineering', employee_count: 35 },
          { department_name: 'Sales', employee_count: 22 },
          { department_name: 'Marketing', employee_count: 18 },
          { department_name: 'Finance', employee_count: 10 }
        ];
        
        setChartData(data); // Use fetched data or sample data
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
          <div style={{ width: '80%', height: '100%', margin: '0 auto' }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis
                  dataKey="department_name"
                  tickLine={false}
                  tickMargin={10}
                  axisLine={false}
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
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        {/* Additional footer content can be added here */}
      </CardFooter>
    </Card>
  );
}
