import { Meta, StoryObj } from "@storybook/nextjs-vite"; // Changed to @storybook/react for Meta/StoryObj types
import { RegisterForm } from "../../components/organisms/RegisterForm";

const meta: Meta<typeof RegisterForm> = {
  title: "Design-system/Components/Organisms/RegisterForm",
  component: RegisterForm,
  parameters: {
    layout: "centered",
    nextjs: {
      appDirectory: true,
    },
  },
} satisfies Meta<typeof RegisterForm>; 

export default meta;
type Story = StoryObj<typeof RegisterForm>;

export const Default: Story = {

};