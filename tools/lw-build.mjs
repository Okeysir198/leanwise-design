#!/usr/bin/env node
/**
 * lw-build — compile the JSX to `dist/`, PER FILE.
 *
 *   node tools/lw-build.mjs
 *   node tools/lw-build.mjs --check    # fail if dist/ is stale
 *
 * WHY THIS REPLACED THE tsup CONFIG. tsup bundled the whole barrel into four
 * chunks, and a bundled chunk can carry only ONE `"use client"` directive — so
 * the build would have had to mark every component client, throwing away the 50
 * server-safe ones. Per-file output is what lets the directive mean something.
 *
 * WHY dist/ IS COMMITTED. Every consumer installs this package from a GIT TAG,
 * and a git install runs no lifecycle script — `prepublishOnly` never fires. So
 * a dist that is only built at publish time does not exist for anybody: verified
 * against a real install tree, which had no dist/ and raw .jsx. Committing the
 * output is the same call this repo already makes for `tokens.json`,
 * `react.d.ts` and `_ds_bundle.js`, for exactly the same reason, and `--check`
 * keeps it from drifting the way a hand-maintained artifact would.
 *
 * THE EXTENSION REWRITE. In non-bundle mode esbuild leaves import specifiers
 * alone, so `from "./Icon.jsx"` survives into a file emitted as `Icon.js` and
 * resolves to nothing. Every relative `.jsx` specifier is rewritten to `.js`
 * afterwards. Missing this produces a dist that builds cleanly and 404s at
 * runtime — which is the failure mode this whole release is about.
 *
 * The .jsx sources still ship (`files` includes `components`), and the `source`
 * export condition still points at them, so "one file to read and patch"
 * survives.
 */

import fs from "node:fs";
import path from "node:path";
import { createRequire } from "node:module";
import { fileURLToPath } from "node:url";

const HERE = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(HERE, "..");
const CHECK = process.argv.includes("--check");
const require = createRequire(import.meta.url);
const esbuild = require("esbuild");

const red = (s) => `\x1b[31m${s}\x1b[0m`;
const green = (s) => `\x1b[32m${s}\x1b[0m`;

const ENTRIES = [];
(function walk(dir) {
  for (const e of fs.readdirSync(dir).sort()) {
    const p = path.join(dir, e);
    if (fs.statSync(p).isDirectory()) { walk(p); continue; }
    if (/\.(jsx|js)$/.test(p)) ENTRIES.push(path.relative(ROOT, p));
  }
})(path.join(ROOT, "components"));
for (const f of ["react.js", "brand.js", "hooks.js"]) ENTRIES.push(f);

const OUT = path.join(ROOT, CHECK ? ".dist-check" : "dist");

await esbuild.build({
  absWorkingDir: ROOT,
  entryPoints: ENTRIES,
  outdir: path.relative(ROOT, OUT),
  outbase: ".",
  format: "esm",
  target: "es2020",
  bundle: false,          // per-file: the only way "use client" survives
  loader: { ".jsx": "jsx" },
  jsx: "automatic",
  // No sourcemaps. dist/ is COMMITTED, and the maps are larger than the code they
  // map (468 KB vs 360 KB) — that is churn in every diff forever, for a build whose
  // output is near-identical to its input anyway (JSX -> jsx() calls, nothing else).
  // Reading and patching a component is served by the `source` export condition,
  // which points at the .jsx that still ships.
  sourcemap: false,
  logLevel: "warning",
  // NOTE: no `external`. esbuild rejects it outright without `bundle`, and at
  // bundle:false nothing is inlined anyway — every import, including React's,
  // stays exactly as written. React is the consumer's by construction here.
});

/* ---- the extension rewrite ------------------------------------------------ */

let rewritten = 0;
(function fix(dir) {
  for (const e of fs.readdirSync(dir)) {
    const p = path.join(dir, e);
    if (fs.statSync(p).isDirectory()) { fix(p); continue; }
    if (!p.endsWith(".js")) continue;
    const src = fs.readFileSync(p, "utf8");
    // Only RELATIVE specifiers — a bare "react/jsx-runtime" must not be touched.
    const out = src.replace(/(from\s*["']\.[^"']*)\.jsx(["'])/g, "$1.js$2");
    if (out !== src) { fs.writeFileSync(p, out); rewritten++; }
  }
})(OUT);

/* ---- freshness ------------------------------------------------------------ */

function tree(dir, base = dir) {
  const out = new Map();
  (function walk(d) {
    for (const e of fs.readdirSync(d).sort()) {
      const p = path.join(d, e);
      if (fs.statSync(p).isDirectory()) { walk(p); continue; }
      out.set(path.relative(base, p), fs.readFileSync(p, "utf8"));
    }
  })(dir);
  return out;
}

if (CHECK) {
  const built = tree(OUT);
  const shipped = fs.existsSync(path.join(ROOT, "dist")) ? tree(path.join(ROOT, "dist")) : new Map();
  fs.rmSync(OUT, { recursive: true, force: true });

  const missing = [...built.keys()].filter((k) => !shipped.has(k));
  const extra = [...shipped.keys()].filter((k) => !built.has(k));
  const changed = [...built.keys()].filter((k) => shipped.has(k) && shipped.get(k) !== built.get(k));

  if (missing.length || extra.length || changed.length) {
    console.error(red(`\nlw-build: dist/ is stale — ${missing.length} missing, ${changed.length} changed, ${extra.length} orphaned.`));
    for (const k of [...missing, ...changed, ...extra].slice(0, 8)) console.error(`  ${k}`);
    console.error("\n  Run `npm run build`. dist/ is COMMITTED because a git install runs no\n  lifecycle script, so a dist built only at publish time does not exist.\n");
    process.exit(1);
  }
  console.log(green(`lw-build: dist/ is current — ${built.size} file(s).`));
} else {
  const n = tree(OUT).size;
  const clients = [...tree(OUT)].filter(([, v]) => /^\s*["']use client["']/.test(v)).length;
  console.log(green(`lw-build: ${n} file(s) -> dist/ (${clients} carry "use client"); ${rewritten} import path(s) rewritten .jsx -> .js`));
}
