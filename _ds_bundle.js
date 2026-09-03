/* @ds-bundle: {"format":4,"namespace":"LeanWiseDesign_f2d907","generator":"tools/lw-bundle.mjs","esbuild":"0.27.7","components":[{"name":"TONES","sourcePath":"components/_tone.js"},{"name":"AgentTrace","sourcePath":"components/ai/AgentTrace.jsx"},{"name":"Artifact","sourcePath":"components/ai/Artifact.jsx"},{"name":"ConfidenceMeter","sourcePath":"components/ai/ConfidenceMeter.jsx"},{"name":"DiffReview","sourcePath":"components/ai/DiffReview.jsx"},{"name":"Feedback","sourcePath":"components/ai/Feedback.jsx"},{"name":"Message","sourcePath":"components/ai/Message.jsx"},{"name":"PromptInput","sourcePath":"components/ai/PromptInput.jsx"},{"name":"SourceChip","sourcePath":"components/ai/SourceChip.jsx"},{"name":"SourceList","sourcePath":"components/ai/SourceList.jsx"},{"name":"ToolCall","sourcePath":"components/ai/ToolCall.jsx"},{"name":"ActivityFeed","sourcePath":"components/data/ActivityFeed.jsx"},{"name":"BUCKET_LABELS","sourcePath":"components/data/ActivityFeed.jsx"},{"name":"RELATIVE_LABELS","sourcePath":"components/data/ActivityFeed.jsx"},{"name":"timeAgo","sourcePath":"components/data/ActivityFeed.jsx"},{"name":"BarChart","sourcePath":"components/data/BarChart.jsx"},{"name":"CHART_PAD","sourcePath":"components/data/chart-parts.jsx"},{"name":"CHART_W","sourcePath":"components/data/chart-parts.jsx"},{"name":"DataTable","sourcePath":"components/data/chart-parts.jsx"},{"name":"Legend","sourcePath":"components/data/chart-parts.jsx"},{"name":"SERIES","sourcePath":"components/data/chart-parts.jsx"},{"name":"CodeBlock","sourcePath":"components/data/CodeBlock.jsx"},{"name":"Console","sourcePath":"components/data/Console.jsx"},{"name":"DataGrid","sourcePath":"components/data/DataGrid.jsx"},{"name":"EmptyState","sourcePath":"components/data/EmptyState.jsx"},{"name":"FilterBar","sourcePath":"components/data/FilterBar.jsx"},{"name":"Toolbar","sourcePath":"components/data/FilterBar.jsx"},{"name":"KpiTile","sourcePath":"components/data/KpiTile.jsx"},{"name":"LineChart","sourcePath":"components/data/LineChart.jsx"},{"name":"Pagination","sourcePath":"components/data/Pagination.jsx"},{"name":"Progress","sourcePath":"components/data/Progress.jsx"},{"name":"StateView","sourcePath":"components/data/StateView.jsx"},{"name":"StatMeter","sourcePath":"components/data/StatMeter.jsx"},{"name":"Table","sourcePath":"components/data/Table.jsx"},{"name":"Calendar","sourcePath":"components/forms/Calendar.jsx"},{"name":"Checkbox","sourcePath":"components/forms/Checkbox.jsx"},{"name":"Combobox","sourcePath":"components/forms/Combobox.jsx"},{"name":"DatePicker","sourcePath":"components/forms/DatePicker.jsx"},{"name":"RANGE_PRESETS","sourcePath":"components/forms/DatePicker.jsx"},{"name":"Field","sourcePath":"components/forms/Field.jsx"},{"name":"FileUpload","sourcePath":"components/forms/FileUpload.jsx"},{"name":"formatBytes","sourcePath":"components/forms/FileUpload.jsx"},{"name":"Input","sourcePath":"components/forms/Input.jsx"},{"name":"InputGroup","sourcePath":"components/forms/InputGroup.jsx"},{"name":"OtpInput","sourcePath":"components/forms/OtpInput.jsx"},{"name":"PasswordInput","sourcePath":"components/forms/PasswordInput.jsx"},{"name":"PasswordMeter","sourcePath":"components/forms/PasswordMeter.jsx"},{"name":"RichText","sourcePath":"components/forms/RichText.jsx"},{"name":"TOOLS","sourcePath":"components/forms/RichText.jsx"},{"name":"Segmented","sourcePath":"components/forms/Segmented.jsx"},{"name":"Select","sourcePath":"components/forms/Select.jsx"},{"name":"Stepper","sourcePath":"components/forms/Stepper.jsx"},{"name":"Switch","sourcePath":"components/forms/Switch.jsx"},{"name":"Textarea","sourcePath":"components/forms/Textarea.jsx"},{"name":"Cluster","sourcePath":"components/layout/Cluster.jsx"},{"name":"Container","sourcePath":"components/layout/Container.jsx"},{"name":"Grid","sourcePath":"components/layout/Grid.jsx"},{"name":"Page","sourcePath":"components/layout/Page.jsx"},{"name":"Section","sourcePath":"components/layout/Section.jsx"},{"name":"Split","sourcePath":"components/layout/Split.jsx"},{"name":"Stack","sourcePath":"components/layout/Stack.jsx"},{"name":"AnnounceBar","sourcePath":"components/marketing/AnnounceBar.jsx"},{"name":"ArticleCard","sourcePath":"components/marketing/ArticleCard.jsx"},{"name":"Byline","sourcePath":"components/marketing/Byline.jsx"},{"name":"CompareTable","sourcePath":"components/marketing/CompareTable.jsx"},{"name":"FeatureGrid","sourcePath":"components/marketing/FeatureGrid.jsx"},{"name":"Flow","sourcePath":"components/marketing/Flow.jsx"},{"name":"Hero","sourcePath":"components/marketing/Hero.jsx"},{"name":"LogoRail","sourcePath":"components/marketing/LogoRail.jsx"},{"name":"PlanCard","sourcePath":"components/marketing/PlanCard.jsx"},{"name":"Quote","sourcePath":"components/marketing/Quote.jsx"},{"name":"SiteFooter","sourcePath":"components/marketing/SiteFooter.jsx"},{"name":"Steps","sourcePath":"components/marketing/Steps.jsx"},{"name":"StoryCard","sourcePath":"components/marketing/StoryCard.jsx"},{"name":"AppBar","sourcePath":"components/nav/AppBar.jsx"},{"name":"BottomNav","sourcePath":"components/nav/BottomNav.jsx"},{"name":"Breadcrumbs","sourcePath":"components/nav/Breadcrumbs.jsx"},{"name":"CommandPalette","sourcePath":"components/nav/CommandPalette.jsx"},{"name":"score","sourcePath":"components/nav/CommandPalette.jsx"},{"name":"LocaleSwitcher","sourcePath":"components/nav/LocaleSwitcher.jsx"},{"name":"NavMenu","sourcePath":"components/nav/NavMenu.jsx"},{"name":"NavToggle","sourcePath":"components/nav/NavToggle.jsx"},{"name":"NavItem","sourcePath":"components/nav/Sidebar.jsx"},{"name":"Sidebar","sourcePath":"components/nav/Sidebar.jsx"},{"name":"Tabs","sourcePath":"components/nav/Tabs.jsx"},{"name":"THEME_LABELS","sourcePath":"components/nav/ThemeToggle.jsx"},{"name":"ThemeToggle","sourcePath":"components/nav/ThemeToggle.jsx"},{"name":"TopBar","sourcePath":"components/nav/TopBar.jsx"},{"name":"Layer","sourcePath":"components/overlays/_layer.js"},{"name":"LayerContext","sourcePath":"components/overlays/_layer.js"},{"name":"Dialog","sourcePath":"components/overlays/Dialog.jsx"},{"name":"Drawer","sourcePath":"components/overlays/Drawer.jsx"},{"name":"Menu","sourcePath":"components/overlays/Menu.jsx"},{"name":"OverlayProvider","sourcePath":"components/overlays/OverlayProvider.jsx"},{"name":"Popover","sourcePath":"components/overlays/Popover.jsx"},{"name":"Toast","sourcePath":"components/overlays/Toast.jsx"},{"name":"ToastRegion","sourcePath":"components/overlays/Toast.jsx"},{"name":"Tooltip","sourcePath":"components/overlays/Tooltip.jsx"},{"name":"Avatar","sourcePath":"components/primitives/Avatar.jsx"},{"name":"Button","sourcePath":"components/primitives/Button.jsx"},{"name":"Card","sourcePath":"components/primitives/Card.jsx"},{"name":"CardBody","sourcePath":"components/primitives/Card.jsx"},{"name":"CardFoot","sourcePath":"components/primitives/Card.jsx"},{"name":"CardHead","sourcePath":"components/primitives/Card.jsx"},{"name":"CardTitle","sourcePath":"components/primitives/Card.jsx"},{"name":"Chip","sourcePath":"components/primitives/Chip.jsx"},{"name":"Disclosure","sourcePath":"components/primitives/Disclosure.jsx"},{"name":"Eyebrow","sourcePath":"components/primitives/Eyebrow.jsx"},{"name":"Icon","sourcePath":"components/primitives/Icon.jsx"},{"name":"iconNames","sourcePath":"components/primitives/Icon.jsx"},{"name":"IconNames","sourcePath":"components/primitives/Icon.jsx"},{"name":"Prose","sourcePath":"components/primitives/Prose.jsx"},{"name":"Skeleton","sourcePath":"components/primitives/Skeleton.jsx"},{"name":"RAIL_KEY","sourcePath":"hooks.js"},{"name":"THEME_EVENT","sourcePath":"hooks.js"},{"name":"THEME_KEY","sourcePath":"hooks.js"}],"sourceHashes":{"components/_deprecate.js":"7fa6d36f2255","components/_merge-refs.js":"13fe3c69fe69","components/_overflow.js":"9a0a03ce0c01","components/_radio-group.js":"26caa936f1de","components/_tone.js":"e423d6698432","components/ai/AgentTrace.jsx":"a89cdd6dbfea","components/ai/Artifact.jsx":"2f6f74bc6102","components/ai/ConfidenceMeter.jsx":"30190dcfb803","components/ai/DiffReview.jsx":"3e794caa9ef1","components/ai/Feedback.jsx":"b39a358e07a0","components/ai/Message.jsx":"e507e32b90ca","components/ai/PromptInput.jsx":"93ca1175d24c","components/ai/SourceChip.jsx":"ea58d31896df","components/ai/SourceList.jsx":"60e374a74c6a","components/ai/ToolCall.jsx":"7847c91c8842","components/data/ActivityFeed.jsx":"1e4aaf31913d","components/data/BarChart.jsx":"65761f1d2d2f","components/data/CodeBlock.jsx":"d4f25b21c63d","components/data/Console.jsx":"1593923dd8d8","components/data/DataGrid.jsx":"d6fd83a51115","components/data/EmptyState.jsx":"7340a557f731","components/data/FilterBar.jsx":"dc73bc4398fe","components/data/KpiTile.jsx":"69e34ea19237","components/data/LineChart.jsx":"6c16b6d59c9a","components/data/Pagination.jsx":"8d061ad75816","components/data/Progress.jsx":"0165b3d9952c","components/data/StatMeter.jsx":"3f9b77414ada","components/data/StateView.jsx":"1db574af4cf3","components/data/Table.jsx":"8680d1c9c5f4","components/data/_columns.js":"d862780d1495","components/data/chart-parts.jsx":"20c2a6e5f8b1","components/forms/Calendar.jsx":"343335c77c44","components/forms/Checkbox.jsx":"fa0052232568","components/forms/Combobox.jsx":"2b86cabdf049","components/forms/DatePicker.jsx":"692aed22fa29","components/forms/Field.jsx":"f1b457ce9686","components/forms/FileUpload.jsx":"1b9765bb958f","components/forms/Input.jsx":"a43b7b4b5564","components/forms/InputGroup.jsx":"71d8de495436","components/forms/OtpInput.jsx":"e3eb4e6a8afb","components/forms/PasswordInput.jsx":"3bd1d9eae1b0","components/forms/PasswordMeter.jsx":"0533767a8e34","components/forms/RichText.jsx":"cc6e844d4b94","components/forms/Segmented.jsx":"5d3fa220ea03","components/forms/Select.jsx":"378e70b32827","components/forms/Stepper.jsx":"7fe21c7619e6","components/forms/Switch.jsx":"cc99b023531b","components/forms/Textarea.jsx":"2d2aa2984da3","components/layout/Cluster.jsx":"6b4e132e4d5c","components/layout/Container.jsx":"6eda4bc56e54","components/layout/Grid.jsx":"8a093fe6ed4b","components/layout/Page.jsx":"51d1753d201a","components/layout/Section.jsx":"0fee1ca51dc5","components/layout/Split.jsx":"6786154d4ebd","components/layout/Stack.jsx":"005a591d8c24","components/marketing/AnnounceBar.jsx":"dc1787b8fe7e","components/marketing/ArticleCard.jsx":"547ba4566881","components/marketing/Byline.jsx":"529ce44347b1","components/marketing/CompareTable.jsx":"1ffe4c6713f5","components/marketing/FeatureGrid.jsx":"ff6d9c74ae63","components/marketing/Flow.jsx":"9ace63bc5975","components/marketing/Hero.jsx":"ba4893068f68","components/marketing/LogoRail.jsx":"1bedd4cadb90","components/marketing/PlanCard.jsx":"39f27cba6a4d","components/marketing/Quote.jsx":"d7d463bc50d4","components/marketing/SiteFooter.jsx":"82207f2c85e5","components/marketing/Steps.jsx":"08dfc37d83e9","components/marketing/StoryCard.jsx":"e28322d02714","components/marketing/_flow-graph.js":"df02b7f5d862","components/nav/AppBar.jsx":"4e104000142e","components/nav/BottomNav.jsx":"570ba83df9c7","components/nav/Breadcrumbs.jsx":"1f2cb1328942","components/nav/CommandPalette.jsx":"18365fa4a368","components/nav/LocaleSwitcher.jsx":"c10d52566f7d","components/nav/NavMenu.jsx":"63f181f5ba8d","components/nav/NavToggle.jsx":"7c2def3f8014","components/nav/Sidebar.jsx":"d6b95affe489","components/nav/Tabs.jsx":"b13105109a2d","components/nav/ThemeToggle.jsx":"1bf447a338cb","components/nav/TopBar.jsx":"fd03a8ebf2de","components/overlays/Dialog.jsx":"9218145ec83d","components/overlays/Drawer.jsx":"fea7dd7ac2ad","components/overlays/Menu.jsx":"19f2010e0ff4","components/overlays/OverlayProvider.jsx":"3191d9e3826e","components/overlays/Popover.jsx":"c886c0118cb7","components/overlays/Toast.jsx":"c9e9fc0680cd","components/overlays/Tooltip.jsx":"d02dd67c439d","components/overlays/_layer.js":"6e6c2b63a951","components/primitives/Avatar.jsx":"3ad1a1a0cee3","components/primitives/Button.jsx":"15e8fda02e00","components/primitives/Card.jsx":"4a9c9f081c1b","components/primitives/Chip.jsx":"20bf55453782","components/primitives/Disclosure.jsx":"250d58f947f5","components/primitives/Eyebrow.jsx":"ac1cc5e5856f","components/primitives/Icon.jsx":"d8f42e8663eb","components/primitives/Prose.jsx":"7b629b089f2a","components/primitives/Skeleton.jsx":"76129a849b43","hooks.js":"92c3801e49bc","react.js":"d634d039e1c8"},"inlinedExternals":[{"name":"radix-ui","version":"1.6.7"}],"unexposedExports":[{"name":"__resetDeprecations","sourcePath":"components/_deprecate.js"},{"name":"deprecate","sourcePath":"components/_deprecate.js"},{"name":"warnOnce","sourcePath":"components/_deprecate.js"},{"name":"useMergedRef","sourcePath":"components/_merge-refs.js"},{"name":"useOverflow","sourcePath":"components/_overflow.js"},{"name":"useRadioGroup","sourcePath":"components/_radio-group.js"},{"name":"normTone","sourcePath":"components/_tone.js"},{"name":"normToneMap","sourcePath":"components/_tone.js"},{"name":"colHeader","sourcePath":"components/data/_columns.js"},{"name":"emitSort","sourcePath":"components/data/_columns.js"},{"name":"legacySortArgs","sourcePath":"components/data/_columns.js"},{"name":"Grid","sourcePath":"components/data/chart-parts.jsx"},{"name":"cx","sourcePath":"components/data/chart-parts.jsx"},{"name":"frame","sourcePath":"components/data/chart-parts.jsx"},{"name":"nf","sourcePath":"components/data/chart-parts.jsx"},{"name":"numberFormat","sourcePath":"components/data/chart-parts.jsx"},{"name":"ticks","sourcePath":"components/data/chart-parts.jsx"},{"name":"isChain","sourcePath":"components/marketing/_flow-graph.js"},{"name":"planGraph","sourcePath":"components/marketing/_flow-graph.js"},{"name":"toSideAlign","sourcePath":"components/overlays/Popover.jsx"},{"name":"mirrorScope","sourcePath":"components/overlays/_layer.js"},{"name":"useLayer","sourcePath":"components/overlays/_layer.js"},{"name":"animateCounter","sourcePath":"hooks.js"},{"name":"paint","sourcePath":"hooks.js"},{"name":"persist","sourcePath":"hooks.js"},{"name":"useDeterministicCascade","sourcePath":"hooks.js"},{"name":"useRailCollapsed","sourcePath":"hooks.js"},{"name":"useReducedMotion","sourcePath":"hooks.js"},{"name":"useReveal","sourcePath":"hooks.js"},{"name":"useSpotlight","sourcePath":"hooks.js"},{"name":"useTheme","sourcePath":"hooks.js"}]} */
(() => {
  var __create = Object.create;
  var __defProp = Object.defineProperty;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __getProtoOf = Object.getPrototypeOf;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __typeError = (msg) => {
    throw TypeError(msg);
  };
  var __esm = (fn, res) => function __init() {
    return fn && (res = (0, fn[__getOwnPropNames(fn)[0]])(fn = 0)), res;
  };
  var __commonJS = (cb, mod) => function __require() {
    return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
  };
  var __export = (target, all) => {
    for (var name in all)
      __defProp(target, name, { get: all[name], enumerable: true });
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
  var __accessCheck = (obj, member, msg) => member.has(obj) || __typeError("Cannot " + msg);
  var __privateGet = (obj, member, getter) => (__accessCheck(obj, member, "read from private field"), getter ? getter.call(obj) : member.get(obj));
  var __privateAdd = (obj, member, value) => member.has(obj) ? __typeError("Cannot add the same private member more than once") : member instanceof WeakSet ? member.add(obj) : member.set(obj, value);
  var __privateSet = (obj, member, value, setter) => (__accessCheck(obj, member, "write to private field"), setter ? setter.call(obj, value) : member.set(obj, value), value);

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

  // ds-shim:ds:react-dom
  var require_ds_react_dom = __commonJS({
    "ds-shim:ds:react-dom"(exports, module) {
      init_ds_inject_react();
      module.exports = globalThis.ReactDOM;
    }
  });

  // ds-shim:ds:jsx-runtime
  var require_ds_jsx_runtime = __commonJS({
    "ds-shim:ds:jsx-runtime"(exports, module) {
      init_ds_inject_react();
      module.exports = (function createJsxRuntime(React82) {
        var createElement44 = React82.createElement;
        var hasOwn = Object.prototype.hasOwnProperty;
        function j(type, props, key) {
          var config = {};
          var children;
          var hasChildren = false;
          for (var k in props) {
            if (!hasOwn.call(props, k)) continue;
            if (k === "children") {
              children = props[k];
              hasChildren = true;
            } else config[k] = props[k];
          }
          if (key !== void 0) config.key = key;
          if (!hasChildren) return createElement44(type, config);
          if (Array.isArray(children)) return createElement44.apply(null, [type, config].concat(children));
          return createElement44(type, config, children);
        }
        function jsxDEV(type, props, key) {
          return j(type, props, key);
        }
        return { jsx: j, jsxs: j, jsxDEV, Fragment: React82.Fragment };
      })(globalThis.React);
    }
  });

  // ds-entry.js
  init_ds_inject_react();

  // react.js
  init_ds_inject_react();

  // components/primitives/Avatar.jsx
  init_ds_inject_react();
  var React2 = __toESM(require_ds_react(), 1);
  var cx = (...a) => a.filter(Boolean).join(" ");
  function Avatar({ name = "", src, size: size4 = "md", className, ...rest }) {
    const [broken, setBroken] = React2.useState(false);
    React2.useEffect(() => setBroken(false), [src]);
    const initials = name.trim().split(/\s+/).slice(0, 2).map((w) => w[0] || "").join("").toUpperCase();
    return /* @__PURE__ */ React2.createElement("span", { className: cx("lw-avatar", size4 === "sm" && "lw-avatar-sm", size4 === "lg" && "lw-avatar-lg", className), title: name || void 0, ...rest }, src && !broken ? /* @__PURE__ */ React2.createElement("img", { src, alt: name, onError: () => setBroken(true) }) : initials);
  }

  // components/primitives/Button.jsx
  init_ds_inject_react();
  var React3 = __toESM(require_ds_react(), 1);
  var cx2 = (...a) => a.filter(Boolean).join(" ");
  var Button = React3.forwardRef(function Button2({
    variant = "brand",
    size: size4 = "md",
    iconOnly = false,
    loading = false,
    disabled = false,
    as,
    type = "button",
    className,
    onClick,
    children,
    ...rest
  }, ref) {
    const Tag = as || (rest.href ? "a" : "button");
    return /* @__PURE__ */ React3.createElement(
      Tag,
      {
        ref,
        className: cx2(
          "lw-btn",
          `lw-btn-${variant}`,
          size4 === "sm" && "lw-btn-sm",
          size4 === "lg" && "lw-btn-lg",
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
  });
  Button.displayName = "Button";

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

  // components/_tone.js
  init_ds_inject_react();

  // components/_deprecate.js
  init_ds_inject_react();
  var seen = /* @__PURE__ */ new Set();
  function warnOnce(component, topic, message) {
    const id = component + "#" + topic;
    if (seen.has(id)) return;
    seen.add(id);
    if (typeof process !== "undefined" && process.env && false) return;
    if (typeof console === "undefined" || !console.warn) return;
    console.warn("[@leanwise/design] " + component + ": " + message);
  }
  function deprecate(component, prop, message) {
    warnOnce(component, prop, message);
  }

  // components/_tone.js
  var TONES = ["brand", "success", "warning", "danger", "neutral", "info", "cta"];
  var LEGACY = {
    ok: "success",
    warn: "warning",
    err: "danger",
    pos: "success",
    neg: "danger"
  };
  function normTone(component, value, prop = "tone") {
    if (value == null) return value;
    const canonical = LEGACY[value];
    if (!canonical) return value;
    deprecate(
      component,
      `${prop}=${value}`,
      `${prop}="${value}" is deprecated — use ${prop}="${canonical}". One vocabulary across every component: success | warning | danger | neutral | brand | info | cta. The old names are accepted for one minor and removed at the next major.`
    );
    return canonical;
  }
  function normToneMap(component, map, prop) {
    if (!map) return map;
    const out = {};
    for (const [key, value] of Object.entries(map)) out[normTone(component, key, prop) ?? key] = value;
    return out;
  }

  // components/primitives/Chip.jsx
  var cx4 = (...a) => a.filter(Boolean).join(" ");
  function Chip({ tone: toneIn = "brand", className, children, ...rest }) {
    const tone = normTone("Chip", toneIn);
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
  var React4 = __toESM(require_ds_react(), 1);
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
    menu: ["M4.5 7h15", "M4.5 12h15", "M4.5 17h15"],
    /* ── Field-work glyphs (v1.8.0) ──────────────────────────────────────────
       Added for an inspection app whose whole surface is a phone at a pallet.
       Each one had a NEAR miss already in the set, and the near miss was the
       problem: `image` for a camera, `search` for a QR scan, `webhook` for
       offline, `edit` for a signature, `pin` (a thumbtack) for a location. A
       glyph that is nearly right is read as the thing it actually draws. */
    /* The camera. Body + lens + the hump over the viewfinder, so it cannot be
       mistaken for `image`, which is a picture IN a frame. */
    camera: ["M3.5 8.5A1.5 1.5 0 0 1 5 7h2.2l1.3-2h7l1.3 2H19a1.5 1.5 0 0 1 1.5 1.5v9A1.5 1.5 0 0 1 19 19H5a1.5 1.5 0 0 1-1.5-1.5z", "M12 15.8a3.3 3.3 0 1 0 0-6.6 3.3 3.3 0 0 0 0 6.6"],
    /* A code being scanned: four framing corners and the sweep line. The corners
       are what say "scan" — a filled QR block at 16px is mud. */
    scan: ["M4 8.5V6a2 2 0 0 1 2-2h2.5", "M15.5 4H18a2 2 0 0 1 2 2v2.5", "M20 15.5V18a2 2 0 0 1-2 2h-2.5", "M8.5 20H6a2 2 0 0 1-2-2v-2.5", "M4 12h16"],
    /* No connection. `wifi` itself is deliberately NOT in the set: the app never
       needs to say "you are online", only that you are not. Arcs plus the slash,
       which is the one convention every platform shares. */
    "wifi-off": ["M4 8.6a15 15 0 0 1 4.2-2.4", "M14.4 5.6A15 15 0 0 1 20 8.6", "M7.6 12.3a10 10 0 0 1 2.2-1.3", "M16.4 12.3a10 10 0 0 0-2.2-1.3", "M12 18.5h.01", "M3.5 3.5l17 17"],
    /* A signature: a written stroke over the rule it is written on. `edit` is a
       pencil — the tool, not the mark — and a record signed with a pencil icon
       reads as an editable record, which is the opposite of what it is. */
    signature: ["M4 15.5c2.5 0 3-8 5-8s1.5 8 3.5 8c1.4 0 2-2.5 3.5-2.5 1.1 0 1.5 1 2.5 1", "M4 19.5h16"],
    /* A location on a map. `pin` is a thumbtack — the drawing-pin that holds
       paper to a board — and the two are not interchangeable at 16px. */
    "map-pin": ["M12 21s6.5-5.6 6.5-10.5a6.5 6.5 0 1 0-13 0C5.5 15.4 12 21 12 21z", "M12 13a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5"],
    /* ── Chrome glyphs (v1.10.0) ─────────────────────────────────────────────
       Both were asked for by name and neither existed, so consumers reached for
       the nearest thing: `key` or `external` for signing out, and nothing at all
       for a language control — which is why the one locale switcher this package
       has ever reasoned about (base.css, the coarse-pointer block) is two bare
       text links. */
    /* Sign out. The door and the arrow LEAVING it — the arrow is what makes it
       an exit rather than `external`, which points out of a box and means "opens
       elsewhere". Drawn leaving on the inline-end side, matching every platform. */
    "log-out": ["M9.5 4.5H6a1.5 1.5 0 0 0-1.5 1.5v12A1.5 1.5 0 0 0 6 19.5h3.5", "M15.5 15.5 19 12l-3.5-3.5", "M19 12h-9"],
    /* A language control. The globe reads as "language" everywhere and as
       "region" nowhere else in this set; the two arcs are a meridian and the
       equator, which is what stops it reading as a plain circle at 16px. */
    globe: ["M12 3.5a8.5 8.5 0 1 0 0 17 8.5 8.5 0 0 0 0-17", "M3.5 12h17", "M12 3.5c2.2 2.3 3.4 5.3 3.4 8.5s-1.2 6.2-3.4 8.5c-2.2-2.3-3.4-5.3-3.4-8.5S9.8 5.8 12 3.5z"]
  };
  var UNKNOWN = ["M5.5 5.5h13v13h-13z", "M9.4 9.4l5.2 5.2", "M14.6 9.4l-5.2 5.2"];
  var warned = /* @__PURE__ */ new Set();
  function Icon({ name, size: size4 = 16, strokeWidth = 1.6, label, className, style, ...rest }) {
    const known = ICONS[name];
    if (!known && !warned.has(name) && typeof console !== "undefined") {
      warned.add(name);
      console.warn(`Icon: no glyph named "${name}". Known names: ${Object.keys(ICONS).join(", ")}`);
    }
    const paths = known || UNKNOWN;
    return /* @__PURE__ */ React4.createElement(
      "svg",
      {
        className: cx7("lw-icon", className),
        width: size4,
        height: size4,
        viewBox: "0 0 24 24",
        style: { width: size4, height: size4, ...style },
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
      paths.map((d, i) => /* @__PURE__ */ React4.createElement("path", { key: i, d }))
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
  function Cluster({ gap = 8, justify, align, wrap = true, as: Tag = "div", className, children, ...rest }) {
    return /* @__PURE__ */ React.createElement(Tag, { className: cx13(
      "lw-cluster",
      gap !== 8 && `lw-cluster-${gap}`,
      justify === "between" && "lw-cluster-between",
      justify === "end" && "lw-cluster-end",
      align === "baseline" && "lw-cluster-baseline",
      !wrap && "lw-cluster-nowrap",
      className
    ), ...rest }, children);
  }

  // components/layout/Grid.jsx
  init_ds_inject_react();
  var cx14 = (...a) => a.filter(Boolean).join(" ");
  function Grid({ min: min2, gap = 16, as: Tag = "div", className, style, children, ...rest }) {
    return /* @__PURE__ */ React.createElement(
      Tag,
      {
        className: cx14("lw-grid", gap === 24 && "lw-grid-24", className),
        style: min2 ? { "--lw-grid-min": typeof min2 === "number" ? min2 + "px" : min2, ...style } : style,
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
  function Section({ dark = false, tight = false, rule = false, className, children, ...rest }) {
    return /* @__PURE__ */ React.createElement(
      "section",
      {
        className: cx16(
          "lw-section",
          tight && "tight",
          dark && "dark lw-band-dark",
          rule === true || rule === "top" ? "lw-section-rule" : rule === "bottom" ? "lw-section-rule-b" : null,
          className
        ),
        "data-band": dark ? "dark" : void 0,
        ...rest
      },
      children
    );
  }

  // components/forms/Field.jsx
  init_ds_inject_react();
  var React5 = __toESM(require_ds_react(), 1);
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
    const auto = React5.useId();
    const single = React5.Children.count(children) === 1 && React5.isValidElement(children) ? children : null;
    const id = htmlFor || single?.props?.id || auto;
    const msgId = id + "-msg";
    const describedBy = error || help ? [single?.props?.["aria-describedby"], msgId].filter(Boolean).join(" ") : single?.props?.["aria-describedby"];
    const cloned = { id };
    if (describedBy) cloned["aria-describedby"] = describedBy;
    if (error) cloned["aria-invalid"] = "true";
    if (required && single?.props?.required === void 0) cloned.required = true;
    const wired = single ? React5.cloneElement(single, cloned) : children;
    return /* @__PURE__ */ React5.createElement("div", { className: cx17("lw-field", className), ...rest }, label && /* @__PURE__ */ React5.createElement("label", { className: "lw-label", htmlFor: id }, label, required && /* @__PURE__ */ React5.createElement(React5.Fragment, null, /* @__PURE__ */ React5.createElement("span", { className: "req", "aria-hidden": "true" }, "*"), /* @__PURE__ */ React5.createElement("span", { className: "lw-sr-only" }, requiredLabel)), optional && /* @__PURE__ */ React5.createElement("span", { className: "opt" }, optionalLabel)), typeof children === "function" ? children({ id, "aria-describedby": error || help ? msgId : void 0, "aria-invalid": error ? "true" : void 0, required }) : wired, error ? /* @__PURE__ */ React5.createElement("span", { className: "lw-error", id: msgId, role: "alert" }, error) : help ? /* @__PURE__ */ React5.createElement("span", { className: "lw-help", id: msgId }, help) : null);
  }

  // components/forms/Input.jsx
  init_ds_inject_react();
  var React6 = __toESM(require_ds_react(), 1);
  var cx18 = (...a) => a.filter(Boolean).join(" ");
  var Input = React6.forwardRef(function Input2({ size: size4 = "md", invalid, className, ...rest }, ref) {
    return /* @__PURE__ */ React6.createElement(
      "input",
      {
        ref,
        className: cx18("lw-input", size4 === "sm" && "lw-input-sm", size4 === "lg" && "lw-input-lg", className),
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

  // components/forms/PasswordInput.jsx
  init_ds_inject_react();
  var React7 = __toESM(require_ds_react(), 1);
  var cx20 = (...a) => a.filter(Boolean).join(" ");
  var PasswordInput = React7.forwardRef(function PasswordInput2({
    size: size4,
    invalid,
    /* These NAME THE CURRENT STATE, per the note above — "the password is
       hidden", not "show the password". The first version of this shipped the
       actions as defaults and contradicted its own contract two lines up. */
    revealLabel = "Password hidden",
    hideLabel = "Password visible",
    capsLockLabel = "Caps Lock is on",
    onCapsLockChange,
    className,
    ...rest
  }, ref) {
    const [revealed, setRevealed] = React7.useState(false);
    const [caps, setCaps] = React7.useState(false);
    const readCaps = (e) => {
      if (typeof e.getModifierState !== "function") return;
      const on = e.getModifierState("CapsLock");
      setCaps(on);
      onCapsLockChange?.(on);
    };
    return /* @__PURE__ */ React7.createElement("div", { className: cx20("lw-pw", className) }, /* @__PURE__ */ React7.createElement(
      "div",
      {
        className: cx20(
          "lw-input-group",
          size4 === "sm" && "lw-input-group-sm",
          size4 === "lg" && "lw-input-group-lg"
        )
      },
      /* @__PURE__ */ React7.createElement(
        "input",
        {
          ref,
          type: revealed ? "text" : "password",
          "aria-invalid": invalid ? "true" : void 0,
          onKeyUp: readCaps,
          onKeyDown: readCaps,
          onBlur: () => setCaps(false),
          ...rest
        }
      ),
      /* @__PURE__ */ React7.createElement(
        "button",
        {
          type: "button",
          className: "lw-icon-btn lw-hit",
          "aria-pressed": revealed,
          "aria-label": revealed ? hideLabel : revealLabel,
          title: revealed ? hideLabel : revealLabel,
          onClick: () => setRevealed((v) => !v),
          "data-testid": "password-reveal"
        },
        /* @__PURE__ */ React7.createElement(Icon, { name: revealed ? "eye-off" : "eye", size: 16 })
      )
    ), /* @__PURE__ */ React7.createElement("p", { className: "lw-help lw-pw-caps", role: "status", "data-on": caps ? "true" : void 0 }, caps ? capsLockLabel : ""));
  });

  // components/forms/PasswordMeter.jsx
  init_ds_inject_react();
  var cx21 = (...a) => a.filter(Boolean).join(" ");
  function PasswordMeter({ level = 0, label, labels, className, ...rest }) {
    const clamped = Math.max(0, Math.min(4, Math.round(level)));
    const word = label ?? labels?.[clamped];
    return /* @__PURE__ */ React.createElement("div", { className: cx21("lw-pw-strength", className), ...rest }, /* @__PURE__ */ React.createElement("div", { className: "lw-pwmeter", "data-level": clamped || void 0, "aria-hidden": "true" }, /* @__PURE__ */ React.createElement("span", null), /* @__PURE__ */ React.createElement("span", null), /* @__PURE__ */ React.createElement("span", null), /* @__PURE__ */ React.createElement("span", null)), word ? (
      /* Announced, not merely present: strength changes as the user types and
         a silent bar tells a screen-reader user nothing at all. */
      /* @__PURE__ */ React.createElement("p", { className: "lw-help", role: "status" }, clamped >= 3 ? /* @__PURE__ */ React.createElement(Icon, { name: "check", size: 13 }) : null, word)
    ) : null);
  }

  // components/forms/OtpInput.jsx
  init_ds_inject_react();
  var React8 = __toESM(require_ds_react(), 1);
  var cx22 = (...a) => a.filter(Boolean).join(" ");
  var OtpInput = React8.forwardRef(function OtpInput2({ length = 6, value, defaultValue = "", onChange, onComplete, invalid, className, ...rest }, ref) {
    const [internal, setInternal] = React8.useState(defaultValue);
    const isControlled = value != null;
    const code = isControlled ? value : internal;
    const fired = React8.useRef(null);
    const set = (next) => {
      const digits = String(next).replace(/\D+/g, "").slice(0, length);
      if (!isControlled) setInternal(digits);
      onChange?.(digits);
      if (digits.length === length) {
        if (fired.current !== digits) {
          fired.current = digits;
          onComplete?.(digits);
        }
      } else {
        fired.current = null;
      }
    };
    return /* @__PURE__ */ React8.createElement(
      "input",
      {
        ref,
        className: cx22("lw-otp", className),
        type: "text",
        inputMode: "numeric",
        autoComplete: "one-time-code",
        autoCapitalize: "off",
        autoCorrect: "off",
        spellCheck: false,
        maxLength: length,
        value: code,
        "aria-invalid": invalid ? "true" : void 0,
        onChange: (e) => set(e.target.value),
        ...rest
      }
    );
  });

  // components/forms/Textarea.jsx
  init_ds_inject_react();
  var React9 = __toESM(require_ds_react(), 1);
  var cx23 = (...a) => a.filter(Boolean).join(" ");
  var Textarea = React9.forwardRef(function Textarea2({ invalid, className, ...rest }, ref) {
    return /* @__PURE__ */ React9.createElement("textarea", { ref, className: cx23("lw-textarea", className), "aria-invalid": invalid ? "true" : void 0, ...rest });
  });

  // components/forms/Select.jsx
  init_ds_inject_react();
  var React10 = __toESM(require_ds_react(), 1);
  var cx24 = (...a) => a.filter(Boolean).join(" ");
  var Select = React10.forwardRef(function Select2({ options, invalid, className, children, ...rest }, ref) {
    return /* @__PURE__ */ React10.createElement("select", { ref, className: cx24("lw-select", className), "aria-invalid": invalid ? "true" : void 0, ...rest }, options ? options.map((o) => {
      const v = typeof o === "string" ? o : o.value;
      const l = typeof o === "string" ? o : o.label;
      return /* @__PURE__ */ React10.createElement("option", { key: v, value: v }, l);
    }) : children);
  });

  // components/forms/Switch.jsx
  init_ds_inject_react();
  var React11 = __toESM(require_ds_react(), 1);
  var cx25 = (...a) => a.filter(Boolean).join(" ");
  var Switch = React11.forwardRef(function Switch2({ label, className, ...rest }, ref) {
    return /* @__PURE__ */ React11.createElement("label", { className: cx25("lw-switch", className) }, /* @__PURE__ */ React11.createElement("input", { ref, type: "checkbox", role: "switch", ...rest }), /* @__PURE__ */ React11.createElement("span", { className: "track" }), label && /* @__PURE__ */ React11.createElement("span", { className: "lw-switch-text" }, label));
  });

  // components/forms/Checkbox.jsx
  init_ds_inject_react();
  var React12 = __toESM(require_ds_react(), 1);
  var cx26 = (...a) => a.filter(Boolean).join(" ");
  var Checkbox = React12.forwardRef(function Checkbox2({ label, radio = false, className, ...rest }, ref) {
    return /* @__PURE__ */ React12.createElement("label", { className: cx26("lw-check", radio && "radio", className) }, /* @__PURE__ */ React12.createElement("input", { ref, type: radio ? "radio" : "checkbox", ...rest }), /* @__PURE__ */ React12.createElement("span", { className: "box" }), label && /* @__PURE__ */ React12.createElement("span", { className: "lw-check-text" }, label));
  });

  // components/forms/Segmented.jsx
  init_ds_inject_react();
  var React15 = __toESM(require_ds_react(), 1);

  // components/_merge-refs.js
  init_ds_inject_react();
  var React13 = __toESM(require_ds_react(), 1);
  function useMergedRef(localRef, forwardedRef) {
    return React13.useCallback(
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
  var React14 = __toESM(require_ds_react(), 1);
  function useRadioGroup(values, value, select) {
    const ref = React14.useRef(null);
    const at2 = values.indexOf(value);
    const tabIndexFor = (i) => at2 === -1 ? i === 0 ? 0 : -1 : i === at2 ? 0 : -1;
    const onKeyDown = (e) => {
      const n = values.length;
      if (!n) return;
      const d = e.key === "ArrowRight" || e.key === "ArrowDown" ? 1 : e.key === "ArrowLeft" || e.key === "ArrowUp" ? -1 : 0;
      let next = null;
      if (d) next = ((at2 === -1 ? 0 : at2) + d + n) % n;
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
  var cx27 = (...a) => a.filter(Boolean).join(" ");
  var Segmented = React15.forwardRef(function Segmented2({ options = [], value, onChange, label, className, ...rest }, forwardedRef) {
    const opts = options.map((o) => typeof o === "string" ? { value: o, label: o } : o);
    const { ref, onKeyDown, tabIndexFor } = useRadioGroup(
      opts.map((o) => o.value),
      value,
      (v) => onChange && onChange(v)
    );
    const setGroupRef = useMergedRef(ref, forwardedRef);
    return /* @__PURE__ */ React15.createElement(
      "div",
      {
        ref: setGroupRef,
        className: cx27("lw-segmented", className),
        role: "radiogroup",
        "aria-label": label,
        onKeyDown,
        ...rest
      },
      opts.map((o, i) => /* @__PURE__ */ React15.createElement(
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
  var React57 = __toESM(require_ds_react(), 1);

  // components/overlays/Popover.jsx
  init_ds_inject_react();
  var React56 = __toESM(require_ds_react(), 1);

  // node_modules/radix-ui/dist/index.mjs
  init_ds_inject_react();

  // node_modules/@radix-ui/react-visually-hidden/dist/index.mjs
  init_ds_inject_react();
  var React19 = __toESM(require_ds_react(), 1);

  // node_modules/@radix-ui/react-primitive/dist/index.mjs
  init_ds_inject_react();
  var React18 = __toESM(require_ds_react(), 1);
  var ReactDOM = __toESM(require_ds_react_dom(), 1);

  // node_modules/@radix-ui/react-slot/dist/index.mjs
  init_ds_inject_react();
  var React17 = __toESM(require_ds_react(), 1);

  // node_modules/@radix-ui/react-compose-refs/dist/index.mjs
  init_ds_inject_react();
  var React16 = __toESM(require_ds_react(), 1);
  var __defProp2 = Object.defineProperty;
  var __name = (target, value) => __defProp2(target, "name", { value, configurable: true });
  function setRef(ref, value) {
    if (typeof ref === "function") {
      return ref(value);
    } else if (ref !== null && ref !== void 0) {
      ref.current = value;
    }
  }
  __name(setRef, "setRef");
  function composeRefs(...refs) {
    return (node) => {
      let hasCleanup = false;
      const cleanups = refs.map((ref) => {
        const cleanup = setRef(ref, node);
        if (!hasCleanup && typeof cleanup == "function") {
          hasCleanup = true;
        }
        return cleanup;
      });
      if (hasCleanup) {
        return () => {
          for (let i = 0; i < cleanups.length; i++) {
            const cleanup = cleanups[i];
            if (typeof cleanup == "function") {
              cleanup();
            } else {
              setRef(refs[i], null);
            }
          }
        };
      }
    };
  }
  __name(composeRefs, "composeRefs");
  function useComposedRefs(...refs) {
    return React16.useCallback(composeRefs(...refs), refs);
  }
  __name(useComposedRefs, "useComposedRefs");

  // node_modules/@radix-ui/react-slot/dist/index.mjs
  var __defProp3 = Object.defineProperty;
  var __name2 = (target, value) => __defProp3(target, "name", { value, configurable: true });
  // @__NO_SIDE_EFFECTS__
  function createSlot(ownerName) {
    const Slot22 = React17.forwardRef((props, forwardedRef) => {
      let { children, ...slotProps } = props;
      let slottableElement = null;
      let hasSlottable = false;
      const newChildren = [];
      if (isLazyComponent(children) && typeof use === "function") {
        children = use(children._payload);
      }
      React17.Children.forEach(children, (maybeSlottable) => {
        if (isSlottable(maybeSlottable)) {
          hasSlottable = true;
          const slottable = maybeSlottable;
          let child = "child" in slottable.props ? slottable.props.child : slottable.props.children;
          if (isLazyComponent(child) && typeof use === "function") {
            child = use(child._payload);
          }
          slottableElement = getSlottableElementFromSlottable(slottable, child);
          newChildren.push(slottableElement?.props?.children);
        } else {
          newChildren.push(maybeSlottable);
        }
      });
      if (slottableElement) {
        slottableElement = React17.cloneElement(slottableElement, void 0, newChildren);
      } else if (
        // A `Slottable` was found but it didn't resolve to a single element (e.g.
        // it wrapped multiple elements, text, or a render-prop `child` that
        // wasn't an element). Don't fall back to treating the `Slottable` wrapper
        // itself as the slot target — throw a descriptive error below instead.
        !hasSlottable && React17.Children.count(children) === 1 && React17.isValidElement(children)
      ) {
        slottableElement = children;
      }
      const slottableElementRef = slottableElement ? getElementRef(slottableElement) : void 0;
      const composedRef = useComposedRefs(forwardedRef, slottableElementRef);
      if (!slottableElement) {
        if (children || children === 0) {
          throw new Error(
            hasSlottable ? createSlottableError(ownerName) : createSlotError(ownerName)
          );
        }
        return children;
      }
      const mergedProps = mergeProps(slotProps, slottableElement.props ?? {});
      if (slottableElement.type !== React17.Fragment) {
        mergedProps.ref = forwardedRef ? composedRef : slottableElementRef;
      }
      return React17.cloneElement(slottableElement, mergedProps);
    });
    Slot22.displayName = `${ownerName}.Slot`;
    return Slot22;
  }
  __name2(createSlot, "createSlot");
  var SLOTTABLE_IDENTIFIER = /* @__PURE__ */ Symbol.for("radix.slottable");
  // @__NO_SIDE_EFFECTS__
  function createSlottable(ownerName) {
    const Slottable2 = /* @__PURE__ */ __name2((props) => "child" in props ? props.children(props.child) : props.children, "Slottable");
    Slottable2.displayName = `${ownerName}.Slottable`;
    Slottable2.__radixId = SLOTTABLE_IDENTIFIER;
    return Slottable2;
  }
  __name2(createSlottable, "createSlottable");
  var getSlottableElementFromSlottable = /* @__PURE__ */ __name2((slottable, child) => {
    if ("child" in slottable.props) {
      const child2 = slottable.props.child;
      if (!React17.isValidElement(child2)) return null;
      return React17.cloneElement(child2, void 0, slottable.props.children(child2.props.children));
    }
    return React17.isValidElement(child) ? child : null;
  }, "getSlottableElementFromSlottable");
  function mergeProps(slotProps, childProps) {
    const overrideProps = { ...childProps };
    for (const propName in childProps) {
      const slotPropValue = slotProps[propName];
      const childPropValue = childProps[propName];
      const isHandler = /^on[A-Z]/.test(propName);
      if (isHandler) {
        if (slotPropValue && childPropValue) {
          overrideProps[propName] = (...args) => {
            const result = childPropValue(...args);
            slotPropValue(...args);
            return result;
          };
        } else if (slotPropValue) {
          overrideProps[propName] = slotPropValue;
        }
      } else if (propName === "style") {
        overrideProps[propName] = { ...slotPropValue, ...childPropValue };
      } else if (propName === "className") {
        overrideProps[propName] = [slotPropValue, childPropValue].filter(Boolean).join(" ");
      }
    }
    return { ...slotProps, ...overrideProps };
  }
  __name2(mergeProps, "mergeProps");
  function getElementRef(element) {
    let getter = Object.getOwnPropertyDescriptor(element.props, "ref")?.get;
    let mayWarn = getter && "isReactWarning" in getter && getter.isReactWarning;
    if (mayWarn) {
      return element.ref;
    }
    getter = Object.getOwnPropertyDescriptor(element, "ref")?.get;
    mayWarn = getter && "isReactWarning" in getter && getter.isReactWarning;
    if (mayWarn) {
      return element.props.ref;
    }
    return element.props.ref || element.ref;
  }
  __name2(getElementRef, "getElementRef");
  function isSlottable(child) {
    return React17.isValidElement(child) && typeof child.type === "function" && "__radixId" in child.type && child.type.__radixId === SLOTTABLE_IDENTIFIER;
  }
  __name2(isSlottable, "isSlottable");
  var REACT_LAZY_TYPE = /* @__PURE__ */ Symbol.for("react.lazy");
  function isLazyComponent(element) {
    return element != null && typeof element === "object" && "$$typeof" in element && element.$$typeof === REACT_LAZY_TYPE && "_payload" in element && isPromiseLike(element._payload);
  }
  __name2(isLazyComponent, "isLazyComponent");
  function isPromiseLike(value) {
    return typeof value === "object" && value !== null && "then" in value;
  }
  __name2(isPromiseLike, "isPromiseLike");
  var createSlotError = /* @__PURE__ */ __name2((ownerName) => {
    return `${ownerName} failed to slot onto its children. Expected a single React element child or \`Slottable\`.`;
  }, "createSlotError");
  var createSlottableError = /* @__PURE__ */ __name2((ownerName) => {
    return `${ownerName} failed to slot onto its \`Slottable\`. Expected \`Slottable\` to receive a single React element child.`;
  }, "createSlottableError");
  var use = React17[" use ".trim().toString()];

  // node_modules/@radix-ui/react-primitive/dist/index.mjs
  var import_jsx_runtime = __toESM(require_ds_jsx_runtime(), 1);
  var __defProp4 = Object.defineProperty;
  var __name3 = (target, value) => __defProp4(target, "name", { value, configurable: true });
  var NODES = [
    "a",
    "button",
    "div",
    "form",
    "h2",
    "h3",
    "img",
    "input",
    "label",
    "li",
    "nav",
    "ol",
    "p",
    "select",
    "span",
    "svg",
    "ul"
  ];
  var Primitive = NODES.reduce((primitive, node) => {
    const Slot4 = createSlot(`Primitive.${node}`);
    const Node2 = React18.forwardRef((props, forwardedRef) => {
      const { asChild, ...primitiveProps } = props;
      const Comp = asChild ? Slot4 : node;
      if (typeof window !== "undefined") {
        window[/* @__PURE__ */ Symbol.for("radix-ui")] = true;
      }
      return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Comp, { ...primitiveProps, ref: forwardedRef });
    });
    Node2.displayName = `Primitive.${node}`;
    return { ...primitive, [node]: Node2 };
  }, {});
  function dispatchDiscreteCustomEvent(target, event) {
    if (target) ReactDOM.flushSync(() => target.dispatchEvent(event));
  }
  __name3(dispatchDiscreteCustomEvent, "dispatchDiscreteCustomEvent");

  // node_modules/@radix-ui/react-visually-hidden/dist/index.mjs
  var import_jsx_runtime2 = __toESM(require_ds_jsx_runtime(), 1);
  var __defProp5 = Object.defineProperty;
  var __name4 = (target, value) => __defProp5(target, "name", { value, configurable: true });
  var VISUALLY_HIDDEN_STYLES = Object.freeze({
    // See: https://github.com/twbs/bootstrap/blob/main/scss/mixins/_visually-hidden.scss
    position: "absolute",
    border: 0,
    width: 1,
    height: 1,
    padding: 0,
    margin: -1,
    overflow: "hidden",
    clip: "rect(0, 0, 0, 0)",
    whiteSpace: "nowrap",
    wordWrap: "normal"
  });
  var VisuallyHidden = /* @__PURE__ */ React19.forwardRef(
    /* @__PURE__ */ __name4(function VisuallyHidden2(props, forwardedRef) {
      return /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
        Primitive.span,
        {
          ...props,
          ref: forwardedRef,
          style: { ...VISUALLY_HIDDEN_STYLES, ...props.style }
        }
      );
    }, "VisuallyHidden")
  );
  var Root = VisuallyHidden;

  // node_modules/@radix-ui/react-context/dist/index.mjs
  init_ds_inject_react();
  var React20 = __toESM(require_ds_react(), 1);
  var import_jsx_runtime3 = __toESM(require_ds_jsx_runtime(), 1);
  var __defProp6 = Object.defineProperty;
  var __name5 = (target, value) => __defProp6(target, "name", { value, configurable: true });
  // @__NO_SIDE_EFFECTS__
  function createContext2(rootComponentName, defaultContext) {
    const Context = React20.createContext(defaultContext);
    Context.displayName = rootComponentName + "Context";
    const Provider2 = /* @__PURE__ */ __name5((props) => {
      const { children, ...context } = props;
      const value = React20.useMemo(() => context, Object.values(context));
      return /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(Context.Provider, { value, children });
    }, "Provider");
    Provider2.displayName = rootComponentName + "Provider";
    function useContext22(consumerName, options = {}) {
      const { optional = false } = options;
      const context = React20.useContext(Context);
      if (context) return context;
      if (defaultContext !== void 0) return defaultContext;
      if (optional) return void 0;
      throw new Error(`\`${consumerName}\` must be used within \`${rootComponentName}\``);
    }
    __name5(useContext22, "useContext");
    return [Provider2, useContext22];
  }
  __name5(createContext2, "createContext");
  // @__NO_SIDE_EFFECTS__
  function createContextScope(scopeName, createContextScopeDeps = []) {
    let defaultContexts = [];
    function createContext32(rootComponentName, defaultContext) {
      const BaseContext = React20.createContext(defaultContext);
      BaseContext.displayName = rootComponentName + "Context";
      const index2 = defaultContexts.length;
      defaultContexts = [...defaultContexts, defaultContext];
      const Provider2 = /* @__PURE__ */ __name5((props) => {
        const { scope, children, ...context } = props;
        const Context = scope?.[scopeName]?.[index2] || BaseContext;
        const value = React20.useMemo(() => context, Object.values(context));
        return /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(Context.Provider, { value, children });
      }, "Provider");
      Provider2.displayName = rootComponentName + "Provider";
      function useContext22(consumerName, scope, options = {}) {
        const { optional = false } = options;
        const Context = scope?.[scopeName]?.[index2] || BaseContext;
        const context = React20.useContext(Context);
        if (context) return context;
        if (defaultContext !== void 0) return defaultContext;
        if (optional) return void 0;
        throw new Error(`\`${consumerName}\` must be used within \`${rootComponentName}\``);
      }
      __name5(useContext22, "useContext");
      return [Provider2, useContext22];
    }
    __name5(createContext32, "createContext");
    const createScope = /* @__PURE__ */ __name5(() => {
      const scopeContexts = defaultContexts.map((defaultContext) => {
        return React20.createContext(defaultContext);
      });
      return /* @__PURE__ */ __name5(function useScope(scope) {
        const contexts = scope?.[scopeName] || scopeContexts;
        return React20.useMemo(
          () => ({ [`__scope${scopeName}`]: { ...scope, [scopeName]: contexts } }),
          [scope, contexts]
        );
      }, "useScope");
    }, "createScope");
    createScope.scopeName = scopeName;
    return [createContext32, composeContextScopes(createScope, ...createContextScopeDeps)];
  }
  __name5(createContextScope, "createContextScope");
  function composeContextScopes(...scopes) {
    const baseScope = scopes[0];
    if (scopes.length === 1) return baseScope;
    const createScope = /* @__PURE__ */ __name5(() => {
      const scopeHooks = scopes.map((createScope2) => ({
        useScope: createScope2(),
        scopeName: createScope2.scopeName
      }));
      return /* @__PURE__ */ __name5(function useComposedScopes(overrideScopes) {
        const nextScopes = scopeHooks.reduce((nextScopes2, { useScope, scopeName }) => {
          const scopeProps = useScope(overrideScopes);
          const currentScope = scopeProps[`__scope${scopeName}`];
          return { ...nextScopes2, ...currentScope };
        }, {});
        return React20.useMemo(() => ({ [`__scope${baseScope.scopeName}`]: nextScopes }), [nextScopes]);
      }, "useComposedScopes");
    }, "createScope");
    createScope.scopeName = baseScope.scopeName;
    return createScope;
  }
  __name5(composeContextScopes, "composeContextScopes");

  // node_modules/@radix-ui/react-collection/dist/index.mjs
  init_ds_inject_react();
  var React21 = __toESM(require_ds_react(), 1);
  var import_jsx_runtime4 = __toESM(require_ds_jsx_runtime(), 1);
  var React22 = __toESM(require_ds_react(), 1);
  var import_jsx_runtime5 = __toESM(require_ds_jsx_runtime(), 1);
  var __defProp7 = Object.defineProperty;
  var __name6 = (target, value) => __defProp7(target, "name", { value, configurable: true });
  // @__NO_SIDE_EFFECTS__
  function createCollection(name) {
    const PROVIDER_NAME2 = name + "CollectionProvider";
    const [createCollectionContext, createCollectionScope3] = createContextScope(PROVIDER_NAME2);
    const [CollectionProviderImpl, useCollectionContext] = createCollectionContext(
      PROVIDER_NAME2,
      { collectionRef: { current: null }, itemMap: /* @__PURE__ */ new Map() }
    );
    const CollectionProvider = /* @__PURE__ */ __name6((props) => {
      const { scope, children } = props;
      const ref = React21.useRef(null);
      const itemMap = React21.useRef(/* @__PURE__ */ new Map()).current;
      return /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(CollectionProviderImpl, { scope, itemMap, collectionRef: ref, children });
    }, "CollectionProvider");
    CollectionProvider.displayName = PROVIDER_NAME2;
    const COLLECTION_SLOT_NAME = name + "CollectionSlot";
    const CollectionSlotImpl = createSlot(COLLECTION_SLOT_NAME);
    const CollectionSlot = React21.forwardRef(
      (props, forwardedRef) => {
        const { scope, children } = props;
        const context = useCollectionContext(COLLECTION_SLOT_NAME, scope);
        const composedRefs = useComposedRefs(forwardedRef, context.collectionRef);
        return /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(CollectionSlotImpl, { ref: composedRefs, children });
      }
    );
    CollectionSlot.displayName = COLLECTION_SLOT_NAME;
    const ITEM_SLOT_NAME = name + "CollectionItemSlot";
    const ITEM_DATA_ATTR = "data-radix-collection-item";
    const CollectionItemSlotImpl = createSlot(ITEM_SLOT_NAME);
    const CollectionItemSlot = React21.forwardRef(
      (props, forwardedRef) => {
        const { scope, children, ...itemData } = props;
        const ref = React21.useRef(null);
        const composedRefs = useComposedRefs(forwardedRef, ref);
        const context = useCollectionContext(ITEM_SLOT_NAME, scope);
        React21.useEffect(() => {
          context.itemMap.set(ref, { ref, ...itemData });
          return () => void context.itemMap.delete(ref);
        });
        return /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(CollectionItemSlotImpl, { ...{ [ITEM_DATA_ATTR]: "" }, ref: composedRefs, children });
      }
    );
    CollectionItemSlot.displayName = ITEM_SLOT_NAME;
    function useCollection3(scope) {
      const context = useCollectionContext(name + "CollectionConsumer", scope);
      const getItems = React21.useCallback(() => {
        const collectionNode = context.collectionRef.current;
        if (!collectionNode) return [];
        const orderedNodes = Array.from(collectionNode.querySelectorAll(`[${ITEM_DATA_ATTR}]`));
        const items = Array.from(context.itemMap.values());
        const orderedItems = items.sort(
          (a, b) => orderedNodes.indexOf(a.ref.current) - orderedNodes.indexOf(b.ref.current)
        );
        return orderedItems;
      }, [context.collectionRef, context.itemMap]);
      return getItems;
    }
    __name6(useCollection3, "useCollection");
    return [
      { Provider: CollectionProvider, Slot: CollectionSlot, ItemSlot: CollectionItemSlot },
      useCollection3,
      createCollectionScope3
    ];
  }
  __name6(createCollection, "createCollection");
  var __instanciated = /* @__PURE__ */ new WeakMap();
  var _keys, _a;
  var OrderedDict = (_a = class extends Map {
    constructor(entries) {
      super(entries);
      __privateAdd(this, _keys);
      __privateSet(this, _keys, [...super.keys()]);
      __instanciated.set(this, true);
    }
    set(key, value) {
      if (__instanciated.get(this)) {
        if (this.has(key)) {
          __privateGet(this, _keys)[__privateGet(this, _keys).indexOf(key)] = key;
        } else {
          __privateGet(this, _keys).push(key);
        }
      }
      super.set(key, value);
      return this;
    }
    insert(index2, key, value) {
      const has = this.has(key);
      const length = __privateGet(this, _keys).length;
      const relativeIndex = toSafeInteger(index2);
      let actualIndex = relativeIndex >= 0 ? relativeIndex : length + relativeIndex;
      const safeIndex = actualIndex < 0 || actualIndex >= length ? -1 : actualIndex;
      if (safeIndex === this.size || has && safeIndex === this.size - 1 || safeIndex === -1) {
        this.set(key, value);
        return this;
      }
      const size4 = this.size + (has ? 0 : 1);
      if (relativeIndex < 0) {
        actualIndex++;
      }
      const keys = [...__privateGet(this, _keys)];
      let nextValue;
      let shouldSkip = false;
      for (let i = actualIndex; i < size4; i++) {
        if (actualIndex === i) {
          let nextKey = keys[i];
          if (keys[i] === key) {
            nextKey = keys[i + 1];
          }
          if (has) {
            this.delete(key);
          }
          nextValue = this.get(nextKey);
          this.set(key, value);
        } else {
          if (!shouldSkip && keys[i - 1] === key) {
            shouldSkip = true;
          }
          const currentKey = keys[shouldSkip ? i : i - 1];
          const currentValue = nextValue;
          nextValue = this.get(currentKey);
          this.delete(currentKey);
          this.set(currentKey, currentValue);
        }
      }
      return this;
    }
    with(index2, key, value) {
      const copy = new _a(this);
      copy.insert(index2, key, value);
      return copy;
    }
    before(key) {
      const index2 = __privateGet(this, _keys).indexOf(key) - 1;
      if (index2 < 0) {
        return void 0;
      }
      return this.entryAt(index2);
    }
    /**
     * Sets a new key-value pair at the position before the given key.
     */
    setBefore(key, newKey, value) {
      const index2 = __privateGet(this, _keys).indexOf(key);
      if (index2 === -1) {
        return this;
      }
      return this.insert(index2, newKey, value);
    }
    after(key) {
      let index2 = __privateGet(this, _keys).indexOf(key);
      index2 = index2 === -1 || index2 === this.size - 1 ? -1 : index2 + 1;
      if (index2 === -1) {
        return void 0;
      }
      return this.entryAt(index2);
    }
    /**
     * Sets a new key-value pair at the position after the given key.
     */
    setAfter(key, newKey, value) {
      const index2 = __privateGet(this, _keys).indexOf(key);
      if (index2 === -1) {
        return this;
      }
      return this.insert(index2 + 1, newKey, value);
    }
    first() {
      return this.entryAt(0);
    }
    last() {
      return this.entryAt(-1);
    }
    clear() {
      __privateSet(this, _keys, []);
      return super.clear();
    }
    delete(key) {
      const deleted = super.delete(key);
      if (deleted) {
        __privateGet(this, _keys).splice(__privateGet(this, _keys).indexOf(key), 1);
      }
      return deleted;
    }
    deleteAt(index2) {
      const key = this.keyAt(index2);
      if (key !== void 0) {
        return this.delete(key);
      }
      return false;
    }
    at(index2) {
      const key = at(__privateGet(this, _keys), index2);
      if (key !== void 0) {
        return this.get(key);
      }
    }
    entryAt(index2) {
      const key = at(__privateGet(this, _keys), index2);
      if (key !== void 0) {
        return [key, this.get(key)];
      }
    }
    indexOf(key) {
      return __privateGet(this, _keys).indexOf(key);
    }
    keyAt(index2) {
      return at(__privateGet(this, _keys), index2);
    }
    from(key, offset4) {
      const index2 = this.indexOf(key);
      if (index2 === -1) {
        return void 0;
      }
      let dest = index2 + offset4;
      if (dest < 0) dest = 0;
      if (dest >= this.size) dest = this.size - 1;
      return this.at(dest);
    }
    keyFrom(key, offset4) {
      const index2 = this.indexOf(key);
      if (index2 === -1) {
        return void 0;
      }
      let dest = index2 + offset4;
      if (dest < 0) dest = 0;
      if (dest >= this.size) dest = this.size - 1;
      return this.keyAt(dest);
    }
    find(predicate, thisArg) {
      let index2 = 0;
      for (const entry of this) {
        if (Reflect.apply(predicate, thisArg, [entry, index2, this])) {
          return entry;
        }
        index2++;
      }
      return void 0;
    }
    findIndex(predicate, thisArg) {
      let index2 = 0;
      for (const entry of this) {
        if (Reflect.apply(predicate, thisArg, [entry, index2, this])) {
          return index2;
        }
        index2++;
      }
      return -1;
    }
    filter(predicate, thisArg) {
      const entries = [];
      let index2 = 0;
      for (const entry of this) {
        if (Reflect.apply(predicate, thisArg, [entry, index2, this])) {
          entries.push(entry);
        }
        index2++;
      }
      return new _a(entries);
    }
    map(callbackfn, thisArg) {
      const entries = [];
      let index2 = 0;
      for (const entry of this) {
        entries.push([entry[0], Reflect.apply(callbackfn, thisArg, [entry, index2, this])]);
        index2++;
      }
      return new _a(entries);
    }
    reduce(...args) {
      const [callbackfn, initialValue] = args;
      let index2 = 0;
      let accumulator = initialValue ?? this.at(0);
      for (const entry of this) {
        if (index2 === 0 && args.length === 1) {
          accumulator = entry;
        } else {
          accumulator = Reflect.apply(callbackfn, this, [accumulator, entry, index2, this]);
        }
        index2++;
      }
      return accumulator;
    }
    reduceRight(...args) {
      const [callbackfn, initialValue] = args;
      let accumulator = initialValue ?? this.at(-1);
      for (let index2 = this.size - 1; index2 >= 0; index2--) {
        const entry = this.at(index2);
        if (index2 === this.size - 1 && args.length === 1) {
          accumulator = entry;
        } else {
          accumulator = Reflect.apply(callbackfn, this, [accumulator, entry, index2, this]);
        }
      }
      return accumulator;
    }
    toSorted(compareFn) {
      const entries = [...this.entries()].sort(compareFn);
      return new _a(entries);
    }
    toReversed() {
      const reversed = new _a();
      for (let index2 = this.size - 1; index2 >= 0; index2--) {
        const key = this.keyAt(index2);
        const element = this.get(key);
        reversed.set(key, element);
      }
      return reversed;
    }
    toSpliced(...args) {
      const entries = [...this.entries()];
      entries.splice(...args);
      return new _a(entries);
    }
    slice(start, end) {
      const result = new _a();
      let stop = this.size - 1;
      if (start === void 0) {
        return result;
      }
      if (start < 0) {
        start = start + this.size;
      }
      if (end !== void 0 && end > 0) {
        stop = end - 1;
      }
      for (let index2 = start; index2 <= stop; index2++) {
        const key = this.keyAt(index2);
        const element = this.get(key);
        result.set(key, element);
      }
      return result;
    }
    every(predicate, thisArg) {
      let index2 = 0;
      for (const entry of this) {
        if (!Reflect.apply(predicate, thisArg, [entry, index2, this])) {
          return false;
        }
        index2++;
      }
      return true;
    }
    some(predicate, thisArg) {
      let index2 = 0;
      for (const entry of this) {
        if (Reflect.apply(predicate, thisArg, [entry, index2, this])) {
          return true;
        }
        index2++;
      }
      return false;
    }
  }, _keys = new WeakMap(), __name6(_a, "OrderedDict"), _a);
  function at(array, index2) {
    if ("at" in Array.prototype) {
      return Array.prototype.at.call(array, index2);
    }
    const actualIndex = toSafeIndex(array, index2);
    return actualIndex === -1 ? void 0 : array[actualIndex];
  }
  __name6(at, "at");
  function toSafeIndex(array, index2) {
    const length = array.length;
    const relativeIndex = toSafeInteger(index2);
    const actualIndex = relativeIndex >= 0 ? relativeIndex : length + relativeIndex;
    return actualIndex < 0 || actualIndex >= length ? -1 : actualIndex;
  }
  __name6(toSafeIndex, "toSafeIndex");
  function toSafeInteger(number) {
    return number !== number || number === 0 ? 0 : Math.trunc(number);
  }
  __name6(toSafeInteger, "toSafeInteger");
  // @__NO_SIDE_EFFECTS__
  function createCollection2(name) {
    const PROVIDER_NAME2 = name + "CollectionProvider";
    const [createCollectionContext, createCollectionScope3] = createContextScope(PROVIDER_NAME2);
    const [CollectionContextProvider, useCollectionContext] = createCollectionContext(
      PROVIDER_NAME2,
      {
        collectionElement: null,
        collectionRef: { current: null },
        collectionRefObject: { current: null },
        itemMap: new OrderedDict(),
        setItemMap: /* @__PURE__ */ __name6(() => void 0, "setItemMap")
      }
    );
    const CollectionProvider = /* @__PURE__ */ __name6(({ state, ...props }) => {
      return state ? /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(CollectionProviderImpl, { ...props, state }) : /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(CollectionInit, { ...props });
    }, "CollectionProvider");
    CollectionProvider.displayName = PROVIDER_NAME2;
    const CollectionInit = /* @__PURE__ */ __name6((props) => {
      const state = useInitCollection();
      return /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(CollectionProviderImpl, { ...props, state });
    }, "CollectionInit");
    CollectionInit.displayName = PROVIDER_NAME2 + "Init";
    const CollectionProviderImpl = /* @__PURE__ */ __name6((props) => {
      const { scope, children, state } = props;
      const ref = React22.useRef(null);
      const [collectionElement, setCollectionElement] = React22.useState(
        null
      );
      const composeRefs2 = useComposedRefs(ref, setCollectionElement);
      const [itemMap, setItemMap] = state;
      React22.useEffect(() => {
        if (!collectionElement) return;
        const observer = getChildListObserver(() => {
        });
        observer.observe(collectionElement, {
          childList: true,
          subtree: true
        });
        return () => {
          observer.disconnect();
        };
      }, [collectionElement]);
      return /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(
        CollectionContextProvider,
        {
          scope,
          itemMap,
          setItemMap,
          collectionRef: composeRefs2,
          collectionRefObject: ref,
          collectionElement,
          children
        }
      );
    }, "CollectionProviderImpl");
    CollectionProviderImpl.displayName = PROVIDER_NAME2 + "Impl";
    const COLLECTION_SLOT_NAME = name + "CollectionSlot";
    const CollectionSlotImpl = createSlot(COLLECTION_SLOT_NAME);
    const CollectionSlot = React22.forwardRef(
      (props, forwardedRef) => {
        const { scope, children } = props;
        const context = useCollectionContext(COLLECTION_SLOT_NAME, scope);
        const composedRefs = useComposedRefs(forwardedRef, context.collectionRef);
        return /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(CollectionSlotImpl, { ref: composedRefs, children });
      }
    );
    CollectionSlot.displayName = COLLECTION_SLOT_NAME;
    const ITEM_SLOT_NAME = name + "CollectionItemSlot";
    const ITEM_DATA_ATTR = "data-radix-collection-item";
    const CollectionItemSlotImpl = createSlot(ITEM_SLOT_NAME);
    const CollectionItemSlot = React22.forwardRef(
      (props, forwardedRef) => {
        const { scope, children, ...itemData } = props;
        const ref = React22.useRef(null);
        const [element, setElement] = React22.useState(null);
        const composedRefs = useComposedRefs(forwardedRef, ref, setElement);
        const context = useCollectionContext(ITEM_SLOT_NAME, scope);
        const { setItemMap } = context;
        const itemDataRef = React22.useRef(itemData);
        if (!shallowEqual(itemDataRef.current, itemData)) {
          itemDataRef.current = itemData;
        }
        const memoizedItemData = itemDataRef.current;
        React22.useEffect(() => {
          const itemData2 = memoizedItemData;
          setItemMap((map) => {
            if (!element) {
              return map;
            }
            if (!map.has(element)) {
              map.set(element, { ...itemData2, element });
              return map.toSorted(sortByDocumentPosition);
            }
            return map.set(element, { ...itemData2, element }).toSorted(sortByDocumentPosition);
          });
          return () => {
            setItemMap((map) => {
              if (!element || !map.has(element)) {
                return map;
              }
              map.delete(element);
              return new OrderedDict(map);
            });
          };
        }, [element, memoizedItemData, setItemMap]);
        return /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(CollectionItemSlotImpl, { ...{ [ITEM_DATA_ATTR]: "" }, ref: composedRefs, children });
      }
    );
    CollectionItemSlot.displayName = ITEM_SLOT_NAME;
    function useInitCollection() {
      return React22.useState(new OrderedDict());
    }
    __name6(useInitCollection, "useInitCollection");
    function useCollection3(scope) {
      const { itemMap } = useCollectionContext(name + "CollectionConsumer", scope);
      return itemMap;
    }
    __name6(useCollection3, "useCollection");
    const functions = {
      createCollectionScope: createCollectionScope3,
      useCollection: useCollection3,
      useInitCollection
    };
    return [
      { Provider: CollectionProvider, Slot: CollectionSlot, ItemSlot: CollectionItemSlot },
      functions
    ];
  }
  __name6(createCollection2, "createCollection");
  function shallowEqual(a, b) {
    if (a === b) return true;
    if (typeof a !== "object" || typeof b !== "object") return false;
    if (a == null || b == null) return false;
    const keysA = Object.keys(a);
    const keysB = Object.keys(b);
    if (keysA.length !== keysB.length) return false;
    for (const key of keysA) {
      if (!Object.prototype.hasOwnProperty.call(b, key)) return false;
      if (a[key] !== b[key]) return false;
    }
    return true;
  }
  __name6(shallowEqual, "shallowEqual");
  function isElementPreceding(a, b) {
    return !!(b.compareDocumentPosition(a) & Node.DOCUMENT_POSITION_PRECEDING);
  }
  __name6(isElementPreceding, "isElementPreceding");
  function sortByDocumentPosition(a, b) {
    return !a[1].element || !b[1].element ? 0 : isElementPreceding(a[1].element, b[1].element) ? -1 : 1;
  }
  __name6(sortByDocumentPosition, "sortByDocumentPosition");
  function getChildListObserver(callback) {
    const observer = new MutationObserver((mutationsList) => {
      for (const mutation of mutationsList) {
        if (mutation.type === "childList") {
          callback();
          return;
        }
      }
    });
    return observer;
  }
  __name6(getChildListObserver, "getChildListObserver");

  // node_modules/@radix-ui/primitive/dist/index.mjs
  init_ds_inject_react();
  var __defProp8 = Object.defineProperty;
  var __name7 = (target, value) => __defProp8(target, "name", { value, configurable: true });
  var canUseDOM = !!(typeof window !== "undefined" && window.document && window.document.createElement);
  function composeEventHandlers(originalEventHandler, ourEventHandler, { checkForDefaultPrevented = true } = {}) {
    return /* @__PURE__ */ __name7(function handleEvent(event) {
      originalEventHandler?.(event);
      if (checkForDefaultPrevented === false || !event || !event.defaultPrevented) {
        return ourEventHandler?.(event);
      }
    }, "handleEvent");
  }
  __name7(composeEventHandlers, "composeEventHandlers");
  function getOwnerWindow(element) {
    if (!canUseDOM) {
      throw new Error("Cannot access window outside of the DOM");
    }
    return element?.ownerDocument?.defaultView ?? window;
  }
  __name7(getOwnerWindow, "getOwnerWindow");
  function getOwnerDocument(element) {
    if (!canUseDOM) {
      throw new Error("Cannot access document outside of the DOM");
    }
    return element?.ownerDocument ?? document;
  }
  __name7(getOwnerDocument, "getOwnerDocument");
  function getActiveElement(node, activeDescendant = false) {
    const { activeElement } = getOwnerDocument(node);
    if (!activeElement?.nodeName) {
      return null;
    }
    if (isFrame(activeElement) && activeElement.contentDocument) {
      return getActiveElement(activeElement.contentDocument.body, activeDescendant);
    }
    if (activeDescendant) {
      const id = activeElement.getAttribute("aria-activedescendant");
      if (id) {
        const element = getOwnerDocument(activeElement).getElementById(id);
        if (element) {
          return element;
        }
      }
    }
    return activeElement;
  }
  __name7(getActiveElement, "getActiveElement");
  function isFrame(element) {
    return element.tagName === "IFRAME";
  }
  __name7(isFrame, "isFrame");

  // node_modules/@radix-ui/react-use-controllable-state/dist/index.mjs
  init_ds_inject_react();
  var React25 = __toESM(require_ds_react(), 1);

  // node_modules/@radix-ui/primitive/dist/internal/is-development.false.mjs
  init_ds_inject_react();
  var IS_DEVELOPMENT = false;

  // node_modules/@radix-ui/react-use-layout-effect/dist/index.mjs
  init_ds_inject_react();
  var React23 = __toESM(require_ds_react(), 1);
  var useLayoutEffect2 = globalThis?.document ? React23.useLayoutEffect : () => {
  };

  // node_modules/@radix-ui/react-use-controllable-state/dist/index.mjs
  var React26 = __toESM(require_ds_react(), 1);

  // node_modules/@radix-ui/react-use-effect-event/dist/index.mjs
  init_ds_inject_react();
  var React24 = __toESM(require_ds_react(), 1);
  var __defProp9 = Object.defineProperty;
  var __name8 = (target, value) => __defProp9(target, "name", { value, configurable: true });
  var useReactEffectEvent = React24[" useEffectEvent ".trim().toString()];
  var useReactInsertionEffect = React24[" useInsertionEffect ".trim().toString()];
  function useEffectEvent(callback) {
    if (typeof useReactEffectEvent === "function") {
      return useReactEffectEvent(callback);
    }
    const ref = React24.useRef(() => {
      throw new Error("Cannot call an event handler while rendering.");
    });
    if (typeof useReactInsertionEffect === "function") {
      useReactInsertionEffect(() => {
        ref.current = callback;
      });
    } else {
      useLayoutEffect2(() => {
        ref.current = callback;
      });
    }
    return React24.useMemo(() => ((...args) => ref.current?.(...args)), []);
  }
  __name8(useEffectEvent, "useEffectEvent");

  // node_modules/@radix-ui/react-use-controllable-state/dist/index.mjs
  var __defProp10 = Object.defineProperty;
  var __name9 = (target, value) => __defProp10(target, "name", { value, configurable: true });
  var useInsertionEffect = React25[" useInsertionEffect ".trim().toString()] || useLayoutEffect2;
  function useControllableState({
    prop,
    defaultProp,
    onChange = /* @__PURE__ */ __name9(() => {
    }, "onChange"),
    caller
  }) {
    const [uncontrolledProp, setUncontrolledProp, onChangeRef] = useUncontrolledState({
      defaultProp,
      onChange
    });
    const isControlled = prop !== void 0;
    const value = isControlled ? prop : uncontrolledProp;
    if (IS_DEVELOPMENT) {
      const isControlledRef = React25.useRef(prop !== void 0);
      React25.useEffect(() => {
        const wasControlled = isControlledRef.current;
        if (wasControlled !== isControlled) {
          const from = wasControlled ? "controlled" : "uncontrolled";
          const to = isControlled ? "controlled" : "uncontrolled";
          console.warn(
            `${caller} is changing from ${from} to ${to}. Components should not switch from controlled to uncontrolled (or vice versa). Decide between using a controlled or uncontrolled value for the lifetime of the component.`
          );
        }
        isControlledRef.current = isControlled;
      }, [isControlled, caller]);
    }
    const setValue = React25.useCallback(
      (nextValue) => {
        if (isControlled) {
          const value2 = isFunction(nextValue) ? nextValue(prop) : nextValue;
          if (value2 !== prop) {
            onChangeRef.current?.(value2);
          }
        } else {
          setUncontrolledProp(nextValue);
        }
      },
      [isControlled, prop, setUncontrolledProp, onChangeRef]
    );
    return [value, setValue];
  }
  __name9(useControllableState, "useControllableState");
  function useUncontrolledState({
    defaultProp,
    onChange
  }) {
    const [value, setValue] = React25.useState(defaultProp);
    const prevValueRef = React25.useRef(value);
    const onChangeRef = React25.useRef(onChange);
    useInsertionEffect(() => {
      onChangeRef.current = onChange;
    }, [onChange]);
    React25.useEffect(() => {
      if (prevValueRef.current !== value) {
        onChangeRef.current?.(value);
        prevValueRef.current = value;
      }
    }, [value, prevValueRef]);
    return [value, setValue, onChangeRef];
  }
  __name9(useUncontrolledState, "useUncontrolledState");
  function isFunction(value) {
    return typeof value === "function";
  }
  __name9(isFunction, "isFunction");
  var SYNC_STATE = /* @__PURE__ */ Symbol("RADIX:SYNC_STATE");
  function useControllableStateReducer(reducer, userArgs, initialArg, init) {
    const { prop: controlledState, defaultProp, onChange: onChangeProp, caller } = userArgs;
    const isControlled = controlledState !== void 0;
    const onChange = useEffectEvent(onChangeProp);
    if (IS_DEVELOPMENT) {
      const isControlledRef = React26.useRef(controlledState !== void 0);
      React26.useEffect(() => {
        const wasControlled = isControlledRef.current;
        if (wasControlled !== isControlled) {
          const from = wasControlled ? "controlled" : "uncontrolled";
          const to = isControlled ? "controlled" : "uncontrolled";
          console.warn(
            `${caller} is changing from ${from} to ${to}. Components should not switch from controlled to uncontrolled (or vice versa). Decide between using a controlled or uncontrolled value for the lifetime of the component.`
          );
        }
        isControlledRef.current = isControlled;
      }, [isControlled, caller]);
    }
    const args = [{ ...initialArg, state: defaultProp }];
    if (init) {
      args.push(init);
    }
    const [internalState, dispatch] = React26.useReducer(
      (state2, action) => {
        if (action.type === SYNC_STATE) {
          return { ...state2, state: action.state };
        }
        const next = reducer(state2, action);
        if (isControlled && !Object.is(next.state, state2.state)) {
          onChange(next.state);
        }
        return next;
      },
      ...args
    );
    const uncontrolledState = internalState.state;
    const prevValueRef = React26.useRef(uncontrolledState);
    React26.useEffect(() => {
      if (prevValueRef.current !== uncontrolledState) {
        prevValueRef.current = uncontrolledState;
        if (!isControlled) {
          onChange(uncontrolledState);
        }
      }
    }, [uncontrolledState, prevValueRef, isControlled]);
    const state = React26.useMemo(() => {
      const isControlled2 = controlledState !== void 0;
      if (isControlled2) {
        return { ...internalState, state: controlledState };
      }
      return internalState;
    }, [internalState, controlledState]);
    React26.useEffect(() => {
      if (isControlled && !Object.is(controlledState, internalState.state)) {
        dispatch({ type: SYNC_STATE, state: controlledState });
      }
    }, [controlledState, internalState.state, isControlled]);
    return [state, dispatch];
  }
  __name9(useControllableStateReducer, "useControllableStateReducer");

  // node_modules/@radix-ui/react-presence/dist/index.mjs
  init_ds_inject_react();
  var React27 = __toESM(require_ds_react(), 1);
  var React28 = __toESM(require_ds_react(), 1);
  var __defProp11 = Object.defineProperty;
  var __name10 = (target, value) => __defProp11(target, "name", { value, configurable: true });
  function useStateMachine(initialState, machine) {
    return React28.useReducer((state, event) => {
      const nextState = machine[state][event];
      return nextState ?? state;
    }, initialState);
  }
  __name10(useStateMachine, "useStateMachine");
  var Presence = /* @__PURE__ */ __name10((props) => {
    const { present, children } = props;
    const presence = usePresence(present);
    const child = typeof children === "function" ? children({ present: presence.isPresent }) : React27.Children.only(children);
    const ref = useStableComposedRefs(presence.ref, getElementRef2(child));
    const forceMount = typeof children === "function";
    return forceMount || presence.isPresent ? React27.cloneElement(child, { ref }) : null;
  }, "Presence");
  function usePresence(present) {
    const [node, setNode] = React27.useState();
    const stylesRef = React27.useRef(null);
    const prevPresentRef = React27.useRef(present);
    const prevAnimationNameRef = React27.useRef("none");
    const mountAnimationNameRef = React27.useRef(void 0);
    const initialState = present ? "mounted" : "unmounted";
    const [state, send] = useStateMachine(initialState, {
      mounted: {
        UNMOUNT: "unmounted",
        ANIMATION_OUT: "unmountSuspended"
      },
      unmountSuspended: {
        MOUNT: "mounted",
        ANIMATION_END: "unmounted"
      },
      unmounted: {
        MOUNT: "mounted"
      }
    });
    React27.useEffect(() => {
      if (state === "mounted") {
        prevAnimationNameRef.current = mountAnimationNameRef.current ?? getAnimationName(stylesRef.current);
        mountAnimationNameRef.current = void 0;
      } else {
        prevAnimationNameRef.current = "none";
      }
    }, [state]);
    useLayoutEffect2(() => {
      const styles = stylesRef.current;
      const wasPresent = prevPresentRef.current;
      const hasPresentChanged = wasPresent !== present;
      if (hasPresentChanged) {
        const prevAnimationName = prevAnimationNameRef.current;
        const currentAnimationName = getAnimationName(styles);
        if (present) {
          mountAnimationNameRef.current = currentAnimationName;
          send("MOUNT");
        } else if (currentAnimationName === "none" || styles?.display === "none") {
          send("UNMOUNT");
        } else {
          const isAnimating = prevAnimationName !== currentAnimationName;
          if (wasPresent && isAnimating) {
            send("ANIMATION_OUT");
          } else {
            send("UNMOUNT");
          }
        }
        prevPresentRef.current = present;
      }
    }, [present, send]);
    useLayoutEffect2(() => {
      if (node) {
        let timeoutId;
        const ownerWindow = node.ownerDocument.defaultView ?? window;
        const handleAnimationEnd = /* @__PURE__ */ __name10((event) => {
          const currentAnimationName = getAnimationName(stylesRef.current);
          const isCurrentAnimation = currentAnimationName.includes(CSS.escape(event.animationName));
          if (event.target === node && isCurrentAnimation) {
            send("ANIMATION_END");
            if (!prevPresentRef.current) {
              const currentFillMode = node.style.animationFillMode;
              node.style.animationFillMode = "forwards";
              timeoutId = ownerWindow.setTimeout(() => {
                if (node.style.animationFillMode === "forwards") {
                  node.style.animationFillMode = currentFillMode;
                }
              });
            }
          }
        }, "handleAnimationEnd");
        const handleAnimationStart = /* @__PURE__ */ __name10((event) => {
          if (event.target === node) {
            prevAnimationNameRef.current = getAnimationName(stylesRef.current);
          }
        }, "handleAnimationStart");
        node.addEventListener("animationstart", handleAnimationStart);
        node.addEventListener("animationcancel", handleAnimationEnd);
        node.addEventListener("animationend", handleAnimationEnd);
        return () => {
          ownerWindow.clearTimeout(timeoutId);
          node.removeEventListener("animationstart", handleAnimationStart);
          node.removeEventListener("animationcancel", handleAnimationEnd);
          node.removeEventListener("animationend", handleAnimationEnd);
        };
      } else {
        send("ANIMATION_END");
      }
    }, [node, send]);
    return {
      isPresent: ["mounted", "unmountSuspended"].includes(state),
      ref: React27.useCallback((node2) => {
        if (node2) {
          const styles = getComputedStyle(node2);
          stylesRef.current = styles;
          mountAnimationNameRef.current = getAnimationName(styles);
        } else {
          stylesRef.current = null;
        }
        setNode(node2);
      }, [])
    };
  }
  __name10(usePresence, "usePresence");
  function setRef2(ref, value) {
    if (typeof ref === "function") {
      return ref(value);
    } else if (ref !== null && ref !== void 0) {
      ref.current = value;
    }
  }
  __name10(setRef2, "setRef");
  function useStableComposedRefs(...refs) {
    const refsRef = React27.useRef(refs);
    refsRef.current = refs;
    return React27.useCallback((node) => {
      const currentRefs = refsRef.current;
      let hasCleanup = false;
      const cleanups = currentRefs.map((ref) => {
        const cleanup = setRef2(ref, node);
        if (!hasCleanup && typeof cleanup === "function") {
          hasCleanup = true;
        }
        return cleanup;
      });
      if (hasCleanup) {
        return () => {
          for (let i = 0; i < cleanups.length; i++) {
            const cleanup = cleanups[i];
            if (typeof cleanup === "function") {
              cleanup();
            } else {
              setRef2(currentRefs[i], null);
            }
          }
        };
      }
    }, []);
  }
  __name10(useStableComposedRefs, "useStableComposedRefs");
  function getAnimationName(styles) {
    return styles?.animationName || "none";
  }
  __name10(getAnimationName, "getAnimationName");
  function getElementRef2(element) {
    let getter = Object.getOwnPropertyDescriptor(element.props, "ref")?.get;
    let mayWarn = getter && "isReactWarning" in getter && getter.isReactWarning;
    if (mayWarn) {
      return element.ref;
    }
    getter = Object.getOwnPropertyDescriptor(element, "ref")?.get;
    mayWarn = getter && "isReactWarning" in getter && getter.isReactWarning;
    if (mayWarn) {
      return element.props.ref;
    }
    return element.props.ref || element.ref;
  }
  __name10(getElementRef2, "getElementRef");

  // node_modules/@radix-ui/react-id/dist/index.mjs
  init_ds_inject_react();
  var React29 = __toESM(require_ds_react(), 1);
  var __defProp12 = Object.defineProperty;
  var __name11 = (target, value) => __defProp12(target, "name", { value, configurable: true });
  var useReactId = React29[" useId ".trim().toString()] || (() => void 0);
  var count = 0;
  function useId2(deterministicId) {
    const [id, setId] = React29.useState(useReactId());
    useLayoutEffect2(() => {
      if (!deterministicId) setId((reactId) => reactId ?? String(count++));
    }, [deterministicId]);
    return deterministicId || (id ? `radix-${id}` : "");
  }
  __name11(useId2, "useId");

  // node_modules/@radix-ui/react-direction/dist/index.mjs
  init_ds_inject_react();
  var React30 = __toESM(require_ds_react(), 1);
  var import_jsx_runtime6 = __toESM(require_ds_jsx_runtime(), 1);
  var __defProp13 = Object.defineProperty;
  var __name12 = (target, value) => __defProp13(target, "name", { value, configurable: true });
  var DirectionContext = React30.createContext(void 0);
  function useDirection(localDir) {
    const globalDir = React30.useContext(DirectionContext);
    return localDir || globalDir || "ltr";
  }
  __name12(useDirection, "useDirection");

  // node_modules/@radix-ui/react-dialog/dist/index.mjs
  var dist_exports = {};
  __export(dist_exports, {
    Close: () => DialogClose,
    Content: () => DialogContent,
    Description: () => DialogDescription,
    Dialog: () => Dialog,
    DialogClose: () => DialogClose,
    DialogContent: () => DialogContent,
    DialogDescription: () => DialogDescription,
    DialogOverlay: () => DialogOverlay,
    DialogPortal: () => DialogPortal,
    DialogTitle: () => DialogTitle,
    DialogTrigger: () => DialogTrigger,
    Overlay: () => DialogOverlay,
    Portal: () => DialogPortal,
    Root: () => Dialog,
    Title: () => DialogTitle,
    Trigger: () => DialogTrigger,
    WarningProvider: () => WarningProvider,
    createDialogScope: () => createDialogScope
  });
  init_ds_inject_react();
  var React43 = __toESM(require_ds_react(), 1);

  // node_modules/@radix-ui/react-dismissable-layer/dist/index.mjs
  init_ds_inject_react();
  var React32 = __toESM(require_ds_react(), 1);

  // node_modules/@radix-ui/react-use-callback-ref/dist/index.mjs
  init_ds_inject_react();
  var React31 = __toESM(require_ds_react(), 1);
  var __defProp14 = Object.defineProperty;
  var __name13 = (target, value) => __defProp14(target, "name", { value, configurable: true });
  function useCallbackRef(callback) {
    const callbackRef = React31.useRef(callback);
    React31.useEffect(() => {
      callbackRef.current = callback;
    });
    return React31.useMemo(() => ((...args) => callbackRef.current?.(...args)), []);
  }
  __name13(useCallbackRef, "useCallbackRef");

  // node_modules/@radix-ui/react-dismissable-layer/dist/index.mjs
  var import_jsx_runtime7 = __toESM(require_ds_jsx_runtime(), 1);
  var __defProp15 = Object.defineProperty;
  var __name14 = (target, value) => __defProp15(target, "name", { value, configurable: true });
  var CONTEXT_UPDATE = "dismissableLayer.update";
  var POINTER_DOWN_OUTSIDE = "dismissableLayer.pointerDownOutside";
  var FOCUS_OUTSIDE = "dismissableLayer.focusOutside";
  var originalBodyPointerEvents;
  var DismissableLayerContext = React32.createContext({
    layers: /* @__PURE__ */ new Set(),
    layersWithOutsidePointerEventsDisabled: /* @__PURE__ */ new Set(),
    branches: /* @__PURE__ */ new Set(),
    // Outside elements that belong to a layer's own dismiss affordance (eg, a
    // dialog overlay). Pressing them should dismiss the layer regardless of
    // whether or not they stop propagation.
    //
    // See https://github.com/radix-ui/primitives/issues/3346
    dismissableSurfaces: /* @__PURE__ */ new Set()
  });
  var DismissableLayer = /* @__PURE__ */ React32.forwardRef(
    // blank line to reduce diff noise
    /* @__PURE__ */ __name14(function DismissableLayer2(props, forwardedRef) {
      const {
        disableOutsidePointerEvents = false,
        deferPointerDownOutside = false,
        onEscapeKeyDown,
        onPointerDownOutside,
        onFocusOutside,
        onInteractOutside,
        onDismiss,
        ...layerProps
      } = props;
      const context = React32.useContext(DismissableLayerContext);
      const [node, setNode] = React32.useState(null);
      const ownerDocument = node?.ownerDocument ?? globalThis?.document;
      const [, force] = React32.useState({});
      const composedRefs = useComposedRefs(forwardedRef, setNode);
      const layers = Array.from(context.layers);
      const [highestLayerWithOutsidePointerEventsDisabled] = [
        ...context.layersWithOutsidePointerEventsDisabled
      ].slice(-1);
      const highestLayerWithOutsidePointerEventsDisabledIndex = highestLayerWithOutsidePointerEventsDisabled ? layers.indexOf(highestLayerWithOutsidePointerEventsDisabled) : -1;
      const index2 = node ? layers.indexOf(node) : -1;
      const isBodyPointerEventsDisabled = context.layersWithOutsidePointerEventsDisabled.size > 0;
      const isPointerEventsEnabled = index2 >= highestLayerWithOutsidePointerEventsDisabledIndex;
      const isDeferredPointerDownOutsideRef = React32.useRef(false);
      const pointerDownOutside = usePointerDownOutside(
        (event) => {
          onPointerDownOutside?.(event);
          onInteractOutside?.(event);
          if (!event.defaultPrevented) onDismiss?.();
        },
        {
          ownerDocument,
          deferPointerDownOutside,
          isDeferredPointerDownOutsideRef,
          dismissableSurfaces: context.dismissableSurfaces,
          shouldHandlePointerDownOutside: React32.useCallback(
            (target) => {
              if (!(target instanceof Node)) {
                return false;
              }
              const isPointerDownOnBranch = [...context.branches].some(
                (branch) => branch.contains(target)
              );
              return isPointerEventsEnabled && !isPointerDownOnBranch;
            },
            [context.branches, isPointerEventsEnabled]
          )
        }
      );
      const focusOutside = useFocusOutside((event) => {
        if (deferPointerDownOutside && isDeferredPointerDownOutsideRef.current) {
          return;
        }
        const target = event.target;
        const isFocusInBranch = [...context.branches].some((branch) => branch.contains(target));
        if (isFocusInBranch) return;
        onFocusOutside?.(event);
        onInteractOutside?.(event);
        if (!event.defaultPrevented) onDismiss?.();
      }, ownerDocument);
      const isHighestLayer = node ? index2 === layers.length - 1 : false;
      const handleKeyDown = useCallbackRef((event) => {
        if (event.key !== "Escape") {
          return;
        }
        onEscapeKeyDown?.(event);
        if (!event.defaultPrevented && onDismiss) {
          event.preventDefault();
          onDismiss();
        }
      });
      React32.useEffect(() => {
        if (!isHighestLayer) {
          return;
        }
        ownerDocument.addEventListener("keydown", handleKeyDown, { capture: true });
        return () => ownerDocument.removeEventListener("keydown", handleKeyDown, { capture: true });
      }, [ownerDocument, isHighestLayer, handleKeyDown]);
      React32.useEffect(() => {
        if (!node) return;
        if (disableOutsidePointerEvents) {
          if (context.layersWithOutsidePointerEventsDisabled.size === 0) {
            originalBodyPointerEvents = ownerDocument.body.style.pointerEvents;
            ownerDocument.body.style.pointerEvents = "none";
          }
          context.layersWithOutsidePointerEventsDisabled.add(node);
        }
        context.layers.add(node);
        dispatchUpdate();
        return () => {
          if (disableOutsidePointerEvents) {
            context.layersWithOutsidePointerEventsDisabled.delete(node);
            if (context.layersWithOutsidePointerEventsDisabled.size === 0) {
              ownerDocument.body.style.pointerEvents = originalBodyPointerEvents;
            }
          }
        };
      }, [node, ownerDocument, disableOutsidePointerEvents, context]);
      React32.useEffect(() => {
        return () => {
          if (!node) return;
          context.layers.delete(node);
          context.layersWithOutsidePointerEventsDisabled.delete(node);
          dispatchUpdate();
        };
      }, [node, context]);
      React32.useEffect(() => {
        const handleUpdate = /* @__PURE__ */ __name14(() => force({}), "handleUpdate");
        document.addEventListener(CONTEXT_UPDATE, handleUpdate);
        return () => document.removeEventListener(CONTEXT_UPDATE, handleUpdate);
      }, []);
      return /* @__PURE__ */ (0, import_jsx_runtime7.jsx)(
        Primitive.div,
        {
          ...layerProps,
          ref: composedRefs,
          style: {
            pointerEvents: isBodyPointerEventsDisabled ? isPointerEventsEnabled ? "auto" : "none" : void 0,
            ...props.style
          },
          onFocusCapture: composeEventHandlers(props.onFocusCapture, focusOutside.onFocusCapture),
          onBlurCapture: composeEventHandlers(props.onBlurCapture, focusOutside.onBlurCapture),
          onPointerDownCapture: composeEventHandlers(
            props.onPointerDownCapture,
            pointerDownOutside.onPointerDownCapture
          )
        }
      );
    }, "DismissableLayer")
  );
  function useDismissableLayerSurface() {
    const context = React32.useContext(DismissableLayerContext);
    const [node, setNode] = React32.useState(null);
    React32.useEffect(() => {
      if (!node) {
        return;
      }
      context.dismissableSurfaces.add(node);
      return () => {
        context.dismissableSurfaces.delete(node);
      };
    }, [node, context.dismissableSurfaces]);
    return setNode;
  }
  __name14(useDismissableLayerSurface, "useDismissableLayerSurface");
  var IS_TRUE = /* @__PURE__ */ __name14(() => true, "IS_TRUE");
  function usePointerDownOutside(onPointerDownOutside, args) {
    const {
      ownerDocument = globalThis?.document,
      deferPointerDownOutside = false,
      isDeferredPointerDownOutsideRef,
      dismissableSurfaces,
      shouldHandlePointerDownOutside = IS_TRUE
    } = args;
    const handlePointerDownOutside = useCallbackRef(onPointerDownOutside);
    const isPointerInsideReactTreeRef = React32.useRef(false);
    const isPointerDownOutsideRef = React32.useRef(false);
    const interceptedOutsideInteractionEventsRef = React32.useRef(/* @__PURE__ */ new Map());
    const handleClickRef = React32.useRef(() => {
    });
    React32.useEffect(() => {
      function resetOutsideInteraction() {
        isPointerDownOutsideRef.current = false;
        isDeferredPointerDownOutsideRef.current = false;
        interceptedOutsideInteractionEventsRef.current.clear();
      }
      __name14(resetOutsideInteraction, "resetOutsideInteraction");
      function isOutsideInteractionIntercepted() {
        return Array.from(interceptedOutsideInteractionEventsRef.current.values()).some(Boolean);
      }
      __name14(isOutsideInteractionIntercepted, "isOutsideInteractionIntercepted");
      function handleInteractionCapture(event) {
        if (!isPointerDownOutsideRef.current) {
          return;
        }
        const target = event.target;
        const isDismissableSurface = target instanceof Node && [...dismissableSurfaces].some((surface) => surface.contains(target));
        if (!isDismissableSurface) {
          interceptedOutsideInteractionEventsRef.current.set(event.type, true);
        }
        if (event.type === "click") {
          window.setTimeout(() => {
            if (isPointerDownOutsideRef.current) {
              handleClickRef.current();
            }
          }, 0);
        }
      }
      __name14(handleInteractionCapture, "handleInteractionCapture");
      function handleInteractionBubble(event) {
        if (isPointerDownOutsideRef.current) {
          interceptedOutsideInteractionEventsRef.current.set(event.type, false);
        }
      }
      __name14(handleInteractionBubble, "handleInteractionBubble");
      const handlePointerDown = /* @__PURE__ */ __name14((event) => {
        if (event.target && !isPointerInsideReactTreeRef.current) {
          let handleAndDispatchPointerDownOutsideEvent2 = function() {
            ownerDocument.removeEventListener("click", handleClickRef.current);
            const wasOutsideInteractionIntercepted = isOutsideInteractionIntercepted();
            resetOutsideInteraction();
            if (!wasOutsideInteractionIntercepted) {
              handleAndDispatchCustomEvent(
                POINTER_DOWN_OUTSIDE,
                handlePointerDownOutside,
                eventDetail,
                { discrete: true }
              );
            }
          };
          var handleAndDispatchPointerDownOutsideEvent = handleAndDispatchPointerDownOutsideEvent2;
          __name14(handleAndDispatchPointerDownOutsideEvent2, "handleAndDispatchPointerDownOutsideEvent");
          if (!shouldHandlePointerDownOutside(event.target)) {
            ownerDocument.removeEventListener("click", handleClickRef.current);
            resetOutsideInteraction();
            isPointerInsideReactTreeRef.current = false;
            return;
          }
          const eventDetail = { originalEvent: event };
          isPointerDownOutsideRef.current = true;
          isDeferredPointerDownOutsideRef.current = deferPointerDownOutside && event.button === 0;
          interceptedOutsideInteractionEventsRef.current.clear();
          if (!deferPointerDownOutside || event.button !== 0) {
            handleAndDispatchPointerDownOutsideEvent2();
          } else {
            ownerDocument.removeEventListener("click", handleClickRef.current);
            handleClickRef.current = handleAndDispatchPointerDownOutsideEvent2;
            ownerDocument.addEventListener("click", handleClickRef.current, { once: true });
          }
        } else {
          ownerDocument.removeEventListener("click", handleClickRef.current);
          resetOutsideInteraction();
        }
        isPointerInsideReactTreeRef.current = false;
      }, "handlePointerDown");
      const outsideInteractionEvents = [
        "pointerup",
        "mousedown",
        "mouseup",
        "touchstart",
        "touchend",
        "click"
      ];
      for (const eventName of outsideInteractionEvents) {
        ownerDocument.addEventListener(eventName, handleInteractionCapture, true);
        ownerDocument.addEventListener(eventName, handleInteractionBubble);
      }
      const timerId = window.setTimeout(() => {
        ownerDocument.addEventListener("pointerdown", handlePointerDown);
      }, 0);
      return () => {
        window.clearTimeout(timerId);
        ownerDocument.removeEventListener("pointerdown", handlePointerDown);
        ownerDocument.removeEventListener("click", handleClickRef.current);
        for (const eventName of outsideInteractionEvents) {
          ownerDocument.removeEventListener(eventName, handleInteractionCapture, true);
          ownerDocument.removeEventListener(eventName, handleInteractionBubble);
        }
      };
    }, [
      ownerDocument,
      handlePointerDownOutside,
      deferPointerDownOutside,
      isDeferredPointerDownOutsideRef,
      dismissableSurfaces,
      shouldHandlePointerDownOutside
    ]);
    return {
      // ensures we check React component tree (not just DOM tree)
      onPointerDownCapture: /* @__PURE__ */ __name14(() => isPointerInsideReactTreeRef.current = true, "onPointerDownCapture")
    };
  }
  __name14(usePointerDownOutside, "usePointerDownOutside");
  function useFocusOutside(onFocusOutside, ownerDocument = globalThis?.document) {
    const handleFocusOutside = useCallbackRef(onFocusOutside);
    const isFocusInsideReactTreeRef = React32.useRef(false);
    React32.useEffect(() => {
      const handleFocus = /* @__PURE__ */ __name14((event) => {
        if (event.target && !isFocusInsideReactTreeRef.current) {
          const eventDetail = { originalEvent: event };
          handleAndDispatchCustomEvent(FOCUS_OUTSIDE, handleFocusOutside, eventDetail, {
            discrete: false
          });
        }
      }, "handleFocus");
      ownerDocument.addEventListener("focusin", handleFocus);
      return () => ownerDocument.removeEventListener("focusin", handleFocus);
    }, [ownerDocument, handleFocusOutside]);
    return {
      onFocusCapture: /* @__PURE__ */ __name14(() => isFocusInsideReactTreeRef.current = true, "onFocusCapture"),
      onBlurCapture: /* @__PURE__ */ __name14(() => isFocusInsideReactTreeRef.current = false, "onBlurCapture")
    };
  }
  __name14(useFocusOutside, "useFocusOutside");
  function dispatchUpdate() {
    const event = new CustomEvent(CONTEXT_UPDATE);
    document.dispatchEvent(event);
  }
  __name14(dispatchUpdate, "dispatchUpdate");
  function handleAndDispatchCustomEvent(name, handler, detail, { discrete }) {
    const target = detail.originalEvent.target;
    const event = new CustomEvent(name, { bubbles: false, cancelable: true, detail });
    if (handler) target.addEventListener(name, handler, { once: true });
    if (discrete) {
      dispatchDiscreteCustomEvent(target, event);
    } else {
      target.dispatchEvent(event);
    }
  }
  __name14(handleAndDispatchCustomEvent, "handleAndDispatchCustomEvent");

  // node_modules/@radix-ui/react-focus-scope/dist/index.mjs
  init_ds_inject_react();
  var React33 = __toESM(require_ds_react(), 1);
  var import_jsx_runtime8 = __toESM(require_ds_jsx_runtime(), 1);
  var __defProp16 = Object.defineProperty;
  var __name15 = (target, value) => __defProp16(target, "name", { value, configurable: true });
  var AUTOFOCUS_ON_MOUNT = "focusScope.autoFocusOnMount";
  var AUTOFOCUS_ON_UNMOUNT = "focusScope.autoFocusOnUnmount";
  var EVENT_OPTIONS = { bubbles: false, cancelable: true };
  var FocusScope = /* @__PURE__ */ React33.forwardRef(
    /* @__PURE__ */ __name15(function FocusScope2(props, forwardedRef) {
      const {
        loop = false,
        trapped = false,
        onMountAutoFocus: onMountAutoFocusProp,
        onUnmountAutoFocus: onUnmountAutoFocusProp,
        ...scopeProps
      } = props;
      const [container, setContainer] = React33.useState(null);
      const onMountAutoFocus = useCallbackRef(onMountAutoFocusProp);
      const onUnmountAutoFocus = useCallbackRef(onUnmountAutoFocusProp);
      const lastFocusedElementRef = React33.useRef(null);
      const composedRefs = useComposedRefs(forwardedRef, setContainer);
      const focusScope = React33.useRef({
        paused: false,
        pause() {
          this.paused = true;
        },
        resume() {
          this.paused = false;
        }
      }).current;
      React33.useEffect(() => {
        if (trapped) {
          let handleFocusIn2 = function(event) {
            if (focusScope.paused || !container) return;
            const target = event.target;
            if (container.contains(target)) {
              lastFocusedElementRef.current = target;
            } else {
              focus(lastFocusedElementRef.current, { select: true });
            }
          }, handleFocusOut2 = function(event) {
            if (focusScope.paused || !container) return;
            const relatedTarget = event.relatedTarget;
            if (relatedTarget === null) return;
            if (!container.contains(relatedTarget)) {
              focus(lastFocusedElementRef.current, { select: true });
            }
          }, handleMutations2 = function(mutations) {
            const focusedElement = document.activeElement;
            if (focusedElement !== document.body) return;
            for (const mutation of mutations) {
              if (mutation.removedNodes.length > 0) focus(container);
            }
          };
          var handleFocusIn = handleFocusIn2, handleFocusOut = handleFocusOut2, handleMutations = handleMutations2;
          __name15(handleFocusIn2, "handleFocusIn");
          __name15(handleFocusOut2, "handleFocusOut");
          __name15(handleMutations2, "handleMutations");
          document.addEventListener("focusin", handleFocusIn2);
          document.addEventListener("focusout", handleFocusOut2);
          const mutationObserver = new MutationObserver(handleMutations2);
          if (container) mutationObserver.observe(container, { childList: true, subtree: true });
          return () => {
            document.removeEventListener("focusin", handleFocusIn2);
            document.removeEventListener("focusout", handleFocusOut2);
            mutationObserver.disconnect();
          };
        }
      }, [trapped, container, focusScope.paused]);
      React33.useEffect(() => {
        if (container) {
          focusScopesStack.add(focusScope);
          const previouslyFocusedElement = document.activeElement;
          const hasFocusedCandidate = container.contains(previouslyFocusedElement);
          if (!hasFocusedCandidate) {
            const mountEvent = new CustomEvent(AUTOFOCUS_ON_MOUNT, EVENT_OPTIONS);
            container.addEventListener(AUTOFOCUS_ON_MOUNT, onMountAutoFocus);
            container.dispatchEvent(mountEvent);
            if (!mountEvent.defaultPrevented) {
              focusFirst(removeLinks(getTabbableCandidates(container)), { select: true });
              if (document.activeElement === previouslyFocusedElement) {
                focus(container);
              }
            }
          }
          return () => {
            container.removeEventListener(AUTOFOCUS_ON_MOUNT, onMountAutoFocus);
            setTimeout(() => {
              const unmountEvent = new CustomEvent(AUTOFOCUS_ON_UNMOUNT, EVENT_OPTIONS);
              container.addEventListener(AUTOFOCUS_ON_UNMOUNT, onUnmountAutoFocus);
              container.dispatchEvent(unmountEvent);
              if (!unmountEvent.defaultPrevented) {
                focus(previouslyFocusedElement ?? document.body, { select: true });
              }
              container.removeEventListener(AUTOFOCUS_ON_UNMOUNT, onUnmountAutoFocus);
              focusScopesStack.remove(focusScope);
            }, 0);
          };
        }
      }, [container, onMountAutoFocus, onUnmountAutoFocus, focusScope]);
      const handleKeyDown = React33.useCallback(
        (event) => {
          if (!loop && !trapped) return;
          if (focusScope.paused) return;
          const isTabKey = event.key === "Tab" && !event.altKey && !event.ctrlKey && !event.metaKey;
          const focusedElement = document.activeElement;
          if (isTabKey && focusedElement) {
            const container2 = event.currentTarget;
            const [first, last] = getTabbableEdges(container2);
            const hasTabbableElementsInside = first && last;
            if (!hasTabbableElementsInside) {
              if (focusedElement === container2) event.preventDefault();
            } else {
              if (!event.shiftKey && focusedElement === last) {
                event.preventDefault();
                if (loop) focus(first, { select: true });
              } else if (event.shiftKey && focusedElement === first) {
                event.preventDefault();
                if (loop) focus(last, { select: true });
              }
            }
          }
        },
        [loop, trapped, focusScope.paused]
      );
      return /* @__PURE__ */ (0, import_jsx_runtime8.jsx)(Primitive.div, { tabIndex: -1, ...scopeProps, ref: composedRefs, onKeyDown: handleKeyDown });
    }, "FocusScope")
  );
  function focusFirst(candidates, { select = false } = {}) {
    const previouslyFocusedElement = document.activeElement;
    for (const candidate of candidates) {
      focus(candidate, { select });
      if (document.activeElement !== previouslyFocusedElement) return;
    }
  }
  __name15(focusFirst, "focusFirst");
  function getTabbableEdges(container) {
    const candidates = getTabbableCandidates(container);
    const first = findVisible(candidates, container);
    const last = findVisible(candidates.reverse(), container);
    return [first, last];
  }
  __name15(getTabbableEdges, "getTabbableEdges");
  function getTabbableCandidates(container) {
    const nodes = [];
    const walker = document.createTreeWalker(container, NodeFilter.SHOW_ELEMENT, {
      acceptNode: /* @__PURE__ */ __name15((node) => {
        const isHiddenInput = node.tagName === "INPUT" && node.type === "hidden";
        if (node.disabled || node.hidden || isHiddenInput) return NodeFilter.FILTER_SKIP;
        return node.tabIndex >= 0 ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_SKIP;
      }, "acceptNode")
    });
    while (walker.nextNode()) nodes.push(walker.currentNode);
    return nodes;
  }
  __name15(getTabbableCandidates, "getTabbableCandidates");
  function findVisible(elements, container) {
    const canUseCheckVisibility = typeof container.checkVisibility === "function" && container.checkVisibility({ checkVisibilityCSS: true });
    for (const element of elements) {
      const hidden = canUseCheckVisibility ? !element.checkVisibility({ checkVisibilityCSS: true }) : isHidden(element, { upTo: container });
      if (!hidden) {
        return element;
      }
    }
  }
  __name15(findVisible, "findVisible");
  function isHidden(node, { upTo }) {
    if (getComputedStyle(node).visibility === "hidden") return true;
    while (node) {
      if (upTo !== void 0 && node === upTo) return false;
      if (getComputedStyle(node).display === "none") return true;
      node = node.parentElement;
    }
    return false;
  }
  __name15(isHidden, "isHidden");
  function isSelectableInput(element) {
    return element instanceof HTMLInputElement && "select" in element;
  }
  __name15(isSelectableInput, "isSelectableInput");
  function focus(element, { select = false } = {}) {
    if (element && element.focus) {
      const previouslyFocusedElement = document.activeElement;
      element.focus({ preventScroll: true });
      if (element !== previouslyFocusedElement && isSelectableInput(element) && select)
        element.select();
    }
  }
  __name15(focus, "focus");
  var focusScopesStack = createFocusScopesStack();
  function createFocusScopesStack() {
    let stack = [];
    return {
      add(focusScope) {
        const activeFocusScope = stack[0];
        if (focusScope !== activeFocusScope) {
          activeFocusScope?.pause();
        }
        stack = arrayRemove(stack, focusScope);
        stack.unshift(focusScope);
      },
      remove(focusScope) {
        stack = arrayRemove(stack, focusScope);
        stack[0]?.resume();
      }
    };
  }
  __name15(createFocusScopesStack, "createFocusScopesStack");
  function arrayRemove(array, item) {
    const updatedArray = [...array];
    const index2 = updatedArray.indexOf(item);
    if (index2 !== -1) {
      updatedArray.splice(index2, 1);
    }
    return updatedArray;
  }
  __name15(arrayRemove, "arrayRemove");
  function removeLinks(items) {
    return items.filter((item) => item.tagName !== "A");
  }
  __name15(removeLinks, "removeLinks");

  // node_modules/@radix-ui/react-portal/dist/index.mjs
  init_ds_inject_react();
  var React34 = __toESM(require_ds_react(), 1);
  var ReactDOM2 = __toESM(require_ds_react_dom(), 1);
  var import_jsx_runtime9 = __toESM(require_ds_jsx_runtime(), 1);
  var __defProp17 = Object.defineProperty;
  var __name16 = (target, value) => __defProp17(target, "name", { value, configurable: true });
  var Portal = /* @__PURE__ */ React34.forwardRef(
    /* @__PURE__ */ __name16(function Portal2(props, forwardedRef) {
      const { container: containerProp, ...portalProps } = props;
      const [mounted, setMounted] = React34.useState(false);
      useLayoutEffect2(() => setMounted(true), []);
      const container = containerProp || mounted && globalThis?.document?.body;
      return container ? ReactDOM2.createPortal(/* @__PURE__ */ (0, import_jsx_runtime9.jsx)(Primitive.div, { ...portalProps, ref: forwardedRef }), container) : null;
    }, "Portal")
  );

  // node_modules/@radix-ui/react-focus-guards/dist/index.mjs
  init_ds_inject_react();
  var React35 = __toESM(require_ds_react(), 1);
  var __defProp18 = Object.defineProperty;
  var __name17 = (target, value) => __defProp18(target, "name", { value, configurable: true });
  var count2 = 0;
  var guards = null;
  function FocusGuards(props) {
    useFocusGuards();
    return props.children;
  }
  __name17(FocusGuards, "FocusGuards");
  function useFocusGuards() {
    React35.useEffect(() => {
      if (!guards) {
        guards = { start: createFocusGuard(), end: createFocusGuard() };
      }
      const { start, end } = guards;
      if (document.body.firstElementChild !== start) {
        document.body.insertAdjacentElement("afterbegin", start);
      }
      if (document.body.lastElementChild !== end) {
        document.body.insertAdjacentElement("beforeend", end);
      }
      count2++;
      return () => {
        if (count2 === 1) {
          guards?.start.remove();
          guards?.end.remove();
          guards = null;
        }
        count2 = Math.max(0, count2 - 1);
      };
    }, []);
  }
  __name17(useFocusGuards, "useFocusGuards");
  function createFocusGuard() {
    const element = document.createElement("span");
    element.setAttribute("data-radix-focus-guard", "");
    element.tabIndex = 0;
    element.style.outline = "none";
    element.style.opacity = "0";
    element.style.position = "fixed";
    element.style.pointerEvents = "none";
    return element;
  }
  __name17(createFocusGuard, "createFocusGuard");

  // node_modules/react-remove-scroll/dist/es2015/index.js
  init_ds_inject_react();

  // node_modules/react-remove-scroll/dist/es2015/Combination.js
  init_ds_inject_react();

  // node_modules/tslib/tslib.es6.mjs
  init_ds_inject_react();
  var __assign = function() {
    __assign = Object.assign || function __assign2(t) {
      for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
      }
      return t;
    };
    return __assign.apply(this, arguments);
  };
  function __rest(s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
      t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
      for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
        if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
          t[p[i]] = s[p[i]];
      }
    return t;
  }
  function __spreadArray(to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
      if (ar || !(i in from)) {
        if (!ar) ar = Array.prototype.slice.call(from, 0, i);
        ar[i] = from[i];
      }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
  }

  // node_modules/react-remove-scroll/dist/es2015/Combination.js
  var React42 = __toESM(require_ds_react());

  // node_modules/react-remove-scroll/dist/es2015/UI.js
  init_ds_inject_react();
  var React38 = __toESM(require_ds_react());

  // node_modules/react-remove-scroll-bar/dist/es2015/constants.js
  init_ds_inject_react();
  var zeroRightClassName = "right-scroll-bar-position";
  var fullWidthClassName = "width-before-scroll-bar";
  var noScrollbarsClassName = "with-scroll-bars-hidden";
  var removedBarSizeVariable = "--removed-body-scroll-bar-size";

  // node_modules/use-callback-ref/dist/es2015/index.js
  init_ds_inject_react();

  // node_modules/use-callback-ref/dist/es2015/assignRef.js
  init_ds_inject_react();
  function assignRef(ref, value) {
    if (typeof ref === "function") {
      ref(value);
    } else if (ref) {
      ref.current = value;
    }
    return ref;
  }

  // node_modules/use-callback-ref/dist/es2015/useRef.js
  init_ds_inject_react();
  var import_react = __toESM(require_ds_react());
  function useCallbackRef2(initialValue, callback) {
    var ref = (0, import_react.useState)(function() {
      return {
        // value
        value: initialValue,
        // last callback
        callback,
        // "memoized" public interface
        facade: {
          get current() {
            return ref.value;
          },
          set current(value) {
            var last = ref.value;
            if (last !== value) {
              ref.value = value;
              ref.callback(value, last);
            }
          }
        }
      };
    })[0];
    ref.callback = callback;
    return ref.facade;
  }

  // node_modules/use-callback-ref/dist/es2015/useMergeRef.js
  init_ds_inject_react();
  var React36 = __toESM(require_ds_react());
  var useIsomorphicLayoutEffect = typeof window !== "undefined" ? React36.useLayoutEffect : React36.useEffect;
  var currentValues = /* @__PURE__ */ new WeakMap();
  function useMergeRefs(refs, defaultValue) {
    var callbackRef = useCallbackRef2(defaultValue || null, function(newValue) {
      return refs.forEach(function(ref) {
        return assignRef(ref, newValue);
      });
    });
    useIsomorphicLayoutEffect(function() {
      var oldValue = currentValues.get(callbackRef);
      if (oldValue) {
        var prevRefs_1 = new Set(oldValue);
        var nextRefs_1 = new Set(refs);
        var current_1 = callbackRef.current;
        prevRefs_1.forEach(function(ref) {
          if (!nextRefs_1.has(ref)) {
            assignRef(ref, null);
          }
        });
        nextRefs_1.forEach(function(ref) {
          if (!prevRefs_1.has(ref)) {
            assignRef(ref, current_1);
          }
        });
      }
      currentValues.set(callbackRef, refs);
    }, [refs]);
    return callbackRef;
  }

  // node_modules/react-remove-scroll/dist/es2015/medium.js
  init_ds_inject_react();

  // node_modules/use-sidecar/dist/es2015/index.js
  init_ds_inject_react();

  // node_modules/use-sidecar/dist/es2015/medium.js
  init_ds_inject_react();
  function ItoI(a) {
    return a;
  }
  function innerCreateMedium(defaults, middleware) {
    if (middleware === void 0) {
      middleware = ItoI;
    }
    var buffer = [];
    var assigned = false;
    var medium = {
      read: function() {
        if (assigned) {
          throw new Error("Sidecar: could not `read` from an `assigned` medium. `read` could be used only with `useMedium`.");
        }
        if (buffer.length) {
          return buffer[buffer.length - 1];
        }
        return defaults;
      },
      useMedium: function(data) {
        var item = middleware(data, assigned);
        buffer.push(item);
        return function() {
          buffer = buffer.filter(function(x) {
            return x !== item;
          });
        };
      },
      assignSyncMedium: function(cb) {
        assigned = true;
        while (buffer.length) {
          var cbs = buffer;
          buffer = [];
          cbs.forEach(cb);
        }
        buffer = {
          push: function(x) {
            return cb(x);
          },
          filter: function() {
            return buffer;
          }
        };
      },
      assignMedium: function(cb) {
        assigned = true;
        var pendingQueue = [];
        if (buffer.length) {
          var cbs = buffer;
          buffer = [];
          cbs.forEach(cb);
          pendingQueue = buffer;
        }
        var executeQueue = function() {
          var cbs2 = pendingQueue;
          pendingQueue = [];
          cbs2.forEach(cb);
        };
        var cycle = function() {
          return Promise.resolve().then(executeQueue);
        };
        cycle();
        buffer = {
          push: function(x) {
            pendingQueue.push(x);
            cycle();
          },
          filter: function(filter) {
            pendingQueue = pendingQueue.filter(filter);
            return buffer;
          }
        };
      }
    };
    return medium;
  }
  function createSidecarMedium(options) {
    if (options === void 0) {
      options = {};
    }
    var medium = innerCreateMedium(null);
    medium.options = __assign({ async: true, ssr: false }, options);
    return medium;
  }

  // node_modules/use-sidecar/dist/es2015/exports.js
  init_ds_inject_react();
  var React37 = __toESM(require_ds_react());
  var SideCar = function(_a2) {
    var sideCar = _a2.sideCar, rest = __rest(_a2, ["sideCar"]);
    if (!sideCar) {
      throw new Error("Sidecar: please provide `sideCar` property to import the right car");
    }
    var Target = sideCar.read();
    if (!Target) {
      throw new Error("Sidecar medium not found");
    }
    return React37.createElement(Target, __assign({}, rest));
  };
  SideCar.isSideCarExport = true;
  function exportSidecar(medium, exported) {
    medium.useMedium(exported);
    return SideCar;
  }

  // node_modules/react-remove-scroll/dist/es2015/medium.js
  var effectCar = createSidecarMedium();

  // node_modules/react-remove-scroll/dist/es2015/UI.js
  var nothing = function() {
    return;
  };
  var RemoveScroll = React38.forwardRef(function(props, parentRef) {
    var ref = React38.useRef(null);
    var _a2 = React38.useState({
      onScrollCapture: nothing,
      onWheelCapture: nothing,
      onTouchMoveCapture: nothing
    }), callbacks = _a2[0], setCallbacks = _a2[1];
    var forwardProps = props.forwardProps, children = props.children, className = props.className, removeScrollBar = props.removeScrollBar, enabled = props.enabled, shards = props.shards, sideCar = props.sideCar, noRelative = props.noRelative, noIsolation = props.noIsolation, inert = props.inert, allowPinchZoom = props.allowPinchZoom, _b = props.as, Container2 = _b === void 0 ? "div" : _b, gapMode = props.gapMode, rest = __rest(props, ["forwardProps", "children", "className", "removeScrollBar", "enabled", "shards", "sideCar", "noRelative", "noIsolation", "inert", "allowPinchZoom", "as", "gapMode"]);
    var SideCar2 = sideCar;
    var containerRef = useMergeRefs([ref, parentRef]);
    var containerProps = __assign(__assign({}, rest), callbacks);
    return React38.createElement(
      React38.Fragment,
      null,
      enabled && React38.createElement(SideCar2, { sideCar: effectCar, removeScrollBar, shards, noRelative, noIsolation, inert, setCallbacks, allowPinchZoom: !!allowPinchZoom, lockRef: ref, gapMode }),
      forwardProps ? React38.cloneElement(React38.Children.only(children), __assign(__assign({}, containerProps), { ref: containerRef })) : React38.createElement(Container2, __assign({}, containerProps, { className, ref: containerRef }), children)
    );
  });
  RemoveScroll.defaultProps = {
    enabled: true,
    removeScrollBar: true,
    inert: false
  };
  RemoveScroll.classNames = {
    fullWidth: fullWidthClassName,
    zeroRight: zeroRightClassName
  };

  // node_modules/react-remove-scroll/dist/es2015/sidecar.js
  init_ds_inject_react();

  // node_modules/react-remove-scroll/dist/es2015/SideEffect.js
  init_ds_inject_react();
  var React41 = __toESM(require_ds_react());

  // node_modules/react-remove-scroll-bar/dist/es2015/index.js
  init_ds_inject_react();

  // node_modules/react-remove-scroll-bar/dist/es2015/component.js
  init_ds_inject_react();
  var React40 = __toESM(require_ds_react());

  // node_modules/react-style-singleton/dist/es2015/index.js
  init_ds_inject_react();

  // node_modules/react-style-singleton/dist/es2015/component.js
  init_ds_inject_react();

  // node_modules/react-style-singleton/dist/es2015/hook.js
  init_ds_inject_react();
  var React39 = __toESM(require_ds_react());

  // node_modules/react-style-singleton/dist/es2015/singleton.js
  init_ds_inject_react();

  // node_modules/get-nonce/dist/es2015/index.js
  init_ds_inject_react();
  var currentNonce;
  var getNonce = function() {
    if (currentNonce) {
      return currentNonce;
    }
    if (typeof __webpack_nonce__ !== "undefined") {
      return __webpack_nonce__;
    }
    return void 0;
  };

  // node_modules/react-style-singleton/dist/es2015/singleton.js
  function makeStyleTag() {
    if (!document)
      return null;
    var tag = document.createElement("style");
    tag.type = "text/css";
    var nonce = getNonce();
    if (nonce) {
      tag.setAttribute("nonce", nonce);
    }
    return tag;
  }
  function injectStyles(tag, css) {
    if (tag.styleSheet) {
      tag.styleSheet.cssText = css;
    } else {
      tag.appendChild(document.createTextNode(css));
    }
  }
  function insertStyleTag(tag) {
    var head = document.head || document.getElementsByTagName("head")[0];
    head.appendChild(tag);
  }
  var stylesheetSingleton = function() {
    var counter = 0;
    var stylesheet = null;
    return {
      add: function(style) {
        if (counter == 0) {
          if (stylesheet = makeStyleTag()) {
            injectStyles(stylesheet, style);
            insertStyleTag(stylesheet);
          }
        }
        counter++;
      },
      remove: function() {
        counter--;
        if (!counter && stylesheet) {
          stylesheet.parentNode && stylesheet.parentNode.removeChild(stylesheet);
          stylesheet = null;
        }
      }
    };
  };

  // node_modules/react-style-singleton/dist/es2015/hook.js
  var styleHookSingleton = function() {
    var sheet = stylesheetSingleton();
    return function(styles, isDynamic) {
      React39.useEffect(function() {
        sheet.add(styles);
        return function() {
          sheet.remove();
        };
      }, [styles && isDynamic]);
    };
  };

  // node_modules/react-style-singleton/dist/es2015/component.js
  var styleSingleton = function() {
    var useStyle = styleHookSingleton();
    var Sheet = function(_a2) {
      var styles = _a2.styles, dynamic = _a2.dynamic;
      useStyle(styles, dynamic);
      return null;
    };
    return Sheet;
  };

  // node_modules/react-remove-scroll-bar/dist/es2015/utils.js
  init_ds_inject_react();
  var zeroGap = {
    left: 0,
    top: 0,
    right: 0,
    gap: 0
  };
  var parse = function(x) {
    return parseInt(x || "", 10) || 0;
  };
  var getOffset = function(gapMode) {
    var cs = window.getComputedStyle(document.body);
    var left = cs[gapMode === "padding" ? "paddingLeft" : "marginLeft"];
    var top = cs[gapMode === "padding" ? "paddingTop" : "marginTop"];
    var right = cs[gapMode === "padding" ? "paddingRight" : "marginRight"];
    return [parse(left), parse(top), parse(right)];
  };
  var getGapWidth = function(gapMode) {
    if (gapMode === void 0) {
      gapMode = "margin";
    }
    if (typeof window === "undefined") {
      return zeroGap;
    }
    var offsets = getOffset(gapMode);
    var documentWidth = document.documentElement.clientWidth;
    var windowWidth = window.innerWidth;
    return {
      left: offsets[0],
      top: offsets[1],
      right: offsets[2],
      gap: Math.max(0, windowWidth - documentWidth + offsets[2] - offsets[0])
    };
  };

  // node_modules/react-remove-scroll-bar/dist/es2015/component.js
  var Style = styleSingleton();
  var lockAttribute = "data-scroll-locked";
  var getStyles = function(_a2, allowRelative, gapMode, important) {
    var left = _a2.left, top = _a2.top, right = _a2.right, gap = _a2.gap;
    if (gapMode === void 0) {
      gapMode = "margin";
    }
    return "\n  .".concat(noScrollbarsClassName, " {\n   overflow: hidden ").concat(important, ";\n   padding-right: ").concat(gap, "px ").concat(important, ";\n  }\n  body[").concat(lockAttribute, "] {\n    overflow: hidden ").concat(important, ";\n    overscroll-behavior: contain;\n    ").concat([
      allowRelative && "position: relative ".concat(important, ";"),
      gapMode === "margin" && "\n    padding-left: ".concat(left, "px;\n    padding-top: ").concat(top, "px;\n    padding-right: ").concat(right, "px;\n    margin-left:0;\n    margin-top:0;\n    margin-right: ").concat(gap, "px ").concat(important, ";\n    "),
      gapMode === "padding" && "padding-right: ".concat(gap, "px ").concat(important, ";")
    ].filter(Boolean).join(""), "\n  }\n  \n  .").concat(zeroRightClassName, " {\n    right: ").concat(gap, "px ").concat(important, ";\n  }\n  \n  .").concat(fullWidthClassName, " {\n    margin-right: ").concat(gap, "px ").concat(important, ";\n  }\n  \n  .").concat(zeroRightClassName, " .").concat(zeroRightClassName, " {\n    right: 0 ").concat(important, ";\n  }\n  \n  .").concat(fullWidthClassName, " .").concat(fullWidthClassName, " {\n    margin-right: 0 ").concat(important, ";\n  }\n  \n  body[").concat(lockAttribute, "] {\n    ").concat(removedBarSizeVariable, ": ").concat(gap, "px;\n  }\n");
  };
  var getCurrentUseCounter = function() {
    var counter = parseInt(document.body.getAttribute(lockAttribute) || "0", 10);
    return isFinite(counter) ? counter : 0;
  };
  var useLockAttribute = function() {
    React40.useEffect(function() {
      document.body.setAttribute(lockAttribute, (getCurrentUseCounter() + 1).toString());
      return function() {
        var newCounter = getCurrentUseCounter() - 1;
        if (newCounter <= 0) {
          document.body.removeAttribute(lockAttribute);
        } else {
          document.body.setAttribute(lockAttribute, newCounter.toString());
        }
      };
    }, []);
  };
  var RemoveScrollBar = function(_a2) {
    var noRelative = _a2.noRelative, noImportant = _a2.noImportant, _b = _a2.gapMode, gapMode = _b === void 0 ? "margin" : _b;
    useLockAttribute();
    var gap = React40.useMemo(function() {
      return getGapWidth(gapMode);
    }, [gapMode]);
    return React40.createElement(Style, { styles: getStyles(gap, !noRelative, gapMode, !noImportant ? "!important" : "") });
  };

  // node_modules/react-remove-scroll/dist/es2015/aggresiveCapture.js
  init_ds_inject_react();
  var passiveSupported = false;
  if (typeof window !== "undefined") {
    try {
      options = Object.defineProperty({}, "passive", {
        get: function() {
          passiveSupported = true;
          return true;
        }
      });
      window.addEventListener("test", options, options);
      window.removeEventListener("test", options, options);
    } catch (err) {
      passiveSupported = false;
    }
  }
  var options;
  var nonPassive = passiveSupported ? { passive: false } : false;

  // node_modules/react-remove-scroll/dist/es2015/handleScroll.js
  init_ds_inject_react();
  var alwaysContainsScroll = function(node) {
    return node.tagName === "TEXTAREA";
  };
  var elementCanBeScrolled = function(node, overflow) {
    if (!(node instanceof Element)) {
      return false;
    }
    var styles = window.getComputedStyle(node);
    return (
      // not-not-scrollable
      styles[overflow] !== "hidden" && // contains scroll inside self
      !(styles.overflowY === styles.overflowX && !alwaysContainsScroll(node) && styles[overflow] === "visible")
    );
  };
  var elementCouldBeVScrolled = function(node) {
    return elementCanBeScrolled(node, "overflowY");
  };
  var elementCouldBeHScrolled = function(node) {
    return elementCanBeScrolled(node, "overflowX");
  };
  var locationCouldBeScrolled = function(axis, node) {
    var ownerDocument = node.ownerDocument;
    var current = node;
    do {
      if (typeof ShadowRoot !== "undefined" && current instanceof ShadowRoot) {
        current = current.host;
      }
      var isScrollable = elementCouldBeScrolled(axis, current);
      if (isScrollable) {
        var _a2 = getScrollVariables(axis, current), scrollHeight = _a2[1], clientHeight = _a2[2];
        if (scrollHeight > clientHeight) {
          return true;
        }
      }
      current = current.parentNode;
    } while (current && current !== ownerDocument.body);
    return false;
  };
  var getVScrollVariables = function(_a2) {
    var scrollTop = _a2.scrollTop, scrollHeight = _a2.scrollHeight, clientHeight = _a2.clientHeight;
    return [
      scrollTop,
      scrollHeight,
      clientHeight
    ];
  };
  var getHScrollVariables = function(_a2) {
    var scrollLeft = _a2.scrollLeft, scrollWidth = _a2.scrollWidth, clientWidth = _a2.clientWidth;
    return [
      scrollLeft,
      scrollWidth,
      clientWidth
    ];
  };
  var elementCouldBeScrolled = function(axis, node) {
    return axis === "v" ? elementCouldBeVScrolled(node) : elementCouldBeHScrolled(node);
  };
  var getScrollVariables = function(axis, node) {
    return axis === "v" ? getVScrollVariables(node) : getHScrollVariables(node);
  };
  var getDirectionFactor = function(axis, direction) {
    return axis === "h" && direction === "rtl" ? -1 : 1;
  };
  var handleScroll = function(axis, endTarget, event, sourceDelta, noOverscroll) {
    var directionFactor = getDirectionFactor(axis, window.getComputedStyle(endTarget).direction);
    var delta = directionFactor * sourceDelta;
    var target = event.target;
    var targetInLock = endTarget.contains(target);
    var shouldCancelScroll = false;
    var isDeltaPositive = delta > 0;
    var availableScroll = 0;
    var availableScrollTop = 0;
    do {
      if (!target) {
        break;
      }
      var _a2 = getScrollVariables(axis, target), position = _a2[0], scroll_1 = _a2[1], capacity = _a2[2];
      var elementScroll = scroll_1 - capacity - directionFactor * position;
      if (position || elementScroll) {
        if (elementCouldBeScrolled(axis, target)) {
          availableScroll += elementScroll;
          availableScrollTop += position;
        }
      }
      var parent_1 = target.parentNode;
      target = parent_1 && parent_1.nodeType === Node.DOCUMENT_FRAGMENT_NODE ? parent_1.host : parent_1;
    } while (
      // portaled content
      !targetInLock && target !== document.body || // self content
      targetInLock && (endTarget.contains(target) || endTarget === target)
    );
    if (isDeltaPositive && (noOverscroll && Math.abs(availableScroll) < 1 || !noOverscroll && delta > availableScroll)) {
      shouldCancelScroll = true;
    } else if (!isDeltaPositive && (noOverscroll && Math.abs(availableScrollTop) < 1 || !noOverscroll && -delta > availableScrollTop)) {
      shouldCancelScroll = true;
    }
    return shouldCancelScroll;
  };

  // node_modules/react-remove-scroll/dist/es2015/SideEffect.js
  var getTouchXY = function(event) {
    return "changedTouches" in event ? [event.changedTouches[0].clientX, event.changedTouches[0].clientY] : [0, 0];
  };
  var getDeltaXY = function(event) {
    return [event.deltaX, event.deltaY];
  };
  var extractRef = function(ref) {
    return ref && "current" in ref ? ref.current : ref;
  };
  var deltaCompare = function(x, y) {
    return x[0] === y[0] && x[1] === y[1];
  };
  var generateStyle = function(id) {
    return "\n  .block-interactivity-".concat(id, " {pointer-events: none;}\n  .allow-interactivity-").concat(id, " {pointer-events: all;}\n");
  };
  var idCounter = 0;
  var lockStack = [];
  function RemoveScrollSideCar(props) {
    var shouldPreventQueue = React41.useRef([]);
    var touchStartRef = React41.useRef([0, 0]);
    var activeAxis = React41.useRef();
    var id = React41.useState(idCounter++)[0];
    var Style2 = React41.useState(styleSingleton)[0];
    var lastProps = React41.useRef(props);
    React41.useEffect(function() {
      lastProps.current = props;
    }, [props]);
    React41.useEffect(function() {
      if (props.inert) {
        document.body.classList.add("block-interactivity-".concat(id));
        var allow_1 = __spreadArray([props.lockRef.current], (props.shards || []).map(extractRef), true).filter(Boolean);
        allow_1.forEach(function(el) {
          return el.classList.add("allow-interactivity-".concat(id));
        });
        return function() {
          document.body.classList.remove("block-interactivity-".concat(id));
          allow_1.forEach(function(el) {
            return el.classList.remove("allow-interactivity-".concat(id));
          });
        };
      }
      return;
    }, [props.inert, props.lockRef.current, props.shards]);
    var shouldCancelEvent = React41.useCallback(function(event, parent) {
      if ("touches" in event && event.touches.length === 2 || event.type === "wheel" && event.ctrlKey) {
        return !lastProps.current.allowPinchZoom;
      }
      var touch = getTouchXY(event);
      var touchStart = touchStartRef.current;
      var deltaX = "deltaX" in event ? event.deltaX : touchStart[0] - touch[0];
      var deltaY = "deltaY" in event ? event.deltaY : touchStart[1] - touch[1];
      var currentAxis;
      var target = event.target;
      var moveDirection = Math.abs(deltaX) > Math.abs(deltaY) ? "h" : "v";
      if ("touches" in event && moveDirection === "h" && target.type === "range") {
        return false;
      }
      var selection = window.getSelection();
      var anchorNode = selection && selection.anchorNode;
      var isTouchingSelection = anchorNode ? anchorNode === target || anchorNode.contains(target) : false;
      if (isTouchingSelection) {
        return false;
      }
      var canBeScrolledInMainDirection = locationCouldBeScrolled(moveDirection, target);
      if (!canBeScrolledInMainDirection) {
        return true;
      }
      if (canBeScrolledInMainDirection) {
        currentAxis = moveDirection;
      } else {
        currentAxis = moveDirection === "v" ? "h" : "v";
        canBeScrolledInMainDirection = locationCouldBeScrolled(moveDirection, target);
      }
      if (!canBeScrolledInMainDirection) {
        return false;
      }
      if (!activeAxis.current && "changedTouches" in event && (deltaX || deltaY)) {
        activeAxis.current = currentAxis;
      }
      if (!currentAxis) {
        return true;
      }
      var cancelingAxis = activeAxis.current || currentAxis;
      return handleScroll(cancelingAxis, parent, event, cancelingAxis === "h" ? deltaX : deltaY, true);
    }, []);
    var shouldPrevent = React41.useCallback(function(_event) {
      var event = _event;
      if (!lockStack.length || lockStack[lockStack.length - 1] !== Style2) {
        return;
      }
      var delta = "deltaY" in event ? getDeltaXY(event) : getTouchXY(event);
      var sourceEvent = shouldPreventQueue.current.filter(function(e) {
        return e.name === event.type && (e.target === event.target || event.target === e.shadowParent) && deltaCompare(e.delta, delta);
      })[0];
      if (sourceEvent && sourceEvent.should) {
        if (event.cancelable) {
          event.preventDefault();
        }
        return;
      }
      if (!sourceEvent) {
        var shardNodes = (lastProps.current.shards || []).map(extractRef).filter(Boolean).filter(function(node) {
          return node.contains(event.target);
        });
        var shouldStop = shardNodes.length > 0 ? shouldCancelEvent(event, shardNodes[0]) : !lastProps.current.noIsolation;
        if (shouldStop) {
          if (event.cancelable) {
            event.preventDefault();
          }
        }
      }
    }, []);
    var shouldCancel = React41.useCallback(function(name, delta, target, should) {
      var event = { name, delta, target, should, shadowParent: getOutermostShadowParent(target) };
      shouldPreventQueue.current.push(event);
      setTimeout(function() {
        shouldPreventQueue.current = shouldPreventQueue.current.filter(function(e) {
          return e !== event;
        });
      }, 1);
    }, []);
    var scrollTouchStart = React41.useCallback(function(event) {
      touchStartRef.current = getTouchXY(event);
      activeAxis.current = void 0;
    }, []);
    var scrollWheel = React41.useCallback(function(event) {
      shouldCancel(event.type, getDeltaXY(event), event.target, shouldCancelEvent(event, props.lockRef.current));
    }, []);
    var scrollTouchMove = React41.useCallback(function(event) {
      shouldCancel(event.type, getTouchXY(event), event.target, shouldCancelEvent(event, props.lockRef.current));
    }, []);
    React41.useEffect(function() {
      lockStack.push(Style2);
      props.setCallbacks({
        onScrollCapture: scrollWheel,
        onWheelCapture: scrollWheel,
        onTouchMoveCapture: scrollTouchMove
      });
      document.addEventListener("wheel", shouldPrevent, nonPassive);
      document.addEventListener("touchmove", shouldPrevent, nonPassive);
      document.addEventListener("touchstart", scrollTouchStart, nonPassive);
      return function() {
        lockStack = lockStack.filter(function(inst) {
          return inst !== Style2;
        });
        document.removeEventListener("wheel", shouldPrevent, nonPassive);
        document.removeEventListener("touchmove", shouldPrevent, nonPassive);
        document.removeEventListener("touchstart", scrollTouchStart, nonPassive);
      };
    }, []);
    var removeScrollBar = props.removeScrollBar, inert = props.inert;
    return React41.createElement(
      React41.Fragment,
      null,
      inert ? React41.createElement(Style2, { styles: generateStyle(id) }) : null,
      removeScrollBar ? React41.createElement(RemoveScrollBar, { noRelative: props.noRelative, gapMode: props.gapMode }) : null
    );
  }
  function getOutermostShadowParent(node) {
    var shadowParent = null;
    while (node !== null) {
      if (node instanceof ShadowRoot) {
        shadowParent = node.host;
        node = node.host;
      }
      node = node.parentNode;
    }
    return shadowParent;
  }

  // node_modules/react-remove-scroll/dist/es2015/sidecar.js
  var sidecar_default = exportSidecar(effectCar, RemoveScrollSideCar);

  // node_modules/react-remove-scroll/dist/es2015/Combination.js
  var ReactRemoveScroll = React42.forwardRef(function(props, ref) {
    return React42.createElement(RemoveScroll, __assign({}, props, { ref, sideCar: sidecar_default }));
  });
  ReactRemoveScroll.classNames = RemoveScroll.classNames;
  var Combination_default = ReactRemoveScroll;

  // node_modules/aria-hidden/dist/es2015/index.js
  init_ds_inject_react();
  var getDefaultParent = function(originalTarget) {
    if (typeof document === "undefined") {
      return null;
    }
    var sampleTarget = Array.isArray(originalTarget) ? originalTarget[0] : originalTarget;
    return sampleTarget.ownerDocument.body;
  };
  var counterMap = /* @__PURE__ */ new WeakMap();
  var uncontrolledNodes = /* @__PURE__ */ new WeakMap();
  var markerMap = {};
  var lockCount = 0;
  var unwrapHost = function(node) {
    return node && (node.host || unwrapHost(node.parentNode));
  };
  var correctTargets = function(parent, targets) {
    return targets.map(function(target) {
      if (parent.contains(target)) {
        return target;
      }
      var correctedTarget = unwrapHost(target);
      if (correctedTarget && parent.contains(correctedTarget)) {
        return correctedTarget;
      }
      console.error("aria-hidden", target, "in not contained inside", parent, ". Doing nothing");
      return null;
    }).filter(function(x) {
      return Boolean(x);
    });
  };
  var applyAttributeToOthers = function(originalTarget, parentNode, markerName, controlAttribute) {
    var targets = correctTargets(parentNode, Array.isArray(originalTarget) ? originalTarget : [originalTarget]);
    if (!markerMap[markerName]) {
      markerMap[markerName] = /* @__PURE__ */ new WeakMap();
    }
    var markerCounter = markerMap[markerName];
    var hiddenNodes = [];
    var elementsToKeep = /* @__PURE__ */ new Set();
    var elementsToStop = new Set(targets);
    var keep = function(el) {
      if (!el || elementsToKeep.has(el)) {
        return;
      }
      elementsToKeep.add(el);
      keep(el.parentNode);
    };
    targets.forEach(keep);
    var deep = function(parent) {
      if (!parent || elementsToStop.has(parent)) {
        return;
      }
      Array.prototype.forEach.call(parent.children, function(node) {
        if (elementsToKeep.has(node)) {
          deep(node);
        } else {
          try {
            var attr = node.getAttribute(controlAttribute);
            var alreadyHidden = attr !== null && attr !== "false";
            var counterValue = (counterMap.get(node) || 0) + 1;
            var markerValue = (markerCounter.get(node) || 0) + 1;
            counterMap.set(node, counterValue);
            markerCounter.set(node, markerValue);
            hiddenNodes.push(node);
            if (counterValue === 1 && alreadyHidden) {
              uncontrolledNodes.set(node, true);
            }
            if (markerValue === 1) {
              node.setAttribute(markerName, "true");
            }
            if (!alreadyHidden) {
              node.setAttribute(controlAttribute, "true");
            }
          } catch (e) {
            console.error("aria-hidden: cannot operate on ", node, e);
          }
        }
      });
    };
    deep(parentNode);
    elementsToKeep.clear();
    lockCount++;
    return function() {
      hiddenNodes.forEach(function(node) {
        var counterValue = counterMap.get(node) - 1;
        var markerValue = markerCounter.get(node) - 1;
        counterMap.set(node, counterValue);
        markerCounter.set(node, markerValue);
        if (!counterValue) {
          if (!uncontrolledNodes.has(node)) {
            node.removeAttribute(controlAttribute);
          }
          uncontrolledNodes.delete(node);
        }
        if (!markerValue) {
          node.removeAttribute(markerName);
        }
      });
      lockCount--;
      if (!lockCount) {
        counterMap = /* @__PURE__ */ new WeakMap();
        counterMap = /* @__PURE__ */ new WeakMap();
        uncontrolledNodes = /* @__PURE__ */ new WeakMap();
        markerMap = {};
      }
    };
  };
  var hideOthers = function(originalTarget, parentNode, markerName) {
    if (markerName === void 0) {
      markerName = "data-aria-hidden";
    }
    var targets = Array.from(Array.isArray(originalTarget) ? originalTarget : [originalTarget]);
    var activeParentNode = parentNode || getDefaultParent(originalTarget);
    if (!activeParentNode) {
      return function() {
        return null;
      };
    }
    targets.push.apply(targets, Array.from(activeParentNode.querySelectorAll("[aria-live], script")));
    return applyAttributeToOthers(targets, activeParentNode, markerName, "aria-hidden");
  };

  // node_modules/@radix-ui/react-dialog/dist/index.mjs
  var import_jsx_runtime10 = __toESM(require_ds_jsx_runtime(), 1);
  var __defProp19 = Object.defineProperty;
  var __name18 = (target, value) => __defProp19(target, "name", { value, configurable: true });
  var DIALOG_NAME = "Dialog";
  var [createDialogContext, createDialogScope] = createContextScope(DIALOG_NAME);
  var [DialogProvider, useDialogContext] = createDialogContext(DIALOG_NAME);
  var Dialog = /* @__PURE__ */ __name18((props) => {
    const {
      __scopeDialog,
      children,
      open: openProp,
      defaultOpen,
      onOpenChange,
      modal = true
    } = props;
    const triggerRef = React43.useRef(null);
    const contentRef = React43.useRef(null);
    const [open, setOpen] = useControllableState({
      prop: openProp,
      defaultProp: defaultOpen ?? false,
      onChange: onOpenChange,
      caller: DIALOG_NAME
    });
    const [titleCount, setTitleCount] = React43.useState(0);
    const [descriptionCount, setDescriptionCount] = React43.useState(0);
    return /* @__PURE__ */ (0, import_jsx_runtime10.jsx)(
      DialogProvider,
      {
        scope: __scopeDialog,
        triggerRef,
        contentRef,
        contentId: useId2(),
        titleId: useId2(),
        descriptionId: useId2(),
        titlePresent: titleCount > 0,
        descriptionPresent: descriptionCount > 0,
        setTitleCount,
        setDescriptionCount,
        open,
        onOpenChange: setOpen,
        onOpenToggle: React43.useCallback(() => setOpen((prevOpen) => !prevOpen), [setOpen]),
        modal,
        children
      }
    );
  }, "Dialog");
  var TRIGGER_NAME = "DialogTrigger";
  var DialogTrigger = /* @__PURE__ */ React43.forwardRef(
    /* @__PURE__ */ __name18(function DialogTrigger2(props, forwardedRef) {
      const { __scopeDialog, ...triggerProps } = props;
      const context = useDialogContext(TRIGGER_NAME, __scopeDialog);
      const composedTriggerRef = useComposedRefs(forwardedRef, context.triggerRef);
      return /* @__PURE__ */ (0, import_jsx_runtime10.jsx)(
        Primitive.button,
        {
          type: "button",
          "aria-haspopup": "dialog",
          "aria-expanded": context.open,
          "aria-controls": context.open ? context.contentId : void 0,
          "data-state": getState(context.open),
          ...triggerProps,
          ref: composedTriggerRef,
          onClick: composeEventHandlers(props.onClick, context.onOpenToggle)
        }
      );
    }, "DialogTrigger")
  );
  var PORTAL_NAME = "DialogPortal";
  var [PortalProvider, usePortalContext] = createDialogContext(PORTAL_NAME, {
    forceMount: void 0
  });
  var DialogPortal = /* @__PURE__ */ __name18((props) => {
    const { __scopeDialog, forceMount, children, container } = props;
    const context = useDialogContext(PORTAL_NAME, __scopeDialog);
    return /* @__PURE__ */ (0, import_jsx_runtime10.jsx)(PortalProvider, { scope: __scopeDialog, forceMount, children: React43.Children.map(children, (child) => /* @__PURE__ */ (0, import_jsx_runtime10.jsx)(Presence, { present: forceMount || context.open, children: /* @__PURE__ */ (0, import_jsx_runtime10.jsx)(Portal, { asChild: true, container, children: child }) })) });
  }, "DialogPortal");
  var OVERLAY_NAME = "DialogOverlay";
  var DialogOverlay = /* @__PURE__ */ React43.forwardRef(
    /* @__PURE__ */ __name18(function DialogOverlay2(props, forwardedRef) {
      const portalContext = usePortalContext(OVERLAY_NAME, props.__scopeDialog);
      const { forceMount = portalContext.forceMount, ...overlayProps } = props;
      const context = useDialogContext(OVERLAY_NAME, props.__scopeDialog);
      return context.modal ? /* @__PURE__ */ (0, import_jsx_runtime10.jsx)(Presence, { present: forceMount || context.open, children: /* @__PURE__ */ (0, import_jsx_runtime10.jsx)(DialogOverlayImpl, { ...overlayProps, ref: forwardedRef }) }) : null;
    }, "DialogOverlay")
  );
  var Slot = createSlot("DialogOverlay.RemoveScroll");
  var DialogOverlayImpl = /* @__PURE__ */ React43.forwardRef(
    // blank line to reduce diff noise
    /* @__PURE__ */ __name18(function DialogOverlayImpl2(props, forwardedRef) {
      const { __scopeDialog, ...overlayProps } = props;
      const context = useDialogContext(OVERLAY_NAME, __scopeDialog);
      const registerDismissableSurface = useDismissableLayerSurface();
      const composedRefs = useComposedRefs(forwardedRef, registerDismissableSurface);
      return (
        // Make sure `Content` is scrollable even when it doesn't live inside `RemoveScroll`
        // ie. when `Overlay` and `Content` are siblings
        /* @__PURE__ */ (0, import_jsx_runtime10.jsx)(Combination_default, { as: Slot, allowPinchZoom: true, shards: [context.contentRef], children: /* @__PURE__ */ (0, import_jsx_runtime10.jsx)(
          Primitive.div,
          {
            "data-state": getState(context.open),
            ...overlayProps,
            ref: composedRefs,
            style: { pointerEvents: "auto", ...overlayProps.style }
          }
        ) })
      );
    }, "DialogOverlayImpl")
  );
  var CONTENT_NAME = "DialogContent";
  var DialogContent = /* @__PURE__ */ React43.forwardRef(
    /* @__PURE__ */ __name18(function DialogContent2(props, forwardedRef) {
      const portalContext = usePortalContext(CONTENT_NAME, props.__scopeDialog);
      const { forceMount = portalContext.forceMount, ...contentProps } = props;
      const context = useDialogContext(CONTENT_NAME, props.__scopeDialog);
      return /* @__PURE__ */ (0, import_jsx_runtime10.jsx)(Presence, { present: forceMount || context.open, children: context.modal ? /* @__PURE__ */ (0, import_jsx_runtime10.jsx)(DialogContentModal, { ...contentProps, ref: forwardedRef }) : /* @__PURE__ */ (0, import_jsx_runtime10.jsx)(DialogContentNonModal, { ...contentProps, ref: forwardedRef }) });
    }, "DialogContent")
  );
  var DialogContentModal = /* @__PURE__ */ React43.forwardRef(
    // blank line to reduce diff noise
    /* @__PURE__ */ __name18(function DialogContentModal2(props, forwardedRef) {
      const context = useDialogContext(CONTENT_NAME, props.__scopeDialog);
      const contentRef = React43.useRef(null);
      const composedRefs = useComposedRefs(forwardedRef, context.contentRef, contentRef);
      React43.useEffect(() => {
        const content = contentRef.current;
        if (content) return hideOthers(content);
      }, []);
      return /* @__PURE__ */ (0, import_jsx_runtime10.jsx)(
        DialogContentImpl,
        {
          ...props,
          ref: composedRefs,
          trapFocus: context.open,
          disableOutsidePointerEvents: context.open,
          onCloseAutoFocus: composeEventHandlers(props.onCloseAutoFocus, (event) => {
            event.preventDefault();
            context.triggerRef.current?.focus();
          }),
          onPointerDownOutside: composeEventHandlers(props.onPointerDownOutside, (event) => {
            const originalEvent = event.detail.originalEvent;
            const ctrlLeftClick = originalEvent.button === 0 && originalEvent.ctrlKey === true;
            const isRightClick = originalEvent.button === 2 || ctrlLeftClick;
            if (isRightClick) event.preventDefault();
          }),
          onFocusOutside: composeEventHandlers(
            props.onFocusOutside,
            (event) => event.preventDefault()
          )
        }
      );
    }, "DialogContentModal")
  );
  var DialogContentNonModal = /* @__PURE__ */ React43.forwardRef(
    // blank line to reduce diff noise
    /* @__PURE__ */ __name18(function DialogContentNonModal2(props, forwardedRef) {
      const context = useDialogContext(CONTENT_NAME, props.__scopeDialog);
      const hasInteractedOutsideRef = React43.useRef(false);
      const hasPointerDownOutsideRef = React43.useRef(false);
      return /* @__PURE__ */ (0, import_jsx_runtime10.jsx)(
        DialogContentImpl,
        {
          ...props,
          ref: forwardedRef,
          trapFocus: false,
          disableOutsidePointerEvents: false,
          onCloseAutoFocus: (event) => {
            props.onCloseAutoFocus?.(event);
            if (!event.defaultPrevented) {
              if (!hasInteractedOutsideRef.current) context.triggerRef.current?.focus();
              event.preventDefault();
            }
            hasInteractedOutsideRef.current = false;
            hasPointerDownOutsideRef.current = false;
          },
          onInteractOutside: (event) => {
            props.onInteractOutside?.(event);
            if (!event.defaultPrevented) {
              hasInteractedOutsideRef.current = true;
              if (event.detail.originalEvent.type === "pointerdown") {
                hasPointerDownOutsideRef.current = true;
              }
            }
            const target = event.target;
            const targetIsTrigger = context.triggerRef.current?.contains(target);
            if (targetIsTrigger) event.preventDefault();
            if (event.detail.originalEvent.type === "focusin" && hasPointerDownOutsideRef.current) {
              event.preventDefault();
            }
          }
        }
      );
    }, "DialogContentNonModal")
  );
  var DialogContentImpl = /* @__PURE__ */ React43.forwardRef(
    // blank line to reduce diff noise
    /* @__PURE__ */ __name18(function DialogContentImpl2(props, forwardedRef) {
      const { __scopeDialog, trapFocus, onOpenAutoFocus, onCloseAutoFocus, ...contentProps } = props;
      const context = useDialogContext(CONTENT_NAME, __scopeDialog);
      useFocusGuards();
      return /* @__PURE__ */ (0, import_jsx_runtime10.jsx)(import_jsx_runtime10.Fragment, { children: /* @__PURE__ */ (0, import_jsx_runtime10.jsx)(
        FocusScope,
        {
          asChild: true,
          loop: true,
          trapped: trapFocus,
          onMountAutoFocus: onOpenAutoFocus,
          onUnmountAutoFocus: onCloseAutoFocus,
          children: /* @__PURE__ */ (0, import_jsx_runtime10.jsx)(
            DismissableLayer,
            {
              role: "dialog",
              id: context.contentId,
              "aria-describedby": context.descriptionPresent ? context.descriptionId : void 0,
              "aria-labelledby": context.titlePresent ? context.titleId : void 0,
              "data-state": getState(context.open),
              ...contentProps,
              ref: forwardedRef,
              deferPointerDownOutside: true,
              onDismiss: () => context.onOpenChange(false)
            }
          )
        }
      ) });
    }, "DialogContentImpl")
  );
  var TITLE_NAME = "DialogTitle";
  var DialogTitle = /* @__PURE__ */ React43.forwardRef(
    /* @__PURE__ */ __name18(function DialogTitle2(props, forwardedRef) {
      const { __scopeDialog, ...titleProps } = props;
      const context = useDialogContext(TITLE_NAME, __scopeDialog);
      const { setTitleCount } = context;
      useLayoutEffect2(() => {
        setTitleCount((count3) => count3 + 1);
        return () => setTitleCount((count3) => count3 - 1);
      }, [setTitleCount]);
      return /* @__PURE__ */ (0, import_jsx_runtime10.jsx)(Primitive.h2, { id: context.titleId, ...titleProps, ref: forwardedRef });
    }, "DialogTitle")
  );
  var DESCRIPTION_NAME = "DialogDescription";
  var DialogDescription = /* @__PURE__ */ React43.forwardRef(
    // blank line to reduce diff noise
    /* @__PURE__ */ __name18(function DialogDescription2(props, forwardedRef) {
      const { __scopeDialog, ...descriptionProps } = props;
      const context = useDialogContext(DESCRIPTION_NAME, __scopeDialog);
      const { setDescriptionCount } = context;
      useLayoutEffect2(() => {
        setDescriptionCount((count3) => count3 + 1);
        return () => setDescriptionCount((count3) => count3 - 1);
      }, [setDescriptionCount]);
      return /* @__PURE__ */ (0, import_jsx_runtime10.jsx)(Primitive.p, { id: context.descriptionId, ...descriptionProps, ref: forwardedRef });
    }, "DialogDescription")
  );
  var CLOSE_NAME = "DialogClose";
  var DialogClose = /* @__PURE__ */ React43.forwardRef(
    /* @__PURE__ */ __name18(function DialogClose2(props, forwardedRef) {
      const { __scopeDialog, ...closeProps } = props;
      const context = useDialogContext(CLOSE_NAME, __scopeDialog);
      return /* @__PURE__ */ (0, import_jsx_runtime10.jsx)(
        Primitive.button,
        {
          type: "button",
          ...closeProps,
          ref: forwardedRef,
          onClick: composeEventHandlers(props.onClick, () => context.onOpenChange(false))
        }
      );
    }, "DialogClose")
  );
  var WarningProvider = /* @__PURE__ */ __name18((props) => {
    return props.children;
  }, "WarningProvider");
  function getState(open) {
    return open ? "open" : "closed";
  }
  __name18(getState, "getState");

  // node_modules/@radix-ui/react-use-size/dist/index.mjs
  init_ds_inject_react();
  var React44 = __toESM(require_ds_react(), 1);
  var __defProp20 = Object.defineProperty;
  var __name19 = (target, value) => __defProp20(target, "name", { value, configurable: true });
  function useSize(element) {
    const [size4, setSize] = React44.useState(void 0);
    useLayoutEffect2(() => {
      if (element) {
        setSize({ width: element.offsetWidth, height: element.offsetHeight });
        const resizeObserver = new ResizeObserver((entries) => {
          if (!Array.isArray(entries)) {
            return;
          }
          if (!entries.length) {
            return;
          }
          const entry = entries[0];
          let width;
          let height;
          if ("borderBoxSize" in entry) {
            const borderSizeEntry = entry["borderBoxSize"];
            const borderSize = Array.isArray(borderSizeEntry) ? borderSizeEntry[0] : borderSizeEntry;
            width = borderSize["inlineSize"];
            height = borderSize["blockSize"];
          } else {
            width = element.offsetWidth;
            height = element.offsetHeight;
          }
          setSize({ width, height });
        });
        resizeObserver.observe(element, { box: "border-box" });
        return () => resizeObserver.unobserve(element);
      } else {
        setSize(void 0);
      }
    }, [element]);
    return size4;
  }
  __name19(useSize, "useSize");

  // node_modules/@radix-ui/react-menu/dist/index.mjs
  init_ds_inject_react();
  var React50 = __toESM(require_ds_react(), 1);

  // node_modules/@radix-ui/react-popper/dist/index.mjs
  init_ds_inject_react();
  var React47 = __toESM(require_ds_react(), 1);

  // node_modules/@floating-ui/react-dom/dist/floating-ui.react-dom.mjs
  init_ds_inject_react();

  // node_modules/@floating-ui/dom/dist/floating-ui.dom.mjs
  init_ds_inject_react();

  // node_modules/@floating-ui/core/dist/floating-ui.core.mjs
  init_ds_inject_react();

  // node_modules/@floating-ui/utils/dist/floating-ui.utils.mjs
  init_ds_inject_react();
  var sides = ["top", "right", "bottom", "left"];
  var min = Math.min;
  var max = Math.max;
  var round = Math.round;
  var floor = Math.floor;
  var createCoords = (v) => ({
    x: v,
    y: v
  });
  var oppositeSideMap = {
    left: "right",
    right: "left",
    bottom: "top",
    top: "bottom"
  };
  function clamp(start, value, end) {
    return max(start, min(value, end));
  }
  function evaluate(value, param) {
    return typeof value === "function" ? value(param) : value;
  }
  function getSide(placement) {
    return placement.split("-")[0];
  }
  function getAlignment(placement) {
    return placement.split("-")[1];
  }
  function getOppositeAxis(axis) {
    return axis === "x" ? "y" : "x";
  }
  function getAxisLength(axis) {
    return axis === "y" ? "height" : "width";
  }
  function getSideAxis(placement) {
    const firstChar = placement[0];
    return firstChar === "t" || firstChar === "b" ? "y" : "x";
  }
  function getAlignmentAxis(placement) {
    return getOppositeAxis(getSideAxis(placement));
  }
  function getAlignmentSides(placement, rects, rtl) {
    if (rtl === void 0) {
      rtl = false;
    }
    const alignment = getAlignment(placement);
    const alignmentAxis = getAlignmentAxis(placement);
    const length = getAxisLength(alignmentAxis);
    let mainAlignmentSide = alignmentAxis === "x" ? alignment === (rtl ? "end" : "start") ? "right" : "left" : alignment === "start" ? "bottom" : "top";
    if (rects.reference[length] > rects.floating[length]) {
      mainAlignmentSide = getOppositePlacement(mainAlignmentSide);
    }
    return [mainAlignmentSide, getOppositePlacement(mainAlignmentSide)];
  }
  function getExpandedPlacements(placement) {
    const oppositePlacement = getOppositePlacement(placement);
    return [getOppositeAlignmentPlacement(placement), oppositePlacement, getOppositeAlignmentPlacement(oppositePlacement)];
  }
  function getOppositeAlignmentPlacement(placement) {
    return placement.includes("start") ? placement.replace("start", "end") : placement.replace("end", "start");
  }
  var lrPlacement = ["left", "right"];
  var rlPlacement = ["right", "left"];
  var tbPlacement = ["top", "bottom"];
  var btPlacement = ["bottom", "top"];
  function getSideList(side, isStart, rtl) {
    switch (side) {
      case "top":
      case "bottom":
        if (rtl) return isStart ? rlPlacement : lrPlacement;
        return isStart ? lrPlacement : rlPlacement;
      case "left":
      case "right":
        return isStart ? tbPlacement : btPlacement;
      default:
        return [];
    }
  }
  function getOppositeAxisPlacements(placement, flipAlignment, direction, rtl) {
    const alignment = getAlignment(placement);
    let list = getSideList(getSide(placement), direction === "start", rtl);
    if (alignment) {
      list = list.map((side) => side + "-" + alignment);
      if (flipAlignment) {
        list = list.concat(list.map(getOppositeAlignmentPlacement));
      }
    }
    return list;
  }
  function getOppositePlacement(placement) {
    const side = getSide(placement);
    return oppositeSideMap[side] + placement.slice(side.length);
  }
  function expandPaddingObject(padding) {
    var _padding$top, _padding$right, _padding$bottom, _padding$left;
    return {
      top: (_padding$top = padding.top) != null ? _padding$top : 0,
      right: (_padding$right = padding.right) != null ? _padding$right : 0,
      bottom: (_padding$bottom = padding.bottom) != null ? _padding$bottom : 0,
      left: (_padding$left = padding.left) != null ? _padding$left : 0
    };
  }
  function getPaddingObject(padding) {
    return typeof padding !== "number" ? expandPaddingObject(padding) : {
      top: padding,
      right: padding,
      bottom: padding,
      left: padding
    };
  }
  function rectToClientRect(rect) {
    const {
      x,
      y,
      width,
      height
    } = rect;
    return {
      width,
      height,
      top: y,
      left: x,
      right: x + width,
      bottom: y + height,
      x,
      y
    };
  }

  // node_modules/@floating-ui/core/dist/floating-ui.core.mjs
  function computeCoordsFromPlacement(_ref, placement, rtl) {
    let {
      reference,
      floating
    } = _ref;
    const sideAxis = getSideAxis(placement);
    const alignmentAxis = getAlignmentAxis(placement);
    const alignLength = getAxisLength(alignmentAxis);
    const side = getSide(placement);
    const isVertical = sideAxis === "y";
    const commonX = reference.x + reference.width / 2 - floating.width / 2;
    const commonY = reference.y + reference.height / 2 - floating.height / 2;
    const commonAlign = reference[alignLength] / 2 - floating[alignLength] / 2;
    let coords;
    switch (side) {
      case "top":
        coords = {
          x: commonX,
          y: reference.y - floating.height
        };
        break;
      case "bottom":
        coords = {
          x: commonX,
          y: reference.y + reference.height
        };
        break;
      case "right":
        coords = {
          x: reference.x + reference.width,
          y: commonY
        };
        break;
      case "left":
        coords = {
          x: reference.x - floating.width,
          y: commonY
        };
        break;
      default:
        coords = {
          x: reference.x,
          y: reference.y
        };
    }
    const alignment = getAlignment(placement);
    if (alignment) {
      coords[alignmentAxis] += commonAlign * (alignment === "end" ? 1 : -1) * (rtl && isVertical ? -1 : 1);
    }
    return coords;
  }
  async function detectOverflow(state, options) {
    var _await$platform$isEle;
    if (options === void 0) {
      options = {};
    }
    const {
      x,
      y,
      platform: platform2,
      rects,
      elements,
      strategy
    } = state;
    const {
      boundary = "clippingAncestors",
      rootBoundary = "viewport",
      elementContext = "floating",
      altBoundary = false,
      padding = 0
    } = evaluate(options, state);
    const paddingObject = getPaddingObject(padding);
    const altContext = elementContext === "floating" ? "reference" : "floating";
    const element = elements[altBoundary ? altContext : elementContext];
    const clippingClientRect = rectToClientRect(await platform2.getClippingRect({
      element: ((_await$platform$isEle = await (platform2.isElement == null ? void 0 : platform2.isElement(element))) != null ? _await$platform$isEle : true) ? element : element.contextElement || await (platform2.getDocumentElement == null ? void 0 : platform2.getDocumentElement(elements.floating)),
      boundary,
      rootBoundary,
      strategy
    }));
    const rect = elementContext === "floating" ? {
      x,
      y,
      width: rects.floating.width,
      height: rects.floating.height
    } : rects.reference;
    const offsetParent = await (platform2.getOffsetParent == null ? void 0 : platform2.getOffsetParent(elements.floating));
    const offsetScale = await (platform2.isElement == null ? void 0 : platform2.isElement(offsetParent)) && await (platform2.getScale == null ? void 0 : platform2.getScale(offsetParent)) || {
      x: 1,
      y: 1
    };
    const elementClientRect = rectToClientRect(platform2.convertOffsetParentRelativeRectToViewportRelativeRect ? await platform2.convertOffsetParentRelativeRectToViewportRelativeRect({
      elements,
      rect,
      offsetParent,
      strategy
    }) : rect);
    return {
      top: (clippingClientRect.top - elementClientRect.top + paddingObject.top) / offsetScale.y,
      bottom: (elementClientRect.bottom - clippingClientRect.bottom + paddingObject.bottom) / offsetScale.y,
      left: (clippingClientRect.left - elementClientRect.left + paddingObject.left) / offsetScale.x,
      right: (elementClientRect.right - clippingClientRect.right + paddingObject.right) / offsetScale.x
    };
  }
  var MAX_RESET_COUNT = 50;
  var computePosition = async (reference, floating, config) => {
    const {
      placement = "bottom",
      strategy = "absolute",
      middleware = [],
      platform: platform2
    } = config;
    const platformWithDetectOverflow = platform2.detectOverflow ? platform2 : {
      ...platform2,
      detectOverflow
    };
    const rtl = await (platform2.isRTL == null ? void 0 : platform2.isRTL(floating));
    let rects = await platform2.getElementRects({
      reference,
      floating,
      strategy
    });
    let {
      x,
      y
    } = computeCoordsFromPlacement(rects, placement, rtl);
    let statefulPlacement = placement;
    let resetCount = 0;
    const middlewareData = {};
    for (let i = 0; i < middleware.length; i++) {
      const currentMiddleware = middleware[i];
      if (!currentMiddleware) {
        continue;
      }
      const {
        name,
        fn
      } = currentMiddleware;
      const {
        x: nextX,
        y: nextY,
        data,
        reset
      } = await fn({
        x,
        y,
        initialPlacement: placement,
        placement: statefulPlacement,
        strategy,
        middlewareData,
        rects,
        platform: platformWithDetectOverflow,
        elements: {
          reference,
          floating
        }
      });
      x = nextX != null ? nextX : x;
      y = nextY != null ? nextY : y;
      middlewareData[name] = {
        ...middlewareData[name],
        ...data
      };
      if (reset && resetCount < MAX_RESET_COUNT) {
        resetCount++;
        if (typeof reset === "object") {
          if (reset.placement) {
            statefulPlacement = reset.placement;
          }
          if (reset.rects) {
            rects = reset.rects === true ? await platform2.getElementRects({
              reference,
              floating,
              strategy
            }) : reset.rects;
          }
          ({
            x,
            y
          } = computeCoordsFromPlacement(rects, statefulPlacement, rtl));
        }
        i = -1;
      }
    }
    return {
      x,
      y,
      placement: statefulPlacement,
      strategy,
      middlewareData
    };
  };
  var arrow = (options) => ({
    name: "arrow",
    options,
    async fn(state) {
      const {
        x,
        y,
        placement,
        rects,
        platform: platform2,
        elements,
        middlewareData
      } = state;
      const {
        element,
        padding = 0
      } = evaluate(options, state) || {};
      if (element == null) {
        return {};
      }
      const paddingObject = getPaddingObject(padding);
      const coords = {
        x,
        y
      };
      const axis = getAlignmentAxis(placement);
      const length = getAxisLength(axis);
      const arrowDimensions = await platform2.getDimensions(element);
      const isYAxis = axis === "y";
      const minProp = isYAxis ? "top" : "left";
      const maxProp = isYAxis ? "bottom" : "right";
      const clientProp = isYAxis ? "clientHeight" : "clientWidth";
      const endDiff = rects.reference[length] + rects.reference[axis] - coords[axis] - rects.floating[length];
      const startDiff = coords[axis] - rects.reference[axis];
      const arrowOffsetParent = await (platform2.getOffsetParent == null ? void 0 : platform2.getOffsetParent(element));
      let clientSize = arrowOffsetParent ? arrowOffsetParent[clientProp] : 0;
      if (!clientSize || !await (platform2.isElement == null ? void 0 : platform2.isElement(arrowOffsetParent))) {
        clientSize = elements.floating[clientProp] || rects.floating[length];
      }
      const centerToReference = endDiff / 2 - startDiff / 2;
      const largestPossiblePadding = clientSize / 2 - arrowDimensions[length] / 2 - 1;
      const minPadding = min(paddingObject[minProp], largestPossiblePadding);
      const maxPadding = min(paddingObject[maxProp], largestPossiblePadding);
      const max2 = clientSize - arrowDimensions[length] - maxPadding;
      const center = clientSize / 2 - arrowDimensions[length] / 2 + centerToReference;
      const offset4 = clamp(minPadding, center, max2);
      const shouldAddOffset = !middlewareData.arrow && getAlignment(placement) != null && center !== offset4 && rects.reference[length] / 2 - (center < minPadding ? minPadding : maxPadding) - arrowDimensions[length] / 2 < 0;
      const alignmentOffset = shouldAddOffset ? center < minPadding ? center - minPadding : center - max2 : 0;
      return {
        [axis]: coords[axis] + alignmentOffset,
        data: {
          [axis]: offset4,
          centerOffset: center - offset4 - alignmentOffset,
          ...shouldAddOffset && {
            alignmentOffset
          }
        },
        reset: shouldAddOffset
      };
    }
  });
  var flip = function(options) {
    if (options === void 0) {
      options = {};
    }
    return {
      name: "flip",
      options,
      async fn(state) {
        var _middlewareData$arrow, _middlewareData$flip;
        const {
          placement,
          middlewareData,
          rects,
          initialPlacement,
          platform: platform2,
          elements
        } = state;
        const {
          mainAxis: checkMainAxis = true,
          crossAxis: checkCrossAxis = true,
          fallbackPlacements: specifiedFallbackPlacements,
          fallbackStrategy = "bestFit",
          fallbackAxisSideDirection = "none",
          flipAlignment = true,
          ...detectOverflowOptions
        } = evaluate(options, state);
        if ((_middlewareData$arrow = middlewareData.arrow) != null && _middlewareData$arrow.alignmentOffset) {
          return {};
        }
        const side = getSide(placement);
        const initialSideAxis = getSideAxis(initialPlacement);
        const isBasePlacement = getSide(initialPlacement) === initialPlacement;
        const rtl = await (platform2.isRTL == null ? void 0 : platform2.isRTL(elements.floating));
        const fallbackPlacements = specifiedFallbackPlacements || (isBasePlacement || !flipAlignment ? [getOppositePlacement(initialPlacement)] : getExpandedPlacements(initialPlacement));
        const hasFallbackAxisSideDirection = fallbackAxisSideDirection !== "none";
        if (!specifiedFallbackPlacements && hasFallbackAxisSideDirection) {
          fallbackPlacements.push(...getOppositeAxisPlacements(initialPlacement, flipAlignment, fallbackAxisSideDirection, rtl));
        }
        const placements2 = [initialPlacement, ...fallbackPlacements];
        const overflow = await platform2.detectOverflow(state, detectOverflowOptions);
        const overflows = [];
        let overflowsData = ((_middlewareData$flip = middlewareData.flip) == null ? void 0 : _middlewareData$flip.overflows) || [];
        if (checkMainAxis) {
          overflows.push(overflow[side]);
        }
        if (checkCrossAxis) {
          const sides2 = getAlignmentSides(placement, rects, rtl);
          overflows.push(overflow[sides2[0]], overflow[sides2[1]]);
        }
        overflowsData = [...overflowsData, {
          placement,
          overflows
        }];
        if (!overflows.every((side2) => side2 <= 0)) {
          var _middlewareData$flip2, _overflowsData$filter;
          const nextIndex = (((_middlewareData$flip2 = middlewareData.flip) == null ? void 0 : _middlewareData$flip2.index) || 0) + 1;
          const nextPlacement = placements2[nextIndex];
          if (nextPlacement) {
            const ignoreCrossAxisOverflow = checkCrossAxis === "alignment" ? initialSideAxis !== getSideAxis(nextPlacement) : false;
            if (!ignoreCrossAxisOverflow || // We leave the current main axis only if every placement on that axis
            // overflows the main axis.
            overflowsData.every((d) => getSideAxis(d.placement) === initialSideAxis ? d.overflows[0] > 0 : true)) {
              return {
                data: {
                  index: nextIndex,
                  overflows: overflowsData
                },
                reset: {
                  placement: nextPlacement
                }
              };
            }
          }
          let resetPlacement = (_overflowsData$filter = overflowsData.filter((d) => d.overflows[0] <= 0).sort((a, b) => a.overflows[1] - b.overflows[1])[0]) == null ? void 0 : _overflowsData$filter.placement;
          if (!resetPlacement) {
            switch (fallbackStrategy) {
              case "bestFit": {
                var _overflowsData$filter2;
                const placement2 = (_overflowsData$filter2 = overflowsData.filter((d) => {
                  if (hasFallbackAxisSideDirection) {
                    const currentSideAxis = getSideAxis(d.placement);
                    return currentSideAxis === initialSideAxis || // Create a bias to the `y` side axis due to horizontal
                    // reading directions favoring greater width.
                    currentSideAxis === "y";
                  }
                  return true;
                }).map((d) => [d.placement, d.overflows.filter((overflow2) => overflow2 > 0).reduce((acc, overflow2) => acc + overflow2, 0)]).sort((a, b) => a[1] - b[1])[0]) == null ? void 0 : _overflowsData$filter2[0];
                if (placement2) {
                  resetPlacement = placement2;
                }
                break;
              }
              case "initialPlacement":
                resetPlacement = initialPlacement;
                break;
            }
          }
          if (placement !== resetPlacement) {
            return {
              reset: {
                placement: resetPlacement
              }
            };
          }
        }
        return {};
      }
    };
  };
  function getSideOffsets(overflow, rect) {
    return {
      top: overflow.top - rect.height,
      right: overflow.right - rect.width,
      bottom: overflow.bottom - rect.height,
      left: overflow.left - rect.width
    };
  }
  function isAnySideFullyClipped(overflow) {
    return sides.some((side) => overflow[side] >= 0);
  }
  var hide = function(options) {
    if (options === void 0) {
      options = {};
    }
    return {
      name: "hide",
      options,
      async fn(state) {
        const {
          rects,
          platform: platform2
        } = state;
        const {
          strategy = "referenceHidden",
          ...detectOverflowOptions
        } = evaluate(options, state);
        switch (strategy) {
          case "referenceHidden": {
            const overflow = await platform2.detectOverflow(state, {
              ...detectOverflowOptions,
              elementContext: "reference"
            });
            const offsets = getSideOffsets(overflow, rects.reference);
            return {
              data: {
                referenceHiddenOffsets: offsets,
                referenceHidden: isAnySideFullyClipped(offsets)
              }
            };
          }
          case "escaped": {
            const overflow = await platform2.detectOverflow(state, {
              ...detectOverflowOptions,
              altBoundary: true
            });
            const offsets = getSideOffsets(overflow, rects.floating);
            return {
              data: {
                escapedOffsets: offsets,
                escaped: isAnySideFullyClipped(offsets)
              }
            };
          }
          default: {
            return {};
          }
        }
      }
    };
  };
  var originSides = /* @__PURE__ */ new Set(["left", "top"]);
  async function convertValueToCoords(state, options) {
    const {
      placement,
      platform: platform2,
      elements
    } = state;
    const rtl = await (platform2.isRTL == null ? void 0 : platform2.isRTL(elements.floating));
    const side = getSide(placement);
    const alignment = getAlignment(placement);
    const isVertical = getSideAxis(placement) === "y";
    const mainAxisMulti = originSides.has(side) ? -1 : 1;
    const crossAxisMulti = rtl && isVertical ? -1 : 1;
    const rawValue = evaluate(options, state);
    let {
      mainAxis,
      crossAxis,
      alignmentAxis
    } = typeof rawValue === "number" ? {
      mainAxis: rawValue,
      crossAxis: 0,
      alignmentAxis: null
    } : {
      mainAxis: rawValue.mainAxis || 0,
      crossAxis: rawValue.crossAxis || 0,
      alignmentAxis: rawValue.alignmentAxis
    };
    if (alignment && typeof alignmentAxis === "number") {
      crossAxis = alignment === "end" ? alignmentAxis * -1 : alignmentAxis;
    }
    return isVertical ? {
      x: crossAxis * crossAxisMulti,
      y: mainAxis * mainAxisMulti
    } : {
      x: mainAxis * mainAxisMulti,
      y: crossAxis * crossAxisMulti
    };
  }
  var offset = function(options) {
    if (options === void 0) {
      options = 0;
    }
    return {
      name: "offset",
      options,
      async fn(state) {
        var _middlewareData$offse, _middlewareData$arrow;
        const {
          x,
          y,
          placement,
          middlewareData
        } = state;
        const diffCoords = await convertValueToCoords(state, options);
        if (placement === ((_middlewareData$offse = middlewareData.offset) == null ? void 0 : _middlewareData$offse.placement) && (_middlewareData$arrow = middlewareData.arrow) != null && _middlewareData$arrow.alignmentOffset) {
          return {};
        }
        return {
          x: x + diffCoords.x,
          y: y + diffCoords.y,
          data: {
            ...diffCoords,
            placement
          }
        };
      }
    };
  };
  var shift = function(options) {
    if (options === void 0) {
      options = {};
    }
    return {
      name: "shift",
      options,
      async fn(state) {
        const {
          x,
          y,
          placement,
          platform: platform2
        } = state;
        const {
          mainAxis: checkMainAxis = true,
          crossAxis: checkCrossAxis = false,
          limiter = {
            fn: (_ref) => {
              let {
                x: x2,
                y: y2
              } = _ref;
              return {
                x: x2,
                y: y2
              };
            }
          },
          ...detectOverflowOptions
        } = evaluate(options, state);
        const coords = {
          x,
          y
        };
        const overflow = await platform2.detectOverflow(state, detectOverflowOptions);
        const crossAxis = getSideAxis(placement);
        const mainAxis = getOppositeAxis(crossAxis);
        let mainAxisCoord = coords[mainAxis];
        let crossAxisCoord = coords[crossAxis];
        const clampCoord = (axis, coord) => clamp(coord + overflow[axis === "y" ? "top" : "left"], coord, coord - overflow[axis === "y" ? "bottom" : "right"]);
        if (checkMainAxis) {
          mainAxisCoord = clampCoord(mainAxis, mainAxisCoord);
        }
        if (checkCrossAxis) {
          crossAxisCoord = clampCoord(crossAxis, crossAxisCoord);
        }
        const limitedCoords = limiter.fn({
          ...state,
          [mainAxis]: mainAxisCoord,
          [crossAxis]: crossAxisCoord
        });
        return {
          ...limitedCoords,
          data: {
            x: limitedCoords.x - x,
            y: limitedCoords.y - y,
            enabled: {
              [mainAxis]: checkMainAxis,
              [crossAxis]: checkCrossAxis
            }
          }
        };
      }
    };
  };
  var limitShift = function(options) {
    if (options === void 0) {
      options = {};
    }
    return {
      options,
      fn(state) {
        var _rawOffset$mainAxis, _rawOffset$crossAxis;
        const {
          x,
          y,
          placement,
          rects,
          middlewareData
        } = state;
        const {
          offset: offset4 = 0,
          mainAxis: checkMainAxis = true,
          crossAxis: checkCrossAxis = true
        } = evaluate(options, state);
        const coords = {
          x,
          y
        };
        const crossAxis = getSideAxis(placement);
        const mainAxis = getOppositeAxis(crossAxis);
        let mainAxisCoord = coords[mainAxis];
        let crossAxisCoord = coords[crossAxis];
        const rawOffset = evaluate(offset4, state);
        const computedOffset = typeof rawOffset === "number" ? {
          mainAxis: rawOffset,
          crossAxis: 0
        } : {
          mainAxis: (_rawOffset$mainAxis = rawOffset.mainAxis) != null ? _rawOffset$mainAxis : 0,
          crossAxis: (_rawOffset$crossAxis = rawOffset.crossAxis) != null ? _rawOffset$crossAxis : 0
        };
        if (checkMainAxis) {
          const len = mainAxis === "y" ? "height" : "width";
          const limitMin = rects.reference[mainAxis] - rects.floating[len] + computedOffset.mainAxis;
          const limitMax = rects.reference[mainAxis] + rects.reference[len] - computedOffset.mainAxis;
          if (mainAxisCoord < limitMin) {
            mainAxisCoord = limitMin;
          } else if (mainAxisCoord > limitMax) {
            mainAxisCoord = limitMax;
          }
        }
        if (checkCrossAxis) {
          var _middlewareData$offse, _middlewareData$offse2;
          const len = mainAxis === "y" ? "width" : "height";
          const isOriginSide = originSides.has(getSide(placement));
          const limitMin = rects.reference[crossAxis] - rects.floating[len] + (isOriginSide ? ((_middlewareData$offse = middlewareData.offset) == null ? void 0 : _middlewareData$offse[crossAxis]) || 0 : 0) + (isOriginSide ? 0 : computedOffset.crossAxis);
          const limitMax = rects.reference[crossAxis] + rects.reference[len] + (isOriginSide ? 0 : ((_middlewareData$offse2 = middlewareData.offset) == null ? void 0 : _middlewareData$offse2[crossAxis]) || 0) - (isOriginSide ? computedOffset.crossAxis : 0);
          if (crossAxisCoord < limitMin) {
            crossAxisCoord = limitMin;
          } else if (crossAxisCoord > limitMax) {
            crossAxisCoord = limitMax;
          }
        }
        return {
          [mainAxis]: mainAxisCoord,
          [crossAxis]: crossAxisCoord
        };
      }
    };
  };
  var size = function(options) {
    if (options === void 0) {
      options = {};
    }
    return {
      name: "size",
      options,
      async fn(state) {
        const {
          placement,
          rects,
          platform: platform2,
          elements
        } = state;
        const {
          apply = () => {
          },
          ...detectOverflowOptions
        } = evaluate(options, state);
        const overflow = await platform2.detectOverflow(state, detectOverflowOptions);
        const side = getSide(placement);
        const alignment = getAlignment(placement);
        const isYAxis = getSideAxis(placement) === "y";
        const {
          width,
          height
        } = rects.floating;
        let heightSide;
        let widthSide;
        if (side === "top" || side === "bottom") {
          heightSide = side;
          widthSide = alignment === (await (platform2.isRTL == null ? void 0 : platform2.isRTL(elements.floating)) ? "start" : "end") ? "left" : "right";
        } else {
          widthSide = side;
          heightSide = alignment === "end" ? "top" : "bottom";
        }
        const maximumClippingHeight = height - overflow.top - overflow.bottom;
        const maximumClippingWidth = width - overflow.left - overflow.right;
        const overflowAvailableHeight = min(height - overflow[heightSide], maximumClippingHeight);
        const overflowAvailableWidth = min(width - overflow[widthSide], maximumClippingWidth);
        const shiftData = state.middlewareData.shift;
        const noShift = !shiftData;
        let availableHeight = overflowAvailableHeight;
        let availableWidth = overflowAvailableWidth;
        if (shiftData != null && shiftData.enabled.x) {
          availableWidth = maximumClippingWidth;
        }
        if (shiftData != null && shiftData.enabled.y) {
          availableHeight = maximumClippingHeight;
        }
        if (noShift && !alignment) {
          if (isYAxis) {
            availableWidth = width - 2 * max(overflow.left, overflow.right);
          } else {
            availableHeight = height - 2 * max(overflow.top, overflow.bottom);
          }
        }
        await apply({
          ...state,
          availableWidth,
          availableHeight
        });
        const nextDimensions = await platform2.getDimensions(elements.floating);
        if (width !== nextDimensions.width || height !== nextDimensions.height) {
          return {
            reset: {
              rects: true
            }
          };
        }
        return {};
      }
    };
  };

  // node_modules/@floating-ui/utils/dist/floating-ui.utils.dom.mjs
  init_ds_inject_react();
  function hasWindow() {
    return typeof window !== "undefined";
  }
  function getNodeName(node) {
    if (isNode(node)) {
      return (node.nodeName || "").toLowerCase();
    }
    return "#document";
  }
  function getWindow(node) {
    var _node$ownerDocument;
    return (node == null || (_node$ownerDocument = node.ownerDocument) == null ? void 0 : _node$ownerDocument.defaultView) || window;
  }
  function getDocumentElement(node) {
    var _ref;
    return (_ref = (isNode(node) ? node.ownerDocument : node.document) || window.document) == null ? void 0 : _ref.documentElement;
  }
  function isNode(value) {
    if (!hasWindow()) {
      return false;
    }
    return value instanceof Node || value instanceof getWindow(value).Node;
  }
  function isElement(value) {
    if (!hasWindow()) {
      return false;
    }
    return value instanceof Element || value instanceof getWindow(value).Element;
  }
  function isHTMLElement(value) {
    if (!hasWindow()) {
      return false;
    }
    return value instanceof HTMLElement || value instanceof getWindow(value).HTMLElement;
  }
  function isShadowRoot(value) {
    if (!hasWindow() || typeof ShadowRoot === "undefined") {
      return false;
    }
    return value instanceof ShadowRoot || value instanceof getWindow(value).ShadowRoot;
  }
  function isOverflowElement(element) {
    const {
      overflow,
      overflowX,
      overflowY,
      display
    } = getComputedStyle2(element);
    return /auto|scroll|overlay|hidden|clip/.test(overflow + overflowY + overflowX) && display !== "inline" && display !== "contents";
  }
  function isTableElement(element) {
    return /^(table|td|th)$/.test(getNodeName(element));
  }
  function isTopLayer(element) {
    try {
      if (element.matches(":popover-open")) {
        return true;
      }
    } catch (_e) {
    }
    try {
      return element.matches(":modal");
    } catch (_e) {
      return false;
    }
  }
  var willChangeRe = /transform|translate|scale|rotate|perspective|filter/;
  var containRe = /paint|layout|strict|content/;
  var isNotNone = (value) => !!value && value !== "none";
  var isWebKitValue;
  function isContainingBlock(elementOrCss) {
    const css = isElement(elementOrCss) ? getComputedStyle2(elementOrCss) : elementOrCss;
    return isNotNone(css.transform) || isNotNone(css.translate) || isNotNone(css.scale) || isNotNone(css.rotate) || isNotNone(css.perspective) || !isWebKit() && (isNotNone(css.backdropFilter) || isNotNone(css.filter)) || willChangeRe.test(css.willChange || "") || containRe.test(css.contain || "");
  }
  function getContainingBlock(element) {
    let currentNode = getParentNode(element);
    while (isHTMLElement(currentNode) && !isLastTraversableNode(currentNode)) {
      if (isContainingBlock(currentNode)) {
        return currentNode;
      } else if (isTopLayer(currentNode)) {
        return null;
      }
      currentNode = getParentNode(currentNode);
    }
    return null;
  }
  function isWebKit() {
    if (isWebKitValue == null) {
      isWebKitValue = typeof CSS !== "undefined" && CSS.supports && CSS.supports("-webkit-backdrop-filter", "none");
    }
    return isWebKitValue;
  }
  function isLastTraversableNode(node) {
    return /^(html|body|#document)$/.test(getNodeName(node));
  }
  function getComputedStyle2(element) {
    return getWindow(element).getComputedStyle(element);
  }
  function getNodeScroll(element) {
    if (isElement(element)) {
      return {
        scrollLeft: element.scrollLeft,
        scrollTop: element.scrollTop
      };
    }
    return {
      scrollLeft: element.scrollX,
      scrollTop: element.scrollY
    };
  }
  function getParentNode(node) {
    if (getNodeName(node) === "html") {
      return node;
    }
    const result = (
      // Step into the shadow DOM of the parent of a slotted node.
      node.assignedSlot || // DOM Element detected.
      node.parentNode || // ShadowRoot detected.
      isShadowRoot(node) && node.host || // Fallback.
      getDocumentElement(node)
    );
    return isShadowRoot(result) ? result.host : result;
  }
  function getNearestOverflowAncestor(node) {
    const parentNode = getParentNode(node);
    if (isLastTraversableNode(parentNode)) {
      return (node.ownerDocument || node).body;
    }
    if (isHTMLElement(parentNode) && isOverflowElement(parentNode)) {
      return parentNode;
    }
    return getNearestOverflowAncestor(parentNode);
  }
  function getOverflowAncestors(node, list, traverseIframes) {
    var _node$ownerDocument2;
    if (list === void 0) {
      list = [];
    }
    if (traverseIframes === void 0) {
      traverseIframes = true;
    }
    const scrollableAncestor = getNearestOverflowAncestor(node);
    const isBody = scrollableAncestor === ((_node$ownerDocument2 = node.ownerDocument) == null ? void 0 : _node$ownerDocument2.body);
    const win = getWindow(scrollableAncestor);
    if (isBody) {
      const frameElement = getFrameElement(win);
      return list.concat(win, win.visualViewport || [], isOverflowElement(scrollableAncestor) ? scrollableAncestor : [], frameElement && traverseIframes ? getOverflowAncestors(frameElement) : []);
    } else {
      return list.concat(scrollableAncestor, getOverflowAncestors(scrollableAncestor, [], traverseIframes));
    }
  }
  function getFrameElement(win) {
    return win.parent && Object.getPrototypeOf(win.parent) ? win.frameElement : null;
  }

  // node_modules/@floating-ui/dom/dist/floating-ui.dom.mjs
  function getCssDimensions(element) {
    const css = getComputedStyle2(element);
    let width = parseFloat(css.width) || 0;
    let height = parseFloat(css.height) || 0;
    const hasOffset = isHTMLElement(element);
    const offsetWidth = hasOffset ? element.offsetWidth : width;
    const offsetHeight = hasOffset ? element.offsetHeight : height;
    const shouldFallback = round(width) !== offsetWidth || round(height) !== offsetHeight;
    if (shouldFallback) {
      width = offsetWidth;
      height = offsetHeight;
    }
    return {
      width,
      height,
      $: shouldFallback
    };
  }
  function unwrapElement(element) {
    return !isElement(element) ? element.contextElement : element;
  }
  function getScale(element) {
    const domElement = unwrapElement(element);
    if (!isHTMLElement(domElement)) {
      return createCoords(1);
    }
    const rect = domElement.getBoundingClientRect();
    const {
      width,
      height,
      $
    } = getCssDimensions(domElement);
    let x = ($ ? round(rect.width) : rect.width) / width;
    let y = ($ ? round(rect.height) : rect.height) / height;
    if (!x || !Number.isFinite(x)) {
      x = 1;
    }
    if (!y || !Number.isFinite(y)) {
      y = 1;
    }
    return {
      x,
      y
    };
  }
  var noOffsets = /* @__PURE__ */ createCoords(0);
  function getVisualOffsets(element) {
    const win = getWindow(element);
    if (!isWebKit() || !win.visualViewport) {
      return noOffsets;
    }
    return {
      x: win.visualViewport.offsetLeft,
      y: win.visualViewport.offsetTop
    };
  }
  function shouldAddVisualOffsets(element, isFixed, floatingOffsetParent) {
    if (isFixed === void 0) {
      isFixed = false;
    }
    return !!floatingOffsetParent && isFixed && floatingOffsetParent === getWindow(element);
  }
  function getBoundingClientRect(element, includeScale, isFixedStrategy, offsetParent) {
    if (includeScale === void 0) {
      includeScale = false;
    }
    if (isFixedStrategy === void 0) {
      isFixedStrategy = false;
    }
    const clientRect = element.getBoundingClientRect();
    const domElement = unwrapElement(element);
    let scale = createCoords(1);
    if (includeScale) {
      if (offsetParent) {
        if (isElement(offsetParent)) {
          scale = getScale(offsetParent);
        }
      } else {
        scale = getScale(element);
      }
    }
    const visualOffsets = shouldAddVisualOffsets(domElement, isFixedStrategy, offsetParent) ? getVisualOffsets(domElement) : createCoords(0);
    let x = (clientRect.left + visualOffsets.x) / scale.x;
    let y = (clientRect.top + visualOffsets.y) / scale.y;
    let width = clientRect.width / scale.x;
    let height = clientRect.height / scale.y;
    if (domElement && offsetParent) {
      const win = getWindow(domElement);
      const offsetWin = isElement(offsetParent) ? getWindow(offsetParent) : offsetParent;
      let currentWin = win;
      let currentIFrame = getFrameElement(currentWin);
      while (currentIFrame && offsetWin !== currentWin) {
        const iframeScale = getScale(currentIFrame);
        const iframeRect = currentIFrame.getBoundingClientRect();
        const css = getComputedStyle2(currentIFrame);
        const left = iframeRect.left + (currentIFrame.clientLeft + parseFloat(css.paddingLeft)) * iframeScale.x;
        const top = iframeRect.top + (currentIFrame.clientTop + parseFloat(css.paddingTop)) * iframeScale.y;
        x *= iframeScale.x;
        y *= iframeScale.y;
        width *= iframeScale.x;
        height *= iframeScale.y;
        x += left;
        y += top;
        currentWin = getWindow(currentIFrame);
        currentIFrame = getFrameElement(currentWin);
      }
    }
    return rectToClientRect({
      width,
      height,
      x,
      y
    });
  }
  function getWindowScrollBarX(element, rect) {
    const leftScroll = getNodeScroll(element).scrollLeft;
    if (!rect) {
      return getBoundingClientRect(getDocumentElement(element)).left + leftScroll;
    }
    return rect.left + leftScroll;
  }
  function getHTMLOffset(documentElement, scroll) {
    const htmlRect = documentElement.getBoundingClientRect();
    const x = htmlRect.left + scroll.scrollLeft - getWindowScrollBarX(documentElement, htmlRect);
    const y = htmlRect.top + scroll.scrollTop;
    return {
      x,
      y
    };
  }
  function convertOffsetParentRelativeRectToViewportRelativeRect(_ref) {
    let {
      elements,
      rect,
      offsetParent,
      strategy
    } = _ref;
    const isFixed = strategy === "fixed";
    const documentElement = getDocumentElement(offsetParent);
    const topLayer = elements ? isTopLayer(elements.floating) : false;
    if (offsetParent === documentElement || topLayer && isFixed) {
      return rect;
    }
    let scroll = {
      scrollLeft: 0,
      scrollTop: 0
    };
    let scale = createCoords(1);
    const offsets = createCoords(0);
    const isOffsetParentAnElement = isHTMLElement(offsetParent);
    if (isOffsetParentAnElement || !isFixed) {
      if (getNodeName(offsetParent) !== "body" || isOverflowElement(documentElement)) {
        scroll = getNodeScroll(offsetParent);
      }
      if (isOffsetParentAnElement) {
        const offsetRect = getBoundingClientRect(offsetParent);
        scale = getScale(offsetParent);
        offsets.x = offsetRect.x + offsetParent.clientLeft;
        offsets.y = offsetRect.y + offsetParent.clientTop;
      }
    }
    const htmlOffset = documentElement && !isOffsetParentAnElement && !isFixed ? getHTMLOffset(documentElement, scroll) : createCoords(0);
    return {
      width: rect.width * scale.x,
      height: rect.height * scale.y,
      x: rect.x * scale.x - scroll.scrollLeft * scale.x + offsets.x + htmlOffset.x,
      y: rect.y * scale.y - scroll.scrollTop * scale.y + offsets.y + htmlOffset.y
    };
  }
  function getClientRects(element) {
    return element.getClientRects ? Array.from(element.getClientRects()) : [];
  }
  function getDocumentRect(html) {
    const scroll = getNodeScroll(html);
    const body = html.ownerDocument.body;
    const width = max(html.scrollWidth, html.clientWidth, body.scrollWidth, body.clientWidth);
    const height = max(html.scrollHeight, html.clientHeight, body.scrollHeight, body.clientHeight);
    let x = -scroll.scrollLeft + getWindowScrollBarX(html);
    const y = -scroll.scrollTop;
    if (getComputedStyle2(body).direction === "rtl") {
      x += max(html.clientWidth, body.clientWidth) - width;
    }
    return {
      width,
      height,
      x,
      y
    };
  }
  var SCROLLBAR_MAX = 25;
  function getViewportRect(element, strategy, rootBoundary) {
    if (rootBoundary === void 0) {
      rootBoundary = "viewport";
    }
    const isLayoutViewport = rootBoundary === "layoutViewport";
    const win = getWindow(element);
    const html = getDocumentElement(element);
    const visualViewport = win.visualViewport;
    let width = html.clientWidth;
    let height = html.clientHeight;
    let x = 0;
    let y = 0;
    if (visualViewport) {
      const layoutRelativeClientCoords = !isWebKit() || strategy === "fixed";
      if (isLayoutViewport) {
        if (!layoutRelativeClientCoords) {
          x = -visualViewport.offsetLeft;
          y = -visualViewport.offsetTop;
        }
      } else {
        width = visualViewport.width;
        height = visualViewport.height;
        if (layoutRelativeClientCoords) {
          x = visualViewport.offsetLeft;
          y = visualViewport.offsetTop;
        }
      }
    }
    const windowScrollbarX = getWindowScrollBarX(html);
    if (windowScrollbarX <= 0) {
      const doc = html.ownerDocument;
      const body = doc.body;
      const bodyStyles = getComputedStyle(body);
      const bodyMarginInline = doc.compatMode === "CSS1Compat" ? parseFloat(bodyStyles.marginLeft) + parseFloat(bodyStyles.marginRight) || 0 : 0;
      const reservedWidth = Math.abs(html.clientWidth - body.clientWidth - bodyMarginInline);
      const gutter = getComputedStyle(html).scrollbarGutter === "stable both-edges" ? reservedWidth / 2 : reservedWidth;
      if (gutter <= SCROLLBAR_MAX) {
        width -= gutter;
      }
    }
    return {
      width,
      height,
      x,
      y
    };
  }
  function getInnerBoundingClientRect(element, strategy) {
    const clientRect = getBoundingClientRect(element, true, strategy === "fixed");
    const top = clientRect.top + element.clientTop;
    const left = clientRect.left + element.clientLeft;
    const scale = getScale(element);
    const width = element.clientWidth * scale.x;
    const height = element.clientHeight * scale.y;
    const x = left * scale.x;
    const y = top * scale.y;
    return {
      width,
      height,
      x,
      y
    };
  }
  function getClientRectFromClippingAncestor(element, clippingAncestor, strategy) {
    let rect;
    if (clippingAncestor === "viewport" || clippingAncestor === "layoutViewport") {
      rect = getViewportRect(element, strategy, clippingAncestor);
    } else if (clippingAncestor === "document") {
      rect = getDocumentRect(getDocumentElement(element));
    } else if (isElement(clippingAncestor)) {
      rect = getInnerBoundingClientRect(clippingAncestor, strategy);
    } else {
      const visualOffsets = getVisualOffsets(element);
      rect = {
        x: clippingAncestor.x - visualOffsets.x,
        y: clippingAncestor.y - visualOffsets.y,
        width: clippingAncestor.width,
        height: clippingAncestor.height
      };
    }
    return rectToClientRect(rect);
  }
  function getClippingElementAncestors(element, cache) {
    const cachedResult = cache.get(element);
    if (cachedResult) {
      return cachedResult;
    }
    let result = getOverflowAncestors(element, [], false).filter((el) => isElement(el) && getNodeName(el) !== "body");
    let lastKeptComputedStyle = null;
    const elementIsFixed = getComputedStyle2(element).position === "fixed";
    let currentNode = elementIsFixed ? getParentNode(element) : element;
    while (isElement(currentNode) && !isLastTraversableNode(currentNode)) {
      const computedStyle = getComputedStyle2(currentNode);
      const currentNodeIsContaining = isContainingBlock(currentNode);
      const lastPosition = lastKeptComputedStyle ? lastKeptComputedStyle.position : elementIsFixed ? "fixed" : "";
      const shouldDropCurrentNode = !currentNodeIsContaining && (lastPosition === "fixed" || lastPosition === "absolute" && computedStyle.position === "static");
      if (shouldDropCurrentNode) {
        result = result.filter((ancestor) => ancestor !== currentNode);
      } else {
        lastKeptComputedStyle = computedStyle;
      }
      currentNode = getParentNode(currentNode);
    }
    cache.set(element, result);
    return result;
  }
  function getClippingRect(_ref) {
    let {
      element,
      boundary,
      rootBoundary,
      strategy
    } = _ref;
    const elementClippingAncestors = boundary === "clippingAncestors" ? isTopLayer(element) ? [] : getClippingElementAncestors(element, this._c) : [].concat(boundary);
    const clippingAncestors = [...elementClippingAncestors, rootBoundary];
    const firstRect = getClientRectFromClippingAncestor(element, clippingAncestors[0], strategy);
    let top = firstRect.top;
    let right = firstRect.right;
    let bottom = firstRect.bottom;
    let left = firstRect.left;
    for (let i = 1; i < clippingAncestors.length; i++) {
      const rect = getClientRectFromClippingAncestor(element, clippingAncestors[i], strategy);
      top = max(rect.top, top);
      right = min(rect.right, right);
      bottom = min(rect.bottom, bottom);
      left = max(rect.left, left);
    }
    return {
      width: right - left,
      height: bottom - top,
      x: left,
      y: top
    };
  }
  function getDimensions(element) {
    const {
      width,
      height
    } = getCssDimensions(element);
    return {
      width,
      height
    };
  }
  function getRectRelativeToOffsetParent(element, offsetParent, strategy) {
    const isOffsetParentAnElement = isHTMLElement(offsetParent);
    const documentElement = getDocumentElement(offsetParent);
    const isFixed = strategy === "fixed";
    const rect = getBoundingClientRect(element, true, isFixed, offsetParent);
    let scroll = {
      scrollLeft: 0,
      scrollTop: 0
    };
    const offsets = createCoords(0);
    if (isOffsetParentAnElement || !isFixed) {
      if (getNodeName(offsetParent) !== "body" || isOverflowElement(documentElement)) {
        scroll = getNodeScroll(offsetParent);
      }
      if (isOffsetParentAnElement) {
        const offsetRect = getBoundingClientRect(offsetParent, true, isFixed, offsetParent);
        offsets.x = offsetRect.x + offsetParent.clientLeft;
        offsets.y = offsetRect.y + offsetParent.clientTop;
      }
    }
    if (!isOffsetParentAnElement && documentElement) {
      offsets.x = getWindowScrollBarX(documentElement);
    }
    const htmlOffset = documentElement && !isOffsetParentAnElement && !isFixed ? getHTMLOffset(documentElement, scroll) : createCoords(0);
    const x = rect.left + scroll.scrollLeft - offsets.x - htmlOffset.x;
    const y = rect.top + scroll.scrollTop - offsets.y - htmlOffset.y;
    return {
      x,
      y,
      width: rect.width,
      height: rect.height
    };
  }
  function isStaticPositioned(element) {
    return getComputedStyle2(element).position === "static";
  }
  function getTrueOffsetParent(element, polyfill) {
    if (!isHTMLElement(element) || getComputedStyle2(element).position === "fixed") {
      return null;
    }
    if (polyfill) {
      return polyfill(element);
    }
    let rawOffsetParent = element.offsetParent;
    if (getDocumentElement(element) === rawOffsetParent) {
      rawOffsetParent = rawOffsetParent.ownerDocument.body;
    }
    return rawOffsetParent;
  }
  function getOffsetParent(element, polyfill) {
    const win = getWindow(element);
    if (isTopLayer(element)) {
      return win;
    }
    if (!isHTMLElement(element)) {
      let svgOffsetParent = getParentNode(element);
      while (svgOffsetParent && !isLastTraversableNode(svgOffsetParent)) {
        if (isElement(svgOffsetParent) && !isStaticPositioned(svgOffsetParent)) {
          return svgOffsetParent;
        }
        svgOffsetParent = getParentNode(svgOffsetParent);
      }
      return win;
    }
    let offsetParent = getTrueOffsetParent(element, polyfill);
    while (offsetParent && isTableElement(offsetParent) && isStaticPositioned(offsetParent)) {
      offsetParent = getTrueOffsetParent(offsetParent, polyfill);
    }
    if (offsetParent && isLastTraversableNode(offsetParent) && isStaticPositioned(offsetParent) && !isContainingBlock(offsetParent)) {
      return win;
    }
    return offsetParent || getContainingBlock(element) || win;
  }
  var getElementRects = async function(data) {
    const getOffsetParentFn = this.getOffsetParent || getOffsetParent;
    const getDimensionsFn = this.getDimensions;
    const floatingDimensions = await getDimensionsFn(data.floating);
    return {
      reference: getRectRelativeToOffsetParent(data.reference, await getOffsetParentFn(data.floating), data.strategy),
      floating: {
        x: 0,
        y: 0,
        width: floatingDimensions.width,
        height: floatingDimensions.height
      }
    };
  };
  function isRTL(element) {
    return getComputedStyle2(element).direction === "rtl";
  }
  var platform = {
    convertOffsetParentRelativeRectToViewportRelativeRect,
    getDocumentElement,
    getClippingRect,
    getOffsetParent,
    getElementRects,
    getClientRects,
    getDimensions,
    getScale,
    isElement,
    isRTL
  };
  function rectsAreEqual(a, b) {
    return a.x === b.x && a.y === b.y && a.width === b.width && a.height === b.height;
  }
  function observeMove(element, onMove, ancestorResize) {
    let io = null;
    let timeoutId;
    const root = getDocumentElement(element);
    function cleanup() {
      var _io;
      clearTimeout(timeoutId);
      (_io = io) == null || _io.disconnect();
      io = null;
    }
    function refresh(skip, threshold) {
      if (skip === void 0) {
        skip = false;
      }
      if (threshold === void 0) {
        threshold = 1;
      }
      cleanup();
      const elementRectForRootMargin = element.getBoundingClientRect();
      const {
        left,
        top,
        width,
        height
      } = elementRectForRootMargin;
      if (!skip) {
        onMove();
      }
      if (!width || !height) {
        return;
      }
      const insetTop = floor(top);
      const insetRight = floor(root.clientWidth - (left + width));
      const insetBottom = floor(root.clientHeight - (top + height));
      const insetLeft = floor(left);
      const rootMargin = -insetTop + "px " + -insetRight + "px " + -insetBottom + "px " + -insetLeft + "px";
      const options = {
        rootMargin,
        threshold: max(0, min(1, threshold)) || 1
      };
      let isFirstUpdate = true;
      function handleObserve(entries) {
        const ratio = entries[0].intersectionRatio;
        if (!rectsAreEqual(elementRectForRootMargin, element.getBoundingClientRect())) {
          return refresh();
        }
        if (ratio !== threshold) {
          if (!isFirstUpdate) {
            return refresh();
          }
          if (!ratio) {
            timeoutId = setTimeout(() => {
              refresh(false, 1e-7);
            }, 1e3);
          } else {
            refresh(false, ratio);
          }
        }
        isFirstUpdate = false;
      }
      try {
        io = new IntersectionObserver(handleObserve, {
          ...options,
          // Handle <iframe>s
          root: root.ownerDocument
        });
      } catch (_e) {
        io = new IntersectionObserver(handleObserve, options);
      }
      io.observe(element);
    }
    const win = getWindow(element);
    const handleResize = () => refresh(ancestorResize);
    win.addEventListener("resize", handleResize);
    refresh(true);
    return () => {
      win.removeEventListener("resize", handleResize);
      cleanup();
    };
  }
  function autoUpdate(reference, floating, update, options) {
    if (options === void 0) {
      options = {};
    }
    const {
      ancestorScroll = true,
      ancestorResize = true,
      elementResize = typeof ResizeObserver === "function",
      layoutShift = typeof IntersectionObserver === "function",
      animationFrame = false
    } = options;
    const referenceEl = unwrapElement(reference);
    const ancestors = ancestorScroll || ancestorResize ? [...referenceEl ? getOverflowAncestors(referenceEl) : [], ...floating ? getOverflowAncestors(floating) : []] : [];
    ancestors.forEach((ancestor) => {
      ancestorScroll && ancestor.addEventListener("scroll", update);
      ancestorResize && ancestor.addEventListener("resize", update);
    });
    const cleanupIo = referenceEl && layoutShift ? observeMove(referenceEl, update, ancestorResize) : null;
    let reobserveFrame = -1;
    let resizeObserver = null;
    if (elementResize) {
      resizeObserver = new ResizeObserver((_ref) => {
        let [firstEntry] = _ref;
        if (firstEntry && firstEntry.target === referenceEl && resizeObserver && floating) {
          resizeObserver.unobserve(floating);
          cancelAnimationFrame(reobserveFrame);
          reobserveFrame = requestAnimationFrame(() => {
            var _resizeObserver;
            (_resizeObserver = resizeObserver) == null || _resizeObserver.observe(floating);
          });
        }
        update();
      });
      if (referenceEl && !animationFrame) {
        resizeObserver.observe(referenceEl);
      }
      if (floating) {
        resizeObserver.observe(floating);
      }
    }
    let frameId;
    let prevRefRect = animationFrame ? getBoundingClientRect(reference) : null;
    if (animationFrame) {
      frameLoop();
    }
    function frameLoop() {
      const nextRefRect = getBoundingClientRect(reference);
      if (prevRefRect && !rectsAreEqual(prevRefRect, nextRefRect)) {
        update();
      }
      prevRefRect = nextRefRect;
      frameId = requestAnimationFrame(frameLoop);
    }
    update();
    return () => {
      var _resizeObserver2;
      ancestors.forEach((ancestor) => {
        ancestorScroll && ancestor.removeEventListener("scroll", update);
        ancestorResize && ancestor.removeEventListener("resize", update);
      });
      cleanupIo == null || cleanupIo();
      (_resizeObserver2 = resizeObserver) == null || _resizeObserver2.disconnect();
      resizeObserver = null;
      if (animationFrame) {
        cancelAnimationFrame(frameId);
      }
    };
  }
  var offset2 = offset;
  var shift2 = shift;
  var flip2 = flip;
  var size2 = size;
  var hide2 = hide;
  var arrow2 = arrow;
  var limitShift2 = limitShift;
  var computePosition2 = (reference, floating, options) => {
    const cache = /* @__PURE__ */ new Map();
    const mergedOptions = options != null ? options : {};
    const platformWithCache = {
      ...platform,
      ...mergedOptions.platform,
      _c: cache
    };
    return computePosition(reference, floating, {
      ...mergedOptions,
      platform: platformWithCache
    });
  };

  // node_modules/@floating-ui/react-dom/dist/floating-ui.react-dom.mjs
  var React45 = __toESM(require_ds_react(), 1);
  var import_react2 = __toESM(require_ds_react(), 1);
  var ReactDOM3 = __toESM(require_ds_react_dom(), 1);
  var isClient = typeof document !== "undefined";
  var noop = function noop2() {
  };
  var index = isClient ? import_react2.useLayoutEffect : noop;
  function deepEqual(a, b) {
    if (a === b) {
      return true;
    }
    if (typeof a !== typeof b) {
      return false;
    }
    if (typeof a === "function" && a.toString() === b.toString()) {
      return true;
    }
    let length;
    let i;
    let keys;
    if (a && b && typeof a === "object") {
      if (Array.isArray(a)) {
        length = a.length;
        if (length !== b.length) return false;
        for (i = length; i-- !== 0; ) {
          if (!deepEqual(a[i], b[i])) {
            return false;
          }
        }
        return true;
      }
      keys = Object.keys(a);
      length = keys.length;
      if (length !== Object.keys(b).length) {
        return false;
      }
      for (i = length; i-- !== 0; ) {
        if (!{}.hasOwnProperty.call(b, keys[i])) {
          return false;
        }
      }
      for (i = length; i-- !== 0; ) {
        const key = keys[i];
        if (key === "_owner" && a.$$typeof) {
          continue;
        }
        if (!deepEqual(a[key], b[key])) {
          return false;
        }
      }
      return true;
    }
    return a !== a && b !== b;
  }
  function getDPR(element) {
    if (typeof window === "undefined") {
      return 1;
    }
    const win = element.ownerDocument.defaultView || window;
    return win.devicePixelRatio || 1;
  }
  function roundByDPR(element, value) {
    const dpr = getDPR(element);
    return Math.round(value * dpr) / dpr;
  }
  function useLatestRef(value) {
    const ref = React45.useRef(value);
    index(() => {
      ref.current = value;
    });
    return ref;
  }
  function useFloating(options) {
    if (options === void 0) {
      options = {};
    }
    const {
      placement = "bottom",
      strategy = "absolute",
      middleware = [],
      platform: platform2,
      elements: {
        reference: externalReference,
        floating: externalFloating
      } = {},
      transform = true,
      whileElementsMounted,
      open
    } = options;
    const [data, setData] = React45.useState({
      x: 0,
      y: 0,
      strategy,
      placement,
      middlewareData: {},
      isPositioned: false
    });
    const [latestMiddleware, setLatestMiddleware] = React45.useState(middleware);
    if (!deepEqual(latestMiddleware, middleware)) {
      setLatestMiddleware(middleware);
    }
    const [_reference, _setReference] = React45.useState(null);
    const [_floating, _setFloating] = React45.useState(null);
    const setReference = React45.useCallback((node) => {
      if (node !== referenceRef.current) {
        referenceRef.current = node;
        _setReference(node);
      }
    }, []);
    const setFloating = React45.useCallback((node) => {
      if (node !== floatingRef.current) {
        floatingRef.current = node;
        _setFloating(node);
      }
    }, []);
    const referenceEl = externalReference || _reference;
    const floatingEl = externalFloating || _floating;
    const referenceRef = React45.useRef(null);
    const floatingRef = React45.useRef(null);
    const dataRef = React45.useRef(data);
    const hasWhileElementsMounted = whileElementsMounted != null;
    const whileElementsMountedRef = useLatestRef(whileElementsMounted);
    const platformRef = useLatestRef(platform2);
    const openRef = useLatestRef(open);
    const update = React45.useCallback(() => {
      if (!referenceRef.current || !floatingRef.current) {
        return;
      }
      const config = {
        placement,
        strategy,
        middleware: latestMiddleware
      };
      if (platformRef.current) {
        config.platform = platformRef.current;
      }
      computePosition2(referenceRef.current, floatingRef.current, config).then((data2) => {
        const fullData = {
          ...data2,
          // The floating element's position may be recomputed while it's closed
          // but still mounted (such as when transitioning out). To ensure
          // `isPositioned` will be `false` initially on the next open, avoid
          // setting it to `true` when `open === false` (must be specified).
          isPositioned: openRef.current !== false
        };
        if (isMountedRef.current && !deepEqual(dataRef.current, fullData)) {
          dataRef.current = fullData;
          ReactDOM3.flushSync(() => {
            setData(fullData);
          });
        }
      });
    }, [latestMiddleware, placement, strategy, platformRef, openRef]);
    index(() => {
      if (open === false && dataRef.current.isPositioned) {
        dataRef.current.isPositioned = false;
        setData((data2) => ({
          ...data2,
          isPositioned: false
        }));
      }
    }, [open]);
    const isMountedRef = React45.useRef(false);
    index(() => {
      isMountedRef.current = true;
      return () => {
        isMountedRef.current = false;
      };
    }, []);
    index(() => {
      if (referenceEl) referenceRef.current = referenceEl;
      if (floatingEl) floatingRef.current = floatingEl;
      if (referenceEl && floatingEl) {
        if (whileElementsMountedRef.current) {
          return whileElementsMountedRef.current(referenceEl, floatingEl, update);
        }
        update();
      }
    }, [referenceEl, floatingEl, update, whileElementsMountedRef, hasWhileElementsMounted]);
    const refs = React45.useMemo(() => ({
      reference: referenceRef,
      floating: floatingRef,
      setReference,
      setFloating
    }), [setReference, setFloating]);
    const elements = React45.useMemo(() => ({
      reference: referenceEl,
      floating: floatingEl
    }), [referenceEl, floatingEl]);
    const floatingStyles = React45.useMemo(() => {
      const initialStyles = {
        position: strategy,
        left: 0,
        top: 0
      };
      if (!elements.floating) {
        return initialStyles;
      }
      const x = roundByDPR(elements.floating, data.x);
      const y = roundByDPR(elements.floating, data.y);
      if (transform) {
        return {
          ...initialStyles,
          transform: "translate(" + x + "px, " + y + "px)",
          ...getDPR(elements.floating) >= 1.5 && {
            willChange: "transform"
          }
        };
      }
      return {
        position: strategy,
        left: x,
        top: y
      };
    }, [strategy, transform, elements.floating, data.x, data.y]);
    return React45.useMemo(() => ({
      ...data,
      update,
      refs,
      elements,
      floatingStyles
    }), [data, update, refs, elements, floatingStyles]);
  }
  var arrow$1 = (options) => {
    function isRef(value) {
      return {}.hasOwnProperty.call(value, "current");
    }
    return {
      name: "arrow",
      options,
      fn(state) {
        const {
          element,
          padding
        } = typeof options === "function" ? options(state) : options;
        if (element && isRef(element)) {
          if (element.current != null) {
            return arrow2({
              element: element.current,
              padding
            }).fn(state);
          }
          return {};
        }
        if (element) {
          return arrow2({
            element,
            padding
          }).fn(state);
        }
        return {};
      }
    };
  };
  var offset3 = (options, deps) => {
    const result = offset2(options);
    return {
      name: result.name,
      fn: result.fn,
      options: [options, deps]
    };
  };
  var shift3 = (options, deps) => {
    const result = shift2(options);
    return {
      name: result.name,
      fn: result.fn,
      options: [options, deps]
    };
  };
  var limitShift3 = (options, deps) => {
    const result = limitShift2(options);
    return {
      fn: result.fn,
      options: [options, deps]
    };
  };
  var flip3 = (options, deps) => {
    const result = flip2(options);
    return {
      name: result.name,
      fn: result.fn,
      options: [options, deps]
    };
  };
  var size3 = (options, deps) => {
    const result = size2(options);
    return {
      name: result.name,
      fn: result.fn,
      options: [options, deps]
    };
  };
  var hide3 = (options, deps) => {
    const result = hide2(options);
    return {
      name: result.name,
      fn: result.fn,
      options: [options, deps]
    };
  };
  var arrow3 = (options, deps) => {
    const result = arrow$1(options);
    return {
      name: result.name,
      fn: result.fn,
      options: [options, deps]
    };
  };

  // node_modules/@radix-ui/react-arrow/dist/index.mjs
  init_ds_inject_react();
  var React46 = __toESM(require_ds_react(), 1);
  var import_jsx_runtime11 = __toESM(require_ds_jsx_runtime(), 1);
  var __defProp21 = Object.defineProperty;
  var __name20 = (target, value) => __defProp21(target, "name", { value, configurable: true });
  var Arrow = /* @__PURE__ */ React46.forwardRef(
    /* @__PURE__ */ __name20(function Arrow2(props, forwardedRef) {
      const { children, width = 10, height = 5, ...arrowProps } = props;
      return /* @__PURE__ */ (0, import_jsx_runtime11.jsx)(
        Primitive.svg,
        {
          ...arrowProps,
          ref: forwardedRef,
          width,
          height,
          viewBox: "0 0 30 10",
          preserveAspectRatio: "none",
          children: props.asChild ? children : /* @__PURE__ */ (0, import_jsx_runtime11.jsx)("polygon", { points: "0,0 30,0 15,10" })
        }
      );
    }, "Arrow")
  );
  var Root2 = Arrow;

  // node_modules/@radix-ui/react-popper/dist/index.mjs
  var import_jsx_runtime12 = __toESM(require_ds_jsx_runtime(), 1);
  var __defProp22 = Object.defineProperty;
  var __name21 = (target, value) => __defProp22(target, "name", { value, configurable: true });
  var POPPER_NAME = "Popper";
  var [createPopperContext, createPopperScope] = createContextScope(POPPER_NAME);
  var [PopperProvider, usePopperContext] = createPopperContext(POPPER_NAME);
  var Popper = /* @__PURE__ */ __name21((props) => {
    const { __scopePopper, children } = props;
    const [anchor, setAnchor] = React47.useState(null);
    const [placementState, setPlacementState] = React47.useState(void 0);
    return /* @__PURE__ */ (0, import_jsx_runtime12.jsx)(
      PopperProvider,
      {
        scope: __scopePopper,
        anchor,
        onAnchorChange: setAnchor,
        placementState,
        setPlacementState,
        children
      }
    );
  }, "Popper");
  var ANCHOR_NAME = "PopperAnchor";
  var PopperAnchor = /* @__PURE__ */ React47.forwardRef(
    /* @__PURE__ */ __name21(function PopperAnchor2(props, forwardedRef) {
      const { __scopePopper, virtualRef, ...anchorProps } = props;
      const context = usePopperContext(ANCHOR_NAME, __scopePopper);
      const ref = React47.useRef(null);
      const onAnchorChange = context.onAnchorChange;
      const callbackRef = React47.useCallback(
        (node) => {
          ref.current = node;
          if (node) {
            onAnchorChange(node);
          }
        },
        [onAnchorChange]
      );
      const composedRefs = useComposedRefs(forwardedRef, callbackRef);
      const anchorRef = React47.useRef(null);
      React47.useEffect(() => {
        if (!virtualRef) {
          return;
        }
        const previousAnchor = anchorRef.current;
        anchorRef.current = virtualRef.current;
        if (previousAnchor !== anchorRef.current) {
          onAnchorChange(anchorRef.current);
        }
      });
      const sideAndAlign = context.placementState && getSideAndAlignFromPlacement(context.placementState);
      const placedSide = sideAndAlign?.[0];
      const placedAlign = sideAndAlign?.[1];
      return virtualRef ? null : /* @__PURE__ */ (0, import_jsx_runtime12.jsx)(
        Primitive.div,
        {
          "data-radix-popper-side": placedSide,
          "data-radix-popper-align": placedAlign,
          ...anchorProps,
          ref: composedRefs
        }
      );
    }, "PopperAnchor")
  );
  var CONTENT_NAME2 = "PopperContent";
  var [PopperContentProvider, useContentContext] = createPopperContext(CONTENT_NAME2);
  var PopperContent = /* @__PURE__ */ React47.forwardRef(
    /* @__PURE__ */ __name21(function PopperContent2(props, forwardedRef) {
      const {
        __scopePopper,
        side = "bottom",
        sideOffset = 0,
        align = "center",
        alignOffset = 0,
        arrowPadding = 0,
        avoidCollisions = true,
        collisionBoundary = [],
        collisionPadding: collisionPaddingProp = 0,
        sticky = "partial",
        hideWhenDetached = false,
        updatePositionStrategy = "optimized",
        onPlaced,
        ...contentProps
      } = props;
      const context = usePopperContext(CONTENT_NAME2, __scopePopper);
      const [content, setContent] = React47.useState(null);
      const composedRefs = useComposedRefs(forwardedRef, setContent);
      const [arrow4, setArrow] = React47.useState(null);
      const arrowSize = useSize(arrow4);
      const arrowWidth = arrowSize?.width ?? 0;
      const arrowHeight = arrowSize?.height ?? 0;
      const desiredPlacement = side + (align !== "center" ? "-" + align : "");
      const collisionPadding = typeof collisionPaddingProp === "number" ? collisionPaddingProp : { top: 0, right: 0, bottom: 0, left: 0, ...collisionPaddingProp };
      const boundary = Array.isArray(collisionBoundary) ? collisionBoundary : [collisionBoundary];
      const hasExplicitBoundaries = boundary.length > 0;
      const detectOverflowOptions = {
        padding: collisionPadding,
        boundary: boundary.filter(isNotNull),
        // with `strategy: 'fixed'`, this is the only way to get it to respect boundaries
        altBoundary: hasExplicitBoundaries
      };
      const { refs, floatingStyles, placement, isPositioned, middlewareData } = useFloating({
        // default to `fixed` strategy so users don't have to pick and we also avoid focus scroll issues
        strategy: "fixed",
        placement: desiredPlacement,
        whileElementsMounted: /* @__PURE__ */ __name21((...args) => {
          const cleanup = autoUpdate(...args, {
            animationFrame: updatePositionStrategy === "always"
          });
          return cleanup;
        }, "whileElementsMounted"),
        elements: {
          reference: context.anchor
        },
        middleware: [
          offset3({ mainAxis: sideOffset + arrowHeight, alignmentAxis: alignOffset }),
          avoidCollisions && shift3({
            mainAxis: true,
            crossAxis: false,
            limiter: sticky === "partial" ? limitShift3() : void 0,
            ...detectOverflowOptions
          }),
          avoidCollisions && flip3({ ...detectOverflowOptions }),
          size3({
            ...detectOverflowOptions,
            apply: /* @__PURE__ */ __name21(({ elements, rects, availableWidth, availableHeight }) => {
              const { width: anchorWidth, height: anchorHeight } = rects.reference;
              const contentStyle = elements.floating.style;
              contentStyle.setProperty("--radix-popper-available-width", `${availableWidth}px`);
              contentStyle.setProperty("--radix-popper-available-height", `${availableHeight}px`);
              contentStyle.setProperty("--radix-popper-anchor-width", `${anchorWidth}px`);
              contentStyle.setProperty("--radix-popper-anchor-height", `${anchorHeight}px`);
            }, "apply")
          }),
          arrow4 && arrow3({ element: arrow4, padding: arrowPadding }),
          transformOrigin({ arrowWidth, arrowHeight }),
          hideWhenDetached && hide3({
            strategy: "referenceHidden",
            ...detectOverflowOptions,
            // `hide` detects whether the anchor (reference) is clipped, so when
            // no explicit `collisionBoundary` is set we fall back to Floating
            // UI's default clipping ancestors (e.g. a scrollable menu). This
            // lets an occluded submenu hide once its anchor scrolls out of view
            // (#3237). The collision/size middlewares deliberately keep the
            // viewport-based default to avoid clamping content rendered inside
            // transformed or overflow-clipping portal containers.
            boundary: hasExplicitBoundaries ? detectOverflowOptions.boundary : void 0
          })
        ]
      });
      const setPlacementState = context.setPlacementState;
      useLayoutEffect2(() => {
        setPlacementState(placement);
        return () => {
          setPlacementState(void 0);
        };
      }, [placement, setPlacementState]);
      const [placedSide, placedAlign] = getSideAndAlignFromPlacement(placement);
      const handlePlaced = useCallbackRef(onPlaced);
      useLayoutEffect2(() => {
        if (isPositioned) {
          handlePlaced?.();
        }
      }, [isPositioned, handlePlaced]);
      const arrowX = middlewareData.arrow?.x;
      const arrowY = middlewareData.arrow?.y;
      const cannotCenterArrow = middlewareData.arrow?.centerOffset !== 0;
      const [contentZIndex, setContentZIndex] = React47.useState();
      useLayoutEffect2(() => {
        if (content) setContentZIndex(window.getComputedStyle(content).zIndex);
      }, [content]);
      return /* @__PURE__ */ (0, import_jsx_runtime12.jsx)(
        "div",
        {
          ref: refs.setFloating,
          "data-radix-popper-content-wrapper": "",
          style: {
            ...floatingStyles,
            transform: isPositioned ? floatingStyles.transform : "translate(0, -200%)",
            // keep off the page when measuring
            minWidth: "max-content",
            zIndex: contentZIndex,
            "--radix-popper-transform-origin": [
              middlewareData.transformOrigin?.x,
              middlewareData.transformOrigin?.y
            ].join(" "),
            // hide the content if using the hide middleware and should be hidden
            // set visibility to hidden and disable pointer events so the UI behaves
            // as if the PopperContent isn't there at all
            ...middlewareData.hide?.referenceHidden && {
              visibility: "hidden",
              pointerEvents: "none"
            }
          },
          dir: props.dir,
          children: /* @__PURE__ */ (0, import_jsx_runtime12.jsx)(
            PopperContentProvider,
            {
              scope: __scopePopper,
              placedSide,
              placedAlign,
              onArrowChange: setArrow,
              arrowX,
              arrowY,
              shouldHideArrow: cannotCenterArrow,
              children: /* @__PURE__ */ (0, import_jsx_runtime12.jsx)(
                Primitive.div,
                {
                  "data-side": placedSide,
                  "data-align": placedAlign,
                  ...contentProps,
                  ref: composedRefs,
                  style: {
                    ...contentProps.style,
                    // if the PopperContent hasn't been placed yet (not all
                    // measurements done) we prevent animations so that users'
                    // animations don't kick in too early from the wrong sides.
                    animation: !isPositioned ? "none" : contentProps.style?.animation
                  }
                }
              )
            }
          )
        }
      );
    }, "PopperContent")
  );
  var ARROW_NAME = "PopperArrow";
  var OPPOSITE_SIDE = {
    top: "bottom",
    right: "left",
    bottom: "top",
    left: "right"
  };
  var PopperArrow = /* @__PURE__ */ React47.forwardRef(
    /* @__PURE__ */ __name21(function PopperArrow2(props, forwardedRef) {
      const { __scopePopper, ...arrowProps } = props;
      const contentContext = useContentContext(ARROW_NAME, __scopePopper);
      const baseSide = OPPOSITE_SIDE[contentContext.placedSide];
      return (
        // we have to use an extra wrapper because `ResizeObserver` (used by `useSize`)
        // doesn't report size as we'd expect on SVG elements.
        // it reports their bounding box which is effectively the largest path inside the SVG.
        /* @__PURE__ */ (0, import_jsx_runtime12.jsx)(
          "span",
          {
            ref: contentContext.onArrowChange,
            style: {
              position: "absolute",
              left: contentContext.arrowX,
              top: contentContext.arrowY,
              [baseSide]: 0,
              transformOrigin: {
                top: "",
                right: "0 0",
                bottom: "center 0",
                left: "100% 0"
              }[contentContext.placedSide],
              transform: {
                top: "translateY(100%)",
                right: "translateY(50%) rotate(90deg) translateX(-50%)",
                bottom: `rotate(180deg)`,
                left: "translateY(50%) rotate(-90deg) translateX(50%)"
              }[contentContext.placedSide],
              visibility: contentContext.shouldHideArrow ? "hidden" : void 0
            },
            children: /* @__PURE__ */ (0, import_jsx_runtime12.jsx)(
              Root2,
              {
                ...arrowProps,
                ref: forwardedRef,
                style: {
                  ...arrowProps.style,
                  // ensures the element can be measured correctly (mostly for if SVG)
                  display: "block"
                }
              }
            )
          }
        )
      );
    }, "PopperArrow")
  );
  function isNotNull(value) {
    return value !== null;
  }
  __name21(isNotNull, "isNotNull");
  var transformOrigin = /* @__PURE__ */ __name21((options) => ({
    name: "transformOrigin",
    options,
    fn(data) {
      const { placement, rects, middlewareData } = data;
      const cannotCenterArrow = middlewareData.arrow?.centerOffset !== 0;
      const isArrowHidden = cannotCenterArrow;
      const arrowWidth = isArrowHidden ? 0 : options.arrowWidth;
      const arrowHeight = isArrowHidden ? 0 : options.arrowHeight;
      const [placedSide, placedAlign] = getSideAndAlignFromPlacement(placement);
      const noArrowAlign = { start: "0%", center: "50%", end: "100%" }[placedAlign];
      const arrowXCenter = (middlewareData.arrow?.x ?? 0) + arrowWidth / 2;
      const arrowYCenter = (middlewareData.arrow?.y ?? 0) + arrowHeight / 2;
      let x = "";
      let y = "";
      if (placedSide === "bottom") {
        x = isArrowHidden ? noArrowAlign : `${arrowXCenter}px`;
        y = `${-arrowHeight}px`;
      } else if (placedSide === "top") {
        x = isArrowHidden ? noArrowAlign : `${arrowXCenter}px`;
        y = `${rects.floating.height + arrowHeight}px`;
      } else if (placedSide === "right") {
        x = `${-arrowHeight}px`;
        y = isArrowHidden ? noArrowAlign : `${arrowYCenter}px`;
      } else if (placedSide === "left") {
        x = `${rects.floating.width + arrowHeight}px`;
        y = isArrowHidden ? noArrowAlign : `${arrowYCenter}px`;
      }
      return { data: { x, y } };
    }
  }), "transformOrigin");
  function getSideAndAlignFromPlacement(placement) {
    const [side, align = "center"] = placement.split("-");
    return [side, align];
  }
  __name21(getSideAndAlignFromPlacement, "getSideAndAlignFromPlacement");
  var Root22 = Popper;
  var Anchor = PopperAnchor;
  var Content = PopperContent;
  var Arrow3 = PopperArrow;

  // node_modules/@radix-ui/react-roving-focus/dist/index.mjs
  init_ds_inject_react();
  var React49 = __toESM(require_ds_react(), 1);

  // node_modules/@radix-ui/react-use-is-hydrated/dist/index.mjs
  init_ds_inject_react();
  var React210 = __toESM(require_ds_react(), 1);
  var React48 = __toESM(require_ds_react(), 1);
  var __defProp23 = Object.defineProperty;
  var __name22 = (target, value) => __defProp23(target, "name", { value, configurable: true });
  var _isHydrated = false;
  function useIsHydrated() {
    const [isHydrated, setIsHydrated] = React48.useState(_isHydrated);
    React48.useEffect(() => {
      if (!_isHydrated) {
        _isHydrated = true;
        setIsHydrated(true);
      }
    }, []);
    return isHydrated;
  }
  __name22(useIsHydrated, "useIsHydrated");
  var useReactSyncExternalStore = React210[" useSyncExternalStore ".trim().toString()];
  function subscribe() {
    return () => {
    };
  }
  __name22(subscribe, "subscribe");
  function useIsHydratedModern() {
    return useReactSyncExternalStore(
      subscribe,
      () => true,
      () => false
    );
  }
  __name22(useIsHydratedModern, "useIsHydratedModern");
  var useIsHydrated2 = typeof useReactSyncExternalStore === "function" ? useIsHydratedModern : useIsHydrated;

  // node_modules/@radix-ui/react-roving-focus/dist/index.mjs
  var import_jsx_runtime13 = __toESM(require_ds_jsx_runtime(), 1);
  var __defProp24 = Object.defineProperty;
  var __name23 = (target, value) => __defProp24(target, "name", { value, configurable: true });
  var ENTRY_FOCUS = "rovingFocusGroup.onEntryFocus";
  var EVENT_OPTIONS2 = { bubbles: false, cancelable: true };
  var GROUP_NAME = "RovingFocusGroup";
  var [Collection, useCollection, createCollectionScope] = createCollection(GROUP_NAME);
  var [createRovingFocusGroupContext, createRovingFocusGroupScope] = createContextScope(
    GROUP_NAME,
    [createCollectionScope]
  );
  var [RovingFocusProvider, useRovingFocusContext] = createRovingFocusGroupContext(GROUP_NAME);
  var RovingFocusGroup = /* @__PURE__ */ React49.forwardRef(
    // blank line to reduce diff noise
    /* @__PURE__ */ __name23(function RovingFocusGroup2(props, forwardedRef) {
      return /* @__PURE__ */ (0, import_jsx_runtime13.jsx)(Collection.Provider, { scope: props.__scopeRovingFocusGroup, children: /* @__PURE__ */ (0, import_jsx_runtime13.jsx)(Collection.Slot, { scope: props.__scopeRovingFocusGroup, children: /* @__PURE__ */ (0, import_jsx_runtime13.jsx)(RovingFocusGroupImpl, { ...props, ref: forwardedRef }) }) });
    }, "RovingFocusGroup")
  );
  var RovingFocusGroupImpl = /* @__PURE__ */ React49.forwardRef(/* @__PURE__ */ __name23(function RovingFocusGroupImpl2(props, forwardedRef) {
    const {
      __scopeRovingFocusGroup,
      orientation,
      loop = false,
      dir,
      currentTabStopId: currentTabStopIdProp,
      defaultCurrentTabStopId,
      onCurrentTabStopIdChange,
      onEntryFocus,
      preventScrollOnEntryFocus = false,
      ...groupProps
    } = props;
    const ref = React49.useRef(null);
    const composedRefs = useComposedRefs(forwardedRef, ref);
    const direction = useDirection(dir);
    const [currentTabStopId, setCurrentTabStopId] = useControllableState({
      prop: currentTabStopIdProp,
      defaultProp: defaultCurrentTabStopId ?? null,
      onChange: onCurrentTabStopIdChange,
      caller: GROUP_NAME
    });
    const [isTabbingBackOut, setIsTabbingBackOut] = React49.useState(false);
    const handleEntryFocus = useCallbackRef(onEntryFocus);
    const getItems = useCollection(__scopeRovingFocusGroup);
    const isClickFocusRef = React49.useRef(false);
    const [focusableItemsCount, setFocusableItemsCount] = React49.useState(0);
    React49.useEffect(() => {
      const node = ref.current;
      if (node) {
        node.addEventListener(ENTRY_FOCUS, handleEntryFocus);
        return () => node.removeEventListener(ENTRY_FOCUS, handleEntryFocus);
      }
    }, [handleEntryFocus]);
    return /* @__PURE__ */ (0, import_jsx_runtime13.jsx)(
      RovingFocusProvider,
      {
        scope: __scopeRovingFocusGroup,
        orientation,
        dir: direction,
        loop,
        currentTabStopId,
        onItemFocus: React49.useCallback(
          (tabStopId) => setCurrentTabStopId(tabStopId),
          [setCurrentTabStopId]
        ),
        onItemShiftTab: React49.useCallback(() => setIsTabbingBackOut(true), []),
        onFocusableItemAdd: React49.useCallback(
          () => setFocusableItemsCount((prevCount) => prevCount + 1),
          []
        ),
        onFocusableItemRemove: React49.useCallback(
          () => setFocusableItemsCount((prevCount) => prevCount - 1),
          []
        ),
        children: /* @__PURE__ */ (0, import_jsx_runtime13.jsx)(
          Primitive.div,
          {
            tabIndex: isTabbingBackOut || focusableItemsCount === 0 ? -1 : 0,
            "data-orientation": orientation,
            ...groupProps,
            ref: composedRefs,
            style: { outline: "none", ...props.style },
            onMouseDown: composeEventHandlers(props.onMouseDown, () => {
              isClickFocusRef.current = true;
            }),
            onFocus: composeEventHandlers(props.onFocus, (event) => {
              const isKeyboardFocus = !isClickFocusRef.current;
              if (event.target === event.currentTarget && isKeyboardFocus && !isTabbingBackOut) {
                const entryFocusEvent = new CustomEvent(ENTRY_FOCUS, EVENT_OPTIONS2);
                event.currentTarget.dispatchEvent(entryFocusEvent);
                if (!entryFocusEvent.defaultPrevented) {
                  const items = getItems().filter((item) => item.focusable);
                  const activeItem = items.find((item) => item.active);
                  const currentItem = items.find((item) => item.id === currentTabStopId);
                  const candidateItems = [activeItem, currentItem, ...items].filter(
                    Boolean
                  );
                  const candidateNodes = candidateItems.map((item) => item.ref.current);
                  focusFirst2(candidateNodes, preventScrollOnEntryFocus);
                }
              }
              isClickFocusRef.current = false;
            }),
            onBlur: composeEventHandlers(props.onBlur, () => setIsTabbingBackOut(false))
          }
        )
      }
    );
  }, "RovingFocusGroupImpl"));
  var ITEM_NAME = "RovingFocusGroupItem";
  var RovingFocusGroupItem = /* @__PURE__ */ React49.forwardRef(
    // blank line to reduce diff noise
    /* @__PURE__ */ __name23(function RovingFocusGroupItem2(props, forwardedRef) {
      const {
        __scopeRovingFocusGroup,
        focusable = true,
        active = false,
        tabStopId,
        children,
        ...itemProps
      } = props;
      const autoId = useId2();
      const id = tabStopId || autoId;
      const context = useRovingFocusContext(ITEM_NAME, __scopeRovingFocusGroup);
      const isCurrentTabStop = context.currentTabStopId === id;
      const getItems = useCollection(__scopeRovingFocusGroup);
      const { onFocusableItemAdd, onFocusableItemRemove, currentTabStopId } = context;
      const isHydrated = useIsHydrated2();
      useLayoutEffect2(() => {
        if (!isHydrated || !focusable) {
          return;
        }
        onFocusableItemAdd();
        return () => onFocusableItemRemove();
      }, [isHydrated, focusable, onFocusableItemAdd, onFocusableItemRemove]);
      React49.useEffect(() => {
        if (isHydrated || !focusable) {
          return;
        }
        onFocusableItemAdd();
        return () => onFocusableItemRemove();
      }, [isHydrated, focusable, onFocusableItemAdd, onFocusableItemRemove]);
      return /* @__PURE__ */ (0, import_jsx_runtime13.jsx)(
        Collection.ItemSlot,
        {
          scope: __scopeRovingFocusGroup,
          id,
          focusable,
          active,
          children: /* @__PURE__ */ (0, import_jsx_runtime13.jsx)(
            Primitive.span,
            {
              tabIndex: isCurrentTabStop ? 0 : -1,
              "data-orientation": context.orientation,
              ...itemProps,
              ref: forwardedRef,
              onMouseDown: composeEventHandlers(props.onMouseDown, (event) => {
                if (!focusable) event.preventDefault();
                else context.onItemFocus(id);
              }),
              onFocus: composeEventHandlers(props.onFocus, () => context.onItemFocus(id)),
              onKeyDown: composeEventHandlers(props.onKeyDown, (event) => {
                if (event.key === "Tab" && event.shiftKey) {
                  context.onItemShiftTab();
                  return;
                }
                if (event.target !== event.currentTarget) return;
                const focusIntent = getFocusIntent(event, context.orientation, context.dir);
                if (focusIntent !== void 0) {
                  if (event.metaKey || event.ctrlKey || event.altKey || event.shiftKey) return;
                  event.preventDefault();
                  const items = getItems().filter((item) => item.focusable);
                  let candidateNodes = items.map((item) => item.ref.current);
                  if (focusIntent === "last") candidateNodes.reverse();
                  else if (focusIntent === "prev" || focusIntent === "next") {
                    if (focusIntent === "prev") candidateNodes.reverse();
                    const currentIndex = candidateNodes.indexOf(event.currentTarget);
                    candidateNodes = context.loop ? wrapArray(candidateNodes, currentIndex + 1) : candidateNodes.slice(currentIndex + 1);
                  }
                  setTimeout(() => focusFirst2(candidateNodes));
                }
              }),
              children: typeof children === "function" ? children({ isCurrentTabStop, hasTabStop: currentTabStopId != null }) : children
            }
          )
        }
      );
    }, "RovingFocusGroupItem")
  );
  var MAP_KEY_TO_FOCUS_INTENT = {
    ArrowLeft: "prev",
    ArrowUp: "prev",
    ArrowRight: "next",
    ArrowDown: "next",
    PageUp: "first",
    Home: "first",
    PageDown: "last",
    End: "last"
  };
  function getDirectionAwareKey(key, dir) {
    if (dir !== "rtl") return key;
    return key === "ArrowLeft" ? "ArrowRight" : key === "ArrowRight" ? "ArrowLeft" : key;
  }
  __name23(getDirectionAwareKey, "getDirectionAwareKey");
  function getFocusIntent(event, orientation, dir) {
    const key = getDirectionAwareKey(event.key, dir);
    if (orientation === "vertical" && ["ArrowLeft", "ArrowRight"].includes(key)) return void 0;
    if (orientation === "horizontal" && ["ArrowUp", "ArrowDown"].includes(key)) return void 0;
    return MAP_KEY_TO_FOCUS_INTENT[key];
  }
  __name23(getFocusIntent, "getFocusIntent");
  function focusFirst2(candidates, preventScroll = false) {
    const PREVIOUSLY_FOCUSED_ELEMENT = document.activeElement;
    for (const candidate of candidates) {
      if (candidate === PREVIOUSLY_FOCUSED_ELEMENT) return;
      candidate.focus({ preventScroll });
      if (document.activeElement !== PREVIOUSLY_FOCUSED_ELEMENT) return;
    }
  }
  __name23(focusFirst2, "focusFirst");
  function wrapArray(array, startIndex) {
    return array.map((_, index2) => array[(startIndex + index2) % array.length]);
  }
  __name23(wrapArray, "wrapArray");
  var Root3 = RovingFocusGroup;
  var Item = RovingFocusGroupItem;

  // node_modules/@radix-ui/react-menu/dist/index.mjs
  var import_jsx_runtime14 = __toESM(require_ds_jsx_runtime(), 1);
  var __defProp25 = Object.defineProperty;
  var __name24 = (target, value) => __defProp25(target, "name", { value, configurable: true });
  var SELECTION_KEYS = ["Enter", " "];
  var FIRST_KEYS = ["ArrowDown", "PageUp", "Home"];
  var LAST_KEYS = ["ArrowUp", "PageDown", "End"];
  var FIRST_LAST_KEYS = [...FIRST_KEYS, ...LAST_KEYS];
  var SUB_OPEN_KEYS = {
    ltr: [...SELECTION_KEYS, "ArrowRight"],
    rtl: [...SELECTION_KEYS, "ArrowLeft"]
  };
  var SUB_CLOSE_KEYS = {
    ltr: ["ArrowLeft"],
    rtl: ["ArrowRight"]
  };
  var MENU_NAME = "Menu";
  var [Collection2, useCollection2, createCollectionScope2] = createCollection(MENU_NAME);
  var [createMenuContext, createMenuScope] = createContextScope(MENU_NAME, [
    createCollectionScope2,
    createPopperScope,
    createRovingFocusGroupScope
  ]);
  var usePopperScope = createPopperScope();
  var useRovingFocusGroupScope = createRovingFocusGroupScope();
  var [MenuProvider, useMenuContext] = createMenuContext(MENU_NAME);
  var [MenuRootProvider, useMenuRootContext] = createMenuContext(MENU_NAME);
  var Menu = /* @__PURE__ */ __name24((props) => {
    const { __scopeMenu, open = false, children, dir, onOpenChange, modal = true } = props;
    const popperScope = usePopperScope(__scopeMenu);
    const [content, setContent] = React50.useState(null);
    const isUsingKeyboardRef = React50.useRef(false);
    const handleOpenChange = useCallbackRef(onOpenChange);
    const direction = useDirection(dir);
    React50.useEffect(() => {
      const handleKeyDown = /* @__PURE__ */ __name24(() => {
        isUsingKeyboardRef.current = true;
        document.addEventListener("pointerdown", handlePointer, { capture: true, once: true });
        document.addEventListener("pointermove", handlePointer, { capture: true, once: true });
      }, "handleKeyDown");
      const handlePointer = /* @__PURE__ */ __name24(() => isUsingKeyboardRef.current = false, "handlePointer");
      document.addEventListener("keydown", handleKeyDown, { capture: true });
      return () => {
        document.removeEventListener("keydown", handleKeyDown, { capture: true });
        document.removeEventListener("pointerdown", handlePointer, { capture: true });
        document.removeEventListener("pointermove", handlePointer, { capture: true });
      };
    }, []);
    React50.useEffect(() => {
      if (!open) {
        return;
      }
      const handleBlur = /* @__PURE__ */ __name24(() => handleOpenChange(false), "handleBlur");
      window.addEventListener("blur", handleBlur);
      return () => window.removeEventListener("blur", handleBlur);
    }, [open, handleOpenChange]);
    return /* @__PURE__ */ (0, import_jsx_runtime14.jsx)(Root22, { ...popperScope, children: /* @__PURE__ */ (0, import_jsx_runtime14.jsx)(
      MenuProvider,
      {
        scope: __scopeMenu,
        open,
        onOpenChange: handleOpenChange,
        content,
        onContentChange: setContent,
        children: /* @__PURE__ */ (0, import_jsx_runtime14.jsx)(
          MenuRootProvider,
          {
            scope: __scopeMenu,
            onClose: React50.useCallback(() => handleOpenChange(false), [handleOpenChange]),
            isUsingKeyboardRef,
            dir: direction,
            modal,
            children
          }
        )
      }
    ) });
  }, "Menu");
  var MenuAnchor = /* @__PURE__ */ React50.forwardRef(
    /* @__PURE__ */ __name24(function MenuAnchor2(props, forwardedRef) {
      const { __scopeMenu, ...anchorProps } = props;
      const popperScope = usePopperScope(__scopeMenu);
      return /* @__PURE__ */ (0, import_jsx_runtime14.jsx)(Anchor, { ...popperScope, ...anchorProps, ref: forwardedRef });
    }, "MenuAnchor")
  );
  var PORTAL_NAME2 = "MenuPortal";
  var [PortalProvider2, usePortalContext2] = createMenuContext(PORTAL_NAME2, {
    forceMount: void 0
  });
  var MenuPortal = /* @__PURE__ */ __name24((props) => {
    const { __scopeMenu, forceMount, children, container } = props;
    const context = useMenuContext(PORTAL_NAME2, __scopeMenu);
    return /* @__PURE__ */ (0, import_jsx_runtime14.jsx)(PortalProvider2, { scope: __scopeMenu, forceMount, children: /* @__PURE__ */ (0, import_jsx_runtime14.jsx)(Presence, { present: forceMount || context.open, children: /* @__PURE__ */ (0, import_jsx_runtime14.jsx)(Portal, { asChild: true, container, children }) }) });
  }, "MenuPortal");
  var CONTENT_NAME3 = "MenuContent";
  var [MenuContentProvider, useMenuContentContext] = createMenuContext(CONTENT_NAME3);
  var MenuContent = /* @__PURE__ */ React50.forwardRef(
    /* @__PURE__ */ __name24(function MenuContent2(props, forwardedRef) {
      const portalContext = usePortalContext2(CONTENT_NAME3, props.__scopeMenu);
      const { forceMount = portalContext.forceMount, ...contentProps } = props;
      const context = useMenuContext(CONTENT_NAME3, props.__scopeMenu);
      const rootContext = useMenuRootContext(CONTENT_NAME3, props.__scopeMenu);
      return /* @__PURE__ */ (0, import_jsx_runtime14.jsx)(Collection2.Provider, { scope: props.__scopeMenu, children: /* @__PURE__ */ (0, import_jsx_runtime14.jsx)(Presence, { present: forceMount || context.open, children: /* @__PURE__ */ (0, import_jsx_runtime14.jsx)(Collection2.Slot, { scope: props.__scopeMenu, children: rootContext.modal ? /* @__PURE__ */ (0, import_jsx_runtime14.jsx)(MenuRootContentModal, { ...contentProps, ref: forwardedRef }) : /* @__PURE__ */ (0, import_jsx_runtime14.jsx)(MenuRootContentNonModal, { ...contentProps, ref: forwardedRef }) }) }) });
    }, "MenuContent")
  );
  var MenuRootContentModal = /* @__PURE__ */ React50.forwardRef(
    // blank line to reduce diff noise
    /* @__PURE__ */ __name24(function MenuRootContentModal2(props, forwardedRef) {
      const context = useMenuContext(CONTENT_NAME3, props.__scopeMenu);
      const ref = React50.useRef(null);
      const composedRefs = useComposedRefs(forwardedRef, ref);
      React50.useEffect(() => {
        const content = ref.current;
        if (content) return hideOthers(content);
      }, []);
      return /* @__PURE__ */ (0, import_jsx_runtime14.jsx)(
        MenuContentImpl,
        {
          ...props,
          ref: composedRefs,
          trapFocus: context.open,
          disableOutsidePointerEvents: context.open,
          disableOutsideScroll: true,
          onFocusOutside: composeEventHandlers(
            props.onFocusOutside,
            (event) => event.preventDefault(),
            { checkForDefaultPrevented: false }
          ),
          onDismiss: () => context.onOpenChange(false)
        }
      );
    }, "MenuRootContentModal")
  );
  var MenuRootContentNonModal = /* @__PURE__ */ React50.forwardRef(/* @__PURE__ */ __name24(function MenuRootContentNonModal2(props, forwardedRef) {
    const context = useMenuContext(CONTENT_NAME3, props.__scopeMenu);
    return /* @__PURE__ */ (0, import_jsx_runtime14.jsx)(
      MenuContentImpl,
      {
        ...props,
        ref: forwardedRef,
        trapFocus: false,
        disableOutsidePointerEvents: false,
        disableOutsideScroll: false,
        onDismiss: () => context.onOpenChange(false)
      }
    );
  }, "MenuRootContentNonModal"));
  var Slot2 = createSlot("MenuContent.ScrollLock");
  var MenuContentImpl = /* @__PURE__ */ React50.forwardRef(
    // blank line to reduce diff noise
    /* @__PURE__ */ __name24(function MenuContentImpl2(props, forwardedRef) {
      const {
        __scopeMenu,
        loop = false,
        trapFocus,
        onOpenAutoFocus,
        onCloseAutoFocus,
        disableOutsidePointerEvents,
        onEntryFocus,
        onEscapeKeyDown,
        onPointerDownOutside,
        onFocusOutside,
        onInteractOutside,
        onDismiss,
        disableOutsideScroll,
        ...contentProps
      } = props;
      const context = useMenuContext(CONTENT_NAME3, __scopeMenu);
      const rootContext = useMenuRootContext(CONTENT_NAME3, __scopeMenu);
      const popperScope = usePopperScope(__scopeMenu);
      const rovingFocusGroupScope = useRovingFocusGroupScope(__scopeMenu);
      const getItems = useCollection2(__scopeMenu);
      const [currentItemId, setCurrentItemId] = React50.useState(null);
      const contentRef = React50.useRef(null);
      const composedRefs = useComposedRefs(forwardedRef, contentRef, context.onContentChange);
      const timerRef = React50.useRef(0);
      const searchRef = React50.useRef("");
      const pointerGraceTimerRef = React50.useRef(0);
      const pointerGraceIntentRef = React50.useRef(null);
      const pointerDirRef = React50.useRef("right");
      const lastPointerXRef = React50.useRef(0);
      const ScrollLockWrapper = disableOutsideScroll ? Combination_default : React50.Fragment;
      const scrollLockWrapperProps = disableOutsideScroll ? { as: Slot2, allowPinchZoom: true } : void 0;
      const handleTypeaheadSearch = /* @__PURE__ */ __name24((key) => {
        const search = searchRef.current + key;
        const items = getItems().filter((item) => !item.disabled);
        const currentItem = document.activeElement;
        const currentMatch = items.find((item) => item.ref.current === currentItem)?.textValue;
        const values = items.map((item) => item.textValue);
        const nextMatch = getNextMatch(values, search, currentMatch);
        const newItem = items.find((item) => item.textValue === nextMatch)?.ref.current;
        (/* @__PURE__ */ __name24((function updateSearch(value) {
          searchRef.current = value;
          window.clearTimeout(timerRef.current);
          if (value !== "") timerRef.current = window.setTimeout(() => updateSearch(""), 1e3);
        }), "updateSearch"))(search);
        if (newItem) {
          setTimeout(() => newItem.focus());
        }
      }, "handleTypeaheadSearch");
      React50.useEffect(() => {
        return () => window.clearTimeout(timerRef.current);
      }, []);
      useFocusGuards();
      const isPointerMovingToSubmenu = React50.useCallback((event) => {
        const isMovingTowards = pointerDirRef.current === pointerGraceIntentRef.current?.side;
        return isMovingTowards && isPointerInGraceArea(event, pointerGraceIntentRef.current?.area);
      }, []);
      return /* @__PURE__ */ (0, import_jsx_runtime14.jsx)(
        MenuContentProvider,
        {
          scope: __scopeMenu,
          searchRef,
          onItemEnter: React50.useCallback(
            (event) => {
              if (isPointerMovingToSubmenu(event)) event.preventDefault();
            },
            [isPointerMovingToSubmenu]
          ),
          onItemLeave: React50.useCallback(
            (event) => {
              if (isPointerMovingToSubmenu(event)) return;
              contentRef.current?.focus();
              setCurrentItemId(null);
            },
            [isPointerMovingToSubmenu]
          ),
          onTriggerLeave: React50.useCallback(
            (event) => {
              if (isPointerMovingToSubmenu(event)) event.preventDefault();
            },
            [isPointerMovingToSubmenu]
          ),
          pointerGraceTimerRef,
          onPointerGraceIntentChange: React50.useCallback((intent) => {
            pointerGraceIntentRef.current = intent;
          }, []),
          children: /* @__PURE__ */ (0, import_jsx_runtime14.jsx)(ScrollLockWrapper, { ...scrollLockWrapperProps, children: /* @__PURE__ */ (0, import_jsx_runtime14.jsx)(
            FocusScope,
            {
              asChild: true,
              trapped: trapFocus,
              onMountAutoFocus: composeEventHandlers(onOpenAutoFocus, (event) => {
                event.preventDefault();
                contentRef.current?.focus({ preventScroll: true });
              }),
              onUnmountAutoFocus: onCloseAutoFocus,
              children: /* @__PURE__ */ (0, import_jsx_runtime14.jsx)(
                DismissableLayer,
                {
                  asChild: true,
                  disableOutsidePointerEvents,
                  onEscapeKeyDown,
                  onPointerDownOutside,
                  onFocusOutside,
                  onInteractOutside,
                  onDismiss,
                  children: /* @__PURE__ */ (0, import_jsx_runtime14.jsx)(
                    Root3,
                    {
                      asChild: true,
                      ...rovingFocusGroupScope,
                      dir: rootContext.dir,
                      orientation: "vertical",
                      loop,
                      currentTabStopId: currentItemId,
                      onCurrentTabStopIdChange: setCurrentItemId,
                      onEntryFocus: composeEventHandlers(onEntryFocus, (event) => {
                        if (!rootContext.isUsingKeyboardRef.current) event.preventDefault();
                      }),
                      preventScrollOnEntryFocus: true,
                      children: /* @__PURE__ */ (0, import_jsx_runtime14.jsx)(
                        Content,
                        {
                          role: "menu",
                          "aria-orientation": "vertical",
                          "data-state": getOpenState(context.open),
                          "data-radix-menu-content": "",
                          dir: rootContext.dir,
                          ...popperScope,
                          ...contentProps,
                          ref: composedRefs,
                          style: { outline: "none", ...contentProps.style },
                          onKeyDown: composeEventHandlers(contentProps.onKeyDown, (event) => {
                            const target = event.target;
                            const isKeyDownInside = target.closest("[data-radix-menu-content]") === event.currentTarget;
                            const isModifierKey = event.ctrlKey || event.altKey || event.metaKey;
                            const isCharacterKey = event.key.length === 1;
                            if (isKeyDownInside) {
                              if (event.key === "Tab") event.preventDefault();
                              if (!isModifierKey && isCharacterKey) handleTypeaheadSearch(event.key);
                            }
                            const content = contentRef.current;
                            if (event.target !== content) return;
                            if (!FIRST_LAST_KEYS.includes(event.key)) return;
                            event.preventDefault();
                            const items = getItems().filter((item) => !item.disabled);
                            const candidateNodes = items.map((item) => item.ref.current);
                            if (LAST_KEYS.includes(event.key)) candidateNodes.reverse();
                            focusFirst3(candidateNodes);
                          }),
                          onBlur: composeEventHandlers(props.onBlur, (event) => {
                            if (!event.currentTarget.contains(event.target)) {
                              window.clearTimeout(timerRef.current);
                              searchRef.current = "";
                            }
                          }),
                          onPointerMove: composeEventHandlers(
                            props.onPointerMove,
                            whenMouse((event) => {
                              const target = event.target;
                              const pointerXHasChanged = lastPointerXRef.current !== event.clientX;
                              if (event.currentTarget.contains(target) && pointerXHasChanged) {
                                const newDir = event.clientX > lastPointerXRef.current ? "right" : "left";
                                pointerDirRef.current = newDir;
                                lastPointerXRef.current = event.clientX;
                              }
                            })
                          )
                        }
                      )
                    }
                  )
                }
              )
            }
          ) })
        }
      );
    }, "MenuContentImpl")
  );
  var MenuGroup = /* @__PURE__ */ React50.forwardRef(
    /* @__PURE__ */ __name24(function MenuGroup2(props, forwardedRef) {
      const { __scopeMenu, ...groupProps } = props;
      return /* @__PURE__ */ (0, import_jsx_runtime14.jsx)(Primitive.div, { role: "group", ...groupProps, ref: forwardedRef });
    }, "MenuGroup")
  );
  var MenuLabel = /* @__PURE__ */ React50.forwardRef(
    /* @__PURE__ */ __name24(function MenuLabel2(props, forwardedRef) {
      const { __scopeMenu, ...labelProps } = props;
      return /* @__PURE__ */ (0, import_jsx_runtime14.jsx)(Primitive.div, { ...labelProps, ref: forwardedRef });
    }, "MenuLabel")
  );
  var ITEM_NAME2 = "MenuItem";
  var ITEM_SELECT = "menu.itemSelect";
  var MenuItem = /* @__PURE__ */ React50.forwardRef(
    // blank line to reduce diff noise
    /* @__PURE__ */ __name24(function MenuItem2(props, forwardedRef) {
      const { disabled = false, onSelect, ...itemProps } = props;
      const ref = React50.useRef(null);
      const rootContext = useMenuRootContext(ITEM_NAME2, props.__scopeMenu);
      const contentContext = useMenuContentContext(ITEM_NAME2, props.__scopeMenu);
      const composedRefs = useComposedRefs(forwardedRef, ref);
      const isPointerDownRef = React50.useRef(false);
      const handleSelect = /* @__PURE__ */ __name24(() => {
        const menuItem = ref.current;
        if (!disabled && menuItem) {
          const itemSelectEvent = new CustomEvent(ITEM_SELECT, { bubbles: true, cancelable: true });
          menuItem.addEventListener(ITEM_SELECT, (event) => onSelect?.(event), { once: true });
          dispatchDiscreteCustomEvent(menuItem, itemSelectEvent);
          if (itemSelectEvent.defaultPrevented) {
            isPointerDownRef.current = false;
          } else {
            rootContext.onClose();
          }
        }
      }, "handleSelect");
      return /* @__PURE__ */ (0, import_jsx_runtime14.jsx)(
        MenuItemImpl,
        {
          ...itemProps,
          ref: composedRefs,
          disabled,
          onClick: composeEventHandlers(props.onClick, handleSelect),
          onPointerDown: (event) => {
            props.onPointerDown?.(event);
            isPointerDownRef.current = true;
          },
          onPointerUp: composeEventHandlers(props.onPointerUp, (event) => {
            if (!isPointerDownRef.current) event.currentTarget?.click();
          }),
          onKeyDown: composeEventHandlers(props.onKeyDown, (event) => {
            if (disabled || event.target !== event.currentTarget) {
              return;
            }
            const isTypingAhead = contentContext.searchRef.current !== "";
            if (isTypingAhead && event.key === " ") {
              return;
            }
            if (SELECTION_KEYS.includes(event.key)) {
              event.currentTarget.click();
              event.preventDefault();
            }
          })
        }
      );
    }, "MenuItem")
  );
  var MenuItemImpl = /* @__PURE__ */ React50.forwardRef(
    /* @__PURE__ */ __name24(function MenuItemImpl2(props, forwardedRef) {
      const { __scopeMenu, disabled = false, textValue, ...itemProps } = props;
      const contentContext = useMenuContentContext(ITEM_NAME2, __scopeMenu);
      const rovingFocusGroupScope = useRovingFocusGroupScope(__scopeMenu);
      const ref = React50.useRef(null);
      const composedRefs = useComposedRefs(forwardedRef, ref);
      const [isFocused, setIsFocused] = React50.useState(false);
      const [textContent, setTextContent] = React50.useState("");
      React50.useEffect(() => {
        const menuItem = ref.current;
        if (menuItem) {
          setTextContent((menuItem.textContent ?? "").trim());
        }
      }, [itemProps.children]);
      return /* @__PURE__ */ (0, import_jsx_runtime14.jsx)(
        Collection2.ItemSlot,
        {
          scope: __scopeMenu,
          disabled,
          textValue: textValue ?? textContent,
          children: /* @__PURE__ */ (0, import_jsx_runtime14.jsx)(Item, { asChild: true, ...rovingFocusGroupScope, focusable: !disabled, children: /* @__PURE__ */ (0, import_jsx_runtime14.jsx)(
            Primitive.div,
            {
              role: "menuitem",
              "data-highlighted": isFocused ? "" : void 0,
              "aria-disabled": disabled || void 0,
              "data-disabled": disabled ? "" : void 0,
              ...itemProps,
              ref: composedRefs,
              onPointerMove: composeEventHandlers(
                props.onPointerMove,
                whenMouse((event) => {
                  if (disabled) {
                    contentContext.onItemLeave(event);
                  } else {
                    contentContext.onItemEnter(event);
                    if (!event.defaultPrevented) {
                      const item = event.currentTarget;
                      item.focus({ preventScroll: true });
                    }
                  }
                })
              ),
              onPointerLeave: composeEventHandlers(
                props.onPointerLeave,
                whenMouse((event) => contentContext.onItemLeave(event))
              ),
              onFocus: composeEventHandlers(props.onFocus, () => setIsFocused(true)),
              onBlur: composeEventHandlers(props.onBlur, () => setIsFocused(false))
            }
          ) })
        }
      );
    }, "MenuItemImpl")
  );
  var MenuCheckboxItem = /* @__PURE__ */ React50.forwardRef(
    // blank line to reduce diff noise
    /* @__PURE__ */ __name24(function MenuCheckboxItem2(props, forwardedRef) {
      const { checked = false, onCheckedChange, ...checkboxItemProps } = props;
      return /* @__PURE__ */ (0, import_jsx_runtime14.jsx)(ItemIndicatorProvider, { scope: props.__scopeMenu, checked, children: /* @__PURE__ */ (0, import_jsx_runtime14.jsx)(
        MenuItem,
        {
          role: "menuitemcheckbox",
          "aria-checked": isIndeterminate(checked) ? "mixed" : checked,
          ...checkboxItemProps,
          ref: forwardedRef,
          "data-state": getCheckedState(checked),
          onSelect: composeEventHandlers(
            checkboxItemProps.onSelect,
            () => onCheckedChange?.(isIndeterminate(checked) ? true : !checked),
            { checkForDefaultPrevented: false }
          )
        }
      ) });
    }, "MenuCheckboxItem")
  );
  var RADIO_GROUP_NAME = "MenuRadioGroup";
  var [RadioGroupProvider, useRadioGroupContext] = createMenuContext(
    RADIO_GROUP_NAME,
    { value: void 0, onValueChange: /* @__PURE__ */ __name24(() => {
    }, "onValueChange") }
  );
  var MenuRadioGroup = /* @__PURE__ */ React50.forwardRef(
    /* @__PURE__ */ __name24(function MenuRadioGroup2(props, forwardedRef) {
      const { value, onValueChange, ...groupProps } = props;
      const handleValueChange = useCallbackRef(onValueChange);
      return /* @__PURE__ */ (0, import_jsx_runtime14.jsx)(RadioGroupProvider, { scope: props.__scopeMenu, value, onValueChange: handleValueChange, children: /* @__PURE__ */ (0, import_jsx_runtime14.jsx)(MenuGroup, { ...groupProps, ref: forwardedRef }) });
    }, "MenuRadioGroup")
  );
  var RADIO_ITEM_NAME = "MenuRadioItem";
  var MenuRadioItem = /* @__PURE__ */ React50.forwardRef(
    /* @__PURE__ */ __name24(function MenuRadioItem2(props, forwardedRef) {
      const { value, ...radioItemProps } = props;
      const context = useRadioGroupContext(RADIO_ITEM_NAME, props.__scopeMenu);
      const checked = value === context.value;
      return /* @__PURE__ */ (0, import_jsx_runtime14.jsx)(ItemIndicatorProvider, { scope: props.__scopeMenu, checked, children: /* @__PURE__ */ (0, import_jsx_runtime14.jsx)(
        MenuItem,
        {
          role: "menuitemradio",
          "aria-checked": checked,
          ...radioItemProps,
          ref: forwardedRef,
          "data-state": getCheckedState(checked),
          onSelect: composeEventHandlers(
            radioItemProps.onSelect,
            () => context.onValueChange?.(value),
            { checkForDefaultPrevented: false }
          )
        }
      ) });
    }, "MenuRadioItem")
  );
  var ITEM_INDICATOR_NAME = "MenuItemIndicator";
  var [ItemIndicatorProvider, useItemIndicatorContext] = createMenuContext(
    ITEM_INDICATOR_NAME,
    { checked: false }
  );
  var MenuItemIndicator = /* @__PURE__ */ React50.forwardRef(
    // blank line to reduce diff noise
    /* @__PURE__ */ __name24(function MenuItemIndicator2(props, forwardedRef) {
      const { __scopeMenu, forceMount, ...itemIndicatorProps } = props;
      const indicatorContext = useItemIndicatorContext(ITEM_INDICATOR_NAME, __scopeMenu);
      return /* @__PURE__ */ (0, import_jsx_runtime14.jsx)(
        Presence,
        {
          present: forceMount || isIndeterminate(indicatorContext.checked) || indicatorContext.checked === true,
          children: /* @__PURE__ */ (0, import_jsx_runtime14.jsx)(
            Primitive.span,
            {
              ...itemIndicatorProps,
              ref: forwardedRef,
              "data-state": getCheckedState(indicatorContext.checked)
            }
          )
        }
      );
    }, "MenuItemIndicator")
  );
  var MenuSeparator = /* @__PURE__ */ React50.forwardRef(
    /* @__PURE__ */ __name24(function MenuSeparator2(props, forwardedRef) {
      const { __scopeMenu, ...separatorProps } = props;
      return /* @__PURE__ */ (0, import_jsx_runtime14.jsx)(
        Primitive.div,
        {
          role: "separator",
          "aria-orientation": "horizontal",
          ...separatorProps,
          ref: forwardedRef
        }
      );
    }, "MenuSeparator")
  );
  var MenuArrow = /* @__PURE__ */ React50.forwardRef(
    /* @__PURE__ */ __name24(function MenuArrow2(props, forwardedRef) {
      const { __scopeMenu, ...arrowProps } = props;
      const popperScope = usePopperScope(__scopeMenu);
      return /* @__PURE__ */ (0, import_jsx_runtime14.jsx)(Arrow3, { ...popperScope, ...arrowProps, ref: forwardedRef });
    }, "MenuArrow")
  );
  var SUB_NAME = "MenuSub";
  var [MenuSubProvider, useMenuSubContext] = createMenuContext(SUB_NAME);
  var MenuSub = /* @__PURE__ */ __name24((props) => {
    const { __scopeMenu, children, open = false, onOpenChange } = props;
    const parentMenuContext = useMenuContext(SUB_NAME, __scopeMenu);
    const popperScope = usePopperScope(__scopeMenu);
    const [trigger, setTrigger] = React50.useState(null);
    const [content, setContent] = React50.useState(null);
    const handleOpenChange = useCallbackRef(onOpenChange);
    React50.useEffect(() => {
      if (parentMenuContext.open === false) handleOpenChange(false);
      return () => handleOpenChange(false);
    }, [parentMenuContext.open, handleOpenChange]);
    return /* @__PURE__ */ (0, import_jsx_runtime14.jsx)(Root22, { ...popperScope, children: /* @__PURE__ */ (0, import_jsx_runtime14.jsx)(
      MenuProvider,
      {
        scope: __scopeMenu,
        open,
        onOpenChange: handleOpenChange,
        content,
        onContentChange: setContent,
        children: /* @__PURE__ */ (0, import_jsx_runtime14.jsx)(
          MenuSubProvider,
          {
            scope: __scopeMenu,
            contentId: useId2(),
            triggerId: useId2(),
            trigger,
            onTriggerChange: setTrigger,
            children
          }
        )
      }
    ) });
  }, "MenuSub");
  var SUB_TRIGGER_NAME = "MenuSubTrigger";
  var MenuSubTrigger = /* @__PURE__ */ React50.forwardRef(
    /* @__PURE__ */ __name24(function MenuSubTrigger2(props, forwardedRef) {
      const context = useMenuContext(SUB_TRIGGER_NAME, props.__scopeMenu);
      const rootContext = useMenuRootContext(SUB_TRIGGER_NAME, props.__scopeMenu);
      const subContext = useMenuSubContext(SUB_TRIGGER_NAME, props.__scopeMenu);
      const contentContext = useMenuContentContext(SUB_TRIGGER_NAME, props.__scopeMenu);
      const openTimerRef = React50.useRef(null);
      const { pointerGraceTimerRef, onPointerGraceIntentChange } = contentContext;
      const scope = { __scopeMenu: props.__scopeMenu };
      const clearOpenTimer = React50.useCallback(() => {
        if (openTimerRef.current) window.clearTimeout(openTimerRef.current);
        openTimerRef.current = null;
      }, []);
      React50.useEffect(() => clearOpenTimer, [clearOpenTimer]);
      React50.useEffect(() => {
        const pointerGraceTimer = pointerGraceTimerRef.current;
        return () => {
          window.clearTimeout(pointerGraceTimer);
          onPointerGraceIntentChange(null);
        };
      }, [pointerGraceTimerRef, onPointerGraceIntentChange]);
      const composedRefs = useComposedRefs(forwardedRef, subContext.onTriggerChange);
      return /* @__PURE__ */ (0, import_jsx_runtime14.jsx)(MenuAnchor, { asChild: true, ...scope, children: /* @__PURE__ */ (0, import_jsx_runtime14.jsx)(
        MenuItemImpl,
        {
          id: subContext.triggerId,
          "aria-haspopup": "menu",
          "aria-expanded": context.open,
          "aria-controls": context.open ? subContext.contentId : void 0,
          "data-state": getOpenState(context.open),
          ...props,
          ref: composedRefs,
          onClick: (event) => {
            props.onClick?.(event);
            if (props.disabled || event.defaultPrevented) return;
            event.currentTarget.focus();
            if (!context.open) context.onOpenChange(true);
          },
          onPointerMove: composeEventHandlers(
            props.onPointerMove,
            whenMouse((event) => {
              contentContext.onItemEnter(event);
              if (event.defaultPrevented) return;
              if (!props.disabled && !context.open && !openTimerRef.current) {
                contentContext.onPointerGraceIntentChange(null);
                openTimerRef.current = window.setTimeout(() => {
                  context.onOpenChange(true);
                  clearOpenTimer();
                }, 100);
              }
            })
          ),
          onPointerLeave: composeEventHandlers(
            props.onPointerLeave,
            whenMouse((event) => {
              clearOpenTimer();
              const contentRect = context.content?.getBoundingClientRect();
              if (contentRect) {
                const side = context.content?.dataset.side;
                const rightSide = side === "right";
                const bleed = rightSide ? -5 : 5;
                const contentNearEdge = contentRect[rightSide ? "left" : "right"];
                const contentFarEdge = contentRect[rightSide ? "right" : "left"];
                contentContext.onPointerGraceIntentChange({
                  area: [
                    // Apply a bleed on clientX to ensure that our exit point is
                    // consistently within polygon bounds
                    { x: event.clientX + bleed, y: event.clientY },
                    { x: contentNearEdge, y: contentRect.top },
                    { x: contentFarEdge, y: contentRect.top },
                    { x: contentFarEdge, y: contentRect.bottom },
                    { x: contentNearEdge, y: contentRect.bottom }
                  ],
                  side
                });
                window.clearTimeout(pointerGraceTimerRef.current);
                pointerGraceTimerRef.current = window.setTimeout(
                  () => contentContext.onPointerGraceIntentChange(null),
                  300
                );
              } else {
                contentContext.onTriggerLeave(event);
                if (event.defaultPrevented) return;
                contentContext.onPointerGraceIntentChange(null);
              }
            })
          ),
          onKeyDown: composeEventHandlers(props.onKeyDown, (event) => {
            if (props.disabled || event.target !== event.currentTarget) {
              return;
            }
            const isTypingAhead = contentContext.searchRef.current !== "";
            if (isTypingAhead && event.key === " ") {
              return;
            }
            if (SUB_OPEN_KEYS[rootContext.dir].includes(event.key)) {
              context.onOpenChange(true);
              context.content?.focus();
              event.preventDefault();
            }
          })
        }
      ) });
    }, "MenuSubTrigger")
  );
  var SUB_CONTENT_NAME = "MenuSubContent";
  var MenuSubContent = /* @__PURE__ */ React50.forwardRef(
    /* @__PURE__ */ __name24(function MenuSubContent2(props, forwardedRef) {
      const portalContext = usePortalContext2(CONTENT_NAME3, props.__scopeMenu);
      const { forceMount = portalContext.forceMount, align = "start", ...subContentProps } = props;
      const context = useMenuContext(CONTENT_NAME3, props.__scopeMenu);
      const rootContext = useMenuRootContext(CONTENT_NAME3, props.__scopeMenu);
      const subContext = useMenuSubContext(SUB_CONTENT_NAME, props.__scopeMenu);
      const ref = React50.useRef(null);
      const composedRefs = useComposedRefs(forwardedRef, ref);
      return /* @__PURE__ */ (0, import_jsx_runtime14.jsx)(Collection2.Provider, { scope: props.__scopeMenu, children: /* @__PURE__ */ (0, import_jsx_runtime14.jsx)(Presence, { present: forceMount || context.open, children: /* @__PURE__ */ (0, import_jsx_runtime14.jsx)(Collection2.Slot, { scope: props.__scopeMenu, children: /* @__PURE__ */ (0, import_jsx_runtime14.jsx)(
        MenuContentImpl,
        {
          id: subContext.contentId,
          "aria-labelledby": subContext.triggerId,
          ...subContentProps,
          ref: composedRefs,
          align,
          side: rootContext.dir === "rtl" ? "left" : "right",
          disableOutsidePointerEvents: false,
          disableOutsideScroll: false,
          trapFocus: false,
          onOpenAutoFocus: (event) => {
            if (rootContext.isUsingKeyboardRef.current) ref.current?.focus();
            event.preventDefault();
          },
          onCloseAutoFocus: (event) => event.preventDefault(),
          onFocusOutside: composeEventHandlers(props.onFocusOutside, (event) => {
            if (event.target !== subContext.trigger) context.onOpenChange(false);
          }),
          onEscapeKeyDown: composeEventHandlers(props.onEscapeKeyDown, (event) => {
            rootContext.onClose();
            event.preventDefault();
          }),
          onKeyDown: composeEventHandlers(props.onKeyDown, (event) => {
            const isKeyDownInside = event.currentTarget.contains(event.target);
            const isCloseKey = SUB_CLOSE_KEYS[rootContext.dir].includes(event.key);
            if (isKeyDownInside && isCloseKey) {
              context.onOpenChange(false);
              subContext.trigger?.focus();
              event.preventDefault();
            }
          })
        }
      ) }) }) });
    }, "MenuSubContent")
  );
  function getOpenState(open) {
    return open ? "open" : "closed";
  }
  __name24(getOpenState, "getOpenState");
  function isIndeterminate(checked) {
    return checked === "indeterminate";
  }
  __name24(isIndeterminate, "isIndeterminate");
  function getCheckedState(checked) {
    return isIndeterminate(checked) ? "indeterminate" : checked ? "checked" : "unchecked";
  }
  __name24(getCheckedState, "getCheckedState");
  function focusFirst3(candidates) {
    const PREVIOUSLY_FOCUSED_ELEMENT = document.activeElement;
    for (const candidate of candidates) {
      if (candidate === PREVIOUSLY_FOCUSED_ELEMENT) return;
      candidate.focus();
      if (document.activeElement !== PREVIOUSLY_FOCUSED_ELEMENT) return;
    }
  }
  __name24(focusFirst3, "focusFirst");
  function wrapArray2(array, startIndex) {
    return array.map((_, index2) => array[(startIndex + index2) % array.length]);
  }
  __name24(wrapArray2, "wrapArray");
  function getNextMatch(values, search, currentMatch) {
    const isRepeated = search.length > 1 && Array.from(search).every((char) => char === search[0]);
    const normalizedSearch = isRepeated ? search[0] : search;
    const currentMatchIndex = currentMatch ? values.indexOf(currentMatch) : -1;
    let wrappedValues = wrapArray2(values, Math.max(currentMatchIndex, 0));
    const excludeCurrentMatch = normalizedSearch.length === 1;
    if (excludeCurrentMatch) wrappedValues = wrappedValues.filter((v) => v !== currentMatch);
    const nextMatch = wrappedValues.find(
      (value) => value.toLowerCase().startsWith(normalizedSearch.toLowerCase())
    );
    return nextMatch !== currentMatch ? nextMatch : void 0;
  }
  __name24(getNextMatch, "getNextMatch");
  function isPointInPolygon(point, polygon) {
    const { x, y } = point;
    let inside = false;
    for (let i = 0, j = polygon.length - 1; i < polygon.length; j = i++) {
      const ii = polygon[i];
      const jj = polygon[j];
      const xi = ii.x;
      const yi = ii.y;
      const xj = jj.x;
      const yj = jj.y;
      const intersect = yi > y !== yj > y && x < (xj - xi) * (y - yi) / (yj - yi) + xi;
      if (intersect) inside = !inside;
    }
    return inside;
  }
  __name24(isPointInPolygon, "isPointInPolygon");
  function isPointerInGraceArea(event, area) {
    if (!area) return false;
    const cursorPos = { x: event.clientX, y: event.clientY };
    return isPointInPolygon(cursorPos, area);
  }
  __name24(isPointerInGraceArea, "isPointerInGraceArea");
  function whenMouse(handler) {
    return (event) => event.pointerType === "mouse" ? handler(event) : void 0;
  }
  __name24(whenMouse, "whenMouse");
  var Root32 = Menu;
  var Anchor2 = MenuAnchor;
  var Portal3 = MenuPortal;
  var Content2 = MenuContent;
  var Group = MenuGroup;
  var Label = MenuLabel;
  var Item2 = MenuItem;
  var CheckboxItem = MenuCheckboxItem;
  var RadioGroup = MenuRadioGroup;
  var RadioItem = MenuRadioItem;
  var ItemIndicator = MenuItemIndicator;
  var Separator = MenuSeparator;
  var Arrow22 = MenuArrow;
  var Sub = MenuSub;
  var SubTrigger = MenuSubTrigger;
  var SubContent = MenuSubContent;

  // node_modules/@radix-ui/react-dropdown-menu/dist/index.mjs
  var dist_exports5 = {};
  __export(dist_exports5, {
    Arrow: () => Arrow23,
    CheckboxItem: () => CheckboxItem2,
    Content: () => Content22,
    DropdownMenu: () => DropdownMenu,
    DropdownMenuArrow: () => DropdownMenuArrow,
    DropdownMenuCheckboxItem: () => DropdownMenuCheckboxItem,
    DropdownMenuContent: () => DropdownMenuContent,
    DropdownMenuGroup: () => DropdownMenuGroup,
    DropdownMenuItem: () => DropdownMenuItem,
    DropdownMenuItemIndicator: () => DropdownMenuItemIndicator,
    DropdownMenuLabel: () => DropdownMenuLabel,
    DropdownMenuPortal: () => DropdownMenuPortal,
    DropdownMenuRadioGroup: () => DropdownMenuRadioGroup,
    DropdownMenuRadioItem: () => DropdownMenuRadioItem,
    DropdownMenuSeparator: () => DropdownMenuSeparator,
    DropdownMenuSub: () => DropdownMenuSub,
    DropdownMenuSubContent: () => DropdownMenuSubContent,
    DropdownMenuSubTrigger: () => DropdownMenuSubTrigger,
    DropdownMenuTrigger: () => DropdownMenuTrigger,
    Group: () => Group2,
    Item: () => Item22,
    ItemIndicator: () => ItemIndicator2,
    Label: () => Label2,
    Portal: () => Portal22,
    RadioGroup: () => RadioGroup2,
    RadioItem: () => RadioItem2,
    Root: () => Root23,
    Separator: () => Separator2,
    Sub: () => Sub2,
    SubContent: () => SubContent2,
    SubTrigger: () => SubTrigger2,
    Trigger: () => Trigger,
    createDropdownMenuScope: () => createDropdownMenuScope
  });
  init_ds_inject_react();
  var React51 = __toESM(require_ds_react(), 1);
  var import_jsx_runtime15 = __toESM(require_ds_jsx_runtime(), 1);
  var __defProp26 = Object.defineProperty;
  var __name25 = (target, value) => __defProp26(target, "name", { value, configurable: true });
  var DROPDOWN_MENU_NAME = "DropdownMenu";
  var [createDropdownMenuContext, createDropdownMenuScope] = createContextScope(
    DROPDOWN_MENU_NAME,
    [createMenuScope]
  );
  var useMenuScope = createMenuScope();
  var [DropdownMenuProvider, useDropdownMenuContext] = createDropdownMenuContext(DROPDOWN_MENU_NAME);
  var DropdownMenu = /* @__PURE__ */ __name25((props) => {
    const {
      __scopeDropdownMenu,
      children,
      dir,
      open: openProp,
      defaultOpen,
      onOpenChange,
      modal = true
    } = props;
    const menuScope = useMenuScope(__scopeDropdownMenu);
    const triggerRef = React51.useRef(null);
    const [open, setOpen] = useControllableState({
      prop: openProp,
      defaultProp: defaultOpen ?? false,
      onChange: onOpenChange,
      caller: DROPDOWN_MENU_NAME
    });
    return /* @__PURE__ */ (0, import_jsx_runtime15.jsx)(
      DropdownMenuProvider,
      {
        scope: __scopeDropdownMenu,
        triggerId: useId2(),
        triggerRef,
        contentId: useId2(),
        open,
        onOpenChange: setOpen,
        onOpenToggle: React51.useCallback(() => setOpen((prevOpen) => !prevOpen), [setOpen]),
        modal,
        children: /* @__PURE__ */ (0, import_jsx_runtime15.jsx)(Root32, { ...menuScope, open, onOpenChange: setOpen, dir, modal, children })
      }
    );
  }, "DropdownMenu");
  var TRIGGER_NAME2 = "DropdownMenuTrigger";
  var DropdownMenuTrigger = /* @__PURE__ */ React51.forwardRef(
    // blank line to reduce diff noise
    /* @__PURE__ */ __name25(function DropdownMenuTrigger2(props, forwardedRef) {
      const { __scopeDropdownMenu, disabled = false, ...triggerProps } = props;
      const context = useDropdownMenuContext(TRIGGER_NAME2, __scopeDropdownMenu);
      const menuScope = useMenuScope(__scopeDropdownMenu);
      const composedRefs = useComposedRefs(forwardedRef, context.triggerRef);
      return /* @__PURE__ */ (0, import_jsx_runtime15.jsx)(Anchor2, { asChild: true, ...menuScope, children: /* @__PURE__ */ (0, import_jsx_runtime15.jsx)(
        Primitive.button,
        {
          type: "button",
          id: context.triggerId,
          "aria-haspopup": "menu",
          "aria-expanded": context.open,
          "aria-controls": context.open ? context.contentId : void 0,
          "data-state": context.open ? "open" : "closed",
          "data-disabled": disabled ? "" : void 0,
          disabled,
          ...triggerProps,
          ref: composedRefs,
          onPointerDown: composeEventHandlers(props.onPointerDown, (event) => {
            if (!disabled && event.button === 0 && event.ctrlKey === false) {
              context.onOpenToggle();
              if (!context.open) event.preventDefault();
            }
          }),
          onKeyDown: composeEventHandlers(props.onKeyDown, (event) => {
            if (disabled) return;
            if (["Enter", " "].includes(event.key)) context.onOpenToggle();
            if (event.key === "ArrowDown") context.onOpenChange(true);
            if (["Enter", " ", "ArrowDown"].includes(event.key)) event.preventDefault();
          })
        }
      ) });
    }, "DropdownMenuTrigger")
  );
  var DropdownMenuPortal = /* @__PURE__ */ __name25((props) => {
    const { __scopeDropdownMenu, ...portalProps } = props;
    const menuScope = useMenuScope(__scopeDropdownMenu);
    return /* @__PURE__ */ (0, import_jsx_runtime15.jsx)(Portal3, { ...menuScope, ...portalProps });
  }, "DropdownMenuPortal");
  var CONTENT_NAME4 = "DropdownMenuContent";
  var DropdownMenuContent = /* @__PURE__ */ React51.forwardRef(
    // blank line to reduce diff noise
    /* @__PURE__ */ __name25(function DropdownMenuContent2(props, forwardedRef) {
      const { __scopeDropdownMenu, ...contentProps } = props;
      const context = useDropdownMenuContext(CONTENT_NAME4, __scopeDropdownMenu);
      const menuScope = useMenuScope(__scopeDropdownMenu);
      const hasInteractedOutsideRef = React51.useRef(false);
      return /* @__PURE__ */ (0, import_jsx_runtime15.jsx)(
        Content2,
        {
          id: context.contentId,
          "aria-labelledby": context.triggerId,
          ...menuScope,
          ...contentProps,
          ref: forwardedRef,
          onCloseAutoFocus: composeEventHandlers(props.onCloseAutoFocus, (event) => {
            if (!hasInteractedOutsideRef.current) context.triggerRef.current?.focus();
            hasInteractedOutsideRef.current = false;
            event.preventDefault();
          }),
          onInteractOutside: composeEventHandlers(props.onInteractOutside, (event) => {
            const originalEvent = event.detail.originalEvent;
            const ctrlLeftClick = originalEvent.button === 0 && originalEvent.ctrlKey === true;
            const isRightClick = originalEvent.button === 2 || ctrlLeftClick;
            if (!context.modal || isRightClick) hasInteractedOutsideRef.current = true;
          }),
          style: {
            ...props.style,
            // re-namespace exposed content custom properties
            ...{
              "--radix-dropdown-menu-content-transform-origin": "var(--radix-popper-transform-origin)",
              "--radix-dropdown-menu-content-available-width": "var(--radix-popper-available-width)",
              "--radix-dropdown-menu-content-available-height": "var(--radix-popper-available-height)",
              "--radix-dropdown-menu-trigger-width": "var(--radix-popper-anchor-width)",
              "--radix-dropdown-menu-trigger-height": "var(--radix-popper-anchor-height)"
            }
          }
        }
      );
    }, "DropdownMenuContent")
  );
  var DropdownMenuGroup = /* @__PURE__ */ React51.forwardRef(
    // blank line to reduce diff noise
    /* @__PURE__ */ __name25(function DropdownMenuGroup2(props, forwardedRef) {
      const { __scopeDropdownMenu, ...groupProps } = props;
      const menuScope = useMenuScope(__scopeDropdownMenu);
      return /* @__PURE__ */ (0, import_jsx_runtime15.jsx)(Group, { ...menuScope, ...groupProps, ref: forwardedRef });
    }, "DropdownMenuGroup")
  );
  var DropdownMenuLabel = /* @__PURE__ */ React51.forwardRef(
    // blank line to reduce diff noise
    /* @__PURE__ */ __name25(function DropdownMenuLabel2(props, forwardedRef) {
      const { __scopeDropdownMenu, ...labelProps } = props;
      const menuScope = useMenuScope(__scopeDropdownMenu);
      return /* @__PURE__ */ (0, import_jsx_runtime15.jsx)(Label, { ...menuScope, ...labelProps, ref: forwardedRef });
    }, "DropdownMenuLabel")
  );
  var DropdownMenuItem = /* @__PURE__ */ React51.forwardRef(
    // blank line to reduce diff noise
    /* @__PURE__ */ __name25(function DropdownMenuItem2(props, forwardedRef) {
      const { __scopeDropdownMenu, ...itemProps } = props;
      const menuScope = useMenuScope(__scopeDropdownMenu);
      return /* @__PURE__ */ (0, import_jsx_runtime15.jsx)(Item2, { ...menuScope, ...itemProps, ref: forwardedRef });
    }, "DropdownMenuItem")
  );
  var DropdownMenuCheckboxItem = /* @__PURE__ */ React51.forwardRef(/* @__PURE__ */ __name25(function DropdownMenuCheckboxItem2(props, forwardedRef) {
    const { __scopeDropdownMenu, ...checkboxItemProps } = props;
    const menuScope = useMenuScope(__scopeDropdownMenu);
    return /* @__PURE__ */ (0, import_jsx_runtime15.jsx)(CheckboxItem, { ...menuScope, ...checkboxItemProps, ref: forwardedRef });
  }, "DropdownMenuCheckboxItem"));
  var DropdownMenuRadioGroup = /* @__PURE__ */ React51.forwardRef(/* @__PURE__ */ __name25(function DropdownMenuRadioGroup2(props, forwardedRef) {
    const { __scopeDropdownMenu, ...radioGroupProps } = props;
    const menuScope = useMenuScope(__scopeDropdownMenu);
    return /* @__PURE__ */ (0, import_jsx_runtime15.jsx)(RadioGroup, { ...menuScope, ...radioGroupProps, ref: forwardedRef });
  }, "DropdownMenuRadioGroup"));
  var DropdownMenuRadioItem = /* @__PURE__ */ React51.forwardRef(/* @__PURE__ */ __name25(function DropdownMenuRadioItem2(props, forwardedRef) {
    const { __scopeDropdownMenu, ...radioItemProps } = props;
    const menuScope = useMenuScope(__scopeDropdownMenu);
    return /* @__PURE__ */ (0, import_jsx_runtime15.jsx)(RadioItem, { ...menuScope, ...radioItemProps, ref: forwardedRef });
  }, "DropdownMenuRadioItem"));
  var DropdownMenuItemIndicator = /* @__PURE__ */ React51.forwardRef(/* @__PURE__ */ __name25(function DropdownMenuItemIndicator2(props, forwardedRef) {
    const { __scopeDropdownMenu, ...itemIndicatorProps } = props;
    const menuScope = useMenuScope(__scopeDropdownMenu);
    return /* @__PURE__ */ (0, import_jsx_runtime15.jsx)(ItemIndicator, { ...menuScope, ...itemIndicatorProps, ref: forwardedRef });
  }, "DropdownMenuItemIndicator"));
  var DropdownMenuSeparator = /* @__PURE__ */ React51.forwardRef(/* @__PURE__ */ __name25(function DropdownMenuSeparator2(props, forwardedRef) {
    const { __scopeDropdownMenu, ...separatorProps } = props;
    const menuScope = useMenuScope(__scopeDropdownMenu);
    return /* @__PURE__ */ (0, import_jsx_runtime15.jsx)(Separator, { ...menuScope, ...separatorProps, ref: forwardedRef });
  }, "DropdownMenuSeparator"));
  var DropdownMenuArrow = /* @__PURE__ */ React51.forwardRef(
    // blank line to reduce diff noise
    /* @__PURE__ */ __name25(function DropdownMenuArrow2(props, forwardedRef) {
      const { __scopeDropdownMenu, ...arrowProps } = props;
      const menuScope = useMenuScope(__scopeDropdownMenu);
      return /* @__PURE__ */ (0, import_jsx_runtime15.jsx)(Arrow22, { ...menuScope, ...arrowProps, ref: forwardedRef });
    }, "DropdownMenuArrow")
  );
  var DropdownMenuSub = /* @__PURE__ */ __name25((props) => {
    const { __scopeDropdownMenu, children, open: openProp, onOpenChange, defaultOpen } = props;
    const menuScope = useMenuScope(__scopeDropdownMenu);
    const [open, setOpen] = useControllableState({
      prop: openProp,
      defaultProp: defaultOpen ?? false,
      onChange: onOpenChange,
      caller: "DropdownMenuSub"
    });
    return /* @__PURE__ */ (0, import_jsx_runtime15.jsx)(Sub, { ...menuScope, open, onOpenChange: setOpen, children });
  }, "DropdownMenuSub");
  var DropdownMenuSubTrigger = /* @__PURE__ */ React51.forwardRef(/* @__PURE__ */ __name25(function DropdownMenuSubTrigger2(props, forwardedRef) {
    const { __scopeDropdownMenu, ...subTriggerProps } = props;
    const menuScope = useMenuScope(__scopeDropdownMenu);
    return /* @__PURE__ */ (0, import_jsx_runtime15.jsx)(SubTrigger, { ...menuScope, ...subTriggerProps, ref: forwardedRef });
  }, "DropdownMenuSubTrigger"));
  var DropdownMenuSubContent = /* @__PURE__ */ React51.forwardRef(/* @__PURE__ */ __name25(function DropdownMenuSubContent2(props, forwardedRef) {
    const { __scopeDropdownMenu, ...subContentProps } = props;
    const menuScope = useMenuScope(__scopeDropdownMenu);
    return /* @__PURE__ */ (0, import_jsx_runtime15.jsx)(
      SubContent,
      {
        ...menuScope,
        ...subContentProps,
        ref: forwardedRef,
        style: {
          ...props.style,
          // re-namespace exposed content custom properties
          ...{
            "--radix-dropdown-menu-content-transform-origin": "var(--radix-popper-transform-origin)",
            "--radix-dropdown-menu-content-available-width": "var(--radix-popper-available-width)",
            "--radix-dropdown-menu-content-available-height": "var(--radix-popper-available-height)",
            "--radix-dropdown-menu-trigger-width": "var(--radix-popper-anchor-width)",
            "--radix-dropdown-menu-trigger-height": "var(--radix-popper-anchor-height)"
          }
        }
      }
    );
  }, "DropdownMenuSubContent"));
  var Root23 = DropdownMenu;
  var Trigger = DropdownMenuTrigger;
  var Portal22 = DropdownMenuPortal;
  var Content22 = DropdownMenuContent;
  var Group2 = DropdownMenuGroup;
  var Label2 = DropdownMenuLabel;
  var Item22 = DropdownMenuItem;
  var CheckboxItem2 = DropdownMenuCheckboxItem;
  var RadioGroup2 = DropdownMenuRadioGroup;
  var RadioItem2 = DropdownMenuRadioItem;
  var ItemIndicator2 = DropdownMenuItemIndicator;
  var Separator2 = DropdownMenuSeparator;
  var Arrow23 = DropdownMenuArrow;
  var Sub2 = DropdownMenuSub;
  var SubTrigger2 = DropdownMenuSubTrigger;
  var SubContent2 = DropdownMenuSubContent;

  // node_modules/@radix-ui/react-popover/dist/index.mjs
  var dist_exports7 = {};
  __export(dist_exports7, {
    Anchor: () => Anchor22,
    Arrow: () => Arrow24,
    Close: () => Close,
    Content: () => Content23,
    Popover: () => Popover,
    PopoverAnchor: () => PopoverAnchor,
    PopoverArrow: () => PopoverArrow,
    PopoverClose: () => PopoverClose,
    PopoverContent: () => PopoverContent,
    PopoverPortal: () => PopoverPortal,
    PopoverTrigger: () => PopoverTrigger,
    Portal: () => Portal4,
    Root: () => Root24,
    Trigger: () => Trigger2,
    createPopoverScope: () => createPopoverScope
  });
  init_ds_inject_react();
  var React52 = __toESM(require_ds_react(), 1);
  var import_jsx_runtime16 = __toESM(require_ds_jsx_runtime(), 1);
  var __defProp27 = Object.defineProperty;
  var __name26 = (target, value) => __defProp27(target, "name", { value, configurable: true });
  var POPOVER_NAME = "Popover";
  var [createPopoverContext, createPopoverScope] = createContextScope(POPOVER_NAME, [
    createPopperScope
  ]);
  var usePopperScope2 = createPopperScope();
  var [PopoverProvider, usePopoverContext] = createPopoverContext(POPOVER_NAME);
  var Popover = /* @__PURE__ */ __name26((props) => {
    const {
      __scopePopover,
      children,
      open: openProp,
      defaultOpen,
      onOpenChange,
      modal = false
    } = props;
    const popperScope = usePopperScope2(__scopePopover);
    const triggerRef = React52.useRef(null);
    const [hasCustomAnchor, setHasCustomAnchor] = React52.useState(false);
    const [open, setOpen] = useControllableState({
      prop: openProp,
      defaultProp: defaultOpen ?? false,
      onChange: onOpenChange,
      caller: POPOVER_NAME
    });
    return /* @__PURE__ */ (0, import_jsx_runtime16.jsx)(Root22, { ...popperScope, children: /* @__PURE__ */ (0, import_jsx_runtime16.jsx)(
      PopoverProvider,
      {
        scope: __scopePopover,
        contentId: useId2(),
        triggerRef,
        open,
        onOpenChange: setOpen,
        onOpenToggle: React52.useCallback(() => setOpen((prevOpen) => !prevOpen), [setOpen]),
        hasCustomAnchor,
        onCustomAnchorAdd: React52.useCallback(() => setHasCustomAnchor(true), []),
        onCustomAnchorRemove: React52.useCallback(() => setHasCustomAnchor(false), []),
        modal,
        children
      }
    ) });
  }, "Popover");
  var ANCHOR_NAME2 = "PopoverAnchor";
  var PopoverAnchor = /* @__PURE__ */ React52.forwardRef(
    /* @__PURE__ */ __name26(function PopoverAnchor2(props, forwardedRef) {
      const { __scopePopover, ...anchorProps } = props;
      const context = usePopoverContext(ANCHOR_NAME2, __scopePopover);
      const popperScope = usePopperScope2(__scopePopover);
      const { onCustomAnchorAdd, onCustomAnchorRemove } = context;
      React52.useEffect(() => {
        onCustomAnchorAdd();
        return () => onCustomAnchorRemove();
      }, [onCustomAnchorAdd, onCustomAnchorRemove]);
      return /* @__PURE__ */ (0, import_jsx_runtime16.jsx)(Anchor, { ...popperScope, ...anchorProps, ref: forwardedRef });
    }, "PopoverAnchor")
  );
  var TRIGGER_NAME3 = "PopoverTrigger";
  var PopoverTrigger = /* @__PURE__ */ React52.forwardRef(
    /* @__PURE__ */ __name26(function PopoverTrigger2(props, forwardedRef) {
      const { __scopePopover, ...triggerProps } = props;
      const context = usePopoverContext(TRIGGER_NAME3, __scopePopover);
      const popperScope = usePopperScope2(__scopePopover);
      const composedTriggerRef = useComposedRefs(forwardedRef, context.triggerRef);
      const trigger = /* @__PURE__ */ (0, import_jsx_runtime16.jsx)(
        Primitive.button,
        {
          type: "button",
          "aria-haspopup": "dialog",
          "aria-expanded": context.open,
          "aria-controls": context.open ? context.contentId : void 0,
          "data-state": getState2(context.open),
          ...triggerProps,
          ref: composedTriggerRef,
          onClick: composeEventHandlers(props.onClick, context.onOpenToggle)
        }
      );
      return context.hasCustomAnchor ? trigger : /* @__PURE__ */ (0, import_jsx_runtime16.jsx)(Anchor, { asChild: true, ...popperScope, children: trigger });
    }, "PopoverTrigger")
  );
  var PORTAL_NAME3 = "PopoverPortal";
  var [PortalProvider3, usePortalContext3] = createPopoverContext(PORTAL_NAME3, {
    forceMount: void 0
  });
  var PopoverPortal = /* @__PURE__ */ __name26((props) => {
    const { __scopePopover, forceMount, children, container } = props;
    const context = usePopoverContext(PORTAL_NAME3, __scopePopover);
    return /* @__PURE__ */ (0, import_jsx_runtime16.jsx)(PortalProvider3, { scope: __scopePopover, forceMount, children: /* @__PURE__ */ (0, import_jsx_runtime16.jsx)(Presence, { present: forceMount || context.open, children: /* @__PURE__ */ (0, import_jsx_runtime16.jsx)(Portal, { asChild: true, container, children }) }) });
  }, "PopoverPortal");
  var CONTENT_NAME5 = "PopoverContent";
  var PopoverContent = /* @__PURE__ */ React52.forwardRef(
    // blank line to reduce diff noise
    /* @__PURE__ */ __name26(function PopoverContent2(props, forwardedRef) {
      const portalContext = usePortalContext3(CONTENT_NAME5, props.__scopePopover);
      const { forceMount = portalContext.forceMount, ...contentProps } = props;
      const context = usePopoverContext(CONTENT_NAME5, props.__scopePopover);
      return /* @__PURE__ */ (0, import_jsx_runtime16.jsx)(Presence, { present: forceMount || context.open, children: context.modal ? /* @__PURE__ */ (0, import_jsx_runtime16.jsx)(PopoverContentModal, { ...contentProps, ref: forwardedRef }) : /* @__PURE__ */ (0, import_jsx_runtime16.jsx)(PopoverContentNonModal, { ...contentProps, ref: forwardedRef }) });
    }, "PopoverContent")
  );
  var Slot3 = createSlot("PopoverContent.RemoveScroll");
  var PopoverContentModal = /* @__PURE__ */ React52.forwardRef(
    // blank line to reduce diff noise
    /* @__PURE__ */ __name26(function PopoverContentModal2(props, forwardedRef) {
      const context = usePopoverContext(CONTENT_NAME5, props.__scopePopover);
      const contentRef = React52.useRef(null);
      const composedRefs = useComposedRefs(forwardedRef, contentRef);
      const isRightClickOutsideRef = React52.useRef(false);
      React52.useEffect(() => {
        const content = contentRef.current;
        if (content) return hideOthers(content);
      }, []);
      return /* @__PURE__ */ (0, import_jsx_runtime16.jsx)(Combination_default, { as: Slot3, allowPinchZoom: true, children: /* @__PURE__ */ (0, import_jsx_runtime16.jsx)(
        PopoverContentImpl,
        {
          ...props,
          ref: composedRefs,
          trapFocus: context.open,
          disableOutsidePointerEvents: true,
          onCloseAutoFocus: composeEventHandlers(props.onCloseAutoFocus, (event) => {
            event.preventDefault();
            if (!isRightClickOutsideRef.current) context.triggerRef.current?.focus();
          }),
          onPointerDownOutside: composeEventHandlers(
            props.onPointerDownOutside,
            (event) => {
              const originalEvent = event.detail.originalEvent;
              const ctrlLeftClick = originalEvent.button === 0 && originalEvent.ctrlKey === true;
              const isRightClick = originalEvent.button === 2 || ctrlLeftClick;
              isRightClickOutsideRef.current = isRightClick;
            },
            { checkForDefaultPrevented: false }
          ),
          onFocusOutside: composeEventHandlers(
            props.onFocusOutside,
            (event) => event.preventDefault(),
            { checkForDefaultPrevented: false }
          )
        }
      ) });
    }, "PopoverContentModal")
  );
  var PopoverContentNonModal = /* @__PURE__ */ React52.forwardRef(
    // blank line to reduce diff noise
    /* @__PURE__ */ __name26(function PopoverContentNonModal2(props, forwardedRef) {
      const context = usePopoverContext(CONTENT_NAME5, props.__scopePopover);
      const hasInteractedOutsideRef = React52.useRef(false);
      const hasPointerDownOutsideRef = React52.useRef(false);
      return /* @__PURE__ */ (0, import_jsx_runtime16.jsx)(
        PopoverContentImpl,
        {
          ...props,
          ref: forwardedRef,
          trapFocus: false,
          disableOutsidePointerEvents: false,
          onCloseAutoFocus: (event) => {
            props.onCloseAutoFocus?.(event);
            if (!event.defaultPrevented) {
              if (!hasInteractedOutsideRef.current) context.triggerRef.current?.focus();
              event.preventDefault();
            }
            hasInteractedOutsideRef.current = false;
            hasPointerDownOutsideRef.current = false;
          },
          onInteractOutside: (event) => {
            props.onInteractOutside?.(event);
            if (!event.defaultPrevented) {
              hasInteractedOutsideRef.current = true;
              if (event.detail.originalEvent.type === "pointerdown") {
                hasPointerDownOutsideRef.current = true;
              }
            }
            const target = event.target;
            const targetIsTrigger = context.triggerRef.current?.contains(target);
            if (targetIsTrigger) event.preventDefault();
            if (event.detail.originalEvent.type === "focusin" && hasPointerDownOutsideRef.current) {
              event.preventDefault();
            }
          }
        }
      );
    }, "PopoverContentNonModal")
  );
  var PopoverContentImpl = /* @__PURE__ */ React52.forwardRef(
    // blank line to reduce diff noise
    /* @__PURE__ */ __name26(function PopoverContentImpl2(props, forwardedRef) {
      const {
        __scopePopover,
        trapFocus,
        onOpenAutoFocus,
        onCloseAutoFocus,
        disableOutsidePointerEvents,
        onEscapeKeyDown,
        onPointerDownOutside,
        onFocusOutside,
        onInteractOutside,
        ...contentProps
      } = props;
      const context = usePopoverContext(CONTENT_NAME5, __scopePopover);
      const popperScope = usePopperScope2(__scopePopover);
      useFocusGuards();
      return /* @__PURE__ */ (0, import_jsx_runtime16.jsx)(
        FocusScope,
        {
          asChild: true,
          loop: true,
          trapped: trapFocus,
          onMountAutoFocus: onOpenAutoFocus,
          onUnmountAutoFocus: onCloseAutoFocus,
          children: /* @__PURE__ */ (0, import_jsx_runtime16.jsx)(
            DismissableLayer,
            {
              asChild: true,
              disableOutsidePointerEvents,
              onInteractOutside,
              onEscapeKeyDown,
              onPointerDownOutside,
              onFocusOutside,
              onDismiss: () => context.onOpenChange(false),
              deferPointerDownOutside: true,
              children: /* @__PURE__ */ (0, import_jsx_runtime16.jsx)(
                Content,
                {
                  "data-state": getState2(context.open),
                  role: "dialog",
                  id: context.contentId,
                  ...popperScope,
                  ...contentProps,
                  ref: forwardedRef,
                  style: {
                    ...contentProps.style,
                    // re-namespace exposed content custom properties
                    ...{
                      "--radix-popover-content-transform-origin": "var(--radix-popper-transform-origin)",
                      "--radix-popover-content-available-width": "var(--radix-popper-available-width)",
                      "--radix-popover-content-available-height": "var(--radix-popper-available-height)",
                      "--radix-popover-trigger-width": "var(--radix-popper-anchor-width)",
                      "--radix-popover-trigger-height": "var(--radix-popper-anchor-height)"
                    }
                  }
                }
              )
            }
          )
        }
      );
    }, "PopoverContentImpl")
  );
  var CLOSE_NAME2 = "PopoverClose";
  var PopoverClose = /* @__PURE__ */ React52.forwardRef(
    /* @__PURE__ */ __name26(function PopoverClose2(props, forwardedRef) {
      const { __scopePopover, ...closeProps } = props;
      const context = usePopoverContext(CLOSE_NAME2, __scopePopover);
      return /* @__PURE__ */ (0, import_jsx_runtime16.jsx)(
        Primitive.button,
        {
          type: "button",
          ...closeProps,
          ref: forwardedRef,
          onClick: composeEventHandlers(props.onClick, () => context.onOpenChange(false))
        }
      );
    }, "PopoverClose")
  );
  var PopoverArrow = /* @__PURE__ */ React52.forwardRef(
    /* @__PURE__ */ __name26(function PopoverArrow2(props, forwardedRef) {
      const { __scopePopover, ...arrowProps } = props;
      const popperScope = usePopperScope2(__scopePopover);
      return /* @__PURE__ */ (0, import_jsx_runtime16.jsx)(Arrow3, { ...popperScope, ...arrowProps, ref: forwardedRef });
    }, "PopoverArrow")
  );
  function getState2(open) {
    return open ? "open" : "closed";
  }
  __name26(getState2, "getState");
  var Root24 = Popover;
  var Anchor22 = PopoverAnchor;
  var Trigger2 = PopoverTrigger;
  var Portal4 = PopoverPortal;
  var Content23 = PopoverContent;
  var Close = PopoverClose;
  var Arrow24 = PopoverArrow;

  // node_modules/@radix-ui/react-tabs/dist/index.mjs
  var dist_exports8 = {};
  __export(dist_exports8, {
    Content: () => Content3,
    List: () => List,
    Root: () => Root25,
    Tabs: () => Tabs,
    TabsContent: () => TabsContent,
    TabsList: () => TabsList,
    TabsTrigger: () => TabsTrigger,
    Trigger: () => Trigger3,
    createTabsScope: () => createTabsScope
  });
  init_ds_inject_react();
  var React53 = __toESM(require_ds_react(), 1);
  var import_jsx_runtime17 = __toESM(require_ds_jsx_runtime(), 1);
  var __defProp28 = Object.defineProperty;
  var __name27 = (target, value) => __defProp28(target, "name", { value, configurable: true });
  var TABS_NAME = "Tabs";
  var [createTabsContext, createTabsScope] = createContextScope(TABS_NAME, [
    createRovingFocusGroupScope
  ]);
  var useRovingFocusGroupScope2 = createRovingFocusGroupScope();
  var [TabsProvider, useTabsContext] = createTabsContext(TABS_NAME);
  var Tabs = /* @__PURE__ */ React53.forwardRef(
    // blank line to reduce diff noise
    /* @__PURE__ */ __name27(function Tabs2(props, forwardedRef) {
      const {
        __scopeTabs,
        value: valueProp,
        onValueChange,
        defaultValue,
        orientation = "horizontal",
        dir,
        activationMode = "automatic",
        ...tabsProps
      } = props;
      const direction = useDirection(dir);
      const [value, setValue] = useControllableState({
        prop: valueProp,
        onChange: onValueChange,
        defaultProp: defaultValue ?? "",
        caller: TABS_NAME
      });
      return /* @__PURE__ */ (0, import_jsx_runtime17.jsx)(
        TabsProvider,
        {
          scope: __scopeTabs,
          baseId: useId2(),
          value,
          onValueChange: setValue,
          orientation,
          dir: direction,
          activationMode,
          children: /* @__PURE__ */ (0, import_jsx_runtime17.jsx)(
            Primitive.div,
            {
              dir: direction,
              "data-orientation": orientation,
              ...tabsProps,
              ref: forwardedRef
            }
          )
        }
      );
    }, "Tabs")
  );
  var TAB_LIST_NAME = "TabsList";
  var TabsList = /* @__PURE__ */ React53.forwardRef(
    // blank line to reduce diff noise
    /* @__PURE__ */ __name27(function TabsList2(props, forwardedRef) {
      const { __scopeTabs, loop = true, ...listProps } = props;
      const context = useTabsContext(TAB_LIST_NAME, __scopeTabs);
      const rovingFocusGroupScope = useRovingFocusGroupScope2(__scopeTabs);
      return /* @__PURE__ */ (0, import_jsx_runtime17.jsx)(
        Root3,
        {
          asChild: true,
          ...rovingFocusGroupScope,
          orientation: context.orientation,
          dir: context.dir,
          loop,
          children: /* @__PURE__ */ (0, import_jsx_runtime17.jsx)(
            Primitive.div,
            {
              role: "tablist",
              "aria-orientation": context.orientation,
              ...listProps,
              ref: forwardedRef
            }
          )
        }
      );
    }, "TabsList")
  );
  var TRIGGER_NAME4 = "TabsTrigger";
  var TabsTrigger = /* @__PURE__ */ React53.forwardRef(
    /* @__PURE__ */ __name27(function TabsTrigger2(props, forwardedRef) {
      const { __scopeTabs, value, disabled = false, ...triggerProps } = props;
      const context = useTabsContext(TRIGGER_NAME4, __scopeTabs);
      const rovingFocusGroupScope = useRovingFocusGroupScope2(__scopeTabs);
      const triggerId = makeTriggerId(context.baseId, value);
      const contentId = makeContentId(context.baseId, value);
      const isSelected = value === context.value;
      return /* @__PURE__ */ (0, import_jsx_runtime17.jsx)(
        Item,
        {
          asChild: true,
          ...rovingFocusGroupScope,
          focusable: !disabled,
          active: isSelected,
          children: /* @__PURE__ */ (0, import_jsx_runtime17.jsx)(
            Primitive.button,
            {
              type: "button",
              role: "tab",
              "aria-selected": isSelected,
              "aria-controls": contentId,
              "data-state": isSelected ? "active" : "inactive",
              "data-disabled": disabled ? "" : void 0,
              disabled,
              id: triggerId,
              ...triggerProps,
              ref: forwardedRef,
              onMouseDown: composeEventHandlers(props.onMouseDown, (event) => {
                if (!disabled && event.button === 0 && event.ctrlKey === false) {
                  context.onValueChange(value);
                } else {
                  event.preventDefault();
                }
              }),
              onKeyDown: composeEventHandlers(props.onKeyDown, (event) => {
                if (disabled || event.target !== event.currentTarget) {
                  return;
                }
                if ([" ", "Enter"].includes(event.key)) {
                  context.onValueChange(value);
                }
              }),
              onFocus: composeEventHandlers(props.onFocus, () => {
                const isAutomaticActivation = context.activationMode !== "manual";
                if (!isSelected && !disabled && isAutomaticActivation) {
                  context.onValueChange(value);
                }
              })
            }
          )
        }
      );
    }, "TabsTrigger")
  );
  var CONTENT_NAME6 = "TabsContent";
  var TabsContent = /* @__PURE__ */ React53.forwardRef(
    /* @__PURE__ */ __name27(function TabsContent2(props, forwardedRef) {
      const { __scopeTabs, value, forceMount, children, ...contentProps } = props;
      const context = useTabsContext(CONTENT_NAME6, __scopeTabs);
      const triggerId = makeTriggerId(context.baseId, value);
      const contentId = makeContentId(context.baseId, value);
      const isSelected = value === context.value;
      const isMountAnimationPreventedRef = React53.useRef(isSelected);
      React53.useEffect(() => {
        const rAF = requestAnimationFrame(() => isMountAnimationPreventedRef.current = false);
        return () => cancelAnimationFrame(rAF);
      }, []);
      return /* @__PURE__ */ (0, import_jsx_runtime17.jsx)(Presence, { present: forceMount || isSelected, children: ({ present }) => /* @__PURE__ */ (0, import_jsx_runtime17.jsx)(
        Primitive.div,
        {
          "data-state": isSelected ? "active" : "inactive",
          "data-orientation": context.orientation,
          role: "tabpanel",
          "aria-labelledby": triggerId,
          hidden: !present,
          id: contentId,
          tabIndex: 0,
          ...contentProps,
          ref: forwardedRef,
          style: {
            ...props.style,
            animationDuration: isMountAnimationPreventedRef.current ? "0s" : void 0
          },
          children: present && children
        }
      ) });
    }, "TabsContent")
  );
  function makeTriggerId(baseId, value) {
    return `${baseId}-trigger-${value}`;
  }
  __name27(makeTriggerId, "makeTriggerId");
  function makeContentId(baseId, value) {
    return `${baseId}-content-${value}`;
  }
  __name27(makeContentId, "makeContentId");
  var Root25 = Tabs;
  var List = TabsList;
  var Trigger3 = TabsTrigger;
  var Content3 = TabsContent;

  // node_modules/@radix-ui/react-tooltip/dist/index.mjs
  var dist_exports9 = {};
  __export(dist_exports9, {
    Arrow: () => Arrow25,
    Content: () => Content24,
    Portal: () => Portal5,
    Provider: () => Provider,
    Root: () => Root33,
    Tooltip: () => Tooltip,
    TooltipArrow: () => TooltipArrow,
    TooltipContent: () => TooltipContent,
    TooltipPortal: () => TooltipPortal,
    TooltipProvider: () => TooltipProvider,
    TooltipTrigger: () => TooltipTrigger,
    Trigger: () => Trigger4,
    createTooltipScope: () => createTooltipScope
  });
  init_ds_inject_react();
  var React54 = __toESM(require_ds_react(), 1);
  var import_jsx_runtime18 = __toESM(require_ds_jsx_runtime(), 1);
  var __defProp29 = Object.defineProperty;
  var __name28 = (target, value) => __defProp29(target, "name", { value, configurable: true });
  var [createTooltipContext, createTooltipScope] = createContextScope("Tooltip", [
    createPopperScope
  ]);
  var usePopperScope3 = createPopperScope();
  var PROVIDER_NAME = "TooltipProvider";
  var DEFAULT_DELAY_DURATION = 700;
  var TOOLTIP_OPEN = "tooltip.open";
  var [TooltipProviderContextProvider, useTooltipProviderContext] = createTooltipContext(PROVIDER_NAME);
  var TooltipProvider = /* @__PURE__ */ __name28((props) => {
    const {
      __scopeTooltip,
      delayDuration = DEFAULT_DELAY_DURATION,
      skipDelayDuration = 300,
      disableHoverableContent = false,
      children
    } = props;
    const isOpenDelayedRef = React54.useRef(true);
    const isPointerInTransitRef = React54.useRef(false);
    const skipDelayTimerRef = React54.useRef(0);
    React54.useEffect(() => {
      const skipDelayTimer = skipDelayTimerRef.current;
      return () => window.clearTimeout(skipDelayTimer);
    }, []);
    return /* @__PURE__ */ (0, import_jsx_runtime18.jsx)(
      TooltipProviderContextProvider,
      {
        scope: __scopeTooltip,
        isOpenDelayedRef,
        delayDuration,
        onOpen: React54.useCallback(() => {
          if (skipDelayDuration <= 0) return;
          window.clearTimeout(skipDelayTimerRef.current);
          isOpenDelayedRef.current = false;
        }, [skipDelayDuration]),
        onClose: React54.useCallback(() => {
          if (skipDelayDuration <= 0) return;
          window.clearTimeout(skipDelayTimerRef.current);
          skipDelayTimerRef.current = window.setTimeout(
            () => isOpenDelayedRef.current = true,
            skipDelayDuration
          );
        }, [skipDelayDuration]),
        isPointerInTransitRef,
        onPointerInTransitChange: React54.useCallback((inTransit) => {
          isPointerInTransitRef.current = inTransit;
        }, []),
        disableHoverableContent,
        children
      }
    );
  }, "TooltipProvider");
  var TOOLTIP_NAME = "Tooltip";
  var [TooltipContextProvider, useTooltipContext] = createTooltipContext(TOOLTIP_NAME);
  var Tooltip = /* @__PURE__ */ __name28((props) => {
    const {
      __scopeTooltip,
      children,
      open: openProp,
      defaultOpen,
      onOpenChange,
      disableHoverableContent: disableHoverableContentProp,
      delayDuration: delayDurationProp
    } = props;
    const providerContext = useTooltipProviderContext(TOOLTIP_NAME, props.__scopeTooltip);
    const popperScope = usePopperScope3(__scopeTooltip);
    const [trigger, setTrigger] = React54.useState(null);
    const [contentIdState, setContentId] = React54.useState(void 0);
    const generatedContentId = useId2();
    const openTimerRef = React54.useRef(0);
    const disableHoverableContent = disableHoverableContentProp ?? providerContext.disableHoverableContent;
    const delayDuration = delayDurationProp ?? providerContext.delayDuration;
    const wasOpenDelayedRef = React54.useRef(false);
    const [open, setOpen] = useControllableState({
      prop: openProp,
      defaultProp: defaultOpen ?? false,
      onChange: /* @__PURE__ */ __name28((open2) => {
        if (open2) {
          providerContext.onOpen();
          document.dispatchEvent(new CustomEvent(TOOLTIP_OPEN));
        } else {
          providerContext.onClose();
        }
        onOpenChange?.(open2);
      }, "onChange"),
      caller: TOOLTIP_NAME
    });
    const stateAttribute = React54.useMemo(() => {
      return open ? wasOpenDelayedRef.current ? "delayed-open" : "instant-open" : "closed";
    }, [open]);
    const handleOpen = React54.useCallback(() => {
      window.clearTimeout(openTimerRef.current);
      openTimerRef.current = 0;
      wasOpenDelayedRef.current = false;
      setOpen(true);
    }, [setOpen]);
    const handleClose = React54.useCallback(() => {
      window.clearTimeout(openTimerRef.current);
      openTimerRef.current = 0;
      setOpen(false);
    }, [setOpen]);
    const handleDelayedOpen = React54.useCallback(() => {
      window.clearTimeout(openTimerRef.current);
      openTimerRef.current = window.setTimeout(() => {
        wasOpenDelayedRef.current = true;
        setOpen(true);
        openTimerRef.current = 0;
      }, delayDuration);
    }, [delayDuration, setOpen]);
    React54.useEffect(() => {
      return () => {
        if (openTimerRef.current) {
          window.clearTimeout(openTimerRef.current);
          openTimerRef.current = 0;
        }
      };
    }, []);
    const contentId = contentIdState ?? generatedContentId;
    return /* @__PURE__ */ (0, import_jsx_runtime18.jsx)(Root22, { ...popperScope, children: /* @__PURE__ */ (0, import_jsx_runtime18.jsx)(
      TooltipContextProvider,
      {
        scope: __scopeTooltip,
        contentId,
        setContentId,
        open,
        stateAttribute,
        trigger,
        onTriggerChange: setTrigger,
        onTriggerEnter: React54.useCallback(() => {
          if (providerContext.isOpenDelayedRef.current) handleDelayedOpen();
          else handleOpen();
        }, [providerContext.isOpenDelayedRef, handleDelayedOpen, handleOpen]),
        onTriggerLeave: React54.useCallback(() => {
          if (disableHoverableContent) {
            handleClose();
          } else {
            window.clearTimeout(openTimerRef.current);
            openTimerRef.current = 0;
          }
        }, [handleClose, disableHoverableContent]),
        onOpen: handleOpen,
        onClose: handleClose,
        disableHoverableContent,
        children
      }
    ) });
  }, "Tooltip");
  var TRIGGER_NAME5 = "TooltipTrigger";
  var TooltipTrigger = /* @__PURE__ */ React54.forwardRef(
    /* @__PURE__ */ __name28(function TooltipTrigger2(props, forwardedRef) {
      const { __scopeTooltip, ...triggerProps } = props;
      const context = useTooltipContext(TRIGGER_NAME5, __scopeTooltip);
      const providerContext = useTooltipProviderContext(TRIGGER_NAME5, __scopeTooltip);
      const popperScope = usePopperScope3(__scopeTooltip);
      const ref = React54.useRef(null);
      const composedRefs = useComposedRefs(forwardedRef, ref, context.onTriggerChange);
      const isPointerDownRef = React54.useRef(false);
      const hasPointerMoveOpenedRef = React54.useRef(false);
      const handlePointerUp = React54.useCallback(() => isPointerDownRef.current = false, []);
      React54.useEffect(() => {
        return () => document.removeEventListener("pointerup", handlePointerUp);
      }, [handlePointerUp]);
      return /* @__PURE__ */ (0, import_jsx_runtime18.jsx)(Anchor, { asChild: true, ...popperScope, children: /* @__PURE__ */ (0, import_jsx_runtime18.jsx)(
        Primitive.button,
        {
          "aria-describedby": context.open ? context.contentId : void 0,
          "data-state": context.stateAttribute,
          ...triggerProps,
          ref: composedRefs,
          onPointerMove: composeEventHandlers(props.onPointerMove, (event) => {
            if (event.pointerType === "touch") return;
            if (!hasPointerMoveOpenedRef.current && !providerContext.isPointerInTransitRef.current) {
              context.onTriggerEnter();
              hasPointerMoveOpenedRef.current = true;
            }
          }),
          onPointerLeave: composeEventHandlers(props.onPointerLeave, () => {
            context.onTriggerLeave();
            hasPointerMoveOpenedRef.current = false;
          }),
          onPointerDown: composeEventHandlers(props.onPointerDown, () => {
            if (context.open) {
              context.onClose();
            }
            isPointerDownRef.current = true;
            document.addEventListener("pointerup", handlePointerUp, { once: true });
          }),
          onFocus: composeEventHandlers(props.onFocus, () => {
            if (!isPointerDownRef.current) context.onOpen();
          }),
          onBlur: composeEventHandlers(props.onBlur, context.onClose),
          onClick: composeEventHandlers(props.onClick, context.onClose)
        }
      ) });
    }, "TooltipTrigger")
  );
  var PORTAL_NAME4 = "TooltipPortal";
  var [PortalProvider4, usePortalContext4] = createTooltipContext(PORTAL_NAME4, {
    forceMount: void 0
  });
  var TooltipPortal = /* @__PURE__ */ __name28((props) => {
    const { __scopeTooltip, forceMount, children, container } = props;
    const context = useTooltipContext(PORTAL_NAME4, __scopeTooltip);
    return /* @__PURE__ */ (0, import_jsx_runtime18.jsx)(PortalProvider4, { scope: __scopeTooltip, forceMount, children: /* @__PURE__ */ (0, import_jsx_runtime18.jsx)(Presence, { present: forceMount || context.open, children: /* @__PURE__ */ (0, import_jsx_runtime18.jsx)(Portal, { asChild: true, container, children }) }) });
  }, "TooltipPortal");
  var CONTENT_NAME7 = "TooltipContent";
  var TooltipContent = /* @__PURE__ */ React54.forwardRef(
    /* @__PURE__ */ __name28(function TooltipContent2(props, forwardedRef) {
      const portalContext = usePortalContext4(CONTENT_NAME7, props.__scopeTooltip);
      const { forceMount = portalContext.forceMount, side = "top", ...contentProps } = props;
      const context = useTooltipContext(CONTENT_NAME7, props.__scopeTooltip);
      return /* @__PURE__ */ (0, import_jsx_runtime18.jsx)(Presence, { present: forceMount || context.open, children: context.disableHoverableContent ? /* @__PURE__ */ (0, import_jsx_runtime18.jsx)(TooltipContentImpl, { side, ...contentProps, ref: forwardedRef }) : /* @__PURE__ */ (0, import_jsx_runtime18.jsx)(TooltipContentHoverable, { side, ...contentProps, ref: forwardedRef }) });
    }, "TooltipContent")
  );
  var TooltipContentHoverable = /* @__PURE__ */ React54.forwardRef(/* @__PURE__ */ __name28(function TooltipContentHoverable2(props, forwardedRef) {
    const context = useTooltipContext(CONTENT_NAME7, props.__scopeTooltip);
    const providerContext = useTooltipProviderContext(CONTENT_NAME7, props.__scopeTooltip);
    const ref = React54.useRef(null);
    const composedRefs = useComposedRefs(forwardedRef, ref);
    const [pointerGraceArea, setPointerGraceArea] = React54.useState(null);
    const { trigger, onClose } = context;
    const content = ref.current;
    const { onPointerInTransitChange } = providerContext;
    const handleRemoveGraceArea = React54.useCallback(() => {
      setPointerGraceArea(null);
      onPointerInTransitChange(false);
    }, [onPointerInTransitChange]);
    const handleCreateGraceArea = React54.useCallback(
      (event, hoverTarget) => {
        const currentTarget = event.currentTarget;
        const exitPoint = { x: event.clientX, y: event.clientY };
        const exitSide = getExitSideFromRect(exitPoint, currentTarget.getBoundingClientRect());
        const paddedExitPoints = getPaddedExitPoints(exitPoint, exitSide);
        const hoverTargetPoints = getPointsFromRect(hoverTarget.getBoundingClientRect());
        const graceArea = getHull([...paddedExitPoints, ...hoverTargetPoints]);
        setPointerGraceArea(graceArea);
        onPointerInTransitChange(true);
      },
      [onPointerInTransitChange]
    );
    React54.useEffect(() => {
      return () => handleRemoveGraceArea();
    }, [handleRemoveGraceArea]);
    React54.useEffect(() => {
      if (trigger && content) {
        const handleTriggerLeave = /* @__PURE__ */ __name28((event) => handleCreateGraceArea(event, content), "handleTriggerLeave");
        const handleContentLeave = /* @__PURE__ */ __name28((event) => handleCreateGraceArea(event, trigger), "handleContentLeave");
        trigger.addEventListener("pointerleave", handleTriggerLeave);
        content.addEventListener("pointerleave", handleContentLeave);
        return () => {
          trigger.removeEventListener("pointerleave", handleTriggerLeave);
          content.removeEventListener("pointerleave", handleContentLeave);
        };
      }
    }, [trigger, content, handleCreateGraceArea, handleRemoveGraceArea]);
    React54.useEffect(() => {
      if (pointerGraceArea) {
        const handleTrackPointerGrace = /* @__PURE__ */ __name28((event) => {
          const target = event.target;
          const pointerPosition = { x: event.clientX, y: event.clientY };
          const hasEnteredTarget = trigger?.contains(target) || content?.contains(target);
          const isPointerOutsideGraceArea = !isPointInPolygon2(pointerPosition, pointerGraceArea);
          if (hasEnteredTarget) {
            handleRemoveGraceArea();
          } else if (isPointerOutsideGraceArea) {
            handleRemoveGraceArea();
            onClose();
          }
        }, "handleTrackPointerGrace");
        document.addEventListener("pointermove", handleTrackPointerGrace);
        return () => document.removeEventListener("pointermove", handleTrackPointerGrace);
      }
    }, [trigger, content, pointerGraceArea, onClose, handleRemoveGraceArea]);
    return /* @__PURE__ */ (0, import_jsx_runtime18.jsx)(TooltipContentImpl, { ...props, ref: composedRefs });
  }, "TooltipContentHoverable"));
  var Slottable = createSlottable("TooltipContent");
  var TooltipContentImpl = /* @__PURE__ */ React54.forwardRef(
    // blank line to reduce diff noise
    /* @__PURE__ */ __name28(function TooltipContentImpl2(props, forwardedRef) {
      const {
        __scopeTooltip,
        children,
        "aria-label": ariaLabel,
        id: idProp,
        onEscapeKeyDown,
        onPointerDownOutside,
        ...contentProps
      } = props;
      const context = useTooltipContext(CONTENT_NAME7, __scopeTooltip);
      const popperScope = usePopperScope3(__scopeTooltip);
      const { onClose } = context;
      React54.useEffect(() => {
        document.addEventListener(TOOLTIP_OPEN, onClose);
        return () => document.removeEventListener(TOOLTIP_OPEN, onClose);
      }, [onClose]);
      React54.useEffect(() => {
        if (context.trigger) {
          const handleScroll2 = /* @__PURE__ */ __name28((event) => {
            if (event.target instanceof Node && event.target.contains(context.trigger)) {
              onClose();
            }
          }, "handleScroll");
          window.addEventListener("scroll", handleScroll2, { capture: true });
          return () => window.removeEventListener("scroll", handleScroll2, { capture: true });
        }
      }, [context.trigger, onClose]);
      const { setContentId } = context;
      useLayoutEffect2(() => {
        setContentId(idProp);
        return () => {
          setContentId(void 0);
        };
      }, [idProp, setContentId]);
      return /* @__PURE__ */ (0, import_jsx_runtime18.jsx)(
        DismissableLayer,
        {
          asChild: true,
          disableOutsidePointerEvents: false,
          onEscapeKeyDown,
          onPointerDownOutside,
          onFocusOutside: (event) => event.preventDefault(),
          onDismiss: onClose,
          children: /* @__PURE__ */ (0, import_jsx_runtime18.jsxs)(
            Content,
            {
              "data-state": context.stateAttribute,
              role: ariaLabel ? void 0 : "tooltip",
              id: ariaLabel ? void 0 : context.contentId,
              ...popperScope,
              ...contentProps,
              ref: forwardedRef,
              style: {
                ...contentProps.style,
                // re-namespace exposed content custom properties
                ...{
                  "--radix-tooltip-content-transform-origin": "var(--radix-popper-transform-origin)",
                  "--radix-tooltip-content-available-width": "var(--radix-popper-available-width)",
                  "--radix-tooltip-content-available-height": "var(--radix-popper-available-height)",
                  "--radix-tooltip-trigger-width": "var(--radix-popper-anchor-width)",
                  "--radix-tooltip-trigger-height": "var(--radix-popper-anchor-height)"
                }
              },
              children: [
                /* @__PURE__ */ (0, import_jsx_runtime18.jsx)(Slottable, { children }),
                ariaLabel ? /* @__PURE__ */ (0, import_jsx_runtime18.jsx)(Root, { id: context.contentId, role: "tooltip", children: ariaLabel }) : null
              ]
            }
          )
        }
      );
    }, "TooltipContentImpl")
  );
  var TooltipArrow = /* @__PURE__ */ React54.forwardRef(
    /* @__PURE__ */ __name28(function TooltipArrow2(props, forwardedRef) {
      const { __scopeTooltip, ...arrowProps } = props;
      const popperScope = usePopperScope3(__scopeTooltip);
      return /* @__PURE__ */ (0, import_jsx_runtime18.jsx)(Arrow3, { ...popperScope, ...arrowProps, ref: forwardedRef });
    }, "TooltipArrow")
  );
  function getExitSideFromRect(point, rect) {
    const top = Math.abs(rect.top - point.y);
    const bottom = Math.abs(rect.bottom - point.y);
    const right = Math.abs(rect.right - point.x);
    const left = Math.abs(rect.left - point.x);
    switch (Math.min(top, bottom, right, left)) {
      case left:
        return "left";
      case right:
        return "right";
      case top:
        return "top";
      case bottom:
        return "bottom";
      default:
        throw new Error("unreachable");
    }
  }
  __name28(getExitSideFromRect, "getExitSideFromRect");
  function getPaddedExitPoints(exitPoint, exitSide, padding = 5) {
    const paddedExitPoints = [];
    switch (exitSide) {
      case "top":
        paddedExitPoints.push(
          { x: exitPoint.x - padding, y: exitPoint.y + padding },
          { x: exitPoint.x + padding, y: exitPoint.y + padding }
        );
        break;
      case "bottom":
        paddedExitPoints.push(
          { x: exitPoint.x - padding, y: exitPoint.y - padding },
          { x: exitPoint.x + padding, y: exitPoint.y - padding }
        );
        break;
      case "left":
        paddedExitPoints.push(
          { x: exitPoint.x + padding, y: exitPoint.y - padding },
          { x: exitPoint.x + padding, y: exitPoint.y + padding }
        );
        break;
      case "right":
        paddedExitPoints.push(
          { x: exitPoint.x - padding, y: exitPoint.y - padding },
          { x: exitPoint.x - padding, y: exitPoint.y + padding }
        );
        break;
    }
    return paddedExitPoints;
  }
  __name28(getPaddedExitPoints, "getPaddedExitPoints");
  function getPointsFromRect(rect) {
    const { top, right, bottom, left } = rect;
    return [
      { x: left, y: top },
      { x: right, y: top },
      { x: right, y: bottom },
      { x: left, y: bottom }
    ];
  }
  __name28(getPointsFromRect, "getPointsFromRect");
  function isPointInPolygon2(point, polygon) {
    const { x, y } = point;
    let inside = false;
    for (let i = 0, j = polygon.length - 1; i < polygon.length; j = i++) {
      const ii = polygon[i];
      const jj = polygon[j];
      const xi = ii.x;
      const yi = ii.y;
      const xj = jj.x;
      const yj = jj.y;
      const intersect = yi > y !== yj > y && x < (xj - xi) * (y - yi) / (yj - yi) + xi;
      if (intersect) inside = !inside;
    }
    return inside;
  }
  __name28(isPointInPolygon2, "isPointInPolygon");
  function getHull(points) {
    const newPoints = points.slice();
    newPoints.sort((a, b) => {
      if (a.x < b.x) return -1;
      else if (a.x > b.x) return 1;
      else if (a.y < b.y) return -1;
      else if (a.y > b.y) return 1;
      else return 0;
    });
    return getHullPresorted(newPoints);
  }
  __name28(getHull, "getHull");
  function getHullPresorted(points) {
    if (points.length <= 1) return points.slice();
    const upperHull = [];
    for (let i = 0; i < points.length; i++) {
      const p = points[i];
      while (upperHull.length >= 2) {
        const q = upperHull[upperHull.length - 1];
        const r = upperHull[upperHull.length - 2];
        if ((q.x - r.x) * (p.y - r.y) >= (q.y - r.y) * (p.x - r.x)) upperHull.pop();
        else break;
      }
      upperHull.push(p);
    }
    upperHull.pop();
    const lowerHull = [];
    for (let i = points.length - 1; i >= 0; i--) {
      const p = points[i];
      while (lowerHull.length >= 2) {
        const q = lowerHull[lowerHull.length - 1];
        const r = lowerHull[lowerHull.length - 2];
        if ((q.x - r.x) * (p.y - r.y) >= (q.y - r.y) * (p.x - r.x)) lowerHull.pop();
        else break;
      }
      lowerHull.push(p);
    }
    lowerHull.pop();
    if (upperHull.length === 1 && lowerHull.length === 1 && upperHull[0].x === lowerHull[0].x && upperHull[0].y === lowerHull[0].y) {
      return upperHull;
    } else {
      return upperHull.concat(lowerHull);
    }
  }
  __name28(getHullPresorted, "getHullPresorted");
  var Provider = TooltipProvider;
  var Root33 = Tooltip;
  var Trigger4 = TooltipTrigger;
  var Portal5 = TooltipPortal;
  var Content24 = TooltipContent;
  var Arrow25 = TooltipArrow;

  // components/overlays/_layer.js
  init_ds_inject_react();
  var React55 = __toESM(require_ds_react(), 1);
  var cx28 = (...a) => a.filter(Boolean).join(" ");
  var LayerContext = React55.createContext(null);
  function useLayer() {
    return React55.useContext(LayerContext);
  }
  var SCOPE_SELECTOR = ".dark, [data-theme], .lw-band-dark, .lw-band-light, [data-band]";
  function mirrorScope(fromEl) {
    const out = { className: void 0, "data-theme": void 0, "data-band": void 0 };
    const el = fromEl && typeof fromEl.closest === "function" ? fromEl.closest(SCOPE_SELECTOR) : null;
    if (!el) return out;
    const classes = [];
    if (el.classList.contains("dark")) classes.push("dark");
    for (const c of el.classList) if (/^lw-band-/.test(c)) classes.push(c);
    if (classes.length) out.className = classes.join(" ");
    const theme = el.getAttribute("data-theme");
    if (theme) out["data-theme"] = theme;
    const band = el.getAttribute("data-band");
    if (band) out["data-band"] = band;
    return out;
  }
  var Layer = React55.forwardRef(function Layer2({ modal = false, from = null, children, className, ...rest }, forwardedRef) {
    const ref = React55.useRef(null);
    const [container, setContainer] = React55.useState(null);
    const mirrored = mirrorScope(from);
    const value = React55.useMemo(() => ({ container }), [container]);
    const setRef3 = React55.useCallback((node) => {
      ref.current = node;
      setContainer(node);
      if (typeof forwardedRef === "function") forwardedRef(node);
      else if (forwardedRef) forwardedRef.current = node;
    }, [forwardedRef]);
    return React55.createElement(
      "div",
      {
        ref: setRef3,
        className: cx28("lw-layer", modal && "lw-layer-modal", mirrored.className, className),
        "data-theme": mirrored["data-theme"],
        "data-band": mirrored["data-band"],
        "data-modal": modal || void 0,
        ...rest
      },
      React55.createElement(LayerContext.Provider, { value }, children)
    );
  });
  Layer.displayName = "Layer";

  // components/overlays/Popover.jsx
  var cx29 = (...a) => a.filter(Boolean).join(" ");
  function toSideAlign(placement) {
    const [side = "bottom", align = "start"] = String(placement || "bottom-start").split("-");
    return { side, align: align === "center" ? "center" : align === "end" ? "end" : "start" };
  }
  var HASPOPUP = { menu: "menu", listbox: "listbox", dialog: "dialog" };
  function Popover2({
    trigger,
    open,
    defaultOpen,
    onOpenChange,
    placement = "bottom-start",
    offset: offset4 = 6,
    matchWidth,
    label,
    role = "dialog",
    padded,
    anchor = false,
    autoFocus = true,
    container,
    triggerAria,
    className,
    children,
    ...rest
  }) {
    if (triggerAria !== void 0) deprecate("Popover", "triggerAria", "`triggerAria` is ignored since v2.0.0 — pass `anchor` for a trigger that owns its own ARIA.");
    if (role === "grid") {
      deprecate("Popover", 'role="grid"', '`role="grid"` is not a popup role; the panel renders as a dialog since v2.0.0.');
      role = "dialog";
    }
    const [anchorEl, setAnchorElState] = React56.useState(null);
    const anchorRef = React56.useRef(null);
    const setAnchorEl = React56.useCallback((el) => {
      anchorRef.current = el;
      setAnchorElState(el);
    }, []);
    const layer = useLayer();
    const { side, align } = toSideAlign(placement);
    React56.useEffect(() => {
      if (typeof process !== "undefined" && process.env && false) return;
      if (!open && !defaultOpen) return;
      const el = anchorRef.current;
      if (el) {
        const r = el.getBoundingClientRect();
        if (r.width || r.height) return;
      }
      if (typeof console !== "undefined") console.warn("[@leanwise/design] Popover: the anchor has no size — the trigger must forward its ref (React.forwardRef, or a plain element), or the panel cannot be positioned.");
    }, [open, defaultOpen, anchorEl]);
    const Wrap = anchor ? dist_exports7.Anchor : dist_exports7.Trigger;
    const wrapProps = anchor ? {} : { "aria-haspopup": HASPOPUP[role] || "dialog" };
    const isPresentational = role === "presentation" || role === "none";
    return /* @__PURE__ */ React56.createElement(dist_exports7.Root, { open, defaultOpen, onOpenChange, modal: false }, /* @__PURE__ */ React56.createElement(Wrap, { asChild: true, ref: setAnchorEl, ...wrapProps }, trigger), /* @__PURE__ */ React56.createElement(dist_exports7.Portal, { container: container ?? layer?.container ?? void 0 }, /* @__PURE__ */ React56.createElement(Layer, { from: anchorEl }, /* @__PURE__ */ React56.createElement(
      dist_exports7.Content,
      {
        side,
        align,
        sideOffset: offset4,
        collisionPadding: 8,
        role,
        "aria-label": isPresentational ? void 0 : label,
        "data-match-width": matchWidth ? "" : void 0,
        onOpenAutoFocus: autoFocus ? void 0 : (e) => e.preventDefault(),
        onInteractOutside: anchor ? (e) => {
          if (anchorEl && anchorEl.contains(e.target)) e.preventDefault();
        } : void 0,
        className: cx29("lw-popover", padded && "lw-popover-pad", className),
        ...rest
      },
      children
    ))));
  }

  // components/forms/Combobox.jsx
  var cx30 = (...a) => a.filter(Boolean).join(" ");
  var norm = (o) => typeof o === "string" || typeof o === "number" ? { value: o, label: String(o) } : o;
  var Combobox = React57.forwardRef(function Combobox2({
    options = [],
    value,
    onChange,
    multiple,
    placeholder,
    size: size4 = "md",
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
    const opts = React57.useMemo(() => options.map(norm), [options]);
    const [open, setOpen] = React57.useState(false);
    const [query, setQuery] = React57.useState("");
    const [active, setActive] = React57.useState(0);
    const inputRef = React57.useRef(null);
    const setInputRef = useMergedRef(inputRef, forwardedRef);
    const listRef = React57.useRef(null);
    const uid = React57.useId();
    const listId = uid + "-list";
    const inputId = id || uid + "-in";
    const selected = multiple ? Array.isArray(value) ? value : [] : value;
    const selectedOpts = multiple ? opts.filter((o) => selected.includes(o.value)) : [];
    const current = !multiple ? opts.find((o) => o.value === value) : null;
    const shown = React57.useMemo(() => {
      if (onSearch || !query) return opts;
      const q = query.toLowerCase();
      return opts.filter((o) => String(o.label).toLowerCase().includes(q));
    }, [opts, query, onSearch]);
    React57.useEffect(() => {
      if (active >= shown.length) setActive(0);
    }, [shown.length, active]);
    React57.useEffect(() => {
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
    const field = /* @__PURE__ */ React57.createElement(
      "div",
      {
        className: cx30("lw-combo", size4 === "sm" && "lw-combo-sm", size4 === "lg" && "lw-combo-lg", className),
        "data-disabled": disabled ? "true" : void 0,
        onMouseDown: (e) => {
          if (e.target === e.currentTarget && inputRef.current) inputRef.current.focus();
        }
      },
      selectedOpts.map((o) => /* @__PURE__ */ React57.createElement("span", { key: o.value, className: "lw-combo-token" }, /* @__PURE__ */ React57.createElement("span", null, o.label), /* @__PURE__ */ React57.createElement(
        "button",
        {
          type: "button",
          "aria-label": formatRemoveLabel(o.label),
          disabled,
          onMouseDown: (e) => e.preventDefault(),
          onClick: () => remove(o.value)
        },
        /* @__PURE__ */ React57.createElement(Icon, { name: "close", size: 11 })
      ))),
      /* @__PURE__ */ React57.createElement(
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
      /* @__PURE__ */ React57.createElement("span", { className: "lw-combo-chev" }, /* @__PURE__ */ React57.createElement(Icon, { name: "chevrons-up-down", size: 15 }))
    );
    return (
      /* `anchor`: the input owns role="combobox", aria-expanded and aria-controls;
         the panel is a positioning anchor only. `autoFocus={false}`: focus STAYS in
         the input — aria-activedescendant names the row. `role="presentation"`:
         the ul below is the listbox; a second listbox around it would nest one in
         the other. */
      /* @__PURE__ */ React57.createElement(
        Popover2,
        {
          anchor: true,
          autoFocus: false,
          trigger: field,
          open: open && !disabled,
          onOpenChange: setOpen,
          role: "presentation",
          matchWidth: true,
          placement: "bottom-start",
          ...rest
        },
        loading ? /* @__PURE__ */ React57.createElement("div", { id: listId, role: "listbox", "aria-busy": "true", className: "lw-listbox-empty" }, loadingText) : !shown.length ? /* @__PURE__ */ React57.createElement("div", { id: listId, role: "listbox", className: "lw-listbox-empty" }, emptyText) : /* @__PURE__ */ React57.createElement("ul", { ref: listRef, className: "lw-listbox", id: listId, role: "listbox", "aria-multiselectable": multiple || void 0 }, shown.map((o, i) => {
          const isSel = multiple ? selected.includes(o.value) : o.value === value;
          return /* @__PURE__ */ React57.createElement(
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
            /* @__PURE__ */ React57.createElement("span", { className: "lw-option-lead" }, isSel && /* @__PURE__ */ React57.createElement(Icon, { name: "checkmark", size: 14 })),
            /* @__PURE__ */ React57.createElement("span", { className: "lw-option-text" }, o.label),
            o.meta && /* @__PURE__ */ React57.createElement("span", { className: "lw-option-meta" }, o.meta)
          );
        }))
      )
    );
  });

  // components/forms/Calendar.jsx
  init_ds_inject_react();
  var React58 = __toESM(require_ds_react(), 1);
  var cx31 = (...a) => a.filter(Boolean).join(" ");
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
    min: min2,
    max: max2,
    weekStart = 1,
    locale,
    prevMonthLabel = "Previous month",
    nextMonthLabel = "Next month",
    className,
    ...rest
  }) {
    const sel = range ? value || {} : value;
    const anchor = (range ? sel.start : sel) || /* @__PURE__ */ new Date();
    const [viewRaw, setView] = React58.useState(() => addMonths(anchor, 0));
    const view = month || viewRaw;
    const setMonth = (m) => {
      onMonthChange ? onMonthChange(m) : setView(m);
    };
    const [focused, setFocused] = React58.useState(() => day(anchor));
    const [hover, setHover] = React58.useState(null);
    const gridRef = React58.useRef(null);
    const navving = React58.useRef(false);
    const fmtMonth = new Intl.DateTimeFormat(locale, { month: "long", year: "numeric" });
    const fmtDow = new Intl.DateTimeFormat(locale, { weekday: "narrow" });
    const fmtFull = new Intl.DateTimeFormat(locale, { weekday: "long", day: "numeric", month: "long", year: "numeric" });
    const first = new Date(view.getFullYear(), view.getMonth(), 1);
    const lead = (first.getDay() - weekStart + 7) % 7;
    const cells = Array.from({ length: 42 }, (_, i) => addDays(first, i - lead));
    const dows = Array.from({ length: 7 }, (_, i) => fmtDow.format(addDays(new Date(2024, 0, 7 + weekStart), i)));
    const weeks = Array.from({ length: 6 }, (_, w) => cells.slice(w * 7, w * 7 + 7));
    const disabled = (d) => min2 && day(d) < day(min2) || max2 && day(d) > day(max2);
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
    const [today, setToday] = React58.useState(null);
    React58.useEffect(() => {
      setToday(day(/* @__PURE__ */ new Date()));
    }, []);
    React58.useEffect(() => {
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
    return /* @__PURE__ */ React58.createElement("div", { className: cx31("lw-cal", className), ...rest }, /* @__PURE__ */ React58.createElement("div", { className: "lw-cal-head" }, /* @__PURE__ */ React58.createElement("button", { type: "button", className: "lw-icon-btn", "aria-label": prevMonthLabel, onClick: () => setMonth(addMonths(view, -1)) }, /* @__PURE__ */ React58.createElement(Icon, { name: "chevron-left", size: 16 })), /* @__PURE__ */ React58.createElement("div", { className: "lw-cal-month", "aria-live": "polite" }, fmtMonth.format(view)), /* @__PURE__ */ React58.createElement("button", { type: "button", className: "lw-icon-btn", "aria-label": nextMonthLabel, onClick: () => setMonth(addMonths(view, 1)) }, /* @__PURE__ */ React58.createElement(Icon, { name: "chevron-right", size: 16 }))), /* @__PURE__ */ React58.createElement("div", { ref: gridRef, className: "lw-cal-grid", role: "grid", onKeyDown, onMouseLeave: () => setHover(null) }, /* @__PURE__ */ React58.createElement("div", { role: "row", className: "lw-cal-dow-row" }, dows.map((d, i) => /* @__PURE__ */ React58.createElement("div", { key: i, role: "columnheader", className: "lw-cal-dow" }, d))), /* @__PURE__ */ React58.createElement("div", { role: "rowgroup", className: "lw-cal-weeks" }, weeks.map((week, w) => /* @__PURE__ */ React58.createElement("div", { key: w, role: "row", className: "lw-cal-week" }, week.map((d, i) => {
      const outside = d.getMonth() !== view.getMonth();
      const selected = isSelected(d);
      const end = range ? sel.end || hover : null;
      const off = disabled(d);
      return /* @__PURE__ */ React58.createElement(
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
  var React59 = __toESM(require_ds_react(), 1);
  var cx32 = (...a) => a.filter(Boolean).join(" ");
  var day2 = (d) => new Date(d.getFullYear(), d.getMonth(), d.getDate());
  var shift4 = (n) => {
    const d = /* @__PURE__ */ new Date();
    d.setDate(d.getDate() + n);
    return day2(d);
  };
  var RANGE_PRESETS = [
    { label: "Today", get: () => ({ start: day2(/* @__PURE__ */ new Date()), end: day2(/* @__PURE__ */ new Date()) }) },
    { label: "Last 7 days", get: () => ({ start: shift4(-6), end: day2(/* @__PURE__ */ new Date()) }) },
    { label: "Last 30 days", get: () => ({ start: shift4(-29), end: day2(/* @__PURE__ */ new Date()) }) },
    { label: "Last 90 days", get: () => ({ start: shift4(-89), end: day2(/* @__PURE__ */ new Date()) }) }
  ];
  var DatePicker = React59.forwardRef(function DatePicker2({
    value,
    onChange,
    range,
    presets = RANGE_PRESETS,
    min: min2,
    max: max2,
    size: size4 = "md",
    invalid,
    disabled,
    placeholder,
    locale,
    label,
    id,
    className,
    ...rest
  }, forwardedRef) {
    const [open, setOpen] = React59.useState(false);
    const uid = React59.useId();
    const fmt2 = new Intl.DateTimeFormat(locale, { day: "numeric", month: "short", year: "numeric" });
    const text = React59.useMemo(() => {
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
    const field = /* @__PURE__ */ React59.createElement(
      "button",
      {
        ref: forwardedRef,
        type: "button",
        id: id || uid,
        disabled,
        "aria-invalid": invalid ? "true" : void 0,
        "aria-label": label,
        className: cx32("lw-input", "lw-datefield", size4 === "sm" && "lw-input-sm", size4 === "lg" && "lw-input-lg", className),
        "data-placeholder": text ? void 0 : "true"
      },
      /* @__PURE__ */ React59.createElement(Icon, { name: "calendar", size: 15, className: "lw-datefield-ic" }),
      /* @__PURE__ */ React59.createElement("span", { className: "lw-datefield-text" }, text || placeholder || (range ? "Pick a range" : "Pick a date"))
    );
    return /* @__PURE__ */ React59.createElement(
      Popover2,
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
      /* @__PURE__ */ React59.createElement("div", { className: "lw-cal-wrap" }, range && presets.length > 0 && /* @__PURE__ */ React59.createElement("div", { className: "lw-cal-presets" }, presets.map((p, i) => (
        /* aria-current, not aria-pressed. These are shortcut ACTIONS —
           each applies a range and closes the panel — so `aria-pressed`
           announced four toggle buttons, three of them "not pressed",
           for a set where at most one is ever the current range and often
           none is. aria-current is the idiom for "this one in the set is
           the current one" and claims nothing about togglability. */
        /* @__PURE__ */ React59.createElement(
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
      ))), /* @__PURE__ */ React59.createElement(Calendar, { value, onChange: (v) => {
        onChange && onChange(v);
        if (!range) setOpen(false);
        else if (v && v.end) setOpen(false);
      }, range, min: min2, max: max2, locale }))
    );
  });

  // components/forms/FileUpload.jsx
  init_ds_inject_react();
  var React60 = __toESM(require_ds_react(), 1);
  var cx33 = (...a) => a.filter(Boolean).join(" ");
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
  var FileUpload = React60.forwardRef(function FileUpload2({
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
    const [over, setOver] = React60.useState(0);
    const [rejected, setRejected] = React60.useState(null);
    const inputRef = React60.useRef(null);
    const setInputRef = useMergedRef(inputRef, forwardedRef);
    const take = (list) => {
      const arr = Array.from(list || []);
      if (!arr.length) return;
      const tooBig = maxSize ? arr.filter((f) => f.size > maxSize) : [];
      setRejected(tooBig.length ? formatRejected(tooBig.map((f) => f.name).join(", "), formatBytes(maxSize)) : null);
      const ok = maxSize ? arr.filter((f) => f.size <= maxSize) : arr;
      if (ok.length && onFiles) onFiles(multiple ? ok : ok.slice(0, 1));
    };
    return /* @__PURE__ */ React60.createElement("div", { className: cx33(className), ...rest }, /* @__PURE__ */ React60.createElement(
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
      /* @__PURE__ */ React60.createElement(
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
      /* @__PURE__ */ React60.createElement(Icon, { name: "upload", size: 20 }),
      /* @__PURE__ */ React60.createElement("span", { className: "lw-dz-title" }, title),
      /* @__PURE__ */ React60.createElement("span", { className: "lw-dz-hint" }, hint || formatHint(accept, maxSize ? formatBytes(maxSize) : null))
    ), rejected && /* @__PURE__ */ React60.createElement("div", { className: "lw-error", role: "alert" }, rejected), files.length > 0 && /* @__PURE__ */ React60.createElement("div", { className: "lw-file-list" }, files.map((f, i) => /* @__PURE__ */ React60.createElement(
      "div",
      {
        key: f.id ?? f.name + i,
        className: "lw-file-row",
        "data-state": f.state,
        style: f.progress != null ? { "--lw-file-pct": f.progress + "%" } : void 0
      },
      /* @__PURE__ */ React60.createElement("span", { className: "lw-file-ic" }, /* @__PURE__ */ React60.createElement(Icon, { name: f.state === "error" ? "x-circle" : f.state === "done" ? "check" : "file", size: 16 })),
      /* @__PURE__ */ React60.createElement("span", { className: "lw-file-main" }, /* @__PURE__ */ React60.createElement("span", { className: "lw-file-name" }, f.name), f.state === "uploading" && f.progress != null ? /* @__PURE__ */ React60.createElement("span", { className: "lw-file-bar" }, /* @__PURE__ */ React60.createElement("i", null)) : /* @__PURE__ */ React60.createElement("span", { className: "lw-file-meta" }, f.error || formatBytes(f.size))),
      onRemove && /* @__PURE__ */ React60.createElement("button", { type: "button", className: "lw-icon-btn", "aria-label": formatRemoveLabel(f.name), onClick: () => onRemove(f) }, /* @__PURE__ */ React60.createElement(Icon, { name: "close", size: 15 }))
    ))));
  });

  // components/forms/Stepper.jsx
  init_ds_inject_react();
  var cx34 = (...a) => a.filter(Boolean).join(" ");
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
        className: cx34("lw-stepper", vertical && "lw-stepper-vertical", className),
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
  var React61 = __toESM(require_ds_react(), 1);
  var cx35 = (...a) => a.filter(Boolean).join(" ");
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
  var RichText = React61.forwardRef(function RichText2({
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
    const ref = React61.useRef(null);
    const setBodyRef = useMergedRef(ref, forwardedRef);
    const bodyId = React61.useId();
    const [active, setActive] = React61.useState({});
    const picked = tools ? TOOLS.filter((t) => t.sep || tools.includes(t.id)) : TOOLS;
    const list = toolLabels ? picked.map((t) => t.id && toolLabels[t.id] ? { ...t, ...toolLabels[t.id] } : t) : picked;
    React61.useEffect(() => {
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
    const [len, setLen] = React61.useState(0);
    const syncLen = () => setLen((ref.current && ref.current.textContent || "").length);
    React61.useEffect(syncLen, [value]);
    const over = maxLength != null && len > maxLength;
    return /* @__PURE__ */ React61.createElement("div", { className: cx35("lw-editor", className), ...rest }, /* @__PURE__ */ React61.createElement("div", { className: "lw-editor-bar", role: "group", "aria-label": formatBarLabel(label || barLabel), "aria-controls": children ? void 0 : bodyId }, list.map((t, i) => t.sep ? /* @__PURE__ */ React61.createElement("span", { key: "s" + i, className: "sep", "aria-hidden": "true" }) : /* @__PURE__ */ React61.createElement(
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
      t.glyph ? /* @__PURE__ */ React61.createElement("span", { className: "lw-editor-glyph", "data-glyph": t.id }, t.glyph) : /* @__PURE__ */ React61.createElement(Icon, { name: t.icon, size: 15 })
    ))), children || /* @__PURE__ */ React61.createElement(
      "div",
      {
        ref: setBodyRef,
        id: bodyId,
        className: "lw-prose lw-editor-body",
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
    ), (footer || maxLength != null) && /* @__PURE__ */ React61.createElement("div", { className: "lw-editor-foot" }, footer, /* @__PURE__ */ React61.createElement("span", { className: "lw-editor-spacer" }), maxLength != null && /* @__PURE__ */ React61.createElement("span", { className: "lw-editor-count", "data-over": over ? "true" : void 0, "aria-live": "polite" }, len, " / ", maxLength)));
  });

  // components/data/Table.jsx
  init_ds_inject_react();

  // components/overlays/Menu.jsx
  init_ds_inject_react();
  var React62 = __toESM(require_ds_react(), 1);
  var cx36 = (...a) => a.filter(Boolean).join(" ");
  function Menu2({ items = [], trigger, onSelect, label, placement = "bottom-start", matchWidth, linkAs = "a", className, ...rest }) {
    const [anchorEl, setAnchorEl] = React62.useState(null);
    const layer = useLayer();
    const { side, align } = toSideAlign(placement);
    const choose = (it) => {
      it.onSelect ? it.onSelect(it) : onSelect && onSelect(it.value, it);
    };
    return /* @__PURE__ */ React62.createElement(dist_exports5.Root, { modal: false, ...pickRoot(rest) }, /* @__PURE__ */ React62.createElement(dist_exports5.Trigger, { asChild: true, ref: setAnchorEl }, trigger), /* @__PURE__ */ React62.createElement(dist_exports5.Portal, { container: layer?.container ?? void 0 }, /* @__PURE__ */ React62.createElement(Layer, { from: anchorEl }, /* @__PURE__ */ React62.createElement(
      dist_exports5.Content,
      {
        side,
        align,
        sideOffset: 6,
        collisionPadding: 8,
        "aria-label": label,
        "data-match-width": matchWidth ? "" : void 0,
        className: "lw-popover",
        ...omitRoot(rest)
      },
      /* @__PURE__ */ React62.createElement("div", { role: "none", className: cx36("lw-menu", className) }, items.map((it, i) => {
        if (it.type === "separator") return /* @__PURE__ */ React62.createElement(dist_exports5.Separator, { key: i, className: "lw-menu-sep" });
        if (it.type === "label") return /* @__PURE__ */ React62.createElement(dist_exports5.Label, { key: i, className: "lw-menu-label" }, it.label);
        const checkable = it.checked != null;
        const rowClass = cx36("lw-menu-item", it.danger && "danger");
        const body = /* @__PURE__ */ React62.createElement(React62.Fragment, null, (checkable || it.icon) && /* @__PURE__ */ React62.createElement("span", { className: "lw-menu-lead" }, checkable ? /* @__PURE__ */ React62.createElement(dist_exports5.ItemIndicator, null, /* @__PURE__ */ React62.createElement(Icon, { name: "checkmark", size: 14 })) : /* @__PURE__ */ React62.createElement(Icon, { name: it.icon, size: 15 })), /* @__PURE__ */ React62.createElement("span", { className: "lw-menu-text" }, it.label), it.kbd && /* @__PURE__ */ React62.createElement("span", { className: "lw-menu-kbd" }, it.kbd));
        const key = it.value ?? i;
        if (checkable) {
          return /* @__PURE__ */ React62.createElement(
            dist_exports5.CheckboxItem,
            {
              key,
              className: rowClass,
              checked: !!it.checked,
              disabled: it.disabled,
              onSelect: () => choose(it)
            },
            body
          );
        }
        if (it.href) {
          const LinkAs = linkAs;
          return /* @__PURE__ */ React62.createElement(dist_exports5.Item, { key, asChild: true, className: rowClass, disabled: it.disabled, onSelect: () => choose(it) }, /* @__PURE__ */ React62.createElement(LinkAs, { href: it.href }, body));
        }
        return /* @__PURE__ */ React62.createElement(dist_exports5.Item, { key, className: rowClass, disabled: it.disabled, onSelect: () => choose(it) }, body);
      }))
    ))));
  }
  var ROOT_KEYS = ["open", "defaultOpen", "onOpenChange"];
  function pickRoot(rest) {
    const out = {};
    for (const k of ROOT_KEYS) if (k in rest) out[k] = rest[k];
    return out;
  }
  function omitRoot(rest) {
    const out = { ...rest };
    for (const k of ROOT_KEYS) delete out[k];
    return out;
  }

  // components/_overflow.js
  init_ds_inject_react();
  var React63 = __toESM(require_ds_react(), 1);
  function useOverflow() {
    const ref = React63.useRef(null);
    React63.useEffect(() => {
      const el = ref.current;
      if (!el) return void 0;
      const measure = () => {
        const remaining = el.scrollWidth - el.clientWidth - Math.abs(el.scrollLeft);
        if (remaining > 1) el.setAttribute("data-overflow", "true");
        else el.removeAttribute("data-overflow");
      };
      measure();
      let ro;
      if (typeof ResizeObserver !== "undefined") {
        ro = new ResizeObserver(measure);
        ro.observe(el);
        for (const child of el.children) ro.observe(child);
      }
      el.addEventListener("scroll", measure, { passive: true });
      return () => {
        if (ro) ro.disconnect();
        el.removeEventListener("scroll", measure);
      };
    });
    return ref;
  }

  // components/data/_columns.js
  init_ds_inject_react();
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
  var cx37 = (...a) => a.filter(Boolean).join(" ");
  var labelText = (h) => typeof h === "string" ? h : typeof h === "number" ? String(h) : void 0;
  function Table({
    columns,
    rows,
    hover = true,
    compact = false,
    caption,
    sort: sortState,
    onSort,
    collapse,
    detailsLabel,
    sortLabel,
    className,
    children,
    ...rest
  }) {
    const legacyArgs = legacySortArgs("Table", columns || [], onSort);
    const cards = collapse === "cards";
    const wrapRef = useOverflow();
    if (cards && !detailsLabel) {
      warnOnce(
        "Table",
        "detailsLabel",
        '`collapse="cards"` needs `detailsLabel` — the collapsed row\'s disclosure is rendered with no accessible name, so the columns behind it cannot be reached.'
      );
    }
    const sortOf = (c) => {
      if (sortState && sortState.key === c.key) return sortState.dir === "desc" ? "descending" : "ascending";
      if (sortState) return void 0;
      return c.sort === "asc" ? "ascending" : c.sort === "desc" ? "descending" : c.sort;
    };
    const isSortable = (c) => Boolean((c.sortable || c.sort) && onSort);
    const head = columns && /* @__PURE__ */ React.createElement("thead", { role: cards ? "rowgroup" : void 0 }, /* @__PURE__ */ React.createElement("tr", { role: cards ? "row" : void 0 }, columns.map((c) => {
      const sortable = isSortable(c);
      const sort = sortOf(c);
      return /* @__PURE__ */ React.createElement(
        "th",
        {
          key: c.key,
          className: c.num ? "num" : void 0,
          scope: "col",
          role: cards ? "columnheader" : void 0,
          "aria-sort": sortable ? sort || "none" : sort || void 0
        },
        sortable ? /* @__PURE__ */ React.createElement("button", { type: "button", onClick: () => emitSort(onSort, legacyArgs, c.key, sort === "ascending" ? "desc" : "asc") }, colHeader("Table", c), /* @__PURE__ */ React.createElement(Icon, { name: sort === "descending" ? "chevron-down" : "chevron-up", size: 12 })) : colHeader("Table", c)
      );
    })));
    const sortableCols = cards && onSort && columns ? columns.filter(isSortable) : [];
    if (sortableCols.length > 0 && !sortLabel) {
      warnOnce(
        "Table",
        "sortLabel",
        '`collapse="cards"` hides the header row, so a sortable column needs `sortLabel` to reach the sort menu. Without it the collapsed table cannot be sorted at all.'
      );
    }
    const sortBar = sortableCols.length > 0 && sortLabel ? /* @__PURE__ */ React.createElement("div", { className: "lw-table-sort" }, /* @__PURE__ */ React.createElement(
      Menu2,
      {
        label: sortLabel,
        placement: "bottom-end",
        items: sortableCols.map((c) => ({
          value: c.key,
          label: colHeader("Table", c),
          /* `checked` makes the row a menuitemcheckbox, so the column in force
             is announced as such instead of being a caret a screen reader
             never reaches. Choosing the active column flips its direction —
             the same gesture the header button performs. */
          checked: sortOf(c) !== void 0,
          icon: sortOf(c) === "descending" ? "chevron-down" : sortOf(c) === "ascending" ? "chevron-up" : void 0
        })),
        onSelect: (key) => {
          const c = sortableCols.find((x) => x.key === key);
          emitSort(onSort, legacyArgs, key, sortOf(c) === "ascending" ? "desc" : "asc");
        },
        trigger: /* @__PURE__ */ React.createElement("button", { type: "button", className: "lw-btn lw-btn-ghost lw-btn-sm" }, sortLabel, /* @__PURE__ */ React.createElement(Icon, { name: "chevron-down", size: 14 }))
      }
    )) : null;
    const partOf = (i) => i === 0 ? "title" : i <= 2 ? "meta" : "detail";
    const hasDetails = cards && columns && columns.length > 3;
    return (
      /* The wrapper SCROLLS, so it must be reachable by keyboard — a region a
         mouse can pan and a keyboard cannot is `scrollable-region-focusable`, an
         axe SERIOUS violation, and the only way to read the right-hand columns
         without a pointer. `CompareTable` was given exactly this treatment in
         v1.3.3; `Table` never was, because until v1.7.0 promoted `.lw-table-wrap`
         out of product.css the rule that makes it scroll was not loaded on any
         page axe scanned. The overflow was always in the component's intent — it
         just could not be observed. `role="region"` + the caption as its label is
         what stops a bare tabindex from announcing an unnamed stop. */
      /* @__PURE__ */ React.createElement(
        "div",
        {
          ref: wrapRef,
          className: "lw-table-wrap lw-scroll",
          "data-collapse": cards ? "cards" : void 0,
          tabIndex: 0,
          role: "region",
          "aria-label": typeof caption === "string" ? caption : void 0
        },
        sortBar,
        /* @__PURE__ */ React.createElement(
          "table",
          {
            className: cx37("lw-table", hover && "lw-table-hover", compact && "lw-table-compact", cards && "lw-table-collapse", className),
            role: cards ? "table" : void 0,
            ...rest
          },
          caption && /* @__PURE__ */ React.createElement("caption", { className: "lw-sr-only" }, caption),
          head,
          rows ? /* @__PURE__ */ React.createElement("tbody", { role: cards ? "rowgroup" : void 0 }, rows.map((r, i) => /* @__PURE__ */ React.createElement("tr", { key: r.id ?? i, role: cards ? "row" : void 0 }, columns.map((c, ci) => {
            const part = cards ? partOf(ci) : void 0;
            return /* @__PURE__ */ React.createElement(
              "td",
              {
                key: c.key,
                role: cards ? "cell" : void 0,
                "data-part": part,
                "data-label": part === "detail" ? labelText(colHeader("Table", c)) : void 0,
                className: cx37(c.num && "num", c.muted && "muted")
              },
              r[c.key],
              part === "title" && hasDetails && /* @__PURE__ */ React.createElement("details", { className: "lw-row-more" }, /* @__PURE__ */ React.createElement("summary", null, detailsLabel, /* @__PURE__ */ React.createElement(Icon, { name: "chevron-down", size: 12 })))
            );
          })))) : children
        )
      )
    );
  }

  // components/data/KpiTile.jsx
  init_ds_inject_react();
  var cx38 = (...a) => a.filter(Boolean).join(" ");
  function KpiTile({ label, value, icon, accent: accentIn = "brand", delta, direction, tone: toneIn, note, className, ...rest }) {
    const accent = normTone("KpiTile", accentIn, "accent");
    const tone = normTone("KpiTile", toneIn);
    const ink = tone || (direction === "up" ? "success" : direction === "down" ? "danger" : void 0);
    return /* @__PURE__ */ React.createElement("div", { className: cx38("lw-kpi", className), ...rest }, /* @__PURE__ */ React.createElement("span", { className: "lw-kpi-head" }, /* @__PURE__ */ React.createElement("span", { className: "k" }, label), icon && /* @__PURE__ */ React.createElement("span", { className: "lw-kpi-badge", "data-accent": accent }, /* @__PURE__ */ React.createElement(Icon, { name: icon, size: 18 }))), /* @__PURE__ */ React.createElement("span", { className: "lw-kpi-row" }, /* @__PURE__ */ React.createElement("span", { className: "v" }, value), (delta || note) && /* @__PURE__ */ React.createElement("span", { className: cx38("d", direction, ink) }, direction && /* @__PURE__ */ React.createElement(Icon, { name: direction === "up" ? "arrow-up" : "arrow-down", size: 13 }), delta, note && /* @__PURE__ */ React.createElement("span", { className: "w" }, note))));
  }

  // components/data/StatMeter.jsx
  init_ds_inject_react();
  var cx39 = (...a) => a.filter(Boolean).join(" ");
  function StatMeter({
    label,
    value,
    unit,
    delta,
    direction,
    percent,
    target,
    tone: toneIn,
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
        className: cx39("lw-card", "lw-stat-tile", interactive && "lw-card-interactive", className),
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
          "data-tone": normTone("StatMeter", toneIn),
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
  var cx40 = (...a) => a.filter(Boolean).join(" ");
  function EmptyState({ icon, glyph, title, description, action, className, children, ...rest }) {
    return /* @__PURE__ */ React.createElement("div", { className: cx40("lw-empty", className), ...rest }, (icon || glyph) && /* @__PURE__ */ React.createElement("span", { className: "glyph", "aria-hidden": "true" }, icon ? /* @__PURE__ */ React.createElement(Icon, { name: icon, size: 22 }) : glyph), /* @__PURE__ */ React.createElement("span", { className: "t" }, title), description && /* @__PURE__ */ React.createElement("span", { className: "s" }, description), action || children);
  }

  // components/data/StateView.jsx
  init_ds_inject_react();
  var cx41 = (...a) => a.filter(Boolean).join(" ");
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
      return /* @__PURE__ */ React.createElement("div", { className: cx41("lw-state", className), "data-variant": "loading", role: "status", "aria-busy": "true", ...rest }, /* @__PURE__ */ React.createElement("span", { className: "lw-sr-only" }, title || p.title), /* @__PURE__ */ React.createElement(Skeleton, { lines }));
    }
    const isAlert = variant === "error" || variant === "offline";
    const label = actionLabel || p.actionLabel;
    return /* @__PURE__ */ React.createElement(
      "div",
      {
        className: cx41("lw-state", className),
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
  var cx42 = (...a) => a.filter(Boolean).join(" ");
  function Console({ url = "leanwise.ai", title, lines, foot, className, children, ...rest }) {
    const cellCount = lines ? lines.reduce((n, l) => Math.max(n, l.cells ? l.cells.length : 0), 0) : 0;
    const logStyle = cellCount ? {
      gridTemplateColumns: "minmax(0, max-content) " + "minmax(0, max-content) ".repeat(Math.max(0, cellCount - 1)) + "minmax(0, max-content) minmax(0, 1fr)"
    } : void 0;
    return /* @__PURE__ */ React.createElement("div", { className: cx42("lw-console", className), ...rest }, /* @__PURE__ */ React.createElement("div", { className: "lw-console-h" }, /* @__PURE__ */ React.createElement("span", { className: "left" }, /* @__PURE__ */ React.createElement("span", { className: "lights" }, /* @__PURE__ */ React.createElement("i", null), /* @__PURE__ */ React.createElement("i", null), /* @__PURE__ */ React.createElement("i", null)), title), url && /* @__PURE__ */ React.createElement("span", { className: "url" }, url)), /* @__PURE__ */ React.createElement("div", { className: "lw-console-body" }, lines ? /* @__PURE__ */ React.createElement("div", { className: "lw-console-log", role: "log", style: logStyle }, lines.map((l, i) => /* @__PURE__ */ React.createElement("div", { key: i, className: cx42("lw-console-line", normTone("Console", l.tone)) }, (l.t || cellCount > 0) && /* @__PURE__ */ React.createElement("span", { className: "t" }, l.t), l.cells ? l.cells.map((c, j) => {
      const cell = typeof c === "string" ? { text: c } : c || {};
      return /* @__PURE__ */ React.createElement("span", { key: j, className: cx42("lw-console-cell", cell.num && "num", cell.muted && "muted") }, cell.text);
    }) : /* @__PURE__ */ React.createElement("span", { className: "lw-console-span" }, l.text)))) : children), foot && /* @__PURE__ */ React.createElement("div", { className: "lw-console-foot" }, foot));
  }

  // components/data/CodeBlock.jsx
  init_ds_inject_react();
  var React64 = __toESM(require_ds_react(), 1);
  var cx43 = (...a) => a.filter(Boolean).join(" ");
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
    const [copied, setCopied] = React64.useState(false);
    const canCopy = copy && typeof code === "string" && code.length > 0;
    React64.useEffect(() => {
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
    return /* @__PURE__ */ React64.createElement("figure", { className: cx43("lw-code", className), ...rest }, (filename || lang || canCopy) && /* @__PURE__ */ React64.createElement("figcaption", { className: "lw-code-head" }, /* @__PURE__ */ React64.createElement("span", { className: "fn" }, filename), /* @__PURE__ */ React64.createElement("span", { className: "end" }, lang && /* @__PURE__ */ React64.createElement("span", { className: "lang" }, lang), canCopy && /* @__PURE__ */ React64.createElement(
      "button",
      {
        type: "button",
        className: "lw-icon-btn",
        onClick: onCopy,
        "aria-label": copied ? copiedLabel : copyLabel,
        title: copied ? copiedLabel : copyLabel
      },
      /* @__PURE__ */ React64.createElement(Icon, { name: copied ? "check" : "copy", size: 15 })
    ))), /* @__PURE__ */ React64.createElement("pre", null, /* @__PURE__ */ React64.createElement("code", { dangerouslySetInnerHTML: html ? { __html: html } : void 0 }, html ? void 0 : code)));
  }

  // components/data/Pagination.jsx
  init_ds_inject_react();
  var React65 = __toESM(require_ds_react(), 1);
  var cx44 = (...a) => a.filter(Boolean).join(" ");
  function pages(page, count3) {
    const out = [];
    const push = (p) => {
      if (out[out.length - 1] !== p) out.push(p);
    };
    for (let p = 1; p <= count3; p++) {
      if (p === 1 || p === count3 || Math.abs(p - page) <= 1) push(p);
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
    locale,
    className,
    ...rest
  }) {
    const count3 = total != null ? Math.max(1, Math.ceil(total / pageSize)) : 1;
    const from = total ? (page - 1) * pageSize + 1 : 0;
    const to = total ? Math.min(page * pageSize, total) : 0;
    const nf2 = React65.useMemo(() => new Intl.NumberFormat(locale || void 0), [locale]);
    const go = (p) => onPageChange && onPageChange(Math.min(Math.max(1, p), count3));
    return /* @__PURE__ */ React65.createElement("nav", { className: cx44("lw-pagination", className), "aria-label": label, ...rest }, /* @__PURE__ */ React65.createElement("span", { className: "lw-pag-info" }, cursor ? formatCursor(page) : total ? formatCount(from, to, total, (v) => nf2.format(v)) : ""), /* @__PURE__ */ React65.createElement("span", { className: "lw-spacer" }), onPageSizeChange && !cursor && /* @__PURE__ */ React65.createElement(
      "select",
      {
        className: "lw-input lw-input-sm lw-pag-size",
        "aria-label": pageSizeLabel,
        value: pageSize,
        onChange: (e) => onPageSizeChange(Number(e.target.value))
      },
      pageSizes.map((s) => /* @__PURE__ */ React65.createElement("option", { key: s, value: s }, formatPageSize(s)))
    ), /* @__PURE__ */ React65.createElement(
      "button",
      {
        type: "button",
        className: "lw-pag-btn",
        "aria-label": prevLabel,
        disabled: cursor ? !hasPrev : page <= 1,
        onClick: () => go(page - 1)
      },
      /* @__PURE__ */ React65.createElement(Icon, { name: "chevron-left", size: 15 })
    ), !cursor && pages(page, count3).map(
      (p, i) => p === "gap" ? /* @__PURE__ */ React65.createElement("span", { key: "g" + i, className: "lw-pag-gap", "aria-hidden": "true" }, "…") : /* @__PURE__ */ React65.createElement(
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
    ), /* @__PURE__ */ React65.createElement(
      "button",
      {
        type: "button",
        className: "lw-pag-btn",
        "aria-label": nextLabel,
        disabled: cursor ? !hasNext : page >= count3,
        onClick: () => go(page + 1)
      },
      /* @__PURE__ */ React65.createElement(Icon, { name: "chevron-right", size: 15 })
    ));
  }

  // components/data/DataGrid.jsx
  init_ds_inject_react();
  var React66 = __toESM(require_ds_react(), 1);
  var cx45 = (...a) => a.filter(Boolean).join(" ");
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
    const [widths, setWidths] = React66.useState(() => columns.map((c) => c.width || DEFAULT_W));
    const [scrollTop, setScrollTop] = React66.useState(0);
    const scrollRef = React66.useRef(null);
    const drag = React66.useRef(null);
    const colKeys = columns.map((c) => c.key).join("\0");
    React66.useEffect(() => {
      setWidths((prev) => columns.map((c, i) => prev[i] || c.width || DEFAULT_W));
    }, [colKeys]);
    const selSet = React66.useMemo(() => new Set(selected), [selected]);
    const allOn = rows.length > 0 && rows.every((r, i) => selSet.has(rowKey(r, i)));
    const someOn = !allOn && rows.some((r, i) => selSet.has(rowKey(r, i)));
    const toggleAll = () => onSelectionChange && onSelectionChange(allOn ? [] : rows.map(rowKey));
    const toggleRow = (k) => {
      if (!onSelectionChange) return;
      const next = new Set(selSet);
      next.has(k) ? next.delete(k) : next.add(k);
      onSelectionChange(Array.from(next));
    };
    const pinLefts = React66.useMemo(() => {
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
        const min2 = columns[d.i].minWidth || MIN_W;
        setWidths((w) => w.map((v, n) => n === d.i ? Math.max(min2, d.w + latest - d.x) : v));
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
      const min2 = columns[i].minWidth || MIN_W;
      setWidths((w) => w.map((v, n) => n === i ? Math.max(min2, (v || DEFAULT_W) + d) : v));
    };
    const win = virtualize && rows.length * rowHeight > height;
    const start = win ? Math.max(0, Math.floor(scrollTop / rowHeight) - overscan) : 0;
    const visibleCount = win ? Math.ceil(height / rowHeight) + overscan * 2 : rows.length;
    const slice = win ? rows.slice(start, start + visibleCount) : rows;
    const padTop = win ? start * rowHeight : 0;
    const padBottom = win ? Math.max(0, (rows.length - start - slice.length) * rowHeight) : 0;
    const total = (selectable ? SEL_W : 0) + widths.reduce((s, w) => s + (w || DEFAULT_W), 0);
    return /* @__PURE__ */ React66.createElement("div", { className: cx45("lw-dgrid", className), ...rest }, selectable && selSet.size > 0 && /* @__PURE__ */ React66.createElement("div", { className: "lw-dgrid-selbar" }, /* @__PURE__ */ React66.createElement("span", { className: "count" }, selSet.size), /* @__PURE__ */ React66.createElement("span", null, selectedLabel), /* @__PURE__ */ React66.createElement("span", { className: "lw-spacer" }), selectionActions, /* @__PURE__ */ React66.createElement("button", { type: "button", className: "lw-filter-clear", onClick: () => onSelectionChange && onSelectionChange([]) }, clearSelectionLabel)), /* @__PURE__ */ React66.createElement(
      "div",
      {
        ref: scrollRef,
        className: "lw-dgrid-scroll",
        style: { maxHeight: height },
        onScroll: win ? (e) => setScrollTop(e.currentTarget.scrollTop) : void 0
      },
      /* @__PURE__ */ React66.createElement("table", { style: { minWidth: total }, "aria-label": label, "aria-rowcount": rows.length }, /* @__PURE__ */ React66.createElement("colgroup", null, selectable && /* @__PURE__ */ React66.createElement("col", { style: { width: SEL_W } }), columns.map((c, i) => /* @__PURE__ */ React66.createElement("col", { key: c.key, style: { width: widths[i] || DEFAULT_W } }))), /* @__PURE__ */ React66.createElement("thead", null, /* @__PURE__ */ React66.createElement("tr", null, selectable && /* @__PURE__ */ React66.createElement("th", { "data-pin": "true", style: { insetInlineStart: 0 }, scope: "col" }, /* @__PURE__ */ React66.createElement("span", { className: "lw-dgrid-check" }, /* @__PURE__ */ React66.createElement("label", { className: "lw-check" }, /* @__PURE__ */ React66.createElement(
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
      ), /* @__PURE__ */ React66.createElement("span", { className: "box" })))), columns.map((c, i) => {
        const dir = sort && sort.key === c.key ? sort.dir : null;
        return /* @__PURE__ */ React66.createElement(
          "th",
          {
            key: c.key,
            scope: "col",
            className: cx45(c.num && "num"),
            "data-pin": c.pin ? "true" : void 0,
            "data-pin-last": c.pin && i === lastPin ? "true" : void 0,
            style: c.pin ? { insetInlineStart: pinLefts[i] } : void 0,
            "aria-sort": dir ? dir === "asc" ? "ascending" : "descending" : void 0
          },
          c.sortable && onSort ? /* @__PURE__ */ React66.createElement(
            "button",
            {
              type: "button",
              className: "lw-dgrid-sort",
              onClick: () => emitSort(onSort, legacyArgs, c.key, dir === "asc" ? "desc" : "asc")
            },
            colHeader("DataGrid", c),
            /* @__PURE__ */ React66.createElement(Icon, { name: dir === "asc" ? "sort-asc" : dir === "desc" ? "sort-desc" : "chevrons-up-down", size: 13 })
          ) : colHeader("DataGrid", c),
          c.resizable !== false && /* @__PURE__ */ React66.createElement(
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
      }))), /* @__PURE__ */ React66.createElement("tbody", null, padTop > 0 && /* @__PURE__ */ React66.createElement("tr", { "aria-hidden": "true", className: "lw-dgrid-pad", style: { height: padTop } }, /* @__PURE__ */ React66.createElement("td", { colSpan: columns.length + (selectable ? 1 : 0) })), slice.map((r, n) => {
        const i = start + n;
        const k = rowKey(r, i);
        const on = selSet.has(k);
        return /* @__PURE__ */ React66.createElement(
          "tr",
          {
            key: k,
            "aria-selected": on || void 0,
            "aria-rowindex": i + 2,
            "data-clickable": onRowClick ? "true" : void 0,
            style: { height: rowHeight },
            onClick: onRowClick ? () => onRowClick(r, i) : void 0
          },
          selectable && /* @__PURE__ */ React66.createElement("td", { "data-pin": "true", style: { insetInlineStart: 0 }, onClick: (e) => e.stopPropagation() }, /* @__PURE__ */ React66.createElement("span", { className: "lw-dgrid-check" }, /* @__PURE__ */ React66.createElement("label", { className: "lw-check" }, /* @__PURE__ */ React66.createElement(
            "input",
            {
              type: "checkbox",
              checked: on,
              onChange: () => toggleRow(k),
              "aria-label": formatRowSelectLabel(i + 1)
            }
          ), /* @__PURE__ */ React66.createElement("span", { className: "box" })))),
          columns.map((c, ci) => /* @__PURE__ */ React66.createElement(
            "td",
            {
              key: c.key,
              className: cx45(c.num && "num"),
              "data-pin": c.pin ? "true" : void 0,
              "data-pin-last": c.pin && ci === lastPin ? "true" : void 0,
              style: c.pin ? { insetInlineStart: pinLefts[ci] } : void 0
            },
            c.render ? c.render(r, i) : r[c.key]
          ))
        );
      }), padBottom > 0 && /* @__PURE__ */ React66.createElement("tr", { "aria-hidden": "true", className: "lw-dgrid-pad", style: { height: padBottom } }, /* @__PURE__ */ React66.createElement("td", { colSpan: columns.length + (selectable ? 1 : 0) })))),
      !rows.length && /* @__PURE__ */ React66.createElement("div", { className: "lw-dgrid-empty" }, empty)
    ));
  }

  // components/data/Progress.jsx
  init_ds_inject_react();
  var cx46 = (...a) => a.filter(Boolean).join(" ");
  function Progress({ value = 0, max: max2 = 100, label, tone: toneIn, className, ...rest }) {
    const tone = normTone("Progress", toneIn);
    const pct = Math.max(0, Math.min(100, Number(value) / Number(max2 || 100) * 100));
    return /* @__PURE__ */ React.createElement(
      "span",
      {
        className: cx46("lw-progress", className),
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
  var cx47 = (...a) => a.filter(Boolean).join(" ");
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
    return /* @__PURE__ */ React.createElement("div", { className: cx47("lw-filters", className), role: "group", "aria-label": label, ...rest }, children, filters.map((f) => /* @__PURE__ */ React.createElement("span", { key: f.id ?? f.key + ":" + f.value, className: "lw-filter-chip" }, f.key && /* @__PURE__ */ React.createElement("span", { className: "k" }, f.key), /* @__PURE__ */ React.createElement("span", null, f.label ?? f.value), /* @__PURE__ */ React.createElement(
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
    return /* @__PURE__ */ React.createElement("div", { className: cx47("lw-toolbar", className), ...rest }, children);
  }

  // components/data/BarChart.jsx
  init_ds_inject_react();

  // components/data/chart-parts.jsx
  init_ds_inject_react();
  var cx48 = (...a) => a.filter(Boolean).join(" ");
  var SERIES = (i) => "var(--lw-chart-" + (i % 8 + 1) + ")";
  var nf = new Intl.NumberFormat();
  var numberFormat = (locale) => locale ? new Intl.NumberFormat(locale) : nf;
  function DataTable({ labels, series, caption, categoryHeader = "Category" }) {
    return /* @__PURE__ */ React.createElement("table", { className: "lw-sr-only" }, /* @__PURE__ */ React.createElement("caption", null, caption), /* @__PURE__ */ React.createElement("thead", null, /* @__PURE__ */ React.createElement("tr", null, /* @__PURE__ */ React.createElement("th", { scope: "col" }, categoryHeader), series.map((s, i) => /* @__PURE__ */ React.createElement("th", { key: i, scope: "col" }, s.name)))), /* @__PURE__ */ React.createElement("tbody", null, labels.map((l, i) => /* @__PURE__ */ React.createElement("tr", { key: i }, /* @__PURE__ */ React.createElement("th", { scope: "row" }, l), series.map((s, si) => /* @__PURE__ */ React.createElement("td", { key: si }, nf.format(s.data[i])))))));
  }
  function Legend({ series }) {
    if (series.length < 2) return null;
    return /* @__PURE__ */ React.createElement("div", { className: "lw-chart-legend" }, series.map((s, i) => /* @__PURE__ */ React.createElement("span", { key: i }, /* @__PURE__ */ React.createElement("i", { style: { "--lw-swatch": s.color || SERIES(i) } }), s.name)));
  }
  var ticks = (max2, n = 4) => {
    const step = Math.pow(10, Math.floor(Math.log10(max2 / n || 1)));
    const s = Math.ceil(max2 / n / step) * step;
    return Array.from({ length: n + 1 }, (_, i) => i * s);
  };
  var CHART_W = 640;
  var CHART_PAD = { t: 8, r: 8, b: 22, l: 40 };
  function frame(max2, height) {
    const pad = CHART_PAD, w = CHART_W;
    const ts = ticks(max2);
    const top = ts[ts.length - 1];
    const iw = w - pad.l - pad.r, ih = height - pad.t - pad.b;
    return { w, pad, ts, top, iw, ih, y: (v) => pad.t + ih - v / top * ih };
  }
  function Grid2({ f }) {
    return /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement("g", { className: "grid" }, f.ts.map((v, i) => /* @__PURE__ */ React.createElement("line", { key: i, x1: f.pad.l, x2: f.w - f.pad.r, y1: f.y(v), y2: f.y(v) }))), /* @__PURE__ */ React.createElement("g", { className: "axis" }, f.ts.map((v, i) => /* @__PURE__ */ React.createElement("text", { key: i, x: f.pad.l - 6, y: f.y(v) + 3, textAnchor: "end" }, nf.format(v)))));
  }

  // components/data/BarChart.jsx
  function BarChart({ labels = [], series = [], height = 200, stacked, label, locale, className, ...rest }) {
    const nf2 = numberFormat(locale);
    const max2 = Math.max(1, ...series.flatMap((s) => stacked ? [] : s.data), ...stacked ? labels.map((_, i) => series.reduce((a, s) => a + s.data[i], 0)) : []);
    const f = frame(max2, height);
    const { w, pad, top, iw, ih, y } = f;
    const bandW = iw / Math.max(labels.length, 1);
    const barW = stacked ? bandW * 0.56 : bandW * 0.72 / Math.max(series.length, 1);
    return /* @__PURE__ */ React.createElement("div", { className: cx48("lw-chart-wrap", className), ...rest }, /* @__PURE__ */ React.createElement("svg", { className: "lw-chart", viewBox: "0 0 " + w + " " + height, role: "img", "aria-label": label }, /* @__PURE__ */ React.createElement(Grid2, { f }), /* @__PURE__ */ React.createElement("g", { className: "axis" }, labels.map((l, i) => /* @__PURE__ */ React.createElement("text", { key: i, x: pad.l + bandW * i + bandW / 2, y: height - 6, textAnchor: "middle" }, l))), labels.map((l, i) => {
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
          /* @__PURE__ */ React.createElement("title", null, s.name + " · " + l + " · " + nf2.format(v))
        );
      });
    })), /* @__PURE__ */ React.createElement(Legend, { series }), /* @__PURE__ */ React.createElement(DataTable, { labels, series, caption: label }));
  }

  // components/data/LineChart.jsx
  init_ds_inject_react();
  function LineChart({ labels = [], series = [], height = 200, area, label, locale, className, ...rest }) {
    const nf2 = numberFormat(locale);
    const max2 = Math.max(1, ...series.flatMap((s) => s.data));
    const f = frame(max2, height);
    const { w, pad, top, iw, ih, y } = f;
    const x = (i) => pad.l + (labels.length < 2 ? iw / 2 : iw / (labels.length - 1) * i);
    return /* @__PURE__ */ React.createElement("div", { className: cx48("lw-chart-wrap", className), ...rest }, /* @__PURE__ */ React.createElement("svg", { className: "lw-chart", viewBox: "0 0 " + w + " " + height, role: "img", "aria-label": label }, /* @__PURE__ */ React.createElement(Grid2, { f }), /* @__PURE__ */ React.createElement("g", { className: "axis" }, labels.map((l, i) => /* @__PURE__ */ React.createElement("text", { key: i, x: x(i), y: height - 6, textAnchor: "middle" }, l))), series.map((s, si) => {
      const d = s.data.map((v, i) => (i ? "L" : "M") + x(i) + " " + y(v)).join(" ");
      const c = s.color || SERIES(si);
      return /* @__PURE__ */ React.createElement("g", { key: si }, area && /* @__PURE__ */ React.createElement("path", { d: d + " L" + x(s.data.length - 1) + " " + (pad.t + ih) + " L" + x(0) + " " + (pad.t + ih) + " Z", fill: c, opacity: "0.12" }), /* @__PURE__ */ React.createElement("path", { className: "line", d, stroke: c }), s.data.map((v, i) => /* @__PURE__ */ React.createElement("circle", { key: i, className: "dot", cx: x(i), cy: y(v), r: "3", fill: c }, /* @__PURE__ */ React.createElement("title", null, s.name + " · " + labels[i] + " · " + nf2.format(v)))));
    })), /* @__PURE__ */ React.createElement(Legend, { series }), /* @__PURE__ */ React.createElement(DataTable, { labels, series, caption: label }));
  }

  // components/data/ActivityFeed.jsx
  init_ds_inject_react();
  var React67 = __toESM(require_ds_react(), 1);
  var cx49 = (...a) => a.filter(Boolean).join(" ");
  var ms = (when) => when instanceof Date ? when.getTime() : new Date(when).getTime();
  var stamp = (when, locale) => new Intl.DateTimeFormat(locale || void 0, { day: "numeric", month: "short" }).format(ms(when));
  var RELATIVE_LABELS = { now: "just now", minutes: "m ago", hours: "h ago", days: "d ago" };
  var BUCKET_LABELS = { today: "Today", yesterday: "Yesterday", week: "This week", earlier: "Earlier" };
  function timeAgo(when, now = Date.now(), labels = RELATIVE_LABELS, locale) {
    const t = ms(when);
    const s = Math.max(0, (now - t) / 1e3);
    if (s < 60) return labels.now;
    if (s < 3600) return Math.floor(s / 60) + labels.minutes;
    if (s < 86400) return Math.floor(s / 3600) + labels.hours;
    if (s < 86400 * 3) return Math.floor(s / 86400) + labels.days;
    return stamp(when, locale);
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
    locale,
    className,
    ...rest
  }) {
    const [mounted, setMounted] = React67.useState(null);
    React67.useEffect(() => {
      setMounted(Date.now());
    }, []);
    const at2 = now != null ? now : mounted;
    const groups = [];
    items.forEach((it) => {
      const g = grouped && it.when && at2 != null ? bucketLabels[bucketKey(it.when, at2)] : null;
      const last = groups[groups.length - 1];
      if (last && last.name === g) last.items.push(it);
      else groups.push({ name: g, items: [it] });
    });
    return /* @__PURE__ */ React67.createElement("div", { className: cx49("lw-feed", className), role: "group", "aria-label": label, ...rest }, groups.map((g, gi) => (
      /* Keyed on the index: two runs can carry the same bucket name when the
         items are not in date order, and a duplicate key is a dropped child. */
      /* @__PURE__ */ React67.createElement(React67.Fragment, { key: gi }, g.name && /* @__PURE__ */ React67.createElement("div", { className: "lw-feed-group" }, g.name), g.items.map((it, i) => {
        const Tag = it.href ? linkAs : onItemClick || it.onClick ? "button" : "div";
        return /* @__PURE__ */ React67.createElement(
          Tag,
          {
            key: it.id ?? gi + "-" + i,
            className: "lw-feed-item",
            href: it.href || void 0,
            type: Tag === "button" ? "button" : void 0,
            "data-unread": it.unread ? "true" : void 0,
            "data-tone": normTone("ActivityFeed", it.tone),
            onClick: Tag === "div" ? void 0 : () => it.onClick ? it.onClick(it) : onItemClick && onItemClick(it)
          },
          it.icon && /* @__PURE__ */ React67.createElement("span", { className: "lw-feed-ic" }, /* @__PURE__ */ React67.createElement(Icon, { name: it.icon, size: 15 })),
          /* @__PURE__ */ React67.createElement("span", { className: "lw-feed-main" }, /* @__PURE__ */ React67.createElement("span", { className: "lw-feed-title" }, it.title), /* @__PURE__ */ React67.createElement("span", { className: "lw-feed-meta" }, it.when ? at2 != null ? formatTimeAgo(it.when, at2, RELATIVE_LABELS, locale) : stamp(it.when, locale) : null, it.meta ? (it.when ? " · " : "") + it.meta : "")),
          it.unread && /* @__PURE__ */ React67.createElement("span", { className: "lw-sr-only" }, unreadLabel)
        );
      }))
    )));
  }

  // components/nav/TopBar.jsx
  init_ds_inject_react();

  // components/nav/NavMenu.jsx
  init_ds_inject_react();
  var cx50 = (...a) => a.filter(Boolean).join(" ");
  function NavMenu({ label, groups = [], linkAs = "a", name, className, ...rest }) {
    const Link = linkAs;
    return /* @__PURE__ */ React.createElement("details", { className: cx50("lw-navmenu", className), name, ...rest }, /* @__PURE__ */ React.createElement("summary", null, /* @__PURE__ */ React.createElement("span", null, label), /* @__PURE__ */ React.createElement("span", { className: "lw-navmenu-chevron", "aria-hidden": "true" })), /* @__PURE__ */ React.createElement("div", { className: "lw-navmenu-panel" }, groups.map((group, gi) => /* @__PURE__ */ React.createElement("div", { className: "lw-navmenu-group", key: group.id ?? gi }, group.label && /* @__PURE__ */ React.createElement("span", { className: "lw-navmenu-group-h" }, group.label), group.items?.map((item, ii) => /* @__PURE__ */ React.createElement(
      Link,
      {
        key: item.id ?? ii,
        href: item.href,
        className: "lw-navmenu-item",
        "aria-current": item.current ? "page" : void 0
      },
      /* @__PURE__ */ React.createElement("span", { className: "t" }, item.label, item.status && /* @__PURE__ */ React.createElement("span", { className: "lw-navmenu-status" }, item.status)),
      item.description && /* @__PURE__ */ React.createElement("span", { className: "d" }, item.description)
    ))))));
  }

  // components/nav/TopBar.jsx
  var cx51 = (...a) => a.filter(Boolean).join(" ");
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
    return /* @__PURE__ */ React.createElement("header", { className: cx51("lw-topbar", className), ...rest }, logo ? /* @__PURE__ */ React.createElement(Brand, { className: "brand", ...brandProps }, /* @__PURE__ */ React.createElement("span", { className: "brand-mark", "aria-hidden": "true" }), /* @__PURE__ */ React.createElement("span", { className: "brand-name" }, brand)) : brand && /* @__PURE__ */ React.createElement(Brand, { className: "brand", ...brandProps }, brand), links.length > 0 && /* @__PURE__ */ React.createElement("nav", { "aria-label": navLabel }, links.map((l, i) => l.menu ? /* @__PURE__ */ React.createElement(NavMenu, { key: l.id ?? i, label: l.label, groups: l.menu, linkAs, name: "lw-topbar-menu" }) : /* @__PURE__ */ React.createElement(Link, { key: l.id ?? i, href: l.href, "aria-current": l.current ? "page" : void 0 }, l.label))), /* @__PURE__ */ React.createElement("span", { className: "spacer" }), actions, children);
  }

  // components/nav/AppBar.jsx
  init_ds_inject_react();

  // components/nav/Breadcrumbs.jsx
  init_ds_inject_react();
  var React68 = __toESM(require_ds_react(), 1);
  var cx52 = (...a) => a.filter(Boolean).join(" ");
  function Breadcrumbs({ items = [], linkAs = "a", label = "Breadcrumb", className, ...rest }) {
    const Link = linkAs;
    return /* @__PURE__ */ React68.createElement("nav", { className: cx52("lw-crumbs", className), "aria-label": label, ...rest }, items.map((it, i) => /* @__PURE__ */ React68.createElement(React68.Fragment, { key: i }, i > 0 && /* @__PURE__ */ React68.createElement("span", { className: "sep", "aria-hidden": "true" }, "/"), it.href && i < items.length - 1 ? /* @__PURE__ */ React68.createElement(Link, { href: it.href }, it.label) : /* @__PURE__ */ React68.createElement("span", { "aria-current": i === items.length - 1 ? "page" : void 0 }, it.label))));
  }

  // components/nav/AppBar.jsx
  var cx53 = (...a) => a.filter(Boolean).join(" ");
  function AppBar({
    brand = "LeanWise AI",
    brandHref = "#",
    mark = true,
    crumbs = [],
    onMenuClick,
    menuExpanded,
    menuIcon = "sidebar",
    menuClassName,
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
        className: cx53("lw-icon-btn", menuClassName),
        onClick: onMenuClick,
        "aria-expanded": menuExpanded,
        "aria-label": menuExpanded ? collapseNavLabel : expandNavLabel
      },
      /* @__PURE__ */ React.createElement(Icon, { name: menuIcon, size: 21 })
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
  var cx54 = (...a) => a.filter(Boolean).join(" ");
  function Sidebar({ items = [], collapsed = false, footer, linkAs, label = "Sections", className, children, ...rest }) {
    return /* @__PURE__ */ React.createElement("nav", { className: cx54("lw-sidebar", className), "data-collapsed": collapsed ? "true" : void 0, "aria-label": label, ...rest }, items.map(
      (it, i) => it.group ? /* @__PURE__ */ React.createElement("span", { key: "g" + i, className: "lw-nav-group" }, it.group) : /* @__PURE__ */ React.createElement(NavItem, { key: it.id ?? i, linkAs, ...it, collapsed })
    ), children, footer && /* @__PURE__ */ React.createElement("div", { className: "lw-sidebar-foot" }, footer));
  }
  function NavItem({ href, label, icon, badge, current, collapsed, linkAs = "a", className, ...rest }) {
    const Tag = href ? linkAs : "button";
    const tip = collapsed && typeof label === "string" ? label : void 0;
    return /* @__PURE__ */ React.createElement(
      Tag,
      {
        className: cx54("lw-nav-item", className),
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
  var React69 = __toESM(require_ds_react(), 1);
  var cx55 = (...a) => a.filter(Boolean).join(" ");
  function Tabs3({ tabs = [], value, onChange, label, className, ...rest }) {
    return /* @__PURE__ */ React69.createElement(dist_exports8.Root, { asChild: true, value, onValueChange: onChange, activationMode: "automatic" }, /* @__PURE__ */ React69.createElement(dist_exports8.List, { className: cx55("lw-tabs", className), "aria-label": label, ...rest }, tabs.map((t) => /* @__PURE__ */ React69.createElement(dist_exports8.Trigger, { key: t.value, value: t.value, id: t.id, "aria-controls": t.controls }, t.label, t.count != null && /* @__PURE__ */ React69.createElement("span", { className: "count" }, t.count)))));
  }

  // components/nav/ThemeToggle.jsx
  init_ds_inject_react();
  var React70 = __toESM(require_ds_react(), 1);

  // hooks.js
  init_ds_inject_react();
  var import_react3 = __toESM(require_ds_react(), 1);
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
  var RAIL_KEY = "lw-rail-collapsed";

  // components/nav/ThemeToggle.jsx
  var cx56 = (...a) => a.filter(Boolean).join(" ");
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
    const [internal, setInternal] = React70.useState(modes.includes("system") ? "system" : modes[0]);
    React70.useEffect(() => {
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
    React70.useEffect(() => {
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
      return /* @__PURE__ */ React70.createElement(
        "button",
        {
          type: "button",
          className: cx56("lw-icon-btn", "lw-hit", "lw-theme-compact", className),
          "aria-label": name,
          title: name,
          onClick: () => apply(next),
          ...rest
        },
        /* @__PURE__ */ React70.createElement(Icon, { name: GLYPHS[mode] || "monitor", size: 18 })
      );
    }
    const { ref, onKeyDown, tabIndexFor } = useRadioGroup(modes, mode, apply);
    return /* @__PURE__ */ React70.createElement(
      "div",
      {
        ref,
        className: cx56("lw-segmented", className),
        role: "radiogroup",
        "aria-label": label,
        onKeyDown,
        ...rest
      },
      modes.map((m, i) => /* @__PURE__ */ React70.createElement(
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
        /* @__PURE__ */ React70.createElement(Icon, { name: GLYPHS[m] || "monitor", size: 16 })
      ))
    );
  }

  // components/nav/LocaleSwitcher.jsx
  init_ds_inject_react();
  var React71 = __toESM(require_ds_react(), 1);
  var cx57 = (...a) => a.filter(Boolean).join(" ");
  function LocaleSwitcher({
    value,
    onChange,
    locales = [],
    localeLabels = {},
    label = "Language",
    compact = false,
    className,
    ...rest
  }) {
    const codes = locales.length ? locales : Object.keys(localeLabels);
    const nameOf = (code) => localeLabels[code] || code;
    const apply = (code) => code !== value && onChange?.(code);
    if (compact && codes.length === 2) {
      const other = codes[0] === value ? codes[1] : codes[0];
      return /* @__PURE__ */ React71.createElement(
        "button",
        {
          type: "button",
          className: cx57("lw-icon-btn", "lw-hit", "lw-locale-compact", className),
          "aria-label": label + ": " + nameOf(value) + " → " + nameOf(other),
          title: label + ": " + nameOf(value) + " → " + nameOf(other),
          onClick: () => apply(other),
          "data-testid": "locale-toggle",
          lang: other,
          ...rest
        },
        /* @__PURE__ */ React71.createElement(Icon, { name: "globe", size: 18 })
      );
    }
    if (compact) {
      return /* @__PURE__ */ React71.createElement(
        Menu2,
        {
          label,
          placement: "bottom-end",
          items: codes.map((code) => ({
            value: code,
            label: nameOf(code),
            /* `checked` makes each row a `menuitemcheckbox`, so the current
               language is announced as checked rather than merely styled. */
            checked: code === value,
            onSelect: () => apply(code)
          })),
          trigger: /* @__PURE__ */ React71.createElement(
            "button",
            {
              type: "button",
              className: cx57("lw-icon-btn", "lw-hit", "lw-locale-compact", className),
              "aria-label": label + ": " + nameOf(value),
              title: label + ": " + nameOf(value),
              "data-testid": "locale-compact",
              ...rest
            },
            /* @__PURE__ */ React71.createElement(Icon, { name: "globe", size: 18 })
          )
        }
      );
    }
    const { ref, onKeyDown, tabIndexFor } = useRadioGroup(codes, value, apply);
    return /* @__PURE__ */ React71.createElement(
      "div",
      {
        ref,
        className: cx57("lw-segmented", className),
        role: "radiogroup",
        "aria-label": label,
        onKeyDown,
        "data-testid": "locale-switcher",
        ...rest
      },
      codes.map((code, i) => /* @__PURE__ */ React71.createElement(
        "button",
        {
          key: code,
          type: "button",
          role: "radio",
          "aria-checked": value === code,
          tabIndex: tabIndexFor(i),
          onClick: () => apply(code),
          lang: code
        },
        nameOf(code)
      ))
    );
  }

  // components/nav/CommandPalette.jsx
  init_ds_inject_react();
  var React72 = __toESM(require_ds_react(), 1);
  var cx58 = (...a) => a.filter(Boolean).join(" ");
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
    onCloseAutoFocus: userCloseAutoFocus,
    ...rest
  }) {
    const layer = useLayer();
    const inputRef = React72.useRef(null);
    const [q, setQ] = React72.useState("");
    const [active, setActive] = React72.useState(0);
    const [fromEl, setFromEl] = React72.useState(null);
    const openerRef = React72.useRef(null);
    const uid = React72.useId();
    React72.useLayoutEffect(() => {
      if (open) {
        setQ("");
        setActive(0);
        const el = typeof document !== "undefined" ? document.activeElement : null;
        openerRef.current = el;
        setFromEl(el);
      } else setFromEl(null);
    }, [open]);
    const onOpenAutoFocus = (e) => {
      e.preventDefault();
      inputRef.current && inputRef.current.focus({ preventScroll: true });
    };
    const onCloseAutoFocus = (e) => {
      if (userCloseAutoFocus) userCloseAutoFocus(e);
      if (e.defaultPrevented) return;
      const el = openerRef.current;
      if (el && typeof el.focus === "function" && el.isConnected) {
        e.preventDefault();
        el.focus();
      }
    };
    const handleOpenChange = (next) => {
      if (!next && onClose) onClose();
    };
    const shown = React72.useMemo(() => commands.filter((c) => !c.hidden).map((c) => ({ c, s: Math.max(score(q, c.label), score(q, c.group || "") - 4, ...(c.keywords || []).map((k) => score(q, k) - 2)) })).filter((x) => x.s >= 0).sort((a, b) => b.s - a.s).map((x) => x.c), [q, commands]);
    React72.useEffect(() => {
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
    return /* @__PURE__ */ React72.createElement(dist_exports.Root, { open: !!open, onOpenChange: handleOpenChange, modal: true }, /* @__PURE__ */ React72.createElement(dist_exports.Portal, { container: layer ? layer.container : void 0 }, /* @__PURE__ */ React72.createElement("div", null, /* @__PURE__ */ React72.createElement(Layer, { modal: true, from: fromEl }, /* @__PURE__ */ React72.createElement(dist_exports.Overlay, { className: "lw-backdrop" }), /* @__PURE__ */ React72.createElement(dist_exports.Content, { className: cx58("lw-cmdk", className), tabIndex: -1, onOpenAutoFocus, onCloseAutoFocus, onKeyDown, ...rest }, /* @__PURE__ */ React72.createElement(dist_exports.Title, { className: "lw-sr-only" }, label), /* @__PURE__ */ React72.createElement("div", { className: "lw-cmdk-input" }, /* @__PURE__ */ React72.createElement(Icon, { name: "search", size: 17 }), /* @__PURE__ */ React72.createElement(
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
    )), /* @__PURE__ */ React72.createElement("ul", { className: "lw-cmdk-list lw-menu", id: uid, role: "listbox", "aria-label": label }, !shown.length && /* @__PURE__ */ React72.createElement("li", { className: "lw-listbox-empty" }, emptyText), shown.map((c, i) => {
      const head = c.group && c.group !== lastGroup ? lastGroup = c.group : null;
      return /* @__PURE__ */ React72.createElement(React72.Fragment, { key: c.id ?? i }, head && /* @__PURE__ */ React72.createElement("li", { className: "lw-menu-label", role: "presentation" }, head), /* @__PURE__ */ React72.createElement(
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
        /* @__PURE__ */ React72.createElement("span", { className: "lw-menu-lead" }, c.icon && /* @__PURE__ */ React72.createElement(Icon, { name: c.icon, size: 15 })),
        /* @__PURE__ */ React72.createElement("span", { className: "lw-menu-text" }, c.label),
        c.kbd && /* @__PURE__ */ React72.createElement("span", { className: "lw-menu-kbd" }, c.kbd)
      ));
    })), /* @__PURE__ */ React72.createElement("div", { className: "lw-cmdk-foot" }, hints.map((h, i) => /* @__PURE__ */ React72.createElement("span", { key: i }, h))))))));
  }

  // components/nav/BottomNav.jsx
  init_ds_inject_react();
  var React73 = __toESM(require_ds_react(), 1);
  var cx59 = (...a) => a.filter(Boolean).join(" ");
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
    React73.useEffect(() => {
      if (items.length <= 5 || typeof console === "undefined") return;
      console.warn("BottomNav: " + items.length + " items. Past five, labels truncate and the bar stops being scannable — use a sidebar or a More destination.");
    }, [items.length]);
    return /* @__PURE__ */ React73.createElement("nav", { className: cx59("lw-bottom-nav", className), "aria-label": label, ...rest }, items.map((it) => {
      const on = it.value === value;
      const Tag = it.href ? linkAs : "button";
      return /* @__PURE__ */ React73.createElement(
        Tag,
        {
          key: it.value,
          href: it.href || void 0,
          type: it.href ? void 0 : "button",
          "aria-current": on ? "page" : void 0,
          onClick: it.href ? void 0 : () => onChange && onChange(it.value)
        },
        /* @__PURE__ */ React73.createElement(Icon, { name: it.icon, size: 21 }),
        /* @__PURE__ */ React73.createElement("span", { className: "lw-bn-label" }, it.label),
        it.badge != null && /* @__PURE__ */ React73.createElement("span", { className: "lw-sr-only" }, formatBadgeLabel(it.badge))
      );
    }));
  }

  // components/nav/NavToggle.jsx
  init_ds_inject_react();
  var React74 = __toESM(require_ds_react(), 1);
  var cx60 = (...a) => a.filter(Boolean).join(" ");
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
    const auto = React74.useId();
    const panelId = id || "lw-nav-panel-" + auto;
    const [open, setOpen] = React74.useState(defaultOpen);
    const btnRef = React74.useRef(null);
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
    return /* @__PURE__ */ React74.createElement(React74.Fragment, null, /* @__PURE__ */ React74.createElement(
      "button",
      {
        type: "button",
        ref: btnRef,
        className: cx60("lw-topbar-toggle", "lw-icon-btn", "lw-hit", className),
        "aria-expanded": open,
        "aria-controls": panelId,
        "aria-label": open ? closeLabel : label,
        onClick: () => set(!open),
        onKeyDown,
        ...rest
      },
      /* @__PURE__ */ React74.createElement(Icon, { name: open ? "close" : "menu", size: 20 })
    ), /* @__PURE__ */ React74.createElement("div", { id: panelId, className: "lw-topbar-panel", hidden: !open, onKeyDown }, children));
  }

  // components/overlays/Dialog.jsx
  init_ds_inject_react();
  var React75 = __toESM(require_ds_react(), 1);
  var cx61 = (...a) => a.filter(Boolean).join(" ");
  function Dialog2({
    open,
    onOpenChange,
    onClose,
    trigger,
    title,
    label,
    description,
    footer,
    width,
    closeLabel = "Close",
    className,
    children,
    onCloseAutoFocus: userCloseAutoFocus,
    ...rest
  }) {
    const layer = useLayer();
    const [fromEl, setFromEl] = React75.useState(null);
    const openerRef = React75.useRef(null);
    const w = width == null || width === "" ? null : /^\d+(\.\d+)?$/.test(String(width)) ? String(width) + "px" : String(width);
    React75.useLayoutEffect(() => {
      if (open) {
        const el = typeof document !== "undefined" ? document.activeElement : null;
        openerRef.current = el;
        setFromEl(el);
      } else setFromEl(null);
    }, [open]);
    const onCloseAutoFocus = (e) => {
      if (userCloseAutoFocus) userCloseAutoFocus(e);
      if (e.defaultPrevented) return;
      const el = openerRef.current;
      if (el && typeof el.focus === "function" && el.isConnected) {
        e.preventDefault();
        el.focus();
      }
    };
    const handleOpenChange = (next) => {
      onOpenChange && onOpenChange(next);
      if (!next && onClose) onClose();
    };
    return /* @__PURE__ */ React75.createElement(dist_exports.Root, { open: !!open, onOpenChange: handleOpenChange, modal: true }, trigger && /* @__PURE__ */ React75.createElement(dist_exports.Trigger, { asChild: true }, trigger), /* @__PURE__ */ React75.createElement(dist_exports.Portal, { container: layer ? layer.container : void 0 }, /* @__PURE__ */ React75.createElement("div", null, /* @__PURE__ */ React75.createElement(Layer, { modal: true, from: fromEl }, /* @__PURE__ */ React75.createElement(dist_exports.Overlay, { className: "lw-backdrop" }), /* @__PURE__ */ React75.createElement(
      dist_exports.Content,
      {
        className: cx61("lw-dialog", className),
        tabIndex: -1,
        onCloseAutoFocus,
        style: w ? { "--lw-dialog-w": w } : void 0,
        ...rest
      },
      title ? /* @__PURE__ */ React75.createElement("div", { className: "lw-dialog-head" }, /* @__PURE__ */ React75.createElement(dist_exports.Title, { className: "lw-dialog-title" }, title), /* @__PURE__ */ React75.createElement(dist_exports.Close, { asChild: true }, /* @__PURE__ */ React75.createElement("button", { type: "button", className: "lw-icon-btn lw-dialog-close lw-hit", "aria-label": closeLabel, title: closeLabel }, /* @__PURE__ */ React75.createElement(Icon, { name: "close", size: 17 })))) : (
        /* Radix names the dialog from its Title and logs an error when
           there is none — a nameless dialog is the defect, not the
           warning. `label` is the sr-only name for a title-less one. */
        label != null && /* @__PURE__ */ React75.createElement(dist_exports.Title, { className: "lw-sr-only" }, label)
      ),
      /* @__PURE__ */ React75.createElement("div", { className: "lw-dialog-body" }, description && /* @__PURE__ */ React75.createElement(dist_exports.Description, { asChild: true }, /* @__PURE__ */ React75.createElement("div", null, description)), children),
      footer && /* @__PURE__ */ React75.createElement("div", { className: "lw-dialog-foot" }, footer)
    )))));
  }

  // components/overlays/Toast.jsx
  init_ds_inject_react();
  var cx62 = (...a) => a.filter(Boolean).join(" ");
  function Toast({
    tone: toneIn = "info",
    label,
    onClose,
    toneLabels: toneLabelsIn = { success: "done", warning: "warn", danger: "error", info: "info" },
    dismissLabel = "Dismiss",
    children,
    className,
    ...rest
  }) {
    const tone = normTone("Toast", toneIn);
    const toneLabels = normToneMap("Toast", toneLabelsIn, "toneLabels key");
    const k = label || toneLabels[tone] || toneLabels.info;
    return (
      /* No role here. The enclosing ToastRegion is the live region; a role="status"
         or role="alert" INSIDE it nests two, which is why an announcement could
         come twice or not at all. An error toast raises the REGION's urgency
         instead — one live region, one politeness setting. */
      /* @__PURE__ */ React.createElement("div", { className: cx62("lw-toast", tone !== "info" && tone, className), ...rest }, /* @__PURE__ */ React.createElement("span", { className: "k" }, k), /* @__PURE__ */ React.createElement("span", { className: "msg" }, children), onClose && /* @__PURE__ */ React.createElement("button", { type: "button", className: "lw-icon-btn", "aria-label": dismissLabel, title: dismissLabel, onClick: onClose }, /* @__PURE__ */ React.createElement(Icon, { name: "close", size: 15 })))
    );
  }
  function ToastRegion({ className, children, urgent, label = "Notifications", ...rest }) {
    return /* @__PURE__ */ React.createElement(
      "div",
      {
        className: cx62("lw-toast-region", className),
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
  var React76 = __toESM(require_ds_react(), 1);
  var cx63 = (...a) => a.filter(Boolean).join(" ");
  var TOOLTIP_DELAY_MS = 300;
  var TOOLTIP_SKIP_DELAY_MS = 500;
  function Tooltip2({
    tip,
    side = "top",
    open,
    defaultOpen,
    onOpenChange,
    delayDuration,
    className,
    children,
    ...rest
  }) {
    const layer = useLayer();
    const [trigger, setTrigger] = React76.useState(null);
    const root = /* @__PURE__ */ React76.createElement(dist_exports9.Root, { open, defaultOpen, onOpenChange, delayDuration }, /* @__PURE__ */ React76.createElement(dist_exports9.Trigger, { asChild: true, ref: setTrigger }, children), /* @__PURE__ */ React76.createElement(dist_exports9.Portal, { container: layer ? layer.container : void 0 }, /* @__PURE__ */ React76.createElement(Layer, { from: trigger }, /* @__PURE__ */ React76.createElement(dist_exports9.Content, { className: cx63("lw-tooltip", className), side, sideOffset: 6, ...rest }, tip))));
    return layer ? root : /* @__PURE__ */ React76.createElement(dist_exports9.Provider, { delayDuration: TOOLTIP_DELAY_MS, skipDelayDuration: TOOLTIP_SKIP_DELAY_MS }, root);
  }

  // components/overlays/Drawer.jsx
  init_ds_inject_react();
  var React77 = __toESM(require_ds_react(), 1);
  var cx64 = (...a) => a.filter(Boolean).join(" ");
  function Drawer({
    open,
    onOpenChange,
    onClose,
    trigger,
    title,
    label,
    description,
    footer,
    side = "end",
    width,
    closeLabel = "Close",
    className,
    children,
    onCloseAutoFocus: userCloseAutoFocus,
    ...rest
  }) {
    const layer = useLayer();
    const [fromEl, setFromEl] = React77.useState(null);
    const openerRef = React77.useRef(null);
    const w = width == null || width === "" ? null : /^\d+(\.\d+)?$/.test(String(width)) ? String(width) + "px" : String(width);
    React77.useLayoutEffect(() => {
      if (open) {
        const el = typeof document !== "undefined" ? document.activeElement : null;
        openerRef.current = el;
        setFromEl(el);
      } else setFromEl(null);
    }, [open]);
    const onCloseAutoFocus = (e) => {
      if (userCloseAutoFocus) userCloseAutoFocus(e);
      if (e.defaultPrevented) return;
      const el = openerRef.current;
      if (el && typeof el.focus === "function" && el.isConnected) {
        e.preventDefault();
        el.focus();
      }
    };
    const handleOpenChange = (next) => {
      onOpenChange && onOpenChange(next);
      if (!next && onClose) onClose();
    };
    return /* @__PURE__ */ React77.createElement(dist_exports.Root, { open: !!open, onOpenChange: handleOpenChange, modal: true }, trigger && /* @__PURE__ */ React77.createElement(dist_exports.Trigger, { asChild: true }, trigger), /* @__PURE__ */ React77.createElement(dist_exports.Portal, { container: layer ? layer.container : void 0 }, /* @__PURE__ */ React77.createElement("div", null, /* @__PURE__ */ React77.createElement(Layer, { modal: true, from: fromEl }, /* @__PURE__ */ React77.createElement(dist_exports.Overlay, { className: "lw-backdrop" }), /* @__PURE__ */ React77.createElement(
      dist_exports.Content,
      {
        className: cx64("lw-drawer", className),
        onCloseAutoFocus,
        "data-side": side,
        tabIndex: -1,
        style: w ? { "--lw-drawer-w": w } : void 0,
        ...rest
      },
      title ? /* @__PURE__ */ React77.createElement("div", { className: "lw-drawer-head" }, /* @__PURE__ */ React77.createElement(dist_exports.Title, { className: "lw-drawer-title" }, title), /* @__PURE__ */ React77.createElement(dist_exports.Close, { asChild: true }, /* @__PURE__ */ React77.createElement("button", { type: "button", className: "lw-icon-btn lw-hit", "aria-label": closeLabel, title: closeLabel }, /* @__PURE__ */ React77.createElement(Icon, { name: "close", size: 17 })))) : label != null && /* @__PURE__ */ React77.createElement(dist_exports.Title, { className: "lw-sr-only" }, label),
      /* @__PURE__ */ React77.createElement("div", { className: "lw-drawer-body" }, description && /* @__PURE__ */ React77.createElement(dist_exports.Description, { asChild: true }, /* @__PURE__ */ React77.createElement("div", null, description)), children),
      footer && /* @__PURE__ */ React77.createElement("div", { className: "lw-drawer-foot" }, footer)
    )))));
  }

  // components/overlays/OverlayProvider.jsx
  init_ds_inject_react();
  var React78 = __toESM(require_ds_react(), 1);
  var TOOLTIP_DELAY_MS2 = 300;
  var TOOLTIP_SKIP_DELAY_MS2 = 500;
  function OverlayProvider({ container, children }) {
    const [own, setOwn] = React78.useState(null);
    const node = container || own;
    const value = React78.useMemo(() => ({ container: node }), [node]);
    return /* @__PURE__ */ React78.createElement(LayerContext.Provider, { value }, /* @__PURE__ */ React78.createElement(dist_exports9.Provider, { delayDuration: TOOLTIP_DELAY_MS2, skipDelayDuration: TOOLTIP_SKIP_DELAY_MS2 }, children, !container && /* @__PURE__ */ React78.createElement("div", { className: "lw-layer-root", ref: setOwn })));
  }

  // components/ai/PromptInput.jsx
  init_ds_inject_react();
  var cx65 = (...a) => a.filter(Boolean).join(" ");
  function PromptInput({ value, onChange, onSubmit, placeholder = "Ask anything about your documents…", hint = "⏎ to send · ⇧⏎ newline", label = "Prompt", tools, action, disabled, className, children, ...rest }) {
    const onKeyDown = (e) => {
      if (disabled) return;
      if (e.key === "Enter" && !e.shiftKey) {
        e.preventDefault();
        onSubmit && onSubmit();
      }
    };
    return /* @__PURE__ */ React.createElement("div", { className: cx65("lw-prompt", className), ...rest }, /* @__PURE__ */ React.createElement(
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
  var cx66 = (...a) => a.filter(Boolean).join(" ");
  function Message({ role = "ai", who, avatar, streaming = false, footer, className, children, ...rest }) {
    const name = who || (role === "ai" ? "LeanWise" : "You");
    const glyph = avatar || /* @__PURE__ */ React.createElement(Icon, { name: role === "ai" ? "spark" : "user", size: role === "ai" ? 19 : 16 });
    return /* @__PURE__ */ React.createElement("div", { className: cx66("lw-msg", role, className), "data-streaming": streaming ? "true" : void 0, ...rest }, /* @__PURE__ */ React.createElement("span", { className: "lw-msg-avatar", "aria-hidden": "true" }, glyph), /* @__PURE__ */ React.createElement("div", { className: "lw-msg-main" }, /* @__PURE__ */ React.createElement("span", { className: "who" }, name), /* @__PURE__ */ React.createElement("div", { className: "body" }, children, footer)));
  }

  // components/ai/SourceChip.jsx
  init_ds_inject_react();
  var cx67 = (...a) => a.filter(Boolean).join(" ");
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
        className: cx67("lw-source", className),
        type: Tag === "button" ? "button" : void 0,
        "aria-label": formatLabel(n, title),
        ...rest
      },
      n
    );
  }

  // components/ai/SourceList.jsx
  init_ds_inject_react();
  var cx68 = (...a) => a.filter(Boolean).join(" ");
  function SourceList({ sources = [], linkAs = "a", className, ...rest }) {
    return /* @__PURE__ */ React.createElement("div", { className: cx68("lw-source-list", className), ...rest }, sources.map((s, i) => {
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
  var cx69 = (...a) => a.filter(Boolean).join(" ");
  function ConfidenceMeter({ value = 0, label = "match", className, style, ...rest }) {
    const pct = Math.max(0, Math.min(100, Math.round(value)));
    return /* @__PURE__ */ React.createElement(
      "span",
      {
        className: cx69("lw-confidence", pct < 60 && "low", className),
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
  var cx70 = (...a) => a.filter(Boolean).join(" ");
  function AgentTrace({ steps = [], className, ...rest }) {
    return /* @__PURE__ */ React.createElement("ol", { className: cx70("lw-trace", className), ...rest }, steps.map((s, i) => /* @__PURE__ */ React.createElement("li", { key: i, "data-state": s.state || "pending" }, /* @__PURE__ */ React.createElement("span", { className: "step" }, s.label), s.meta && /* @__PURE__ */ React.createElement("span", { className: "meta" }, s.meta))));
  }

  // components/ai/ToolCall.jsx
  init_ds_inject_react();
  var React79 = __toESM(require_ds_react(), 1);
  var cx71 = (...a) => a.filter(Boolean).join(" ");
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
    const [open, setOpen] = React79.useState(!!defaultOpen);
    const uid = React79.useId();
    const st = error ? "error" : state;
    return /* @__PURE__ */ React79.createElement("div", { className: cx71("lw-tool", className), "data-state": st, ...rest }, /* @__PURE__ */ React79.createElement("button", { type: "button", className: "lw-tool-head", "aria-expanded": open, "aria-controls": uid, onClick: () => setOpen((o) => !o) }, /* @__PURE__ */ React79.createElement(Icon, { name: open ? "chevron-down" : "chevron-right", size: 14 }), /* @__PURE__ */ React79.createElement("span", { className: "lw-tool-dot", "aria-hidden": "true" }), /* @__PURE__ */ React79.createElement("span", { className: "lw-tool-name" }, name), /* @__PURE__ */ React79.createElement("span", { className: "lw-tool-sum" }, summary), duration != null && /* @__PURE__ */ React79.createElement("span", { className: "lw-tool-dur" }, formatDuration(duration)), /* @__PURE__ */ React79.createElement("span", { className: "lw-sr-only" }, stateLabels[st] ?? stateLabels.ok)), open && /* @__PURE__ */ React79.createElement("div", { className: "lw-tool-body", id: uid }, args != null && /* @__PURE__ */ React79.createElement(React79.Fragment, null, /* @__PURE__ */ React79.createElement("span", { className: "k" }, argsLabel), /* @__PURE__ */ React79.createElement("pre", null, fmt(args))), error ? /* @__PURE__ */ React79.createElement(React79.Fragment, null, /* @__PURE__ */ React79.createElement("span", { className: "k" }, errorLabel), /* @__PURE__ */ React79.createElement("pre", { className: "err" }, fmt(error))) : result != null && /* @__PURE__ */ React79.createElement(React79.Fragment, null, /* @__PURE__ */ React79.createElement("span", { className: "k" }, resultLabel), /* @__PURE__ */ React79.createElement("pre", null, fmt(result)))));
  }

  // components/ai/DiffReview.jsx
  init_ds_inject_react();
  var cx72 = (...a) => a.filter(Boolean).join(" ");
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
    return /* @__PURE__ */ React.createElement("div", { className: cx72("lw-diff", className), role: "group", "aria-label": label, ...rest }, hunks.map((h) => {
      const d = decisions[h.id];
      return /* @__PURE__ */ React.createElement("div", { key: h.id, className: "lw-diff-hunk", "data-decision": d }, /* @__PURE__ */ React.createElement("div", { className: "lw-diff-head" }, /* @__PURE__ */ React.createElement(Icon, { name: "file", size: 14, className: "lw-diff-ic" }), /* @__PURE__ */ React.createElement("span", { className: "lw-diff-file" }, h.file, h.range ? " · " + h.range : "")), /* @__PURE__ */ React.createElement("div", { className: "lw-diff-lines" }, h.lines.map((l, i) => /* @__PURE__ */ React.createElement("div", { key: i, className: "lw-diff-line", "data-kind": l.kind }, /* @__PURE__ */ React.createElement("span", { className: "n" }, l.n ?? ""), /* @__PURE__ */ React.createElement("span", { className: "s", "aria-hidden": "true" }, SIGN[l.kind] || ""), /* @__PURE__ */ React.createElement("span", { className: "t" }, l.kind && /* @__PURE__ */ React.createElement("span", { className: "lw-sr-only" }, kindLabels[l.kind] ?? kindLabels.mod), l.text)))), /* @__PURE__ */ React.createElement("div", { className: "lw-diff-foot" }, /* @__PURE__ */ React.createElement("span", { className: "lw-diff-state" }, d === "accepted" ? acceptedLabel : d === "rejected" ? rejectedLabel : h.note || ""), d ? /* @__PURE__ */ React.createElement(Button, { size: "sm", variant: "ghost", onClick: () => onDecide && onDecide(h.id, null) }, /* @__PURE__ */ React.createElement(Icon, { name: "undo", size: 14 }), undoLabel) : /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement(Button, { size: "sm", variant: "ghost", onClick: () => onDecide && onDecide(h.id, "rejected") }, rejectLabel), /* @__PURE__ */ React.createElement(Button, { size: "sm", onClick: () => onDecide && onDecide(h.id, "accepted") }, acceptLabel))));
    }), hunks.length > 1 && /* @__PURE__ */ React.createElement("div", { className: "lw-diff-foot" }, /* @__PURE__ */ React.createElement("span", { className: "lw-diff-state", "aria-live": "polite" }, formatProgress(pending, hunks.length)), /* @__PURE__ */ React.createElement(Button, { size: "sm", variant: "ghost", onClick: onRejectAll, disabled: !pending }, rejectAllLabel), /* @__PURE__ */ React.createElement(Button, { size: "sm", onClick: onAcceptAll, disabled: !pending }, acceptAllLabel)));
  }

  // components/ai/Artifact.jsx
  init_ds_inject_react();
  var cx73 = (...a) => a.filter(Boolean).join(" ");
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
    return /* @__PURE__ */ React.createElement("div", { className: cx73("lw-artifact", className), ...rest }, /* @__PURE__ */ React.createElement("div", { className: "lw-artifact-head" }, /* @__PURE__ */ React.createElement(Icon, { name: "file", size: 15, className: "lw-artifact-ic" }), /* @__PURE__ */ React.createElement("span", { className: "lw-artifact-title" }, title), version != null && /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement("button", { type: "button", className: "lw-icon-btn", "aria-label": prevVersionLabel, disabled: !canPrev, onClick: onPrevVersion }, /* @__PURE__ */ React.createElement(Icon, { name: "chevron-left", size: 15 })), /* @__PURE__ */ React.createElement("span", { className: "lw-artifact-ver" }, "v", version, versionCount ? " / " + versionCount : ""), /* @__PURE__ */ React.createElement("button", { type: "button", className: "lw-icon-btn", "aria-label": nextVersionLabel, disabled: !canNext, onClick: onNextVersion }, /* @__PURE__ */ React.createElement(Icon, { name: "chevron-right", size: 15 })))), /* @__PURE__ */ React.createElement("div", { className: "lw-artifact-body" }, children), (onRevert || onEdit || actions) && /* @__PURE__ */ React.createElement("div", { className: "lw-artifact-foot" }, onEdit && /* @__PURE__ */ React.createElement("button", { type: "button", className: "lw-btn lw-btn-ghost lw-btn-sm", onClick: onEdit }, /* @__PURE__ */ React.createElement(Icon, { name: "edit", size: 14 }), editLabel), onRevert && /* @__PURE__ */ React.createElement("button", { type: "button", className: "lw-btn lw-btn-ghost lw-btn-sm", onClick: onRevert }, /* @__PURE__ */ React.createElement(Icon, { name: "undo", size: 14 }), revertLabel), /* @__PURE__ */ React.createElement("span", { className: "lw-spacer" }), actions));
  }

  // components/ai/Feedback.jsx
  init_ds_inject_react();
  var React80 = __toESM(require_ds_react(), 1);
  var cx74 = (...a) => a.filter(Boolean).join(" ");
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
    const [open, setOpen] = React80.useState(false);
    const [text, setText] = React80.useState("");
    const set = (v) => {
      const next = value === v ? null : v;
      onChange && onChange(next);
      if (next === "down" && onComment) setOpen(true);
    };
    return /* @__PURE__ */ React80.createElement("div", { className: cx74(className), ...rest }, /* @__PURE__ */ React80.createElement("div", { className: "lw-feedback" }, /* @__PURE__ */ React80.createElement("button", { type: "button", className: "lw-icon-btn", "aria-label": upLabel, "aria-pressed": value === "up", onClick: () => set("up") }, /* @__PURE__ */ React80.createElement(Icon, { name: "thumbs-up", size: 15 })), /* @__PURE__ */ React80.createElement("button", { type: "button", className: "lw-icon-btn", "aria-label": downLabel, "aria-pressed": value === "down", onClick: () => set("down") }, /* @__PURE__ */ React80.createElement(Icon, { name: "thumbs-down", size: 15 })), note && /* @__PURE__ */ React80.createElement("span", { className: "lw-feedback-note" }, note)), open && onComment && /* @__PURE__ */ React80.createElement(
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
      /* @__PURE__ */ React80.createElement(
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
      /* @__PURE__ */ React80.createElement("div", { className: "lw-feedback-actions" }, /* @__PURE__ */ React80.createElement("button", { type: "button", className: "lw-btn lw-btn-ghost lw-btn-sm", onClick: () => setOpen(false) }, cancelLabel), /* @__PURE__ */ React80.createElement("button", { type: "submit", className: "lw-btn lw-btn-sm", disabled: !text.trim() }, sendLabel))
    ));
  }

  // components/marketing/Hero.jsx
  init_ds_inject_react();
  var cx75 = (...a) => a.filter(Boolean).join(" ");
  function Hero({ eyebrow, title, lead, actions, aside, className, children, ...rest }) {
    return /* @__PURE__ */ React.createElement("section", { className: cx75("lw-hero-dark", className), ...rest }, /* @__PURE__ */ React.createElement("div", { className: "lw-container" }, eyebrow && /* @__PURE__ */ React.createElement("p", { className: "lw-eyebrow" }, eyebrow), title && /* @__PURE__ */ React.createElement("h1", { className: "lw-h1" }, title), lead && /* @__PURE__ */ React.createElement("p", { className: "lw-lead" }, lead), actions && /* @__PURE__ */ React.createElement("div", { className: "lw-cluster lw-cluster-12 lw-hero-actions" }, actions), aside, children));
  }

  // components/marketing/FeatureGrid.jsx
  init_ds_inject_react();
  var cx76 = (...a) => a.filter(Boolean).join(" ");
  function FeatureGrid({ features = [], linkAs = "a", className, ...rest }) {
    return /* @__PURE__ */ React.createElement("div", { className: cx76("lw-features", className), ...rest }, features.map((f, i) => {
      const Tag = f.href ? linkAs : "div";
      return /* @__PURE__ */ React.createElement(Tag, { key: i, className: cx76("lw-feature", f.href && "lw-feature-interactive"), href: f.href }, /* @__PURE__ */ React.createElement("span", { className: "num" }, String(i + 1).padStart(2, "0")), /* @__PURE__ */ React.createElement("h3", null, f.title), /* @__PURE__ */ React.createElement("p", null, f.body), f.href && /* @__PURE__ */ React.createElement("span", { className: "lw-feature-more" }, f.more || "Learn more", /* @__PURE__ */ React.createElement(Icon, { name: "arrow-right", size: 14, className: "arrow" })));
    }));
  }

  // components/marketing/StoryCard.jsx
  init_ds_inject_react();
  var cx77 = (...a) => a.filter(Boolean).join(" ");
  function StoryCard({ logo, title, body, result, quote, person, role, href, linkAs = "a", className, ...rest }) {
    const Tag = href ? linkAs : "div";
    const showQuote = Boolean(quote && person && role);
    const initials = String(title || "").trim().split(/\s+/).slice(0, 2).map((w) => w[0] || "").join("").toUpperCase();
    return /* @__PURE__ */ React.createElement(Tag, { className: cx77("lw-story", href && "lw-story-interactive", className), href, ...rest }, logo ? /* @__PURE__ */ React.createElement("span", { className: "logo" }, logo) : /* @__PURE__ */ React.createElement("span", { className: "logo lw-monogram" }, initials), /* @__PURE__ */ React.createElement("div", null, title && /* @__PURE__ */ React.createElement("h3", null, title), body && /* @__PURE__ */ React.createElement("p", null, body), showQuote && /* @__PURE__ */ React.createElement("blockquote", { className: "lw-story-quote" }, quote, /* @__PURE__ */ React.createElement("cite", null, person, " · ", role)), result && /* @__PURE__ */ React.createElement("div", { className: "meta" }, /* @__PURE__ */ React.createElement("span", { className: "lw-story-result" }, /* @__PURE__ */ React.createElement("b", null, result)))));
  }

  // components/marketing/LogoRail.jsx
  init_ds_inject_react();
  var cx78 = (...a) => a.filter(Boolean).join(" ");
  function LogoRail({ logos = [], marquee = false, className, ...rest }) {
    const cells = logos.map(
      (l, i) => l.src ? /* @__PURE__ */ React.createElement("span", { key: i, className: "lw-logo-item", style: { "--lw-logo-src": `url("${l.src}")` }, role: "img", "aria-label": l.name }) : /* @__PURE__ */ React.createElement("span", { key: i, className: "lw-logo-item is-text" }, l.name)
    );
    return /* @__PURE__ */ React.createElement("div", { className: cx78("lw-logo-rail", marquee && "marquee", className), ...rest }, marquee ? /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement("div", { className: "lw-logo-track" }, cells), /* @__PURE__ */ React.createElement("div", { className: "lw-logo-track", "aria-hidden": "true" }, cells)) : cells);
  }

  // components/marketing/SiteFooter.jsx
  init_ds_inject_react();
  var cx79 = (...a) => a.filter(Boolean).join(" ");
  function SiteFooter({ brand, desc, columns = [], legal, bottom, dark = false, linkAs = "a", className, children, ...rest }) {
    const Link = linkAs;
    return /* @__PURE__ */ React.createElement("footer", { className: cx79("lw-footer", className), "data-band": dark ? "dark" : void 0, ...rest }, /* @__PURE__ */ React.createElement("div", { className: "lw-container" }, /* @__PURE__ */ React.createElement("div", { className: "lw-footer-grid" }, /* @__PURE__ */ React.createElement("div", { className: "lw-footer-brand" }, brand, desc && /* @__PURE__ */ React.createElement("p", { className: "lw-footer-desc" }, desc)), columns.map((col, i) => (
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
  var cx80 = (...a) => a.filter(Boolean).join(" ");
  function Steps({ items = [], orientation = "vertical", linkAs = "a", className, ...rest }) {
    const Link = linkAs;
    return /* @__PURE__ */ React.createElement("ol", { className: cx80("lw-steps", orientation === "horizontal" && "lw-steps-horizontal", className), ...rest }, items.map((it, i) => /* @__PURE__ */ React.createElement("li", { className: "lw-step", key: i }, /* @__PURE__ */ React.createElement("span", { className: "lw-step-marker" }, it.label ?? String(i + 1).padStart(2, "0")), /* @__PURE__ */ React.createElement("div", null, it.meta && /* @__PURE__ */ React.createElement("span", { className: "lw-step-meta" }, it.meta), /* @__PURE__ */ React.createElement("h3", { className: "lw-step-title" }, it.title), it.body && /* @__PURE__ */ React.createElement("p", { className: "lw-step-body" }, it.body), it.href && /* @__PURE__ */ React.createElement("p", { className: "lw-step-body" }, /* @__PURE__ */ React.createElement(Link, { href: it.href }, it.more || "Learn more"))))));
  }

  // components/marketing/Quote.jsx
  init_ds_inject_react();
  var cx81 = (...a) => a.filter(Boolean).join(" ");
  function Quote({ children, name, role, className, ...rest }) {
    return /* @__PURE__ */ React.createElement("blockquote", { className: cx81("lw-quote", className), ...rest }, children, name && /* @__PURE__ */ React.createElement("cite", { className: "lw-quote-attrib" }, /* @__PURE__ */ React.createElement("span", { className: "name" }, name), role ? " · " + role : ""));
  }

  // components/marketing/Byline.jsx
  init_ds_inject_react();
  var cx82 = (...a) => a.filter(Boolean).join(" ");
  function Byline({ name, role, date, dateTime, src, size: size4 = "md", className, children, ...rest }) {
    return /* @__PURE__ */ React.createElement("div", { className: cx82("lw-byline", className), ...rest }, name && /* @__PURE__ */ React.createElement(Avatar, { name, src, size: size4 }), name && /* @__PURE__ */ React.createElement("span", { className: "name" }, name), role && /* @__PURE__ */ React.createElement("span", { className: "role" }, role), date && /* @__PURE__ */ React.createElement("time", { className: "date", dateTime }, date), children);
  }

  // components/marketing/ArticleCard.jsx
  init_ds_inject_react();
  var cx83 = (...a) => a.filter(Boolean).join(" ");
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
    cover,
    linkAs = "a",
    className,
    ...rest
  }) {
    const read = readTime != null ? readTime : null;
    return /* @__PURE__ */ React.createElement(
      Card,
      {
        as: href ? linkAs : "div",
        interactive: Boolean(href),
        href,
        className: cx83(className),
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
  var React81 = __toESM(require_ds_react(), 1);
  var cx84 = (...a) => a.filter(Boolean).join(" ");
  function AnnounceBar({ children, onDismiss, dismissLabel = "Dismiss announcement", className, ...rest }) {
    const [gone, setGone] = React81.useState(false);
    if (gone) return null;
    return /* @__PURE__ */ React81.createElement("div", { className: cx84("lw-announce", className), role: "status", ...rest }, children, onDismiss && /* @__PURE__ */ React81.createElement(
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
      /* @__PURE__ */ React81.createElement(Icon, { name: "close", size: 14 })
    ));
  }

  // components/marketing/PlanCard.jsx
  init_ds_inject_react();
  var cx85 = (...a) => a.filter(Boolean).join(" ");
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
    return /* @__PURE__ */ React.createElement("div", { className: cx85("lw-card", "lw-plan", featured && "lw-plan-featured", className), ...rest }, ribbon && /* @__PURE__ */ React.createElement("span", { className: "lw-pill lw-plan-ribbon" }, ribbon), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("h3", { className: "lw-plan-name" }, name), tagline && /* @__PURE__ */ React.createElement("span", { className: "lw-plan-tagline" }, tagline)), price != null && /* @__PURE__ */ React.createElement("p", { className: "lw-plan-price" }, /* @__PURE__ */ React.createElement("span", { className: "price" }, price), unit && /* @__PURE__ */ React.createElement("span", { className: "unit" }, unit), period && /* @__PURE__ */ React.createElement("span", { className: "period" }, period)), desc && /* @__PURE__ */ React.createElement("p", { className: "lw-plan-desc" }, desc), features.length > 0 && /* @__PURE__ */ React.createElement("ul", { className: "lw-plan-features" }, features.map((f, i) => {
      const included = f.included !== false;
      return (
        // The glyph is aria-hidden, so WITHOUT this word an included and
        // an excluded row are read out identically. It leads the row so
        // it is announced as "Included: SSO", and it is a prop because
        // the primary consumer is bilingual. Absolutely positioned, so it
        // is not a flex item and takes no gap.
        /* @__PURE__ */ React.createElement("li", { className: "lw-plan-feature", key: i, "data-included": included ? "true" : "false" }, /* @__PURE__ */ React.createElement("span", { className: "lw-sr-only" }, included ? includedLabel : excludedLabel, ": "), /* @__PURE__ */ React.createElement(Icon, { name: included ? "check" : "minus", size: 16 }), /* @__PURE__ */ React.createElement("span", null, f.label))
      );
    })), cta && /* @__PURE__ */ React.createElement("div", { className: "lw-plan-foot" }, ctaObject ? /* @__PURE__ */ React.createElement(Link, { className: cx85("lw-btn", featured ? "lw-btn-brand" : "lw-btn-ghost"), href: cta.href }, cta.label) : cta));
  }

  // components/marketing/CompareTable.jsx
  init_ds_inject_react();
  var cx86 = (...a) => a.filter(Boolean).join(" ");
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
      /* @__PURE__ */ React.createElement("table", { className: cx86("lw-compare", className), ...rest }, caption && /* @__PURE__ */ React.createElement("caption", null, caption), /* @__PURE__ */ React.createElement("thead", null, /* @__PURE__ */ React.createElement("tr", null, /* @__PURE__ */ React.createElement("td", { className: "lw-compare-corner" }), columns.map((c) => /* @__PURE__ */ React.createElement("th", { key: c.key, scope: "col", "data-featured": c.featured || void 0 }, c.label)))), groups.map((g, gi) => /* @__PURE__ */ React.createElement("tbody", { key: gi }, g.label && /* @__PURE__ */ React.createElement("tr", { className: "lw-compare-group" }, /* @__PURE__ */ React.createElement("th", { scope: "colgroup", colSpan: columns.length + 1 }, g.label)), g.rows.map((r, ri) => /* @__PURE__ */ React.createElement("tr", { key: ri }, /* @__PURE__ */ React.createElement("th", { scope: "row" }, r.label), columns.map((c, ci) => /* @__PURE__ */ React.createElement("td", { key: c.key, "data-featured": c.featured || void 0 }, cell(r.values[ci]))))))))
    );
  }

  // components/marketing/Flow.jsx
  init_ds_inject_react();

  // components/marketing/_flow-graph.js
  init_ds_inject_react();
  var U = 1;
  var D = 2;
  var L = 4;
  var R = 8;
  var OPPOSITE = { [U]: D, [D]: U, [L]: R, [R]: L };
  function maskToTokens(mask) {
    const out = [];
    if (mask & U) out.push("u");
    if (mask & D) out.push("d");
    if (mask & L) out.push("l");
    if (mask & R) out.push("r");
    return out.join(" ");
  }
  function assignColumns(nodes, forward) {
    const index2 = new Map(nodes.map((n, i) => [n.id, i]));
    const column = new Map(nodes.map((n) => [n.id, 0]));
    const incoming = new Map(nodes.map((n) => [n.id, []]));
    for (const e of forward) incoming.get(e.to)?.push(e.from);
    for (let pass = 0; pass < nodes.length; pass++) {
      let moved = false;
      for (const n of nodes) {
        const preds = incoming.get(n.id) ?? [];
        if (!preds.length) continue;
        const want = Math.max(...preds.map((p) => column.get(p) ?? 0)) + 1;
        if (want > (column.get(n.id) ?? 0)) {
          column.set(n.id, want);
          moved = true;
        }
      }
      if (!moved) break;
    }
    for (const n of nodes) {
      if (typeof n.column === "number") {
        const floor2 = Math.max(0, ...(incoming.get(n.id) ?? []).map((p) => (column.get(p) ?? 0) + 1));
        column.set(n.id, Math.max(n.column, floor2));
      }
    }
    const lanes = /* @__PURE__ */ new Map();
    const lane = /* @__PURE__ */ new Map();
    for (const n of [...nodes].sort((a, b) => index2.get(a.id) - index2.get(b.id))) {
      const c = column.get(n.id);
      const next = lanes.get(c) ?? 0;
      lane.set(n.id, typeof n.lane === "number" ? n.lane : next);
      lanes.set(c, Math.max(next, typeof n.lane === "number" ? n.lane : next) + 1);
    }
    return { column, lane };
  }
  function splitEdges(nodes, edges) {
    const ids = new Set(nodes.map((n) => n.id));
    const clean = edges.filter((e) => ids.has(e.from) && ids.has(e.to) && e.from !== e.to);
    const out = new Map(nodes.map((n) => [n.id, []]));
    for (const e of clean) out.get(e.from).push(e);
    const forward = [];
    const back = [];
    const state = /* @__PURE__ */ new Map();
    const walk = (id) => {
      state.set(id, 1);
      for (const e of out.get(id) ?? []) {
        if (e.kind === "back" || state.get(e.to) === 1) back.push(e);
        else {
          forward.push(e);
          if (state.get(e.to) !== 2) walk(e.to);
        }
      }
      state.set(id, 2);
    };
    for (const n of nodes) if (!state.has(n.id)) walk(n.id);
    return { forward, back };
  }
  function pathCells(a, b, backRow) {
    const seq = [[a.c, a.r]];
    if (backRow === void 0) {
      for (let c = a.c + 1; c <= b.c - 1; c++) seq.push([c, a.r]);
      if (b.r !== a.r) {
        const turn = b.c - 1;
        const step = b.r > a.r ? 1 : -1;
        for (let r = a.r + step; r !== b.r + step; r += step) seq.push([turn, r]);
      }
    } else {
      for (let r = a.r + 1; r <= backRow; r++) seq.push([a.c, r]);
      const step = b.c < a.c ? -1 : 1;
      for (let c = a.c + step; c !== b.c; c += step) seq.push([c, backRow]);
      for (let r = backRow; r >= b.r + 1; r--) seq.push([b.c, r]);
    }
    seq.push([b.c, b.r]);
    return seq;
  }
  function planGraph(nodes, edges) {
    if (!nodes.length || !edges.length) return null;
    const { forward, back } = splitEdges(nodes, edges);
    const { column, lane } = assignColumns(nodes, forward);
    const cols = Math.max(...nodes.map((n) => column.get(n.id))) + 1;
    const rows = Math.max(...nodes.map((n) => lane.get(n.id))) + 1;
    const at2 = new Map(
      nodes.map((n) => [n.id, { c: column.get(n.id) * 2 + 1, r: lane.get(n.id) * 2 + 1 }])
    );
    const latticeCols = cols * 2 - 1;
    const backRow = back.length ? rows * 2 : void 0;
    const latticeRows = back.length ? rows * 2 : rows * 2 - 1;
    const occupied = new Set([...at2.values()].map((p) => `${p.c}:${p.r}`));
    const cells = /* @__PURE__ */ new Map();
    const mark = (c, r, bit, kind, label) => {
      const key = `${c}:${r}`;
      if (occupied.has(key)) return;
      const cur = cells.get(key) ?? { c, r, mask: 0, kind: "forward", label: void 0 };
      cur.mask |= bit;
      if (kind === "back") cur.kind = "back";
      if (label && !cur.label) cur.label = label;
      cells.set(key, cur);
    };
    for (const e of [...forward, ...back.map((b) => ({ ...b, kind: "back" }))]) {
      const a = at2.get(e.from);
      const b = at2.get(e.to);
      if (!a || !b) continue;
      const seq = pathCells(a, b, e.kind === "back" ? backRow : void 0);
      for (let i = 0; i < seq.length - 1; i++) {
        const [c1, r1] = seq[i];
        const [c2, r2] = seq[i + 1];
        const dir = c2 > c1 ? R : c2 < c1 ? L : r2 > r1 ? D : U;
        mark(c1, r1, dir, e.kind, e.label);
        mark(c2, r2, OPPOSITE[dir], e.kind, e.label);
      }
    }
    const ordered = [...nodes].sort((a, b) => {
      const ca = column.get(a.id) - column.get(b.id);
      return ca !== 0 ? ca : lane.get(a.id) - lane.get(b.id);
    });
    const successors = new Map(nodes.map((n) => [n.id, []]));
    for (const e of [...forward, ...back]) successors.get(e.from)?.push(e);
    return {
      cols: latticeCols,
      rows: latticeRows,
      /* Track lists travel as custom properties rather than as a `grid-template-*`
         declaration, because `repeat()` will not take a `var()` count and the
         consumer's contract allows `--lw-*` properties and nothing else. */
      tracks: Array.from(
        { length: latticeCols },
        (_, i) => i % 2 === 0 ? "minmax(0, 1fr)" : "var(--lw-flow-edge, 28px)"
      ).join(" "),
      rowTracks: Array.from(
        { length: latticeRows },
        (_, i) => i % 2 === 0 ? "auto" : "var(--lw-flow-edge, 28px)"
      ).join(" "),
      place: (id) => at2.get(id),
      depth: (id) => column.get(id),
      order: ordered,
      connectors: [...cells.values()].map((c) => ({ ...c, tokens: maskToTokens(c.mask) })),
      successors
    };
  }
  function isChain(nodes, edges) {
    if (!edges) return true;
    const index2 = new Map(nodes.map((n, i) => [n.id, i]));
    return edges.every((e) => {
      const pair = Array.isArray(e) ? e : [e.from, e.to];
      const a = index2.get(pair[0]);
      const b = index2.get(pair[1]);
      return a !== void 0 && b !== void 0 && b === a + 1;
    });
  }

  // components/marketing/Flow.jsx
  var cx87 = (...a) => a.filter(Boolean).join(" ");
  function Flow({
    nodes = [],
    edges,
    orientation = "horizontal",
    layout = "auto",
    label,
    tableLabels,
    as,
    className,
    ...rest
  }) {
    const list = edges?.map((e) => Array.isArray(e) ? { from: e[0], to: e[1] } : e);
    const graph = layout !== "chain" && list?.length && (layout === "graph" || !isChain(nodes, list)) ? planGraph(nodes, list) : null;
    if (graph) {
      return /* @__PURE__ */ React.createElement(
        FlowGraph,
        {
          graph,
          label,
          tableLabels,
          className,
          ...rest
        }
      );
    }
    return /* @__PURE__ */ React.createElement(FlowChain, { nodes, edges: list, orientation, as, className, ...rest });
  }
  function FlowChain({ nodes = [], edges, orientation = "horizontal", as, className, ...rest }) {
    const Tag = as || "ol";
    const Item3 = Tag === "ol" || Tag === "ul" ? "li" : "div";
    const linked = edges ? new Set(edges.map((e) => `${e.from}\0${e.to}`)) : null;
    const hasEdge = (a, b) => linked ? linked.has(`${a}\0${b}`) : true;
    const children = [];
    nodes.forEach((n, i) => {
      if (i > 0 && hasEdge(nodes[i - 1].id, n.id)) {
        children.push(/* @__PURE__ */ React.createElement(Item3, { key: `edge-${i}`, className: "lw-flow-edge", "aria-hidden": "true" }));
      }
      children.push(
        /* @__PURE__ */ React.createElement(
          Item3,
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
    return /* @__PURE__ */ React.createElement(Tag, { className: cx87("lw-flow", orientation === "vertical" && "lw-flow-vertical", className), ...rest }, children);
  }
  function FlowGraph({ graph, label, tableLabels, className, ...rest }) {
    const index2 = new Map(graph.order.map((n, i) => [n.id, i]));
    const num = (id) => String(index2.get(id) + 1).padStart(2, "0");
    warnOnce2(!label, "Flow: a branching flow needs `label` — it names the diagram and captions its successors table.");
    warnOnce2(
      !tableLabels,
      "Flow: a branching flow needs `tableLabels` — the successors table's headers are the consumer's words, in the consumer's locale, never a literal in this package."
    );
    return /* @__PURE__ */ React.createElement("div", { className: cx87("lw-flow-wrap", className), ...rest }, /* @__PURE__ */ React.createElement("table", { className: "lw-sr-only" }, label && /* @__PURE__ */ React.createElement("caption", null, label), tableLabels && /* @__PURE__ */ React.createElement("thead", null, /* @__PURE__ */ React.createElement("tr", null, /* @__PURE__ */ React.createElement("th", { scope: "col" }, tableLabels.step), /* @__PURE__ */ React.createElement("th", { scope: "col" }, tableLabels.leadsTo))), /* @__PURE__ */ React.createElement("tbody", null, graph.order.map((n) => {
      const next = graph.successors.get(n.id) ?? [];
      return /* @__PURE__ */ React.createElement("tr", { key: n.id }, /* @__PURE__ */ React.createElement("th", { scope: "row" }, num(n.id), " ", n.label), /* @__PURE__ */ React.createElement("td", null, next.length ? next.map((e) => `${num(e.to)} ${nodeLabel(graph, e.to)}${e.label ? ` (${e.label})` : ""}`).join("; ") : (
        /* Never an empty cell: a screen reader skips one, so a
           terminal node would read as a row with a missing answer
           rather than as the end of the flow. */
        tableLabels?.none ?? "—"
      )));
    }))), /* @__PURE__ */ React.createElement(
      "ul",
      {
        className: "lw-flow lw-flow-graph",
        style: {
          "--lw-flow-tracks": graph.tracks,
          "--lw-flow-row-tracks": graph.rowTracks
        }
      },
      graph.order.map((n) => {
        const p = graph.place(n.id);
        return /* @__PURE__ */ React.createElement(
          "li",
          {
            key: n.id,
            className: "lw-card lw-flow-node",
            "aria-current": n.current ? "step" : void 0,
            "data-kind": n.kind || void 0,
            style: { "--lw-flow-c": p.c, "--lw-flow-r": p.r, "--lw-flow-depth": graph.depth(n.id) }
          },
          /* @__PURE__ */ React.createElement("span", { className: "lw-flow-head" }, n.icon && /* @__PURE__ */ React.createElement(Icon, { name: n.icon, size: 16 }), /* @__PURE__ */ React.createElement("span", { className: "lw-flow-label" }, num(n.id))),
          /* @__PURE__ */ React.createElement("h3", { className: "lw-flow-title" }, n.label),
          n.sub && /* @__PURE__ */ React.createElement("p", { className: "lw-flow-sub" }, n.sub),
          n.detail
        );
      }),
      graph.connectors.map((c) => /* @__PURE__ */ React.createElement(
        "li",
        {
          key: `e-${c.c}-${c.r}`,
          className: "lw-flow-cell",
          "data-edge": c.tokens,
          "data-edge-kind": c.kind === "back" ? "back" : void 0,
          "aria-hidden": "true",
          style: { "--lw-flow-c": c.c, "--lw-flow-r": c.r }
        }
      ))
    ));
  }
  function nodeLabel(graph, id) {
    return graph.order.find((n) => n.id === id)?.label;
  }
  var warned2 = /* @__PURE__ */ new Set();
  function warnOnce2(condition, message) {
    if (!condition || warned2.has(message) || typeof console === "undefined") return;
    warned2.add(message);
    console.warn(message);
  }

  // ds-entry.js
  var __ds_ns = globalThis.LeanWiseDesign_f2d907 = globalThis.LeanWiseDesign_f2d907 || {};
  __ds_ns.__errors = __ds_ns.__errors || [];
  Object.assign(__ds_ns, {
    TONES,
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
    OtpInput,
    PasswordInput,
    PasswordMeter,
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
    LocaleSwitcher,
    NavMenu,
    NavToggle,
    NavItem,
    Sidebar,
    Tabs: Tabs3,
    THEME_LABELS,
    ThemeToggle,
    TopBar,
    Layer,
    LayerContext,
    Dialog: Dialog2,
    Drawer,
    Menu: Menu2,
    OverlayProvider,
    Popover: Popover2,
    Toast,
    ToastRegion,
    Tooltip: Tooltip2,
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
    RAIL_KEY,
    THEME_EVENT,
    THEME_KEY
  });
})();
