import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import * as React from "react";
import { PhoneInput } from "../../components/molecules/PhoneInput";

const meta: Meta<typeof PhoneInput> = {
  title: "Design-System/Components/Molecules/PhoneInput",
  component: PhoneInput,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
  argTypes: {
    value: {
      control: "text",
      description: "Current phone number (E.164 format)",
    },
    disabled: {
      control: "boolean",
      description: "Disable the input",
    },
    onChange: { action: "changed" },
  },
};
export default meta;

type Story = StoryObj<typeof PhoneInput>;

/**
 * Default usage
 */
export const Default: Story = {
  render: (args) => {
    const [value, setValue] = React.useState<string>("");

    return (
      <div className="w-[320px]">
        <PhoneInput
          {...args}
          value={value}
          onChange={(val) => {
            setValue(val as string);
            args.onChange?.(val);
          }}
        />
      </div>
    );
  },
};

/**
 * With pre-filled value
 */
export const WithValue: Story = {
  render: (args) => {
    const [value, setValue] = React.useState<string>("+251 98 480 0766");

    return (
      <div className="w-[320px]">
        <PhoneInput
          {...args}
          value={value}
          onChange={(val) => {
            setValue(val as string);
            args.onChange?.(val);
          }}
        />
      </div>
    );
  },
};

/**
 * Disabled state
 */
export const Disabled: Story = {
  render: (args) => (
    <div className="w-[320px]">
      <PhoneInput {...args} value="+251 98 480 0766" disabled />
    </div>
  ),
};
