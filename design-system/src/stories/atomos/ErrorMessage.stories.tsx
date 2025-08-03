import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { ErrorMessage } from "../../components/atoms/ErrorMessage"

const meta: Meta<typeof ErrorMessage> = {
  title: "Design-system/Components/Atoms/ErrorMessage",
  component: ErrorMessage,
  tags: ["autodocs"],
  args: {
    children: "This field is required.",
    showIcon: true,
  },
  parameters: {
    layout: "centered",
  },
}

export default meta
type Story = StoryObj<typeof ErrorMessage>

export const Default: Story = {}

export const NoIcon: Story = {
  args: {
    showIcon: false,
  },
}

export const CustomStyle: Story = {
  args: {
    className: "text-red-500 italic",
    children: "Invalid input format",
  },
}
