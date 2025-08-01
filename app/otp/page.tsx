"use client"
import { OtpVerificationForm } from "@/design-system/src/components/organisms/OtpVerificationForm"

export default function OtpPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <div className="w-full max-w-md">
        <OtpVerificationForm />
      </div>
    </div>
  )
}