import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "../../components/atoms/Popover"
import { Button } from "../../components/atoms/Button"

const meta: Meta<typeof Popover> = {
  title: "Design-system/Components/Atoms/Popover",
  component: Popover,
  parameters: {
    layout: "centered",
  },
}

export default meta
type Story = StoryObj

export const Default: Story = {
  render: () => (
    <Popover>
      <PopoverTrigger>
        <Button variant="outline">Open Popover</Button>
      </PopoverTrigger>
      <PopoverContent className="w-64">
        <p className="text-sm text-muted-foreground">
          This is a sample popover content using your custom component.
        </p>
      </PopoverContent>
    </Popover>
  ),
}
