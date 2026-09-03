"use client"

// A THIN WRAPPER over `.lw-tabs` in base.css — the underline strip, not
// shadcn's pill tray. Only the List carries a class: base.css keys the trigger
// off `[role="tab"][aria-selected="true"]`, which Radix sets, so the Trigger
// needs nothing and Content is unstyled. Needs base.css loaded.

import * as React from "react"
import { Tabs as TabsPrimitive } from "radix-ui"

import { cn } from "@/lib/utils"

const Tabs = TabsPrimitive.Root

const TabsList = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.List>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.List>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.List
    data-slot="tabs"
    ref={ref}
    className={cn("lw-tabs", className)}
    {...props}
  />
))
TabsList.displayName = TabsPrimitive.List.displayName

const TabsTrigger = TabsPrimitive.Trigger

const TabsContent = TabsPrimitive.Content

export { Tabs, TabsList, TabsTrigger, TabsContent }
