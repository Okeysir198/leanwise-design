import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { ArrowDownRightIcon, ArrowUpRightIcon } from "lucide-react"

import { cn } from "@/lib/utils"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

const kpiDeltaVariants = cva(
  "inline-flex items-center gap-0.5 text-xs font-medium tabular-nums",
  {
    variants: {
      trend: {
        up: "text-success",
        down: "text-destructive",
        flat: "text-muted-foreground",
      },
    },
    defaultVariants: { trend: "flat" },
  }
)

function KpiTile({
  label,
  value,
  delta,
  trend = "flat",
  hint,
  className,
  ...props
}: Omit<React.ComponentProps<typeof Card>, "children"> &
  VariantProps<typeof kpiDeltaVariants> & {
    label: React.ReactNode
    value: React.ReactNode
    delta?: React.ReactNode
    hint?: React.ReactNode
  }) {
  const Icon = trend === "up" ? ArrowUpRightIcon : trend === "down" ? ArrowDownRightIcon : null
  return (
    <Card data-slot="kpi-tile" className={cn("gap-2 py-4", className)} {...props}>
      <CardHeader className="px-4">
        <CardTitle className="text-muted-foreground text-sm font-medium">{label}</CardTitle>
      </CardHeader>
      <CardContent className="flex items-baseline gap-2 px-4">
        <span data-slot="kpi-value" className="text-2xl font-semibold tabular-nums">
          {value}
        </span>
        {delta != null && (
          <span data-slot="kpi-delta" className={kpiDeltaVariants({ trend })}>
            {Icon && <Icon className="size-3.5" aria-hidden />}
            {delta}
          </span>
        )}
      </CardContent>
      {hint != null && (
        <p data-slot="kpi-hint" className="text-muted-foreground px-4 text-xs">
          {hint}
        </p>
      )}
    </Card>
  )
}

export { KpiTile, kpiDeltaVariants }
