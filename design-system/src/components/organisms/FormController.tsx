// components/forms/RegisterForm.tsx
"use client"

import React from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { useRouter } from "next/navigation"
import { toast } from "sonner"

import { Input } from "../atoms/Input"
import { Button } from "../atoms/Button"
import { Checkbox } from "../atoms/Checkbox"
import { Calendar } from "../molocules/Calendar"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../atoms/Select"
import { ErrorMessage } from "../atoms/ErrorMessage"
import { Spinner } from "../atoms/Spinner"

// Schema
const formSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email"),
  role: z.string().min(1, "Role is required"),
  terms: z.boolean().refine((val) => val, { message: "You must accept terms" }),
  birthDate: z
    .union([z.date(), z.null()])
    .refine((val) => val !== null, { message: "Birth date is required" }),
  file: z
    .instanceof(FileList)
    .refine((fileList) => fileList.length > 0, { message: "File is required" }),
})

type FormValues = z.infer<typeof formSchema>

export function RegisterForm() {
  const router = useRouter()

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      role: "",
      terms: false,
      birthDate: null,
      file: undefined,
    },
  })

  const onSubmit = async (data: FormValues) => {
    try {
      const response = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      })

      const result = await response.json()

      if (response.ok && result.success) {
        toast.success("Account created successfully!")
        setTimeout(() => router.push("/login"), 1500)
      } else {
        toast.error(result.message || "Something went wrong")
      }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      toast.error("Failed to connect to server")
    }
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-4 max-w-lg mx-auto p-4 border rounded-xl shadow"
    >
      <div>
        <Input {...register("name")} placeholder="Full name" />
        <ErrorMessage message={errors.name?.message} />
      </div>

      <div>
        <Input type="email" {...register("email")} placeholder="Email address" />
        <ErrorMessage message={errors.email?.message} />
      </div>

      <div>
        <Select onValueChange={(val) => setValue("role", val, { shouldValidate: true })}>
          <SelectTrigger>
            <SelectValue placeholder="Select role" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="user">User</SelectItem>
            <SelectItem value="admin">Admin</SelectItem>
          </SelectContent>
        </Select>
        <ErrorMessage message={errors.role?.message} />
      </div>

      <div>
        <Calendar
          mode="single"
          selected={watch("birthDate") ?? undefined}
          onSelect={(date) => setValue("birthDate", date ?? null, { shouldValidate: true })}
        />
        <ErrorMessage message={errors.birthDate?.message} />
      </div>

      <div className="flex items-center gap-2">
        <Checkbox id="terms" {...register("terms")} />
        <label htmlFor="terms" className="text-sm">
          I accept the terms and conditions
        </label>
      </div>
      <ErrorMessage message={errors.terms?.message} />

      <div>
        <Input type="file" {...register("file")} />
        <ErrorMessage message={errors.file?.message} />
      </div>

      <div className="flex justify-between mt-4">
        <Button type="button" variant="outline" onClick={() => reset()}>
          Reset
        </Button>
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? <Spinner className="h-4 w-4 animate-spin" /> : "Submit"}
        </Button>
      </div>
    </form>
  )
}
