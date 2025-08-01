import * as React from "react"
import { AlertCircle } from "lucide-react"
import { cn } from "@/lib/utils"

export interface ErrorMessageProps {
  message?: string
  className?: string
}

export const ErrorMessage: React.FC<ErrorMessageProps> = ({ message, className }) => {
  if (!message) return null

  return (
    <div
      role="alert"
      className={cn(
        "flex items-center gap-2 text-sm text-destructive bg-destructive/10 border border-destructive/30 px-3 py-2 rounded-md",
        className
      )}
    >
      <AlertCircle className="h-4 w-4" />
      <span>{message}</span>
    </div>
  )
}
