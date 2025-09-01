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

// Dashboard Workspace with Multiple Charts
export const Dashboard: Story = {
  args: {
    name: "Analytics Dashboard",
    description: "A comprehensive dashboard with multiple visualizations",
    sections: [
      {
        title: "Key Metrics",
        description: "Important statistics at a glance",
        contents: [
          {
            type: "Stats",
            name: "Performance Overview",
            value: 
              { label: "Total Users", value: "12.4K" }
            
          },
          {
            type: "Column",
            name: "Column",
            value: "Column"
          },
          {
            type: "Chart",
            name: "Revenue Trend",
            description: "Monthly revenue performance",
            value: {
              type: "LineChart",
              data: [
                { name: "Jan", revenue: 4000, target: 3800 },
                { name: "Feb", revenue: 3000, target: 4200 },
                { name: "Mar", revenue: 5000, target: 4800 },
                { name: "Apr", revenue: 4700, target: 5000 },
                { name: "May", revenue: 6000, target: 5500 },
                { name: "Jun", revenue: 5200, target: 6000 },
                { name: "Jul", revenue: 6800, target: 6200 },
                { name: "Aug", revenue: 7200, target: 6500 },
                { name: "Sep", revenue: 6500, target: 6800 },
                { name: "Oct", revenue: 7500, target: 7000 },
                { name: "Nov", revenue: 8000, target: 7500 },
                { name: "Dec", revenue: 8500, target: 8000 },
              ],
              config: { 
                revenue: { label: "Revenue", color: "#10b981" },
                target: { label: "Target", color: "#8b5cf6" }
              }
            }
          }
        ]
      },
      {
        title: "Detailed Analytics",
        description: "In-depth analysis of business metrics",
        contents: [
          {
            type: "Chart",
            name: "Sales by Category",
            description: "Monthly sales breakdown",
            value: {
              type: "BarChart",
              data: [
                { name: "Jan", electronics: 1400, clothing: 1000, groceries: 800 },
                { name: "Feb", electronics: 1398, clothing: 1200, groceries: 900 },
                { name: "Mar", electronics: 2800, clothing: 1800, groceries: 1200 },
                { name: "Apr", electronics: 1908, clothing: 1500, groceries: 1100 },
                { name: "May", electronics: 2800, clothing: 2000, groceries: 1300 },
                { name: "Jun", electronics: 1800, clothing: 1700, groceries: 1400 },
              ],
              config: {
                electronics: { label: "Electronics", color: "#3b82f6" },
                clothing: { label: "Clothing", color: "#f59e0b" },
                groceries: { label: "Groceries", color: "#10b981" }
              }
            }
          },
          {
            type: "Column",
            name: "Column",
            value: "Column"
          },
          {
            type: "Chart",
            name: "Customer Distribution",
            description: "Customer segmentation",
            value: {
              type: "PieChart",
              data: [
                { name: "New Customers", value: 400 },
                { name: "Returning Customers", value: 300 },
                { name: "VIP Customers", value: 200 },
                { name: "Inactive Customers", value: 100 },
              ],
              config: {
                "new customers": { label: "New Customers", color: "#3b82f6" },
                "returning customers": { label: "Returning Customers", color: "#10b981" },
                "vip customers": { label: "VIP Customers", color: "#f59e0b" },
                "inactive customers": { label: "Inactive Customers", color: "#ef4444" }
              }
            }
          },
          {
            type: "Column",
            name: "Column",
            value: "Column"
          },
          {
            type: "QuickList",
            name: "Quick Actions",
            description: "Frequently used actions",
            value: [
              { name: "Generate Report", description: "Create a new analytics report" },
              { name: "Add User", description: "Create a new user account" },
              { name: "Export Data", description: "Export data to CSV" },
              { name: "Settings", description: "Configure application settings" }
            ]
          }
        ]
      },
      {
        title: "Additional Information",
        description: "Supporting content and resources",
        contents: [
          {
            type: "Cards",
            name: "Recent Activities",
            description: "Latest events in the system",
            value: [
              { content: "User registration completed - 5 minutes ago" },
              { content: "New order #1234 placed - 12 minutes ago" },
              { content: "Monthly report generated - 1 hour ago" },
              { content: "System backup completed - 3 hours ago" }
            ]
          },
          {
            type: "Column",
            name: "Column",
            value: "Column"
          },
          {
            type: "Text",
            name: "Notes",
            description: "Important information",
            value: "The Q2 performance exceeded expectations with a 15% increase in revenue compared to Q1. The marketing campaign launched in April appears to be driving results."
          },
          {
            type: "Column",
            name: "Column",
            value: "Column"
          },
          {
            type: "Shortcut",
            name: "Support Resources",
            description: "Helpful links",
            value: [
              { description: "Documentation" },
              { description: "Knowledge Base" },
              { description: "Community Forum" }
            ]
          }
        ]
      }
    ]
  },
  play: async ({ canvasElement }: { canvasElement: HTMLElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByText('Analytics Dashboard')).toBeInTheDocument();
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

// E-commerce Workspace
export const Ecommerce: Story = {
  args: {
    name: "E-commerce Dashboard",
    description: "Online store management and analytics",
    sections: [
      {
        title: "Sales Performance",
        contents: [
          {
            type: "Stats",
            name: "Today's Performance",
            value: 
              { label: "Orders", value: "142" }
          },
          {
            type: "Column",
            name: "Column",
            value: "Column"
          },
          {
            type: "Chart",
            name: "Sales Trend",
            description: "Daily sales performance",
            value: {
              type: "LineChart",
              data: [
                { name: "Mon", sales: 6400, avg: 6000 },
                { name: "Tue", sales: 7200, avg: 6000 },
                { name: "Wed", sales: 5800, avg: 6000 },
                { name: "Thu", sales: 8100, avg: 6000 },
                { name: "Fri", sales: 9500, avg: 6000 },
                { name: "Sat", sales: 11200, avg: 6000 },
                { name: "Sun", sales: 8900, avg: 6000 }
              ],
              config: { 
                sales: { label: "Sales", color: "#8b5cf6" },
                avg: { label: "Average", color: "#d1d5db" }
              }
            }
          }
        ]
      },
      {
        title: "Product Analysis",
        contents: [
          {
            type: "Chart",
            name: "Top Categories",
            description: "Revenue by product category",
            value: {
              type: "PieChart",
              data: [
                { name: "Electronics", value: 45 },
                { name: "Clothing", value: 25 },
                { name: "Home & Garden", value: 15 },
                { name: "Books", value: 10 },
                { name: "Other", value: 5 }
              ],
              config: {
                electronics: { label: "Electronics", color: "#3b82f6" },
                clothing: { label: "Clothing", color: "#f59e0b" },
                "home & garden": { label: "Home & Garden", color: "#10b981" },
                books: { label: "Books", color: "#ef4444" },
                other: { label: "Other", color: "#8b5cf6" }
              }
            }
          },
          {
            type: "Column",
            name: "Column",
            value: "Column"
          },
          {
            type: "QuickList",
            name: "Low Stock Alert",
            description: "Products needing restock",
            value: [
              { name: "Wireless Earbuds", description: "Only 3 left in stock" },
              { name: "Smart Watch", description: "Only 5 left in stock" },
              { name: "Yoga Mat", description: "Only 2 left in stock" }
            ]
          }
        ]
      }
    ]
  }
};