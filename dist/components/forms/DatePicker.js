"use client";
import { jsx, jsxs } from "react/jsx-runtime";
import * as React from "react";
import { Icon } from "../primitives/Icon.js";
import { Popover } from "../overlays/Popover.js";
import { Calendar } from "./Calendar.js";
const cx = (...a) => a.filter(Boolean).join(" ");
const day = (d) => new Date(d.getFullYear(), d.getMonth(), d.getDate());
const shift = (n) => {
  const d = /* @__PURE__ */ new Date();
  d.setDate(d.getDate() + n);
  return day(d);
};
const RANGE_PRESETS = [
  { label: "Today", get: () => ({ start: day(/* @__PURE__ */ new Date()), end: day(/* @__PURE__ */ new Date()) }) },
  { label: "Last 7 days", get: () => ({ start: shift(-6), end: day(/* @__PURE__ */ new Date()) }) },
  { label: "Last 30 days", get: () => ({ start: shift(-29), end: day(/* @__PURE__ */ new Date()) }) },
  { label: "Last 90 days", get: () => ({ start: shift(-89), end: day(/* @__PURE__ */ new Date()) }) }
];
const DatePicker = React.forwardRef(function DatePicker2({
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
  const [open, setOpen] = React.useState(false);
  const uid = React.useId();
  const fmt = new Intl.DateTimeFormat(locale, { day: "numeric", month: "short", year: "numeric" });
  const text = React.useMemo(() => {
    if (range) {
      const v = value || {};
      if (!v.start) return "";
      return fmt.format(v.start) + (v.end ? " \u2013 " + fmt.format(v.end) : " \u2013 \u2026");
    }
    return value ? fmt.format(value) : "";
  }, [value, range, locale]);
  const activePreset = range && value && value.start && value.end ? presets.findIndex((p) => {
    const r = p.get();
    return r.start.getTime() === day(value.start).getTime() && r.end.getTime() === day(value.end).getTime();
  }) : -1;
  const field = /* @__PURE__ */ jsxs(
    "button",
    {
      ref: forwardedRef,
      type: "button",
      id: id || uid,
      disabled,
      "aria-invalid": invalid ? "true" : void 0,
      "aria-label": label,
      className: cx("lw-input", "lw-datefield", size === "sm" && "lw-input-sm", size === "lg" && "lw-input-lg", className),
      "data-placeholder": text ? void 0 : "true",
      children: [
        /* @__PURE__ */ jsx(Icon, { name: "calendar", size: 15, className: "lw-datefield-ic" }),
        /* @__PURE__ */ jsx("span", { className: "lw-datefield-text", children: text || placeholder || (range ? "Pick a range" : "Pick a date") })
      ]
    }
  );
  return /* @__PURE__ */ jsx(
    Popover,
    {
      trigger: field,
      open: open && !disabled,
      onOpenChange: setOpen,
      padded: true,
      role: "dialog",
      label: label || (range ? "Choose a date range" : "Choose a date"),
      placement: "bottom-start",
      ...rest,
      children: /* @__PURE__ */ jsxs("div", { className: "lw-cal-wrap", children: [
        range && presets.length > 0 && /* @__PURE__ */ jsx("div", { className: "lw-cal-presets", children: presets.map((p, i) => (
          /* aria-current, not aria-pressed. These are shortcut ACTIONS —
             each applies a range and closes the panel — so `aria-pressed`
             announced four toggle buttons, three of them "not pressed",
             for a set where at most one is ever the current range and often
             none is. aria-current is the idiom for "this one in the set is
             the current one" and claims nothing about togglability. */
          /* @__PURE__ */ jsx(
            "button",
            {
              type: "button",
              className: "lw-cal-preset",
              "aria-current": i === activePreset ? "true" : void 0,
              onClick: () => {
                onChange && onChange(p.get());
                setOpen(false);
              },
              children: p.label
            },
            p.label
          )
        )) }),
        /* @__PURE__ */ jsx(Calendar, { value, onChange: (v) => {
          onChange && onChange(v);
          if (!range) setOpen(false);
          else if (v && v.end) setOpen(false);
        }, range, min, max, locale })
      ] })
    }
  );
});
export {
  DatePicker,
  RANGE_PRESETS
};
