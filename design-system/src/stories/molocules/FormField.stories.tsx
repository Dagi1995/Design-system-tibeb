import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { FormField } from '../../components/molocules/FormField';
import { within } from '@storybook/test';
import { expect } from '@storybook/test';

const meta: Meta<typeof FormField> = {
  title: 'Design-system/Components/Molecules/FormField',
  component: FormField,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    label: { control: 'text' },
    type: { control: 'text' },
    name: { control: 'text' },
    isActive: { control: 'boolean' },
  },
} satisfies Meta<typeof FormField>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    label: 'Field Label',
    type: 'text',
    name: 'fieldName',
    isActive: false,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByText('Field Label')).toBeInTheDocument();
    await expect(canvas.getByDisplayValue('text')).toBeInTheDocument();
  },
};

export const Active: Story = {
  args: {
    ...Default.args,
    isActive: true,
  },
};

export const NoLabel: Story = {
  args: {
    ...Default.args,
    label: '',
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByText('No Label')).toBeInTheDocument();
  },
};

export const WithDifferentType: Story = {
  args: {
    ...Default.args,
    type: 'email',
    label: 'Email Field',
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByDisplayValue('email')).toBeInTheDocument();
  },
};
