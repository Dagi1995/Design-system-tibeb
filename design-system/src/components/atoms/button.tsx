import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed",
  {
    variants: {
      variant: {
        primary:
          "bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500",
        secondary:
          "bg-gray-100 text-gray-900 border border-gray-300 hover:bg-gray-200 focus:ring-blue-500",
        outline:
          "bg-transparent border border-gray-300 text-gray-900 hover:bg-gray-100 focus:ring-blue-500",
        danger:
          "bg-red-600 text-white hover:bg-red-700 focus:ring-red-500",
        link: "text-blue-600 hover:underline focus:ring-blue-500",
      },
      size: {
        sm: "text-sm px-3 py-1.5 rounded",
        md: "text-sm px-4 py-2 rounded-md",
        lg: "text-base px-5 py-3 rounded-md",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  }
)

interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: ButtonProps) {
  const Comp = asChild ? Slot : "button"

  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  )
}

export { Button, buttonVariants }
