import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { Alert, AlertTitle, AlertDescription } from "../../components/molocules/Alert"
import { AlertCircle } from "lucide-react"


const meta: Meta<typeof Alert> = {
  title: "Design-system/Components/Molecules/Alert",
  component: Alert,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "Alert displays important messages and supports variants like `default` and `destructive`. It composes `AlertTitle` and `AlertDescription` for structure.",
      },
    },
  },
  argTypes: {
    variant: {
      control: "select",
      options: ["default", "destructive"],
      description: "Visual variant of the alert",
    },
    className: { control: false },
  },
  args: {
    variant: "default",
  },
}

export default meta
type Story = StoryObj<typeof Alert>

/**
 * Default alert with title, description, and icon.
 */
export const Default: Story = {
  render: (args) => (
    <Alert {...args}>
      <AlertCircle className="text-muted-foreground" />
      <AlertTitle>Default Alert</AlertTitle>
      <AlertDescription>This is a simple alert message.</AlertDescription>
    </Alert>
  ),
}

/**
 * Destructive variant alert showing error state.
 */
export const Destructive: Story = {
  render: (args) => (
    <Alert {...args} variant="destructive">
      <AlertCircle />
      <AlertTitle>Error Alert</AlertTitle>
      <AlertDescription>
        There was a problem processing your request.
      </AlertDescription>
    </Alert>
  ),
}
