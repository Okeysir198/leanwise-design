import { useEffect } from 'react';

/* =============================================================================
   useSpotlight — cursor spotlight driver for `.lw-spotlight` cards.
   Ported verbatim in spirit from the site's src/components/spotlight.ts.

   The package CSS paints a radial highlight at `--lw-mx`/`--lw-my` (px, relative
   to the card) and only ever shows it on hover-capable, motion-tolerant pointers
   — without JS the card is unchanged, so this is pure progressive enhancement.

   One delegated, rAF-throttled `pointermove` listener on `document` serves every
   card on the page (cards mount/unmount freely across navigations with no
   re-wiring). SSR-safe: everything lives in useEffect.
   ============================================================================= */

export type UseSpotlightOptions = {
  /** Selector for spotlight targets. Default `.lw-spotlight`. */
  selector?: string;
};

export function useSpotlight(opts: UseSpotlightOptions = {}): void {
  const { selector = '.lw-spotlight' } = opts;

  useEffect(() => {
    if (typeof window === 'undefined' || typeof document === 'undefined') return;
    // Touch-only devices never show the spotlight (CSS gates on hover:hover) —
    // skip the listener entirely rather than tracking a pointer that can't hover.
    if (!window.matchMedia('(hover: hover)').matches) return;

    let raf = 0;
    let lastEvent: PointerEvent | null = null;

    const apply = () => {
      raf = 0;
      const e = lastEvent;
      if (!e) return;
      const card = (e.target as Element | null)?.closest?.<HTMLElement>(selector);
      if (!card) return;
      const rect = card.getBoundingClientRect();
      card.style.setProperty('--lw-mx', `${e.clientX - rect.left}px`);
      card.style.setProperty('--lw-my', `${e.clientY - rect.top}px`);
    };

    const onMove = (e: PointerEvent) => {
      lastEvent = e;
      if (!raf) raf = requestAnimationFrame(apply);
    };

    document.addEventListener('pointermove', onMove, { passive: true });
    return () => {
      document.removeEventListener('pointermove', onMove);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [selector]);
}
