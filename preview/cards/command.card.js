/* GENERATED from command.card.jsx by scripts/lib/card-build.mjs — do not edit. */
(() => {
  const {
    Button,
    Kbd,
    KbdGroup,
    CommandDialog,
    CommandInput,
    CommandList,
    CommandEmpty,
    CommandGroup,
    CommandItem,
    CommandShortcut,
    SearchIcon,
    FileTextIcon,
    PlusIcon,
    UserIcon,
    CreditCardIcon,
    SettingsIcon
  } = window.LeanWiseDesign_f2d907;
  lwCard("Command palette", "The stock CommandDialog, rendered open. The trigger shows its shortcut with Kbd.", /* @__PURE__ */ React.createElement("div", { className: "flex flex-col gap-6" }, /* @__PURE__ */ React.createElement(Button, { variant: "outline", className: "text-muted-foreground w-72 justify-start" }, /* @__PURE__ */ React.createElement(SearchIcon, null), "Search sources and actions\u2026", /* @__PURE__ */ React.createElement(KbdGroup, { className: "ml-auto" }, /* @__PURE__ */ React.createElement(Kbd, null, "\u2318"), /* @__PURE__ */ React.createElement(Kbd, null, "K"))), /* @__PURE__ */ React.createElement(CommandDialog, { open: true, modal: false }, /* @__PURE__ */ React.createElement(CommandInput, { placeholder: "Type a command or search\u2026" }), /* @__PURE__ */ React.createElement(CommandList, null, /* @__PURE__ */ React.createElement(CommandEmpty, null, "No results found."), /* @__PURE__ */ React.createElement(CommandGroup, { heading: "Sources" }, /* @__PURE__ */ React.createElement(CommandItem, null, /* @__PURE__ */ React.createElement(FileTextIcon, null), "Contracts / 2024"), /* @__PURE__ */ React.createElement(CommandItem, null, /* @__PURE__ */ React.createElement(FileTextIcon, null), "Support transcripts"), /* @__PURE__ */ React.createElement(CommandItem, null, /* @__PURE__ */ React.createElement(PlusIcon, null), "Add a source")), /* @__PURE__ */ React.createElement(CommandGroup, { heading: "Settings" }, /* @__PURE__ */ React.createElement(CommandItem, null, /* @__PURE__ */ React.createElement(UserIcon, null), "Profile", /* @__PURE__ */ React.createElement(CommandShortcut, null, "\u2318P")), /* @__PURE__ */ React.createElement(CommandItem, null, /* @__PURE__ */ React.createElement(CreditCardIcon, null), "Billing", /* @__PURE__ */ React.createElement(CommandShortcut, null, "\u2318B")), /* @__PURE__ */ React.createElement(CommandItem, null, /* @__PURE__ */ React.createElement(SettingsIcon, null), "Settings", /* @__PURE__ */ React.createElement(CommandShortcut, null, "\u2318S")))))));
})();
