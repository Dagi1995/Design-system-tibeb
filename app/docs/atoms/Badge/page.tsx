"use client";
import { Preview } from "@/components/Preview";
import { Badge } from "@/design-system/src/components/atoms/Badge";

export default function DocPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6">
      <div className="w-full space-y-6">
        <Preview title={"Badge"} sourcePath={"design-system/src/components/atoms/Badge.tsx"}>
          <Badge />
        </Preview>
      </div>
    </div>
  );
}
