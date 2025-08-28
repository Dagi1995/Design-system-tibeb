"use client";
import { Preview } from "@/components/Preview";
import { Command } from "@/design-system/src/components/molecules/Command";

export default function DocPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6">
      <div className="w-full space-y-6">
        <Preview title={"CommandDemo"} sourcePath={"design-system/src/components/molecules/Command.tsx"}>
          <Command />
        </Preview>
      </div>
    </div>
  );
}
