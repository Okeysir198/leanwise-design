#!/usr/bin/env node
/* Writes the preview surface (cards, _ds_bundle.js, preview/preview.css, _ds_manifest.json).
     node tools/lw-bundle.mjs            write
     node tools/lw-bundle.mjs --check    fail when a committed file is stale */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { buildPreview } from "../scripts/lib/bundle.mjs";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const check = process.argv.includes("--check");

const outputs = await buildPreview(ROOT);
let stale = 0;
for (const [file, want] of Object.entries(outputs)) {
  const abs = path.join(ROOT, file);
  const have = fs.existsSync(abs) ? fs.readFileSync(abs, "utf8") : null;
  if (have === want) continue;
  if (check) { console.error(`stale: ${file} — run \`node tools/lw-bundle.mjs\``); stale++; }
  else { fs.mkdirSync(path.dirname(abs), { recursive: true }); fs.writeFileSync(abs, want); console.log(`wrote ${file}`); }
}
if (stale) process.exit(1);
if (check) console.log(`lw-bundle: ${Object.keys(outputs).length} file(s) current`);
