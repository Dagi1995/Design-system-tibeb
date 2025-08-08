"use client"

import React, { useState } from "react"
import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import {
  Collapsible,
  CollapsibleTrigger,
  CollapsibleContent,
} from "../../components/atoms/Collapsible"
import { ChevronDownIcon } from "lucide-react"
import { cn } from "@/lib/utils" // Assuming you're using this

const meta: Meta<typeof Collapsible> = {
  title: "Design-System/Components/Atoms/Collapsible",
  component: Collapsible,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "A collapsible component using Radix UI primitives. It toggles content visibility with accessibility and animation support.",
      },
    },
  },
  argTypes: {
    defaultOpen: { control: "boolean" },
    disabled: { control: "boolean" },
    open: { control: "boolean" },
  },
}
export default meta

type Story = StoryObj<typeof Collapsible>

const Trigger = ({
  children,
  open,
  disabled,
  className = "",
}: {
  children: React.ReactNode
  open?: boolean
  disabled?: boolean
  className?: string
}) => (
  <CollapsibleTrigger
    disabled={disabled}
    className={cn(
      "flex items-center justify-between w-full px-4 py-2 rounded-md transition-colors",
      disabled
        ? "bg-gray-100 opacity-50 cursor-not-allowed"
        : "bg-gray-100 hover:bg-gray-200",
      className
    )}
  >
    <span>{children}</span>
    <ChevronDownIcon
      className={cn(
        "h-5 w-5 transition-transform",
        open && "rotate-180"
      )}
    />
  </CollapsibleTrigger>
)

export const Default: Story = {
  args: { defaultOpen: false },
  render: (args) => {
    const [open, setOpen] = useState(args.defaultOpen)

    return (
      <Collapsible open={open} onOpenChange={setOpen}>
        <Trigger open={open}>Toggle Content</Trigger>
        <CollapsibleContent className="p-4 bg-white border border-gray-200 rounded-md mt-2">
          This is the collapsible content.
        </CollapsibleContent>
      </Collapsible>
    )
  },
}

export const InitiallyOpen: Story = {
  args: { defaultOpen: true },
  render: (args) => {
    const [open, setOpen] = useState(args.defaultOpen)

    return (
      <Collapsible open={open} onOpenChange={setOpen}>
        <Trigger open={open}>Toggle Content (Initially Open)</Trigger>
        <CollapsibleContent className="p-4 bg-white border border-gray-200 rounded-md mt-2">
          This content is initially visible.
        </CollapsibleContent>
      </Collapsible>
    )
  },
}

export const WithCustomStyles: Story = {
  args: { defaultOpen: false },
  render: (args) => {
    const [open, setOpen] = useState(args.defaultOpen)

    return (
      <Collapsible open={open} onOpenChange={setOpen}>
        <Trigger
          open={open}
          className="bg-blue-600 text-white hover:bg-blue-700"
        >
          Custom Styled Trigger
        </Trigger>
        <CollapsibleContent className="p-4 bg-blue-50 border border-blue-200 rounded-lg mt-2 text-blue-800">
          This collapsible uses custom blue styles.
        </CollapsibleContent>
      </Collapsible>
    )
  },
}

export const Disabled: Story = {
  args: { disabled: true },
  render: (args) => (
    <Collapsible defaultOpen={false}>
      <Trigger disabled={args.disabled}>Disabled Trigger</Trigger>
      <CollapsibleContent className="p-4 bg-white border border-gray-200 rounded-md mt-2">
        This content cannot be toggled.
      </CollapsibleContent>
    </Collapsible>
  ),
}

export const NestedCollapsible: Story = {
  args: { defaultOpen: false },
  render: (args) => {
    const [outerOpen, setOuterOpen] = useState(args.defaultOpen)
    const [innerOpen, setInnerOpen] = useState(false)

    return (
      <Collapsible open={outerOpen} onOpenChange={setOuterOpen}>
        <Trigger open={outerOpen}>Outer Collapsible</Trigger>
        <CollapsibleContent className="p-4 bg-white border border-gray-200 rounded-md mt-2">
          <Collapsible open={innerOpen} onOpenChange={setInnerOpen}>
            <Trigger open={innerOpen} className="bg-gray-50 hover:bg-gray-100">
              Nested Collapsible
            </Trigger>
            <CollapsibleContent className="p-4 bg-white border border-gray-100 rounded-md mt-2">
              This is nested collapsible content.
            </CollapsibleContent>
          </Collapsible>
        </CollapsibleContent>
      </Collapsible>
    )
  },
}
