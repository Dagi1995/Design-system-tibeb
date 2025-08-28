"use client";
import { Preview } from "@/components/Preview";
import { Label } from "@/design-system/src/components/atoms/Label";

export default function DocPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6">
      <div className="w-full space-y-6">
        <Preview title={"Label"} sourcePath={"design-system/src/components/atoms/Label.tsx"}>
          <Label />
        </Preview>
      </div>
    </div>
  );
}
