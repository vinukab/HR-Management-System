"use client"
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

export const description = "A bar chart showing the remaining leave types of employees"

const chartData = [
  { leaveType: "Annual", remaining: 15 },
  { leaveType: "Sick", remaining: 5 },
  { leaveType: "Casual", remaining: 10 },
  { leaveType: "Maternity", remaining: 12 },
  { leaveType: "Paternity", remaining: 8 },
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
              right: 16,
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
          Plesae be mindful of your leave balance and plan your leave accordingly.
        </div>
      </CardFooter>
    </Card>
  )
}
