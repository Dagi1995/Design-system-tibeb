import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import React, { useState } from "react";
import { SearchInput } from "../../components/molecules/SearchInput";

const meta: Meta<typeof SearchInput> = {
  title: "Design-system/Components/Molecules/SearchInput",
  component: SearchInput,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "SearchInput is an input field with a search icon on the left and a clear button (×) on the right. It uses the custom Button and Input components.",
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof SearchInput>;

export const Default: Story = {
  render: () => {
    const [value, setValue] = useState("");

    return (
      <div className="max-w-sm">
        <SearchInput
          value={value}
          onChange={setValue}
          placeholder="Search something..."
        />
      </div>
    );
  },
};
