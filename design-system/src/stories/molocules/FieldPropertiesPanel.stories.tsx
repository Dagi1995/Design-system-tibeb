import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { FieldPropertiesPanel } from '../../components/molocules/FieldPropertiesPanel';
import { within } from '@storybook/test';
import { expect } from '@storybook/test';

type InputType = 'text' | 'select' | 'number' | 'checkbox' | 'textarea';

const meta: Meta<typeof FieldPropertiesPanel> = {
  title: 'Design-system/Components/Molecules/FieldPropertiesPanel',
  component: FieldPropertiesPanel,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    title: { control: 'text' },
    properties: { control: 'object' },
  },
} satisfies Meta<typeof FieldPropertiesPanel>;

export default meta;
type Story = StoryObj<typeof meta>;

const defaultProperties = [
  {
    label: 'Field Name',
    name: 'name',
    type: 'text' as InputType,
    value: 'field_name',
    required: true,
    onChange: () => {},
  },
  {
    label: 'Label',
    name: 'label',
    type: 'text' as InputType,
    value: 'Field Label',
    required: true,
    onChange: () => {},
  },
  {
    label: 'Field Type',
    name: 'type',
    type: 'select' as InputType,
    value: 'text',
    options: [
      { label: 'Text', value: 'text' },
      { label: 'Number', value: 'number' },
      { label: 'Email', value: 'email' },
      { label: 'Date', value: 'date' },
      { label: 'Select', value: 'select' },
      { label: 'Checkbox', value: 'checkbox' },
    ],
    onChange: () => {},
  },
  {
    label: 'Mandatory',
    name: 'required',
    type: 'checkbox' as InputType,
    value: false,
    onChange: () => {},
  },
  {
    label: 'Read Only',
    name: 'readOnly',
    type: 'checkbox' as InputType,
    value: false,
    onChange: () => {},
  },
];

export const Default: Story = {
  args: {
    title: 'Field Properties',
    properties: defaultProperties,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByText('Field Properties')).toBeInTheDocument();
    await expect(canvas.getByLabelText('Field Name')).toHaveValue('field_name');
    await expect(canvas.getByLabelText('Label')).toHaveValue('Field Label');
  },
};

export const WithTextarea: Story = {
  args: {
    title: 'Field Properties',
    properties: [
      ...defaultProperties,
      {
        label: 'Description',
        name: 'description',
        type: 'textarea' as InputType,
        value: 'This is a textarea field for longer descriptions',
        onChange: () => {},
      },
    ],
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const textarea = canvas.getByLabelText('Description');
    await expect(textarea).toBeInTheDocument();
    await expect(textarea).toHaveValue('This is a textarea field for longer descriptions');
  },
};

export const WithAllFieldTypes: Story = {
  args: {
    title: 'Advanced Field Properties',
    properties: [
      {
        label: 'Text Field',
        name: 'textField',
        type: 'text' as InputType,
        value: 'Sample text',
        onChange: () => {},
      },
      {
        label: 'Number Field',
        name: 'numberField',
        type: 'number' as InputType,
        value: '42',
        onChange: () => {},
      },
      {
        label: 'Select Field',
        name: 'selectField',
        type: 'select' as InputType,
        value: 'option2',
        options: [
          { label: 'Option 1', value: 'option1' },
          { label: 'Option 2', value: 'option2' },
          { label: 'Option 3', value: 'option3' },
        ],
        onChange: () => {},
      },
      {
        label: 'Checkbox Field',
        name: 'checkboxField',
        type: 'checkbox' as InputType,
        value: true,
        onChange: () => {},
      },
      {
        label: 'Description',
        name: 'description',
        type: 'textarea' as InputType,
        value: 'This is a longer description that might span multiple lines. It provides more detailed information about the field.',
        onChange: () => {},
      },
    ],
  },
  parameters: {
    layout: 'padded',
    viewport: {
      defaultViewport: 'desktop',
    },
  },
};

export const EmptyState: Story = {
  args: {
    title: 'Field Properties',
    properties: [],
  },
  parameters: {
    layout: 'padded',
  },
};
