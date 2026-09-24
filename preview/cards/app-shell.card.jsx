// @dsCard group="Blocks" name="App shell" subtitle="Stock sidebar-07 shape: sidebar with the current-page bar, breadcrumb header, section nav in the content" viewport="1200x760"
const {
  AppShell, SectionNav, Button, Input, Avatar, AvatarFallback, Badge,
  Card, CardHeader, CardDescription, CardTitle, CardAction,
  HomeIcon, MessageSquareIcon, DatabaseIcon, FlaskConicalIcon, UsersIcon, SettingsIcon, GalleryVerticalEndIcon, TrendingUpIcon, TrendingDownIcon,
  Breadcrumb, BreadcrumbList, BreadcrumbItem, BreadcrumbLink, BreadcrumbPage, BreadcrumbSeparator,
} = window.LeanWiseDesign_f2d907;

const NAV = [
  { label: "Workspace", items: [
    { title: "Overview", icon: HomeIcon, url: "#overview", isActive: true },
    { title: "Ask", icon: MessageSquareIcon, url: "#ask" },
    { title: "Sources", icon: DatabaseIcon, url: "#sources", badge: "12" },
    { title: "Evaluations", icon: FlaskConicalIcon, url: "#evaluations" },
  ] },
  { label: "Admin", items: [{ title: "Members", icon: UsersIcon, url: "#members" }, { title: "Settings", icon: SettingsIcon, url: "#settings" }] },
];

const METRICS = [
  { label: "Questions", value: "12,480", delta: "+8.2%", up: true },
  { label: "Hit rate", value: "91.4%", delta: "+1.1 pt", up: true },
  { label: "Latency", value: "1.8 s", delta: "+0.3 s" },
];

lwCard("App shell", "One rail for the whole product; only the current item changes per screen.", (
  <div className="overflow-hidden rounded-xl border [&_[data-slot=sidebar-container]]:absolute [&_[data-slot=sidebar-wrapper]]:relative">
    <AppShell
      className="min-h-[560px]"
      brand={<div className="flex items-center gap-2 p-2"><div className="bg-primary text-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg"><GalleryVerticalEndIcon className="size-4" /></div><div className="grid flex-1 text-left text-sm leading-tight"><span className="truncate font-medium">LeanWise AI</span><span className="text-muted-foreground truncate text-xs">Acme Legal</span></div></div>}
      nav={NAV}
      footer={<div className="flex items-center gap-2 p-2 text-sm"><Avatar className="size-7"><AvatarFallback className="text-xs">JT</AvatarFallback></Avatar>Jamie Tran</div>}
      breadcrumb={
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem><BreadcrumbLink href="#workspace">Workspace</BreadcrumbLink></BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem><BreadcrumbPage>Overview</BreadcrumbPage></BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      }
      actions={<><Input className="w-56" placeholder="Search" aria-label="Search" /><Button>New question</Button></>}
    >
      <div className="grid grid-cols-3 gap-4 *:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card *:data-[slot=card]:shadow-xs dark:*:data-[slot=card]:bg-card">
        {METRICS.map((m) => (
          <Card key={m.label} className="@container/card">
            <CardHeader>
              <CardDescription>{m.label}</CardDescription>
              <CardTitle className="text-2xl font-semibold tabular-nums">{m.value}</CardTitle>
              <CardAction><Badge variant="outline">{m.up ? <TrendingUpIcon /> : <TrendingDownIcon />}{m.delta}</Badge></CardAction>
            </CardHeader>
          </Card>
        ))}
      </div>
      <div className="mt-2 grid grid-cols-[180px_1fr] gap-7">
        <SectionNav aria-label="Overview sections" items={[
          { title: "Summary", href: "#summary", current: true },
          { title: "Sources", href: "#sources" },
          { title: "Evaluations", href: "#evaluations" },
          { title: "Usage", href: "#usage" },
        ]} />
        <p className="text-muted-foreground text-sm">The sidebar marks the current page with a tint and a brand bar; the section nav marks the current section on a thin rail.</p>
      </div>
    </AppShell>
  </div>
));
