import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { expect } from 'storybook/test';
import { getRouter } from '@storybook/nextjs-vite/navigation.mock';
import { userEvent, within } from '@storybook/test';
import { ForgotPasswordForm } from "../../components/organisms/ForgotPasswordForm"; // Adjust path as needed

const meta: Meta<typeof ForgotPasswordForm> = {
  title: "Design-system/Components/Organisms/ForgotPasswordForm",
  component: ForgotPasswordForm,
  parameters: {
    layout: "centered",
    nextjs: {
      // Crucial for enabling App Router mocking for next/navigation
      appDirectory: true,
    },
  },
  // Add a global decorator for sonner if you want to see toasts in Storybook
  // or mock it if you want to assert toast calls.
  // For this example, we'll assume sonner is globally configured or you're
  // not asserting its calls directly in the story.
} satisfies Meta<typeof ForgotPasswordForm>;

export default meta;
type Story = StoryObj<typeof ForgotPasswordForm>;

export const Default: Story = {
  async play({ canvasElement }) {
    const canvas = within(canvasElement);

    // Simulate typing an email
    const emailInput = await canvas.findByLabelText(/email address/i);
    await userEvent.type(emailInput, 'test@example.com', { delay: 100 });

    // Simulate form submission
    const resetButton = await canvas.findByRole('button', { name: /reset password/i });
    await userEvent.click(resetButton);

    // Wait for the simulated async delay in the component
    // The setTimeout in your component is 1500ms, so we wait a bit longer.
    await new Promise((resolve) => setTimeout(resolve, 1600));

    // Assert that router.push was called with the correct path
    await expect(getRouter().push).toHaveBeenCalledWith('/otp');

    // Optionally, you could assert the toast message if you have a way to access it
    // For example, if you mock `toast` or render a Toaster component in preview.tsx
    // await expect(toast.success).toHaveBeenCalledWith("Mock: Password reset link sent!");
  },
};

export const InvalidEmail: Story = {
  async play({ canvasElement }) {
    const canvas = within(canvasElement);

    // Simulate typing an invalid email
    const emailInput = await canvas.findByLabelText(/email address/i);
    await userEvent.type(emailInput, 'invalid-email', { delay: 100 });

    // Simulate form submission
    const resetButton = await canvas.findByRole('button', { name: /reset password/i });
    await userEvent.click(resetButton);

    // Assert that the error message for email is displayed
    const errorMessage = await canvas.findByText(/invalid email address/i);
    await expect(errorMessage).toBeInTheDocument();

    // Assert that router.push was NOT called
    await expect(getRouter().push).not.toHaveBeenCalled();
  },
};