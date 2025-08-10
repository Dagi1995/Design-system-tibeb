import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import { Tree } from '../../components/organisms/Tree'
import { TreeNode, TreeAction } from '../../components/organisms/Tree'
import { Edit, Plus, Trash2 } from "lucide-react"

const meta: Meta<typeof Tree> = {
  title: 'Design-system/Components/Organisms/Tree',
  component: Tree,
  tags: ['autodocs'],
  argTypes: {
    data: { control: 'object' },
    actions: { control: 'object' },
    collapsible: { control: 'boolean' },
    defaultCollapsed: { control: 'boolean' },
  },
}

export default meta
type Story = StoryObj<typeof Tree>

const sampleData: TreeNode[] = [
  {
    id: '1000',
    label: 'Assets - GTW',
    value: 259640.00,
    children: [
      {
        id: '1100',
        label: 'Current Assets - GTW',
        value: 259640.00,
        children: [
          {
            id: '1100',
            label: 'Cash at Bank - GTW',
            value: 98780.00,
            children: [
              { id: '1101', label: 'CBE Mehal ketema Branch (100033594297) - GTW', value: 67100.00 },
              { id: '1102', label: 'CBE Yerer ber Branch (1000667857019) - GTW', value: 31680.00 },
              { id: '1003', label: 'Abay bank Stadium Branch(165201555297600) - GTW', value: 0.00, type: 'selected' },
            ],
          },
          { id: '1110', label: 'Cash on Hand - GTW', value: 4380.00 },
          { id: '1150', label: 'Accounts Receivable - GTW', value: 6000.00, children: [
            { id: '1170', label: 'Vat receivable - GTW', value: 0.00 },
            { id: '1180', label: 'Advance profit tax - GTW', value: 0.00 },
          ]},
          { id: '1190', label: 'Advance Payment - GTW', value: 0.00 },
          { id: '1191', label: 'Prepaid rent - GTW', value: 0.00 },
          { id: '1301', label: 'Office supplies - GTW', value: 0.00 },
          { id: '1303', label: 'Prepaid insurance - GTW', value: 0.00 },
        ],
      },
      { id: '1500', label: 'Loans and Advances (Assets) - GTW', value: 0.00 },
      { id: '1600', label: 'Securities and Deposits - GTW', value: 0.00 },
      { id: '1700', label: 'Stock Assets - GTW', value: 150480.00 },
      { id: '1800', label: 'Fixed Assets - GTW', value: 0.00 },
      { id: '1900', label: 'Inventory - GTW', value: 0.00 },
    ],
  },
]

const customActions: TreeAction[] = [
  { id: 'edit', label: 'Edit', icon: <Edit className="h-4 w-4" />, action: (id) => console.log(`Edit ${id}`) },
  { id: 'add-child', label: 'Add Child', icon: <Plus className="h-4 w-4" />, action: (id) => console.log(`Add child to ${id}`) },
  { id: 'delete', label: 'Delete', icon: <Trash2 className="h-4 w-4" />, action: (id) => console.log(`Delete ${id}`), variant: 'destructive' },
]

export const Default: Story = {
  args: {
    data: sampleData,
    collapsible: true,
    defaultCollapsed: false,
  },
}

export const WithCustomActions: Story = {
  args: {
    data: sampleData,
    actions: customActions,
  },
}