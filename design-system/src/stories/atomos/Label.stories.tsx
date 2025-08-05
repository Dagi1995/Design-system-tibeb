/**
 * Storybook stories for the Label component.
 */

import * as React from "react";
import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Label } from "../../components/atoms/Label";;

const meta: Meta<typeof Label> = {
  title: "Design-system/Components/Atoms/Label",
  component: Label,
  argTypes: {
    className: {
      control: "text",
      description: "Custom CSS classes",
    },
    children: {
      control: "text",
      description: "Label text",
    },
  },
  parameters: {
    docs: {
      description: {
        component:
          "A Primer-style label using Radix. Pairs with inputs, supports disabled states.",
      },
    },
  },
};
export default meta;
type Story = StoryObj<typeof Label>;

export const Default: Story = {
  args: {
    children: "Label",
  },
  parameters: {
    docs: {
      description: {
        story: "Basic Label component.",
      },
    },
  },
};

export const WithInput: Story = {
  render: (args) => (
    <div className="flex flex-col gap-2">
      <Label {...args} htmlFor="example-input">
        Email
      </Label>
      <input
        id="example-input"
        type="email"
        placeholder="you@example.com"
        className="border border-gray-300 rounded-md px-3 py-2 text-sm"
      />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "Label with input example using htmlFor.",
      },
    },
  },
};

export const Disabled: Story = {
  render: (args) => (
    <div className="flex flex-col gap-2">
      <Label {...args} htmlFor="disabled-input">
        Disabled
      </Label>
      <input
        id="disabled-input"
        disabled
        placeholder="Disabled input"
        className="border border-gray-300 rounded-md px-3 py-2 text-sm bg-gray-50"
      />
    </div>
  ),
};
