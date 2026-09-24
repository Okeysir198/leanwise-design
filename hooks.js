"use client";
/**
 * Runtime hooks — @leanwise/design/hooks. SSR-safe: nothing reads window at
 * module scope or during render.
 */
import { useState, useEffect, useCallback } from "react";

const canDOM = () => typeof window !== "undefined";
const systemDark = () => canDOM() && window.matchMedia("(prefers-color-scheme: dark)").matches;

/** The localStorage key and the cookie name. */
export const THEME_KEY = "lw-theme";

const read = () => {
  try { return localStorage.getItem(THEME_KEY) || "system"; } catch { return "system"; }
};

/* localStorage is for this document; the cookie is what a server reads to emit
   the right class on <html> in the first byte. */
function persist(mode) {
  try { localStorage.setItem(THEME_KEY, mode); } catch { /* storage blocked */ }
  try { document.cookie = `${THEME_KEY}=${mode}; max-age=31536000; path=/; samesite=lax`; } catch { /* no document */ }
}

function apply(mode) {
  const dark = mode === "dark" || (mode === "system" && systemDark());
  document.documentElement.classList.toggle("dark", dark);
  return dark ? "dark" : "light";
}

/**
 * light / dark / system. `mode` is the choice, `resolved` what is painted.
 *
 *   const { mode, resolved, setMode } = useTheme();
 */
export function useTheme() {
  const [mode, setModeState] = useState("system");
  const [resolved, setResolved] = useState("light");

  useEffect(() => {
    const m = read();
    setModeState(m);
    setResolved(apply(m));
  }, []);

  useEffect(() => {
    if (mode !== "system" || !canDOM()) return;
    const mq = window.matchMedia("(prefers-color-scheme: dark)");
    const on = () => setResolved(apply("system"));
    mq.addEventListener("change", on);
    return () => mq.removeEventListener("change", on);
  }, [mode]);

  const setMode = useCallback((m) => {
    setModeState(m);
    persist(m);
    setResolved(apply(m));
  }, []);

  return { mode, resolved, setMode };
}

/** Live prefers-reduced-motion. */
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
