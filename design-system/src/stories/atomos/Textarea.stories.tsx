import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { Textarea } from "../../components/atoms/Textarea"

const meta: Meta<typeof Textarea> = {
  title: "Design-System/Components/Atoms/Textarea",
  component: Textarea,
  tags: ["autodocs"],
  argTypes: {
    placeholder: { control: "text" },
    disabled: { control: "boolean" },
    rows: { control: { type: "number", min: 2, max: 20, step: 1 } },
    "aria-invalid": { control: "boolean" },
  },
  args: {
    placeholder: "Type your message...",
    disabled: false,
    rows: 4,
    "aria-invalid": false,
  },
  parameters: {
    layout: "centered",
  },
}

export default meta
type Story = StoryObj<typeof Textarea>

export const Default: Story = {}

export const Disabled: Story = {
  args: {
    disabled: true,
    placeholder: "Disabled textarea",
  },
}

export const Invalid: Story = {
  args: {
    "aria-invalid": true,
    placeholder: "Textarea with error",
  },
}

export const MultipleRows: Story = {
  args: {
    rows: 8,
    placeholder: "Textarea with 8 rows",
  },
}
