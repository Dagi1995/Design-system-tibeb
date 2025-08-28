"use client";
import { Preview } from "@/components/Preview";
import { Select } from "@/design-system/src/components/atoms/Select";

export default function DocPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6">
      <div className="w-full space-y-6">
        <Preview title={"Select"} sourcePath={"design-system/src/components/atoms/Select.tsx"}>
          <Select />
        </Preview>
      </div>
    </div>
  );
}
