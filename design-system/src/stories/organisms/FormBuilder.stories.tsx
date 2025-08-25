import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { FormBuilder } from '../../components/organisms/FormBuilder';
import { within, userEvent } from '@storybook/test';
import { expect } from '@storybook/test';

type FieldType = 'Text' | 'Number' | 'Date' | 'Select' | 'Option' | 'Checkbox' | 'Email' | 'Phone' | 'URL' | 'Custom';

interface FormField {
  id: string;
  name: string;
  label: string;
  type: FieldType;
  mandatory: boolean;
  readOnly: boolean;
  foreignKey?: string;
  defaultValue?: string;
  description?: string;
  isActive?: boolean;
}

const fieldTypes: { value: FieldType; label: string }[] = [
  { value: 'Text', label: 'Text' },
  { value: 'Number', label: 'Number' },
  { value: 'Date', label: 'Date' },
  { value: 'Select', label: 'Select' },
  { value: 'Option', label: 'Option'},
  { value: 'Checkbox', label: 'Checkbox' },
  { value: 'Email', label: 'Email' },
  { value: 'Phone', label: 'Phone' },
  { value: 'URL', label: 'URL' },
  { value: 'Custom', label: 'Custom' },
];

const defaultFields: FormField[] = [
  {
    id: '1',
    name: 'id',
    label: 'ID',
    type: 'Number',
    mandatory: true,
    readOnly: true,
    description: 'Unique identifier',
    isActive: false,
  },
  {
    id: '2',
    name: 'created_at',
    label: 'Created At',
    type: 'Date',
    mandatory: true,
    readOnly: true,
    description: 'Record creation timestamp',
    isActive: false,
  },
  {
    id: '3',
    name: 'updated_at',
    label: 'Updated At',
    type: 'Date',
    mandatory: true,
    readOnly: true,
    description: 'Record last update timestamp',
    isActive: false,
  },
];

const employeeTableFields: FormField[] = [
  {
    id: '1',
    name: 'employee_id',
    label: 'Employee ID',
    type: 'Number',
    mandatory: true,
    readOnly: true,
    description: 'Unique employee identifier',
    isActive: false,
  },
  {
    id: '2',
    name: 'first_name',
    label: 'First Name',
    type: 'Text',
    mandatory: true,
    readOnly: false,
    description: 'Employee first name',
    isActive: true,
  },
  {
    id: '3',
    name: 'last_name',
    label: 'Last Name',
    type: 'Text',
    mandatory: true,
    readOnly: false,
    description: 'Employee last name',
    isActive: true,
  },
  {
    id: '4',
    name: 'email',
    label: 'Email',
    type: 'Email',
    mandatory: true,
    readOnly: false,
    description: 'Employee email address',
    isActive: true,
  },
  {
    id: '5',
    name: 'hire_date',
    label: 'Hire Date',
    type: 'Date',
    mandatory: false,
    readOnly: false,
    description: 'Date of hiring',
    isActive: true,
  },
  {
    id: '6',
    name: 'department',
    label: 'Department',
    type: 'Select',
    mandatory: false,
    readOnly: false,
    description: 'Employee department',
    isActive: true,
  },
  {
    id: '7',
    name: 'is_active',
    label: 'Is Active',
    type: 'Checkbox',
    mandatory: false,
    readOnly: false,
    description: 'Employee status',
    isActive: true,
    defaultValue: 'true',
  },
];

const meta: Meta<typeof FormBuilder> = {
  title: 'Design-system/Components/Organisms/FormBuilder',
  component: FormBuilder,
  parameters: {
    layout: 'fullscreen',
    chromatic: { viewports: [1200] },
  },
  tags: ['autodocs'],
  args: {
    fieldTypes, // Default fieldTypes for all stories
  },
} satisfies Meta<typeof FormBuilder>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    initialFields: defaultFields,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    // Verify the main header elements are present
    await expect(canvas.getByText('Form Builder')).toBeInTheDocument();
    await expect(canvas.getByText('Preview')).toBeInTheDocument();
    await expect(canvas.getByText('Save')).toBeInTheDocument();
    
    // Verify the default fields are present
    await expect(canvas.getByText('ID')).toBeInTheDocument();
    await expect(canvas.getByText('Created At')).toBeInTheDocument();
    await expect(canvas.getByText('Updated At')).toBeInTheDocument();
    
    // Verify the add field button is present
    await expect(canvas.getByText('Add Field')).toBeInTheDocument();
  },
};

export const WithManyFields: Story = {
  args: {
    initialFields: [
      ...defaultFields,
      {
        id: '4',
        name: 'first_name',
        label: 'First Name',
        type: 'Text',
        mandatory: true,
        readOnly: false,
        description: 'Employee first name',
        isActive: true,
      },
      {
        id: '5',
        name: 'last_name',
        label: 'Last Name',
        type: 'Text',
        mandatory: true,
        readOnly: false,
        description: 'Employee last name',
        isActive: true,
      },
      {
        id: '6',
        name: 'email',
        label: 'Email',
        type: 'Email',
        mandatory: true,
        readOnly: false,
        description: 'Employee email address',
        isActive: true,
      },
    ],
  },
  parameters: {
    chromatic: { disableSnapshot: false },
  },
};

export const WithFieldSelected: Story = {
  args: {
    initialFields: defaultFields,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    
    // Click on the first field to select it
    const firstField = canvas.getByText('ID');
    await userEvent.click(firstField);
    
    // Verify the properties panel is shown
    await expect(canvas.getByText('Field Properties')).toBeInTheDocument();
  },
};

export const WithSearch: Story = {
  args: {
    initialFields: defaultFields,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    
    // Type in the search
    const searchInput = canvas.getByPlaceholderText('Search fields...');
    await userEvent.type(searchInput, 'created');
    
    // Verify search results
    await expect(canvas.getByText('Created At')).toBeInTheDocument();
    await expect(canvas.queryByText('ID')).not.toBeInTheDocument();
  },
  parameters: {
    chromatic: { disableSnapshot: true },
  },
};

export const EmployeeTable: Story = {
  args: {
    initialFields: employeeTableFields,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    // Verify the employee fields are present
    await expect(canvas.getByText('Employee ID')).toBeInTheDocument();
    await expect(canvas.getByText('First Name')).toBeInTheDocument();
    await expect(canvas.getByText('Last Name')).toBeInTheDocument();
    await expect(canvas.getByText('Email')).toBeInTheDocument();
    await expect(canvas.getByText('Hire Date')).toBeInTheDocument();
    await expect(canvas.getByText('Department')).toBeInTheDocument();
    await expect(canvas.getByText('Is Active')).toBeInTheDocument();
  },
};