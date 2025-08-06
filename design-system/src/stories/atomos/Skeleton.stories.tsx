import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { Skeleton } from "../../components/atoms/Skeleton"

const meta: Meta<typeof Skeleton> = {
  title: "Design-system/Components/Atoms/Skeleton",
  component: Skeleton,
  tags: ["autodocs"],
  argTypes: {
    height: {
      control: "text",
      defaultValue: "h-8",
    },
    width: {
      control: "text",
      defaultValue: "w-48",
    },
    variant: {
      control: "inline-radio",
      options: ["light", "dark"],
      defaultValue: "dark",
    },
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
  args: {
    height: "h-8",
    width: "w-48",
    variant: "dark",
  },
}

export const Circle: Story = {
  args: {
    height: "h-10",
    width: "w-10",
    variant: "light",
    className: "rounded-full",
  },
}

export const TextBlock: Story = {
  render: () => (
    <div className="space-y-2">
      <Skeleton height="h-10" width="w-60" variant="dark" />
      <Skeleton height="h-10" width="w-5/6" variant="light" />
      <Skeleton height="h-5" width="w-4/6" variant="light" />
    </div>
  ),
}
export const CircleWithText: Story = {
  render: () => (
    <div className="space-y-2 flex items-center justify-center gap-4">
      <Skeleton className="rounded-full" height="h-15"   width= "w-15"variant="dark" />
      <Skeleton height="h-10" width="w-50" variant="light" />
    </div>
  ),
}

