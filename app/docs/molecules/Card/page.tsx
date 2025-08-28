"use client";
import { Preview } from "@/components/Preview";
import { Card } from "@/design-system/src/components/molecules/Card";

export default function DocPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6">
      <div className="w-full space-y-6">
        <Preview title={"Card"} sourcePath={"design-system/src/components/molecules/Card.tsx"}>
          <Card />
        </Preview>
      </div>
    </div>
  );
}
