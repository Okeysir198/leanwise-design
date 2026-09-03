"use client"

// A THIN WRAPPER over `.lw-switch` in base.css. The vanilla DOM is
// `label.lw-switch > input[type=checkbox] + span.track`, with the thumb as
// `.track::after` driven by `input:checked`. Radix renders
// `button[role=switch][data-state] > span[data-state]` — no input, so the
// sibling selectors cannot fire. The wrapper keeps the same child structure
// (`.track` + `.thumb`) and base.css keys the state off `[data-state]` on the
// root, so the two DOMs paint identically. Needs base.css loaded.

import * as React from "react"
import { Switch as SwitchPrimitive } from "radix-ui"

import { cn } from "@/lib/utils"

const Switch = React.forwardRef<
  React.ElementRef<typeof SwitchPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof SwitchPrimitive.Root>
>(({ className, ...props }, ref) => (
  <SwitchPrimitive.Root
    data-slot="switch"
    className={cn("lw-switch", className)}
    {...props}
    ref={ref}
  >
    <span className="track">
      <SwitchPrimitive.Thumb className="thumb" />
    </span>
  </SwitchPrimitive.Root>
))
Switch.displayName = SwitchPrimitive.Root.displayName

export { Switch }
