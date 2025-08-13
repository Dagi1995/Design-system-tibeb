"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";

import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "../molecules/Card";
import { Label } from "../atoms/Label";
import { Input } from "../atoms/Input";
import { Button } from "../atoms/Button";
import { ErrorMessage } from "../atoms/ErrorMessage";

const forgotPasswordSchema = z.object({
  email: z.string().email("Invalid email address"),
});

type ForgotPasswordFormValues = z.infer<typeof forgotPasswordSchema>;

export function ForgotPasswordForm() {
  const router = useRouter();
  const [isLoading, setIsLoading] = React.useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgotPasswordFormValues>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = async (data: ForgotPasswordFormValues) => {
    setIsLoading(true);

    // Fake async delay to simulate request
    setTimeout(() => {
      toast.success("Mock: Password reset link sent!");

      // Redirect to OTP with email as query
      router.push("/otp");
    }, 1500);
  };

  return (
    <Card className="w-full max-w-md mx-auto shadow-md border-muted rounded-lg bg-background">
      <CardHeader className="text-center space-y-1">
        <CardTitle className="text-2xl font-bold">Forgot Password</CardTitle>
        <CardDescription className="text-sm font-semibold text-muted-foreground">
          Enter your email to receive a password reset link.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="space-y-1">
            <Label htmlFor="email">Email Address</Label>
            <Input id="email" type="email" {...register("email")} />
            <ErrorMessage message={errors.email?.message} />
          </div>

          <Button type="submit" disabled={isLoading} className="w-full">
            {isLoading && (
              <span className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
            )}
            {isLoading ? "Sending..." : "Reset Password"}
          </Button>

          <div className="mt-4 text-center text-sm text-muted-foreground">
            Don’t have an account?{" "}
            <a
              href="/register"
              className="text-primary font-semibold underline hover:text-blue-600"
            >
              Register
            </a>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
