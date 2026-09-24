/* GENERATED from type.card.jsx by scripts/lib/card-build.mjs — do not edit. */
(() => {
  const SCALE = [
    ["text-display", "Knowledge, answered"],
    ["text-display-sm", "Knowledge, answered"],
    ["text-3xl", "Page title"],
    ["text-2xl", "Section heading"],
    ["text-xl", "Card title"],
    ["text-lg", "Lead paragraph"],
    ["text-base", "Long-form body copy reads at sixteen pixels."],
    ["text-sm", "App body copy and controls sit at fourteen."],
    ["text-xs", "Captions and meta \u2014 the floor."]
  ];
  lwCard("Type scale", "Size and line-height come in pairs; tracking tightens as size grows.", /* @__PURE__ */ React.createElement("div", { className: "flex flex-col divide-y" }, SCALE.map(([cls, sample]) => /* @__PURE__ */ React.createElement("div", { key: cls, className: "grid grid-cols-[10rem_1fr] items-baseline gap-6 py-3" }, /* @__PURE__ */ React.createElement("span", { className: "text-muted-foreground font-mono text-xs" }, cls), /* @__PURE__ */ React.createElement("span", { className: `${cls} ${/display|3xl|2xl/.test(cls) ? "font-semibold tracking-tight" : ""}` }, sample))), /* @__PURE__ */ React.createElement("div", { className: "grid grid-cols-[10rem_1fr] items-baseline gap-6 py-3" }, /* @__PURE__ */ React.createElement("span", { className: "text-muted-foreground font-mono text-xs" }, "font-mono"), /* @__PURE__ */ React.createElement("span", { className: "font-mono text-sm" }, 'const answer = await ask("policy?") // 0.94'))));
})();
