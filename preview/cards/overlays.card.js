/* GENERATED from overlays.card.jsx by scripts/lib/card-build.mjs — do not edit. */
(() => {
  const {
    Button,
    Input,
    Label,
    DropdownMenu,
    DropdownMenuTrigger,
    DropdownMenuContent,
    DropdownMenuLabel,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuShortcut,
    Popover,
    PopoverTrigger,
    PopoverContent,
    Tooltip,
    TooltipTrigger,
    TooltipContent,
    TooltipProvider,
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
    DialogFooter
  } = window.LeanWiseDesign_f2d907;
  const PIN = "top-auto left-auto translate-x-0 translate-y-0 max-w-sm";
  lwCard("Overlays", "Every surface paints on --popover; the dialogs are shown non-modal so all four fit one frame.", /* @__PURE__ */ React.createElement("div", { className: "flex flex-col gap-40" }, /* @__PURE__ */ React.createElement("div", { className: "flex gap-56" }, /* @__PURE__ */ React.createElement(DropdownMenu, { open: true, modal: false }, /* @__PURE__ */ React.createElement(DropdownMenuTrigger, { asChild: true }, /* @__PURE__ */ React.createElement(Button, { variant: "outline" }, "Actions")), /* @__PURE__ */ React.createElement(DropdownMenuContent, { align: "start", className: "w-48" }, /* @__PURE__ */ React.createElement(DropdownMenuLabel, null, "Source"), /* @__PURE__ */ React.createElement(DropdownMenuItem, null, "Re-index", /* @__PURE__ */ React.createElement(DropdownMenuShortcut, null, "\u2318R")), /* @__PURE__ */ React.createElement(DropdownMenuItem, null, "Rename"), /* @__PURE__ */ React.createElement(DropdownMenuSeparator, null), /* @__PURE__ */ React.createElement(DropdownMenuItem, { variant: "destructive" }, "Delete"))), /* @__PURE__ */ React.createElement(Popover, { open: true }, /* @__PURE__ */ React.createElement(PopoverTrigger, { asChild: true }, /* @__PURE__ */ React.createElement(Button, { variant: "outline" }, "Share")), /* @__PURE__ */ React.createElement(PopoverContent, { align: "start", onOpenAutoFocus: (e) => e.preventDefault() }, /* @__PURE__ */ React.createElement("div", { className: "flex flex-col gap-2" }, /* @__PURE__ */ React.createElement(Label, { htmlFor: "p-link" }, "Link"), /* @__PURE__ */ React.createElement(Input, { id: "p-link", readOnly: true, defaultValue: "lw.ai/s/8f2k" }))))), /* @__PURE__ */ React.createElement(TooltipProvider, null, /* @__PURE__ */ React.createElement(Tooltip, { open: true }, /* @__PURE__ */ React.createElement(TooltipTrigger, { asChild: true }, /* @__PURE__ */ React.createElement(Button, { variant: "ghost", className: "self-start" }, "Hover target")), /* @__PURE__ */ React.createElement(TooltipContent, { side: "right" }, "Tooltips name, never explain"))), /* @__PURE__ */ React.createElement(Dialog, { open: true, modal: false }, /* @__PURE__ */ React.createElement(DialogContent, { className: `${PIN} top-8 right-8`, onOpenAutoFocus: (e) => e.preventDefault() }, /* @__PURE__ */ React.createElement(DialogHeader, null, /* @__PURE__ */ React.createElement(DialogTitle, null, "Invite members"), /* @__PURE__ */ React.createElement(DialogDescription, null, "They join as viewers; change roles later.")), /* @__PURE__ */ React.createElement(Input, { placeholder: "name@company.com", "aria-label": "Email" }), /* @__PURE__ */ React.createElement(DialogFooter, null, /* @__PURE__ */ React.createElement(Button, { variant: "outline" }, "Cancel"), /* @__PURE__ */ React.createElement(Button, null, "Send invite"))))));
})();
