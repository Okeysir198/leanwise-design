'use strict';

var react = require('react');
var jsxRuntime = require('react/jsx-runtime');

// src/react/button.tsx
var VARIANT_CLASS = {
  primary: "lw-btn-primary",
  brand: "lw-btn-brand",
  ink: "lw-btn-ink",
  ghost: "lw-btn-ghost",
  link: "lw-btn-link"
};
var Button = react.forwardRef(function Button2(props, ref) {
  const { variant = "primary", arrow, className, children, as, ...rest } = props;
  const cls = ["lw-btn", VARIANT_CLASS[variant], className ?? ""].filter(Boolean).join(" ");
  const content = /* @__PURE__ */ jsxRuntime.jsxs(jsxRuntime.Fragment, { children: [
    children,
    arrow ? /* @__PURE__ */ jsxRuntime.jsx("span", { className: "arrow", "aria-hidden": "true", children: "\u2192" }) : null
  ] });
  if (as === "a") {
    return /* @__PURE__ */ jsxRuntime.jsx(
      "a",
      {
        ref,
        className: cls,
        ...rest,
        children: content
      }
    );
  }
  return /* @__PURE__ */ jsxRuntime.jsx(
    "button",
    {
      type: "button",
      ref,
      className: cls,
      ...rest,
      children: content
    }
  );
});
function Eyebrow({ muted, className, children, ...rest }) {
  const cls = ["lw-eyebrow", muted ? "muted" : "", className ?? ""].filter(Boolean).join(" ");
  return /* @__PURE__ */ jsxRuntime.jsx("div", { className: cls, ...rest, children });
}
function Card({
  glow,
  spotlight,
  hover,
  as: Tag = "div",
  className,
  children,
  ...rest
}) {
  const cls = [
    "lw-card",
    glow ? "lw-card-glow" : "",
    spotlight ? "lw-spotlight" : "",
    hover ? "hover" : "",
    className ?? ""
  ].filter(Boolean).join(" ");
  const Component = Tag;
  return /* @__PURE__ */ jsxRuntime.jsx(Component, { className: cls, ...rest, children });
}
var STORAGE_KEY = "lw-theme";
var ATTR = "theme";
function isValidTheme(v) {
  return v === "light" || v === "dark" || v === "system";
}
var SSR_DEFAULT = { theme: "light", resolved: "light" };
var currentState = SSR_DEFAULT;
var listeners = /* @__PURE__ */ new Set();
function readStoredTheme() {
  if (typeof localStorage !== "undefined") {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (isValidTheme(stored)) return stored;
    } catch {
    }
  }
  return "system";
}
function systemResolved() {
  if (typeof window !== "undefined" && typeof window.matchMedia === "function" && window.matchMedia("(prefers-color-scheme: dark)").matches) {
    return "dark";
  }
  return "light";
}
function resolveTheme(theme) {
  return theme === "system" ? systemResolved() : theme;
}
function setState(next) {
  currentState = next;
  for (const fn of listeners) fn();
}
function subscribe(cb) {
  listeners.add(cb);
  return () => listeners.delete(cb);
}
function applyToDom(theme) {
  if (typeof document === "undefined") return;
  document.documentElement.dataset[ATTR] = theme;
}
if (typeof window !== "undefined" && typeof window.matchMedia === "function") {
  const mql = window.matchMedia("(prefers-color-scheme: dark)");
  const onSys = () => {
    if (currentState.theme === "system") {
      setState({ theme: "system", resolved: systemResolved() });
    }
  };
  if (typeof mql.addEventListener === "function") mql.addEventListener("change", onSys);
  else if (typeof mql.addListener === "function") mql.addListener(onSys);
}
function useTheme() {
  const snapshot = react.useSyncExternalStore(
    subscribe,
    () => currentState,
    // client snapshot
    () => currentState
    // server snapshot (the initial 'system'/light guess)
  );
  react.useEffect(() => {
    const theme = readStoredTheme();
    applyToDom(theme);
    setState({ theme, resolved: resolveTheme(theme) });
  }, []);
  const setTheme = react.useCallback((theme) => {
    applyToDom(theme);
    if (typeof localStorage !== "undefined") {
      try {
        localStorage.setItem(STORAGE_KEY, theme);
      } catch {
      }
    }
    setState({ theme, resolved: resolveTheme(theme) });
  }, []);
  const toggle = react.useCallback(() => {
    const order = ["system", "light", "dark"];
    const i = order.indexOf(snapshot.theme);
    setTheme(order[(i + 1) % order.length]);
  }, [snapshot.theme, setTheme]);
  return {
    theme: snapshot.theme,
    resolvedTheme: snapshot.resolved,
    isSystem: snapshot.theme === "system",
    setTheme,
    toggle
  };
}
function base({ size = 16, title, ...rest }) {
  const titleId = title ? `lw-icon-${slug(title)}` : void 0;
  const svg = {
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 2,
    strokeLinecap: "round",
    strokeLinejoin: "round",
    "aria-hidden": title ? void 0 : true,
    role: title ? "img" : void 0,
    "aria-labelledby": titleId,
    focusable: title ? false : void 0,
    ...rest
  };
  return { svg, titleId, title };
}
function slug(s) {
  let h = 0;
  for (let i = 0; i < s.length; i++) h = (h << 5) - h + s.charCodeAt(i) | 0;
  return (h >>> 0).toString(36);
}
function Check(props) {
  const { svg, titleId, title } = base(props);
  return /* @__PURE__ */ jsxRuntime.jsxs("svg", { ...svg, children: [
    title ? /* @__PURE__ */ jsxRuntime.jsx("title", { id: titleId, children: title }) : null,
    /* @__PURE__ */ jsxRuntime.jsx("path", { d: "M20 6 9 17l-5-5" })
  ] });
}
function Warning(props) {
  const { svg, titleId, title } = base(props);
  return /* @__PURE__ */ jsxRuntime.jsxs("svg", { ...svg, children: [
    title ? /* @__PURE__ */ jsxRuntime.jsx("title", { id: titleId, children: title }) : null,
    /* @__PURE__ */ jsxRuntime.jsx("path", { d: "M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" }),
    /* @__PURE__ */ jsxRuntime.jsx("line", { x1: "12", y1: "9", x2: "12", y2: "13" }),
    /* @__PURE__ */ jsxRuntime.jsx("line", { x1: "12", y1: "17", x2: "12.01", y2: "17" })
  ] });
}
function Cross(props) {
  const { svg, titleId, title } = base(props);
  return /* @__PURE__ */ jsxRuntime.jsxs("svg", { ...svg, children: [
    title ? /* @__PURE__ */ jsxRuntime.jsx("title", { id: titleId, children: title }) : null,
    /* @__PURE__ */ jsxRuntime.jsx("line", { x1: "18", y1: "6", x2: "6", y2: "18" }),
    /* @__PURE__ */ jsxRuntime.jsx("line", { x1: "6", y1: "6", x2: "18", y2: "18" })
  ] });
}
function Dash(props) {
  const { svg, titleId, title } = base(props);
  return /* @__PURE__ */ jsxRuntime.jsxs("svg", { ...svg, children: [
    title ? /* @__PURE__ */ jsxRuntime.jsx("title", { id: titleId, children: title }) : null,
    /* @__PURE__ */ jsxRuntime.jsx("line", { x1: "5", y1: "12", x2: "19", y2: "12" })
  ] });
}
function Sun(props) {
  const { svg, titleId, title } = base(props);
  return /* @__PURE__ */ jsxRuntime.jsxs("svg", { ...svg, children: [
    title ? /* @__PURE__ */ jsxRuntime.jsx("title", { id: titleId, children: title }) : null,
    /* @__PURE__ */ jsxRuntime.jsx("circle", { cx: "12", cy: "12", r: "4" }),
    /* @__PURE__ */ jsxRuntime.jsx("line", { x1: "12", y1: "2", x2: "12", y2: "4" }),
    /* @__PURE__ */ jsxRuntime.jsx("line", { x1: "12", y1: "20", x2: "12", y2: "22" }),
    /* @__PURE__ */ jsxRuntime.jsx("line", { x1: "4.22", y1: "4.22", x2: "5.64", y2: "5.64" }),
    /* @__PURE__ */ jsxRuntime.jsx("line", { x1: "18.36", y1: "18.36", x2: "19.78", y2: "19.78" }),
    /* @__PURE__ */ jsxRuntime.jsx("line", { x1: "2", y1: "12", x2: "4", y2: "12" }),
    /* @__PURE__ */ jsxRuntime.jsx("line", { x1: "20", y1: "12", x2: "22", y2: "12" }),
    /* @__PURE__ */ jsxRuntime.jsx("line", { x1: "4.22", y1: "19.78", x2: "5.64", y2: "18.36" }),
    /* @__PURE__ */ jsxRuntime.jsx("line", { x1: "18.36", y1: "5.64", x2: "19.78", y2: "4.22" })
  ] });
}
function Moon(props) {
  const { svg, titleId, title } = base(props);
  return /* @__PURE__ */ jsxRuntime.jsxs("svg", { ...svg, children: [
    title ? /* @__PURE__ */ jsxRuntime.jsx("title", { id: titleId, children: title }) : null,
    /* @__PURE__ */ jsxRuntime.jsx("path", { d: "M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9z" })
  ] });
}
function Auto(props) {
  const { svg, titleId, title } = base(props);
  return /* @__PURE__ */ jsxRuntime.jsxs("svg", { ...svg, children: [
    title ? /* @__PURE__ */ jsxRuntime.jsx("title", { id: titleId, children: title }) : null,
    /* @__PURE__ */ jsxRuntime.jsx("circle", { cx: "12", cy: "12", r: "9" }),
    /* @__PURE__ */ jsxRuntime.jsx("path", { d: "M12 3a9 9 0 0 0 0 18z", fill: "currentColor", stroke: "none" })
  ] });
}
function Play(props) {
  const { svg, titleId, title } = base(props);
  return /* @__PURE__ */ jsxRuntime.jsxs("svg", { ...svg, fill: "currentColor", stroke: "none", children: [
    title ? /* @__PURE__ */ jsxRuntime.jsx("title", { id: titleId, children: title }) : null,
    /* @__PURE__ */ jsxRuntime.jsx("polygon", { points: "6 3 20 12 6 21" })
  ] });
}
function Step(props) {
  const { svg, titleId, title } = base(props);
  return /* @__PURE__ */ jsxRuntime.jsxs("svg", { ...svg, children: [
    title ? /* @__PURE__ */ jsxRuntime.jsx("title", { id: titleId, children: title }) : null,
    /* @__PURE__ */ jsxRuntime.jsx("polygon", { points: "5 4 15 12 5 20", fill: "currentColor", stroke: "none" }),
    /* @__PURE__ */ jsxRuntime.jsx("line", { x1: "19", y1: "5", x2: "19", y2: "19" })
  ] });
}
function File(props) {
  const { svg, titleId, title } = base(props);
  return /* @__PURE__ */ jsxRuntime.jsxs("svg", { ...svg, children: [
    title ? /* @__PURE__ */ jsxRuntime.jsx("title", { id: titleId, children: title }) : null,
    /* @__PURE__ */ jsxRuntime.jsx("path", { d: "M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" }),
    /* @__PURE__ */ jsxRuntime.jsx("polyline", { points: "14 2 14 8 20 8" })
  ] });
}
function ChevronRight(props) {
  const { svg, titleId, title } = base(props);
  return /* @__PURE__ */ jsxRuntime.jsxs("svg", { ...svg, children: [
    title ? /* @__PURE__ */ jsxRuntime.jsx("title", { id: titleId, children: title }) : null,
    /* @__PURE__ */ jsxRuntime.jsx("polyline", { points: "9 18 15 12 9 6" })
  ] });
}
var Icon = {
  Check,
  Warning,
  Cross,
  Dash,
  Sun,
  Moon,
  Auto,
  Play,
  Step,
  File,
  ChevronRight
};
var SEGMENTS = [
  { value: "light", label: "Light", Icon: Sun },
  { value: "dark", label: "Dark", Icon: Moon },
  { value: "system", label: "System", Icon: Auto }
];
function ThemeToggle({
  "aria-label": ariaLabel = "Theme",
  showIcons = true,
  showLabels = true,
  className
}) {
  const { theme, setTheme } = useTheme();
  const move = (e, delta) => {
    e.preventDefault();
    const root = e.currentTarget.parentElement;
    if (!root) return;
    const btns = Array.from(root.querySelectorAll("button"));
    const idx = btns.indexOf(e.currentTarget);
    const next = btns[(idx + delta + btns.length) % btns.length];
    if (!next) return;
    setTheme(next.getAttribute("data-lw-theme"));
    next.focus();
  };
  return /* @__PURE__ */ jsxRuntime.jsx(
    "div",
    {
      className: ["lw-theme-toggle", className ?? ""].filter(Boolean).join(" "),
      role: "group",
      "aria-label": ariaLabel,
      children: SEGMENTS.map(({ value, label, Icon: Icon2 }) => {
        const active = theme === value;
        return /* @__PURE__ */ jsxRuntime.jsxs(
          "button",
          {
            type: "button",
            "data-lw-theme": value,
            "aria-pressed": active,
            "aria-label": `${label} theme`,
            tabIndex: active ? 0 : -1,
            onClick: () => setTheme(value),
            onKeyDown: (e) => {
              if (e.key === "ArrowRight" || e.key === "ArrowDown") move(e, 1);
              else if (e.key === "ArrowLeft" || e.key === "ArrowUp") move(e, -1);
              else if (e.key === "Home") {
                e.preventDefault();
                const root = e.currentTarget.parentElement;
                const first = root?.querySelector("button");
                first && setTheme(first.getAttribute("data-lw-theme"));
                first?.focus();
              } else if (e.key === "End") {
                e.preventDefault();
                const root = e.currentTarget.parentElement;
                const all = root?.querySelectorAll("button");
                const last = all?.[all.length - 1];
                last && setTheme(last.getAttribute("data-lw-theme"));
                last?.focus();
              }
            },
            children: [
              showIcons ? /* @__PURE__ */ jsxRuntime.jsx(Icon2, { size: 14 }) : null,
              showLabels ? /* @__PURE__ */ jsxRuntime.jsx("span", { children: label }) : null
            ]
          },
          value
        );
      })
    }
  );
}
function escapeHtml(s) {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}
function CodeSurface({
  code,
  highlightedHtml
}) {
  if (highlightedHtml != null) {
    return /* @__PURE__ */ jsxRuntime.jsx("pre", { className: "lw-code", tabIndex: 0, children: /* @__PURE__ */ jsxRuntime.jsx("code", { dangerouslySetInnerHTML: { __html: highlightedHtml } }) });
  }
  return /* @__PURE__ */ jsxRuntime.jsx("pre", { className: "lw-code", tabIndex: 0, children: /* @__PURE__ */ jsxRuntime.jsx("code", { dangerouslySetInnerHTML: { __html: escapeHtml(code ?? "") } }) });
}
function ConsoleHeader({
  filename,
  lang,
  actions
}) {
  return /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "lw-console-h", children: [
    /* @__PURE__ */ jsxRuntime.jsxs("span", { className: "left", children: [
      /* @__PURE__ */ jsxRuntime.jsxs("span", { className: "lights", "aria-hidden": "true", children: [
        /* @__PURE__ */ jsxRuntime.jsx("i", {}),
        /* @__PURE__ */ jsxRuntime.jsx("i", {}),
        /* @__PURE__ */ jsxRuntime.jsx("i", {})
      ] }),
      filename ? /* @__PURE__ */ jsxRuntime.jsx("span", { className: "url", children: filename }) : null
    ] }),
    /* @__PURE__ */ jsxRuntime.jsxs("span", { style: { display: "inline-flex", alignItems: "center", gap: 12 }, children: [
      lang ? /* @__PURE__ */ jsxRuntime.jsx("span", { children: lang }) : null,
      actions
    ] })
  ] });
}
function CodeBlock({
  code,
  lang,
  highlightedHtml,
  filename,
  headerActions,
  tabs,
  className
}) {
  if (tabs && tabs.length > 0) {
    return /* @__PURE__ */ jsxRuntime.jsx(
      CodeTabs,
      {
        tabs,
        filename,
        headerActions,
        className
      }
    );
  }
  const hasHeader = Boolean(filename || lang || headerActions);
  if (hasHeader) {
    return /* @__PURE__ */ jsxRuntime.jsxs("div", { className: ["lw-console", className ?? ""].filter(Boolean).join(" "), children: [
      /* @__PURE__ */ jsxRuntime.jsx(ConsoleHeader, { filename, lang, actions: headerActions }),
      /* @__PURE__ */ jsxRuntime.jsx(CodeSurface, { code, highlightedHtml })
    ] });
  }
  return /* @__PURE__ */ jsxRuntime.jsx(
    CodeSurface,
    {
      code,
      highlightedHtml
    }
  );
}
function CodeTabs({
  tabs,
  filename,
  headerActions,
  className
}) {
  const [active, setActive] = react.useState(0);
  const tabRefs = react.useRef([]);
  const focusTab = (i) => {
    const idx = (i + tabs.length) % tabs.length;
    setActive(idx);
    tabRefs.current[idx]?.focus();
  };
  const onKeyDown = (e, i) => {
    switch (e.key) {
      case "ArrowRight":
      case "ArrowDown":
        e.preventDefault();
        focusTab(i + 1);
        break;
      case "ArrowLeft":
      case "ArrowUp":
        e.preventDefault();
        focusTab(i - 1);
        break;
      case "Home":
        e.preventDefault();
        focusTab(0);
        break;
      case "End":
        e.preventDefault();
        focusTab(tabs.length - 1);
        break;
    }
  };
  const current = tabs[active] ?? tabs[0];
  return /* @__PURE__ */ jsxRuntime.jsxs("div", { className: ["lw-console", className ?? ""].filter(Boolean).join(" "), children: [
    /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "lw-console-h", children: [
      /* @__PURE__ */ jsxRuntime.jsxs("span", { className: "left", children: [
        /* @__PURE__ */ jsxRuntime.jsxs("span", { className: "lights", "aria-hidden": "true", children: [
          /* @__PURE__ */ jsxRuntime.jsx("i", {}),
          /* @__PURE__ */ jsxRuntime.jsx("i", {}),
          /* @__PURE__ */ jsxRuntime.jsx("i", {})
        ] }),
        filename ? /* @__PURE__ */ jsxRuntime.jsx("span", { className: "url", children: filename }) : null
      ] }),
      headerActions
    ] }),
    /* @__PURE__ */ jsxRuntime.jsx("div", { className: "lw-code-tabs", role: "tablist", "aria-label": filename ?? "Code", children: tabs.map((t, i) => {
      const selected = i === active;
      return /* @__PURE__ */ jsxRuntime.jsx(
        "button",
        {
          ref: (el) => {
            tabRefs.current[i] = el;
          },
          type: "button",
          role: "tab",
          id: `lw-codetab-${t.id}`,
          "aria-selected": selected,
          "aria-controls": `lw-codepanel-${t.id}`,
          tabIndex: selected ? 0 : -1,
          onClick: () => setActive(i),
          onKeyDown: (e) => onKeyDown(e, i),
          children: t.label
        },
        t.id
      );
    }) }),
    /* @__PURE__ */ jsxRuntime.jsx(
      "div",
      {
        role: "tabpanel",
        id: `lw-codepanel-${current.id}`,
        "aria-labelledby": `lw-codetab-${current.id}`,
        tabIndex: 0,
        children: /* @__PURE__ */ jsxRuntime.jsx(CodeSurface, { code: current.code, highlightedHtml: current.highlightedHtml })
      }
    )
  ] });
}
function Console({
  filename,
  headerActions,
  "aria-label": ariaLabel,
  files,
  activeFileId,
  onSelectFile,
  renderFileMeta,
  children,
  onRun,
  onStep,
  stepCount = 0,
  stepIndex = 0,
  onScrub,
  isRunning = false,
  runLabel = "Run",
  stepLabel = "Step",
  className
}) {
  const showRunRow = typeof onRun === "function";
  const stepClamped = Math.max(0, Math.min(stepIndex, stepCount));
  return /* @__PURE__ */ jsxRuntime.jsxs(
    "div",
    {
      className: ["lw-console", "log", className ?? ""].filter(Boolean).join(" "),
      role: "group",
      "aria-label": ariaLabel ?? (typeof filename === "string" ? filename : "Validation console"),
      children: [
        (filename || headerActions) && /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "lw-console-h", children: [
          /* @__PURE__ */ jsxRuntime.jsxs("span", { className: "left", children: [
            /* @__PURE__ */ jsxRuntime.jsxs("span", { className: "lights", "aria-hidden": "true", children: [
              /* @__PURE__ */ jsxRuntime.jsx("i", {}),
              /* @__PURE__ */ jsxRuntime.jsx("i", {}),
              /* @__PURE__ */ jsxRuntime.jsx("i", {})
            ] }),
            filename ? /* @__PURE__ */ jsxRuntime.jsx("span", { className: "url", children: filename }) : null
          ] }),
          headerActions
        ] }),
        /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "lw-console-body", style: bodyStyle(files != null), children: [
          files != null && /* @__PURE__ */ jsxRuntime.jsx(
            FileTree,
            {
              files,
              activeId: activeFileId,
              onSelect: onSelectFile,
              renderMeta: renderFileMeta
            }
          ),
          /* @__PURE__ */ jsxRuntime.jsx("div", { className: "lw-console-rows", style: { flex: 1, minWidth: 0 }, children })
        ] }),
        showRunRow && /* @__PURE__ */ jsxRuntime.jsx("div", { className: "lw-console-foot", children: /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "lw-run-controls", children: [
          /* @__PURE__ */ jsxRuntime.jsxs(
            "button",
            {
              type: "button",
              className: "lw-btn lw-btn-brand",
              onClick: onRun,
              "aria-pressed": isRunning,
              children: [
                /* @__PURE__ */ jsxRuntime.jsx(Play, { size: 14 }),
                /* @__PURE__ */ jsxRuntime.jsx("span", { children: runLabel })
              ]
            }
          ),
          typeof onStep === "function" && /* @__PURE__ */ jsxRuntime.jsxs("button", { type: "button", className: "lw-btn lw-btn-ghost", onClick: onStep, children: [
            /* @__PURE__ */ jsxRuntime.jsx(Step, { size: 14 }),
            /* @__PURE__ */ jsxRuntime.jsx("span", { children: stepLabel })
          ] }),
          typeof onScrub === "function" && stepCount > 0 && /* @__PURE__ */ jsxRuntime.jsxs(jsxRuntime.Fragment, { children: [
            /* @__PURE__ */ jsxRuntime.jsx(
              "input",
              {
                type: "range",
                min: 0,
                max: stepCount,
                value: stepClamped,
                "aria-label": `Step ${stepClamped} of ${stepCount}`,
                onChange: (e) => onScrub(Number(e.target.value))
              }
            ),
            /* @__PURE__ */ jsxRuntime.jsxs(
              "span",
              {
                className: "lw-console-step",
                style: { fontFamily: "var(--lw-font-mono)", fontSize: 11 },
                "aria-hidden": "true",
                children: [
                  stepClamped,
                  "/",
                  stepCount
                ]
              }
            )
          ] })
        ] }) })
      ]
    }
  );
}
function bodyStyle(hasTree) {
  return hasTree ? { display: "flex", alignItems: "stretch", gap: 0 } : { display: "block" };
}
function FileTree({
  files,
  activeId,
  onSelect,
  renderMeta
}) {
  const itemRefs = react.useRef([]);
  const focusAt = (i) => {
    const idx = (i + files.length) % files.length;
    const f = files[idx];
    onSelect?.(f.id);
    itemRefs.current[idx]?.focus();
  };
  const onKeyDown = (e, i) => {
    switch (e.key) {
      case "ArrowDown":
      case "ArrowRight":
        e.preventDefault();
        focusAt(i + 1);
        break;
      case "ArrowUp":
      case "ArrowLeft":
        e.preventDefault();
        focusAt(i - 1);
        break;
      case "Home":
        e.preventDefault();
        focusAt(0);
        break;
      case "End":
        e.preventDefault();
        focusAt(files.length - 1);
        break;
      case "Enter":
      case " ":
        e.preventDefault();
        onSelect?.(files[i].id);
        break;
    }
  };
  return /* @__PURE__ */ jsxRuntime.jsx(
    "ul",
    {
      className: "lw-file-tree",
      role: "listbox",
      "aria-label": "Documents",
      style: { minWidth: 200, maxWidth: 260, flex: "0 0 auto" },
      children: files.map((f, i) => {
        const selected = f.id === activeId;
        return /* @__PURE__ */ jsxRuntime.jsxs(
          "li",
          {
            ref: (el) => {
              itemRefs.current[i] = el;
            },
            role: "option",
            "aria-selected": selected,
            "data-active": selected ? "" : void 0,
            tabIndex: selected ? 0 : -1,
            onClick: () => onSelect?.(f.id),
            onKeyDown: (e) => onKeyDown(e, i),
            children: [
              /* @__PURE__ */ jsxRuntime.jsx(File, { size: 13 }),
              /* @__PURE__ */ jsxRuntime.jsx("span", { style: { flex: 1, minWidth: 0 }, children: f.label }),
              renderMeta?.(f)
            ]
          },
          f.id
        );
      })
    }
  );
}

// lib/brand.js
function monogram(name) {
  if (!name) return "??";
  const words = name.trim().split(/\s+/).filter(Boolean);
  if (words.length === 0) return "??";
  if (words.length === 1) return words[0].slice(0, 2).toUpperCase();
  return (words[0][0] + words[words.length - 1][0]).toUpperCase();
}
function StoryCard({
  company,
  industry,
  description,
  mark,
  monogramName,
  status,
  statusLabel,
  quote,
  kpi,
  kpiSub,
  href,
  className,
  onClick
}) {
  const cls = ["lw-card", "lw-card-glow", "lw-spotlight", className ?? ""].filter(Boolean).join(" ");
  const hasQuote = Boolean(
    quote && quote.quote && quote.person && quote.role
  );
  const inner = /* @__PURE__ */ jsxRuntime.jsxs(jsxRuntime.Fragment, { children: [
    mark != null ? /* @__PURE__ */ jsxRuntime.jsx("div", { className: "logo", children: mark }) : /* @__PURE__ */ jsxRuntime.jsx("div", { className: "logo lw-monogram", "aria-hidden": "true", children: monogram(
      typeof monogramName === "string" ? monogramName : typeof company === "string" ? company : ""
    ) }),
    /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "body", children: [
      industry ? /* @__PURE__ */ jsxRuntime.jsx(Eyebrow, { muted: true, className: "lw-mb-3", style: { fontSize: 10 }, children: industry }) : null,
      /* @__PURE__ */ jsxRuntime.jsx("h3", { children: company }),
      description ? /* @__PURE__ */ jsxRuntime.jsx("p", { children: description }) : null,
      (kpi || kpiSub) && /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "meta", children: [
        kpi ? /* @__PURE__ */ jsxRuntime.jsx("span", { className: "kpi", children: kpi }) : null,
        kpiSub ? /* @__PURE__ */ jsxRuntime.jsx("span", { className: "kpi-sub", children: typeof kpiSub === "string" ? kpiSub.toUpperCase() : kpiSub }) : null
      ] }),
      status && /* @__PURE__ */ jsxRuntime.jsx("span", { className: "lw-status-chip", "data-variant": status, children: statusLabel ?? status }),
      hasQuote && quote && /* @__PURE__ */ jsxRuntime.jsxs("blockquote", { className: "lw-story-quote", children: [
        /* @__PURE__ */ jsxRuntime.jsx("p", { children: quote.quote }),
        /* @__PURE__ */ jsxRuntime.jsxs("footer", { children: [
          /* @__PURE__ */ jsxRuntime.jsx("span", { className: "person", children: quote.person }),
          /* @__PURE__ */ jsxRuntime.jsx("span", { className: "role", children: quote.role })
        ] })
      ] })
    ] })
  ] });
  if (href) {
    return /* @__PURE__ */ jsxRuntime.jsx("a", { className: cls, href, onClick, children: inner });
  }
  return /* @__PURE__ */ jsxRuntime.jsx(
    "div",
    {
      className: cls,
      onClick,
      role: onClick ? "button" : void 0,
      tabIndex: onClick ? 0 : void 0,
      onKeyDown: onClick ? (e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onClick();
        }
      } : void 0,
      children: inner
    }
  );
}
function FeatureGrid({
  items,
  style,
  className,
  spotlight = true
}) {
  return /* @__PURE__ */ jsxRuntime.jsx(
    "div",
    {
      className: ["lw-features", "lw-reveal", className ?? ""].filter(Boolean).join(" "),
      style: { marginTop: 48, ...style },
      children: items.map((f, i) => {
        const cls = [
          "lw-feature",
          spotlight ? "lw-spotlight" : ""
        ].filter(Boolean).join(" ");
        return /* @__PURE__ */ jsxRuntime.jsxs("div", { className: cls, children: [
          f.icon ? /* @__PURE__ */ jsxRuntime.jsx("div", { className: "icon", "aria-hidden": "true", children: f.icon }) : f.num ? /* @__PURE__ */ jsxRuntime.jsx("div", { className: "num", children: f.num }) : null,
          /* @__PURE__ */ jsxRuntime.jsx("h3", { children: f.title }),
          /* @__PURE__ */ jsxRuntime.jsx("p", { children: f.body })
        ] }, f.id ?? f.num ?? i);
      })
    }
  );
}
function LogoRail({
  items,
  marquee = true,
  className,
  "aria-label": ariaLabel = "Customers"
}) {
  const cls = [
    "lw-logo-rail",
    marquee ? "marquee" : "",
    className ?? ""
  ].filter(Boolean).join(" ");
  return /* @__PURE__ */ jsxRuntime.jsxs("div", { className: cls, "aria-label": ariaLabel, children: [
    /* @__PURE__ */ jsxRuntime.jsx("div", { className: "lw-logo-track", children: items.map((it) => /* @__PURE__ */ jsxRuntime.jsx(LogoCell, { item: it }, it.id)) }),
    marquee && /* @__PURE__ */ jsxRuntime.jsx("div", { className: "lw-logo-track", "aria-hidden": "true", children: items.map((it) => /* @__PURE__ */ jsxRuntime.jsx(LogoCell, { item: it }, `${it.id}-dup`)) })
  ] });
}
function LogoCell({ item }) {
  const inner = item.mark ?? /* @__PURE__ */ jsxRuntime.jsx("span", { className: "name lw-mono", children: item.name });
  if (item.href) {
    return /* @__PURE__ */ jsxRuntime.jsx("a", { className: "lw-logo-cell", href: item.href, "aria-label": item.name, children: inner });
  }
  return /* @__PURE__ */ jsxRuntime.jsx("div", { className: "lw-logo-cell", role: "img", "aria-label": item.name, children: inner });
}
function useReveal(opts = {}) {
  const {
    selector = ".lw-reveal:not(.in)",
    dep,
    fallbackMs = 1500,
    rootMargin = "0px 0px -10% 0px",
    threshold = 0.05
  } = opts;
  react.useEffect(() => {
    const root = document.documentElement;
    const markReady = () => root.classList.add("lw-reveal-ready");
    const els = document.querySelectorAll(selector);
    if (els.length === 0) {
      markReady();
      return;
    }
    if (typeof IntersectionObserver === "undefined") {
      for (const el of els) el.classList.add("in");
      markReady();
      return;
    }
    const io = new IntersectionObserver(
      (entries, observer) => {
        for (const e of entries) {
          if (!e.isIntersecting) continue;
          e.target.classList.add("in");
          observer.unobserve(e.target);
        }
        markReady();
      },
      { rootMargin, threshold }
    );
    for (const el of els) io.observe(el);
    const timer = setTimeout(() => {
      for (const el of document.querySelectorAll(".lw-reveal:not(.in)")) {
        el.classList.add("in");
      }
      markReady();
    }, fallbackMs);
    return () => {
      io.disconnect();
      clearTimeout(timer);
    };
  }, [dep, selector, rootMargin, threshold, fallbackMs]);
}
function useSpotlight(opts = {}) {
  const { selector = ".lw-spotlight" } = opts;
  react.useEffect(() => {
    if (typeof window === "undefined" || typeof document === "undefined") return;
    if (!window.matchMedia("(hover: hover)").matches) return;
    let raf = 0;
    let lastEvent = null;
    const apply = () => {
      raf = 0;
      const e = lastEvent;
      if (!e) return;
      const card = e.target?.closest?.(selector);
      if (!card) return;
      const rect = card.getBoundingClientRect();
      card.style.setProperty("--lw-mx", `${e.clientX - rect.left}px`);
      card.style.setProperty("--lw-my", `${e.clientY - rect.top}px`);
    };
    const onMove = (e) => {
      lastEvent = e;
      if (!raf) raf = requestAnimationFrame(apply);
    };
    document.addEventListener("pointermove", onMove, { passive: true });
    return () => {
      document.removeEventListener("pointermove", onMove);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [selector]);
}
var prefersReducedMotion = () => typeof window !== "undefined" && typeof window.matchMedia === "function" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
function useDeterministicCascade(opts) {
  const {
    stepCount,
    restartKey,
    intervalMs = 700,
    respectReducedMotion = true,
    autoStart = false
  } = opts;
  const [stepIndex, setStepIndex] = react.useState(stepCount);
  const [isRunning, setIsRunning] = react.useState(false);
  const timerRef = react.useRef(null);
  const reduced = respectReducedMotion && prefersReducedMotion();
  const clearTimer = react.useCallback(() => {
    if (timerRef.current !== null) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  }, []);
  const clampStep = react.useCallback(
    (i) => Math.max(0, Math.min(i, stepCount)),
    [stepCount]
  );
  const run = react.useCallback(() => {
    if (respectReducedMotion && prefersReducedMotion()) {
      clearTimer();
      setIsRunning(false);
      setStepIndex(stepCount);
      return;
    }
    clearTimer();
    setStepIndex(0);
    setIsRunning(true);
    timerRef.current = setInterval(() => {
      setStepIndex((prev) => {
        const next = prev + 1;
        if (next >= stepCount) {
          if (timerRef.current !== null) {
            clearInterval(timerRef.current);
            timerRef.current = null;
          }
          setIsRunning(false);
          return stepCount;
        }
        return next;
      });
    }, intervalMs);
  }, [stepCount, intervalMs, clearTimer, respectReducedMotion]);
  const step = react.useCallback(() => {
    if (respectReducedMotion && prefersReducedMotion()) {
      clearTimer();
      setIsRunning(false);
      setStepIndex((prev) => prev >= stepCount ? stepCount : prev + 1);
      return;
    }
    clearTimer();
    setIsRunning(false);
    setStepIndex((prev) => prev >= stepCount ? 0 : prev + 1);
  }, [stepCount, clearTimer, respectReducedMotion]);
  const scrub = react.useCallback(
    (index) => {
      clearTimer();
      setIsRunning(false);
      setStepIndex(clampStep(index));
    },
    [clampStep, clearTimer]
  );
  const restart = react.useCallback(() => {
    if (respectReducedMotion && prefersReducedMotion()) {
      clearTimer();
      setIsRunning(false);
      setStepIndex(stepCount);
      return;
    }
    clearTimer();
    setIsRunning(false);
    setStepIndex(0);
  }, [stepCount, clearTimer, respectReducedMotion]);
  react.useEffect(() => {
    setStepIndex((prev) => prev > stepCount ? stepCount : prev);
  }, [stepCount]);
  const didAutoStart = react.useRef(false);
  react.useEffect(() => {
    if (autoStart && !didAutoStart.current) {
      didAutoStart.current = true;
      run();
    }
  }, [autoStart, run]);
  const firstRestartKey = react.useRef(true);
  react.useEffect(() => {
    if (firstRestartKey.current) {
      firstRestartKey.current = false;
      return;
    }
    run();
  }, [restartKey]);
  react.useEffect(() => clearTimer, [clearTimer]);
  return {
    stepIndex,
    done: stepIndex >= stepCount,
    isRunning,
    run,
    step,
    scrub,
    restart,
    reducedMotion: reduced
  };
}

exports.Auto = Auto;
exports.Button = Button;
exports.Card = Card;
exports.Check = Check;
exports.ChevronRight = ChevronRight;
exports.CodeBlock = CodeBlock;
exports.Console = Console;
exports.Cross = Cross;
exports.Dash = Dash;
exports.Eyebrow = Eyebrow;
exports.FeatureGrid = FeatureGrid;
exports.File = File;
exports.Icon = Icon;
exports.LogoRail = LogoRail;
exports.Moon = Moon;
exports.Play = Play;
exports.Step = Step;
exports.StoryCard = StoryCard;
exports.Sun = Sun;
exports.ThemeToggle = ThemeToggle;
exports.Warning = Warning;
exports.useDeterministicCascade = useDeterministicCascade;
exports.useReveal = useReveal;
exports.useSpotlight = useSpotlight;
exports.useTheme = useTheme;
