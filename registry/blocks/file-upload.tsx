"use client"

import * as React from "react"
import { FileIcon, UploadIcon, XIcon } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty"
import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemGroup,
  ItemMedia,
  ItemTitle,
} from "@/components/ui/item"
import { Progress } from "@/components/ui/progress"

type FileUploadProps = Omit<React.ComponentProps<"div">, "onChange"> & {
  value: File[]
  onValueChange: (files: File[]) => void
  accept?: string
  multiple?: boolean
  disabled?: boolean
  /** Bytes. Larger files are dropped and reported through onReject. */
  maxSize?: number
  onReject?: (files: File[]) => void
  /** Upload percentage per file, by index into value. */
  progress?: (number | undefined)[]
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
  progress,
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
      <Empty
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
        className="border md:p-6 data-[dragging]:border-primary data-[dragging]:bg-accent data-[disabled]:opacity-50"
      >
        <EmptyHeader>
          <EmptyMedia variant="icon">
            <UploadIcon />
          </EmptyMedia>
          <EmptyTitle>{label}</EmptyTitle>
          {hint != null && <EmptyDescription>{hint}</EmptyDescription>}
        </EmptyHeader>
        <EmptyContent>
          <Button type="button" variant="outline" size="sm" disabled={disabled} onClick={() => inputRef.current?.click()}>
            Browse
          </Button>
          <input
            ref={inputRef}
            type="file"
            className="sr-only"
            tabIndex={-1}
            aria-hidden
            accept={accept}
            multiple={multiple}
            disabled={disabled}
            onChange={(e) => {
              add(e.target.files)
              e.target.value = ""
            }}
          />
        </EmptyContent>
      </Empty>
      {value.length > 0 && (
        <ItemGroup data-slot="file-upload-list" className="gap-2">
          {value.map((file, i) => {
            const pct = progress?.[i]
            return (
              <Item key={`${file.name}-${i}`} role="listitem" variant="outline" size="sm">
                <ItemMedia variant="icon">
                  <FileIcon />
                </ItemMedia>
                <ItemContent>
                  <ItemTitle>{file.name}</ItemTitle>
                  <ItemDescription className="tabular-nums">
                    {formatSize(file.size)}
                    {pct != null && pct < 100 && ` · ${pct}%`}
                  </ItemDescription>
                  {pct != null && pct < 100 && <Progress value={pct} aria-label={`Uploading ${file.name}`} />}
                </ItemContent>
                <ItemActions>
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
                </ItemActions>
              </Item>
            )
          })}
        </ItemGroup>
      )}
    </div>
  )
}

export { FileUpload, type FileUploadProps }
