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
        const response = await fetch("http://localhost:5000/report/employees-grouped");
        const data = await response.json(); 

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
