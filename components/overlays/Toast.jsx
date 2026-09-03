import { Icon } from "../primitives/Icon.jsx";
import { normTone, normToneMap } from "../_tone.js";

const cx = (...a) => a.filter(Boolean).join(" ");


/** Status by tint AND a mono label — never tint alone. The region is a live
 *  region so an announcement is not silent for a screen reader.
 *
 *  Pass `onClose` for a dismiss control. It is opt-in: an auto-dismissing toast
 *  that also carries an X invites the user to race the timer. */
export function Toast({
  tone: toneIn = "info", label, onClose,
  toneLabels: toneLabelsIn = { success: "done", warning: "warn", danger: "error", info: "info" },
  dismissLabel = "Dismiss",
  children, className, ...rest
}) {
  // Both the VALUE and the map KEYS are normalised. Renaming the values without
  // the keys would silently drop a consumer's own status word — which on a
  // Vietnamese product is the entire reason the prop exists.
  const tone = normTone("Toast", toneIn);
  const toneLabels = normToneMap("Toast", toneLabelsIn, "toneLabels key");
  const k = label || toneLabels[tone] || toneLabels.info;
  return (
    /* No role here. The enclosing ToastRegion is the live region; a role="status"
       or role="alert" INSIDE it nests two, which is why an announcement could
       come twice or not at all. An error toast raises the REGION's urgency
       instead — one live region, one politeness setting. */
    <div className={cx("lw-toast", tone !== "info" && tone, className)} {...rest}>
      <span className="k">{k}</span>
      <span className="msg">{children}</span>
      {onClose && (
        <button type="button" className="lw-icon-btn" aria-label={dismissLabel} title={dismissLabel} onClick={onClose}>
          <Icon name="close" size={15} />
        </button>
      )}
    </div>
  );
}
export function ToastRegion({ className, children, urgent, label = "Notifications", ...rest }) {
  return (
    <div className={cx("lw-toast-region", className)} role="region"
      aria-live={urgent ? "assertive" : "polite"} aria-label={label} {...rest}>{children}</div>
  );
}
