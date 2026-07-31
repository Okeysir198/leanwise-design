"use client";
import * as React from "react";
import { Icon } from "../primitives/Icon.jsx";
import { Popover } from "../overlays/Popover.jsx";
import { Calendar } from "./Calendar.jsx";
const cx = (...a) => a.filter(Boolean).join(" ");

const day = (d) => new Date(d.getFullYear(), d.getMonth(), d.getDate());
const shift = (n) => { const d = new Date(); d.setDate(d.getDate() + n); return day(d); };

/** The presets are the point of a range picker. "Last 7 days" is what a user
 *  actually wants nine times out of ten, and making them build it from two
 *  clicks on a grid is the difference between a control and a chore. */
export const RANGE_PRESETS = [
  { label: "Today", get: () => ({ start: day(new Date()), end: day(new Date()) }) },
  { label: "Last 7 days", get: () => ({ start: shift(-6), end: day(new Date()) }) },
  { label: "Last 30 days", get: () => ({ start: shift(-29), end: day(new Date()) }) },
  { label: "Last 90 days", get: () => ({ start: shift(-89), end: day(new Date()) }) },
];

/**
 * The date field. `range` turns it into a range picker with presets down the
 * left — on the same `Popover` as Menu and Combobox, so there is still one
 * floating surface in the system.
 */
/* forwardRef, for the same reason Input.jsx gives — see Combobox.jsx.
   The ref lands on the trigger button, which is what a form library focuses. */
export const DatePicker = React.forwardRef(function DatePicker({
  value, onChange, range, presets = RANGE_PRESETS, min, max, size = "md",
  invalid, disabled, placeholder, locale, label, id, className, ...rest
}, forwardedRef) {
  const [open, setOpen] = React.useState(false);
  const uid = React.useId();
  const fmt = new Intl.DateTimeFormat(locale, { day: "numeric", month: "short", year: "numeric" });

  const text = React.useMemo(() => {
    if (range) {
      const v = value || {};
      if (!v.start) return "";
      return fmt.format(v.start) + (v.end ? " – " + fmt.format(v.end) : " – …");
    }
    return value ? fmt.format(value) : "";
  }, [value, range, locale]);

  const activePreset = range && value && value.start && value.end
    ? presets.findIndex(p => { const r = p.get(); return r.start.getTime() === day(value.start).getTime() && r.end.getTime() === day(value.end).getTime(); })
    : -1;

  /* The empty state is an ATTRIBUTE, not a second class the caller picks: it is
     the same element either way, so data-placeholder keeps the choice in the CSS
     layer where the ink already lives. */
  const field = (
    <button ref={forwardedRef} type="button" id={id || uid} disabled={disabled}
      aria-invalid={invalid ? "true" : undefined} aria-label={label}
      className={cx("lw-input", "lw-datefield", size === "sm" && "lw-input-sm", size === "lg" && "lw-input-lg", className)}
      data-placeholder={text ? undefined : "true"}>
      <Icon name="calendar" size={15} className="lw-datefield-ic" />
      <span className="lw-datefield-text">
        {text || placeholder || (range ? "Pick a range" : "Pick a date")}
      </span>
    </button>
  );

  return (
    <Popover trigger={field} open={open && !disabled} onOpenChange={setOpen} padded
      role="dialog" label={label || (range ? "Choose a date range" : "Choose a date")} placement="bottom-start" {...rest}>
      <div className="lw-cal-wrap">
        {range && presets.length > 0 && (
          <div className="lw-cal-presets">
            {presets.map((p, i) => (
              /* aria-current, not aria-pressed. These are shortcut ACTIONS —
                 each applies a range and closes the panel — so `aria-pressed`
                 announced four toggle buttons, three of them "not pressed",
                 for a set where at most one is ever the current range and often
                 none is. aria-current is the idiom for "this one in the set is
                 the current one" and claims nothing about togglability. */
              <button key={p.label} type="button" className="lw-cal-preset"
                aria-current={i === activePreset ? "true" : undefined}
                onClick={() => { onChange && onChange(p.get()); setOpen(false); }}>{p.label}</button>
            ))}
          </div>
        )}
        <Calendar value={value} onChange={(v) => {
          onChange && onChange(v);
          // A single date is complete on one click; a range is not complete
          // until it has an end, so the panel stays open for the second one.
          if (!range) setOpen(false);
          else if (v && v.end) setOpen(false);
        }} range={range} min={min} max={max} locale={locale} />
      </div>
    </Popover>
  );
});
