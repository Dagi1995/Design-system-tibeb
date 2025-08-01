import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { expect, userEvent, within } from 'storybook/test';
import { getRouter} from '@storybook/nextjs-vite/navigation.mock'; // Import getSearchParams

import { ResetPasswordForm } from "../../components/organisms/ResetPasswordForm"; // Adjust path as needed

const meta: Meta<typeof ResetPasswordForm> = {
  title: "Design-system/Components/Organisms/ResetPasswordForm",
  component: ResetPasswordForm,
  parameters: {
    layout: "centered",
    nextjs: {
      appDirectory: true, // Enable App Router mocking
    },
  },
  // MSW handlers for this component's stories are defined per story
  // to allow for different API responses (success, failure).
} satisfies Meta<typeof ResetPasswordForm>;

export default meta;
type Story = StoryObj<typeof ResetPasswordForm>;

export const Default: Story = {
  parameters: {
    nextjs: {
      // Mock a search param for the token
      // This will make useSearchParams().get('token') return 'valid-token-123'
      query: {
        token: 'valid-token-123',
      },
    },
    msw: {
      handlers: [
       
      ],
    },
  },
  async play({ canvasElement }) {
    const canvas = within(canvasElement);

    // Simulate typing valid passwords
    const passwordInput = await canvas.findByPlaceholderText(/new password/i);
    const confirmPasswordInput = await canvas.findByPlaceholderText(/confirm new password/i);
    await userEvent.type(passwordInput, 'password123', { delay: 50 });
    await userEvent.type(confirmPasswordInput, 'password123', { delay: 50 });

    // Simulate form submission
    const resetButton = await canvas.findByRole('button', { name: /reset password/i });
    await userEvent.click(resetButton);

    // Assertions
    await expect(getRouter().push).toHaveBeenCalledWith('/login');
  },
};

export const PasswordsMismatch: Story = {
  parameters: {
    nextjs: {
      query: {
        token: 'valid-token-123',
      },
    },
  },
  async play({ canvasElement }) {
    const canvas = within(canvasElement);

    // Simulate typing mismatched passwords
    const passwordInput = await canvas.findByPlaceholderText(/new password/i);
    const confirmPasswordInput = await canvas.findByPlaceholderText(/confirm new password/i);
    await userEvent.type(passwordInput, 'password123', { delay: 500 });
    await userEvent.type(confirmPasswordInput, 'different', { delay: 500 });

    // Simulate form submission
    const resetButton = await canvas.findByRole('button', { name: /reset password/i });
    await userEvent.click(resetButton);

    // Assert validation error message
    const errorMessage = await canvas.findByText(/passwords do not match/i);
    await expect(errorMessage).toBeInTheDocument();

    // Assert no API call and no navigation
    await expect(getRouter().push).not.toHaveBeenCalled();
  },
};

export const PasswordTooShort: Story = {
  parameters: {
    nextjs: {
      query: {
        token: 'valid-token-123',
      },
    },
  },
  async play({ canvasElement }) {
    const canvas = within(canvasElement);

    
    // Simulate typing a short password
    const passwordInput = await canvas.findByPlaceholderText(/new password/i);
    const confirmPasswordInput = await canvas.findByPlaceholderText(/confirm new password/i);
    await userEvent.type(passwordInput, 'short', { delay: 50 }); // Less than 6 chars
    await userEvent.type(confirmPasswordInput, 'short', { delay: 50 });

    // Simulate form submission
    const resetButton = await canvas.findByRole('button', { name: /reset password/i });
    await userEvent.click(resetButton);

    // Assert validation error message
    const errorMessage = await canvas.findByText(/password must be at least 6 characters/i);
    await expect(errorMessage).toBeInTheDocument();

    // Assert no API call and no navigation
    await expect(getRouter().push).not.toHaveBeenCalled();
  },
};

export const MissingToken: Story = {
  parameters: {
    nextjs: {
      query: {}, // No token in query params
    },
  },
  async play({ canvasElement }) {
    const canvas = within(canvasElement);

    // Simulate typing valid passwords
    const passwordInput = await canvas.findByPlaceholderText(/new password/i);
    const confirmPasswordInput = await canvas.findByPlaceholderText(/confirm new password/i);
    await userEvent.type(passwordInput, 'password123', { delay: 50 });
    await userEvent.type(confirmPasswordInput, 'password123', { delay: 50 });

    // Simulate form submission
    const resetButton = await canvas.findByRole('button', { name: /reset password/i });
    await userEvent.click(resetButton);

   
    // Assertions
    await expect(getRouter().push).not.toHaveBeenCalled();
  },
};

export const APIFailure: Story = {
  parameters: {
    nextjs: {
      query: {
        token: 'valid-token-123',
      },
    },
    msw: {
      handlers: [
       
      ],
    },
  },
  async play({ canvasElement }) {
    const canvas = within(canvasElement);

    // Simulate typing valid passwords
    const passwordInput = await canvas.findByPlaceholderText(/new password/i);
    const confirmPasswordInput = await canvas.findByPlaceholderText(/confirm new password/i);
    await userEvent.type(passwordInput, 'password123', { delay: 50 });
    await userEvent.type(confirmPasswordInput, 'password123', { delay: 50 });

    // Simulate form submission
    const resetButton = await canvas.findByRole('button', { name: /reset password/i });
    await userEvent.click(resetButton);


    // Assertions
    await expect(getRouter().push).not.toHaveBeenCalled();
  },
};