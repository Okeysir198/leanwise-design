/* GENERATED from input-group.card.jsx by scripts/lib/card-build.mjs — do not edit. */
(() => {
  const {
    Button,
    Kbd,
    KbdGroup,
    InputGroup,
    InputGroupAddon,
    InputGroupInput,
    InputGroupText,
    InputGroupButton,
    InputGroupTextarea,
    ButtonGroup,
    ButtonGroupSeparator,
    Item,
    ItemGroup,
    ItemMedia,
    ItemContent,
    ItemTitle,
    ItemDescription,
    ItemActions,
    SearchIcon,
    CopyIcon,
    ArrowUpIcon,
    ChevronsUpDownIcon,
    PlusIcon,
    MoreHorizontalIcon,
    FileTextIcon,
    BadgeCheckIcon,
    ChevronRightIcon
  } = window.LeanWiseDesign_f2d907;
  const Section = ({ title, children }) => /* @__PURE__ */ React.createElement("section", { className: "flex flex-col gap-3" }, /* @__PURE__ */ React.createElement("h2", { className: "text-muted-foreground text-sm font-medium" }, title), children);
  const Row = ({ title, meta }) => /* @__PURE__ */ React.createElement(Item, { role: "listitem" }, /* @__PURE__ */ React.createElement(ItemMedia, { variant: "icon" }, /* @__PURE__ */ React.createElement(FileTextIcon, null)), /* @__PURE__ */ React.createElement(ItemContent, null, /* @__PURE__ */ React.createElement(ItemTitle, null, title), /* @__PURE__ */ React.createElement(ItemDescription, null, meta)), /* @__PURE__ */ React.createElement(ItemActions, null, /* @__PURE__ */ React.createElement(Button, { variant: "ghost", size: "icon", "aria-label": `More actions for ${title}` }, /* @__PURE__ */ React.createElement(MoreHorizontalIcon, null)), /* @__PURE__ */ React.createElement(Button, { variant: "outline", size: "sm" }, "Re-index")));
  lwCard("Input group, Button group, Kbd, Item", "Four stock primitives for composing controls and rows.", /* @__PURE__ */ React.createElement("div", { className: "grid gap-10 md:grid-cols-2" }, /* @__PURE__ */ React.createElement("div", { className: "flex flex-col gap-10" }, /* @__PURE__ */ React.createElement(Section, { title: "Input group" }, /* @__PURE__ */ React.createElement(InputGroup, null, /* @__PURE__ */ React.createElement(InputGroupInput, { placeholder: "Search\u2026", "aria-label": "Search" }), /* @__PURE__ */ React.createElement(InputGroupAddon, null, /* @__PURE__ */ React.createElement(SearchIcon, null)), /* @__PURE__ */ React.createElement(InputGroupAddon, { align: "inline-end" }, "12 results")), /* @__PURE__ */ React.createElement(InputGroup, null, /* @__PURE__ */ React.createElement(InputGroupAddon, null, /* @__PURE__ */ React.createElement(InputGroupText, null, "https://")), /* @__PURE__ */ React.createElement(InputGroupInput, { defaultValue: "lw.ai/s/8f2k", "aria-label": "Share link" }), /* @__PURE__ */ React.createElement(InputGroupAddon, { align: "inline-end" }, /* @__PURE__ */ React.createElement(InputGroupButton, { size: "icon-xs", "aria-label": "Copy link" }, /* @__PURE__ */ React.createElement(CopyIcon, null)))), /* @__PURE__ */ React.createElement(InputGroup, null, /* @__PURE__ */ React.createElement(InputGroupTextarea, { placeholder: "Ask about your documents\u2026", "aria-label": "Question" }), /* @__PURE__ */ React.createElement(InputGroupAddon, { align: "block-end" }, /* @__PURE__ */ React.createElement(InputGroupText, null, "Cited from 12 sources"), /* @__PURE__ */ React.createElement(InputGroupButton, { variant: "default", size: "icon-xs", className: "ml-auto rounded-full", "aria-label": "Send" }, /* @__PURE__ */ React.createElement(ArrowUpIcon, null))))), /* @__PURE__ */ React.createElement(Section, { title: "Button group" }, /* @__PURE__ */ React.createElement("div", { className: "flex flex-wrap gap-4" }, /* @__PURE__ */ React.createElement(ButtonGroup, null, /* @__PURE__ */ React.createElement(Button, { variant: "outline" }, "Archive"), /* @__PURE__ */ React.createElement(Button, { variant: "outline" }, "Report"), /* @__PURE__ */ React.createElement(Button, { variant: "outline" }, "Snooze")), /* @__PURE__ */ React.createElement(ButtonGroup, null, /* @__PURE__ */ React.createElement(Button, null, "Publish"), /* @__PURE__ */ React.createElement(ButtonGroupSeparator, null), /* @__PURE__ */ React.createElement(Button, { size: "icon", "aria-label": "More publish options" }, /* @__PURE__ */ React.createElement(ChevronsUpDownIcon, null))))), /* @__PURE__ */ React.createElement(Section, { title: "Kbd" }, /* @__PURE__ */ React.createElement("p", { className: "text-muted-foreground flex flex-wrap items-center gap-2 text-sm" }, "Open the palette with ", /* @__PURE__ */ React.createElement(KbdGroup, null, /* @__PURE__ */ React.createElement(Kbd, null, "\u2318"), /* @__PURE__ */ React.createElement(Kbd, null, "K")), ", submit with ", /* @__PURE__ */ React.createElement(Kbd, null, "Enter"), ", close with ", /* @__PURE__ */ React.createElement(Kbd, null, "Esc"), "."))), /* @__PURE__ */ React.createElement(Section, { title: "Item" }, /* @__PURE__ */ React.createElement(ItemGroup, { className: "divide-y rounded-lg border" }, /* @__PURE__ */ React.createElement(Row, { title: "Contracts / 2024", meta: "1,204 documents \xB7 synced 4 min ago" }), /* @__PURE__ */ React.createElement(Row, { title: "Support transcripts", meta: "8,930 documents \xB7 stale" }), /* @__PURE__ */ React.createElement(Item, { role: "listitem" }, /* @__PURE__ */ React.createElement(ItemMedia, { variant: "icon" }, /* @__PURE__ */ React.createElement(PlusIcon, null)), /* @__PURE__ */ React.createElement(ItemContent, null, /* @__PURE__ */ React.createElement(ItemTitle, null, "Add a source"), /* @__PURE__ */ React.createElement(ItemDescription, null, "SharePoint, Drive, Confluence or upload.")), /* @__PURE__ */ React.createElement(ItemActions, null, /* @__PURE__ */ React.createElement(Button, { size: "sm" }, "Connect")))), /* @__PURE__ */ React.createElement(Item, { variant: "outline", size: "sm", asChild: true }, /* @__PURE__ */ React.createElement("a", { href: "#verified" }, /* @__PURE__ */ React.createElement(ItemMedia, null, /* @__PURE__ */ React.createElement(BadgeCheckIcon, { className: "size-5" })), /* @__PURE__ */ React.createElement(ItemContent, null, /* @__PURE__ */ React.createElement(ItemTitle, null, "Your workspace is verified.")), /* @__PURE__ */ React.createElement(ItemActions, null, /* @__PURE__ */ React.createElement(ChevronRightIcon, { className: "size-4" })))))));
})();
