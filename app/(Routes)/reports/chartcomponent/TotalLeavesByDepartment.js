"use client";

import { useEffect, useState } from "react";
import { TrendingUp } from "lucide-react";
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

const chartConfig = {
  HR: {
    label: "HR",
    color: "#5B99C2",
  },
  Engineering: {
    label: "Engineering",
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
        const response = await fetch("/api/leaves-by-department");
        // const data = await response.json(); // Uncomment for real data
        const data = [
          { month: "January", HR: 12, Engineering: 30, Sales: 25 },
          { month: "February", HR: 10, Engineering: 40, Sales: 20 },
          { month: "March", HR: 8, Engineering: 35, Sales: 30 },
          { month: "April", HR: 15, Engineering: 25, Sales: 22 },
          { month: "May", HR: 18, Engineering: 28, Sales: 35 },
          { month: "June", HR: 20, Engineering: 32, Sales: 27 },
        ];

        setChartData(data);
      } catch (error) {
        console.error("Error fetching chart data:", error);
      }
    };
    fetchData();
  }, []);

  return (
    <Card>
      <CardHeader>
        <CardTitle style={{ textAlign: "center" }}>Total Leaves by Department</CardTitle>
        <CardDescription style={{ textAlign: "center" }}>
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
                  dataKey="month"
                  tickLine={false}
                  axisLine={false}
                  tickMargin={8}
                  tickFormatter={(value) => value.slice(0, 3)}
                />
                <YAxis />
                <ChartTooltip
                  cursor={false}
                  content={<ChartTooltipContent indicator="dot" />}
                />
                <Area
                  dataKey="HR"
                  type="natural"
                  fill="#5B99C2"
                  //fillOpacity={0.4}
                  stroke="#5B99C2"
                  stackId="a"
                />
                <Area
                  dataKey="Engineering"
                  type="natural"
                  fill="#E1D7B7"
                  //fillOpacity={1}
                  stroke="#E1D7B7"
                  stackId="a"
                />
                <Area
                  dataKey="Sales"
                  type="natural"
                  fill="#982B1C"
                  //fillOpacity={0.4}
                  stroke="#982B1C"
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
            {/* <div className="flex items-center gap-2 font-medium leading-none">
              Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
            </div> */}
            {/* <div className="flex items-center gap-2 leading-none text-muted-foreground">
              January - June 2024
            </div> */}
          </div>
        </div>
      </CardFooter>
    </Card>
  );
}
