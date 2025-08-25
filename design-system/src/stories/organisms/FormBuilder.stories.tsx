import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { FormBuilder } from '../../components/organisms/FormBuilder';
import { within } from '@storybook/test';
import { expect } from '@storybook/test';

const meta = {
  title: 'Design-system/Components/Organisms/FormBuilder',
  component: FormBuilder,
  parameters: {
    layout: 'fullscreen',
    chromatic: { viewports: [1200] },
  },
  tags: ['autodocs'],
  // No controls needed as the component manages its own state internally
} satisfies Meta<typeof FormBuilder>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    // Verify the main header elements are present
    await expect(canvas.getByText('Dagmi')).toBeInTheDocument();
    await expect(canvas.getByText('Go to Dagmi List')).toBeInTheDocument();
    
    // Verify the form builder tabs are present
    await expect(canvas.getByText('Form')).toBeInTheDocument();
    await expect(canvas.getByText('Settings')).toBeInTheDocument();
    await expect(canvas.getByText('Connections')).toBeInTheDocument();
    
    // Verify the default fields are present
    await expect(canvas.getByDisplayValue('Name')).toBeInTheDocument();
    await expect(canvas.getByDisplayValue('Time')).toBeInTheDocument();
    
    // Verify the add field button is present
    await expect(canvas.getByText('Add field')).toBeInTheDocument();
  },
};

// A story that shows the form builder with many fields
export const WithManyFields: Story = {
  parameters: {
    // This story is just for visual testing, no need for interactions
    chromatic: { disableSnapshot: false },
  },
};

// A story that shows the field properties panel
export const WithFieldSelected: Story = {
  play: async (context) => {
    const { canvasElement } = context;
    const canvas = within(canvasElement);
    
    // Click on the first field to select it
    const firstField = canvas.getByDisplayValue('Name');
    await firstField.click();
    
    // Verify the properties panel is shown
    await expect(canvas.getByText('Field Properties')).toBeInTheDocument();
  },
};

// A story that shows the search functionality
export const WithSearch: Story = {
  play: async (context) => {
    const { canvasElement } = context;
    const canvas = within(canvasElement);
    
    // Click on the add field button to show the search
    const addButton = canvas.getByText('Add field');
    await addButton.click();
    
    // Type in the search
    const searchInput = canvas.getByPlaceholderText('Search fieldtypes...');
    await searchInput.focus();
    await searchInput.setAttribute('value', 'email');
    
    // Verify search results
    await expect(canvas.getByText('Email')).toBeInTheDocument();
  },
  parameters: {
    // This story involves interactions that might be flaky in visual tests
    chromatic: { disableSnapshot: true },
  },
};
