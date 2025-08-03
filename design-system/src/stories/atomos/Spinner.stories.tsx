import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { Spinner } from "../../components/atoms/Spinner"

const meta: Meta<typeof Spinner> = {
  title: "Design-system/Components/Atoms/Spinner",
  component: Spinner,
  tags: ["autodocs"],
  argTypes: {
    size: {
      control: { type: "select" },
      options: ["sm", "md", "lg"],
    },
  },
}

export default meta
type Story = StoryObj<typeof Spinner>

export const Default: Story = {
  args: {
    size: "md",
  },
}

export const Small: Story = {
  args: {
    size: "sm",
  },
}

export const Large: Story = {
  args: {
    size: "lg",
  },
}

export const WithCustomClass: Story = {
  args: {
    size: "md",
    className: "text-destructive",
  },
}
