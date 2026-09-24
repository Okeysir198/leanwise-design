/* GENERATED from app-shell.card.jsx by scripts/lib/card-build.mjs — do not edit. */
(() => {
  const {
    AppShell,
    SectionNav,
    Button,
    Input,
    Avatar,
    AvatarFallback,
    Badge,
    Card,
    CardHeader,
    CardDescription,
    CardTitle,
    CardAction,
    Breadcrumb,
    BreadcrumbList,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbPage,
    BreadcrumbSeparator
  } = window.LeanWiseDesign_f2d907;
  const NAV = [
    { label: "Workspace", items: [
      { title: "Overview", url: "#overview", isActive: true },
      { title: "Ask", url: "#ask" },
      { title: "Sources", url: "#sources", badge: "12" },
      { title: "Evaluations", url: "#evaluations" }
    ] },
    { label: "Admin", items: [{ title: "Members", url: "#members" }, { title: "Settings", url: "#settings" }] }
  ];
  const METRICS = [
    { label: "Questions", value: "12,480", delta: "+8.2%" },
    { label: "Hit rate", value: "91.4%", delta: "+1.1 pt" },
    { label: "Latency", value: "1.8 s", delta: "+0.3 s" }
  ];
  lwCard("App shell", "One rail for the whole product; only the current item changes per screen.", /* @__PURE__ */ React.createElement("div", { className: "overflow-hidden rounded-xl border [&_[data-slot=sidebar-container]]:absolute [&_[data-slot=sidebar-wrapper]]:relative" }, /* @__PURE__ */ React.createElement(
    AppShell,
    {
      className: "min-h-[560px]",
      brand: /* @__PURE__ */ React.createElement("span", { className: "text-primary px-2 py-1 font-semibold" }, "LeanWise AI"),
      nav: NAV,
      footer: /* @__PURE__ */ React.createElement("div", { className: "flex items-center gap-2 p-2 text-sm" }, /* @__PURE__ */ React.createElement(Avatar, { className: "size-7" }, /* @__PURE__ */ React.createElement(AvatarFallback, { className: "text-xs" }, "JT")), "Jamie Tran"),
      breadcrumb: /* @__PURE__ */ React.createElement(Breadcrumb, null, /* @__PURE__ */ React.createElement(BreadcrumbList, null, /* @__PURE__ */ React.createElement(BreadcrumbItem, null, /* @__PURE__ */ React.createElement(BreadcrumbLink, { href: "#workspace" }, "Workspace")), /* @__PURE__ */ React.createElement(BreadcrumbSeparator, null), /* @__PURE__ */ React.createElement(BreadcrumbItem, null, /* @__PURE__ */ React.createElement(BreadcrumbPage, null, "Overview")))),
      actions: /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement(Input, { className: "w-56", placeholder: "Search", "aria-label": "Search" }), /* @__PURE__ */ React.createElement(Button, null, "New question"))
    },
    /* @__PURE__ */ React.createElement("div", { className: "grid grid-cols-3 gap-4" }, METRICS.map((m) => /* @__PURE__ */ React.createElement(Card, { key: m.label, className: "@container/card" }, /* @__PURE__ */ React.createElement(CardHeader, null, /* @__PURE__ */ React.createElement(CardDescription, null, m.label), /* @__PURE__ */ React.createElement(CardTitle, { className: "text-2xl font-semibold tabular-nums" }, m.value), /* @__PURE__ */ React.createElement(CardAction, null, /* @__PURE__ */ React.createElement(Badge, { variant: "outline" }, m.delta)))))),
    /* @__PURE__ */ React.createElement("div", { className: "mt-2 grid grid-cols-[180px_1fr] gap-7" }, /* @__PURE__ */ React.createElement(SectionNav, { "aria-label": "Overview sections", items: [
      { title: "Summary", href: "#summary", current: true },
      { title: "Sources", href: "#sources" },
      { title: "Evaluations", href: "#evaluations" },
      { title: "Usage", href: "#usage" }
    ] }), /* @__PURE__ */ React.createElement("p", { className: "text-muted-foreground text-sm" }, "The sidebar marks the current page with a tint and a brand bar; the section nav marks the current section on a thin rail."))
  )));
})();
