import * as React from "react"
import { AlertCircleIcon, InboxIcon } from "lucide-react"

import { cn } from "@/lib/utils"
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty"
import { Spinner } from "@/components/ui/spinner"

type StateViewProps = Omit<React.ComponentProps<typeof Empty>, "title"> & {
  state: "empty" | "loading" | "error"
  title?: React.ReactNode
  description?: React.ReactNode
  icon?: React.ReactNode
  /** Buttons or links: "Create one", "Retry". */
  action?: React.ReactNode
}

const DEFAULT_TITLE = { empty: "Nothing here yet", loading: "Loading", error: "Something went wrong" }

function StateView({ state, title, description, icon, action, className, ...props }: StateViewProps) {
  const media =
    icon ??
    (state === "loading" ? (
      <Spinner className="size-5" />
    ) : state === "error" ? (
      <AlertCircleIcon />
    ) : (
      <InboxIcon />
    ))
  return (
    <Empty
      data-slot="state-view"
      data-state={state}
      role={state === "error" ? "alert" : state === "loading" ? "status" : undefined}
      aria-busy={state === "loading" || undefined}
      className={className}
      {...props}
    >
      <EmptyHeader>
        <EmptyMedia variant="icon" className={cn(state === "error" && "bg-destructive-soft text-destructive-soft-foreground")}>
          {media}
        </EmptyMedia>
        <EmptyTitle>{title ?? DEFAULT_TITLE[state]}</EmptyTitle>
        {description != null && <EmptyDescription>{description}</EmptyDescription>}
      </EmptyHeader>
      {action != null && <EmptyContent>{action}</EmptyContent>}
    </Empty>
  )
}

export { StateView, type StateViewProps }
