"use client";

import { RefreshCcw, MoreHorizontal, BarChart3 } from "lucide-react";
import Navbar, { NavbarItem } from "../../organisms/TopNavbar";
import { SidebarTrigger, useSidebar } from "../../organisms/SideBar"; // <- import hook

const Topbar = () => {
  const { toggleSidebar } = useSidebar(); // <- get toggleSidebar

  const items: NavbarItem[] = [
    { type: "sidebar" },
    { type: "title", label: "Item-wise Price List Rate" },

    // Right side buttons and dropdowns
    {
      type: "dropdown",
      label: (
        <span className="flex items-center gap-2">
          <BarChart3 className="h-4 w-4" />
          Report View
        </span>
      ),
      variant: "outline",
      size: "lg",
      items: [
        { label: "List View", onClick: () => console.log("List View") },
        {
          label: "Dashboard View",
          onClick: () => console.log("Dashboard View"),
        },
        { label: "Kanbon View", onClick: () => console.log("Kanbon View") },
      ],
    },
    {
      type: "button",
      icon: <RefreshCcw className="h-4 w-4" />,
      variant: "outline",
      size: "lg",
      tooltip: "Refresh",
      onClick: () => console.log("Refresh clicked"),
    },
    {
      type: "dropdown",
      icon: <MoreHorizontal className="h-4 w-4" />,
      variant: "outline",
      size: "lg",
      tooltip: "More options",
      items: [
        { label: "Import", onClick: () => console.log("Import") },
        {
          label: "User permition",
          onClick: () => console.log("User permition"),
        },
        {
          label: "Role permition Manager",
          onClick: () => console.log("Role permition Manager"),
        },
        { label: "Customize", onClick: () => console.log("Customize") },
        {
          label: "Toggle Sidebar",
          onClick: toggleSidebar, // <- use the hook here
        },
        { label: "Edit Doctype", onClick: () => console.log("Edit Doctype") },
        { label: "List Setting", onClick: () => console.log("List Setting") },
      ],
    },
    {
      type: "button",
      label: "+ Add Item Price",
      variant: "default",
      size: "lg",
      onClick: () => console.log("Add Item Price"),
    },
  ];

  return <Navbar data={{ status: "Not Saved" }} items={items} />;
};

export default Topbar;
