/* GENERATED from colors.card.jsx by scripts/lib/card-build.mjs — do not edit. */
(() => {
  const { Card, CardContent } = window.LeanWiseDesign_f2d907;
  const GROUPS = [
    ["Surfaces", ["background", "foreground", "card", "popover", "muted", "muted-foreground", "border", "input"]],
    ["Brand", ["primary", "primary-foreground", "secondary", "accent", "ring", "navy", "cta", "cta-foreground"]],
    ["Status", ["success", "warning", "info", "destructive", "info-soft", "info-border", "destructive-soft", "destructive-border"]],
    ["Sidebar", ["sidebar", "sidebar-foreground", "sidebar-primary", "sidebar-accent", "sidebar-border"]]
  ];
  const RAMP = ["50", "100", "200", "300", "400", "500", "600", "700", "800", "900"];
  function Swatch({ name }) {
    return /* @__PURE__ */ React.createElement("div", { className: "flex flex-col gap-1.5" }, /* @__PURE__ */ React.createElement("div", { className: "h-14 rounded-md border", style: { background: `var(--${name})` } }), /* @__PURE__ */ React.createElement("span", { className: "font-mono text-xs" }, "--", name));
  }
  lwCard("Colors", "Every colour is a CSS variable from theme.css; a component names the role, never the value.", /* @__PURE__ */ React.createElement(React.Fragment, null, GROUPS.map(([title, names]) => /* @__PURE__ */ React.createElement("section", { key: title, className: "flex flex-col gap-3" }, /* @__PURE__ */ React.createElement("h2", { className: "text-sm font-semibold" }, title), /* @__PURE__ */ React.createElement("div", { className: "grid grid-cols-4 gap-4 md:grid-cols-8" }, names.map((n) => /* @__PURE__ */ React.createElement(Swatch, { key: n, name: n }))))), /* @__PURE__ */ React.createElement("section", { className: "flex flex-col gap-3" }, /* @__PURE__ */ React.createElement("h2", { className: "text-sm font-semibold" }, "Brand ramp"), /* @__PURE__ */ React.createElement(Card, { className: "py-4" }, /* @__PURE__ */ React.createElement(CardContent, { className: "grid grid-cols-10 gap-2" }, RAMP.map((s) => /* @__PURE__ */ React.createElement("div", { key: s, className: "flex flex-col gap-1.5" }, /* @__PURE__ */ React.createElement("div", { className: "h-12 rounded-md", style: { background: `var(--brand-${s})` } }), /* @__PURE__ */ React.createElement("span", { className: "font-mono text-xs" }, s))))))));
})();
