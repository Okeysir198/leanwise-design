/**
 * FORCED COLORS: the decoration goes, the CONTENT STAYS.
 *
 * Every marketing ground is a content WRAPPER that paints through ::before /
 * ::after. Under `forced-colors: active` only the pseudo-elements may be
 * hidden; the wrapper itself must survive with all of its text. Reading the
 * rule is not enough, so this opens a real Chromium at forcedColors "active"
 * over a fixture that loads marketing.css and reads computed style.
 *
 *   node tools/lw-forced-colors.mjs
 *   node tools/lw-forced-colors.mjs --self-test   # prove both failure modes are caught
 */
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { pathToFileURL } from "node:url";
import { ROOT } from "./_generated.mjs";
import { report } from "./_report.mjs";

/* theme.css's :root/.dark variable blocks, without the Tailwind at-rules. */
function themeVars() {
  const css = readFileSync(join(ROOT, "theme.css"), "utf8");
  return [...css.matchAll(/^(:root|\.dark)\s*\{[^}]*\}/gm)].map((m) => m[0]).join("\n");
}

let chromium;
try { ({ chromium } = await import("playwright")); }
catch {
  console.error("lw-forced-colors: needs playwright. `npm i -D playwright && npx playwright install chromium`.");
  process.exit(1);
}

const WRAPPERS = [".lw-page-ground", ".lw-page-dark", ".lw-aurora", ".lw-hero"];

const FIXTURE = (vars) => `<!doctype html><html lang="en"><head><meta charset="utf-8"><title>grounds</title>
<style>${vars}</style><link rel="stylesheet" href="marketing.css"></head><body>
<div class="lw-page-ground"><p>ground content</p></div>
<div class="lw-page-dark"><p>dark ground content</p></div>
<div class="lw-aurora"><p>aurora content</p></div>
<section class="lw-hero dark"><div class="lw-container"><h1 class="lw-display">hero content</h1></div></section>
</body></html>`;

async function measure(page, sel) {
  return page.evaluate((s) => {
    const e = document.querySelector(s);
    if (!e) return null;
    const cs = getComputedStyle(e);
    return {
      display: cs.display,
      before: getComputedStyle(e, "::before").display,
      after: getComputedStyle(e, "::after").display,
      text: e.innerText.length,
      kids: e.querySelectorAll("*").length,
    };
  }, sel);
}

/** Load `url` twice and return { normal, forced } readings for every selector. */
async function readBoth(browser, url, selectors) {
  const out = {};
  for (const [mode, forcedColors] of [["normal", "none"], ["forced", "active"]]) {
    const ctx = await browser.newContext({ forcedColors });
    const page = await ctx.newPage();
    const errors = [];
    page.on("pageerror", (e) => errors.push(e.message));
    await page.goto(url, { waitUntil: "load", timeout: 60000 });
    for (const s of selectors) (out[s] ??= {})[mode] = await measure(page, s);
    if (errors.length) (out.__errors ??= []).push(...errors);
    await ctx.close();
  }
  return out;
}

function judge(readings, selectors) {
  const problems = [];
  let checked = 0;
  for (const sel of selectors) {
    const n = readings[sel]?.normal, f = readings[sel]?.forced;
    if (!n) { problems.push(`${sel} renders on no fixture — this gate is not measuring it`); continue; }
    checked++;
    if (f.display === "none") {
      problems.push(
        `${sel} is display:none under forced-colors, and it is a WRAPPER with ${n.kids} ` +
        `descendant(s) and ${n.text} characters of text — hiding it hides the content. ` +
        `Hide its ::before/::after instead.`);
    }
    if (n.text > 0 && f.text !== n.text) {
      problems.push(`${sel} loses text under forced-colors — ${n.text} chars normally, ${f.text} forced`);
    }
    const deco = [["::before", n.before, f.before], ["::after", n.after, f.after]];
    const painted = deco.filter(([, dn]) => dn !== "none");
    if (!painted.length) {
      problems.push(`${sel} paints no decorative pseudo-element even normally — the fixture is not exercising it`);
    }
    for (const [which, , df] of painted) {
      checked++;
      if (df !== "none") problems.push(`${sel}${which} is still painted under forced-colors (${df}) — decoration only adds noise once the palette is forced`);
    }
  }
  return { problems, checked };
}

const browser = await chromium.launch();
try {
  if (process.argv.includes("--self-test")) {
    const fake = (display, before) => ({
      ".x": { normal: { display: "block", before: "block", after: "block", text: 40, kids: 9 },
              forced: { display, before, after: "none", text: display === "none" ? 40 : 40 } },
    });
    const blanking = judge(fake("none", "none"), [".x"]);
    const noop     = judge(fake("block", "block"), [".x"]);
    const ok1 = blanking.problems.some((p) => p.includes("hiding it hides the content"));
    const ok2 = noop.problems.some((p) => p.includes("still painted under forced-colors"));
    console.log(`  ${ok1 ? "ok  " : "FAIL"} hiding a content wrapper is caught`);
    console.log(`  ${ok2 ? "ok  " : "FAIL"} decoration surviving is caught`);
    if (!ok1 || !ok2) process.exit(1);
    console.log("lw-forced-colors --self-test: both failure modes are detectable");
    process.exit(0);
  }

  /* Written beside marketing.css so its relative url()s resolve, then removed. */
  const { writeFileSync, rmSync } = await import("node:fs");
  const tmp = join(ROOT, ".lw-forced-colors.html");
  writeFileSync(tmp, FIXTURE(themeVars()));
  let readings;
  try { readings = await readBoth(browser, pathToFileURL(tmp).href, WRAPPERS); }
  finally { rmSync(tmp, { force: true }); }

  const { problems, checked } = judge(readings, WRAPPERS);
  process.exit(report("lw-forced-colors", {
    problems, checked, minChecked: 8,
    summary: `lw-forced-colors OK — ${WRAPPERS.length} ground wrapper(s) survive forced-colors with every decorative pseudo-element hidden (${checked} readings)`,
    footer: "No other gate here emulates forced-colors: contrast measures tokens, axe does not emulate it, and visual shoots the normal palette.",
  }));
} finally {
  await browser.close();
}
