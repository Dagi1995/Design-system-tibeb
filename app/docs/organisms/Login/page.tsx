"use client";
import { Preview } from "@/components/Preview";
import { LoginForm } from "@/design-system/src/components/organisms/LoginForm";

export default function DocPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6">
      <div className="w-full space-y-6">
        <Preview title={"LoginForm"} sourcePath={"design-system/src/components/organisms/LoginForm.tsx"}>
          <LoginForm />
        </Preview>
      </div>
    </div>
  );
}
