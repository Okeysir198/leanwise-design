const cx = (...a) => a.filter(Boolean).join(" ");


/** Roving-tabindex tabs with arrow-key navigation — the part every hand-rolled
 *  tab strip skips and the part a keyboard user needs.
 *
 *  Selection AND focus move together: a roving tabindex that changes the
 *  selected tab but leaves focus on the old one strands the keyboard user on a
 *  `tabindex="-1"` button, so the next arrow key does nothing. */
export function Tabs({ tabs = [], value, onChange, label, className, ...rest }) {
  const ref = React.useRef(null);
  const move = (next) => {
    onChange && onChange(tabs[next].value);
    const el = ref.current && ref.current.querySelectorAll('[role="tab"]')[next];
    if (el) el.focus({ preventScroll: true });
  };
  const onKeyDown = (e) => {
    const i = tabs.findIndex(t => t.value === value);
    if (i < 0) return;
    const k = e.key;
    if (k === "Home") { e.preventDefault(); return move(0); }
    if (k === "End") { e.preventDefault(); return move(tabs.length - 1); }
    const d = k === "ArrowRight" ? 1 : k === "ArrowLeft" ? -1 : 0;
    if (!d) return;
    e.preventDefault();
    move((i + d + tabs.length) % tabs.length);
  };
  return (
    <div ref={ref} className={cx("lw-tabs", className)} role="tablist" aria-label={label} onKeyDown={onKeyDown} {...rest}>
      {tabs.map(t => (
        <button key={t.value} role="tab" type="button" aria-selected={t.value === value}
          aria-controls={t.controls} id={t.id}
          tabIndex={t.value === value ? 0 : -1} onClick={() => onChange && onChange(t.value)}>
          {t.label}{t.count != null && <span className="count">{t.count}</span>}
        </button>
      ))}
    </div>
  );
}
