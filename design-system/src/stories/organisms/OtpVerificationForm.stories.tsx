import { Meta, StoryObj } from "@storybook/nextjs-vite"; // Changed to @storybook/react for Meta/StoryObj types
import { expect, userEvent, within} from 'storybook/test';
import { getRouter } from '@storybook/nextjs-vite/navigation.mock';

import { OtpVerificationForm } from "../../components/organisms/OtpVerificationForm"; // Adjust path as needed

const meta: Meta<typeof OtpVerificationForm> = {
  title: "Design-system/Components/Organisms/OtpVerificationForm",
  component: OtpVerificationForm,
  parameters: {
    layout: "centered",
    nextjs: {
      appDirectory: true, // Enable App Router mocking
    },
  },
  
  decorators: [
    
  ],
} satisfies Meta<typeof OtpVerificationForm>;

export default meta;
type Story = StoryObj<typeof OtpVerificationForm>;

export const Default: Story = {
  async play({ canvasElement }) {
    const canvas = within(canvasElement);

    // Simulate typing a valid 6-digit OTP
    const otpInput = await canvas.findByRole('textbox'); // InputOTP is likely a textbox
    await userEvent.type(otpInput, '123456', { delay: 500 });

    // Simulate form submission
    const verifyButton = await canvas.findByRole('button', { name: /verify otp/i });
    await userEvent.click(verifyButton);

   
    // Assertions
    await expect(getRouter().push).toHaveBeenCalledWith('/resetPassword');
  },
};

export const InvalidOTP: Story = {
  parameters: {
    msw: {
      handlers: [
      ],
    },
  },
  async play({ canvasElement }) {
    const canvas = within(canvasElement);

    // Simulate typing an invalid 6-digit OTP
    const otpInput = await canvas.findByRole('textbox');
    await userEvent.type(otpInput, '654321', { delay: 500 });

    // Simulate form submission
    const verifyButton = await canvas.findByRole('button', { name: /verify otp/i });
    await userEvent.click(verifyButton);


    // Assertions
    await expect(getRouter().push).not.toHaveBeenCalled();
  },
};

export const ResendOTP: Story = {
  async play({ canvasElement }) {
    const canvas = within(canvasElement);


    // Assert resend button is enabled and text changes
    const resendButton = await canvas.findByRole('button', { name: /resend otp/i });
    await expect(resendButton).toBeEnabled();
    await expect(canvas.getByText(/didn’t receive otp\?/i)).toBeInTheDocument();

    // Click resend button
    await userEvent.click(resendButton);

   
    // Assertions
    // After resend, timer should reset, so button should be disabled again
    await expect(resendButton).toBeDisabled();
    await expect(canvas.getByText(/resend available in 59s/i)).toBeInTheDocument(); // Check initial countdown text
  },
};

export const OTPValidation: Story = {
  async play({ canvasElement }) {
    const canvas = within(canvasElement);

    // Simulate typing less than 6 digits
    const otpInput = await canvas.findByRole('textbox');
    await userEvent.type(otpInput, '123', { delay: 500 });

    // Simulate form submission (even though it's invalid)
    const verifyButton = await canvas.findByRole('button', { name: /verify otp/i });
    await userEvent.click(verifyButton);

    // Assert validation error message
    const errorMessage = await canvas.findByText(/otp must be 6 digits/i);
    await expect(errorMessage).toBeInTheDocument();

    // Assert router.push was NOT called
    await expect(getRouter().push).not.toHaveBeenCalled();
  },
};