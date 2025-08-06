"use client"

import * as React from "react"
import type { Meta, StoryObj } from "@storybook/nextjs-vite"

import {
  SidebarProvider,
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarFooter,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarTrigger,
  SidebarInset,
  SidebarSeparator,
} from "../../components/organisms/SideBar"

import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuTrigger,
  NavigationMenuContent,
  NavigationMenuLink,
} from "../../components/molocules/NavigationMenu"

import { Skeleton } from "../../components/atoms/Skeleton"
import {
  Collapsible,
  CollapsibleTrigger,
  CollapsibleContent,
} from "../../components/atoms/Collapser"

import {
  Home,
  Settings,
  Info,
  ChevronDown,
  ChevronRight,
  Folder,
} from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "../../components/atoms/Avatar"
import { Separator } from "../../components/atoms/Separator"

const meta: Meta = {
  title: "Design-system/Components/Organisms/SidebarWithNavbar",
  component: Sidebar,
  tags: ["autodocs"],
  decorators: [
    (Story) => {
      const [collapsed, setCollapsed] = React.useState(false)
      const [projectsOpen, setProjectsOpen] = React.useState(false)
      const [nestedOpen, setNestedOpen] = React.useState(false)

      return (
        <SidebarProvider defaultOpen>
          <div className="flex h-[600px] w-full border rounded-md overflow-hidden">
            {/* Sidebar */}
            <Sidebar
              collapsible="icon"
              variant="sidebar"
              className={`transition-width duration-300 ease-in-out ${
                collapsed ? "w-16" : "w-64"
              }`}
            >
              <SidebarHeader className="flex items-center justify-between px-4 py-3 border-b">
               
               <Avatar>
                 <AvatarImage src="https://github.com/shadcn.png" alt="shadcn"/>
                      <AvatarFallback>SC</AvatarFallback>
                </Avatar> 
              </SidebarHeader>

              <SidebarContent className="px-1 py-2">
                <SidebarMenu>
                  {/* Home */}
                  <SidebarMenuItem>
                    <SidebarMenuButton isActive>
                      <Home className="size-5" />
                      {!collapsed && <span>Home</span>}
                    </SidebarMenuButton>
                  </SidebarMenuItem>

                  {/* Projects with Collapsible */}
                  <SidebarMenuItem>
                    <Collapsible open={projectsOpen} onOpenChange={setProjectsOpen}>
                      <CollapsibleTrigger asChild>
                        <SidebarMenuButton>
                          <Folder className="size-5" />
                          {!collapsed && <span>Projects</span>}
                          {!collapsed && (
                            projectsOpen ? (
                              <ChevronDown className="ml-auto size-4" />
                            ) : (
                              <ChevronRight className="ml-auto size-4" />
                            )
                          )}
                        </SidebarMenuButton>
                      </CollapsibleTrigger>

                      {!collapsed && (
                        <CollapsibleContent className="ml-6 flex flex-col gap-1 mt-1">
                            <Separator orientation="vertical" className="absolute py-5"></Separator>
                          <SidebarMenuButton>
                            <span className="text-sm">Project A</span>
                          </SidebarMenuButton>

                          <Collapsible open={nestedOpen} onOpenChange={setNestedOpen}>
                            <CollapsibleTrigger asChild>
                              <SidebarMenuButton>
                                <span className="text-sm">Project B</span>
                                {nestedOpen ? (
                                  <ChevronDown className="ml-auto size-4" />
                                ) : (
                                  <ChevronRight className="ml-auto size-4" />
                                )}
                              </SidebarMenuButton>
                            </CollapsibleTrigger>

                            <CollapsibleContent className="ml-6 flex flex-col gap-1">
                             <Separator orientation="vertical" className="absolute py-5"></Separator>

                              <SidebarMenuButton>
                                <span className="text-sm">Subtask 1</span>
                              </SidebarMenuButton>
                              <SidebarMenuButton>
                                <span className="text-sm">Subtask 2</span>
                              </SidebarMenuButton>
                            </CollapsibleContent>
                          </Collapsible>
                        </CollapsibleContent>
                      )}
                    </Collapsible>
                  </SidebarMenuItem>

                  {/* Settings */}
                  <SidebarMenuItem>
                    <SidebarMenuButton>
                      <Settings className="size-5" />
                      {!collapsed && <span>Settings</span>}
                    </SidebarMenuButton>
                  </SidebarMenuItem>

                  {/* About */}
                  <SidebarMenuItem>
                    <SidebarMenuButton>
                      <Info className="size-5" />
                      {!collapsed && <span>About</span>}
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                </SidebarMenu>
              </SidebarContent>

              <SidebarSeparator />

              <SidebarFooter className="px-4 py-3 text-xs text-muted-foreground select-none">
                <SidebarTrigger
                  aria-label="Toggle sidebar"
                  onClick={() => setCollapsed(!collapsed)}
                  className="cursor-pointer"
                />
              </SidebarFooter>
            </Sidebar>

            {/* Main content area */}
            <SidebarInset className="flex-1 bg-muted p-6 space-y-6 overflow-auto">
              {/* Navbar */}
              <NavigationMenu className="justify-end">
                <NavigationMenuList>
                  <NavigationMenuItem>
                    <NavigationMenuTrigger>Dashboard</NavigationMenuTrigger>
                    <NavigationMenuContent className="min-w-[200px]">
                      <NavigationMenuLink>Analytics</NavigationMenuLink>
                      <NavigationMenuLink>Reports</NavigationMenuLink>
                    </NavigationMenuContent>
                  </NavigationMenuItem>

                  <NavigationMenuItem>
                    <NavigationMenuTrigger>Account</NavigationMenuTrigger>
                    <NavigationMenuContent className="min-w-[200px]">
                      <NavigationMenuLink>Profile</NavigationMenuLink>
                      <NavigationMenuLink>Billing</NavigationMenuLink>
                    </NavigationMenuContent>
                  </NavigationMenuItem>
                </NavigationMenuList>
              </NavigationMenu>

              {/* Skeleton cards */}
              <div className="grid grid-cols-3 gap-4">
                {[...Array(6)].map((_, i) => (
                  <Skeleton key={i} className="h-24 w-full rounded-md" />
                ))}
              </div>

              {/* Render the story content */}
              <Story />
            </SidebarInset>
          </div>
        </SidebarProvider>
      )
    },
  ],
}

export default meta

type Story = StoryObj<typeof Sidebar>

export const Default: Story = {
  args: {
    side: "left",
    collapsible: "none",
    variant: "inset"
  },
}
