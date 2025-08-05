import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { FiltersPanel } from "../../components/organisms/DynamicFilterRow"

const meta: Meta<typeof FiltersPanel> = {
  title: "Design-system/Components/Organisms/DynamicFilterRow",
  component: FiltersPanel,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: `Reusable FiltersPanel component that accepts dynamic field and operator options. It mimics Frappe filters with a clean UI using custom Select, Input, Button, and Popover components.`,
      },
    },
  },
}

export default meta
type Story = StoryObj<typeof FiltersPanel>

export const Default: Story = {
  render: () => (
    <FiltersPanel
      fieldOptions={[
        { label: "Customer", value: "customer", type: "text" },
        { label: "ID", value: "id", type: "text" },
        { label: "Status", value: "status", type: "text" },
        { label: "Created At", value: "createdAt", type: "date" },
      ]}
      operatorOptions={[
        { label: "Equals", value: "equals", type: "text" },
        { label: "Not Equals", value: "not_equals", type: "text" },
        { label: "Contains", value: "contains", type: "text" },
        { label: "Before", value: "before", type: "date" },
        { label: "After", value: "after", type: "date" },
        { label: "Between", value: "between", type: "date" },
      ]}
      onApply={(filters) => console.log("Applied Filters:", filters)}
    />
  ),
}
