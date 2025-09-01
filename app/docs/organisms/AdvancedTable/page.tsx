"use client";
import { Preview } from "@/components/Preview";
import { AdvancedTable } from "@/design-system/src/components/organisms/AdvancedTable";

export default function DocPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6">
      <div className="w-full space-y-6">
        <Preview title={"AdvancedTable"} sourcePath={"design-system/src/components/organisms/AdvancedTable.tsx"}>
          <AdvancedTable />
        </Preview>
      </div>
    </div>
  );
}
