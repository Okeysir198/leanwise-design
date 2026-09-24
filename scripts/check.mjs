#!/usr/bin/env node
/* The checks. `node scripts/check.mjs <lint|contrast|presence|a11y|visual|pack> [...]`.
   Every check refuses to pass vacuously: reading zero of what it measures fails. */
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { execFileSync } from "node:child_process";
import { fileURLToPath, pathToFileURL } from "node:url";
import { report } from "./lib/report.mjs";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const [cmd, ...args] = process.argv.slice(2);
const flag = (f) => args.includes(f);
const opt = (f, d) => { const i = args.indexOf(f); return i >= 0 ? args[i + 1] : d; };

const CHECKS = { lint, contrast, presence, a11y, visual, pack };
if (!CHECKS[cmd]) {
  console.error(`usage: check.mjs <${Object.keys(CHECKS).join("|")}>`);
  process.exit(2);
}
process.exit(await CHECKS[cmd]());

/* ---------------------------------------------------------------- lint */
async function lint() {
  const { lint: run } = await import("./lib/lint.mjs");
  const paths = args.filter((a) => !a.startsWith("-"));
  const targets = paths.length ? paths : [path.join(ROOT, "registry")];
  for (const t of targets) if (!fs.existsSync(t)) { console.error(`lw-token-lint: no such path: ${t}`); return 2; }
  const { problems, files } = run(targets);
  return report("lw-token-lint", { problems, checked: files, minChecked: 1, summary: `token lint: ${files} file(s) clean.` });
}

/* ------------------------------------------------------------ contrast */
async function contrast() {
  const { checkContrast } = await import("./lib/contrast.mjs");
  const palette = await import("../src/palette.mjs");
  const themeCss = fs.readFileSync(path.join(ROOT, "theme.css"), "utf8");
  const { problems, checked } = checkContrast({ ...palette, themeCss });
  return report("contrast", { problems, checked, minChecked: 300, summary: `contrast: ${checked} assertions hold.` });
}

/* ------------------------------------------------------------ presence */
async function presence() {
  const { compile, selectorOf } = await import("./lib/tw.mjs");
  const { themes, ramp } = await import("../src/palette.mjs");
  const { TYPE } = await import("./lib/theme.mjs");
  const colors = [...Object.keys(themes.light), ...Object.keys(ramp).map((k) => `brand-${k}`), "brand"];
  const classes = [
    ...colors.flatMap((c) => [`bg-${c}`, `text-${c}`, `border-${c}`, `ring-${c}`, `fill-${c}`]),
    ...Object.keys(TYPE).map((k) => `text-${k}`),
    "font-sans", "font-mono", "rounded-sm", "rounded-md", "rounded-lg", "rounded-xl", "dark:bg-primary",
  ];
  const css = await compile(ROOT, classes);
  /* Exact selector: `.bg-cta` must not be satisfied by `.bg-cta-foreground`. */
  const esc = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const missing = classes.filter((c) => !new RegExp(esc(selectorOf(c)) + "(?![\\w\\\\-])").test(css));
  return report("presence", {
    problems: missing.map((c) => `${c} compiles to nothing through theme.css`),
    checked: classes.length - missing.length, minChecked: 200,
    summary: `presence: ${classes.length} utilities compile.`,
  });
}

/* ---------------------------------------------------------------- a11y */
async function a11y() {
  const { collectCards, openCard, setTheme } = await import("./lib/cards.mjs");
  const { chromium } = await import("playwright");
  const axe = fs.readFileSync(path.join(path.dirname(fileURLToPath(await import.meta.resolve("axe-core"))), "axe.min.js"), "utf8");
  const cards = collectCards(ROOT);
  const browser = await chromium.launch();
  const problems = [];
  let scanned = 0;
  try {
    const page = await browser.newPage({ viewport: { width: 1280, height: 900 } });
    for (const card of cards) {
      const rel = path.relative(ROOT, card);
      await openCard(page, rel, pathToFileURL(card).href);
      await page.addScriptTag({ content: axe });
      for (const dark of [false, true]) {
        await setTheme(page, dark);
        /* A node may opt out of ONE rule with data-a11y-expect="<rule-id>". */
        const res = await page.evaluate(async () => {
          const r = await window.axe.run(document, {
            runOnly: { type: "tag", values: ["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"] },
            rules: { "aria-dialog-name": { enabled: true } },
          });
          for (const v of r.violations) v.nodes = v.nodes.filter((n) =>
            document.querySelector(n.target.join(" "))?.getAttribute("data-a11y-expect") !== v.id);
          return r;
        });
        scanned++;
        for (const v of res.violations) {
          if (!v.nodes.length || !["serious", "critical"].includes(v.impact)) continue;
          problems.push(`${rel} [${dark ? "dark" : "light"}] ${v.id} (${v.impact}, ${v.nodes.length} node(s)) ${v.nodes[0].target.join(" ")}`);
        }
      }
    }
  } finally {
    await browser.close();
  }
  return report("a11y", { problems, checked: scanned, minChecked: 2, summary: `a11y: ${cards.length} card(s) x light/dark clean.` });
}

/* -------------------------------------------------------------- visual
   --record [--dir d]  shoot every card x light/dark into d (default .visual/)
   --compare [--dir d] [--report-only]  diff against d; no baseline fails
   --self-test         the comparator passes an identical shot and fails a perturbed one */
async function visual() {
  const { compareShots, decodePng, encodePng } = await import("./lib/png.mjs");
  const dir = path.resolve(opt("--dir", path.join(ROOT, ".visual")));
  const { collectCards, openCard, setTheme } = await import("./lib/cards.mjs");
  const { chromium } = await import("playwright");
  const cards = collectCards(ROOT);
  const browser = await chromium.launch();
  const shots = new Map();
  try {
    const page = await browser.newPage({ viewport: { width: 1200, height: 800 } });
    for (const card of cards) {
      const rel = path.relative(ROOT, card);
      await openCard(page, rel, pathToFileURL(card).href);
      for (const dark of [false, true]) {
        await setTheme(page, dark);
        shots.set(`${rel.replace(/[\\/]/g, "__")}.${dark ? "dark" : "light"}.png`, await page.screenshot({ fullPage: true }));
      }
    }
  } finally {
    await browser.close();
  }

  if (flag("--self-test")) {
    const [name, buf] = shots.entries().next().value;
    const img = decodePng(buf);
    const bad = Buffer.from(img.data);
    for (let x = 0; x < img.width; x++) bad[x * 4] = bad[x * 4] < 128 ? 255 : 0; // one recoloured row, delta >= 128 whatever its ink
    const same = compareShots(buf, buf).ok, differs = !compareShots(buf, encodePng(img.width, img.height, bad)).ok;
    return report("visual --self-test", {
      problems: [!same && "identical shots compared unequal", !differs && "a recoloured row compared equal"].filter(Boolean),
      checked: 2, minChecked: 2, summary: `visual comparator: identical passes, perturbed fails (${name}).`,
    });
  }
  if (flag("--record")) {
    fs.mkdirSync(dir, { recursive: true });
    for (const [n, b] of shots) fs.writeFileSync(path.join(dir, n), b);
    console.log(`visual: recorded ${shots.size} shot(s) to ${dir}`);
    return 0;
  }
  const problems = [];
  let compared = 0;
  for (const [n, b] of shots) {
    const base = path.join(dir, n);
    if (!fs.existsSync(base)) { problems.push(`${n}: no baseline in ${dir}`); continue; }
    const r = compareShots(fs.readFileSync(base), b);
    compared++;
    if (!r.ok) problems.push(`${n}: ${r.resized ? `resized ${r.resized}` : `soft ${(r.softPct * 100).toFixed(4)}% strong ${(r.strongPct * 100).toFixed(4)}%`}`);
  }
  const code = report("visual", { problems, checked: compared, minChecked: 2, summary: `visual: ${compared} shot(s) match.` });
  return flag("--report-only") ? 0 : code;
}

/* ---------------------------------------------------------------- pack
   npm pack -> install the tarball in a scratch app -> use it the way a consumer does. */
async function pack() {
  const tmp = fs.mkdtempSync(path.join(os.tmpdir(), "lw-pack-"));
  const problems = [];
  let checked = 0;
  const need = (ok, msg) => { checked++; if (!ok) problems.push(msg); };
  try {
    const out = execFileSync("npm", ["pack", "--json", "--pack-destination", tmp], { cwd: ROOT, encoding: "utf8" });
    const tgz = path.join(tmp, JSON.parse(out)[0].filename);
    const app = path.join(tmp, "app");
    fs.mkdirSync(app);
    fs.writeFileSync(path.join(app, "package.json"), '{"name":"lw-pack-probe","private":true,"type":"module"}');
    execFileSync("npm", ["install", "--no-audit", "--no-fund", "--legacy-peer-deps", "--offline", tgz], { cwd: app, stdio: "pipe" });
    const pkgDir = path.join(app, "node_modules/@leanwise/design");
    const pkg = JSON.parse(fs.readFileSync(path.join(pkgDir, "package.json"), "utf8"));

    for (const [sub, target] of Object.entries(pkg.exports)) {
      const t = typeof target === "string" ? target : target.default;
      if (t.includes("*")) {
        const base = path.join(pkgDir, path.dirname(t));
        need(fs.existsSync(base) && fs.readdirSync(base).length > 0, `export ${sub}: ${path.dirname(t)}/ is empty or missing in the tarball`);
      } else need(fs.existsSync(path.join(pkgDir, t)), `export ${sub}: ${t} is missing from the tarball`);
    }

    /* theme.css through real Tailwind, from the INSTALLED copy. */
    const req = (await import("node:module")).createRequire(path.join(ROOT, "package.json"));
    const postcss = (await import(pathToFileURL(req.resolve("postcss")))).default;
    const tw = (await import(pathToFileURL(req.resolve("@tailwindcss/postcss")))).default;
    fs.writeFileSync(path.join(app, "probe.html"), '<div class="bg-primary text-cta-foreground bg-cta"></div>');
    const entry = `@import "${req.resolve("tailwindcss/index.css")}" source(none);\n@source "./probe.html";\n@import "@leanwise/design/theme.css";\n`;
    const css = await postcss([tw()]).process(entry, { from: path.join(app, "app.css") }).then((r) => r.css, (e) => String(e));
    need(css.includes(".bg-primary") && css.includes(".bg-cta"), "theme.css from the tarball does not yield bg-primary/bg-cta");

    const rDir = path.join(pkgDir, "r");
    const items = fs.existsSync(rDir) ? fs.readdirSync(rDir).filter((f) => f.endsWith(".json")) : [];
    need(items.length > 0, "r/ carries no registry items");
    for (const f of items) {
      let ok = true;
      try { JSON.parse(fs.readFileSync(path.join(rDir, f), "utf8")); } catch { ok = false; }
      need(ok, `r/${f} is not valid JSON`);
    }

    for (const [bin, rel] of Object.entries(pkg.bin ?? {})) {
      need(fs.existsSync(path.join(pkgDir, rel)), `bin ${bin}: ${rel} missing`);
    }
    fs.mkdirSync(path.join(app, "src"));
    fs.writeFileSync(path.join(app, "src/a.tsx"), 'export const A = () => <div className="bg-primary" />;\n');
    let binOk = true;
    try { execFileSync(path.join(app, "node_modules/.bin/lw-token-lint"), ["src"], { cwd: app, stdio: "pipe" }); } catch { binOk = false; }
    need(binOk, "lw-token-lint from the tarball failed on clean source");
    fs.writeFileSync(path.join(app, "src/b.tsx"), 'export const B = () => <div className="bg-blue-500" />;\n');
    let caught = false;
    try { execFileSync(path.join(app, "node_modules/.bin/lw-token-lint"), ["src"], { cwd: app, stdio: "pipe" }); } catch { caught = true; }
    need(caught, "lw-token-lint from the tarball passed a raw palette class");
  } finally {
    fs.rmSync(tmp, { recursive: true, force: true });
  }
  return report("pack", { problems, checked, minChecked: 10, summary: `pack: ${checked} assertions hold on the installed tarball.` });
}
