"use client";

import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/design-system/src/components/molecules/Chart";
import { Line, LineChart, CartesianGrid, XAxis, YAxis } from "recharts";
import { type ChartConfig } from "@/design-system/src/components/molecules/Chart";

// Chart configuration for different ticket statuses
const chartConfig = {
  open: {
    label: "Open Tickets",
    color: "#ef4444", // red
  },
  inProgress: {
    label: "In Progress",
    color: "#facc15", // yellow
  },
  closed: {
    label: "Closed Tickets",
    color: "#22c55e", // green
  },
} satisfies ChartConfig;

// Sample ticket data (replace with API/database data)
const chartData = [
  { month: "January", open: 20, inProgress: 15, closed: 30 },
  { month: "February", open: 18, inProgress: 12, closed: 25 },
  { month: "March", open: 25, inProgress: 10, closed: 28 },
  { month: "April", open: 10, inProgress: 20, closed: 35 },
  { month: "May", open: 22, inProgress: 18, closed: 32 },
  { month: "June", open: 15, inProgress: 12, closed: 40 },
];

const AppLineChart = () => {
  return (
    <div>
      <h1 className="font-bold ml-4 mb-4">Tickets Overview (Monthly)</h1>
      <ChartContainer config={chartConfig} className="min-h-[250px] w-full">
        <LineChart accessibilityLayer data={chartData}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} />
          <XAxis
            dataKey="month"
            tickLine={false}
            tickMargin={10}
            axisLine={false}
            tickFormatter={(value) => value.slice(0, 3)}
          />
          <YAxis tickLine={false} tickMargin={10} axisLine={false} />
          <ChartTooltip content={<ChartTooltipContent />} />
          <ChartLegend content={<ChartLegendContent />} />

          <Line
            type="monotone"
            dataKey="open"
            stroke="var(--color-open)"
            strokeWidth={2}
            dot={{ r: 4 }}
            activeDot={{ r: 6 }}
          />
          <Line
            type="monotone"
            dataKey="inProgress"
            stroke="var(--color-inProgress)"
            strokeWidth={2}
            dot={{ r: 4 }}
            activeDot={{ r: 6 }}
          />
          <Line
            type="monotone"
            dataKey="closed"
            stroke="var(--color-closed)"
            strokeWidth={2}
            dot={{ r: 4 }}
            activeDot={{ r: 6 }}
          />
        </LineChart>
      </ChartContainer>
    </div>
  );
};

export default AppLineChart;
