/* @ds-bundle: {"format":4,"namespace":"LeanWiseDesign_f2d907","generator":"tools/lw-bundle.mjs","esbuild":"0.27.7","components":[{"name":"AgentTrace","sourcePath":"components/ai/AgentTrace.jsx"},{"name":"Artifact","sourcePath":"components/ai/Artifact.jsx"},{"name":"ConfidenceMeter","sourcePath":"components/ai/ConfidenceMeter.jsx"},{"name":"DiffReview","sourcePath":"components/ai/DiffReview.jsx"},{"name":"Feedback","sourcePath":"components/ai/Feedback.jsx"},{"name":"Message","sourcePath":"components/ai/Message.jsx"},{"name":"PromptInput","sourcePath":"components/ai/PromptInput.jsx"},{"name":"SourceChip","sourcePath":"components/ai/SourceChip.jsx"},{"name":"SourceList","sourcePath":"components/ai/SourceList.jsx"},{"name":"ToolCall","sourcePath":"components/ai/ToolCall.jsx"},{"name":"ActivityFeed","sourcePath":"components/data/ActivityFeed.jsx"},{"name":"BUCKET_LABELS","sourcePath":"components/data/ActivityFeed.jsx"},{"name":"RELATIVE_LABELS","sourcePath":"components/data/ActivityFeed.jsx"},{"name":"timeAgo","sourcePath":"components/data/ActivityFeed.jsx"},{"name":"BarChart","sourcePath":"components/data/BarChart.jsx"},{"name":"CHART_PAD","sourcePath":"components/data/chart-parts.jsx"},{"name":"CHART_W","sourcePath":"components/data/chart-parts.jsx"},{"name":"DataTable","sourcePath":"components/data/chart-parts.jsx"},{"name":"Legend","sourcePath":"components/data/chart-parts.jsx"},{"name":"SERIES","sourcePath":"components/data/chart-parts.jsx"},{"name":"CodeBlock","sourcePath":"components/data/CodeBlock.jsx"},{"name":"Console","sourcePath":"components/data/Console.jsx"},{"name":"DataGrid","sourcePath":"components/data/DataGrid.jsx"},{"name":"EmptyState","sourcePath":"components/data/EmptyState.jsx"},{"name":"FilterBar","sourcePath":"components/data/FilterBar.jsx"},{"name":"Toolbar","sourcePath":"components/data/FilterBar.jsx"},{"name":"KpiTile","sourcePath":"components/data/KpiTile.jsx"},{"name":"LineChart","sourcePath":"components/data/LineChart.jsx"},{"name":"Pagination","sourcePath":"components/data/Pagination.jsx"},{"name":"Progress","sourcePath":"components/data/Progress.jsx"},{"name":"StateView","sourcePath":"components/data/StateView.jsx"},{"name":"StatMeter","sourcePath":"components/data/StatMeter.jsx"},{"name":"Table","sourcePath":"components/data/Table.jsx"},{"name":"Calendar","sourcePath":"components/forms/Calendar.jsx"},{"name":"Checkbox","sourcePath":"components/forms/Checkbox.jsx"},{"name":"Combobox","sourcePath":"components/forms/Combobox.jsx"},{"name":"DatePicker","sourcePath":"components/forms/DatePicker.jsx"},{"name":"RANGE_PRESETS","sourcePath":"components/forms/DatePicker.jsx"},{"name":"Field","sourcePath":"components/forms/Field.jsx"},{"name":"FileUpload","sourcePath":"components/forms/FileUpload.jsx"},{"name":"formatBytes","sourcePath":"components/forms/FileUpload.jsx"},{"name":"Input","sourcePath":"components/forms/Input.jsx"},{"name":"InputGroup","sourcePath":"components/forms/InputGroup.jsx"},{"name":"RichText","sourcePath":"components/forms/RichText.jsx"},{"name":"TOOLS","sourcePath":"components/forms/RichText.jsx"},{"name":"Segmented","sourcePath":"components/forms/Segmented.jsx"},{"name":"Select","sourcePath":"components/forms/Select.jsx"},{"name":"Stepper","sourcePath":"components/forms/Stepper.jsx"},{"name":"Switch","sourcePath":"components/forms/Switch.jsx"},{"name":"Textarea","sourcePath":"components/forms/Textarea.jsx"},{"name":"Cluster","sourcePath":"components/layout/Cluster.jsx"},{"name":"Container","sourcePath":"components/layout/Container.jsx"},{"name":"Grid","sourcePath":"components/layout/Grid.jsx"},{"name":"Page","sourcePath":"components/layout/Page.jsx"},{"name":"Section","sourcePath":"components/layout/Section.jsx"},{"name":"Split","sourcePath":"components/layout/Split.jsx"},{"name":"Stack","sourcePath":"components/layout/Stack.jsx"},{"name":"AnnounceBar","sourcePath":"components/marketing/AnnounceBar.jsx"},{"name":"ArticleCard","sourcePath":"components/marketing/ArticleCard.jsx"},{"name":"Byline","sourcePath":"components/marketing/Byline.jsx"},{"name":"CompareTable","sourcePath":"components/marketing/CompareTable.jsx"},{"name":"FeatureGrid","sourcePath":"components/marketing/FeatureGrid.jsx"},{"name":"Flow","sourcePath":"components/marketing/Flow.jsx"},{"name":"Hero","sourcePath":"components/marketing/Hero.jsx"},{"name":"LogoRail","sourcePath":"components/marketing/LogoRail.jsx"},{"name":"PlanCard","sourcePath":"components/marketing/PlanCard.jsx"},{"name":"Quote","sourcePath":"components/marketing/Quote.jsx"},{"name":"SiteFooter","sourcePath":"components/marketing/SiteFooter.jsx"},{"name":"Steps","sourcePath":"components/marketing/Steps.jsx"},{"name":"StoryCard","sourcePath":"components/marketing/StoryCard.jsx"},{"name":"AppBar","sourcePath":"components/nav/AppBar.jsx"},{"name":"BottomNav","sourcePath":"components/nav/BottomNav.jsx"},{"name":"Breadcrumbs","sourcePath":"components/nav/Breadcrumbs.jsx"},{"name":"CommandPalette","sourcePath":"components/nav/CommandPalette.jsx"},{"name":"score","sourcePath":"components/nav/CommandPalette.jsx"},{"name":"NavToggle","sourcePath":"components/nav/NavToggle.jsx"},{"name":"NavItem","sourcePath":"components/nav/Sidebar.jsx"},{"name":"Sidebar","sourcePath":"components/nav/Sidebar.jsx"},{"name":"Tabs","sourcePath":"components/nav/Tabs.jsx"},{"name":"THEME_LABELS","sourcePath":"components/nav/ThemeToggle.jsx"},{"name":"ThemeToggle","sourcePath":"components/nav/ThemeToggle.jsx"},{"name":"TopBar","sourcePath":"components/nav/TopBar.jsx"},{"name":"Dialog","sourcePath":"components/overlays/Dialog.jsx"},{"name":"Drawer","sourcePath":"components/overlays/Drawer.jsx"},{"name":"Menu","sourcePath":"components/overlays/Menu.jsx"},{"name":"Popover","sourcePath":"components/overlays/Popover.jsx"},{"name":"Toast","sourcePath":"components/overlays/Toast.jsx"},{"name":"ToastRegion","sourcePath":"components/overlays/Toast.jsx"},{"name":"Tooltip","sourcePath":"components/overlays/Tooltip.jsx"},{"name":"Avatar","sourcePath":"components/primitives/Avatar.jsx"},{"name":"Button","sourcePath":"components/primitives/Button.jsx"},{"name":"Card","sourcePath":"components/primitives/Card.jsx"},{"name":"CardBody","sourcePath":"components/primitives/Card.jsx"},{"name":"CardFoot","sourcePath":"components/primitives/Card.jsx"},{"name":"CardHead","sourcePath":"components/primitives/Card.jsx"},{"name":"CardTitle","sourcePath":"components/primitives/Card.jsx"},{"name":"Chip","sourcePath":"components/primitives/Chip.jsx"},{"name":"Disclosure","sourcePath":"components/primitives/Disclosure.jsx"},{"name":"Eyebrow","sourcePath":"components/primitives/Eyebrow.jsx"},{"name":"Icon","sourcePath":"components/primitives/Icon.jsx"},{"name":"iconNames","sourcePath":"components/primitives/Icon.jsx"},{"name":"IconNames","sourcePath":"components/primitives/Icon.jsx"},{"name":"Prose","sourcePath":"components/primitives/Prose.jsx"},{"name":"Skeleton","sourcePath":"components/primitives/Skeleton.jsx"},{"name":"THEME_EVENT","sourcePath":"hooks.js"},{"name":"THEME_KEY","sourcePath":"hooks.js"}],"sourceHashes":{"components/_deprecate.js":"1c84a2fda110","components/_merge-refs.js":"13fe3c69fe69","components/_radio-group.js":"26caa936f1de","components/ai/AgentTrace.jsx":"a89cdd6dbfea","components/ai/Artifact.jsx":"2f6f74bc6102","components/ai/ConfidenceMeter.jsx":"30190dcfb803","components/ai/DiffReview.jsx":"3e794caa9ef1","components/ai/Feedback.jsx":"b39a358e07a0","components/ai/Message.jsx":"e507e32b90ca","components/ai/PromptInput.jsx":"93ca1175d24c","components/ai/SourceChip.jsx":"ea58d31896df","components/ai/SourceList.jsx":"60e374a74c6a","components/ai/ToolCall.jsx":"7847c91c8842","components/data/ActivityFeed.jsx":"22fd86442559","components/data/BarChart.jsx":"96968a9ba35f","components/data/CodeBlock.jsx":"d4f25b21c63d","components/data/Console.jsx":"6ae78360738d","components/data/DataGrid.jsx":"d6fd83a51115","components/data/EmptyState.jsx":"7340a557f731","components/data/FilterBar.jsx":"dc73bc4398fe","components/data/KpiTile.jsx":"4568571b1cff","components/data/LineChart.jsx":"6fa9e64d83f3","components/data/Pagination.jsx":"cc28278acf7d","components/data/Progress.jsx":"eb02438a3b31","components/data/StatMeter.jsx":"657462f3e4aa","components/data/StateView.jsx":"1db574af4cf3","components/data/Table.jsx":"2a8a72b119f2","components/data/_columns.js":"d862780d1495","components/data/chart-parts.jsx":"74c42cdc8316","components/forms/Calendar.jsx":"343335c77c44","components/forms/Checkbox.jsx":"fa0052232568","components/forms/Combobox.jsx":"c38e8d668db1","components/forms/DatePicker.jsx":"692aed22fa29","components/forms/Field.jsx":"19afba76a395","components/forms/FileUpload.jsx":"1b9765bb958f","components/forms/Input.jsx":"a43b7b4b5564","components/forms/InputGroup.jsx":"71d8de495436","components/forms/RichText.jsx":"aac8293d49fd","components/forms/Segmented.jsx":"5d3fa220ea03","components/forms/Select.jsx":"378e70b32827","components/forms/Stepper.jsx":"7fe21c7619e6","components/forms/Switch.jsx":"cc99b023531b","components/forms/Textarea.jsx":"2d2aa2984da3","components/layout/Cluster.jsx":"2e15367fe28d","components/layout/Container.jsx":"6eda4bc56e54","components/layout/Grid.jsx":"8a093fe6ed4b","components/layout/Page.jsx":"51d1753d201a","components/layout/Section.jsx":"4507aff3c57c","components/layout/Split.jsx":"6786154d4ebd","components/layout/Stack.jsx":"005a591d8c24","components/marketing/AnnounceBar.jsx":"dc1787b8fe7e","components/marketing/ArticleCard.jsx":"81f2c4227ced","components/marketing/Byline.jsx":"529ce44347b1","components/marketing/CompareTable.jsx":"1ffe4c6713f5","components/marketing/FeatureGrid.jsx":"ff6d9c74ae63","components/marketing/Flow.jsx":"47f084ffae8a","components/marketing/Hero.jsx":"ba4893068f68","components/marketing/LogoRail.jsx":"1bedd4cadb90","components/marketing/PlanCard.jsx":"39f27cba6a4d","components/marketing/Quote.jsx":"d7d463bc50d4","components/marketing/SiteFooter.jsx":"82207f2c85e5","components/marketing/Steps.jsx":"08dfc37d83e9","components/marketing/StoryCard.jsx":"e28322d02714","components/nav/AppBar.jsx":"d2da0aa4c6a0","components/nav/BottomNav.jsx":"570ba83df9c7","components/nav/Breadcrumbs.jsx":"1f2cb1328942","components/nav/CommandPalette.jsx":"48d4ea9554c7","components/nav/NavToggle.jsx":"7c2def3f8014","components/nav/Sidebar.jsx":"723b0aa11c93","components/nav/Tabs.jsx":"09d2bf40f0e0","components/nav/ThemeToggle.jsx":"1bf447a338cb","components/nav/TopBar.jsx":"6b8c0ccd5933","components/overlays/Dialog.jsx":"ff8e21cb381a","components/overlays/Drawer.jsx":"269d2920684c","components/overlays/Menu.jsx":"4764582f0ae8","components/overlays/Popover.jsx":"717f23c3c127","components/overlays/Toast.jsx":"a14d5bdddb79","components/overlays/Tooltip.jsx":"7b19e7dc9711","components/primitives/Avatar.jsx":"277ea4c7ca39","components/primitives/Button.jsx":"a613116ec327","components/primitives/Card.jsx":"4a9c9f081c1b","components/primitives/Chip.jsx":"458e477fd284","components/primitives/Disclosure.jsx":"250d58f947f5","components/primitives/Eyebrow.jsx":"ac1cc5e5856f","components/primitives/Icon.jsx":"1dd0488adf2d","components/primitives/Prose.jsx":"7b629b089f2a","components/primitives/Skeleton.jsx":"76129a849b43","hooks.js":"0e3b40fcfa4e","react.js":"f9e103bed9f6"},"inlinedExternals":[],"unexposedExports":[{"name":"__resetDeprecations","sourcePath":"components/_deprecate.js"},{"name":"deprecate","sourcePath":"components/_deprecate.js"},{"name":"useMergedRef","sourcePath":"components/_merge-refs.js"},{"name":"useRadioGroup","sourcePath":"components/_radio-group.js"},{"name":"colHeader","sourcePath":"components/data/_columns.js"},{"name":"emitSort","sourcePath":"components/data/_columns.js"},{"name":"legacySortArgs","sourcePath":"components/data/_columns.js"},{"name":"Grid","sourcePath":"components/data/chart-parts.jsx"},{"name":"cx","sourcePath":"components/data/chart-parts.jsx"},{"name":"frame","sourcePath":"components/data/chart-parts.jsx"},{"name":"nf","sourcePath":"components/data/chart-parts.jsx"},{"name":"ticks","sourcePath":"components/data/chart-parts.jsx"},{"name":"animateCounter","sourcePath":"hooks.js"},{"name":"paint","sourcePath":"hooks.js"},{"name":"persist","sourcePath":"hooks.js"},{"name":"useDeterministicCascade","sourcePath":"hooks.js"},{"name":"useReducedMotion","sourcePath":"hooks.js"},{"name":"useReveal","sourcePath":"hooks.js"},{"name":"useSpotlight","sourcePath":"hooks.js"},{"name":"useTheme","sourcePath":"hooks.js"}]} */
(() => {
  var __create = Object.create;
  var __defProp = Object.defineProperty;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __getProtoOf = Object.getPrototypeOf;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __esm = (fn, res) => function __init() {
    return fn && (res = (0, fn[__getOwnPropNames(fn)[0]])(fn = 0)), res;
  };
  var __commonJS = (cb, mod) => function __require() {
    return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
  };
  var __copyProps = (to, from, except, desc) => {
    if (from && typeof from === "object" || typeof from === "function") {
      for (let key of __getOwnPropNames(from))
        if (!__hasOwnProp.call(to, key) && key !== except)
          __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
    }
    return to;
  };
  var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
    // If the importer is in node compatibility mode or this is not an ESM
    // file that has been converted to a CommonJS file using a Babel-
    // compatible transform (i.e. "__esModule" has not been set), then set
    // "default" to the CommonJS "module.exports" for node compatibility.
    isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
    mod
  ));

  // ds-shim:ds:inject-react
  var React;
  var init_ds_inject_react = __esm({
    "ds-shim:ds:inject-react"() {
      React = globalThis.React;
    }
  });

  // ds-shim:ds:react
  var require_ds_react = __commonJS({
    "ds-shim:ds:react"(exports, module) {
      init_ds_inject_react();
      module.exports = globalThis.React;
    }
  });

  // ds-entry.js
  init_ds_inject_react();

  // react.js
  init_ds_inject_react();

  // components/primitives/Avatar.jsx
  init_ds_inject_react();
  var cx = (...a) => a.filter(Boolean).join(" ");
  function Avatar({ name = "", src, size = "md", className, ...rest }) {
    const initials = name.trim().split(/\s+/).slice(0, 2).map((w) => w[0] || "").join("").toUpperCase();
    return /* @__PURE__ */ React.createElement("span", { className: cx("lw-avatar", size === "sm" && "lw-avatar-sm", size === "lg" && "lw-avatar-lg", className), title: name || void 0, ...rest }, src ? /* @__PURE__ */ React.createElement("img", { src, alt: name }) : initials);
  }

  // components/primitives/Button.jsx
  init_ds_inject_react();
  var cx2 = (...a) => a.filter(Boolean).join(" ");
  function Button({
    variant = "brand",
    size = "md",
    iconOnly = false,
    loading = false,
    disabled = false,
    as,
    type,
    className,
    onClick,
    children,
    ...rest
  }) {
    const Tag = as || (rest.href ? "a" : "button");
    return /* @__PURE__ */ React.createElement(
      Tag,
      {
        className: cx2(
          "lw-btn",
          `lw-btn-${variant}`,
          size === "sm" && "lw-btn-sm",
          size === "lg" && "lw-btn-lg",
          iconOnly && "lw-btn-icon",
          className
        ),
        "data-loading": loading ? "true" : void 0,
        "aria-disabled": loading || disabled ? "true" : void 0,
        disabled: Tag === "button" ? disabled : void 0,
        type: Tag === "button" ? type : void 0,
        onClick: (e) => {
          if (loading || disabled) {
            e.preventDefault();
            e.stopPropagation();
            return;
          }
          onClick && onClick(e);
        },
        ...rest
      },
      children
    );
  }

  // components/primitives/Card.jsx
  init_ds_inject_react();
  var cx3 = (...a) => a.filter(Boolean).join(" ");
  function Card({ interactive = false, glow = false, selected, as, className, children, ...rest }) {
    const Tag = as || (interactive ? rest.href ? "a" : "button" : "div");
    return /* @__PURE__ */ React.createElement(
      Tag,
      {
        className: cx3("lw-card", interactive && "lw-card-interactive", glow && "lw-card-glow", className),
        "aria-pressed": interactive && selected != null ? !!selected : void 0,
        "data-selected": selected ? "true" : void 0,
        type: Tag === "button" ? "button" : void 0,
        ...rest
      },
      children
    );
  }
  function CardHead({ className, children, ...rest }) {
    return /* @__PURE__ */ React.createElement("div", { className: cx3("lw-card-head", className), ...rest }, children);
  }
  function CardTitle({ as: Tag = "h3", className, children, ...rest }) {
    return /* @__PURE__ */ React.createElement(Tag, { className: cx3("lw-card-title", className), ...rest }, children);
  }
  function CardBody({ className, children, ...rest }) {
    return /* @__PURE__ */ React.createElement("p", { className: cx3("lw-card-body", className), ...rest }, children);
  }
  function CardFoot({ className, children, ...rest }) {
    return /* @__PURE__ */ React.createElement("div", { className: cx3("lw-card-foot", className), ...rest }, children);
  }

  // components/primitives/Chip.jsx
  init_ds_inject_react();
  var cx4 = (...a) => a.filter(Boolean).join(" ");
  function Chip({ tone = "brand", className, children, ...rest }) {
    return /* @__PURE__ */ React.createElement("span", { className: cx4("lw-chip", tone !== "brand" && `lw-chip-${tone}`, className), ...rest }, children);
  }

  // components/primitives/Eyebrow.jsx
  init_ds_inject_react();
  var cx5 = (...a) => a.filter(Boolean).join(" ");
  function Eyebrow({ as: Tag = "p", className, children, ...rest }) {
    return /* @__PURE__ */ React.createElement(Tag, { className: cx5("lw-eyebrow", className), ...rest }, children);
  }

  // components/primitives/Skeleton.jsx
  init_ds_inject_react();
  var cx6 = (...a) => a.filter(Boolean).join(" ");
  function Skeleton({ shape = "block", width, height, lines, className, style, ...rest }) {
    if (lines) {
      return /* @__PURE__ */ React.createElement("span", { className: cx6("lw-skeleton-lines", className), style, "aria-hidden": "true", ...rest }, Array.from({ length: lines }, (_, i) => /* @__PURE__ */ React.createElement("span", { key: i, className: "lw-skeleton text" })));
    }
    return /* @__PURE__ */ React.createElement("span", { className: cx6("lw-skeleton", shape !== "block" && shape, className), style: { width, height, ...style }, "aria-hidden": "true", ...rest });
  }

  // components/primitives/Icon.jsx
  init_ds_inject_react();
  var React2 = __toESM(require_ds_react(), 1);
  var cx7 = (...a) => a.filter(Boolean).join(" ");
  var ICONS = {
    sidebar: ["M4 5.5A2 2 0 0 1 6 3.5h12a2 2 0 0 1 2 2v13a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2z", "M10 3.5v17"],
    "sidebar-right": ["M4 5.5A2 2 0 0 1 6 3.5h12a2 2 0 0 1 2 2v13a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2z", "M14 3.5v17"],
    plus: ["M12 5v14", "M5 12h14"],
    paperclip: ["M13.4 6.6 7.7 12.3a3.2 3.2 0 0 0 4.5 4.5l6.4-6.4a5 5 0 0 0-7.1-7.1l-6.6 6.6a6.8 6.8 0 0 0 9.6 9.6l3.2-3.2"],
    filter: ["M4 6.5h16", "M7 12h10", "M10 17.5h4"],
    send: ["M12 19.5V5", "M6 11l6-6 6 6"],
    book: ["M19.5 3H7a2.5 2.5 0 0 0-2.5 2.5v13A2.5 2.5 0 0 1 7 16h12.5z", "M4.5 18.5A2.5 2.5 0 0 1 7 21h12.5v-5"],
    quote: ["M10.4 6.6C7.6 7.9 5.9 10.3 5.9 13.2v4.2h5.4v-5.1H8.6c0-1.7.7-3 2.1-3.9z", "M19.1 6.6c-2.8 1.3-4.5 3.7-4.5 6.6v4.2H20v-5.1h-2.7c0-1.7.7-3 2.1-3.9z"],
    list: ["M9 6.5h11", "M9 12h11", "M9 17.5h11", "M4.6 6.5h.01", "M4.6 12h.01", "M4.6 17.5h.01"],
    close: ["M6.5 6.5l11 11", "M17.5 6.5l-11 11"],
    copy: ["M9.5 8.5h9a1 1 0 0 1 1 1v9a1 1 0 0 1-1 1h-9a1 1 0 0 1-1-1v-9a1 1 0 0 1 1-1z", "M5.5 15.5a1 1 0 0 1-1-1v-9a1 1 0 0 1 1-1h9a1 1 0 0 1 1 1"],
    retry: ["M19.5 12a7.5 7.5 0 1 1-2.2-5.3", "M19.5 4.5V9H15"],
    download: ["M12 4.5v10.5", "M7.5 11l4.5 4.5 4.5-4.5", "M5 19.5h14"],
    spark: ["M12 3.5l2.1 5.4 5.4 2.1-5.4 2.1L12 18.5l-2.1-5.4L4.5 11l5.4-2.1z"],
    layers: ["M12 3.5l8 4.3-8 4.3-8-4.3z", "M4 12.6l8 4.3 8-4.3"],
    check: ["M12 3.5a8.5 8.5 0 1 0 0 17 8.5 8.5 0 0 0 0-17", "M8.5 12.3l2.6 2.6 4.6-5.2"],
    users: ["M9 4.5a3.3 3.3 0 1 0 0 6.6 3.3 3.3 0 0 0 0-6.6", "M3.5 20a5.5 5.5 0 0 1 11 0", "M16 5.6a3.3 3.3 0 0 1 0 5.4", "M17.2 20a5.6 5.6 0 0 0-1.7-3.9"],
    settings: ["M12 9a3 3 0 1 0 0 6 3 3 0 0 0 0-6", "M12 3.5v2.2", "M12 18.3v2.2", "M5.2 7.6l1.9 1.1", "M16.9 15.3l1.9 1.1", "M5.2 16.4l1.9-1.1", "M16.9 8.7l1.9-1.1"],
    clock: ["M12 3.5a8.5 8.5 0 1 0 0 17 8.5 8.5 0 0 0 0-17", "M12 7.5V12l3.4 2"],
    search: ["M10.8 4.2a6.6 6.6 0 1 0 0 13.2 6.6 6.6 0 0 0 0-13.2", "M15.6 15.6l4.2 4.2"],
    key: ["M15.4 3.6a5 5 0 0 0-4.4 7.3L3.5 18.4V20.5h2.1l1-1v-1.8h1.8l1-1h1.8l1.6-1.6a5 5 0 1 0 1.6-9.5", "M17 7.6h.01"],
    database: ["M12 3.5c4 0 7.2 1.1 7.2 2.5S16 8.5 12 8.5 4.8 7.4 4.8 6S8 3.5 12 3.5", "M4.8 6v12c0 1.4 3.2 2.5 7.2 2.5s7.2-1.1 7.2-2.5V6", "M4.8 12c0 1.4 3.2 2.5 7.2 2.5s7.2-1.1 7.2-2.5"],
    shield: ["M12 3.2l7 2.6v5.4c0 4.2-2.8 7.5-7 9.6-4.2-2.1-7-5.4-7-9.6V5.8z", "M8.9 11.9l2.2 2.2 4-4.4"],
    code: ["M9 7.5L4.5 12 9 16.5", "M15 7.5L19.5 12 15 16.5"],
    webhook: ["M8.6 10.4a3.9 3.9 0 1 1 5.6 3.5", "M12 14a4 4 0 1 0 3.7 5.5", "M15.7 19.5H8.2", "M8.3 14.2A4 4 0 1 0 4.6 9"],
    alert: ["M12 3.8l8.5 15.2H3.5z", "M12 9.6v4.1", "M12 16.6h.01"],
    rocket: ["M13.5 4.6c3.2-1.1 5.9-.9 5.9-.9s.2 2.7-.9 5.9c-.9 2.6-3.7 5.4-6 7l-3.2-.5-2.3-2.3-.5-3.2c1.6-2.3 4.4-5.1 7-6z", "M14.8 8.9h.01", "M8.6 16.4l-3 3", "M6.2 12.6L4 13.4l1.6 1.6", "M11.4 17.8l.8-2.2 1.6 1.6"],
    "chevron-down": ["M6.5 9.5l5.5 6 5.5-6"],
    sun: ["M12 8.2a3.8 3.8 0 1 0 0 7.6 3.8 3.8 0 0 0 0-7.6", "M12 2.8v2.1", "M12 19.1v2.1", "M4.9 4.9l1.5 1.5", "M17.6 17.6l1.5 1.5", "M2.8 12h2.1", "M19.1 12h2.1", "M4.9 19.1l1.5-1.5", "M17.6 6.4l1.5-1.5"],
    moon: ["M20 14.4A8.4 8.4 0 0 1 9.6 4a8.5 8.5 0 1 0 10.4 10.4"],
    monitor: ["M4.5 5h15a1 1 0 0 1 1 1v9a1 1 0 0 1-1 1h-15a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1z", "M9 20h6", "M12 16v4"],
    edit: ["M4.5 19.5h4L20 8a2.1 2.1 0 0 0-3-3L5.5 16.5z"],
    "chevron-left": ["M14.5 6.5l-6 5.5 6 5.5"],
    "chevron-right": ["M9.5 6.5l6 5.5-6 5.5"],
    "chevron-up": ["M6.5 14.5l5.5-6 5.5 6"],
    user: ["M12 4.6a3.6 3.6 0 1 0 0 7.2 3.6 3.6 0 0 0 0-7.2", "M5.2 20a6.8 6.8 0 0 1 13.6 0"],
    "arrow-up": ["M12 19.5V5", "M6 11l6-6 6 6"],
    "arrow-down": ["M12 4.5V19", "M18 13l-6 6-6-6"],
    "arrow-right": ["M4.5 12h15", "M13.5 6l6 6-6 6"],
    "arrow-left": ["M19.5 12h-15", "M10.5 6l-6 6 6 6"],
    trash: ["M5 7.5h14", "M9.5 7.5V5.6a1.1 1.1 0 0 1 1.1-1.1h2.8a1.1 1.1 0 0 1 1.1 1.1v1.9", "M6.9 7.5l.8 11.1a1.6 1.6 0 0 0 1.6 1.4h5.4a1.6 1.6 0 0 0 1.6-1.4l.8-11.1", "M10.4 11v5.4", "M13.6 11v5.4"],
    external: ["M14 4.5h5.5V10", "M19.5 4.5L11 13", "M17.5 14v4.5a1.5 1.5 0 0 1-1.5 1.5H6a1.5 1.5 0 0 1-1.5-1.5V8A1.5 1.5 0 0 1 6 6.5h4.5"],
    info: ["M12 3.5a8.5 8.5 0 1 0 0 17 8.5 8.5 0 0 0 0-17", "M12 11.2v5.2", "M12 7.7h.01"],
    more: ["M6 12h.01", "M12 12h.01", "M18 12h.01"],
    file: ["M13.5 3.5H7A1.5 1.5 0 0 0 5.5 5v14A1.5 1.5 0 0 0 7 20.5h10a1.5 1.5 0 0 0 1.5-1.5V8.5z", "M13.5 3.5v5h5"],
    chart: ["M4.5 19.5h15", "M7.6 19.5v-6.2", "M12 19.5V6.4", "M16.4 19.5v-4.1"],
    /* ---- Added for the control layer (Popover, Menu, Combobox, DataGrid,
       DatePicker, Upload, Notifications, AI review). One pass, not one at a time:
       Rule 8 ("name a glyph, never draw one") only holds while adding one is cheap. */
    calendar: ["M5 6.5h14a1 1 0 0 1 1 1v11a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1v-11a1 1 0 0 1 1-1z", "M4 10.5h16", "M8.5 4v4", "M15.5 4v4"],
    upload: ["M12 15.5V4.5", "M7.5 9L12 4.5 16.5 9", "M5 19.5h14"],
    /* A thumbtack seen head-on: a cap, a tapering shaft, a point. The first pass drew
       it at an angle, which at 16px read as an unidentifiable wedge — a glyph has to
       survive the size it is actually used at, and pin is used in a 12px column head. */
    pin: ["M8.5 4h7", "M10.5 4v6l-2.5 3h8l-2.5-3V4", "M12 13v7"],
    grip: ["M9 6h.01", "M15 6h.01", "M9 12h.01", "M15 12h.01", "M9 18h.01", "M15 18h.01"],
    columns: ["M4.5 5h15a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1h-15a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1z", "M9.5 5v14", "M15 5v14"],
    /* `check` is the CIRCLED check and predates this set; `checkmark` is the bare
       one a menu item and a checkbox need. Two glyphs, two names, no renaming — a
       rename here would silently repoint every existing consumer. */
    checkmark: ["M5 12.8l4.6 4.7L19 7.5"],
    minus: ["M5 12h14"],
    "x-circle": ["M12 3.5a8.5 8.5 0 1 0 0 17 8.5 8.5 0 0 0 0-17", "M9.2 9.2l5.6 5.6", "M14.8 9.2l-5.6 5.6"],
    "more-vertical": ["M12 6h.01", "M12 12h.01", "M12 18h.01"],
    "chevrons-up-down": ["M8 10l4-4 4 4", "M8 14l4 4 4-4"],
    /* Direction is never ONE cue (rule 6). The first pass distinguished asc from desc
       by line length alone — three bars getting shorter versus longer, which nobody
       reads as a direction at a glance and nothing reads in a 13px table header. Both
       now carry an arrow as well, so the sort direction survives being small. */
    "sort-asc": ["M4.5 7h7", "M4.5 12h5", "M4.5 17h3", "M17 18.5V7.5", "M14 10.5l3-3 3 3"],
    "sort-desc": ["M4.5 7h7", "M4.5 12h5", "M4.5 17h3", "M17 7.5v11", "M14 15.5l3 3 3-3"],
    eye: ["M2.8 12S6.5 5.8 12 5.8 21.2 12 21.2 12 17.5 18.2 12 18.2 2.8 12 2.8 12z", "M12 9.2a2.8 2.8 0 1 0 0 5.6 2.8 2.8 0 0 0 0-5.6"],
    "eye-off": ["M9.9 5.9A8 8 0 0 1 12 5.8c5.5 0 9.2 6.2 9.2 6.2a17 17 0 0 1-3 3.7", "M6.3 7.9A17 17 0 0 0 2.8 12S6.5 18.2 12 18.2a8.3 8.3 0 0 0 3.3-.7", "M10 10a2.8 2.8 0 0 0 3.9 3.9", "M4.5 4.5l15 15"],
    lock: ["M6.5 10.5h11a1 1 0 0 1 1 1v7a1 1 0 0 1-1 1h-11a1 1 0 0 1-1-1v-7a1 1 0 0 1 1-1z", "M8.5 10.5V8a3.5 3.5 0 0 1 7 0v2.5"],
    mail: ["M4.5 5.5h15a1 1 0 0 1 1 1v11a1 1 0 0 1-1 1h-15a1 1 0 0 1-1-1v-11a1 1 0 0 1 1-1z", "M4 7l8 5.5L20 7"],
    link: ["M10.5 13.5a4 4 0 0 0 5.7 0l2.6-2.6a4 4 0 0 0-5.7-5.7l-1.5 1.5", "M13.5 10.5a4 4 0 0 0-5.7 0l-2.6 2.6a4 4 0 0 0 5.7 5.7l1.5-1.5"],
    image: ["M4.5 4.5h15a1 1 0 0 1 1 1v13a1 1 0 0 1-1 1h-15a1 1 0 0 1-1-1v-13a1 1 0 0 1 1-1z", "M9 10.2a1.7 1.7 0 1 0 0-3.4 1.7 1.7 0 0 0 0 3.4", "M20.5 15.5l-4.8-4.8L5 19.5"],
    folder: ["M3.5 6.5a1 1 0 0 1 1-1h4.3l2 2.5h8.7a1 1 0 0 1 1 1v9.5a1 1 0 0 1-1 1h-15a1 1 0 0 1-1-1z"],
    star: ["M12 3.8l2.6 5.3 5.8.8-4.2 4.1 1 5.8-5.2-2.8-5.2 2.8 1-5.8-4.2-4.1 5.8-.8z"],
    bell: ["M18 9.5a6 6 0 1 0-12 0c0 5-2 6.5-2 6.5h16s-2-1.5-2-6.5", "M13.7 19.5a2 2 0 0 1-3.4 0"],
    inbox: ["M6.3 5h11.4a1 1 0 0 1 .95.68l1.85 5.5a1 1 0 0 1 .05.32v6.5a1 1 0 0 1-1 1h-15a1 1 0 0 1-1-1V11.5a1 1 0 0 1 .05-.32l1.85-5.5A1 1 0 0 1 6.3 5z", "M3.6 12.5h4.4l1.5 3h5l1.5-3h4.4"],
    play: ["M8 5.5l10 6.5-10 6.5z"],
    pause: ["M9 5.5v13", "M15 5.5v13"],
    mic: ["M12 3.5a2.8 2.8 0 0 1 2.8 2.8v5.4a2.8 2.8 0 0 1-5.6 0V6.3A2.8 2.8 0 0 1 12 3.5", "M5.5 11a6.5 6.5 0 0 0 13 0", "M12 17.5v3"],
    "mic-off": ["M9.2 6.3a2.8 2.8 0 0 1 5.6 0v5.4a2.8 2.8 0 0 1-.3 1.3", "M14.5 14.9a2.8 2.8 0 0 1-5.3-1.2V9.8", "M5.5 11a6.5 6.5 0 0 0 10.4 5.2", "M18.5 11v.6", "M12 17.5v3", "M4.5 4.5l15 15"],
    "thumbs-up": ["M7.5 20V9.5l4-6a2 2 0 0 1 3 2.2L13.8 9h4.7a2 2 0 0 1 2 2.4l-1.4 6.5a2 2 0 0 1-2 1.6z", "M7.5 9.5H4.8a1 1 0 0 0-1 1V19a1 1 0 0 0 1 1h2.7"],
    "thumbs-down": ["M16.5 4v10.5l-4 6a2 2 0 0 1-3-2.2l.7-3.3H5.5a2 2 0 0 1-2-2.4l1.4-6.5A2 2 0 0 1 6.9 4z", "M16.5 14.5h2.7a1 1 0 0 0 1-1V5a1 1 0 0 0-1-1h-2.7"],
    maximize: ["M9 4.5H4.5V9", "M15 4.5h4.5V9", "M15 19.5h4.5V15", "M9 19.5H4.5V15"],
    minimize: ["M4.5 9H9V4.5", "M19.5 9H15V4.5", "M19.5 15H15v4.5", "M4.5 15H9v4.5"],
    undo: ["M4.5 12a7.5 7.5 0 1 0 2.2-5.3", "M4.5 4.5V9H9"],
    help: ["M12 3.5a8.5 8.5 0 1 0 0 17 8.5 8.5 0 0 0 0-17", "M9.6 9.4a2.5 2.5 0 0 1 4.9.6c0 1.7-2.5 2.5-2.5 2.5", "M12 16.5h.01"],
    /* The hamburger, for the mobile nav disclosure. Three rules on the same 24
       grid as `list`, which is the same drawing with an indent — a nav toggle and
       a bulleted-list glyph are different meanings and get different names, but
       they share the geometry so the two never look like two icon sets. Its
       partner is the existing `close`; there is no second X. */
    menu: ["M4.5 7h15", "M4.5 12h15", "M4.5 17h15"]
  };
  var UNKNOWN = ["M5.5 5.5h13v13h-13z", "M9.4 9.4l5.2 5.2", "M14.6 9.4l-5.2 5.2"];
  var warned = /* @__PURE__ */ new Set();
  function Icon({ name, size = 16, strokeWidth = 1.6, label, className, style, ...rest }) {
    const known = ICONS[name];
    if (!known && !warned.has(name) && typeof console !== "undefined") {
      warned.add(name);
      console.warn(`Icon: no glyph named "${name}". Known names: ${Object.keys(ICONS).join(", ")}`);
    }
    const paths = known || UNKNOWN;
    return /* @__PURE__ */ React2.createElement(
      "svg",
      {
        className: cx7("lw-icon", className),
        width: size,
        height: size,
        viewBox: "0 0 24 24",
        style: { width: size, height: size, ...style },
        fill: "none",
        stroke: "currentColor",
        strokeWidth,
        strokeLinecap: "round",
        strokeLinejoin: "round",
        role: label ? "img" : void 0,
        "aria-label": label,
        "aria-hidden": label ? void 0 : "true",
        "data-unknown": known ? void 0 : "true",
        ...rest
      },
      paths.map((d, i) => /* @__PURE__ */ React2.createElement("path", { key: i, d }))
    );
  }
  var iconNames = Object.keys(ICONS);
  var IconNames = iconNames;

  // components/primitives/Disclosure.jsx
  init_ds_inject_react();
  var cx8 = (...a) => a.filter(Boolean).join(" ");
  function Disclosure({ summary, defaultOpen = false, className, children, ...rest }) {
    return /* @__PURE__ */ React.createElement("details", { className: cx8("lw-disclosure", className), open: defaultOpen || void 0, ...rest }, /* @__PURE__ */ React.createElement("summary", null, /* @__PURE__ */ React.createElement("span", null, summary), /* @__PURE__ */ React.createElement(Icon, { name: "chevron-down", size: 18 })), /* @__PURE__ */ React.createElement("div", { className: "lw-disclosure-body" }, children));
  }

  // components/primitives/Prose.jsx
  init_ds_inject_react();
  var cx9 = (...a) => a.filter(Boolean).join(" ");
  function Prose({ measure = "prose", as: Tag = "div", className, children, ...rest }) {
    const cls = cx9("lw-prose", measure === "narrow" && "lw-prose-narrow", className);
    if (rest.dangerouslySetInnerHTML) return /* @__PURE__ */ React.createElement(Tag, { className: cls, ...rest });
    return /* @__PURE__ */ React.createElement(Tag, { className: cls, ...rest }, children);
  }

  // components/layout/Page.jsx
  init_ds_inject_react();
  var cx10 = (...a) => a.filter(Boolean).join(" ");
  function Page({ className, children, ...rest }) {
    return /* @__PURE__ */ React.createElement("div", { className: cx10("lw-page", className), ...rest }, children);
  }

  // components/layout/Container.jsx
  init_ds_inject_react();
  var cx11 = (...a) => a.filter(Boolean).join(" ");
  function Container({ className, children, ...rest }) {
    return /* @__PURE__ */ React.createElement("div", { className: cx11("lw-container", className), ...rest }, children);
  }

  // components/layout/Stack.jsx
  init_ds_inject_react();
  var cx12 = (...a) => a.filter(Boolean).join(" ");
  function Stack({ gap = 16, as: Tag = "div", className, children, ...rest }) {
    return /* @__PURE__ */ React.createElement(Tag, { className: cx12("lw-stack", gap !== 16 && `lw-stack-${gap}`, className), ...rest }, children);
  }

  // components/layout/Cluster.jsx
  init_ds_inject_react();
  var cx13 = (...a) => a.filter(Boolean).join(" ");
  function Cluster({ gap = 8, justify, align, as: Tag = "div", className, children, ...rest }) {
    return /* @__PURE__ */ React.createElement(Tag, { className: cx13(
      "lw-cluster",
      gap !== 8 && `lw-cluster-${gap}`,
      justify === "between" && "lw-cluster-between",
      justify === "end" && "lw-cluster-end",
      align === "baseline" && "lw-cluster-baseline",
      className
    ), ...rest }, children);
  }

  // components/layout/Grid.jsx
  init_ds_inject_react();
  var cx14 = (...a) => a.filter(Boolean).join(" ");
  function Grid({ min, gap = 16, as: Tag = "div", className, style, children, ...rest }) {
    return /* @__PURE__ */ React.createElement(
      Tag,
      {
        className: cx14("lw-grid", gap === 24 && "lw-grid-24", className),
        style: min ? { "--lw-grid-min": typeof min === "number" ? min + "px" : min, ...style } : style,
        ...rest
      },
      children
    );
  }

  // components/layout/Split.jsx
  init_ds_inject_react();
  var cx15 = (...a) => a.filter(Boolean).join(" ");
  function Split({ rail = 320, side = "end", as: Tag = "div", className, style, children, ...rest }) {
    return /* @__PURE__ */ React.createElement(
      Tag,
      {
        className: cx15("lw-split", side === "start" && "lw-split-start", className),
        style: { "--lw-split-rail": typeof rail === "number" ? rail + "px" : rail, ...style },
        ...rest
      },
      children
    );
  }

  // components/layout/Section.jsx
  init_ds_inject_react();
  var cx16 = (...a) => a.filter(Boolean).join(" ");
  function Section({ dark = false, tight = false, className, children, ...rest }) {
    return /* @__PURE__ */ React.createElement(
      "section",
      {
        className: cx16("lw-section", tight && "tight", dark && "dark lw-band-dark", className),
        "data-band": dark ? "dark" : void 0,
        ...rest
      },
      children
    );
  }

  // components/forms/Field.jsx
  init_ds_inject_react();
  var React3 = __toESM(require_ds_react(), 1);
  var cx17 = (...a) => a.filter(Boolean).join(" ");
  function Field({
    label,
    help,
    error,
    required,
    optional,
    htmlFor,
    requiredLabel = "(required)",
    optionalLabel = "optional",
    className,
    children,
    ...rest
  }) {
    const auto = React3.useId();
    const id = htmlFor || auto;
    const msgId = id + "-msg";
    return /* @__PURE__ */ React3.createElement("div", { className: cx17("lw-field", className), ...rest }, label && /* @__PURE__ */ React3.createElement("label", { className: "lw-label", htmlFor: id }, label, required && /* @__PURE__ */ React3.createElement(React3.Fragment, null, /* @__PURE__ */ React3.createElement("span", { className: "req", "aria-hidden": "true" }, "*"), /* @__PURE__ */ React3.createElement("span", { className: "lw-sr-only" }, requiredLabel)), optional && /* @__PURE__ */ React3.createElement("span", { className: "opt" }, optionalLabel)), typeof children === "function" ? children({ id, "aria-describedby": error || help ? msgId : void 0, "aria-invalid": error ? "true" : void 0, required }) : children, error ? /* @__PURE__ */ React3.createElement("span", { className: "lw-error", id: msgId, role: "alert" }, error) : help ? /* @__PURE__ */ React3.createElement("span", { className: "lw-help", id: msgId }, help) : null);
  }

  // components/forms/Input.jsx
  init_ds_inject_react();
  var React4 = __toESM(require_ds_react(), 1);
  var cx18 = (...a) => a.filter(Boolean).join(" ");
  var Input = React4.forwardRef(function Input2({ size = "md", invalid, className, ...rest }, ref) {
    return /* @__PURE__ */ React4.createElement(
      "input",
      {
        ref,
        className: cx18("lw-input", size === "sm" && "lw-input-sm", size === "lg" && "lw-input-lg", className),
        "aria-invalid": invalid ? "true" : void 0,
        ...rest
      }
    );
  });

  // components/forms/InputGroup.jsx
  init_ds_inject_react();
  var cx19 = (...a) => a.filter(Boolean).join(" ");
  function InputGroup({ prefix, suffix, className, children, ...rest }) {
    return /* @__PURE__ */ React.createElement("div", { className: cx19("lw-input-group", className), ...rest }, prefix && /* @__PURE__ */ React.createElement("span", { className: "affix" }, prefix), children, suffix && /* @__PURE__ */ React.createElement("span", { className: "affix mono" }, suffix));
  }

  // components/forms/Textarea.jsx
  init_ds_inject_react();
  var React5 = __toESM(require_ds_react(), 1);
  var cx20 = (...a) => a.filter(Boolean).join(" ");
  var Textarea = React5.forwardRef(function Textarea2({ invalid, className, ...rest }, ref) {
    return /* @__PURE__ */ React5.createElement("textarea", { ref, className: cx20("lw-textarea", className), "aria-invalid": invalid ? "true" : void 0, ...rest });
  });

  // components/forms/Select.jsx
  init_ds_inject_react();
  var React6 = __toESM(require_ds_react(), 1);
  var cx21 = (...a) => a.filter(Boolean).join(" ");
  var Select = React6.forwardRef(function Select2({ options, invalid, className, children, ...rest }, ref) {
    return /* @__PURE__ */ React6.createElement("select", { ref, className: cx21("lw-select", className), "aria-invalid": invalid ? "true" : void 0, ...rest }, options ? options.map((o) => {
      const v = typeof o === "string" ? o : o.value;
      const l = typeof o === "string" ? o : o.label;
      return /* @__PURE__ */ React6.createElement("option", { key: v, value: v }, l);
    }) : children);
  });

  // components/forms/Switch.jsx
  init_ds_inject_react();
  var React7 = __toESM(require_ds_react(), 1);
  var cx22 = (...a) => a.filter(Boolean).join(" ");
  var Switch = React7.forwardRef(function Switch2({ label, className, ...rest }, ref) {
    return /* @__PURE__ */ React7.createElement("label", { className: cx22("lw-switch", className) }, /* @__PURE__ */ React7.createElement("input", { ref, type: "checkbox", role: "switch", ...rest }), /* @__PURE__ */ React7.createElement("span", { className: "track" }), label && /* @__PURE__ */ React7.createElement("span", { className: "lw-switch-text" }, label));
  });

  // components/forms/Checkbox.jsx
  init_ds_inject_react();
  var React8 = __toESM(require_ds_react(), 1);
  var cx23 = (...a) => a.filter(Boolean).join(" ");
  var Checkbox = React8.forwardRef(function Checkbox2({ label, radio = false, className, ...rest }, ref) {
    return /* @__PURE__ */ React8.createElement("label", { className: cx23("lw-check", radio && "radio", className) }, /* @__PURE__ */ React8.createElement("input", { ref, type: radio ? "radio" : "checkbox", ...rest }), /* @__PURE__ */ React8.createElement("span", { className: "box" }), label && /* @__PURE__ */ React8.createElement("span", { className: "lw-check-text" }, label));
  });

  // components/forms/Segmented.jsx
  init_ds_inject_react();
  var React11 = __toESM(require_ds_react(), 1);

  // components/_merge-refs.js
  init_ds_inject_react();
  var React9 = __toESM(require_ds_react(), 1);
  function useMergedRef(localRef, forwardedRef) {
    return React9.useCallback(
      (node) => {
        localRef.current = node;
        if (typeof forwardedRef === "function") forwardedRef(node);
        else if (forwardedRef) forwardedRef.current = node;
      },
      [localRef, forwardedRef]
    );
  }

  // components/_radio-group.js
  init_ds_inject_react();
  var React10 = __toESM(require_ds_react(), 1);
  function useRadioGroup(values, value, select) {
    const ref = React10.useRef(null);
    const at = values.indexOf(value);
    const tabIndexFor = (i) => at === -1 ? i === 0 ? 0 : -1 : i === at ? 0 : -1;
    const onKeyDown = (e) => {
      const n = values.length;
      if (!n) return;
      const d = e.key === "ArrowRight" || e.key === "ArrowDown" ? 1 : e.key === "ArrowLeft" || e.key === "ArrowUp" ? -1 : 0;
      let next = null;
      if (d) next = ((at === -1 ? 0 : at) + d + n) % n;
      else if (e.key === "Home") next = 0;
      else if (e.key === "End") next = n - 1;
      else return;
      e.preventDefault();
      select(values[next]);
      const el = ref.current && ref.current.querySelectorAll('[role="radio"]')[next];
      if (el) el.focus();
    };
    return { ref, onKeyDown, tabIndexFor };
  }

  // components/forms/Segmented.jsx
  var cx24 = (...a) => a.filter(Boolean).join(" ");
  var Segmented = React11.forwardRef(function Segmented2({ options = [], value, onChange, label, className, ...rest }, forwardedRef) {
    const opts = options.map((o) => typeof o === "string" ? { value: o, label: o } : o);
    const { ref, onKeyDown, tabIndexFor } = useRadioGroup(
      opts.map((o) => o.value),
      value,
      (v) => onChange && onChange(v)
    );
    const setGroupRef = useMergedRef(ref, forwardedRef);
    return /* @__PURE__ */ React11.createElement(
      "div",
      {
        ref: setGroupRef,
        className: cx24("lw-segmented", className),
        role: "radiogroup",
        "aria-label": label,
        onKeyDown,
        ...rest
      },
      opts.map((o, i) => /* @__PURE__ */ React11.createElement(
        "button",
        {
          key: o.value,
          type: "button",
          role: "radio",
          "aria-checked": value === o.value,
          tabIndex: tabIndexFor(i),
          onClick: () => onChange && onChange(o.value)
        },
        o.label
      ))
    );
  });

  // components/forms/Combobox.jsx
  init_ds_inject_react();
  var React13 = __toESM(require_ds_react(), 1);

  // components/overlays/Popover.jsx
  init_ds_inject_react();
  var React12 = __toESM(require_ds_react(), 1);
  var cx25 = (...a) => a.filter(Boolean).join(" ");
  function place(anchorRect, panelRect, placement, offset) {
    const vw = window.innerWidth, vh = window.innerHeight, pad = 8;
    let [side, align = "start"] = String(placement).split("-");
    const fitsBelow = anchorRect.bottom + offset + panelRect.height <= vh - pad;
    const fitsAbove = anchorRect.top - offset - panelRect.height >= pad;
    if (side === "bottom" && !fitsBelow && fitsAbove) side = "top";
    else if (side === "top" && !fitsAbove && fitsBelow) side = "bottom";
    let top, left;
    if (side === "top") top = anchorRect.top - offset - panelRect.height;
    else if (side === "bottom") top = anchorRect.bottom + offset;
    else top = align === "end" ? anchorRect.bottom - panelRect.height : anchorRect.top;
    if (side === "left") left = anchorRect.left - offset - panelRect.width;
    else if (side === "right") left = anchorRect.right + offset;
    else if (align === "end") left = anchorRect.right - panelRect.width;
    else if (align === "center") left = anchorRect.left + (anchorRect.width - panelRect.width) / 2;
    else left = anchorRect.left;
    left = Math.min(Math.max(pad, left), Math.max(pad, vw - panelRect.width - pad));
    top = Math.min(Math.max(pad, top), Math.max(pad, vh - panelRect.height - pad));
    return { top, left, side };
  }
  function Popover({
    trigger,
    open: openProp,
    defaultOpen = false,
    onOpenChange,
    placement = "bottom-start",
    offset = 6,
    matchWidth,
    label,
    role = "dialog",
    padded,
    triggerAria = true,
    className,
    children,
    ...rest
  }) {
    const [uncontrolled, setUncontrolled] = React12.useState(defaultOpen);
    const isControlled = openProp != null;
    const open = isControlled ? openProp : uncontrolled;
    const anchorRef = React12.useRef(null);
    const panelRef = React12.useRef(null);
    const uid = React12.useId();
    const anchorEl = () => {
      const w = anchorRef.current;
      return w && w.firstElementChild || w;
    };
    const setOpen = React12.useCallback((next) => {
      if (!isControlled) setUncontrolled(next);
      onOpenChange && onOpenChange(next);
    }, [isControlled, onOpenChange]);
    React12.useEffect(() => {
      const el = panelRef.current;
      if (!el || typeof el.showPopover !== "function") return;
      const isOpen = el.matches(":popover-open");
      if (open && !isOpen) el.showPopover();
      if (!open && isOpen) el.hidePopover();
    }, [open]);
    React12.useEffect(() => {
      if (!open) return;
      const reposition = () => {
        const anchor = anchorEl(), panel = panelRef.current;
        if (!anchor || !panel) return;
        const rect = anchor.getBoundingClientRect();
        if (!rect.width && !rect.height) return;
        if (matchWidth) panel.style.minWidth = rect.width + "px";
        const pos = place(rect, panel.getBoundingClientRect(), placement, offset);
        panel.style.top = pos.top + "px";
        panel.style.left = pos.left + "px";
        panel.dataset.side = pos.side;
      };
      let frame2 = 0;
      const onScrollOrResize = () => {
        if (frame2) return;
        frame2 = requestAnimationFrame(() => {
          frame2 = 0;
          reposition();
        });
      };
      reposition();
      window.addEventListener("scroll", onScrollOrResize, true);
      window.addEventListener("resize", onScrollOrResize);
      return () => {
        if (frame2) cancelAnimationFrame(frame2);
        window.removeEventListener("scroll", onScrollOrResize, true);
        window.removeEventListener("resize", onScrollOrResize);
      };
    }, [open, placement, offset, matchWidth]);
    React12.useEffect(() => {
      if (!open) return;
      const onPointerDown = (e) => {
        const anchor = anchorRef.current, panel = panelRef.current;
        if (panel && panel.contains(e.target)) return;
        if (anchor && anchor.contains(e.target)) return;
        setOpen(false);
      };
      const onKeyDown = (e) => {
        if (e.key !== "Escape") return;
        e.stopPropagation();
        setOpen(false);
        const t = anchorEl();
        if (t && t.focus) t.focus({ preventScroll: true });
      };
      document.addEventListener("pointerdown", onPointerDown, true);
      document.addEventListener("keydown", onKeyDown, true);
      return () => {
        document.removeEventListener("pointerdown", onPointerDown, true);
        document.removeEventListener("keydown", onKeyDown, true);
      };
    }, [open, setOpen]);
    const wasOpen = React12.useRef(false);
    React12.useEffect(() => {
      const closing = wasOpen.current && !open;
      wasOpen.current = open;
      if (!closing) return;
      const active = document.activeElement;
      if (active && active !== document.body && !panelRef.current?.contains(active)) return;
      const t = anchorEl();
      if (t && t.focus) t.focus({ preventScroll: true });
    }, [open]);
    const HASPOPUP = { menu: "menu", listbox: "listbox", grid: "grid", dialog: "dialog" };
    const triggerEl = React12.isValidElement(trigger) ? React12.cloneElement(trigger, {
      // A combobox input carries role="combobox" and its own aria-expanded /
      // aria-controls / aria-activedescendant. Cloning a second set onto the
      // field wrapper would announce two controls where there is one.
      "aria-expanded": triggerAria ? open : void 0,
      "aria-haspopup": triggerAria ? HASPOPUP[role] || "dialog" : void 0,
      "aria-controls": triggerAria && open ? uid : void 0,
      onClick: (e) => {
        trigger.props.onClick && trigger.props.onClick(e);
        if (!e.defaultPrevented) setOpen(!open);
      }
    }) : trigger;
    return /* @__PURE__ */ React12.createElement(React12.Fragment, null, /* @__PURE__ */ React12.createElement("span", { className: "lw-popover-anchor", ref: anchorRef }, triggerEl), /* @__PURE__ */ React12.createElement(
      "div",
      {
        ref: panelRef,
        id: uid,
        popover: "manual",
        role: open ? role : void 0,
        "aria-label": open ? label : void 0,
        "aria-hidden": open ? void 0 : true,
        tabIndex: -1,
        className: cx25("lw-popover", padded && "lw-popover-pad", className),
        ...rest
      },
      open && children
    ));
  }

  // components/forms/Combobox.jsx
  var cx26 = (...a) => a.filter(Boolean).join(" ");
  var norm = (o) => typeof o === "string" || typeof o === "number" ? { value: o, label: String(o) } : o;
  var Combobox = React13.forwardRef(function Combobox2({
    options = [],
    value,
    onChange,
    multiple,
    placeholder,
    size = "md",
    invalid,
    disabled,
    loading,
    emptyText = "No matches",
    onSearch,
    id,
    loadingText = "Searching…",
    formatRemoveLabel = (l) => "Remove " + l,
    label,
    className,
    ...rest
  }, forwardedRef) {
    const opts = React13.useMemo(() => options.map(norm), [options]);
    const [open, setOpen] = React13.useState(false);
    const [query, setQuery] = React13.useState("");
    const [active, setActive] = React13.useState(0);
    const inputRef = React13.useRef(null);
    const setInputRef = useMergedRef(inputRef, forwardedRef);
    const listRef = React13.useRef(null);
    const uid = React13.useId();
    const listId = uid + "-list";
    const inputId = id || uid + "-in";
    const selected = multiple ? Array.isArray(value) ? value : [] : value;
    const selectedOpts = multiple ? opts.filter((o) => selected.includes(o.value)) : [];
    const current = !multiple ? opts.find((o) => o.value === value) : null;
    const shown = React13.useMemo(() => {
      if (onSearch || !query) return opts;
      const q = query.toLowerCase();
      return opts.filter((o) => String(o.label).toLowerCase().includes(q));
    }, [opts, query, onSearch]);
    React13.useEffect(() => {
      if (active >= shown.length) setActive(0);
    }, [shown.length, active]);
    React13.useEffect(() => {
      if (!open || !listRef.current) return;
      const el = listRef.current.querySelector('[data-active="true"]');
      if (el && el.offsetParent) {
        const box = listRef.current.parentElement;
        if (el.offsetTop < box.scrollTop) box.scrollTop = el.offsetTop;
        else if (el.offsetTop + el.offsetHeight > box.scrollTop + box.clientHeight) box.scrollTop = el.offsetTop + el.offsetHeight - box.clientHeight;
      }
    }, [active, open]);
    const commit = (o) => {
      if (!o || o.disabled) return;
      if (multiple) {
        const next = selected.includes(o.value) ? selected.filter((v) => v !== o.value) : [...selected, o.value];
        onChange && onChange(next);
        setQuery("");
      } else {
        onChange && onChange(o.value);
        setQuery("");
        setOpen(false);
      }
      inputRef.current && inputRef.current.focus({ preventScroll: true });
    };
    const remove = (v) => onChange && onChange(selected.filter((x) => x !== v));
    const onKeyDown = (e) => {
      if (e.key === "ArrowDown" || e.key === "ArrowUp") {
        e.preventDefault();
        if (!open) {
          setOpen(true);
          return;
        }
        const d = e.key === "ArrowDown" ? 1 : -1;
        setActive((i) => (i + d + shown.length) % Math.max(shown.length, 1));
        return;
      }
      if (e.key === "Enter" && open) {
        e.preventDefault();
        return commit(shown[active]);
      }
      if (e.key === "Escape" && open) {
        e.preventDefault();
        return setOpen(false);
      }
      if (e.key === "Backspace" && multiple && !query && selected.length) return remove(selected[selected.length - 1]);
    };
    const field = /* @__PURE__ */ React13.createElement(
      "div",
      {
        className: cx26("lw-combo", size === "sm" && "lw-combo-sm", size === "lg" && "lw-combo-lg", className),
        "data-disabled": disabled ? "true" : void 0,
        onMouseDown: (e) => {
          if (e.target === e.currentTarget && inputRef.current) inputRef.current.focus();
        }
      },
      selectedOpts.map((o) => /* @__PURE__ */ React13.createElement("span", { key: o.value, className: "lw-combo-token" }, /* @__PURE__ */ React13.createElement("span", null, o.label), /* @__PURE__ */ React13.createElement(
        "button",
        {
          type: "button",
          "aria-label": formatRemoveLabel(o.label),
          onMouseDown: (e) => e.preventDefault(),
          onClick: () => remove(o.value)
        },
        /* @__PURE__ */ React13.createElement(Icon, { name: "close", size: 11 })
      ))),
      /* @__PURE__ */ React13.createElement(
        "input",
        {
          ref: setInputRef,
          id: inputId,
          role: "combobox",
          type: "text",
          autoComplete: "off",
          "aria-expanded": open,
          "aria-controls": open ? listId : void 0,
          "aria-autocomplete": "list",
          "aria-label": label,
          "aria-activedescendant": open && shown[active] ? listId + "-" + active : void 0,
          "aria-invalid": invalid ? "true" : void 0,
          disabled,
          placeholder: current ? void 0 : multiple && selectedOpts.length ? "" : placeholder,
          value: !multiple && current && !query ? current.label : query,
          onChange: (e) => {
            setQuery(e.target.value);
            setActive(0);
            setOpen(true);
            onSearch && onSearch(e.target.value);
          },
          onKeyDown,
          onFocus: () => setOpen(true)
        }
      ),
      /* @__PURE__ */ React13.createElement("span", { className: "lw-combo-chev" }, /* @__PURE__ */ React13.createElement(Icon, { name: "chevrons-up-down", size: 15 }))
    );
    return /* @__PURE__ */ React13.createElement(
      Popover,
      {
        trigger: field,
        open: open && !disabled,
        onOpenChange: setOpen,
        role: "listbox",
        triggerAria: false,
        matchWidth: true,
        placement: "bottom-start",
        label,
        ...rest
      },
      loading ? /* @__PURE__ */ React13.createElement("div", { id: listId, role: "listbox", "aria-busy": "true", className: "lw-listbox-empty" }, loadingText) : !shown.length ? /* @__PURE__ */ React13.createElement("div", { id: listId, role: "listbox", className: "lw-listbox-empty" }, emptyText) : /* @__PURE__ */ React13.createElement("ul", { ref: listRef, className: "lw-listbox", id: listId, role: "listbox", "aria-multiselectable": multiple || void 0 }, shown.map((o, i) => {
        const isSel = multiple ? selected.includes(o.value) : o.value === value;
        return /* @__PURE__ */ React13.createElement(
          "li",
          {
            key: o.value,
            id: listId + "-" + i,
            className: "lw-option",
            role: "option",
            "aria-selected": isSel,
            "aria-disabled": o.disabled ? "true" : void 0,
            "data-active": i === active ? "true" : void 0,
            onMouseEnter: () => setActive(i),
            onMouseDown: (e) => e.preventDefault(),
            onClick: () => commit(o)
          },
          /* @__PURE__ */ React13.createElement("span", { className: "lw-option-lead" }, isSel && /* @__PURE__ */ React13.createElement(Icon, { name: "checkmark", size: 14 })),
          /* @__PURE__ */ React13.createElement("span", { className: "lw-option-text" }, o.label),
          o.meta && /* @__PURE__ */ React13.createElement("span", { className: "lw-option-meta" }, o.meta)
        );
      }))
    );
  });

  // components/forms/Calendar.jsx
  init_ds_inject_react();
  var React14 = __toESM(require_ds_react(), 1);
  var cx27 = (...a) => a.filter(Boolean).join(" ");
  var day = (d) => new Date(d.getFullYear(), d.getMonth(), d.getDate());
  var same = (a, b) => a && b && day(a).getTime() === day(b).getTime();
  var addDays = (d, n) => {
    const x = day(d);
    x.setDate(x.getDate() + n);
    return x;
  };
  var addMonths = (d, n) => {
    const x = day(d);
    x.setDate(1);
    x.setMonth(x.getMonth() + n);
    return x;
  };
  var between = (d, a, b) => a && b && day(d) > day(a) && day(d) < day(b);
  function Calendar({
    value,
    onChange,
    range,
    month,
    onMonthChange,
    min,
    max,
    weekStart = 1,
    locale,
    prevMonthLabel = "Previous month",
    nextMonthLabel = "Next month",
    className,
    ...rest
  }) {
    const sel = range ? value || {} : value;
    const anchor = (range ? sel.start : sel) || /* @__PURE__ */ new Date();
    const [viewRaw, setView] = React14.useState(() => addMonths(anchor, 0));
    const view = month || viewRaw;
    const setMonth = (m) => {
      onMonthChange ? onMonthChange(m) : setView(m);
    };
    const [focused, setFocused] = React14.useState(() => day(anchor));
    const [hover, setHover] = React14.useState(null);
    const gridRef = React14.useRef(null);
    const navving = React14.useRef(false);
    const fmtMonth = new Intl.DateTimeFormat(locale, { month: "long", year: "numeric" });
    const fmtDow = new Intl.DateTimeFormat(locale, { weekday: "narrow" });
    const fmtFull = new Intl.DateTimeFormat(locale, { weekday: "long", day: "numeric", month: "long", year: "numeric" });
    const first = new Date(view.getFullYear(), view.getMonth(), 1);
    const lead = (first.getDay() - weekStart + 7) % 7;
    const cells = Array.from({ length: 42 }, (_, i) => addDays(first, i - lead));
    const dows = Array.from({ length: 7 }, (_, i) => fmtDow.format(addDays(new Date(2024, 0, 7 + weekStart), i)));
    const weeks = Array.from({ length: 6 }, (_, w) => cells.slice(w * 7, w * 7 + 7));
    const disabled = (d) => min && day(d) < day(min) || max && day(d) > day(max);
    const isSelected = (d) => range ? same(d, sel.start) || same(d, sel.end) : same(d, sel);
    const inRange = (d) => {
      if (!range) return false;
      const end = sel.end || sel.start && hover;
      return between(d, sel.start, end) || between(d, end, sel.start);
    };
    const pick = (d) => {
      if (disabled(d)) return;
      if (!range) return onChange && onChange(day(d));
      if (!sel.start || sel.end) return onChange && onChange({ start: day(d), end: null });
      const [s, e] = day(d) < day(sel.start) ? [day(d), sel.start] : [sel.start, day(d)];
      onChange && onChange({ start: s, end: e });
    };
    const moveFocus = (next) => {
      navving.current = true;
      setFocused(next);
      if (next.getMonth() !== view.getMonth()) setMonth(addMonths(next, 0));
    };
    const [today, setToday] = React14.useState(null);
    React14.useEffect(() => {
      setToday(day(/* @__PURE__ */ new Date()));
    }, []);
    React14.useEffect(() => {
      if (!navving.current) return;
      navving.current = false;
      const el = gridRef.current && gridRef.current.querySelector('[tabindex="0"]');
      if (el) el.focus({ preventScroll: true });
    }, [focused]);
    const onKeyDown = (e) => {
      const k = e.key;
      const d = { ArrowRight: 1, ArrowLeft: -1, ArrowDown: 7, ArrowUp: -7 }[k];
      if (d) {
        e.preventDefault();
        return moveFocus(addDays(focused, d));
      }
      if (k === "PageUp") {
        e.preventDefault();
        return moveFocus(addMonths(focused, -1));
      }
      if (k === "PageDown") {
        e.preventDefault();
        return moveFocus(addMonths(focused, 1));
      }
      if (k === "Home") {
        e.preventDefault();
        return moveFocus(addDays(focused, -((focused.getDay() - weekStart + 7) % 7)));
      }
      if (k === "End") {
        e.preventDefault();
        return moveFocus(addDays(focused, 6 - (focused.getDay() - weekStart + 7) % 7));
      }
    };
    return /* @__PURE__ */ React14.createElement("div", { className: cx27("lw-cal", className), ...rest }, /* @__PURE__ */ React14.createElement("div", { className: "lw-cal-head" }, /* @__PURE__ */ React14.createElement("button", { type: "button", className: "lw-icon-btn", "aria-label": prevMonthLabel, onClick: () => setMonth(addMonths(view, -1)) }, /* @__PURE__ */ React14.createElement(Icon, { name: "chevron-left", size: 16 })), /* @__PURE__ */ React14.createElement("div", { className: "lw-cal-month", "aria-live": "polite" }, fmtMonth.format(view)), /* @__PURE__ */ React14.createElement("button", { type: "button", className: "lw-icon-btn", "aria-label": nextMonthLabel, onClick: () => setMonth(addMonths(view, 1)) }, /* @__PURE__ */ React14.createElement(Icon, { name: "chevron-right", size: 16 }))), /* @__PURE__ */ React14.createElement("div", { ref: gridRef, className: "lw-cal-grid", role: "grid", onKeyDown, onMouseLeave: () => setHover(null) }, /* @__PURE__ */ React14.createElement("div", { role: "row", className: "lw-cal-dow-row" }, dows.map((d, i) => /* @__PURE__ */ React14.createElement("div", { key: i, role: "columnheader", className: "lw-cal-dow" }, d))), /* @__PURE__ */ React14.createElement("div", { role: "rowgroup", className: "lw-cal-weeks" }, weeks.map((week, w) => /* @__PURE__ */ React14.createElement("div", { key: w, role: "row", className: "lw-cal-week" }, week.map((d, i) => {
      const outside = d.getMonth() !== view.getMonth();
      const selected = isSelected(d);
      const end = range ? sel.end || hover : null;
      const off = disabled(d);
      return /* @__PURE__ */ React14.createElement(
        "button",
        {
          key: i,
          type: "button",
          role: "gridcell",
          className: "lw-cal-day",
          tabIndex: same(d, focused) ? 0 : -1,
          "aria-selected": selected,
          "aria-label": fmtFull.format(d),
          "aria-disabled": off || void 0,
          "data-outside": outside ? "true" : void 0,
          "data-today": today && same(d, today) ? "true" : void 0,
          "data-in-range": inRange(d) ? "true" : void 0,
          "data-edge": range && selected ? same(d, sel.start) && end ? "start" : same(d, sel.end) ? "end" : void 0 : void 0,
          onMouseEnter: () => range && sel.start && !sel.end && setHover(day(d)),
          onFocus: () => setFocused(day(d)),
          onClick: () => {
            if (!off) pick(d);
          }
        },
        d.getDate()
      );
    }))))));
  }

  // components/forms/DatePicker.jsx
  init_ds_inject_react();
  var React15 = __toESM(require_ds_react(), 1);
  var cx28 = (...a) => a.filter(Boolean).join(" ");
  var day2 = (d) => new Date(d.getFullYear(), d.getMonth(), d.getDate());
  var shift = (n) => {
    const d = /* @__PURE__ */ new Date();
    d.setDate(d.getDate() + n);
    return day2(d);
  };
  var RANGE_PRESETS = [
    { label: "Today", get: () => ({ start: day2(/* @__PURE__ */ new Date()), end: day2(/* @__PURE__ */ new Date()) }) },
    { label: "Last 7 days", get: () => ({ start: shift(-6), end: day2(/* @__PURE__ */ new Date()) }) },
    { label: "Last 30 days", get: () => ({ start: shift(-29), end: day2(/* @__PURE__ */ new Date()) }) },
    { label: "Last 90 days", get: () => ({ start: shift(-89), end: day2(/* @__PURE__ */ new Date()) }) }
  ];
  var DatePicker = React15.forwardRef(function DatePicker2({
    value,
    onChange,
    range,
    presets = RANGE_PRESETS,
    min,
    max,
    size = "md",
    invalid,
    disabled,
    placeholder,
    locale,
    label,
    id,
    className,
    ...rest
  }, forwardedRef) {
    const [open, setOpen] = React15.useState(false);
    const uid = React15.useId();
    const fmt2 = new Intl.DateTimeFormat(locale, { day: "numeric", month: "short", year: "numeric" });
    const text = React15.useMemo(() => {
      if (range) {
        const v = value || {};
        if (!v.start) return "";
        return fmt2.format(v.start) + (v.end ? " – " + fmt2.format(v.end) : " – …");
      }
      return value ? fmt2.format(value) : "";
    }, [value, range, locale]);
    const activePreset = range && value && value.start && value.end ? presets.findIndex((p) => {
      const r = p.get();
      return r.start.getTime() === day2(value.start).getTime() && r.end.getTime() === day2(value.end).getTime();
    }) : -1;
    const field = /* @__PURE__ */ React15.createElement(
      "button",
      {
        ref: forwardedRef,
        type: "button",
        id: id || uid,
        disabled,
        "aria-invalid": invalid ? "true" : void 0,
        "aria-label": label,
        className: cx28("lw-input", "lw-datefield", size === "sm" && "lw-input-sm", size === "lg" && "lw-input-lg", className),
        "data-placeholder": text ? void 0 : "true"
      },
      /* @__PURE__ */ React15.createElement(Icon, { name: "calendar", size: 15, className: "lw-datefield-ic" }),
      /* @__PURE__ */ React15.createElement("span", { className: "lw-datefield-text" }, text || placeholder || (range ? "Pick a range" : "Pick a date"))
    );
    return /* @__PURE__ */ React15.createElement(
      Popover,
      {
        trigger: field,
        open: open && !disabled,
        onOpenChange: setOpen,
        padded: true,
        role: "dialog",
        label: label || (range ? "Choose a date range" : "Choose a date"),
        placement: "bottom-start",
        ...rest
      },
      /* @__PURE__ */ React15.createElement("div", { className: "lw-cal-wrap" }, range && presets.length > 0 && /* @__PURE__ */ React15.createElement("div", { className: "lw-cal-presets" }, presets.map((p, i) => (
        /* aria-current, not aria-pressed. These are shortcut ACTIONS —
           each applies a range and closes the panel — so `aria-pressed`
           announced four toggle buttons, three of them "not pressed",
           for a set where at most one is ever the current range and often
           none is. aria-current is the idiom for "this one in the set is
           the current one" and claims nothing about togglability. */
        /* @__PURE__ */ React15.createElement(
          "button",
          {
            key: p.label,
            type: "button",
            className: "lw-cal-preset",
            "aria-current": i === activePreset ? "true" : void 0,
            onClick: () => {
              onChange && onChange(p.get());
              setOpen(false);
            }
          },
          p.label
        )
      ))), /* @__PURE__ */ React15.createElement(Calendar, { value, onChange: (v) => {
        onChange && onChange(v);
        if (!range) setOpen(false);
        else if (v && v.end) setOpen(false);
      }, range, min, max, locale }))
    );
  });

  // components/forms/FileUpload.jsx
  init_ds_inject_react();
  var React16 = __toESM(require_ds_react(), 1);
  var cx29 = (...a) => a.filter(Boolean).join(" ");
  var KB = 1024;
  function formatBytes(n) {
    if (n == null) return "";
    const u = ["B", "KB", "MB", "GB"];
    let i = 0, v = n;
    while (v >= KB && i < u.length - 1) {
      v /= KB;
      i++;
    }
    return (i === 0 ? v : v.toFixed(v < 10 ? 1 : 0)) + " " + u[i];
  }
  var FileUpload = React16.forwardRef(function FileUpload2({
    files = [],
    onFiles,
    onRemove,
    accept,
    multiple,
    maxSize,
    disabled,
    title = "Drop files here",
    hint,
    formatRejected = (names, limit) => names + " — over " + limit,
    formatHint = (a, limit) => a ? a + (limit ? " · up to " + limit : "") : limit ? "Up to " + limit : "or click to browse",
    formatRemoveLabel = (name) => "Remove " + name,
    className,
    ...rest
  }, forwardedRef) {
    const [over, setOver] = React16.useState(0);
    const [rejected, setRejected] = React16.useState(null);
    const inputRef = React16.useRef(null);
    const setInputRef = useMergedRef(inputRef, forwardedRef);
    const take = (list) => {
      const arr = Array.from(list || []);
      if (!arr.length) return;
      const tooBig = maxSize ? arr.filter((f) => f.size > maxSize) : [];
      setRejected(tooBig.length ? formatRejected(tooBig.map((f) => f.name).join(", "), formatBytes(maxSize)) : null);
      const ok = maxSize ? arr.filter((f) => f.size <= maxSize) : arr;
      if (ok.length && onFiles) onFiles(multiple ? ok : ok.slice(0, 1));
    };
    return /* @__PURE__ */ React16.createElement("div", { className: cx29(className), ...rest }, /* @__PURE__ */ React16.createElement(
      "label",
      {
        className: "lw-dropzone",
        "data-over": over > 0 ? "true" : void 0,
        "data-disabled": disabled ? "true" : void 0,
        onDragEnter: (e) => {
          e.preventDefault();
          if (!disabled) setOver((o) => o + 1);
        },
        onDragOver: (e) => e.preventDefault(),
        onDragLeave: () => setOver((o) => Math.max(0, o - 1)),
        onDrop: (e) => {
          e.preventDefault();
          setOver(0);
          if (!disabled) take(e.dataTransfer.files);
        }
      },
      /* @__PURE__ */ React16.createElement(
        "input",
        {
          ref: setInputRef,
          type: "file",
          accept,
          multiple,
          disabled,
          onChange: (e) => {
            take(e.target.files);
            e.target.value = "";
          }
        }
      ),
      /* @__PURE__ */ React16.createElement(Icon, { name: "upload", size: 20 }),
      /* @__PURE__ */ React16.createElement("span", { className: "lw-dz-title" }, title),
      /* @__PURE__ */ React16.createElement("span", { className: "lw-dz-hint" }, hint || formatHint(accept, maxSize ? formatBytes(maxSize) : null))
    ), rejected && /* @__PURE__ */ React16.createElement("div", { className: "lw-error", role: "alert" }, rejected), files.length > 0 && /* @__PURE__ */ React16.createElement("div", { className: "lw-file-list" }, files.map((f, i) => /* @__PURE__ */ React16.createElement(
      "div",
      {
        key: f.id ?? f.name + i,
        className: "lw-file-row",
        "data-state": f.state,
        style: f.progress != null ? { "--lw-file-pct": f.progress + "%" } : void 0
      },
      /* @__PURE__ */ React16.createElement("span", { className: "lw-file-ic" }, /* @__PURE__ */ React16.createElement(Icon, { name: f.state === "error" ? "x-circle" : f.state === "done" ? "check" : "file", size: 16 })),
      /* @__PURE__ */ React16.createElement("span", { className: "lw-file-main" }, /* @__PURE__ */ React16.createElement("span", { className: "lw-file-name" }, f.name), f.state === "uploading" && f.progress != null ? /* @__PURE__ */ React16.createElement("span", { className: "lw-file-bar" }, /* @__PURE__ */ React16.createElement("i", null)) : /* @__PURE__ */ React16.createElement("span", { className: "lw-file-meta" }, f.error || formatBytes(f.size))),
      onRemove && /* @__PURE__ */ React16.createElement("button", { type: "button", className: "lw-icon-btn", "aria-label": formatRemoveLabel(f.name), onClick: () => onRemove(f) }, /* @__PURE__ */ React16.createElement(Icon, { name: "close", size: 15 }))
    ))));
  });

  // components/forms/Stepper.jsx
  init_ds_inject_react();
  var cx30 = (...a) => a.filter(Boolean).join(" ");
  function Stepper({
    steps = [],
    current = 0,
    onStepChange,
    vertical,
    label = "Progress",
    stateLabels = { done: "completed", current: "current step", error: "needs attention", upcoming: "not started" },
    className,
    ...rest
  }) {
    return /* @__PURE__ */ React.createElement(
      "div",
      {
        className: cx30("lw-stepper", vertical && "lw-stepper-vertical", className),
        role: "group",
        "aria-label": label,
        ...rest
      },
      steps.map((s, i) => {
        const state = s.state || (i < current ? "done" : i === current ? "current" : "upcoming");
        const reachable = onStepChange && (state === "done" || state === "error");
        const Tag = reachable ? "button" : "div";
        return /* @__PURE__ */ React.createElement(
          Tag,
          {
            key: s.key ?? i,
            className: "lw-stepper-step",
            "data-state": state,
            type: reachable ? "button" : void 0,
            "aria-current": state === "current" ? "step" : void 0,
            onClick: reachable ? () => onStepChange(i) : void 0
          },
          /* @__PURE__ */ React.createElement("span", { className: "lw-stepper-marker", "aria-hidden": "true" }, state === "done" ? /* @__PURE__ */ React.createElement(Icon, { name: "checkmark", size: 14 }) : state === "error" ? /* @__PURE__ */ React.createElement(Icon, { name: "close", size: 14 }) : i + 1),
          /* @__PURE__ */ React.createElement("span", { className: "lw-stepper-label" }, s.label, /* @__PURE__ */ React.createElement("span", { className: "lw-sr-only" }, " — " + (stateLabels[state] ?? stateLabels.upcoming))),
          s.hint && /* @__PURE__ */ React.createElement("span", { className: "lw-stepper-hint" }, s.hint)
        );
      })
    );
  }

  // components/forms/RichText.jsx
  init_ds_inject_react();
  var React17 = __toESM(require_ds_react(), 1);
  var cx31 = (...a) => a.filter(Boolean).join(" ");
  var TOOLS = [
    { id: "bold", icon: "spark", label: "Bold", cmd: "bold", glyph: "B" },
    { id: "italic", icon: "spark", label: "Italic", cmd: "italic", glyph: "I" },
    { sep: true },
    { id: "h2", icon: "list", label: "Heading", cmd: "formatBlock", arg: "h2", glyph: "H" },
    { id: "ul", icon: "list", label: "Bulleted list", cmd: "insertUnorderedList" },
    { id: "ol", icon: "sort-asc", label: "Numbered list", cmd: "insertOrderedList" },
    { id: "quote", icon: "quote", label: "Quote", cmd: "formatBlock", arg: "blockquote" },
    { id: "code", icon: "code", label: "Code", cmd: "formatBlock", arg: "pre" },
    { sep: true },
    { id: "link", icon: "link", label: "Link", cmd: "createLink", prompt: "Link URL" },
    { id: "clear", icon: "undo", label: "Clear formatting", cmd: "removeFormat" }
  ];
  var RichText = React17.forwardRef(function RichText2({
    value,
    onChange,
    placeholder = "Write something…",
    tools,
    toolLabels,
    maxLength,
    formatBarLabel = (l) => l + " formatting",
    barLabel = "Editor",
    label,
    readOnly,
    footer,
    children,
    className,
    ...rest
  }, forwardedRef) {
    const ref = React17.useRef(null);
    const setBodyRef = useMergedRef(ref, forwardedRef);
    const bodyId = React17.useId();
    const [active, setActive] = React17.useState({});
    const picked = tools ? TOOLS.filter((t) => t.sep || tools.includes(t.id)) : TOOLS;
    const list = toolLabels ? picked.map((t) => t.id && toolLabels[t.id] ? { ...t, ...toolLabels[t.id] } : t) : picked;
    React17.useEffect(() => {
      const el = ref.current;
      if (el && value != null && el.innerHTML !== value) el.innerHTML = value;
    }, [value]);
    const syncActive = () => {
      if (typeof document.queryCommandState !== "function") return;
      const next = {};
      for (const t of list) {
        if (t.sep || !t.cmd) continue;
        try {
          next[t.id] = t.arg ? false : document.queryCommandState(t.cmd);
        } catch (e) {
        }
      }
      setActive(next);
    };
    const run = (t) => {
      const el = ref.current;
      if (!el || readOnly) return;
      el.focus();
      let arg = t.arg;
      if (t.prompt) {
        arg = window.prompt(t.prompt);
        if (!arg) return;
      }
      try {
        document.execCommand(t.cmd, false, arg);
      } catch (e) {
      }
      syncActive();
      onChange && onChange(el.innerHTML);
    };
    const [len, setLen] = React17.useState(0);
    const syncLen = () => setLen((ref.current && ref.current.textContent || "").length);
    React17.useEffect(syncLen, [value]);
    const over = maxLength != null && len > maxLength;
    return /* @__PURE__ */ React17.createElement("div", { className: cx31("lw-editor", className), ...rest }, /* @__PURE__ */ React17.createElement("div", { className: "lw-editor-bar", role: "group", "aria-label": formatBarLabel(label || barLabel), "aria-controls": children ? void 0 : bodyId }, list.map((t, i) => t.sep ? /* @__PURE__ */ React17.createElement("span", { key: "s" + i, className: "sep", "aria-hidden": "true" }) : /* @__PURE__ */ React17.createElement(
      "button",
      {
        key: t.id,
        type: "button",
        className: "lw-icon-btn",
        "aria-label": t.label,
        title: t.label,
        "aria-pressed": !!active[t.id],
        disabled: readOnly,
        onMouseDown: (e) => e.preventDefault(),
        onClick: () => run(t)
      },
      t.glyph ? /* @__PURE__ */ React17.createElement("span", { className: "lw-editor-glyph", "data-glyph": t.id }, t.glyph) : /* @__PURE__ */ React17.createElement(Icon, { name: t.icon, size: 15 })
    ))), children || /* @__PURE__ */ React17.createElement(
      "div",
      {
        ref: setBodyRef,
        id: bodyId,
        className: "lw-editor-body",
        contentEditable: !readOnly,
        suppressContentEditableWarning: true,
        role: "textbox",
        "aria-multiline": "true",
        "aria-label": label,
        "data-placeholder": placeholder,
        onInput: () => {
          syncLen();
          onChange && onChange(ref.current.innerHTML);
        },
        onKeyUp: syncActive,
        onMouseUp: syncActive
      }
    ), (footer || maxLength != null) && /* @__PURE__ */ React17.createElement("div", { className: "lw-editor-foot" }, footer, /* @__PURE__ */ React17.createElement("span", { className: "lw-editor-spacer" }), maxLength != null && /* @__PURE__ */ React17.createElement("span", { className: "lw-editor-count", "data-over": over ? "true" : void 0, "aria-live": "polite" }, len, " / ", maxLength)));
  });

  // components/data/Table.jsx
  init_ds_inject_react();

  // components/data/_columns.js
  init_ds_inject_react();

  // components/_deprecate.js
  init_ds_inject_react();
  var seen = /* @__PURE__ */ new Set();
  function deprecate(component, prop, message) {
    const id = component + "#" + prop;
    if (seen.has(id)) return;
    seen.add(id);
    if (typeof process !== "undefined" && process.env && false) return;
    if (typeof console === "undefined" || !console.warn) return;
    console.warn("[@leanwise/design] " + component + ": " + message);
  }

  // components/data/_columns.js
  function colHeader(component, c) {
    if (c.header !== void 0) return c.header;
    if (c.label !== void 0) {
      deprecate(
        component,
        "columns[].label",
        "`columns[].label` is deprecated — rename it to `columns[].header`. `label` is removed in v2.0.0."
      );
      return c.label;
    }
    return void 0;
  }
  function legacySortArgs(component, columns, onSort) {
    if (!onSort) return false;
    const legacyCols = columns.some((c) => c.header === void 0 && c.label !== void 0);
    const legacyArity = onSort.length >= 2;
    if (!legacyCols && !legacyArity) return false;
    deprecate(
      component,
      "onSort",
      "`onSort(key, direction)` is deprecated — take one argument, `onSort({ key, dir })`. The positional form is removed in v2.0.0. (Detected from " + (legacyCols ? "`columns[].label`" : "the handler's two parameters") + ".)"
    );
    return true;
  }
  function emitSort(onSort, legacy, key, dir) {
    if (!onSort) return;
    if (legacy) onSort(key, dir);
    else onSort({ key, dir });
  }

  // components/data/Table.jsx
  var cx32 = (...a) => a.filter(Boolean).join(" ");
  function Table({ columns, rows, hover = true, compact = false, caption, sort: sortState, onSort, className, children, ...rest }) {
    const legacyArgs = legacySortArgs("Table", columns || [], onSort);
    const head = columns && /* @__PURE__ */ React.createElement("thead", null, /* @__PURE__ */ React.createElement("tr", null, columns.map((c) => {
      const sortable = (c.sortable || c.sort) && onSort;
      let sort;
      if (sortState && sortState.key === c.key) {
        sort = sortState.dir === "desc" ? "descending" : "ascending";
      } else if (sortState) {
        sort = void 0;
      } else {
        sort = c.sort === "asc" ? "ascending" : c.sort === "desc" ? "descending" : c.sort;
      }
      return /* @__PURE__ */ React.createElement(
        "th",
        {
          key: c.key,
          className: c.num ? "num" : void 0,
          scope: "col",
          "aria-sort": sortable ? sort || "none" : sort || void 0
        },
        sortable ? /* @__PURE__ */ React.createElement("button", { type: "button", onClick: () => emitSort(onSort, legacyArgs, c.key, sort === "ascending" ? "desc" : "asc") }, colHeader("Table", c), /* @__PURE__ */ React.createElement(Icon, { name: sort === "descending" ? "chevron-down" : "chevron-up", size: 12 })) : colHeader("Table", c)
      );
    })));
    return /* @__PURE__ */ React.createElement("div", { className: "lw-table-wrap lw-scroll" }, /* @__PURE__ */ React.createElement("table", { className: cx32("lw-table", hover && "lw-table-hover", compact && "lw-table-compact", className), ...rest }, caption && /* @__PURE__ */ React.createElement("caption", { className: "lw-sr-only" }, caption), head, rows ? /* @__PURE__ */ React.createElement("tbody", null, rows.map((r, i) => /* @__PURE__ */ React.createElement("tr", { key: r.id ?? i }, columns.map((c) => /* @__PURE__ */ React.createElement("td", { key: c.key, className: cx32(c.num && "num", c.muted && "muted") }, r[c.key]))))) : children));
  }

  // components/data/KpiTile.jsx
  init_ds_inject_react();
  var cx33 = (...a) => a.filter(Boolean).join(" ");
  function KpiTile({ label, value, icon, accent = "brand", delta, direction, tone, note, className, ...rest }) {
    const ink = tone || (direction === "up" ? "pos" : direction === "down" ? "neg" : void 0);
    return /* @__PURE__ */ React.createElement("div", { className: cx33("lw-kpi", className), ...rest }, /* @__PURE__ */ React.createElement("span", { className: "lw-kpi-head" }, /* @__PURE__ */ React.createElement("span", { className: "k" }, label), icon && /* @__PURE__ */ React.createElement("span", { className: "lw-kpi-badge", "data-accent": accent }, /* @__PURE__ */ React.createElement(Icon, { name: icon, size: 18 }))), /* @__PURE__ */ React.createElement("span", { className: "lw-kpi-row" }, /* @__PURE__ */ React.createElement("span", { className: "v" }, value), (delta || note) && /* @__PURE__ */ React.createElement("span", { className: cx33("d", direction, ink) }, direction && /* @__PURE__ */ React.createElement(Icon, { name: direction === "up" ? "arrow-up" : "arrow-down", size: 13 }), delta, note && /* @__PURE__ */ React.createElement("span", { className: "w" }, note))));
  }

  // components/data/StatMeter.jsx
  init_ds_inject_react();
  var cx34 = (...a) => a.filter(Boolean).join(" ");
  function StatMeter({
    label,
    value,
    unit,
    delta,
    direction,
    percent,
    target,
    tone,
    foot,
    interactive = false,
    formatValueText = (p, t) => p + "% of a " + t + "% target",
    className,
    ...rest
  }) {
    const onKeyDown = (e) => {
      if (!interactive || e.key !== "Enter" && e.key !== " ") return;
      e.preventDefault();
      rest.onClick && rest.onClick(e);
    };
    return /* @__PURE__ */ React.createElement(
      "div",
      {
        className: cx34("lw-card", "lw-stat-tile", interactive && "lw-card-interactive", className),
        role: interactive ? "button" : void 0,
        tabIndex: interactive ? 0 : void 0,
        onKeyDown: interactive ? onKeyDown : void 0,
        ...rest
      },
      label && /* @__PURE__ */ React.createElement("span", { className: "lw-card-eyebrow" }, label),
      /* @__PURE__ */ React.createElement("div", { className: "lw-stat-row" }, /* @__PURE__ */ React.createElement("div", { className: "lw-stat" }, /* @__PURE__ */ React.createElement("span", { className: "n" }, value, unit && /* @__PURE__ */ React.createElement("span", { className: "u" }, unit))), delta && /* @__PURE__ */ React.createElement("span", { className: "lw-stat-delta", "data-dir": direction }, (direction === "up" || direction === "down") && /* @__PURE__ */ React.createElement(Icon, { name: "arrow-" + direction, size: 13 }), delta)),
      percent != null && /* @__PURE__ */ React.createElement(
        "div",
        {
          className: "lw-bar",
          "data-tone": tone,
          style: { "--lw-bar-value": percent + "%" },
          role: "meter",
          "aria-valuenow": percent,
          "aria-valuemin": 0,
          "aria-valuemax": 100,
          "aria-label": typeof label === "string" ? label : void 0,
          "aria-valuetext": target != null ? formatValueText(percent, target) : void 0
        },
        /* @__PURE__ */ React.createElement("i", { className: "fill" }),
        target != null && /* @__PURE__ */ React.createElement("span", { className: "target", style: { insetInlineStart: target + "%" } })
      ),
      foot && /* @__PURE__ */ React.createElement("span", { className: "lw-stat-foot" }, foot)
    );
  }

  // components/data/EmptyState.jsx
  init_ds_inject_react();
  var cx35 = (...a) => a.filter(Boolean).join(" ");
  function EmptyState({ icon, glyph, title, description, action, className, children, ...rest }) {
    return /* @__PURE__ */ React.createElement("div", { className: cx35("lw-empty", className), ...rest }, (icon || glyph) && /* @__PURE__ */ React.createElement("span", { className: "glyph", "aria-hidden": "true" }, icon ? /* @__PURE__ */ React.createElement(Icon, { name: icon, size: 22 }) : glyph), /* @__PURE__ */ React.createElement("span", { className: "t" }, title), description && /* @__PURE__ */ React.createElement("span", { className: "s" }, description), action || children);
  }

  // components/data/StateView.jsx
  init_ds_inject_react();
  var cx36 = (...a) => a.filter(Boolean).join(" ");
  var PRESETS = {
    empty: { icon: "inbox", title: "Nothing here yet" },
    loading: { icon: null, title: "Loading…" },
    error: { icon: "x-circle", title: "Something went wrong", description: "The request failed. Nothing was changed.", actionLabel: "Try again" },
    offline: { icon: "webhook", title: "You are offline", description: "Reconnect to load this. Anything you have typed is kept.", actionLabel: "Retry" },
    denied: { icon: "lock", title: "You do not have access", description: "Ask a workspace admin for permission to view this." }
  };
  function StateView({ variant = "empty", icon, title, description, action, actionLabel, onAction, lines = 3, className, children, ...rest }) {
    const p = PRESETS[variant] || PRESETS.empty;
    if (variant === "loading") {
      return /* @__PURE__ */ React.createElement("div", { className: cx36("lw-state", className), "data-variant": "loading", role: "status", "aria-busy": "true", ...rest }, /* @__PURE__ */ React.createElement("span", { className: "lw-sr-only" }, title || p.title), /* @__PURE__ */ React.createElement(Skeleton, { lines }));
    }
    const isAlert = variant === "error" || variant === "offline";
    const label = actionLabel || p.actionLabel;
    return /* @__PURE__ */ React.createElement(
      "div",
      {
        className: cx36("lw-state", className),
        "data-variant": variant,
        role: isAlert ? "alert" : void 0,
        ...rest
      },
      (icon || p.icon) && /* @__PURE__ */ React.createElement("span", { className: "lw-state-ic" }, /* @__PURE__ */ React.createElement(Icon, { name: icon || p.icon, size: 20 })),
      /* @__PURE__ */ React.createElement("span", { className: "lw-state-title" }, title || p.title),
      (description || p.description) && /* @__PURE__ */ React.createElement("p", { className: "lw-state-desc" }, description || p.description),
      children,
      (action || label && onAction) && /* @__PURE__ */ React.createElement("div", { className: "lw-state-actions" }, action || /* @__PURE__ */ React.createElement("button", { type: "button", className: "lw-btn lw-btn-sm", onClick: onAction }, label))
    );
  }

  // components/data/Console.jsx
  init_ds_inject_react();
  var cx37 = (...a) => a.filter(Boolean).join(" ");
  function Console({ url = "leanwise.ai", title, lines, foot, className, children, ...rest }) {
    const cellCount = lines ? lines.reduce((n, l) => Math.max(n, l.cells ? l.cells.length : 0), 0) : 0;
    const logStyle = cellCount ? {
      gridTemplateColumns: "minmax(0, max-content) " + "minmax(0, max-content) ".repeat(Math.max(0, cellCount - 1)) + "minmax(0, max-content) minmax(0, 1fr)"
    } : void 0;
    return /* @__PURE__ */ React.createElement("div", { className: cx37("lw-console", className), ...rest }, /* @__PURE__ */ React.createElement("div", { className: "lw-console-h" }, /* @__PURE__ */ React.createElement("span", { className: "left" }, /* @__PURE__ */ React.createElement("span", { className: "lights" }, /* @__PURE__ */ React.createElement("i", null), /* @__PURE__ */ React.createElement("i", null), /* @__PURE__ */ React.createElement("i", null)), title), url && /* @__PURE__ */ React.createElement("span", { className: "url" }, url)), /* @__PURE__ */ React.createElement("div", { className: "lw-console-body" }, lines ? /* @__PURE__ */ React.createElement("div", { className: "lw-console-log", role: "log", style: logStyle }, lines.map((l, i) => /* @__PURE__ */ React.createElement("div", { key: i, className: cx37("lw-console-line", l.tone) }, (l.t || cellCount > 0) && /* @__PURE__ */ React.createElement("span", { className: "t" }, l.t), l.cells ? l.cells.map((c, j) => {
      const cell = typeof c === "string" ? { text: c } : c || {};
      return /* @__PURE__ */ React.createElement("span", { key: j, className: cx37("lw-console-cell", cell.num && "num", cell.muted && "muted") }, cell.text);
    }) : /* @__PURE__ */ React.createElement("span", { className: "lw-console-span" }, l.text)))) : children), foot && /* @__PURE__ */ React.createElement("div", { className: "lw-console-foot" }, foot));
  }

  // components/data/CodeBlock.jsx
  init_ds_inject_react();
  var React18 = __toESM(require_ds_react(), 1);
  var cx38 = (...a) => a.filter(Boolean).join(" ");
  function CodeBlock({
    code,
    html,
    filename,
    lang,
    copy = true,
    copyLabel = "Copy code",
    copiedLabel = "Copied",
    className,
    ...rest
  }) {
    const [copied, setCopied] = React18.useState(false);
    const canCopy = copy && typeof code === "string" && code.length > 0;
    React18.useEffect(() => {
      if (!copied) return;
      const t = setTimeout(() => setCopied(false), 1600);
      return () => clearTimeout(t);
    }, [copied]);
    const onCopy = () => {
      try {
        navigator.clipboard.writeText(code).then(() => setCopied(true), () => {
        });
      } catch (e) {
      }
    };
    return /* @__PURE__ */ React18.createElement("figure", { className: cx38("lw-code", className), ...rest }, (filename || lang || canCopy) && /* @__PURE__ */ React18.createElement("figcaption", { className: "lw-code-head" }, /* @__PURE__ */ React18.createElement("span", { className: "fn" }, filename), /* @__PURE__ */ React18.createElement("span", { className: "end" }, lang && /* @__PURE__ */ React18.createElement("span", { className: "lang" }, lang), canCopy && /* @__PURE__ */ React18.createElement(
      "button",
      {
        type: "button",
        className: "lw-icon-btn",
        onClick: onCopy,
        "aria-label": copied ? copiedLabel : copyLabel,
        title: copied ? copiedLabel : copyLabel
      },
      /* @__PURE__ */ React18.createElement(Icon, { name: copied ? "check" : "copy", size: 15 })
    ))), /* @__PURE__ */ React18.createElement("pre", null, /* @__PURE__ */ React18.createElement("code", { dangerouslySetInnerHTML: html ? { __html: html } : void 0 }, html ? void 0 : code)));
  }

  // components/data/Pagination.jsx
  init_ds_inject_react();
  var cx39 = (...a) => a.filter(Boolean).join(" ");
  function pages(page, count) {
    const out = [];
    const push = (p) => {
      if (out[out.length - 1] !== p) out.push(p);
    };
    for (let p = 1; p <= count; p++) {
      if (p === 1 || p === count || Math.abs(p - page) <= 1) push(p);
      else if (out[out.length - 1] !== "gap") out.push("gap");
    }
    return out;
  }
  function Pagination({
    page = 1,
    pageSize = 25,
    total,
    onPageChange,
    onPageSizeChange,
    pageSizes = [25, 50, 100],
    cursor,
    hasNext,
    hasPrev,
    label = "Pagination",
    prevLabel = "Previous page",
    nextLabel = "Next page",
    pageSizeLabel = "Rows per page",
    formatCount = (f, t, all, fmt2) => fmt2(f) + "–" + fmt2(t) + " of " + fmt2(all),
    formatCursor = (p) => "Page " + p,
    formatPageLabel = (p) => "Page " + p,
    formatPageSize = (s) => s + " / page",
    className,
    ...rest
  }) {
    const count = total != null ? Math.max(1, Math.ceil(total / pageSize)) : 1;
    const from = total ? (page - 1) * pageSize + 1 : 0;
    const to = total ? Math.min(page * pageSize, total) : 0;
    const nf2 = new Intl.NumberFormat();
    const go = (p) => onPageChange && onPageChange(Math.min(Math.max(1, p), count));
    return /* @__PURE__ */ React.createElement("nav", { className: cx39("lw-pagination", className), "aria-label": label, ...rest }, /* @__PURE__ */ React.createElement("span", { className: "lw-pag-info" }, cursor ? formatCursor(page) : total ? formatCount(from, to, total, (v) => nf2.format(v)) : ""), /* @__PURE__ */ React.createElement("span", { className: "lw-spacer" }), onPageSizeChange && !cursor && /* @__PURE__ */ React.createElement(
      "select",
      {
        className: "lw-input lw-input-sm lw-pag-size",
        "aria-label": pageSizeLabel,
        value: pageSize,
        onChange: (e) => onPageSizeChange(Number(e.target.value))
      },
      pageSizes.map((s) => /* @__PURE__ */ React.createElement("option", { key: s, value: s }, formatPageSize(s)))
    ), /* @__PURE__ */ React.createElement(
      "button",
      {
        type: "button",
        className: "lw-pag-btn",
        "aria-label": prevLabel,
        disabled: cursor ? !hasPrev : page <= 1,
        onClick: () => go(page - 1)
      },
      /* @__PURE__ */ React.createElement(Icon, { name: "chevron-left", size: 15 })
    ), !cursor && pages(page, count).map(
      (p, i) => p === "gap" ? /* @__PURE__ */ React.createElement("span", { key: "g" + i, className: "lw-pag-gap", "aria-hidden": "true" }, "…") : /* @__PURE__ */ React.createElement(
        "button",
        {
          key: p,
          type: "button",
          className: "lw-pag-btn",
          "aria-label": formatPageLabel(p),
          "aria-current": p === page ? "page" : void 0,
          onClick: () => go(p)
        },
        p
      )
    ), /* @__PURE__ */ React.createElement(
      "button",
      {
        type: "button",
        className: "lw-pag-btn",
        "aria-label": nextLabel,
        disabled: cursor ? !hasNext : page >= count,
        onClick: () => go(page + 1)
      },
      /* @__PURE__ */ React.createElement(Icon, { name: "chevron-right", size: 15 })
    ));
  }

  // components/data/DataGrid.jsx
  init_ds_inject_react();
  var React19 = __toESM(require_ds_react(), 1);
  var cx40 = (...a) => a.filter(Boolean).join(" ");
  function DataGrid({
    columns = [],
    rows = [],
    rowKey = (r, i) => r.id ?? i,
    sort,
    onSort,
    selectable,
    selected = [],
    onSelectionChange,
    height = 420,
    rowHeight = 44,
    virtualize,
    overscan = 8,
    onRowClick,
    empty = "No rows",
    selectionActions,
    label = "Data grid",
    selectedLabel = "selected",
    clearSelectionLabel = "Clear",
    selectAllLabel = "Select all rows",
    clearAllSelectionLabel = "Clear selection",
    formatResizeLabel = (h) => "Resize " + h,
    formatRowSelectLabel = (n) => "Select row " + n,
    className,
    ...rest
  }) {
    const DEFAULT_W = 160, MIN_W = 72, SEL_W = 44;
    const legacyArgs = legacySortArgs("DataGrid", columns, onSort);
    const [widths, setWidths] = React19.useState(() => columns.map((c) => c.width || DEFAULT_W));
    const [scrollTop, setScrollTop] = React19.useState(0);
    const scrollRef = React19.useRef(null);
    const drag = React19.useRef(null);
    const colKeys = columns.map((c) => c.key).join("\0");
    React19.useEffect(() => {
      setWidths((prev) => columns.map((c, i) => prev[i] || c.width || DEFAULT_W));
    }, [colKeys]);
    const selSet = React19.useMemo(() => new Set(selected), [selected]);
    const allOn = rows.length > 0 && rows.every((r, i) => selSet.has(rowKey(r, i)));
    const someOn = !allOn && rows.some((r, i) => selSet.has(rowKey(r, i)));
    const toggleAll = () => onSelectionChange && onSelectionChange(allOn ? [] : rows.map(rowKey));
    const toggleRow = (k) => {
      if (!onSelectionChange) return;
      const next = new Set(selSet);
      next.has(k) ? next.delete(k) : next.add(k);
      onSelectionChange(Array.from(next));
    };
    const pinLefts = React19.useMemo(() => {
      let acc = selectable ? SEL_W : 0;
      return columns.map((c, i) => {
        if (!c.pin) return null;
        const l = acc;
        acc += widths[i] || DEFAULT_W;
        return l;
      });
    }, [columns, widths, selectable]);
    const lastPin = columns.reduce((last, c, i) => c.pin ? i : last, -1);
    const onResizeDown = (i, e) => {
      e.preventDefault();
      drag.current = { i, x: e.clientX, w: widths[i] || DEFAULT_W };
      let frame2 = 0, latest = null;
      const flush = () => {
        frame2 = 0;
        const d = drag.current;
        if (!d || latest === null) return;
        const min = columns[d.i].minWidth || MIN_W;
        setWidths((w) => w.map((v, n) => n === d.i ? Math.max(min, d.w + latest - d.x) : v));
      };
      const move = (ev) => {
        if (!drag.current) return;
        latest = ev.clientX;
        if (!frame2) frame2 = requestAnimationFrame(flush);
      };
      const up = () => {
        if (frame2) {
          cancelAnimationFrame(frame2);
          flush();
        }
        drag.current = null;
        window.removeEventListener("pointermove", move);
        window.removeEventListener("pointerup", up);
      };
      window.addEventListener("pointermove", move);
      window.addEventListener("pointerup", up);
    };
    const onResizeKey = (i, e) => {
      const d = e.key === "ArrowRight" ? 16 : e.key === "ArrowLeft" ? -16 : 0;
      if (!d) return;
      e.preventDefault();
      const min = columns[i].minWidth || MIN_W;
      setWidths((w) => w.map((v, n) => n === i ? Math.max(min, (v || DEFAULT_W) + d) : v));
    };
    const win = virtualize && rows.length * rowHeight > height;
    const start = win ? Math.max(0, Math.floor(scrollTop / rowHeight) - overscan) : 0;
    const visibleCount = win ? Math.ceil(height / rowHeight) + overscan * 2 : rows.length;
    const slice = win ? rows.slice(start, start + visibleCount) : rows;
    const padTop = win ? start * rowHeight : 0;
    const padBottom = win ? Math.max(0, (rows.length - start - slice.length) * rowHeight) : 0;
    const total = (selectable ? SEL_W : 0) + widths.reduce((s, w) => s + (w || DEFAULT_W), 0);
    return /* @__PURE__ */ React19.createElement("div", { className: cx40("lw-dgrid", className), ...rest }, selectable && selSet.size > 0 && /* @__PURE__ */ React19.createElement("div", { className: "lw-dgrid-selbar" }, /* @__PURE__ */ React19.createElement("span", { className: "count" }, selSet.size), /* @__PURE__ */ React19.createElement("span", null, selectedLabel), /* @__PURE__ */ React19.createElement("span", { className: "lw-spacer" }), selectionActions, /* @__PURE__ */ React19.createElement("button", { type: "button", className: "lw-filter-clear", onClick: () => onSelectionChange && onSelectionChange([]) }, clearSelectionLabel)), /* @__PURE__ */ React19.createElement(
      "div",
      {
        ref: scrollRef,
        className: "lw-dgrid-scroll",
        style: { maxHeight: height },
        onScroll: win ? (e) => setScrollTop(e.currentTarget.scrollTop) : void 0
      },
      /* @__PURE__ */ React19.createElement("table", { style: { minWidth: total }, "aria-label": label, "aria-rowcount": rows.length }, /* @__PURE__ */ React19.createElement("colgroup", null, selectable && /* @__PURE__ */ React19.createElement("col", { style: { width: SEL_W } }), columns.map((c, i) => /* @__PURE__ */ React19.createElement("col", { key: c.key, style: { width: widths[i] || DEFAULT_W } }))), /* @__PURE__ */ React19.createElement("thead", null, /* @__PURE__ */ React19.createElement("tr", null, selectable && /* @__PURE__ */ React19.createElement("th", { "data-pin": "true", style: { insetInlineStart: 0 }, scope: "col" }, /* @__PURE__ */ React19.createElement("span", { className: "lw-dgrid-check" }, /* @__PURE__ */ React19.createElement("label", { className: "lw-check" }, /* @__PURE__ */ React19.createElement(
        "input",
        {
          type: "checkbox",
          checked: allOn,
          ref: (el) => {
            if (el) el.indeterminate = someOn;
          },
          onChange: toggleAll,
          "aria-label": allOn ? clearAllSelectionLabel : selectAllLabel
        }
      ), /* @__PURE__ */ React19.createElement("span", { className: "box" })))), columns.map((c, i) => {
        const dir = sort && sort.key === c.key ? sort.dir : null;
        return /* @__PURE__ */ React19.createElement(
          "th",
          {
            key: c.key,
            scope: "col",
            className: cx40(c.num && "num"),
            "data-pin": c.pin ? "true" : void 0,
            "data-pin-last": c.pin && i === lastPin ? "true" : void 0,
            style: c.pin ? { insetInlineStart: pinLefts[i] } : void 0,
            "aria-sort": dir ? dir === "asc" ? "ascending" : "descending" : void 0
          },
          c.sortable && onSort ? /* @__PURE__ */ React19.createElement(
            "button",
            {
              type: "button",
              className: "lw-dgrid-sort",
              onClick: () => emitSort(onSort, legacyArgs, c.key, dir === "asc" ? "desc" : "asc")
            },
            colHeader("DataGrid", c),
            /* @__PURE__ */ React19.createElement(Icon, { name: dir === "asc" ? "sort-asc" : dir === "desc" ? "sort-desc" : "chevrons-up-down", size: 13 })
          ) : colHeader("DataGrid", c),
          c.resizable !== false && /* @__PURE__ */ React19.createElement(
            "button",
            {
              type: "button",
              className: "lw-dgrid-resize",
              "aria-label": formatResizeLabel(typeof colHeader("DataGrid", c) === "string" ? colHeader("DataGrid", c) : c.key),
              onPointerDown: (e) => onResizeDown(i, e),
              onKeyDown: (e) => onResizeKey(i, e)
            }
          )
        );
      }))), /* @__PURE__ */ React19.createElement("tbody", null, padTop > 0 && /* @__PURE__ */ React19.createElement("tr", { "aria-hidden": "true", className: "lw-dgrid-pad", style: { height: padTop } }, /* @__PURE__ */ React19.createElement("td", { colSpan: columns.length + (selectable ? 1 : 0) })), slice.map((r, n) => {
        const i = start + n;
        const k = rowKey(r, i);
        const on = selSet.has(k);
        return /* @__PURE__ */ React19.createElement(
          "tr",
          {
            key: k,
            "aria-selected": on || void 0,
            "aria-rowindex": i + 2,
            "data-clickable": onRowClick ? "true" : void 0,
            style: { height: rowHeight },
            onClick: onRowClick ? () => onRowClick(r, i) : void 0
          },
          selectable && /* @__PURE__ */ React19.createElement("td", { "data-pin": "true", style: { insetInlineStart: 0 }, onClick: (e) => e.stopPropagation() }, /* @__PURE__ */ React19.createElement("span", { className: "lw-dgrid-check" }, /* @__PURE__ */ React19.createElement("label", { className: "lw-check" }, /* @__PURE__ */ React19.createElement(
            "input",
            {
              type: "checkbox",
              checked: on,
              onChange: () => toggleRow(k),
              "aria-label": formatRowSelectLabel(i + 1)
            }
          ), /* @__PURE__ */ React19.createElement("span", { className: "box" })))),
          columns.map((c, ci) => /* @__PURE__ */ React19.createElement(
            "td",
            {
              key: c.key,
              className: cx40(c.num && "num"),
              "data-pin": c.pin ? "true" : void 0,
              "data-pin-last": c.pin && ci === lastPin ? "true" : void 0,
              style: c.pin ? { insetInlineStart: pinLefts[ci] } : void 0
            },
            c.render ? c.render(r, i) : r[c.key]
          ))
        );
      }), padBottom > 0 && /* @__PURE__ */ React19.createElement("tr", { "aria-hidden": "true", className: "lw-dgrid-pad", style: { height: padBottom } }, /* @__PURE__ */ React19.createElement("td", { colSpan: columns.length + (selectable ? 1 : 0) })))),
      !rows.length && /* @__PURE__ */ React19.createElement("div", { className: "lw-dgrid-empty" }, empty)
    ));
  }

  // components/data/Progress.jsx
  init_ds_inject_react();
  var cx41 = (...a) => a.filter(Boolean).join(" ");
  function Progress({ value = 0, max = 100, label, tone, className, ...rest }) {
    const pct = Math.max(0, Math.min(100, Number(value) / Number(max || 100) * 100));
    return /* @__PURE__ */ React.createElement(
      "span",
      {
        className: cx41("lw-progress", className),
        "data-tone": tone,
        role: "progressbar",
        "aria-valuenow": Math.round(pct),
        "aria-valuemin": 0,
        "aria-valuemax": 100,
        "aria-label": label,
        ...rest
      },
      /* @__PURE__ */ React.createElement("i", { style: { width: pct + "%" } })
    );
  }

  // components/data/FilterBar.jsx
  init_ds_inject_react();
  var cx42 = (...a) => a.filter(Boolean).join(" ");
  function FilterBar({
    filters = [],
    onRemove,
    onClear,
    label = "Applied filters",
    clearAllLabel = "Clear all",
    formatRemoveLabel = (name) => "Remove filter " + name,
    className,
    children,
    ...rest
  }) {
    if (!filters.length && !children) return null;
    return /* @__PURE__ */ React.createElement("div", { className: cx42("lw-filters", className), role: "group", "aria-label": label, ...rest }, children, filters.map((f) => /* @__PURE__ */ React.createElement("span", { key: f.id ?? f.key + ":" + f.value, className: "lw-filter-chip" }, f.key && /* @__PURE__ */ React.createElement("span", { className: "k" }, f.key), /* @__PURE__ */ React.createElement("span", null, f.label ?? f.value), /* @__PURE__ */ React.createElement(
      "button",
      {
        type: "button",
        "aria-label": formatRemoveLabel((f.key ? f.key + " " : "") + (f.label ?? f.value)),
        onClick: () => onRemove && onRemove(f)
      },
      /* @__PURE__ */ React.createElement(Icon, { name: "close", size: 11 })
    ))), filters.length > 1 && onClear && /* @__PURE__ */ React.createElement("button", { type: "button", className: "lw-filter-clear", onClick: onClear }, clearAllLabel));
  }
  function Toolbar({ className, children, ...rest }) {
    return /* @__PURE__ */ React.createElement("div", { className: cx42("lw-toolbar", className), ...rest }, children);
  }

  // components/data/BarChart.jsx
  init_ds_inject_react();

  // components/data/chart-parts.jsx
  init_ds_inject_react();
  var cx43 = (...a) => a.filter(Boolean).join(" ");
  var SERIES = (i) => "var(--lw-chart-" + (i % 8 + 1) + ")";
  var nf = new Intl.NumberFormat();
  function DataTable({ labels, series, caption, categoryHeader = "Category" }) {
    return /* @__PURE__ */ React.createElement("table", { className: "lw-sr-only" }, /* @__PURE__ */ React.createElement("caption", null, caption), /* @__PURE__ */ React.createElement("thead", null, /* @__PURE__ */ React.createElement("tr", null, /* @__PURE__ */ React.createElement("th", { scope: "col" }, categoryHeader), series.map((s, i) => /* @__PURE__ */ React.createElement("th", { key: i, scope: "col" }, s.name)))), /* @__PURE__ */ React.createElement("tbody", null, labels.map((l, i) => /* @__PURE__ */ React.createElement("tr", { key: i }, /* @__PURE__ */ React.createElement("th", { scope: "row" }, l), series.map((s, si) => /* @__PURE__ */ React.createElement("td", { key: si }, nf.format(s.data[i])))))));
  }
  function Legend({ series }) {
    if (series.length < 2) return null;
    return /* @__PURE__ */ React.createElement("div", { className: "lw-chart-legend" }, series.map((s, i) => /* @__PURE__ */ React.createElement("span", { key: i }, /* @__PURE__ */ React.createElement("i", { style: { background: s.color || SERIES(i) } }), s.name)));
  }
  var ticks = (max, n = 4) => {
    const step = Math.pow(10, Math.floor(Math.log10(max / n || 1)));
    const s = Math.ceil(max / n / step) * step;
    return Array.from({ length: n + 1 }, (_, i) => i * s);
  };
  var CHART_W = 640;
  var CHART_PAD = { t: 8, r: 8, b: 22, l: 40 };
  function frame(max, height) {
    const pad = CHART_PAD, w = CHART_W;
    const ts = ticks(max);
    const top = ts[ts.length - 1];
    const iw = w - pad.l - pad.r, ih = height - pad.t - pad.b;
    return { w, pad, ts, top, iw, ih, y: (v) => pad.t + ih - v / top * ih };
  }
  function Grid2({ f }) {
    return /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement("g", { className: "grid" }, f.ts.map((v, i) => /* @__PURE__ */ React.createElement("line", { key: i, x1: f.pad.l, x2: f.w - f.pad.r, y1: f.y(v), y2: f.y(v) }))), /* @__PURE__ */ React.createElement("g", { className: "axis" }, f.ts.map((v, i) => /* @__PURE__ */ React.createElement("text", { key: i, x: f.pad.l - 6, y: f.y(v) + 3, textAnchor: "end" }, nf.format(v)))));
  }

  // components/data/BarChart.jsx
  function BarChart({ labels = [], series = [], height = 200, stacked, label, className, ...rest }) {
    const max = Math.max(1, ...series.flatMap((s) => stacked ? [] : s.data), ...stacked ? labels.map((_, i) => series.reduce((a, s) => a + s.data[i], 0)) : []);
    const f = frame(max, height);
    const { w, pad, top, iw, ih, y } = f;
    const bandW = iw / Math.max(labels.length, 1);
    const barW = stacked ? bandW * 0.56 : bandW * 0.72 / Math.max(series.length, 1);
    return /* @__PURE__ */ React.createElement("div", { className: cx43("lw-chart-wrap", className), ...rest }, /* @__PURE__ */ React.createElement("svg", { className: "lw-chart", viewBox: "0 0 " + w + " " + height, role: "img", "aria-label": label }, /* @__PURE__ */ React.createElement(Grid2, { f }), /* @__PURE__ */ React.createElement("g", { className: "axis" }, labels.map((l, i) => /* @__PURE__ */ React.createElement("text", { key: i, x: pad.l + bandW * i + bandW / 2, y: height - 6, textAnchor: "middle" }, l))), labels.map((l, i) => {
      let acc = 0;
      return series.map((s, si) => {
        const v = s.data[i] || 0;
        const h = v / top * ih;
        const x = stacked ? pad.l + bandW * i + (bandW - barW) / 2 : pad.l + bandW * i + (bandW - barW * series.length) / 2 + barW * si;
        const yy = stacked ? pad.t + ih - acc - h : y(v);
        acc += h;
        return /* @__PURE__ */ React.createElement(
          "rect",
          {
            key: si,
            className: "bar",
            x,
            y: yy,
            width: barW,
            height: Math.max(0, h),
            rx: "2",
            fill: s.color || SERIES(si)
          },
          /* @__PURE__ */ React.createElement("title", null, s.name + " · " + l + " · " + nf.format(v))
        );
      });
    })), /* @__PURE__ */ React.createElement(Legend, { series }), /* @__PURE__ */ React.createElement(DataTable, { labels, series, caption: label }));
  }

  // components/data/LineChart.jsx
  init_ds_inject_react();
  function LineChart({ labels = [], series = [], height = 200, area, label, className, ...rest }) {
    const max = Math.max(1, ...series.flatMap((s) => s.data));
    const f = frame(max, height);
    const { w, pad, top, iw, ih, y } = f;
    const x = (i) => pad.l + (labels.length < 2 ? iw / 2 : iw / (labels.length - 1) * i);
    return /* @__PURE__ */ React.createElement("div", { className: cx43("lw-chart-wrap", className), ...rest }, /* @__PURE__ */ React.createElement("svg", { className: "lw-chart", viewBox: "0 0 " + w + " " + height, role: "img", "aria-label": label }, /* @__PURE__ */ React.createElement(Grid2, { f }), /* @__PURE__ */ React.createElement("g", { className: "axis" }, labels.map((l, i) => /* @__PURE__ */ React.createElement("text", { key: i, x: x(i), y: height - 6, textAnchor: "middle" }, l))), series.map((s, si) => {
      const d = s.data.map((v, i) => (i ? "L" : "M") + x(i) + " " + y(v)).join(" ");
      const c = s.color || SERIES(si);
      return /* @__PURE__ */ React.createElement("g", { key: si }, area && /* @__PURE__ */ React.createElement("path", { d: d + " L" + x(s.data.length - 1) + " " + (pad.t + ih) + " L" + x(0) + " " + (pad.t + ih) + " Z", fill: c, opacity: "0.12" }), /* @__PURE__ */ React.createElement("path", { className: "line", d, stroke: c }), s.data.map((v, i) => /* @__PURE__ */ React.createElement("circle", { key: i, className: "dot", cx: x(i), cy: y(v), r: "3", fill: c }, /* @__PURE__ */ React.createElement("title", null, s.name + " · " + labels[i] + " · " + nf.format(v)))));
    })), /* @__PURE__ */ React.createElement(Legend, { series }), /* @__PURE__ */ React.createElement(DataTable, { labels, series, caption: label }));
  }

  // components/data/ActivityFeed.jsx
  init_ds_inject_react();
  var React20 = __toESM(require_ds_react(), 1);
  var cx44 = (...a) => a.filter(Boolean).join(" ");
  var ms = (when) => when instanceof Date ? when.getTime() : new Date(when).getTime();
  var stamp = (when) => new Intl.DateTimeFormat(void 0, { day: "numeric", month: "short" }).format(ms(when));
  var RELATIVE_LABELS = { now: "just now", minutes: "m ago", hours: "h ago", days: "d ago" };
  var BUCKET_LABELS = { today: "Today", yesterday: "Yesterday", week: "This week", earlier: "Earlier" };
  function timeAgo(when, now = Date.now(), labels = RELATIVE_LABELS) {
    const t = ms(when);
    const s = Math.max(0, (now - t) / 1e3);
    if (s < 60) return labels.now;
    if (s < 3600) return Math.floor(s / 60) + labels.minutes;
    if (s < 86400) return Math.floor(s / 3600) + labels.hours;
    if (s < 86400 * 3) return Math.floor(s / 86400) + labels.days;
    return stamp(when);
  }
  var bucketKey = (when, now) => {
    const d = new Date(when), n = new Date(now);
    const days = Math.floor((new Date(n.getFullYear(), n.getMonth(), n.getDate()) - new Date(d.getFullYear(), d.getMonth(), d.getDate())) / 864e5);
    return days <= 0 ? "today" : days === 1 ? "yesterday" : days < 7 ? "week" : "earlier";
  };
  function ActivityFeed({
    items = [],
    onItemClick,
    grouped = true,
    now,
    label = "Activity",
    linkAs = "a",
    bucketLabels = BUCKET_LABELS,
    formatTimeAgo = timeAgo,
    unreadLabel = "Unread",
    className,
    ...rest
  }) {
    const [mounted, setMounted] = React20.useState(null);
    React20.useEffect(() => {
      setMounted(Date.now());
    }, []);
    const at = now != null ? now : mounted;
    const groups = [];
    items.forEach((it) => {
      const g = grouped && it.when && at != null ? bucketLabels[bucketKey(it.when, at)] : null;
      const last = groups[groups.length - 1];
      if (last && last.name === g) last.items.push(it);
      else groups.push({ name: g, items: [it] });
    });
    return /* @__PURE__ */ React20.createElement("div", { className: cx44("lw-feed", className), role: "group", "aria-label": label, ...rest }, groups.map((g, gi) => (
      /* Keyed on the index: two runs can carry the same bucket name when the
         items are not in date order, and a duplicate key is a dropped child. */
      /* @__PURE__ */ React20.createElement(React20.Fragment, { key: gi }, g.name && /* @__PURE__ */ React20.createElement("div", { className: "lw-feed-group" }, g.name), g.items.map((it, i) => {
        const Tag = it.href ? linkAs : onItemClick || it.onClick ? "button" : "div";
        return /* @__PURE__ */ React20.createElement(
          Tag,
          {
            key: it.id ?? gi + "-" + i,
            className: "lw-feed-item",
            href: it.href || void 0,
            type: Tag === "button" ? "button" : void 0,
            "data-unread": it.unread ? "true" : void 0,
            "data-tone": it.tone,
            onClick: Tag === "div" ? void 0 : () => it.onClick ? it.onClick(it) : onItemClick && onItemClick(it)
          },
          it.icon && /* @__PURE__ */ React20.createElement("span", { className: "lw-feed-ic" }, /* @__PURE__ */ React20.createElement(Icon, { name: it.icon, size: 15 })),
          /* @__PURE__ */ React20.createElement("span", { className: "lw-feed-main" }, /* @__PURE__ */ React20.createElement("span", { className: "lw-feed-title" }, it.title), /* @__PURE__ */ React20.createElement("span", { className: "lw-feed-meta" }, it.when ? at != null ? formatTimeAgo(it.when, at) : stamp(it.when) : null, it.meta ? (it.when ? " · " : "") + it.meta : "")),
          it.unread && /* @__PURE__ */ React20.createElement("span", { className: "lw-sr-only" }, unreadLabel)
        );
      }))
    )));
  }

  // components/nav/TopBar.jsx
  init_ds_inject_react();
  var cx45 = (...a) => a.filter(Boolean).join(" ");
  function TopBar({
    brand,
    brandHref,
    logo = false,
    links = [],
    actions,
    linkAs = "a",
    navLabel = "Primary",
    homeLabel = "Home",
    formatBrandLabel = (b) => b + " — home",
    className,
    children,
    ...rest
  }) {
    const Link = linkAs;
    const Brand = brandHref ? linkAs : "span";
    const brandProps = brandHref ? { href: brandHref, "aria-label": typeof brand === "string" ? formatBrandLabel(brand) : homeLabel } : {};
    return /* @__PURE__ */ React.createElement("header", { className: cx45("lw-topbar", className), ...rest }, logo ? /* @__PURE__ */ React.createElement(Brand, { className: "brand", ...brandProps }, /* @__PURE__ */ React.createElement("span", { className: "brand-mark", "aria-hidden": "true" }), /* @__PURE__ */ React.createElement("span", { className: "brand-name" }, brand)) : brand && /* @__PURE__ */ React.createElement(Brand, { className: "brand", ...brandProps }, brand), links.length > 0 && /* @__PURE__ */ React.createElement("nav", { "aria-label": navLabel }, links.map((l, i) => /* @__PURE__ */ React.createElement(Link, { key: l.id ?? i, href: l.href, "aria-current": l.current ? "page" : void 0 }, l.label))), /* @__PURE__ */ React.createElement("span", { className: "spacer" }), actions, children);
  }

  // components/nav/AppBar.jsx
  init_ds_inject_react();

  // components/nav/Breadcrumbs.jsx
  init_ds_inject_react();
  var React21 = __toESM(require_ds_react(), 1);
  var cx46 = (...a) => a.filter(Boolean).join(" ");
  function Breadcrumbs({ items = [], linkAs = "a", label = "Breadcrumb", className, ...rest }) {
    const Link = linkAs;
    return /* @__PURE__ */ React21.createElement("nav", { className: cx46("lw-crumbs", className), "aria-label": label, ...rest }, items.map((it, i) => /* @__PURE__ */ React21.createElement(React21.Fragment, { key: i }, i > 0 && /* @__PURE__ */ React21.createElement("span", { className: "sep", "aria-hidden": "true" }, "/"), it.href && i < items.length - 1 ? /* @__PURE__ */ React21.createElement(Link, { href: it.href }, it.label) : /* @__PURE__ */ React21.createElement("span", { "aria-current": i === items.length - 1 ? "page" : void 0 }, it.label))));
  }

  // components/nav/AppBar.jsx
  function AppBar({
    brand = "LeanWise AI",
    brandHref = "#",
    mark = true,
    crumbs = [],
    onMenuClick,
    menuExpanded,
    actions,
    linkAs = "a",
    collapseNavLabel = "Collapse navigation",
    expandNavLabel = "Expand navigation",
    homeLabel = "Home",
    formatBrandLabel = (b) => b + " — home",
    className,
    children,
    ...rest
  }) {
    const Brand = brandHref ? linkAs : "span";
    return /* @__PURE__ */ React.createElement(TopBar, { className, ...rest }, /* @__PURE__ */ React.createElement("div", { className: "lw-appbar-lead" }, onMenuClick && /* @__PURE__ */ React.createElement(
      "button",
      {
        type: "button",
        className: "lw-icon-btn",
        onClick: onMenuClick,
        "aria-expanded": menuExpanded,
        "aria-label": menuExpanded ? collapseNavLabel : expandNavLabel
      },
      /* @__PURE__ */ React.createElement(Icon, { name: "sidebar", size: 21 })
    ), /* @__PURE__ */ React.createElement(
      Brand,
      {
        className: "lw-appbar-brand",
        href: brandHref || void 0,
        "aria-label": brandHref ? typeof brand === "string" ? formatBrandLabel(brand) : homeLabel : void 0
      },
      mark && /* @__PURE__ */ React.createElement("span", { className: "brand-mark", "aria-hidden": "true" }),
      brand
    ), crumbs.length > 0 && /* @__PURE__ */ React.createElement(Breadcrumbs, { items: crumbs, linkAs })), actions, children);
  }

  // components/nav/Sidebar.jsx
  init_ds_inject_react();
  var cx47 = (...a) => a.filter(Boolean).join(" ");
  function Sidebar({ items = [], collapsed = false, footer, linkAs, label = "Sections", className, children, ...rest }) {
    return /* @__PURE__ */ React.createElement("nav", { className: cx47("lw-sidebar", className), "data-collapsed": collapsed ? "true" : void 0, "aria-label": label, ...rest }, items.map(
      (it, i) => it.group ? /* @__PURE__ */ React.createElement("span", { key: "g" + i, className: "lw-nav-group" }, it.group) : /* @__PURE__ */ React.createElement(NavItem, { key: it.id ?? i, linkAs, ...it, collapsed })
    ), children, footer && /* @__PURE__ */ React.createElement("div", { className: "lw-sidebar-foot" }, footer));
  }
  function NavItem({ href, label, icon, badge, current, collapsed, linkAs = "a", className, ...rest }) {
    const Tag = href ? linkAs : "button";
    const tip = collapsed && typeof label === "string" ? label : void 0;
    return /* @__PURE__ */ React.createElement(
      Tag,
      {
        className: cx47("lw-nav-item", className),
        href,
        type: href ? void 0 : "button",
        "aria-current": current ? "page" : void 0,
        title: tip,
        ...rest
      },
      icon && /* @__PURE__ */ React.createElement("span", { className: "ic", "aria-hidden": "true" }, icon),
      /* @__PURE__ */ React.createElement("span", { className: "lw-nav-text" }, label),
      badge && /* @__PURE__ */ React.createElement("span", { className: "badge" }, badge)
    );
  }

  // components/nav/Tabs.jsx
  init_ds_inject_react();
  var React22 = __toESM(require_ds_react(), 1);
  var cx48 = (...a) => a.filter(Boolean).join(" ");
  function Tabs({ tabs = [], value, onChange, label, className, ...rest }) {
    const ref = React22.useRef(null);
    const move = (next) => {
      onChange && onChange(tabs[next].value);
      const el = ref.current && ref.current.querySelectorAll('[role="tab"]')[next];
      if (el) el.focus({ preventScroll: true });
    };
    const onKeyDown = (e) => {
      const found = tabs.findIndex((t) => t.value === value);
      const i = found < 0 ? 0 : found;
      const k = e.key;
      if (k === "Home") {
        e.preventDefault();
        return move(0);
      }
      if (k === "End") {
        e.preventDefault();
        return move(tabs.length - 1);
      }
      const d = k === "ArrowRight" ? 1 : k === "ArrowLeft" ? -1 : 0;
      if (!d) return;
      e.preventDefault();
      move((i + d + tabs.length) % tabs.length);
    };
    return /* @__PURE__ */ React22.createElement("div", { ref, className: cx48("lw-tabs", className), role: "tablist", "aria-label": label, onKeyDown, ...rest }, tabs.map((t) => /* @__PURE__ */ React22.createElement(
      "button",
      {
        key: t.value,
        role: "tab",
        type: "button",
        "aria-selected": t.value === value,
        "aria-controls": t.controls,
        id: t.id,
        tabIndex: t.value === value ? 0 : -1,
        onClick: () => onChange && onChange(t.value)
      },
      t.label,
      t.count != null && /* @__PURE__ */ React22.createElement("span", { className: "count" }, t.count)
    )));
  }

  // components/nav/ThemeToggle.jsx
  init_ds_inject_react();
  var React23 = __toESM(require_ds_react(), 1);

  // hooks.js
  init_ds_inject_react();
  var import_react = __toESM(require_ds_react(), 1);
  var canDOM = () => typeof window !== "undefined";
  var THEME_KEY = "lw-theme";
  var persist = (mode) => {
    try {
      localStorage.setItem(THEME_KEY, mode);
    } catch (e) {
    }
    try {
      document.cookie = THEME_KEY + "=" + mode + "; max-age=31536000; path=/; samesite=lax";
    } catch (e) {
    }
  };
  var systemDark = () => canDOM() && window.matchMedia("(prefers-color-scheme: dark)").matches;
  var THEME_EVENT = "lw:theme";
  function paint(mode) {
    const dark = mode === "dark" || mode === "system" && systemDark();
    const el = document.documentElement;
    el.classList.toggle("dark", dark);
    el.setAttribute("data-theme", dark ? "dark" : "light");
    try {
      window.dispatchEvent(new CustomEvent(THEME_EVENT, { detail: mode }));
    } catch (e) {
    }
    return dark;
  }

  // components/nav/ThemeToggle.jsx
  var cx49 = (...a) => a.filter(Boolean).join(" ");
  var THEME_LABELS = { light: "Light", dark: "Dark", system: "Auto" };
  var GLYPHS = { light: "sun", dark: "moon", system: "monitor" };
  function ThemeToggle({
    value,
    onChange,
    modes = ["light", "dark"],
    label = "Colour theme",
    modeLabels = THEME_LABELS,
    compact = false,
    formatCompactLabel = (l, current, next) => l + ": " + current + ". " + next,
    className,
    ...rest
  }) {
    const [internal, setInternal] = React23.useState(modes.includes("system") ? "system" : modes[0]);
    React23.useEffect(() => {
      if (value !== void 0) return;
      try {
        const saved = localStorage.getItem(THEME_KEY);
        if (saved && modes.includes(saved)) {
          setInternal(saved);
          paint(saved);
        }
      } catch (e) {
      }
    }, [value]);
    React23.useEffect(() => {
      if (value !== void 0) return;
      const on = (e) => {
        if (modes.includes(e.detail)) setInternal(e.detail);
      };
      window.addEventListener(THEME_EVENT, on);
      return () => window.removeEventListener(THEME_EVENT, on);
    }, [value, modes.join(",")]);
    const mode = value !== void 0 ? value : internal;
    const apply = (m) => {
      if (value === void 0) setInternal(m);
      onChange && onChange(m);
      if (value === void 0) persist(m);
      paint(m);
    };
    if (compact) {
      const next = modes[(Math.max(0, modes.indexOf(mode)) + 1) % modes.length];
      const name = formatCompactLabel(label, modeLabels[mode] || mode, modeLabels[next] || next);
      return /* @__PURE__ */ React23.createElement(
        "button",
        {
          type: "button",
          className: cx49("lw-icon-btn", "lw-hit", "lw-theme-compact", className),
          "aria-label": name,
          title: name,
          onClick: () => apply(next),
          ...rest
        },
        /* @__PURE__ */ React23.createElement(Icon, { name: GLYPHS[mode] || "monitor", size: 18 })
      );
    }
    const { ref, onKeyDown, tabIndexFor } = useRadioGroup(modes, mode, apply);
    return /* @__PURE__ */ React23.createElement(
      "div",
      {
        ref,
        className: cx49("lw-segmented", className),
        role: "radiogroup",
        "aria-label": label,
        onKeyDown,
        ...rest
      },
      modes.map((m, i) => /* @__PURE__ */ React23.createElement(
        "button",
        {
          key: m,
          type: "button",
          role: "radio",
          "aria-checked": mode === m,
          tabIndex: tabIndexFor(i),
          onClick: () => apply(m),
          "aria-label": modeLabels[m] || m,
          title: modeLabels[m] || m
        },
        /* @__PURE__ */ React23.createElement(Icon, { name: GLYPHS[m] || "monitor", size: 16 })
      ))
    );
  }

  // components/nav/CommandPalette.jsx
  init_ds_inject_react();
  var React24 = __toESM(require_ds_react(), 1);
  var cx50 = (...a) => a.filter(Boolean).join(" ");
  function score(query, text) {
    if (!query) return 0;
    const q = query.toLowerCase(), s = String(text).toLowerCase();
    let i = 0, hit = 0, run = 0, best = 0;
    for (let n = 0; n < s.length && i < q.length; n++) {
      if (s[n] === q[i]) {
        i++;
        run++;
        hit += run + (n === 0 || s[n - 1] === " " ? 3 : 0);
        best = Math.max(best, run);
      } else run = 0;
    }
    return i === q.length ? hit + best : -1;
  }
  function CommandPalette({
    open,
    onClose,
    commands = [],
    onRun,
    placeholder = "Type a command or search…",
    emptyText = "No matches",
    label = "Command palette",
    hints = ["↑↓ navigate", "↵ run", "esc close"],
    className,
    ...rest
  }) {
    const ref = React24.useRef(null);
    const inputRef = React24.useRef(null);
    const [q, setQ] = React24.useState("");
    const [active, setActive] = React24.useState(0);
    const uid = React24.useId();
    React24.useEffect(() => {
      const el = ref.current;
      if (!el) return;
      if (open && !el.open) {
        el.showModal();
        setQ("");
        setActive(0);
      }
      if (!open && el.open) el.close();
    }, [open]);
    React24.useEffect(() => {
      if (open && inputRef.current) inputRef.current.focus({ preventScroll: true });
    }, [open]);
    const shown = React24.useMemo(() => commands.filter((c) => !c.hidden).map((c) => ({ c, s: Math.max(score(q, c.label), score(q, c.group || "") - 4, ...(c.keywords || []).map((k) => score(q, k) - 2)) })).filter((x) => x.s >= 0).sort((a, b) => b.s - a.s).map((x) => x.c), [q, commands]);
    React24.useEffect(() => {
      setActive(0);
    }, [q]);
    const run = (c) => {
      if (!c || c.disabled) return;
      onClose && onClose();
      c.run ? c.run(c) : onRun && onRun(c);
    };
    const onKeyDown = (e) => {
      if (e.key === "ArrowDown") {
        e.preventDefault();
        setActive((i) => (i + 1) % Math.max(shown.length, 1));
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setActive((i) => (i - 1 + shown.length) % Math.max(shown.length, 1));
      } else if (e.key === "Enter") {
        e.preventDefault();
        run(shown[active]);
      }
    };
    let lastGroup = null;
    return /* @__PURE__ */ React24.createElement(
      "dialog",
      {
        ref,
        className: cx50("lw-cmdk", className),
        "aria-label": label,
        onClose,
        onCancel: (e) => {
          e.preventDefault();
          onClose && onClose(e);
        },
        onKeyDown,
        ...rest
      },
      /* @__PURE__ */ React24.createElement("div", { className: "lw-cmdk-input" }, /* @__PURE__ */ React24.createElement(Icon, { name: "search", size: 17 }), /* @__PURE__ */ React24.createElement(
        "input",
        {
          ref: inputRef,
          type: "text",
          role: "combobox",
          "aria-expanded": "true",
          "aria-controls": uid,
          "aria-activedescendant": shown[active] ? uid + "-" + active : void 0,
          "aria-label": label,
          placeholder,
          value: q,
          onChange: (e) => setQ(e.target.value)
        }
      )),
      /* @__PURE__ */ React24.createElement("ul", { className: "lw-cmdk-list lw-menu", id: uid, role: "listbox", "aria-label": label }, !shown.length && /* @__PURE__ */ React24.createElement("li", { className: "lw-listbox-empty" }, emptyText), shown.map((c, i) => {
        const head = c.group && c.group !== lastGroup ? lastGroup = c.group : null;
        return /* @__PURE__ */ React24.createElement(React24.Fragment, { key: c.id ?? i }, head && /* @__PURE__ */ React24.createElement("li", { className: "lw-menu-label", role: "presentation" }, head), /* @__PURE__ */ React24.createElement(
          "li",
          {
            id: uid + "-" + i,
            role: "option",
            "aria-selected": i === active,
            className: "lw-menu-item",
            "data-active": i === active ? "true" : void 0,
            style: i === active ? { background: "var(--lw-bg-subtle)" } : void 0,
            onMouseEnter: () => setActive(i),
            onClick: () => run(c)
          },
          /* @__PURE__ */ React24.createElement("span", { className: "lw-menu-lead" }, c.icon && /* @__PURE__ */ React24.createElement(Icon, { name: c.icon, size: 15 })),
          /* @__PURE__ */ React24.createElement("span", { className: "lw-menu-text" }, c.label),
          c.kbd && /* @__PURE__ */ React24.createElement("span", { className: "lw-menu-kbd" }, c.kbd)
        ));
      })),
      /* @__PURE__ */ React24.createElement("div", { className: "lw-cmdk-foot" }, hints.map((h, i) => /* @__PURE__ */ React24.createElement("span", { key: i }, h)))
    );
  }

  // components/nav/BottomNav.jsx
  init_ds_inject_react();
  var React25 = __toESM(require_ds_react(), 1);
  var cx51 = (...a) => a.filter(Boolean).join(" ");
  function BottomNav({
    items = [],
    value,
    onChange,
    label = "Main",
    linkAs = "a",
    formatBadgeLabel = (n) => n + " unread",
    className,
    ...rest
  }) {
    React25.useEffect(() => {
      if (items.length <= 5 || typeof console === "undefined") return;
      console.warn("BottomNav: " + items.length + " items. Past five, labels truncate and the bar stops being scannable — use a sidebar or a More destination.");
    }, [items.length]);
    return /* @__PURE__ */ React25.createElement("nav", { className: cx51("lw-bottom-nav", className), "aria-label": label, ...rest }, items.map((it) => {
      const on = it.value === value;
      const Tag = it.href ? linkAs : "button";
      return /* @__PURE__ */ React25.createElement(
        Tag,
        {
          key: it.value,
          href: it.href || void 0,
          type: it.href ? void 0 : "button",
          "aria-current": on ? "page" : void 0,
          onClick: it.href ? void 0 : () => onChange && onChange(it.value)
        },
        /* @__PURE__ */ React25.createElement(Icon, { name: it.icon, size: 21 }),
        /* @__PURE__ */ React25.createElement("span", { className: "lw-bn-label" }, it.label),
        it.badge != null && /* @__PURE__ */ React25.createElement("span", { className: "lw-sr-only" }, formatBadgeLabel(it.badge))
      );
    }));
  }

  // components/nav/NavToggle.jsx
  init_ds_inject_react();
  var React26 = __toESM(require_ds_react(), 1);
  var cx52 = (...a) => a.filter(Boolean).join(" ");
  function NavToggle({
    label = "Menu",
    closeLabel = "Close menu",
    id,
    defaultOpen = false,
    onOpenChange,
    className,
    children,
    ...rest
  }) {
    const auto = React26.useId();
    const panelId = id || "lw-nav-panel-" + auto;
    const [open, setOpen] = React26.useState(defaultOpen);
    const btnRef = React26.useRef(null);
    const set = (next) => {
      setOpen(next);
      onOpenChange?.(next);
    };
    const onKeyDown = (e) => {
      if (e.key !== "Escape" || !open) return;
      e.stopPropagation();
      set(false);
      btnRef.current?.focus();
    };
    return /* @__PURE__ */ React26.createElement(React26.Fragment, null, /* @__PURE__ */ React26.createElement(
      "button",
      {
        type: "button",
        ref: btnRef,
        className: cx52("lw-topbar-toggle", "lw-icon-btn", "lw-hit", className),
        "aria-expanded": open,
        "aria-controls": panelId,
        "aria-label": open ? closeLabel : label,
        onClick: () => set(!open),
        onKeyDown,
        ...rest
      },
      /* @__PURE__ */ React26.createElement(Icon, { name: open ? "close" : "menu", size: 20 })
    ), /* @__PURE__ */ React26.createElement("div", { id: panelId, className: "lw-topbar-panel", hidden: !open, onKeyDown }, children));
  }

  // components/overlays/Dialog.jsx
  init_ds_inject_react();
  var React27 = __toESM(require_ds_react(), 1);
  var cx53 = (...a) => a.filter(Boolean).join(" ");
  function Dialog({ open, onClose, title, description, footer, width, closeLabel = "Close", className, children, ...rest }) {
    const ref = React27.useRef(null);
    const uid = React27.useId();
    const titleId = title ? uid + "-t" : void 0;
    const descId = description ? uid + "-d" : void 0;
    const w = width == null || width === "" ? null : /^\d+(\.\d+)?$/.test(String(width)) ? String(width) + "px" : String(width);
    React27.useEffect(() => {
      const el = ref.current;
      if (!el) return;
      if (open && !el.open) el.showModal();
      if (!open && el.open) el.close();
    }, [open]);
    return /* @__PURE__ */ React27.createElement(
      "dialog",
      {
        ref,
        className: cx53("lw-dialog", className),
        style: w ? { "--lw-dialog-w": w } : void 0,
        onClose,
        onCancel: (e) => {
          e.preventDefault();
          onClose && onClose(e);
        },
        "aria-labelledby": titleId,
        "aria-describedby": descId,
        ...rest
      },
      title && /* @__PURE__ */ React27.createElement("div", { className: "lw-dialog-head" }, /* @__PURE__ */ React27.createElement("h2", { className: "lw-dialog-title", id: titleId }, title), /* @__PURE__ */ React27.createElement("button", { type: "button", className: "lw-icon-btn lw-dialog-close", "aria-label": closeLabel, title: closeLabel, onClick: onClose }, /* @__PURE__ */ React27.createElement(Icon, { name: "close", size: 17 }))),
      /* @__PURE__ */ React27.createElement("div", { className: "lw-dialog-body" }, description && /* @__PURE__ */ React27.createElement("div", { id: descId }, description), children),
      footer && /* @__PURE__ */ React27.createElement("div", { className: "lw-dialog-foot" }, footer)
    );
  }

  // components/overlays/Toast.jsx
  init_ds_inject_react();
  var cx54 = (...a) => a.filter(Boolean).join(" ");
  function Toast({
    tone = "info",
    label,
    onClose,
    toneLabels = { ok: "done", warn: "warn", err: "error", info: "info" },
    dismissLabel = "Dismiss",
    children,
    className,
    ...rest
  }) {
    const k = label || toneLabels[tone] || toneLabels.info;
    return (
      /* No role here. The enclosing ToastRegion is the live region; a role="status"
         or role="alert" INSIDE it nests two, which is why an announcement could
         come twice or not at all. An error toast raises the REGION's urgency
         instead — one live region, one politeness setting. */
      /* @__PURE__ */ React.createElement("div", { className: cx54("lw-toast", tone !== "info" && tone, className), ...rest }, /* @__PURE__ */ React.createElement("span", { className: "k" }, k), /* @__PURE__ */ React.createElement("span", { className: "msg" }, children), onClose && /* @__PURE__ */ React.createElement("button", { type: "button", className: "lw-icon-btn", "aria-label": dismissLabel, title: dismissLabel, onClick: onClose }, /* @__PURE__ */ React.createElement(Icon, { name: "close", size: 15 })))
    );
  }
  function ToastRegion({ className, children, urgent, label = "Notifications", ...rest }) {
    return /* @__PURE__ */ React.createElement(
      "div",
      {
        className: cx54("lw-toast-region", className),
        role: "region",
        "aria-live": urgent ? "assertive" : "polite",
        "aria-label": label,
        ...rest
      },
      children
    );
  }

  // components/overlays/Tooltip.jsx
  init_ds_inject_react();
  var cx55 = (...a) => a.filter(Boolean).join(" ");
  function Tooltip({ tip, className, children, ...rest }) {
    return /* @__PURE__ */ React.createElement("span", { className: cx55("lw-tip", className), "data-tip": tip, ...rest }, children);
  }

  // components/overlays/Menu.jsx
  init_ds_inject_react();
  var React28 = __toESM(require_ds_react(), 1);
  var cx56 = (...a) => a.filter(Boolean).join(" ");
  function Menu({ items = [], trigger, onSelect, label, placement = "bottom-start", matchWidth, linkAs = "a", className, ...rest }) {
    const [open, setOpen] = React28.useState(false);
    const listEl = React28.useRef(null);
    const typed = React28.useRef({ s: "", t: 0 });
    const intent = React28.useRef(0);
    const ROWS = '[role^="menuitem"]:not([aria-disabled="true"])';
    const rows = () => Array.from(listEl.current ? listEl.current.querySelectorAll(ROWS) : []);
    const focusAt = (i) => {
      const r = rows();
      if (!r.length) {
        if (typeof console !== "undefined") console.warn("Menu: no focusable rows — the list is not mounted.");
        return;
      }
      const el = r[(i + r.length) % r.length];
      el && el.focus({ preventScroll: true });
    };
    const listRef = React28.useCallback((el) => {
      listEl.current = el;
      if (!el) return;
      const want = intent.current;
      intent.current = 0;
      if (!want) return;
      queueMicrotask(() => {
        const r = Array.from(el.querySelectorAll(ROWS));
        const target = want === 1 ? r[0] : r[r.length - 1];
        if (target) target.focus({ preventScroll: true });
      });
    }, []);
    React28.useEffect(() => {
      if (!open) intent.current = 0;
    }, [open]);
    const onKeyDown = (e) => {
      const r = rows();
      const i = r.indexOf(document.activeElement);
      if (e.key === "ArrowDown") {
        e.preventDefault();
        return focusAt(i + 1);
      }
      if (e.key === "ArrowUp") {
        e.preventDefault();
        return focusAt(i < 0 ? -1 : i - 1);
      }
      if (e.key === "Home") {
        e.preventDefault();
        return focusAt(0);
      }
      if (e.key === "End") {
        e.preventDefault();
        return focusAt(r.length - 1);
      }
      if (e.key === "Tab") {
        setOpen(false);
        return;
      }
      if (e.key.length === 1 && !e.metaKey && !e.ctrlKey && !e.altKey) {
        const now = Date.now();
        typed.current.s = now - typed.current.t > 700 ? e.key : typed.current.s + e.key;
        typed.current.t = now;
        const q = typed.current.s.toLowerCase();
        const hit = r.findIndex((el, n) => n > i && (el.textContent || "").trim().toLowerCase().startsWith(q));
        const from0 = r.findIndex((el) => (el.textContent || "").trim().toLowerCase().startsWith(q));
        const target = hit >= 0 ? hit : from0;
        if (target >= 0) {
          e.preventDefault();
          focusAt(target);
        }
      }
    };
    const choose = (it) => {
      if (it.disabled) return;
      setOpen(false);
      it.onSelect ? it.onSelect(it) : onSelect && onSelect(it.value, it);
    };
    const triggerEl = React28.isValidElement(trigger) ? React28.cloneElement(trigger, {
      onKeyDown: (e) => {
        trigger.props.onKeyDown && trigger.props.onKeyDown(e);
        if (e.defaultPrevented) return;
        if (e.key === "ArrowDown" || e.key === "Enter" || e.key === " ") {
          intent.current = 1;
          if (e.key === "ArrowDown") {
            e.preventDefault();
            setOpen(true);
          }
        } else if (e.key === "ArrowUp") {
          intent.current = -1;
          e.preventDefault();
          setOpen(true);
        }
      }
    }) : trigger;
    return /* @__PURE__ */ React28.createElement(
      Popover,
      {
        trigger: triggerEl,
        open,
        onOpenChange: setOpen,
        role: "menu",
        label,
        placement,
        matchWidth,
        ...rest
      },
      /* @__PURE__ */ React28.createElement("div", { ref: listRef, role: "none", className: cx56("lw-menu", className), onKeyDown }, items.map((it, i) => {
        if (it.type === "separator") return /* @__PURE__ */ React28.createElement("hr", { key: i, className: "lw-menu-sep" });
        if (it.type === "label") return /* @__PURE__ */ React28.createElement("div", { key: i, className: "lw-menu-label" }, it.label);
        const checkable = it.checked != null;
        const Tag = it.href ? linkAs : "button";
        return /* @__PURE__ */ React28.createElement(
          Tag,
          {
            key: it.value ?? i,
            className: cx56("lw-menu-item", it.danger && "danger"),
            type: it.href ? void 0 : "button",
            href: it.href || void 0,
            role: checkable ? "menuitemcheckbox" : "menuitem",
            "aria-checked": checkable ? !!it.checked : void 0,
            "aria-disabled": it.disabled ? "true" : void 0,
            "data-checked": checkable && it.checked ? "true" : void 0,
            tabIndex: -1,
            onClick: (e) => {
              if (!it.href) e.preventDefault();
              choose(it);
            }
          },
          (checkable || it.icon) && /* @__PURE__ */ React28.createElement("span", { className: "lw-menu-lead" }, checkable ? it.checked ? /* @__PURE__ */ React28.createElement(Icon, { name: "checkmark", size: 14 }) : null : /* @__PURE__ */ React28.createElement(Icon, { name: it.icon, size: 15 })),
          /* @__PURE__ */ React28.createElement("span", { className: "lw-menu-text" }, it.label),
          it.kbd && /* @__PURE__ */ React28.createElement("span", { className: "lw-menu-kbd" }, it.kbd)
        );
      }))
    );
  }

  // components/overlays/Drawer.jsx
  init_ds_inject_react();
  var React29 = __toESM(require_ds_react(), 1);
  var cx57 = (...a) => a.filter(Boolean).join(" ");
  function Drawer({ open, onClose, title, description, footer, side = "end", width, closeLabel = "Close", className, children, ...rest }) {
    const ref = React29.useRef(null);
    const uid = React29.useId();
    const titleId = title ? uid + "-t" : void 0;
    const descId = description ? uid + "-d" : void 0;
    const w = width == null || width === "" ? null : /^\d+(\.\d+)?$/.test(String(width)) ? String(width) + "px" : String(width);
    React29.useEffect(() => {
      const el = ref.current;
      if (!el) return;
      if (open && !el.open) el.showModal();
      if (!open && el.open) el.close();
    }, [open]);
    return /* @__PURE__ */ React29.createElement(
      "dialog",
      {
        ref,
        className: cx57("lw-drawer", className),
        "data-side": side,
        style: w ? { "--lw-drawer-w": w } : void 0,
        onClose,
        onCancel: (e) => {
          e.preventDefault();
          onClose && onClose(e);
        },
        "aria-labelledby": titleId,
        "aria-describedby": descId,
        ...rest
      },
      title && /* @__PURE__ */ React29.createElement("div", { className: "lw-drawer-head" }, /* @__PURE__ */ React29.createElement("h2", { className: "lw-drawer-title", id: titleId }, title), /* @__PURE__ */ React29.createElement("button", { type: "button", className: "lw-icon-btn", "aria-label": closeLabel, title: closeLabel, onClick: onClose }, /* @__PURE__ */ React29.createElement(Icon, { name: "close", size: 17 }))),
      /* @__PURE__ */ React29.createElement("div", { className: "lw-drawer-body" }, description && /* @__PURE__ */ React29.createElement("div", { id: descId }, description), children),
      footer && /* @__PURE__ */ React29.createElement("div", { className: "lw-drawer-foot" }, footer)
    );
  }

  // components/ai/PromptInput.jsx
  init_ds_inject_react();
  var cx58 = (...a) => a.filter(Boolean).join(" ");
  function PromptInput({ value, onChange, onSubmit, placeholder = "Ask anything about your documents…", hint = "⏎ to send · ⇧⏎ newline", label = "Prompt", tools, action, disabled, className, children, ...rest }) {
    const onKeyDown = (e) => {
      if (disabled) return;
      if (e.key === "Enter" && !e.shiftKey) {
        e.preventDefault();
        onSubmit && onSubmit();
      }
    };
    return /* @__PURE__ */ React.createElement("div", { className: cx58("lw-prompt", className), ...rest }, /* @__PURE__ */ React.createElement(
      "textarea",
      {
        value,
        onChange: (e) => onChange && onChange(e.target.value),
        onKeyDown,
        placeholder,
        rows: 2,
        disabled,
        "aria-label": label
      }
    ), /* @__PURE__ */ React.createElement("div", { className: "lw-prompt-foot" }, children || /* @__PURE__ */ React.createElement(React.Fragment, null, tools, /* @__PURE__ */ React.createElement("span", { className: "spacer" }), /* @__PURE__ */ React.createElement("span", { className: "lw-prompt-hint" }, hint), action)));
  }

  // components/ai/Message.jsx
  init_ds_inject_react();
  var cx59 = (...a) => a.filter(Boolean).join(" ");
  function Message({ role = "ai", who, avatar, streaming = false, footer, className, children, ...rest }) {
    const name = who || (role === "ai" ? "LeanWise" : "You");
    const glyph = avatar || /* @__PURE__ */ React.createElement(Icon, { name: role === "ai" ? "spark" : "user", size: role === "ai" ? 19 : 16 });
    return /* @__PURE__ */ React.createElement("div", { className: cx59("lw-msg", role, className), "data-streaming": streaming ? "true" : void 0, ...rest }, /* @__PURE__ */ React.createElement("span", { className: "lw-msg-avatar", "aria-hidden": "true" }, glyph), /* @__PURE__ */ React.createElement("div", { className: "lw-msg-main" }, /* @__PURE__ */ React.createElement("span", { className: "who" }, name), /* @__PURE__ */ React.createElement("div", { className: "body" }, children, footer)));
  }

  // components/ai/SourceChip.jsx
  init_ds_inject_react();
  var cx60 = (...a) => a.filter(Boolean).join(" ");
  function SourceChip({
    n,
    title,
    as,
    formatLabel = (num, t) => t ? `Source ${num}: ${t}` : `Source ${num}`,
    className,
    ...rest
  }) {
    const Tag = as || (rest.href ? "a" : "button");
    return /* @__PURE__ */ React.createElement(
      Tag,
      {
        className: cx60("lw-source", className),
        type: Tag === "button" ? "button" : void 0,
        "aria-label": formatLabel(n, title),
        ...rest
      },
      n
    );
  }

  // components/ai/SourceList.jsx
  init_ds_inject_react();
  var cx61 = (...a) => a.filter(Boolean).join(" ");
  function SourceList({ sources = [], linkAs = "a", className, ...rest }) {
    return /* @__PURE__ */ React.createElement("div", { className: cx61("lw-source-list", className), ...rest }, sources.map((s, i) => {
      const Tag = s.href ? linkAs : "button";
      return /* @__PURE__ */ React.createElement(
        Tag,
        {
          key: s.id ?? i,
          className: "lw-source-item",
          href: s.href || void 0,
          type: s.href ? void 0 : "button",
          onClick: s.onClick
        },
        /* @__PURE__ */ React.createElement("span", { className: "n" }, s.n ?? i + 1),
        /* @__PURE__ */ React.createElement("span", { className: "lw-source-main" }, /* @__PURE__ */ React.createElement("span", { className: "t" }, s.title), s.meta && /* @__PURE__ */ React.createElement("span", { className: "m" }, s.meta))
      );
    }));
  }

  // components/ai/ConfidenceMeter.jsx
  init_ds_inject_react();
  var cx62 = (...a) => a.filter(Boolean).join(" ");
  function ConfidenceMeter({ value = 0, label = "match", className, style, ...rest }) {
    const pct = Math.max(0, Math.min(100, Math.round(value)));
    return /* @__PURE__ */ React.createElement(
      "span",
      {
        className: cx62("lw-confidence", pct < 60 && "low", className),
        style: { "--lw-confidence": pct + "%", ...style },
        role: "meter",
        "aria-valuenow": pct,
        "aria-valuemin": 0,
        "aria-valuemax": 100,
        "aria-label": label,
        ...rest
      },
      /* @__PURE__ */ React.createElement("span", { className: "rail", "aria-hidden": "true" }, /* @__PURE__ */ React.createElement("i", null)),
      /* @__PURE__ */ React.createElement("span", null, pct, "%")
    );
  }

  // components/ai/AgentTrace.jsx
  init_ds_inject_react();
  var cx63 = (...a) => a.filter(Boolean).join(" ");
  function AgentTrace({ steps = [], className, ...rest }) {
    return /* @__PURE__ */ React.createElement("ol", { className: cx63("lw-trace", className), ...rest }, steps.map((s, i) => /* @__PURE__ */ React.createElement("li", { key: i, "data-state": s.state || "pending" }, /* @__PURE__ */ React.createElement("span", { className: "step" }, s.label), s.meta && /* @__PURE__ */ React.createElement("span", { className: "meta" }, s.meta))));
  }

  // components/ai/ToolCall.jsx
  init_ds_inject_react();
  var React30 = __toESM(require_ds_react(), 1);
  var cx64 = (...a) => a.filter(Boolean).join(" ");
  var fmt = (v) => typeof v === "string" ? v : JSON.stringify(v, null, 2);
  function ToolCall({
    name,
    summary,
    args,
    result,
    error,
    state = "ok",
    duration,
    defaultOpen,
    stateLabels = { running: "running", error: "failed", pending: "pending", ok: "succeeded" },
    argsLabel = "arguments",
    errorLabel = "error",
    resultLabel = "result",
    formatDuration = (ms2) => ms2 + "ms",
    className,
    ...rest
  }) {
    const [open, setOpen] = React30.useState(!!defaultOpen);
    const uid = React30.useId();
    const st = error ? "error" : state;
    return /* @__PURE__ */ React30.createElement("div", { className: cx64("lw-tool", className), "data-state": st, ...rest }, /* @__PURE__ */ React30.createElement("button", { type: "button", className: "lw-tool-head", "aria-expanded": open, "aria-controls": uid, onClick: () => setOpen((o) => !o) }, /* @__PURE__ */ React30.createElement(Icon, { name: open ? "chevron-down" : "chevron-right", size: 14 }), /* @__PURE__ */ React30.createElement("span", { className: "lw-tool-dot", "aria-hidden": "true" }), /* @__PURE__ */ React30.createElement("span", { className: "lw-tool-name" }, name), /* @__PURE__ */ React30.createElement("span", { className: "lw-tool-sum" }, summary), duration != null && /* @__PURE__ */ React30.createElement("span", { className: "lw-tool-dur" }, formatDuration(duration)), /* @__PURE__ */ React30.createElement("span", { className: "lw-sr-only" }, stateLabels[st] ?? stateLabels.ok)), open && /* @__PURE__ */ React30.createElement("div", { className: "lw-tool-body", id: uid }, args != null && /* @__PURE__ */ React30.createElement(React30.Fragment, null, /* @__PURE__ */ React30.createElement("span", { className: "k" }, argsLabel), /* @__PURE__ */ React30.createElement("pre", null, fmt(args))), error ? /* @__PURE__ */ React30.createElement(React30.Fragment, null, /* @__PURE__ */ React30.createElement("span", { className: "k" }, errorLabel), /* @__PURE__ */ React30.createElement("pre", { className: "err" }, fmt(error))) : result != null && /* @__PURE__ */ React30.createElement(React30.Fragment, null, /* @__PURE__ */ React30.createElement("span", { className: "k" }, resultLabel), /* @__PURE__ */ React30.createElement("pre", null, fmt(result)))));
  }

  // components/ai/DiffReview.jsx
  init_ds_inject_react();
  var cx65 = (...a) => a.filter(Boolean).join(" ");
  var SIGN = { add: "+", del: "−", mod: "~" };
  function DiffReview({
    hunks = [],
    decisions = {},
    onDecide,
    onAcceptAll,
    onRejectAll,
    label = "Proposed changes",
    acceptLabel = "Accept",
    rejectLabel = "Reject",
    undoLabel = "Undo",
    acceptAllLabel = "Accept all",
    rejectAllLabel = "Reject all",
    acceptedLabel = "Accepted",
    rejectedLabel = "Rejected",
    kindLabels = { add: "added: ", del: "removed: ", mod: "changed: " },
    formatProgress = (p, t) => p ? p + " of " + t + " still to review" : "All " + t + " reviewed",
    className,
    ...rest
  }) {
    const pending = hunks.filter((h) => !decisions[h.id]).length;
    return /* @__PURE__ */ React.createElement("div", { className: cx65("lw-diff", className), role: "group", "aria-label": label, ...rest }, hunks.map((h) => {
      const d = decisions[h.id];
      return /* @__PURE__ */ React.createElement("div", { key: h.id, className: "lw-diff-hunk", "data-decision": d }, /* @__PURE__ */ React.createElement("div", { className: "lw-diff-head" }, /* @__PURE__ */ React.createElement(Icon, { name: "file", size: 14, className: "lw-diff-ic" }), /* @__PURE__ */ React.createElement("span", { className: "lw-diff-file" }, h.file, h.range ? " · " + h.range : "")), /* @__PURE__ */ React.createElement("div", { className: "lw-diff-lines" }, h.lines.map((l, i) => /* @__PURE__ */ React.createElement("div", { key: i, className: "lw-diff-line", "data-kind": l.kind }, /* @__PURE__ */ React.createElement("span", { className: "n" }, l.n ?? ""), /* @__PURE__ */ React.createElement("span", { className: "s", "aria-hidden": "true" }, SIGN[l.kind] || ""), /* @__PURE__ */ React.createElement("span", { className: "t" }, l.kind && /* @__PURE__ */ React.createElement("span", { className: "lw-sr-only" }, kindLabels[l.kind] ?? kindLabels.mod), l.text)))), /* @__PURE__ */ React.createElement("div", { className: "lw-diff-foot" }, /* @__PURE__ */ React.createElement("span", { className: "lw-diff-state" }, d === "accepted" ? acceptedLabel : d === "rejected" ? rejectedLabel : h.note || ""), d ? /* @__PURE__ */ React.createElement(Button, { size: "sm", variant: "ghost", onClick: () => onDecide && onDecide(h.id, null) }, /* @__PURE__ */ React.createElement(Icon, { name: "undo", size: 14 }), undoLabel) : /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement(Button, { size: "sm", variant: "ghost", onClick: () => onDecide && onDecide(h.id, "rejected") }, rejectLabel), /* @__PURE__ */ React.createElement(Button, { size: "sm", onClick: () => onDecide && onDecide(h.id, "accepted") }, acceptLabel))));
    }), hunks.length > 1 && /* @__PURE__ */ React.createElement("div", { className: "lw-diff-foot" }, /* @__PURE__ */ React.createElement("span", { className: "lw-diff-state", "aria-live": "polite" }, formatProgress(pending, hunks.length)), /* @__PURE__ */ React.createElement(Button, { size: "sm", variant: "ghost", onClick: onRejectAll, disabled: !pending }, rejectAllLabel), /* @__PURE__ */ React.createElement(Button, { size: "sm", onClick: onAcceptAll, disabled: !pending }, acceptAllLabel)));
  }

  // components/ai/Artifact.jsx
  init_ds_inject_react();
  var cx66 = (...a) => a.filter(Boolean).join(" ");
  function Artifact({
    title,
    version,
    versionCount,
    onPrevVersion,
    onNextVersion,
    onRevert,
    onEdit,
    actions,
    prevVersionLabel = "Previous version",
    nextVersionLabel = "Next version",
    editLabel = "Edit manually",
    revertLabel = "Revert",
    className,
    children,
    ...rest
  }) {
    const canPrev = version > 1;
    const canNext = versionCount != null && version < versionCount;
    return /* @__PURE__ */ React.createElement("div", { className: cx66("lw-artifact", className), ...rest }, /* @__PURE__ */ React.createElement("div", { className: "lw-artifact-head" }, /* @__PURE__ */ React.createElement(Icon, { name: "file", size: 15, className: "lw-artifact-ic" }), /* @__PURE__ */ React.createElement("span", { className: "lw-artifact-title" }, title), version != null && /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement("button", { type: "button", className: "lw-icon-btn", "aria-label": prevVersionLabel, disabled: !canPrev, onClick: onPrevVersion }, /* @__PURE__ */ React.createElement(Icon, { name: "chevron-left", size: 15 })), /* @__PURE__ */ React.createElement("span", { className: "lw-artifact-ver" }, "v", version, versionCount ? " / " + versionCount : ""), /* @__PURE__ */ React.createElement("button", { type: "button", className: "lw-icon-btn", "aria-label": nextVersionLabel, disabled: !canNext, onClick: onNextVersion }, /* @__PURE__ */ React.createElement(Icon, { name: "chevron-right", size: 15 })))), /* @__PURE__ */ React.createElement("div", { className: "lw-artifact-body" }, children), (onRevert || onEdit || actions) && /* @__PURE__ */ React.createElement("div", { className: "lw-artifact-foot" }, onEdit && /* @__PURE__ */ React.createElement("button", { type: "button", className: "lw-btn lw-btn-ghost lw-btn-sm", onClick: onEdit }, /* @__PURE__ */ React.createElement(Icon, { name: "edit", size: 14 }), editLabel), onRevert && /* @__PURE__ */ React.createElement("button", { type: "button", className: "lw-btn lw-btn-ghost lw-btn-sm", onClick: onRevert }, /* @__PURE__ */ React.createElement(Icon, { name: "undo", size: 14 }), revertLabel), /* @__PURE__ */ React.createElement("span", { className: "lw-spacer" }), actions));
  }

  // components/ai/Feedback.jsx
  init_ds_inject_react();
  var React31 = __toESM(require_ds_react(), 1);
  var cx67 = (...a) => a.filter(Boolean).join(" ");
  function Feedback({
    value,
    onChange,
    onComment,
    commentPlaceholder = "What was wrong?",
    note,
    upLabel = "Helpful",
    downLabel = "Not helpful",
    cancelLabel = "Cancel",
    sendLabel = "Send",
    className,
    ...rest
  }) {
    const [open, setOpen] = React31.useState(false);
    const [text, setText] = React31.useState("");
    const set = (v) => {
      const next = value === v ? null : v;
      onChange && onChange(next);
      if (next === "down" && onComment) setOpen(true);
    };
    return /* @__PURE__ */ React31.createElement("div", { className: cx67(className), ...rest }, /* @__PURE__ */ React31.createElement("div", { className: "lw-feedback" }, /* @__PURE__ */ React31.createElement("button", { type: "button", className: "lw-icon-btn", "aria-label": upLabel, "aria-pressed": value === "up", onClick: () => set("up") }, /* @__PURE__ */ React31.createElement(Icon, { name: "thumbs-up", size: 15 })), /* @__PURE__ */ React31.createElement("button", { type: "button", className: "lw-icon-btn", "aria-label": downLabel, "aria-pressed": value === "down", onClick: () => set("down") }, /* @__PURE__ */ React31.createElement(Icon, { name: "thumbs-down", size: 15 })), note && /* @__PURE__ */ React31.createElement("span", { className: "lw-feedback-note" }, note)), open && onComment && /* @__PURE__ */ React31.createElement(
      "form",
      {
        className: "lw-feedback-form",
        onSubmit: (e) => {
          e.preventDefault();
          onComment(text);
          setOpen(false);
          setText("");
        }
      },
      /* @__PURE__ */ React31.createElement(
        "textarea",
        {
          className: "lw-textarea",
          rows: 2,
          value: text,
          autoFocus: true,
          "aria-label": commentPlaceholder,
          placeholder: commentPlaceholder,
          onChange: (e) => setText(e.target.value)
        }
      ),
      /* @__PURE__ */ React31.createElement("div", { className: "lw-feedback-actions" }, /* @__PURE__ */ React31.createElement("button", { type: "button", className: "lw-btn lw-btn-ghost lw-btn-sm", onClick: () => setOpen(false) }, cancelLabel), /* @__PURE__ */ React31.createElement("button", { type: "submit", className: "lw-btn lw-btn-sm", disabled: !text.trim() }, sendLabel))
    ));
  }

  // components/marketing/Hero.jsx
  init_ds_inject_react();
  var cx68 = (...a) => a.filter(Boolean).join(" ");
  function Hero({ eyebrow, title, lead, actions, aside, className, children, ...rest }) {
    return /* @__PURE__ */ React.createElement("section", { className: cx68("lw-hero-dark", className), ...rest }, /* @__PURE__ */ React.createElement("div", { className: "lw-container" }, eyebrow && /* @__PURE__ */ React.createElement("p", { className: "lw-eyebrow" }, eyebrow), title && /* @__PURE__ */ React.createElement("h1", { className: "lw-h1" }, title), lead && /* @__PURE__ */ React.createElement("p", { className: "lw-lead" }, lead), actions && /* @__PURE__ */ React.createElement("div", { className: "lw-cluster lw-cluster-12 lw-hero-actions" }, actions), aside, children));
  }

  // components/marketing/FeatureGrid.jsx
  init_ds_inject_react();
  var cx69 = (...a) => a.filter(Boolean).join(" ");
  function FeatureGrid({ features = [], linkAs = "a", className, ...rest }) {
    return /* @__PURE__ */ React.createElement("div", { className: cx69("lw-features", className), ...rest }, features.map((f, i) => {
      const Tag = f.href ? linkAs : "div";
      return /* @__PURE__ */ React.createElement(Tag, { key: i, className: cx69("lw-feature", f.href && "lw-feature-interactive"), href: f.href }, /* @__PURE__ */ React.createElement("span", { className: "num" }, String(i + 1).padStart(2, "0")), /* @__PURE__ */ React.createElement("h3", null, f.title), /* @__PURE__ */ React.createElement("p", null, f.body), f.href && /* @__PURE__ */ React.createElement("span", { className: "lw-feature-more" }, f.more || "Learn more", /* @__PURE__ */ React.createElement(Icon, { name: "arrow-right", size: 14, className: "arrow" })));
    }));
  }

  // components/marketing/StoryCard.jsx
  init_ds_inject_react();
  var cx70 = (...a) => a.filter(Boolean).join(" ");
  function StoryCard({ logo, title, body, result, quote, person, role, href, linkAs = "a", className, ...rest }) {
    const Tag = href ? linkAs : "div";
    const showQuote = Boolean(quote && person && role);
    const initials = String(title || "").trim().split(/\s+/).slice(0, 2).map((w) => w[0] || "").join("").toUpperCase();
    return /* @__PURE__ */ React.createElement(Tag, { className: cx70("lw-story", href && "lw-story-interactive", className), href, ...rest }, logo ? /* @__PURE__ */ React.createElement("span", { className: "logo" }, logo) : /* @__PURE__ */ React.createElement("span", { className: "logo lw-monogram" }, initials), /* @__PURE__ */ React.createElement("div", null, title && /* @__PURE__ */ React.createElement("h3", null, title), body && /* @__PURE__ */ React.createElement("p", null, body), showQuote && /* @__PURE__ */ React.createElement("blockquote", { className: "lw-story-quote" }, quote, /* @__PURE__ */ React.createElement("cite", null, person, " · ", role)), result && /* @__PURE__ */ React.createElement("div", { className: "meta" }, /* @__PURE__ */ React.createElement("span", { className: "lw-story-result" }, /* @__PURE__ */ React.createElement("b", null, result)))));
  }

  // components/marketing/LogoRail.jsx
  init_ds_inject_react();
  var cx71 = (...a) => a.filter(Boolean).join(" ");
  function LogoRail({ logos = [], marquee = false, className, ...rest }) {
    const cells = logos.map(
      (l, i) => l.src ? /* @__PURE__ */ React.createElement("span", { key: i, className: "lw-logo-item", style: { "--lw-logo-src": `url("${l.src}")` }, role: "img", "aria-label": l.name }) : /* @__PURE__ */ React.createElement("span", { key: i, className: "lw-logo-item is-text" }, l.name)
    );
    return /* @__PURE__ */ React.createElement("div", { className: cx71("lw-logo-rail", marquee && "marquee", className), ...rest }, marquee ? /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement("div", { className: "lw-logo-track" }, cells), /* @__PURE__ */ React.createElement("div", { className: "lw-logo-track", "aria-hidden": "true" }, cells)) : cells);
  }

  // components/marketing/SiteFooter.jsx
  init_ds_inject_react();
  var cx72 = (...a) => a.filter(Boolean).join(" ");
  function SiteFooter({ brand, desc, columns = [], legal, bottom, dark = false, linkAs = "a", className, children, ...rest }) {
    const Link = linkAs;
    return /* @__PURE__ */ React.createElement("footer", { className: cx72("lw-footer", className), "data-band": dark ? "dark" : void 0, ...rest }, /* @__PURE__ */ React.createElement("div", { className: "lw-container" }, /* @__PURE__ */ React.createElement("div", { className: "lw-footer-grid" }, /* @__PURE__ */ React.createElement("div", { className: "lw-footer-brand" }, brand, desc && /* @__PURE__ */ React.createElement("p", { className: "lw-footer-desc" }, desc)), columns.map((col, i) => (
      /* Keyed by index, not heading: two columns may legitimately share a
         heading (or have none), and React treats duplicate keys as
         unsupported. Same reasoning as TopBar and Sidebar. */
      /* @__PURE__ */ React.createElement("nav", { key: i, "aria-label": typeof col.heading === "string" ? col.heading : void 0 }, col.heading && /* @__PURE__ */ React.createElement("h2", { className: "lw-footer-head" }, col.heading), (col.links || []).map(
        (l, j) => l.href ? /* @__PURE__ */ React.createElement(
          Link,
          {
            key: j,
            className: "lw-footer-link",
            href: l.href,
            "aria-current": l.current ? "page" : void 0,
            target: l.external ? "_blank" : void 0,
            rel: l.external ? "noreferrer noopener" : void 0
          },
          l.label,
          l.external && /* @__PURE__ */ React.createElement(Icon, { name: "external", size: 12 })
        ) : /* @__PURE__ */ React.createElement("span", { key: j, className: "lw-footer-note" }, l.label)
      ))
    ))), (legal || bottom || children) && /* @__PURE__ */ React.createElement("div", { className: "lw-footer-bottom" }, legal && /* @__PURE__ */ React.createElement("p", { className: "lw-measure" }, legal), bottom, children)));
  }

  // components/marketing/Steps.jsx
  init_ds_inject_react();
  var cx73 = (...a) => a.filter(Boolean).join(" ");
  function Steps({ items = [], orientation = "vertical", linkAs = "a", className, ...rest }) {
    const Link = linkAs;
    return /* @__PURE__ */ React.createElement("ol", { className: cx73("lw-steps", orientation === "horizontal" && "lw-steps-horizontal", className), ...rest }, items.map((it, i) => /* @__PURE__ */ React.createElement("li", { className: "lw-step", key: i }, /* @__PURE__ */ React.createElement("span", { className: "lw-step-marker" }, it.label ?? String(i + 1).padStart(2, "0")), /* @__PURE__ */ React.createElement("div", null, it.meta && /* @__PURE__ */ React.createElement("span", { className: "lw-step-meta" }, it.meta), /* @__PURE__ */ React.createElement("h3", { className: "lw-step-title" }, it.title), it.body && /* @__PURE__ */ React.createElement("p", { className: "lw-step-body" }, it.body), it.href && /* @__PURE__ */ React.createElement("p", { className: "lw-step-body" }, /* @__PURE__ */ React.createElement(Link, { href: it.href }, it.more || "Learn more"))))));
  }

  // components/marketing/Quote.jsx
  init_ds_inject_react();
  var cx74 = (...a) => a.filter(Boolean).join(" ");
  function Quote({ children, name, role, className, ...rest }) {
    return /* @__PURE__ */ React.createElement("blockquote", { className: cx74("lw-quote", className), ...rest }, children, name && /* @__PURE__ */ React.createElement("cite", { className: "lw-quote-attrib" }, /* @__PURE__ */ React.createElement("span", { className: "name" }, name), role ? " · " + role : ""));
  }

  // components/marketing/Byline.jsx
  init_ds_inject_react();
  var cx75 = (...a) => a.filter(Boolean).join(" ");
  function Byline({ name, role, date, dateTime, src, size = "md", className, children, ...rest }) {
    return /* @__PURE__ */ React.createElement("div", { className: cx75("lw-byline", className), ...rest }, name && /* @__PURE__ */ React.createElement(Avatar, { name, src, size }), name && /* @__PURE__ */ React.createElement("span", { className: "name" }, name), role && /* @__PURE__ */ React.createElement("span", { className: "role" }, role), date && /* @__PURE__ */ React.createElement("time", { className: "date", dateTime }, date), children);
  }

  // components/marketing/ArticleCard.jsx
  init_ds_inject_react();
  var cx76 = (...a) => a.filter(Boolean).join(" ");
  function ArticleCard({
    title,
    dek,
    href,
    category,
    tags = [],
    author,
    role,
    date,
    dateTime,
    avatar,
    readTime,
    readMinutes,
    cover,
    linkAs = "a",
    className,
    ...rest
  }) {
    if (readMinutes != null) deprecate(
      "ArticleCard",
      "readMinutes",
      "`readMinutes` is deprecated — pass `readTime` as a pre-formatted node (e.g. `${n} min read`, or its translation), because a component library cannot hold display text. `readMinutes` is removed in v2.0.0."
    );
    const read = readTime != null ? readTime : readMinutes != null ? readMinutes + " min read" : null;
    return /* @__PURE__ */ React.createElement(
      Card,
      {
        as: href ? linkAs : "div",
        interactive: Boolean(href),
        href,
        className: cx76(className),
        ...rest
      },
      cover && /* @__PURE__ */ React.createElement("span", { className: "lw-card-media" }, cover),
      category && /* @__PURE__ */ React.createElement(CardHead, null, /* @__PURE__ */ React.createElement("span", { className: "lw-eyebrow" }, category)),
      /* @__PURE__ */ React.createElement(CardTitle, null, title),
      dek && /* @__PURE__ */ React.createElement(CardBody, null, dek),
      tags.length > 0 && /* @__PURE__ */ React.createElement("div", { className: "lw-cluster" }, tags.map((t, i) => /* @__PURE__ */ React.createElement("span", { className: "lw-pill", key: i }, t))),
      (author || date || read != null) && /* @__PURE__ */ React.createElement(CardFoot, null, /* @__PURE__ */ React.createElement(Byline, { name: author, role, date, dateTime, src: avatar, size: "sm" }, read != null && /* @__PURE__ */ React.createElement("span", { className: "date" }, read)))
    );
  }

  // components/marketing/AnnounceBar.jsx
  init_ds_inject_react();
  var React32 = __toESM(require_ds_react(), 1);
  var cx77 = (...a) => a.filter(Boolean).join(" ");
  function AnnounceBar({ children, onDismiss, dismissLabel = "Dismiss announcement", className, ...rest }) {
    const [gone, setGone] = React32.useState(false);
    if (gone) return null;
    return /* @__PURE__ */ React32.createElement("div", { className: cx77("lw-announce", className), role: "status", ...rest }, children, onDismiss && /* @__PURE__ */ React32.createElement(
      "button",
      {
        type: "button",
        className: "lw-icon-btn",
        "aria-label": dismissLabel,
        onClick: () => {
          setGone(true);
          onDismiss();
        }
      },
      /* @__PURE__ */ React32.createElement(Icon, { name: "close", size: 14 })
    ));
  }

  // components/marketing/PlanCard.jsx
  init_ds_inject_react();
  var cx78 = (...a) => a.filter(Boolean).join(" ");
  function PlanCard({
    name,
    tagline,
    price,
    unit,
    period,
    desc,
    features = [],
    cta,
    featured,
    ribbon,
    includedLabel = "Included",
    excludedLabel = "Not included",
    linkAs = "a",
    className,
    ...rest
  }) {
    const Link = linkAs;
    const ctaObject = cta && typeof cta === "object" && !cta.$$typeof && cta.label;
    return /* @__PURE__ */ React.createElement("div", { className: cx78("lw-card", "lw-plan", featured && "lw-plan-featured", className), ...rest }, ribbon && /* @__PURE__ */ React.createElement("span", { className: "lw-pill lw-plan-ribbon" }, ribbon), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("h3", { className: "lw-plan-name" }, name), tagline && /* @__PURE__ */ React.createElement("span", { className: "lw-plan-tagline" }, tagline)), price != null && /* @__PURE__ */ React.createElement("p", { className: "lw-plan-price" }, /* @__PURE__ */ React.createElement("span", { className: "price" }, price), unit && /* @__PURE__ */ React.createElement("span", { className: "unit" }, unit), period && /* @__PURE__ */ React.createElement("span", { className: "period" }, period)), desc && /* @__PURE__ */ React.createElement("p", { className: "lw-plan-desc" }, desc), features.length > 0 && /* @__PURE__ */ React.createElement("ul", { className: "lw-plan-features" }, features.map((f, i) => {
      const included = f.included !== false;
      return (
        // The glyph is aria-hidden, so WITHOUT this word an included and
        // an excluded row are read out identically. It leads the row so
        // it is announced as "Included: SSO", and it is a prop because
        // the primary consumer is bilingual. Absolutely positioned, so it
        // is not a flex item and takes no gap.
        /* @__PURE__ */ React.createElement("li", { className: "lw-plan-feature", key: i, "data-included": included ? "true" : "false" }, /* @__PURE__ */ React.createElement("span", { className: "lw-sr-only" }, included ? includedLabel : excludedLabel, ": "), /* @__PURE__ */ React.createElement(Icon, { name: included ? "check" : "minus", size: 16 }), /* @__PURE__ */ React.createElement("span", null, f.label))
      );
    })), cta && /* @__PURE__ */ React.createElement("div", { className: "lw-plan-foot" }, ctaObject ? /* @__PURE__ */ React.createElement(Link, { className: cx78("lw-btn", featured ? "lw-btn-brand" : "lw-btn-ghost"), href: cta.href }, cta.label) : cta));
  }

  // components/marketing/CompareTable.jsx
  init_ds_inject_react();
  var cx79 = (...a) => a.filter(Boolean).join(" ");
  function CompareTable({
    columns = [],
    groups = [],
    caption,
    yesLabel = "Included",
    noLabel = "Not included",
    className,
    ...rest
  }) {
    const cell = (v) => {
      if (v === true) {
        return /* @__PURE__ */ React.createElement("span", { className: "lw-compare-yes" }, /* @__PURE__ */ React.createElement(Icon, { name: "check", size: 16 }), /* @__PURE__ */ React.createElement("span", { className: "lw-sr-only" }, yesLabel));
      }
      if (v === false || v == null) {
        return /* @__PURE__ */ React.createElement("span", { className: "lw-compare-no" }, /* @__PURE__ */ React.createElement(Icon, { name: "minus", size: 16 }), /* @__PURE__ */ React.createElement("span", { className: "lw-sr-only" }, noLabel));
      }
      return v;
    };
    return /* @__PURE__ */ React.createElement(
      "div",
      {
        className: "lw-compare-scroll",
        tabIndex: 0,
        role: "region",
        "aria-label": typeof caption === "string" ? caption : void 0
      },
      /* @__PURE__ */ React.createElement("table", { className: cx79("lw-compare", className), ...rest }, caption && /* @__PURE__ */ React.createElement("caption", null, caption), /* @__PURE__ */ React.createElement("thead", null, /* @__PURE__ */ React.createElement("tr", null, /* @__PURE__ */ React.createElement("td", { className: "lw-compare-corner" }), columns.map((c) => /* @__PURE__ */ React.createElement("th", { key: c.key, scope: "col", "data-featured": c.featured || void 0 }, c.label)))), groups.map((g, gi) => /* @__PURE__ */ React.createElement("tbody", { key: gi }, g.label && /* @__PURE__ */ React.createElement("tr", { className: "lw-compare-group" }, /* @__PURE__ */ React.createElement("th", { scope: "colgroup", colSpan: columns.length + 1 }, g.label)), g.rows.map((r, ri) => /* @__PURE__ */ React.createElement("tr", { key: ri }, /* @__PURE__ */ React.createElement("th", { scope: "row" }, r.label), columns.map((c, ci) => /* @__PURE__ */ React.createElement("td", { key: c.key, "data-featured": c.featured || void 0 }, cell(r.values[ci]))))))))
    );
  }

  // components/marketing/Flow.jsx
  init_ds_inject_react();
  var cx80 = (...a) => a.filter(Boolean).join(" ");
  function Flow({ nodes = [], edges, orientation = "horizontal", as, className, ...rest }) {
    const Tag = as || "ol";
    const Item = Tag === "ol" || Tag === "ul" ? "li" : "div";
    const linked = edges ? new Set(edges.map(([a, b]) => `${a}\0${b}`)) : null;
    const hasEdge = (a, b) => linked ? linked.has(`${a}\0${b}`) : true;
    const children = [];
    nodes.forEach((n, i) => {
      if (i > 0 && hasEdge(nodes[i - 1].id, n.id)) {
        children.push(/* @__PURE__ */ React.createElement(Item, { key: `edge-${i}`, className: "lw-flow-edge", "aria-hidden": "true" }));
      }
      children.push(
        /* @__PURE__ */ React.createElement(
          Item,
          {
            key: n.id ?? i,
            className: "lw-card lw-flow-node",
            "aria-current": n.current ? "step" : void 0
          },
          /* @__PURE__ */ React.createElement("span", { className: "lw-flow-head" }, n.icon && /* @__PURE__ */ React.createElement(Icon, { name: n.icon, size: 16 }), /* @__PURE__ */ React.createElement("span", { className: "lw-flow-label" }, String(i + 1).padStart(2, "0"))),
          /* @__PURE__ */ React.createElement("h3", { className: "lw-flow-title" }, n.label),
          n.sub && /* @__PURE__ */ React.createElement("p", { className: "lw-flow-sub" }, n.sub),
          n.detail
        )
      );
    });
    return /* @__PURE__ */ React.createElement(Tag, { className: cx80("lw-flow", orientation === "vertical" && "lw-flow-vertical", className), ...rest }, children);
  }

  // ds-entry.js
  var __ds_ns = globalThis.LeanWiseDesign_f2d907 = globalThis.LeanWiseDesign_f2d907 || {};
  __ds_ns.__errors = __ds_ns.__errors || [];
  Object.assign(__ds_ns, {
    AgentTrace,
    Artifact,
    ConfidenceMeter,
    DiffReview,
    Feedback,
    Message,
    PromptInput,
    SourceChip,
    SourceList,
    ToolCall,
    ActivityFeed,
    BUCKET_LABELS,
    RELATIVE_LABELS,
    timeAgo,
    BarChart,
    CHART_PAD,
    CHART_W,
    DataTable,
    Legend,
    SERIES,
    CodeBlock,
    Console,
    DataGrid,
    EmptyState,
    FilterBar,
    Toolbar,
    KpiTile,
    LineChart,
    Pagination,
    Progress,
    StateView,
    StatMeter,
    Table,
    Calendar,
    Checkbox,
    Combobox,
    DatePicker,
    RANGE_PRESETS,
    Field,
    FileUpload,
    formatBytes,
    Input,
    InputGroup,
    RichText,
    TOOLS,
    Segmented,
    Select,
    Stepper,
    Switch,
    Textarea,
    Cluster,
    Container,
    Grid,
    Page,
    Section,
    Split,
    Stack,
    AnnounceBar,
    ArticleCard,
    Byline,
    CompareTable,
    FeatureGrid,
    Flow,
    Hero,
    LogoRail,
    PlanCard,
    Quote,
    SiteFooter,
    Steps,
    StoryCard,
    AppBar,
    BottomNav,
    Breadcrumbs,
    CommandPalette,
    score,
    NavToggle,
    NavItem,
    Sidebar,
    Tabs,
    THEME_LABELS,
    ThemeToggle,
    TopBar,
    Dialog,
    Drawer,
    Menu,
    Popover,
    Toast,
    ToastRegion,
    Tooltip,
    Avatar,
    Button,
    Card,
    CardBody,
    CardFoot,
    CardHead,
    CardTitle,
    Chip,
    Disclosure,
    Eyebrow,
    Icon,
    iconNames,
    IconNames,
    Prose,
    Skeleton,
    THEME_EVENT,
    THEME_KEY
  });
})();
