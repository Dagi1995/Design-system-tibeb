"use client";
import { Preview } from "@/components/Preview";
import { TextEditor } from "@/design-system/src/components/organisms/TextEditor";

export default function DocPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6">
      <div className="w-full space-y-6">
        <Preview title={"TextEditor"} sourcePath={"design-system/src/components/organisms/TextEditor.tsx"}>
          <TextEditor />
        </Preview>
      </div>
    </div>
  );
}
