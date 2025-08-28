"use client";
import { Preview } from "@/components/Preview";
import { FilterItem } from "@/design-system/src/components/molecules/FilterItem";

export default function DocPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6">
      <div className="w-full space-y-6">
        <Preview title={"FilterItem"} sourcePath={"design-system/src/components/molecules/FilterItem.tsx"}>
          <FilterItem />
        </Preview>
      </div>
    </div>
  );
}
