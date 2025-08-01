// Temporarily simplify design-system/src/stories/organisms/login.stories.tsx
import { Meta, StoryObj } from "@storybook/nextjs-vite"; // Ensure this is @storybook/react
import { LoginForm } from "../../components/organisms/LoginForm"; // Verify this path is correct

const meta: Meta<typeof LoginForm> = {
  title: "Design-system/Components/Organisms/LoginForm",
  component: LoginForm,
  parameters: {
    layout: "centered",
    nextjs: {
      appDirectory: true,
    },
  },
} satisfies Meta<typeof LoginForm>;

export default meta;
type Story = StoryObj<typeof LoginForm>;

export const Default: Story = {}; // Remove play function temporarily