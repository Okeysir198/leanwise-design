// @dsCard group="Blocks" name="App shell" subtitle="Sidebar with the current-page bar, a header bar, and a section nav in the content" viewport="1200x760"
const { AppShell, SectionNav, Button, Input, KpiTile, Avatar, AvatarFallback } = window.LeanWiseDesign_f2d907;

const NAV = [
  { group: "Workspace", items: [
    { label: "Overview", current: true },
    { label: "Ask" },
    { label: "Sources", badge: "12" },
    { label: "Evaluations" },
  ] },
  { group: "Admin", items: [{ label: "Members" }, { label: "Settings" }] },
];

lwCard("App shell", "One rail for the whole product; only the current item changes per screen.", (
  <div className="overflow-hidden rounded-xl border">
    <AppShell
      className="min-h-[560px]"
      brand={<span className="text-primary">LeanWise AI</span>}
      nav={NAV}
      footer={<div className="flex items-center gap-2 text-sm"><Avatar className="size-7"><AvatarFallback className="text-xs">JT</AvatarFallback></Avatar>Jamie Tran</div>}
      header={<><span className="font-medium">Overview</span><Input className="ml-auto w-64" placeholder="Search" aria-label="Search" /><Button>New question</Button></>}
    >
      <div className="grid grid-cols-3 gap-4">
        <KpiTile label="Questions" value="12,480" delta="+8.2%" />
        <KpiTile label="Hit rate" value="91.4%" delta="+1.1 pt" />
        <KpiTile label="Latency" value="1.8 s" delta="+0.3 s" trend="down" />
      </div>
      <div className="mt-6 grid grid-cols-[180px_1fr] gap-7">
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
