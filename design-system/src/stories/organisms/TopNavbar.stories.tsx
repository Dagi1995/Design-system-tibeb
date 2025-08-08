import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { TopNavbar } from "../../components/organisms/TopNavbar";
import { Bell } from "lucide-react";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "../../components/atoms/Avatar";
import { Button } from "../../components/atoms/Button";
import { Input } from "../../components/atoms/Input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../../components/molocules/DropdownMenu";

const meta: Meta<typeof TopNavbar> = {
  title: "Design-system/Components/Organisms/TopNavbar",
  component: TopNavbar,
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof TopNavbar>;

export const Default: Story = {
  args: {
    logo: <span className="text-xl font-bold text-blue-600">GovManage</span>,
    links: [
      { label: "Home", href: "/" },
      { label: "Projects", href: "/projects" },
      { label: "Reports", href: "/reports" },
    ],
    rightContent: (
      <div className="flex items-center gap-3">
        {/* Search input */}
        <Input
          type="text"
          placeholder="Search..."
          className="w-[180px] hidden md:block"
        />

        {/* Notification icon */}
        <Button size="icon" variant="ghost">
          <Bell className="w-5 h-5" />
        </Button>

        {/* Avatar dropdown */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Avatar className="h-8 w-8 cursor-pointer">
              <AvatarImage src="/avatar.jpg" />
              <AvatarFallback>GM</AvatarFallback>
            </Avatar>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem>Profile</DropdownMenuItem>
            <DropdownMenuItem>Settings</DropdownMenuItem>
            <DropdownMenuItem>Logout</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    ),
  },
};
