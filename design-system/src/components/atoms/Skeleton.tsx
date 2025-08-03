import { cn } from "@/lib/utils"

function Skeleton({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="skeleton"
      className={cn("h-8 w-48 bg-gray-600 animate-pulse", className)}
      {...props}
    />
  )
}

export { Skeleton }
