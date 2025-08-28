"use client";
import { Preview } from "@/components/Preview";
import { MultiSelector } from "@/design-system/src/components/molecules/MultiSelector";

export default function DocPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6">
      <div className="w-full space-y-6">
        <Preview title={"MultiSelector"} sourcePath={"design-system/src/components/molecules/MultiSelector.tsx"}>
          <MultiSelector />
        </Preview>
      </div>
    </div>
  );
}
