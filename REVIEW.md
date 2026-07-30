# LeanWise Design — review

Standing audit. `CHANGELOG.md` records what moved; this file records what is true, what is
still open, and why. Re-read it before touching the CSS layers or the gates.

**Scope:** the token core and five CSS layers, the React barrel and its components, the gates,
packaging, the twelve templates and the specimen cards.

Counts are deliberately not restated in prose — `npm run check` prints them all. A number in a
document is a second home that goes stale, and this line has proved it twice: it read "83
exports … 5 gates" when the barrel exported 82 and there were six, and then "442 tokens, eight
theme scopes" against an actual 283 across twelve.

**Last pass:** v1.1.7, which closed every item the v1.1.6 audit left open.

---

## Verdict

The system audits itself to a degree it did not before, and the v1.1.7 pass is the evidence:
of the nine items carried into it, the three that mattered were **live user-facing defects that
every gate reported green on**. None was found by reading the code. Each was found by building
the measurement that had been missing.

What is left is genuinely small and mostly judgement. There is no known correctness bug in what
ships to a browser today.

---

## The shape to keep watching

Three passes running, the same failure keeps recurring in a new costume, and it is worth naming
because it will recur again:

> **The case everyone demos is the one that cannot fail.**

- `--lw-fg: hsl(var(--lw-fg-c))` is substituted where it is **declared**, so a scope that
  re-points only the channel inherits the page-theme colour. It survived because at `<html>`
  the declaration and the override land on the same element.
- `tokens.json`'s `base` was the dark palette, because a `:root` inside a prefers-dark media
  query has selector `:root` and overwrote light in source order. The re-point loop was then
  comparing dark against dark and reporting full coverage with no discriminating power left.
- The `@media (prefers-color-scheme: dark)` path — the **most common deployment there is**, a
  page that sets no class — was asserted by nothing, and had a 1.08:1 diff surface in it.
- The twelve generated template files stayed in step because everyone remembered to.

In every case the demo path (a class on `<html>`, a light-mode screenshot, a fresh checkout)
worked perfectly. **Test the path nobody demos.**

---

## Closed in v1.1.7

Full detail in the CHANGELOG. What is worth carrying forward:

### Three live defects, all behind green gates

- **The diff review surface was invisible in production.** `--lw-chart-1..8` and `--lw-diff-*`
  re-pointed only behind a class selector, so a visitor whose OS prefers dark and whose page
  sets no class got the *light* diff grounds on a navy page: `.lw-diff-line .t` painted
  `--lw-fg` #E7ECF3 over `--lw-diff-add` #E7F9ED. **1.08:1.** Fixed, and the contrast gate now
  carries a third canonical scope (`light ⊕ media-dark`, merged in *source order* — a spread
  reports a palette the browser never paints) plus `darkScopeDivergence()`, which compares the
  two dark scopes token-for-token. 86 pairs → 135.
- **The theme cookie had been silently dropped.** v0.6.5 wrote `lw-theme` to a cookie *so the
  server could read it* and emit `<html data-theme>` in the first byte. The v1.1.0 wholesale
  replacement rewrote the hook with `localStorage` only. Nothing errored; SSR consumers just
  flashed the wrong theme on every reload, for a year. Restored, with one writer — `ThemeToggle`
  had its own copy of the write, which is how it missed the cookie to begin with.
- **The cards were testing a bundle that had drifted 34 source files.** `_ds_bundle.js` had no
  generator here, so a `.jsx` fix was invisible to both browser gates until the next wholesale
  sync. `lw-bundle.mjs` (esbuild) now generates it and `check:bundle` fails when it is stale.

### Two gates that could not fail, and one that did not exist

`check:visual` compared byte-exact PNGs against baselines that CI regenerated every run;
`lw-templates.mjs` did not exist, so nothing ever opened a `.dc.html`. It found four landmark
gaps the moment it ran — including two the v1.1.5 sweep had missed. **A sweep with no gate
behind it is a one-time event.**

### The rest

`Table`/`DataGrid` converged on one column contract (both spellings accepted, deprecation warns
once per component per prop, removal at v2.0.0); `Segmented`/`ThemeToggle` moved from
`aria-pressed` to a real radiogroup; the chart key collisions, the `ActivityFeed` hydration
mismatch, the two logical APIs implemented physically; the cards deduplicated, vendored off
unpkg and freed of a 140 KB font file that duplicated `fonts/`; the pre-1.1.0 changelog gap
reconstructed.

---

## Open

Nothing here is known to be broken. These are judgement calls and second homes.

### 1. `_ds_manifest.json` duplicates the bundle header

It carries its own `namespace` and `components` list, which `lw-bundle.mjs` now also computes.
Nothing reads it at runtime — the cards read the global, and `_cards.mjs` reads only its `cards`
array — so it is inert today. But it is a generated fact with a hand-maintained second copy,
which is the exact shape `tokens.json` and `react.d.ts` both needed a gate for. Fold it into the
bundle generator.

### 2. The `.dc.html` templates are not rendered by any gate

`lw-templates.mjs` reads them as text. The cards get axe and pixel diffs; the twelve templates —
the thing a person actually looks at — get neither, because they need the `<x-dc>` runtime to
render. Whether that runtime can be driven headless here is unknown and worth half a day.

### 3. `preview/_vendor/` is 4.3 MB in the clone

Correct trade (both browser gates are now offline-capable and deterministic), but worth knowing:
`github:…#tag` installs clone the whole repo. `preview/` is not in `package.json#files`, so it
never reaches the tarball. Note that the shipped `components/**/*.card.html` already referenced
`../../preview/_card.css` and `../../_ds_bundle.js`, neither of which ships — **the cards in the
published package have always been non-functional.** Either exclude them from `files` or ship
what they need; today it is neither.

### 4. `deck-stage.js` is vendored, and must not be gated

2,969 lines under `templates/pitch-deck/`, carrying its own dark palette in Claude's coral
(`#D97757`), not the LeanWise one. Line 1 is `// @ds-adherence-ignore -- omelette starter
scaffold` and the header says re-running `copy_starter_component` **overwrites the file**. So
tokenising it or bringing it under the lint would be undone by the next upstream copy, and any
local fix is lost silently. Leave it. *(An earlier revision of this file claimed it mirrors
`PRINT_BASELINE_CSS` into another repo — that was wrong. The mirror is in `support.js`, all
twelve copies, and the `apps/web` repo it names is not on this box, so the pairing cannot be
checked here at all.)*

### 5. Smaller

- `Feedback` and `RichText` keep `aria-pressed` deliberately — thumbs can be cleared, and bold +
  italic are genuinely simultaneous. Documented, but the reasoning lives only in the source.
- The `:dir(rtl)` fallback in the drawer uses `[dir="rtl"]`, which needs the attribute set. No
  consumer sets it yet, so RTL is *correct in principle and untested in practice*.
- `email.css` cannot use logical properties (mail clients), so it stays a physical-property
  island. The contrast gate asserts its literals; nothing asserts its layout.
- **Correction to a claim this file used to make:** the a11y worker was reported as leaking a
  Chromium process when a card throws. It does not — `playwright-core`'s `bootstrap.js`
  registers a `process.on("exit")` reaper, confirmed by process counts either side of a
  throw-without-close repro. Both gates now wrap in `try/finally` anyway, because closing what
  you open beats depending on an undocumented exit hook, but nobody should re-file this as a
  leak.

### 6. The consumer bump, which is now a real plan rather than a warning

All three consumers are pinned pre-1.1.0. Diffing the tags says the risk is not where it looked:
**zero `--lw-*` tokens were dropped** and the preset kept every utility family, so the CSS
surface is close to safe. The break is in the **JS entry points** — `./counter` deleted (restored
v1.1.5), `./react` off `dist/` to ESM source, `tailwind-preset.js` → `.cjs`, the eleven named
icon exports replaced by `<Icon name>`, four hooks moved from `./react` to `./hooks`, `bin`
dropped. Also: **rag-service was never install-drifted** — the `v0.2.2` tag's own `package.json`
says `0.2.1`, so the pin resolves correctly to a tree reporting the older number, and no
reinstall changes that. Bump it to `#v0.2.3`.

---

## Carried forward — judgement, not defects

- **`dashboard` and `ai-app-shell` keep their own top bars.** They carry a collapsing rail with
  `data-collapse-*` hooks that `AppBar` does not model. Migrate the next time either is touched;
  if a third shell needs the same, teach `AppBar` the rail rather than copying.
- **Density is scoped to content, not chrome,** and that is the point. A compact table inside a
  comfortable shell is the common case; a 32px top bar looks broken, and an avatar that shrinks
  with a table makes a person's face a density setting.
- **Charts: the trigger to adopt a library is the third chart type,** not a feature request on
  the first two. ~120 lines of tokenised SVG each is right for a dashboard and will not survive
  brushing, zoom or mixed axes.
- **`RichText`'s `contenteditable` + `execCommand` is a shim,** labelled as one in the source,
  the types and the card. Fine for a comment box; swap before any product ships a document
  editor. Nothing does today.
- **The registry.** A git dep cannot express a range, so every consumer pins a tag and nobody
  ever upgrades. GitHub Packages is what makes a version range possible. Note that `exports`
  points at **source** by deliberate v1.1.0 decision — `dist/` is a type-check artifact, neither
  shipped nor exported. Do not "fix" `files` to include it.

---

## What is healthy

- **The token core.** HSL channels plus derived roles, twelve theme scopes, contrast measured
  from the parsed cascade in three canonical scopes rather than asserted in prose.
- **The reasoning is written down.** Every non-obvious rule traces to a specific bug. That is
  institutional memory, and it is rarer than the code.
- **Every gate added this pass was watched failing before it was trusted.** The contrast gate on
  a broken media token, the templates gate on a hand-edited `support.js`, the bundle gate on a
  planted bad card reference, the visual gate on a real pixel change. A gate nobody has seen fail
  is a hypothesis, not a gate — this repo has shipped four of those, and each one hid a defect
  for months.
- **The system caught its own regressions, twice, mid-pass.** The v1.1.5 on-dark alpha collapse
  moved a dark table header to 4.33 and `check:a11y` failed the run; this pass, promoting a bare
  `code` rule put a light chip behind an always-dark code surface and `check:a11y` failed that
  too. Both were fixed before landing. That loop closing is the machinery working.

---

## Re-running this audit

```bash
npm run check        # contrast (3 scopes, non-text 3:1, logo stops, email literals),
                     # token lint, theme completeness, barrel types, bundle freshness, templates
npm run check:ci     # the above plus axe and visual regression
npm run build        # rollup-plugin-dts resolution — what check:dts only approximates
```

No gate can see the *Carried forward* section, or Open 3, 4 and 6 — architecture, vendoring,
API shape and release planning are judgement. That is why this file exists and why the audit is
worth repeating by hand each release.
