/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { Moon, SidebarIcon, Sun } from "lucide-react";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "../../molecules/Breadcrumb";
import { useSidebar } from "../../organisms/SideBar";
import { SearchForm } from "./search-form";
import { NavUser } from "./user";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../../molecules/DropdownMenu";
import { Button } from "../../atoms/Button";
import { useTheme } from "next-themes";

export function SiteHeader() {
  const { setTheme } = useTheme();
  const { toggleSidebar } = useSidebar();
  const data = {
    user: {
      name: "shadcn",
      email: "m@example.com",
      avatar: "/avatars/shadcn.jpg",
    },
  };

  return (
    <header className="bg-background sticky top-0 z-50 flex items-center border-b ">
      <div className="flex h-(--header-height) w-full items-center gap-2 px-4 justify-between">
        <Breadcrumb className="hidden sm:block px-5">
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="#">
                Building Your Application
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Data Fetching</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        <div className="flex flex-row items-center gap-5">
          <SearchForm className="w-full sm:ml-auto sm:w-auto" />
          <NavUser user={data.user} />
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm">
                <Sun className="h-[1.2rem] w-[1.2rem] scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90" />
                <Moon className="absolute h-[1.2rem] w-[1.2rem] scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0" />
                <span className="sr-only">Toggle theme</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => setTheme("light")}>
                Light
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setTheme("dark")}>
                Dark
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setTheme("system")}>
                System
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}
