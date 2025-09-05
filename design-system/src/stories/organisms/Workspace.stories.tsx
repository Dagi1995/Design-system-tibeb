import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { Workspace } from '../../components/organisms/Workspace';
import { expect, within } from '@storybook/test';

const meta: Meta<typeof Workspace> = {
  title: "Design-system/Components/Organisms/Workspace",
  component: Workspace,
  tags: ["autodocs"],
  args: {
    name: "Workspace",
    description: "Workspace",
    sections: [
      {
        contents: [
          {
            type: "Text",
            name: "Text",
            description: "Text",
            value: "Text",
            span: 1, // Explicitly setting span, but will default to full width
          }
        ]
      }
    ]
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// Basic Workspace
export const Basic: Story = {
  args: {
    name: "Basic Workspace",
    description: "A simple workspace with text content",
    sections: [
      {
        columns: 1, // Single column layout
        contents: [
          {
            type: "Text",
            name: "Welcome",
            description: "Welcome message",
            value: "Welcome to your workspace! This is a simple text component.",
            span: 1, // Will take full width
          }
        ]
      }
    ]
  },
  play: async ({ canvasElement }: { canvasElement: HTMLElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByText('Basic Workspace')).toBeInTheDocument();
  },
};

// Project Management Workspace
export const ProjectManagement: Story = {
  args: {
    name: "Project Management",
    description: "Workspace for managing projects and tasks",
    sections: [
      {
        title: "Project Overview",
        columns: 3, // Three-column layout
        contents: [
          {
            type: "Stats",
            name: "Project Status",
            value: { label: "Total Projects", value: "18" },
            span: 3,
          },
          {
            type: "Stats",
            name: "Active Tasks",
            value: { label: "Active Tasks", value: "42" },
            span: 3, 
          },
          {
            type: "Stats",
            name: "Completed Projects",
            value: { label: "Completed Projects", value: "12" },
            span: 3, 
          },
        ]
      },
      {
        title: "Activities",
        columns: 2, // Single column for charts
        contents: [
          {
            type: "Chart",
            name: "Task Completion",
            description: "Completion rate by team",
            value: {
              type: "LineChart",
              data: [
                { name: "Design", completed: 75, remaining: 25 },
                { name: "Development", completed: 60, remaining: 40 },
                { name: "Testing", completed: 45, remaining: 55 },
                { name: "Documentation", completed: 30, remaining: 70 }
              ],
              config: {
                completed: { label: "Completed", color: "#10b981" },
                remaining: { label: "Remaining", color: "#f59e0b" }
              }
            },
            span: 1
          },
          {
            type: "Chart",
            name: "Task Completion",
            description: "Completion rate by team",
            value: {
              type: "BarChart",
              data: [
                { name: "Design", completed: 75, remaining: 25 },
                { name: "Development", completed: 60, remaining: 40 },
                { name: "Testing", completed: 45, remaining: 55 },
                { name: "Documentation", completed: 30, remaining: 70 }
              ],
              config: {
                completed: { label: "Completed", color: "#10b981" },
                remaining: { label: "Remaining", color: "#f59e0b" }
              }
            },
            span: 1
          },
        ]
      },
      {
        title: "Quick List",
        columns: 3,
        contents: [
          {
            type: "QuickList",
            name: "Links",
            value: [
              { name: "Item List", url: "https://example.com" },
              { name: "Customers", url: "https://example.com" },
              { name: "Orders", url: "https://example.com" },
              { name: "Products", url: "https://example.com" },
              { name: "Categories", url: "https://example.com" },
              { name: "Suppliers", url: "https://example.com" }
            ],
            span: 2, 
          },
          {
            type: "Cards",
            name: "Recent Updates",
            description: "Latest project activities",
            value: [
              { content: "Feature X deployed to production" },
              { content: "Bug #123 resolved in development" },
              { content: "New team member onboarding completed" },
              { content: "Client meeting scheduled for Friday" }
            ],
            span: 3, 
          },
          {
            type: "Link",
            name: "Item Lists",
            value: [
              { name: "Ipone 15", status: "Active", url: "https://example.com" },
              { name: "Ipone 15 Pro", status: "Disabled", url: "https://example.com" },
              { name: "Ipone 14 Pro Max", status: "Active", url: "https://example.com" },
              { name: "Ipone 15 Pro Max", status: "Active", url: "https://example.com" },
              { name: "Ipone 16 Pro Max", status: "Disabled", url: "https://example.com" },
              { name: "Ipone 17 Pro Max", status: "Active", url: "https://example.com" }
            ],
            span: 3, 
          },
        ]
      }
    ]
  }
};