"use client";

import { useState } from "react";
import { format } from "date-fns";
import { X } from "lucide-react";
import { Calendar } from "../molecules/Calendar";
import { Popover, PopoverContent, PopoverTrigger } from "../atoms/Popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../atoms/Select";
import { Input } from "../atoms/Input";
import { Button } from "../atoms/Button";
import { FilterItem } from "../molecules/FilterItem";

export interface FilterOption {
  label: string;
  value: string;
  type: "text" | "date";
}

export interface DateRange {
  from: Date;
  to?: Date;
}

export interface Filter {
  field: string;
  operator: string;
  value: string | DateRange | null;
}

type FilterFieldType = "field" | "operator" | "value";

interface DynamicFilterRowProps {
  filter: Filter;
  fields: FilterOption[];
  operators: FilterOption[];
  onChange: <T extends FilterFieldType>(type: T, value: Filter[T]) => void;
  onRemove: () => void;
}

function DynamicFilterRow({
  filter,
  fields,
  operators,
  onChange,
  onRemove,
}: DynamicFilterRowProps) {
  const fieldType =
    fields.find((f) => f.value === filter.field)?.type || "text";

  return (
    <div className="flex items-center gap-2 mt-2">
      <FilterItem label="Field">
        <Select
          value={filter.field}
          onValueChange={(val) => onChange("field", val)}
        >
          <SelectTrigger className="w-[140px]">
            <SelectValue placeholder="Select field" />
          </SelectTrigger>
          <SelectContent>
            {fields.map((f) => (
              <SelectItem key={f.value} value={f.value}>
                {f.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </FilterItem>

      <FilterItem label="Operator">
        <Select
          value={filter.operator}
          onValueChange={(val) => onChange("operator", val)}
        >
          <SelectTrigger className="w-[140px]">
            <SelectValue placeholder="Select operator" />
          </SelectTrigger>
          <SelectContent>
            {operators.map((op) => (
              <SelectItem key={op.value} value={op.value}>
                {op.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </FilterItem>

      <FilterItem label="Value">
        {fieldType === "date" ? (
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className="w-[220px] justify-start text-left font-normal"
              >
                {filter.value &&
                typeof filter.value === "object" &&
                "from" in filter.value &&
                filter.value.from ? (
                  filter.value.to ? (
                    `${format(filter.value.from, "dd-MM-yyyy")} to ${format(
                      filter.value.to,
                      "dd-MM-yyyy"
                    )}`
                  ) : (
                    format(filter.value.from, "dd-MM-yyyy")
                  )
                ) : (
                  <span className="text-muted-foreground">
                    Pick a date range
                  </span>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="p-0" align="start">
              <Calendar
                mode="range"
                selected={filter.value as DateRange | undefined}
                onSelect={(range) => onChange("value", range as DateRange)}
                numberOfMonths={1}
              />
            </PopoverContent>
          </Popover>
        ) : (
          <Input
            placeholder="Enter value"
            value={filter.value as string}
            onChange={(e) => onChange("value", e.target.value)}
            className="w-[180px]"
          />
        )}
      </FilterItem>

      <Button
        variant="ghost"
        size="sm"
        className="text-muted-foreground hover:text-destructive"
        onClick={onRemove}
      >
        <X className="h-4 w-4" />
      </Button>
    </div>
  );
}

interface FiltersPanelProps {
  fieldOptions: FilterOption[];
  operatorOptions: FilterOption[];
  initialFilters?: Filter[];
  onApply?: (filters: Filter[]) => void;
}

export function FiltersPanel({
  fieldOptions,
  operatorOptions,
  initialFilters = [{ field: "", operator: "", value: "" }],
  onApply,
}: FiltersPanelProps) {
  const [open, setOpen] = useState(false);
  const [filters, setFilters] = useState<Filter[]>(initialFilters);

  const updateFilter = <T extends FilterFieldType>(
    index: number,
    type: T,
    val: Filter[T]
  ) => {
    const newFilters = [...filters];
    newFilters[index] = { ...newFilters[index], [type]: val };
    setFilters(newFilters);
  };

  const removeFilter = (index: number) => {
    setFilters(filters.filter((_, i) => i !== index));
  };

  const addFilter = () => {
    setFilters([...filters, { field: "", operator: "", value: "" }]);
  };

  const clearFilters = () => {
    setFilters([]);
  };

  const applyFilters = () => {
    onApply?.(filters);
    setOpen(false);
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant="outline">Filter</Button>
      </PopoverTrigger>
      <PopoverContent className="w-[600px]">
        <div className="space-y-2">
          {filters.map((filter, i) => (
            <DynamicFilterRow
              key={i}
              filter={filter}
              fields={fieldOptions}
              operators={operatorOptions}
              onChange={(type, val) => updateFilter(i, type, val)}
              onRemove={() => removeFilter(i)}
            />
          ))}
        </div>

        <div className="flex justify-between items-center mt-4">
          <Button variant="ghost" onClick={addFilter}>
            + Add a Filter
          </Button>
          <div className="flex gap-2">
            <Button variant="outline" onClick={clearFilters}>
              Clear Filters
            </Button>
            <Button
              onClick={applyFilters}
              disabled={!filters.every((f) => f.field && f.operator && f.value)}
            >
              Apply Filters
            </Button>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}
