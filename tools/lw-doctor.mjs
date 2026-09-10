#!/usr/bin/env node
/**
 * lw-doctor — "what is wrong with the version I am pinned to?"
 *
 *   npx lw-doctor                 # run inside a CONSUMER
 *   node tools/lw-doctor.mjs --self-check    # run inside THIS repo (CI)
 *
 * A consumer cannot see any of this from inside their own repo. Their installed
 * tree is self-consistent: nothing in it signals that a later release fixed a
 * defect they are living with. The consumers table in CLAUDE.md was supposed to
 * be that signal and it has been wrong twice — most recently by eighteen tags,
 * on the flagship consumer, in the table anyone reasons from when judging
 * whether a change is safe to ship.
 *
 * So the direction is inverted: read the version LOCALLY, fetch the advisories
 * from the repo TIP. The newest release is the only thing that knows what is
 * wrong with the older ones, and a hand-maintained list at the other end cannot
 * know it by construction.
 *
 * `--self-check` re-derives every advisory's `count` from the current tree and
 * fails if one has gone stale. An advisory nobody re-checks is exactly the
 * hand-maintained fact this file exists to replace.
 */

import fs from "node:fs";
import path from "node:path";
import { execFileSync } from "node:child_process";
import { createRequire } from "node:module";
import { fileURLToPath } from "node:url";

const HERE = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(HERE, "..");
const SELF = process.argv.includes("--self-check");

const red = (s) => `\x1b[31m${s}\x1b[0m`;
const yellow = (s) => `\x1b[33m${s}\x1b[0m`;
const green = (s) => `\x1b[32m${s}\x1b[0m`;
const dim = (s) => `\x1b[2m${s}\x1b[0m`;
const bold = (s) => `\x1b[1m${s}\x1b[0m`;

const REMOTE = "https://raw.githubusercontent.com/Okeysir198/leanwise-design/main/advisories.json";

import { cmp, satisfies } from "./_semver.mjs";
import { hslToRgb } from "./_color.mjs";


/** Occurrences of `re` across every .jsx under components/<sub>, specimen cards excluded. */
function countInComponents(re, sub = "") {
  let n = 0;
  (function walk(d) {
    for (const e of fs.readdirSync(d)) {
      const p = path.join(d, e);
      if (fs.statSync(p).isDirectory()) { walk(p); continue; }
      if (!p.endsWith(".jsx") || p.endsWith(".card.jsx")) continue;
      n += (fs.readFileSync(p, "utf8").match(re) ?? []).length;
    }
  })(path.join(ROOT, "components", sub));
  return n;
}

/* ---- self-check: are the advisories still true of THIS tree? -------------- */

if (SELF) {
  const doc = JSON.parse(fs.readFileSync(path.join(ROOT, "advisories.json"), "utf8"));
  const problems = [];

  // Each count is re-derived from the tree, by the same logic its gate uses.
  const derive = {
    /* Both 1.3.1 advisories count the DEFECT, so both derive 0 in a fixed tree —
       no COUNTS_THE_FIX entry, and that is the stronger shape: the number goes to
       zero when the thing is gone, rather than describing the repair. */

    /* Rules whose selector LEADS with one of the five promoted components' own
       classes and are still in product.css. Leading compound, not "mentions the
       class anywhere": `.lw-toast .lw-icon-btn` and `.lw-kpi .d .lw-icon` are
       app-surface DELTAS on a shared control and belong exactly where they are.
       Eight of those remain and must not be counted, or this reads 8 forever and
       stops discriminating. */
    "stranded-marketing-css": () => {
      const OWN = /^\.lw-(avatar|empty|tabs|pagination|pag-[a-z]+|icon)\b/;
      const src = fs.readFileSync(path.join(ROOT, "product.css"), "utf8").replace(/\/\*[\s\S]*?\*\//g, "");
      let n = 0;
      for (const m of src.matchAll(/([^{}]+)\{[^{}]*\}/g)) {
        const sel = m[1].trim();
        if (!sel || sel.startsWith("@")) continue;
        if (sel.split(",").some((s) => OWN.test(s.trim()))) n++;
      }
      return n;
    },

    /* The mechanically countable half: an accessible name or a tooltip written as
       a STRING LITERAL rather than as `{prop}`. It is a proxy — the audit also
       found rendered text and `.lw-sr-only` words, which no regex separates from
       markup reliably — but it is the half that cannot be argued with, it is the
       half that hurts a screen-reader user most, and it is zero. `countMeans`
       says so, because a proxy presented as a total is the hand-maintained fact
       this file exists to replace. */
    "hardcoded-display-text": () => {
      let n = 0;
      (function walk(d) {
        for (const e of fs.readdirSync(d)) {
          const p = path.join(d, e);
          if (fs.statSync(p).isDirectory()) { walk(p); continue; }
          // `*.card.jsx` is a specimen card's body (tools/lw-cards.mjs), not a component.
          if (!p.endsWith(".jsx") || p.endsWith(".card.jsx")) continue;
          n += (fs.readFileSync(p, "utf8").match(/(?:aria-label|title|placeholder|alt)="[^"]*"/g) ?? []).length;
        }
      })(path.join(ROOT, "components"));
      return n;
    },
    /* The count is the BLAST RADIUS: how many specimen cards mount a React root,
       and therefore how many rendered nothing while _ds_bundle.js was emitting
       jsx-runtime imports. The authoritative measurement is check:a11y — its
       rebuilt guard fails on an uncaught page error and on any empty root — but
       that needs a browser, and this self-check must stay headless and fast. So
       the derivation is the static half of the same question, read off the SAME
       card list both browser gates enumerate: every card in _ds_manifest.json
       whose script mounts a root. Add a React card and this goes stale, which is
       correct — the advisory's number is a claim about the card set. */
    "blank-specimen-cards": () => {
      const manifest = JSON.parse(fs.readFileSync(path.join(ROOT, "_ds_manifest.json"), "utf8"));
      return (manifest.cards ?? []).filter((c) => {
        const p = path.join(ROOT, c.path);
        if (!fs.existsSync(p)) return false;
        // Since v1.13.0 a card's script is the `<name>.card.jsx` beside it (tools/lw-cards.mjs),
        // so the mount call lives there, not inline in the .html.
        const jsx = p.replace(/\.card\.html$/, ".card.jsx");
        const src = fs.readFileSync(p, "utf8") + (fs.existsSync(jsx) ? fs.readFileSync(jsx, "utf8") : "");
        return /ReactDOM\.(createRoot|hydrateRoot|render)\s*\(/.test(src);
      }).length;
    },
    "no-use-client": () => {
      let n = 0;
      (function walk(d) {
        for (const e of fs.readdirSync(d)) {
          const p = path.join(d, e);
          if (fs.statSync(p).isDirectory()) { walk(p); continue; }
          if (!/\.(jsx|js)$/.test(p)) continue;
          if (/^\s*["']use client["']/.test(fs.readFileSync(p, "utf8"))) n++;
        }
      })(path.join(ROOT, "components"));
      for (const f of ["hooks.js", "brand.js", "react.js"]) {
        const p = path.join(ROOT, f);
        if (fs.existsSync(p) && /^\s*["']use client["']/.test(fs.readFileSync(p, "utf8"))) n++;
      }
      return n;
    },
    "no-dist": () => {
      const dist = path.join(ROOT, "dist");
      if (!fs.existsSync(dist)) return 0;
      let n = 0;
      (function walk(d) {
        for (const e of fs.readdirSync(d)) {
          const p = path.join(d, e);
          if (fs.statSync(p).isDirectory()) walk(p); else if (p.endsWith(".js")) n++;
        }
      })(dist);
      return n;
    },
    "bin-missing-under-pnpm": () =>
      Object.keys(JSON.parse(fs.readFileSync(path.join(ROOT, "package.json"), "utf8")).bin ?? {})
        .filter((k) => k === "lw-token-lint").length,
    "iconname-incomplete": () => {
      const icon = fs.readFileSync(path.join(ROOT, "components/primitives/Icon.jsx"), "utf8");
      const body = icon.slice(icon.indexOf("const ICONS"), icon.indexOf("export function Icon"));
      const glyphs = [...body.matchAll(/^\s+"?([a-zA-Z0-9-]+)"?\s*:\s*\[/gm)].length;
      const dts = fs.readFileSync(path.join(ROOT, "components/primitives/Icon.d.ts"), "utf8");
      const listed = (dts.match(/IconName\s*=\s*([\s\S]*?);/)?.[1].match(/"[a-z0-9-]+"/g) ?? []).length;
      return glyphs - listed;   // 0 once generated; the advisory records the OLD gap
    },
    "jsx-namespace-react19": () => {
      let n = 0;
      (function walk(d) {
        for (const e of fs.readdirSync(d)) {
          const p = path.join(d, e);
          if (fs.statSync(p).isDirectory()) { walk(p); continue; }
          if (!p.endsWith(".d.ts")) continue;
          n += (fs.readFileSync(p, "utf8").match(/(?<!\.)\bJSX\.Element\b/g) ?? []).length;
        }
      })(path.join(ROOT, "components"));
      return n;
    },
    "base-css-unusable-in-tailwind": () => {
      const reset = path.join(ROOT, "reset.css");
      if (!fs.existsSync(reset)) return 0;
      const css = fs.readFileSync(reset, "utf8").replace(/\/\*[\s\S]*?\*\//g, "");
      // Count RULES, skipping at-rule preludes. Two wrong tries, both caught by
      // this self-check, which is the argument for deriving these numbers rather
      // than asserting them: excluding `@` from a character class does not help
      // (the match just starts after it, counting `@media (…)` as a rule), and
      // anchoring on `^|[};]` then MISSES the rule nested inside that @media.
      return [...css.matchAll(/([^{}]+)\{/g)]
        .map((m) => m[1].trim())
        .filter((sel) => sel && !sel.startsWith("@")).length;
    },
    "no-tailwind-v4-artifact": () => {
      const out = execFileSync("node", [path.join(HERE, "lw-presence.mjs")], { encoding: "utf8" });
      return Number(out.match(/OK — (\d+) name/)?.[1] ?? 0);
    },
    /* The SHORTFALL in px: declared sticky chrome minus the prose clearance that
       applies when an announcement bar is present. Static on purpose — the real
       defect was measured in a browser (27px, the announcement box rendering 35px
       rather than its 36px offset token), but a number this file records has to be
       re-derivable headlessly, and the declared values are.

       ⚠ REWRITTEN IN v3.1.0, AND THE REASON IS THE POINT OF THIS COMMENT. The
       first version pattern-matched the FIX rather than the BEHAVIOUR: it looked
       for a `:root:has(.lw-announce) … .lw-prose … scroll-margin-block-start`
       rule and fell back to a flat `--lw-space-64` when it found none. v3.1.0
       replaced that selector with a token re-point — strictly better, because the
       old rule reached into `.lw-prose` alone and left every other anchor target
       on an announced page (a `.lw-toc-sticky` rail, a consumer's `section[id]`)
       still broken — and this deriver promptly reported the defect as BACK, at
       exactly its historical 28px. A gate that recognises one spelling of a fix
       fails the release that improves it.

       So it now resolves the chain the CSS actually declares: what
       `.lw-prose :is(h2,h3,h4)` reads, what `--lw-anchor-offset` resolves to at
       `:root`, and whether `:root:has(.lw-announce)` re-points it. Deleting any
       link still makes this go non-zero — reverting the prose rule to
       `--lw-space-64`, dropping the announced re-point, or removing the token
       all land back at 28. */
    "announce-breaks-prose-anchors": () => {
      const num = (re, css, d) => Number(css.match(re)?.[1] ?? d);
      const base = fs.readFileSync(path.join(ROOT, "base.css"), "utf8");
      const mk = fs.readFileSync(path.join(ROOT, "marketing.css"), "utf8");
      const tok = fs.readFileSync(path.join(ROOT, "tokens.css"), "utf8");

      const space8 = num(/--lw-space-8:\s*(\d+)px/, tok, 8);
      const space64 = num(/--lw-space-64:\s*(\d+)px/, tok, 64);
      const topbarTok = num(/--lw-topbar-h:\s*(\d+)px/, tok, 0);
      // The bar may state its height literally or read the token; either is the
      // real number, and a missing token must not silently read as zero.
      const barLit = num(/\.lw-topbar\s*\{[^}]*?height:\s*(\d+)px/, base, 0);
      const bar = barLit || topbarTok || 56;
      const announce = num(/\.lw-announce\s*\+\s*\.lw-topbar\s*\{[^}]*?--lw-announce-h,\s*(\d+)px/, mk, 36);

      // Resolve a `calc()` of the three knobs this chain is allowed to use.
      const resolve = (expr) =>
        (/--lw-topbar-h/.test(expr) ? topbarTok : 0) +
        (/--lw-space-64/.test(expr) ? space64 : 0) +
        (/--lw-space-8/.test(expr) ? space8 : 0) +
        (/--lw-announce-h/.test(expr) ? num(/--lw-announce-h,\s*(\d+)px/, expr, announce) : 0);

      // 1. What does the prose heading actually read for its clearance?
      const proseExpr =
        base.match(/\.lw-prose\s*:is\(h2,\s*h3,\s*h4\)\s*\{[^}]*?scroll-margin-block-start:\s*([^;]+);/)?.[1] ?? "";
      if (!/--lw-anchor-offset/.test(proseExpr)) {
        // Pre-v3.1.0 shape: a flat value, plus whatever the old :has() override raised it to.
        const override = mk.match(
          /:root:has\(\.lw-announce\)[^{]*\.lw-prose[^{]*\{[^}]*?scroll-margin-block-start:\s*([^;]+);/,
        );
        const clearance = override ? resolve(override[1]) : resolve(proseExpr) || space64;
        return Math.max(0, announce + bar - clearance);
      }

      // 2. It reads the role. Resolve the role, under an announcement.
      const announced = mk.match(/:root:has\(\.lw-announce\)\s*\{[^}]*?--lw-anchor-offset:\s*([^;]+);/);
      const rootExpr = tok.match(/--lw-anchor-offset:\s*([^;]+);/)?.[1] ?? "";
      const clearance = announced ? resolve(announced[1]) : resolve(rootExpr);
      return Math.max(0, announce + bar - clearance);
    },
    /* The 25 roles that stayed on the PAGE theme inside `.lw-page-dark`: every
       channel the dark band re-points whose :root line is `hsl(var(--lw-<role>-c) …)`
       is a derived role, and a band member absent from the re-derive `:where()`
       list leaves all of them inheriting the document's colour. Same reading as
       `rederiveCompleteness()` in lw-contrast-check.mjs, kept regex-light so this
       stays headless; the count is (missing members) x (derived roles), so it is 0
       in the fixed tree and 25 again the moment `.lw-page-dark` drops off the list. */
    /* The three v2.0.0 advisories each count a DEFECT that is now gone, so each
       derives 0 in this tree. All three walk components/ for a literal the old
       implementation could not exist without: the tooltip's `data-tip=`
       attribute, the popover's `function place(` engine, the modal's
       `.showModal()` call. A re-pull from the design project that brings any
       of them back turns the number non-zero by name. */
    "tooltip-invisible-to-assistive-tech": () => countInComponents(/\bdata-tip=/g),
    "popover-no-horizontal-flip": () => countInComponents(/\bfunction place\(/g, "overlays"),
    "modal-no-scroll-lock": () => countInComponents(/\.showModal\(\)/g),

    /* v3.0.0. Each counts the DEFECT, so a fixed tree derives 0 — the stronger
       shape, because the number goes to zero when the thing is gone rather than
       describing the repair. */

    /* An outside-month day painting the faint tier. The rule is one line; the
       count is how many such lines still read `--lw-fg-faint`. */
    "calendar-outside-days-fail-aa": () => {
      const css = fs.readFileSync(path.join(ROOT, "product.css"), "utf8").replace(/\/\*[\s\S]*?\*\//g, "");
      return [...css.matchAll(/\.lw-cal-day\[data-outside[^{]*\{([^}]*)\}/g)]
        .filter((m) => /--lw-fg-faint/.test(m[1])).length;
    },

    /* Names in the forced-colors hide list that no layer defines. A selector
       matching nothing costs nothing and reports nothing, which is exactly why
       the two phantoms survived — so the derivation is "is this class defined
       anywhere", asked of the list itself. */
    "forced-colors-grounds-not-hidden": () => {
      /* Count ground WRAPPERS hidden OUTRIGHT by the forced-colors rule. A
         wrapper hidden outright takes its content with it — the v3.0.0
         regression. The same name carrying a `::before`/`::after` is the
         correct form and counts 0.

         ⚠ Split the selector list at DEPTH ZERO. A naive `.split(",")` tears
         `:is(.lw-page-dark, .lw-page-light, .lw-page-ground)::before` into
         three pieces, two of which look like bare wrappers — which is exactly
         how the first draft of this derivation read 4 against a correct tree. */
      const css = fs.readFileSync(path.join(ROOT, "base.css"), "utf8").replace(/\/\*[\s\S]*?\*\//g, "");
      const at = /@media\s*\(forced-colors:\s*active\)/.exec(css);
      if (!at) throw new Error("base.css has no forced-colors block");
      const WRAPPERS = [".lw-page-ground", ".lw-page-dark", ".lw-page-light", ".lw-aurora"];
      const topLevel = (list) => {
        const out = []; let depth = 0, cur = "";
        for (const ch of list) {
          if (ch === "(") depth++;
          else if (ch === ")") depth--;
          if (ch === "," && depth === 0) { out.push(cur); cur = ""; continue; }
          cur += ch;
        }
        if (cur.trim()) out.push(cur);
        return out.map((x) => x.trim()).filter(Boolean);
      };
      let n = 0;
      for (const m of css.slice(at.index).matchAll(/([^{}]+)\{\s*display:\s*none;\s*\}/g)) {
        for (const sel of topLevel(m[1])) {
          if (sel.includes("::")) continue;                 // a pseudo-element — the correct form
          if (WRAPPERS.some((w) => sel.split(/[\s>+~]/).includes(w) || sel === w)) { n++; continue; }
          const is = /:is\(([^)]*)\)\s*$/.exec(sel);        // `:is(a, b)` with nothing after it
          if (is && is[1].split(",").some((x) => WRAPPERS.includes(x.trim()))) n++;
        }
      }
      return n;
    },


    "page-dark-derived-roles": () => {
      const css = fs.readFileSync(path.join(ROOT, "tokens.css"), "utf8").replace(/\/\*[\s\S]*?\*\//g, "");
      const blocks = [...css.matchAll(/([^{}]+)\{([^{}]*)\}/g)].map((m) => ({ sel: m[1].trim(), body: m[2] }));
      const members = (sel) => sel.match(/^:where\(([\s\S]*)\)$/)?.[1].split(",").map((m) => m.trim()).filter(Boolean);
      const decls = (body) => Object.fromEntries([...body.matchAll(/(--lw-[\w-]+)\s*:\s*([^;]+);/g)].map((m) => [m[1], m[2].trim()]));
      const root = decls(blocks.filter((b) => b.sel === ":root").map((b) => b.body).join("\n"));
      const where = blocks.map((b) => ({ ...b, ms: members(b.sel) })).filter((b) => b.ms);
      const dark = where.find((b) => b.ms.includes(".lw-band-dark") && !b.ms.includes(".lw-band-light"));
      const light = where.find((b) => b.ms.includes(".lw-band-light") && !b.ms.includes(".lw-band-dark"));
      const rederive = where.find((b) => b.ms.includes(".lw-band-dark") && b.ms.includes(".lw-band-light"));
      if (!dark || !light || !rederive) throw new Error("tokens.css band or re-derive block not found");
      let roles = 0;
      for (const k of Object.keys(decls(dark.body))) {
        if (!k.endsWith("-c")) continue;
        const role = k.slice(0, -2);
        if (new RegExp(`^hsl\\(\\s*var\\(${role}-c\\)`).test(root[role] ?? "")) roles++;
      }
      const missing = [...dark.ms, ...light.ms].filter((m) => !rederive.ms.includes(m)).length;
      return missing * roles;
    },
  };

  // For a defect that is now FIXED, the derived count should be 0 (the defect is
  // gone) — except where the advisory's count describes the FIX rather than the
  // defect, which is the case for the four below.
  const COUNTS_THE_FIX = new Set(["no-use-client", "no-dist", "bin-missing-under-pnpm",
                                  "base-css-unusable-in-tailwind", "no-tailwind-v4-artifact",
                                  // The card set still exists in the fixed tree; what changed
                                  // is that its cards now render. Zero would mean the cards
                                  // were deleted, which is not the fix.
                                  "blank-specimen-cards"]);

  for (const a of doc.advisories) {
    const fn = derive[a.id];
    if (!fn) { problems.push(`${a.id}: no derivation — the count cannot be re-checked, which is what this file is for`); continue; }
    let got;
    try { got = fn(); } catch (e) { problems.push(`${a.id}: derivation threw — ${e.message.split("\n")[0]}`); continue; }
    const want = COUNTS_THE_FIX.has(a.id) ? a.count : 0;
    if (got !== want) {
      problems.push(`${a.id}: recorded ${a.count} (${a.countMeans}); the tree now derives ${got}, expected ${want}`);
    }
  }

  if (problems.length) {
    console.error(red(`\nlw-doctor --self-check: ${problems.length} stale advisory(ies).\n`));
    for (const p of problems) console.error(`  - ${p}`);
    console.error("\n  Every count here is supposed to be MEASURED, not asserted. Re-measure and\n  update advisories.json, or the file becomes the same hand-maintained fact it\n  was written to replace.\n");
    process.exit(1);
  }
  console.log(green(`lw-doctor: OK — all ${doc.advisories.length} advisories verified against the current tree.`));
  process.exit(0);
}

/* ---- consumer mode -------------------------------------------------------- */

const require = createRequire(path.join(process.cwd(), "package.json"));
let installed, pkgPath;
try {
  pkgPath = require.resolve("@leanwise/design/package.json");
  installed = JSON.parse(fs.readFileSync(pkgPath, "utf8")).version;
} catch {
  console.error(red("lw-doctor: @leanwise/design is not installed here. Run this from a consumer's root."));
  process.exit(2);
}

let doc;
try {
  const res = await fetch(REMOTE, { signal: AbortSignal.timeout(8000) });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  doc = await res.json();
} catch (e) {
  // Fall back to the installed copy, and SAY SO — an advisory list from the
  // version you are pinned to cannot know what later releases fixed, which is
  // the entire premise of this tool.
  const local = path.join(path.dirname(pkgPath), "advisories.json");
  if (!fs.existsSync(local)) {
    console.error(red(`lw-doctor: could not reach the advisory list (${e.message}) and the installed copy has none.`));
    process.exit(2);
  }
  doc = JSON.parse(fs.readFileSync(local, "utf8"));
  console.log(yellow(`  ! Could not reach the repo (${e.message}); reading the advisories shipped with ${installed}.`));
  console.log(yellow("    Those cannot describe anything fixed after it. Treat this as a floor.\n"));
}

const hits = doc.advisories.filter((a) => satisfies(installed, a.affects));
console.log(`\n${bold("@leanwise/design")} ${dim(pkgPath.replace(/\/package\.json$/, ""))}`);
console.log(`installed: ${bold(installed)}\n`);

if (!hits.length) {
  console.log(green(`No advisories affect ${installed}.`));
  process.exit(0);
}

const order = { high: 0, medium: 1, low: 2 };
hits.sort((a, b) => (order[a.severity] ?? 9) - (order[b.severity] ?? 9));
for (const a of hits) {
  const tag = a.severity === "high" ? red("high  ") : a.severity === "medium" ? yellow("medium") : dim("low   ");
  console.log(`${tag} ${bold(a.title)}`);
  console.log(`       ${a.detail}`);
  console.log(dim(`       ${a.count} ${a.countMeans} · measured by ${a.measuredBy} · fixed in ${a.fixedIn}\n`));
}
const newest = hits.map((a) => a.fixedIn).sort(cmp).pop();
console.log(`${hits.length} advisory(ies). Upgrading to ${bold(newest)} clears all of them.`);
console.log(dim("Read that release's CHANGELOG entry first — 1.2.0 moves nine bare-element"));
console.log(dim("rules out of base.css, which is a one-line import change for a vanilla consumer.\n"));
