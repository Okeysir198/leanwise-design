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

/** Naive semver compare — enough for "1.2.0" style tags. */
const cmp = (a, b) => {
  const pa = String(a).replace(/^v/, "").split(".").map(Number);
  const pb = String(b).replace(/^v/, "").split(".").map(Number);
  for (let i = 0; i < 3; i++) if ((pa[i] ?? 0) !== (pb[i] ?? 0)) return (pa[i] ?? 0) - (pb[i] ?? 0);
  return 0;
};
const satisfies = (version, range) => {
  const m = range.match(/^([<>]=?)\s*(.+)$/);
  if (!m) return version === range;
  const c = cmp(version, m[2]);
  return { "<": c < 0, "<=": c <= 0, ">": c > 0, ">=": c >= 0 }[m[1]];
};

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
          if (!p.endsWith(".jsx")) continue;
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
        return fs.existsSync(p) && /ReactDOM\.(createRoot|hydrateRoot|render)\s*\(/.test(fs.readFileSync(p, "utf8"));
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
       re-derivable headlessly, and the three declared values are.

       Reads the clearance from the `:has(.lw-announce)` override if marketing.css
       carries one and falls back to base.css's flat --lw-space-64 if it does not,
       so deleting the fix makes this go non-zero again rather than silently pass. */
    "announce-breaks-prose-anchors": () => {
      const num = (re, css, d) => Number(css.match(re)?.[1] ?? d);
      const base = fs.readFileSync(path.join(ROOT, "base.css"), "utf8");
      const mk = fs.readFileSync(path.join(ROOT, "marketing.css"), "utf8");
      const tok = fs.readFileSync(path.join(ROOT, "tokens.css"), "utf8");

      const space64 = num(/--lw-space-64:\s*(\d+)px/, tok, 64);
      const bar = num(/\.lw-topbar\s*\{[^}]*?height:\s*(\d+)px/, base, 56);
      const announce = num(/\.lw-announce\s*\+\s*\.lw-topbar\s*\{[^}]*?--lw-announce-h,\s*(\d+)px/, mk, 36);

      // Does a rule raise the prose clearance while an announcement is present?
      const override = mk.match(
        /:root:has\(\.lw-announce\)[^{]*\.lw-prose[^{]*\{[^}]*?scroll-margin-block-start:\s*([^;]+);/,
      );
      let clearance = space64;
      if (override) {
        const expr = override[1];
        clearance =
          (/--lw-space-64/.test(expr) ? space64 : 0) +
          (/--lw-announce-h/.test(expr) ? num(/--lw-announce-h,\s*(\d+)px/, expr, announce) : 0);
      }
      return Math.max(0, announce + bar - clearance);
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
