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
 *   3. Build two CANONICAL scopes — light (:root) and dark (:root ⊕ .dark).
 *   4. Evaluate every pair in MANIFEST against the scope(s) it declares.
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

/* PATH NOTE — this folder sits under templates/ because everything outside it is
   compiled into the design system's browser bundle, and a Node script (node:fs,
   node:path) cannot be. ROOT is therefore two levels up, not one. Through v1.0
   this file lived here with a one-level ROOT, which resolved to
   templates/tokens.css — a file that has never existed, so the gate could not
   run at all. The npm scripts (`npm run check`) are the supported entry point. */
const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..", "..");
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
  { group: "soft chips", fg: "danger-text",  bg: "danger-soft",  scope: "light", label: "danger badge on light tint" },
  { group: "soft chips", fg: "cta-text",     bg: "cta-soft",     scope: "light", label: "CTA badge on light tint" },
  { group: "soft chips", fg: "success-on",   bg: "success-soft", scope: "dark",  label: "success badge on dark tint" },
  { group: "soft chips", fg: "warning-on",   bg: "warning-soft", scope: "dark",  label: "warning badge on dark tint" },
  { group: "soft chips", fg: "danger-on",    bg: "danger-soft",  scope: "dark",  label: "danger badge on dark tint" },
  { group: "soft chips", fg: "cta-400",      bg: "cta-soft",     scope: "dark",  label: "CTA badge on dark tint" },
  { group: "soft chips", fg: "cta-text",     bg: "cta-soft",     scope: "dark",  label: "role: --lw-cta-text on the dark CTA tint" },

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
];

/* =============================================================================
   2. TOKENS.CSS PARSER
   ============================================================================= */

const cssRaw = readFileSync(TOKENS_PATH, "utf8");
// Strip comments before brace-walking — prose mentioning `{` or a triple would
// otherwise fool the splitter, and declarations inside `/* *\/` are inert.
const css = cssRaw.replace(/\/\*[\s\S]*?\*\//g, "");

/**
 * Split into (selector, body) rule pairs via a brace-depth walk. Nested rules
 * (the `:root:not(…)` inside the @media block) surface as their OWN pair with
 * their direct body, so each scope's declarations are extracted exactly once.
 * Returns [{ selector, body }] in source order.
 */
function splitRules(src) {
  const rules = [];
  const stack = [];
  let buf = "";
  for (let i = 0; i < src.length; i++) {
    const c = src[i];
    if (c === "{") {
      stack.push({ selector: buf.trim(), start: i + 1 });
      buf = "";
    } else if (c === "}") {
      const top = stack.pop();
      if (top) rules.push({ selector: top.selector, body: src.slice(top.start, i) });
      buf = "";
    } else {
      buf += c;
    }
  }
  return rules;
}

/** First rule whose selector matches the regexp. Throws if absent. */
function findRule(rules, re, label) {
  const r = rules.find((r) => re.test(r.selector));
  if (!r) throw new Error(`theme block not found: ${label} (no selector matched ${re})`);
  return r;
}

/**
 * Declarations in a block body, keyed by the FULL property suffix after --lw-.
 * So `--lw-brand-500-c` → "brand-500-c", `--lw-bg-c` → "bg-c", `--lw-on-dark-3`
 * → "on-dark-3". Values are the raw authored string (triple / var() / hex / rgba).
 */
function declarationsIn(body) {
  const out = {};
  const re = /--lw-([a-z0-9-]+)\s*:\s*([^;]+);/g;
  let m;
  while ((m = re.exec(body))) out[m[1]] = m[2].trim();
  return out;
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
  // hsl()/hsla() derived lines, gradients, multi-value shadows: not solid colors.
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
    if (/^hsl\(/i.test(v) || /var\(/.test(v)) continue; // derived color / gradient ref
    const parsed = parseValue(v);
    if (parsed.kind === "rgb") scope[k] = parsed;
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
    return chase(scope, v.name, seen);
  }
  return v;
}

/* =============================================================================
   4. SCOPE ASSEMBLY + DARK-BLOCK PARITY GUARD
   ============================================================================= */

const rules = splitRules(css);

// Light defaults — the first bare :root. NOT :root[data-theme="dark"] / :root:not(…).
const lightDecls = declarationsIn(findRule(rules, /^:root\s*$/, ":root (light defaults)").body);
// The canonical dark overlay — the `.dark, [data-theme="dark"]` combined rule.
const darkClassDecls = declarationsIn(findRule(rules, /^\.dark\s*,/, ".dark, [data-theme=\"dark\"]").body);

// Dark = light ⊕ dark overlay (everything the dark block does NOT redeclare is
// inherited from :root — e.g. --lw-text-1-c stays navy, which is the whole reason
// --lw-on-brand-c points at it rather than at --lw-fg-c).
const darkDecls = { ...lightDecls, ...darkClassDecls };

const light = buildScope(lightDecls);
const dark = buildScope(darkDecls);

/**
 * Parity guard — the design intent (documented at tokens.css ≈ line 400) is that
 * every DARK context re-points the SAME set. The explicit attribute form
 * (:root[data-theme="dark"]) and the dark band (:where(.lw-band-dark)) MUST agree
 * with .dark declaration-for-declaration; a divergence here is a real drift bug
 * and fails the gate. The @media (system-preference) block is a documented subset
 * fallback — differences there are reported as WARNINGS, not failures, because
 * they point at a tokens.css gap to fix, not a pair this gate measures.
 *
 * Likewise :where(.lw-band-light) must reproduce the light role set.
 */
function parity() {
  const failPairs = []; // hard fails (explicit dark forms disagree)
  const warnings = [];  // soft (media block / informational)

  const want = [
    { label: ":root[data-theme=\"dark\"]", re: /^:root\[data-theme="dark"\]\s*$/, here: declarationsIn(findRule(rules, /^:root\[data-theme="dark"\]\s*$/, ":root[data-theme=\"dark\"]").body), strict: true },
    { label: ":where(.lw-band-dark)",     re: /^:where\(\.lw-band-dark\)\s*$/,    here: declarationsIn(findRule(rules, /^:where\(\.lw-band-dark\)\s*$/, ":where(.lw-band-dark)").body), strict: true },
    { label: "@media (prefers-color-scheme: dark)", re: /^:root:not\(\.light\):not\(\[data-theme="light"\]\)\s*$/, here: declarationsIn(findRule(rules, /^:root:not\(\.light\):not\(\[data-theme="light"\]\)\s*$/, "@media dark inner").body), strict: false },
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
  const bandLightDecls = declarationsIn(findRule(rules, /^:where\(\.lw-band-light\)\s*$/, ":where(.lw-band-light)").body);
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

const resolveColor = (name, scopeName) => {
  const scope = scopeName === "dark" ? dark : light;
  const v = scope[name];
  if (!v) return null;
  if (v.kind === "rgb") return v;
  return null; // cycle / missing — surfaced by chase() upstream; treat as unresolved here
};

let failed = 0;
const rows = [];

for (const entry of MANIFEST) {
  const scopes = entry.scope === "both" ? ["light", "dark"] : [entry.scope];
  for (const scopeName of scopes) {
    const fg = resolveColor(entry.fg, scopeName);
    const bg = resolveColor(entry.bg, scopeName);
    if (!fg || !bg) {
      rows.push({ scope: scopeName, group: entry.group, status: "MISS", ratio: "  ?  ", pair: `${entry.fg} on ${entry.bg}`, label: `unresolved token (${entry.fg || entry.bg})` });
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
      pair: `${entry.fg} on ${entry.bg}`,
      label: entry.label + (entry.scope === "both" ? "" : ""),
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
function logoStops() {
  const fails = [];
  const want = [
    { offset: "0", token: "navy-700" },
    // NOT brand-500. The artwork uses the mark's own cyan, which is ~5 points
    // lighter than the UI fill — the fill had to darken so white ink clears AA,
    // a constraint a logo does not carry. See --lw-logo-cyan-c in tokens.css.
    { offset: "1", token: "logo-cyan" },
  ];
  const toHex = ({ r, g, b }) =>
    "#" + [r, g, b].map((v) => Math.round(v * 255).toString(16).padStart(2, "0")).join("").toUpperCase();

  for (const file of ["logo-mark.svg", "logo-lockup.svg"]) {
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
    if (found.length === 0 || found.length % want.length !== 0) {
      fails.push(`assets/${file}: expected a multiple of ${want.length} gradient stops, found ${found.length}`);
      continue;
    }
    found.forEach(([, offset, hex], idx) => {
      const i = idx % want.length;
      const { offset: wantOffset, token } = want[i];
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
  return fails;
}

/* =============================================================================
   7. REPORT
   ============================================================================= */

const { failPairs: parityFails, warnings: parityWarnings } = parity();
const logoFails = logoStops();

console.log(`\n${C.bold}LeanWise Design System — derived WCAG contrast gate${C.reset}`);
console.log(`${C.dim}canonical scopes: light (:root) + dark (:root ⊕ .dark)${C.reset}\n`);

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
    const ratioCol = (r.status === "MISS" ? r.ratio : r.ratio).padStart(5);
    const scopeTag = `${C.dim}[${r.scope.padEnd(5)}]${C.reset}`;
    console.log(`  ${mark} ${ratioCol}  ${scopeTag} ${r.pair.padEnd(w)}  ${C.dim}${r.label}${C.reset}`);
  }
  console.log();
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

if (parityWarnings.length) {
  console.log(`${C.bold}Dark-block parity (warnings — @media system-preference path)${C.reset}`);
  for (const m of parityWarnings) console.log(`  ${C.yellow}!${C.reset} ${m}`);
  console.log(`${C.dim}  The .dark / [data-theme=\"dark\"] / .lw-band-dark forms (the ones this gate${C.reset}`);
  console.log(`${C.dim}  measures) all agree and pass. The @media block above omits a re-point; under${C.reset}`);
  console.log(`${C.dim}  pure system-dark preference a pair may break. Fix tokens.css, not this gate.${C.reset}\n`);
}

const pairCount = rows.filter((r) => r.status !== "MISS").length;

if (failed) {
  console.error(`${C.red}${failed} pair(s) / parity check(s) below AA (${AA_TEXT}:1, or ${AA_LARGE}:1 large).${C.reset}`);
  console.error(`${C.red}Fix the token, not the test.${C.reset}\n`);
  process.exit(1);
}

console.log(`${C.green}All ${pairCount} pairs pass WCAG AA (≥ ${AA_TEXT}:1).${C.reset}`);
console.log(`${C.dim}Coverage is derived from tokens.css via the composition manifest — add a pair${C.reset}`);
console.log(`${C.dim}to MANIFEST and it is checked in the scope(s) you declare.${C.reset}\n`);
