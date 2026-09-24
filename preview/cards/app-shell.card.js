/* GENERATED from app-shell.card.jsx by scripts/lib/cards.mjs — do not edit. */
(() => {
  const { AppShell, Button, Input, KpiTile, Avatar, AvatarFallback } = window.LeanWiseDesign_f2d907;
  const NAV = [
    { group: "Workspace", items: [
      { label: "Overview", current: true },
      { label: "Ask" },
      { label: "Sources", badge: "12" },
      { label: "Evaluations" }
    ] },
    { group: "Admin", items: [{ label: "Members" }, { label: "Settings" }] }
  ];
  lwCard("App shell", "One rail for the whole product; only the current item changes per screen.", /* @__PURE__ */ React.createElement("div", { className: "overflow-hidden rounded-xl border" }, /* @__PURE__ */ React.createElement(
    AppShell,
    {
      className: "min-h-[560px]",
      brand: /* @__PURE__ */ React.createElement("span", { className: "text-primary" }, "LeanWise AI"),
      nav: NAV,
      footer: /* @__PURE__ */ React.createElement("div", { className: "flex items-center gap-2 text-sm" }, /* @__PURE__ */ React.createElement(Avatar, { className: "size-7" }, /* @__PURE__ */ React.createElement(AvatarFallback, { className: "text-xs" }, "JT")), "Jamie Tran"),
      header: /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement("span", { className: "font-medium" }, "Overview"), /* @__PURE__ */ React.createElement(Input, { className: "ml-auto w-64", placeholder: "Search", "aria-label": "Search" }), /* @__PURE__ */ React.createElement(Button, null, "New question"))
    },
    /* @__PURE__ */ React.createElement("div", { className: "grid grid-cols-3 gap-4" }, /* @__PURE__ */ React.createElement(KpiTile, { label: "Questions", value: "12,480", delta: "+8.2%" }), /* @__PURE__ */ React.createElement(KpiTile, { label: "Hit rate", value: "91.4%", delta: "+1.1 pt" }), /* @__PURE__ */ React.createElement(KpiTile, { label: "Latency", value: "1.8 s", delta: "+0.3 s", trend: "down" }))
  )));
})();
