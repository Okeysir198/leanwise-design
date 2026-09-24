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
    Button
  } = window.LeanWiseDesign_f2d907;
  const I = (d) => /* @__PURE__ */ React.createElement("svg", { xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", "aria-hidden": "true" }, d);
  const Info = I(/* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement("circle", { cx: "12", cy: "12", r: "10" }), /* @__PURE__ */ React.createElement("path", { d: "M12 16v-4M12 8h.01" })));
  const Warn = I(/* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement("circle", { cx: "12", cy: "12", r: "10" }), /* @__PURE__ */ React.createElement("path", { d: "M12 8v4M12 16h.01" })));
  function Toasts() {
    React.useEffect(() => {
      toast.success("Source re-indexed", { description: "1,284 documents in 42 s", duration: Infinity });
      toast("Invite sent to jamie@acme.com", { duration: Infinity });
    }, []);
    return /* @__PURE__ */ React.createElement(Toaster, { position: "bottom-right", expand: true, toastOptions: { classNames: { description: "text-muted-foreground!" } } });
  }
  lwCard("Feedback", "Inline alerts sit in the flow; toasts confirm what already happened and never ask a question.", /* @__PURE__ */ React.createElement("div", { className: "grid grid-cols-2 gap-10" }, /* @__PURE__ */ React.createElement("div", { className: "flex flex-col gap-4" }, /* @__PURE__ */ React.createElement(Alert, null, Info, /* @__PURE__ */ React.createElement(AlertTitle, null, "Sync scheduled"), /* @__PURE__ */ React.createElement(AlertDescription, null, "Sources refresh nightly at 02:00.")), /* @__PURE__ */ React.createElement(Alert, { className: "bg-info-soft text-info-soft-foreground border-info-border" }, Info, /* @__PURE__ */ React.createElement(AlertTitle, null, "New connector available"), /* @__PURE__ */ React.createElement(AlertDescription, { className: "text-info-soft-foreground" }, "SharePoint sites can now be added as a source.")), /* @__PURE__ */ React.createElement(Alert, { variant: "destructive", className: "bg-destructive-soft border-destructive-border" }, Warn, /* @__PURE__ */ React.createElement(AlertTitle, null, "Ingest failed"), /* @__PURE__ */ React.createElement(AlertDescription, null, "Legacy wiki returned 403. Reconnect to retry.")), /* @__PURE__ */ React.createElement("div", { className: "flex flex-wrap items-center gap-2" }, /* @__PURE__ */ React.createElement(Badge, null, "default"), /* @__PURE__ */ React.createElement(Badge, { variant: "secondary" }, "secondary"), /* @__PURE__ */ React.createElement(Badge, { variant: "outline" }, "outline"), /* @__PURE__ */ React.createElement(Badge, { variant: "destructive" }, "destructive"), /* @__PURE__ */ React.createElement(Badge, { className: "bg-success text-success-foreground border-transparent" }, "success"), /* @__PURE__ */ React.createElement(Badge, { className: "bg-warning text-warning-foreground border-transparent" }, "warning"), /* @__PURE__ */ React.createElement(Badge, { className: "bg-info text-info-foreground border-transparent" }, "info")), /* @__PURE__ */ React.createElement("div", { className: "text-muted-foreground flex items-center gap-2 text-sm" }, /* @__PURE__ */ React.createElement(Spinner, null), "Indexing 3 sources\u2026")), /* @__PURE__ */ React.createElement(Empty, { className: "border" }, /* @__PURE__ */ React.createElement(EmptyHeader, null, /* @__PURE__ */ React.createElement(EmptyMedia, { variant: "icon" }, Info), /* @__PURE__ */ React.createElement(EmptyTitle, null, "No sources yet"), /* @__PURE__ */ React.createElement(EmptyDescription, null, "Connect a drive or upload files to start answering questions.")), /* @__PURE__ */ React.createElement(EmptyContent, null, /* @__PURE__ */ React.createElement(Button, null, "Add a source"))), /* @__PURE__ */ React.createElement(Toasts, null)));
})();
