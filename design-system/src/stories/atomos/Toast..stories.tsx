import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { toast } from 'sonner';
import { ToastProvider } from '../../components/atoms/ToastProvider';
import { Button } from "../../components/atoms/Button"; // Adjust path as needed

const meta: Meta<typeof ToastProvider> = {
  title: 'Design-system/Components/Atoms/ToastProvider',
  component: ToastProvider,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  decorators: [
    (Story) => (
      <div>
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof ToastProvider>;

export const Default: Story = {
  render: () => (
    <>
      <ToastProvider />
      <Button variant="primary" onClick={() => toast('This is a default toast')}>
        Show Default Toast
      </Button>
    </>
  ),
};

export const Success: Story = {
  render: () => (
    <>
      <ToastProvider />
      <Button variant="primary" onClick={() => toast.success('Operation completed successfully')}>
        Show Success Toast
      </Button>
    </>
  ),
};

export const Error: Story = {
  render: () => (
    <>
      <ToastProvider />
      <Button variant="primary" onClick={() => toast.error('Something went wrong')}>
        Show Error Toast
      </Button>
    </>
  ),
};

export const WithAction: Story = {
  render: () => (
    <>
      <ToastProvider />
      <Button 
        variant="primary"
        onClick={() =>
          toast('Item deleted', {
            action: {
              label: 'Undo',
              onClick: () => alert('Undo clicked'),
            },
            cancel: {
              label: 'Cancel',
              onClick: () => alert('Cancel clicked'),
            },
          })
        }
      >
        Show Toast with Action
      </Button>
    </>
  ),
};

export const WithDescription: Story = {
  render: () => (
    <>
      <ToastProvider />
      <Button
        variant="primary"
        onClick={() =>
          toast('Profile updated', {
            description: 'Your changes have been saved successfully.',
          })
        }
      >
        Show Toast with Description
      </Button>
    </>
  ),
};