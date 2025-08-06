import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { FileUpload } from "../../components/molocules/FileUpload"

const meta: Meta<typeof FileUpload> = {
  title: "Design-system/Components/Molecules/FileUpload",
  component: FileUpload,
  tags: ["autodocs"],
  args: {
    label: "Upload Image",
    accept: "image/*",
    onFileSelect: (file: File) => {
      alert(`File selected: ${file.name}`)
    },
  },
}

export default meta
type Story = StoryObj<typeof FileUpload>

export const Default: Story = {}

export const CustomLabel: Story = {
  args: {
    label: "Choose a File",
  },
}

export const AcceptPDFOnly: Story = {
  args: {
    label: "Upload PDF",
    accept: "application/pdf",
  },
}
