/**
 * ONE vocabulary for "what judgement does this carry".
 *
 * ═══════════════════════════════════════════════════════════════════════════
 * THE DRIFT THIS ENDS
 * ═══════════════════════════════════════════════════════════════════════════
 *
 * Seven components took a `tone`-shaped prop and between them spelled the same
 * five judgements six different ways:
 *
 *   Chip         brand | success | warning | danger | neutral
 *   Toast        info  | ok      | warn    | err
 *   Progress     ok    | warn    | err
 *   ActivityFeed ok    | warn    | err
 *   Console      ok    | warn    | err
 *   StatMeter    warning | danger                  (typed; the CSS did five)
 *   KpiTile      tone: pos | neg   accent: brand | pos | neg | warn | neutral
 *
 * "warning" had three spellings, "danger" three, "success" three. A developer
 * moving between two components in one file could not carry a habit across.
 *
 * ⚠️ THE TOKENS WERE NEVER DRIFTED — ONLY THE APIS WERE. Every abbreviated rule
 * already resolved to a canonical token: `.lw-toast.err` sets
 * `var(--lw-danger-on)`, `[data-tone="ok"]` sets `var(--lw-success-on)`. So the
 * package has always known these five things by their full names in the layer
 * that decides what they look like, and disagreed with itself only in the layer
 * consumers type. That is what makes `success | warning | danger | neutral |
 * brand | info` the canonical set rather than an arbitrary pick: it is the
 * spelling `tokens.css` already uses.
 *
 * ⚠️ EACH COMPONENT SUPPORTS A SUBSET, AND THAT IS FINE. This is a spelling
 * standard, not a requirement that every component paint every judgement — a
 * `Progress` bar has no use for `brand` and there is no `.lw-chip-info`. What
 * is forbidden is a component spelling a judgement it DOES support differently
 * from the token it resolves to. `tools/lw-tone.mjs` enforces exactly that.
 *
 * ⚠️ LEGACY NAMES STILL WORK, and warn once. Six consumers pin this package by
 * exact git tag; removing a name would break their build on the day they
 * upgrade, for a rename. Per the deprecation policy in CHANGELOG.md they are
 * accepted for one MINOR and removed at the next MAJOR.
 */

import { deprecate } from "./_deprecate.js";

/** The canonical vocabulary, in the order `tokens.css` declares the roles. */
export const TONES = ["brand", "success", "warning", "danger", "neutral", "info", "cta"];

/**
 * Deprecated spelling → canonical.
 *
 * `pos`/`neg` are here because `KpiTile` used them for a JUDGEMENT ("did the
 * number move in a good direction"), which is the same question `success`/
 * `danger` answer everywhere else. Its `direction` prop keeps carrying the
 * orthogonal fact — which way the number moved — and is untouched; the two
 * genuinely disagree for latency, which is why that component has both.
 */
const LEGACY = {
  ok: "success",
  warn: "warning",
  err: "danger",
  pos: "success",
  neg: "danger",
};

/**
 * Normalise one tone value, warning once per component+value if it is legacy.
 *
 * Unknown values pass through untouched rather than throwing: a component
 * library that crashes a page over a typo'd tone has made a cosmetic mistake
 * fatal, and the CSS already fails safe — an unmatched selector paints the
 * default. `lw-tone` catches the typo at build time in the consumer instead.
 */
export function normTone(component, value, prop = "tone") {
  if (value == null) return value;
  const canonical = LEGACY[value];
  if (!canonical) return value;
  deprecate(
    component,
    `${prop}=${value}`,
    `${prop}="${value}" is deprecated — use ${prop}="${canonical}". ` +
      "One vocabulary across every component: success | warning | danger | neutral | brand | info | cta. " +
      "The old names are accepted for one minor and removed at the next major.",
  );
  return canonical;
}

/**
 * Normalise the KEYS of a per-tone lookup a consumer supplies — `Toast`'s
 * `toneLabels`, say. Renaming the prop's values without renaming the map keys
 * would silently drop the consumer's own display text, which on a Toast is the
 * status word and on a Vietnamese product is the whole point of the prop.
 */
export function normToneMap(component, map, prop) {
  if (!map) return map;
  const out = {};
  for (const [key, value] of Object.entries(map)) out[normTone(component, key, prop) ?? key] = value;
  return out;
}
