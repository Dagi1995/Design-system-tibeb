// components/custom/birthdate-input.stories.tsx

import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { BirthdateInput } from "../../components/molecules/BirthdateInput";

const meta: Meta<typeof BirthdateInput> = {
  title: "Design-system/Components/Molecules/BirthdateInput",
  component: BirthdateInput,
  tags: ["autodocs"],
  args: {
    label: "Date of Birth",
    description: "Select your birthdate",
    placeholder: "Choose date",
  },
};

export default meta;
type Story = StoryObj<typeof BirthdateInput>;

export const Default: Story = {
  render: (args) => <BirthdateInput {...args} />,
};

export const WithChangeCallback: Story = {
  render: (args) => (
    <BirthdateInput
      {...args}
      onChange={(date) => {
        console.log("Selected birthdate:", date);
        alert(`You picked: ${date?.toLocaleDateString()}`);
      }}
    />
  ),
};
