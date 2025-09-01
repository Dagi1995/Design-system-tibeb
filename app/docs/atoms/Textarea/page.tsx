"use client";
import { Preview } from "@/components/Preview";
import { Textarea } from "@/design-system/src/components/atoms/Textarea";

export default function DocPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6">
      <div className="w-full space-y-6">
        <Preview title={"Textarea"} sourcePath={"design-system/src/components/atoms/Textarea.tsx"}>
          <Textarea />
        </Preview>
      </div>
    </div>
  );
}
