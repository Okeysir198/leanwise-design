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
import { readdirSync, readFileSync } from "node:fs";
import { dirname, join, relative } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..", "..");

let chromium, axeSource;
try {
  ({ chromium } = await import("playwright"));
  const axe = await import("axe-core");
  axeSource = axe.source || (await import("node:fs")).readFileSync(join(ROOT, "node_modules/axe-core/axe.min.js"), "utf8");
} catch {
  console.error("lw-a11y: needs playwright and axe-core. `npm i -D playwright axe-core && npx playwright install chromium`, then re-run.");
  process.exit(2);
}

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

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1280, height: 900 } });
const findings = [];

for (const card of cards) {
  for (const theme of [null, "dark"]) {
    await page.goto(pathToFileURL(card).href, { waitUntil: "load" });
    await page.evaluate((t) => {
      document.documentElement.classList.toggle("dark", t === "dark");
      if (t) document.documentElement.setAttribute("data-theme", t);
    }, theme);
    await page.waitForTimeout(200);
    await page.addScriptTag({ content: axeSource });
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
      v.nodes = v.nodes.filter((n) => !(n.expects || []).includes(v.id));
      if (!v.nodes.length) continue;
      findings.push({
        card: relative(ROOT, card), ground: theme || "light",
        id: v.id, impact: v.impact, nodes: v.nodes.length,
        help: v.help, target: v.nodes[0] && v.nodes[0].target.join(" "),
      });
    }
  }
}
await browser.close();

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
