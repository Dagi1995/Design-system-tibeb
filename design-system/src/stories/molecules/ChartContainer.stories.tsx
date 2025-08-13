import * as React from "react";
import { Meta, StoryObj } from "@storybook/nextjs-vite";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
} from "../../components/molecules/Chart";

import {
  LineChart,
  Line,
  BarChart,
  Bar,
  AreaChart,
  Area,
  PieChart,
  Pie,
  Cell,
  RadialBarChart,
  RadialBar,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  PolarAngleAxis,
} from "recharts";

const meta: Meta<typeof ChartContainer> = {
  title: "Design-system/Components/Molecules/Charts",
  component: ChartContainer,
  tags: ["autodocs"],
};
export default meta;

type Story = StoryObj<typeof ChartContainer>;

const sampleData = [
  { name: "Jan", sales: 2400, revenue: 4000 },
  { name: "Feb", sales: 1398, revenue: 3000 },
  { name: "Mar", sales: 9800, revenue: 5000 },
  { name: "Apr", sales: 3908, revenue: 4700 },
  { name: "May", sales: 4800, revenue: 6000 },
  { name: "Jun", sales: 3800, revenue: 5200 },
];

const pieData = [
  { name: "Sales", value: 400 },
  { name: "Revenue", value: 300 },
  { name: "Cost", value: 300 },
  { name: "Profit", value: 200 },
];

const radialData = [
  { name: "Sales", value: 85, fill: "#3b82f6" },
  { name: "Revenue", value: 65, fill: "#10b981" },
  { name: "Cost", value: 50, fill: "#facc15" },
];

const chartConfig = {
  sales: { label: "Sales", color: "#3b82f0" }, // blue-500
  revenue: { label: "Revenue", color: "#10b981" }, // emerald-500
};

// Line Chart
export const LineChartStory: Story = {
  name: "Line Chart",
  render: () => (
    <ChartContainer config={chartConfig}>
      <LineChart data={sampleData}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <ChartTooltip content={<ChartTooltipContent />} />
        <ChartLegend content={<ChartLegendContent />} />
        <Line type="monotone" dataKey="sales" stroke="var(--color-sales)" />
        <Line type="monotone" dataKey="revenue" stroke="var(--color-revenue)" />
      </LineChart>
    </ChartContainer>
  ),
};

// Bar Chart
export const BarChartStory: Story = {
  name: "Bar Chart",
  render: () => (
    <ChartContainer config={chartConfig}>
      <BarChart data={sampleData}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <ChartTooltip content={<ChartTooltipContent />} />
        <ChartLegend content={<ChartLegendContent />} />
        <Bar dataKey="sales" fill="var(--color-sales)" />
        <Bar dataKey="revenue" fill="var(--color-revenue)" />
      </BarChart>
    </ChartContainer>
  ),
};

// Area Chart
export const AreaChartStory: Story = {
  name: "Area Chart",
  render: () => (
    <ChartContainer config={chartConfig}>
      <AreaChart data={sampleData}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <ChartTooltip content={<ChartTooltipContent />} />
        <ChartLegend content={<ChartLegendContent />} />
        <Area
          type="monotone"
          dataKey="sales"
          stroke="var(--color-sales)"
          fill="var(--color-sales)"
          fillOpacity={0.3}
        />
        <Area
          type="monotone"
          dataKey="revenue"
          stroke="var(--color-revenue)"
          fill="var(--color-revenue)"
          fillOpacity={0.3}
        />
      </AreaChart>
    </ChartContainer>
  ),
};

// Pie Chart
export const PieChartStory: Story = {
  name: "Pie Chart",
  render: () => (
    <ChartContainer config={{}}>
      <PieChart width={400} height={300}>
        <ChartTooltip content={<ChartTooltipContent />} />
        <Legend />
        <Pie
          data={pieData}
          cx="50%"
          cy="50%"
          labelLine={false}
          outerRadius={100}
          fill="#8884d8"
          dataKey="value"
        >
          {pieData.map((entry, index) => (
            <Cell
              key={`cell-${index}`}
              fill={["#3b82f6", "#10b981", "#facc15", "#f472b6"][index % 4]}
            />
          ))}
        </Pie>
      </PieChart>
    </ChartContainer>
  ),
};

// Radial Bar Chart
export const RadialBarChartStory: Story = {
  name: "Radial Bar Chart",
  render: () => (
    <ChartContainer config={{}}>
      <RadialBarChart
        cx="50%"
        cy="50%"
        innerRadius="20%"
        outerRadius="80%"
        barSize={15}
        data={radialData}
        width={400}
        height={300}
      >
        <Tooltip />
        <PolarAngleAxis type="number" domain={[0, 100]} />
        <RadialBar background dataKey="value" cornerRadius={6} />
        <Legend
          iconSize={10}
          layout="horizontal"
          verticalAlign="bottom"
          align="center"
        />
      </RadialBarChart>
    </ChartContainer>
  ),
};
