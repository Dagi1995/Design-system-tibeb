import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { ColorPicker } from "../../components/molocules/ColorPicker"

const meta: Meta<typeof ColorPicker> = {
  title: "Design-system/Components/Molecules/ColorPicker",
  component: ColorPicker,
  parameters: {
    layout: "centered",
  },
}

export default meta

type Story = StoryObj<typeof ColorPicker>

export const Default: Story = {
  args: {
    value: "#8b5cf6",
  },
}
