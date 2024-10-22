"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

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
    Hobbies_Traveling: 8,
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
    Hobbies_Traveling: 4,
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
    Hobbies_Traveling: 3,
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
    Hobbies_Traveling: 4,
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
    Hobbies_Traveling: 7,
  },
];

export default function CustomReportsField() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Department-wise Details</CardTitle>
        <CardDescription>Details of nationalities, blood groups, and hobbies by department</CardDescription>
      </CardHeader>
      <CardContent>
        <div style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr>
                <th>Department</th>
                <th>A+</th>
                <th>A-</th>
                <th>B+</th>
                <th>B-</th>
                <th>O+</th>
                <th>O-</th>
                <th>Indian</th>
                <th>Sri Lankan</th>
                <th>Bangladeshi</th>
                <th>Sports</th>
                <th>Reading</th>
                <th>Traveling</th>
              </tr>
            </thead>
            <tbody>
              {chartData.map((row, index) => (
                <tr key={index}>
                  <td>{row.department}</td>
                  <td>{row.A_Positive}</td>
                  <td>{row.A_Negative}</td>
                  <td>{row.B_Positive}</td>
                  <td>{row.B_Negative}</td>
                  <td>{row.O_Positive}</td>
                  <td>{row.O_Negative}</td>
                  <td>{row.Nationality_Indian}</td>
                  <td>{row.Nationality_SriLankan}</td>
                  <td>{row.Nationality_Bangladeshi}</td>
                  <td>{row.Hobbies_Sports}</td>
                  <td>{row.Hobbies_Reading}</td>
                  <td>{row.Hobbies_Traveling}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
      <CardFooter>
        {/* Additional footer content can go here if needed */}
      </CardFooter>
    </Card>
  );
}
