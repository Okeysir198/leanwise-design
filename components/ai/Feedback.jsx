import { Icon } from "../primitives/Icon.jsx";
const cx = (...a) => a.filter(Boolean).join(" ");

/**
 * Thumbs, and a way to say what was wrong. Trivial to build, always retrofitted
 * badly, and it is the thing that makes evals possible later — so it ships now
 * rather than after the model is already in production.
 *
 * A rating with no correction path collects a number nobody can act on, which
 * is why `onComment` exists and why the down state opens it by default.
 */
export function Feedback({ value, onChange, onComment, commentPlaceholder = "What was wrong?", note, className, ...rest }) {
  const [open, setOpen] = React.useState(false);
  const [text, setText] = React.useState("");
  const set = (v) => {
    const next = value === v ? null : v;
    onChange && onChange(next);
    if (next === "down" && onComment) setOpen(true);
  };
  return (
    <div className={cx(className)} {...rest}>
      <div className="lw-feedback">
        <button type="button" className="lw-icon-btn" aria-label="Helpful" aria-pressed={value === "up"} onClick={() => set("up")}>
          <Icon name="thumbs-up" size={15} />
        </button>
        <button type="button" className="lw-icon-btn" aria-label="Not helpful" aria-pressed={value === "down"} onClick={() => set("down")}>
          <Icon name="thumbs-down" size={15} />
        </button>
        {note && <span className="lw-feedback-note">{note}</span>}
      </div>
      {open && onComment && (
        <form style={{ display: "grid", gap: "var(--lw-space-8)", marginTop: "var(--lw-space-8)" }}
          onSubmit={(e) => { e.preventDefault(); onComment(text); setOpen(false); setText(""); }}>
          <textarea className="lw-textarea" rows={2} value={text} autoFocus
            aria-label={commentPlaceholder} placeholder={commentPlaceholder}
            onChange={(e) => setText(e.target.value)} />
          <div style={{ display: "flex", gap: "var(--lw-space-8)", justifyContent: "flex-end" }}>
            <button type="button" className="lw-btn lw-btn-ghost lw-btn-sm" onClick={() => setOpen(false)}>Cancel</button>
            <button type="submit" className="lw-btn lw-btn-sm" disabled={!text.trim()}>Send</button>
          </div>
        </form>
      )}
    </div>
  );
}
