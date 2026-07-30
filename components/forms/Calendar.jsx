import * as React from "react";
import { Icon } from "../primitives/Icon.jsx";
const cx = (...a) => a.filter(Boolean).join(" ");

const day = (d) => new Date(d.getFullYear(), d.getMonth(), d.getDate());
const same = (a, b) => a && b && day(a).getTime() === day(b).getTime();
const addDays = (d, n) => { const x = day(d); x.setDate(x.getDate() + n); return x; };
const addMonths = (d, n) => { const x = day(d); x.setDate(1); x.setMonth(x.getMonth() + n); return x; };
const between = (d, a, b) => a && b && day(d) > day(a) && day(d) < day(b);

/**
 * The date grid. Real <button> cells with a roving tabindex — a date grid is only
 * usable by keyboard if each cell can hold focus, and Tab should enter and leave
 * the grid once rather than walk 42 days.
 *
 * Month names and weekday initials come from Intl, so the calendar is localised
 * by the browser rather than by a hardcoded English array.
 */
export function Calendar({ value, onChange, range, month, onMonthChange, min, max, weekStart = 1, locale, className, ...rest }) {
  const sel = range ? (value || {}) : value;
  const anchor = (range ? sel.start : sel) || new Date();
  const [viewRaw, setView] = React.useState(() => addMonths(anchor, 0));
  const view = month || viewRaw;
  const setMonth = (m) => { onMonthChange ? onMonthChange(m) : setView(m); };
  const [focused, setFocused] = React.useState(() => day(anchor));
  // A hover preview is what makes a range feel like a range before the second
  // click — without it the first click looks like it did nothing.
  const [hover, setHover] = React.useState(null);
  const gridRef = React.useRef(null);
  // Set only by keyboard navigation, so a re-render from a click or a hover never
  // yanks focus back into the grid.
  const navving = React.useRef(false);

  const fmtMonth = new Intl.DateTimeFormat(locale, { month: "long", year: "numeric" });
  const fmtDow = new Intl.DateTimeFormat(locale, { weekday: "narrow" });
  const fmtFull = new Intl.DateTimeFormat(locale, { weekday: "long", day: "numeric", month: "long", year: "numeric" });

  const first = new Date(view.getFullYear(), view.getMonth(), 1);
  const lead = (first.getDay() - weekStart + 7) % 7;
  const cells = Array.from({ length: 42 }, (_, i) => addDays(first, i - lead));
  const dows = Array.from({ length: 7 }, (_, i) => fmtDow.format(addDays(new Date(2024, 0, 7 + weekStart), i)));
  // role="grid" needs a row layer, so the flat 42 are chunked into six weeks.
  const weeks = Array.from({ length: 6 }, (_, w) => cells.slice(w * 7, w * 7 + 7));

  const disabled = (d) => (min && day(d) < day(min)) || (max && day(d) > day(max));

  const isSelected = (d) => range ? (same(d, sel.start) || same(d, sel.end)) : same(d, sel);
  const inRange = (d) => {
    if (!range) return false;
    const end = sel.end || (sel.start && hover);
    return between(d, sel.start, end) || between(d, end, sel.start);
  };

  const pick = (d) => {
    if (disabled(d)) return;
    if (!range) return onChange && onChange(day(d));
    // Second click BEFORE the first is a correction, not an error: swap rather
    // than reject, because the user is telling you the range they meant.
    if (!sel.start || sel.end) return onChange && onChange({ start: day(d), end: null });
    const [s, e] = day(d) < day(sel.start) ? [day(d), sel.start] : [sel.start, day(d)];
    onChange && onChange({ start: s, end: e });
  };

  const moveFocus = (next) => {
    navving.current = true;
    setFocused(next);
    if (next.getMonth() !== view.getMonth()) setMonth(addMonths(next, 0));
  };

  /* `today` is resolved in an EFFECT, not during render. `new Date()` in the
     render body differs between a server render and the client's hydration, so
     the today marker was a hydration mismatch waiting for the first SSR
     consumer. Null until mounted means no marker for one frame, which is the
     correct trade. */
  const [today, setToday] = React.useState(null);
  React.useEffect(() => { setToday(day(new Date())); }, []);
  // An effect, not requestAnimationFrame: rAF does not run in a hidden or
  // throttled document, so the focus would silently never land — and the cell
  // that should take it does not exist until this render has committed.
  React.useEffect(() => {
    if (!navving.current) return;
    navving.current = false;
    const el = gridRef.current && gridRef.current.querySelector('[tabindex="0"]');
    if (el) el.focus({ preventScroll: true });
  }, [focused]);

  const onKeyDown = (e) => {
    const k = e.key;
    const d = { ArrowRight: 1, ArrowLeft: -1, ArrowDown: 7, ArrowUp: -7 }[k];
    if (d) { e.preventDefault(); return moveFocus(addDays(focused, d)); }
    if (k === "PageUp") { e.preventDefault(); return moveFocus(addMonths(focused, -1)); }
    if (k === "PageDown") { e.preventDefault(); return moveFocus(addMonths(focused, 1)); }
    if (k === "Home") { e.preventDefault(); return moveFocus(addDays(focused, -((focused.getDay() - weekStart + 7) % 7))); }
    if (k === "End") { e.preventDefault(); return moveFocus(addDays(focused, 6 - ((focused.getDay() - weekStart + 7) % 7))); }
  };

  return (
    <div className={cx("lw-cal", className)} {...rest}>
      <div className="lw-cal-head">
        <button type="button" className="lw-icon-btn" aria-label="Previous month" onClick={() => setMonth(addMonths(view, -1))}>
          <Icon name="chevron-left" size={16} />
        </button>
        <div className="lw-cal-month" aria-live="polite">{fmtMonth.format(view)}</div>
        <button type="button" className="lw-icon-btn" aria-label="Next month" onClick={() => setMonth(addMonths(view, 1))}>
          <Icon name="chevron-right" size={16} />
        </button>
      </div>
      {/* role="grid" obliges a row/rowgroup layer and column headers. Forty-two
          gridcells as DIRECT children of the grid is axe aria-required-children,
          and it leaves a screen reader with no row or column position — the two
          things a date grid exists to convey. The weekday strip was
          aria-hidden, so the grid had no column headers at all. */}
      <div ref={gridRef} className="lw-cal-grid" role="grid" onKeyDown={onKeyDown} onMouseLeave={() => setHover(null)}>
        <div role="row" className="lw-cal-dow-row">
          {dows.map((d, i) => (
            <div key={i} role="columnheader" className="lw-cal-dow">{d}</div>
          ))}
        </div>
        <div role="rowgroup" className="lw-cal-weeks">
          {weeks.map((week, w) => (
            <div key={w} role="row" className="lw-cal-week">
              {week.map((d, i) => {
                const outside = d.getMonth() !== view.getMonth();
                const selected = isSelected(d);
                const end = range ? (sel.end || hover) : null;
                const off = disabled(d);
                return (
                  <button key={i} type="button" role="gridcell" className="lw-cal-day"
                    tabIndex={same(d, focused) ? 0 : -1}
                    aria-selected={selected}
                    aria-label={fmtFull.format(d)}
                    /* aria-disabled, NOT the disabled attribute. The roving
                       tabindex can land on any date, and a `disabled` button
                       cannot take focus — so when min/max ruled out the focused
                       date, NO cell in the grid had a focusable tabindex="0" and
                       the keyboard user was stuck. aria-disabled keeps the cell
                       focusable and announced as unavailable; pick() guards the
                       activation. This is the standard datepicker approach. */
                    aria-disabled={off || undefined}
                    data-outside={outside ? "true" : undefined}
                    data-today={today && same(d, today) ? "true" : undefined}
                    data-in-range={inRange(d) ? "true" : undefined}
                    data-edge={range && selected ? (same(d, sel.start) && end ? "start" : same(d, sel.end) ? "end" : undefined) : undefined}
                    onMouseEnter={() => range && sel.start && !sel.end && setHover(day(d))}
                    onFocus={() => setFocused(day(d))}
                    onClick={() => { if (!off) pick(d); }}>
                    {d.getDate()}
                  </button>
                );
              })}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
