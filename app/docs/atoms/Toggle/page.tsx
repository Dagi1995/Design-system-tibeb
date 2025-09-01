"use client";
import { Preview } from "@/components/Preview";
import { Toggle } from "@/design-system/src/components/atoms/Toggle";

export default function DocPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6">
      <div className="w-full space-y-6">
        <Preview title={"Toggle"} sourcePath={"design-system/src/components/atoms/Toggle.tsx"}>
          <Toggle />
        </Preview>
      </div>
    </div>
  );
}
