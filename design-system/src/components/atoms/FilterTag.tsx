"use client"

import { X } from "lucide-react"
import { Button } from "./Button"

interface FilterTagProps {
  label: string
  onRemove: () => void
}

export function FilterTag({ label, onRemove }: FilterTagProps) {
  return (
    <div className="flex items-center gap-1 rounded-md bg-muted px-2 py-1 text-sm">
      <span>{label}</span>
      <Button
        variant="ghost"
        size="sm"
        className="h-4 w-4 p-0 text-muted-foreground hover:text-destructive"
        onClick={onRemove}
      >
        <X className="h-3 w-3" />
      </Button>
    </div>
  )
}

