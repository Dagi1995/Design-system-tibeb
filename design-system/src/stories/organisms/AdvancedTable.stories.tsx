import { Meta, StoryObj } from "@storybook/nextjs-vite"
import { AdvancedTable } from "../../components/organisms/AdvancedTable"

const meta: Meta<typeof AdvancedTable> = {
  title: "Design-system/Components/Organisms/AdvancedTable",
  component: AdvancedTable,
}
export default meta

type Story = StoryObj<typeof AdvancedTable>

export const Default: Story = {}
