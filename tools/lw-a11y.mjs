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
 * Usage: node tools/lw-a11y.mjs
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

/* Recorded in the page, read back at settle. See RENDER GUARD below.
   `global.ReactDOM = {}` is assigned by the UMD wrapper BEFORE the factory fills
   it, so a plain wrap of `createRoot` at init time would wrap nothing. The
   setter stores a Proxy over that same object instead, and the factory's later
   writes land on the proxy's target — so the `createRoot` the card reaches for
   is ours, whenever it was defined. */
const ROOT_RECORDER = () => {
  const roots = (window.__lwRoots = []);
  let real;
  Object.defineProperty(window, "ReactDOM", {
    configurable: true,
    get: () => real,
    set: (v) => {
      real = new Proxy(v, {
        get(t, k) {
          const val = Reflect.get(t, k);
          if (typeof val !== "function") return val;
          if (k === "createRoot" || k === "hydrateRoot") return (c, ...a) => (roots.push(c), val.call(t, c, ...a));
          if (k === "render") return (el, c, ...a) => (roots.push(c), val.call(t, el, c, ...a));
          return val;
        },
      });
    },
  });
};

/* -----------------------------------------------------------------------------
   THE RENDER GUARD, and why it had to be rebuilt.

   The old guard was `document.body.innerText.trim().length > 0`. It is the
   textbook shape of a gate that cannot fail: every specimen card wraps its React
   roots in several paragraphs of explanatory prose, so the body always has text
   whether or not a single component mounted. From v1.2.0 to v1.3.0 esbuild
   emitted `react/jsx-runtime` imports for every component (tools/lw-bundle.mjs
   has the full story), so EVERY React card threw at module evaluation and EVERY
   React specimen rendered blank — and this gate scored the prose around the hole
   and reported 39 cards clean, twice, across two minor releases. `check:visual`
   compared two equally blank plates and agreed.

   Two rules replace it, and both are things the old one structurally could not
   see:

     1. An uncaught page error fails the card. That is the direct signal — the
        v1.2 defect announced itself as `TypeError: import_jsx_runtime.jsx is not
        a function` on the console of every card, and nothing was listening.
     2. Every container passed to `createRoot`/`render` must end up with at least
        one element child. That is the structural signal, and it survives a
        failure mode that throws nothing at all (a component that returns null, a
        namespace key that silently reads `undefined`).

   Prose is no longer evidence of anything; keep it that way.
   -------------------------------------------------------------------------- */

async function scanCard(page, card) {
  page.__lwErrors = [];
  await page.goto(pathToFileURL(card).href, { waitUntil: "load" });
  // Freeze motion, as the visual gate does. Flipping the theme in place starts
  // every colour transition at once, and axe reading a mid-transition frame
  // scores a blend of the two themes — an .lw-input measured 1.18 halfway
  // between its light and dark background. The old code navigated afresh per
  // ground and then slept 200ms, which outlasted the transition by accident
  // rather than by design.
  await page.addStyleTag({ content: "*,*::before,*::after{animation:none !important;transition:none !important}" });
  // The cards are vendored, but a card can still fail to render — a bad bundle,
  // a namespace key that moved, a component that throws. axe finds nothing on an
  // empty div and reports it as clean, so refuse to score a card that did not
  // paint. Wait for fonts plus every React root having mounted something.
  // The wait ALSO resolves on an uncaught page error, so a card whose script
  // threw reports the throw in a second rather than timing out for fifteen and
  // then guessing. Babel transforms the card's script inline, so a throw inside
  // it surfaces as a page error, never as a rejected navigation — that is the
  // signal the blank-card era emitted on every single card, uncollected.
  await page.waitForFunction(() => window.__lwFailed || (document.fonts.status === "loaded"
      && document.body.innerText.trim().length > 0
      && (window.__lwRoots || []).every((c) => c && c.childElementCount > 0)),
    null, { timeout: 15000 }).catch(() => {
    throw new Error("lw-a11y: " + relative(ROOT, card) + " rendered nothing — no React root mounted, or the bundle failed to load. Refusing to report it as clean.");
  });
  if (page.__lwErrors.length) {
    throw new Error("lw-a11y: " + relative(ROOT, card) + " threw while rendering — refusing to score it.\n"
      + page.__lwErrors.map((e) => "      " + e).join("\n"));
  }
  // A root that mounted an EMPTY component still has to be named, because the
  // waitForFunction above only reports a timeout.
  const empty = await page.evaluate(() => (window.__lwRoots || [])
    .filter((c) => !c || c.childElementCount === 0)
    .map((c) => (c && (c.id ? "#" + c.id : c.tagName.toLowerCase())) || "(detached)"));
  if (empty.length) {
    throw new Error("lw-a11y: " + relative(ROOT, card) + " has " + empty.length
      + " empty React root(s): " + empty.join(", ") + ". Refusing to score the prose around a hole.");
  }
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
      await page.addInitScript(ROOT_RECORDER);
      page.on("pageerror", (e) => {
        (page.__lwErrors ||= []).push(String(e).split("\n")[0]);
        // Flip a flag the in-page wait can see, so the poll stops immediately
        // instead of burning its whole timeout on a card that is already dead.
        page.evaluate(() => { window.__lwFailed = true; }).catch(() => {});
      });
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
