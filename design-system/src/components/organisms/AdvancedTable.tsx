"use client";

import * as React from "react";
import { useState } from "react";

import {
  useReactTable,
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  flexRender,
  ColumnDef,
  SortingState,
  ColumnResizeMode,
  getPaginationRowModel,
  ColumnFiltersState,
} from "@tanstack/react-table";

import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "../molecules/Table"; 
import { Checkbox } from "../atoms/Checkbox";
import { Input } from "../atoms/Input";
import { Button } from "../atoms/Button";
import { Edit, Trash } from "lucide-react";

type Person = {
  id: number;
  name: string;
  email: string;
  role: string;
  status: "active" | "inactive";
};

export function AdvancedTable() {
  const [data, setData] = React.useState<Person[]>([
    {
      id: 1,
      name: "Admin",
      email: "Admin@example.com",
      role: "Admin",
      status: "active",
    },
    {
      id: 2,
      name: "Dagi",
      email: "dagi@example.com",
      role: "Editor",
      status: "inactive",
    },
    {
      id: 3,
      name: "Bekele",
      email: "bekele@example.com",
      role: "Support",
      status: "active",
    },
  ]);

  const [rowSelection, setRowSelection] = React.useState<
    Record<string, boolean>
  >({});
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnResizeMode] = React.useState<ColumnResizeMode>("onChange");
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);

  // Inline editing state
  const [editingRowId, setEditingRowId] = React.useState<number | null>(null);
  const [editedRow, setEditedRow] = React.useState<Partial<Person>>({});

  const columns = React.useMemo<ColumnDef<Person>[]>(
    () => [
      {
        id: "select",
        header: ({ table }) => (
          <Checkbox
            aria-label="Select all rows"
            checked={table.getIsAllPageRowsSelected()}
            onCheckedChange={(value) =>
              table.toggleAllPageRowsSelected(!!value)
            }
          />
        ),
        cell: ({ row }) => (
          <Checkbox
            aria-label={`Select row ${row.index}`}
            checked={row.getIsSelected()}
            onCheckedChange={(value) => row.toggleSelected(!!value)}
          />
        ),
        enableSorting: false,
        enableColumnFilter: false,
        size: 40,
        enableResizing: true,
      },
      {
        accessorKey: "id",
        header: "ID",
        size: 50,
        enableResizing: true,
      },
      {
        accessorKey: "name",
        header: "Name",
        cell: ({ row, getValue }) => {
          const isEditing = editingRowId === row.original.id;
          if (!isEditing) return <span>{getValue<string>()}</span>;

          return (
            <Input
              value={editedRow.name ?? ""}
              onChange={(e) =>
                setEditedRow((prev) => ({ ...prev, name: e.target.value }))
              }
            />
          );
        },
        enableResizing: true,
        enableSorting: true,
        enableColumnFilter: true,
        filterFn: "includesString",
      },
      {
        accessorKey: "email",
        header: "Email",
        cell: ({ row, getValue }) => {
          const isEditing = editingRowId === row.original.id;
          if (!isEditing) return <span>{getValue<string>()}</span>;

          return (
            <Input
              value={editedRow.email ?? ""}
              onChange={(e) =>
                setEditedRow((prev) => ({ ...prev, email: e.target.value }))
              }
            />
          );
        },
        enableResizing: true,
        enableSorting: true,
        enableColumnFilter: true,
        filterFn: "includesString",
      },
      {
        accessorKey: "role",
        header: "Role",
        cell: ({ row, getValue }) => {
          const isEditing = editingRowId === row.original.id;
          if (!isEditing) return <span>{getValue<string>()}</span>;

          return (
            <Input
              value={editedRow.role ?? ""}
              onChange={(e) =>
                setEditedRow((prev) => ({ ...prev, role: e.target.value }))
              }
            />
          );
        },
        enableResizing: true,
        enableSorting: true,
        enableColumnFilter: true,
        filterFn: "includesString",
      },
      {
        accessorKey: "status",
        header: "Status",
        cell: ({ row, getValue }) => {
          const isEditing = editingRowId === row.original.id;
          if (!isEditing)
            return (
              <span
                className={
                  getValue<string>() === "active"
                    ? "text-green-600 font-medium"
                    : "text-gray-500"
                }
              >
                {getValue<string>()}
              </span>
            );

          return (
            <select
              value={editedRow.status ?? ""}
              onChange={(e) =>
                setEditedRow((prev) => ({
                  ...prev,
                  status: e.target.value as Person["status"],
                }))
              }
              className="border rounded px-2 py-1 text-sm"
            >
              <option value="active">active</option>
              <option value="inactive">inactive</option>
            </select>
          );
        },
        enableResizing: true,
        enableSorting: true,
        enableColumnFilter: true,
        filterFn: "includesString",
      },
      {
        id: "actions",
        header: "Actions",
        cell: ({ row }) => {
          const isEditing = editingRowId === row.original.id;
          if (isEditing) {
            return (
              <>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => {
                    setEditingRowId(null);
                    setEditedRow({});
                  }}
                  className="mr-2"
                >
                  Cancel
                </Button>
                <Button
                  size="sm"
                  variant="default"
                  onClick={() => {
                    setData((old) =>
                      old.map((d) =>
                        d.id === row.original.id ? { ...d, ...editedRow } : d
                      )
                    );
                    setEditingRowId(null);
                    setEditedRow({});
                  }}
                >
                  Save
                </Button>
              </>
            );
          }

          return (
            <>
              <Button
                size="sm"
                variant="outline"
                onClick={() => {
                  setEditingRowId(row.original.id);
                  setEditedRow(row.original);
                }}
                className="mr-2"
              >
                <Edit></Edit>
              </Button>
              <Button
                size="sm"
                variant="destructive"
                onClick={() => {
                  setData((old) => old.filter((d) => d.id !== row.original.id));
                }}
              >
                <Trash></Trash>
              </Button>
            </>
          );
        },
        enableSorting: false,
        enableColumnFilter: false,
        size: 150,
        enableResizing: false,
      },
    ],
    [editingRowId, editedRow]
  );

  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
      rowSelection,
      columnFilters,
    },
    enableRowSelection: true,
    onRowSelectionChange: setRowSelection,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    columnResizeMode,
  });

  return (
    <div className="p-4 space-y-4">
      {/* Filters */}
      <div className="flex flex-wrap gap-5 mb-2">
        {table.getAllLeafColumns().map((column) => {
          if (!column.getCanFilter()) return null;
          return (
            <div key={column.id}>
              <input
                type="text"
                placeholder={`Filter ${column.columnDef.header as string}`}
                value={(column.getFilterValue() ?? "") as string}
                onChange={(e) => column.setFilterValue(e.target.value)}
                className="border rounded px-1 py-1 text-sm"
              />
            </div>
          );
        })}
      </div>

      {/* Table */}
      <Table>
        <TableHeader className="bg-gray-100">
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow className="" key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <TableHead
                  key={header.id}
                  colSpan={header.colSpan}
                  style={{ width: header.getSize() }}
                  {...{
                    onClick: header.column.getCanSort()
                      ? () => header.column.toggleSorting()
                      : undefined,
                    className: `cursor-pointer select-none ${
                      header.column.getIsSorted()
                        ? header.column.getIsSorted() === "asc"
                          ? "bg-blue-100"
                          : "bg-blue-200"
                        : ""
                    }`,
                  }}
                >
                  {flexRender(
                    header.column.columnDef.header,
                    header.getContext()
                  )}
                  {{
                    asc: " 🔼",
                    desc: " 🔽",
                  }[header.column.getIsSorted() as string] ?? null}

                  {/* Resizer */}
                  {header.column.getCanResize() && (
                    <div
                      onMouseDown={header.getResizeHandler()}
                      onTouchStart={header.getResizeHandler()}
                      className="resizer"
                      style={{
                        cursor: "col-resize",
                        userSelect: "none",
                        width: "5px",
                        height: "100%",
                        position: "absolute",
                        right: 0,
                        top: 0,
                        transform: "translateX(50%)",
                        zIndex: 1,
                      }}
                    />
                  )}
                </TableHead>
              ))}
            </TableRow>
          ))}
        </TableHeader>

        <TableBody>
          {table.getRowModel().rows.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow
                key={row.id}
                data-state={row.getIsSelected() && "selected"}
              >
                {row.getVisibleCells().map((cell) => (
                  <TableCell
                    className="px-4 py-2"
                    key={cell.id}
                    style={{ width: cell.column.getSize() }}
                  >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="text-center py-4">
                No results.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>

      {/* Pagination Controls */}
      <div className="flex items-center justify-between space-x-2">
        <Button
          size="sm"
          variant="outline"
          onClick={() => table.setPageIndex(0)}
          disabled={!table.getCanPreviousPage()}
        >
          {"<<"}
        </Button>
        <Button
          size="sm"
          variant="outline"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          {"<"}
        </Button>
        <Button
          size="sm"
          variant="outline"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          {">"}
        </Button>
        <Button
          size="sm"
          variant="outline"
          onClick={() => table.setPageIndex(table.getPageCount() - 1)}
          disabled={!table.getCanNextPage()}
        >
          {">>"}
        </Button>

        <span className="flex items-center gap-1">
          <div>Page</div>
          <strong>
            {table.getState().pagination.pageIndex + 1} of{" "}
            {table.getPageCount()}
          </strong>
        </span>

        <select
          value={table.getState().pagination.pageSize}
          onChange={(e) => {
            table.setPageSize(Number(e.target.value));
          }}
          className="border rounded p-1"
        >
          {[5, 10, 20, 30, 40, 50].map((pageSize) => (
            <option key={pageSize} value={pageSize}>
              Show {pageSize}
            </option>
          ))}
        </select>
      </div>

      <style>{`
        .resizer {
          display: inline-block;
          background: transparent;
        }
        .resizer:hover {
          background: #cbd5e1; /* Tailwind slate-300 */
        }
      `}</style>
    </div>
  );
}
