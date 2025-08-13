import React from 'react';
import { Meta, StoryObj } from '@storybook/nextjs-vite';
import { Collapsible, CollapsibleTrigger, CollapsibleContent } from '../../components/atoms/Collapsible';
import { ChevronDownIcon } from 'lucide-react';

const meta: Meta<typeof Collapsible> = {
  title: "Design-System/Components/Atoms/Collapsible",
  component: Collapsible,
  tags: ['autodocs'],
  args: {
    defaultOpen: false,
    disabled: false,
    open: false,
  },
  argTypes: {
    defaultOpen: {
      control: 'boolean',
    },
    disabled: {
      control: 'boolean',
    },
    open: {
      control: 'boolean',
    },
  },
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
  render: (args) => (
    <Collapsible {...args}>
      <CollapsibleTrigger className="flex items-center justify-between w-full p-2 bg-gray-100 hover:bg-gray-200 rounded-md">
        <span>Toggle Content</span>
        <ChevronDownIcon className="h-5 w-5" />
      </CollapsibleTrigger>
      <CollapsibleContent className="p-4 bg-white border border-gray-200 rounded-md mt-2">
        This is the collapsible content. It can contain any elements and will animate when opened or closed.
      </CollapsibleContent>
    </Collapsible>
  ),
  args: {
    defaultOpen: false,
  },
}

export const InitiallyOpen: Story = {
  render: (args) => (
    <Collapsible {...args}>
      <CollapsibleTrigger className="flex items-center justify-between w-full p-2 bg-gray-100 hover:bg-gray-200 rounded-md">
        <span>Toggle Content (Initially Open)</span>
        <ChevronDownIcon className="h-5 w-5" />
      </CollapsibleTrigger>
      <CollapsibleContent className="p-4 bg-white border border-gray-200 rounded-md mt-2">
        This content is initially visible because defaultOpen is set to true.
      </CollapsibleContent>
    </Collapsible>
  ),
  args: {
    defaultOpen: true,
  },
}

export const WithCustomStyles: Story = {
  render: (args) => (
    <Collapsible {...args}>
      <CollapsibleTrigger className="flex items-center justify-between w-full p-3 bg-blue-600 text-white hover:bg-blue-700 rounded-lg transition-colors">
        <span className="font-semibold">Custom Styled Trigger</span>
        <ChevronDownIcon className="h-6 w-6" />
      </CollapsibleTrigger>
      <CollapsibleContent className="p-4 bg-blue-50 border border-blue-200 rounded-lg mt-2 text-blue-800">
        This collapsible has custom styling with a blue theme and different padding.
      </CollapsibleContent>
    </Collapsible>
  ),
  args: {
    defaultOpen: false,
  },
}

export const Disabled: Story = {
  render: (args) => (
    <Collapsible {...args}>
      <CollapsibleTrigger disabled className="flex items-center justify-between w-full p-2 bg-gray-100 rounded-md opacity-50 cursor-not-allowed">
        <span>Disabled Trigger</span>
        <ChevronDownIcon className="h-5 w-5" />
      </CollapsibleTrigger>
      <CollapsibleContent className="p-4 bg-white border border-gray-200 rounded-md mt-2">
        This content cannot be toggled.
      </CollapsibleContent>
    </Collapsible>
  ),
}

export const NestedCollapsible: Story = {
  render: (args) => (
    <Collapsible {...args}>
      <CollapsibleTrigger className="flex items-center justify-between w-full p-2 bg-gray-100 hover:bg-gray-200 rounded-md">
        <span>Outer Collapsible</span>
        <ChevronDownIcon className="h-5 w-5" />
      </CollapsibleTrigger>
      <CollapsibleContent className="p-4 bg-white border border-gray-200 rounded-md mt-2">
        <Collapsible>
          <CollapsibleTrigger className="flex items-center justify-between w-full p-2 bg-gray-50 hover:bg-gray-100 rounded-md">
            <span>Nested Collapsible</span>
            <ChevronDownIcon className="h-5 w-5" />
          </CollapsibleTrigger>
          <CollapsibleContent className="p-4 bg-white border border-gray-100 rounded-md mt-2">
            This is nested collapsible content.
          </CollapsibleContent>
        </Collapsible>
      </CollapsibleContent>
    </Collapsible>
  ),
  args: {
    defaultOpen: false,
  },
}
