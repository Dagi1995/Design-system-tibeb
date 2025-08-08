import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Avatar } from "../../components/atoms/Avatar";
import ListView from "../../components/organisms/ListView";
import * as React from "react";
import { AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { Button } from "../../components/atoms/Button";

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

const meta: Meta<typeof ListView> = {
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

type Story = StoryObj<typeof ListView>;

const basicColumns: Column[] = [
  {
    label: "Name",
    key: "name",
    width: 200,
    getLabel: ({ row }) => row.name,
    prefix: ({ row }) => (
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
  {
    id: 1,
    name: "John Doe",
    email: "john@doe.com",
    status: "Active",
    role: "Developer",
    user_image: "https://avatars.githubusercontent.com/u/499550",
  },
  {
    id: 2,
    name: "Jane Doe",
    email: "jane@doe.com",
    status: "Inactive",
    role: "HR",
    user_image: "https://avatars.githubusercontent.com/u/499120",
  },
];

const groupedRows: GroupedRow[] = [
  {
    group: "Developer",
    collapsed: false,
    rows: [
      {
        id: 2,
        name: "Gary Fox",
        email: "gary@fox.com",
        status: "Inactive",
        role: "Developer",
      },
      {
        id: 6,
        name: "Emily Davis",
        email: "emily@davis.com",
        status: "Active",
        role: "Developer",
      },
      {
        id: 9,
        name: "David Lee",
        email: "david@lee.com",
        status: "Inactive",
        role: "Developer",
      },
    ],
  },
  {
    group: "Manager",
    collapsed: false,
    rows: [
      {
        id: 3,
        name: "John Doe",
        email: "john@doe.com",
        status: "Active",
        role: "Manager",
      },
      {
        id: 8,
        name: "Sarah Wilson",
        email: "sarah@wilson.com",
        status: "Active",
        role: "Manager",
      },
    ],
  },
  {
    group: "Designer",
    collapsed: false,
    rows: [
      {
        id: 4,
        name: "Alice Smith",
        email: "alice@smith.com",
        status: "Active",
        role: "Designer",
      },
      {
        id: 10,
        name: "Olivia Taylor",
        email: "olivia@taylor.com",
        status: "Active",
        role: "Designer",
      },
    ],
  },
  {
    group: "HR",
    collapsed: false,
    rows: [
      {
        id: 1,
        name: "Jane Mary",
        email: "jane@doe.com",
        status: "Inactive",
        role: "HR",
      },
      {
        id: 7,
        name: "Michael Brown",
        email: "michael@brown.com",
        status: "Inactive",
        role: "HR",
      },
      {
        id: 12,
        name: "Sophia Martinez",
        email: "sophia@martinez.com",
        status: "Active",
        role: "HR",
      },
    ],
  },
  {
    group: "Tester",
    collapsed: false,
    rows: [
      {
        id: 5,
        name: "Bob Johnson",
        email: "bob@johnson.com",
        status: "Inactive",
        role: "Tester",
      },
      {
        id: 11,
        name: "James Anderson",
        email: "james@anderson.com",
        status: "Inactive",
        role: "Tester",
      },
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
    className: "h-[300px]",
    columns: basicColumns.map((col) => ({
      ...col,
      prefix: undefined,
    })),
    rows: groupedRows,
  },
};

export const WideColumns: Story = {
  args: {
    className: "h-[150px]",
    columns: basicColumns.map((col) => ({
      ...col,
      width: typeof col.width === 'number' ? col.width * 2 : 400,
    })),
    rows: basicRows,
  },
};

export const NarrowColumns: Story = {
  args: {
    className: "h-[150px]",
    columns: basicColumns.map((col) => ({
      ...col,
      width: typeof col.width === 'number' ? col.width / 2 : 100,
    })),
    rows: basicRows,
  },
};

export const Empty: Story = {
  args: {
    className: "h-[150px]",
    columns: basicColumns,
    rows: [],
  },
};

export const WithFooter: Story = {
  args: {
    className: "h-[150px]",
    columns: basicColumns,
    rows: basicRows,
    showFooter: true,
  },
};