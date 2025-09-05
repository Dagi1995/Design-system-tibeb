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
  IconCircleCheckFilled,
  IconDotsVertical,
  IconGripVertical,
  IconLayoutColumns,
  IconLoader,
  IconPlus,
  IconTrendingUp,
  IconFilter,
  IconX,
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
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts";
import { toast } from "sonner";
import { z } from "zod";
import { format } from "date-fns";

import { useIsMobile } from "@/hooks/use-mobile";
import { Badge } from "../../atoms/Badge";
import { Button } from "../../atoms/Button";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "../../molecules/Chart";
import { Checkbox } from "../../atoms/Checkbox";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "../../molecules/drawer";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../../molecules/DropdownMenu";
import { Input } from "../../atoms/Input";
import { Label } from "../../atoms/Label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../atoms/Select";
import { Separator } from "../../atoms/Separator";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../atoms/Table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../atoms/Tabs";
import { Popover, PopoverContent, PopoverTrigger } from "../../atoms/Popover";
import { Calendar } from "../../molecules/Calendar";

export const schema = z.object({
  id: z.number(),
  header: z.string(),
  type: z.string(),
  status: z.string(),
  target: z.string(),
  limit: z.string(),
  reviewer: z.string(),
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

// operators (text/select focused; date UI is wired but optional)
const filterOperators: FilterOption[] = [
  { label: "Equals", value: "equals", type: "text" },
  { label: "Contains", value: "contains", type: "text" },
  { label: "Starts with", value: "startsWith", type: "text" },
  { label: "Ends with", value: "endsWith", type: "text" },
  { label: "Is empty", value: "isEmpty", type: "text" },
  { label: "Is not empty", value: "isNotEmpty", type: "text" },
  { label: "Is any of", value: "isAnyOf", type: "select" },
];

// available fields
const filterFields: FilterOption[] = [
  { label: "ID", value: "id", type: "text" },
  { label: "Header", value: "header", type: "text" },
  {
    label: "Type",
    value: "type",
    type: "select",
    options: [
      { label: "Table of Contents", value: "Table of Contents" },
      { label: "Executive Summary", value: "Executive Summary" },
      { label: "Technical Approach", value: "Technical Approach" },
      { label: "Design", value: "Design" },
      { label: "Capabilities", value: "Capabilities" },
      { label: "Focus Documents", value: "Focus Documents" },
      { label: "Narrative", value: "Narrative" },
      { label: "Cover Page", value: "Cover Page" },
    ],
  },
  {
    label: "Status",
    value: "status",
    type: "select",
    options: [
      { label: "Done", value: "Done" },
      { label: "In Progress", value: "In Progress" },
      { label: "Not Started", value: "Not Started" },
    ],
  },
  { label: "Target", value: "target", type: "text" },
  { label: "Limit", value: "limit", type: "text" },
  {
    label: "Reviewer",
    value: "reviewer",
    type: "select",
    options: [
      { label: "Eddie Lake", value: "Eddie Lake" },
      { label: "Jamik Tashpulatov", value: "Jamik Tashpulatov" },
      { label: "Emily Whalen", value: "Emily Whalen" },
    ],
  },
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

// ---------- Advanced Filters row ----------
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
              <Input
                placeholder="Comma-separated values"
                value={(filter.value as string) ?? ""}
                onChange={(e) => onChange("value", e.target.value)}
                className="w-full"
              />
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
  // quick filter (popover text field)
  if (rule?.__type === "quick") {
    const cv = normalize(cellValue);
    const q = normalize(rule.__quick);
    if (!q) return true;
    if (rule.__op === "equals") return cv === q;
    return cv.includes(q);
  }

  // advanced panel rules
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
      // unknown operator -> pass-through
      return true;
  }
};

// this filterFn accepts either a single rule or an array of rules for the column.
// If array, all rules must pass (AND).
const hybridFilterFn: FilterFn<any> = (row, columnId, filterValue) => {
  const cellValue = row.getValue(columnId);

  // Case 1: advanced rules (array or object)
  if (Array.isArray(filterValue)) {
    return filterValue.every((rule) => applySingleRule(cellValue, rule));
  }
  if (typeof filterValue === "object" && filterValue?.operator) {
    return applySingleRule(cellValue, filterValue);
  }

  // Case 2: simple text filter
  if (typeof filterValue === "string") {
    return String(cellValue ?? "")
      .toLowerCase()
      .includes(filterValue.toLowerCase());
  }

  // Default: show everything
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
    accessorKey: "header",
    header: "Header",
    cell: ({ row }) => <TableCellViewer item={row.original} />,
    filterFn: hybridFilterFn, // <-- inline text filter
    enableHiding: false,
  },
  {
    accessorKey: "type",
    header: "Section Type",
    cell: ({ row }) => (
      <div className="w-32">
        <Badge variant="outline" className="text-muted-foreground px-1.5">
          {row.original.type}
        </Badge>
      </div>
    ),
    filterFn: hybridFilterFn, // <-- inline filter works
  },

  {
    id: "status", // <-- add unique id here
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => (
      <Badge variant="outline" className="text-muted-foreground px-1.5">
        {row.original.status === "Done" ? (
          <IconCircleCheckFilled className="fill-green-500 dark:fill-green-400" />
        ) : (
          <IconLoader />
        )}
        {row.original.status}
      </Badge>
    ),
    filterFn: hybridFilterFn,
  },
  {
    accessorKey: "target",
    header: "Target",
    cell: ({ row }) => (
      <form
        onSubmit={(e) => {
          e.preventDefault();
          toast.promise(new Promise((resolve) => setTimeout(resolve, 1000)), {
            loading: `Saving ${row.original.header}`,
            success: "Done",
            error: "Error",
          });
        }}
      >
        <Label htmlFor={`${row.original.id}-target`} className="sr-only">
          Target
        </Label>
        <Input
          className="hover:bg-input/30 focus-visible:bg-background dark:hover:bg-input/30 dark:focus-visible:bg-input/30 h-8 w-16 border-transparent bg-transparent text-right shadow-none focus-visible:border dark:bg-transparent"
          defaultValue={row.original.target}
          id={`${row.original.id}-target`}
        />
      </form>
    ),
    filterFn: hybridFilterFn,
  },
  {
    accessorKey: "limit",
    header: "Limit",
    cell: ({ row }) => (
      <form
        onSubmit={(e) => {
          e.preventDefault();
          toast.promise(new Promise((resolve) => setTimeout(resolve, 1000)), {
            loading: `Saving ${row.original.header}`,
            success: "Done",
            error: "Error",
          });
        }}
      >
        <Label htmlFor={`${row.original.id}-limit`} className="sr-only">
          Limit
        </Label>
        <Input
          className="hover:bg-input/30 focus-visible:bg-background dark:hover:bg-input/30 dark:focus-visible:bg-input/30 h-8 w-16 border-transparent bg-transparent text-right shadow-none focus-visible:border dark:bg-transparent"
          defaultValue={row.original.limit}
          id={`${row.original.id}-limit`}
        />
      </form>
    ),
    filterFn: hybridFilterFn,
  },
  {
    accessorKey: "reviewer",
    header: "Reviewer",
    cell: ({ row }) => {
      const isAssigned = row.original.reviewer !== "Assign reviewer";

      if (isAssigned) {
        return row.original.reviewer;
      }

      return (
        <>
          <Label htmlFor={`${row.original.id}-reviewer`} className="sr-only">
            Reviewer
          </Label>
          <Select>
            <SelectTrigger
              className="w-38 **:data-[slot=select-value]:block **:data-[slot=select-value]:truncate"
              size="sm"
              id={`${row.original.id}-reviewer`}
            >
              <SelectValue placeholder="Assign reviewer" />
            </SelectTrigger>
            <SelectContent align="end">
              <SelectItem value="Eddie Lake">Eddie Lake</SelectItem>
              <SelectItem value="Jamik Tashpulatov">
                Jamik Tashpulatov
              </SelectItem>
              <SelectItem value="Emily Whalen">Emily Whalen</SelectItem>
            </SelectContent>
          </Select>
        </>
      );
    },
    filterFn: hybridFilterFn,
  },
  {
    id: "actions",
    cell: () => (
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
          <DropdownMenuItem>Make a copy</DropdownMenuItem>
          <DropdownMenuItem>Favorite</DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem variant="destructive">Delete</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
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

// ---------- main component ----------
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
  // ---------- simple text filter for inline inputs ----------

  // group advanced filters by field → array of rules per column
  const applyGlobalFilters = () => {
    const grouped: Record<string, any[]> = {};
    for (const f of globalFilters) {
      if (!f.field || !f.operator) continue;
      // for operators that need a value, ensure it exists
      if (
        !["isEmpty", "isNotEmpty"].includes(f.operator) &&
        (f.value == null || f.value === "")
      ) {
        continue;
      }
      if (!grouped[f.field]) grouped[f.field] = [];
      grouped[f.field].push({ operator: f.operator, value: f.value });
    }

    // convert to ColumnFiltersState
    const next: ColumnFiltersState = Object.entries(grouped).map(
      ([field, rules]) => ({
        id: field,
        value: rules, // array of rules; our filterFn expects this
      })
    );

    setColumnFilters(next);
  };

  return (
    <Tabs
      defaultValue="outline"
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
              table.setSorting([]); // Reset to default
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
            {" "}
            <SelectValue placeholder="Sort by..." />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="default">Default</SelectItem>
            <SelectItem value="header:asc">Header (A → Z)</SelectItem>
            <SelectItem value="header:desc">Header (Z → A)</SelectItem>
            <SelectItem value="status:asc">Status (Ascending)</SelectItem>
            <SelectItem value="status:desc">Status (Descending)</SelectItem>
            <SelectItem value="limit:asc">Limit (Lowest First)</SelectItem>
            <SelectItem value="limit:desc">Limit (Highest First)</SelectItem>
          </SelectContent>
        </Select>

        <TabsList className="**:data-[slot=badge]:bg-muted-foreground/30 hidden **:data-[slot=badge]:size-5 **:data-[slot=badge]:rounded-full **:data-[slot=badge]:px-1 @4xl/main:flex">
          <TabsTrigger value="outline">Outline</TabsTrigger>
          <TabsTrigger value="past-performance">
            Past Performance <Badge variant="secondary">3</Badge>
          </TabsTrigger>
          <TabsTrigger value="key-personnel">
            Key Personnel <Badge variant="secondary">2</Badge>
          </TabsTrigger>
          <TabsTrigger value="focus-documents">Focus Documents</TabsTrigger>
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

          <Button variant="outline" size="lg">
            <IconPlus />
            <span className="hidden lg:inline">Add Section</span>
          </Button>
        </div>
      </div>

      <TabsContent
        value="outline"
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
                {/* Column titles row */}
                {table.getHeaderGroups().map((headerGroup) => (
                  <TableRow key={headerGroup.id} >
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

                {/* Inline filter inputs row */}
                <TableRow className="bg-muted/30">
                  {table.getVisibleFlatColumns().map((column) => (
                    <TableHead key={column.id} >
                      {column.getCanFilter() ? (
                        <Input
                          placeholder={`Filter ${column.id}...`}
                          value={(column.getFilterValue() as string) ?? ""}
                          onChange={(e) =>
                            column.setFilterValue(e.target.value)
                          }
                          className="h-8 w-full"
                        />
                      ) : null}
                    </TableHead>
                  ))}
                </TableRow>
              </TableHeader>

              <TableBody className="**:data-[slot=table-cell]:first:w-8">
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
                      className="h-24 text-center"
                    >
                      No results.
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
            {table.getFilteredRowModel().rows.length} row(s) selected.
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

      <TabsContent
        value="past-performance"
        className="flex flex-col px-4 lg:px-6"
      >
        <div className="aspect-video w-full flex-1 rounded-lg border border-dashed"></div>
      </TabsContent>

      <TabsContent value="key-personnel" className="flex flex-col px-4 lg:px-6">
        <div className="aspect-video w-full flex-1 rounded-lg border border-dashed"></div>
      </TabsContent>

      <TabsContent
        value="focus-documents"
        className="flex flex-col px-4 lg:px-6"
      >
        <div className="aspect-video w-full flex-1 rounded-lg border border-dashed"></div>
      </TabsContent>
    </Tabs>
  );
}

// ---------- chart + drawer ----------
const chartData = [
  { month: "January", desktop: 186, mobile: 80 },
  { month: "February", desktop: 305, mobile: 200 },
  { month: "March", desktop: 237, mobile: 120 },
  { month: "April", desktop: 73, mobile: 190 },
  { month: "May", desktop: 209, mobile: 130 },
  { month: "June", desktop: 214, mobile: 140 },
];

const chartConfig = {
  desktop: {
    label: "Desktop",
    color: "var(--primary)",
  },
  mobile: {
    label: "Mobile",
    color: "var(--primary)",
  },
} satisfies ChartConfig;

function TableCellViewer({ item }: { item: z.infer<typeof schema> }) {
  const isMobile = useIsMobile();

  return (
    <Drawer direction={isMobile ? "bottom" : "right"}>
      <DrawerTrigger asChild>
        <Button
          variant="ghost"
          className="text-foreground w-fit px-0 text-left"
        >
          {item.header}
        </Button>
      </DrawerTrigger>
      <DrawerContent className="text-base">
        <DrawerHeader className="gap-1">
          <DrawerTitle>{item.header}</DrawerTitle>
          <DrawerDescription>
            Showing total visitors for the last 6 months
          </DrawerDescription>
        </DrawerHeader>
        <div className="flex flex-col gap-4 overflow-y-auto px-4 text-base">
          {!isMobile && (
            <>
              <ChartContainer config={chartConfig}>
                <AreaChart
                  accessibilityLayer
                  data={chartData}
                  margin={{ left: 0, right: 10 }}
                >
                  <CartesianGrid vertical={false} />
                  <XAxis
                    dataKey="month"
                    tickLine={false}
                    axisLine={false}
                    tickMargin={8}
                    tickFormatter={(value) => (value as string).slice(0, 3)}
                    hide
                  />
                  <ChartTooltip
                    cursor={false}
                    content={<ChartTooltipContent indicator="dot" />}
                  />
                  <Area
                    dataKey="mobile"
                    type="natural"
                    fill="var(--color-mobile)"
                    fillOpacity={0.6}
                    stroke="var(--color-mobile)"
                    stackId="a"
                  />
                  <Area
                    dataKey="desktop"
                    type="natural"
                    fill="var(--color-desktop)"
                    fillOpacity={0.4}
                    stroke="var(--color-desktop)"
                    stackId="a"
                  />
                </AreaChart>
              </ChartContainer>
              <Separator />
              <div className="grid gap-2">
                <div className="flex gap-2 leading-none font-medium">
                  Trending up by 5.2% this month{" "}
                  <IconTrendingUp className="size-4" />
                </div>
                <div className="text-muted-foreground">
                  Showing total visitors for the last 6 months. This is just
                  some random text to test the layout. It spans multiple lines
                  and should wrap around.
                </div>
              </div>
              <Separator />
            </>
          )}
          <form className="flex flex-col gap-4 text-base">
            <div className="flex flex-col gap-3">
              <Label htmlFor="header">Header</Label>
              <Input id="header" defaultValue={item.header} />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col gap-3">
                <Label htmlFor="type">Type</Label>
                <Select defaultValue={item.type}>
                  <SelectTrigger id="type" className="w-full">
                    <SelectValue placeholder="Select a type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Table of Contents">
                      Table of Contents
                    </SelectItem>
                    <SelectItem value="Executive Summary">
                      Executive Summary
                    </SelectItem>
                    <SelectItem value="Technical Approach">
                      Technical Approach
                    </SelectItem>
                    <SelectItem value="Design">Design</SelectItem>
                    <SelectItem value="Capabilities">Capabilities</SelectItem>
                    <SelectItem value="Focus Documents">
                      Focus Documents
                    </SelectItem>
                    <SelectItem value="Narrative">Narrative</SelectItem>
                    <SelectItem value="Cover Page">Cover Page</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex flex-col gap-3">
                <Label htmlFor="status">Status</Label>
                <Select defaultValue={item.status}>
                  <SelectTrigger id="status" className="w-full">
                    <SelectValue placeholder="Select a status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Done">Done</SelectItem>
                    <SelectItem value="In Progress">In Progress</SelectItem>
                    <SelectItem value="Not Started">Not Started</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col gap-3">
                <Label htmlFor="target">Target</Label>
                <Input id="target" defaultValue={item.target} />
              </div>
              <div className="flex flex-col gap-3">
                <Label htmlFor="limit">Limit</Label>
                <Input id="limit" defaultValue={item.limit} />
              </div>
            </div>
            <div className="flex flex-col gap-3">
              <Label htmlFor="reviewer">Reviewer</Label>
              <Select defaultValue={item.reviewer}>
                <SelectTrigger id="reviewer" className="w-full">
                  <SelectValue placeholder="Select a reviewer" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Eddie Lake">Eddie Lake</SelectItem>
                  <SelectItem value="Jamik Tashpulatov">
                    Jamik Tashpulatov
                  </SelectItem>
                  <SelectItem value="Emily Whalen">Emily Whalen</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </form>
        </div>
        <DrawerFooter>
          <Button>Submit</Button>
          <DrawerClose asChild>
            <Button variant="outline">Done</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
