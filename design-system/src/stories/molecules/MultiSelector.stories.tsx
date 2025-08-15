import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import * as React from "react";
import {
  MultiSelector,
  MultiSelectorTrigger,
  MultiSelectorInput,
  MultiSelectorContent,
  MultiSelectorList,
  MultiSelectorItem,
  MultiSelectValue,
} from "../../components/molecules/MultiSelector";

const meta: Meta<typeof MultiSelector> = {
  title: "Design-system/Components/Molecules/MultiSelector",
  component: MultiSelector,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
};

export default meta;
type Story = StoryObj<typeof MultiSelector>;

const options: MultiSelectValue[] = [
  { label: "React", value: "react" },
  { label: "Vue", value: "vue" },
  { label: "Svelte", value: "svelte" },
  { label: "Angular", value: "angular" },
  { label: "Solid", value: "solid" },
];

export const Default: Story = {
  render: () => {
    const [value, setValue] = React.useState<MultiSelectValue[]>([]);

    return (
      <MultiSelector
        values={value}
        onValuesChange={setValue}
        loop={false}
        className="w-[400px]"
      >
        <MultiSelectorTrigger>
          <MultiSelectorInput placeholder="Select your framework" />
        </MultiSelectorTrigger>
        <MultiSelectorContent>
          <MultiSelectorList>
            {options.map((option) => (
              <MultiSelectorItem
                key={option.value}
                value={option.value}
                label={option.label}
              >
                {option.label}
              </MultiSelectorItem>
            ))}
          </MultiSelectorList>
        </MultiSelectorContent>
      </MultiSelector>
    );
  },
};

export const WithPreselectedValues: Story = {
  render: () => {
    const [value, setValue] = React.useState<MultiSelectValue[]>([
      { label: "React", value: "react" },
      { label: "Vue", value: "vue" },
    ]);

    return (
      <MultiSelector
        values={value}
        onValuesChange={setValue}
        loop={false}
        className="w-[400px]"
      >
        <MultiSelectorTrigger>
          <MultiSelectorInput placeholder="Select your framework" />
        </MultiSelectorTrigger>
        <MultiSelectorContent>
          <MultiSelectorList>
            {options.map((option) => (
              <MultiSelectorItem
                key={option.value}
                value={option.value}
                label={option.label}
              >
                {option.label}
              </MultiSelectorItem>
            ))}
          </MultiSelectorList>
        </MultiSelectorContent>
      </MultiSelector>
    );
  },
};
