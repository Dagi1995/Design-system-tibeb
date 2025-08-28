"use client";
import { Preview } from "@/components/Preview";
import { DropdownMenu } from "@/design-system/src/components/molecules/DropdownMenu";

export default function DocPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6">
      <div className="w-full space-y-6">
        <Preview title={"DropdownMenu"} sourcePath={"design-system/src/components/molecules/DropdownMenu.tsx"}>
          <DropdownMenu />
        </Preview>
      </div>
    </div>
  );
}
