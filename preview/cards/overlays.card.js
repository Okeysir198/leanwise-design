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
    DialogFooter,
    HoverCard,
    HoverCardTrigger,
    HoverCardContent,
    ContextMenu,
    ContextMenuTrigger,
    ContextMenuContent,
    ContextMenuItem,
    ContextMenuSeparator,
    ContextMenuShortcut
  } = window.LeanWiseDesign_f2d907;
  function RightClicked({ children }) {
    const ref = React.useRef(null);
    React.useEffect(() => {
      const t = ref.current.querySelector('[data-slot="context-menu-trigger"]');
      const r = t.getBoundingClientRect();
      t.dispatchEvent(new MouseEvent("contextmenu", { bubbles: true, clientX: r.left + 24, clientY: r.top + 24 }));
    }, []);
    return /* @__PURE__ */ React.createElement("div", { ref }, children);
  }
  const PIN = "top-auto left-auto translate-x-0 translate-y-0 max-w-sm";
  lwCard("Overlays", "Every surface paints on --popover; the dialogs are shown non-modal so every surface fits one frame.", /* @__PURE__ */ React.createElement("div", { className: "flex flex-col gap-40" }, /* @__PURE__ */ React.createElement("div", { className: "flex gap-56" }, /* @__PURE__ */ React.createElement(DropdownMenu, { open: true, modal: false }, /* @__PURE__ */ React.createElement(DropdownMenuTrigger, { asChild: true }, /* @__PURE__ */ React.createElement(Button, { variant: "outline" }, "Actions")), /* @__PURE__ */ React.createElement(DropdownMenuContent, { align: "start", className: "w-48" }, /* @__PURE__ */ React.createElement(DropdownMenuLabel, null, "Source"), /* @__PURE__ */ React.createElement(DropdownMenuItem, null, "Re-index", /* @__PURE__ */ React.createElement(DropdownMenuShortcut, null, "\u2318R")), /* @__PURE__ */ React.createElement(DropdownMenuItem, null, "Rename"), /* @__PURE__ */ React.createElement(DropdownMenuSeparator, null), /* @__PURE__ */ React.createElement(DropdownMenuItem, { variant: "destructive" }, "Delete"))), /* @__PURE__ */ React.createElement(Popover, { open: true }, /* @__PURE__ */ React.createElement(PopoverTrigger, { asChild: true }, /* @__PURE__ */ React.createElement(Button, { variant: "outline" }, "Share")), /* @__PURE__ */ React.createElement(PopoverContent, { align: "start", "aria-label": "Share link", onOpenAutoFocus: (e) => e.preventDefault() }, /* @__PURE__ */ React.createElement("div", { className: "flex flex-col gap-2" }, /* @__PURE__ */ React.createElement(Label, { htmlFor: "p-link" }, "Link"), /* @__PURE__ */ React.createElement(Input, { id: "p-link", readOnly: true, defaultValue: "lw.ai/s/8f2k" }))))), /* @__PURE__ */ React.createElement("div", { className: "flex gap-56" }, /* @__PURE__ */ React.createElement(HoverCard, { open: true }, /* @__PURE__ */ React.createElement(HoverCardTrigger, { asChild: true }, /* @__PURE__ */ React.createElement("a", { href: "#okafor", className: "self-start text-sm font-medium underline underline-offset-4" }, "@rokafor")), /* @__PURE__ */ React.createElement(HoverCardContent, { align: "start", className: "w-64" }, /* @__PURE__ */ React.createElement("div", { className: "flex flex-col gap-1" }, /* @__PURE__ */ React.createElement("span", { className: "text-sm font-semibold" }, "R. Okafor"), /* @__PURE__ */ React.createElement("span", { className: "text-muted-foreground text-sm" }, "Legal ops \xB7 owns Contracts / 2024")))), /* @__PURE__ */ React.createElement(RightClicked, null, /* @__PURE__ */ React.createElement(ContextMenu, { modal: false }, /* @__PURE__ */ React.createElement(ContextMenuTrigger, { className: "text-muted-foreground flex h-24 w-56 items-center justify-center rounded-md border border-dashed text-sm" }, "Right-click a source"), /* @__PURE__ */ React.createElement(ContextMenuContent, { className: "w-48" }, /* @__PURE__ */ React.createElement(ContextMenuItem, null, "Open", /* @__PURE__ */ React.createElement(ContextMenuShortcut, null, "\u2318O")), /* @__PURE__ */ React.createElement(ContextMenuItem, null, "Re-index"), /* @__PURE__ */ React.createElement(ContextMenuSeparator, null), /* @__PURE__ */ React.createElement(ContextMenuItem, { variant: "destructive" }, "Remove"))))), /* @__PURE__ */ React.createElement(TooltipProvider, null, /* @__PURE__ */ React.createElement(Tooltip, { open: true }, /* @__PURE__ */ React.createElement(TooltipTrigger, { asChild: true }, /* @__PURE__ */ React.createElement(Button, { variant: "ghost", className: "self-start" }, "Hover target")), /* @__PURE__ */ React.createElement(TooltipContent, { side: "right" }, "Tooltips name, never explain"))), /* @__PURE__ */ React.createElement(Dialog, { open: true, modal: false }, /* @__PURE__ */ React.createElement(DialogContent, { className: `${PIN} top-32 right-8`, onOpenAutoFocus: (e) => e.preventDefault() }, /* @__PURE__ */ React.createElement(DialogHeader, null, /* @__PURE__ */ React.createElement(DialogTitle, null, "Invite members"), /* @__PURE__ */ React.createElement(DialogDescription, null, "They join as viewers; change roles later.")), /* @__PURE__ */ React.createElement(Input, { placeholder: "name@company.com", "aria-label": "Email" }), /* @__PURE__ */ React.createElement(DialogFooter, null, /* @__PURE__ */ React.createElement(Button, { variant: "outline" }, "Cancel"), /* @__PURE__ */ React.createElement(Button, null, "Send invite"))))));
})();
