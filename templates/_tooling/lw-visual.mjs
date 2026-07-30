#!/usr/bin/env node
/**
 * Visual regression over the specimen cards.
 *
 * The cards are ALREADY the right fixture set — one per component folder plus a
 * state matrix where there is a state axis — so this is close to free, and it is
 * what protects the CSS layers from each other. Every card is shot on both
 * grounds and both densities, because a change that only breaks compact-on-dark
 * is exactly the one no human notices.
 *
 * Baselines live in .visual/baseline; a run writes .visual/current and a diff.
 * First run records instead of failing — a missing baseline is not a regression.
 *
 * Requires playwright (a devDependency, deliberately not a peer): it is CI's
 * concern, and a consumer installing this package should not pull a browser.
 *
 * Usage: node templates/_tooling/lw-visual.mjs [--update]
 */
import { readdirSync, existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join, relative } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..", "..");
const OUT = join(ROOT, ".visual");
const update = process.argv.includes("--update");

let chromium;
try { ({ chromium } = await import("playwright")); }
catch {
  console.error("lw-visual: playwright is not installed. `npm i -D playwright && npx playwright install chromium`, then re-run.");
  process.exit(2);
}

// Walk for *.card.html and preview/*.html — the same set the design-system tab
// renders, found the same way (a @dsCard comment on line one).
const cards = [];
const walk = (dir) => {
  for (const e of readdirSync(dir, { withFileTypes: true })) {
    if (e.name.startsWith(".") || e.name === "node_modules") continue;
    const p = join(dir, e.name);
    if (e.isDirectory()) walk(p);
    else if (e.name.endsWith(".html") && readFileSync(p, "utf8").slice(0, 200).includes("@dsCard")) cards.push(p);
  }
};
walk(ROOT);

const MATRIX = [
  { name: "light", theme: null, density: "comfortable" },
  { name: "dark", theme: "dark", density: "comfortable" },
  { name: "light-compact", theme: null, density: "compact" },
  { name: "dark-compact", theme: "dark", density: "compact" },
];

mkdirSync(join(OUT, "baseline"), { recursive: true });
mkdirSync(join(OUT, "current"), { recursive: true });

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1280, height: 900 }, deviceScaleFactor: 1 });
let recorded = 0, changed = [];

for (const card of cards) {
  const id = relative(ROOT, card).replace(/[\/\\]/g, "__").replace(/\.html$/, "");
  for (const m of MATRIX) {
    await page.goto(pathToFileURL(card).href, { waitUntil: "load" });
    await page.evaluate(([theme, density]) => {
      const r = document.documentElement;
      r.classList.toggle("dark", theme === "dark");
      if (theme) r.setAttribute("data-theme", theme); else r.removeAttribute("data-theme");
      r.setAttribute("data-density", density);
    }, [m.theme, m.density]);
    // Fonts and the React roots both settle before the shot; animation is frozen
    // so a shimmer or a caret cannot make every run a diff.
    await page.addStyleTag({ content: "*,*::before,*::after{animation:none !important;transition:none !important;caret-color:transparent !important}" });
    await page.evaluate(() => document.fonts && document.fonts.ready);
    await page.waitForTimeout(250);
    const shot = await page.screenshot({ fullPage: true });
    const file = id + "__" + m.name + ".png";
    const basePath = join(OUT, "baseline", file);
    writeFileSync(join(OUT, "current", file), shot);
    if (!existsSync(basePath) || update) { writeFileSync(basePath, shot); recorded++; continue; }
    const before = readFileSync(basePath);
    if (!before.equals(shot)) changed.push(file);
  }
}
await browser.close();

const compared = cards.length * MATRIX.length - recorded;
console.log("lw-visual: " + cards.length + " cards × " + MATRIX.length + " grounds; " + recorded + " baseline(s) recorded, " + compared + " compared.");
if (!compared) {
  // Recording every shot and then printing "no visual change" reads as a pass.
  // It is not one — nothing was compared. Say so, because a gate that cannot
  // fail is indistinguishable from a gate that passed, and this one has never
  // had a committed baseline to compare against.
  console.log("lw-visual: NOTHING WAS COMPARED — every shot was a first recording.");
  console.log("  Baselines are byte-exact PNG matches, so they are machine-local: a set");
  console.log("  recorded here will not match CI's Chromium. Re-run to compare locally;");
  console.log("  for CI, record the baselines inside the CI image.");
  process.exit(0);
}
if (changed.length) {
  console.error("lw-visual: " + changed.length + " card(s) changed:");
  for (const c of changed) console.error("  · " + c);
  console.error("Review .visual/current against .visual/baseline. If the change is intended: npm run check:visual -- --update");
  process.exit(1);
}
console.log("lw-visual: no visual change.");
