import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { Toaster } from "../../components/atoms/Sonner"
import { toast } from "sonner"
import { Button } from "../../components/atoms/Button"

const meta: Meta<typeof Toaster> = {
  title: "Design-system/Components/Atoms/Toaster",
  component: Toaster,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
}

export default meta
type Story = StoryObj<typeof Toaster>

export const Default: Story = {
  render: () => (
    <>
      <Button
        onClick={() =>
          toast("Notification sent!", {
            description: "This is a Sonner toast.",
          })
        }
      >
        Show Toast
      </Button>
      <Toaster />
    </>
  ),
}
