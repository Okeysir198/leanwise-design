#!/usr/bin/env node
/**
 * lw-rsc — the React Server Component boundary.
 *
 *   node tools/lw-rsc.mjs            # write the directives
 *   node tools/lw-rsc.mjs --check    # fail if any file is wrong
 *   node tools/lw-rsc.mjs --list     # show the classification
 *
 * WHY. Until v1.2 this package shipped ZERO `"use client"` directives, so
 * `<Combobox>`, `<DataGrid>`, `<Dialog>` and `useTheme()` all threw the moment an
 * App Router page rendered them from a server component — which is the default
 * for every page in every Next app written since 2023, and therefore for every
 * app this design system is supposed to be the foundation of.
 *
 * The directive is written into the SOURCE, per file, not banner-injected at
 * build time. Three reasons: the `source` export condition serves the .jsx
 * directly, the shadcn registry copies the .jsx into a consumer's tree, and a
 * bundled chunk can carry only ONE directive — so a build-time banner would have
 * to mark everything client, which throws away the whole benefit.
 *
 * GATED BOTH WAYS on purpose. Asserting only that client files carry the
 * directive makes "put it on everything" the cheap fix, and that is exactly the
 * failure this exists to prevent: 43 of the 71 components are server-safe, and a
 * server component is the one that costs the consumer no JS.
 *
 * The classification is deliberately CONSERVATIVE — anything that touches React
 * state, context, a browser global, or attaches its own handler is client. When
 * in doubt a file should be client; the cost is bundle size, whereas the cost of
 * being wrong the other way is a hard runtime error.
 */

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const HERE = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(HERE, "..");
const MODE = process.argv.includes("--check") ? "check" : process.argv.includes("--list") ? "list" : "write";

const red = (s) => `\x1b[31m${s}\x1b[0m`;
const green = (s) => `\x1b[32m${s}\x1b[0m`;
const dim = (s) => `\x1b[2m${s}\x1b[0m`;

const DIRECTIVE = '"use client";';

/* What forces a module to the client. */
const CLIENT_SIGNALS = [
  [/\buse(State|Reducer|Effect|LayoutEffect|Ref|Callback|Memo|Context|Id|Transition|DeferredValue|SyncExternalStore|ImperativeHandle)\b/, "a React hook"],
  [/\bcreateContext\b/, "createContext"],
  [/\b(window|document|localStorage|sessionStorage|navigator|matchMedia)\b/, "a browser global"],
  [/\bon[A-Z][a-zA-Z]*=\{\s*\(/, "an inline event handler"],
  [/\bcreatePortal\b/, "createPortal"],
];

/** Files outside components/ that are part of the public surface. */
const EXTRA = ["hooks.js", "brand.js", "react.js"];

function classify(file) {
  // Strip comments so a `useEffect` inside a comment does not force a whole
  // subtree client — Icon.jsx documents exactly that decision in prose.
  const src = fs.readFileSync(file, "utf8")
    .replace(/\/\*[\s\S]*?\*\//g, "")
    .replace(/^\s*\/\/.*$/gm, "");
  for (const [re, why] of CLIENT_SIGNALS) if (re.test(src)) return why;
  return null;
}

const files = [];
(function walk(dir) {
  for (const e of fs.readdirSync(dir).sort()) {
    const p = path.join(dir, e);
    if (fs.statSync(p).isDirectory()) { walk(p); continue; }
    if (/\.(jsx|js)$/.test(p)) files.push(p);
  }
})(path.join(ROOT, "components"));
for (const f of EXTRA) {
  const p = path.join(ROOT, f);
  if (fs.existsSync(p)) files.push(p);
}

const hasDirective = (src) => /^\s*(["'])use client\1\s*;?/.test(src);

const rows = [];
let wrote = 0;
const wrong = [];

for (const file of files) {
  const rel = path.relative(ROOT, file);
  const why = classify(file);
  const src = fs.readFileSync(file, "utf8");
  const has = hasDirective(src);
  rows.push([rel, why, has]);

  if (why && !has) {
    if (MODE === "write") {
      fs.writeFileSync(file, `${DIRECTIVE}\n${src}`);
      wrote++;
    } else {
      wrong.push([rel, `needs "use client" (${why}) — it will throw in an App Router server component`]);
    }
  } else if (!why && has) {
    if (MODE === "write") {
      fs.writeFileSync(file, src.replace(/^\s*(["'])use client\1\s*;?\s*\n/, ""));
      wrote++;
    } else {
      wrong.push([rel, 'carries "use client" but has no client signal — it costs the consumer JS for nothing']);
    }
  }
}

if (MODE === "list") {
  const client = rows.filter((r) => r[1]);
  const server = rows.filter((r) => !r[1]);
  console.log(`\nclient (${client.length})`);
  for (const [rel, why, has] of client) console.log(`  ${has ? "ok  " : red("MISS")} ${rel.padEnd(46)} ${dim(why)}`);
  console.log(`\nserver-safe (${server.length}) — these cost the consumer no JS`);
  for (const [rel, , has] of server) console.log(`  ${has ? red("EXTRA") : "ok   "} ${rel}`);
  process.exit(0);
}

if (MODE === "check") {
  if (wrong.length) {
    console.error(red(`\nlw-rsc: ${wrong.length} file(s) on the wrong side of the server/client boundary.\n`));
    for (const [rel, msg] of wrong) console.error(`  ${rel}\n      ${msg}`);
    console.error(
      "\n  Run `npm run rsc` to fix. Note this is checked BOTH ways: marking everything\n" +
      '  "use client" is not the cheap fix, it is the failure mode — a server component\n' +
      "  is the one that ships the consumer no JavaScript.\n",
    );
    process.exit(1);
  }
  const c = rows.filter((r) => r[1]).length;
  console.log(green(`lw-rsc: OK — ${c} client module(s) declared, ${rows.length - c} server-safe, none mismarked.`));
  process.exit(0);
}

const c = rows.filter((r) => r[1]).length;
console.log(green(`lw-rsc: ${wrote} file(s) updated. ${c} client, ${rows.length - c} server-safe.`));
