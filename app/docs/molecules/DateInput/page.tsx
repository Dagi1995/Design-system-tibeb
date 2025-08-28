"use client";
import { Preview } from "@/components/Preview";
import { BirthdateInput } from "@/design-system/src/components/molecules/DateInput";

export default function DocPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6">
      <div className="w-full space-y-6">
        <Preview title={"BirthdateInput"} sourcePath={"design-system/src/components/molecules/DateInput.tsx"}>
          <BirthdateInput />
        </Preview>
      </div>
    </div>
  );
}
