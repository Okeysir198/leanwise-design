"use client";
import { jsx, jsxs } from "react/jsx-runtime";
import * as React from "react";
import { useMergedRef } from "../_merge-refs.js";
import { Icon } from "../primitives/Icon.js";
import { Popover } from "../overlays/Popover.js";
const cx = (...a) => a.filter(Boolean).join(" ");
const norm = (o) => typeof o === "string" || typeof o === "number" ? { value: o, label: String(o) } : o;
const Combobox = React.forwardRef(function Combobox2({
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
  label,
  className,
  ...rest
}, forwardedRef) {
  const opts = React.useMemo(() => options.map(norm), [options]);
  const [open, setOpen] = React.useState(false);
  const [query, setQuery] = React.useState("");
  const [active, setActive] = React.useState(0);
  const inputRef = React.useRef(null);
  const setInputRef = useMergedRef(inputRef, forwardedRef);
  const listRef = React.useRef(null);
  const uid = React.useId();
  const listId = uid + "-list";
  const inputId = id || uid + "-in";
  const selected = multiple ? Array.isArray(value) ? value : [] : value;
  const selectedOpts = multiple ? opts.filter((o) => selected.includes(o.value)) : [];
  const current = !multiple ? opts.find((o) => o.value === value) : null;
  const shown = React.useMemo(() => {
    if (onSearch || !query) return opts;
    const q = query.toLowerCase();
    return opts.filter((o) => String(o.label).toLowerCase().includes(q));
  }, [opts, query, onSearch]);
  React.useEffect(() => {
    if (active >= shown.length) setActive(0);
  }, [shown.length, active]);
  React.useEffect(() => {
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
  const field = /* @__PURE__ */ jsxs(
    "div",
    {
      className: cx("lw-combo", size === "sm" && "lw-combo-sm", size === "lg" && "lw-combo-lg", className),
      "data-disabled": disabled ? "true" : void 0,
      onMouseDown: (e) => {
        if (e.target === e.currentTarget && inputRef.current) inputRef.current.focus();
      },
      children: [
        selectedOpts.map((o) => /* @__PURE__ */ jsxs("span", { className: "lw-combo-token", children: [
          /* @__PURE__ */ jsx("span", { children: o.label }),
          /* @__PURE__ */ jsx(
            "button",
            {
              type: "button",
              "aria-label": "Remove " + o.label,
              onMouseDown: (e) => e.preventDefault(),
              onClick: () => remove(o.value),
              children: /* @__PURE__ */ jsx(Icon, { name: "close", size: 11 })
            }
          )
        ] }, o.value)),
        /* @__PURE__ */ jsx(
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
        /* @__PURE__ */ jsx("span", { className: "lw-combo-chev", children: /* @__PURE__ */ jsx(Icon, { name: "chevrons-up-down", size: 15 }) })
      ]
    }
  );
  return /* @__PURE__ */ jsx(
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
      ...rest,
      children: loading ? /* @__PURE__ */ jsx("div", { id: listId, role: "listbox", "aria-busy": "true", className: "lw-listbox-empty", children: "Searching\u2026" }) : !shown.length ? /* @__PURE__ */ jsx("div", { id: listId, role: "listbox", className: "lw-listbox-empty", children: emptyText }) : /* @__PURE__ */ jsx("ul", { ref: listRef, className: "lw-listbox", id: listId, role: "listbox", "aria-multiselectable": multiple || void 0, children: shown.map((o, i) => {
        const isSel = multiple ? selected.includes(o.value) : o.value === value;
        return /* @__PURE__ */ jsxs(
          "li",
          {
            id: listId + "-" + i,
            className: "lw-option",
            role: "option",
            "aria-selected": isSel,
            "aria-disabled": o.disabled ? "true" : void 0,
            "data-active": i === active ? "true" : void 0,
            onMouseEnter: () => setActive(i),
            onMouseDown: (e) => e.preventDefault(),
            onClick: () => commit(o),
            children: [
              /* @__PURE__ */ jsx("span", { className: "lw-option-lead", children: isSel && /* @__PURE__ */ jsx(Icon, { name: "checkmark", size: 14 }) }),
              /* @__PURE__ */ jsx("span", { className: "lw-option-text", children: o.label }),
              o.meta && /* @__PURE__ */ jsx("span", { className: "lw-option-meta", children: o.meta })
            ]
          },
          o.value
        );
      }) })
    }
  );
});
export {
  Combobox
};
