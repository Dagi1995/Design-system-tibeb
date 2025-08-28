"use client";
import { Preview } from "@/components/Preview";
import { ColorPicker } from "@/design-system/src/components/molecules/ColorPicker";

export default function DocPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6">
      <div className="w-full space-y-6">
        <Preview title={"ColorPicker"} sourcePath={"design-system/src/components/molecules/ColorPicker.tsx"}>
          <ColorPicker />
        </Preview>
      </div>
    </div>
  );
}
