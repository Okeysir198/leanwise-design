"use client";
import * as React from "react";
const cx = (...a) => a.filter(Boolean).join(" ");

/**
 * A one-time code, as one field.
 *
 * ═══════════════════════════════════════════════════════════════════════════
 * ONE INPUT, NOT SIX BOXES — and that is the design, not a shortcut
 * ═══════════════════════════════════════════════════════════════════════════
 *
 * Per-digit boxes look like the picture everyone has of this control and they
 * are worse at the job. Six inputs are six tab stops; a screen reader announces
 * six unlabelled fields; `autoComplete="one-time-code"` — the thing that makes
 * iOS and Android offer the code from the SMS or the authenticator — fills the
 * FIRST box only, so the platform's own affordance breaks on the control built
 * to look most like it. Paste of "123 456" lands in one box. Backspace across a
 * boundary is a custom keyboard implementation every team writes differently.
 *
 * So: one input, `inputMode="numeric"`, `autoComplete="one-time-code"`,
 * `maxLength`, and the SEGMENTED LOOK done with letter-spacing. The user sees
 * spaced digits; the platform sees the single field it knows how to fill.
 *
 * ⚠️ IT STRIPS NON-DIGITS AS YOU TYPE, including the space in "123 456", which
 * is how every authenticator app renders a code and therefore how it arrives on
 * the clipboard. Refusing that paste is refusing the commonest way the code is
 * entered.
 *
 * ⚠️ `onComplete` FIRES ONCE PER COMPLETE CODE. A six-digit field that submits
 * itself is right — the user has nothing left to decide — but firing on every
 * render while the value stays complete would re-submit on a re-render, and
 * re-submitting a one-time code is how a valid code becomes a "replayed" error.
 */
export const OtpInput = React.forwardRef(function OtpInput(
  { length = 6, value, defaultValue = "", onChange, onComplete, invalid, className, ...rest },
  ref,
) {
  const [internal, setInternal] = React.useState(defaultValue);
  const isControlled = value != null;
  const code = isControlled ? value : internal;
  const fired = React.useRef(null);

  const set = (next) => {
    const digits = String(next).replace(/\D+/g, "").slice(0, length);
    if (!isControlled) setInternal(digits);
    onChange?.(digits);
    if (digits.length === length) {
      if (fired.current !== digits) {
        fired.current = digits;
        onComplete?.(digits);
      }
    } else {
      /* Cleared on any incomplete value, so correcting a digit and retyping the
         same code fires again — otherwise a user who fixes a typo back to the
         original sits on a dead field. */
      fired.current = null;
    }
  };

  return (
    <input
      ref={ref}
      className={cx("lw-otp", className)}
      type="text"
      inputMode="numeric"
      autoComplete="one-time-code"
      autoCapitalize="off"
      autoCorrect="off"
      spellCheck={false}
      maxLength={length}
      value={code}
      aria-invalid={invalid ? "true" : undefined}
      onChange={(e) => set(e.target.value)}
      {...rest}
    />
  );
});
