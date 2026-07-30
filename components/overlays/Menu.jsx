import * as React from "react";
import { Icon } from "../primitives/Icon.jsx";
import { Popover } from "./Popover.jsx";
const cx = (...a) => a.filter(Boolean).join(" ");

const isRow = (it) => !it.type || it.type === "item";

/**
 * The action menu. Built ON Popover rather than beside it, so there is one
 * floating surface in the system and not two that drift a radius apart.
 *
 * Keyboard is the whole point of a menu component: arrows move focus, Home/End
 * jump, typing a letter jumps to the next row starting with it, Esc closes and
 * returns focus to the trigger. Focus MOVES with the highlight — a menu that
 * paints a highlight while focus stays on the trigger tells a screen reader
 * nothing has changed.
 */
export function Menu({ items = [], trigger, onSelect, label, placement = "bottom-start", matchWidth, className, ...rest }) {
  const [open, setOpen] = React.useState(false);
  const listEl = React.useRef(null);
  const typed = React.useRef({ s: "", t: 0 });
  // The open INTENT lives on the component, not on a DOM node: Popover renders
  // {open && children}, so .lw-menu does not exist at the moment the trigger is
  // keyed and any flag written to it is written to null. 0 = pointer (do not move
  // focus), 1 = first row, -1 = last row.
  const intent = React.useRef(0);

  const ROWS = '[role^="menuitem"]:not([aria-disabled="true"])';
  const rows = () => Array.from(listEl.current ? listEl.current.querySelectorAll(ROWS) : []);
  const focusAt = (i) => {
    const r = rows();
    // An empty list here means the panel is not mounted, not that the menu has no
    // rows. Returning silently is what hid a broken open-focus through two rounds.
    if (!r.length) { if (typeof console !== "undefined") console.warn("Menu: no focusable rows — the list is not mounted."); return; }
    const el = r[(i + r.length) % r.length];
    el && el.focus({ preventScroll: true });
  };

  // Focus on open is driven by the list's own CALLBACK REF, not by an effect:
  // the effect ordering between this component and Popover is not something to
  // depend on, and it was wrong. The callback fires the moment .lw-menu attaches.
  //
  // The focus itself is deferred one microtask because at ref-attach time the
  // panel is still display:none — Popover calls showPopover() in its own effect,
  // which has not run yet, and focus() on a display:none element is a no-op. A
  // microtask lands after the whole commit, effects included, and unlike
  // requestAnimationFrame it still runs in a hidden or throttled document.
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

  // Opening with a keyboard must land ON the first row. Opening with a pointer
  // must NOT — moving focus off the trigger on a mouse click is what makes a
  // menu feel like it stole the page.
  // A menu closed by Escape or an outside click must not carry a stale intent
  // into the next pointer-driven open.
  React.useEffect(() => { if (!open) intent.current = 0; }, [open]);

  const onKeyDown = (e) => {
    const r = rows();
    const i = r.indexOf(document.activeElement);
    if (e.key === "ArrowDown") { e.preventDefault(); return focusAt(i + 1); }
    if (e.key === "ArrowUp") { e.preventDefault(); return focusAt(i < 0 ? -1 : i - 1); }
    if (e.key === "Home") { e.preventDefault(); return focusAt(0); }
    if (e.key === "End") { e.preventDefault(); return focusAt(r.length - 1); }
    if (e.key === "Tab") { setOpen(false); return; }
    // Typeahead. A menu long enough to need arrows is long enough that a user
    // will try a letter, and nothing happening reads as broken.
    if (e.key.length === 1 && !e.metaKey && !e.ctrlKey && !e.altKey) {
      const now = Date.now();
      typed.current.s = now - typed.current.t > 700 ? e.key : typed.current.s + e.key;
      typed.current.t = now;
      const q = typed.current.s.toLowerCase();
      const hit = r.findIndex((el, n) => n > i && (el.textContent || "").trim().toLowerCase().startsWith(q));
      const from0 = r.findIndex((el) => (el.textContent || "").trim().toLowerCase().startsWith(q));
      const target = hit >= 0 ? hit : from0;
      if (target >= 0) { e.preventDefault(); focusAt(target); }
    }
  };

  const choose = (it) => {
    if (it.disabled) return;
    setOpen(false);
    it.onSelect ? it.onSelect(it) : onSelect && onSelect(it.value, it);
  };

  const triggerEl = React.isValidElement(trigger)
    ? React.cloneElement(trigger, {
        onKeyDown: (e) => {
          trigger.props.onKeyDown && trigger.props.onKeyDown(e);
          if (e.defaultPrevented) return;
          // The menu-button pattern: Down/Enter/Space open onto the FIRST row, Up
          // onto the LAST. Down and Up also have to open the menu themselves —
          // they never reach the trigger's click handler.
          if (e.key === "ArrowDown" || e.key === "Enter" || e.key === " ") {
            intent.current = 1;
            if (e.key === "ArrowDown") { e.preventDefault(); setOpen(true); }
          } else if (e.key === "ArrowUp") {
            intent.current = -1;
            e.preventDefault();
            setOpen(true);
          }
        },
      })
    : trigger;

  return (
    <Popover trigger={triggerEl} open={open} onOpenChange={setOpen} role="menu"
      label={label} placement={placement} matchWidth={matchWidth} {...rest}>
      {/* role="none" so the menuitems below are owned by the panel's role="menu",
            not by this generic div. Without it the ownership chain is broken. */}
      <div ref={listRef} role="none" className={cx("lw-menu", className)} onKeyDown={onKeyDown}>
        {items.map((it, i) => {
          if (it.type === "separator") return <hr key={i} className="lw-menu-sep" />;
          if (it.type === "label") return <div key={i} className="lw-menu-label">{it.label}</div>;
          const checkable = it.checked != null;
          const Tag = it.href ? "a" : "button";
          return (
            <Tag key={it.value ?? i} className={cx("lw-menu-item", it.danger && "danger")}
              type={it.href ? undefined : "button"} href={it.href || undefined}
              role={checkable ? "menuitemcheckbox" : "menuitem"}
              aria-checked={checkable ? !!it.checked : undefined}
              aria-disabled={it.disabled ? "true" : undefined}
              data-checked={checkable && it.checked ? "true" : undefined}
              tabIndex={-1}
              onClick={(e) => { if (!it.href) e.preventDefault(); choose(it); }}>
              {/* One lead slot for both a check and an icon, so checkable and
                  plain rows keep their labels on the same x. */}
              {(checkable || it.icon) && (
                <span className="lw-menu-lead">
                  {checkable
                    ? (it.checked ? <Icon name="checkmark" size={14} /> : null)
                    : <Icon name={it.icon} size={15} />}
                </span>
              )}
              <span className="lw-menu-text">{it.label}</span>
              {it.kbd && <span className="lw-menu-kbd">{it.kbd}</span>}
            </Tag>
          );
        })}
      </div>
    </Popover>
  );
}
