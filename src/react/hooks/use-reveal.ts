import { useEffect } from 'react';

/* =============================================================================
   useReveal — IntersectionObserver reveal driver (ported from the site's
   src/components/reveal.ts, made selector-configurable).

   THE CONTRACT (load-bearing — do not change without reading the site's
   a11y notes):
     • `.lw-reveal` elements are VISIBLE by default. CSS only hides them once
       <html> carries `lw-reveal-ready`, so SSR output is never stuck invisible
       if JS never runs.
     • `lw-reveal-ready` lands on <html> after hydration from inside the first
       IntersectionObserver callback — AFTER above-the-fold elements are marked
       `.in`. Flip it any earlier and the CSS hides the hero for a frame.
     • Every `.lw-reveal` ends up with `.in` within `fallbackMs` regardless, so a
       broken/absent observer can never leave content permanently hidden.
   ============================================================================= */

export type UseRevealOptions = {
  /** Selector for reveal targets. Default `.lw-reveal:not(.in)`. */
  selector?: string;
  /** Dependency that re-runs the observer (e.g. a pathname or data array). */
  dep?: unknown;
  /** Safety-net timeout (ms) that force-shows any unrevealed target. Default 1500. */
  fallbackMs?: number;
  /** rootMargin for the observer. Default `0px 0px -10% 0px`. */
  rootMargin?: string;
  /** threshold for the observer. Default 0.05. */
  threshold?: number;
};

export function useReveal(opts: UseRevealOptions = {}): void {
  const {
    selector = '.lw-reveal:not(.in)',
    dep,
    fallbackMs = 1500,
    rootMargin = '0px 0px -10% 0px',
    threshold = 0.05,
  } = opts;

  useEffect(() => {
    const root = document.documentElement;
    const markReady = () => root.classList.add('lw-reveal-ready');

    const els = document.querySelectorAll<HTMLElement>(selector);

    // Nothing to observe (admin screen, a page whose reveals have all fired):
    // the observer would never call back, and anything waiting on
    // `lw-reveal-ready` would wait forever. Mark ready immediately.
    if (els.length === 0) {
      markReady();
      return;
    }

    // No IntersectionObserver (old browser, SSR): show everything, mark ready.
    if (typeof IntersectionObserver === 'undefined') {
      for (const el of els) el.classList.add('in');
      markReady();
      return;
    }

    const io = new IntersectionObserver(
      (entries, observer) => {
        for (const e of entries) {
          if (!e.isIntersecting) continue;
          e.target.classList.add('in');
          observer.unobserve(e.target);
        }
        // First callback carries every observed element, so by here the visible
        // ones are already `.in` and it is safe to let the CSS hide the rest.
        markReady();
      },
      { rootMargin, threshold },
    );
    for (const el of els) io.observe(el);

    // Belt and braces: anything not reported on within fallbackMs — an element
    // in a container that never scrolls, an observer that silently never fires —
    // is shown anyway. Content is never sacrificed to an animation.
    const timer = setTimeout(() => {
      for (const el of document.querySelectorAll<HTMLElement>('.lw-reveal:not(.in)')) {
        el.classList.add('in');
      }
      markReady();
    }, fallbackMs);

    return () => {
      io.disconnect();
      clearTimeout(timer);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dep, selector, rootMargin, threshold, fallbackMs]);
}
