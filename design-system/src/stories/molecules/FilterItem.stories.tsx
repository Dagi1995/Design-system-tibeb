import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { FilterItem } from "../../components/molecules/FilterItem";
import { Input } from "../../components/atoms/Input";

const meta: Meta<typeof FilterItem> = {
  title: "Design System/Components/Molecules/FilterItem",
  component: FilterItem,
  tags: ["autodocs"],
  argTypes: {
    label: {
      control: "text",
      defaultValue: "Search",
    },
  },
};

export default meta;
type Story = StoryObj<typeof FilterItem>;

export const Default: Story = {
  render: (args) => (
    <FilterItem {...args}>
      <Input placeholder="Type something..." className="w-56" />
    </FilterItem>
  ),
};
