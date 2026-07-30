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
export function RichText({
  value, onChange, placeholder = "Write something…", tools, maxLength,
  label, readOnly, footer, children, className, ...rest
}) {
  const ref = React.useRef(null);
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

  const text = (ref.current && ref.current.textContent) || "";
  const over = maxLength != null && text.length > maxLength;

  return (
    <div className={cx("lw-editor", className)} {...rest}>
      <div className="lw-editor-bar" role="toolbar" aria-label={(label || "Editor") + " formatting"} aria-controls={children ? undefined : bodyId}>
        {list.map((t, i) => t.sep ? <span key={"s" + i} className="sep" aria-hidden="true" />
          : (
            <button key={t.id} type="button" className="lw-icon-btn" aria-label={t.label} title={t.label}
              aria-pressed={!!active[t.id]} disabled={readOnly}
              onMouseDown={(e) => e.preventDefault()} onClick={() => run(t)}>
              {t.glyph
                ? <span style={{ fontWeight: t.id === "bold" ? 700 : 500, fontStyle: t.id === "italic" ? "italic" : undefined, fontSize: 13 }}>{t.glyph}</span>
                : <Icon name={t.icon} size={15} />}
            </button>
          ))}
      </div>
      {children || (
        <div ref={ref} id={bodyId} className="lw-editor-body" contentEditable={!readOnly} suppressContentEditableWarning
          role="textbox" aria-multiline="true" aria-label={label} data-placeholder={placeholder}
          onInput={() => onChange && onChange(ref.current.innerHTML)}
          onKeyUp={syncActive} onMouseUp={syncActive} />
      )}
      {(footer || maxLength != null) && (
        <div className="lw-editor-foot">
          {footer}
          <span style={{ flex: 1 }} />
          {maxLength != null && (
            <span style={{ color: over ? "var(--lw-danger-on)" : undefined }} aria-live="polite">
              {text.length} / {maxLength}
            </span>
          )}
        </div>
      )}
    </div>
  );
}
