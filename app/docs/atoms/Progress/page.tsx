"use client";
import { Preview } from "@/components/Preview";
import { Progress } from "@/design-system/src/components/atoms/Progress";

export default function DocPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6">
      <div className="w-full space-y-6">
        <Preview title={"Progress"} sourcePath={"design-system/src/components/atoms/Progress.tsx"}>
          <Progress />
        </Preview>
      </div>
    </div>
  );
}
