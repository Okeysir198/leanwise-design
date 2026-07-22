/**
 * animateCounter — count-up animation for `.lw-counter` stats.
 *
 * The contract (SSR-first, JS-optional):
 *   - Markup ships the FINAL value as text, plus `data-target` with the number:
 *       <span class="lw-counter" data-target="98.4">98.4</span>
 *     Without JS (or under reduced motion) the correct value is already there.
 *   - Calling animateCounter(el) rewinds to 0 and counts up to data-target.
 *     It is a no-op when prefers-reduced-motion is set or data-target is absent.
 *
 * Dependency-free. Formatting: decimals are preserved from data-target;
 * pass { format } to override (e.g. thousands separators).
 */
export function animateCounter(el, opts = {}) {
  const { duration = 1200, format } = opts;
  const raw = el.getAttribute("data-target");
  const target = raw == null ? NaN : parseFloat(raw);
  if (!isFinite(target)) return;
  if (
    typeof matchMedia === "function" &&
    matchMedia("(prefers-reduced-motion: reduce)").matches
  ) {
    return; // final value is already in the markup — leave it
  }
  const decimals = raw.includes(".") ? raw.split(".")[1].length : 0;
  const fmt = format || ((n) => n.toFixed(decimals));
  const final = el.textContent; // preserve any author formatting for the end state
  const ease = (t) => 1 - Math.pow(1 - t, 3); // ease-out cubic
  const start = performance.now();
  const tick = (now) => {
    const t = Math.min((now - start) / duration, 1);
    if (t < 1) {
      el.textContent = fmt(target * ease(t));
      requestAnimationFrame(tick);
    } else {
      el.textContent = final; // restore the exact SSR'd string
    }
  };
  el.textContent = fmt(0);
  requestAnimationFrame(tick);
}
