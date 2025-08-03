import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { Input } from "../../components/atoms/Input"

const meta: Meta<typeof Input> = {
  title: "Design-System/Components/Atoms/Input",
  component: Input,
  tags: ["autodocs"],
  argTypes: {
    type: {
      control: "text",
    },
    placeholder: {
      control: "text",
    },
    disabled: {
      control: "boolean",
    },
    "aria-invalid": {
      control: "boolean",
      description: "Simulates invalid input state",
    },
  },
  args: {
    type: "text",
    placeholder: "Enter text...",
    disabled: false,
    "aria-invalid": false,
  },
  parameters: {
    layout: "centered",
  },
}

export default meta
type Story = StoryObj<typeof Input>

export const Default: Story = {}

export const WithPlaceholder: Story = {
  args: {
    placeholder: "you@example.com",
    type: "email",
  },
}

export const Password: Story = {
  args: {
    type: "password",
    placeholder: "Enter your password",
  },
}

export const Disabled: Story = {
  args: {
    disabled: true,
    placeholder: "Disabled input",
  },
}

export const Invalid: Story = {
  args: {
    placeholder: "Invalid input",
    "aria-invalid": true,
  },
}
