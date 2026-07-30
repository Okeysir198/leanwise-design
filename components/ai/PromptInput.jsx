const cx = (...a) => a.filter(Boolean).join(" ");


/**
 * The AI product's primary input. A framed box, not a bare textarea, so the
 * attachment row and the send action live inside the same focus ring.
 *
 * Enter submits, Shift+Enter newlines — the convention users already have.
 *
 * The footer has two modes. Passing `tools`/`action` keeps the standard
 * arrangement (tools left, hint and action right). Passing children replaces
 * the row outright, for the products that need the model picker, scope
 * selector and send button in a specific order — one row, one owner, rather
 * than a slot per control.
 */
export function PromptInput({ value, onChange, onSubmit, placeholder = "Ask anything about your documents…", hint = "⏎ to send · ⇧⏎ newline", label = "Prompt", tools, action, disabled, className, children, ...rest }) {
  const onKeyDown = (e) => {
    // The disabled guard matters more here than on a button: a disabled
    // textarea still receives keydown in some engines, and the send path is a
    // network call, so an unguarded Enter is a duplicate request.
    if (disabled) return;
    if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); onSubmit && onSubmit(); }
  };
  return (
    <div className={cx("lw-prompt", className)} {...rest}>
      <textarea value={value} onChange={e => onChange && onChange(e.target.value)} onKeyDown={onKeyDown}
        placeholder={placeholder} rows={2} disabled={disabled} aria-label={label} />
      <div className="lw-prompt-foot">
        {children || <>
          {tools}
          <span className="spacer" />
          <span className="lw-prompt-hint">{hint}</span>
          {action}
        </>}
      </div>
    </div>
  );
}
