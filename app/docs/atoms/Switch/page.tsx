"use client";
import { Preview } from "@/components/Preview";
import { Switch } from "@/design-system/src/components/atoms/Switch";

export default function DocPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6">
      <div className="w-full space-y-6">
        <Preview title={"Switch"} sourcePath={"design-system/src/components/atoms/Switch.tsx"}>
          <Switch />
        </Preview>
      </div>
    </div>
  );
}
