/**
 * One-time deprecation notices — internal, not exported from the barrel.
 *
 * Deduped by `component + prop`, NOT by call site: a deprecated column prop is
 * read once per column per render, so a naive warn produces one line per row per
 * frame. A warning that floods the console is read as noise and scrolled past,
 * which is strictly worse than no warning at all — the console is where the
 * migration instruction has to survive long enough to be acted on.
 *
 * Silent in production for the same reason React's own warnings are: the message
 * is for the person who can change the call site.
 */
const seen = new Set();

export function deprecate(component, prop, message) {
  const id = component + "#" + prop;
  if (seen.has(id)) return;
  seen.add(id);
  if (typeof process !== "undefined" && process.env && process.env.NODE_ENV === "production") return;
  if (typeof console === "undefined" || !console.warn) return;
  console.warn("[@leanwise/design] " + component + ": " + message);
}

/* Test seam. Not exported from react.js — the barrel is the public surface. */
export function __resetDeprecations() { seen.clear(); }
