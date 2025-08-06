import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { Separator } from "../../components/atoms/Separator"

const meta: Meta<typeof Separator> = {
  title: "Design-system/Components/Atoms/Separator",
  component: Separator,
  tags: ["autodocs"],
  argTypes: {
    orientation: {
      control: "radio",
      options: ["horizontal", "vertical"],
    },
  },
}
export default meta

type Story = StoryObj<typeof Separator>

export const Horizontal: Story = {
  args: {
    orientation: "horizontal",
    className: "my-4",
  },
  render: (args) => (
    <div>
      <div>Above the line</div>
      <Separator {...args} />
      <div>Below the line</div>
      <Separator {...args} />

    </div>
  ),
}

export const Vertical: Story = {
  args: {
    orientation: "vertical",
    className: "m",
  },
  render: (args) => (
    <div className="flex gap-2 items-center">
      <div>Left</div>
      <Separator {...args} />
      <div>Right</div>
      <Separator {...args} />

    </div>
  ),
}
