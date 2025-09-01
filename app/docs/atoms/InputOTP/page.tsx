"use client";
import { Preview } from "@/components/Preview";
import { InputOTP } from "@/design-system/src/components/atoms/InputOTP";

export default function DocPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6">
      <div className="w-full space-y-6">
        <Preview title={"InputOTP"} sourcePath={"design-system/src/components/atoms/InputOTP.tsx"}>
          <InputOTP />
        </Preview>
      </div>
    </div>
  );
}
