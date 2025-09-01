"use client";
import { Preview } from "@/components/Preview";
import { RegisterForm } from "@/design-system/src/components/organisms/RegisterForm";

export default function DocPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6">
      <div className="w-full space-y-6">
        <Preview title={"RegisterForm"} sourcePath={"design-system/src/components/organisms/RegisterForm.tsx"}>
          <RegisterForm />
        </Preview>
      </div>
    </div>
  );
}
