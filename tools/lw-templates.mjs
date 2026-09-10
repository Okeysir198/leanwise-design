#!/usr/bin/env node
/**
 * The templates gate — the invariants of `templates/**` that no other gate sees.
 *
 * Three of the six gates read CSS, one reads the barrel, two drive a browser.
 * None of them opens a `.dc.html`, so every rule CLAUDE.md states about the
 * templates was enforced by nothing but memory:
 *
 *  1. `ds-base.js` and `support.js` are the ONE runtime every template shares,
 *     and since v1.13.0 they live ONCE, in `templates/_shared/`. Until then each
 *     of the twelve directories carried its own byte-identical copy (12 × 71 KB),
 *     and this rule's job was to prove the copies had not drifted. Now it proves
 *     three things instead: both shared files exist; every `.dc.html` loads
 *     exactly `../_shared/support.js` and then `../_shared/ds-base.js`, in that
 *     order (support.js defines what ds-base.js calls); and NO template directory
 *     contains a file by either name. That last one is the trap: there is no
 *     generator for these files in this repo — they arrive from the Claude Design
 *     project — and a wholesale re-pull recreates all twelve copies. Twelve
 *     stale duplicates that nothing loads would sit there silently forever, so
 *     a copy inside a template directory is a hard failure, not a warning.
 *
 *  2. (Removed in v2.0.0.) Through v1.x this rule caught a template loading the
 *     `lw.css` / `app.css` @import shims alongside the real layers. The shims
 *     are gone, and a `<link>` to a file that does not exist is a 404 the
 *     browser gates see; there is nothing left for a static rule to catch.
 *
 *  3. Landmarks. v1.1.5 swept `lang`, a main landmark and a skip link through
 *     the templates, and MISSED TWO (`ai-app-shell` and `docs-page` had a
 *     <main> with no id and no skip link). A sweep with no gate behind it is a
 *     one-time event; the next template added starts the drift over.
 *
 * Usage: node tools/lw-templates.mjs
 */
import { existsSync, readFileSync, readdirSync, statSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { report } from "./_report.mjs";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const TEMPLATES = join(ROOT, "templates");

/* The shared runtime, in load order. Not generated here (no generator exists in
   this repo — see the header); shared, so a hand-edit lands on every template
   at once rather than on one of twelve. */
const SHARED_DIR = "_shared";
const SHARED = ["support.js", "ds-base.js"];

/* A template that legitimately has no skip link, with the reason. The point of
   naming them is that the list is short, greppable and arguable — the same
   discipline as `data-a11y-expect` on the cards. An empty exemption list would
   be a lie; a blanket "skip links are optional" would be a hole. */
/* EMPTY since v4.0.0, and empty is the honest state: both entries described
   TEMPLATES rather than exceptions — `email` (mail clients strip in-document
   anchors) and `pitch-deck` (a <deck-stage> component owned the keyboard) —
   and both templates were removed. Every template that remains has a skip
   link, which is what the list should have been arguing for all along. */
const NO_SKIP_LINK = {};

const dirs = readdirSync(TEMPLATES)
  .filter((d) => !d.startsWith("_") && statSync(join(TEMPLATES, d)).isDirectory())
  .sort();

const problems = [];
const note = (m) => problems.push(m);

/* ---- 1. the shared runtime lives once, and every template loads it ------- */
for (const file of SHARED) {
  if (!existsSync(join(TEMPLATES, SHARED_DIR, file))) {
    note(`${SHARED_DIR}/${file} is missing — every template loads it from there`);
  }
}
for (const d of dirs) {
  for (const file of SHARED) {
    if (existsSync(join(TEMPLATES, d, file))) {
      note(
        `${d}/${file} exists — the runtime lives ONLY in templates/${SHARED_DIR}/. ` +
          "A design-project re-pull recreates the per-template copies; delete this one, nothing loads it",
      );
    }
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

    /* Order matters: support.js defines the helpers ds-base.js calls at load.
       Scanned over the comment-stripped SOURCE, with the script tags kept —
       they are exactly what this rule needs to see. */
    const loads = [...src.replace(/<!--[\s\S]*?-->/g, "").matchAll(/<script\b[^>]*\ssrc\s*=\s*["']([^"']*(?:support|ds-base)\.js)["']/gi)].map((m) => m[1]);
    const wantLoads = SHARED.map((f) => `../${SHARED_DIR}/${f}`);
    if (loads.join(" ") !== wantLoads.join(" ")) {
      note(`${where} loads [${loads.join(", ") || "nothing"}] — expected exactly ${wantLoads.join(" then ")}`);
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

const exempt = Object.keys(NO_SKIP_LINK).length;
process.exit(report("lw-templates", {
  problems,
  checked: dirs.length,
  minChecked: 1,
  summary:
    `lw-templates: OK — ${dirs.length} templates, ${SHARED.length} shared runtime files in ${SHARED_DIR}/ loaded in order by every one, ` +
    `landmarks and skip links present (${exempt} documented skip-link exemption${exempt === 1 ? "" : "s"}).`,
}));
