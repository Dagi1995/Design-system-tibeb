"use client";
import { Preview } from "@/components/Preview";
import { FiltersPanel } from "@/design-system/src/components/organisms/DynamicFilterRow";

export default function DocPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6">
      <div className="w-full space-y-6">
        <Preview title={"DynamicFilterRow"} sourcePath={"design-system/src/components/organisms/DynamicFilterRow.tsx"}>
          <FiltersPanel />
        </Preview>
      </div>
    </div>
  );
}
