/* GENERATED from sheet.card.jsx by scripts/lib/card-build.mjs — do not edit. */
(() => {
  const {
    Button,
    Input,
    Label,
    Sheet,
    SheetTrigger,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetDescription,
    SheetFooter,
    SheetClose
  } = window.LeanWiseDesign_f2d907;
  lwCard("Sheet", "The stock Sheet from the right, rendered open.", /* @__PURE__ */ React.createElement(Sheet, { open: true, modal: false }, /* @__PURE__ */ React.createElement(SheetTrigger, { asChild: true }, /* @__PURE__ */ React.createElement(Button, { variant: "outline", className: "self-start" }, "Edit source")), /* @__PURE__ */ React.createElement(SheetContent, { onOpenAutoFocus: (e) => e.preventDefault() }, /* @__PURE__ */ React.createElement(SheetHeader, null, /* @__PURE__ */ React.createElement(SheetTitle, null, "Edit source"), /* @__PURE__ */ React.createElement(SheetDescription, null, "Changes re-index the source on save.")), /* @__PURE__ */ React.createElement("div", { className: "grid flex-1 auto-rows-min gap-6 px-4" }, /* @__PURE__ */ React.createElement("div", { className: "grid gap-3" }, /* @__PURE__ */ React.createElement(Label, { htmlFor: "sheet-name" }, "Name"), /* @__PURE__ */ React.createElement(Input, { id: "sheet-name", defaultValue: "Contracts / 2024" })), /* @__PURE__ */ React.createElement("div", { className: "grid gap-3" }, /* @__PURE__ */ React.createElement(Label, { htmlFor: "sheet-path" }, "Folder"), /* @__PURE__ */ React.createElement(Input, { id: "sheet-path", defaultValue: "/legal/contracts/2024" }))), /* @__PURE__ */ React.createElement(SheetFooter, { className: "flex-row justify-end" }, /* @__PURE__ */ React.createElement(SheetClose, { asChild: true }, /* @__PURE__ */ React.createElement(Button, { variant: "outline" }, "Cancel")), /* @__PURE__ */ React.createElement(Button, { type: "submit" }, "Save changes")))));
})();
