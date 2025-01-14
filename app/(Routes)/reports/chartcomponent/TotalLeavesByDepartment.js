"use client";

import { useEffect, useState } from "react";
import { Area, AreaChart, CartesianGrid, XAxis, YAxis, ResponsiveContainer } from "recharts";

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

export const description = "A stacked area chart for total leaves by department";

// Month names array to format the X-axis labels
const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

// Update chartConfig to match your departments
const chartConfig = {
  Finance: {
    label: "Finance",
    color: "#5B99C2",
  },
  "Information Technology": {
    label: "Information Technology",
    color: "#E1D7B7",
  },
  Sales: {
    label: "Sales",
    color: "#982B1C",
  },
};

export default function TotalLeavesByDepartment() {
  const [chartData, setChartData] = useState([]);

  // Fetch data from the backend
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:5000/report/department-leaves", {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
          },
        });
        
        const data = await response.json(); 
        setChartData(data);
      } catch (error) {
        console.error("Error fetching chart data:", error);
      }
    };
    fetchData();
  }, []);

  return (
    <Card className="h-full bg-gray-800 ">
      <CardHeader>
        <CardTitle className="text-blue-400 text-left">Total Leaves by Department</CardTitle>
        <CardDescription className="text-gray-300 text-left">
          Total leaves taken by department over the last 6 months
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <div style={{ width: "80%", height: "110%", margin: "0 auto" }}>
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart
                data={chartData}
                margin={{
                  left: 12,
                  right: 12,
                }}
              >
                <CartesianGrid vertical={false} />
                <XAxis
                  dataKey="month"  // Assuming month is represented as a number (1-12)
                  tickLine={false}
                  axisLine={false}
                  tickMargin={8}
                  tickFormatter={(value) => monthNames[value - 1]}  // Convert month number to abbreviation
                />
                <YAxis />
                <ChartTooltip
                  cursor={false}
                  content={<ChartTooltipContent indicator="dot" />}
                />
                <Area
                  dataKey="Finance"
                  type="natural"
                  fill={chartConfig.Finance.color}
                  stroke={chartConfig.Finance.color}
                  stackId="a"
                />
                <Area
                  dataKey="Information Technology"
                  type="natural"
                  fill={chartConfig["Information Technology"].color}
                  stroke={chartConfig["Information Technology"].color}
                  stackId="a"
                />
                <Area
                  dataKey="Sales"
                  type="natural"
                  fill={chartConfig.Sales.color}
                  stroke={chartConfig.Sales.color}
                  stackId="a"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </ChartContainer>
      </CardContent>
      <CardFooter>
        <div className="flex w-full items-start gap-2 text-sm">
          <div className="grid gap-2">
            {/* Additional footer content can be added here */}
          </div>
        </div>
      </CardFooter>
    </Card>
  );
}
