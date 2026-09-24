#!/usr/bin/env node
/* Every generated file, from one command. `--check` fails if any is stale. */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { buildThemeCss } from "./lib/theme.mjs";
import { buildTokensJson } from "./lib/tokens-json.mjs";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const check = process.argv.includes("--check");

const outputs = {
  "theme.css": buildThemeCss,
  "tokens.json": buildTokensJson,
};

let stale = 0;
for (const [file, build] of Object.entries(outputs)) {
  const want = await build();
  const abs = path.join(ROOT, file);
  const have = fs.existsSync(abs) ? fs.readFileSync(abs, "utf8") : null;
  if (have === want) continue;
  if (check) { console.error(`stale: ${file} — run \`npm run gen\``); stale++; }
  else { fs.writeFileSync(abs, want); console.log(`wrote ${file}`); }
}
if (stale) process.exit(1);
if (check) console.log(`gen: ${Object.keys(outputs).length} file(s) current`);
