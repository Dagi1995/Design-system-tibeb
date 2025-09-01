"use client";
import { Preview } from "@/components/Preview";
import { Input } from "@/design-system/src/components/atoms/Input";

export default function DocPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6">
      <div className="w-full space-y-6">
        <Preview title={"Input"} sourcePath={"design-system/src/components/atoms/Input.tsx"}>
          <Input />
        </Preview>
      </div>
    </div>
  );
}
