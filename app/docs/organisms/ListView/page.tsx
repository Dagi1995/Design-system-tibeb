"use client";
import { Preview } from "@/components/Preview";
import { Avatar } from "@/design-system/src/components/atoms/Avatar";

export default function DocPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6">
      <div className="w-full space-y-6">
        <Preview title={"ListView"} sourcePath={"design-system/src/components/atoms/Avatar.tsx"}>
          <Avatar />
        </Preview>
      </div>
    </div>
  );
}
