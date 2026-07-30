import { Icon } from "../primitives/Icon.jsx";
const cx = (...a) => a.filter(Boolean).join(" ");

/**
 * The side sheet. A drawer is a modal that enters from an edge, not a different
 * kind of thing — so it is the native <dialog> for the same reason Dialog is:
 * the focus trap, Esc and background inertness are the platform's, and the
 * platform's version is the one screen readers already understand.
 *
 * `side="bottom"` is the touch answer to a centred dialog.
 */
export function Drawer({ open, onClose, title, description, footer, side = "end", width, className, children, ...rest }) {
  const ref = React.useRef(null);
  const uid = React.useId();
  const titleId = title ? uid + "-t" : undefined;
  const descId = description ? uid + "-d" : undefined;
  // A unitless length makes the declaration invalid, which drops it silently and
  // shrink-wraps the panel — so a bare number, or a numeric string, means px.
  const w = width == null || width === "" ? null
    : /^\d+(\.\d+)?$/.test(String(width)) ? String(width) + "px" : String(width);
  React.useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (open && !el.open) el.showModal();
    if (!open && el.open) el.close();
  }, [open]);
  return (
    <dialog ref={ref} className={cx("lw-drawer", className)} data-side={side}
      style={w ? { "--lw-drawer-w": w } : undefined}
      onClose={onClose} onCancel={onClose} aria-labelledby={titleId} aria-describedby={descId} {...rest}>
      {title && (
        <div className="lw-drawer-head">
          <h2 className="lw-drawer-title" id={titleId}>{title}</h2>
          <button type="button" className="lw-icon-btn" aria-label="Close" title="Close" onClick={onClose}>
            <Icon name="close" size={17} />
          </button>
        </div>
      )}
      <div className="lw-drawer-body">{description && <div id={descId}>{description}</div>}{children}</div>
      {footer && <div className="lw-drawer-foot">{footer}</div>}
    </dialog>
  );
}
