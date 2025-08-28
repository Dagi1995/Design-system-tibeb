import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Button, ButtonArrow } from "../../components/atoms/Button";
import { PlusIcon, ChevronRight } from "lucide-react";

const meta: Meta<typeof Button> = {
  title: "Design-System/Components/Atoms/Button",
  component: Button,
  tags: ["autodocs"],
  args: {
    children: "Click me",
    variant: "default",
    size: "md",
    disabled: false,
    shape: "default",
    mode: "default",
  },
  argTypes: {
    variant: {
      control: "select",
      options: [
        "default",
        "mono",
        "destructive",
        "secondary",
        "outline",
        "dashed",
        "ghost",
        "dim",
        "foreground",
        "inverse",
      ],
    },
    size: {
      control: "select",
      options: ["sm", "md", "lg", "icon"],
    },
    mode: {
      control: "select",
      options: ["default", "icon", "link", "input"],
    },
    shape: {
      control: "select",
      options: ["default", "circle"],
    },
    disabled: { control: "boolean" },
  },
};

export default meta;
type Story = StoryObj<typeof Button>;

// Default Button
export const Default: Story = {};

// Button with Icon
export const WithIcon: Story = {
  args: {
    children: (
      <div className="flex items-center gap-2">
        <PlusIcon className="size-4" />
        Add Item
      </div>
    ),
  },
};

// Destructive Button
export const Destructive: Story = {
  args: { variant: "destructive", children: "Delete" },
};

// Outline Button
export const Outline: Story = {
  args: { variant: "outline", children: "Outline" },
};

// Secondary Button
export const Secondary: Story = {
  args: { variant: "secondary", children: "Secondary" },
};

// Ghost Button
export const Ghost: Story = {
  args: { variant: "ghost", children: "Ghost" },
};

// Link Button
export const Link: Story = {
  args: { variant: "default", mode: "link", children: "Link Button" },
};

// Icon Only Button
export const IconOnly: Story = {
  args: {
    size: "icon",
    children: <PlusIcon className="size-4" />,
    "aria-label": "Add",
  },
};

// Circle Icon Button
export const CircleIconButton: Story = {
  args: {
    size: "icon",
    shape: "circle",
    children: <ChevronRight className="size-4" />,
    "aria-label": "Next",
  },
};

// Large Button
export const LargeButton: Story = {
  args: { size: "lg", children: "Large Button" },
};

// Small Button
export const SmallButton: Story = {
  args: { size: "sm", children: "Small Button" },
};

// Mono Variant
export const Mono: Story = {
  args: { variant: "mono", children: "Mono Button" },
};

// Dashed Variant
export const Dashed: Story = {
  args: { variant: "dashed", children: "Dashed Button" },
};

// Dim Variant
export const Dim: Story = {
  args: { variant: "dim", children: "Dim Button" },
};

// Foreground Variant
export const Foreground: Story = {
  args: { variant: "foreground", children: "Foreground Button" },
};

// Inverse Variant
export const Inverse: Story = {
  args: { variant: "inverse", children: "Inverse Button" },
};
export const WithArrow: Story = {
  args: {
    children: (
      <div className="flex items-center gap-2">
        Menu
        <ButtonArrow />
      </div>
    ),
  },
};
