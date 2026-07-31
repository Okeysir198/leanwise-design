import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const badgeVariants = cva(
  "inline-flex items-center rounded-full border font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        // Base variants
        default:
          "border-transparent bg-primary text-primary-foreground shadow hover:bg-primary/90",
        secondary:
          "border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/90",
        destructive:
          "border-transparent bg-destructive text-destructive-foreground shadow hover:bg-destructive/90",
        success:
          "border-transparent bg-success text-success-foreground shadow hover:bg-success/90",
        warning:
          "border-transparent bg-warning text-warning-foreground shadow hover:bg-warning/90",
        info:
          "border-transparent bg-info text-info-foreground shadow hover:bg-info/90",
        outline:
          "text-foreground border-border",

        // NOTE what is NOT here. The seed for this file carried twenty more
        // variants — `parsing`, `checking`, `queue`, `complete`, `error` and the
        // rest. Those are one product's vocabulary, not the design system's: a
        // second app has different states and would inherit names that mean
        // nothing to it. The system ships the five ROLES plus outline; a product
        // composes its own states from `bg-*-soft` / `text-*-on` on top.
      },
      size: {
        sm: "h-5 px-2 py-0.5 text-xs gap-1",
        default: "h-6 px-2.5 py-1 text-xs gap-1.5",
        lg: "h-7 px-3 py-1.5 text-sm gap-2",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, size, ...props }: BadgeProps) {
  return (
    <div
 data-slot="badge"
 className={cn(badgeVariants({ variant, size }), className)} {...props} />
  )
}

export { Badge, badgeVariants }
