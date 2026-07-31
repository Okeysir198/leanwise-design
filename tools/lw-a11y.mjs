#!/usr/bin/env node
/**
 * axe over every specimen card, on both grounds.
 *
 * The contrast gate covers TOKEN PAIRS in isolation; nothing until now covered
 * rendered ARIA — a role that is wrong in composition, a control with no
 * accessible name, a heading order that only breaks inside a card. This closes
 * that gap, and it is the reason the cards are worth keeping honest.
 *
 * Colour-contrast rules are left ON: the token gate proves the palette, this
 * proves the palette as actually composed, and the two disagreeing is itself the
 * finding.
 *
 * Usage: node templates/_tooling/lw-a11y.mjs
 */
import { readFileSync } from "node:fs";
import { collectCards } from "./_cards.mjs";
import { dirname, join, relative } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");

let chromium, axeSource;
try {
  ({ chromium } = await import("playwright"));
  const axe = await import("axe-core");
  axeSource = axe.source || readFileSync(join(ROOT, "node_modules/axe-core/axe.min.js"), "utf8");
} catch {
  console.error("lw-a11y: needs playwright and axe-core. `npm i -D playwright axe-core && npx playwright install chromium`, then re-run.");
  process.exit(2);
}

const cards = collectCards(ROOT);

const browser = await chromium.launch();
const findings = [];

/* Four pages, each card navigated ONCE, and axe injected per PAGE rather than
   per navigation — `addScriptTag` re-compiled 559 KB of axe on all 68 visits,
   ~38 MB of parse per run. `addInitScript` on the context makes it 4 compiles.
   The fixed 200ms settle was half the gate's wall clock; wait for fonts and a
   mounted root instead, which is what it was standing in for. */
const WORKERS = 4;

async function scanCard(page, card) {
  await page.goto(pathToFileURL(card).href, { waitUntil: "load" });
  // Freeze motion, as the visual gate does. Flipping the theme in place starts
  // every colour transition at once, and axe reading a mid-transition frame
  // scores a blend of the two themes — an .lw-input measured 1.18 halfway
  // between its light and dark background. The old code navigated afresh per
  // ground and then slept 200ms, which outlasted the transition by accident
  // rather than by design.
  await page.addStyleTag({ content: "*,*::before,*::after{animation:none !important;transition:none !important}" });
  // 21 of these cards pull React and Babel from unpkg. If that fails, the
  // roots stay empty, axe finds nothing on an empty div, and the gate passes
  // green on a card it never actually inspected. Refuse to score a blank card.
  await page.waitForFunction(() => document.fonts.status === "loaded" && document.body.innerText.trim().length > 0,
    null, { timeout: 15000 }).catch(() => {
    throw new Error("lw-a11y: " + relative(ROOT, card) + " rendered nothing — _ds_bundle.js or the CDN scripts failed to load. Refusing to report it as clean.");
  });
  for (const theme of [null, "dark"]) {
    await page.evaluate((t) => {
      document.documentElement.classList.toggle("dark", t === "dark");
      if (t) document.documentElement.setAttribute("data-theme", t);
      else document.documentElement.removeAttribute("data-theme");
    }, theme);
    // The cards re-derive their swatches on a theme flip through a
    // MutationObserver, which lands on a `setTimeout(…, 0)`. Navigating once
    // per card instead of once per ground means axe would otherwise read the
    // page mid-rehydrate and score the OLD ink against the NEW plate.
    await page.evaluate(() => new Promise((r) => setTimeout(() => requestAnimationFrame(() => r()), 0)));
    const res = await page.evaluate(async () => {
      const r = await window.axe.run(document, {
        runOnly: { type: "tag", values: ["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"] },
      });
      // Resolve each node's target back to its element while still in the page,
      // and record whether it opted out of THIS rule. Node objects do not carry
      // the element across the bridge, so the lookup has to happen here.
      for (const v of r.violations) {
        for (const n of v.nodes) {
          const el = document.querySelector(n.target.join(" "));
          n.expects = el ? (el.getAttribute("data-a11y-expect") || "").split(/\s+/) : [];
        }
      }
      return r;
    });
    // A specimen that DEMONSTRATES a failure must be allowed to fail it. The
    // neutrals card prints text-4's sub-AA ratio next to the swatch as the whole
    // point of the row; recolouring it to green the gate would make the card
    // assert the opposite of its own caption. `data-a11y-expect="<rule-id>"`
    // opts one node out of one rule — never a whole card, never a whole rule,
    // and it is greppable, so the exemptions stay countable.
    for (const v of res.violations) {
      v.nodes = v.nodes.filter((n) => !n.expects.includes(v.id));
      if (!v.nodes.length) continue;
      findings.push({
        card: relative(ROOT, card), ground: theme || "light",
        id: v.id, impact: v.impact, nodes: v.nodes.length,
        help: v.help, target: v.nodes[0].target.join(" "),
      });
    }
  }
}

/* try/finally around BOTH the worker body and the pool. `scanCard` THROWS on a
   card that rendered nothing (the CDN case above) — deliberately. But
   Promise.all rejects on the first such throw, and every `close()` written after
   it, the page's and the browser's alike, is then simply never reached: the
   process exits on the unhandled rejection with a live Chromium behind it, one
   leaked browser per failing run. The gate is supposed to fail on that card; it
   is not supposed to leak a browser on the way out. */
const queue = cards.slice();
try {
  await Promise.all(Array.from({ length: Math.min(WORKERS, queue.length) }, async () => {
    const page = await browser.newPage({ viewport: { width: 1280, height: 900 } });
    try {
      await page.addInitScript(axeSource);
      for (let card; (card = queue.shift()); ) await scanCard(page, card);
    } finally {
      await page.close();
    }
  }));
} finally {
  await browser.close();
}

if (!findings.length) {
  console.log("lw-a11y: " + cards.length + " cards × 2 grounds — no violations.");
  process.exit(0);
}
console.error("lw-a11y: " + findings.length + " violation group(s):");
for (const f of findings) {
  console.error("  · [" + f.impact + "] " + f.id + " — " + f.card + " (" + f.ground + ", " + f.nodes + " node" + (f.nodes > 1 ? "s" : "") + ")");
  console.error("      " + f.help + (f.target ? "  →  " + f.target : ""));
}
// serious and critical fail the build; moderate and minor are reported and pass,
// so the gate can be adopted without a week of triage before it ever runs green.
const hard = findings.filter(f => f.impact === "serious" || f.impact === "critical");
process.exit(hard.length ? 1 : 0);
