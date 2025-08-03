import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { Badge } from "../../components/atoms/Badge"
import { AlertTriangle } from "lucide-react"

const meta: Meta<typeof Badge> = {
  title: "Design-system/Components/Atoms/Badge",
  component: Badge,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "Badges are used to highlight key information or status. Built using a `<span>` by default, and can be styled with variants like `default`, `secondary`, `destructive`, or `outline`.",
      },
    },
  },
  argTypes: {
    variant: {
      control: "select",
      options: ["default", "secondary", "destructive", "outline"],
      description: "Visual variant of the badge",
    },
    asChild: {
      control: "boolean",
      description:
        "Render badge using a different HTML element or component via `Slot`",
    },
    className: {
      control: false,
    },
    children: {
      control: "text",
      defaultValue: "Badge",
    },
  },
  args: {
    variant: "default",
    children: "Badge",
  },
}

export default meta
type Story = StoryObj<typeof Badge>

/**
 * Default badge with primary background and foreground color.
 */
export const Default: Story = {}

/**
 * Badge using the `secondary` variant.
 */
export const Secondary: Story = {
  args: {
    variant: "secondary",
  },
}

/**
 * Badge using the `destructive` variant.
 */
export const Destructive: Story = {
  args: {
    variant: "destructive",
    children: (
      <>
        <AlertTriangle className="text-white" />
        Error
      </>
    ),
  },
}

/**
 * Badge using the `outline` variant.
 */
export const Outline: Story = {
  args: {
    variant: "outline",
    children: "Outline",
  },
}
