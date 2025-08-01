"use client"

import { Toaster } from "sonner"

export function ToastProvider() {
  return (
    <Toaster
      position="bottom-center"
      toastOptions={{
        classNames: {
          toast: "bg-white text-blue-600 border border-blue-600",
          success: "text-blue-600",
          error: "text-blue-600",
          info: "text-blue-600",
        },
        style: {
          background: "#ffffff",
          color: "#2563eb", // Tailwind blue-600 hex
          border: "1px solid #2563eb",
        },
      }}
    />
  )
}
