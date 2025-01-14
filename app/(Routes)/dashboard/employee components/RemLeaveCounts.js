"use client"
import { useEffect, useState } from "react"
import { Bar, BarChart, CartesianGrid, LabelList, XAxis, YAxis } from "recharts"
import { TrendingUp } from "lucide-react"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
import axios from "axios"

export const description = "A bar chart showing the remaining leave types of employees"

const initialChartData = [                                                               
  { leaveType: "Annual", remaining: 0 },
  { leaveType: "Casual", remaining: 0 },
  { leaveType: "No-pay", remaining: 0 },
  { leaveType: "Maternity", remaining: 0 },
]

const chartConfig = {
  remaining: {
    label: "Remaining Leave",
    color: "#2563eb",
  },
  label: {
    color: "hsl(var(--background))",
  }
}

export function RemLeaveCounts() {

  const [chartData, setChartData] = useState(initialChartData)                                         
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  // Fetch leave data from the backend API
  useEffect(() => {
    const fetchLeaveCounts = async () => {
      try {
        setLoading(true)
        const response = await axios.get('http://localhost:5000/leave/leave-count',{withCredentials:true}); 
        const data = response.data

        // Update chart data with dynamic API data
        const updatedChartData = [
          { leaveType: "Annual", remaining: data.annual_leave_count },
          { leaveType: "Casual", remaining: data.casual_leave_count },
          { leaveType: "No-pay", remaining: data.nopay_leave_count },
          { leaveType: "Maternity", remaining: data.maternity_leave_count},
        ]
        setChartData(updatedChartData)
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    fetchLeaveCounts()
  }, [])

  if (loading) return <div>Loading...</div>
  if (error) return <div>Error: {error}</div>                                          

  return (
    <Card className="m-1 flex flex-col max-w-96 justify-center bg-gray-800 text-blue-400">
      <CardHeader>
        <CardTitle>Leave Types - Remaining Balance</CardTitle>
        <CardDescription  children className="text-gray-300">Current Leave Balances</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart
            data={chartData}
            layout="vertical"
            margin={{
              top: 5,
              right: 30,
              left: 0,
              bottom: 5,
            }}
            style={{ backgroundColor: "transparent" }} // Sets background to transparent to remove white border
          >
            <CartesianGrid horizontal={false} stroke="#4b5563" />
            <YAxis
              dataKey="leaveType"
              type="category"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              className="text-gray-300" // Light gray for better contrast with dark theme
            />
            <XAxis dataKey="remaining" type="number" tick={{ fill: "#0284c7" }} />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="line" />}
            />
            <Bar
              dataKey="remaining"
              layout="vertical"
              fill="#1d4ed8"
              radius={4}
            >
              <LabelList
                dataKey="leaveType"
                position="insideLeft"
                offset={8}
                className="fill-gray-200"
                fontSize={12}
              />
              <LabelList
                dataKey="remaining"
                position="right"
                offset={8}
                className="fill-gray-100"
                fontSize={12}
              />
            </Bar>
          </BarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="flex gap-2 font-medium leading-none">
          Advice <TrendingUp className="h-4 w-4" />
        </div>
        <div className="leading-none  text-gray-300">
          Please be mindful of your leave balance and plan your leave accordingly.
        </div>
      </CardFooter>
    </Card>
  )
}
