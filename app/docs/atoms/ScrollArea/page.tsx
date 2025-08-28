"use client";
import { Preview } from "@/components/Preview";
import { ScrollArea } from "@/design-system/src/components/atoms/ScrollArea";

export default function DocPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6">
      <div className="w-full space-y-6">
        <Preview title={"ScrollArea"} sourcePath={"design-system/src/components/atoms/ScrollArea.tsx"}>
          <ScrollArea />
        </Preview>
      </div>
    </div>
  );
}
