/** Types for the Tailwind preset.
 *
 *  The preset registers cta/success/warning/brand/navy as REAL utilities so
 *  nobody reaches for the `bg-[hsl(var(--lw-x))]` escape hatch — the arbitrary
 *  value the token lint exists to reject.
 *
 *  Typed loosely on purpose: Tailwind's own `Config` type lives in a package
 *  this one does not depend on, and a design system must not drag tailwindcss
 *  into the dependency graph of a consumer that does not use it.
 */
declare const preset: {
  theme: { extend: Record<string, unknown> };
  plugins?: unknown[];
  [key: string]: unknown;
};
export = preset;
