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

/**
 * The same one-per-`component#topic` discipline for a notice that is not a
 * deprecation: a prop this component cannot do its job without. Split out
 * rather than reached for through `deprecate()`, because a message that says
 * "deprecated" about a prop that never existed sends the reader looking for a
 * migration guide.
 */
export function warnOnce(component, topic, message) {
  const id = component + "#" + topic;
  if (seen.has(id)) return;
  seen.add(id);
  if (typeof process !== "undefined" && process.env && process.env.NODE_ENV === "production") return;
  if (typeof console === "undefined" || !console.warn) return;
  console.warn("[@leanwise/design] " + component + ": " + message);
}

export function deprecate(component, prop, message) {
  warnOnce(component, prop, message);
}

/* Test seam. Not exported from react.js — the barrel is the public surface. */
export function __resetDeprecations() { seen.clear(); }
