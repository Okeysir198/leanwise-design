"use client";
import * as React from "react";
import { Icon } from "../primitives/Icon.jsx";
const cx = (...a) => a.filter(Boolean).join(" ");

/**
 * A password field that can be read back, and that says when Caps Lock is on.
 *
 * ═══════════════════════════════════════════════════════════════════════════
 * WHY THIS IS A COMPONENT AND NOT A RECIPE
 * ═══════════════════════════════════════════════════════════════════════════
 *
 * `templates/auth/Auth.dc.html` has drawn this since the auth template landed —
 * an `InputGroup`, a `.lw-icon-btn` suffix, an `eye`/`eye-off` swap. A drawing
 * is not something a consumer can import, so the one product that needed it
 * shipped a password field with no reveal at all, on a phone, for people
 * entering a password in a factory with gloves on. That is the exact failure
 * `AppBar` was created to stop: "five templates hand-wrote this row and two of
 * them got the flex wrong."
 *
 * ⚠️ THE INPUT IS RAW, NOT `Input`. `.lw-input-group > input` strips the border
 * and the ring so the GROUP can own them (base.css) — an `Input` inside would
 * bring `.lw-input`'s own border back and paint a rectangle inside a rectangle.
 * The template found this first; it is repeated here so nobody "fixes" it.
 *
 * ⚠️ THE REVEAL IS A TOGGLE, NOT A PEEK. `aria-pressed` and a label that names
 * the CURRENT state, because a control whose label describes what it will do
 * next reads as a label to a screen-reader user and they cannot tell whether
 * the password is currently visible — which is the one thing they need to know
 * before someone walks past.
 *
 * ⚠️ CAPS LOCK IS CHECKED ON EVERY KEY, and only while focused. It is the
 * single commonest cause of "the password is right and it says it is wrong",
 * and it is invisible on a phone keyboard and on most external keyboards. The
 * warning is a live region so it is announced when it appears, not only found.
 */
export const PasswordInput = React.forwardRef(function PasswordInput(
  {
    size,
    invalid,
    revealLabel = "Show password",
    hideLabel = "Hide password",
    capsLockLabel = "Caps Lock is on",
    onCapsLockChange,
    className,
    ...rest
  },
  ref,
) {
  const [revealed, setRevealed] = React.useState(false);
  const [caps, setCaps] = React.useState(false);

  const readCaps = (e) => {
    /* `getModifierState` is absent on touch keyboards and on synthetic events
       from a password manager — absent is not "off", so leave the last known
       state alone rather than flickering the warning away. */
    if (typeof e.getModifierState !== "function") return;
    const on = e.getModifierState("CapsLock");
    setCaps(on);
    onCapsLockChange?.(on);
  };

  return (
    <div className={cx("lw-pw", className)}>
      <div
        className={cx(
          "lw-input-group",
          size === "sm" && "lw-input-group-sm",
          size === "lg" && "lw-input-group-lg",
        )}
      >
        <input
          ref={ref}
          type={revealed ? "text" : "password"}
          aria-invalid={invalid ? "true" : undefined}
          onKeyUp={readCaps}
          onKeyDown={readCaps}
          onBlur={() => setCaps(false)}
          {...rest}
        />
        <button
          type="button"
          className="lw-icon-btn lw-hit"
          aria-pressed={revealed}
          aria-label={revealed ? hideLabel : revealLabel}
          title={revealed ? hideLabel : revealLabel}
          onClick={() => setRevealed((v) => !v)}
          data-testid="password-reveal"
        >
          <Icon name={revealed ? "eye-off" : "eye"} size={16} />
        </button>
      </div>
      {/* Always mounted, so the region exists before it has anything to say —
          a live region created at the same moment as its first message is
          routinely not announced at all. */}
      <p className="lw-help lw-pw-caps" role="status" data-on={caps ? "true" : undefined}>
        {caps ? capsLockLabel : ""}
      </p>
    </div>
  );
});
