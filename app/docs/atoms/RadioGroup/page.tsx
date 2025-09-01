"use client";
import { Preview } from "@/components/Preview";
import { RadioGroup } from "@/design-system/src/components/atoms/RadioGroup";

export default function DocPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6">
      <div className="w-full space-y-6">
        <Preview title={"RadioGroup"} sourcePath={"design-system/src/components/atoms/RadioGroup.tsx"}>
          <RadioGroup />
        </Preview>
      </div>
    </div>
  );
}
