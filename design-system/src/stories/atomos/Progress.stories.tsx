import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { Progress } from "../../components/atoms/Progress"

const meta: Meta<typeof Progress> = {
  title: "Design-system/Components/Atoms/Progress",
  component: Progress,
  tags: ["autodocs"],
  argTypes: {
    value: {
      control: { type: "range", min: 0, max: 100 },
      description: "Progress value (0–100)",
    },
    showLabel: {
      control: "boolean",
      description: "Toggle to show percent label",
    },
    className: {
      control: false,
    },
    labelClassName: {
      control: false,
    },
  },
}
export default meta

type Story = StoryObj<typeof Progress>

export const Default: Story = {
  args: {
    value: 40,
    showLabel: false,
  },
}

export const WithLabel: Story = {
  args: {
    value: 75,
    showLabel: true,
  },
}

export const CustomHeight: Story = {
  args: {
    value: 60,
    showLabel: true,
    className: "h-4",
  },
}

export const LowProgress: Story = {
  args: {
    value: 10,
    showLabel: true,
    className: "h-2 bg-red-200",
  },
}

export const Complete: Story = {
  args: {
    value: 100,
    showLabel: true,
    className: "bg-green-200",
    labelClassName: "text-green-700 font-semibold",
  },
}
