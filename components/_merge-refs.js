"use client";
import * as React from "react";

/**
 * Attach ONE DOM node to both a local ref and a forwarded ref.
 *
 * WHY NOT `useImperativeHandle(forwardedRef, () => localRef.current, [])`, which
 * is what these controls shipped in v1.2 and what this replaces. That form runs
 * its factory on mount and then never again, so the forwarded ref is bound to
 * whatever node existed at that instant. Re-render the inner element into a
 * different node — a conditional branch, a `key` change, a Popover that unmounts
 * its content — and the form library is left holding a DETACHED node whose
 * `.focus()` silently does nothing. That is precisely the failure `forwardRef`
 * was added to these controls to fix, so the bug hid behind its own fix.
 *
 * It happens not to bite today only because all four inner elements are
 * unconditionally rendered in a stable position. That is a property of the
 * current markup, not of the contract, and nothing was enforcing it.
 *
 * A callback ref has no such window: React calls it with the node on attach and
 * with `null` on detach, every time, so the two refs cannot diverge. It also
 * handles a FUNCTION forwarded ref, which `useImperativeHandle` does too but on
 * the same stale schedule.
 */
export function useMergedRef(localRef, forwardedRef) {
  return React.useCallback(
    (node) => {
      localRef.current = node;
      if (typeof forwardedRef === "function") forwardedRef(node);
      else if (forwardedRef) forwardedRef.current = node;
    },
    [localRef, forwardedRef],
  );
}
