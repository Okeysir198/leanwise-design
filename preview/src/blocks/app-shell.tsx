import * as React from "react"

import { cn } from "@/lib/utils"
import { Separator } from "@/ui/separator"

type NavItem = { label: string; href?: string; icon?: React.ReactNode; current?: boolean; badge?: string }

type AppShellProps = {
  brand?: React.ReactNode
  nav: { group?: string; items: NavItem[] }[]
  header?: React.ReactNode
  footer?: React.ReactNode
  children?: React.ReactNode
  className?: string
}

function AppShell({ brand, nav, header, footer, children, className }: AppShellProps) {
  return (
    <div data-slot="app-shell" className={cn("bg-background text-foreground flex min-h-svh", className)}>
      <aside className="bg-sidebar text-sidebar-foreground border-sidebar-border hidden w-60 shrink-0 flex-col border-r md:flex">
        <div className="flex h-14 items-center px-4 font-semibold">{brand}</div>
        <nav aria-label="Main" className="flex flex-1 flex-col gap-4 overflow-y-auto p-2">
          {nav.map((g, i) => (
            <div key={i} className="flex flex-col gap-1">
              {g.group && <span className="text-muted-foreground px-2 py-1 text-xs font-medium">{g.group}</span>}
              {g.items.map((it) => (
                <a
                  key={it.label}
                  href={it.href ?? "#"}
                  aria-current={it.current ? "page" : undefined}
                  data-sidebar="menu-button"
                  data-active={it.current ? "true" : undefined}
                  className={cn(
                    "flex h-9 items-center gap-2 rounded-md px-2 text-sm [&_svg]:size-4",
                    it.current
                      ? "bg-sidebar-accent text-sidebar-accent-foreground font-medium"
                      : "hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                  )}
                >
                  {it.icon}
                  <span className="flex-1 truncate">{it.label}</span>
                  {it.badge && <span className="text-muted-foreground text-xs tabular-nums">{it.badge}</span>}
                </a>
              ))}
            </div>
          ))}
        </nav>
        {footer && (<><Separator /><div className="p-3">{footer}</div></>)}
      </aside>
      <div className="flex min-w-0 flex-1 flex-col">
        {header && <header className="flex h-14 items-center gap-3 border-b px-4 md:px-6">{header}</header>}
        <main id="main" className="flex-1 p-4 md:p-6">{children}</main>
      </div>
    </div>
  )
}

export { AppShell }
