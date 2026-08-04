"use client";
import * as React from "react";
import { Icon } from "../primitives/Icon.jsx";
const cx = (...a) => a.filter(Boolean).join(" ");


/**
 * The sticky announcement strip above the header.
 *
 * The reason it belongs upstream is one CSS rule, not this component:
 * `.lw-announce + .lw-topbar { inset-block-start: var(--lw-announce-h, 36px) }`.
 * A sticky bar under a sticky announcement is what every consumer gets wrong —
 * both claim `inset-block-start: 0`, so the header scrolls up UNDER the strip
 * and eats its first line. The contract can only be stated here because
 * `.lw-topbar` is ours; a consumer hand-rolling the strip cannot reach into the
 * package's header to offset it, so it re-declares the header instead and
 * inherits none of its later fixes. Render this as the immediate SIBLING before
 * `TopBar`, and set `--lw-announce-h` if your strip is taller than 36px.
 *
 * `role="status"` rather than `role="alert"`: an announcement is polite news,
 * and an alert interrupts whatever the reader is doing.
 *
 * Dismissal is UNCONTROLLED by default — pass `onDismiss` and the component
 * hides itself, or drive it yourself by not rendering it. There is no
 * localStorage in here: how long a dismissal lasts is a product decision, and a
 * design system that decides it for you is one you have to work around.
 */
export function AnnounceBar({ children, onDismiss, dismissLabel = "Dismiss announcement", className, ...rest }) {
  const [gone, setGone] = React.useState(false);
  if (gone) return null;
  return (
    <div className={cx("lw-announce", className)} role="status" {...rest}>
      {children}
      {onDismiss && (
        <button type="button" className="lw-icon-btn" aria-label={dismissLabel}
          onClick={() => { setGone(true); onDismiss(); }}>
          <Icon name="close" size={14} />
        </button>
      )}
    </div>
  );
}
