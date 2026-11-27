#!/usr/bin/env node
/* The checks. `node scripts/check.mjs <lint|contrast|presence|a11y|rendered|focus|visual|pack> [...]`.
   Every check refuses to pass vacuously: reading zero of what it measures fails. */
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { execFileSync } from "node:child_process";
import { fileURLToPath, pathToFileURL } from "node:url";
import { report } from "./lib/report.mjs";
import { openBrowser } from "./lib/browser.mjs";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const [cmd, ...args] = process.argv.slice(2);
const flag = (f) => args.includes(f);
const opt = (f, d) => { const i = args.indexOf(f); return i >= 0 ? args[i + 1] : d; };

const CHECKS = { lint, contrast, presence, a11y, rendered, focus, visual, pack };
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
    "focus-room", "font-sans", "font-mono", "rounded-sm", "rounded-md", "rounded-lg", "rounded-xl", "dark:bg-primary",
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
  const axe = fs.readFileSync(path.join(path.dirname(fileURLToPath(await import.meta.resolve("axe-core"))), "axe.min.js"), "utf8");
  const cards = collectCards(ROOT);
  const browser = await openBrowser();
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

/* ------------------------------------------------------------ rendered
   Contrast as painted (alpha inks, opacity chains, icons and control borders at 3:1) over
   every card x light/dark. --self-test: a fixture with text-muted-foreground/70 and an
   opacity-50 icon must go red, and the same markup without them green. */
async function rendered() {
  const { probe, FLOORS } = await import("./lib/rendered-contrast.mjs");
  const browser = await openBrowser();
  const problems = [];
  let checked = 0;
  try {
    const page = await browser.newPage({ viewport: { width: 1280, height: 900 } });
    if (flag("--self-test")) {
      const { compile } = await import("./lib/tw.mjs");
      const icon = (cls) => `<svg class="${cls}" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m6 9 6 6 6-6"/></svg>`;
      const bad = `<p class="text-muted-foreground/70">Hint text</p><span class="text-muted-foreground">${icon("size-4 opacity-50")}</span>`;
      const good = `<p class="text-muted-foreground">Hint text</p><span class="text-muted-foreground">${icon("size-4")}</span>`;
      const css = await compile(ROOT, ["text-muted-foreground/70", "text-muted-foreground", "opacity-50", "size-4", "bg-background"]);
      const run = async (body) => {
        await page.setContent(`<html><head><style>${css}</style></head><body class="bg-background">${body}</body></html>`);
        return page.evaluate(probe, FLOORS);
      };
      const r = await run(bad), g = await run(good);
      const need = (ok, msg) => { checked++; if (!ok) problems.push(msg); };
      need(r.problems.some((m) => /^text .*muted-foreground\/70/.test(m)), `text-muted-foreground/70 was not caught: ${JSON.stringify(r)}`);
      need(r.problems.some((m) => /^icon .*opacity-50/.test(m)), `opacity-50 svg was not caught: ${JSON.stringify(r)}`);
      need(g.checked >= 2 && !g.problems.length, `clean fixture did not pass: ${JSON.stringify(g)}`);
      return report("rendered --self-test", { problems, checked, minChecked: 3,
        summary: `rendered contrast: fixture red (${r.problems.length}), clean fixture green (${g.checked} checked).` });
    }
    const { collectCards, openCard, setTheme } = await import("./lib/cards.mjs");
    for (const card of collectCards(ROOT)) {
      const rel = path.relative(ROOT, card);
      await openCard(page, rel, pathToFileURL(card).href);
      for (const dark of [false, true]) {
        await setTheme(page, dark);
        const r = await page.evaluate(probe, FLOORS);
        checked += r.checked;
        for (const m of r.problems) problems.push(`${rel} [${dark ? "dark" : "light"}] ${m}`);
      }
    }
  } finally {
    await browser.close();
  }
  return report("rendered", { problems, checked, minChecked: 200, summary: `rendered contrast: ${checked} painted inks hold.` });
}

/* --------------------------------------------------------------- focus
   Every focus ring painted whole: no scroll/clip ancestor cuts it, over every card at its
   declared viewport. --self-test: controls flush in an unpadded overflow-x-auto strip go
   red (outline path and box-shadow path); the same strip, and a long one focus has to
   scroll, go green with focus-room; a focusable stock table row keeps its outline inside the
   row (red without the row's slot); and the consumer bin, driven over CDP, agrees. */
async function focus() {
  const { probe, FOCUSABLE } = await import("./lib/focus-clip.mjs");
  /* The bin needs a CDP endpoint: the attached browser's, or one this launch opens. */
  const DEBUG_PORT = 9339;
  const browser = await openBrowser({ debugPort: DEBUG_PORT });
  const problems = [];
  let checked = 0;
  const need = (ok, msg) => { checked++; if (!ok) problems.push(msg); };
  const sweep = async (page) => {
    await page.keyboard.press("Shift"); /* keyboard modality: programmatic focus then shows :focus-visible */
    return page.evaluate(probe, FOCUSABLE);
  };
  try {
    const page = await browser.newPage({ viewport: { width: 1280, height: 900 } });
    if (flag("--self-test")) {
      const { compile } = await import("./lib/tw.mjs");
      /* A decorative shadow at rest is not a ring: the "Fifth" pill keeps the green strips honest. */
      const pill = (t) => `<li><a href="#${t}" class="inline-flex min-h-9 items-center rounded-full px-3 whitespace-nowrap${t === "Fifth" ? " shadow-lg" : ""}">${t}</a></li>`;
      const strip = (room, extra = []) => `<nav class="p-6"><ul class="${room} flex max-w-60 gap-1.5 overflow-x-auto">${pill("First")}` +
        `<li><button data-slot="button" class="inline-flex h-9 items-center rounded-md px-3">Second</button></li>${extra.map(pill).join("")}</ul></nav>`;
      const LONG = ["Third", "Fourth", "Fifth", "Sixth", "Seventh", "Eighth"];
      /* A focusable row in a stock-shaped Table: theme.css draws its outline inside the row.
         Without the row's slot the same row gets the generic outline, which the container cuts. */
      const table = (slot) => `<div data-slot="table-container" class="relative w-full overflow-x-auto"><table class="w-full">` +
        `<tbody><tr ${slot ? 'data-slot="table-row" ' : ""}tabindex="0" class="border-b"><td class="p-2">Row</td><td class="p-2">Cell</td></tr></tbody></table></div>`;
      const css = await compile(ROOT, ["relative", "w-full", "border-b", "p-2", "focus-room", "flex", "max-w-60", "gap-1.5", "overflow-x-auto", "p-6", "inline-flex",
        "min-h-9", "h-9", "items-center", "rounded-full", "rounded-md", "px-3", "whitespace-nowrap", "shadow-lg", "bg-background"]);
      const html = (body) => `<!doctype html><html lang="en"><head><meta charset="utf-8"><title>strip</title><style>${css}</style></head><body class="bg-background"><main>${body}</main></body></html>`;
      const run = async (body) => { await page.setContent(html(body)); return sweep(page); };
      const r = await run(strip("")), g = await run(strip("focus-room")), gl = await run(strip("focus-room", LONG));
      need(r.problems.some((m) => /^a "First" ring .*cut on .*top/.test(m)), `outline ring in an unpadded strip was not caught: ${JSON.stringify(r)}`);
      need(r.problems.some((m) => /^button\[data-slot=button\].* ring .*cut on/.test(m)), `box-shadow ring in an unpadded strip was not caught: ${JSON.stringify(r)}`);
      need(g.checked >= 2 && !g.problems.length, `the strip with focus-room did not pass: ${JSON.stringify(g)}`);
      need(gl.checked >= 8 && !gl.problems.length, `the long strip with focus-room did not pass: ${JSON.stringify(gl)}`);
      const tb = await run(table(false)), tr = await run(table(true));
      need(tb.problems.some((m) => /^tr .*cut on .*left.*right/.test(m)), `a focusable row's outer outline was not caught: ${JSON.stringify(tb)}`);
      need(tr.focused === 1 && !tr.problems.length, `a focusable stock table row did not keep its outline inside: ${JSON.stringify(tr)}`);
      /* The consumer bin: its own CDP driver (tab, load wait, key press) over the same fixtures,
         rendered late, at two widths of a #fragment URL (the second is a same-document navigation).
         Async on purpose: Playwright holds new tabs paused until it resumes them, which a
         blocked event loop never does. */
      const { promisify } = await import("node:util");
      const execFileAsync = promisify((await import("node:child_process")).execFile);
      /* Rendered 400ms after load, as a client-rendered page is: the bin must wait for it. */
      const late = (body) => html(`<script>setTimeout(() => { document.querySelector("main").innerHTML = ${JSON.stringify(body).replace(/</g, "\\u003c")}; }, 400)</script>`);
      const bin = async (body) => {
        const url = `data:text/html;base64,${Buffer.from(late(body)).toString("base64")}`;
        /* The bin speaks http to /json/*; a ws:// LW_CDP names the same host. */
        const cdp = process.env.LW_CDP ? new URL(process.env.LW_CDP.replace(/^ws/, "http")).origin : `http://127.0.0.1:${DEBUG_PORT}`;
        try {
          const { stdout } = await execFileAsync(process.execPath, [path.join(ROOT, "bin/lw-focus-clip.mjs"), "--cdp", cdp, "--widths", "390,1280", `${url}#top`], { timeout: 60000 });
          return { code: 0, out: stdout };
        } catch (e) { return { code: e.code, out: `${e.stdout}${e.stderr}` }; }
      };
      const br = await bin(strip("")), bg = await bin(strip("focus-room", LONG));
      need(br.code === 1 && /cut on/.test(br.out), `lw-focus-clip passed the unpadded strip (exit ${br.code}): ${br.out}`);
      need(bg.code === 0 && /painted whole/.test(bg.out), `lw-focus-clip failed the focus-room strip (exit ${bg.code}): ${bg.out}`);
      return report("focus --self-test", { problems, checked, minChecked: 6,
        summary: `focus clip: unpadded strip red (${r.problems.length}), focus-room strips green (${g.checked + gl.checked} checked), table row inset; lw-focus-clip agrees.` });
    }
    const { collectCards, openCard } = await import("./lib/cards.mjs");
    const { readCardMeta } = await import("./lib/card-build.mjs");
    const viewports = new Map(readCardMeta(ROOT).map((c) => [c.path, c.viewport]));
    for (const card of collectCards(ROOT)) {
      const rel = path.relative(ROOT, card);
      /* At the card's own declared viewport: a card is a fixture at that size. */
      const [width, height] = (viewports.get(rel) ?? "").split("x").map(Number);
      if (!(width > 0 && height > 0)) { problems.push(`${rel}: no viewport="WxH" in its @dsCard marker`); continue; }
      await page.setViewportSize({ width, height });
      await openCard(page, rel, pathToFileURL(card).href);
      const r = await sweep(page);
      checked += r.checked;
      for (const m of r.problems) problems.push(`${rel} [${width}px] ${m}`);
    }
  } finally {
    await browser.close();
  }
  return report("focus", { problems, checked, minChecked: 100, summary: `focus clip: ${checked} focus rings painted whole.` });
}

/* -------------------------------------------------------------- visual
   --record [--dir d]  shoot every card x light/dark into d (default .visual/)
   --compare [--dir d] [--report-only]  diff against d; no baseline fails
   --self-test         the comparator passes an identical shot and fails a perturbed one */
async function visual() {
  const { compareShots, decodePng, encodePng } = await import("./lib/png.mjs");
  const dir = path.resolve(opt("--dir", path.join(ROOT, ".visual")));
  const { collectCards, openCard, setTheme } = await import("./lib/cards.mjs");
  const cards = collectCards(ROOT);
  const browser = await openBrowser();
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
    /* No browser here: with no arguments it must print usage and exit 2, which proves its
       imports resolve from the tarball. The sweep itself is `check focus`. */
    let usage = -1;
    try { execFileSync(path.join(app, "node_modules/.bin/lw-focus-clip"), [], { cwd: app, stdio: "pipe", env: { ...process.env, LW_CDP: "" } }); usage = 0; } catch (e) { usage = e.status; }
    need(usage === 2, `lw-focus-clip from the tarball exited ${usage} with no arguments, not 2 (usage)`);
  } finally {
    fs.rmSync(tmp, { recursive: true, force: true });
  }
  return report("pack", { problems, checked, minChecked: 10, summary: `pack: ${checked} assertions hold on the installed tarball.` });
}
