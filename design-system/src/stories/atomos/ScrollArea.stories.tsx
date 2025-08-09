// scroll-area.stories.tsx
import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { ScrollArea, ScrollBar } from "../../components/atoms/ScrollArea";
import { Separator } from "../../components/atoms/Separator"; // Make sure to import your Separator component
import React from "react";

const meta: Meta<typeof ScrollArea> = {
  title: "Design_system/Components/Atoms/ScrollArea",
  component: ScrollArea,
  tags: ["autodocs"],
  argTypes: {
    className: {
      control: "text",
      description: "Additional class names for styling",
    },
    type: {
      control: "select",
      options: ["auto", "always", "scroll", "hover"],
      description: "Scrollbar visibility behavior",
    },
  },
};

export default meta;

type Story = StoryObj<typeof ScrollArea>;

// Reusable tag list component
const TagList = ({ count = 50 }: { count?: number }) => {
  const tags = Array.from({ length: count }).map(
    (_, i, a) => `v1.2.0-beta.${a.length - i}`
  );

  return (
    <div className="p-4">
      <h4 className="mb-4 text-sm font-medium leading-none">Tags</h4>
      {tags.map((tag) => (
        <React.Fragment key={tag}>
          <div className="text-sm">{tag}</div>
          <Separator className="my-2" />
        </React.Fragment>
      ))}
    </div>
  );
};

export const Default: Story = {
  render: (args) => (
    <ScrollArea className="h-72 w-48 rounded-md border" {...args}>
      <TagList />
    </ScrollArea>
  ),
};

export const InsideCard: Story = {
  render: (args) => {
    // Generate tags inside the render function
    const tags = Array.from({ length: 30 }).map(
      (_, i, a) => `v1.2.0-beta.${a.length - i}`
    );

    return (
      <div className="max-w-sm rounded-lg border bg-card text-card-foreground shadow-sm">
        <div className="p-4 border-b">
          <h3 className="text-lg font-semibold">Version Tags</h3>
          <p className="text-sm text-muted-foreground">
            Scroll through all available tags
          </p>
        </div>
        <ScrollArea className="h-72" {...args}>
          <TagList count={30} />
        </ScrollArea>
        <div className="p-4 border-t text-sm text-muted-foreground">
          {tags.length} tags total
        </div>
      </div>
    );
  },
};

export const WithCustomScrollbar: Story = {
  render: (args) => (
    <div className="flex gap-4">
      <ScrollArea className="h-72 w-48 rounded-md border" {...args}>
        <TagList />
        <ScrollBar className="bg-gray-200 hover:bg-gray-300" />
      </ScrollArea>

      <ScrollArea className="h-72 w-48 rounded-md border" {...args}>
        <TagList />
        <ScrollBar className="bg-blue-100 hover:bg-blue-200" />
      </ScrollArea>
    </div>
  ),
};

export const HorizontalTags: Story = {
  render: (args) => (
    <ScrollArea className="h-24 w-full rounded-md border" {...args}>
      <div className="flex w-max space-x-4 p-4">
        {Array.from({ length: 50 }).map((_, i) => (
          <div key={i} className="rounded-full bg-gray-100 px-3 py-1 text-sm">
            tag-v1.2.{i}
          </div>
        ))}
      </div>
      <ScrollBar orientation="horizontal" />
    </ScrollArea>
  ),
};

export const DarkMode: Story = {
  render: (args) => (
    <div className="dark rounded-md border p-4 dark:bg-gray-900">
      <ScrollArea className="h-72 w-48" {...args}>
        <TagList />
      </ScrollArea>
    </div>
  ),
  parameters: {
    themes: {
      default: "dark",
    },
  },
};
