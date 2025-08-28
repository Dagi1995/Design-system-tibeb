"use client";
import { Preview } from "@/components/Preview";
import { FilterTag } from "@/design-system/src/components/atoms/FilterTag";

export default function DocPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6">
      <div className="w-full space-y-6">
        <Preview title={"FilterTag"} sourcePath={"design-system/src/components/atoms/FilterTag.tsx"}>
          <FilterTag />
        </Preview>
      </div>
    </div>
  );
}
