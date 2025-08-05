"use client"

import { ReactNode } from "react"
import { Label } from "../atoms/label"

interface FilterItemProps {
  label: string
  children: ReactNode
}

export function FilterItem({ label, children }: FilterItemProps) {
  return (
    <div className="flex flex-col gap-1">
      <Label className="text-xs text-muted-foreground">{label}</Label>
      {children}
    </div>
  )
}