import * as React from "react";
import { Icon } from "../primitives/Icon.jsx";
import { Popover } from "../overlays/Popover.jsx";
const cx = (...a) => a.filter(Boolean).join(" ");

const norm = (o) => (typeof o === "string" || typeof o === "number" ? { value: o, label: String(o) } : o);

/**
 * The single- and multi-select combobox — the control that gets rebuilt in every
 * product because a native <select> cannot filter and a listbox is 200 lines of
 * ARIA. Built on Popover, so it shares one floating surface with Menu.
 *
 * Focus stays in the INPUT and the active option is named by
 * `aria-activedescendant`. That is the ARIA 1.2 combobox pattern: moving real
 * focus into the list would take it out of the field the user is still typing in.
 * (Menu is the opposite — there is nothing to type into, so focus moves.)
 */
export function Combobox({
  options = [], value, onChange, multiple, placeholder, size = "md",
  invalid, disabled, loading, emptyText = "No matches", onSearch, id,
  label, className, ...rest
}) {
  const opts = React.useMemo(() => options.map(norm), [options]);
  const [open, setOpen] = React.useState(false);
  const [query, setQuery] = React.useState("");
  const [active, setActive] = React.useState(0);
  const inputRef = React.useRef(null);
  const listRef = React.useRef(null);
  const uid = React.useId();
  const listId = uid + "-list";
  const inputId = id || uid + "-in";

  const selected = multiple ? (Array.isArray(value) ? value : []) : value;
  const selectedOpts = multiple ? opts.filter(o => selected.includes(o.value)) : [];
  const current = !multiple ? opts.find(o => o.value === value) : null;

  // When the caller owns search (onSearch), the options ARE the result — filtering
  // them again locally would hide rows the server deliberately returned.
  const shown = React.useMemo(() => {
    if (onSearch || !query) return opts;
    const q = query.toLowerCase();
    return opts.filter(o => String(o.label).toLowerCase().includes(q));
  }, [opts, query, onSearch]);

  React.useEffect(() => { if (active >= shown.length) setActive(0); }, [shown.length, active]);

  // Keyboard scrolling must follow the active option, or arrowing past the tenth
  // row moves a highlight the user cannot see.
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
      const next = selected.includes(o.value) ? selected.filter(v => v !== o.value) : [...selected, o.value];
      onChange && onChange(next);
      setQuery("");
      // Stay open: picking one of several is rarely picking the last one.
    } else {
      onChange && onChange(o.value);
      setQuery("");
      setOpen(false);
    }
    inputRef.current && inputRef.current.focus({ preventScroll: true });
  };

  const remove = (v) => onChange && onChange(selected.filter(x => x !== v));

  const onKeyDown = (e) => {
    if (e.key === "ArrowDown" || e.key === "ArrowUp") {
      e.preventDefault();
      if (!open) { setOpen(true); return; }
      const d = e.key === "ArrowDown" ? 1 : -1;
      setActive((i) => (i + d + shown.length) % Math.max(shown.length, 1));
      return;
    }
    if (e.key === "Enter" && open) { e.preventDefault(); return commit(shown[active]); }
    if (e.key === "Escape" && open) { e.preventDefault(); return setOpen(false); }
    // Backspace is the SHORTCUT for removing the last token; the token's own
    // button is the affordance. Only fires on an empty query, so it can never eat
    // a token the user was still typing past.
    if (e.key === "Backspace" && multiple && !query && selected.length) return remove(selected[selected.length - 1]);
  };

  const field = (
    <div className={cx("lw-combo", size === "sm" && "lw-combo-sm", size === "lg" && "lw-combo-lg", className)}
      data-disabled={disabled ? "true" : undefined}
      onMouseDown={(e) => { if (e.target === e.currentTarget && inputRef.current) inputRef.current.focus(); }}>
      {selectedOpts.map(o => (
        <span key={o.value} className="lw-combo-token">
          <span>{o.label}</span>
          <button type="button" aria-label={"Remove " + o.label}
            onMouseDown={(e) => e.preventDefault()} onClick={() => remove(o.value)}>
            <Icon name="close" size={11} />
          </button>
        </span>
      ))}
      <input ref={inputRef} id={inputId} role="combobox" type="text" autoComplete="off"
        aria-expanded={open} aria-controls={listId} aria-autocomplete="list" aria-label={label}
        aria-activedescendant={open && shown[active] ? listId + "-" + active : undefined}
        aria-invalid={invalid ? "true" : undefined}
        disabled={disabled}
        placeholder={current ? undefined : (multiple && selectedOpts.length ? "" : placeholder)}
        value={!multiple && !open && current ? current.label : query}
        onChange={(e) => { setQuery(e.target.value); setActive(0); setOpen(true); onSearch && onSearch(e.target.value); }}
        onKeyDown={onKeyDown}
        onFocus={() => setOpen(true)} />
      <span className="lw-combo-chev"><Icon name="chevrons-up-down" size={15} /></span>
    </div>
  );

  return (
    <Popover trigger={field} open={open && !disabled} onOpenChange={setOpen} role="listbox"
      triggerAria={false} matchWidth placement="bottom-start" label={label} {...rest}>
      {loading ? <div className="lw-listbox-empty">Searching…</div>
        : !shown.length ? <div className="lw-listbox-empty">{emptyText}</div>
        : (
        <ul ref={listRef} className="lw-listbox" id={listId} role="listbox" aria-multiselectable={multiple || undefined}>
          {shown.map((o, i) => {
            const isSel = multiple ? selected.includes(o.value) : o.value === value;
            return (
              <li key={o.value} id={listId + "-" + i} className="lw-option" role="option"
                aria-selected={isSel} aria-disabled={o.disabled ? "true" : undefined}
                data-active={i === active ? "true" : undefined}
                onMouseEnter={() => setActive(i)}
                onMouseDown={(e) => e.preventDefault()}
                onClick={() => commit(o)}>
                <span className="lw-option-lead">{isSel && <Icon name="checkmark" size={14} />}</span>
                <span className="lw-option-text">{o.label}</span>
                {o.meta && <span className="lw-option-meta">{o.meta}</span>}
              </li>
            );
          })}
        </ul>
      )}
    </Popover>
  );
}
