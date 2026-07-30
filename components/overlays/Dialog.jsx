import * as React from "react";
import { Icon } from "../primitives/Icon.jsx";
const cx = (...a) => a.filter(Boolean).join(" ");


/**
 * The native <dialog>. Focus trap, Esc-to-close and background inertness are
 * the platform's job here rather than 200 lines of ours — and the platform's
 * version is the one screen readers already understand.
 */
export function Dialog({ open, onClose, title, description, footer, width, className, children, ...rest }) {
  const ref = React.useRef(null);
  // Ids are generated, not literal. Two dialogs in one document with the same
  // hardcoded id give every one of them the FIRST dialog's title as its name.
  const uid = React.useId();
  const titleId = title ? uid + "-t" : undefined;
  const descId = description ? uid + "-d" : undefined;
  // A bare number OR a numeric string means px. HTML has no numbers — an
  // attribute always arrives as text — and a unitless length makes the width
  // declaration invalid, which silently drops it and shrink-wraps the dialog.
  const w = width == null || width === "" ? null
    : /^\d+(\.\d+)?$/.test(String(width)) ? String(width) + "px" : String(width);
  React.useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (open && !el.open) el.showModal();
    if (!open && el.open) el.close();
  }, [open]);
  return (
    <dialog ref={ref} className={cx("lw-dialog", className)}
      style={w ? { "--lw-dialog-w": w } : undefined}
      onClose={onClose} onCancel={onClose} aria-labelledby={titleId} aria-describedby={descId} {...rest}>
      {title && (
        <div className="lw-dialog-head">
          <h2 className="lw-dialog-title" id={titleId}>{title}</h2>
          <button type="button" className="lw-dialog-close" aria-label="Close" title="Close" onClick={onClose}>
            <Icon name="close" size={17} />
          </button>
        </div>
      )}
      <div className="lw-dialog-body">{description && <div id={descId}>{description}</div>}{children}</div>
      {footer && <div className="lw-dialog-foot">{footer}</div>}
    </dialog>
  );
}
