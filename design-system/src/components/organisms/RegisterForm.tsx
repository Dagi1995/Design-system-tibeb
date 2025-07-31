"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import { useForm, Controller } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"

import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "../molocules/card"
import { Label } from "../atoms/label"
import { Input } from "../atoms/input"
import { Checkbox } from "../atoms/checkbox"
import { Button } from "../atoms/button"

const registerSchema = z
  .object({
    firstname: z.string().min(1, "First name is required"),
    lastname: z.string().min(1, "Last name is required"),
    email: z.string().email("Invalid email address"),
    phone: z.string().optional(),
    department: z.string().optional(),
    password: z.string().min(6, "Password must be at least 6 characters long"),
    confirmPassword: z.string().min(6, "Confirm password is required"),
    terms: z.boolean().refine((val) => val === true, {
      message: "You must accept the terms and conditions",
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  })

type RegisterFormValues = z.infer<typeof registerSchema>

export function RegisterForm() {
  const router = useRouter()
  const [isLoading, setIsLoading] = React.useState(false)

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      terms: false, // ✅ important!
    },
  })

  const onSubmit = (data: RegisterFormValues) => {
    console.log("Register Data:", data)
    setIsLoading(true)

    setTimeout(() => {
      setIsLoading(false)
      router.push("/login")
    }, 1500)
  }

  return (
    <Card className="w-full max-w-2xl mx-auto shadow-lg rounded-lg border border-muted bg-background">
      <CardHeader className="text-center space-y-1">
        <CardTitle className="text-2xl font-semibold">Create an Account</CardTitle>
        <CardDescription className="text-sm text-muted-foreground">
          Start your journey with us by filling out the details below.
        </CardDescription>
      </CardHeader>

      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1">
              <Label htmlFor="firstname">First Name</Label>
              <Input id="firstname" {...register("firstname")} placeholder="John" />
              {errors.firstname && <p className="text-sm text-destructive">{errors.firstname.message}</p>}
            </div>
            <div className="space-y-1">
              <Label htmlFor="lastname">Last Name</Label>
              <Input id="lastname" {...register("lastname")} placeholder="Doe" />
              {errors.lastname && <p className="text-sm text-destructive">{errors.lastname.message}</p>}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1">
              <Label htmlFor="email">Email Address</Label>
              <Input id="email" type="email" {...register("email")} placeholder="you@example.com" />
              {errors.email && <p className="text-sm text-destructive">{errors.email.message}</p>}
            </div>
            <div className="space-y-1">
              <Label htmlFor="phone">Phone Number</Label>
              <Input id="phone" type="tel" {...register("phone")} placeholder="+251 924 567 901" />
              {errors.phone && <p className="text-sm text-destructive">{errors.phone.message}</p>}
            </div>
          </div>

          <div className="space-y-1">
            <Label htmlFor="department">Department</Label>
            <Input id="department" {...register("department")} placeholder="Engineering, Marketing, etc." />
            {errors.department && <p className="text-sm text-destructive">{errors.department.message}</p>}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1">
              <Label htmlFor="password">Password</Label>
              <Input id="password" type="password" {...register("password")} placeholder="••••••••" />
              {errors.password && <p className="text-sm text-destructive">{errors.password.message}</p>}
            </div>
            <div className="space-y-1">
              <Label htmlFor="confirmPassword">Confirm Password</Label>
              <Input id="confirmPassword" type="password" {...register("confirmPassword")} placeholder="••••••••" />
              {errors.confirmPassword && <p className="text-sm text-destructive">{errors.confirmPassword.message}</p>}
            </div>
          </div>

          {/* ✅ Fixed Checkbox */}
          <div className="flex items-start gap-2">
            <Controller
              name="terms"
              control={control}
              render={({ field }) => (
                <Checkbox
                  id="terms"
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              )}
            />
            <Label htmlFor="terms" className="text-sm leading-snug">
              I agree to the <a href="#" className="underline hover:text-primary">terms and conditions</a>.
            </Label>
          </div>
          {errors.terms && <p className="text-sm text-destructive">{errors.terms.message}</p>}

          <Button type="submit" className="w-full flex items-center justify-center gap-2" disabled={isLoading}>
            {isLoading && (
              <span className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
            )}
            {isLoading ? "Creating Account..." : "Create Account"}
          </Button>
          <div className="mt-4 text-center text-sm text-muted-foreground">
          Already have an account?
          <a
            href="/login"
            className="ml-1 text-primary font-semibold underline hover:text-blue-600"
          >
            Login
          </a>
        </div>
        </form>
      </CardContent>
    </Card>
  )
}
