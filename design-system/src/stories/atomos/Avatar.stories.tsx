import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import {
  Avatar,
  AvatarImage,
  AvatarFallback,
} from "../../components/atoms/Avatar"

const meta: Meta<typeof Avatar> = {
  title: "Design-system/Components/Atoms/Avatar",
  component: Avatar,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
}

export default meta
type Story = StoryObj<typeof Avatar>

export const Default: Story = {
  render: () => (
    <Avatar>
      <AvatarImage src="https://github.com/shadcn.png" alt="shadcn"/>
      <AvatarFallback>SC</AvatarFallback>
    </Avatar>
  ),
}

export const NoImage: Story = {
  render: () => (
    <Avatar>
      <AvatarImage src="" alt="No image" />
      <AvatarFallback>JD</AvatarFallback>
    </Avatar>
  ),
}

export const CustomSize: Story = {
  render: () => (
    <Avatar className="size-16"> 
      <AvatarImage src="https://i.pravatar.cc/300" alt="User" />
      <AvatarFallback className="text-lg">U</AvatarFallback>
    </Avatar>
  ),
}
