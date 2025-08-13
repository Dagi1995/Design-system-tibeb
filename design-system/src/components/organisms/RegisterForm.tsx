"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { useForm, Controller, ControllerRenderProps } from "react-hook-form";
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
import { Checkbox } from "../atoms/Checkbox";
import { Button } from "../atoms/Button";
import { ErrorMessage } from "../atoms/ErrorMessage";
import { BirthdateInput } from "../molecules/BirthdateInput";
import {
  Select,
  SelectContent,
  SelectValue,
  SelectItem,
  SelectTrigger,
} from "../atoms/Select";
import { FileUploader } from "../molecules/FileUpload";

// Fix birthday schema validation
const registerSchema = z
  .object({
    firstname: z.string().min(1, "First name is required"),
    lastname: z.string().min(1, "Last name is required"),
    email: z.string().email("Invalid email address"),
    phone: z.string().optional(),
    department: z.string().optional(),
    birthday: z
      .date()
      .refine((date) => !!date, { message: "Birthday is required" }),
    role: z.string().min(1, "Role is required"),
    file: z.instanceof(File).nullable().optional(),
    password: z.string().min(6, "Password must be at least 6 characters long"),
    confirmPassword: z.string().min(6, "Confirm password is required"),
    terms: z.boolean().refine((val) => val === true, {
      message: "You must accept the terms and conditions",
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

type RegisterFormValues = z.infer<typeof registerSchema>;

type ControllerFieldProps<T extends keyof RegisterFormValues> = {
  field: ControllerRenderProps<RegisterFormValues, T>;
};

export function RegisterForm() {
  const router = useRouter();
  const [isLoading, setIsLoading] = React.useState(false);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      terms: false,
      department: "",
      role: "",
      birthday: undefined,
      file: null,
    },
  });

  const onSubmit = async (data: RegisterFormValues) => {
    setIsLoading(true);

    try {
      // Note: Sending File as JSON won't work properly
      // You may want to handle file upload separately (e.g. FormData)
      // Here just for demonstration:
      const response = await fetch("/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...data,
          file: data.file
            ? {
                name: data.file.name,
                size: data.file.size,
                type: data.file.type,
              }
            : null,
        }),
      });

      const result = await response.json();

      if (response.ok && result.success) {
        toast.success("Account created successfully!");
        setTimeout(() => {
          router.push("/login");
        }, 1500);
      } else {
        toast.error(result.message || "Something went wrong");
      }
    } catch (error) {
      toast.error("Failed to connect to server");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-2xl mx-auto shadow-lg rounded-lg border border-muted bg-background">
      <CardHeader className="text-center space-y-1">
        <CardTitle className="text-2xl font-semibold">
          Create an Account
        </CardTitle>
        <CardDescription className="text-sm text-muted-foreground">
          Start your journey with us by filling out the details below.
        </CardDescription>
      </CardHeader>

      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1">
              <Label htmlFor="firstname">First Name</Label>
              <Input
                id="firstname"
                {...register("firstname")}
                placeholder="John"
              />
              <ErrorMessage message={errors.firstname?.message} />
            </div>
            <div className="space-y-1">
              <Label htmlFor="lastname">Last Name</Label>
              <Input
                id="lastname"
                {...register("lastname")}
                placeholder="Doe"
              />
              <ErrorMessage message={errors.lastname?.message} />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1">
              <Label htmlFor="email">Email Address</Label>
              <Input
                id="email"
                type="email"
                {...register("email")}
                placeholder="you@example.com"
              />
              <ErrorMessage message={errors.email?.message} />
            </div>
            <div className="space-y-1">
              <Label htmlFor="phone">Phone Number</Label>
              <Input
                id="phone"
                type="tel"
                {...register("phone")}
                placeholder="+251 924 567 901"
              />
              <ErrorMessage message={errors.phone?.message} />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Birthday */}
            <div className="space-y-1">
              <Controller
                name="birthday"
                control={control}
                render={({ field }: ControllerFieldProps<"birthday">) => (
                  <BirthdateInput {...field} />
                )}
              />
              <ErrorMessage message={errors.birthday?.message} />
            </div>

            {/* Department Select */}
            <div className="space-y-1">
              <Label htmlFor="role">Department</Label>
              <Controller
                name="role"
                control={control}
                render={({ field }) => (
                  <Select
                    onValueChange={field.onChange}
                    value={field.value || ""}
                  >
                    <SelectTrigger aria-label="Role">
                      <SelectValue placeholder="Select a Department" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="admin">Admin</SelectItem>
                      <SelectItem value="user">User</SelectItem>
                      <SelectItem value="moderator">Moderator</SelectItem>
                    </SelectContent>
                  </Select>
                )}
              />
              <ErrorMessage message={errors.role?.message} />
            </div>
          </div>

          {/* File Upload */}
          <div className="space-y-1">
            <Label>Profile Picture (optional)</Label>
            <Controller
              name="file"
              control={control}
              render={({ field }) => (
                <FileUploader
                  value={field.value ? [field.value] : []}
                  onValueChange={(files) => {
                    field.onChange(files && files.length > 0 ? files[0] : null);
                  }}
                  dropzoneOptions={{
                    accept: { "image/*": [".jpeg", ".jpg", ".png", ".gif"] },
                    maxFiles: 1,
                    maxSize: 4 * 1024 * 1024, // 4MB
                    multiple: false,
                  }}
                />
              )}
            />
            <ErrorMessage message={errors.file?.message} />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                {...register("password")}
                placeholder="••••••••"
              />
              <ErrorMessage message={errors.password?.message} />
            </div>
            <div className="space-y-1">
              <Label htmlFor="confirmPassword">Confirm Password</Label>
              <Input
                id="confirmPassword"
                type="password"
                {...register("confirmPassword")}
                placeholder="••••••••"
              />
              <ErrorMessage message={errors.confirmPassword?.message} />
            </div>
          </div>

          <div className="flex items-start gap-2">
            <Controller
              name="terms"
              control={control}
              render={({ field }: ControllerFieldProps<"terms">) => (
                <Checkbox
                  id="terms"
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              )}
            />
            <Label htmlFor="terms" className="text-sm leading-snug">
              I agree to the{" "}
              <a href="#" className="underline hover:text-primary">
                terms and conditions
              </a>
              .
            </Label>
          </div>
          <ErrorMessage message={errors.terms?.message} />

          <Button
            type="submit"
            className="w-full flex items-center justify-center gap-2"
            disabled={isLoading}
          >
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
  );
}
