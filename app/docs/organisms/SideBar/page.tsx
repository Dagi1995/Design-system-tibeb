"use client";
import { Preview } from "@/components/Preview";
import { SidebarProvider } from "@/design-system/src/components/organisms/SideBar";

export default function DocPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6">
      <div className="w-full space-y-6">
        <Preview title={"SidebarWithNavbar"} sourcePath={"design-system/src/components/organisms/SideBar.tsx"}>
          <SidebarProvider />
        </Preview>
      </div>
    </div>
  );
}
