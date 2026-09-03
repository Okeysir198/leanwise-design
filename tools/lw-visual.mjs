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
 * COMPARISON IS A PIXEL DIFF, NOT A DIGEST. Byte-exact PNG equality can only
 * ever hold on the machine that recorded the baseline — font hinting, the
 * Chromium build and GPU rasterisation all move bytes — so the old SHA-256 gate
 * was structurally incapable of comparing anything a fresh machine recorded, and
 * `.visual/` being gitignored meant CI recorded 136 baselines and compared none.
 * Both halves are fixed: this file does the pixel work, and the workflow records
 * the base ref's baseline on the SAME runner before shooting HEAD.
 *
 * The PNG decode is done here, by hand, with node:zlib — an IHDR parse, an
 * inflate of the concatenated IDATs and the five standard unfilter modes. That
 * keeps the dependency surface at four devDeps, and it is safe *because we
 * control the encoder*: the input is always a Playwright screenshot, which is a
 * non-interlaced 8-bit PNG. Anything else throws loudly rather than being
 * guessed at. `--self-test` checks the decoder against Chromium's own PNG
 * decoder and proves that a deliberately perturbed image FAILS — a comparator
 * that always returns "same" is precisely the defect this gate exists to catch.
 *
 * THRESHOLDS: a pixel "differs" when any channel moves by more than 8/255, and
 * "differs strongly" past 48/255. A shot fails above 0.02% differing or 0.002%
 * differing strongly. Two rules because one is not enough — see TOL below for
 * the measured noise floor those numbers come from, and for the blind spot they
 * knowingly leave.
 *
 * Modes:
 *   (default)     record what has no baseline, compare the rest — the local loop.
 *   --update      re-record every baseline: "the change is intended".
 *   --record      record only, never compare, always exit 0. CI's base-ref pass.
 *   --compare     compare only, never record. CI's HEAD pass. If there are no
 *                 baselines at all it SKIPS LOUDLY at exit 0 — never a silent pass.
 *   --report-only print the diff and exit 0. The ONLY way to land an intended
 *                 visual change in CI, where `--update` is meaningless: the
 *                 workflow passes it when the head commit says `[visual-ok]`.
 *                 It prints an OVERRIDDEN banner, so an override is visible in
 *                 the log and greppable in the history.
 *   --dir <path>  where baseline/ current/ diff/ live. Default <root>/.visual.
 *                 CI points this at $RUNNER_TEMP, outside the worktree, because
 *                 `actions/checkout` runs `git clean -ffdx` between the two
 *                 passes and would otherwise delete the baseline it just recorded.
 *   --self-test   decoder + encoder + comparator self-test. Touches no baseline.
 *
 * Requires playwright (a devDependency, deliberately not a peer): it is CI's
 * concern, and a consumer installing this package should not pull a browser.
 *
 * Usage: node tools/lw-visual.mjs [--update|--record|--compare]
 *                                              [--dir <path>] [--self-test]
 */
import { existsSync, mkdirSync, readFileSync, readdirSync, writeFileSync } from "node:fs";
import { collectCards } from "./_cards.mjs";
import { decodePng, encodePng, compareShots, TOL } from "./_png.mjs";
import { dirname, join, relative, resolve } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");

const argv = process.argv.slice(2);
const flag = (n) => argv.includes("--" + n);
function optval(name) {
  const i = argv.findIndex((a) => a === "--" + name || a.startsWith("--" + name + "="));
  if (i === -1) return null;
  return argv[i].includes("=") ? argv[i].slice(argv[i].indexOf("=") + 1) : argv[i + 1] ?? null;
}

const update = flag("update");
const recordOnly = flag("record");
const compareOnly = flag("compare");
const reportOnly = flag("report-only");
const selfTest = flag("self-test");
if (recordOnly && compareOnly) {
  console.error("lw-visual: --record and --compare are mutually exclusive.");
  process.exit(2);
}
const OUT = optval("dir") ? resolve(process.cwd(), optval("dir")) : join(ROOT, ".visual");
const BASE_DIR = join(OUT, "baseline");
const CUR_DIR = join(OUT, "current");
const DIFF_DIR = join(OUT, "diff");

/** Baseline washed out, differing pixels lit: soft magenta, strong red. */
function diffImage(res) {
  const n = res.width * res.height;
  const px = Buffer.allocUnsafe(n * 4);
  for (let i = 0, o = 0; i < n; i++, o += 4) {
    if (res.mask[i] === 2) { px[o] = 255; px[o + 1] = 0; px[o + 2] = 0; }
    else if (res.mask[i] === 1) { px[o] = 255; px[o + 1] = 0; px[o + 2] = 255; }
    else {
      const g = (res.base.data[o] * 3 + res.base.data[o + 1] * 6 + res.base.data[o + 2]) / 10;
      px[o] = px[o + 1] = px[o + 2] = 255 - (255 - g) * 0.15;
    }
    px[o + 3] = 255;
  }
  return encodePng(res.width, res.height, px);
}

const pct = (r) => (r * 100).toFixed(4) + "%";

/* -------------------------------------------------------------- the browser */

let chromium;
try { ({ chromium } = await import("playwright")); }
catch {
  console.error("lw-visual: playwright is not installed. `npm i -D playwright && npx playwright install chromium`, then re-run.");
  process.exit(2);
}

const MATRIX = [
  { name: "light", theme: null, density: "comfortable" },
  { name: "dark", theme: "dark", density: "comfortable" },
  { name: "light-compact", theme: null, density: "compact" },
  { name: "dark-compact", theme: "dark", density: "compact" },
];

const FREEZE = "*,*::before,*::after{animation:none !important;transition:none !important;caret-color:transparent !important}";

async function settle(page, card) {
  await page.goto(pathToFileURL(card).href, { waitUntil: "load" });
  await page.addStyleTag({ content: FREEZE });
  // A card whose React root never mounted screenshots as a blank plate and
  // compares clean forever. Require actual rendered content before shooting.
  await page.waitForFunction(
    () => document.fonts.status === "loaded" && document.body.innerText.trim().length > 0,
    null, { timeout: 15000 });
}

/* Wait for every image the CURRENT theme asks for to be decoded, then let two
   frames pass.

   The matrix flips `data-theme` and screenshots in the same task. That is fine
   for colour — CSS custom properties resolve synchronously and the freeze sheet
   kills the transitions — but NOT for artwork: a per-theme `background-image`
   (`.brand-mark` has one) is a fresh resource request at flip time, and a
   screenshot taken before it decodes captures the plate without it. The dark
   shot then drifts run to run depending on whether the fetch won the race. It
   was measured at 0.0293% on a card carrying the logo — over both thresholds,
   against a noise floor of 0.0002% — and the workaround was to take the logo out
   of the card, which is a gate editing the specimen to suit itself.

   `<img>` alone is not enough: most of this system's artwork is a CSS
   background, which exposes no load event. Re-requesting the same URL through a
   throwaway `Image()` hits the same memory cache, so awaiting its `decode()`
   is a proxy for the background layer being paintable. Failures are swallowed on
   purpose — a card with a deliberately broken URL should still be shot and
   compared, not hang the gate. */
async function decoded(page) {
  await page.evaluate(async () => {
    const urls = new Set();
    for (const el of document.querySelectorAll("*")) {
      for (const pseudo of [null, "::before", "::after"]) {
        const bg = getComputedStyle(el, pseudo).backgroundImage;
        if (!bg || bg === "none") continue;
        for (const m of bg.matchAll(/url\((['"]?)([^'")]+)\1\)/g)) urls.add(m[2]);
      }
    }
    const wait = (i) => (i.decode ? i.decode().catch(() => {}) : Promise.resolve());
    await Promise.all([
      ...[...document.images].map(wait),
      ...[...urls].map((u) => { const i = new Image(); i.src = u; return wait(i); }),
    ]);
    await new Promise((r) => requestAnimationFrame(() => requestAnimationFrame(r)));
  });
}

async function shoot(page, card) {
  const id = relative(ROOT, card).replace(/[\/\\]/g, "__").replace(/\.html$/, "");
  const out = [];
  await settle(page, card);
  for (const m of MATRIX) {
    await page.evaluate(([theme, density]) => {
      const r = document.documentElement;
      r.classList.toggle("dark", theme === "dark");
      if (theme) r.setAttribute("data-theme", theme); else r.removeAttribute("data-theme");
      r.setAttribute("data-density", density);
    }, [m.theme, m.density]);
    await decoded(page);
    out.push([id + "__" + m.name + ".png", await page.screenshot({ fullPage: true })]);
  }
  return out;
}

/* One retry, and the card's name on the way out.
   `Page.captureScreenshot: Unable to capture screenshot` is a transient CDP
   failure under memory pressure — four workers holding multi-megapixel
   full-page surfaces is exactly the shape that provokes it, and it was observed
   once in ten full runs on a loaded box. A second attempt costs one navigation;
   a spurious red build costs a reviewer an afternoon of looking for a visual
   change that was never there. A card that is genuinely broken fails twice and
   still fails the gate — now saying WHICH card, which the bare protocol error
   did not. */
async function shootOnce(page, card) {
  try {
    return await shoot(page, card);
  } catch (e) {
    console.error("lw-visual: " + relative(ROOT, card) + " — " + String(e.message).split("\n")[0] + "; retrying once.");
    try {
      return await shoot(page, card);
    } catch (e2) {
      throw new Error("lw-visual: " + relative(ROOT, card) + " could not be shot on two attempts — " + e2.message);
    }
  }
}

/* ------------------------------------------------------------- --self-test */

if (selfTest) {
  const cards = collectCards(ROOT);
  const browser = await chromium.launch();
  let failures = 0;
  const ok = (name, cond, note = "") => {
    console.log((cond ? "  ok   " : "  FAIL ") + name + (note ? " — " + note : ""));
    if (!cond) failures++;
  };
  try {
    const page = await browser.newPage({ viewport: { width: 1280, height: 900 }, deviceScaleFactor: 1 });
    const card = cards[0];
    console.log("lw-visual --self-test: fixture " + relative(ROOT, card));
    await settle(page, card);
    const shotA = await page.screenshot({ fullPage: true });
    const shotB = await page.screenshot({ fullPage: true });

    const a = decodePng(shotA), b = decodePng(shotB);
    ok("decode returns plausible dimensions", a.width === 1280 && a.height > 100 && a.data.length === a.width * a.height * 4,
      a.width + "×" + a.height);
    ok("two renders of one page decode identically", a.width === b.width && a.height === b.height && a.data.equals(b.data));

    // The strongest available check on the decoder: hand the SAME bytes to
    // Chromium's PNG decoder through a canvas and compare pixel for pixel. A
    // hand-rolled unfilter that is subtly wrong passes every self-consistency
    // test ever written; it does not pass this one.
    const cross = await page.evaluate(async (b64) => {
      const img = new Image();
      img.src = "data:image/png;base64," + b64;
      await img.decode();
      const c = document.createElement("canvas");
      c.width = img.naturalWidth; c.height = img.naturalHeight;
      const ctx = c.getContext("2d", { willReadFrequently: true });
      ctx.drawImage(img, 0, 0);
      const d = ctx.getImageData(0, 0, c.width, c.height).data;
      return { w: c.width, h: c.height, bytes: Array.from(d) };
    }, shotA.toString("base64"));
    let maxDelta = 0;
    if (cross.w === a.width && cross.h === a.height && cross.bytes.length === a.data.length) {
      for (let i = 0; i < a.data.length; i++) {
        const d = Math.abs(cross.bytes[i] - a.data[i]);
        if (d > maxDelta) maxDelta = d;
      }
      ok("decode matches Chromium's own PNG decoder", maxDelta <= 1, "max channel delta " + maxDelta);
    } else {
      ok("decode matches Chromium's own PNG decoder", false, "size disagreement");
    }

    // Encoder round-trip: the diff images are only useful if they say what the
    // mask said.
    const rt = decodePng(encodePng(a.width, a.height, a.data));
    ok("encodePng → decodePng round-trips", rt.width === a.width && rt.height === a.height && rt.data.equals(a.data));

    const n = a.width * a.height;
    const perturb = (fn) => {
      const copy = Buffer.from(a.data);
      fn(copy);
      return encodePng(a.width, a.height, copy);
    };

    const same = compareShots(shotA, shotB);
    ok("identical renders → PASS", same.ok && same.soft === 0, "soft " + pct(same.softPct));

    // Sub-threshold noise everywhere: +4 on green. Must NOT fail — this is the
    // class of jitter the thresholds exist to absorb.
    const noise = compareShots(shotA, perturb((p) => { for (let o = 1; o < p.length; o += 4) p[o] = Math.min(255, p[o] + 4); }));
    ok("whole-image +4/255 → PASS", noise.ok && noise.soft === 0, "soft " + pct(noise.softPct));

    // Small but loud: a 16×16 magenta block. 256 px is under the soft area rule
    // on any card, so this can only be caught by the STRONG rule — which is the
    // whole reason the strong rule is there. If a future tolerance change makes
    // the soft rule catch this too, the assertion below still passes but the
    // demonstration is gone: keep the block small enough to stay soft-clean.
    const block = compareShots(shotA, perturb((p) => {
      for (let y = 20; y < 36; y++) for (let x = 20; x < 36; x++) {
        const o = (y * a.width + x) * 4;
        p[o] = 255; p[o + 1] = 0; p[o + 2] = 255;
      }
    }));
    ok("16×16 recoloured block → FAIL on the strong rule alone",
      !block.ok && block.strong > 0 && block.softPct <= TOL.softRatio,
      "soft " + pct(block.softPct) + " (limit " + pct(TOL.softRatio) + "), strong " + pct(block.strongPct) + " (limit " + pct(TOL.strongRatio) + ")");

    // Wide but faint: −16 on green over the top 1% of rows. Under the strong
    // delta, over the soft area rule — the mirror image of the block above.
    // Subtract, don't add: the top of every card is white, and +16 on a 255
    // channel clamps to 255, which is a perturbation that perturbs nothing.
    const wash = compareShots(shotA, perturb((p) => {
      const rows = Math.max(1, Math.round(a.height * 0.01));
      for (let i = 1; i < rows * a.width * 4; i += 4) p[i] = Math.max(0, p[i] - 16);
    }));
    ok("faint tint over 1% of the shot → FAIL on the soft rule alone", !wash.ok && wash.strong === 0,
      "soft " + pct(wash.softPct) + " (limit " + pct(TOL.softRatio) + "), strong " + pct(wash.strongPct));

    // And the size rule.
    const shorter = Buffer.from(a.data.subarray(0, a.width * (a.height - 10) * 4));
    const resized = compareShots(shotA, encodePng(a.width, a.height - 10, shorter));
    ok("a shot that changed height → FAIL", !resized.ok && !!resized.resized, resized.resized);

    console.log("lw-visual --self-test: " + (failures ? failures + " check(s) FAILED" : "all checks passed") +
      " (" + n.toLocaleString() + " px fixture)");
  } finally {
    await browser.close();
  }
  process.exit(failures ? 1 : 0);
}

/* ------------------------------------------------------------------- the run */

const cards = collectCards(ROOT);
const totalShots = cards.length * MATRIX.length;

// Count baselines BEFORE mkdir, so "the directory does not exist" and "the
// directory is empty" are the same loud skip rather than a mkdir side effect.
const baselineCount = existsSync(BASE_DIR) ? readdirSync(BASE_DIR).filter((f) => f.endsWith(".png")).length : 0;
if (compareOnly && !baselineCount) {
  console.log("lw-visual: SKIPPED — no baseline to compare against in " + OUT + "/baseline.");
  console.log("  --compare never records. This run compared NOTHING and is not a pass;");
  console.log("  it means the base ref could not be shot on this machine (first commit,");
  console.log("  shallow clone, force-push, or the record step was skipped). Fix the");
  console.log("  recorder, not this gate.");
  process.exit(0);
}

mkdirSync(BASE_DIR, { recursive: true });
mkdirSync(CUR_DIR, { recursive: true });
mkdirSync(DIFF_DIR, { recursive: true });

const browser = await chromium.launch();
let recorded = 0;
const results = [];   // every compared shot, for the "worst offenders" report
const failed = [];
const missing = [];   // compare-only: a card HEAD has and the base ref did not

/* One page per worker, and each card is navigated ONCE — only data-theme /
   data-density differ across the matrix, so re-loading the document four times
   re-paid the fonts and React-mount cost for an identical DOM. The freeze sheet
   is injected the same way, once per navigation.

   The old fixed `waitForTimeout(250)` per shot was 34s of the gate's 56s. What
   it was really waiting for is fonts + a non-empty React root; wait for THAT
   and the gate stops paying for the worst case on every card. */
const WORKERS = 4;

try {
  const queue = cards.slice();
  await Promise.all(Array.from({ length: Math.min(WORKERS, queue.length) }, async () => {
    const page = await browser.newPage({ viewport: { width: 1280, height: 900 }, deviceScaleFactor: 1 });
    // try/finally: a card that fails to load (the unpkg CDN case) throws out of
    // this worker, Promise.all rejects, and every close() after it is skipped —
    // which orphaned the Chromium process on every failing run.
    try {
      for (let card; (card = queue.shift()); ) {
        for (const [file, shot] of await shootOnce(page, card)) {
          const basePath = join(BASE_DIR, file);
          if (update || recordOnly || (!compareOnly && !existsSync(basePath))) {
            writeFileSync(basePath, shot);
            recorded++;
            continue;
          }
          if (!existsSync(basePath)) { missing.push(file); continue; }

          const res = compareShots(readFileSync(basePath), shot);
          results.push({ file, res });
          if (!res.ok) {
            // Only materialise current/ and diff/ for a shot that actually
            // differs — the old unconditional write moved ~33 MB per run to
            // prove nothing had changed.
            writeFileSync(join(CUR_DIR, file), shot);
            if (res.mask) writeFileSync(join(DIFF_DIR, file), diffImage(res));
            failed.push({ file, res });
          }
        }
      }
    } finally {
      await page.close();
    }
  }));
} finally {
  await browser.close();
}

const compared = results.length;
console.log("lw-visual: " + cards.length + " cards × " + MATRIX.length + " grounds = " + totalShots +
  " shots; " + recorded + " recorded, " + compared + " compared" + (missing.length ? ", " + missing.length + " new" : "") + ".");

if (recordOnly) {
  console.log("lw-visual: recorded " + recorded + " baseline(s) into " + BASE_DIR + " — nothing compared (--record).");
  process.exit(0);
}

if (missing.length) {
  // A card added by this change has no baseline on the base ref. That is not a
  // regression; say so by name so it is not mistaken for one.
  console.log("lw-visual: " + missing.length + " shot(s) are new in this change and had no baseline:");
  for (const f of missing.slice(0, 8)) console.log("  + " + f);
  if (missing.length > 8) console.log("  + … " + (missing.length - 8) + " more");
}

if (!compared) {
  console.log("lw-visual: NOTHING WAS COMPARED — every shot was a first recording.");
  console.log("  Re-run to compare locally. In CI the base ref is recorded first on the");
  console.log("  same runner (see .github/workflows/ci.yml), so a run that compares");
  console.log("  nothing there means the record step did not happen.");
  process.exit(0);
}

// Worst offenders, whether or not they failed: a shot sitting just under the
// limit is the interesting number in a review, and "0 failures" alone hides it.
const moved = results.filter((r) => r.res.soft > 0 || r.res.resized).sort((a, b) => b.res.softPct - a.res.softPct);
if (moved.length) {
  console.log("lw-visual: " + moved.length + " of " + compared + " shot(s) moved at all. Worst:");
  for (const { file, res } of moved.slice(0, 10)) {
    console.log("  " + (res.ok ? "·" : "✗") + " " + file +
      (res.resized ? "  size " + res.resized
        : "  " + pct(res.softPct) + " changed, " + pct(res.strongPct) + " strongly"));
  }
}

if (failed.length) {
  console.error("lw-visual: " + failed.length + " shot(s) exceed tolerance (soft > " + pct(TOL.softRatio) +
    " of pixels at Δ>" + TOL.softDelta + ", or strong > " + pct(TOL.strongRatio) + " at Δ>" + TOL.strongDelta + "):");
  for (const { file, res } of failed) {
    console.error("  · " + file + " — " +
      (res.resized ? "dimensions changed " + res.resized
        : pct(res.softPct) + " of pixels changed (" + res.soft + "), " + pct(res.strongPct) + " strongly (" + res.strong + ")"));
  }
  console.error("Diffs: " + DIFF_DIR + " (red = strong, magenta = soft). Candidates: " + CUR_DIR + ".");
  if (reportOnly) {
    // Loud, and on the ERROR stream, because an override is a thing a reviewer
    // must see rather than a thing the log quietly omits.
    console.error("lw-visual: OVERRIDDEN (--report-only) — the shots above changed and the gate");
    console.error("  is exiting 0 anyway because the change was declared intended. Look at the");
    console.error("  uploaded diff artifact before approving; nothing else checked these pixels.");
    process.exit(0);
  }
  console.error("Locally, if the change is intended: npm run check:visual -- --update");
  console.error("In CI there is no baseline to update — put [visual-ok] in the head commit");
  console.error("message to declare the change intended, and review the diff artifact.");
  process.exit(1);
}
console.log("lw-visual: no visual change beyond tolerance.");
