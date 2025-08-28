import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import AvatarUpload from "../../components/molecules/AvatarUpload";

const meta: Meta<typeof AvatarUpload> = {
  title: "Design-system/Components/Molecules/AvatarUpload",
  component: AvatarUpload,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: `
A specialized avatar upload component with drag-and-drop support, image preview, and validation.

## Features
- Drag and drop interface for avatar images
- Image preview with fallback icon
- File validation (type, size)
- Customizable maximum file size
- Default avatar support
- Error handling with user-friendly messages
        `,
      },
    },
  },
  argTypes: {
    maxSize: {
      control: { type: "number" },
      description: "Maximum file size in bytes",
      table: {
        defaultValue: { summary: "2097152" }, // 2MB in bytes
      },
    },
    className: {
      control: { type: "text" },
      description: "Additional CSS classes",
    },
    onFileChange: {
      action: "fileChanged",
      description: "Callback when file changes",
    },
    defaultAvatar: {
      control: { type: "text" },
      description: "URL of default avatar image",
    },
  },
};
export default meta;

type Story = StoryObj<typeof AvatarUpload>;

export const Default: Story = {
  args: {},
  parameters: {
    docs: {
      description: {
        story: "The default avatar upload component accepting image files.",
      },
    },
  },
};

export const WithSmallSizeLimit: Story = {
  args: {
    maxSize: 500 * 1024, // 500KB
  },
  parameters: {
    docs: {
      description: {
        story:
          "Avatar upload component with a smaller file size limit (500KB).",
      },
    },
  },
};

export const WithDefaultAvatar: Story = {
  args: {
    defaultAvatar:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
  },
  parameters: {
    docs: {
      description: {
        story:
          "Avatar upload component with a default avatar image pre-loaded.",
      },
    },
  },
};
