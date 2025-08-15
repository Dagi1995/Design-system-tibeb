"use client"

import * as React from "react"
import { Input } from "../atoms/Input"
import { Button } from "../atoms/Button"
import { cn } from "@/lib/utils"
import { XIcon, SearchIcon } from "lucide-react"

type SearchInputProps = {
  value: string
  onChange: (value: string) => void
  placeholder?: string
  className?: string
  disabled?: boolean
}

export function SearchInput({
  value,
  onChange,
  placeholder = "Search...",
  className,
  disabled,
}: SearchInputProps) {
  const inputRef = React.useRef<HTMLInputElement>(null)

  const handleClear = () => {
    onChange("")
    inputRef.current?.focus()
  }

  return (
    <div className={cn("relative", className)}>
      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
        <SearchIcon className="size-4" />
      </span>
      <Input
        ref={inputRef}
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        disabled={disabled}
        className="pl-9 pr-9"
      />
      {value && (
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={handleClear}
          className="absolute right-1.5 top-1/2 -translate-y-1/2 h-7 w-7 p-0 text-muted-foreground hover:text-foreground"
        >
          <XIcon className="size-4" />
        </Button>
      )}
    </div>
  )
}

