import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  /**
 * Geometry and focus follow @leanwise/design's `.lw-btn` spec:
 *   height from --lw-control-h-* (DECLARED, never accumulated from padding — a
 *   padding-derived height drifts the moment the font changes, which this app just
 *   did), 18px horizontal padding, radius-md, 14px medium, -0.005em tracking,
 *   line-height 1.2, 16px glyphs, and a 2px brand focus ring rather than 1px.
 * The filled variants take an OFFSET OUTLINE instead of the ring: a brand ring on
 * a brand fill is 1:1 against it, and only a transparent gap shows the real ground.
 */
"inline-flex items-center justify-center cursor-pointer gap-btn-gap whitespace-nowrap rounded-md text-sm font-medium leading-control tracking-btn transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-icon [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default:
          "bg-primary text-primary-foreground shadow hover:bg-primary/90 focus-visible:ring-0 focus-visible:outline-2 focus-visible:outline-brand focus-visible:outline-offset-2",
        destructive:
          "bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90 focus-visible:ring-0 focus-visible:outline-2 focus-visible:outline-destructive-on focus-visible:outline-offset-2",
        outline:
          "border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground",
        secondary:
          "bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80",
        /**
         * THE CTA. Amber, and AT MOST ONE PER VIEW — the design system's token
         * lint enforces that (rule 4), and this file is the one place exempt from
         * it because it is the definition rather than a use.
         *
         * It exists because the migration removed the app's only high-energy
         * button colour: `--secondary` used to be yellow-400, so all 38
         * `variant="secondary"` sites shouted equally, which is the same as none
         * of them shouting. Secondary is now correctly grey. Promoting a view's
         * single most important action to `cta` is a product decision per screen,
         * deliberately NOT made in bulk here.
         *
         * Navy ink, not white: the amber fill is LIGHT and white on it measures
         * 1.9:1. `--cta-foreground` is navy at 10.54.
         */
        cta:
          "bg-cta text-cta-foreground shadow hover:bg-cta/90 focus-visible:ring-0 focus-visible:outline-2 focus-visible:outline-cta-on focus-visible:outline-offset-2",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        // 18px padding and the control-height scale are the design system's, not
        // Tailwind's: `padding: 0 18px` is ~0.45x the height, "the wide,
        // engineered stance rather than a cramped chip" (base.css).
        default: "h-control-md px-btn-x",
        sm: "h-control-sm px-btn-x-sm text-xs [&_svg]:size-icon-sm",
        lg: "h-control-lg px-btn-x-lg [&_svg]:size-icon-lg",
        icon: "size-control-md",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        data-slot="button"
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
