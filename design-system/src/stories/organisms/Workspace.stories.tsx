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
            value: "Text"
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
        contents: [
          {
            type: "Text",
            name: "Welcome",
            description: "Welcome message",
            value: "Welcome to your workspace! This is a simple text component."
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
        contents: [
          {
            type: "Stats",
            name: "Project Status",
            value: 
              { label: "Total Projects", value: "18" }
          
          },
          {
            type: "Column",
            name: "Column",
            value: "Column"
          },
          {
            type: "Column",
            name: "Column",
            value: "Column"
          },
          {
            type: "Stats",
            name: "Project Status",
            value: 
              { label: "Total Projects", value: "18" }
          
          },
          {
            type: "Column",
            name: "Column",
            value: "Column"
          },
          {
            type: "Stats",
            name: "Project Status",
            value: 
              { label: "Total Projects", value: "18" }
          
          },
        ]
      },
      {
        title: "Tasks & Activities",
        contents: [
          {
            type: "QuickList",
            name: "My Tasks",
            description: "Your assigned tasks",
            value: [
              { name: "Review PR #245", description: "Code review for new feature" },
              { name: "Update project documentation", description: "Document API changes" },
              { name: "Meet with design team", description: "Discuss UI improvements" },
              { name: "Prepare quarterly report", description: "Compile project metrics" }
            ]
          },
          {
            type: "Column",
            name: "Column",
            value: "Column"
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
            }
          },
          {
            type: "Column",
            name: "Column",
            value: "Column"
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
            ]
          }
        ]
      }
    ]
  }
};
