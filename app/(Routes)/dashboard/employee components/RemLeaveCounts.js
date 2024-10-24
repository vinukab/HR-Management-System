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
    color: "hsl(var(--chart-1))",
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
        console.log(data)
        // Update chart data with dynamic API data
        const updatedChartData = [
          { leaveType: "Annual", remaining: data.annual_leave_count },
          { leaveType: "Casual", remaining: data.casual_leave_count },
          { leaveType: "No-pay", remaining: data.nopay_leave_count },
          { leaveType: "Maternity", remaining: data.maternity_leave_count },
           
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
    <Card className="m-1 flex flex-col max-w-96 justify-center">
      <CardHeader>
        <CardTitle>Leave Types - Remaining Balance</CardTitle>
        <CardDescription>Current Leave Balances</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart
            data={chartData}
            layout="vertical"
            margin={{
              right: 30,
            }}
          >
            <CartesianGrid horizontal={false} />
            <YAxis
              dataKey="leaveType"
              type="category"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => value}
              hide
            />
            <XAxis dataKey="remaining" type="number" hide />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="line" />}
            />
            <Bar
              dataKey="remaining"
              layout="vertical"
              fill="var(--color-remaining)"
              radius={4}
            >
              <LabelList
                dataKey="leaveType"
                position="insideLeft"
                offset={8}
                className="fill-[--color-label]"
                fontSize={12}
              />
              <LabelList
                dataKey="remaining"
                position="right"
                offset={8}
                className="fill-foreground"
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
        <div className="leading-none text-muted-foreground">
          Please be mindful of your leave balance and plan your leave accordingly.
        </div>
      </CardFooter>
    </Card>
  )
}
