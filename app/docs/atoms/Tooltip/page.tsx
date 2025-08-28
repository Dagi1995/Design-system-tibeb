"use client";
import { Preview } from "@/components/Preview";
import { Tooltip } from "@/design-system/src/components/atoms/Tooltip";

export default function DocPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6">
      <div className="w-full space-y-6">
        <Preview title={"Tooltip"} sourcePath={"design-system/src/components/atoms/Tooltip.tsx"}>
          <Tooltip />
        </Preview>
      </div>
    </div>
  );
}
