"use client";
import * as React from "react";
import { useMergedRef } from "../_merge-refs.js";
import { Icon } from "../primitives/Icon.jsx";
const cx = (...a) => a.filter(Boolean).join(" ");

/* The toolbar is DATA, so swapping the engine underneath does not touch it — and
   so a product can drop a control by filtering an array rather than editing JSX. */
const TOOLS = [
  { id: "bold", icon: "spark", label: "Bold", cmd: "bold", glyph: "B" },
  { id: "italic", icon: "spark", label: "Italic", cmd: "italic", glyph: "I" },
  { sep: true },
  { id: "h2", icon: "list", label: "Heading", cmd: "formatBlock", arg: "h2", glyph: "H" },
  { id: "ul", icon: "list", label: "Bulleted list", cmd: "insertUnorderedList" },
  { id: "ol", icon: "sort-asc", label: "Numbered list", cmd: "insertOrderedList" },
  { id: "quote", icon: "quote", label: "Quote", cmd: "formatBlock", arg: "blockquote" },
  { id: "code", icon: "code", label: "Code", cmd: "formatBlock", arg: "pre" },
  { sep: true },
  { id: "link", icon: "link", label: "Link", cmd: "createLink", prompt: "Link URL" },
  { id: "clear", icon: "undo", label: "Clear formatting", cmd: "removeFormat" },
];

/**
 * The editor CHROME — a toolbar and a prose surface on the type scale. The
 * editing engine is deliberately not the system's: swap TipTap or ProseMirror in
 * underneath and the toolbar does not change, which is the only way a rich-text
 * editor stops being a fork of the design system.
 *
 * The default engine is the platform's `contenteditable`, which is honest about
 * what it is: fine for a comment box, not for a document. `renderToolbar` and
 * `children` let you keep this chrome and bring your own surface.
 */
/* forwardRef, for the same reason Input.jsx gives: without it react-hook-form's
   register(), a Controller's field.ref, an imperative .focus() on a validation
   error and every scroll-to-error silently do nothing. The five simple controls
   have had this since v1.0; these five composites did not, which made them the
   ones a real form could not use.

   The ref is redirected to the FOCUSABLE element via a merged callback ref rather
   than to the wrapper — a form library calls .focus() on what it is given, and
   focusing a <div> does nothing. Here that is the contenteditable surface. */
export const RichText = React.forwardRef(function RichText({
  value, onChange, placeholder = "Write something…", tools, maxLength,
  label, readOnly, footer, children, className, ...rest
}, forwardedRef) {
  const ref = React.useRef(null);
  const setBodyRef = useMergedRef(ref, forwardedRef);
  // The toolbar's aria-controls was the literal string "rt" — an IDREF pointing at
  // nothing, in every instance on the page. A dangling IDREF is worse than no
  // attribute: a screen reader announces a relationship that does not exist.
  const bodyId = React.useId();
  const [active, setActive] = React.useState({});
  const list = tools ? TOOLS.filter(t => t.sep || tools.includes(t.id)) : TOOLS;

  // The DOM owns the text while the user types; writing value back on every
  // keystroke would move the caret to the end on each one.
  React.useEffect(() => {
    const el = ref.current;
    if (el && value != null && el.innerHTML !== value) el.innerHTML = value;
  }, [value]);

  const syncActive = () => {
    if (typeof document.queryCommandState !== "function") return;
    const next = {};
    for (const t of list) {
      if (t.sep || !t.cmd) continue;
      try { next[t.id] = t.arg ? false : document.queryCommandState(t.cmd); } catch (e) {}
    }
    setActive(next);
  };

  const run = (t) => {
    const el = ref.current;
    if (!el || readOnly) return;
    el.focus();
    let arg = t.arg;
    if (t.prompt) {
      arg = window.prompt(t.prompt);
      if (!arg) return;
    }
    // execCommand is deprecated and this is the shim, not the plan — it is here so
    // the chrome is demonstrable without pulling an engine into the design system.
    try { document.execCommand(t.cmd, false, arg); } catch (e) {}
    syncActive();
    onChange && onChange(el.innerHTML);
  };

  /* Held in STATE, not read from the DOM during render. A render-phase
     `ref.current.textContent` is "" on the first render and only refreshes when
     something else re-renders the component — so with an uncontrolled editor
     (no `value` prop) the counter never moved off 0 and `over` never fired. */
  const [len, setLen] = React.useState(0);
  const syncLen = () => setLen(((ref.current && ref.current.textContent) || "").length);
  React.useEffect(syncLen, [value]);
  const over = maxLength != null && len > maxLength;

  return (
    <div className={cx("lw-editor", className)} {...rest}>
      {/* role="group", not "toolbar": a toolbar obliges left/right arrow roving
          with a single tab stop, and these are ten independent tab stops. Claiming
          the role without the behaviour is worse than not claiming it. */}
      <div className="lw-editor-bar" role="group" aria-label={(label || "Editor") + " formatting"} aria-controls={children ? undefined : bodyId}>
        {list.map((t, i) => t.sep ? <span key={"s" + i} className="sep" aria-hidden="true" />
          : (
            <button key={t.id} type="button" className="lw-icon-btn" aria-label={t.label} title={t.label}
              aria-pressed={!!active[t.id]} disabled={readOnly}
              onMouseDown={(e) => e.preventDefault()} onClick={() => run(t)}>
              {t.glyph
                ? <span className="lw-editor-glyph" data-glyph={t.id}>{t.glyph}</span>
                : <Icon name={t.icon} size={15} />}
            </button>
          ))}
      </div>
      {children || (
        <div ref={setBodyRef} id={bodyId} className="lw-editor-body" contentEditable={!readOnly} suppressContentEditableWarning
          role="textbox" aria-multiline="true" aria-label={label} data-placeholder={placeholder}
          onInput={() => { syncLen(); onChange && onChange(ref.current.innerHTML); }}
          onKeyUp={syncActive} onMouseUp={syncActive} />
      )}
      {(footer || maxLength != null) && (
        <div className="lw-editor-foot">
          {footer}
          <span className="lw-editor-spacer" />
          {maxLength != null && (
            <span className="lw-editor-count" data-over={over ? "true" : undefined} aria-live="polite">
              {len} / {maxLength}
            </span>
          )}
        </div>
      )}
    </div>
  );
});
