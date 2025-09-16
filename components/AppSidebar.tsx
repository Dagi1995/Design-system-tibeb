import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/design-system/src/components/atoms/Collapsible";
import { Separator } from "@/design-system/src/components/atoms/Separator";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/design-system/src/components/molecules/DropdownMenu";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuBadge,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarSeparator,
} from "@/design-system/src/components/organisms/SideBar";
import {
  Ticket,
  LayoutDashboard,
  Users,
  Settings,
  BarChart,
  ChevronDown,
  ChevronUp,
  Plus,
  Workflow,
  User2,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

// Modern font
import { Poppins } from "next/font/google";
const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-poppins",
});

const items = [
  { title: "Dashboard", url: "/", icon: LayoutDashboard },
  { title: "Tickets", url: "/tickets", icon: Ticket },
  { title: "Analytics", url: "/analytics", icon: BarChart },
  { title: "Agents", url: "/agents", icon: Users },
  { title: "Settings", url: "/settings", icon: Settings },
];

const AppSidebar = () => {
  return (
    <Sidebar collapsible="icon" className={`${poppins.variable} font-sans`}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild className="!text-lg !px-4 !py-3">
              <Link href="/" className="flex items-center gap-4">
                <Image src="/image.png" alt="logo" width={28} height={28} />
                <span className="text-2xl font-semibold">TicketSys</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarSeparator />

      <SidebarContent>
        {/* Main navigation */}
        <SidebarGroup>
          <SidebarGroupLabel className="!text-sm !px-4 !py-2 text-gray-500 uppercase tracking-wider">
            Main
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild className="!text-lg !px-4 !py-3">
                    <Link href={item.url} className="flex items-center gap-4">
                      <item.icon className="w-6 h-6 text-gray-600" />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                  {item.title === "Tickets" && (
                    <SidebarMenuBadge className="!text-sm">24</SidebarMenuBadge>
                  )}
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Ticket actions */}
        <SidebarGroup>
          <SidebarGroupLabel className="!text-sm !px-4 !py-2 text-gray-500 uppercase tracking-wider">
            Tickets
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild className="!text-lg !px-4 !py-3">
                  <Link href="/tickets" className="flex items-center gap-4">
                    <Ticket className="w-6 h-6 text-gray-600" /> All Tickets
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild className="!text-lg !px-4 !py-3">
                  <Link href="/tickets/new" className="flex items-center gap-4">
                    <Plus className="w-6 h-6 text-gray-600" /> Create Ticket
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Collapsible example for workflows */}
        <Collapsible defaultOpen className="group/collapsible">
          <SidebarGroup>
            <SidebarGroupLabel asChild>
              <CollapsibleTrigger className="flex items-center justify-between w-full !px-4 !py-3 !text-lg">
                Workflows
                <ChevronDown className="ml-auto w-5 h-5 transition-transform group-data-[state=open]/collapsible:rotate-180" />
              </CollapsibleTrigger>
            </SidebarGroupLabel>
            <CollapsibleContent>
              <SidebarGroupContent>
                <SidebarMenu>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild className="!text-lg !px-4 !py-3">
                      <Link
                        href="/workflows/active"
                        className="flex items-center gap-4"
                      >
                        <Workflow className="w-6 h-6 text-gray-600" /> Active
                        Workflows
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild className="!text-lg !px-4 !py-3">
                      <Link
                        href="/workflows/new"
                        className="flex items-center gap-4"
                      >
                        <Plus className="w-6 h-6 text-gray-600" /> Add Workflow
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                </SidebarMenu>
              </SidebarGroupContent>
            </CollapsibleContent>
          </SidebarGroup>
        </Collapsible>
      </SidebarContent>

      {/* Footer - Profile */}
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton className="flex items-center gap-4 !text-lg !px-4 !py-3">
                  <User2 className="w-6 h-6 text-gray-600" /> John Doe
                  <ChevronUp className="ml-auto w-5 h-5" />
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="!text-lg !px-4 !py-3">
                <DropdownMenuItem className="!text-lg">
                  Account
                </DropdownMenuItem>
                <DropdownMenuItem className="!text-lg">
                  Settings
                </DropdownMenuItem>
                <DropdownMenuItem className="!text-lg">
                  Sign out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
};

export default AppSidebar;
