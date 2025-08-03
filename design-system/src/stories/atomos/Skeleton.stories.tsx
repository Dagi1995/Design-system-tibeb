import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { Skeleton } from "../../components/atoms/Skeleton"

const meta: Meta<typeof Skeleton> = {
  title: "Design-system/Components/Atoms/Skeleton",
  component: Skeleton,
  tags: ["autodocs"],
  argTypes: {
    className: { control: false },
  },
  parameters: {
    layout: "centered",
    backgrounds: {
      default: "light",
      values: [
        { name: "light", value: "#ffffff" },
        { name: "dark", value: "#1a1a1a" },
      ],
    },
  },
}

export default meta
type Story = StoryObj<typeof Skeleton>

export const Default: Story = {
  render: () => (
    <Skeleton className="h-8 w-48 bg-gray-300 animate-pulse" />
  ),
}

export const Circle: Story = {
  render: () => (
    <Skeleton className="h-10 w-10 rounded-full bg-gray-300 animate-pulse" />
  ),
}

export const TextBlock: Story = {
  render: () => (
    <div className="space-y-2">
      <Skeleton className="h-4 w-full rounded bg-gray-300 animate-pulse" />
      <Skeleton className="h-4 w-5/6 rounded bg-gray-300 animate-pulse" />
      <Skeleton className="h-4 w-4/6 rounded bg-gray-300 animate-pulse" />
    </div>
  ),
}
