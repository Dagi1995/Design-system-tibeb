"use client"

import * as React from "react"
import { OTPInput, OTPInputContext } from "input-otp"
import { MinusIcon } from "lucide-react"
import { cn } from "@/lib/utils"

function InputOTP({
  className,
  containerClassName,
  ...props
}: React.ComponentProps<typeof OTPInput> & {
  containerClassName?: string
}) {
  return (
    <OTPInput
      containerClassName={cn(
        "flex items-center gap-3 has-disabled:opacity-60",
        containerClassName
      )}
      className={cn("disabled:cursor-not-allowed", className)}
      {...props}
    />
  )
}

function InputOTPGroup({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      className={cn("flex items-center", className)}
      {...props}
    />
  )
}

function InputOTPSlot({
  index,
  className,
  ...props
}: React.ComponentProps<"div"> & {
  index: number
}) {
  const inputOTPContext = React.useContext(OTPInputContext)
  const { char, hasFakeCaret, isActive } = inputOTPContext?.slots[index] ?? {}

  return (
    <div
      data-active={isActive}
      className={cn(
        "flex h-10 w-10 items-center justify-center border border-neutral-emphasis rounded-md bg-canvas-default text-sm transition-all shadow-sm focus-within:ring-2 ring-accent-fg",
        "data-[active=true]:border-accent-fg data-[active=true]:bg-canvas-subtle",
        className
      )}
      {...props}
    >
      {char}
      {hasFakeCaret && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="h-4 w-px bg-fg animate-caret-blink" />
        </div>
      )}
    </div>
  )
}

function InputOTPSeparator(props: React.ComponentProps<"div">) {
  return (
    <div
      role="separator"
      className="mx-2 text-muted"
      {...props}
    >
      <MinusIcon className="h-4 w-4" />
    </div>
  )
}

export { InputOTP, InputOTPGroup, InputOTPSlot, InputOTPSeparator }
