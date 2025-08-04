"use client"

import { useState } from "react"
import { X } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../atoms/Select"
import { Input } from "../atoms/Input"
import { Button } from "../atoms/Button"
import { FilterItem } from "../molocules/FilterItem"
import { Popover, PopoverContent, PopoverTrigger } from "../atoms/popover"

export interface FilterOption {
  label: string
  value: string
}

export interface Filter {
  field: string
  operator: string
  value: string
}

interface DynamicFilterRowProps {
  filter: Filter
  fields: FilterOption[]
  operators: FilterOption[]
  onChange: (type: "field" | "operator" | "value", value: string) => void
  onRemove: () => void
}

function DynamicFilterRow({
  filter,
  fields,
  operators,
  onChange,
  onRemove,
}: DynamicFilterRowProps) {
  return (
    <div className="flex items-end gap-2">
      <FilterItem label="Field">
        <Select value={filter.field} onValueChange={(val) => onChange("field", val)}>
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
        <Select value={filter.operator} onValueChange={(val) => onChange("operator", val)}>
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
        <Input
          placeholder="Enter value"
          value={filter.value}
          onChange={(e) => onChange("value", e.target.value)}
          className="w-[180px]"
        />
      </FilterItem>

      <Button
        variant="ghost"
        size="icon"
        className="mb-2 text-muted-foreground hover:text-destructive"
        onClick={onRemove}
      >
        <X className="h-4 w-4" />
      </Button>
    </div>
  )
}

interface FiltersPanelProps {
  fieldOptions: FilterOption[]
  operatorOptions: FilterOption[]
  initialFilters?: Filter[]
  onApply?: (filters: Filter[]) => void
}

export function FiltersPanel({
  fieldOptions,
  operatorOptions,
  initialFilters = [{ field: "", operator: "", value: "" }],
  onApply,
}: FiltersPanelProps) {
  const [open, setOpen] = useState(false)
  const [filters, setFilters] = useState<Filter[]>(initialFilters)

  const updateFilter = (index: number, type: "field" | "operator" | "value", val: string) => {
    const newFilters = [...filters]
    newFilters[index] = { ...newFilters[index], [type]: val }
    setFilters(newFilters)
  }

  const removeFilter = (index: number) => {
    setFilters(filters.filter((_, i) => i !== index))
  }

  const addFilter = () => {
    setFilters([...filters, { field: "", operator: "", value: "" }])
  }

  const clearFilters = () => {
    setFilters([])
  }

  const applyFilters = () => {
    onApply?.(filters)
    setOpen(false)
  }

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
            <Button onClick={applyFilters}>Apply Filters</Button>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  )
}
