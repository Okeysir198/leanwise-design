"use client";
import { jsx, jsxs } from "react/jsx-runtime";
import * as React from "react";
import { useMergedRef } from "../_merge-refs.js";
import { Icon } from "../primitives/Icon.js";
const cx = (...a) => a.filter(Boolean).join(" ");
const TOOLS = [
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
const RichText = React.forwardRef(function RichText2({
  value,
  onChange,
  placeholder = "Write something\u2026",
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
  const ref = React.useRef(null);
  const setBodyRef = useMergedRef(ref, forwardedRef);
  const bodyId = React.useId();
  const [active, setActive] = React.useState({});
  const picked = tools ? TOOLS.filter((t) => t.sep || tools.includes(t.id)) : TOOLS;
  const list = toolLabels ? picked.map((t) => t.id && toolLabels[t.id] ? { ...t, ...toolLabels[t.id] } : t) : picked;
  React.useEffect(() => {
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
  const [len, setLen] = React.useState(0);
  const syncLen = () => setLen((ref.current && ref.current.textContent || "").length);
  React.useEffect(syncLen, [value]);
  const over = maxLength != null && len > maxLength;
  return /* @__PURE__ */ jsxs("div", { className: cx("lw-editor", className), ...rest, children: [
    /* @__PURE__ */ jsx("div", { className: "lw-editor-bar", role: "group", "aria-label": formatBarLabel(label || barLabel), "aria-controls": children ? void 0 : bodyId, children: list.map((t, i) => t.sep ? /* @__PURE__ */ jsx("span", { className: "sep", "aria-hidden": "true" }, "s" + i) : /* @__PURE__ */ jsx(
      "button",
      {
        type: "button",
        className: "lw-icon-btn",
        "aria-label": t.label,
        title: t.label,
        "aria-pressed": !!active[t.id],
        disabled: readOnly,
        onMouseDown: (e) => e.preventDefault(),
        onClick: () => run(t),
        children: t.glyph ? /* @__PURE__ */ jsx("span", { className: "lw-editor-glyph", "data-glyph": t.id, children: t.glyph }) : /* @__PURE__ */ jsx(Icon, { name: t.icon, size: 15 })
      },
      t.id
    )) }),
    children || /* @__PURE__ */ jsx(
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
    ),
    (footer || maxLength != null) && /* @__PURE__ */ jsxs("div", { className: "lw-editor-foot", children: [
      footer,
      /* @__PURE__ */ jsx("span", { className: "lw-editor-spacer" }),
      maxLength != null && /* @__PURE__ */ jsxs("span", { className: "lw-editor-count", "data-over": over ? "true" : void 0, "aria-live": "polite", children: [
        len,
        " / ",
        maxLength
      ] })
    ] })
  ] });
});
export {
  RichText,
  TOOLS
};
