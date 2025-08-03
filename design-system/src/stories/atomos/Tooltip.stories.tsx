import * as React from "react"
import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from "../../components/atoms/Tooltip"

import { Button } from "../../components/atoms/Button"

const meta: Meta<typeof Tooltip> = {
  title: "Design-system/Components/Atoms/Tooltip",
  component: Tooltip,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
}

export default meta
type Story = StoryObj<typeof Tooltip>

export const Default: Story = {
  render: () => (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button>Hover me</Button>
      </TooltipTrigger>
      <TooltipContent>
        Tooltip content goes here
      </TooltipContent>
    </Tooltip>
  ),
}

export const CustomOffsetAndText: Story = {
  render: () => (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button variant="outline">Offset + Custom Text</Button>
      </TooltipTrigger>
      <TooltipContent sideOffset={10}>
        Custom tooltip with more padding and distance.
      </TooltipContent>
    </Tooltip>
  ),
}

export const WithLongText: Story = {
  render: () => (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button variant="secondary">Long Text</Button>
      </TooltipTrigger>
      <TooltipContent className="max-w-xs">
        This is a longer tooltip message that demonstrates how text wraps within the content area when necessary.
      </TooltipContent>
    </Tooltip>
  ),
}
