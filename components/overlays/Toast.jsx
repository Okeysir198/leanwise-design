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
    /* No role here. The enclosing ToastRegion is the live region; a role="status"
       or role="alert" INSIDE it nests two, which is why an announcement could
       come twice or not at all. An error toast raises the REGION's urgency
       instead — one live region, one politeness setting. */
    <div className={cx("lw-toast", tone !== "info" && tone, className)} {...rest}>
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
export function ToastRegion({ className, children, urgent, ...rest }) {
  return (
    <div className={cx("lw-toast-region", className)} role="region"
      aria-live={urgent ? "assertive" : "polite"} aria-label="Notifications" {...rest}>{children}</div>
  );
}
