import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { RegisterForm } from "../../components/organisms/RegisterForm"

const meta: Meta<typeof RegisterForm> = {
  title: "Design-system/Components/Organisms//RegisterForm",
  component: RegisterForm,
  parameters: {
    layout: "centered",
  },
}

export default meta
type Story = StoryObj<typeof RegisterForm>

export const Default: Story = {}
