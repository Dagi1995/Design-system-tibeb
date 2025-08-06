/* eslint-disable jsx-a11y/alt-text */
"use client"

import React, { useRef, useState } from "react"
import { Button } from "../atoms/Button"
import { Progress } from "@/design-system/src/components/atoms/Progress"

interface FileUploadProps {
  onFileSelect: (file: File) => void
  label?: string
  accept?: string
}

export function FileUpload({
  onFileSelect,
  label = "Upload File",
  accept = "*",
}: FileUploadProps) {
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [progress, setProgress] = useState<number | null>(null)
  const [fileURL, setFileURL] = useState<string | null>(null)
  const [fileName, setFileName] = useState<string | null>(null)
  const [fileType, setFileType] = useState<string | null>(null)

  const handleClick = () => {
    fileInputRef.current?.click()
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      onFileSelect(file)
      simulateUpload(file)
    }
  }

  const simulateUpload = (file: File) => {
    setProgress(0)
    setFileName(file.name)
    setFileType(file.type)
    setFileURL(URL.createObjectURL(file))

    const fakeUpload = setInterval(() => {
      setProgress((prev) => {
        if (prev !== null && prev >= 100) {
          clearInterval(fakeUpload)
          return 100
        }
        return (prev ?? 0) + 10
      })
    }, 150)
  }

  return (
    <div className="space-y-2">
      <input
        type="file"
        accept={accept}
        ref={fileInputRef}
        onChange={handleChange}
        className="hidden"
      />
      <Button variant="secondary" type="button" onClick={handleClick}>
        {label}
      </Button>

      {progress !== null && (
        <Progress value={progress} className="h-2" />
      )}

      {progress === 100 && fileName && (
        <div className="mt-2 text-sm text-muted-foreground break-all">
          {fileType?.startsWith("image/") ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={fileURL!}
              className="mt-2 max-w-[200px] rounded border"
            />
          ) : (
            <span>📄 {fileName}</span>
          )}
        </div>
      )}
    </div>
  )
}
