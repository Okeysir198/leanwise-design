"use client"

import * as React from "react"
import { FileIcon, UploadIcon, XIcon } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

type FileUploadProps = Omit<React.ComponentProps<"div">, "onChange"> & {
  value: File[]
  onValueChange: (files: File[]) => void
  accept?: string
  multiple?: boolean
  disabled?: boolean
  /** Bytes. Larger files are dropped and reported through onReject. */
  maxSize?: number
  onReject?: (files: File[]) => void
  label?: React.ReactNode
  hint?: React.ReactNode
}

const formatSize = (n: number) =>
  n < 1024 ? `${n} B` : n < 1048576 ? `${(n / 1024).toFixed(1)} KB` : `${(n / 1048576).toFixed(1)} MB`

function FileUpload({
  value,
  onValueChange,
  accept,
  multiple = false,
  disabled = false,
  maxSize,
  onReject,
  label = "Drop files here or browse",
  hint,
  className,
  ...props
}: FileUploadProps) {
  const inputRef = React.useRef<HTMLInputElement>(null)
  const [dragging, setDragging] = React.useState(false)

  const add = (list: FileList | null) => {
    if (!list) return
    const files = Array.from(list)
    const ok = maxSize ? files.filter((f) => f.size <= maxSize) : files
    const rejected = files.filter((f) => !ok.includes(f))
    if (rejected.length) onReject?.(rejected)
    onValueChange(multiple ? [...value, ...ok] : ok.slice(0, 1))
  }

  return (
    <div data-slot="file-upload" className={cn("grid gap-2", className)} {...props}>
      <div
        data-slot="file-upload-dropzone"
        data-dragging={dragging || undefined}
        data-disabled={disabled || undefined}
        onDragOver={(e) => {
          e.preventDefault()
          if (!disabled) setDragging(true)
        }}
        onDragLeave={() => setDragging(false)}
        onDrop={(e) => {
          e.preventDefault()
          setDragging(false)
          if (!disabled) add(e.dataTransfer.files)
        }}
        className={cn(
          "border-input flex flex-col items-center gap-2 rounded-lg border border-dashed p-6 text-center transition-colors",
          "data-[dragging]:border-primary data-[dragging]:bg-accent data-[disabled]:opacity-50"
        )}
      >
        <UploadIcon className="text-muted-foreground size-5" aria-hidden />
        <p className="text-sm font-medium">{label}</p>
        {hint != null && <p className="text-muted-foreground text-xs">{hint}</p>}
        <Button type="button" variant="outline" size="sm" disabled={disabled} onClick={() => inputRef.current?.click()}>
          Browse
        </Button>
        <input
          ref={inputRef}
          type="file"
          className="sr-only"
          tabIndex={-1}
          accept={accept}
          multiple={multiple}
          disabled={disabled}
          onChange={(e) => {
            add(e.target.files)
            e.target.value = ""
          }}
        />
      </div>
      {value.length > 0 && (
        <ul data-slot="file-upload-list" className="grid gap-1">
          {value.map((file, i) => (
            <li key={`${file.name}-${i}`} className="flex items-center gap-2 rounded-md border px-3 py-2 text-sm">
              <FileIcon className="text-muted-foreground size-4 shrink-0" aria-hidden />
              <span className="min-w-0 flex-1 truncate">{file.name}</span>
              <span className="text-muted-foreground text-xs tabular-nums">{formatSize(file.size)}</span>
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="size-7"
                aria-label={`Remove ${file.name}`}
                disabled={disabled}
                onClick={() => onValueChange(value.filter((_, j) => j !== i))}
              >
                <XIcon />
              </Button>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export { FileUpload, type FileUploadProps }
