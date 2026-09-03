"use client";
import * as React from "react";
import { Dialog as RD } from "radix-ui";
import { Icon } from "../primitives/Icon.jsx";
import { Layer, useLayer } from "../overlays/_layer.js";
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
 * keyboard, and the page behind it should be inert — so it is the same Radix
 * `Dialog` shell as Dialog and Drawer (v2.0.0; see Dialog.jsx for why the
 * native element was retired), in the same overlay layer. The listbox, the
 * scoring and the keyboard model inside it are the system's own.
 *
 * The component does NOT bind ⌘K. A palette that installs a global key handler
 * fights the host app for it and cannot be turned off on the one screen where
 * ⌘K means something else. Bind it where you mount it.
 */
export function CommandPalette({
  open, onClose, commands = [], onRun, placeholder = "Type a command or search…",
  emptyText = "No matches", label = "Command palette",
  hints = ["\u2191\u2193 navigate", "\u21b5 run", "esc close"],
  className, onCloseAutoFocus: userCloseAutoFocus, ...rest
}) {
  const layer = useLayer();
  const inputRef = React.useRef(null);
  const [q, setQ] = React.useState("");
  const [active, setActive] = React.useState(0);
  const [fromEl, setFromEl] = React.useState(null);
  // The opener, kept until the NEXT open: state is cleared on close, but Radix asks
  // where to send focus only when the content unmounts, after that.
  const openerRef = React.useRef(null);
  const uid = React.useId();

  // The query resets on every open, so a palette never reopens on a stale
  // filter — the reader's intent is new each time they reach for it. `fromEl`
  // (the control that had focus) is what the layer mirrors its theme from.
  React.useLayoutEffect(() => {
    if (open) { setQ(""); setActive(0); const el = typeof document !== "undefined" ? document.activeElement : null; openerRef.current = el; setFromEl(el); }
    else setFromEl(null);
  }, [open]);

  // Radix would focus the first tabbable on open, which is the input anyway;
  // stated explicitly so a future icon button ahead of it cannot steal it.
  const onOpenAutoFocus = (e) => { e.preventDefault(); inputRef.current && inputRef.current.focus({ preventScroll: true }); };
  // Radix Dialog returns focus to ITS Trigger on close — which a controlled panel
  // (`open` + `onClose`, no `trigger`) never has, so focus fell to <body> and a
  // keyboard user lost their place on every close. Send it back to the element
  // that was focused when we opened; a caller's own `onCloseAutoFocus` wins.
  const onCloseAutoFocus = (e) => {
    if (userCloseAutoFocus) userCloseAutoFocus(e);
    if (e.defaultPrevented) return;
    const el = openerRef.current;
    if (el && typeof el.focus === "function" && el.isConnected) { e.preventDefault(); el.focus(); }
  };
  const handleOpenChange = (next) => { if (!next && onClose) onClose(); };

  /* No empty-query special case: score() returns 0 for one, so every visible row
     clears `s >= 0` and the sort is stable — the general path already IS the
     unfiltered list, and writing it twice let the two drift. */
  const shown = React.useMemo(() => commands.filter(c => !c.hidden)
    .map(c => ({ c, s: Math.max(score(q, c.label), score(q, c.group || "") - 4, ...(c.keywords || []).map(k => score(q, k) - 2)) }))
    .filter(x => x.s >= 0).sort((a, b) => b.s - a.s).map(x => x.c), [q, commands]);

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
    <RD.Root open={!!open} onOpenChange={handleOpenChange} modal>
      <RD.Portal container={layer ? layer.container : undefined}>
        {/* Plain wrapper, not `Layer`: see Dialog.jsx. */}
        <div>
          <Layer modal from={fromEl}>
            <RD.Overlay className="lw-backdrop" />
            <RD.Content className={cx("lw-cmdk", className)} tabIndex={-1} onOpenAutoFocus={onOpenAutoFocus} onCloseAutoFocus={onCloseAutoFocus} onKeyDown={onKeyDown} {...rest}>
      {/* The dialog's accessible name; the input carries the same label. */}
      <RD.Title className="lw-sr-only">{label}</RD.Title>
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
      <div className="lw-cmdk-foot">{hints.map((h, i) => <span key={i}>{h}</span>)}</div>
            </RD.Content>
          </Layer>
        </div>
      </RD.Portal>
    </RD.Root>
  );
}
