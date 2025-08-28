"use client";
import { Preview } from "@/components/Preview";
import { Alert } from "@/design-system/src/components/molecules/Alert";

export default function DocPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6">
      <div className="w-full space-y-6">
        <Preview title={"Alert"} sourcePath={"design-system/src/components/molecules/Alert.tsx"}>
          <Alert />
        </Preview>
      </div>
    </div>
  );
}
