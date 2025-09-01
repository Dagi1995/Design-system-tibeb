"use client";
import { Preview } from "@/components/Preview";
import { Skeleton } from "@/design-system/src/components/atoms/Skeleton";

export default function DocPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6">
      <div className="w-full space-y-6">
        <Preview title={"Skeleton"} sourcePath={"design-system/src/components/atoms/Skeleton.tsx"}>
          <Skeleton />
        </Preview>
      </div>
    </div>
  );
}
