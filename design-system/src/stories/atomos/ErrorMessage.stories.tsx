import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { ErrorMessage } from "../../components/atoms/ErrorMessage"

const meta: Meta<typeof ErrorMessage> = {
  title: "Design-System/Components/Atoms/ErrorMessage",
  component: ErrorMessage,
  tags: ["autodocs"],
  args: {
    message: "Something went wrong. Please try again.",
  },
}

export default meta
type Story = StoryObj<typeof ErrorMessage>

export const Default: Story = {}

export const CustomClass: Story = {
  args: {
    message: "Email is required",
    className: "text-base text-red-600",
  },
}
