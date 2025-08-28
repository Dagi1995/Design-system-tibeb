"use client";
import { Preview } from "@/components/Preview";
import { OtpVerificationForm } from "@/design-system/src/components/organisms/OtpVerificationForm";

export default function DocPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6">
      <div className="w-full space-y-6">
        <Preview title={"OtpVerificationForm"} sourcePath={"design-system/src/components/organisms/OtpVerificationForm.tsx"}>
          <OtpVerificationForm />
        </Preview>
      </div>
    </div>
  );
}
