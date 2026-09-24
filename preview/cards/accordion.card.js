/* GENERATED from accordion.card.jsx by scripts/lib/card-build.mjs — do not edit. */
(() => {
  const {
    Button,
    Accordion,
    AccordionItem,
    AccordionTrigger,
    AccordionContent,
    Collapsible,
    CollapsibleTrigger,
    CollapsibleContent,
    ChevronsUpDownIcon
  } = window.LeanWiseDesign_f2d907;
  lwCard("Accordion & Collapsible", "Accordion for a set of sections; Collapsible for one show-more region.", /* @__PURE__ */ React.createElement("div", { className: "grid gap-12 md:grid-cols-2" }, /* @__PURE__ */ React.createElement(Accordion, { type: "single", collapsible: true, defaultValue: "cite", className: "w-full" }, /* @__PURE__ */ React.createElement(AccordionItem, { value: "cite" }, /* @__PURE__ */ React.createElement(AccordionTrigger, null, "How are answers cited?"), /* @__PURE__ */ React.createElement(AccordionContent, null, "Every sentence links to the paragraph it rests on. No citation, no answer.")), /* @__PURE__ */ React.createElement(AccordionItem, { value: "perm" }, /* @__PURE__ */ React.createElement(AccordionTrigger, null, "Who can see an answer?"), /* @__PURE__ */ React.createElement(AccordionContent, null, "Only people who can already open every source it draws on.")), /* @__PURE__ */ React.createElement(AccordionItem, { value: "eval" }, /* @__PURE__ */ React.createElement(AccordionTrigger, null, "How is quality measured?"), /* @__PURE__ */ React.createElement(AccordionContent, null, "Evaluations run nightly against your own question sets."))), /* @__PURE__ */ React.createElement(Collapsible, { defaultOpen: true, className: "flex w-full max-w-sm flex-col gap-2" }, /* @__PURE__ */ React.createElement("div", { className: "flex items-center justify-between gap-4 px-4" }, /* @__PURE__ */ React.createElement("h2", { className: "text-sm font-semibold" }, "3 sources syncing"), /* @__PURE__ */ React.createElement(CollapsibleTrigger, { asChild: true }, /* @__PURE__ */ React.createElement(Button, { variant: "ghost", size: "icon", className: "size-8", "aria-label": "Toggle sources" }, /* @__PURE__ */ React.createElement(ChevronsUpDownIcon, null)))), /* @__PURE__ */ React.createElement("div", { className: "rounded-md border px-4 py-2 font-mono text-sm" }, "Contracts / 2024"), /* @__PURE__ */ React.createElement(CollapsibleContent, { className: "flex flex-col gap-2" }, /* @__PURE__ */ React.createElement("div", { className: "rounded-md border px-4 py-2 font-mono text-sm" }, "Support transcripts"), /* @__PURE__ */ React.createElement("div", { className: "rounded-md border px-4 py-2 font-mono text-sm" }, "Policies")))));
})();
