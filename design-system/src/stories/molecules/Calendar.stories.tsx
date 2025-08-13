import { Meta, StoryObj } from "@storybook/nextjs-vite";

import { Calendar } from "../../components/molecules/Calendar";

const meta: Meta<typeof Calendar> = {
  title: "Design-system/Components/Molecules/Calendar",
  component: Calendar,
  tags: ["autodocs"],
  args: {
    mode: "single", // react-day-picker prop
    selected: new Date(),
  },
};

export default meta;

type Story = StoryObj<typeof Calendar>;

export const Default: Story = {};

export const WithRangeSelection: Story = {
  args: {
    mode: "range",
    selected: {
      from: new Date(),
      to: new Date(new Date().setDate(new Date().getDate() + 5)),
    },
  },
};
