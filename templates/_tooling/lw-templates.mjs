#!/usr/bin/env node
/**
 * The templates gate — the invariants of `templates/**` that no other gate sees.
 *
 * Three of the six gates read CSS, one reads the barrel, two drive a browser.
 * None of them opens a `.dc.html`, so every rule CLAUDE.md states about the
 * templates was enforced by nothing but memory:
 *
 *  1. `ds-base.js` and `support.js` are GENERATED and byte-identical across all
 *     twelve templates. CLAUDE.md says "never hand-edit one copy" — and until
 *     this file existed, hand-editing one copy was undetectable. The twelve
 *     stay in step because everyone remembered to, which is not a mechanism.
 *
 *  2. A template must not load `lw.css` / `app.css` (the one-major shims)
 *     alongside the real layers — you get every rule twice, and specificity
 *     ties resolve by source order rather than by intent.
 *
 *  3. Landmarks. v1.1.5 swept `lang`, a main landmark and a skip link through
 *     the templates, and MISSED TWO (`ai-app-shell` and `docs-page` had a
 *     <main> with no id and no skip link). A sweep with no gate behind it is a
 *     one-time event; the next template added starts the drift over.
 *
 * Usage: node templates/_tooling/lw-templates.mjs
 */
import { readFileSync, readdirSync, statSync } from "node:fs";
import { createHash } from "node:crypto";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..", "..");
const TEMPLATES = join(ROOT, "templates");

/* Files generated once and copied into every template. A divergence here is
   either a hand-edit (the thing CLAUDE.md forbids) or a partial regeneration —
   both leave eleven templates on one runtime and one on another. */
const GENERATED = ["ds-base.js", "support.js"];

/* A template that legitimately has no skip link, with the reason. The point of
   naming them is that the list is short, greppable and arguable — the same
   discipline as `data-a11y-expect` on the cards. An empty exemption list would
   be a lie; a blanket "skip links are optional" would be a hole. */
const NO_SKIP_LINK = {
  email: "table-layout mail; clients strip in-document anchors, and there is no viewport to skip within",
  "pitch-deck": "a <deck-stage> web component owns focus and keyboard navigation for the whole surface",
};

const dirs = readdirSync(TEMPLATES)
  .filter((d) => !d.startsWith("_") && statSync(join(TEMPLATES, d)).isDirectory())
  .sort();

const problems = [];
const note = (m) => problems.push(m);

if (!dirs.length) {
  // Same reasoning as _cards.mjs: an empty walk must never read as a clean run.
  console.error("lw-templates: no template directories found under templates/. Refusing to report a clean run.");
  process.exit(1);
}

/* ---- 1. the generated files are identical everywhere -------------------- */
for (const file of GENERATED) {
  const byHash = new Map();
  for (const d of dirs) {
    let buf;
    try {
      buf = readFileSync(join(TEMPLATES, d, file));
    } catch {
      note(`${d}/${file} is missing — every template carries the generated pair`);
      continue;
    }
    const h = createHash("sha256").update(buf).digest("hex").slice(0, 12);
    if (!byHash.has(h)) byHash.set(h, []);
    byHash.get(h).push(d);
  }
  if (byHash.size > 1) {
    // Report the ODD ONE OUT, not just "they differ" — with twelve copies the
    // useful answer is which one to revert.
    const groups = [...byHash.entries()].sort((a, b) => b[1].length - a[1].length);
    const [, majority] = groups[0];
    note(
      `${file} is not byte-identical across the twelve templates — it is generated, so one copy was hand-edited:\n` +
        groups
          .map(([h, ds]) => `      ${h}  ${ds.join(", ")}${ds === majority ? "   (majority)" : ""}`)
          .join("\n")
    );
  }
}

/* ---- 2 & 3. per-template document invariants ---------------------------- */
for (const d of dirs) {
  const htmls = readdirSync(join(TEMPLATES, d)).filter((f) => f.endsWith(".dc.html"));
  if (!htmls.length) {
    note(`${d}/ has no *.dc.html`);
    continue;
  }
  for (const name of htmls) {
    const src = readFileSync(join(TEMPLATES, d, name), "utf8");
    const where = `${d}/${name}`;

    /* Strip comments and script bodies before looking for a shim load. Three
       templates DISCUSS app.css in a code comment ("the colours stay in
       app.css"), and a substring match called all three a violation — a gate
       that cries wolf on prose gets muted, which is worse than not having it. */
    const markup = src
      .replace(/<!--[\s\S]*?-->/g, "")
      .replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, "")
      .replace(/\/\*[\s\S]*?\*\//g, "");
    for (const m of markup.matchAll(/(?:href|src)\s*=\s*["']([^"']*\/(?:lw|app)\.css)["']/gi)) {
      note(`${where} loads the shim ${m[1]} — it @imports the real layers, so every rule lands twice`);
    }

    if (!/<html[^>]*\slang\s*=\s*["'][^"']+["']/i.test(src)) {
      note(`${where} has no lang on <html> — a screen reader picks a voice per document, not per app`);
    }

    const hasMain = /<main\b/i.test(src) || /\srole\s*=\s*["']main["']/i.test(src);
    if (!hasMain) note(`${where} has no main landmark`);

    const skip = src.match(/class\s*=\s*["'][^"']*\blw-skip\b[^"']*["'][^>]*href\s*=\s*["']#([^"']+)["']/i);
    if (!skip) {
      if (!(d in NO_SKIP_LINK)) note(`${where} has no .lw-skip link (add one, or add ${d} to NO_SKIP_LINK with a reason)`);
    } else {
      // A skip link pointing at nothing is worse than none: it takes focus to
      // the top of the document and looks, to the user, like the key did not work.
      const target = skip[1];
      const hit = new RegExp(`\\sid\\s*=\\s*["']${target.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}["']`, "i");
      if (!hit.test(src)) note(`${where} skip link targets #${target}, which no element declares`);
      if (d in NO_SKIP_LINK) note(`${where} HAS a skip link but is listed in NO_SKIP_LINK — drop the exemption`);
    }
  }
}

if (problems.length) {
  console.error(`lw-templates: ${problems.length} problem(s):`);
  for (const p of problems) console.error("  · " + p);
  process.exit(1);
}
const exempt = Object.keys(NO_SKIP_LINK).length;
console.log(
  `lw-templates: OK — ${dirs.length} templates, ${GENERATED.length} generated files byte-identical across all of them, ` +
    `landmarks and skip links present (${exempt} documented skip-link exemption${exempt === 1 ? "" : "s"}).`
);
