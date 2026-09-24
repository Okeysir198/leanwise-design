/* Every preview card: an .html file whose source carries an `@dsCard` marker.
   Both browser checks enumerate from here, and refuse an empty list. */
import { readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";

const SKIP = new Set(["node_modules", "dist", "r", "fonts", "assets"]);

export function collectCards(ROOT) {
  const found = [];
  const walk = (dir) => {
    for (const e of readdirSync(dir, { withFileTypes: true })) {
      if (e.name.startsWith(".") || SKIP.has(e.name)) continue;
      const p = join(dir, e.name);
      if (e.isDirectory()) walk(p);
      else if (e.name.endsWith(".html") && readFileSync(p, "utf8").includes("@dsCard")) found.push(p);
    }
  };
  walk(ROOT);
  if (!found.length) throw new Error("no @dsCard pages found — refusing to report a clean run over nothing");
  return found.sort();
}

/* Load a card, wait for fonts, fail on any uncaught page error or an empty body. */
export async function openCard(page, file, url) {
  const errors = [];
  const onErr = (e) => errors.push(String(e));
  page.on("pageerror", onErr);
  try {
    await page.goto(url, { waitUntil: "load" });
    await page.addStyleTag({ content: "*,*::before,*::after{animation:none!important;transition:none!important}" });
    await page.evaluate(() => document.fonts.ready);
    const kids = await page.evaluate(() => document.body.querySelectorAll("*").length);
    if (errors.length) throw new Error(`${file} threw while rendering:\n  ${errors.join("\n  ")}`);
    if (!kids) throw new Error(`${file} rendered no elements`);
  } finally {
    page.off("pageerror", onErr);
  }
}

export const setTheme = (page, dark) => page.evaluate((d) => {
  document.documentElement.classList.toggle("dark", d);
  return new Promise((r) => requestAnimationFrame(() => requestAnimationFrame(r)));
}, dark);
