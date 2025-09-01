"use client";
import { Preview } from "@/components/Preview";
import { SearchInput } from "@/design-system/src/components/molecules/SearchInput";

export default function DocPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6">
      <div className="w-full space-y-6">
        <Preview title={"SearchInput"} sourcePath={"design-system/src/components/molecules/SearchInput.tsx"}>
          <SearchInput />
        </Preview>
      </div>
    </div>
  );
}
