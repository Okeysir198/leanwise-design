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
 * ⚠️ THE LEGACY NAMES ARE GONE (v3.0.0). `ok`/`warn`/`err`/`pos`/`neg` were
 * accepted with a one-time console warning from v1.x; the deprecation policy in
 * CHANGELOG.md gave them one minor and the next major, and this is it. There is
 * no normalising step any more — a component receives the canonical value and
 * emits it, which is why `tools/lw-tone.mjs` reads TONES from this file rather
 * than restating the list.
 */

/** The canonical vocabulary, in the order `tokens.css` declares the roles. */
export const TONES = ["brand", "success", "warning", "danger", "neutral", "info", "cta"];
