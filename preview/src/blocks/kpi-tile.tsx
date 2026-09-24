import * as React from "react"
import { ArrowDownRight, ArrowUpRight } from "lucide-react"

import { cn } from "@/lib/utils"
import { Card, CardContent } from "@/ui/card"

type KpiTileProps = React.ComponentProps<typeof Card> & {
  label: string
  value: React.ReactNode
  delta?: string
  trend?: "up" | "down"
  hint?: string
}

function KpiTile({ label, value, delta, trend = "up", hint, className, ...props }: KpiTileProps) {
  const Arrow = trend === "up" ? ArrowUpRight : ArrowDownRight
  return (
    <Card data-slot="kpi-tile" className={cn("gap-2 py-5", className)} {...props}>
      <CardContent className="flex flex-col gap-1">
        <span className="text-muted-foreground text-sm font-medium">{label}</span>
        <span className="text-3xl font-semibold tracking-tight tabular-nums">{value}</span>
        {(delta || hint) && (
          <span className="flex items-center gap-1 text-xs">
            {delta && (
              <span className={cn("inline-flex items-center gap-0.5 font-medium", trend === "up" ? "text-success" : "text-destructive")}>
                <Arrow className="size-3.5" aria-hidden />
                {delta}
              </span>
            )}
            {hint && <span className="text-muted-foreground">{hint}</span>}
          </span>
        )}
      </CardContent>
    </Card>
  )
}

export { KpiTile }
