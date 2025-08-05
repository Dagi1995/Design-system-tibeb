"use client"

import * as React from "react"
import * as ProgressPrimitive from "@radix-ui/react-progress"
import { cn } from "@/lib/utils"

interface ProgressProps extends React.ComponentProps<typeof ProgressPrimitive.Root> {
  value?: number
  showLabel?: boolean
  labelClassName?: string
}

function Progress({
  className,
  value = 0,
  showLabel = false,
  labelClassName,
  ...props
}: ProgressProps) {
  const percentage = Math.min(Math.max(value, 0), 100) // Clamp 0-100

  return (
    <div className="w-full space-y-1">
      <ProgressPrimitive.Root
        data-slot="progress"
        className={cn(
          "relative h-3 w-full overflow-hidden rounded-full bg-muted",
          className
        )}
        {...props}
      >
        <ProgressPrimitive.Indicator
          data-slot="progress-indicator"
          className="h-full w-full flex-1 bg-primary transition-transform duration-500 ease-in-out"
          style={{ transform: `translateX(-${100 - percentage}%)` }}
        />
      </ProgressPrimitive.Root>

      {showLabel && (
        <div className={cn("text-right text-xs font-medium text-muted-foreground", labelClassName)}>
          {percentage}%
        </div>
      )}
    </div>
  )
}

export { Progress }
