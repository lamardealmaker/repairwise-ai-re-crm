"use client"

import { useState, useCallback } from "react"
import { useDropzone } from "react-dropzone"
import { X, Upload, File, Loader2, AlertCircle } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Alert, AlertDescription } from "@/components/ui/alert"

interface FileUploadProps {
  onFileSelect: (files: File[]) => void
  disabled?: boolean
  maxFiles?: number
  maxSize?: number // in bytes
  accept?: Record<string, string[]>
}

interface FileError {
  message: string
  file?: string
}

export default function FileUpload({
  onFileSelect,
  disabled = false,
  maxFiles = 5,
  maxSize = 5 * 1024 * 1024, // 5MB
  accept = {
    "application/pdf": [".pdf"],
    "image/*": [".png", ".jpg", ".jpeg", ".gif"],
    "text/plain": [".txt"]
  }
}: FileUploadProps) {
  const [files, setFiles] = useState<File[]>([])
  const [uploading, setUploading] = useState(false)
  const [uploadProgress, setUploadProgress] = useState(0)
  const [error, setError] = useState<FileError | null>(null)

  const validateFile = (file: File) => {
    if (file.size > maxSize) {
      throw new Error(`File ${file.name} exceeds maximum size of 5MB`)
    }

    const fileType = Object.entries(accept).find(([type, exts]) => {
      if (type.includes("*")) {
        const baseType = type.split("/")[0]
        return file.type.startsWith(baseType)
      }
      return type === file.type
    })

    if (!fileType) {
      throw new Error(`File type ${file.type} not supported`)
    }
  }

  const onDrop = useCallback(
    async (acceptedFiles: File[]) => {
      if (disabled) return

      try {
        setError(null)
        const newFiles = acceptedFiles.slice(0, maxFiles - files.length)

        // Validate each file
        newFiles.forEach(validateFile)

        setFiles(prev => [...prev, ...newFiles])
        onFileSelect(newFiles)

        // Simulate upload progress
        setUploading(true)
        setUploadProgress(0)
        const interval = setInterval(() => {
          setUploadProgress(prev => {
            if (prev >= 100) {
              clearInterval(interval)
              setUploading(false)
              return 100
            }
            return prev + 10
          })
        }, 200)
      } catch (err) {
        console.error("Error handling files:", err)
        setError({
          message:
            err instanceof Error ? err.message : "Failed to process files"
        })
      }
    },
    [disabled, files.length, maxFiles, onFileSelect]
  )

  const { getRootProps, getInputProps, isDragActive, isDragReject } =
    useDropzone({
      onDrop,
      disabled,
      maxFiles,
      maxSize,
      accept
    })

  const removeFile = (index: number) => {
    setFiles(prev => prev.filter((_, i) => i !== index))
    setError(null)
  }

  return (
    <div className="w-full space-y-4">
      <div
        {...getRootProps()}
        className={cn(
          "cursor-pointer rounded-lg border-2 border-dashed p-4 text-center transition-colors",
          isDragActive && !isDragReject
            ? "border-primary bg-primary/10"
            : "border-muted-foreground/25 hover:border-primary/50",
          isDragReject && "border-destructive bg-destructive/10",
          disabled && "cursor-not-allowed opacity-50"
        )}
      >
        <input {...getInputProps()} />
        <div className="flex flex-col items-center gap-2">
          <Upload
            className={cn(
              "size-8",
              isDragReject ? "text-destructive" : "text-muted-foreground"
            )}
          />
          <p className="text-muted-foreground text-sm">
            {isDragActive
              ? isDragReject
                ? "Some files are not allowed"
                : "Drop files here"
              : "Drag & drop files here, or click to select"}
          </p>
        </div>
      </div>

      {error && (
        <Alert variant="destructive">
          <AlertCircle className="size-4" />
          <AlertDescription>{error.message}</AlertDescription>
        </Alert>
      )}

      {files.length > 0 && (
        <div className="space-y-2">
          {files.map((file, index) => (
            <div
              key={index}
              className="flex items-center justify-between rounded-lg border p-2"
            >
              <div className="flex items-center gap-2">
                <File className="text-muted-foreground size-4" />
                <span className="max-w-[200px] truncate text-sm">
                  {file.name}
                </span>
                <span className="text-muted-foreground text-xs">
                  ({Math.round(file.size / 1024)}KB)
                </span>
              </div>
              <Button
                variant="ghost"
                size="icon"
                className="size-8"
                onClick={() => removeFile(index)}
              >
                <X className="size-4" />
              </Button>
            </div>
          ))}
        </div>
      )}

      {uploading && (
        <div className="space-y-2">
          <div className="text-muted-foreground flex items-center gap-2 text-sm">
            <Loader2 className="size-3 animate-spin" />
            <span>Uploading...</span>
          </div>
          <Progress value={uploadProgress} className="h-2" />
        </div>
      )}
    </div>
  )
}
