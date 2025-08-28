"use client";
import { Preview } from "@/components/Preview";
import { Dialog } from "@/design-system/src/components/molecules/Dialog";

export default function DocPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6">
      <div className="w-full space-y-6">
        <Preview title={"Dialog"} sourcePath={"design-system/src/components/molecules/Dialog.tsx"}>
          <Dialog />
        </Preview>
      </div>
    </div>
  );
}
