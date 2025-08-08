"use client"

import { z } from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as React from "react"
import { useRouter } from "next/navigation"

import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "../molocules/Card"
import { Label } from "../atoms/Label"
import { Input } from "../atoms/Input"
import { Checkbox } from "../atoms/Checkbox"
import { Button } from "../atoms/Button"
import { ErrorMessage } from "../atoms/ErrorMessage"
import { toast } from "sonner"

const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters long"),
  remember: z.boolean().optional(),
})

type LoginFormValues = z.infer<typeof loginSchema>

export function LoginForm() {
  const router = useRouter()
  const [isLoading, setIsLoading] = React.useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
      remember: false,
    },
  })

  const onSubmit = async (data: LoginFormValues) => {
    setIsLoading(true)
    try{
      const response = await fetch("/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }) 
      const result = await response.json()
      if (response.ok) {
        toast.success("Login successful!")
        router.push("/dashboard")
      } else {
        toast.error(result.message || "Login failed. Please try again.")
      }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error){
      toast.error("An error occurred while logging in. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Card className="w-full max-w-lg mx-auto shadow-md border-muted rounded-lg bg-background">
      <CardHeader className="text-center space-y-1">
        <CardTitle className="text-2xl font-semibold">Login to Your Account</CardTitle>
        <CardDescription className="text-sm text-muted-foreground">
          Enter your credentials to access your dashboard.
        </CardDescription>
      </CardHeader>

      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-1">
            <Label htmlFor="email">Email Address</Label>
            <Input id="email" type="email" {...register("email")} />
            <ErrorMessage message={errors.email?.message} />
          </div>

          <div className="space-y-1">
            <Label htmlFor="password">Password</Label>
            <Input id="password" type="password" {...register("password")} />
            <ErrorMessage message={errors.password?.message} />
          </div>

          <div className="flex flex-col justify-between gap-2">
            <div className="flex items-center gap-2">
              <Checkbox id="remember" {...register("remember")} />
              <Label htmlFor="remember">Remember Me</Label>
            </div>

            <a href="/forgot-password" className="text-sm font-semibold underline hover:text-blue-600">
              Forgot password?
            </a>

            <Button type="submit" className="w-full mt-4" disabled={isLoading}>
              {isLoading && (
                <span className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
              )}
              {isLoading ? "Logging in..." : "Login"}
            </Button>

            <div className="w-full mt-4 space-y-3">
              <Button
                type="button"
                variant="outline"
                className="w-full flex items-center justify-center gap-2"
                onClick={() => alert("Google login not yet implemented")}
              >
                <svg className="h-5 w-5" viewBox="0 0 533.5 544.3" xmlns="http://www.w3.org/2000/svg">
                  <path fill="#4285f4" d="M533.5 278.4c0-17.7-1.6-35.1-4.7-51.8H272v98.1h147.3c-6.4 34.7-25.2 63.9-53.5 83.5v69.3h86.2c50.4-46.5 81.5-115.1 81.5-199.1z"/>
                  <path fill="#34a853" d="M272 544.3c72.8 0 133.9-24.1 178.5-65.5l-86.2-69.3c-24 16.1-54.6 25.7-92.3 25.7-70.8 0-130.8-47.9-152.3-112.1H29.8v70.5C74.3 474.5 167.6 544.3 272 544.3z"/>
                  <path fill="#fbbc04" d="M119.7 322.9c-10.4-30.1-10.4-62.6 0-92.7v-70.5H29.8c-36.5 72.6-36.5 158.1 0 230.7l89.9-67.5z"/>
                  <path fill="#ea4335" d="M272 107.1c39.6-.6 77.7 13.6 107 40.1l80.1-80.1C405.9 24.1 344.8 0 272 0 167.6 0 74.3 69.8 29.8 173.6l89.9 70.5c21.5-64.2 81.5-112.1 152.3-112.1z"/>
                </svg>
                Continue with Google
              </Button>
            </div>

            <div className="mt-4 text-center text-sm text-muted-foreground">
              Don’t have an account?{" "}
              <a href="/register" className="text-primary font-semibold underline hover:text-blue-600">
                Register
              </a>
            </div>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}
