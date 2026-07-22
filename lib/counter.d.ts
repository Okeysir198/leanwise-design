/**
 * Count-up animation for `.lw-counter` stats. Markup ships the final value
 * plus `data-target`; the helper animates from 0 only when invoked and
 * prefers-reduced-motion is not set. No-op otherwise.
 */
export function animateCounter(
  el: HTMLElement,
  opts?: {
    /** Animation length in ms. Default 1200. */
    duration?: number;
    /** Override number formatting (default: toFixed with data-target's decimals). */
    format?: (value: number) => string;
  }
): void;
