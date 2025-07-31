// apps/web/app/register/page.tsx
"use client"

import { LoginForm } from "@/design-system/src/components/organisms/LoginForm";

export default function RegisterPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <div className="w-full max-w-md space-y-4">
        <LoginForm />      
        </div>
    </div>
  )
}