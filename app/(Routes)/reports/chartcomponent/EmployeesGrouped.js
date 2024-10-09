"use client";

import { useEffect, useState } from "react";
import { TrendingUp } from "lucide-react";
import { PolarAngleAxis, PolarGrid, Radar, RadarChart, ResponsiveContainer } from "recharts";

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

export const description = "Employee Reports Grouped by Job Title, Department, and Pay Grade";

const chartConfig = {
  job_title: {
    label: "Job Title",
    color: "hsl(var(--chart-1))",
  },
  department: {
    label: "Department",
    color: "hsl(var(--chart-2))",
  },
  pay_grade: {
    label: "Pay Grade",
    color: "hsl(var(--chart-3))",
  },
};

export default function EmployeesGrouped() {
  const [chartData, setChartData] = useState([]);

  // Fetch data from the backend
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/api/employees-grouped");
        // const data = await response.json(); // Uncomment in production

        const data = [
          { label: "HR", job_title: 15, department: 12, pay_grade: 5 },
          { label: "Engineering", job_title: 40, department: 35, pay_grade: 10 },
          { label: "Sales", job_title: 25, department: 22, pay_grade: 12 },
          { label: "Marketing", job_title: 20, department: 18, pay_grade: 8 },
          { label: "Finance", job_title: 12, department: 10, pay_grade: 4 },
        ];

        setChartData(data); // Use fetched data or sample data
      } catch (error) {
        console.error("Error fetching chart data:", error);
      }
    };
    fetchData();
  }, []);

  return (
    <Card>
      <CardHeader>
        <CardTitle style={{ textAlign: "center" }}>Employee Reports</CardTitle>
        <CardDescription style={{ textAlign: "center" }}>
          Grouped by Job Title, Department, and Pay Grade
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <div style={{ width: "80%", height: "100%", margin: "0 auto" }}>
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart data={chartData}>
                <PolarGrid />
                <PolarAngleAxis dataKey="label" />
                <Radar
                  dataKey="job_title"
                  stroke="#F3C623"
                  fill="#F3C623"
                />
                <Radar
                  dataKey="department"
                  stroke="#10375C"
                  fill="#10375C"
                />
                <Radar
                  dataKey="pay_grade"
                  stroke="#FF6500"
                  fill="#FF6500"  
                />
                <ChartTooltip
                  cursor={false}
                  content={<ChartTooltipContent indicator="line" />}
                />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
