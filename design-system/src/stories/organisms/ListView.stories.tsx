/* eslint-disable @typescript-eslint/no-explicit-any */
import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Avatar, AvatarFallback, AvatarImage } from "../../components/atoms/Avatar";
import ListView from "../../components/organisms/ListView";
import * as React from "react";

type Row = {
  id: number;
  [key: string]: any;
};

type Column<T> = {
  label: string;
  key: keyof T & string;
  width?: number | string;
  getLabel?: (props: { row: T }) => string;
  prefix?: (props: { row: T }) => React.ReactNode;
};

type GroupedRow<T> = {
  group: string;
  collapsed: boolean;
  rows: T[];
};

const meta: Meta<typeof ListView<Row>> = {
  title: "Design-system/Components/Organisms/ListView",
  component: ListView,
  tags: ["autodocs"],
  argTypes: {
    className: { control: "text" },
    columns: { control: "object" },
    rows: { control: "object" },
    showFooter: { control: "boolean" },
  },
};

export default meta;
type Story = StoryObj<typeof ListView<Row>>;

const basicColumns: Column<Row>[] = [
  {
    label: "Name",
    key: "name",
    width: 200,
    getLabel: ({ row }) => row.name,
    prefix: () => (
      <Avatar>
        <AvatarImage src="https://github.com/shadcn.png" alt="shadcn" />
        <AvatarFallback>SC</AvatarFallback>
      </Avatar>
    ),
  },
  { label: "Email", key: "email", width: 200 },
  { label: "Role", key: "role", width: 150 },
  { label: "Status", key: "status", width: 100 },
];

const basicRows: Row[] = [
  { id: 1, name: "John Doe", email: "john@doe.com", status: "Active", role: "Developer" },
  { id: 2, name: "Jane Doe", email: "jane@doe.com", status: "Inactive", role: "HR" },
];

const groupedRows: GroupedRow<Row>[] = [
  {
    group: "Developer",
    collapsed: false,
    rows: [
      { id: 2, name: "Gary Fox", email: "gary@fox.com", status: "Inactive", role: "Developer" },
      { id: 6, name: "Emily Davis", email: "emily@davis.com", status: "Active", role: "Developer" },
    ],
  },
  {
    group: "Manager",
    collapsed: false,
    rows: [
      { id: 3, name: "John Doe", email: "john@doe.com", status: "Active", role: "Manager" },
      { id: 8, name: "Sarah Wilson", email: "sarah@wilson.com", status: "Active", role: "Manager" },
    ],
  },
];

export const Default: Story = {
  args: {
    className: "h-[150px]",
    columns: basicColumns,
    rows: basicRows,
  },
};

export const WithGroupedRows: Story = {
  args: {
    ...Default.args,
    className: "h-[300px]",
    columns: basicColumns.map((col) => ({ ...col, prefix: undefined })),
    rows: groupedRows,
  },
};

export const WideColumns: Story = {
  args: {
    ...Default.args,
    columns: basicColumns.map((col) => ({
      ...col,
      width: typeof col.width === "number" ? col.width * 2 : 400,
    })),
  },
};

export const NarrowColumns: Story = {
  args: {
    ...Default.args,
    columns: basicColumns.map((col) => ({
      ...col,
      width: typeof col.width === "number" ? col.width / 2 : 100,
    })),
  },
};

export const Empty: Story = {
  args: {
    ...Default.args,
    rows: [],
  },
};

export const WithFooter: Story = {
  args: {
    ...Default.args,
    showFooter: true,
  },
};
