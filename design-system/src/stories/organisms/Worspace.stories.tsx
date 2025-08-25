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

export const Abebe: Story = {
    args: {
        name: "Workspace",
        description: "Workspace",
        sections: [
            {
                contents: [
                    {
                        type: "Chart",
                        name: "Line Chart",
                        description: "Chart",
                        value: {
                            type: "LineChart",
                            data: [
                                { name: "Jan", sales: 2400, revenue: 4000 },
                                { name: "Feb", sales: 1398, revenue: 3000 },
                                { name: "Mar", sales: 9800, revenue: 5000 },
                                { name: "Apr", sales: 3908, revenue: 4700 },
                                { name: "May", sales: 4800, revenue: 6000 },
                                { name: "Jun", sales: 3800, revenue: 5200 },
                            ],
                            config: { 
                                sales: { label: "Sales", color: "#3b82f0" },     
                                revenue: { label: "Revenue", color: "#10b981" }, 
                            }
                        }
                    },
                    {
                        type: "Column",
                        name: "Column",
                        description: "Column",
                        value: "Column"
                    },
                    {
                        type: "Chart",
                        name: "Bar Chart",
                        description: "Chart",
                        value: {
                            type: "BarChart",
                            data: [
                                { name: "Jan", sales: 2400, revenue: 4000 },
                                { name: "Feb", sales: 1398, revenue: 3000 },
                                { name: "Mar", sales: 9800, revenue: 5000 },
                                { name: "Apr", sales: 3908, revenue: 4700 },
                                { name: "May", sales: 4800, revenue: 6000 },
                                { name: "Jun", sales: 3800, revenue: 5200 },
                            ],
                            config: {
                                sales: { label: "Sales", color: "#3b82f0" },
                                revenue: { label: "Revenue", color: "#10b981" },
                            }
                        }
                    },
                    {
                        type: "Column",
                        name: "Column",
                        description: "Column",
                        value: "Column"
                    },
                    {
                      type: "Chart",
                      name: "Pie Chart",
                      description: "Chart",
                      value: {
                        type: "PieChart",
                        data: [
                          { name: "Sales", value: 400 },
                          { name: "Revenue", value: 300 },
                          { name: "Cost", value: 300 },
                          { name: "Profit", value: 200 },
                        ],
                        config: {
                          sales: { label: "Sales", color: "#3b82f0" },
                          revenue: { label: "Revenue", color: "#10b981" },
                          cost: { label: "Cost", color: "#facc15" },
                          profit: { label: "Profit", color: "#f472b6" },
                        }
                      }
                    },
                ]
            },
            {
                contents: [
                    {
                        type: "Link",
                        name: "Link",
                        description: "Link",
                        value: "Link"
                    },
                    {
                        type: "Shortcut",
                        name: "Shortcut",
                        description: "Shortcut",
                        value: "Shortcut"
                    },
                    {
                        type: "QuickList",
                        name: "QuickList",
                        description: "QuickList",
                        value: "QuickList"
                    },
                    {
                        type: "Cards",
                        name: "Cards",
                        description: "Cards",
                        value: [
                          "lorem ipsum dolor sit amet consectetur adipiscing elit continue ipsum dolor sit amet consectetur adipiscing elit",
                          
                        ]
                    }
                ]
            }
        ]
    },
    play: async ({ canvasElement }) => {
        const canvas = within(canvasElement);
        await expect(canvas.getByText('Workspace')).toBeInTheDocument();
    },
};