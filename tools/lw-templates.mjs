#!/usr/bin/env node
/* Template invariants, over every templates/<name>/*.dc.html:
     - support.js and ds-base.js live ONLY in templates/_shared/;
     - the head loads React 19 (preview/_vendor) BEFORE support.js, so the runtime
       does not fetch React 18 from a CDN; ds-base.js is loaded after support.js;
     - an @template marker, lang on <html>, a main landmark, a "Skip to content"
       link whose target exists;
     - no hex colour literal: a template names theme roles, never values.
   Usage: node tools/lw-templates.mjs */
import { existsSync, readFileSync, readdirSync, statSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const TEMPLATES = join(ROOT, "templates");
const SHARED = ["support.js", "ds-base.js"];
const LOADS = ["../../preview/_vendor/react.js", "../../preview/_vendor/react-dom.js", "../_shared/support.js", "../_shared/ds-base.js"];

const dirs = readdirSync(TEMPLATES).filter((d) => !d.startsWith("_") && statSync(join(TEMPLATES, d)).isDirectory()).sort();
const problems = [];
const note = (m) => problems.push(m);

for (const f of SHARED) if (!existsSync(join(TEMPLATES, "_shared", f))) note(`_shared/${f} is missing`);

let files = 0;
for (const d of dirs) {
  for (const f of SHARED) if (existsSync(join(TEMPLATES, d, f))) note(`${d}/${f}: the runtime lives only in templates/_shared/ — delete this copy`);
  const htmls = readdirSync(join(TEMPLATES, d)).filter((f) => f.endsWith(".dc.html"));
  if (!htmls.length) note(`${d}/ has no *.dc.html`);
  for (const name of htmls) {
    files++;
    const where = `${d}/${name}`;
    const src = readFileSync(join(TEMPLATES, d, name), "utf8");
    const code = src.replace(/<!--[\s\S]*?-->/g, "");

    const loads = [...code.matchAll(/<script\b[^>]*\ssrc="([^"]+)"/g)].map((m) => m[1]);
    if (loads.join(" ") !== LOADS.join(" ")) note(`${where} loads [${loads.join(", ")}] — expected ${LOADS.join(", ")}`);
    if (!/<!-- @template name="[^"]+" description="[^"]+" -->/.test(src)) note(`${where} has no @template name/description marker`);
    if (!/<html[^>]*\slang="[^"]+"/.test(src)) note(`${where} has no lang on <html>`);
    if (!/<main\b/.test(code)) note(`${where} has no <main> landmark`);

    const skip = code.match(/<a\b[^>]*href="#([^"]+)"[^>]*>Skip to content<\/a>/);
    if (!skip) note(`${where} has no "Skip to content" link`);
    else if (!new RegExp(`\\sid="${skip[1]}"`).test(code)) note(`${where} skip link targets #${skip[1]}, which no element declares`);

    for (const m of code.matchAll(/#[0-9a-fA-F]{3,8}\b/g)) {
      if (!/href="#/.test(code.slice(m.index - 6, m.index + 1))) note(`${where} has a hex literal ${m[0]} — use a theme role`);
    }
  }
}

if (!files) note("no templates found");
if (problems.length) {
  for (const p of problems) console.error("  " + p);
  console.error(`lw-templates: ${problems.length} problem(s)`);
  process.exit(1);
}
console.log(`lw-templates: OK — ${files} templates`);
