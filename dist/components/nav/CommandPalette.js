"use client";
import { jsx, jsxs } from "react/jsx-runtime";
import * as React from "react";
import { Icon } from "../primitives/Icon.js";
const cx = (...a) => a.filter(Boolean).join(" ");
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
  placeholder = "Type a command or search\u2026",
  emptyText = "No matches",
  label = "Command palette",
  hints = ["\u2191\u2193 navigate", "\u21B5 run", "esc close"],
  className,
  ...rest
}) {
  const ref = React.useRef(null);
  const inputRef = React.useRef(null);
  const [q, setQ] = React.useState("");
  const [active, setActive] = React.useState(0);
  const uid = React.useId();
  React.useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (open && !el.open) {
      el.showModal();
      setQ("");
      setActive(0);
    }
    if (!open && el.open) el.close();
  }, [open]);
  React.useEffect(() => {
    if (open && inputRef.current) inputRef.current.focus({ preventScroll: true });
  }, [open]);
  const shown = React.useMemo(() => commands.filter((c) => !c.hidden).map((c) => ({ c, s: Math.max(score(q, c.label), score(q, c.group || "") - 4, ...(c.keywords || []).map((k) => score(q, k) - 2)) })).filter((x) => x.s >= 0).sort((a, b) => b.s - a.s).map((x) => x.c), [q, commands]);
  React.useEffect(() => {
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
  return /* @__PURE__ */ jsxs(
    "dialog",
    {
      ref,
      className: cx("lw-cmdk", className),
      "aria-label": label,
      onClose,
      onCancel: (e) => {
        e.preventDefault();
        onClose && onClose(e);
      },
      onKeyDown,
      ...rest,
      children: [
        /* @__PURE__ */ jsxs("div", { className: "lw-cmdk-input", children: [
          /* @__PURE__ */ jsx(Icon, { name: "search", size: 17 }),
          /* @__PURE__ */ jsx(
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
          )
        ] }),
        /* @__PURE__ */ jsxs("ul", { className: "lw-cmdk-list lw-menu", id: uid, role: "listbox", "aria-label": label, children: [
          !shown.length && /* @__PURE__ */ jsx("li", { className: "lw-listbox-empty", children: emptyText }),
          shown.map((c, i) => {
            const head = c.group && c.group !== lastGroup ? lastGroup = c.group : null;
            return /* @__PURE__ */ jsxs(React.Fragment, { children: [
              head && /* @__PURE__ */ jsx("li", { className: "lw-menu-label", role: "presentation", children: head }),
              /* @__PURE__ */ jsxs(
                "li",
                {
                  id: uid + "-" + i,
                  role: "option",
                  "aria-selected": i === active,
                  className: "lw-menu-item",
                  "data-active": i === active ? "true" : void 0,
                  style: i === active ? { background: "var(--lw-bg-subtle)" } : void 0,
                  onMouseEnter: () => setActive(i),
                  onClick: () => run(c),
                  children: [
                    /* @__PURE__ */ jsx("span", { className: "lw-menu-lead", children: c.icon && /* @__PURE__ */ jsx(Icon, { name: c.icon, size: 15 }) }),
                    /* @__PURE__ */ jsx("span", { className: "lw-menu-text", children: c.label }),
                    c.kbd && /* @__PURE__ */ jsx("span", { className: "lw-menu-kbd", children: c.kbd })
                  ]
                }
              )
            ] }, c.id ?? i);
          })
        ] }),
        /* @__PURE__ */ jsx("div", { className: "lw-cmdk-foot", children: hints.map((h, i) => /* @__PURE__ */ jsx("span", { children: h }, i)) })
      ]
    }
  );
}
export {
  CommandPalette,
  score
};
