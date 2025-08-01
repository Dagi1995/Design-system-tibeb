"use client"
import { ForgotPasswordForm } from "@/design-system/src/components/organisms/ForgotPasswordForm"

export default function ForgotPasswordPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <div className="w-full max-w-md">
        <ForgotPasswordForm />
      </div>
    </div>
  )
}