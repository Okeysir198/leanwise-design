import { Icon } from "../primitives/Icon.jsx";

const cx = (...a) => a.filter(Boolean).join(" ");


/** Status by tint AND a mono label — never tint alone. The region is a live
 *  region so an announcement is not silent for a screen reader.
 *
 *  Pass `onClose` for a dismiss control. It is opt-in: an auto-dismissing toast
 *  that also carries an X invites the user to race the timer. */
export function Toast({ tone = "info", label, onClose, children, className, ...rest }) {
  const k = label || (tone === "ok" ? "done" : tone === "warn" ? "warn" : tone === "err" ? "error" : "info");
  return (
    <div className={cx("lw-toast", tone !== "info" && tone, className)} role={tone === "err" ? "alert" : "status"} {...rest}>
      <span className="k">{k}</span>
      <span className="msg">{children}</span>
      {onClose && (
        <button type="button" className="lw-icon-btn" aria-label="Dismiss" title="Dismiss" onClick={onClose}>
          <Icon name="close" size={15} />
        </button>
      )}
    </div>
  );
}
export function ToastRegion({ className, children, ...rest }) {
  return <div className={cx("lw-toast-region", className)} role="region" aria-live="polite" aria-label="Notifications" {...rest}>{children}</div>;
}
