#!/usr/bin/env node
/**
 * lw-bundle — the generator for `_ds_bundle.js`.
 *
 *   node tools/lw-bundle.mjs            # write _ds_bundle.js
 *   node tools/lw-bundle.mjs --check    # fail when the committed file is stale
 *
 * WHY THIS EXISTS
 * ---------------
 * The 34 specimen cards and the twelve templates render from `_ds_bundle.js`, a compiled
 * browser bundle — NOT from `components/**\/*.jsx`. Until v1.1.6 that bundle was produced in the
 * Claude Design project and this repo had no generator, so a `.jsx` fix was invisible to
 * `check:a11y` and `check:visual` until the next wholesale sync. Both browser gates were
 * therefore testing an artifact that had already drifted from the source they were meant to
 * cover. This closes that: the bundle is built here, from these sources, and `--check` fails
 * when the committed copy no longer matches them.
 *
 * WHAT IT PRODUCES
 * ----------------
 * A single classic <script> (an IIFE, not a module — the cards load it with a plain
 * `<script src>`), preceded by the `/* @ds-bundle: {...} *\/` header the design project's
 * format 4 defines. The IIFE ends by assigning every exposed export onto
 * `globalThis.LeanWiseDesign_f2d907`, which is what a card destructures:
 *
 *     const { Button, Icon } = window.LeanWiseDesign_f2d907;
 *
 * React and ReactDOM are NOT bundled. The cards load them as UMD globals from a <script> tag
 * before this file, so `react` / `react-dom` resolve to shim modules that re-export
 * `globalThis.React` / `globalThis.ReactDOM`. Because those shims are CommonJS, esbuild's
 * `__toESM` copies the *whole* runtime object — so `React.anything` works, and the shim cannot
 * go stale against a React version that adds an export. That is deliberate: a hand-listed set
 * of named hooks would be a second home for React's API.
 *
 * WHAT IS EXPOSED
 * ---------------
 * The union of
 *   (a) every export of the barrel `react.js`, and
 *   (b) every export whose name starts with an uppercase letter, from any module the barrel
 *       transitively pulls in, EXCEPT where the barrel already claims that name.
 *
 * (b) is what keeps `SERIES` / `DataTable` / `Legend` (chart-parts.jsx) and `IconNames`
 * (Icon.jsx) on the namespace — the cards use them even though the barrel does not re-export
 * them. Everything else that a bundled module exports is listed in the header's
 * `unexposedExports` so the omission is visible rather than silent.
 *
 * The exception in (b) is load-bearing: `chart-parts.jsx` exports a chart-axis `Grid` and
 * `layout/Grid.jsx` exports the layout `Grid`. The namespace is flat, so one of them has to
 * lose, and the barrel is the contract — the chart's is withheld and appears under
 * `unexposedExports`. Two *non-barrel* modules exporting one uppercase name is an error, not a
 * silent last-wins; that is the case nothing here could adjudicate.
 *
 * DELIBERATE DIFFERENCES FROM THE DESIGN-PROJECT BUNDLE
 * -----------------------------------------------------
 * - **No per-file `try/catch`.** The old bundle wrapped each source file and pushed failures to
 *   `__ds_ns.__errors`. Nothing in this repo reads `__errors` (grep the cards, `preview/_card.js`
 *   and the gates), and esbuild cannot produce per-file guards without hand-written wrappers. The
 *   array is still created so any external reader does not throw on `.length`, but it stays empty.
 * - **`brand.js` and `tailwind-preset.cjs` are no longer inputs.** Neither is reachable from the
 *   barrel and neither exposed anything; the old header hashed them anyway. Every *exposed* name
 *   is byte-identical in provenance.
 * - **`inlinedExternals` is `[]` and means it.** Nothing external is inlined — see the React note
 *   above.
 * - **Ordering is `(sourcePath, name)`**, not the design project's dependency order, so the JSON
 *   header diffs cleanly.
 *
 * DRIFT GUARD
 * -----------
 * Beyond `--check`, the generator scans every `*.card.html` and `*.dc.html` for
 * `LeanWiseDesign_f2d907.X` and for `const { X } = window.LeanWiseDesign_f2d907`, and fails if a
 * name a card consumes is not on the namespace. Removing a barrel export therefore breaks the
 * build here rather than rendering a blank card under axe.
 *
 * PATH ASSUMPTION: ROOT is one level up — this file lives under `tools/`.
 */

import { createHash } from "node:crypto";
import { readdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import esbuild from "esbuild";

const HERE = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(HERE, "..");
const OUT_PATH = path.join(ROOT, "_ds_bundle.js");

const NAMESPACE = "LeanWiseDesign_f2d907";
const BARREL = "react.js";
const FORMAT = 4;

/* The virtual modules. `ds:` is a namespace esbuild will never resolve on disk, so a real file
   called `react` in the repo could not shadow one of these by accident. */
const NS = "ds-shim";
const SHIM_REACT = "ds:react";
const SHIM_REACT_DOM = "ds:react-dom";
const SHIM_JSX_RUNTIME = "ds:jsx-runtime";
const SHIM_INJECT = "ds:inject-react";
const ENTRY_NAME = "ds-entry.js"; // the synthetic entry, as it appears in the metafile

/* `import * as React from "react"` on a CJS module gives esbuild's `__toESM`, which copies every
   own property of the runtime object. That is why these are `module.exports =` and not a list of
   named re-exports: the shim must not be able to lag React's surface. */
const SHIM_SOURCE = {
  [SHIM_REACT]: `module.exports = globalThis.React;\n`,
  [SHIM_REACT_DOM]: `module.exports = globalThis.ReactDOM;\n`,
  /* Unused while the classic transform is on (esbuild emits React.createElement, never a
     jsx-runtime import). Mapped anyway so a future `jsx: "automatic"` does not silently bundle
     a second React. */
  [SHIM_JSX_RUNTIME]: `module.exports = globalThis.React;\n`,
  /* Injected into every input so the 45 components that never `import * as React` still get a
     bound `React` for the JSX factory, instead of leaning on the ambient <script> global. */
  [SHIM_INJECT]: `export var React = globalThis.React;\n`,
};

function shimPlugin() {
  return {
    name: "lw-globals",
    setup(build) {
      build.onResolve({ filter: /^ds:/ }, (a) => ({ path: a.path, namespace: NS }));
      build.onResolve({ filter: /^react$/ }, () => ({ path: SHIM_REACT, namespace: NS }));
      build.onResolve({ filter: /^react-dom(\/.*)?$/ }, () => ({ path: SHIM_REACT_DOM, namespace: NS }));
      build.onResolve({ filter: /^react\/jsx-(dev-)?runtime$/ }, () => ({
        path: SHIM_JSX_RUNTIME,
        namespace: NS,
      }));
      build.onLoad({ filter: /.*/, namespace: NS }, (a) => {
        const contents = SHIM_SOURCE[a.path];
        if (!contents) throw new Error(`lw-bundle: no shim source for ${a.path}`);
        return { contents, loader: "js", resolveDir: ROOT };
      });
    },
  };
}

/* The classic transform, because the cards get React as a UMD global and `jsx: "automatic"` would
   emit a `react/jsx-runtime` import instead. `inject` binds the `React` the factory names in the
   45 components that never import it — without it those files would resolve `React` off the
   ambient <script> global, which works only as long as every page happens to load React first. */
const JSX = {
  jsx: "transform",
  jsxFactory: "React.createElement",
  jsxFragment: "React.Fragment",
  inject: [SHIM_INJECT],
};

/* ---- step 1: what does the barrel pull in, and what does each of those export? ----------- */

/** Transitive first-party inputs of the barrel, plus the barrel's own export list. */
async function readGraph() {
  const probe = await esbuild.build({
    entryPoints: [BARREL],
    absWorkingDir: ROOT,
    bundle: true,
    write: false,
    metafile: true,
    format: "esm",
    outfile: "lw-bundle-probe.js",
    plugins: [shimPlugin()],
    ...JSX,
  });
  const inputs = Object.keys(probe.metafile.inputs).filter((p) => !p.startsWith(`${NS}:`));
  const barrelExports = Object.values(probe.metafile.outputs)[0].exports;
  return { inputs, barrelExports: new Set(barrelExports) };
}

/** `{ "components/primitives/Card.jsx": ["Card", "CardBody", …] }` — from esbuild, not a regex. */
async function readExports(inputs) {
  const probe = await esbuild.build({
    entryPoints: inputs,
    absWorkingDir: ROOT,
    bundle: false,
    write: false,
    metafile: true,
    format: "esm",
    outdir: "lw-bundle-probe",
    jsx: "preserve",
  });
  const byFile = {};
  for (const out of Object.values(probe.metafile.outputs)) {
    if (out.entryPoint) byFile[out.entryPoint] = out.exports;
  }
  return byFile;
}

/* ---- step 2: decide the namespace surface ------------------------------------------------ */

/**
 * Which file does the barrel re-export each name from? Parsed the same way `lw-dts-barrel.mjs`
 * parses it — react.js is re-export-only by design — and then cross-checked against esbuild's
 * export list, so a parse that misses a line is a hard failure rather than a dropped component.
 */
async function readBarrelMap(barrelExports) {
  const src = await readFile(path.join(ROOT, BARREL), "utf8");
  const map = new Map();
  for (const m of src.matchAll(/export\s*\{([^}]*)\}\s*from\s*"([^"]+)"/g)) {
    const sourcePath = m[2].replace(/^\.\//, "");
    for (const raw of m[1].split(",").map((s) => s.trim()).filter(Boolean)) {
      const name = raw.includes(" as ") ? raw.split(/\s+as\s+/)[1].trim() : raw;
      map.set(name, sourcePath);
    }
  }
  const parsed = new Set(map.keys());
  const missed = [...barrelExports].filter((n) => !parsed.has(n));
  const invented = [...parsed].filter((n) => !barrelExports.has(n));
  if (missed.length || invented.length) {
    throw new Error(
      `lw-bundle: could not read ${BARREL}'s re-exports.\n` +
        (missed.length ? `  esbuild sees but the parser missed: ${missed.join(", ")}\n` : "") +
        (invented.length ? `  the parser invented: ${invented.join(", ")}\n` : "") +
        `  The barrel is meant to be re-export-only — see CLAUDE.md.`,
    );
  }
  return map;
}

function partitionExports(exportsByFile, barrelMap) {
  const exposed = [...barrelMap].map(([name, sourcePath]) => ({ name, sourcePath, viaBarrel: true }));
  const unexposed = [];
  const extraOwner = new Map();

  for (const sourcePath of Object.keys(exportsByFile).sort()) {
    if (sourcePath === BARREL) continue; // the barrel re-exports; provenance is the leaf
    for (const name of [...exportsByFile[sourcePath]].sort()) {
      if (barrelMap.get(name) === sourcePath) continue; // already exposed, same provenance
      /* Not a barrel export and not capitalised → an internal. Also: capitalised but the barrel
         already claims the name from another file → withheld, so the contract wins. */
      if (!/^[A-Z]/.test(name) || barrelMap.has(name)) {
        unexposed.push({ name, sourcePath });
        continue;
      }
      const first = extraOwner.get(name);
      if (first) {
        throw new Error(
          `lw-bundle: two modules export "${name}" (${first} and ${sourcePath}) and neither is ` +
            `re-exported by ${BARREL}. The namespace is flat, so nothing here can pick a winner — ` +
            `rename one, or add the one you mean to the barrel.`,
        );
      }
      extraOwner.set(name, sourcePath);
      exposed.push({ name, sourcePath, viaBarrel: false });
    }
  }

  exposed.sort((a, b) => a.sourcePath.localeCompare(b.sourcePath) || a.name.localeCompare(b.name));
  return { exposed, unexposed };
}

/* ---- step 3: the synthetic entry ---------------------------------------------------------- */

/**
 * Barrel names are imported FROM the barrel, not from the leaf that declares them: react.js is
 * the published contract, so anything it renames or wraps on the way out has to be what the
 * cards see. `sourcePath` in the header still records the leaf, which is the useful answer to
 * "where do I go to fix this component".
 */
function entrySource(exposed) {
  const byPath = new Map([[BARREL, []]]);
  for (const { name, sourcePath, viaBarrel } of exposed) {
    const from = viaBarrel ? BARREL : sourcePath;
    if (!byPath.has(from)) byPath.set(from, []);
    byPath.get(from).push(name);
  }
  const lines = [
    `/* GENERATED by tools/lw-bundle.mjs — the synthetic entry. */`,
    ...[...byPath].map(([p, names]) => `import { ${names.join(", ")} } from "./${p}";`),
    ``,
    `const __ds_ns = (globalThis.${NAMESPACE} = globalThis.${NAMESPACE} || {});`,
    `/* Kept for readers of the format-4 contract. esbuild has no per-file guard, so it stays`,
    `   empty — a module that throws at init now fails loudly instead of being collected. */`,
    `__ds_ns.__errors = __ds_ns.__errors || [];`,
    `Object.assign(__ds_ns, {`,
    ...exposed.map(({ name }) => `  ${name},`),
    `});`,
    ``,
  ];
  return lines.join("\n");
}

/* ---- step 4: the drift guard over the cards ------------------------------------------------ */

const CONSUMER_RE = new RegExp(String.raw`${NAMESPACE}\.([A-Za-z_$][\w$]*)`, "g");
const DESTRUCTURE_RE = new RegExp(
  String.raw`(?:const|let|var)\s*\{([^}]*)\}\s*=\s*(?:window\.|globalThis\.)?${NAMESPACE}`,
  "g",
);

async function walkHtml(dir, out = []) {
  for (const e of await readdir(dir, { withFileTypes: true })) {
    if (e.name === "node_modules" || e.name.startsWith(".")) continue;
    const p = path.join(dir, e.name);
    if (e.isDirectory()) await walkHtml(p, out);
    else if (e.name.endsWith(".html")) out.push(p);
  }
  return out;
}

async function assertCardsCovered(exposed) {
  const known = new Set(exposed.map((e) => e.name));
  const wanted = new Map(); // name -> first file that wants it
  for (const file of await walkHtml(ROOT)) {
    const src = await readFile(file, "utf8");
    const rel = path.relative(ROOT, file);
    const note = (n) => {
      if (n && !n.startsWith("__") && !wanted.has(n)) wanted.set(n, rel);
    };
    for (const m of src.matchAll(CONSUMER_RE)) note(m[1]);
    for (const m of src.matchAll(DESTRUCTURE_RE)) {
      for (const part of m[1].split(",")) note(part.trim().split(":")[0].trim());
    }
  }
  const orphans = [...wanted].filter(([n]) => !known.has(n));
  if (orphans.length) {
    throw new Error(
      `lw-bundle: ${orphans.length} name(s) a card reads off ${NAMESPACE} are not on it:\n` +
        orphans.map(([n, f]) => `  ${n}  (${f})`).join("\n") +
        `\nA card that reads an absent key renders blank, which axe scores as "no violations".`,
    );
  }
  return wanted.size;
}

/* ---- step 5: build ------------------------------------------------------------------------- */

const shortHash = (buf) => createHash("sha256").update(buf).digest("hex").slice(0, 12);

async function generate() {
  const { inputs, barrelExports } = await readGraph();
  const [exportsByFile, barrelMap] = await Promise.all([
    readExports(inputs),
    readBarrelMap(barrelExports),
  ]);
  const { exposed, unexposed } = partitionExports(exportsByFile, barrelMap);
  const cardNames = await assertCardsCovered(exposed);

  const built = await esbuild.build({
    stdin: { contents: entrySource(exposed), resolveDir: ROOT, sourcefile: ENTRY_NAME, loader: "js" },
    absWorkingDir: ROOT,
    bundle: true,
    write: false,
    metafile: true,
    format: "iife",
    platform: "browser",
    target: "es2020",
    minify: false,
    sourcemap: false,
    legalComments: "inline",
    charset: "utf8",
    plugins: [shimPlugin()],
    ...JSX,
  });

  /* Hash what actually went in, so the header answers "which sources is this bundle FROM?" and
     `--check` fails the moment one of them moves. Keys are repo-relative; the synthetic entry and
     the shims are excluded because they are derived, not authored. */
  const bundled = Object.keys(built.metafile.inputs)
    .filter((p) => !p.startsWith(`${NS}:`) && p !== ENTRY_NAME)
    .sort();
  const sourceHashes = {};
  for (const rel of bundled) sourceHashes[rel] = shortHash(await readFile(path.join(ROOT, rel)));

  const meta = {
    format: FORMAT,
    namespace: NAMESPACE,
    generator: "tools/lw-bundle.mjs",
    esbuild: esbuild.version,
    components: exposed.map(({ name, sourcePath }) => ({ name, sourcePath })),
    sourceHashes,
    /* Nothing external is inlined: react / react-dom resolve to the page globals. */
    inlinedExternals: [],
    unexposedExports: unexposed,
  };

  const text = `/* @ds-bundle: ${JSON.stringify(meta)} */\n${built.outputFiles[0].text}`;
  return { text, exposed, unexposed, bundled, cardNames };
}

/* ---- cli ----------------------------------------------------------------------------------- */

const check = process.argv.includes("--check");

try {
  const { text, exposed, unexposed, bundled, cardNames } = await generate();
  const rel = path.relative(ROOT, OUT_PATH);

  if (check) {
    let current = null;
    try {
      current = await readFile(OUT_PATH, "utf8");
    } catch {
      /* absent — reported below */
    }
    if (current === text) {
      console.log(
        `_ds_bundle.js is current — ${exposed.length} exports on ${NAMESPACE} from ` +
          `${bundled.length} sources (${cardNames} names read by the cards).`,
      );
    } else {
      const why =
        current === null
          ? `${rel} is missing.`
          : `${rel} is ${current.length} bytes; a fresh build is ${text.length}.`;
      console.error(
        `${rel} is STALE.\n  ${why}\n` +
          `  The cards render from this file, not from components/**/*.jsx — until it is\n` +
          `  regenerated, check:a11y and check:visual are testing the previous sources.\n` +
          `  Fix: npm run bundle && git add ${rel}`,
      );
      process.exit(1);
    }
  } else {
    await writeFile(OUT_PATH, text);
    console.log(
      `wrote ${rel} — ${(text.length / 1024).toFixed(0)} KB, ${exposed.length} exports on ` +
        `${NAMESPACE}, ${unexposed.length} internal exports withheld, ${bundled.length} sources.`,
    );
  }
} catch (err) {
  console.error(err.message || err);
  process.exit(1);
}
