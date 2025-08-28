"use client";
import { Preview } from "@/components/Preview";
import { Spinner } from "@/design-system/src/components/atoms/Spinner";

export default function DocPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6">
      <div className="w-full space-y-6">
        <Preview title={"Spinner"} sourcePath={"design-system/src/components/atoms/Spinner.tsx"}>
          <Spinner />
        </Preview>
      </div>
    </div>
  );
}
