import * as React from "react"

import { cn } from "@/lib/utils"

type SectionNavItem = { title: string; href: string; current?: boolean }

/* In-page section navigation (settings sections, docs contents): a thin rail with
   the current section marked by a brand segment. Lighter than the app sidebar.
   A #hash item is a place on this page, so it is aria-current="location"; "page"
   would claim it points at the page the reader is on. A route item stays "page". */
function SectionNav({
  items,
  className,
  "aria-label": ariaLabel = "Sections",
  ...props
}: React.ComponentProps<"nav"> & { items: SectionNavItem[] }) {
  return (
    <nav data-slot="section-nav" aria-label={ariaLabel} className={cn("text-sm", className)} {...props}>
      <ul data-slot="section-nav-list" className="border-border flex flex-col border-l">
        {items.map((item) => (
          <li key={item.href}>
            <a
              data-slot="section-nav-link"
              href={item.href}
              aria-current={item.current ? (item.href.startsWith("#") ? "location" : "page") : undefined}
              className={cn(
                "text-muted-foreground hover:text-foreground -ml-px block border-l-2 border-transparent px-3.5 py-1.5 transition-colors",
                "aria-[current=page]:border-primary aria-[current=page]:text-primary aria-[current=page]:font-medium",
                "aria-[current=location]:border-primary aria-[current=location]:text-primary aria-[current=location]:font-medium"
              )}
            >
              {item.title}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  )
}

export { SectionNav, type SectionNavItem }
