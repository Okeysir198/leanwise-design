/* GENERATED from blocks.card.jsx by scripts/lib/card-build.mjs — do not edit. */
(() => {
  const {
    Card,
    CardHeader,
    CardDescription,
    CardTitle,
    CardAction,
    CardFooter,
    Badge,
    Button,
    StateView,
    FileUpload,
    TrendingUpIcon,
    TrendingDownIcon
  } = window.LeanWiseDesign_f2d907;
  const METRICS = [
    { label: "Questions answered", value: "12,480", delta: "+8.2%", up: true, line: "Up this week", note: "vs last week" },
    { label: "Hit rate", value: "91.4%", delta: "+1.1 pt", up: true, line: "Steady gains", note: "Answers citing a source" },
    { label: "Median latency", value: "1.8 s", delta: "+0.3 s", up: false, line: "Slower this week", note: "Index rebuild in progress" },
    { label: "Sources", value: "12", delta: "+2", up: true, line: "3 syncing", note: "Connected this month" }
  ];
  const FILES = [
    new File([new Uint8Array(2516582)], "master-services-agreement.pdf"),
    new File([new Uint8Array(880640)], "handbook-2026.docx")
  ];
  lwCard("Section cards, state, upload", "Blocks compose stock primitives; they add layout, never new colours.", /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement("div", { className: "grid grid-cols-4 gap-4 *:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card *:data-[slot=card]:shadow-xs dark:*:data-[slot=card]:bg-card" }, METRICS.map((m) => /* @__PURE__ */ React.createElement(Card, { key: m.label, className: "@container/card" }, /* @__PURE__ */ React.createElement(CardHeader, null, /* @__PURE__ */ React.createElement(CardDescription, null, m.label), /* @__PURE__ */ React.createElement(CardTitle, { className: "text-2xl font-semibold tabular-nums @[250px]/card:text-3xl" }, m.value), /* @__PURE__ */ React.createElement(CardAction, null, /* @__PURE__ */ React.createElement(Badge, { variant: "outline" }, m.up ? /* @__PURE__ */ React.createElement(TrendingUpIcon, null) : /* @__PURE__ */ React.createElement(TrendingDownIcon, null), m.delta))), /* @__PURE__ */ React.createElement(CardFooter, { className: "flex-col items-start gap-1.5 text-sm" }, /* @__PURE__ */ React.createElement("div", { className: "line-clamp-1 flex gap-2 font-medium" }, m.line, " ", m.up ? /* @__PURE__ */ React.createElement(TrendingUpIcon, { className: "size-4" }) : /* @__PURE__ */ React.createElement(TrendingDownIcon, { className: "size-4" })), /* @__PURE__ */ React.createElement("div", { className: "text-muted-foreground" }, m.note))))), /* @__PURE__ */ React.createElement("div", { className: "grid grid-cols-3 gap-4" }, /* @__PURE__ */ React.createElement(StateView, { className: "border border-dashed", state: "loading", description: "Fetching the latest answers." }), /* @__PURE__ */ React.createElement(StateView, { className: "border border-dashed", state: "empty", title: "No answers yet", description: "Ask a question to see it here.", action: /* @__PURE__ */ React.createElement(Button, null, "Ask a question") }), /* @__PURE__ */ React.createElement(StateView, { className: "border border-dashed", state: "error", description: "The search index is unreachable.", action: /* @__PURE__ */ React.createElement(Button, { variant: "outline" }, "Retry") })), /* @__PURE__ */ React.createElement(FileUpload, { value: FILES, onValueChange: () => {
  }, multiple: true, progress: [64], hint: "PDF or DOCX, up to 25 MB" })));
})();
