import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { Button } from "../../components/atoms/Button"
import { PlusIcon } from "lucide-react"

const meta: Meta<typeof Button> = {
  title: "Design-System/Components/Atoms/Button",
  component: Button,
  tags: ["autodocs"],
  args: {
    children: "Click me",
    variant: "default",
    size: "default",
    disabled: false,
  },
  argTypes: {
    variant: {
      control: "select",
      options: ["default", "destructive", "outline", "secondary", "ghost", "link"],
    },
    size: {
      control: "select",
      options: ["default", "sm", "lg", "icon"],
    },
    disabled: {
      control: "boolean",
    },
  },
}

export default meta
type Story = StoryObj<typeof Button>

export const Default: Story = {}

export const WithIcon: Story = {
  args: {
    children: (
      <>
        <PlusIcon className="size-4" />
        Add Item
      </>
    ),
  },
}

export const Destructive: Story = {
  args: {
    variant: "destructive",
    children: "Delete",
  },
}

export const Outline: Story = {
  args: {
    variant: "outline",
    children: "Outline",
  },
}

export const Secondary: Story = {
  args: {
    variant: "secondary",
    children: "Secondary",
  },
}

export const Ghost: Story = {
  args: {
    variant: "ghost",
    children: "Ghost",
  },
}

export const Link: Story = {
  args: {
    variant: "link",
    children: "Link",
  },
}

export const IconOnly: Story = {
  args: {
    size: "sm",
    children: <PlusIcon className="size-4" />,
    "aria-label": "Add",
  },
}
