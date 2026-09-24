/* GENERATED from data.card.jsx by scripts/lib/cards.mjs — do not edit. */
(() => {
  const {
    Table,
    TableHeader,
    TableBody,
    TableRow,
    TableHead,
    TableCell,
    TableCaption,
    Badge,
    Progress,
    Skeleton,
    Avatar,
    AvatarFallback
  } = window.LeanWiseDesign_f2d907;
  const ROWS = [
    ["Contracts / 2024", "RO", "1,284", 94, "Live"],
    ["Policy handbook", "JT", "312", 88, "Live"],
    ["Support transcripts", "ML", "9,015", 71, "Stale"],
    ["Legacy wiki", "RO", "476", 0, "Failed"]
  ];
  const STATUS = {
    Live: "border-transparent bg-success text-success-foreground",
    Stale: "border-transparent bg-warning text-warning-foreground",
    Failed: "border-transparent bg-destructive-soft text-destructive-soft-foreground"
  };
  lwCard("Data", "Numbers right-aligned and tabular; status is a Badge carrying a role colour, never a raw hue.", /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement("div", { className: "rounded-lg border" }, /* @__PURE__ */ React.createElement(Table, null, /* @__PURE__ */ React.createElement(TableCaption, { className: "pb-3" }, "Sources in this workspace"), /* @__PURE__ */ React.createElement(TableHeader, null, /* @__PURE__ */ React.createElement(TableRow, null, /* @__PURE__ */ React.createElement(TableHead, { className: "pl-4" }, "Source"), /* @__PURE__ */ React.createElement(TableHead, null, "Owner"), /* @__PURE__ */ React.createElement(TableHead, { className: "text-right" }, "Docs"), /* @__PURE__ */ React.createElement(TableHead, { className: "w-48" }, "Hit rate"), /* @__PURE__ */ React.createElement(TableHead, { className: "pr-4" }, "Status"))), /* @__PURE__ */ React.createElement(TableBody, null, ROWS.map(([src, owner, docs, hit, st]) => /* @__PURE__ */ React.createElement(TableRow, { key: src }, /* @__PURE__ */ React.createElement(TableCell, { className: "pl-4 font-medium" }, src), /* @__PURE__ */ React.createElement(TableCell, null, /* @__PURE__ */ React.createElement(Avatar, { className: "size-7" }, /* @__PURE__ */ React.createElement(AvatarFallback, { className: "text-xs" }, owner))), /* @__PURE__ */ React.createElement(TableCell, { className: "text-right tabular-nums" }, docs), /* @__PURE__ */ React.createElement(TableCell, null, /* @__PURE__ */ React.createElement("div", { className: "flex items-center gap-2" }, /* @__PURE__ */ React.createElement(Progress, { value: hit, className: "h-1.5", "aria-label": `${src} hit rate` }), /* @__PURE__ */ React.createElement("span", { className: "w-9 text-right text-xs tabular-nums" }, hit, "%"))), /* @__PURE__ */ React.createElement(TableCell, { className: "pr-4" }, /* @__PURE__ */ React.createElement(Badge, { className: STATUS[st] }, st))))))), /* @__PURE__ */ React.createElement("div", { className: "flex flex-col gap-3", "aria-busy": "true", "aria-label": "Loading" }, /* @__PURE__ */ React.createElement(Skeleton, { className: "h-5 w-1/3" }), /* @__PURE__ */ React.createElement(Skeleton, { className: "h-10 w-full" }), /* @__PURE__ */ React.createElement(Skeleton, { className: "h-10 w-full" }))));
})();
