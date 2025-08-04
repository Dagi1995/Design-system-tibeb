import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
  CardAction,
} from "../../components/molocules/Card"
import { Button } from "../../components/atoms/Button"

const meta: Meta<typeof Card> = {
  title: "Design-system/Components/Molecules/Card",
  component: Card,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
}

export default meta
type Story = StoryObj<typeof Card>

export const Default: Story = {
  render: () => (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle>Subscription</CardTitle>
        <CardDescription>Manage your subscription plan</CardDescription>
        <CardAction>
          <Button size="sm" variant="ghost">
            Edit
          </Button>
        </CardAction>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground">
          You are currently on the <strong>Free</strong> plan. Upgrade to access
          more features.
        </p>
      </CardContent>
      <CardFooter className="justify-end">
        <Button variant="default">Upgrade</Button>
      </CardFooter>
    </Card>
  ),
}
