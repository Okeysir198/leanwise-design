#!/usr/bin/env node
/**
 * Token lint — the load-bearing part of the design system.
 *
 * A shared token file does not make products consistent. Nothing stops a dev from
 * writing `bg-emerald-500` or `bg-[hsl(var(--accent))]` next to it, and that is
 * exactly how the previous system died: the values were shared, the usage was not.
 * This turns the style guide's sentences into build failures.
 *
 *   npx lw-token-lint src            # exits non-zero on any violation
 *
 * Rules, and why each one exists:
 *   1. raw hex in components      — bypasses the token core entirely; unthemeable,
 *                                   invisible to the contrast gate.
 *   2. Tailwind palette escapes   — `bg-emerald-500/15` for a success chip means
 *                                   dark mode and tenant themes never reach it.
 *   3. arbitrary-value tokens     — `bg-[hsl(var(--x))]` works, but it is unlintable,
 *                                   un-dedupable by tailwind-merge, and it is how VSS
 *                                   ended up with one element carrying two conflicting
 *                                   text colors. Use the real utility (`bg-primary`).
 *   4. >1 CTA per view            — "one orange per view" is the whole point of having
 *                                   an orange. A doc cannot enforce it; this can.
 */

import { readdirSync, readFileSync, statSync } from "node:fs";
import { join, relative, extname } from "node:path";

const target = process.argv[2] ?? "src";
const EXT = new Set([".tsx", ".ts", ".jsx", ".js"]);

/** Files allowed to define the primitives (they legitimately name the raw tokens). */
const ALLOW_CTA_DEF = /components\/ui\/button\.tsx$/;

const RULES = [
  {
    id: "raw-hex",
    re: /#[0-9a-fA-F]{6}\b|#[0-9a-fA-F]{3}\b/g,
    msg: "raw hex color — use a semantic token (bg-primary, text-success…)",
    // Hex is fine in a comment explaining a token, and in the brand helper that
    // parses a tenant's chosen hex at runtime.
    skipFile: /lib\/brand\.ts$/,
    skipLine: /^\s*(\/\/|\*|\/\*)/,
  },
  {
    id: "palette-escape",
    re: /\b(?:bg|text|border|ring|fill|stroke|from|to|via)-(?:emerald|amber|sky|rose|indigo|violet|red|green|blue|yellow|orange|teal|zinc|slate|gray|neutral|stone)-\d{2,3}\b/g,
    msg: "Tailwind palette color — use the semantic token (success/warning/destructive/primary)",
  },
  {
    id: "arbitrary-token",
    // Deliberately broader than `\[hsl\(var\(`: an escape can hide anywhere inside an
    // arbitrary value, e.g. `[background:radial-gradient(…,hsl(var(--accent)/.25),…)]`,
    // which the narrow pattern missed and which is how VSS's auth card kept pointing at
    // --accent (a hover surface) instead of the brand. Match any var(--…) inside [ ].
    re: /\[[^\]\s]*var\(--[a-z-]+/g,
    msg: "token reached through an arbitrary value — prefer the registered utility (bg-primary). A gradient that genuinely needs var() should reference --primary/--cta, never --accent (a hover surface).",
    // Gradients are the one legitimate case; they still must name the right token, so we
    // allow them only where a reviewer has opted in with an explicit comment.
    skipLine: /lw-token-lint-allow/,
  },
];

function walk(dir, out = []) {
  for (const entry of readdirSync(dir)) {
    if (entry === "node_modules" || entry.startsWith(".")) continue;
    const p = join(dir, entry);
    const st = statSync(p);
    if (st.isDirectory()) walk(p, out);
    else if (EXT.has(extname(p))) out.push(p);
  }
  return out;
}

let violations = 0;

for (const file of walk(target)) {
  const rel = relative(process.cwd(), file);
  const src = readFileSync(file, "utf8");
  const lines = src.split("\n");

  for (const rule of RULES) {
    if (rule.skipFile?.test(rel)) continue;
    lines.forEach((line, i) => {
      if (rule.skipLine?.test(line)) return;
      const hits = line.match(rule.re);
      if (!hits) return;
      for (const hit of new Set(hits)) {
        console.error(`${rel}:${i + 1}  [${rule.id}]  ${hit.trim()}\n    ${rule.msg}`);
        violations++;
      }
    });
  }

  // Rule 4: the one-orange-per-view rule. Counted per file, since a route file
  // is a view. The Button definition itself is exempt.
  if (!ALLOW_CTA_DEF.test(rel)) {
    const ctas = (src.match(/variant=["']cta["']/g) ?? []).length;
    if (ctas > 1) {
      console.error(`${rel}  [multiple-cta]  ${ctas} × variant="cta"\n    The orange CTA is the one high-energy action on a view. Demote the others to the default (teal) variant.`);
      violations++;
    }
  }
}

if (violations) {
  console.error(`\n\x1b[31m${violations} token violation(s).\x1b[0m See @leanwise/design/README.md.\n`);
  process.exit(1);
}
console.log(`\x1b[32mToken lint clean.\x1b[0m`);
