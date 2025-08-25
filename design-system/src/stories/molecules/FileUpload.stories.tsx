// FileUploader.stories.tsx
import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { FileUploader, FileUploaderContent, FileUploaderItem, FileInput } from '../../components/molecules/FileUpload';
import { Button } from "../../components/atoms/Button"
import { UploadCloud } from 'lucide-react';
import { useState } from 'react';

const meta: Meta<typeof FileUploader> = {
  title: "Design-system/Components/Molecules/FileUploader",
  component: FileUploader,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
A customizable file upload component with drag-and-drop functionality, file validation, and keyboard navigation support.

## Features
- Drag and drop file upload
- File type validation
- File size limits
- Multiple or single file selection
- Keyboard navigation
- Customizable appearance
- Horizontal and vertical orientations
- RTL support

## Props
- \`value\`: Array of currently selected files
- \`onValueChange\`: Callback when files change
- \`dropzoneOptions\`: Options for react-dropzone
- \`reSelect\`: Whether to replace files on new selection
- \`orientation\`: Horizontal or vertical layout
- \`dir\`: Direction (ltr/rtl) for internationalization
        `,
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    value: {
      control: { type: 'object' },
      description: 'Array of currently selected files',
    },
    onValueChange: {
      action: 'onValueChange',
      description: 'Callback function when files are added or removed',
    },
    dropzoneOptions: {
      control: { type: 'object' },
      description: 'Configuration options for react-dropzone',
    },
    reSelect: {
      control: { type: 'boolean' },
      description: 'Replace existing files when new files are selected',
      defaultValue: false,
    },
    orientation: {
      control: { type: 'select' },
      options: ['horizontal', 'vertical'],
      description: 'Layout direction for uploaded files',
      defaultValue: 'vertical',
    },
    dir: {
      control: { type: 'select' },
      options: ['ltr', 'rtl'],
      description: 'Text direction for internationalization',
      defaultValue: 'ltr',
    },
  },
};

export default meta;
type Story = StoryObj<typeof FileUploader>;

// Create a wrapper component that handles the file state
const FileUploaderWrapper = (args: any) => {
  const [files, setFiles] = useState<File[] | null>(null);
  
  return (
    <FileUploader {...args} value={files} onValueChange={setFiles}>
      <FileInput className="flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-lg p-6 hover:border-gray-400 transition-colors">
        <UploadCloud className="w-12 h-12 text-gray-400 mb-4" />
        <p className="text-sm text-gray-500 text-center">
          Drag & drop files here or click to browse
        </p>
        <p className="text-xs text-gray-400 mt-2">
          Supports: JPG, PNG, GIF • Max 4MB per file
        </p>
      </FileInput>
      
      <FileUploaderContent className="mt-4">
        {files?.map((file, index) => (
          <FileUploaderItem key={index} index={index} className="mb-2">
            <span className="truncate">{file.name}</span>
            <span className="text-xs text-gray-500">
              {(file.size / 1024).toFixed(1)} KB
            </span>
          </FileUploaderItem>
        ))}
      </FileUploaderContent>
    </FileUploader>
  );
};

// Default file uploader
export const Default: Story = {
  args: {
    dropzoneOptions: {
      accept: {
        'image/*': ['.jpg', '.jpeg', '.png', '.gif'],
      },
      maxSize: 4 * 1024 * 1024, // 4MB
      multiple: true,
    },
    reSelect: false,
    orientation: 'vertical',
  },
  render: (args) => (
    <div className="w-96">
      <FileUploaderWrapper {...args} />
    </div>
  ),
};

// Single file upload wrapper
const SingleFileUploaderWrapper = (args: any) => {
  const [files, setFiles] = useState<File[] | null>(null);
  
  return (
    <FileUploader {...args} value={files} onValueChange={setFiles}>
      <FileInput className="flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-lg p-6 hover:border-gray-400 transition-colors">
        <UploadCloud className="w-12 h-12 text-gray-400 mb-4" />
        <p className="text-sm text-gray-500 text-center">
          Upload a PDF document
        </p>
        <p className="text-xs text-gray-400 mt-2">
          Max 5MB • Only PDF files accepted
        </p>
      </FileInput>
      
      <FileUploaderContent className="mt-4">
        {files?.map((file, index) => (
          <FileUploaderItem key={index} index={index} className="mb-2">
            <span className="truncate">{file.name}</span>
            <span className="text-xs text-gray-500">
              {(file.size / 1024).toFixed(1)} KB
            </span>
          </FileUploaderItem>
        ))}
      </FileUploaderContent>
    </FileUploader>
  );
};

// Single file upload
export const SingleFile: Story = {
  args: {
    dropzoneOptions: {
      accept: {
        'application/pdf': ['.pdf'],
      },
      maxFiles: 1,
      maxSize: 5 * 1024 * 1024, // 5MB
      multiple: false,
    },
    reSelect: true,
  },
  render: (args) => (
    <div className="w-96">
      <SingleFileUploaderWrapper {...args} />
    </div>
  ),
};

// Horizontal layout wrapper
const HorizontalLayoutWrapper = (args: any) => {
  const [files, setFiles] = useState<File[] | null>(null);
  
  return (
    <FileUploader {...args} value={files} onValueChange={setFiles}>
      <FileInput className="flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-lg p-6 hover:border-gray-400 transition-colors mb-4">
        <UploadCloud className="w-10 h-10 text-gray-400 mb-2" />
        <p className="text-sm text-gray-500 text-center">
          Drag images here or click to browse
        </p>
      </FileInput>
      
      <FileUploaderContent>
        {files?.map((file, index) => (
          <FileUploaderItem key={index} index={index} className="mr-2 mb-2">
            <span className="truncate max-w-[120px]">{file.name}</span>
          </FileUploaderItem>
        ))}
      </FileUploaderContent>
    </FileUploader>
  );
};

// Horizontal layout
export const HorizontalLayout: Story = {
  args: {
    dropzoneOptions: {
      accept: {
        'image/*': ['.jpg', '.jpeg', '.png'],
      },
      maxSize: 2 * 1024 * 1024, // 2MB
      multiple: true,
    },
    orientation: 'horizontal',
  },
  render: (args) => (
    <div className="w-full max-w-2xl">
      <HorizontalLayoutWrapper {...args} />
    </div>
  ),
};

// Custom trigger button wrapper
const CustomTriggerWrapper = (args: any) => {
  const [files, setFiles] = useState<File[] | null>(null);
  
  return (
    <FileUploader {...args} value={files} onValueChange={setFiles}>
      <FileInput>
        <Button variant="outline" className="w-full">
          <UploadCloud className="w-4 h-4 mr-2" />
          Upload Spreadsheet Files
        </Button>
      </FileInput>
      
      <FileUploaderContent className="mt-4">
        {files?.map((file, index) => (
          <FileUploaderItem key={index} index={index} className="mb-2">
            <span className="truncate">{file.name}</span>
            <span className="text-xs text-gray-500">
              {(file.size / 1024 / 1024).toFixed(2)} MB
            </span>
          </FileUploaderItem>
        ))}
      </FileUploaderContent>
    </FileUploader>
  );
};

// Custom trigger button
export const CustomTrigger: Story = {
  args: {
    dropzoneOptions: {
      accept: {
        'text/csv': ['.csv'],
        'application/vnd.ms-excel': ['.xls'],
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': ['.xlsx'],
      },
      maxSize: 10 * 1024 * 1024, // 10MB
      multiple: true,
    },
  },
  render: (args) => (
    <div className="w-96">
      <CustomTriggerWrapper {...args} />
    </div>
  ),
};

// With file type restrictions wrapper
const RestrictedFileTypesWrapper = (args: any) => {
  const [files, setFiles] = useState<File[] | null>(null);
  
  return (
    <FileUploader {...args} value={files} onValueChange={setFiles}>
      <FileInput className="flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-lg p-6 hover:border-gray-400 transition-colors">
        <UploadCloud className="w-12 h-12 text-gray-400 mb-4" />
        <p className="text-sm text-gray-500 text-center">
          Upload compressed files
        </p>
        <p className="text-xs text-gray-400 mt-2">
          ZIP, RAR, 7Z • Max 20MB per file
        </p>
      </FileInput>
      
      <FileUploaderContent className="mt-4">
        {files?.map((file, index) => (
          <FileUploaderItem key={index} index={index} className="mb-2">
            <span className="truncate">{file.name}</span>
            <span className="text-xs text-gray-500">
              {(file.size / 1024 / 1024).toFixed(2)} MB
            </span>
          </FileUploaderItem>
        ))}
      </FileUploaderContent>
    </FileUploader>
  );
};

// With file type restrictions
export const RestrictedFileTypes: Story = {
  args: {
    dropzoneOptions: {
      accept: {
        'application/zip': ['.zip'],
        'application/x-rar-compressed': ['.rar'],
        'application/x-7z-compressed': ['.7z'],
      },
      maxSize: 20 * 1024 * 1024, // 20MB
      multiple: true,
    },
  },
  render: (args) => (
    <div className="w-96">
      <RestrictedFileTypesWrapper {...args} />
    </div>
  ),
};

// RTL support
export const RTLSupport: Story = {
  args: {
    dropzoneOptions: {
      accept: {
        'image/*': ['.jpg', '.jpeg', '.png'],
      },
      maxSize: 4 * 1024 * 1024,
      multiple: true,
    },
    dir: 'rtl',
  },
  
};

// Empty state with custom message wrapper
const EmptyStateWrapper = (args: any) => {
  const [files, setFiles] = useState<File[] | null>(null);
  
  return (
    <FileUploader {...args} value={files} onValueChange={setFiles}>
      <FileInput className="flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-lg p-8 hover:border-gray-400 transition-colors">
        <div className="text-center">
          <UploadCloud className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h3 className="font-medium text-gray-700 mb-1">No documents uploaded</h3>
          <p className="text-sm text-gray-500 mb-4">
            Drag & drop PDF files here or click to browse
          </p>
          <Button size="sm" variant="outline">
            Select Files
          </Button>
        </div>
      </FileInput>
      
      <FileUploaderContent className="mt-4">
        {files?.map((file, index) => (
          <FileUploaderItem key={index} index={index} className="mb-2">
            <span className="truncate">{file.name}</span>
            <span className="text-xs text-gray-500">
              {(file.size / 1024 / 1024).toFixed(2)} MB
            </span>
          </FileUploaderItem>
        ))}
      </FileUploaderContent>
    </FileUploader>
  );
};

// Empty state with custom message
export const EmptyState: Story = {
  args: {
    dropzoneOptions: {
      accept: {
        'application/pdf': ['.pdf'],
      },
      maxSize: 5 * 1024 * 1024,
      multiple: true,
    },
  },
  render: (args) => (
    <div className="w-96">
      <EmptyStateWrapper {...args} />
    </div>
  ),
};