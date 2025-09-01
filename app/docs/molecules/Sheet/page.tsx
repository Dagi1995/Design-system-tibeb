"use client";
import { Preview } from "@/components/Preview";
import { Sheet } from "@/design-system/src/components/molecules/Sheet";

export default function DocPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6">
      <div className="w-full space-y-6">
        <Preview title={"Sheet"} sourcePath={"design-system/src/components/molecules/Sheet.tsx"}>
          <Sheet />
        </Preview>
      </div>
    </div>
  );
}
