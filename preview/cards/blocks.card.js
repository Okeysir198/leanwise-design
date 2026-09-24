/* GENERATED from blocks.card.jsx by scripts/lib/cards.mjs — do not edit. */
(() => {
  const { KpiTile, StateView, FileUpload } = window.LeanWiseDesign_f2d907;
  lwCard("KPI, state, upload", "Blocks compose primitives; they add layout, never new colours.", /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement("div", { className: "grid grid-cols-4 gap-4" }, /* @__PURE__ */ React.createElement(KpiTile, { label: "Questions answered", value: "12,480", delta: "+8.2%", hint: "vs last week" }), /* @__PURE__ */ React.createElement(KpiTile, { label: "Hit rate", value: "91.4%", delta: "+1.1 pt" }), /* @__PURE__ */ React.createElement(KpiTile, { label: "Median latency", value: "1.8 s", delta: "+0.3 s", trend: "down" }), /* @__PURE__ */ React.createElement(KpiTile, { label: "Sources", value: "12", hint: "3 syncing" })), /* @__PURE__ */ React.createElement("div", { className: "grid grid-cols-3 gap-4" }, /* @__PURE__ */ React.createElement(StateView, { state: "loading" }), /* @__PURE__ */ React.createElement(StateView, { state: "empty", title: "No answers yet", description: "Ask a question to see it here.", action: { label: "Ask a question" } }), /* @__PURE__ */ React.createElement(StateView, { state: "error", description: "The search index is unreachable.", action: { label: "Retry" } })), /* @__PURE__ */ React.createElement(FileUpload, { files: [
    { name: "master-services-agreement.pdf", size: "2.4 MB", progress: 64 },
    { name: "handbook-2026.docx", size: "860 KB", progress: 100 }
  ] })));
})();
