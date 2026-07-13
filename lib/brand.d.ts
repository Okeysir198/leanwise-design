/** CSS custom properties to spread onto a container's `style` prop. */
export type BrandVars = Record<string, string>;

/**
 * Readable ink for text on a given fill: near-black navy or white.
 * The LeanWise teal and orange both resolve to navy — white on them fails WCAG AA.
 */
export function inkOn(hex: string): "#0B1220" | "#FFFFFF";

/** hex → the `H S% L%` triple shadcn composes with, clamped into the legible band. */
export function hexToHslTriple(hex: string, dark?: boolean): string | null;

/**
 * Per-tenant theme vars. Overrides `--primary` / `--ring` — never `--accent`,
 * which in shadcn is a hover *surface*, not a brand color.
 *
 * Returns `{}` for a missing/unparseable color so the subtree inherits LeanWise
 * teal: there is no "no-brand" state.
 */
export function brandVars(accent?: string | null, dark?: boolean): BrandVars;

/** Two-letter monogram from a display name — the avatar/logo fallback. */
export function monogram(name?: string | null): string;
