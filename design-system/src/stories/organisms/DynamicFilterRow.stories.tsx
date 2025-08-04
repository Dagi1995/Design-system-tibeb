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
        { label: "Customer", value: "customer" },
        { label: "ID", value: "id" },
        { label: "Status", value: "status" },
      ]}
      operatorOptions={[
        { label: "Equals", value: "equals" },
        { label: "Not Equals", value: "not_equals" },
        { label: "Contains", value: "contains" },
      ]}
      onApply={(filters) => console.log("Applied Filters:", filters)}
    />
  ),
}
