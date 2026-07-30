#!/usr/bin/env node
/**
 * Token lint — the load-bearing part of the design system.
 *
 * A shared token file does not make products consistent. Nothing stops a dev from
 * writing `bg-emerald-500` or `bg-[hsl(var(--accent))]` next to it, and that is
 * exactly how the previous system died: the values were shared, the usage was not.
 * This turns the style guide's sentences into build failures.
 *
 *   npx lw-token-lint src            # TSX mode: exits non-zero on any violation
 *   npx lw-token-lint                # CSS mode: self-check the package's CSS layers
 *   npx lw-token-lint --css          #   (same thing, explicit)
 *
 * TSX rules, and why each one exists:
 *   1. raw hex in components      — bypasses the token core entirely; unthemeable,
 *                                   invisible to the contrast gate.
 *   2. Tailwind palette escapes   — `bg-emerald-500/15` for a success chip means
 *                                   dark mode and tenant themes never reach it.
 *   3. arbitrary-value tokens     — `bg-[hsl(var(--x))]` works, but it is unlintable,
 *                                   un-dedupable by tailwind-merge, and it is how VSS
 *                                   ended up with one element carrying two conflicting
 *                                   text colors. Use the real utility (`bg-primary`).
 *   4. >1 CTA per view            — "one amber per view" is the whole point of having
 *                                   an amber. A doc cannot enforce it; this can.
 *
 * CSS rules (self-check on base.css / marketing.css / product.css):
 *   5. raw duration               — a .lw-* rule using a raw <n>s/<n>ms instead of a
 *                                   --lw-dur-* or --lw-ease-* token. Ambient loops have
 *                                   their own named --lw-dur-* tokens, so there is no
 *                                   legitimate reason to reach for a literal.
 *   6. raw z-index                — a .lw-* rule using a positive z-index literal
 *                                   instead of a --lw-z-* token. Negative (-1, the
 *                                   behind-background pseudo pattern) is the one
 *                                   exempt literal — there is no "behind" tier.
 */

import { readdirSync, readFileSync, statSync, existsSync } from "node:fs";
import { join, relative, extname, dirname } from "node:path";
import { fileURLToPath } from "node:url";

/* PATH NOTE — this folder sits under templates/ because everything outside it is
   compiled into the design system's browser bundle, and a Node script (node:fs,
   node:path) cannot be. ROOT is therefore two levels up, not one. Through v1.0
   this file lived here with a one-level ROOT, which resolved to
   templates/tokens.css — a file that has never existed, so the gate could not
   run at all. The npm scripts (`npm run check`) are the supported entry point. */
const PKG_ROOT = join(dirname(fileURLToPath(import.meta.url)), "..", "..");
const arg = process.argv[2];

// CSS self-check mode: no arg, or --css. Runs against the package's own CSS layers.
// Function declaration is hoisted, so it is callable here despite being defined
// at the bottom of the file.
if (!arg || arg === "--css") {
  const errs = cssSelfCheck();
  if (errs.length) {
    for (const e of errs) {
      console.error(`${e.file || "css"}  [${e.rule}]  ${e.hit}\n    in \`${e.selector}\` — ${e.msg}`);
    }
    console.error(`\n\x1b[31m${errs.length} CSS token violation(s).\x1b[0m See @leanwise/design/CLAUDE.md.\n`);
    process.exit(1);
  }
  console.log(`\x1b[32mCSS self-check clean.\x1b[0m`);
  process.exit(0);
}

const target = arg;
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
    re: /\b(?:bg|text|border|ring|fill|stroke|from|to|via|accent|caret|divide|outline|decoration)-(?:emerald|amber|sky|rose|indigo|violet|red|green|blue|yellow|orange|teal|zinc|slate|gray|neutral|stone)-\d{2,3}\b/g,
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

// A missing target is a wiring mistake, not a crash: this script is pointed at a
// CONSUMER's source tree, and the path is whatever the caller typed. An ENOENT
// stack says nothing about which argument was wrong or what the modes are.
if (!existsSync(target)) {
  console.error(`lw-token-lint: no such path: ${target}`);
  console.error("  TSX mode expects a source directory, e.g. `lw-token-lint ../my-app/src`.");
  console.error("  To self-check this package's CSS layers instead, run with --css and no path.");
  process.exit(2);
}

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

  // Rule 4: the one-amber-per-view rule. Counted per file, since a route file
  // is a view. The Button definition itself is exempt.
  if (!ALLOW_CTA_DEF.test(rel)) {
    const ctas = (src.match(/variant=["']cta["']/g) ?? []).length;
    if (ctas > 1) {
      console.error(`${rel}  [multiple-cta]  ${ctas} × variant="cta"\n    The amber CTA is the one high-energy action on a view. Demote the others to the default (teal) variant.`);
      violations++;
    }
  }
}

if (violations) {
  console.error(`\n\x1b[31m${violations} token violation(s).\x1b[0m See @leanwise/design/README.md.\n`);
  process.exit(1);
}
console.log(`\x1b[32mToken lint clean.\x1b[0m`);

/**
 * CSS self-check — keeps the CSS layers honest about their own token contract. See the
 * header for the two rules (raw-duration, raw-z-index). Returns an array of
 * { rule, hit, selector, msg } objects; the caller prints and exits.
 */
function cssSelfCheck() {
  // The three real layers, post-split. lw.css and app.css are @import shims with
  // no rules of their own — checking only lw.css (as through v1.1) checked nothing.
  const LAYERS = ["base.css", "marketing.css", "product.css"];
  const all = [];
  for (const name of LAYERS) {
    const p = join(PKG_ROOT, name);
    if (!existsSync(p)) {
      all.push({ rule: "no-css", hit: name, selector: "-", msg: `not found at ${p}`, file: name });
      continue;
    }
    for (const e of checkOneCss(readFileSync(p, "utf8"))) all.push({ ...e, file: name });
  }
  return all;
}

function checkOneCss(raw) {
  // Strip comments so prose mentioning `1.8s` or `z-index` does not trip a rule.
  const src = raw.replace(/\/\*[\s\S]*?\*\//g, "");

  // Walk the file with a brace-depth scanner and emit every (selector, body)
  // pair. Nested rules (inside @media/@supports) surface as their own pairs; the
  // outer at-rule's body is also emitted, but its selector lacks `.lw-` and is
  // skipped, so declarations are not double-counted.
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

  const errs = [];
  const TIME_PROP = /^(animation|transition|animation-duration|transition-duration)$/;
  const TIME_LIT = /\d+(?:\.\d+)?(?:ms|s)\b/g;

  for (const { selector, body } of rules) {
    if (!/\.lw-/.test(selector)) continue;
    const decls = body.split(";");
    for (const decl of decls) {
      const colon = decl.indexOf(":");
      if (colon < 0) continue;
      const prop = decl.slice(0, colon).trim().toLowerCase();
      const value = decl.slice(colon + 1);

      // Rule 6: z-index must reference a --lw-z-* token. Negative (-1, the
      // behind-background pseudo pattern) is the one exempt literal.
      if (prop === "z-index") {
        const v = value.trim();
        if (/^-?\d/.test(v) && !v.includes("var(")) {
          const n = parseFloat(v);
          if (!Number.isNaN(n) && n >= 0) {
            errs.push({
              rule: "raw-z-index",
              hit: `z-index: ${v}`,
              selector,
              msg: "use a --lw-z-* token (-1 behind-background is the only exempt literal)",
            });
          }
        }
      }

      // Rule 5: animation/transition durations must come from a token. Strip
      // var(...) first so a token-built shorthand passes; any remaining time
      // literal is a raw duration bypassing the --lw-dur-* scale.
      if (TIME_PROP.test(prop)) {
        const varless = value.replace(/var\([^)]*\)/g, "");
        for (const m of varless.matchAll(TIME_LIT)) {
          errs.push({
            rule: "raw-duration",
            hit: `${prop}: …${m[0]}…`,
            selector,
            msg: "use a --lw-dur-* or --lw-ease-* token (ambient loops have named --lw-dur-* tokens)",
          });
        }
      }
    }
  }
  return errs;
}
