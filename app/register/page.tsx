// apps/web/app/register/page.tsx
"use client"

import { RegisterForm } from "@/design-system/src/components/organisms/RegisterForm";

export default function RegisterPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <div className="w-full">
        <RegisterForm />
        
      </div>
    </div>
  )
}