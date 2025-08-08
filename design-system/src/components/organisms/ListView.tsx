import {
    Table,
    TableHeader,
    TableBody,
    TableRow,
    TableHead,
    TableCell,
    TableFooter,
  } from "../../components/atoms/Table";
  import * as React from "react";
  import { AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
  import { Button } from "../../components/atoms/Button";
  import { Checkbox } from "../../components/atoms/Checkbox";
  import { cn } from "@/lib/utils";
  
  interface Column {
    label: string;
    key: string;
    width?: number | string;
    getLabel?: ({ row }: { row: any }) => string;
    prefix?: ({ row }: { row: any }) => React.ReactNode;
  }
  
  interface Row {
    id: number;
    [key: string]: any;
  }
  
  interface GroupedRow {
    group: string;
    collapsed: boolean;
    rows: Row[];
  }
  
  interface TableProps {
    className?: string;
    columns: Column[];
    rows: Row[] | GroupedRow[];
    showFooter?: boolean;
  }
  
  const ListView: React.FC<TableProps> = ({
    className,
    columns,
    rows,
    showFooter = false,
  }) => {
    const [tableRows, setTableRows] = React.useState<Row[] | GroupedRow[]>(rows);
    const isEmpty = tableRows.length === 0;
    const isGrouped = Array.isArray(rows) && "group" in (rows[0] || {});
    const [selectedRows, setSelectedRows] = React.useState<Set<number>>(new Set());
    const [collapsedGroups, setCollapsedGroups] = React.useState<
      Record<string, boolean>
    >({});
    const [columnWidths, setColumnWidths] = React.useState<
      Record<string, number | string>
    >(() =>
      columns.reduce(
        (acc, col) => ({
          ...acc,
          [col.key]: col.width || "auto",
        }),
        {}
      )
    );
    const [isResizing, setIsResizing] = React.useState(false);
    const [resizeData, setResizeData] = React.useState({
      columnKey: "",
      startX: 0,
      startWidth: 0,
    });
  
    const handleResizeStart = (
      columnKey: string,
      e: React.MouseEvent<HTMLDivElement>
    ) => {
      setIsResizing(true);
      setResizeData({
        columnKey,
        startX: e.clientX,
        startWidth: typeof columnWidths[columnKey] === 'number' 
          ? columnWidths[columnKey] as number 
          : parseInt(columnWidths[columnKey] as string, 10) || 100,
      });
    };
  
    const handleResizeMove = (e: MouseEvent) => {
      if (!isResizing) return;
      
      const deltaX = e.clientX - resizeData.startX;
      const newWidth = Math.max(50, resizeData.startWidth + deltaX);
      
      setColumnWidths((prev) => ({
        ...prev,
        [resizeData.columnKey]: newWidth,
      }));
    };
  
    const handleResizeEnd = () => {
      setIsResizing(false);
    };
  
    React.useEffect(() => {
      if (isResizing) {
        window.addEventListener('mousemove', handleResizeMove);
        window.addEventListener('mouseup', handleResizeEnd);
      } else {
        window.removeEventListener('mousemove', handleResizeMove);
        window.removeEventListener('mouseup', handleResizeEnd);
      }
  
      return () => {
        window.removeEventListener('mousemove', handleResizeMove);
        window.removeEventListener('mouseup', handleResizeEnd);
      };
    }, [isResizing]);
  
    const toggleGroup = (group: string) => {
      setCollapsedGroups((prev) => ({
        ...prev,
        [group]: !prev[group],
      }));
    };
  
    const handleSelectAll = (checked: boolean) => {
      const newSelected = new Set<number>();
      if (checked) {
        const allRowIds = isGrouped
          ? (tableRows as GroupedRow[]).flatMap((group) =>
              group.rows.map((row) => row.id)
            )
          : (tableRows as Row[]).map((row) => row.id);
        allRowIds.forEach((id) => newSelected.add(id));
      }
      setSelectedRows(newSelected);
    };
  
    const handleSelectRow = (id: number, checked: boolean) => {
      setSelectedRows((prev) => {
        const newSelected = new Set(prev);
        if (checked) {
          newSelected.add(id);
        } else {
          newSelected.delete(id);
        }
        return newSelected;
      });
    };
  
    const handleAddRow = () => {
      const newRow: Row = {
        id: Math.max(0, ...(tableRows as Row[]).map((r) => r.id)) + 1,
        no: String((tableRows as Row[]).length + 1),
        name: "New User",
        email: "new@account.com",
        status: "Active",
        role: "User",
      };
      setTableRows((prev) =>
        isGrouped ? prev : [...(prev as Row[]), newRow]
      );
    };
  
    const handleDeleteSelected = () => {
      setTableRows((prev) =>
        isGrouped
          ? (prev as GroupedRow[]).map((group) => ({
              ...group,
              rows: group.rows.filter((row) => !selectedRows.has(row.id)),
            }))
          : (prev as Row[]).filter((row) => !selectedRows.has(row.id))
      );
      setSelectedRows(new Set());
    };
  
    return (
      <div className="relative rounded-xl shadow-sm bg-white">
        {isEmpty ? (
          <div className="flex flex-col items-center justify-center h-[150px] bg-gray-50 rounded-xl text-center p-6">
            <div className="text-gray-400 mb-4">
              <svg
                width="48"
                height="48"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                <path d="M3 9h18"></path>
                <path d="M9 9v10"></path>
              </svg>
            </div>
            <p className="text-gray-600 font-medium mb-3">No Data Available</p>
            <Button
              variant="outline"
              className="rounded-lg hover:bg-gray-100 transition-all duration-200 border-gray-300"
              onClick={() =>
                setTableRows([
                  {
                    id: 1,
                    name: "John Doe",
                    email: "john@doe.com",
                    status: "Active",
                    role: "Developer",
                  },
                ])
              }
            >
              Create the first item
            </Button>
          </div>
        ) : (
          <>
            <div className="overflow-hidden rounded-xl border border-gray-200">
              <Table className={cn("table-fixed", className)}>
                <TableHeader>
                  <TableRow className="bg-gray-200 h-12 hover:bg-gray-200 transition-colors duration-200">
                    <TableHead className="h-12 w-12 pl-4">
                      <Checkbox
                        checked={selectedRows.size === (isGrouped
                          ? (tableRows as GroupedRow[]).reduce(
                              (sum, group) => sum + group.rows.length,
                              0
                            )
                          : (tableRows as Row[]).length)}
                        onCheckedChange={handleSelectAll}
                        className="rounded border-gray-300"
                      />
                    </TableHead>
                    {columns.map((col) => (
                      <TableHead
                        key={col.key}
                        style={{ width: columnWidths[col.key], minWidth: 50 }}
                        className="h-12 relative group font-semibold text-gray-700 pl-4"
                      >
                        <div className="flex items-center justify-between">
                          {col.label}
                        </div>
                        <div
                          className="absolute right-0 top-0 h-full w-1 cursor-col-resize bg-transparent hover:bg-blue-500 active:bg-blue-600"
                          onMouseDown={(e) => handleResizeStart(col.key, e)}
                        />
                      </TableHead>
                    ))}
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {isGrouped
                    ? (tableRows as GroupedRow[])
                        .filter((group) => group.rows.length > 0)
                        .map((group) => (
                          <React.Fragment key={group.group}>
                            <TableRow
                              className="bg-gray-100 cursor-pointer hover:bg-gray-200 transition-colors duration-200 h-12"
                              onClick={() => toggleGroup(group.group)}
                            >
                              <TableCell
                                colSpan={columns.length + 1}
                                className="h-12 pl-4"
                              >
                                <div className="flex items-center gap-2">
                                 <div className="flex items-center gap-2">
                                    <span className="text-black font-medium ">
                                      {collapsedGroups[group.group] ? "▶" : "▼"}
                                    </span>
                                    <span className="font-semibold text-gray-700">{group.group}</span>
                                  </div>
                                </div>
                              </TableCell>
                            </TableRow>
                            {!collapsedGroups[group.group] &&
                              group.rows.map((row) => (
                                <TableRow 
                                  key={row.id} 
                                  className="h-12 hover:bg-gray-50 transition-colors duration-200"
                                >
                                  <TableCell className="h-12 w-12 pl-4">
                                    <Checkbox
                                      checked={selectedRows.has(row.id)}
                                      onCheckedChange={(checked) =>
                                        handleSelectRow(row.id, checked as boolean)
                                      }
                                      className="rounded border-gray-300"
                                    />
                                  </TableCell>
                                  {columns.map((col) => (
                                    <TableCell 
                                      key={`${row.id}-${col.key}`} 
                                      className="h-12 pl-4"
                                      style={{ width: columnWidths[col.key] }}
                                    >
                                      <div className="flex items-center gap-3">
                                        {col.prefix && col.prefix({ row })}
                                        <span className="text-gray-600">
                                          {col.getLabel
                                            ? col.getLabel({ row })
                                            : row[col.key] || "-"}
                                        </span>
                                      </div>
                                    </TableCell>
                                  ))}
                                </TableRow>
                              ))}
                          </React.Fragment>
                        ))
                    : (tableRows as Row[]).map((row) => (
                        <TableRow 
                          key={row.id} 
                          className="h-12 hover:bg-gray-50 transition-colors duration-200"
                        >
                          <TableCell className="h-12 w-12 pl-4">
                            <Checkbox
                              checked={selectedRows.has(row.id)}
                              onCheckedChange={(checked) =>
                                handleSelectRow(row.id, checked as boolean)
                              }
                              className="rounded border-gray-300"
                            />
                          </TableCell>
                          {columns.map((col) => (
                            <TableCell 
                              key={`${row.id}-${col.key}`} 
                              className="h-12 pl-4"
                              style={{ width: columnWidths[col.key] }}
                            >
                              <div className="flex items-center gap-3">
                                {col.prefix && col.prefix({ row })}
                                <span className="text-gray-600">
                                  {col.getLabel
                                    ? col.getLabel({ row })
                                    : row[col.key] || "-"}
                                </span>
                              </div>
                            </TableCell>
                          ))}
                        </TableRow>
                      ))}
                </TableBody>
                {showFooter && (
                  <TableFooter>
                    <TableRow className="h-12 bg-gray-100">
                      <TableCell
                        colSpan={columns.length + 1}
                        className="h-12 pl-4 font-semibold text-gray-700"
                      >
                        Total Rows: {isGrouped
                          ? (tableRows as GroupedRow[]).reduce(
                              (sum, group) => sum + group.rows.length,
                              0
                            )
                          : (tableRows as Row[]).length}
                      </TableCell>
                    </TableRow>
                  </TableFooter>
                )}
              </Table>
            </div>
            {selectedRows.size > 0 && (
              <div className="my-4 p-2 flex justify-start gap-3">
                <Button
                  variant="destructive"
                  onClick={handleDeleteSelected}
                  className="rounded-lg bg-red-600 hover:bg-red-700 text-white px-4 py-2 transition-all duration-200"
                >
                  Delete
                </Button>
                <Button
                  variant="outline"
                  onClick={handleAddRow}
                  className="rounded-lg border-gray-300 hover:bg-gray-100 text-gray-700 px-4 py-2 transition-all duration-200"
                >
                  Add Row
                </Button>
              </div>
            )}
          </>
        )}
      </div>
    );
  };
  
  export default ListView;