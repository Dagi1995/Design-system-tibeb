"use client";

import * as React from "react";
import Link from "next/link";
import { Menu, Bell } from "lucide-react";
import { cn } from "@/lib/utils";
import { Sheet, SheetContent, SheetTrigger } from "../molecules/Sheet";
import { Button } from "../atoms/Button";
import { Input } from "../atoms/Input";
import { Avatar, AvatarFallback, AvatarImage } from "../atoms/Avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../molecules/DropdownMenu";

interface TopNavbarProps {
  logo?: React.ReactNode;
  links?: { label: string; href: string }[];
  rightContent?: React.ReactNode;
  className?: string;
}

export function TopNavbar({ logo, links = [], className }: TopNavbarProps) {
  const [open, setOpen] = React.useState(false);

  return (
    <header className={cn("w-full border-b bg-white", className)}>
      <div className="container flex h-16 items-center justify-between">
        {/* Left: Logo */}
        <div className="flex items-center gap-2">{logo}</div>

        {/* Center: Links */}
        <nav className="hidden md:flex items-center gap-6">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Right: Search + Actions */}
        <div className="flex items-center gap-3">
          {/* Search */}
          <Input
            type="text"
            placeholder="Search..."
            className="hidden md:block w-[200px]"
          />

          {/* Notification */}
          <Button size="sm" variant="ghost">
            <Bell className="w-5 h-5" />
          </Button>

          {/* Avatar with Dropdown */}
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

          {/* Mobile Nav Toggle */}
          {links.length > 0 && (
            <Sheet open={open} onOpenChange={setOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="sm" className="md:hidden">
                  <Menu className="w-5 h-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[250px]">
                <nav className="mt-8 flex flex-col gap-4">
                  {links.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      onClick={() => setOpen(false)}
                      className="text-sm font-medium text-muted-foreground hover:text-foreground"
                    >
                      {link.label}
                    </Link>
                  ))}
                </nav>
              </SheetContent>
            </Sheet>
          )}
        </div>
      </div>
    </header>
  );
}
