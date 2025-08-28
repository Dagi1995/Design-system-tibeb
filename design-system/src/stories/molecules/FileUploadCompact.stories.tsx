/* eslint-disable @typescript-eslint/no-explicit-any */
import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import FileUploadCompact from "../../components/molecules/FileUploadCompact";
import { within, userEvent, expect, fn } from "@storybook/test";
import React from "react";

const meta: Meta<typeof FileUploadCompact> = {
  title: "Design-system/Components/Molecules/FileUploadCompact",
  component: FileUploadCompact,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: `
A compact file upload component with drag-and-drop support, file previews, and validation.

## Features
- Compact drag and drop interface
- File previews with thumbnails for images
- File count indicator
- Validation with error messages
- Customizable file limits and accepted types
- Multiple or single file selection

## Props
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| maxFiles | number | 3 | Maximum number of files allowed |
| maxSize | number | 2MB | Maximum file size in bytes |
| accept | string | 'image/*' | Accepted file types |
| multiple | boolean | true | Allow multiple file selection |
| className | string | - | Additional CSS classes |
| onFilesChange | function | - | Callback when files change |
        `,
      },
    },
  },
  argTypes: {
    maxFiles: {
      control: { type: "number" },
      description: "Maximum number of files allowed",
      table: {
        defaultValue: { summary: "3" },
      },
    },
    maxSize: {
      control: { type: "number" },
      description: "Maximum file size in bytes",
      table: {
        defaultValue: { summary: "2097152" }, // 2MB in bytes
      },
    },
    accept: {
      control: { type: "text" },
      description: "Accepted file types",
      table: {
        defaultValue: { summary: "image/*" },
      },
    },
    multiple: {
      control: { type: "boolean" },
      description: "Allow multiple file selection",
      table: {
        defaultValue: { summary: "true" },
      },
    },
    className: {
      control: { type: "text" },
      description: "Additional CSS classes",
    },
    onFilesChange: {
      action: "filesChanged",
      description: "Callback when files change",
    },
  },
  tags: ["autodocs"],
};
export default meta;

type Story = StoryObj<typeof FileUploadCompact>;

export const Default: Story = {
  args: {},
  parameters: {
    docs: {
      description: {
        story:
          "The default compact file upload component allowing up to 3 image files with 2MB size limit.",
      },
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Check if the upload prompt is displayed
    await expect(canvas.getByText("Add files")).toBeInTheDocument();
    await expect(
      canvas.getByText(/Drop files here or click to browse/)
    ).toBeInTheDocument();
  },
};

export const SingleFile: Story = {
  args: {
    maxFiles: 1,
    multiple: false,
  },
  parameters: {
    docs: {
      description: {
        story:
          "Compact file upload component limited to a single file selection.",
      },
    },
  },
};

export const MultipleFileTypes: Story = {
  args: {
    accept: "image/*,.pdf,.doc,.docx",
    maxFiles: 5,
  },
  parameters: {
    docs: {
      description: {
        story:
          "Compact file upload component accepting multiple file types including images, PDFs, and Word documents.",
      },
    },
  },
};

export const LargeFileLimit: Story = {
  args: {
    maxSize: 10 * 1024 * 1024, // 10MB
    maxFiles: 10,
  },
  parameters: {
    docs: {
      description: {
        story:
          "Compact file upload component with larger file size limit (10MB) and higher file count (10).",
      },
    },
  },
};

export const WithFiles: Story = {
  args: {
    onFilesChange: fn(),
  },
  parameters: {
    docs: {
      description: {
        story:
          "Demonstrates the component with pre-loaded files. Try removing files or adding new ones.",
      },
    },
  },
  play: async ({ canvasElement, args }) => {
    // Get the file input
    const fileInput = canvasElement.querySelector(
      'input[type="file"]'
    ) as HTMLInputElement;

    // Create mock files
    const imageFile = new File(["mock image content"], "photo.jpg", {
      type: "image/jpeg",
    });
    const pdfFile = new File(["mock pdf content"], "document.pdf", {
      type: "application/pdf",
    });

    // Simulate file selection
    await userEvent.upload(fileInput, [imageFile, pdfFile]);

    // Check if the onFilesChange callback was called
    await expect(args.onFilesChange).toHaveBeenCalled();
  },
};

export const CustomStyling: Story = {
  args: {
    className: "border-2 border-dashed border-blue-300 p-6 rounded-xl",
  },
  parameters: {
    docs: {
      description: {
        story:
          "Compact file upload component with custom styling using the className prop.",
      },
    },
  },
};

// Interactive demo showing different states
const FileUploadCompactDemo = () => {
  const [currentFiles, setCurrentFiles] = React.useState<any[]>([]);

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium mb-4">Compact File Upload Demo</h3>
        <FileUploadCompact
          onFilesChange={setCurrentFiles}
          accept="image/*,.pdf"
          maxFiles={5}
        />
      </div>

      {currentFiles.length > 0 && (
        <div className="p-4 bg-gray-50 rounded-md">
          <h4 className="text-sm font-medium mb-2">
            Current Files ({currentFiles.length}):
          </h4>
          <ul className="text-sm space-y-1">
            {currentFiles.map((file, index) => (
              <li key={index}>
                • {file.file.name} ({file.file.size} bytes)
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export const WithStateManagement: Story = {
  render: () => <FileUploadCompactDemo />,
  parameters: {
    docs: {
      description: {
        story:
          "Example showing how to use the FileUploadCompact component with state management to track selected files.",
      },
    },
  },
};

// Error state demonstration
export const ErrorState: Story = {
  args: {
    maxSize: 100 * 1024, // Very small limit to easily trigger errors
    maxFiles: 1,
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
