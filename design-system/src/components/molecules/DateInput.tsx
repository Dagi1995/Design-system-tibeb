// components/custom/birthdate-input.tsx
"use client";

import * as React from "react";
import { Popover, PopoverContent, PopoverTrigger } from "../atoms/Popover";
import { Button } from "../atoms/Button";
import { Calendar } from "./Calendar";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";

interface BirthdateInputProps {
  label?: string;
  placeholder?: string;
  description?: string;
  onChange?: (date: Date | undefined) => void;
  className?: string;
}

export function BirthdateInput({
  label = "Birthdate",
  placeholder = "Pick a date",
  description,
  onChange,
  className,
}: BirthdateInputProps) {
  const [date, setDate] = React.useState<Date | undefined>(undefined);

  const handleSelect = (selected: Date | undefined) => {
    setDate(selected);
    onChange?.(selected);
  };

  return (
    <div className={cn("space-y-2", className)}>
      {label && <label className="text-sm font-medium">{label}</label>}

      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            className={cn(
              "w-full justify-start text-left font-normal",
              !date && "text-muted-foreground"
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {date ? format(date, "PPP") : placeholder}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0">
          <Calendar
            mode="single"
            selected={date}
            onSelect={handleSelect}
            captionLayout="dropdown"
            fromYear={1900}
            toYear={new Date().getFullYear()}
          />
        </PopoverContent>
      </Popover>

      {description && (
        <p className="text-sm text-muted-foreground">{description}</p>
      )}
    </div>
  );
}
