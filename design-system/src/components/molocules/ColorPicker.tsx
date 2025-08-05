"use client"

import * as React from "react"
import { HexColorPicker } from "react-colorful"
import { Popover, PopoverContent, PopoverTrigger } from "../atoms/Popover"
import { Button } from "../atoms/Button"
import { Input } from "../atoms/Input"
import { Copy, Check } from "lucide-react"
import { toast } from "sonner"

interface ColorPickerProps {
  value?: string
  onChange?: (color: string) => void
}

export function ColorPicker({ value = "#1d4ed8", onChange }: ColorPickerProps) {
  const [color, setColor] = React.useState(value)
  const [copied, setCopied] = React.useState(false)

  React.useEffect(() => {
    if (onChange) onChange(color)
  }, [color, onChange])

  const copyToClipboard = () => {
    navigator.clipboard.writeText(color)
    setCopied(true)
    toast.success("Color copied!")
    setTimeout(() => setCopied(false), 1500)
  }

  return (
    <div className="flex items-center gap-4">
      <Popover>
        <PopoverTrigger asChild>
          <Button variant="outline" className="flex items-center gap-2">
            <span
              className="w-4 h-4 rounded-full border"
              style={{ backgroundColor: color }}
            />
           
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-4 font-semibold gap-2">
            Color Picker
          <HexColorPicker color={color} onChange={setColor} />
        </PopoverContent>
      </Popover>

      <Input value={color} readOnly className="w-32" />

      <Button
        variant="ghost"
        size="icon"
        onClick={copyToClipboard}
        className="text-muted-foreground"
      >
        {copied ? (
          <Check className="w-4 h-4 text-green-500" />
        ) : (
          <Copy className="w-4 h-4" />
        )}
      </Button>
    </div>
  )
}
