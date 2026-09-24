import * as React from "react"
import { FileText, Upload, X } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/ui/button"
import { Progress } from "@/ui/progress"

type UploadItem = { name: string; size: string; progress?: number }

type FileUploadProps = {
  accept?: string
  hint?: string
  files?: UploadItem[]
  onFiles?: (files: File[]) => void
  onRemove?: (name: string) => void
  className?: string
}

function FileUpload({ accept, hint = "PDF, DOCX or TXT up to 20 MB", files = [], onFiles, onRemove, className }: FileUploadProps) {
  const input = React.useRef<HTMLInputElement>(null)
  const [over, setOver] = React.useState(false)
  return (
    <div data-slot="file-upload" className={cn("flex flex-col gap-3", className)}>
      <div
        onDragOver={(e) => { e.preventDefault(); setOver(true) }}
        onDragLeave={() => setOver(false)}
        onDrop={(e) => { e.preventDefault(); setOver(false); onFiles?.(Array.from(e.dataTransfer.files)) }}
        className={cn(
          "flex flex-col items-center gap-2 rounded-lg border border-dashed p-8 text-center transition-colors",
          over ? "border-primary bg-accent" : "border-input"
        )}
      >
        <span className="bg-muted text-muted-foreground flex size-10 items-center justify-center rounded-full">
          <Upload className="size-5" aria-hidden />
        </span>
        <p className="text-sm font-medium">Drop files here, or</p>
        <Button variant="outline" size="sm" onClick={() => input.current?.click()}>Choose files</Button>
        <p className="text-muted-foreground text-xs">{hint}</p>
        <input ref={input} type="file" multiple accept={accept} className="sr-only" aria-label="Choose files" onChange={(e) => onFiles?.(Array.from(e.target.files ?? []))} />
      </div>
      {files.length > 0 && (
        <ul className="flex flex-col gap-2">
          {files.map((f) => (
            <li key={f.name} className="flex items-center gap-3 rounded-md border p-3">
              <FileText className="text-muted-foreground size-4 shrink-0" aria-hidden />
              <div className="flex min-w-0 flex-1 flex-col gap-1.5">
                <div className="flex justify-between gap-2 text-sm">
                  <span className="truncate font-medium">{f.name}</span>
                  <span className="text-muted-foreground shrink-0 tabular-nums">{f.size}</span>
                </div>
                {f.progress !== undefined && f.progress < 100 && <Progress value={f.progress} aria-label={`Uploading ${f.name}`} />}
              </div>
              <Button variant="ghost" size="icon" className="size-7" aria-label={`Remove ${f.name}`} onClick={() => onRemove?.(f.name)}>
                <X />
              </Button>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export { FileUpload }
