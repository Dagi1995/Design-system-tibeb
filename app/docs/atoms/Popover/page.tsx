"use client";
import { Preview } from "@/components/Preview";
import { Popover } from "@/design-system/src/components/atoms/Popover";

export default function DocPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6">
      <div className="w-full space-y-6">
        <Preview title={"Popover"} sourcePath={"design-system/src/components/atoms/Popover.tsx"}>
          <Popover />
        </Preview>
      </div>
    </div>
  );
}
