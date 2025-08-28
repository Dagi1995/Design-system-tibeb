"use client";
import { Preview } from "@/components/Preview";
import { AlertDialog } from "@/design-system/src/components/organisms/AlertDialog";

export default function DocPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6">
      <div className="w-full space-y-6">
        <Preview title={"AlertDialog"} sourcePath={"design-system/src/components/organisms/AlertDialog.tsx"}>
          <AlertDialog />
        </Preview>
      </div>
    </div>
  );
}
