import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { NotificationItem } from "../../components/molocules/NotificationItem"

const meta: Meta<typeof NotificationItem> = {
  title: "Design-system/Components/Molecules/NotificationItem",
  component: NotificationItem,
  tags: ["autodocs"],
}

export default meta
type Story = StoryObj<typeof NotificationItem>

export const Default: Story = {
  args: {
    avatarUrl: "https://randomuser.me/api/portraits/women/44.jpg",
    username: "frankiesullivan",
    action: "followed you",
    timeAbsolute: "Thursday 4:20pm",
    timeRelative: "2 hours ago",
    unread: true,
  },
}
