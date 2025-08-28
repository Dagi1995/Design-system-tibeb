"use client";
import { Preview } from "@/components/Preview";
import { ErrorMessage } from "@/design-system/src/components/atoms/ErrorMessage";

export default function DocPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6">
      <div className="w-full space-y-6">
        <Preview title={"ErrorMessage"} sourcePath={"design-system/src/components/atoms/ErrorMessage.tsx"}>
          <ErrorMessage />
        </Preview>
      </div>
    </div>
  );
}
