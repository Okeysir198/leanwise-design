#!/usr/bin/env node
/**
 * lw-registry — build `r/*.json` from `registry/`, and gate what it produces.
 *
 *   node tools/lw-registry.mjs            # build r/
 *   node tools/lw-registry.mjs --check    # fail if r/ is stale or a class is dead
 *
 * WHY A REGISTRY AT ALL. Both shadcn consumers use ZERO of this package's 82
 * React components — they vendor shadcn's and then hand-align them to the `.lw-*`
 * spec, which is how tss-app ended up re-typing `padding: 0 18px`, the control
 * heights, the focus rule and the table header treatment from scratch. The
 * registry is how that stops being re-typed per app: `npx shadcn add` scaffolds a
 * component that already carries the spec, and the consumer still OWNS the file.
 *
 * WHY `r/` IS COMMITTED. Every consumer installs from a git tag, where a
 * publish-time artifact does not exist — the same reason `tokens.json`,
 * `react.d.ts` and `_ds_bundle.js` are committed. No static host is needed:
 *
 *   npx shadcn@latest add ./node_modules/@leanwise/design/r/button.json
 *
 * If a docs site appears later it serves this same folder and one line changes.
 *
 * THE GATE IS THE POINT. A registry that drifts from the CSS is worse than no
 * registry, because it looks authoritative. `--check` does three things:
 *
 *   1. r/ is byte-current with registry/.
 *   2. Every Tailwind class the registry components use actually COMPILES against
 *      tokens.css + shadcn.css + theme.css. A registry component referencing
 *      `px-btn-x` when the token was never registered emits nothing and renders
 *      unpadded — the exact v4 failure mode this release is about.
 *   3. The token lint's TSX rules run over registry/ — the first time those rules
 *      have ever run inside this repo.
 */

import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { createRequire } from "node:module";
import { fileURLToPath, pathToFileURL } from "node:url";

const HERE = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(HERE, "..");
const CHECK = process.argv.includes("--check");
const red = (s) => `\x1b[31m${s}\x1b[0m`;
const green = (s) => `\x1b[32m${s}\x1b[0m`;

const SRC = path.join(ROOT, "registry");
const OUT = path.join(ROOT, "r");
const manifest = JSON.parse(fs.readFileSync(path.join(SRC, "registry.json"), "utf8"));

/* ---- build ---------------------------------------------------------------- */

const built = new Map();
for (const item of manifest.items) {
  const files = item.files.map((f) => ({
    path: f.path,
    type: f.type,
    target: f.target,
    content: fs.readFileSync(path.join(SRC, f.path), "utf8"),
  }));
  built.set(`${item.name}.json`, JSON.stringify({
    $schema: "https://ui.shadcn.com/schema/registry-item.json",
    name: item.name,
    type: item.type,
    ...(item.title ? { title: item.title } : {}),
    ...(item.description ? { description: item.description } : {}),
    ...(item.dependencies ? { dependencies: item.dependencies } : {}),
    ...(item.registryDependencies ? { registryDependencies: item.registryDependencies } : {}),
    files,
  }, null, 2) + "\n");
}

const problems = [];

if (!CHECK) {
  fs.rmSync(OUT, { recursive: true, force: true });
  fs.mkdirSync(OUT, { recursive: true });
  for (const [name, body] of built) fs.writeFileSync(path.join(OUT, name), body);
} else {
  const have = fs.existsSync(OUT) ? new Set(fs.readdirSync(OUT)) : new Set();
  for (const [name, body] of built) {
    if (!have.has(name)) problems.push(`r/${name} is missing — run \`npm run registry\``);
    else if (fs.readFileSync(path.join(OUT, name), "utf8") !== body) {
      problems.push(`r/${name} is stale — registry/ has moved since it was generated`);
    }
  }
  for (const name of have) if (!built.has(name)) problems.push(`r/${name} is orphaned — no such item in registry.json`);
}

/* ---- do the classes actually compile? ------------------------------------- */

const classes = new Set();
for (const item of manifest.items) {
  for (const f of item.files) {
    if (!f.path.endsWith(".tsx")) continue;
    const src = fs.readFileSync(path.join(SRC, f.path), "utf8").replace(/\/\*[\s\S]*?\*\//g, "");
    // Class strings live in cva() arms and cn() args — plain double-quoted
    // literals. Split on whitespace and keep what looks like a utility.
    for (const m of src.matchAll(/"([^"\n]{3,})"/g)) {
      for (const tok of m[1].split(/\s+/)) {
        const c = tok.replace(/^[a-z-]+:/i, "");            // strip a variant prefix
        if (!/^[a-z[]/.test(c) || c.includes("{") || c.includes("@")) continue;
        // Only the vocabulary this package OWNS. Stock Tailwind utilities are
        // Tailwind's problem, and asserting them would just be testing Tailwind.
        if (/^(px|h|size|gap|tracking|p|w|text|leading)-(btn|chip|control|cell|field|row|card|stack|switch|check|icon|th)/.test(c)
            || /^(bg|text|border|ring|outline|fill|stroke)-(brand|cta|success|warning|destructive|info|neutral|chart|diff|sidebar|scrim)/.test(c)) {
          classes.add(tok);
        }
      }
    }
  }
}

let compiled = "";
try {
  const req = createRequire(path.join(ROOT, "package.json"));
  const postcss = (await import(pathToFileURL(req.resolve("postcss")))).default;
  const tw = (await import(pathToFileURL(req.resolve("@tailwindcss/postcss")))).default;
  const tmp = fs.mkdtempSync(path.join(os.tmpdir(), "lw-registry-"));
  const probe = path.join(tmp, "probe.html");
  fs.writeFileSync(probe, `<div class="${[...classes].join(" ")}"></div>`);
  compiled = (await postcss([tw()]).process([
    `@import "tailwindcss" source(none);`,
    `@source "${probe}";`,
    `@import "${path.join(ROOT, "tokens.css")}";`,
    `@import "${path.join(ROOT, "shadcn.css")}";`,
    `@import "${path.join(ROOT, "theme.css")}";`,
  ].join("\n"), { from: path.join(ROOT, ".lw-registry-probe.css") })).css;
  fs.rmSync(tmp, { recursive: true, force: true });
} catch (e) {
  console.error(red(`lw-registry: could not compile the registry's classes — ${e.message.split("\n")[0]}`));
  process.exit(2);
}

/**
 * Tailwind ESCAPES the special characters of a class name into the selector with
 * a literal backslash: `hover:bg-cta/90` is emitted as `.hover\:bg-cta\/90:hover`.
 * So the expected selector has to be constructed the same way and only THEN
 * regex-escaped. Matching the raw class name reported every variant-prefixed and
 * every opacity-modified class as dead — 7 false positives on the first run,
 * which is the same shape of bug the presence gate's unescaped leading dot had.
 *
 * The terminator set has to allow `[` too: an aria/data variant appends an
 * ATTRIBUTE selector rather than a pseudo-class, so `aria-invalid:border-x`
 * emits `.aria-invalid\:border-x[aria-invalid="true"]`. That one cost a wrong
 * diagnosis — it read as "Tailwind has no aria-invalid variant", and an
 * `@custom-variant` was written for it before a direct probe showed v4 generates
 * `aria-*` natively. The gate was wrong, not the compiler.
 */
const cssSelector = (cls) => "." + cls.replace(/[!"#$%&'()*+,./:;<=>?@[\]^`{|}~]/g, (ch) => "\\" + ch);
const rx = (lit) => lit.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

for (const c of classes) {
  if (!new RegExp(`${rx(cssSelector(c))}(\\s|,|\\{|:|\\[)`).test(compiled)) {
    problems.push(
      `\`${c}\` is used by a registry component but emits NO CSS — ` +
      `the element will render unstyled in every consumer that scaffolds it`,
    );
  }
}

/* ---- report --------------------------------------------------------------- */

if (problems.length) {
  console.error(red(`\nlw-registry: ${problems.length} problem(s).\n`));
  for (const p of problems) console.error(`  - ${p}`);
  console.error("");
  process.exit(1);
}

console.log(green(
  CHECK
    ? `lw-registry: OK — ${built.size} item(s) current, ${classes.size} design-system class(es) verified against the compiler.`
    : `lw-registry: wrote ${built.size} item(s) to r/; ${classes.size} design-system class(es) verified against the compiler.`,
));
