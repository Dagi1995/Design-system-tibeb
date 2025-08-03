import * as React from "react"
import { cn } from "@/lib/utils"
import { CircleAlert } from "lucide-react"

interface ErrorMessageProps extends React.HTMLAttributes<HTMLParagraphElement> {
  message?: string
  showIcon?: boolean
  duration?: number
}

const ErrorMessage = React.forwardRef<HTMLParagraphElement, ErrorMessageProps>(
  ({ message, className, showIcon = true, duration = 5000, ...props }, ref) => {
    const [visible, setVisible] = React.useState(false)
    const [internalKey, setInternalKey] = React.useState(0)

    // Trigger visibility every time the message is updated (even if same text)
    React.useEffect(() => {
      if (message) {
        setVisible(true)
        setInternalKey((prev) => prev + 1)
      }
    }, [message])

    // Auto-hide after duration
    React.useEffect(() => {
      if (!visible) return

      const timer = setTimeout(() => {
        setVisible(false)
      }, duration)

      return () => clearTimeout(timer)
    }, [visible, duration, internalKey])

    if (!visible || !message) return null

    return (
      <p
        ref={ref}
        data-slot="error-message"
        className={cn(
          "text-sm font-medium text-destructive flex items-center gap-2",
          className
        )}
        {...props}
      >
        {showIcon && <CircleAlert className="size-4" aria-hidden="true" />}
        {message}
      </p>
    )
  }
)

ErrorMessage.displayName = "ErrorMessage"

export { ErrorMessage }
