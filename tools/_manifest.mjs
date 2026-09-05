/**
 * `_ds_manifest.json`, patched by the generator that already knows the answer.
 *
 * REVIEW.md open items 1 and 6, open since v1.3.0 and closed in v3.0.0. The
 * manifest carried FOUR facts that two other generators compute — `namespace`
 * and `components` (lw-bundle.mjs writes both into the bundle's `@ds-bundle`
 * header), and `tokens` and `themes` (lw-tokens-dtcg.mjs parses tokens.css for
 * exactly these). Nothing read the manifest's copies at runtime, so they were
 * inert, hand-maintained, and wrong:
 *
 *   - `components` said 94 against 89 sources; item 6 records it going twelve
 *     entries stale once already and being refreshed BY HAND, which is the
 *     treatment item 1 says it should stop needing.
 *   - `tokens` said 442 across 8 themes; the gate counts 323 across 11. That
 *     number is one of the two REVIEW.md names as having gone stale in prose.
 *   - `themes` listed `[data-band="dark"])` — a stray paren from splitting a
 *     `:where(...)` list on commas — and `:root[data-theme="dark"]`, a block
 *     v1.13.0 DELETED and which `check:contrast`'s rederiveCompleteness now
 *     refuses to let back in. The manifest was asserting a scope another gate
 *     exists to forbid.
 *
 * Each generator patches only its own keys onto whatever is on disk, so the two
 * never clobber each other and each `--check` fails only for its own slice.
 * Key ORDER is preserved — the spread keeps the existing order for existing
 * keys — because the design project reads this file on a re-pull and a
 * reordered 76 KB JSON is an unreadable diff.
 */
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { ROOT } from "./_generated.mjs";

export const MANIFEST = join(ROOT, "_ds_manifest.json");

/** The manifest as it should be on disk, with `patch`'s keys replaced. */
export function manifestWith(patch) {
  const current = JSON.parse(readFileSync(MANIFEST, "utf8"));
  for (const k of Object.keys(patch)) {
    if (!(k in current)) throw new Error(`_manifest: "${k}" is not a key of _ds_manifest.json — a generator must patch an EXISTING fact, not invent a new one`);
  }
  return JSON.stringify({ ...current, ...patch }, null, 2) + "\n";
}

/** `[data-density="compact"]` -> `Density Compact`. */
export function scopeLabel(selector) {
  return selector
    .replace(/^[.#]/, "")
    .replace(/^lw-/, "")
    .replace(/^\[data-([a-z-]+)="([a-z-]+)"\]$/, "$1 $2")
    .replace(/^:root\.?/, "")
    .replace(/[-_]/g, " ")
    .trim()
    .replace(/\b[a-z]/g, (c) => c.toUpperCase()) || selector;
}
