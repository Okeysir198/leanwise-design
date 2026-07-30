# LeanWise Design — review

Standing audit. `CHANGELOG.md` records what moved; this file records what is true, what is
still open, and why. Re-read it before touching the CSS layers or the gates.

**Scope reviewed:** `tokens.css`, `base.css`, `marketing.css`, `product.css`, `email.css`,
the barrel's component exports, the specimen cards, the twelve templates, and every gate.
Counts are deliberately not restated here — `npm run check:dts` prints the export count and
`npm run check:a11y` the card count, and a number in prose is a second home that goes stale.
It already had: this line read "83 exports … 5 gates" when the barrel exported 82 and there
were six.

---

## Verdict

Coverage is closed and the structural problem the last pass found is fixed. Nine findings were
open; **seven are resolved, two are blocked on a machine that can run `npm install`.**

What is left is not design work. It is one build, one publish, and the honest admission that
`check:visual` still cannot fail in CI — its baselines are byte-exact PNGs and `.visual/` is
gitignored, so every CI run records a fresh set and compares nothing. Making it real needs
baselines recorded inside the CI image, not this box's.

---

## Resolved

### 1. The layer names lied — **fixed**

`.lw-btn` lived in `lw.css`, "the marketing layer", so an app that loaded only the product
layer got correct forms, tables and overlays and unstyled buttons. Split into three layers
named for their contents:

| File | Holds | Who drops it |
|---|---|---|
| `base.css` | reset, type, buttons, pills, cards, chips, console, code surface, file tree, status chip, brand mark, pointer list | nobody |
| `marketing.css` | grounds, hero, sections, features, stories, logo rail, data-viz bars, browser frame, ambient motion | a product app |
| `product.css` | layout, forms, data, overlays, shell, AI, mobile bars | a marketing page |

Load order is `tokens` → `base` → the layer you need. `lw.css` and `app.css` survive as
`@import` shims for one full major, and **product.css deliberately does not `@import` base** —
an import there would apply those rules a second time in a page that also loads marketing, and
silently reorder the cascade between the two. Load order belongs to the consumer.

The pointer-affordance list stayed at the foot of `base.css` with the product layer loading
after it, which is the arrangement it already had inside `lw.css` — rule 7 is about that order,
and it is the one thing a careless split would have broken.

All 34 cards and 12 `ds-base.js` loaders now name the real layers.

### 2. `check:themes` was wrong on its first run — **fixed**

Ran the gate's logic by hand. It flagged four tokens: `--lw-on-brand-c`, `--lw-on-cta-c`,
`--lw-on-status-c`, `--lw-on-danger-c` — none of which is a bug. Those inks sit on fills that
do **not** follow the theme, so an ink that did would put 1.77 contrast on the amber. The gate
now exempts `--lw-on-*` with the reasoning inline, and reports clean. **The gate encoding the
rule backwards is exactly what a first run is for.**

### 3. The copy-pasted topbar — **fixed**

`AppBar` now owns brand + breadcrumbs + actions, and the three new templates use it. The two
bugs the copies had are impossible in it: the lead holder is `flex: 0 1 auto` (TopBar already
ships a `flex: 1` spacer, so a second claimant splits the slack and ellipsises the breadcrumbs
with a third of the row empty) and the brand is `flex: none; white-space: nowrap`.

`dashboard` and `ai-app-shell` keep their own bars — they carry a collapsing rail with
`data-collapse-*` hooks that `AppBar` does not model. **Migrate them the next time either is
touched**, and if a third shell needs the same, teach `AppBar` the rail instead of copying.

### 4. Icons reviewed at real size — **two redrawn**

- `sort-asc` / `sort-desc` signalled direction **by line length alone** — three bars getting
  longer or shorter, which is one cue where rule 6 requires two, and unreadable in a 13px
  table header. Both now carry an arrow.
- `pin` was drawn at an angle and read as an unidentifiable wedge at 16px. Redrawn head-on:
  cap, tapering shaft, point.

The remaining 30 are consistent in weight and grid. `inbox`, `folder`, `thumbs-up/down` and
`mic-off` carry the most geometry and hold up at 16px on both grounds.

### 5. The density boundary — **documented**

README §Density now carries the table of what responds to `data-density` and what does not.
**The chrome staying put is the point, not an oversight:** a compact table inside a comfortable
shell is the common case, a 32px top bar looks broken, and an avatar that shrinks with a table
makes a person's face a density setting. Extend into the shell only on request, and add the row
to that table when you do.

### 6. Charts — **policy stated**

The trade is recorded in README §Charts: ~120 lines of tokenised SVG each is right for a
dashboard and will not survive brushing, zoom or mixed axes. **The trigger to adopt a library
is the third chart type, not a feature request on the first two.**

### 7. `RichText`'s engine — **contract stated, swap still triggered**

The README row now shows the swap concretely
(`<RichText tools={…}><EditorContent editor={editor} /></RichText>`). The default
`contenteditable` + `execCommand` surface stays, labelled a shim in the source, the types and
the card. Fine for a comment box; **swap before any product ships a document editor.** Not
blocking, because nothing ships one today.

---

## Open — both blocked on a machine that can install

### 8. The build is configured but has never run

`templates/_tooling/tsup.config.js` and `npm run build` are committed (it lives there for the
reason the README gives about the other Node scripts — every other directory is compiled into
the browser bundle, and a config that imports `tsup` cannot be): ESM, external React, `dts`, sourcemaps
pointing back at the `.jsx` so "one file to read and patch" survives the build. CSS stays
unbuilt on purpose — a bundler would rewrite `marketing.css`'s asset URLs (the hero mark, the
hex lattice) to hashed names the README documents by their real filenames.

**`exports` still points at source.** Flip it to `dist/` in the same commit as the first
successful build, never before — a package whose exports name files that do not exist yet is
worse than the `babel-loader` tax it is trying to remove.

Then the registry: off `github:` to GitHub Packages. A git dep cannot express a range, so every
consumer pins a tag and nobody ever upgrades.

### 9. `check:a11y` and `check:visual` have never executed

Written, wired into CI, and unrunnable here — Playwright cannot be installed. `check:themes`
was runnable by hand and is green (finding 2); the other two are not.

Expect the first CI run to **record 136 visual baselines** (34 cards × light/dark ×
comfortable/compact) rather than fail — that is by design — and expect **real axe findings**
across 34 cards on the first pass. Budget a session for triage rather than treating it as a
regression. Serious and critical fail the build; moderate and minor report and pass, so the
gate can be adopted before the backlog is clear.

---

## What is healthy

- **The token core.** 442 tokens, HSL channels plus derived values, eight theme scopes, AA
  measured in a browser against the real cascade rather than parsed from a file.
- **The reasoning is written down.** Every non-obvious rule traces to a specific bug. That is
  institutional memory, and it is rarer than the code.
- **The cards are a real fixture set** — composition per folder, state matrix where there is a
  state axis. They are why visual regression and axe were nearly free to add, and why the
  icon eye-pass took minutes.
- **The patterns are settled, not just the components.** The decision table under §Templates is
  what stops five teams re-litigating disable-vs-hide.
- **Two of this pass's findings came from the system auditing itself** — the gate caught its own
  inverted rule, and the specimen card caught two glyphs. That is the machinery working.

---

## Re-running this audit

```bash
npm run check        # contrast, token lint, theme completeness
npm run check:ci     # the above plus axe and visual regression
```

No gate can see findings 1, 3, 4, 5, 6 or 7 — layer architecture, component duplication,
optical weight and policy are judgement, which is why this file exists and why the audit is
worth repeating by hand each release.
