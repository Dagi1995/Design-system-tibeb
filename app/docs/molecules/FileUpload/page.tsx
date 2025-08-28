"use client";
import { Preview } from "@/components/Preview";
import { FileUploader } from "@/design-system/src/components/molecules/FileUpload";

export default function DocPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6">
      <div className="w-full space-y-6">
        <Preview title={"FileUploader"} sourcePath={"design-system/src/components/molecules/FileUpload.tsx"}>
          <FileUploader />
        </Preview>
      </div>
    </div>
  );
}
