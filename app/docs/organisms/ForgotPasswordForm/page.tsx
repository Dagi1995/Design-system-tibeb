"use client";
import { Preview } from "@/components/Preview";
import { ForgotPasswordForm } from "@/design-system/src/components/organisms/ForgotPasswordForm";

export default function DocPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6">
      <div className="w-full space-y-6">
        <Preview title={"ForgotPasswordForm"} sourcePath={"design-system/src/components/organisms/ForgotPasswordForm.tsx"}>
          <ForgotPasswordForm />
        </Preview>
      </div>
    </div>
  );
}
