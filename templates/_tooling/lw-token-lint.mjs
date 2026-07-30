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
import { splitRules, stripComments } from "./_css.mjs";

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
  const errs = cssSelfCheck().concat(jsxSelfCheck(), docPinSelfCheck());
  if (errs.length) {
    for (const e of errs) {
      console.error(`${e.file || "css"}  [${e.rule}]  ${e.hit}\n    in \`${e.selector}\` — ${e.msg}`);
    }
    console.error(`\n\x1b[31m${errs.length} self-check violation(s).\x1b[0m See @leanwise/design/CLAUDE.md.\n`);
    process.exit(1);
  }
  console.log(`\x1b[32mSelf-check clean.\x1b[0m`);
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
  // Shared with the contrast gate and the DTCG generator. This file used to
  // carry its own copy of the walker, and it was the copy that never received
  // the `@import` selector-trim fix the other two both got — the one parser
  // still holding a bug that had already been paid for twice.
  const rules = splitRules(stripComments(raw));

  const errs = [];
  const TIME_PROP = /^(animation|transition|animation-duration|transition-duration)$/;
  const TIME_LIT = /\d+(?:\.\d+)?(?:ms|s)\b/g;

  // Colour properties whose value must come from a token. The package's whole
  // claim is "never a hex in a consumer"; nothing enforced "never a hex in the
  // design system's own layers", and the contrast gate's composed-pair walk
  // silently SKIPS any rule whose colour is not a bare var(), so a literal was
  // invisible to all six gates at once.
  const COLOR_PROP = /^(color|background|background-color|border-color|border-(top|right|bottom|left|inline|block)(-(start|end))?-color|outline-color|fill|stroke|caret-color|accent-color|text-decoration-color|column-rule-color)$/;
  // A LITERAL, not merely a colour function. `hsl(var(--lw-brand-500-c) / .14)`
  // is the authored form of every alpha tint in this system and must pass; what
  // must not is a hex, or an hsl()/rgb() whose channels are numbers rather than
  // a token. Matching the function name alone flagged 40 correct tints.
  const rawColorLiteral = (value) => {
    const hex = value.match(/#[0-9a-f]{3,8}\b/i);
    if (hex) return hex[0];
    for (const m of value.matchAll(/\b(?:rgba?|hsla?)\(([^()]*(?:\([^()]*\)[^()]*)*)\)/gi)) {
      if (!/var\(\s*--lw-/.test(m[1])) return m[0];
    }
    return null;
  };
  // `mask-image`/`-webkit-mask` gradients use #000/#fff as LUMINANCE, not colour,
  // and system colours are the point in a forced-colors block.
  const SYSTEM_COLOR = /\b(Highlight|HighlightText|Canvas|CanvasText|ButtonText|ButtonFace|LinkText|GrayText|Mark|MarkText|AccentColor|AccentColorText|Field|FieldText)\b/;

  for (const { selector, directBody } of rules) {
    // Was `if (!/\.lw-/.test(selector)) continue;` — which exempted every bare
    // element, `:root`, `*`, `[data-density]` and every @keyframes step from the
    // rules below. The layers do style bare elements, so that was a hole, not a
    // filter. @keyframes preludes and at-rules carry no declarations of ours.
    if (selector.startsWith("@")) continue;
    const decls = directBody.split(";");
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

      // Rule 8: a colour in the layers must come from a token.
      const lit = COLOR_PROP.test(prop) && !SYSTEM_COLOR.test(value) && !/\b(mask|-webkit-mask)/.test(prop)
        ? rawColorLiteral(value) : null;
      if (lit) {
        errs.push({
          rule: "raw-color",
          hit: `${prop}: …${lit}…`,
          selector,
          msg: "use a --lw-* token — a literal here is a second home for a palette value and no gate can see it",
        });
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

/**
 * Rule 7: a component that references `React.` must import it.
 *
 * The build sets `jsx: "automatic"`, so esbuild injects `jsx`/`jsxs` from
 * react/jsx-runtime and NOT the `React` identifier. Eighteen components called
 * React.useRef / useId / useState with no import; the JSX compiled, the build
 * passed, the preview cards worked (they get React as a UMD global) — and the
 * published package threw `ReferenceError: React is not defined` on import for
 * anyone using a bundler. A failure that only appears downstream is exactly
 * what a self-check is for.
 */
function jsxSelfCheck() {
  const errs = [];
  const dir = join(PKG_ROOT, "components");
  if (!existsSync(dir)) {
    // Missing input is not a clean run — mirror cssSelfCheck's `no-css`.
    errs.push({ rule: "no-components", hit: "components/", selector: "-", file: "components/", msg: `not found at ${dir}` });
    return errs;
  }
  // Its own traversal: walk() closes over EXT, a const declared below in the
  // TSX-mode section, which this self-check runs before.
  const jsx = [];
  const scan = (d) => {
    for (const entry of readdirSync(d)) {
      if (entry === "node_modules" || entry.startsWith(".")) continue;
      const p2 = join(d, entry);
      if (statSync(p2).isDirectory()) scan(p2);
      else if (extname(p2) === ".jsx") jsx.push(p2);
    }
  };
  scan(dir);
  for (const file of jsx) {
    const src = readFileSync(file, "utf8");
    if (!/\bReact\./.test(src)) continue;
    // Any namespace import of react binds the identifier; so does a default
    // import. Matching one exact spelling trained people to reformat rather
    // than fix, and would have failed a correct `import React, { useState }`.
    if (/^\s*import\s+(?:\*\s+as\s+React|React\b)[^;]*from\s+['"]react['"]/m.test(src)) continue;
    errs.push({
      rule: "missing-react-import",
      hit: relative(PKG_ROOT, file),
      selector: "-",
      file: relative(PKG_ROOT, file),
      msg: 'references `React.` without `import * as React from "react";` — the automatic JSX runtime does not provide the React binding, so this throws for a bundling consumer',
    });
  }
  return errs;
}

/* README's install snippet carries a version pin, and a pin is a SECOND HOME for
   package.json#version. It went stale immediately: v1.1.7 shipped with the README
   still telling every new consumer to install `#v1.1.6` — which resolves, installs
   and builds, so nothing anywhere could notice. That is the whole failure mode this
   package exists to argue against, sitting in its own front page.

   The rule is deliberately narrow: it does not lint prose about old versions (the
   CHANGELOG and the consumer table are full of legitimate references to earlier
   tags). It matches only the dependency-spec form `leanwise-design#vX.Y.Z`, which
   is a copy-paste target and must always name the version being released. */
function docPinSelfCheck() {
  const errs = [];
  let version;
  try {
    version = JSON.parse(readFileSync(join(PKG_ROOT, "package.json"), "utf8")).version;
  } catch (e) {
    errs.push({ rule: "no-package-json", hit: "package.json", selector: "-", file: "package.json", msg: String(e.message || e) });
    return errs;
  }
  for (const doc of ["README.md", "CONTRIBUTING.md"]) {
    let src;
    try { src = readFileSync(join(PKG_ROOT, doc), "utf8"); } catch { continue; }
    const pins = [...src.matchAll(/leanwise-design#v(\d+\.\d+\.\d+)/g)];
    for (const m of pins) {
      if (m[1] === version) continue;
      const line = src.slice(0, m.index).split("\n").length;
      errs.push({
        rule: "stale-install-pin",
        hit: `#v${m[1]}`,
        selector: `${doc}:${line}`,
        file: doc,
        msg: `install pin names v${m[1]} but package.json is ${version} — a consumer copying this line installs the wrong release, and it resolves cleanly so nothing catches it. Bump both in the release commit.`,
      });
    }
    if (doc === "README.md" && !pins.length) {
      errs.push({ rule: "no-install-pin", hit: "README.md", selector: "README.md", file: doc,
        msg: "no `leanwise-design#vX.Y.Z` install pin found — if the install snippet moved, move this rule with it rather than leaving it asserting nothing" });
    }
  }
  return errs;
}
