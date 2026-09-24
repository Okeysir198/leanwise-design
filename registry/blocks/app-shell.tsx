import * as React from "react"

import { Separator } from "@/components/ui/separator"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuBadge,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarRail,
  SidebarTrigger,
} from "@/components/ui/sidebar"

type AppShellNavItem = {
  title: string
  url: string
  icon?: React.ComponentType
  isActive?: boolean
  badge?: React.ReactNode
}

type AppShellNavGroup = { label?: string; items: AppShellNavItem[] }

type AppShellProps = React.ComponentProps<typeof SidebarProvider> & {
  /** Sidebar header: logo, team switcher. */
  brand?: React.ReactNode
  nav: AppShellNavGroup[]
  /** Sidebar footer: the user menu. */
  footer?: React.ReactNode
  /** Header, after the trigger: a stock Breadcrumb. */
  breadcrumb?: React.ReactNode
  /** Header, right side: search, theme toggle, primary action. */
  actions?: React.ReactNode
}

/* The shape of the stock sidebar-07 block, with the nav passed in as data. */
function AppShell({ brand, nav, footer, breadcrumb, actions, children, ...props }: AppShellProps) {
  return (
    <SidebarProvider {...props}>
      <Sidebar collapsible="icon">
        {brand != null && <SidebarHeader>{brand}</SidebarHeader>}
        <SidebarContent>
          {nav.map((group, i) => (
            <SidebarGroup key={group.label ?? i}>
              {group.label != null && <SidebarGroupLabel>{group.label}</SidebarGroupLabel>}
              <SidebarMenu>
                {group.items.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild isActive={item.isActive} tooltip={item.title}>
                      <a href={item.url} aria-current={item.isActive ? "page" : undefined}>
                        {item.icon && <item.icon />}
                        <span>{item.title}</span>
                      </a>
                    </SidebarMenuButton>
                    {item.badge != null && <SidebarMenuBadge>{item.badge}</SidebarMenuBadge>}
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroup>
          ))}
        </SidebarContent>
        {footer != null && <SidebarFooter>{footer}</SidebarFooter>}
        <SidebarRail />
      </Sidebar>
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 px-4 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
          <SidebarTrigger className="-ml-1" />
          <Separator orientation="vertical" className="mr-2 data-[orientation=vertical]:h-4" />
          {breadcrumb}
          {actions != null && <div className="ml-auto flex items-center gap-2">{actions}</div>}
        </header>
        <div className="flex flex-1 flex-col gap-4 p-4 pt-0">{children}</div>
      </SidebarInset>
    </SidebarProvider>
  )
}

export { AppShell, type AppShellNavGroup, type AppShellNavItem, type AppShellProps }
