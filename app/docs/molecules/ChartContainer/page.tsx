"use client";
import { Preview } from "@/components/Preview";
import { ChartContainer } from "@/design-system/src/components/molecules/Chart";

export default function DocPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6">
      <div className="w-full space-y-6">
        <Preview title={"Charts"} sourcePath={"design-system/src/components/molecules/Chart.tsx"}>
          <ChartContainer />
        </Preview>
      </div>
    </div>
  );
}
