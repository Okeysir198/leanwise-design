"use client";
import { useState, useEffect, useRef, useCallback } from "react";
const canDOM = () => typeof window !== "undefined";
const prefersReduced = () => canDOM() && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const THEME_KEY = "lw-theme";
const read = () => {
  try {
    return localStorage.getItem(THEME_KEY) || "system";
  } catch (e) {
    return "system";
  }
};
const persist = (mode) => {
  try {
    localStorage.setItem(THEME_KEY, mode);
  } catch (e) {
  }
  try {
    document.cookie = THEME_KEY + "=" + mode + "; max-age=31536000; path=/; samesite=lax";
  } catch (e) {
  }
};
const systemDark = () => canDOM() && window.matchMedia("(prefers-color-scheme: dark)").matches;
function paint(mode) {
  const dark = mode === "dark" || mode === "system" && systemDark();
  const el = document.documentElement;
  el.classList.toggle("dark", dark);
  el.setAttribute("data-theme", dark ? "dark" : "light");
  return dark;
}
function useTheme() {
  const [mode, setMode] = useState("system");
  const [resolved, setResolved] = useState("light");
  useEffect(() => {
    const m = read();
    setMode(m);
    setResolved(paint(m) ? "dark" : "light");
  }, []);
  useEffect(() => {
    if (mode !== "system" || !canDOM()) return;
    const mq = window.matchMedia("(prefers-color-scheme: dark)");
    const on = () => setResolved(paint("system") ? "dark" : "light");
    mq.addEventListener("change", on);
    return () => mq.removeEventListener("change", on);
  }, [mode]);
  const choose = useCallback((m) => {
    setMode(m);
    persist(m);
    setResolved(paint(m) ? "dark" : "light");
  }, []);
  return { mode, resolved, setMode: choose, isDark: resolved === "dark" };
}
function useReveal({ threshold = 0.15, rootMargin = "0px 0px -10% 0px" } = {}) {
  const ref = useRef(null);
  const [shown, setShown] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (prefersReduced() || typeof IntersectionObserver === "undefined") {
      setShown(true);
      return;
    }
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) {
        setShown(true);
        io.unobserve(el);
      }
    }, { threshold, rootMargin });
    io.observe(el);
    return () => io.disconnect();
  }, [threshold, rootMargin]);
  return [ref, shown];
}
function useSpotlight() {
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
    const off = () => {
      el.style.removeProperty("--lw-mx");
      el.style.removeProperty("--lw-my");
    };
    el.addEventListener("pointermove", on);
    el.addEventListener("pointerleave", off);
    return () => {
      cancelAnimationFrame(frame);
      el.removeEventListener("pointermove", on);
      el.removeEventListener("pointerleave", off);
    };
  }, []);
  return ref;
}
function useDeterministicCascade({ step = 60, max = 8, base = 0 } = {}) {
  const reduced = useReducedMotion();
  return useCallback((i) => reduced ? "0ms" : `${base + Math.min(i, max) * step}ms`, [step, max, base, reduced]);
}
function useReducedMotion() {
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
function animateCounter(el, to, { from = 0, duration = 900, decimals = 0, format } = {}) {
  if (!el) return () => {
  };
  const fmt = format || ((n) => n.toFixed(decimals));
  if (prefersReduced()) {
    el.textContent = fmt(to);
    return () => {
    };
  }
  const ease = (t) => 1 - (1 - t) ** 3;
  const t0 = performance.now();
  let raf = 0, done = false;
  const tick = (now) => {
    const t = Math.min(1, (now - t0) / duration);
    el.textContent = fmt(from + (to - from) * ease(t));
    if (t < 1) raf = requestAnimationFrame(tick);
    else done = true;
  };
  raf = requestAnimationFrame(tick);
  return () => {
    if (!done) {
      cancelAnimationFrame(raf);
      el.textContent = fmt(to);
    }
  };
}
export {
  THEME_KEY,
  animateCounter,
  paint,
  persist,
  useDeterministicCascade,
  useReducedMotion,
  useReveal,
  useSpotlight,
  useTheme
};
