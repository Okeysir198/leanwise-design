import * as React from "react"
import { AlertCircle, Inbox } from "lucide-react"

import { Button } from "@/ui/button"
import { Empty, EmptyContent, EmptyDescription, EmptyHeader, EmptyMedia, EmptyTitle } from "@/ui/empty"
import { Skeleton } from "@/ui/skeleton"

type StateViewProps = {
  state: "loading" | "empty" | "error" | "ready"
  title?: string
  description?: string
  action?: { label: string; onClick?: () => void }
  rows?: number
  children?: React.ReactNode
}

function StateView({ state, title, description, action, rows = 3, children }: StateViewProps) {
  if (state === "ready") return <>{children}</>
  if (state === "loading") {
    return (
      <div data-slot="state-view" aria-busy="true" className="flex flex-col gap-3">
        {Array.from({ length: rows }, (_, i) => <Skeleton key={i} className="h-10 w-full" />)}
      </div>
    )
  }
  const error = state === "error"
  const Icon = error ? AlertCircle : Inbox
  return (
    <Empty data-slot="state-view" role={error ? "alert" : undefined} className="border">
      <EmptyHeader>
        <EmptyMedia variant="icon" className={error ? "bg-destructive-soft text-destructive-soft-foreground" : undefined}>
          <Icon />
        </EmptyMedia>
        <EmptyTitle>{title ?? (error ? "Something went wrong" : "Nothing here yet")}</EmptyTitle>
        {description && <EmptyDescription>{description}</EmptyDescription>}
      </EmptyHeader>
      {action && (
        <EmptyContent>
          <Button variant={error ? "outline" : "default"} onClick={action.onClick}>{action.label}</Button>
        </EmptyContent>
      )}
    </Empty>
  )
}

export { StateView }
