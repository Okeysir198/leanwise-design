import * as React from "react"

import { Separator } from "@/components/ui/separator"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"

type AppShellNavItem = {
  title: string
  href: string
  icon?: React.ComponentType<{ className?: string }>
  active?: boolean
}

type AppShellProps = React.ComponentProps<typeof SidebarProvider> & {
  brand: React.ReactNode
  nav: AppShellNavItem[]
  /** Right side of the top bar: search, theme toggle, account menu. */
  actions?: React.ReactNode
  /** Page title or breadcrumb, left of the top bar. */
  heading?: React.ReactNode
  footer?: React.ReactNode
}

function AppShell({ brand, nav, actions, heading, footer, children, className, ...props }: AppShellProps) {
  return (
    <SidebarProvider data-slot="app-shell" className={className} {...props}>
      <Sidebar collapsible="icon">
        <SidebarHeader>{brand}</SidebarHeader>
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupContent>
              <SidebarMenu>
                {nav.map(({ title, href, icon: Icon, active }) => (
                  <SidebarMenuItem key={href}>
                    <SidebarMenuButton asChild isActive={active} tooltip={title}>
                      <a href={href} aria-current={active ? "page" : undefined}>
                        {Icon && <Icon />}
                        <span>{title}</span>
                      </a>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
        {footer != null && <SidebarFooter>{footer}</SidebarFooter>}
      </Sidebar>
      <SidebarInset>
        <header
          data-slot="app-shell-header"
          className="bg-background/80 sticky top-0 z-10 flex h-14 shrink-0 items-center gap-2 border-b px-4 backdrop-blur"
        >
          <SidebarTrigger className="-ml-1" />
          <Separator orientation="vertical" className="mr-2 h-4 self-center" />
          <div className="min-w-0 flex-1 truncate font-medium">{heading}</div>
          {actions}
        </header>
        <main data-slot="app-shell-main" className="flex-1 p-4 md:p-6">
          {children}
        </main>
      </SidebarInset>
    </SidebarProvider>
  )
}

export { AppShell, type AppShellNavItem, type AppShellProps }
