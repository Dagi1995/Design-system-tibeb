import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { Toggle } from "../../components/atoms/Toggle"
import { Bold } from "lucide-react"

const meta: Meta<typeof Toggle> = {
  title: "Design-system/Components/Atoms/Toggle",
  component: Toggle,
  args: {
    "aria-label": "Toggle Bold",
    children: <Bold />,
  },
  argTypes: {
    variant: {
      control: "select",
      options: ["default", "outline"],
    },
    size: {
      control: "select",
      options: ["sm", "default", "lg"],
    },
  },
}

export default meta
type Story = StoryObj<typeof Toggle>

export const Default: Story = {}

export const Outline: Story = {
  args: {
    variant: "outline",
  },
}

export const Sizes: Story = {
  render: (args) => (
    <div className="flex items-center space-x-4">
      <Toggle {...args} size="sm" aria-label="Small Toggle" />
      <Toggle {...args} size="default" aria-label="Default Toggle" />
      <Toggle {...args} size="lg" aria-label="Large Toggle" />
    </div>
  ),
  args: {
    variant: "default",
  },
}
