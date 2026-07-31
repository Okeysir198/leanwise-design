#!/usr/bin/env node
/**
 * lw-pack-check — install the package the way a consumer does, then use it.
 *
 *   node tools/lw-pack-check.mjs
 *
 * WHY. Every distribution defect this package has shipped was invisible to every
 * other gate, because every other gate runs against the WORKING TREE — where the
 * files are all present regardless of whether `files` would pack them:
 *
 *   - `dist/` was never built for anyone. `prepublishOnly` is the only hook, and
 *     a git install (which is how all three consumers install) runs no lifecycle
 *     script. Verified against a real install tree: no dist/, raw .jsx.
 *   - The `lw-token-lint` bin was missing under pnpm. `files` used a
 *     `"!templates/_tooling"` exclusion plus a re-include, a pattern npm honours
 *     and pnpm does not — so a consumer wrote a 53-line workaround whose own
 *     header calls it "a lint that silently stops linting."
 *   - `theme.css`, `reset.css` and `tools/` are new in v1.2 and are worth
 *     exactly nothing if `files` does not carry them.
 *
 * So: `npm pack`, install the tarball into a scratch directory, and assert the
 * package works from there. This is slow (a real pack + install), which is why
 * it lives in `check:ci` rather than `check`.
 */

import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { execFileSync } from "node:child_process";
import { fileURLToPath } from "node:url";

const HERE = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(HERE, "..");
const red = (s) => `\x1b[31m${s}\x1b[0m`;
const green = (s) => `\x1b[32m${s}\x1b[0m`;
const dim = (s) => `\x1b[2m${s}\x1b[0m`;

const run = (cmd, args, cwd) =>
  execFileSync(cmd, args, { cwd, encoding: "utf8", stdio: ["ignore", "pipe", "pipe"] });

const tmp = fs.mkdtempSync(path.join(os.tmpdir(), "lw-pack-"));
const problems = [];

try {
  console.log(dim("  packing…"));
  const out = run("npm", ["pack", "--pack-destination", tmp], ROOT).trim();
  const tarball = path.join(tmp, out.split("\n").pop().trim());
  const bytes = fs.statSync(tarball).size;

  const app = path.join(tmp, "app");
  fs.mkdirSync(app);
  fs.writeFileSync(path.join(app, "package.json"), JSON.stringify({ name: "lw-pack-probe", private: true, type: "module" }));
  console.log(dim("  installing the tarball…"));
  run("npm", ["install", "--no-audit", "--no-fund", "--silent", tarball], app);

  const pkgDir = path.join(app, "node_modules", "@leanwise", "design");
  const has = (rel) => fs.existsSync(path.join(pkgDir, rel));

  /* ---- 1. everything a consumer imports is actually in the tarball -------- */
  const MUST_PACK = [
    "tokens.css", "shadcn.css", "theme.css", "reset.css", "base.css",
    "marketing.css", "product.css", "fonts.css", "email.css", "lw.css",
    "tailwind-preset.cjs", "tokens.json", "react.d.ts",
    "tools/lw-token-lint.mjs", "tools/_css.mjs",
    "dist/react.js", "dist/components/overlays/Dialog.js", "dist/components/primitives/Card.js",
    "components/primitives/Icon.jsx",
  ];
  for (const f of MUST_PACK) if (!has(f)) problems.push(`\`${f}\` is not in the tarball — \`files\` does not carry it`);

  /* ---- 2. every exports entry resolves ------------------------------------ */
  const manifest = JSON.parse(fs.readFileSync(path.join(pkgDir, "package.json"), "utf8"));
  for (const [name, e] of Object.entries(manifest.exports ?? {})) {
    if (name.includes("*")) continue;
    for (const target of typeof e === "string" ? [e] : Object.values(e)) {
      if (typeof target === "string" && !has(target.replace(/^\.\//, ""))) {
        problems.push(`exports["${name}"] points at \`${target}\`, which is not in the tarball`);
      }
    }
  }

  /* ---- 2b. what must NOT ship --------------------------------------------
     `templates/` is 1.4 MB — 816 KB of it twelve BYTE-IDENTICAL copies of
     support.js — and it shipped BROKEN anyway: every ds-base.js in it loads
     `_ds_bundle.js`, which `files` has never carried, so a consumer who opened a
     packed template got a blank page. They are authoring artifacts, the same
     verdict REVIEW.md §3 reached for the preview cards. Dropped in v1.2; this
     assertion is what stops them drifting back in. */
  for (const f of ["templates", "preview", "_ds_bundle.js", "node_modules", "tsup.config.js"]) {
    if (has(f)) problems.push(`\`${f}\` IS in the tarball and should not be — it is an authoring artifact`);
  }

  /* ---- 3. the "use client" directives survived packing -------------------- */
  const dialog = path.join(pkgDir, "dist/components/overlays/Dialog.js");
  if (fs.existsSync(dialog) && !/^\s*["']use client["']/.test(fs.readFileSync(dialog, "utf8"))) {
    problems.push('dist/…/Dialog.js lost its "use client" — it will throw in an App Router server component');
  }
  const card = path.join(pkgDir, "dist/components/primitives/Card.js");
  if (fs.existsSync(card) && /^\s*["']use client["']/.test(fs.readFileSync(card, "utf8"))) {
    problems.push('dist/…/Card.js gained a "use client" it should not have — it is server-safe');
  }

  /* ---- 4. the bin is present AND runs ------------------------------------- */
  const bin = path.join(app, "node_modules", ".bin", "lw-token-lint");
  if (!fs.existsSync(bin)) {
    problems.push("the `lw-token-lint` bin is not linked — a consumer's CI cannot run the lint");
  } else {
    try { run(bin, ["--help"], app); }
    catch (e) {
      // A lint exiting non-zero on --help is fine; a MODULE_NOT_FOUND is not.
      const text = `${e.stdout ?? ""}${e.stderr ?? ""}`;
      if (/Cannot find module|ERR_MODULE_NOT_FOUND/.test(text)) {
        problems.push(`the \`lw-token-lint\` bin is linked but crashes: ${text.split("\n")[0]}`);
      }
    }
  }

  /* ---- 5. the built entry actually imports -------------------------------- */
  const probe = path.join(app, "probe.mjs");
  fs.writeFileSync(probe, 'import * as ds from "@leanwise/design";\nconsole.log(Object.keys(ds).length);\n');
  try {
    const n = Number(run("node", [probe], app).trim());
    if (!Number.isFinite(n) || n < 50) problems.push(`importing the package yielded ${n} exports — expected the full barrel`);
  } catch (e) {
    problems.push(`importing the package throws: ${`${e.stdout ?? ""}${e.stderr ?? ""}`.split("\n").find((l) => l.trim()) ?? e.message}`);
  }

  if (problems.length) {
    console.error(red(`\nlw-pack-check: ${problems.length} problem(s) in the PACKED package.\n`));
    for (const p of problems) console.error(`  - ${p}`);
    console.error(
      "\n  Every other gate runs against the working tree, where these files exist\n" +
      "  whether or not `files` would pack them. That is why each of these defects\n" +
      "  shipped: they are only visible from the other side of `npm pack`.\n",
    );
    process.exit(1);
  }

  console.log(green(
    `lw-pack-check: OK — ${(bytes / 1024 / 1024).toFixed(2)} MB tarball; every export resolves, ` +
    `the "use client" directives survived, the bin runs, and the barrel imports.`,
  ));
} finally {
  fs.rmSync(tmp, { recursive: true, force: true });
}
