"use client";
import { Preview } from "@/components/Preview";
import { Checkbox } from "@/design-system/src/components/atoms/Checkbox";

export default function DocPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6">
      <div className="w-full space-y-6">
        <Preview title={"Checkbox"} sourcePath={"design-system/src/components/atoms/Checkbox.tsx"}>
          <Checkbox />
        </Preview>
      </div>
    </div>
  );
}
