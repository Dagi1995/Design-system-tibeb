"use client"

import * as React from "react"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { toast } from "sonner"

import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "../atoms/InputOTP"
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "../molocules/card"
import { ErrorMessage } from "../atoms/ErrorMessage"
import { Button } from "../atoms/Button"
import { useRouter } from "next/navigation"

const otpSchema = z.object({
  otp: z.string().min(6, { message: "OTP must be 6 digits" }),
})

type OTPFormData = z.infer<typeof otpSchema>

export function OtpVerificationForm() {
  const router = useRouter()
  const [secondsLeft, setSecondsLeft] = React.useState(60)
  const [canResend, setCanResend] = React.useState(false)

  const {
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<OTPFormData>({
    resolver: zodResolver(otpSchema),
    defaultValues: {
      otp: "",
    },
  })

  const otpValue = watch("otp")

  // Countdown timer
  React.useEffect(() => {
    if (secondsLeft <= 0) {
      setCanResend(true)
      return
    }

    const timer = setInterval(() => {
      setSecondsLeft((s) => s - 1)
    }, 1000)

    return () => clearInterval(timer)
  }, [secondsLeft])

  const resendOtp = async () => {
    try {
      const res = await fetch("/api/resend-otp", { method: "POST" })
      const result = await res.json()

      if (!res.ok) throw new Error(result.message || "Failed to resend OTP")

      toast.success("📨 OTP resent successfully!")
      setSecondsLeft(60)
      setCanResend(false)
    } catch (err: unknown) {
      const error = err instanceof Error ? err.message : "Unexpected error"
      toast.error(error)
    }
  }

  const onSubmit = async (data: OTPFormData) => {
    try {
      const res = await fetch("/api/verify-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ otp: data.otp }),
      })

      const result = await res.json()
      if (!res.ok) throw new Error(result.message || "Verification failed")

      toast.success("✅ OTP verified!")
      router.push("/resetPassword")
    } catch (err: unknown) {
      const error = err instanceof Error ? err.message : "Unexpected error"
      toast.error(`❌ ${error}`)
    }
  }

  return (
    <Card className="max-w-md w-full mx-auto">
      <CardHeader className="text-center space-y-1">
        <CardTitle className="text-2xl font-semibold">Verify OTP</CardTitle>
        <CardDescription className="text-sm text-muted-foreground"> 
          Enter the 6-digit code sent to your email.
        </CardDescription>
      </CardHeader>

      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 items-center justify-center flex flex-col">
          <div className="">
            <InputOTP
              maxLength={6}
              value={otpValue}
              onChange={(val) => setValue("otp", val)}
            >
              <InputOTPGroup>
                {Array.from({ length: 6 }).map((_, i) => (
                  <InputOTPSlot key={i} index={i} />
                ))}
              </InputOTPGroup>
            </InputOTP>

            {!!errors.otp?.message && (
              <ErrorMessage message={errors.otp.message} />
            )}
          </div>

          <Button type="submit" disabled={isSubmitting} className="w-full">
            {isSubmitting ? "Verifying..." : "Verify OTP"}
          </Button>

          <div className="flex items-center justify-between text-sm text-muted-foreground">
            <span>
              {canResend
                ? "Didn’t receive OTP?"
                : `Resend available in ${secondsLeft}s`}
            </span>

            <Button
              type="button"
              variant="link"
              size="sm"
              disabled={!canResend}
              onClick={resendOtp}
            >
              Resend OTP
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}
