/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Button } from "../atoms/Button";
import { Tooltip, TooltipContent, TooltipTrigger } from "../atoms/Tooltip";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../molecules/DropdownMenu";
import { SidebarTrigger } from "./SideBar";
import { ChevronDown, ChevronsUpDown } from "lucide-react";

export type NavbarItem =
  | { type: "sidebar" }
  | { type: "title"; label: string }
  | {
      type: "button";
      label?: React.ReactNode;
      icon?: React.ReactNode;
      tooltip?: string;
      variant?:
        | "default"
        | "outline"
        | "destructive"
        | "secondary"
        | "ghost"
        | "mono"
        | "dashed"
        | "dim"
        | "foreground"
        | "inverse";
      size?: "sm" | "md" | "lg" | "icon";
      onClick?: () => void;
    }
  | {
      type: "dropdown";
      label?: React.ReactNode;
      icon?: React.ReactNode;
      tooltip?: string;
      variant?: "default" | "outline";
      size?: "sm" | "md" | "lg";
      items: { label: string; onClick?: () => void }[];
    }
  | { type: "custom"; component: React.ReactNode };

interface NavbarProps {
  data?: Record<string, any>;
  items?: NavbarItem[];
}

const Navbar = ({ data, items = [] }: NavbarProps) => {
  return (
    <nav className="p-4 flex items-center justify-between w-full">
      {/* Left side: Sidebar and Title */}
      <div className="flex items-center gap-4">
        {items.map((item, idx) => {
          switch (item.type) {
            case "sidebar":
              return <SidebarTrigger key={idx} size="lg" />;
            case "title":
              return (
                <h1 key={idx} className="text-xl font-black">
                  {item.label}
                </h1>
              );
            default:
              return null;
          }
        })}

        {data?.group && <p className="text-sm text-gray-600">{data.group}</p>}
        {data?.status && (
          <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
            {data.status}
          </span>
        )}
      </div>

      {/* Right side: Buttons, Dropdowns, Custom */}
      <div className="flex items-center gap-4">
        {items.map((item, idx) => {
          switch (item.type) {
            case "button": {
              const button = (
                <Button
                  variant={item.variant ?? "default"}
                  size={item.size ?? "md"}
                  onClick={item.onClick}
                >
                  {item.icon || item.label}
                </Button>
              );

              if (item.tooltip) {
                return (
                  <Tooltip key={idx}>
                    <TooltipTrigger asChild>{button}</TooltipTrigger>
                    <TooltipContent>{item.tooltip}</TooltipContent>
                  </Tooltip>
                );
              }
              return <div key={idx}>{button}</div>;
            }

            case "dropdown": {
              const buttonSize = item.size ?? "md";

              const trigger = (
                <Button variant={item.variant ?? "outline"} size={buttonSize}>
                  {item.icon || (
                    <div className="flex items-center gap-2">
                      {item.label}
                      <ChevronsUpDown
                        className={
                          buttonSize === "sm"
                            ? "h-4 w-4"
                            : buttonSize === "md"
                            ? "h-5 w-5"
                            : "h-6 w-6"
                        }
                      />
                    </div>
                  )}
                </Button>
              );

              const menu = (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>{trigger}</DropdownMenuTrigger>
                  <DropdownMenuContent
                    align="start"
                    className={
                      buttonSize === "sm"
                        ? "min-w-[160px]"
                        : buttonSize === "md"
                        ? "min-w-[200px]"
                        : "min-w-[240px]"
                    }
                  >
                    {item.items.map((i, iIdx) => (
                      <DropdownMenuItem
                        key={iIdx}
                        onClick={i.onClick}
                        className={buttonSize === "lg" ? "px-4 py-3" : ""}
                      >
                        {i.label}
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
              );

              if (item.tooltip) {
                return (
                  <Tooltip key={idx}>
                    <TooltipTrigger asChild>{menu}</TooltipTrigger>
                    <TooltipContent>{item.tooltip}</TooltipContent>
                  </Tooltip>
                );
              }
              return <div key={idx}>{menu}</div>;
            }

            case "custom":
              return <div key={idx}>{item.component}</div>;

            default:
              return null;
          }
        })}
      </div>
    </nav>
  );
};

export default Navbar;
