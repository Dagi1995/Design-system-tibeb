/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import * as React from "react";
import {
  closestCenter,
  DndContext,
  KeyboardSensor,
  MouseSensor,
  TouchSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
  type UniqueIdentifier,
} from "@dnd-kit/core";
import { restrictToVerticalAxis } from "@dnd-kit/modifiers";
import {
  arrayMove,
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import {
  IconChevronDown,
  IconChevronLeft,
  IconChevronRight,
  IconChevronsLeft,
  IconChevronsRight,
  IconDotsVertical,
  IconGripVertical,
  IconLayoutColumns,
  IconPlus,
  IconFilter,
  IconX,
  IconEye,
  IconUser,
  IconClock,
  IconAlertTriangle,
  IconCategory,
} from "@tabler/icons-react";
import {
  ColumnDef,
  ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  Row,
  SortingState,
  useReactTable,
  VisibilityState,
  FilterFn,
} from "@tanstack/react-table";
import { toast } from "sonner";
import { z } from "zod";
import { format } from "date-fns";

import { Badge } from "@/design-system/src/components/atoms/Badge";
import { Button } from "@/design-system/src/components/atoms/Button";

import { Checkbox } from "@/design-system/src/components/atoms/Checkbox";

import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/design-system/src/components/molecules/DropdownMenu";
import { Input } from "@/design-system/src/components/atoms/Input";
import { Label } from "@/design-system/src/components/atoms/Label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/design-system/src/components/atoms/Select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/design-system/src/components/atoms/Table";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/design-system/src/components/atoms/Tabs";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/design-system/src/components/atoms/Popover";
import { Calendar } from "@/design-system/src/components/molecules/Calendar";
import Link from "next/link";

export const schema = z.object({
  id: z.number(),
  fullName: z.string(),
  email: z.string(),
  phoneNumber: z.string().optional(),
  dueDate: z.string().optional(),
  category: z.string(),
  createdAt: z.string(),
});

// ---------- filter types ----------
export interface FilterOption {
  label: string;
  value: string;
  type: "text" | "date" | "select";
  options?: { label: string; value: string }[];
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

// operators
const filterOperators: FilterOption[] = [
  { label: "Equals", value: "equals", type: "text" },
  { label: "Contains", value: "contains", type: "text" },
  { label: "Starts with", value: "startsWith", type: "text" },
  { label: "Ends with", value: "endsWith", type: "text" },
  { label: "Is empty", value: "isEmpty", type: "text" },
  { label: "Is not empty", value: "isNotEmpty", type: "text" },
  { label: "Is any of", value: "isAnyOf", type: "select" },
];

// available fields for tickets
const filterFields: FilterOption[] = [
  { label: "ID", value: "id", type: "text" },
  { label: "Requester", value: "fullName", type: "text" },
  { label: "Email", value: "email", type: "text" },
  { label: "Phone", value: "phoneNumber", type: "text" },
  { label: "Due Date", value: "dueDate", type: "date" },
  {
    label: "Category",
    value: "category",
    type: "select",
    options: [
      { label: "Technical Support", value: "Technical Support" },
      { label: "Billing", value: "Billing" },
      { label: "Account", value: "Account" },
      { label: "Feature Request", value: "Feature Request" },
      { label: "Other", value: "Other" },
      { label: "Database", value: "Database" },
      { label: "Profile", value: "Profile" },
      { label: "Queue Management", value: "Queue Management" },
      { label: "Letter Management", value: "Letter Management" },
      { label: "Chat", value: "Chat" },
      { label: "Learning Letter", value: "Learning Letter" },
      { label: "Letter Promotion", value: "Letter Promotion" },
      { label: "Protection", value: "Protection" },
      { label: "Digital Cloud", value: "Digital Cloud" },
      { label: "Open Spatial", value: "Open Spatial" },
      { label: "Evaluation Manager", value: "Evaluation Manager" },
      { label: "Analysis And Name", value: "Analysis And Name" },
      { label: "Form Manager", value: "Form Manager" },
      { label: "Computer Manager", value: "Computer Manager" },
      { label: "Vision Management", value: "Vision Management" },
      { label: "Asset Management", value: "Asset Management" },
      { label: "Building Management", value: "Building Management" },
      { label: "Appointments", value: "Appointments" },
      { label: "My choice Model", value: "My choice Model" },
    ],
  },
  { label: "Created At", value: "createdAt", type: "date" },
];

// ---------- drag handle ----------
function DragHandle({ id }: { id: number }) {
  const { attributes, listeners } = useSortable({ id });
  return (
    <Button
      {...attributes}
      {...listeners}
      variant="ghost"
      size="icon"
      className="text-muted-foreground size-7 hover:bg-transparent"
    >
      <IconGripVertical className="text-muted-foreground size-3" />
      <span className="sr-only">Drag to reorder</span>
    </Button>
  );
}

// ---------- Category Badge ----------
function CategoryBadge({ category }: { category: string }) {
  const getVariant = () => {
    switch (category) {
      case "Critical":
        return "destructive";
      case "High":
        return "default";
      case "Medium":
        return "secondary";
      case "Low":
        return "outline";
      default:
        return "outline";
    }
  };

  return (
    <Badge variant={getVariant()} size={"md"} className="text-base font-medium">
      <IconCategory className="h-3 w-3 mr-1" />
      {category}
    </Badge>
  );
}

// ---------- Filter Row ----------
function FilterRow({
  filter,
  onChange,
  onRemove,
}: {
  filter: Filter;
  onChange: <T extends FilterFieldType>(type: T, value: Filter[T]) => void;
  onRemove: () => void;
}) {
  const fieldConfig = filterFields.find((f) => f.value === filter.field);
  const operatorConfig = filterOperators.find(
    (op) => op.value === filter.operator
  );

  return (
    <div className="flex items-end gap-2 p-3 border rounded-md bg-muted/20">
      <div className="grid gap-2 flex-1">
        <Label className="text-base">Field</Label>
        <Select
          value={filter.field}
          onValueChange={(val) => onChange("field", val)}
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select field" />
          </SelectTrigger>
          <SelectContent>
            {filterFields.map((field) => (
              <SelectItem key={field.value} value={field.value}>
                {field.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="grid gap-2 flex-1">
        <Label className="text-base">Operator</Label>
        <Select
          value={filter.operator}
          onValueChange={(val) => onChange("operator", val)}
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select operator" />
          </SelectTrigger>
          <SelectContent>
            {filterOperators.map((op) => (
              <SelectItem key={op.value} value={op.value}>
                {op.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {filter.operator &&
        !["isEmpty", "isNotEmpty"].includes(filter.operator) && (
          <div className="grid gap-2 flex-1">
            <Label className="text-base">Value</Label>

            {fieldConfig?.type === "date" ? (
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className="w-full justify-start text-left font-normal"
                  >
                    {filter.value &&
                    typeof filter.value === "object" &&
                    "from" in filter.value ? (
                      filter.value.from ? (
                        filter.value.to ? (
                          `${format(
                            filter.value.from,
                            "dd/MM/yyyy"
                          )} - ${format(filter.value.to, "dd/MM/yyyy")}`
                        ) : (
                          format(filter.value.from, "dd/MM/yyyy")
                        )
                      ) : (
                        <span>Pick a date</span>
                      )
                    ) : (
                      <span>Pick a date</span>
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="range"
                    selected={filter.value as DateRange | undefined}
                    onSelect={(range) => onChange("value", range as DateRange)}
                    numberOfMonths={2}
                  />
                </PopoverContent>
              </Popover>
            ) : operatorConfig?.type === "select" ||
              fieldConfig?.type === "select" ? (
              <Select
                value={(filter.value as string) || ""}
                onValueChange={(val) => onChange("value", val)}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select value" />
                </SelectTrigger>
                <SelectContent>
                  {fieldConfig?.options?.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            ) : (
              <Input
                placeholder="Enter value"
                value={(filter.value as string) ?? ""}
                onChange={(e) => onChange("value", e.target.value)}
                className="w-full"
              />
            )}
          </div>
        )}

      <Button
        variant="ghost"
        size="icon"
        className="text-muted-foreground hover:text-destructive mb-1"
        onClick={onRemove}
      >
        <IconX className="h-4 w-4" />
      </Button>
    </div>
  );
}

// ---------- advanced filter function ----------
const normalize = (v: unknown) =>
  String(v ?? "")
    .toLowerCase()
    .trim();

const applySingleRule = (cellValue: any, rule: any) => {
  if (rule?.__type === "quick") {
    const cv = normalize(cellValue);
    const q = normalize(rule.__quick);
    if (!q) return true;
    if (rule.__op === "equals") return cv === q;
    return cv.includes(q);
  }

  const op = String(rule?.operator ?? "").toLowerCase();
  const cv = cellValue == null ? "" : String(cellValue);
  const cvNorm = normalize(cv);

  switch (op) {
    case "equals":
      return cvNorm === normalize(rule.value);
    case "contains":
      return cvNorm.includes(normalize(rule.value));
    case "startswith":
      return cvNorm.startsWith(normalize(rule.value));
    case "endswith":
      return cvNorm.endsWith(normalize(rule.value));
    case "isempty":
      return cv.trim() === "";
    case "isnotempty":
      return cv.trim() !== "";
    case "isanyof": {
      const list =
        typeof rule.value === "string"
          ? rule.value
              .split(",")
              .map((s: string) => s.trim())
              .filter(Boolean)
          : Array.isArray(rule.value)
          ? rule.value
          : [];
      const set = new Set(list.map((x: any) => normalize(x)));
      return set.has(cvNorm);
    }
    default:
      return true;
  }
};

const hybridFilterFn: FilterFn<any> = (row, columnId, filterValue) => {
  const cellValue = row.getValue(columnId);

  if (Array.isArray(filterValue)) {
    return filterValue.every((rule) => applySingleRule(cellValue, rule));
  }
  if (typeof filterValue === "object" && filterValue?.operator) {
    return applySingleRule(cellValue, filterValue);
  }

  if (typeof filterValue === "string") {
    return String(cellValue ?? "")
      .toLowerCase()
      .includes(filterValue.toLowerCase());
  }

  return true;
};

// ---------- columns ----------
const columns: ColumnDef<z.infer<typeof schema>>[] = [
  {
    id: "drag",
    header: () => null,
    cell: ({ row }) => <DragHandle id={row.original.id} />,
    enableSorting: false,
    enableHiding: false,
  },
  {
    id: "select",
    header: ({ table }) => (
      <div className="flex items-center justify-center">
        <Checkbox
          checked={
            table.getIsAllPageRowsSelected() ||
            (table.getIsSomePageRowsSelected() && "indeterminate")
          }
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
          aria-label="Select all"
        />
      </div>
    ),
    cell: ({ row }) => (
      <div className="flex items-center justify-center">
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          aria-label="Select row"
        />
      </div>
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "id",
    header: "Ticket ID",
    cell: ({ row }) => (
      <div className="font-mono text-base text-muted-foreground">
        #{row.original.id}
      </div>
    ),
    filterFn: hybridFilterFn,
  },
  {
    accessorKey: "fullName",
    header: "Requester",
    cell: ({ row }) => (
      <div className="flex items-center gap-2">
        <IconUser className="h-6 w-6 text-muted-foreground" />
        <span className="text-lg font-medium">{row.original.fullName}</span>
      </div>
    ),
    filterFn: hybridFilterFn,
    enableHiding: false,
  },
  {
    accessorKey: "email",
    header: "Email",
    cell: ({ row }) => (
      <div className="text-lg text-muted-foreground">{row.original.email}</div>
    ),
    filterFn: hybridFilterFn,
  },
  {
    accessorKey: "phoneNumber",
    header: "Phone",
    cell: ({ row }) => (
      <div className="text-lg text-muted-foreground">
        {row.original.phoneNumber || "-"}
      </div>
    ),
    filterFn: hybridFilterFn,
  },
  {
    accessorKey: "dueDate",
    header: "Due Date",
    cell: ({ row }) => (
      <div className="flex items-center gap-2 text-lg text-muted-foreground">
        <IconClock className="h-6 w-6" />
        {row.original.dueDate
          ? format(new Date(row.original.dueDate), "MMM dd, yyyy")
          : "-"}
      </div>
    ),
    filterFn: hybridFilterFn,
  },
  {
    accessorKey: "category",
    header: "Category",
    cell: ({ row }) => <CategoryBadge category={row.original.category} />,
    filterFn: hybridFilterFn,
  },
  {
    accessorKey: "createdAt",
    header: "Created At",
    cell: ({ row }) => (
      <div className="flex items-center gap-2 text-lg text-muted-foreground">
        <IconClock className="h-6 w-6" />
        {format(new Date(row.original.createdAt), "MMM dd, yyyy")}
      </div>
    ),
    filterFn: hybridFilterFn,
  },
  {
    id: "actions",
    cell: ({ row }) => (
      <div className="flex items-center gap-2">
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8"
          onClick={() => {
            toast.info(`Viewing ticket #${row.original.id}`);
          }}
        >
          <IconEye className="h-4 w-4" />
          <span className="sr-only">View ticket</span>
        </Button>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              className="data-[state=open]:bg-muted text-muted-foreground flex size-8"
              size="icon"
            >
              <IconDotsVertical />
              <span className="sr-only">Open menu</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-32">
            <DropdownMenuItem>Edit</DropdownMenuItem>
            <DropdownMenuItem>Assign</DropdownMenuItem>
            <DropdownMenuItem>Close</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem variant="destructive">Delete</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    ),
  },
];

// ---------- draggable row ----------
function DraggableRow({ row }: { row: Row<z.infer<typeof schema>> }) {
  const { transform, transition, setNodeRef, isDragging } = useSortable({
    id: row.original.id,
  });

  return (
    <TableRow
      data-state={row.getIsSelected() && "selected"}
      data-dragging={isDragging}
      ref={setNodeRef}
      className="relative z-0 data-[dragging=true]:z-10 data-[dragging=true]:opacity-80"
      style={{
        transform: CSS.Transform.toString(transform),
        transition: transition,
      }}
    >
      {row.getVisibleCells().map((cell) => (
        <TableCell key={cell.id}>
          {flexRender(cell.column.columnDef.cell, cell.getContext())}
        </TableCell>
      ))}
    </TableRow>
  );
}

// ---------- Filter Popover Component ----------
function FilterPopover({
  globalFilters,
  updateGlobalFilter,
  removeGlobalFilter,
  addGlobalFilter,
  applyGlobalFilters,
  clearGlobalFilters,
}: {
  globalFilters: Filter[];
  updateGlobalFilter: <T extends FilterFieldType>(
    index: number,
    type: T,
    val: Filter[T]
  ) => void;
  removeGlobalFilter: (index: number) => void;
  addGlobalFilter: () => void;
  applyGlobalFilters: () => void;
  clearGlobalFilters: () => void;
}) {
  return (
    <div className="p-4 w-[800px] max-w-full">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold">Advanced Filters</h3>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={addGlobalFilter}>
            <IconPlus className="h-4 w-4 mr-1" />
            Add Filter
          </Button>
          <Button variant="outline" size="sm" onClick={clearGlobalFilters}>
            <IconX className="h-4 w-4 mr-1" />
            Clear All
          </Button>
          <Button size="sm" onClick={applyGlobalFilters}>
            Apply Filters
          </Button>
        </div>
      </div>

      {globalFilters.length === 0 ? (
        <div className="text-center text-muted-foreground py-4">
          No filters applied. Add a filter to narrow down your results.
        </div>
      ) : (
        <div className="space-y-2">
          {globalFilters.map((filter, i) => (
            <FilterRow
              key={i}
              filter={filter}
              onChange={(type, val) => updateGlobalFilter(i, type, val)}
              onRemove={() => removeGlobalFilter(i)}
            />
          ))}
        </div>
      )}
    </div>
  );
}

// ------||---- main component ----------

export function DataTable({
  data: initialData,
}: {
  data: z.infer<typeof schema>[];
}) {
  const [data, setData] = React.useState(() => initialData);
  const [rowSelection, setRowSelection] = React.useState({});
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [globalFilters, setGlobalFilters] = React.useState<Filter[]>([]);
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [pagination, setPagination] = React.useState({
    pageIndex: 0,
    pageSize: 10,
  });

  const sortableId = React.useId();
  const sensors = useSensors(
    useSensor(MouseSensor, {}),
    useSensor(TouchSensor, {}),
    useSensor(KeyboardSensor, {})
  );

  const dataIds = React.useMemo<UniqueIdentifier[]>(
    () => data?.map(({ id }) => id) || [],
    [data]
  );

  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
      columnVisibility,
      rowSelection,
      columnFilters,
      pagination,
    },
    getRowId: (row) => row.id.toString(),
    enableRowSelection: true,
    onRowSelectionChange: setRowSelection,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    onPaginationChange: setPagination,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
  });

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;
    if (active && over && active.id !== over.id) {
      setData((d) => {
        const oldIndex = dataIds.indexOf(active.id);
        const newIndex = dataIds.indexOf(over.id);
        return arrayMove(d, oldIndex, newIndex);
      });
    }
  }

  // ----- advanced filters helpers -----
  const updateGlobalFilter = <T extends FilterFieldType>(
    index: number,
    type: T,
    val: Filter[T]
  ) => {
    const next = [...globalFilters];
    next[index] = { ...next[index], [type]: val };
    setGlobalFilters(next);
  };

  const removeGlobalFilter = (index: number) => {
    setGlobalFilters(globalFilters.filter((_, i) => i !== index));
  };

  const addGlobalFilter = () => {
    setGlobalFilters((prev) => [
      ...prev,
      { field: "", operator: "", value: "" },
    ]);
  };

  const clearGlobalFilters = () => {
    setGlobalFilters([]);
    setColumnFilters([]);
  };

  const applyGlobalFilters = () => {
    const grouped: Record<string, any[]> = {};
    for (const f of globalFilters) {
      if (!f.field || !f.operator) continue;
      if (
        !["isEmpty", "isNotEmpty"].includes(f.operator) &&
        (f.value == null || f.value === "")
      ) {
        continue;
      }
      if (!grouped[f.field]) grouped[f.field] = [];
      grouped[f.field].push({ operator: f.operator, value: f.value });
    }

    const next: ColumnFiltersState = Object.entries(grouped).map(
      ([field, rules]) => ({
        id: field,
        value: rules,
      })
    );

    setColumnFilters(next);
  };

  return (
    <Tabs
      defaultValue="tickets"
      className="w-full flex-col justify-start gap-6 text-base"
    >
      <div className="flex items-center justify-between px-4 lg:px-6">
        <Label htmlFor="view-selector" className="sr-only">
          View
        </Label>
        <Select
          defaultValue=""
          onValueChange={(sortValue) => {
            if (sortValue === "default") {
              table.setSorting([]);
              return;
            }
            const [columnId, direction] = sortValue.split(":");
            table.setSorting([{ id: columnId, desc: direction === "desc" }]);
          }}
        >
          <SelectTrigger
            className="flex w-fit @4xl/main:hidden"
            size="default"
            id="sort-selector"
          >
            <SelectValue placeholder="Sort by..." />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="default">Default</SelectItem>
            <SelectItem value="id:desc">Newest First</SelectItem>
            <SelectItem value="id:asc">Oldest First</SelectItem>
            <SelectItem value="fullName:asc">Requester (A → Z)</SelectItem>
            <SelectItem value="fullName:desc">Requester (Z → A)</SelectItem>
            <SelectItem value="dueDate:asc">Due Date (Soonest)</SelectItem>
            <SelectItem value="dueDate:desc">Due Date (Latest)</SelectItem>
            <SelectItem value="category:asc">Category (A → Z)</SelectItem>
            <SelectItem value="category:desc">Category (Z → A)</SelectItem>
          </SelectContent>
        </Select>

        <TabsList className="hidden @4xl/main:flex">
          <TabsTrigger value="tickets">All Tickets</TabsTrigger>
          <TabsTrigger value="recent">
            Recent
            <Badge variant="secondary" className="ml-2">
              {
                data.filter(
                  (t) =>
                    new Date(t.createdAt) >
                    new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
                ).length
              }
            </Badge>
          </TabsTrigger>
          <TabsTrigger value="due-soon">
            Due Soon
            <Badge variant="secondary" className="ml-2">
              {
                data.filter(
                  (t) =>
                    t.dueDate &&
                    new Date(t.dueDate) > new Date() &&
                    new Date(t.dueDate) <
                      new Date(Date.now() + 3 * 24 * 60 * 60 * 1000)
                ).length
              }
            </Badge>
          </TabsTrigger>
        </TabsList>

        <div className="flex items-center gap-2">
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" size="lg">
                <IconFilter />
                <span className="hidden lg:inline">Filters</span>
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="end">
              <FilterPopover
                globalFilters={globalFilters}
                updateGlobalFilter={updateGlobalFilter}
                removeGlobalFilter={removeGlobalFilter}
                addGlobalFilter={addGlobalFilter}
                applyGlobalFilters={applyGlobalFilters}
                clearGlobalFilters={clearGlobalFilters}
              />
            </PopoverContent>
          </Popover>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="lg">
                <IconLayoutColumns />
                <span className="hidden lg:inline">Customize Columns</span>
                <span className="lg:hidden">Columns</span>
                <IconChevronDown />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              {table
                .getAllColumns()
                .filter(
                  (column) =>
                    typeof column.accessorFn !== "undefined" &&
                    column.getCanHide()
                )
                .map((column) => {
                  return (
                    <DropdownMenuCheckboxItem
                      key={column.id}
                      className="capitalize"
                      checked={column.getIsVisible()}
                      onCheckedChange={(value) =>
                        column.toggleVisibility(!!value)
                      }
                    >
                      {column.id}
                    </DropdownMenuCheckboxItem>
                  );
                })}
            </DropdownMenuContent>
          </DropdownMenu>

          <Button size="lg" asChild>
            <Link href="/dashboard/tickets/new">
              <IconPlus />
              <span className="hidden lg:inline">New Ticket</span>
            </Link>
          </Button>
        </div>
      </div>

      <TabsContent
        value="tickets"
        className="relative flex flex-col gap-4 overflow-auto px-4 lg:px-6 "
      >
        <div className="overflow-hidden rounded-lg border">
          <DndContext
            collisionDetection={closestCenter}
            modifiers={[restrictToVerticalAxis]}
            onDragEnd={handleDragEnd}
            sensors={sensors}
            id={sortableId}
          >
            <Table>
              <TableHeader className="bg-muted sticky top-0 z-10">
                {table.getHeaderGroups().map((headerGroup) => (
                  <TableRow key={headerGroup.id}>
                    {headerGroup.headers.map((header) => (
                      <TableHead key={header.id} colSpan={header.colSpan}>
                        {header.isPlaceholder
                          ? null
                          : flexRender(
                              header.column.columnDef.header,
                              header.getContext()
                            )}
                      </TableHead>
                    ))}
                  </TableRow>
                ))}

                <TableRow className="bg-muted/30 [&>th]:py-3">
                  {table.getVisibleFlatColumns().map((column) => (
                    <TableHead key={column.id}>
                      {column.getCanFilter() ? (
                        <Input
                          placeholder={`Filter ${column.id}...`}
                          value={(column.getFilterValue() as string) ?? ""}
                          onChange={(e) =>
                            column.setFilterValue(e.target.value)
                          }
                          className="pl-5 h-8 w-full"
                        />
                      ) : null}
                    </TableHead>
                  ))}
                </TableRow>
              </TableHeader>

              <TableBody className="[&_td]:py-4">
                {table.getRowModel().rows?.length ? (
                  <SortableContext
                    items={dataIds}
                    strategy={verticalListSortingStrategy}
                  >
                    {table.getRowModel().rows.map((row) => (
                      <DraggableRow key={row.id} row={row} />
                    ))}
                  </SortableContext>
                ) : (
                  <TableRow>
                    <TableCell
                      colSpan={columns.length}
                      className="h-24 text-center "
                    >
                      No tickets found.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </DndContext>
        </div>

        <div className="flex items-center justify-between px-4">
          <div className="text-muted-foreground hidden flex-1 text-base lg:flex">
            {table.getFilteredSelectedRowModel().rows.length} of{" "}
            {table.getFilteredRowModel().rows.length} ticket(s) selected.
          </div>
          <div className="flex w-full items-center gap-8 lg:w-fit">
            <div className="hidden items-center gap-2 lg:flex">
              <Label htmlFor="rows-per-page" className="text-base font-medium">
                Rows per page
              </Label>
              <Select
                value={`${table.getState().pagination.pageSize}`}
                onValueChange={(value) => {
                  table.setPageSize(Number(value));
                }}
              >
                <SelectTrigger size="sm" className="w-20" id="rows-per-page">
                  <SelectValue
                    placeholder={table.getState().pagination.pageSize}
                  />
                </SelectTrigger>
                <SelectContent side="top">
                  {[10, 20, 30, 40, 50].map((pageSize) => (
                    <SelectItem key={pageSize} value={`${pageSize}`}>
                      {pageSize}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="flex w-fit items-center justify-center text-base font-medium">
              Page {table.getState().pagination.pageIndex + 1} of{" "}
              {table.getPageCount()}
            </div>
            <div className="ml-auto flex items-center gap-2 lg:ml-0">
              <Button
                variant="outline"
                className="hidden h-8 w-8 p-0 lg:flex"
                onClick={() => table.setPageIndex(0)}
                disabled={!table.getCanPreviousPage()}
              >
                <span className="sr-only">Go to first page</span>
                <IconChevronsLeft />
              </Button>
              <Button
                variant="outline"
                className="size-8"
                size="icon"
                onClick={() => table.previousPage()}
                disabled={!table.getCanPreviousPage()}
              >
                <span className="sr-only">Go to previous page</span>
                <IconChevronLeft />
              </Button>
              <Button
                variant="outline"
                className="size-8"
                size="icon"
                onClick={() => table.nextPage()}
                disabled={!table.getCanNextPage()}
              >
                <span className="sr-only">Go to next page</span>
                <IconChevronRight />
              </Button>
              <Button
                variant="outline"
                className="hidden size-8 lg:flex"
                size="icon"
                onClick={() => table.setPageIndex(table.getPageCount() - 1)}
                disabled={!table.getCanNextPage()}
              >
                <span className="sr-only">Go to last page</span>
                <IconChevronsRight />
              </Button>
            </div>
          </div>
        </div>
      </TabsContent>

      <TabsContent value="recent" className="flex flex-col px-4 lg:px-6">
        <div className="aspect-video w-full flex-1 rounded-lg border border-dashed flex items-center justify-center">
          <div className="text-muted-foreground text-center">
            <IconClock className="h-12 w-12 mx-auto mb-4" />
            <p>Recent tickets view</p>
            <p className="text-sm">
              Showing{" "}
              {
                data.filter(
                  (t) =>
                    new Date(t.createdAt) >
                    new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
                ).length
              }{" "}
              recent tickets
            </p>
          </div>
        </div>
      </TabsContent>

      <TabsContent value="due-soon" className="flex flex-col px-4 lg:px-6">
        <div className="aspect-video w-full flex-1 rounded-lg border border-dashed flex items-center justify-center">
          <div className="text-muted-foreground text-center">
            <IconAlertTriangle className="h-12 w-12 mx-auto mb-4" />
            <p>Due Soon tickets view</p>
            <p className="text-sm">
              Showing{" "}
              {
                data.filter(
                  (t) =>
                    t.dueDate &&
                    new Date(t.dueDate) > new Date() &&
                    new Date(t.dueDate) <
                      new Date(Date.now() + 3 * 24 * 60 * 60 * 1000)
                ).length
              }{" "}
              due soon tickets
            </p>
          </div>
        </div>
      </TabsContent>
    </Tabs>
  );
}
