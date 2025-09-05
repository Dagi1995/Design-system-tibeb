import * as React from "react";
import { Command } from "lucide-react";

import { NavMain } from "./nav-main";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "../../organisms/SideBar";

// Sample data
const reportSidebarData = {
  navMain: [
    {
      title: "Report",
      url: "#",
      items: [
        {
          title: "Select Report",
          type: "select" as const,
          options: ["Report 1", "Report 2"],
        },
      ],
    },
    {
      title: "Filter By",
      url: "#",
      items: [
        {
          title: "Assigned To",
          type: "select" as const,
          options: ["User A", "User B"],
        },
        {
          title: "Created By",
          type: "select" as const,
          options: ["Admin", "Editor"],
        },
      ],
    },
    {
      title: "Edit Filter",
      url: "#",
      items: [
        { title: "Tags", type: "select" as const, options: ["Tag 1", "Tag 2"] },
      ],
    },
    {
      title: "Save Filter",
      url: "#",
      items: [
        {
          title: "Filter Name",
          type: "input" as const,
          placeholder: "Filter Name",
        },
      ],
    },
    {
      title: "More Actions",
      url: "#",
      items: [
        {
          title: "Tools",
          type: "menu" as const,
          options: ["Export", "Import", "Reset"],
        },
      ],
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar
      // offset for BOTH headers (h-16 + h-12)
      className="top-[calc(var(--header-height)+var(--toolbar-height))] 
                 h-[calc(1000svh-var(--header-height)-var(--toolbar-height))]!"
      {...props}
    >
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <a href="#">
                <div className="bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg">
                  <Command className="size-4" />
                </div>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-medium">Acme Inc</span>
                  <span className="truncate text-xs">Enterprise</span>
                </div>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={reportSidebarData.navMain} />
      </SidebarContent>
      <SidebarFooter />
    </Sidebar>
  );
}
