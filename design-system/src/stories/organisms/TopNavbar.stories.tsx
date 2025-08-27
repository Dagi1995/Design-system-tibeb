// design-system/src/stories/organisms/Navbar.stories.tsx
import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import Navbar, { NavbarItem } from "../../components/organisms/TopNavbar";
import { Printer } from "lucide-react";
import { SidebarProvider } from "../../components/organisms/SideBar";
import { TooltipProvider } from "../../components/atoms/Tooltip";

const meta: Meta<typeof Navbar> = {
  title: "Design-system/Components/Organisms/Navbar",
  component: Navbar,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "Dynamic Navbar supporting titles, buttons, dropdowns, sidebar triggers, tooltips, and custom components. All items are fully configurable via the `items` array. Wrap your stories with `SidebarProvider` and `TooltipProvider` for proper functionality.",
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof Navbar>;

/* -------------------------
   1. Minimal Example
-------------------------- */
export const Minimal: Story = {
  render: () => {
    const items: NavbarItem[] = [
      { type: "sidebar" },
      { type: "title", label: "Minimal Navbar" },
      { type: "button", label: "Save", onClick: () => alert("Saved!") },
    ];

    return (
      <TooltipProvider>
        <SidebarProvider>
          <Navbar items={items} />
        </SidebarProvider>
      </TooltipProvider>
    );
  },
};

/* -------------------------
   2. Buttons with Tooltips
-------------------------- */
export const WithTooltips: Story = {
  render: () => {
    const items: NavbarItem[] = [
      { type: "sidebar" },
      { type: "title", label: "Navbar with Tooltips" },
      {
        type: "button",
        label: "Save",
        tooltip: "Save this item",
        onClick: () => alert("Saved!"),
      },
      {
        type: "button",
        label: "Cancel",
        tooltip: "Cancel editing",
        variant: "outline",
        onClick: () => alert("Cancelled!"),
      },
      {
        type: "button",
        variant: "outline",
        icon: <Printer className="h-4 w-4" />,
        tooltip: "Print document",
        onClick: () => alert("Printing..."),
      },
    ];

    return (
      <TooltipProvider>
        <SidebarProvider>
          <Navbar items={items} />
        </SidebarProvider>
      </TooltipProvider>
    );
  },
};

/* -------------------------
   3. Dropdown Example
-------------------------- */
export const WithDropdown: Story = {
  render: () => {
    const items: NavbarItem[] = [
      { type: "sidebar" },
      { type: "title", label: "Navbar with Dropdowns" },
      {
        type: "dropdown",
        label: "View",
        tooltip: "Choose view mode",
        items: [
          { label: "Stock Balance", onClick: () => alert("Stock Balance") },
          { label: "Stock Ledger", onClick: () => alert("Stock Ledger") },
          { label: "Projected Qty", onClick: () => alert("Projected Qty") },
        ],
      },
      {
        type: "dropdown",
        label: "Actions",
        items: [
          { label: "Duplicate", onClick: () => alert("Duplicate clicked") },
          { label: "Delete", onClick: () => alert("Delete clicked") },
        ],
      },
    ];

    return (
      <TooltipProvider>
        <SidebarProvider>
          <Navbar items={items} />
        </SidebarProvider>
      </TooltipProvider>
    );
  },
};

/* -------------------------
   4. Full Featured Navbar
-------------------------- */
export const FullFeatured: Story = {
  render: () => {
    const items: NavbarItem[] = [
      { type: "sidebar" },
      { type: "title", label: "Full Featured Navbar" },
      { type: "button", label: "Save", onClick: () => alert("Saved!") },
      {
        type: "button",
        label: "Cancel",
        variant: "outline",
        onClick: () => alert("Cancelled!"),
      },
      {
        type: "dropdown",
        label: "View",
        items: [
          { label: "Stock Balance", onClick: () => alert("Balance") },
          { label: "Stock Ledger", onClick: () => alert("Ledger") },
        ],
      },
      {
        type: "dropdown",
        label: "Actions",
        items: [
          { label: "Duplicate", onClick: () => alert("Duplicate") },
          { label: "Delete", onClick: () => alert("Delete") },
        ],
      },
      {
        type: "custom",
        component: (
          <div className="px-2 py-1 bg-yellow-200 rounded-md">Custom Info</div>
        ),
      },
      {
        type: "button",
        variant: "outline",
        icon: <Printer className="h-4 w-4" />,
        tooltip: "Print",
        onClick: () => alert("Printing..."),
      },
    ];

    return (
      <TooltipProvider>
        <SidebarProvider>
          <Navbar items={items} />
        </SidebarProvider>
      </TooltipProvider>
    );
  },
};

/* -------------------------
   5. Styled Variants
-------------------------- */
export const StyledVariants: Story = {
  render: () => {
    const items: NavbarItem[] = [
      { type: "sidebar" },
      { type: "title", label: "Styled Variants" },
      {
        type: "button",
        label: "Save",
        variant: "default",
        onClick: () => alert("Saved!"),
      },
      {
        type: "button",
        label: "Cancel",
        variant: "outline",
        onClick: () => alert("Cancelled!"),
      },
      {
        type: "button",
        label: "Delete",
        variant: "destructive",
        size: "default",
        onClick: () => alert("Delete clicked!"),
      },
    ];

    return (
      <TooltipProvider>
        <SidebarProvider>
          <Navbar items={items} />
        </SidebarProvider>
      </TooltipProvider>
    );
  },
};
