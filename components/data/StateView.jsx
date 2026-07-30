import { Icon } from "../primitives/Icon.jsx";
import { Skeleton } from "../primitives/Skeleton.jsx";
const cx = (...a) => a.filter(Boolean).join(" ");

/* Five states, one set. Shipping only the empty one is how the other four get
   invented per product, each with its own tone and its own idea of whether
   there is an action. The defaults below are the house answers. */
const PRESETS = {
  empty:   { icon: "inbox",    title: "Nothing here yet" },
  loading: { icon: null,       title: "Loading…" },
  error:   { icon: "x-circle", title: "Something went wrong", description: "The request failed. Nothing was changed.", actionLabel: "Try again" },
  offline: { icon: "webhook",  title: "You are offline", description: "Reconnect to load this. Anything you have typed is kept.", actionLabel: "Retry" },
  denied:  { icon: "lock",     title: "You do not have access", description: "Ask a workspace admin for permission to view this." },
};

/**
 * Empty, loading, error, offline and no-permission — one component, because
 * they are one set, and a product that ships only `empty` invents the other
 * four screen by screen.
 *
 * Exactly one action, like `EmptyState`: a dead end with three buttons is a
 * dead end with three ways to guess.
 *
 * `error` and `offline` are announced with `role="alert"`; `loading` uses
 * `role="status"` and `aria-busy` — an interruption and a progress report are
 * not the same announcement.
 */
export function StateView({ variant = "empty", icon, title, description, action, actionLabel, onAction, lines = 3, className, children, ...rest }) {
  const p = PRESETS[variant] || PRESETS.empty;
  if (variant === "loading") {
    return (
      <div className={cx("lw-state", className)} data-variant="loading" role="status" aria-busy="true" {...rest}>
        <span className="lw-sr-only">{title || p.title}</span>
        <Skeleton lines={lines} />
      </div>
    );
  }
  const isAlert = variant === "error" || variant === "offline";
  const label = actionLabel || p.actionLabel;
  return (
    <div className={cx("lw-state", className)} data-variant={variant}
      role={isAlert ? "alert" : undefined} {...rest}>
      {(icon || p.icon) && <span className="lw-state-ic"><Icon name={icon || p.icon} size={20} /></span>}
      <span className="lw-state-title">{title || p.title}</span>
      {(description || p.description) && <p className="lw-state-desc">{description || p.description}</p>}
      {children}
      {(action || (label && onAction)) && (
        <div className="lw-state-actions">
          {action || <button type="button" className="lw-btn lw-btn-sm" onClick={onAction}>{label}</button>}
        </div>
      )}
    </div>
  );
}
