import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import CoverUpload from "../../components/molecules/CoverUpload";
import { within, userEvent, expect, fn } from "@storybook/test";
import React from "react";

const meta: Meta<typeof CoverUpload> = {
  title: "Design-system/Components/Molecules/CoverUpload",
  component: CoverUpload,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: `
A cover image upload component with drag-and-drop support, image preview, upload simulation, and validation.

## Features
- Drag and drop interface for cover images
- Image preview with loading states
- Upload progress simulation
- Error handling with retry functionality
- Customizable file size limits and accepted types
- Default cover image support
- Responsive design with hover effects

## Props
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| maxSize | number | 5MB | Maximum file size in bytes |
| accept | string | 'image/*' | Accepted file types |
| className | string | - | Additional CSS classes |
| onImageChange | function | - | Callback when image changes |
        `,
      },
    },
  },
  argTypes: {
    maxSize: {
      control: { type: "number" },
      description: "Maximum file size in bytes",
      table: {
        defaultValue: { summary: "5242880" }, // 5MB in bytes
      },
    },
    accept: {
      control: { type: "text" },
      description: "Accepted file types",
      table: {
        defaultValue: { summary: "image/*" },
      },
    },
    className: {
      control: { type: "text" },
      description: "Additional CSS classes",
    },
    onImageChange: {
      action: "imageChanged",
      description: "Callback when image changes",
    },
  },
  tags: ["autodocs"],
};
export default meta;

type Story = StoryObj<typeof CoverUpload>;

export const Default: Story = {
  args: {},
  parameters: {
    docs: {
      description: {
        story:
          "The default cover upload component with a pre-loaded default image and standard 5MB file size limit.",
      },
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Check if the default cover image is displayed
    const coverImage = canvas.getByAltText("Cover");
    await expect(coverImage).toBeInTheDocument();

    // Check if the guidelines are present
    await expect(
      canvas.getByText("Cover Image Guidelines")
    ).toBeInTheDocument();
  },
};

export const EmptyState: Story = {
  args: {
    onImageChange: fn(),
  },
  parameters: {
    docs: {
      description: {
        story:
          "Cover upload component in empty state (no default image). Shows the upload prompt interface.",
      },
    },
  },
  render: (args) => {
    // Create a wrapper component that starts without the default image
    const EmptyCoverUpload = () => {
      return <CoverUpload {...args} />;
    };

    // Override the default cover image by not passing it
    return <EmptyCoverUpload />;
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Check if the upload prompt is displayed
    await expect(canvas.getByText("Upload Cover Image")).toBeInTheDocument();
    await expect(canvas.getByText("Browse Files")).toBeInTheDocument();
  },
};

export const WithSmallSizeLimit: Story = {
  args: {
    maxSize: 1 * 1024 * 1024, // 1MB
  },
  parameters: {
    docs: {
      description: {
        story: "Cover upload component with a smaller file size limit (1MB).",
      },
    },
  },
};

export const WithSpecificFileTypes: Story = {
  args: {
    accept: "image/jpeg,image/png",
  },
  parameters: {
    docs: {
      description: {
        story:
          "Cover upload component that only accepts specific image formats (JPEG and PNG).",
      },
    },
  },
};

export const UploadSimulation: Story = {
  args: {
    onImageChange: fn(),
  },
  parameters: {
    docs: {
      description: {
        story:
          "Demonstrates the upload simulation functionality. Try uploading an image to see the progress indicator.",
      },
    },
  },
  play: async ({ canvasElement, args }) => {
    // Get the file input
    const fileInput = canvasElement.querySelector(
      'input[type="file"]'
    ) as HTMLInputElement;

    // Create a mock image file
    const file = new File(["mock image content"], "cover.jpg", {
      type: "image/jpeg",
    });

    // Simulate file selection
    await userEvent.upload(fileInput, file);

    // Check if the onImageChange callback was called
    await expect(args.onImageChange).toHaveBeenCalled();
  },
};

export const CustomStyling: Story = {
  args: {
    className: "max-w-4xl",
  },
  parameters: {
    docs: {
      description: {
        story:
          "Cover upload component with custom styling using the className prop.",
      },
    },
  },
};

// Interactive demo showing different states
const CoverUploadDemo = () => {
  const [currentImage, setCurrentImage] = React.useState<File | null>(null);

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium mb-4">Cover Upload Demo</h3>
        <CoverUpload onImageChange={setCurrentImage} />
      </div>

      {currentImage && (
        <div className="p-4 bg-gray-50 rounded-md">
          <h4 className="text-sm font-medium mb-2">Current Image Info:</h4>
          <p className="text-sm">Name: {currentImage.name}</p>
          <p className="text-sm">Size: {currentImage.size} bytes</p>
          <p className="text-sm">Type: {currentImage.type}</p>
        </div>
      )}
    </div>
  );
};

export const WithStateManagement: Story = {
  render: () => <CoverUploadDemo />,
  parameters: {
    docs: {
      description: {
        story:
          "Example showing how to use the CoverUpload component with state management to track the selected image.",
      },
    },
  },
};

// Error state demonstration
export const ErrorState: Story = {
  args: {
    maxSize: 100 * 1024, // Very small limit to easily trigger errors
  },
  parameters: {
    docs: {
      description: {
        story:
          "Demonstrates how error messages appear when validation fails. Try uploading a file larger than 100KB to see the error message.",
      },
    },
  },
};
