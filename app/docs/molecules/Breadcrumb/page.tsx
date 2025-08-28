"use client";
import { Preview } from "@/components/Preview";
import { Breadcrumb } from "@/design-system/src/components/molecules/Breadcrumb";

export default function DocPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6">
      <div className="w-full space-y-6">
        <Preview title={"Breadcrumb"} sourcePath={"design-system/src/components/molecules/Breadcrumb.tsx"}>
          <Breadcrumb />
        </Preview>
      </div>
    </div>
  );
}
