#!/usr/bin/env node
/**
 * Derived WCAG 2.1 contrast gate for the token core.
 *
 * WHY THIS EXISTS — white on the brand cyan (#1AB0D5) scores 2.56 and on the
 * CTA amber (#FCB603) 1.77. Both fail AA. The design system shipped that pairing
 * for months; a human eyeballing a mockup did not catch it, a number in CI would
 * have. This file is that number.
 *
 * DERIVED, NOT HAND-LISTED — the old gate hardcoded a PAIRS array of triples.
 * This rewrite reads the color graph straight out of tokens.css:
 *
 *   1. Parse every theme block (:root, .dark, :root[data-theme="dark"],
 *      the @media dark inner rule, :where(.lw-band-dark/-light)) by brace-walking.
 *   2. Per block, collect --lw-*-c channel declarations (HSL triples OR var()
 *      references) plus the bare-name color literals (the --lw-on-dark* rgba
 *      family). Resolve the var() chains to their final RGB within each scope.
 *   3. Build THREE CANONICAL scopes — light (:root), dark (:root ⊕ .dark), and
 *      media-dark (:root ⊕ the :root inside @media (prefers-color-scheme: dark)).
 *   4. Evaluate every pair in MANIFEST against the scope(s) it declares. Every
 *      pair asserted in `dark` is asserted in `media-dark` too.
 *
 * WHY A THIRD SCOPE — a consumer that sets no class and no attribute and lets the
 * OS decide is the DEFAULT deployment for a plain marketing page, and through
 * v1.1.6 the palette it actually rendered was measured by nothing: every
 * `scope: "dark"` pair was asserted against `.dark`, a scope that consumer never
 * enters, and a difference in the media block was downgraded to a warning. The
 * media path is now a hard scope, and the two dark scopes are additionally
 * compared token-for-token (`darkScopeDivergence`) so a role that re-points in one
 * and not the other fails by name rather than by whichever pair happens to notice.
 *
 * SOURCE ORDER IS PART OF THE MODEL, not a detail. The `:root` inside the media
 * block and a plain top-level `:root` have the SAME specificity (0,1,0), so the
 * later declaration wins — and tokens.css authors several `:root` blocks AFTER
 * the media block (the chart palette, the diff grounds). Merging the media block
 * on top unconditionally would report a dark chart palette the browser never
 * paints. The media-dark scope therefore merges both sets in source order, which
 * is what makes the gate able to see that trap at all.
 *
 * The manifest is the SINGLE place coverage is added — append an entry and it is
 * checked. The colors come from the parse, so re-pointing a role token (e.g.
 * --lw-on-brand-c → var(--lw-fg-c)) is caught the moment it breaks a pair, in the
 * theme it breaks it in. Alpha foregrounds (the --lw-on-dark* tier) are
 * composited over their background before contrast is computed, so the check is
 * honest about semi-transparent ink.
 *
 * The last-declaration-wins bug that once reported light badges at 2.14 is kept
 * out by parsing per-block and resolving each scope independently — the file is
 * never scanned whole.
 *
 *   node lw-contrast-check.mjs              # CI invocation — exits non-zero on any fail
 */

import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";
import { splitRules, stripComments, declarationsIn } from "./_css.mjs";

/* PATH NOTE — this folder sits under templates/ because everything outside it is
   compiled into the design system's browser bundle, and a Node script (node:fs,
   node:path) cannot be. ROOT is therefore two levels up, not one. Through v1.0
   this file lived here with a one-level ROOT, which resolved to
   templates/tokens.css — a file that has never existed, so the gate could not
   run at all. The npm scripts (`npm run check`) are the supported entry point. */
const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const TOKENS_PATH = join(ROOT, "tokens.css");

const AA_TEXT = 4.5; // body text (normal)
const AA_LARGE = 3.0; // large text / icons / UI boundaries — opt-in per pair via `large`

/* =============================================================================
   1. THE COMPOSITION MANIFEST — declare intent; the resolver supplies color.
      `fg` / `bg` name a token by its BARE name (strip the --lw- prefix and the
      trailing -c). The resolver chases var() chains, so role tokens (fg, bg,
      on-brand, success-on …) and palette tokens (text-1, brand-500, surface-0 …)
      both work. `scope` is "light" | "dark" | "both". `large: true` relaxes to 3:1
      (icons / ≥18pt) — left off by default; the documented AA floor is 4.5.
   ============================================================================= */

const MANIFEST = [
  // ── A. Brand / CTA fills + their ink. Theme-invariant: fill and ink are the same
  //    color in both themes. Checked in BOTH so a future re-point is caught.
  //    Since v0.8.0 the ink differs BY FILL LIGHTNESS, not by brand: the teal fill
  //    is dark and takes white; amber and the status fills are light and take navy.
  { group: "brand fills", fg: "on-brand",  bg: "brand-500", scope: "both", label: "teal fill + WHITE ink (default Button)" },
  { group: "brand fills", fg: "on-brand",  bg: "brand-600", scope: "both", label: "teal hover + WHITE ink" },
  { group: "brand fills", fg: "on-cta",    bg: "cta-500",   scope: "both", label: "amber CTA fill + navy ink (the one CTA button)" },
  { group: "brand fills", fg: "on-cta",    bg: "cta-600",   scope: "both", label: "amber CTA hover + navy ink" },
  { group: "brand fills", fg: "on-danger", bg: "danger",    scope: "both", label: "destructive fill + WHITE ink" },

  // ── B. Semantic status fills + their ink. Navy sits on green/amber fills.
  { group: "status fills", fg: "on-neutral", bg: "neutral", scope: "both", label: "neutral fill + WHITE ink" },
  { group: "status fills", fg: "on-info",    bg: "info",    scope: "both", label: "info fill + WHITE ink" },
  { group: "status fills", fg: "on-status", bg: "success",  scope: "both", label: "success fill + navy ink" },
  { group: "status fills", fg: "on-status", bg: "warning",  scope: "both", label: "warning fill + navy ink" },

  // ── C. Brand / status / CTA AS TEXT on the LIGHT page. A fill is not a text
  //    color — cyan-500 as a link is 2.56, so links are brand-700. Same split for
  //    every status and for the CTA.
  { group: "text-on-light", fg: "brand-700",    bg: "surface-0", scope: "light", label: "deepest teal AS TEXT on page" },
  { group: "text-on-light", fg: "brand-500",    bg: "surface-0", scope: "light", label: "teal AS TEXT — links. Since v0.8.0 the FILL reads too (5.68)" },
  { group: "text-on-light", fg: "success-text", bg: "surface-0", scope: "light", label: "success as text on page" },
  { group: "text-on-light", fg: "warning-text", bg: "surface-0", scope: "light", label: "warning as text on page" },
  { group: "text-on-light", fg: "danger-text",  bg: "surface-0", scope: "light", label: "danger as text on page" },
  { group: "text-on-light", fg: "cta-text",     bg: "surface-0", scope: "light", label: "amber AS TEXT on page (#814508)" },

  // ── D. Text tiers on LIGHT surfaces (page, cards, inset, brand tint).
  //    text-4 / fg-faint are deliberately EXCLUDED — documented "decorative only,
  //    fails AA as body text". Adding them would test a pair the system never
  //    claimed passes; that is noise, not coverage.
  { group: "text-on-light", fg: "text-1", bg: "surface-0", scope: "light", label: "body text on page" },
  { group: "text-on-light", fg: "text-2", bg: "surface-0", scope: "light", label: "secondary text on page" },
  { group: "text-on-light", fg: "text-3", bg: "surface-0", scope: "light", label: "muted text on page (the floor)" },
  { group: "text-on-light", fg: "text-1", bg: "surface-1", scope: "light", label: "body text on subtle surface" },
  { group: "text-on-light", fg: "text-1", bg: "surface-2", scope: "light", label: "body text on muted surface" },
  { group: "text-on-light", fg: "text-1", bg: "surface-3", scope: "light", label: "body text on inset surface" },
  { group: "text-on-light", fg: "text-1", bg: "brand-50",  scope: "light", label: "text on the brand-50 accent surface" },
  //    The secondary and muted tiers on the RAISED surfaces, not just the page.
  //    Through v1.1.2 the gate paired text-2/text-3 with surface-0 only, so it
  //    read green while `code`, `.lbl` and every muted caption on an inset panel
  //    rendered at 4.08–4.34. A tier that is only AA against white is not a
  //    muted text token, it is a muted-on-white text token; say which.
  { group: "text-on-light", fg: "text-2", bg: "surface-1", scope: "light", label: "secondary text on subtle surface" },
  { group: "text-on-light", fg: "text-2", bg: "surface-2", scope: "light", label: "secondary text on muted surface" },
  { group: "text-on-light", fg: "text-2", bg: "surface-3", scope: "light", label: "secondary text on inset surface" },
  { group: "text-on-light", fg: "text-3", bg: "surface-1", scope: "light", label: "muted text on subtle surface" },
  { group: "text-on-light", fg: "text-3", bg: "surface-2", scope: "light", label: "muted text on muted surface" },
  { group: "text-on-light", fg: "text-3", bg: "surface-3", scope: "light", label: "muted text on inset surface (the worst case)" },
  // Role-token sanity: --lw-fg must stay aliased to --lw-text-1 on --lw-bg = surface-0.
  // If anyone re-points --lw-fg-c in :root, these flip and fail — exactly the guard.
  { group: "text-on-light", fg: "fg",        bg: "bg",        scope: "light", label: "role: --lw-fg on --lw-bg (≡ text-1/surface-0)" },
  { group: "text-on-light", fg: "fg-muted",  bg: "bg",        scope: "light", label: "role: --lw-fg-muted on --lw-bg" },
  { group: "text-on-light", fg: "fg-subtle", bg: "bg",        scope: "light", label: "role: --lw-fg-subtle on --lw-bg" },

  // ── E. Text tiers + accents on the DARK page. Names resolve via the .dark
  //    overlay; the role tokens re-point here, the palette tokens (text-1 …) do
  //    not, which is why the dark block re-declares --lw-fg-c as a literal triple.
  { group: "text-on-dark", fg: "fg",         bg: "bg",        scope: "dark", label: "body text on dark" },
  { group: "text-on-dark", fg: "fg-muted",   bg: "bg",        scope: "dark", label: "secondary text on dark" },
  { group: "text-on-dark", fg: "fg-subtle",  bg: "bg",        scope: "dark", label: "muted text on dark" },
  { group: "text-on-dark", fg: "fg",         bg: "bg-subtle", scope: "dark", label: "body text on a dark card" },
  { group: "text-on-dark", fg: "fg-muted",   bg: "bg-subtle", scope: "dark", label: "secondary text on a dark card" },
  //    The dark half of the same hole section D closes on light: fg-subtle was
  //    paired with the page ground only, and measured 4.47 on a raised card.
  { group: "text-on-dark", fg: "fg-subtle",  bg: "bg-subtle", scope: "dark", label: "muted text on a dark card" },
  { group: "text-on-dark", fg: "fg-subtle",  bg: "bg-inset",  scope: "dark", label: "muted text on a dark inset" },
  { group: "text-on-dark", fg: "fg-muted",   bg: "bg-inset",  scope: "dark", label: "secondary text on a dark inset" },
  { group: "text-on-dark", fg: "brand-400",  bg: "bg",        scope: "dark", label: "cyan as text on dark" },
  { group: "text-on-dark", fg: "cta-400",    bg: "bg",        scope: "dark", label: "amber as text on dark" },
  // The role token, not the literal — guards the cta-text alias re-pointing to
  // cta-400 in dark. Without this, dark could silently keep the light #92400E.
  { group: "text-on-dark", fg: "cta-text",   bg: "bg",        scope: "dark", label: "role: --lw-cta-text on dark (≡ cta-400)" },
  { group: "text-on-dark", fg: "success-on", bg: "bg",        scope: "dark", label: "success as text on dark" },
  { group: "text-on-dark", fg: "warning-on", bg: "bg",        scope: "dark", label: "warning as text on dark" },
  { group: "text-on-dark", fg: "danger-on",  bg: "bg",        scope: "dark", label: "danger as text on dark" },

  // ── F. Status soft chip tints + their -on text — the documented bug floor.
  //    success-on on success-soft was 1.75 (#34D399 on #DCFCE7) for one build
  //    because the dark block did not re-point the tint. Light uses the -text
  //    shades; dark uses the theme-aware -on shades. CTA chip included on both.
  { group: "soft chips", fg: "success-text", bg: "success-soft", scope: "light", label: "success badge on light tint" },
  { group: "soft chips", fg: "warning-text", bg: "warning-soft", scope: "light", label: "warning badge on light tint" },
  { group: "soft chips", fg: "info-text",    bg: "info-soft",    scope: "light", label: "info badge on light tint" },
  { group: "soft chips", fg: "danger-text",  bg: "danger-soft",  scope: "light", label: "danger badge on light tint" },
  { group: "soft chips", fg: "cta-text",     bg: "cta-soft",     scope: "light", label: "CTA badge on light tint" },
  { group: "soft chips", fg: "success-on",   bg: "success-soft", scope: "dark",  label: "success badge on dark tint" },
  { group: "soft chips", fg: "warning-on",   bg: "warning-soft", scope: "dark",  label: "warning badge on dark tint" },
  { group: "soft chips", fg: "info-on",      bg: "info-soft",    scope: "dark",  label: "info badge on dark tint" },
  { group: "soft chips", fg: "danger-on",    bg: "danger-soft",  scope: "dark",  label: "danger badge on dark tint" },
  { group: "soft chips", fg: "cta-400",      bg: "cta-soft",     scope: "dark",  label: "CTA badge on dark tint" },
  { group: "soft chips", fg: "cta-text",     bg: "cta-soft",     scope: "dark",  label: "role: --lw-cta-text on the dark CTA tint" },
  //    BRAND soft was the hole in this group: every status tint was paired with
  //    its ink, brand was not, and `.lw-chip` / `.lw-avatar` paint brand-text on
  //    brand-soft — 4.37 on light. The four status tints being covered is exactly
  //    why the brand one being missed went unnoticed.
  { group: "soft chips", fg: "brand-on",     bg: "brand-soft",   scope: "both",  label: "brand chip / avatar on the brand tint" },

  //    v1.3.0: `.lw-footer-head` paints --lw-brand-text on a --lw-bg-subtle
  //    ground, and the composed-pair walk below CANNOT see it — the ink is on
  //    the heading and the ground is on `.lw-footer`, two different rules, which
  //    is exactly the shape section G2 already documents for the diff surface.
  //    So the manifest is the only place this pair can be stated. It is worth
  //    stating: the consumer this footer replaces hard-coded a navy tier and put
  //    brand-500 on it at 11px, which failed AA on every page in both locales.
  { group: "soft chips", fg: "brand-text",   bg: "bg-subtle",    scope: "both",  label: "footer column heading (brand as text on the subtle ground)" },

  //    v1.3.0, the comparison matrix and the plan card — five more pairs with
  //    the SAME shape, and the same reason the manifest is the only place they
  //    can be stated: `.lw-compare :is(th,td)[data-featured]` declares the
  //    GROUND and nothing else, while the ink arrives from four other rules
  //    (`.lw-compare-yes`, `.lw-compare-no`, `th[scope="row"]`, and inherited
  //    `--lw-fg` on a plain cell). The composed-pair walk needs both in ONE
  //    rule, so it sees none of them.
  //
  //    The featured column is deliberately --lw-bg-subtle rather than
  //    --lw-brand-soft precisely to keep this list short: --lw-fg on
  //    --lw-brand-soft is a pair nothing composes today, so a brand tint would
  //    have added a brand-new measurement in all three scopes for a decorative
  //    ground. These five are re-statements on a surface already asserted.
  { group: "compare / plan", fg: "success-on", bg: "bg-subtle", scope: "both",  label: "matrix INCLUDED glyph in the featured column" },
  { group: "compare / plan", fg: "fg-subtle",  bg: "bg-subtle", scope: "light", label: "matrix EXCLUDED glyph in the featured column (dark twin: 'muted text on a dark card')" },
  { group: "compare / plan", fg: "fg-muted",   bg: "bg-subtle", scope: "light", label: "matrix row header / group label (dark twin: 'secondary text on a dark card')" },
  { group: "compare / plan", fg: "fg",         bg: "bg-subtle", scope: "light", label: "matrix string cell in the featured column (dark twin: 'body text on a dark card')" },
  //    The plan card's INCLUDED glyph. Section C measures brand-500 as text on
  //    the light page and brand-400 on dark; this asserts the ROLE that
  //    `.lw-plan-feature` actually paints, on the card ground it actually sits
  //    on — the same guard the cta-text entry gives the amber.
  { group: "compare / plan", fg: "brand-text", bg: "bg",        scope: "both",  label: "plan card INCLUDED glyph (role: --lw-brand-text on the card ground)" },

  // ── G. Always-dark navy-deep ground — the full-bleed dark hero AND the .lw-code
  //    mono surface (lw.css verifies .lw-code sits on this same navy-deep). Every
  //    row below is a .lw-code token span. The --lw-on-dark* family is rgba; the
  //    resolver composites the alpha over navy-deep before measuring contrast, so
  //    .tok-comment (white 0.48) is checked at its real rendered value (~4.8).
  { group: "navy-deep ground", fg: "on-dark",   bg: "navy-deep", scope: "both", label: ".lw-code default text (opaque white on hero)" },
  { group: "navy-deep ground", fg: "on-dark-1", bg: "navy-deep", scope: "both", label: ".lw-code strong / .tok- emphasis (white 0.92)" },
  { group: "navy-deep ground", fg: "on-dark-2", bg: "navy-deep", scope: "both", label: ".lw-code .tok-punctuation (white 0.70)" },
  { group: "navy-deep ground", fg: "on-dark-3", bg: "navy-deep", scope: "both", label: ".lw-code .tok-comment — the muted floor (white 0.48)" },
  { group: "navy-deep ground", fg: "brand-400", bg: "navy-deep", scope: "both", label: ".tok-function / .tok-attr-name (cyan)" },
  { group: "navy-deep ground", fg: "brand-300", bg: "navy-deep", scope: "both", label: ".tok-keyword / .tok-number (light cyan)" },
  { group: "navy-deep ground", fg: "cta-400",   bg: "navy-deep", scope: "both", label: ".tok-string / .tok-tag / .tok-attr-value (amber)" },

  //    The dark-band table header: --lw-on-dark-3 over the page ground plus the
  //    header's own white wash. It sits at 4.67 with the wash and 4.33 with the
  //    fill, so it is the pair that decides which overlay tier a header may use.
  { group: "navy-deep ground", fg: "on-dark-3", bg: "bg", scope: "dark", label: "dark-band table header ink on the page ground" },

  // ── G2. Diff grounds. `.lw-diff-line .t` paints --lw-fg and the parent row
  //    paints --lw-diff-*, so the ink and the ground are declared in DIFFERENT
  //    rules — which is precisely the shape the composed-pair walk below cannot
  //    see (it needs both in one rule). The manifest is the only place this pair
  //    can be stated, and it is worth stating: the diff grounds are near-white on
  //    light and near-black on dark, so a scope that re-points --lw-fg without
  //    re-pointing the ground renders white ink on a white ground. The
  //    system-dark path did exactly that.
  { group: "diff grounds", fg: "fg", bg: "diff-add", scope: "both", label: ".lw-diff-line[data-kind=add] .t — ink on the add ground" },
  { group: "diff grounds", fg: "fg", bg: "diff-del", scope: "both", label: ".lw-diff-line[data-kind=del] .t — ink on the del ground" },
  { group: "diff grounds", fg: "fg", bg: "diff-mod", scope: "both", label: ".lw-diff-line[data-kind=mod] .t — ink on the mod ground" },

  // ── H. NON-TEXT contrast, WCAG 1.4.11 — 3:1, via `large`.
  //    Until now every pair in this manifest was a TEXT pair, and `AA_LARGE` was
  //    dead code: no entry set `large`. That left the two things 1.4.11 actually
  //    names — the boundary of a UI component, and the focus indicator —
  //    measured by nothing. axe does not close it either: its color-contrast
  //    rule is text-only.
  //
  //    --lw-border-2 (`line-strong`) is the border of .lw-input / .lw-textarea /
  //    .lw-select / .lw-combo. On an empty field it is the ONLY thing that makes
  //    the control perceivable, so it is a 1.4.11 boundary, not a divider.
  //    --lw-line stays a divider and is deliberately absent: a decorative rule
  //    between rows is exempt.
  { group: "non-text (1.4.11, 3:1)", fg: "line-control", bg: "bg",        scope: "both", large: true, label: "control border on the page ground" },
  { group: "non-text (1.4.11, 3:1)", fg: "line-control", bg: "surface-1", scope: "light", large: true, label: "control border on a raised surface" },
  { group: "non-text (1.4.11, 3:1)", fg: "line-control", bg: "bg-subtle", scope: "dark",  large: true, label: "control border on a raised surface" },
  { group: "non-text (1.4.11, 3:1)", fg: "brand-500",   bg: "bg",        scope: "light", large: true, label: "focus ring against the page ground" },
  { group: "non-text (1.4.11, 3:1)", fg: "brand-400",   bg: "bg",        scope: "dark",  large: true, label: "focus ring against the page ground" },
  { group: "non-text (1.4.11, 3:1)", fg: "brand-500",   bg: "surface-1", scope: "light", large: true, label: "focus ring against a raised surface" },
  { group: "non-text (1.4.11, 3:1)", fg: "brand-400",   bg: "bg-subtle", scope: "dark",  large: true, label: "focus ring against a raised surface" },
];

/* =============================================================================
   2. TOKENS.CSS PARSER
   ============================================================================= */

const cssRaw = readFileSync(TOKENS_PATH, "utf8");
// Strip comments before brace-walking — prose mentioning `{` or a triple would
// otherwise fool the splitter, and declarations inside `/* *\/` are inert.
const css = stripComments(cssRaw);


/* A nested block is found by its enclosing AT-RULE, never by its selector: the
   `:root` inside @media (prefers-color-scheme: dark) has selector `:root`, the
   same as the base one. _css.mjs reports `atRule` per rule precisely so no gate
   has to re-derive nesting from offsets — see MEDIA_DARK_RE below. */

/** True when no other rule encloses this one — i.e. not nested in an at-rule. */
function isTopLevel(rules, r) {
  return !rules.some((o) => o !== r && o.start < r.start && o.end >= r.end);
}

/**
 * Declarations from EVERY top-level rule matching `re`, merged in source order
 * (later wins, as the cascade would). A scope authored across several blocks —
 * which `:root` and `.dark, …` both are — must be read whole or half its
 * channels look unresolved. Throws if nothing matched.
 */
function mergeRules(rules, re, label) {
  const matched = rules.filter((r) => re.test(r.selector) && isTopLevel(rules, r));
  if (!matched.length) throw new Error(`theme block not found: ${label} (no selector matched ${re})`);
  return Object.assign({}, ...matched.map((r) => declarationsIn(r.body)));
}

/** First rule whose selector matches the regexp. Throws if absent. */
function findRule(rules, re, label) {
  const r = rules.find((r) => re.test(r.selector));
  if (!r) throw new Error(`theme block not found: ${label} (no selector matched ${re})`);
  return r;
}


/* =============================================================================
   3. COLOR VALUE PARSING + VAR() CHASE
   ============================================================================= */

function hslToRgb(h, s, l) {
  s /= 100;
  l /= 100;
  const k = (n) => (n + h / 30) % 12;
  const a = s * Math.min(l, 1 - l);
  const f = (n) => l - a * Math.max(-1, Math.min(k(n) - 3, Math.min(9 - k(n), 1)));
  return { r: f(0), g: f(8), b: f(4) };
}

function hexToRgb(hex) {
  const h = hex.length === 3 ? hex.split("").map((c) => c + c).join("") : hex;
  return { r: parseInt(h.slice(0, 2), 16) / 255, g: parseInt(h.slice(2, 4), 16) / 255, b: parseInt(h.slice(4, 6), 16) / 255 };
}

/**
 * Parse one declared value into one of:
 *   { kind: "rgb", r, g, b, a }   — an opaque or alpha color ready to use
 *   { kind: "ref", name }         — a var(--lw-<name>[-c]) reference to chase
 *   { kind: "skip", raw }         — gradient / shadow / multiple-values; ignore
 */
function parseValue(raw) {
  const v = raw.trim();
  // HSL channel triple: "173.4 80.4% 40%"  (also "0 0% 100%")
  const triple = v.match(/^(-?[\d.]+)\s+([\d.]+)%\s+([\d.]+)%$/);
  if (triple) return { kind: "rgb", ...hslToRgb(+triple[1], +triple[2], +triple[3]), a: 1 };
  // var() reference, optional fallback after a comma. The target's trailing -c is
  // stripped so the ref name matches the BARE key the -c declaration is stored under.
  const ref = v.match(/^var\(\s*--lw-([a-z0-9-]+)\s*(?:,[^)]*)?\)$/);
  if (ref) {
    let name = ref[1];
    if (name.endsWith("-c")) name = name.slice(0, -2);
    return { kind: "ref", name };
  }
  // hex literal (#FFFFFF — the --lw-on-dark family)
  const hex = v.match(/^#([0-9a-f]{3}|[0-9a-f]{6})$/i);
  if (hex) return { kind: "rgb", ...hexToRgb(hex[1]), a: 1 };
  // rgba() / rgb() — comma OR modern slash form. (rgba(255,255,255,0.70) etc.)
  const rg = v.match(/^rgba?\(\s*([\d.]+)[\s,]+([\d.]+)[\s,]+([\d.]+)\s*(?:[,/]\s*([\d.]+))?\s*\)$/i);
  if (rg) return { kind: "rgb", r: +rg[1] / 255, g: +rg[2] / 255, b: +rg[3] / 255, a: rg[4] !== undefined ? +rg[4] : 1 };
  // An ALPHA TINT: `hsl(var(--lw-brand-500-c) / 0.14)` or `hsl(1 2% 3% / .14)`.
  // The `-soft` family is authored this way where a status tint gets its own
  // opaque `-c` channel, and until v1.1.3 that asymmetry meant --lw-brand-soft
  // parsed as a plain derived line and was dropped — so the one soft chip the
  // MANIFEST could not measure was the brand one, the group whose own comment
  // calls it "the documented bug floor".
  const tint = v.match(/^hsla?\(\s*(.+?)\s*\/\s*([\d.]+%?)\s*\)$/i);
  if (tint) {
    const inner = parseValue(tint[1]);
    if (inner.kind === "skip") return { kind: "skip", raw: v };
    const a = tint[2].endsWith("%") ? parseFloat(tint[2]) / 100 : +tint[2];
    // A ref carries the alpha forward; chase() multiplies it into the target.
    return inner.kind === "ref" ? { ...inner, a } : { ...inner, a: (inner.a ?? 1) * a };
  }
  // A LITERAL hsl() with no channel behind it — `hsl(140 60% 94%)`. The chart
  // palette and the diff grounds are authored this way (they have no `-c`
  // triple), so without this branch they resolved to nothing and every pair that
  // named one was silently unmeasurable. `hsl(var(--x-c))` is handled above via
  // the ref branch; only a literal reaches here.
  const fn = v.match(/^hsla?\(\s*(-?[\d.]+)\s+([\d.]+)%\s+([\d.]+)%\s*\)$/i);
  if (fn) return { kind: "rgb", ...hslToRgb(+fn[1], +fn[2], +fn[3]), a: 1 };
  // Derived lines that chase a var(), gradients, multi-value shadows: not solid colors.
  return { kind: "skip", raw: v };
}

/**
 * Build a resolved scope: bareName → { kind:"rgb", r, g, b, a }.
 * Channels (-c declarations: triples + var refs) are collected first, then bare
 * color literals (the rgba on-dark family); hsl() derived lines and gradients are
 * skipped. var() refs are then chased to a concrete RGB within this same scope.
 */
function buildScope(decls) {
  const scope = {};
  for (const [k, v] of Object.entries(decls)) {
    if (k.endsWith("-c")) {
      const parsed = parseValue(v);
      if (parsed.kind !== "skip") scope[k.slice(0, -2)] = parsed;
    }
  }
  for (const [k, v] of Object.entries(decls)) {
    if (k.endsWith("-c")) continue;
    // A derived `hsl(var(--x-c))` line is redundant — its channel is already in
    // scope under the bare name. An alpha TINT `hsl(var(--x-c) / .14)` is not:
    // no channel carries the alpha, so it is the only declaration of that color.
    const parsed = parseValue(v);
    if (parsed.kind === "skip") continue;
    // A DERIVED line chases a var() — `hsl(var(--lw-fg-c))` — and is redundant
    // with the channel already in scope under the same bare name. A LITERAL
    // `hsl(140 60% 94%)` is not: nothing else declares that colour, so dropping
    // it (which an `/^hsl\(/` test did) made the whole chart and diff family
    // unresolvable. The discriminator is `var(`, not the function name.
    if (parsed.a === undefined || parsed.a === 1) {
      if (/var\(/.test(v)) continue; // derived color / gradient ref
    }
    if (scope[k] === undefined) scope[k] = parsed;
  }
  for (const k of Object.keys(scope)) {
    scope[k] = chase(scope, k, new Set());
  }
  return scope;
}

/** Resolve a ref chain to a concrete RGB; detects cycles and missing targets. */
function chase(scope, name, seen) {
  if (seen.has(name)) return { kind: "cycle", name };
  const v = scope[name];
  if (!v) return { kind: "missing", name };
  if (v.kind === "ref") {
    seen.add(name);
    const target = chase(scope, v.name, seen);
    // A tint ref (`hsl(var(--lw-brand-500-c) / .14)`) borrows the target's
    // channel but keeps its OWN alpha; without this the tint would resolve to
    // the fully opaque brand fill and measure a contrast nothing renders.
    if (v.a !== undefined && target.kind === "rgb") return { ...target, a: (target.a ?? 1) * v.a };
    return target;
  }
  return v;
}

/* =============================================================================
   4. SCOPE ASSEMBLY + DARK-BLOCK PARITY GUARD
   ============================================================================= */

const rules = splitRules(css);

// Light defaults — EVERY top-level bare :root, merged in source order. tokens.css
// opens several (the scale, then the color roles, then the late addenda); taking
// only the first resolves none of the color channels. NOT :root[data-theme="dark"],
// and not the :root nested inside the system-preference @media.
const lightDecls = mergeRules(rules, /^:root\s*$/, ":root (light defaults)");
// The canonical dark overlay — the `.dark, [data-theme="dark"], …` rules, likewise
// authored as more than one block.
const darkClassDecls = mergeRules(rules, /^\.dark\s*,/, ".dark, [data-theme=\"dark\"]");

// Dark = light ⊕ dark overlay (everything the dark block does NOT redeclare is
// inherited from :root — e.g. --lw-text-1-c stays navy, which is the whole reason
// --lw-on-brand-c points at it rather than at --lw-fg-c).
const darkDecls = { ...lightDecls, ...darkClassDecls };

/* The system-preference block scopes a bare `:root`, which is ambiguous by
   selector alone — that exact collision is what folded the whole dark palette
   into `base` in lw-tokens-dtcg.mjs. Anchor on the enclosing at-rule, which
   _css.mjs already reports per rule as `atRule`. */
const MEDIA_DARK_RE = /^@media\s*\(prefers-color-scheme:\s*dark\)\s*$/;
const MEDIA_ROOT_RE = /^:root(?::not\([^)]*\))*\s*$/;

/**
 * MEDIA-DARK = the base `:root` cascade with the `@media (prefers-color-scheme:
 * dark)` `:root` block(s) layered in BY SOURCE ORDER — exactly what a browser
 * computes for a visitor whose OS prefers dark and whose page carries no class
 * and no data-theme. That is the default marketing-page deployment.
 *
 * Source order, not a spread, because the two selectors have identical
 * specificity (0,1,0): a plain `:root` authored AFTER the media block wins over
 * it. tokens.css does that for the chart palette and the diff grounds, and a
 * naive `{...light, ...media}` would have reported a dark chart palette no
 * browser paints — a gate that lies in the direction of green.
 *
 * The explicit-light restatement inside the same media block
 * (`:root.light, :root[data-theme="light"]`) is (0,2,0) and never participates
 * here: that visitor has made a choice and is not on this path.
 */
const mediaDarkRootRules = rules.filter((r) => MEDIA_DARK_RE.test(r.atRule) && MEDIA_ROOT_RE.test(r.selector));
if (!mediaDarkRootRules.length) {
  throw new Error("no `:root` found inside @media (prefers-color-scheme: dark) — the system-dark path is the default deployment; it cannot go unmeasured");
}
const lightRootRules = rules.filter((r) => /^:root\s*$/.test(r.selector) && isTopLevel(rules, r));
const mediaDarkDecls = Object.assign(
  {},
  ...[...lightRootRules, ...mediaDarkRootRules]
    .sort((a, b) => a.start - b.start)
    .map((r) => declarationsIn(r.directBody)),
);

const light = buildScope(lightDecls);
const dark = buildScope(darkDecls);
const mediaDark = buildScope(mediaDarkDecls);

/**
 * The two dark scopes must resolve to the SAME colour, token for token.
 *
 * The manifest catches a divergence only where someone thought to name the pair;
 * this catches it by name, everywhere, and is the cheap insurance the third scope
 * buys. It is what makes the standing "@media block omits a re-point" warning a
 * result instead of a note: either the scopes agree, or this says which token,
 * with both values.
 *
 * It found two families on the first run — the chart palette and the diff
 * grounds. Both re-point under `.dark, [data-theme="dark"], .lw-band-dark`, and
 * neither re-pointed on the system-dark path, so a visitor with the OS set to
 * dark and no class read `--lw-fg` (#E7ECF3) on `--lw-diff-add` (a near-white
 * green): 1.05:1.
 */
function darkScopeDivergence() {
  const fails = [];
  let compared = 0;
  const solid = (v) => v && v.kind === "rgb";
  const hex = ({ r, g, b, a }) =>
    "#" + [r, g, b].map((v) => Math.round(v * 255).toString(16).padStart(2, "0")).join("").toUpperCase() +
    ((a ?? 1) < 1 ? ` @${(a ?? 1).toFixed(2)}` : "");
  for (const k of [...new Set([...Object.keys(dark), ...Object.keys(mediaDark)])].sort()) {
    const a = dark[k];
    const b = mediaDark[k];
    if (!solid(a) && !solid(b)) continue;
    if (!solid(a) || !solid(b)) {
      fails.push(`--lw-${k} resolves in ${solid(a) ? ".dark" : "media-dark"} only — the other dark scope cannot paint it`);
      continue;
    }
    compared++;
    if (hex(a) !== hex(b)) {
      fails.push(
        `--lw-${k}: .dark → ${hex(a)}, system-dark (@media) → ${hex(b)} — the media path is missing this re-point. ` +
        `Note a plain :root authored AFTER the media block wins over it; place the re-point accordingly.`,
      );
    }
  }
  return { fails, compared };
}

/**
 * Parity guard — the design intent (documented at tokens.css ≈ line 400) is that
 * every DARK context re-points the SAME set. The explicit attribute form
 * (:root[data-theme="dark"]) and the dark band (:where(.lw-band-dark)) MUST agree
 * with .dark declaration-for-declaration; a divergence here is a real drift bug
 * and fails the gate.
 *
 * The @media (system-preference) block stays a WARNING here, and that is no
 * longer a hole: it is a DECLARATION-SHAPE check, and the rendered result of that
 * block is now measured directly — every `scope: "dark"` pair is evaluated in the
 * media-dark scope, and `darkScopeDivergence()` compares the two dark scopes token
 * for token as a hard failure. What this warning adds on top is the case where the
 * media block reaches the same colour by a different declaration (an inlined
 * triple where .dark uses a var(), say) — worth saying, not worth failing.
 *
 * Likewise :where(.lw-band-light) must reproduce the light role set.
 */
/**
 * The band blocks are authored as selector LISTS — `:where(.lw-band-dark,
 * [data-band="dark"])` — so an exact-match regex never finds them. Match the
 * class anywhere in the list, and exclude the block that carries BOTH bands
 * (the shared-declaration block), which is not the role set we are comparing.
 */
const BAND_DARK_RE = /^:where\((?![^)]*\.lw-band-light)[^)]*\.lw-band-dark\b[^)]*\)\s*$/;
const BAND_LIGHT_RE = /^:where\((?![^)]*\.lw-band-dark)[^)]*\.lw-band-light\b[^)]*\)\s*$/;
/* MEDIA_DARK_RE / MEDIA_ROOT_RE are declared with the scope assembly above — the
   media-dark scope needs them before this point. */

function parity() {
  const failPairs = []; // hard fails (explicit dark forms disagree)
  const warnings = [];  // soft (media block / informational)

  const want = [
    { label: ":root[data-theme=\"dark\"]", re: /^:root\[data-theme="dark"\]\s*$/, here: declarationsIn(findRule(rules, /^:root\[data-theme="dark"\]\s*$/, ":root[data-theme=\"dark\"]").body), strict: true },
    { label: ":where(.lw-band-dark)",     re: BAND_DARK_RE,                       here: declarationsIn(findRule(rules, BAND_DARK_RE, ":where(.lw-band-dark)").body), strict: true },
    // ALL the system-dark `:root` blocks, merged — tokens.css may state the
    // re-points in more than one media block (source order relative to the plain
    // `:root` blocks forces that for the chart palette and the diff grounds), and
    // reading only the first would warn about tokens that are in fact re-pointed.
    { label: "@media (prefers-color-scheme: dark)", re: MEDIA_ROOT_RE, here: Object.assign({}, ...mediaDarkRootRules.map((r) => declarationsIn(r.directBody))), strict: false },
  ];

  // Compare COLOR declarations only (-c channels + the rgba on-dark family).
  const isColorDecl = (k) => k.endsWith("-c") || /^on-dark(-[0-9])?$/.test(k);
  // Collapse internal whitespace so "34.3  100%  91.8%" equals "34.3 100% 91.8%"
  // (both blocks author the same triple; spacing is not a color difference).
  const norm = (s) => s.replace(/\s+/g, " ").trim();

  for (const { label, here, strict } of want) {
    for (const k of Object.keys(darkClassDecls)) {
      if (!isColorDecl(k)) continue;
      const mine = here[k];
      if (mine === undefined) {
        const msg = `${label} is missing --lw-${k} (present in .dark)`;
        (strict ? failPairs : warnings).push(msg);
      } else if (norm(mine) !== norm(darkClassDecls[k])) {
        const msg = `${label}: --lw-${k} = "${mine}" ≠ .dark "${darkClassDecls[k]}"`;
        (strict ? failPairs : warnings).push(msg);
      }
    }
  }

  // Band-light must reproduce the light role set for color decls it shares.
  const bandLightDecls = declarationsIn(findRule(rules, BAND_LIGHT_RE, ":where(.lw-band-light)").body);
  for (const k of Object.keys(bandLightDecls)) {
    if (!isColorDecl(k)) continue;
    const lightVal = lightDecls[k];
    if (lightVal !== undefined && norm(bandLightDecls[k]) !== norm(lightVal)) {
      failPairs.push(`:where(.lw-band-light): --lw-${k} = "${bandLightDecls[k]}" ≠ :root "${lightVal}"`);
    }
  }

  return { failPairs, warnings };
}

/* =============================================================================
   5. CONTRAST MATH (WCAG 2.1 relative luminance + alpha compositing)
   ============================================================================= */

function luminance([r, g, b]) {
  const lin = (v) => (v <= 0.03928 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4);
  return 0.2126 * lin(r) + 0.7152 * lin(g) + 0.0722 * lin(b);
}

/**
 * Contrast between a foreground and its background. If the foreground has alpha
 * (the --lw-on-dark* tier), it is composited OVER the background first — that is
 * the color the viewer actually perceives, and the only honest basis for the ratio.
 */
function contrast(fg, bg) {
  const a = fg.a ?? 1;
  const eff = [
    a * fg.r + (1 - a) * bg.r,
    a * fg.g + (1 - a) * bg.g,
    a * fg.b + (1 - a) * bg.b,
  ];
  const [hi, lo] = [luminance(eff), luminance([bg.r, bg.g, bg.b])].sort((x, y) => y - x);
  return (hi + 0.05) / (lo + 0.05);
}

/* =============================================================================
   6. EVALUATE THE MANIFEST
   ============================================================================= */

const C = { reset: "\x1b[0m", green: "\x1b[32m", red: "\x1b[31m", yellow: "\x1b[33m", dim: "\x1b[2m", bold: "\x1b[1m" };

const SCOPES = { light, dark, "media-dark": mediaDark };
/* Every scope that paints on a dark ground. A pair is asserted in ALL of them or
   in none — an assertion that holds only for the class-based dark scope leaves
   the OS-preference visitor, who is the default, measured by nothing. */
const DARK_SCOPES = ["dark", "media-dark"];
const isDark = (s) => DARK_SCOPES.includes(s);

const resolveColor = (name, scopeName) => {
  const scope = SCOPES[scopeName];
  if (!scope) throw new Error(`unknown scope ${JSON.stringify(scopeName)}`);
  // A cycle or a missing target is already surfaced by chase(); here anything
  // that did not resolve to a solid colour is simply unresolved.
  return scope[name]?.kind === "rgb" ? scope[name] : null;
};

let failed = 0;
const rows = [];

for (const entry of MANIFEST) {
  const scopes = entry.scope === "both" ? ["light", ...DARK_SCOPES]
    : entry.scope === "dark" ? DARK_SCOPES
    : [entry.scope];
  for (const scopeName of scopes) {
    const fg = resolveColor(entry.fg, scopeName);
    let bg = resolveColor(entry.bg, scopeName);
    // A translucent BACKGROUND (the `-soft` tints) renders over the page ground.
    // Flatten it there before measuring, or the ratio describes a surface the
    // viewer never sees.
    // Which ground? Not the page — a `.lw-chip` sits on a CARD as often as on the
    // page, and 0.14 brand over surface-1 is darker than over white: axe measured
    // 4.37 for a pair this gate scored 4.65 against white alone. So flatten over
    // EVERY surface tier the tint can land on and keep the worst. Enumerating
    // them beats an `over:` field nobody remembers to set.
    let groundNote = "";
    if (bg && (bg.a ?? 1) < 1) {
      const tiers = isDark(scopeName) ? ["bg", "bg-subtle"] : ["surface-0", "surface-1", "surface-2", "surface-3"];
      const flat = (over) => ({ kind: "rgb", a: 1,
        r: bg.a * bg.r + (1 - bg.a) * over.r,
        g: bg.a * bg.g + (1 - bg.a) * over.g,
        b: bg.a * bg.b + (1 - bg.a) * over.b });
      let worst = null;
      for (const t of tiers) {
        const over = resolveColor(t, scopeName);
        if (!over) continue;
        const cand = flat(over);
        const r = contrast(fg || cand, cand);
        if (!worst || r < worst.r) worst = { r, cand, t };
      }
      if (worst) { bg = worst.cand; groundNote = ` over ${worst.t}`; }
    }
    if (!fg || !bg) {
      // Name the side that actually failed. `entry.fg || entry.bg` always named
      // the fg, which sent a reader hunting a token that resolved perfectly.
      const missing = [!fg && entry.fg, !bg && entry.bg].filter(Boolean).join(", ");
      rows.push({ scope: scopeName, group: entry.group, status: "MISS", ratio: "  ?  ", pair: `${entry.fg} on ${entry.bg}`, label: `unresolved token (${missing})` });
      failed++;
      continue;
    }
    const ratio = contrast(fg, bg);
    const threshold = entry.large ? AA_LARGE : AA_TEXT;
    const ok = ratio >= threshold;
    if (!ok) failed++;
    rows.push({
      scope: scopeName,
      group: entry.group,
      status: ok ? "PASS" : "FAIL",
      ratio: ratio.toFixed(2),
      pair: `${entry.fg} on ${entry.bg}${groundNote}`,
      label: entry.label,
      large: !!entry.large,
    });
  }
}

/* =============================================================================
   6b. LOGO GRADIENT — the one brand colour that lives OUTSIDE tokens.css

   assets/logo-mark.svg and logo-lockup.svg must carry literal stops: CSS custom
   properties do not cascade into an SVG loaded through <img>, so a var() there
   would silently always render its fallback. That literal is a second home for
   a brand value, which is exactly what this package exists to prevent — and
   lw-token-lint cannot see it (it walks .ts/.tsx under a consumer's src/, not
   .svg in this repo). So assert it here, where the resolver already lives.

   Without this, moving the brand ramp ships a stale-coloured logo with every
   gate green. v0.7.0 moved the hue 19°; the next move would have.
   ============================================================================= */
/* -----------------------------------------------------------------------------
   email.css literals must equal what tokens.css resolves to.

   Same argument as the logo gradient stops above, same failure mode. Mail
   clients have no custom properties, so email.css carries literal hex ON
   PURPOSE — which makes it a SECOND HOME for palette values, and a second home
   drifts. Its own comment says the values are "resolved from tokens.css"; six
   of them were not. `--lw-text-3` was the worst: v1.1.3 moved the muted floor
   to clear AA on surface-3 and email kept the old #6B7684, so the one surface
   that cannot be re-themed after send had the pre-fix value baked in.

   Nothing else can see this. The lint skips email.css by design (literals are
   correct there) and the contrast gate only reads tokens.css.
   -------------------------------------------------------------------------- */
const EMAIL_LITERALS = [
  { token: "text-1",    scope: "light" },
  { token: "text-2",    scope: "light" },
  { token: "text-3",    scope: "light" },
  { token: "border-1",  scope: "light" },
  { token: "border-2",  scope: "light" },
  { token: "surface-1", scope: "light" },
  { token: "brand-500", scope: "light" },
  { token: "navy-700",  scope: "light" },
  { token: "cta-500",   scope: "light" },
  { token: "fg-muted",  scope: "dark" },
];

function emailLiterals() {
  const fails = [];
  const toHex = ({ r, g, b }) =>
    "#" + [r, g, b].map((v) => Math.round(v * 255).toString(16).padStart(2, "0")).join("").toUpperCase();
  let css;
  try { css = readFileSync(join(ROOT, "email.css"), "utf8"); }
  catch { return ["email.css is missing"]; }
  const present = new Set([...css.matchAll(/#[0-9A-Fa-f]{6}\b/g)].map((m) => m[0].toUpperCase()));

  for (const { token, scope } of EMAIL_LITERALS) {
    const rgb = resolveColor(token, scope);
    if (!rgb) { fails.push(`--lw-${token}-c did not resolve in the ${scope} scope`); continue; }
    const want = toHex(rgb);
    if (!present.has(want)) {
      fails.push(
        `email.css does not contain ${want} — the ${scope} value of --lw-${token}. ` +
        `If that token moved, move the literal with it; email.css cannot read a custom property.`,
      );
    }
  }
  return fails;
}

function logoStops() {
  const fails = [];
  const want = [
    { offset: "0", token: "navy-700" },
    // NOT brand-500. The artwork uses the mark's own cyan, which is ~5 points
    // lighter than the UI fill — the fill had to darken so white ink clears AA,
    // a constraint a logo does not carry. See --lw-logo-cyan-c in tokens.css.
    { offset: "1", token: "logo-cyan" },
  ];
  // The on-dark artwork is the same gradient lifted for a dark ground. It shipped
  // with literal hexes and NO gate — this loop read two of the four logo assets,
  // so the pair in logo-lockup-ondark.svg was exactly the unguarded second home
  // the README warns about, for as long as that file has existed.
  const wantOnDark = [
    { offset: "0", token: "logo-navy-ondark" },
    { offset: "1", token: "logo-cyan-ondark" },
  ];
  const toHex = ({ r, g, b }) =>
    "#" + [r, g, b].map((v) => Math.round(v * 255).toString(16).padStart(2, "0")).join("").toUpperCase();

  const FILES = [
    { file: "logo-mark.svg", stops: want },
    { file: "logo-lockup.svg", stops: want },
    { file: "logo-lockup-ondark.svg", stops: wantOnDark },
    // The favicon's ATTRIBUTE stops are the light pair — the dark pair lives in its
    // <style> block as declarations, and is asserted separately below. Both homes
    // are real and both must be checked: the attributes are what a renderer that
    // drops <style> falls back to, the declarations are what every modern browser
    // actually paints on a dark tab strip.
    { file: "logo-favicon.svg", stops: want },
  ];

  for (const { file, stops: wantStops } of FILES) {
    let svg;
    try {
      svg = readFileSync(join(ROOT, "assets", file), "utf8");
    } catch {
      fails.push(`assets/${file} is missing — regenerate the logo assets`);
      continue;
    }
    // The lockup carries the same pair twice (mark and wordmark sweep separately),
    // so compare each gradient's stops rather than assuming a single pair.
    const found = [...svg.matchAll(/<stop offset="([\d.]+)"\s*stop-color="(#[0-9A-Fa-f]{3,6})"/g)];
    if (found.length === 0 || found.length % wantStops.length !== 0) {
      fails.push(`assets/${file}: expected a multiple of ${wantStops.length} gradient stops, found ${found.length}`);
      continue;
    }
    found.forEach(([, offset, hex], idx) => {
      const i = idx % wantStops.length;
      const { offset: wantOffset, token } = wantStops[i];
      const expect = resolveColor(token, "light");
      if (!expect) { fails.push(`assets/${file}: --lw-${token}-c did not resolve`); return; }
      if (offset !== wantOffset) {
        fails.push(`assets/${file}: stop ${idx} has offset ${offset}, expected ${wantOffset}`);
      }
      if (toHex(hexToRgb(hex.slice(1))) !== toHex(expect)) {
        fails.push(
          `assets/${file}: stop ${idx} is ${hex.toUpperCase()}, but --lw-${token}-c resolves to ` +
          `${toHex(expect)} — regenerate the logo assets`,
        );
      }
    });
  }

  /* The favicon's dark-scheme override. It is the only logo asset that switches
     itself, so it is the only one whose stops live in a <style> block as well as
     in attributes — and a stale value there is invisible in a way the others are
     not, because it only paints for a reader whose OS is in dark mode. */
  try {
    const svg = readFileSync(join(ROOT, "assets", "logo-favicon.svg"), "utf8");
    const style = svg.match(/<style>([\s\S]*?)<\/style>/);
    if (!style) {
      fails.push("assets/logo-favicon.svg: no <style> block — the dark-tab variant is missing");
    } else if (!/prefers-color-scheme\s*:\s*dark/.test(style[1])) {
      fails.push("assets/logo-favicon.svg: <style> has no prefers-color-scheme:dark query");
    } else {
      const dark = style[1].slice(style[1].search(/@media[^{]*prefers-color-scheme\s*:\s*dark/));
      for (const { token } of wantOnDark) {
        const expect = resolveColor(token, "light");
        if (!expect) { fails.push(`assets/logo-favicon.svg: --lw-${token}-c did not resolve`); continue; }
        if (!dark.toUpperCase().includes(toHex(expect))) {
          fails.push(
            `assets/logo-favicon.svg: dark-scheme block does not carry ${toHex(expect)} for ` +
            `--lw-${token}-c — run \`node tools/lw-favicon.mjs\``,
          );
        }
      }
    }
  } catch {
    fails.push("assets/logo-favicon.svg is missing — run `node tools/lw-favicon.mjs`");
  }

  return fails;
}

/* =============================================================================
   6c. COMPOSED PAIRS — coverage the MANIFEST structurally cannot have

   The manifest lists pairs someone THOUGHT of. That is the right shape for
   intent ("brand-on must read on brand-soft even if nothing paints it yet"),
   and the wrong shape for coverage: it tracks memory, and its failure mode is
   silent green. v1.1.3 added --lw-brand-on for exactly this pairing, converted
   fourteen sites, missed `.lw-file-tree li[data-active]` because the rule spans
   three lines and the sweep was line-wise — and the gate stayed green, because
   the manifest asserts the pair in the abstract and never asks who paints it.

   So: walk the CSS layers, take every rule that declares BOTH a color and a
   background from tokens, and score what is actually composed. The manifest
   stays as the intent overlay; this is the coverage.
   ============================================================================= */

const LAYERS = ["base.css", "marketing.css", "product.css"];
const TOKEN_VAL = /^var\(--lw-([a-z0-9-]+)\)$/;
// An anchored exact match on `var(--lw-x)` DROPPED every alpha tint, every
// gradient and every var() with a fallback — 33 of the 122 rules that declare
// both a colour and a background, with no diagnostic. The section's own header
// argues this walk exists because "the manifest tracks memory, and its failure
// mode is silent green"; skipping a quarter of the input reintroduced silent
// green one layer down. Skips are now COUNTED and reported.
const skipped = [];

function composedPairs() {
  const seen = new Map();
  for (const layer of LAYERS) {
    let src;
    try { src = readFileSync(join(ROOT, layer), "utf8"); } catch { continue; }
    for (const { selector, directBody } of splitRules(stripComments(src))) {
      if (!selector || selector.startsWith("@")) continue;
      // WCAG exempts disabled controls, and the system leans on that: fg-faint
      // on bg-muted is 2.28 and deliberate.
      if (/:disabled|\[aria-disabled|\[data-disabled|\[disabled/.test(selector)) continue;
      const decls = {};
      for (const m of directBody.matchAll(/(^|[;{])\s*(color|background|background-color)\s*:\s*([^;}]+)/g)) {
        decls[m[2] === "background-color" ? "background" : m[2]] = m[3].trim();
      }
      if (!decls.color || !decls.background) continue;
      const fg = decls.color.match(TOKEN_VAL);
      // A gradient has no single background colour; score against its DARKEST
      // and LIGHTEST token stop would be right, but the resolver models solid
      // colours, so take the stops it can resolve and keep the worst.
      const bg = decls.background.match(TOKEN_VAL);
      if (!fg || !bg) {
        skipped.push(layer + " " + selector.split(",")[0].trim()
          + "  {" + (fg ? "" : " color: " + decls.color) + (bg ? "" : " background: " + decls.background) + " }");
        continue;
      }
      // A rule scoped to a dark band paints on the dark ground only; an
      // unscoped one is seen on whichever theme the page is in — INCLUDING the
      // system-preference one, which is the theme a page with no class is in.
      // A `.dark`-scoped rule is not on that path: that visitor has no class.
      const dark = /\.dark\b|\[data-band="dark"\]|\.lw-band-dark|-dark\b/.test(selector);
      const light = /\.lw-band-light|\[data-band="light"\]/.test(selector);
      const scopesFor = dark ? ["dark"] : light ? ["light"] : ["light", ...DARK_SCOPES];
      for (const sc of scopesFor) {
        const key = fg[1] + "|" + bg[1] + "|" + sc;
        if (!seen.has(key)) seen.set(key, { fg: fg[1], bg: bg[1], scope: sc, where: layer + " " + selector.split(",")[0].trim() });
      }
    }
  }
  return [...seen.values()];
}

const composedFails = [];
for (const c of composedPairs()) {
  const fg = resolveColor(c.fg, c.scope);
  let bg = resolveColor(c.bg, c.scope);
  if (!fg || !bg) continue; // not a solid pair the resolver models; the manifest covers those
  if ((bg.a ?? 1) < 1) {
    const over = resolveColor("bg", c.scope);
    if (!over) continue;
    bg = { kind: "rgb", a: 1,
      r: bg.a * bg.r + (1 - bg.a) * over.r,
      g: bg.a * bg.g + (1 - bg.a) * over.g,
      b: bg.a * bg.b + (1 - bg.a) * over.b };
  }
  const ratio = contrast(fg, bg);
  if (ratio < AA_TEXT) composedFails.push({ ...c, ratio: ratio.toFixed(2) });
}

/* -----------------------------------------------------------------------------
   6b. BAND SCOPE (v1.3.1).

   An ALWAYS-DARK surface must establish the dark TOKEN scope for its subtree,
   not merely paint a navy background and re-ink the four children the author
   happened to think of. If it does not, every role token inside it
   (`--lw-fg-subtle`, `--lw-bg`, `--lw-line`, the focus ring) resolves against
   the LIGHT palette on navy paper, and the failure is invisible to everything
   else in this repo:

     · the pair gate above measures TOKENS, and both tokens in the pair are
       correct — it is the SCOPE that is wrong, which no pair can express;
     · `check:a11y` cannot see it either, and that is structural rather than a
       tuning problem. `.lw-hero-dark` carries two decorative pseudo-elements,
       so axe answers "background color could not be determined due to a pseudo
       element" and files the finding as INCOMPLETE. lw-a11y.mjs reads
       `violations` only — correctly, since incompletes are mostly noise — so a
       hero can hold 1.5:1 text and the gate prints "no violations". Measured on
       the marketing card: four serious incompletes, zero violations.

   `.lw-hero-dark` was exactly this for the whole life of the package.
   `.lw-section.dark` escaped only by accident: its class list literally
   contains `dark`, which tokens.css already names. So the invariant is worth
   stating rather than remembering.

   THE RULE. A selector used as an ANCESTOR SCOPE to re-ink descendants from the
   `--lw-on-dark*` family is, by that act, declaring itself a dark ground. It
   must appear in tokens.css's dark band selector list. Hand-patching a child's
   ink because the ground is dark IS the band's job, done manually and
   incompletely — the patches only ever cover the elements someone remembered.

   The exemption list is greppable and countable, same discipline as
   `data-a11y-expect` on the cards and `NO_SKIP_LINK` in lw-templates.mjs.
   -------------------------------------------------------------------------- */

/* `.lw-code` is a CLOSED surface: a fixed set of parts (head, tabs, the `tok-*`
   spans, the copy control) that this package draws in full, not a band a
   consumer composes into. Making it a token band would re-point `--lw-bg`
   inside every code block in every consumer, which is a visible change and a
   palette decision, not a patch. Recorded in REVIEW.md "Open" rather than
   tuned away here. `.lw-code-head` is the same surface, one level in. */
const BAND_SCOPE_EXEMPT = new Set([".lw-code", ".lw-code-head"]);

/** Split a selector list on TOP-LEVEL commas only — `:is(a, b) .x` is one selector. */
function splitSelectorList(list) {
  const out = [];
  let depth = 0, buf = "";
  for (const ch of list) {
    if (ch === "(") depth++;
    else if (ch === ")") depth--;
    else if (ch === "," && depth === 0) { out.push(buf); buf = ""; continue; }
    buf += ch;
  }
  if (buf.trim()) out.push(buf);
  return out.map((s) => s.trim()).filter(Boolean);
}

function bandScopes() {
  // Every class named anywhere in tokens.css's two band selector lists, plus the
  // page-theme selectors, which are bands by construction.
  const declared = new Set(["dark", "lw-band-dark", "lw-band-light", "light"]);
  for (const re of [BAND_DARK_RE, BAND_LIGHT_RE]) {
    const rule = rules.find((r) => re.test(r.selector));
    if (!rule) continue;
    for (const m of rule.selector.matchAll(/\.([A-Za-z0-9_-]+)/g)) declared.add(m[1]);
  }

  const offenders = new Map();
  let scanned = 0;
  for (const layer of LAYERS) {
    let src;
    try { src = readFileSync(join(ROOT, layer), "utf8"); } catch { continue; }
    for (const { selector, directBody } of splitRules(stripComments(src))) {
      if (!selector || selector.startsWith("@")) continue;
      const m = /(^|[;{])\s*color\s*:\s*([^;}]+)/.exec(directBody);
      if (!m || !/--lw-on-dark\b|--lw-on-dark-[0-9]\b/.test(m[2])) continue;
      for (const sel of splitSelectorList(selector)) {
        // A DESCENDANT rule only: `.x { color: on-dark }` paints itself (an ink
        // button), which is not a claim about a subtree.
        const parts = sel.split(/\s+/).filter((p) => p && p !== ">" && p !== "+" && p !== "~");
        if (parts.length < 2) continue;
        const anc = parts[0];
        if (!anc.startsWith(".")) continue;         // :is(…)/[attr] roots are the band list itself
        scanned++;
        if (BAND_SCOPE_EXEMPT.has(anc.split(".").slice(0, 2).join("."))) continue;
        // Covered when ANY class in the leading compound is a declared band —
        // that is what makes `.lw-section.dark` legal without naming it.
        const classes = [...anc.matchAll(/\.([A-Za-z0-9_-]+)/g)].map((c) => c[1]);
        if (classes.some((c) => declared.has(c))) continue;
        if (!offenders.has(anc)) offenders.set(anc, []);
        offenders.get(anc).push(layer + " — " + sel);
      }
    }
  }
  return { offenders, scanned };
}

/* =============================================================================
   7. REPORT
   ============================================================================= */

const { failPairs: parityFails, warnings: parityWarnings } = parity();
const { offenders: bandOffenders, scanned: bandScanned } = bandScopes();
const logoFails = logoStops();
const emailFails = emailLiterals();
const { fails: divergenceFails, compared: divergenceCount } = darkScopeDivergence();

console.log(`\n${C.bold}LeanWise Design System — derived WCAG contrast gate${C.reset}`);
console.log(`${C.dim}canonical scopes: light (:root) · dark (:root ⊕ .dark) · media-dark (:root ⊕ @media${C.reset}`);
console.log(`${C.dim}(prefers-color-scheme: dark) :root, in source order — the no-class OS-preference page).${C.reset}`);
console.log(`${C.dim}Every pair asserted in dark is asserted in media-dark too.${C.reset}\n`);

// Group rows for readability; emit a header per group.
const groups = [];
let last = null;
for (const r of rows) {
  if (r.group !== last) { groups.push([]); last = r.group; }
  groups[groups.length - 1].push(r);
}

const w = Math.max(...rows.map((r) => r.pair.length));
for (const grp of groups) {
  console.log(`${C.dim}— ${grp[0].group} —${C.reset}`);
  for (const r of grp) {
    const mark = r.status === "PASS" ? `${C.green}✓${C.reset}` : r.status === "MISS" ? `${C.yellow}?${C.reset}` : `${C.red}✗${C.reset}`;
    const ratioCol = r.ratio.padStart(5);
    const scopeTag = `${C.dim}[${r.scope.padEnd(10)}]${C.reset}`;
    console.log(`  ${mark} ${ratioCol}  ${scopeTag} ${r.pair.padEnd(w)}  ${C.dim}${r.label}${C.reset}`);
  }
  console.log();
}

if (composedFails.length) {
  console.log(`${C.bold}Composed pairs below AA (derived from the CSS layers, not the manifest)${C.reset}`);
  for (const f of composedFails) {
    console.log(`  ${C.red}✗${C.reset} ${f.ratio.padStart(5)}  ${C.dim}[${f.scope.padEnd(10)}]${C.reset} ${f.fg} on ${f.bg}  ${C.dim}${f.where}${C.reset}`);
  }
  console.log();
  failed += composedFails.length;
}

if (divergenceFails.length) {
  console.log(`${C.bold}Dark-scope divergence (hard fail — .dark and the system-dark @media path resolve differently)${C.reset}`);
  for (const m of divergenceFails) console.log(`  ${C.red}✗${C.reset} ${m}`);
  console.log(`${C.dim}  A page with no class and the OS set to dark takes the @media path. A token that${C.reset}`);
  console.log(`${C.dim}  re-points in one dark scope and not the other ships two different dark themes.${C.reset}\n`);
  failed += divergenceFails.length;
}

if (parityFails.length) {
  console.log(`${C.bold}Dark-block parity (hard fail — explicit dark forms disagree)${C.reset}`);
  for (const m of parityFails) console.log(`  ${C.red}✗${C.reset} ${m}`);
  console.log();
  failed += parityFails.length;
}

if (logoFails.length) {
  console.log(`${C.bold}Logo gradient (hard fail — the SVG's literal stops drifted from tokens.css)${C.reset}`);
  for (const m of logoFails) console.log(`  ${C.red}✗${C.reset} ${m}`);
  console.log();
  failed += logoFails.length;
}

if (emailFails.length) {
  console.log(`${C.bold}email.css literals (hard fail — drifted from tokens.css)${C.reset}`);
  for (const m of emailFails) console.log(`  ${C.red}✗${C.reset} ${m}`);
  console.log();
  failed += emailFails.length;
}

if (parityWarnings.length) {
  console.log(`${C.bold}Dark-block parity (warnings — @media system-preference path)${C.reset}`);
  for (const m of parityWarnings) console.log(`  ${C.yellow}!${C.reset} ${m}`);
  console.log(`${C.dim}  Declaration shape only — the RENDERED result of the @media path is measured as${C.reset}`);
  console.log(`${C.dim}  the media-dark scope above, and compared to .dark token-for-token by the${C.reset}`);
  console.log(`${C.dim}  divergence check. A warning here with no failure above means the two blocks${C.reset}`);
  console.log(`${C.dim}  reach the same colour by different declarations. Fix tokens.css, not this gate.${C.reset}\n`);
}

/* =============================================================================
   SHADCN BRIDGE BINDINGS — the aliases whose NAME carries a contrast obligation.

   Everything above reads tokens.css and measures --lw-* pairs. shadcn.css is a
   second surface this gate never opened, and an alias there can point a correct
   token at the wrong ROLE without moving a single colour — so every pair in the
   manifest passes while a consumer renders the wrong tier.

   That is not hypothetical. `--input` pointed at --lw-line-strong (#D1D5DB, the
   strong DIVIDER, 1.47:1 on the page) while the design system's OWN controls —
   .lw-input, .lw-input-group, .lw-switch .track, .lw-check .box — all use
   --lw-line-control, whose token comment already recorded "3.29 on surface-0".
   Same system, same control, two answers, and only the bridge was wrong. The
   1.4.11 group added in v1.1.5 could not see it: it validates the TOKEN, and the
   token was fine.

   Keep this list short. It is for aliases where the shadcn NAME states a role
   whose contrast tier is not negotiable — a control boundary, a focus ring. An
   alias that is merely a surface or a fill belongs in MANIFEST, not here.
   ============================================================================= */

const SHADCN_PATH = join(ROOT, "shadcn.css");
const shadcnCss = stripComments(readFileSync(SHADCN_PATH, "utf8"));

/** alias -> the token(s) it may legitimately resolve to, and why. */
const ALIAS_BINDINGS = [
  {
    alias: "--input",
    allow: ["--lw-line-control-c"],
    why: "a CONTROL boundary (WCAG 1.4.11, 3:1) — not --lw-line-strong, which is the divider tier at 1.47:1",
  },
  {
    alias: "--ring",
    allow: ["--lw-brand-500-c", "--lw-brand-400-c"],
    why: "the focus indicator — must be the brand, and must clear 3:1 against the ground",
  },
];

const bindingFails = [];
for (const { alias, allow, why } of ALIAS_BINDINGS) {
  // Every declaration of the alias, in source order; the cascade gives the last
  // one per scope, and a scope-specific override (e.g. --ring on .dark) is
  // legitimate, so ALL of them must be in the allow-list.
  const found = [...shadcnCss.matchAll(new RegExp(`${alias}:\\s*var\\((--lw-[a-z0-9-]+)\\)`, "g"))].map((m) => m[1]);
  if (!found.length) {
    bindingFails.push(`${alias} is not declared in shadcn.css — the bridge no longer emits a name consumers rely on`);
    continue;
  }
  for (const token of found) {
    if (!allow.includes(token)) {
      bindingFails.push(`${alias} -> var(${token}); expected one of ${allow.join(", ")} — ${why}`);
    }
  }
}

if (bindingFails.length) {
  console.log(`${C.bold}shadcn bridge bindings (hard fail — an alias points at the wrong role)${C.reset}`);
  for (const m of bindingFails) console.log(`  ${C.red}✗${C.reset} ${m}`);
  console.log();
  failed += bindingFails.length;
}

/* ===========================================================================
   CATEGORICAL SEPARATION — the chart ramp.

   Contrast is the wrong measure for a series colour. Two chart colours can each
   clear AA against the page and still be indistinguishable FROM EACH OTHER, and
   that is the failure that matters in a legend: the reader cannot tell which
   line is which. Contrast is a ratio against a ground; separation is a distance
   between two colours.

   So: CIE76 dE over every pair in the ramp, in every scope. CIE76 rather than
   dE2000 because it is a plain Euclidean distance in Lab that anyone can verify
   by hand, and because the floor here is a coarse "are these obviously
   different" question, not a just-noticeable-difference one — the extra
   machinery of dE2000 would buy precision this decision does not use.

   The floor is derived, not invented: it is set just under the tightest pair in
   the ramp as it shipped through v1.1.x, so the existing palette passes and any
   NEW colour has to be at least as separable as the closest existing pair. That
   is the honest bar — it says "no worse than what we already ship" rather than
   asserting a number nobody measured.
   =========================================================================== */

const CHART_KEYS = Array.from({ length: 12 }, (_, i) => `chart-${i + 1}`);

/** sRGB -> CIE L*a*b*, D65. Takes this file's resolved `{kind,r,g,b,a}`.
    NOTE the channels here are 0-1, NOT 0-255 — `hslToRgb` above returns
    normalised values and `luminance` consumes them that way. Dividing by 255
    again collapses every colour to near-black, which showed up as dE 0.2 between
    obviously different hues on the first run of this check. */
function toLab({ r, g, b }) {
  const lin = (v) => (v <= 0.04045 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4);
  const [R, G, B] = [lin(r), lin(g), lin(b)];
  const X = (R * 0.4124 + G * 0.3576 + B * 0.1805) / 0.95047;
  const Y = (R * 0.2126 + G * 0.7152 + B * 0.0722) / 1.0;
  const Z = (R * 0.0193 + G * 0.1192 + B * 0.9505) / 1.08883;
  const f = (t) => (t > 0.008856 ? Math.cbrt(t) : 7.787 * t + 16 / 116);
  const [fx, fy, fz] = [f(X), f(Y), f(Z)];
  return [116 * fy - 16, 500 * (fx - fy), 200 * (fy - fz)];
}
const deltaE76 = (a, b) => {
  const [la, lb] = [toLab(a), toLab(b)];
  return Math.hypot(la[0] - lb[0], la[1] - lb[1], la[2] - lb[2]);
};

/* MEASURED against the shipped v1.1.8 ramp, not guessed: its tightest pair is
   chart-1 (brand cyan) vs chart-7 (light blue) at dE 20.0, in BOTH dark scopes.
   The floor sits just under that, so the palette passes as it stands and any new
   colour has to be at least as separable as the closest existing pair.

   That chart-1/chart-7 pair is genuinely tight and is the first thing to fix in a
   future palette pass — but widening it is a visible change to every chart in
   every consumer, so it does not belong in a release whose whole claim is that no
   pixel moved. Raising this number is a palette decision, not a tuning knob. */
const CHART_DE_FLOOR = 19;

const chartFails = [];
let chartPairs = 0;
let tightest = { d: Infinity, a: null, b: null, scope: null };
for (const scopeName of ["light", ...DARK_SCOPES]) {
  const present = CHART_KEYS.map((k) => [k, resolveColor(k, scopeName)]).filter(([, v]) => v);
  // A ramp member that exists in one scope and not another is the dark-scope
  // divergence bug in a new costume; the divergence check above owns that, so
  // here we only measure what resolved.
  for (let i = 0; i < present.length; i++) {
    for (let j = i + 1; j < present.length; j++) {
      chartPairs++;
      const d = deltaE76(present[i][1], present[j][1]);
      if (d < tightest.d) tightest = { d, a: present[i][0], b: present[j][0], scope: scopeName };
      if (d < CHART_DE_FLOOR) {
        chartFails.push(`${present[i][0]} vs ${present[j][0]} [${scopeName}] — dE ${d.toFixed(1)}, floor ${CHART_DE_FLOOR}`);
      }
    }
  }
}
if (chartFails.length) {
  console.log(`${C.bold}categorical separation (chart ramp — two series a reader cannot tell apart)${C.reset}`);
  for (const m of chartFails) console.log(`  ${C.red}✗${C.reset} ${m}`);
  console.log();
  failed += chartFails.length;
}

if (bandOffenders.size) {
  console.log(`${C.bold}band scope (an always-dark ground that does not establish the dark token scope)${C.reset}`);
  for (const [anc, sites] of bandOffenders) {
    console.log(`  ${C.red}✗${C.reset} ${anc} re-inks ${sites.length} descendant${sites.length > 1 ? "s" : ""} from the --lw-on-dark family`);
    console.log(`    ${C.dim}${sites[0]}${C.reset}`);
    console.log(`    ${C.dim}add it to tokens.css's :where(.lw-band-dark, …) list, or exempt it in BAND_SCOPE_EXEMPT with a reason${C.reset}`);
    failed++;
  }
  console.log();
}

const pairCount = rows.filter((r) => r.status !== "MISS").length;

if (failed) {
  console.error(`${C.red}${failed} pair(s) / parity check(s) below AA (${AA_TEXT}:1, or ${AA_LARGE}:1 large).${C.reset}`);
  console.error(`${C.red}Fix the token, not the test.${C.reset}\n`);
  process.exit(1);
}

const perScope = ["light", ...DARK_SCOPES]
  .map((s) => `${s} ${rows.filter((r) => r.scope === s && r.status !== "MISS").length}`)
  .join(" · ");

console.log(`${C.green}All ${pairCount} pairs pass WCAG AA (≥ ${AA_TEXT}:1).${C.reset}`);
console.log(`${C.dim}Across three canonical scopes — ${perScope} — plus ${divergenceCount} tokens compared${C.reset}`);
console.log(`${C.dim}between the two dark scopes. Coverage is derived from tokens.css via the${C.reset}`);
console.log(`${C.dim}composition manifest — add a pair to MANIFEST and it is checked in the${C.reset}`);
console.log(`${C.dim}scope(s) you declare; a "dark" pair is checked in the @media path too.${C.reset}\n`);
console.log(`${C.dim}Band scope: ${bandScanned} on-dark descendant rule(s) scanned, every ancestor a declared${C.reset}`);
console.log(`${C.dim}band in tokens.css (${BAND_SCOPE_EXEMPT.size} exempted by name: ${[...BAND_SCOPE_EXEMPT].join(", ")}).${C.reset}\n`);
console.log(`${C.dim}Categorical separation: ${chartPairs} chart pairs at dE >= ${CHART_DE_FLOOR}; tightest is${C.reset}`);
console.log(`${C.dim}${tightest.a} vs ${tightest.b} [${tightest.scope}] at dE ${tightest.d.toFixed(1)}.${C.reset}\n`);
