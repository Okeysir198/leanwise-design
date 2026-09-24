/* GENERATED from feedback.card.jsx by scripts/lib/card-build.mjs — do not edit. */
(() => {
  const {
    Alert,
    AlertTitle,
    AlertDescription,
    Badge,
    Spinner,
    Toaster,
    toast,
    Empty,
    EmptyHeader,
    EmptyMedia,
    EmptyTitle,
    EmptyDescription,
    EmptyContent,
    Button,
    InfoIcon,
    AlertCircleIcon,
    CheckCircle2Icon
  } = window.LeanWiseDesign_f2d907;
  function Toasts() {
    React.useEffect(() => {
      toast.success("Source re-indexed", { description: "1,284 documents in 42 s", duration: Infinity });
      toast("Invite sent to jamie@acme.com", { duration: Infinity });
    }, []);
    const [dark, setDark] = React.useState(document.documentElement.classList.contains("dark"));
    React.useEffect(() => {
      const html = document.documentElement;
      const mo = new MutationObserver(() => setDark(html.classList.contains("dark")));
      mo.observe(html, { attributes: true, attributeFilter: ["class"] });
      return () => mo.disconnect();
    }, []);
    return /* @__PURE__ */ React.createElement(Toaster, { theme: dark ? "dark" : "light", position: "bottom-right", expand: true });
  }
  lwCard("Feedback", "Inline alerts sit in the flow; toasts confirm what already happened and never ask a question.", /* @__PURE__ */ React.createElement("div", { className: "grid grid-cols-2 gap-10" }, /* @__PURE__ */ React.createElement("div", { className: "flex flex-col gap-4" }, /* @__PURE__ */ React.createElement(Alert, null, /* @__PURE__ */ React.createElement(CheckCircle2Icon, null), /* @__PURE__ */ React.createElement(AlertTitle, null, "Sync scheduled"), /* @__PURE__ */ React.createElement(AlertDescription, null, "Sources refresh nightly at 02:00.")), /* @__PURE__ */ React.createElement(Alert, { className: "bg-info-soft text-info-soft-foreground border-info-border" }, /* @__PURE__ */ React.createElement(InfoIcon, null), /* @__PURE__ */ React.createElement(AlertTitle, null, "New connector available"), /* @__PURE__ */ React.createElement(AlertDescription, { className: "text-info-soft-foreground" }, "SharePoint sites can now be added as a source.")), /* @__PURE__ */ React.createElement(Alert, { variant: "destructive", className: "bg-destructive-soft border-destructive-border" }, /* @__PURE__ */ React.createElement(AlertCircleIcon, null), /* @__PURE__ */ React.createElement(AlertTitle, null, "Ingest failed"), /* @__PURE__ */ React.createElement(AlertDescription, null, "Legacy wiki returned 403. Reconnect to retry.")), /* @__PURE__ */ React.createElement("div", { className: "flex flex-wrap items-center gap-2" }, /* @__PURE__ */ React.createElement(Badge, null, "default"), /* @__PURE__ */ React.createElement(Badge, { variant: "secondary" }, "secondary"), /* @__PURE__ */ React.createElement(Badge, { variant: "outline" }, "outline"), /* @__PURE__ */ React.createElement(Badge, { variant: "destructive" }, "destructive"), /* @__PURE__ */ React.createElement(Badge, { className: "bg-success text-success-foreground border-transparent" }, "success"), /* @__PURE__ */ React.createElement(Badge, { className: "bg-warning text-warning-foreground border-transparent" }, "warning"), /* @__PURE__ */ React.createElement(Badge, { className: "bg-info text-info-foreground border-transparent" }, "info")), /* @__PURE__ */ React.createElement("div", { className: "text-muted-foreground flex items-center gap-2 text-sm" }, /* @__PURE__ */ React.createElement(Spinner, null), "Indexing 3 sources\u2026")), /* @__PURE__ */ React.createElement(Empty, { className: "border" }, /* @__PURE__ */ React.createElement(EmptyHeader, null, /* @__PURE__ */ React.createElement(EmptyMedia, { variant: "icon" }, /* @__PURE__ */ React.createElement(InfoIcon, null)), /* @__PURE__ */ React.createElement(EmptyTitle, null, "No sources yet"), /* @__PURE__ */ React.createElement(EmptyDescription, null, "Connect a drive or upload files to start answering questions.")), /* @__PURE__ */ React.createElement(EmptyContent, null, /* @__PURE__ */ React.createElement(Button, null, "Add a source"))), /* @__PURE__ */ React.createElement(Toasts, null)));
})();
