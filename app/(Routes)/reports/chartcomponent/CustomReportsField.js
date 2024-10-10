"use client";

import { TrendingUp } from "lucide-react";
import { Bar, BarChart, CartesianGrid, XAxis, YAxis, Tooltip, Legend } from "recharts";

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

export const description = "A multiple bar chart categorized by department";

const chartData = [
  { department: "HR", nationality: 12, blood_group: 5, hobbies: 8 },
  { department: "Engineering", nationality: 35, blood_group: 18, hobbies: 20 },
  { department: "Sales", nationality: 22, blood_group: 9, hobbies: 14 },
  { department: "Marketing", nationality: 18, blood_group: 7, hobbies: 12 },
  { department: "Finance", nationality: 10, blood_group: 4, hobbies: 6 },
];

const chartConfig = {
  nationality: {
    label: "Nationality",
    color: "hsl(var(--chart-1))",
  },
  blood_group: {
    label: "Blood Group",
    color: "hsl(var(--chart-2))",
  },
  hobbies: {
    label: "Hobbies",
    color: "hsl(var(--chart-3))",
  },
} ;

export default function CustomReportsField() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Bar Chart - Multiple Categories</CardTitle>
        <CardDescription>Department-wise details of Nationality, Blood Group, and Hobbies</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} />
            <XAxis dataKey="department" tickLine={false} axisLine={false} tickMargin={10} />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="nationality" fill="var(--color-nationality)" radius={4} />
            <Bar dataKey="blood_group" fill="var(--color-blood_group)" radius={4} />
            <Bar dataKey="hobbies" fill="var(--color-hobbies)" radius={4} />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
