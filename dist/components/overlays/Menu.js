"use client";
import { jsx, jsxs } from "react/jsx-runtime";
import * as React from "react";
import { Icon } from "../primitives/Icon.js";
import { Popover } from "./Popover.js";
const cx = (...a) => a.filter(Boolean).join(" ");
const isRow = (it) => !it.type || it.type === "item";
function Menu({ items = [], trigger, onSelect, label, placement = "bottom-start", matchWidth, className, ...rest }) {
  const [open, setOpen] = React.useState(false);
  const listEl = React.useRef(null);
  const typed = React.useRef({ s: "", t: 0 });
  const intent = React.useRef(0);
  const ROWS = '[role^="menuitem"]:not([aria-disabled="true"])';
  const rows = () => Array.from(listEl.current ? listEl.current.querySelectorAll(ROWS) : []);
  const focusAt = (i) => {
    const r = rows();
    if (!r.length) {
      if (typeof console !== "undefined") console.warn("Menu: no focusable rows \u2014 the list is not mounted.");
      return;
    }
    const el = r[(i + r.length) % r.length];
    el && el.focus({ preventScroll: true });
  };
  const listRef = React.useCallback((el) => {
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
  React.useEffect(() => {
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
  const triggerEl = React.isValidElement(trigger) ? React.cloneElement(trigger, {
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
  return /* @__PURE__ */ jsx(
    Popover,
    {
      trigger: triggerEl,
      open,
      onOpenChange: setOpen,
      role: "menu",
      label,
      placement,
      matchWidth,
      ...rest,
      children: /* @__PURE__ */ jsx("div", { ref: listRef, role: "none", className: cx("lw-menu", className), onKeyDown, children: items.map((it, i) => {
        if (it.type === "separator") return /* @__PURE__ */ jsx("hr", { className: "lw-menu-sep" }, i);
        if (it.type === "label") return /* @__PURE__ */ jsx("div", { className: "lw-menu-label", children: it.label }, i);
        const checkable = it.checked != null;
        const Tag = it.href ? "a" : "button";
        return /* @__PURE__ */ jsxs(
          Tag,
          {
            className: cx("lw-menu-item", it.danger && "danger"),
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
            },
            children: [
              (checkable || it.icon) && /* @__PURE__ */ jsx("span", { className: "lw-menu-lead", children: checkable ? it.checked ? /* @__PURE__ */ jsx(Icon, { name: "checkmark", size: 14 }) : null : /* @__PURE__ */ jsx(Icon, { name: it.icon, size: 15 }) }),
              /* @__PURE__ */ jsx("span", { className: "lw-menu-text", children: it.label }),
              it.kbd && /* @__PURE__ */ jsx("span", { className: "lw-menu-kbd", children: it.kbd })
            ]
          },
          it.value ?? i
        );
      }) })
    }
  );
}
export {
  Menu
};
