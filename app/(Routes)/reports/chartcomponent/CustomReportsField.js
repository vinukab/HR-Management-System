"use client"

import { Bar, BarChart, CartesianGrid, XAxis, YAxis, Tooltip, Legend } from "recharts"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"

export const description = "A stacked bar chart with a legend"

// Sample chart data with nationalities, blood groups, and hobbies
const chartData = [
  { 
    department: "HR", 
    A_Positive: 10, 
    A_Negative: 5, 
    B_Positive: 3, 
    B_Negative: 2, 
    O_Positive: 6, 
    O_Negative: 4, 
    Nationality_Indian: 8, 
    Nationality_SriLankan: 7, 
    Nationality_Bangladeshi: 5, 
    Hobbies_Sports: 6, 
    Hobbies_Reading: 4, 
    Hobbies_Traveling: 8 
  },
  { 
    department: "IT", 
    A_Positive: 12, 
    A_Negative: 7, 
    B_Positive: 4, 
    B_Negative: 1, 
    O_Positive: 3, 
    O_Negative: 2, 
    Nationality_Indian: 9, 
    Nationality_SriLankan: 5, 
    Nationality_Bangladeshi: 3, 
    Hobbies_Sports: 5, 
    Hobbies_Reading: 3, 
    Hobbies_Traveling: 4 
  },
  { 
    department: "Sales", 
    A_Positive: 5, 
    A_Negative: 3, 
    B_Positive: 2, 
    B_Negative: 1, 
    O_Positive: 4, 
    O_Negative: 2, 
    Nationality_Indian: 4, 
    Nationality_SriLankan: 3, 
    Nationality_Bangladeshi: 2, 
    Hobbies_Sports: 4, 
    Hobbies_Reading: 2, 
    Hobbies_Traveling: 3 
  },
  { 
    department: "Marketing", 
    A_Positive: 8, 
    A_Negative: 4, 
    B_Positive: 3, 
    B_Negative: 2, 
    O_Positive: 5, 
    O_Negative: 3, 
    Nationality_Indian: 7, 
    Nationality_SriLankan: 4, 
    Nationality_Bangladeshi: 3, 
    Hobbies_Sports: 7, 
    Hobbies_Reading: 5, 
    Hobbies_Traveling: 4 
  },
  { 
    department: "Finance", 
    A_Positive: 11, 
    A_Negative: 6, 
    B_Positive: 5, 
    B_Negative: 3, 
    O_Positive: 7, 
    O_Negative: 4, 
    Nationality_Indian: 8, 
    Nationality_SriLankan: 5, 
    Nationality_Bangladeshi: 2, 
    Hobbies_Sports: 9, 
    Hobbies_Reading: 4, 
    Hobbies_Traveling: 7 
  },
];

const chartConfig = {
  A_Positive: {
    label: "A+",
    color: "#FF6384", // Red
  },
  A_Negative: {
    label: "A-",
    color: "#36A2EB", // Blue
  },
  B_Positive: {
    label: "B+",
    color: "#FFCE56", // Yellow
  },
  B_Negative: {
    label: "B-",
    color: "#4BC0C0", // Teal
  },
  O_Positive: {
    label: "O+",
    color: "#9966FF", // Purple
  },
  O_Negative: {
    label: "O-",
    color: "#FF9F40", // Orange
  },
  Nationality_Indian: {
    label: "Indian",
    color: "#FF5733", // Coral
  },
  Nationality_SriLankan: {
    label: "Sri Lankan",
    color: "#C70039", // Crimson
  },
  Nationality_Bangladeshi: {
    label: "Bangladeshi",
    color: "#900C3F", // Dark Red
  },
  Hobbies_Sports: {
    label: "Sports",
    color: "#581845", // Dark Purple
  },
  Hobbies_Reading: {
    label: "Reading",
    color: "#FFC300", // Gold
  },
  Hobbies_Traveling: {
    label: "Traveling",
    color: "#DAF7A6", // Light Green
  },
};

export default function CustomReportsField() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Stacked Bar Chart - Nationalities, Blood Groups, and Hobbies</CardTitle>
        <CardDescription>Department-wise details of nationalities, blood groups, and hobbies</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} />
            <XAxis dataKey="department" tickLine={false} axisLine={false} tickMargin={10} />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="A_Positive" stackId="a" fill={chartConfig.A_Positive.color} />
            <Bar dataKey="A_Negative" stackId="a" fill={chartConfig.A_Negative.color} />
            <Bar dataKey="B_Positive" stackId="a" fill={chartConfig.B_Positive.color} />
            <Bar dataKey="B_Negative" stackId="a" fill={chartConfig.B_Negative.color} />
            <Bar dataKey="O_Positive" stackId="a" fill={chartConfig.O_Positive.color} />
            <Bar dataKey="O_Negative" stackId="a" fill={chartConfig.O_Negative.color} />
            <Bar dataKey="Nationality_Indian" stackId="b" fill={chartConfig.Nationality_Indian.color} />
            <Bar dataKey="Nationality_SriLankan" stackId="b" fill={chartConfig.Nationality_SriLankan.color} />
            <Bar dataKey="Nationality_Bangladeshi" stackId="b" fill={chartConfig.Nationality_Bangladeshi.color} />
            <Bar dataKey="Hobbies_Sports" stackId="c" fill={chartConfig.Hobbies_Sports.color} />
            <Bar dataKey="Hobbies_Reading" stackId="c" fill={chartConfig.Hobbies_Reading.color} />
            <Bar dataKey="Hobbies_Traveling" stackId="c" fill={chartConfig.Hobbies_Traveling.color} />
          </BarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
       
      </CardFooter>
    </Card>
  );
}
