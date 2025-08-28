"use client";
import { Preview } from "@/components/Preview";
import { TypographyH1 } from "@/design-system/src/components/atoms/Typography";

export default function DocPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6">
      <div className="w-full space-y-6">
        <Preview title={"Typography"} sourcePath={"design-system/src/components/atoms/Typography.tsx"}>
          <TypographyH1 />
        </Preview>
      </div>
    </div>
  );
}
