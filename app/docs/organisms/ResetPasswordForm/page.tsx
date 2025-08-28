"use client";
import { Preview } from "@/components/Preview";
import { ResetPasswordForm } from "@/design-system/src/components/organisms/ResetPasswordForm";

export default function DocPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6">
      <div className="w-full space-y-6">
        <Preview title={"ResetPasswordForm"} sourcePath={"design-system/src/components/organisms/ResetPasswordForm.tsx"}>
          <ResetPasswordForm />
        </Preview>
      </div>
    </div>
  );
}
