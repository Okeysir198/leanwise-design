#!/usr/bin/env node
/**
 * lw-presence — the PRESENCE gate.
 *
 *   node templates/_tooling/lw-presence.mjs
 *   node templates/_tooling/lw-presence.mjs --list
 *
 * Every other gate in this package is a deny-list or a value check: the token
 * lint matches raw hex and palette escapes, the contrast check measures pairs
 * that exist, the DTCG check compares scopes that are declared. None of them can
 * see an ABSENCE — a name a consumer writes that the design system no longer
 * offers. In Tailwind v4 that is the dominant failure mode, because an
 * unresolvable utility is not an error: it emits no CSS, the element renders
 * unstyled, and the build stays green.
 *
 * Four checks. The first three are structural; the fourth asks the compiler.
 *
 *   1. v3 <-> v4 PARITY. `tailwind-preset.cjs` (v3) and `theme.css` (v4) are two
 *      spellings of one vocabulary. Anything in one and not the other is a name
 *      that works in half the consumers. That gap is how tss-app ended up
 *      hand-writing ~600 lines and still losing the fontSize roles, all four
 *      backgroundImage surfaces, both custom durations, the container and every
 *      keyframe.
 *
 *   2. THE BARE-KEY RULE. A `--x-*: initial` namespace reset removes Tailwind's
 *      unsuffixed `x` utility along with the tiers it is there to force. That
 *      cost tss-app its default Button shadow once and 106 square corners a
 *      second time, both silently. Every reset must ship its bare `--x`.
 *
 *   3. SHADCN COMPLETENESS. Every custom property shadcn's own components read
 *      must exist in shadcn.css. A missing one renders a real component
 *      unstyled in every consumer at once.
 *
 *   4. IT ACTUALLY COMPILES. The three above compare names in text files, and
 *      would all pass a theme.css with a missing brace or a namespace Tailwind
 *      has since renamed. So the documented import chain is run through the real
 *      compiler and every registered name is asserted to yield a utility. The
 *      class list is derived from check 1's rows, so it cannot fall behind.
 *
 * The v3 preset is the source of truth for check 1 only in the sense that the
 * two must AGREE — adding a name to either side alone fails, which is the point.
 */

import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { createRequire } from "node:module";
import { fileURLToPath } from "node:url";

const HERE = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(HERE, "..", "..");
const LIST = process.argv.includes("--list");
const require = createRequire(import.meta.url);

const red = (s) => `\x1b[31m${s}\x1b[0m`;
const green = (s) => `\x1b[32m${s}\x1b[0m`;
const dim = (s) => `\x1b[2m${s}\x1b[0m`;

/* ---------------------------------------------------------------------------
 * The map between a v3 `theme.extend` family and its v4 `@theme` namespace.
 *
 * `utility` marks a family v4 has NO namespace for — those live in theme.css as
 * `@utility` rules, so parity is checked against the rule names instead of
 * against `--ns-key`. Probed against the real compiler, not assumed.
 * ------------------------------------------------------------------------- */
const FAMILIES = {
  colors: { ns: "color" },
  borderRadius: { ns: "radius" },
  fontFamily: { ns: "font" },
  fontSize: { ns: "text" },
  boxShadow: { ns: "shadow" },
  transitionTimingFunction: { ns: "ease" },
  backgroundImage: { ns: "background-image" },
  animation: { ns: "animate" },
  keyframes: { keyframes: true },
  transitionDuration: { utility: true, rename: (k) => (k === "DEFAULT" ? "duration-base" : `duration-${k}`) },
};

/** v3 nests `{ primary: { DEFAULT, foreground } }`; v4 is flat. Flatten alike. */
function flatten(family, value, prefix = []) {
  if (value === null || typeof value !== "object" || Array.isArray(value)) {
    const parts = [...prefix].filter((p) => p !== "DEFAULT");
    return [parts.join("-")];
  }
  return Object.entries(value).flatMap(([k, v]) => flatten(family, v, [...prefix, k]));
}

/* ---- what v3 offers ------------------------------------------------------ */

const preset = require(path.join(ROOT, "tailwind-preset.cjs"));
const v3 = new Map(); // "family" -> Set(logical key)
for (const [family, cfg] of Object.entries(FAMILIES)) {
  const src = preset.theme.extend?.[family];
  if (!src) { v3.set(family, new Set()); continue; }
  // `keyframes` and the @utility families are flat already; only the theme
  // families nest. Do NOT filter out the empty string — it is how a v3 `DEFAULT`
  // arm spells itself (`borderRadius.DEFAULT` -> the bare `--radius`), and
  // dropping it made `--radius` and `--shadow` look like v4-only inventions.
  const keys = cfg.keyframes || cfg.utility
    ? Object.keys(src)
    : Object.entries(src).flatMap(([k, v]) => flatten(family, v, [k]));
  v3.set(family, new Set(keys));
}
// `container` is a top-level v3 theme key, not an extend family.
const v3HasContainer = Boolean(preset.theme?.container);

/* ---- what v4 offers ------------------------------------------------------ */

const themePath = path.join(ROOT, "theme.css");
if (!fs.existsSync(themePath)) {
  console.error(red("lw-presence: theme.css is missing — the v4 half of the design system does not exist."));
  process.exit(1);
}
const themeSrc = fs.readFileSync(themePath, "utf8");
const themeClean = themeSrc.replace(/\/\*[\s\S]*?\*\//g, "");

/** All `--ns-key: value` declarations, minus the `--*--modifier` suffix forms. */
const declared = new Set();
for (const m of themeClean.matchAll(/(--[a-z0-9-]+)\s*:/g)) declared.add(m[1]);
const utilities = new Set([...themeClean.matchAll(/@utility\s+([a-z0-9-]+)/g)].map((m) => m[1]));
const keyframesDeclared = new Set([...themeClean.matchAll(/@keyframes\s+([a-z0-9-]+)/g)].map((m) => m[1]));

const problems = [];

/* ---- check 1: v3 <-> v4 parity ------------------------------------------- */

/* Names v3 has to spell out and v4 ships as a STATIC utility, so registering
   them would be wrong rather than merely redundant.
   `shadow-none` is the whole list, and the distinction is worth stating because
   it is the opposite of the `rounded` case: both `--radius-*` and `--shadow-*`
   are namespaces you can reset, but `rounded` (bare) is generated FROM the
   namespace and dies with it, while `shadow-none` is a hand-written rule in
   Tailwind's core and survives. Verified against the compiler both ways.
   Declaring `--shadow-none: none` would also change behaviour: v4's static rule
   emits `0 0 #0000`, which still COMPOSES with `ring` and `inset-shadow`,
   whereas a literal `none` blows those away. */
const V4_STATIC = new Set(["boxShadow:none"]);

const rows = [];
for (const [family, cfg] of Object.entries(FAMILIES)) {
  for (const key of v3.get(family)) {
    if (V4_STATIC.has(`${family}:${key}`)) continue;
    let v4name, present;
    if (cfg.keyframes) {
      v4name = `@keyframes ${key}`;
      present = keyframesDeclared.has(key);
    } else if (cfg.utility) {
      v4name = `@utility ${cfg.rename(key)}`;
      present = utilities.has(cfg.rename(key));
    } else {
      v4name = key ? `--${cfg.ns}-${key}` : `--${cfg.ns}`;
      present = declared.has(v4name);
    }
    rows.push([family, key || "(DEFAULT)", v4name, present]);
    if (!present) problems.push([`v3 family \`${family}\` offers \`${key || "DEFAULT"}\`; theme.css has no ${v4name}`]);
  }
}
if (v3HasContainer && !utilities.has("container")) {
  problems.push(["v3 defines `theme.container`; theme.css has no `@utility container`"]);
}

// The other direction: a v4 name with no v3 counterpart.
const expectedV4 = new Set(rows.filter((r) => r[2].startsWith("--")).map((r) => r[2]));
for (const name of declared) {
  const m = name.match(/^--(color|radius|font|text|shadow|ease|background-image|animate)(?:-(.*))?$/);
  if (!m) continue;
  // Skip the `--text-h1--line-height` modifier form. Test AFTER the leading
  // `--`, not on the whole name: `name.includes("--")` is true for every custom
  // property there is, so the first draft of this line skipped the entire loop
  // and the reverse-parity check silently never ran. Mutation testing found it.
  if (name.slice(2).includes("--")) continue;
  if (name.endsWith("-*")) continue;            // a namespace reset
  if (expectedV4.has(name)) continue;
  problems.push([`theme.css declares \`${name}\`, which the v3 preset does not offer — a v3 consumer cannot use it`]);
}

/* ---- check 2: the bare-key rule ------------------------------------------ */

for (const m of themeClean.matchAll(/(--[a-z0-9-]+)-\*\s*:\s*initial/g)) {
  const bare = m[1];
  if (!declared.has(bare)) {
    problems.push([
      `\`${bare}-*: initial\` resets the namespace but \`${bare}\` is never declared — ` +
      `the unsuffixed utility will emit NO CSS`,
    ]);
  }
}

/* ---- check 3: shadcn completeness ---------------------------------------- */

/* Every custom property shadcn's own component set reads. Checked in on purpose:
   the list is what the COMPONENTS require, not what we happen to ship, so it only
   changes when shadcn does — which is what makes it a real assertion rather than
   a restatement of shadcn.css.

   The sidebar and chart names were the v1.2 gap and are now shipped, so they moved
   from the "known absent" list into this one. `--info` is the only name shadcn
   offers that this system still declines, and that is a deliberate palette
   decision recorded in shadcn.css, not an oversight — it is listed as a known gap
   below rather than a failure. */
const SHADCN_REQUIRED = [
  "--background", "--foreground", "--card", "--card-foreground",
  "--popover", "--popover-foreground", "--primary", "--primary-foreground",
  "--secondary", "--secondary-foreground", "--muted", "--muted-foreground",
  "--accent", "--accent-foreground", "--destructive", "--destructive-foreground",
  "--border", "--input", "--ring", "--radius",
];
const SHADCN_REQUIRED_SIDEBAR = [
  "--sidebar", "--sidebar-foreground", "--sidebar-primary", "--sidebar-primary-foreground",
  "--sidebar-accent", "--sidebar-accent-foreground", "--sidebar-border", "--sidebar-ring",
];
const SHADCN_REQUIRED_CHART = ["--chart-1", "--chart-2", "--chart-3", "--chart-4", "--chart-5"];
SHADCN_REQUIRED.push(...SHADCN_REQUIRED_SIDEBAR, ...SHADCN_REQUIRED_CHART);
const SHADCN_KNOWN_GAPS = ["--info"];
const shadcnSrc = fs.readFileSync(path.join(ROOT, "shadcn.css"), "utf8").replace(/\/\*[\s\S]*?\*\//g, "");
const shadcnDeclared = new Set([...shadcnSrc.matchAll(/(--[a-z0-9-]+)\s*:/g)].map((m) => m[1]));
for (const name of SHADCN_REQUIRED) {
  if (!shadcnDeclared.has(name)) {
    problems.push([`shadcn.css is missing \`${name}\`, which shadcn's own components read`]);
  }
}
const gaps = SHADCN_KNOWN_GAPS.filter((n) => !shadcnDeclared.has(n));

/* ---- check 5: layer purity, in BOTH directions ---------------------------
 *
 * Un-layered CSS beats every Tailwind utility regardless of specificity, so a
 * bare `button { background: none; border: 0; padding: 0 }` in a component layer
 * strips every <Button> in a Tailwind app. That is why base.css was
 * un-importable by the consumers the README told to import it, and why the
 * bare-element rules moved to reset.css in v1.2.
 *
 * Asserted BOTH ways on purpose. Checking only that base.css has no bare
 * selectors would let the split quietly un-split from the other side — someone
 * adds `.lw-card` to reset.css, a vanilla consumer gets it, a Tailwind consumer
 * importing only base.css does not, and nothing says so.
 * ------------------------------------------------------------------------- */

/** Split a selector list on commas that are NOT inside ()/[] — `:where(a, button)`
    and `[data-x="a,b"]` are one selector, not two. Splitting naively reported
    phantom bare `button` and `input` rules on the first run of this check. */
function splitSelectors(prelude) {
  const out = [];
  let depth = 0, buf = "";
  for (const ch of prelude) {
    if (ch === "(" || ch === "[") depth++;
    else if (ch === ")" || ch === "]") depth--;
    if (ch === "," && depth === 0) { out.push(buf); buf = ""; continue; }
    buf += ch;
  }
  out.push(buf);
  return out.map((s) => s.trim()).filter(Boolean);
}

/** Every selector in a stylesheet, minus at-rule preludes and @keyframes stops. */
function selectorsOf(file) {
  let css = fs.readFileSync(file, "utf8").replace(/\/\*[\s\S]*?\*\//g, "");
  // Drop @keyframes bodies whole — `from`/`to`/`50%` are not selectors.
  css = css.replace(/@keyframes[^{]*\{(?:[^{}]*\{[^{}]*\})*[^{}]*\}/g, "");
  const out = [];
  for (const m of css.matchAll(/([^{}]+)\{/g)) {
    const prelude = m[1].trim();
    if (!prelude || prelude.startsWith("@")) continue;   // @media / @supports / @layer
    out.push(...splitSelectors(prelude));
  }
  return out;
}

/* Selectors that carry no class but still cannot collide with a consumer's
   markup: document-level pseudo-elements, and the opt-in band/theme attributes a
   consumer sets deliberately on a wrapper. */
const NOT_A_HAZARD = [
  /^::view-transition/,
  /^:root\b/,
  /^\[data-(band|theme|density)=/,
  /^:is\(/,          // `:is(.dark, [data-band="dark"], …)` — the band scopes
  /^:where\(/,
];

/**
 * The hazard is a rule that can match an element a Tailwind consumer styles, and
 * beat the utility on the un-layered cascade. That is precisely a selector with
 * NO class or id anywhere in it: `button`, `img`, `::selection`, `*`.
 *
 * A class ANYWHERE anchors the rule — `.lw-btn svg` only matches inside a
 * `.lw-btn`, which a Tailwind consumer does not have. An earlier draft required
 * the class to be on the SUBJECT and flagged every `.lw-btn svg` in the file;
 * the one before that required a `.lw-` prefix and flagged `[data-band] .brand-mark`.
 * Both were wrong in the same direction — over-strict rules get switched off.
 */
function isBare(sel) {
  if (NOT_A_HAZARD.some((re) => re.test(sel))) return false;
  return !/[.#]/.test(sel);
}

/* Un-anchored selectors that are DELIBERATE API, each with its reason. An
   exemption list is only honest if every row says why — an unexplained entry is
   how a gate turns into a formality.

   Keep this short. If it grows, the split has stopped being real. */
const LAYER_PURITY_EXEMPT = new Map([
  ['[role="tab"][aria-selected="true"]',
   "inside @media (forced-colors: active) — it is SUPPOSED to reach a consumer's " +
   "tabs, including a vendored shadcn Tabs, and only applies in Windows High Contrast"],
  ['[data-collapsed="true"]',
   "documented opt-in: an app frame that wraps its own chrome around the rail sets " +
   "the same attribute and reads the same width var, so collapse has one source"],
  ['[data-collapsed="true"] [data-collapse-hide]',
   "same contract — a child opts into being dropped when the rail collapses"],
  ['[data-collapsed="true"] [data-collapse-center]',
   "same contract — a child opts into becoming a centred icon slot"],
]);

const COMPONENT_LAYERS = ["base.css", "marketing.css", "product.css"];
for (const f of COMPONENT_LAYERS) {
  const p = path.join(ROOT, f);
  if (!fs.existsSync(p)) continue;
  const bare = selectorsOf(p).filter((sel) => isBare(sel) && !LAYER_PURITY_EXEMPT.has(sel));
  for (const sel of [...new Set(bare)].slice(0, 6)) {
    problems.push([
      `${f} has the un-scoped selector \`${sel}\` — un-layered element rules beat every ` +
      `Tailwind utility, so this makes ${f} unsafe for a Tailwind consumer. Move it to reset.css`,
    ]);
  }
}

const resetPath = path.join(ROOT, "reset.css");
if (!fs.existsSync(resetPath)) {
  problems.push(["reset.css is missing — the bare-element rules have nowhere to live"]);
} else {
  const scoped = selectorsOf(resetPath).filter((s) => !isBare(s));
  for (const sel of [...new Set(scoped)].slice(0, 6)) {
    problems.push([
      `reset.css has the component selector \`${sel}\` — reset.css is the bare-element file ` +
      `and is NOT imported by a Tailwind consumer, so anything scoped here is invisible to them. ` +
      `Move it to base.css`,
    ]);
  }
}

/* ---- check 4: does theme.css actually COMPILE? ---------------------------
 *
 * Checks 1-3 compare names in two text files. None of them would notice a
 * missing brace, a namespace Tailwind renamed, or a `--color-x: hsl(var(--y))`
 * whose `--y` does not exist — theme.css would be in perfect parity with the v3
 * preset and still produce nothing.
 *
 * So: run the real compiler over the documented import chain and assert every
 * registered name yields a utility. The class list is DERIVED from the parity
 * rows above, so it cannot fall behind — adding a token to theme.css
 * automatically adds it to this check.
 *
 * The devDependency is pinned to `^4`, deliberately looser than any consumer's
 * pin, so that a namespace change in a newer Tailwind fails HERE, in the design
 * system, before it reaches an app.
 * ------------------------------------------------------------------------- */

/** The utility a registered theme name is supposed to produce. */
function utilityFor(v4name) {
  const bg = (k) => (k ? `bg-${k}` : null);
  const map = {
    color: bg,
    "background-image": bg,
    radius: (k) => (k ? `rounded-${k}` : "rounded"),
    shadow: (k) => (k ? `shadow-${k}` : "shadow"),
    font: (k) => (k ? `font-${k}` : null),
    text: (k) => (k ? `text-${k}` : null),
    ease: (k) => (k ? `ease-${k}` : null),
    animate: (k) => (k ? `animate-${k}` : null),
  };
  const m = v4name.match(/^--(color|background-image|radius|shadow|font|text|ease|animate)(?:-(.+))?$/);
  return m ? map[m[1]](m[2] ?? "") : null;
}

const wanted = new Map(); // class -> the theme name it proves
for (const [, , v4name, present] of rows) {
  if (!present || !v4name.startsWith("--")) continue;
  const u = utilityFor(v4name);
  if (u) wanted.set(u, v4name);
}
for (const u of utilities) wanted.set(u, `@utility ${u}`);

let compiled = null;
try {
  const postcss = (await import("postcss")).default;
  const tw = (await import("@tailwindcss/postcss")).default;
  const probeDir = fs.mkdtempSync(path.join(os.tmpdir(), "lw-presence-"));
  const probeHtml = path.join(probeDir, "probe.html");
  fs.writeFileSync(probeHtml, `<div class="${[...wanted.keys()].join(" ")}"></div>`);
  // `source(none)` so ONLY the probe decides what is generated — otherwise a
  // utility could appear because some template happens to use it.
  const entry = [
    `@import "tailwindcss" source(none);`,
    `@source "${probeHtml}";`,
    `@import "${path.join(ROOT, "tokens.css")}";`,
    `@import "${path.join(ROOT, "shadcn.css")}";`,
    `@import "${path.join(ROOT, "theme.css")}";`,
  ].join("\n");
  compiled = (await postcss([tw()]).process(entry, { from: path.join(ROOT, ".lw-presence-probe.css") })).css;
  fs.rmSync(probeDir, { recursive: true, force: true });
} catch (e) {
  console.error(red("\nlw-presence: could not compile theme.css.\n"));
  console.error(`  ${e.message.split("\n").slice(0, 6).join("\n  ")}\n`);
  console.error(
    "  If Tailwind is simply not installed, run `npm install` — this check is not\n" +
    "  optional. A gate that skips itself when a tool is missing is how the token\n" +
    "  lint stopped running in a consumer's CI for months.\n",
  );
  process.exit(2);
}

for (const [cls, name] of wanted) {
  // Tailwind escapes `/` `.` `:` in the emitted selector; none of the derived
  // names carry those, but escape for the regex regardless. Note the leading
  // dot must be escaped too, or `.shadow` matches `@property --tw-shadow {`.
  const esc = "\\." + cls.replace(/[.*+?^${}()|[\]\\/:%]/g, "\\$&");
  if (!new RegExp(`${esc}\\s*(,|\\{)`).test(compiled)) {
    problems.push([`\`${name}\` is registered but \`${cls}\` emits NO CSS when theme.css is compiled`]);
  }
}

/* ---- report -------------------------------------------------------------- */

if (LIST) {
  let last = null;
  for (const [family, key, v4name, present] of rows) {
    if (family !== last) { console.log(`\n${family}`); last = family; }
    console.log(`  ${present ? "ok  " : red("GONE")} ${String(key).padEnd(22)} ${dim(v4name)}`);
  }
  console.log(`\ncontainer            ${utilities.has("container") ? "ok" : red("GONE")}`);
  console.log(`\nshadcn names known-absent (v1.2 work, not failures): ${gaps.length ? gaps.join(", ") : "none"}`);
  process.exit(0);
}

if (problems.length) {
  console.error(red(`\nlw-presence: ${problems.length} problem(s).\n`));
  for (const [p] of problems) console.error(`  - ${p}`);
  console.error(
    "\n  These are absences, and an absence is invisible everywhere else: Tailwind v4\n" +
    "  emits nothing for a name it cannot resolve, and every other gate here is a\n" +
    "  deny-list or a value check over names that already exist.\n",
  );
  process.exit(1);
}

const total = rows.length + (v3HasContainer ? 1 : 0);
console.log(
  green(`lw-presence: OK — ${total} name(s) offered identically by tailwind-preset.cjs (v3) and theme.css (v4); ` +
  `every namespace reset carries its bare key; shadcn's required properties all present; ` +
  `${wanted.size} utility(ies) verified against the compiler.`) +
  (gaps.length ? dim(`\n  (${gaps.length} shadcn name(s) knowingly absent: ${gaps.slice(0, 4).join(", ")}${gaps.length > 4 ? ", …" : ""})`) : ""),
);
