import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { Switch } from "../../components/atoms/Switch"
import * as React from "react"

const meta: Meta<typeof Switch> = {
  title: "Design-system/Components/Atoms/Switch",
  component: Switch,
  args: {
    defaultChecked: false,
    disabled: false,
  },
  argTypes: {
    defaultChecked: {
      control: "boolean",
      description: "Whether the switch is checked by default",
    },
    disabled: {
      control: "boolean",
      description: "Whether the switch is disabled",
    },
    onCheckedChange: {
      action: "checkedChange",
      description: "Callback when the checked state changes",
    },
  },
  tags: ["autodocs"],
}

export default meta
type Story = StoryObj<typeof Switch>

export const Default: Story = {
  args: {},
}

export const Checked: Story = {
  args: {
    defaultChecked: true,
  },
}

export const Disabled: Story = {
  args: {
    disabled: true,
  },
}

export const Controlled: Story = {
  render: (args) => {
    const [checked, setChecked] = React.useState(true)

    return (
      <div className="flex items-center space-x-2">
        <Switch
          {...args}
          checked={checked}
          onCheckedChange={(val) => {
            args.onCheckedChange?.(val)
            setChecked(val)
          }}
        />
        <span>{checked ? "On" : "Off"}</span>
      </div>
    )
  },
}
