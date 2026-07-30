import { Icon } from "../primitives/Icon.jsx";
const cx = (...a) => a.filter(Boolean).join(" ");

/* Subsequence match, not substring: "opdb" should find "Open database". Scored
   so an early, contiguous match ranks above a scattered one, because a palette
   that returns the right row in ninth place is a palette people stop using. */
export function score(query, text) {
  if (!query) return 0;
  const q = query.toLowerCase(), s = String(text).toLowerCase();
  let i = 0, hit = 0, run = 0, best = 0;
  for (let n = 0; n < s.length && i < q.length; n++) {
    if (s[n] === q[i]) {
      i++; run++; hit += run + (n === 0 || s[n - 1] === " " ? 3 : 0);
      best = Math.max(best, run);
    } else run = 0;
  }
  return i === q.length ? hit + best : -1;
}

/**
 * The command palette. A DIALOG, not a popover: it is modal, it takes the whole
 * keyboard, and the page behind it should be inert — so it is the native
 * element, with the platform's focus trap, for the same reason Dialog is.
 *
 * The component does NOT bind ⌘K. A palette that installs a global key handler
 * fights the host app for it and cannot be turned off on the one screen where
 * ⌘K means something else. Bind it where you mount it.
 */
export function CommandPalette({
  open, onClose, commands = [], onRun, placeholder = "Type a command or search…",
  emptyText = "No matches", label = "Command palette", className, ...rest
}) {
  const ref = React.useRef(null);
  const inputRef = React.useRef(null);
  const [q, setQ] = React.useState("");
  const [active, setActive] = React.useState(0);
  const uid = React.useId();

  React.useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (open && !el.open) { el.showModal(); setQ(""); setActive(0); }
    if (!open && el.open) el.close();
  }, [open]);

  // The input is focused from an effect rather than autoFocus: autoFocus only
  // fires on mount, and this dialog is mounted long before it is opened.
  React.useEffect(() => { if (open && inputRef.current) inputRef.current.focus({ preventScroll: true }); }, [open]);

  const shown = React.useMemo(() => {
    if (!q) return commands.filter(c => !c.hidden);
    return commands.filter(c => !c.hidden)
      .map(c => ({ c, s: Math.max(score(q, c.label), score(q, c.group || "") - 4, ...(c.keywords || []).map(k => score(q, k) - 2)) }))
      .filter(x => x.s >= 0).sort((a, b) => b.s - a.s).map(x => x.c);
  }, [q, commands]);

  React.useEffect(() => { setActive(0); }, [q]);

  const run = (c) => {
    if (!c || c.disabled) return;
    onClose && onClose();
    c.run ? c.run(c) : onRun && onRun(c);
  };

  const onKeyDown = (e) => {
    if (e.key === "ArrowDown") { e.preventDefault(); setActive(i => (i + 1) % Math.max(shown.length, 1)); }
    else if (e.key === "ArrowUp") { e.preventDefault(); setActive(i => (i - 1 + shown.length) % Math.max(shown.length, 1)); }
    else if (e.key === "Enter") { e.preventDefault(); run(shown[active]); }
  };

  let lastGroup = null;
  return (
    <dialog ref={ref} className={cx("lw-cmdk", className)} aria-label={label}
      onClose={onClose} onCancel={onClose} onKeyDown={onKeyDown} {...rest}>
      <div className="lw-cmdk-input">
        <Icon name="search" size={17} />
        <input ref={inputRef} type="text" role="combobox" aria-expanded="true" aria-controls={uid}
          aria-activedescendant={shown[active] ? uid + "-" + active : undefined}
          aria-label={label} placeholder={placeholder} value={q} onChange={(e) => setQ(e.target.value)} />
      </div>
      <ul className="lw-cmdk-list lw-menu" id={uid} role="listbox" aria-label={label}>
        {!shown.length && <li className="lw-listbox-empty">{emptyText}</li>}
        {shown.map((c, i) => {
          const head = c.group && c.group !== lastGroup ? (lastGroup = c.group) : null;
          return (
            <React.Fragment key={c.id ?? i}>
              {head && <li className="lw-menu-label" role="presentation">{head}</li>}
              <li id={uid + "-" + i} role="option" aria-selected={i === active}
                className="lw-menu-item" data-active={i === active ? "true" : undefined}
                style={i === active ? { background: "var(--lw-bg-subtle)" } : undefined}
                onMouseEnter={() => setActive(i)} onClick={() => run(c)}>
                <span className="lw-menu-lead">{c.icon && <Icon name={c.icon} size={15} />}</span>
                <span className="lw-menu-text">{c.label}</span>
                {c.kbd && <span className="lw-menu-kbd">{c.kbd}</span>}
              </li>
            </React.Fragment>
          );
        })}
      </ul>
      <div className="lw-cmdk-foot"><span>↑↓ navigate</span><span>↵ run</span><span>esc close</span></div>
    </dialog>
  );
}
