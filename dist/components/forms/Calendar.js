"use client";
import { jsx, jsxs } from "react/jsx-runtime";
import * as React from "react";
import { Icon } from "../primitives/Icon.js";
const cx = (...a) => a.filter(Boolean).join(" ");
const day = (d) => new Date(d.getFullYear(), d.getMonth(), d.getDate());
const same = (a, b) => a && b && day(a).getTime() === day(b).getTime();
const addDays = (d, n) => {
  const x = day(d);
  x.setDate(x.getDate() + n);
  return x;
};
const addMonths = (d, n) => {
  const x = day(d);
  x.setDate(1);
  x.setMonth(x.getMonth() + n);
  return x;
};
const between = (d, a, b) => a && b && day(d) > day(a) && day(d) < day(b);
function Calendar({ value, onChange, range, month, onMonthChange, min, max, weekStart = 1, locale, className, ...rest }) {
  const sel = range ? value || {} : value;
  const anchor = (range ? sel.start : sel) || /* @__PURE__ */ new Date();
  const [viewRaw, setView] = React.useState(() => addMonths(anchor, 0));
  const view = month || viewRaw;
  const setMonth = (m) => {
    onMonthChange ? onMonthChange(m) : setView(m);
  };
  const [focused, setFocused] = React.useState(() => day(anchor));
  const [hover, setHover] = React.useState(null);
  const gridRef = React.useRef(null);
  const navving = React.useRef(false);
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
  const [today, setToday] = React.useState(null);
  React.useEffect(() => {
    setToday(day(/* @__PURE__ */ new Date()));
  }, []);
  React.useEffect(() => {
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
  return /* @__PURE__ */ jsxs("div", { className: cx("lw-cal", className), ...rest, children: [
    /* @__PURE__ */ jsxs("div", { className: "lw-cal-head", children: [
      /* @__PURE__ */ jsx("button", { type: "button", className: "lw-icon-btn", "aria-label": "Previous month", onClick: () => setMonth(addMonths(view, -1)), children: /* @__PURE__ */ jsx(Icon, { name: "chevron-left", size: 16 }) }),
      /* @__PURE__ */ jsx("div", { className: "lw-cal-month", "aria-live": "polite", children: fmtMonth.format(view) }),
      /* @__PURE__ */ jsx("button", { type: "button", className: "lw-icon-btn", "aria-label": "Next month", onClick: () => setMonth(addMonths(view, 1)), children: /* @__PURE__ */ jsx(Icon, { name: "chevron-right", size: 16 }) })
    ] }),
    /* @__PURE__ */ jsxs("div", { ref: gridRef, className: "lw-cal-grid", role: "grid", onKeyDown, onMouseLeave: () => setHover(null), children: [
      /* @__PURE__ */ jsx("div", { role: "row", className: "lw-cal-dow-row", children: dows.map((d, i) => /* @__PURE__ */ jsx("div", { role: "columnheader", className: "lw-cal-dow", children: d }, i)) }),
      /* @__PURE__ */ jsx("div", { role: "rowgroup", className: "lw-cal-weeks", children: weeks.map((week, w) => /* @__PURE__ */ jsx("div", { role: "row", className: "lw-cal-week", children: week.map((d, i) => {
        const outside = d.getMonth() !== view.getMonth();
        const selected = isSelected(d);
        const end = range ? sel.end || hover : null;
        const off = disabled(d);
        return /* @__PURE__ */ jsx(
          "button",
          {
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
            },
            children: d.getDate()
          },
          i
        );
      }) }, w)) })
    ] })
  ] });
}
export {
  Calendar
};
