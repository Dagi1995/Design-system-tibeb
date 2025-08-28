"use client";
import { Preview } from "@/components/Preview";
import { TopNavbar } from "@/design-system/src/components/organisms/TopNavbar";

export default function DocPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6">
      <div className="w-full space-y-6">
        <Preview title={"TopNavbar"} sourcePath={"design-system/src/components/organisms/TopNavbar.tsx"}>
          <TopNavbar />
        </Preview>
      </div>
    </div>
  );
}
