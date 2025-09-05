import React from "react";
import { Meta, StoryObj } from "@storybook/nextjs-vite";
import Page from "@/app/list/page";
import data from "@/app/list/data.json";

const meta: Meta<typeof Page> = {
  title: "Design-system/Templates/ItemList/item-list-page",
  component: Page,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
  },
};

export default meta;
type Story = StoryObj<typeof Page>;

// Default story with normal data
export const Default: Story = {
  render: () => (
    <div style={{ height: "100vh", width: "100vw" }}>
      <Page pageData={data} />
    </div>
  ),
};

// Story with empty table
export const EmptyTable: Story = {
  render: () => (
    <div style={{ height: "100vh", width: "100vw" }}>
      <Page pageData={[]} />
    </div>
  ),
};

// Story with custom data
export const CustomData: Story = {
  render: () => (
    <div style={{ height: "100vh", width: "100vw" }}>
      <Page
        pageData={[
          {
            id: 1,
            header: "Task 1",
            type: "Bug",
            status: "Done",
            target: "Team A",
            limit: "5d",
            reviewer: "John Doe",
          },
          {
            id: 2,
            header: "Task 2",
            type: "Feature",
            status: "Pending",
            target: "Team B",
            limit: "3d",
            reviewer: "Jane Smith",
          },
        ]}
      />
    </div>
  ),
};
