"use client";

import { MoreHorizontal, type LucideIcon } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../../molecules/DropdownMenu";
import {
  SidebarGroup,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "../../organisms/SideBar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from "../../atoms/Select";

export function NavMain({
  items,
}: {
  items: {
    title: string;
    url: string;
    icon?: LucideIcon;
    isActive?: boolean;
    items?: {
      title: string;
      url?: string;
      type?: "input" | "select" | "menu";
      placeholder?: string;
      options?: string[];
    }[];
  }[];
}) {
  const { isMobile } = useSidebar();

  return (
    <SidebarGroup>
      <SidebarMenu className="gap-2">
        {items.map((item, itemIndex) => (
          <SidebarMenuItem key={`${item.title}-${itemIndex}`}>
            <div className="px-2 py-1 text-sm font-medium">{item.title}</div>

            {item.items?.map((subItem, subIndex) => {
              if (subItem.type === "input") {
                return (
                  <input
                    key={`${item.title}-${subItem.title}-${subIndex}`}
                    placeholder={subItem.placeholder || subItem.title}
                    className="mx-2 w-58 rounded-md border border-gray-300 bg-gray-100 px-2 py-1 text-sm focus:outline-none"
                  />
                );
              }

              if (subItem.type === "select") {
                return (
                  <div
                    key={`${item.title}-${subItem.title}-${subIndex}`}
                    className="mb-3 ml-2"
                  >
                    <Select defaultValue={subItem.options?.[0]}>
                      <SelectTrigger fullWidth className="text-base">
                        {subItem.title}
                      </SelectTrigger>
                      <SelectContent>
                        {subItem.options?.map((opt, optIndex) => (
                          <SelectItem
                            key={`${subItem.title}-${opt}-${optIndex}`}
                            value={opt}
                          >
                            {opt}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                );
              }

              if (subItem.type === "menu") {
                return (
                  <DropdownMenu
                    key={`${item.title}-${subItem.title}-${subIndex}`}
                  >
                    <DropdownMenuTrigger asChild>
                      <SidebarMenuButton className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground">
                        {subItem.title}
                        <MoreHorizontal className="ml-auto" />
                      </SidebarMenuButton>
                    </DropdownMenuTrigger>

                    <DropdownMenuContent
                      side={isMobile ? "bottom" : "right"}
                      align={isMobile ? "end" : "start"}
                      className="min-w-56 rounded-lg"
                    >
                      {subItem.options?.map((opt, optIndex) => (
                        <DropdownMenuItem
                          key={`${subItem.title}-${opt}-${optIndex}`}
                          asChild
                        >
                          <a href="#">{opt}</a>
                        </DropdownMenuItem>
                      ))}
                    </DropdownMenuContent>
                  </DropdownMenu>
                );
              }

              return null;
            })}
          </SidebarMenuItem>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  );
}
