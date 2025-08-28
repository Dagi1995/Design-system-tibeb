"use client";
import { Preview } from "@/components/Preview";
import { Table } from "@/design-system/src/components/molecules/Table";

export default function DocPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6">
      <div className="w-full space-y-6">
        <Preview title={"Table"} sourcePath={"design-system/src/components/molecules/Table.tsx"}>
          <Table />
        </Preview>
      </div>
    </div>
  );
}
