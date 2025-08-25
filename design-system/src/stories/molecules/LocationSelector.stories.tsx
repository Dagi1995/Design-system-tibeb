import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import LocationSelector from "../../components/molecules/LocationInput";

const meta: Meta<typeof LocationSelector> = {
  title: "Design-system/Components/Molecules/LocationSelector",
  component: LocationSelector,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    disabled: { control: "boolean" },
    onCountryChange: { action: "country changed" },
    onStateChange: { action: "state changed" },
  },
};

export default meta;
type Story = StoryObj<typeof LocationSelector>;

export const Default: Story = {
  args: {
    disabled: false,
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
  },
};

export const WithCallbacks: Story = {
  args: {
    onCountryChange: (country) => console.log("Selected country:", country),
    onStateChange: (state) => console.log("Selected state:", state),
  },
};
