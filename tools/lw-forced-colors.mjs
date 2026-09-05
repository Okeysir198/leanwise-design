/**
 * FORCED COLORS: the decoration goes, the CONTENT STAYS.
 *
 * ═══════════════════════════════════════════════════════════════════════════
 * WHY THIS GATE EXISTS — it is the one defect this package has SHIPPED twice
 * ═══════════════════════════════════════════════════════════════════════════
 *
 * base.css carries a `@media (forced-colors: active)` block, and its hide list
 * has been wrong in both possible directions:
 *
 *   through v2.3.0   `.lw-ground, .lw-aurora, .lw-sheen { display: none }`
 *                    Two of those three name NO rule in the package — the
 *                    ground is `.lw-page-ground` and `.lw-sheen` never existed.
 *                    A selector that matches nothing costs nothing and reports
 *                    nothing, so the line looked like protection and hid only
 *                    the aurora — including the aurora's own CONTENT.
 *
 *   in v3.0.0        `.lw-page-ground, .lw-aurora { display: none }`
 *                    The names were corrected and the bug got WORSE:
 *                    `.lw-page-ground` is `body > div` around the entire page
 *                    on the flagship consumer. A Windows High Contrast visitor
 *                    got a blank document. Measured on production: 0 characters
 *                    of body text. Shipped for one deploy.
 *
 * Both are the same mistake — reasoning about a forced-colors rule by READING
 * it. Nothing else here can see this: `check:contrast` measures tokens and
 * forced-colors ignores tokens; `check:a11y` runs axe, which does not emulate
 * forced-colors; `check:visual` shoots the normal palette. So this gate opens a
 * real Chromium at `forcedColors: "active"` and reads computed style.
 *
 * THE INVARIANT, and it is the useful half: every ground is a content WRAPPER
 * that paints through `::before` / `::after`. `.lw-page-ground` wraps the page;
 * `.lw-aurora` lifts its children with `z-index: var(--lw-z-raised)`. So the
 * decoration is the PSEUDO-ELEMENTS and only those may be hidden — the element
 * itself must survive, with all of its text.
 *
 *   node tools/lw-forced-colors.mjs
 *   node tools/lw-forced-colors.mjs --self-test   # prove it catches both bugs
 */
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { pathToFileURL } from "node:url";
import { ROOT } from "./_generated.mjs";
import { report } from "./_report.mjs";

let chromium;
try { ({ chromium } = await import("playwright")); }
catch {
  console.error("lw-forced-colors: needs playwright. `npm i -D playwright && npx playwright install chromium`.");
  process.exit(1);
}

/* The grounds live on ONE card, which is the card that exists because they were
   measured by nothing (CHANGELOG 1.13.0). `.lw-aurora` is rendered by no card at
   all, so it is exercised from the inline fixture below rather than pretended
   about — a gate that silently skips its second subject is the shape this file
   is here to stop. */
const CARD = "components/marketing/ground.card.html";
const WRAPPERS = [".lw-page-light", ".lw-page-dark", ".lw-page-ground", ".lw-aurora"];

const AURORA_FIXTURE = `<!doctype html><html lang="en"><head><meta charset="utf-8"><title>aurora</title>
<link rel="stylesheet" href="../tokens.css"><link rel="stylesheet" href="../base.css">
<link rel="stylesheet" href="../marketing.css"></head>
<body><div class="lw-aurora"><p>aurora content</p></div></body></html>`;

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
    /* Feed the checker the two rules this package actually shipped and require
       it to reject both. A gate nobody has seen fail is a hypothesis. */
    const fake = (display, before) => ({
      ".x": { normal: { display: "block", before: "block", after: "block", text: 40, kids: 9 },
              forced: { display, before, after: "none", text: display === "none" ? 40 : 40 } },
    });
    const blanking = judge(fake("none", "none"), [".x"]);      // v3.0.0's bug
    const noop     = judge(fake("block", "block"), [".x"]);     // pre-v3: decoration survives
    const ok1 = blanking.problems.some((p) => p.includes("hiding it hides the content"));
    const ok2 = noop.problems.some((p) => p.includes("still painted under forced-colors"));
    console.log(`  ${ok1 ? "ok  " : "FAIL"} hiding a content wrapper is caught (the v3.0.0 regression)`);
    console.log(`  ${ok2 ? "ok  " : "FAIL"} decoration surviving is caught (the pre-v3 no-op)`);
    if (!ok1 || !ok2) process.exit(1);
    console.log("lw-forced-colors --self-test: both failure modes are detectable");
    process.exit(0);
  }

  const readings = await readBoth(browser, pathToFileURL(join(ROOT, CARD)).href,
    [".lw-page-light", ".lw-page-dark", ".lw-page-ground"]);

  /* The aurora fixture is written into the repo's own preview/ directory so its
     relative stylesheet links resolve; it is removed again immediately. */
  const tmp = join(ROOT, "preview", ".lw-forced-colors-aurora.html");
  const { writeFileSync, rmSync } = await import("node:fs");
  writeFileSync(tmp, AURORA_FIXTURE);
  let aurora;
  try { aurora = await readBoth(browser, pathToFileURL(tmp).href, [".lw-aurora"]); }
  finally { rmSync(tmp, { force: true }); }
  Object.assign(readings, aurora);

  const { problems, checked } = judge(readings, WRAPPERS);
  process.exit(report("lw-forced-colors", {
    problems, checked, minChecked: 8,
    summary: `lw-forced-colors OK — ${WRAPPERS.length} ground wrapper(s) survive forced-colors with every decorative pseudo-element hidden (${checked} readings)`,
    footer: "No other gate here emulates forced-colors: contrast measures tokens, axe does not emulate it, and visual shoots the normal palette.",
  }));
} finally {
  await browser.close();
}
