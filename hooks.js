/**
 * Runtime hooks — @leanwise/design/hooks
 *
 * Every hook here exists because the same 20 lines were being rewritten per app
 * with a different bug each time. They are all SSR-safe (no window at module
 * scope, no state read during render) and all honour prefers-reduced-motion by
 * completing instantly rather than by doing nothing — a reader who prefers less
 * motion still needs to see the final state.
 */
import { useState, useEffect, useRef, useCallback } from "react";

const canDOM = () => typeof window !== "undefined";
const prefersReduced = () => canDOM() && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/* ---- theme ---------------------------------------------------------------- */

const THEME_KEY = "lw-theme"; /* the key ThemeToggle already writes — the hook
                                 and the component must never disagree */
const read = () => { try { return localStorage.getItem(THEME_KEY) || "system"; } catch (e) { return "system"; } };
const systemDark = () => canDOM() && window.matchMedia("(prefers-color-scheme: dark)").matches;

function paint(mode) {
  const dark = mode === "dark" || (mode === "system" && systemDark());
  const el = document.documentElement;
  el.classList.toggle("dark", dark);
  el.setAttribute("data-theme", dark ? "dark" : "light");
  return dark;
}

/**
 * Three states, not two: light / dark / system. Returns the user's CHOICE and
 * the RESOLVED scheme separately, because a component that needs to pick a tier
 * (brandVars) wants the resolved one while the picker UI wants the choice.
 *
 *   const { mode, resolved, setMode } = useTheme();
 */
export function useTheme() {
  const [mode, setMode] = useState("system");
  const [resolved, setResolved] = useState("light");

  /* Mount, not render: the server has no localStorage and guessing here is what
     produces the one-frame flash of the wrong theme. */
  useEffect(() => { const m = read(); setMode(m); setResolved(paint(m) ? "dark" : "light"); }, []);

  /* While the choice is "system", the OS is still in charge. */
  useEffect(() => {
    if (mode !== "system" || !canDOM()) return;
    const mq = window.matchMedia("(prefers-color-scheme: dark)");
    const on = () => setResolved(paint("system") ? "dark" : "light");
    mq.addEventListener("change", on);
    return () => mq.removeEventListener("change", on);
  }, [mode]);

  const choose = useCallback((m) => {
    setMode(m);
    try { localStorage.setItem(THEME_KEY, m); } catch (e) {}
    setResolved(paint(m) ? "dark" : "light");
  }, []);

  return { mode, resolved, setMode: choose, isDark: resolved === "dark" };
}

/* ---- reveal --------------------------------------------------------------- */

/**
 * One-shot enter reveal. Returns a ref and a boolean; you own the CSS.
 * Unobserves on first hit — a reveal that re-fires on scroll-up is a distraction,
 * not an animation. Under reduced motion it reports true immediately.
 *
 *   const [ref, shown] = useReveal();
 *   <div ref={ref} data-shown={shown} />
 */
export function useReveal({ threshold = 0.15, rootMargin = "0px 0px -10% 0px" } = {}) {
  const ref = useRef(null);
  const [shown, setShown] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (prefersReduced() || typeof IntersectionObserver === "undefined") { setShown(true); return; }
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setShown(true); io.unobserve(el); }
    }, { threshold, rootMargin });
    io.observe(el);
    return () => io.disconnect();
  }, [threshold, rootMargin]);
  return [ref, shown];
}

/* ---- spotlight ------------------------------------------------------------ */

/**
 * Writes --lw-mx / --lw-my (0-100%) on the element so CSS can place a
 * pointer-following highlight. Coordinates go to the DOM, not to React state:
 * a setState per mousemove re-renders the subtree 60 times a second.
 * Off entirely on a coarse pointer and under reduced motion.
 */
export function useSpotlight() {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el || prefersReduced()) return;
    if (window.matchMedia("(pointer: coarse)").matches) return;
    let frame = 0;
    const on = (e) => {
      if (frame) return;
      frame = requestAnimationFrame(() => {
        frame = 0;
        const r = el.getBoundingClientRect();
        el.style.setProperty("--lw-mx", ((e.clientX - r.left) / r.width * 100).toFixed(2) + "%");
        el.style.setProperty("--lw-my", ((e.clientY - r.top) / r.height * 100).toFixed(2) + "%");
      });
    };
    const off = () => { el.style.removeProperty("--lw-mx"); el.style.removeProperty("--lw-my"); };
    el.addEventListener("pointermove", on);
    el.addEventListener("pointerleave", off);
    return () => { cancelAnimationFrame(frame); el.removeEventListener("pointermove", on); el.removeEventListener("pointerleave", off); };
  }, []);
  return ref;
}

/* ---- cascade -------------------------------------------------------------- */

/**
 * Stagger delays for a list — deterministic, so the third card's delay is the
 * same on every render and in every screenshot test. Returns a function, not an
 * array, so the list length can change without re-running a hook.
 *
 *   const delay = useDeterministicCascade({ step: 60, max: 8 });
 *   items.map((it, i) => <Card style={{ transitionDelay: delay(i) }} />)
 */
export function useDeterministicCascade({ step = 60, max = 8, base = 0 } = {}) {
  const reduced = useReducedMotion();
  return useCallback((i) => (reduced ? "0ms" : `${base + Math.min(i, max) * step}ms`), [step, max, base, reduced]);
}

/** Live prefers-reduced-motion. Re-renders when the OS setting changes. */
export function useReducedMotion() {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    if (!canDOM()) return;
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);
    const on = () => setReduced(mq.matches);
    mq.addEventListener("change", on);
    return () => mq.removeEventListener("change", on);
  }, []);
  return reduced;
}

/* ---- counter -------------------------------------------------------------- */

/**
 * Counts a KPI up to its value. NOT a hook — call it on an element, imperatively,
 * from a reveal. Writes textContent directly for the same reason as useSpotlight.
 * Under reduced motion it sets the final number and returns.
 *
 *   animateCounter(el, 1284, { format: (n) => n.toLocaleString() })
 *
 * Returns a cancel function.
 */
export function animateCounter(el, to, { from = 0, duration = 900, decimals = 0, format } = {}) {
  if (!el) return () => {};
  const fmt = format || ((n) => n.toFixed(decimals));
  if (prefersReduced()) { el.textContent = fmt(to); return () => {}; }
  /* The house curve, matched to --lw-ease-out so a counter and the card it sits
     in settle together. */
  const ease = (t) => 1 - (1 - t) ** 3;
  const t0 = performance.now();
  let raf = 0, done = false;
  const tick = (now) => {
    const t = Math.min(1, (now - t0) / duration);
    el.textContent = fmt(from + (to - from) * ease(t));
    if (t < 1) raf = requestAnimationFrame(tick); else done = true;
  };
  raf = requestAnimationFrame(tick);
  return () => { if (!done) { cancelAnimationFrame(raf); el.textContent = fmt(to); } };
}
