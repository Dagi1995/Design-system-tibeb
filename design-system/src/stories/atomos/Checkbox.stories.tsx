/**
 * Storybook stories for the Checkbox component.
 */

import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { Checkbox } from "../../components/atoms/checkbox"
import { Label } from "../../components/atoms/label"

const meta: Meta<typeof Checkbox> = {
  title: "Design-system/Components/Atoms/Checkbox",
  component: Checkbox,
  tags: ["autodocs"],
  argTypes: {
    className: {
      control: "text",
    },
    disabled: {
      control: "boolean",
    },
  },
  parameters: {
    docs: {
      description: {
        component:
          "A Primer-style Checkbox using Radix primitives and Lucide icon.",
      },
    },
  },
}

export default meta
type Story = StoryObj<typeof Checkbox>

export const Default: Story = {
  render: (args) => (
    <div className="flex items-center space-x-2">
      <Checkbox {...args} id="checkbox-default" />
      <Label htmlFor="checkbox-default">Accept terms</Label>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "A basic Checkbox paired with a Label.",
      },
    },
  },
}

export const Disabled: Story = {
  render: (args) => (
    <div className="flex items-center space-x-2">
      <Checkbox {...args} id="checkbox-disabled" disabled />
      <Label htmlFor="checkbox-disabled">Disabled Checkbox</Label>
    </div>
  ),
}
