import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { FilterTag } from "../../components/atoms/FilterTag"

const meta: Meta<typeof FilterTag> = {
  title: "Design System/Components/Atoms/FilterTag",
  component: FilterTag,
  tags: ["autodocs"],
  argTypes: {
    label: {
      control: "text",
      defaultValue: "Status: Active",
    },
    onRemove: { action: "removed" },
  },
}

export default meta
type Story = StoryObj<typeof FilterTag>

export const Default: Story = {
  args: {
    label: "Status: Active",
  },
}
