import { useCallback, useEffect, useSyncExternalStore } from 'react';

/* =============================================================================
   useTheme — light / dark / system theme controller.

   Three-layer model that matches the foundation's tokens.css:
     • `light`  → sets document.documentElement.dataset.theme = "light"
     • `dark`   → sets document.documentElement.dataset.theme = "dark"
     • `system` → sets dataset.theme = "system" and lets the CSS media query
                  (prefers-color-scheme: dark) resolve it. The `:not([data-theme="light"])`
                  guard in tokens.css is what makes `system` follow the OS.

   Persists to localStorage["lw-theme"]. SSR-safe: every access is guarded; on
   the server the store reports `system` / resolved `light` and writes nothing.

   Vanilla-DOM by design — no React context, no router coupling — so it is
   portable across any React app (marketing site, VSS, rag-service).
   ============================================================================= */

export type Theme = 'light' | 'dark' | 'system';
export type ResolvedTheme = 'light' | 'dark';

const STORAGE_KEY = 'lw-theme';
const ATTR = 'theme'; // document.documentElement.dataset.theme

function isValidTheme(v: unknown): v is Theme {
  return v === 'light' || v === 'dark' || v === 'system';
}

/* ---- a tiny external store so every useTheme() subscriber stays in sync ---- */

type State = { theme: Theme; resolved: ResolvedTheme };

/* SSR-safe default. We deliberately do NOT read the DOM/localStorage here: the server
   snapshot and the client's FIRST render must agree (both 'light'), or React aborts
   hydration — and a failed hydration leaves every JS handler on the page unattached
   (form submit, CTA navigation, …). The real stored value is read in the mount effect
   below and the store re-emits; the toggle's active indicator may correct by one frame,
   invisible against the blocking head script that already painted the right <html data-theme>. */
const SSR_DEFAULT: State = { theme: 'light', resolved: 'light' };
let currentState: State = SSR_DEFAULT;
const listeners = new Set<() => void>();

function readStoredTheme(): Theme {
  /* localStorage is the source of the user's CHOICE (incl. 'system'); <html data-theme>
     is the resolved concrete value, so it is not consulted here. */
  if (typeof localStorage !== 'undefined') {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (isValidTheme(stored)) return stored;
    } catch {
      /* private mode / disabled storage */
    }
  }
  return 'system';
}

function systemResolved(): ResolvedTheme {
  if (
    typeof window !== 'undefined' &&
    typeof window.matchMedia === 'function' &&
    window.matchMedia('(prefers-color-scheme: dark)').matches
  ) {
    return 'dark';
  }
  return 'light';
}

function resolveTheme(theme: Theme): ResolvedTheme {
  return theme === 'system' ? systemResolved() : theme;
}

function setState(next: State) {
  currentState = next;
  for (const fn of listeners) fn();
}

function subscribe(cb: () => void): () => void {
  listeners.add(cb);
  return () => listeners.delete(cb);
}

function applyToDom(theme: Theme) {
  if (typeof document === 'undefined') return;
  document.documentElement.dataset[ATTR] = theme;
}

/**
 * Persist the choice to BOTH stores. `localStorage` is what `useTheme` re-reads; the
 * `lw-theme` cookie is what the server reads on the NEXT full load (the site's SSR
 * resolves `<html data-theme>` from it). Writing both means a reload right after a toggle
 * is SSR-correct with no reliance on the blocking head script — no flash, no one-frame fixup.
 */
function persist(theme: Theme) {
  if (typeof localStorage !== 'undefined') {
    try {
      localStorage.setItem(STORAGE_KEY, theme);
    } catch {
      /* private mode / disabled storage — the DOM attribute still applies */
    }
  }
  if (typeof document !== 'undefined') {
    document.cookie = `${STORAGE_KEY}=${theme}; max-age=31536000; path=/; samesite=lax`;
  }
}

/** Track OS-level preference changes (only relevant while theme === 'system'). */
if (typeof window !== 'undefined' && typeof window.matchMedia === 'function') {
  const mql = window.matchMedia('(prefers-color-scheme: dark)');
  const onSys = () => {
    if (currentState.theme === 'system') {
      setState({ theme: 'system', resolved: systemResolved() });
    }
  };
  // addEventListener is the standard path; addListener is the legacy Safari fallback.
  if (typeof mql.addEventListener === 'function') mql.addEventListener('change', onSys);
  else if (typeof mql.addListener === 'function') mql.addListener(onSys);
}

export type UseThemeResult = {
  /** The user's stored preference. */
  theme: Theme;
  /** The actual applied theme (system → light/dark resolved). */
  resolvedTheme: ResolvedTheme;
  /** True when the stored preference is `system`. */
  isSystem: boolean;
  /** Set and persist a new preference. */
  setTheme: (theme: Theme) => void;
  /** Convenience: cycle system → light → dark → system. */
  toggle: () => void;
};

export function useTheme(): UseThemeResult {
  const snapshot = useSyncExternalStore(
    subscribe,
    () => currentState, // client snapshot
    () => currentState, // server snapshot (the initial 'system'/light guess)
  );

  // On mount, reconcile to the REAL stored theme (the SSR default was a hydration
  // placeholder). This runs once after hydration, so the DOM read is safe.
  useEffect(() => {
    const theme = readStoredTheme();
    applyToDom(theme);
    setState({ theme, resolved: resolveTheme(theme) });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const setTheme = useCallback((theme: Theme) => {
    applyToDom(theme);
    persist(theme);
    setState({ theme, resolved: resolveTheme(theme) });
  }, []);

  const toggle = useCallback(() => {
    const order: Theme[] = ['system', 'light', 'dark'];
    const i = order.indexOf(snapshot.theme);
    setTheme(order[(i + 1) % order.length]);
  }, [snapshot.theme, setTheme]);

  return {
    theme: snapshot.theme,
    resolvedTheme: snapshot.resolved,
    isSystem: snapshot.theme === 'system',
    setTheme,
    toggle,
  };
}
