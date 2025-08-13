// File: FileUploader.stories.tsx

import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import React, { useState } from "react";
import {
  FileUploader,
  FileUploaderContent,
  FileUploaderItem,
  FileInput,
} from "../../components/molecules/FileUpload";
import { Button } from "../../components/atoms/Button";
import { toast } from "sonner";

const meta: Meta<typeof FileUploader> = {
  title: "Design-system/Components/Molecules/FileUploader",
  component: FileUploader,
  parameters: {
    layout: "centered",
  },
};

export default meta;
type Story = StoryObj<typeof FileUploader>;

export const Default: Story = {
  render: () => {
    const [files, setFiles] = useState<File[] | null>(null);

    return (
      <div className="w-[400px] p-4">
        <FileUploader
          value={files}
          onValueChange={(newFiles) => {
            setFiles(newFiles);
            toast.success(`${newFiles?.length || 0} file(s) selected`);
          }}
          dropzoneOptions={{
            maxFiles: 3,
            maxSize: 4 * 1024 * 1024, // 4 MB
            multiple: true,
            accept: {
              "image/*": [".png", ".jpg", ".jpeg", ".gif"],
            },
          }}
          orientation="vertical"
        >
          <FileInput className="border border-dashed border-gray-400 p-4 flex items-center justify-center">
            <span className="text-gray-500">Click or drag files here</span>
          </FileInput>

          {files && files.length > 0 && (
            <FileUploaderContent>
              {files.map((file, i) => (
                <FileUploaderItem key={i} index={i}>
                  {file.name}
                </FileUploaderItem>
              ))}
            </FileUploaderContent>
          )}
        </FileUploader>

        <div className="mt-4 flex gap-2">
          <Button
            variant="secondary"
            onClick={() => {
              setFiles(null);
              toast.info("Files cleared");
            }}
          >
            Clear Files
          </Button>
        </div>
      </div>
    );
  },
};
