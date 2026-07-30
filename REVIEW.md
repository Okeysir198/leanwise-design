# LeanWise Design — review

Standing audit. `CHANGELOG.md` records what moved; this file records what is true, what is
still open, and why. Re-read it before touching the CSS layers or the gates.

**Scope:** the token core and five CSS layers, the React barrel and its components, the six
gates, packaging, the twelve templates and the specimen cards.

Counts are deliberately not restated in prose — `npm run check:dts` prints the export count,
`npm run check:a11y` the card count, `npm run check:themes` the token count. A number in a
document is a second home that goes stale, and this line proved it: it read "83 exports … 5
gates" when the barrel exported 82 and there were six.

**Last pass:** v1.1.5, a full-codebase review. Everything under *Resolved* is from it.

---

## Verdict

The system now largely audits itself, and the v1.1.5 pass is the evidence: the two defects
that mattered most were **gates reporting success while measuring nothing**, and both were
invisible from inside the codebase's own output.

What is left divides cleanly. The *Open* items are real and mostly mechanical; none is a
correctness bug in what ships to a browser today. The one structural gap is `_ds_bundle.js` —
the cards render from a compiled artifact this repo cannot regenerate, so the a11y and visual
gates are testing something that has already drifted from the `.jsx` sources.

---

## Resolved in v1.1.5

Full detail in the CHANGELOG. The two patterns worth remembering:

### A derived role must be re-derived in every scope that re-points its channel

`--lw-fg: hsl(var(--lw-fg-c))` is substituted where it is **declared**, so a scope that
re-points only `--lw-fg-c` inherits the page-theme *colour*. This was live in `.dark` (used as
a scoped subtree throughout the layers), in every `shadcn.css` alias, and in the two
chart-chrome tokens.

It survived because **at `<html>` it happens to work** — the declaration and the override land
on the same element. The case everyone demos is the one that cannot fail. That is the shape to
watch for generally, not just here.

The `:where(...)` block at the foot of `tokens.css` is where a new role goes.

### A gate that cannot fail is worse than no gate

Four instances, all reporting green:

- **`tokens.json`'s `base` theme was the dark palette.** The DTCG generator read the selector
  alone, and the `:root` nested inside `@media (prefers-color-scheme: dark)` has selector
  `:root` — so dark overwrote light in source order. The re-point loop was then comparing dark
  against a base that was already dark and reporting "every themable channel re-pointed" with
  no discriminating power left. Designers pulling the file into Tokens Studio got the dark
  palette labelled base.
- **Zero cards was a pass** in both browser gates. `Promise.all([])` resolves immediately and
  the a11y gate printed "0 cards — no violations".
- **The token lint skipped every selector without `.lw-`** and had no colour rule over the
  package's own layers at all — so a hex in `product.css` was invisible to all six gates
  simultaneously.
- **The contrast manifest had no non-text pairs,** leaving WCAG 1.4.11 unmeasured. Control
  borders were shipping at **1.47:1** on light and 1.76:1 on dark. `AA_LARGE` was dead code.

Each is now closed, and the coverage that closed them is itself checked: `_cards.mjs`
cross-checks the manifest against the filesystem, `raw-color` polices the layers, and the
non-text group makes `AA_LARGE` live.

### Everything else

The React layer (no component forwarded a ref; menu selection dropped focus to `<body>`;
Calendar's `role="grid"` had 42 gridcells as direct children and a roving tabindex that could
strand the keyboard user; `onClose` fired twice on Escape), the templates (no `lang`, no main
landmark, no skip links), and the specimen cards (ratio readouts never flattened alpha, so the
whole soft-tint column was measured against full-strength colour and printed as data).

**`email.css` drift is now gated.** Six literals had diverged from `tokens.css`, including the
v1.1.3 muted-floor fix that never reached it — the one surface that cannot be re-themed after
send was carrying the pre-fix value. `emailLiterals()` in the contrast gate asserts them the
same way `logoStops()` asserts the SVG gradient, and for the same reason: a file that must
carry literal hex is a second home for palette values.

---

## Open

Ordered by what would hurt most to leave.

### 1. `_ds_bundle.js` has no generator here — **structural**

The cards render from this compiled browser bundle, not from `components/**/*.jsx`. It is
generated in the Claude Design project, so **a `.jsx` fix is invisible to `check:a11y` and
`check:visual` until the bundle catches up** — which means the v1.1.5 component fixes (the
Calendar grid, the Popover focus restore, the Menu ARIA ownership) are not covered by either
browser gate today.

v1.1.3 mirrored two ARIA fixes into the bundle by hand. That is a stopgap and it does not
scale. Generating it here with esbuild is roughly 60 lines and would make both browser gates
test the source they are supposed to be testing. **This is the highest-value remaining item.**

### 2. `check:visual` still cannot fail in CI

`.visual/` is gitignored, so every CI run records 136 fresh baselines and compares nothing.
The gate says so out loud rather than printing "no visual change".

Byte-exact PNG comparison is also not achievable across machines — font hinting and Chromium
build differences guarantee mismatch. Making this real needs **both** baselines recorded
inside the CI image **and** a pixel-tolerance comparator (`pixelmatch`, ~0.1%) rather than the
current SHA-256 equality. Do not commit this box's baselines; that makes CI permanently red
rather than green.

### 3. The `@media (prefers-color-scheme: dark)` path is ungated end to end

The contrast gate builds its canonical dark scope from `.dark` only, and treats parity
differences in the media block as **warnings**. So for a consumer that sets no class and
relies on the OS preference — the default for a plain marketing page — the palette actually
rendered is measured by nothing.

The fix is a third canonical scope (`light ⊕ media-dark`) evaluated against every
`scope: "dark"` manifest entry. That converts a standing warning into a pass or a real failure.

### 4. Card CSS duplication

22 cards redefine `.pane` and 20 carry inline `.lbl` blocks, despite both living in
`preview/_card.css`. Because the inline `<style>` follows the `<link>`, every local copy wins —
so the shared rule is dead code for two-thirds of the cards and the "panes look the same
across cards" invariant is unenforced. Worse, a local `.pane { background: var(--lw-bg) }` is
the tier-ish override that `_card.css`'s own comment says was deliberately deleted.

### 5. The cards depend on `unpkg.com`

21 component cards load React, ReactDOM and `@babel/standalone` from the CDN, which makes both
browser gates network-dependent and unrunnable air-gapped. The a11y gate refuses to score a
blank card, so this fails loudly rather than passing vacuously — but a CDN hiccup is a
nondeterministic build failure, and it also leaks the Chromium process (the worker throws
before `browser.close()`).

Vendor the three UMD builds under `preview/_vendor/`, and wrap the worker body in
`try/finally`.

### 6. `preview/_fonts.css` duplicates `fonts/`

140 KB of base64 data URIs mirroring 168 KB of `.woff2` on disk, with no generator linking
them. Re-subset the fonts and it goes stale silently — the exact failure `tokens.json` has a
gate for. `_card.css` already `@import`s `../tokens.css`, which imports `fonts.css`, so the
inline copy may be entirely redundant.

### 7. Two sibling components, two APIs for one concept

`Table` uses `columns[].label` + `onSort(key, dir)`; `DataGrid` uses `columns[].header` +
`onSort({key, dir})`. A consumer moving from one to the other rewrites every column
definition. Pick one shape and deprecate the other on the documented cycle.

### 8. Smaller, verified, unfixed

- `Segmented` and `ThemeToggle` use `aria-pressed` on a mutually exclusive set; the correct
  pattern is `radiogroup`/`radio` + `aria-checked`. System-wide call, not a one-off.
- Chart series and x-labels key on their name/label, so duplicates collide (repeated month
  names across a two-year range is the common case).
- `ActivityFeed` defaults `now` to `Date.now()` during render — a hydration mismatch for the
  first SSR consumer. `Calendar` had the same shape and was fixed; this one was not.
- 36 inline `style={{}}` sites remain in components. Roughly a third are legitimate
  (custom-property injection, measured values); the rest are static styling that belongs in
  the CSS layer.
- Physical CSS properties where the logical form is available. Two are actively misleading:
  `data-side="start"` and `data-edge="start"` are logical APIs implemented as left/right, so
  an RTL consumer gets a drawer on the wrong edge from an API named for the correct one.
- `templates/pitch-deck/deck-stage.js` (2,969 lines) is a thirteenth file in the templates
  tree, unique to one template, covered by no gate, and it mirrors `PRINT_BASELINE_CSS` into
  `apps/web deck-stage-export.ts` in another repo with no check on the pairing.

### 9. The pre-1.1.0 changelog gap

`v0.1.1` through `v0.9.0` have no entries. This is now stated explicitly in `CHANGELOG.md`
rather than looking like data loss, but the gap matters: **all three consumers are pinned
inside it** (`v0.8.1`, `v0.2.3`, `v0.2.2`), so it covers exactly the span a consumer bump has
to reason about. Reconstructing it from `git log v0.1.1..v1.1.0` is a prerequisite for the
first bump, not an archival nicety.

---

## Carried forward — judgement, not defects

These were recorded in earlier passes, remain true, and no gate can see them.

- **`dashboard` and `ai-app-shell` keep their own top bars.** They carry a collapsing rail with
  `data-collapse-*` hooks that `AppBar` does not model. Migrate the next time either is
  touched; if a third shell needs the same, teach `AppBar` the rail rather than copying.
- **Density is scoped to content, not chrome,** and that is the point. A compact table inside a
  comfortable shell is the common case; a 32px top bar looks broken, and an avatar that shrinks
  with a table makes a person's face a density setting. Extend into the shell only on request,
  and add the row to README §Density when you do.
- **Charts: the trigger to adopt a library is the third chart type,** not a feature request on
  the first two. ~120 lines of tokenised SVG each is right for a dashboard and will not survive
  brushing, zoom or mixed axes.
- **`RichText`'s `contenteditable` + `execCommand` is a shim,** labelled as one in the source,
  the types and the card. Fine for a comment box. Swap before any product ships a document
  editor; nothing does today.
- **The registry.** A git dep cannot express a range, so every consumer pins a tag and nobody
  ever upgrades. Moving to GitHub Packages is what makes a version range possible. Note that
  `exports` points at **source** by deliberate v1.1.0 decision — `dist/` is a type-check
  artifact and is neither shipped nor exported. Do not "fix" `files` to include it.

---

## What is healthy

- **The token core.** HSL channels plus derived roles, twelve theme scopes, contrast measured
  from the parsed cascade rather than asserted in prose.
- **The reasoning is written down.** Every non-obvious rule traces to a specific bug. That is
  institutional memory, and it is rarer than the code.
- **The cards are a real fixture set** — composition per folder, state matrix where there is a
  state axis. They are why visual regression and axe were nearly free to add. (Subject to
  Open 1: they render from the bundle, not the source.)
- **The system caught its own regression.** The v1.1.5 collapse of the on-dark alphas moved a
  dark table header from 4.56 to 4.33, and `check:a11y` failed the run. The fix added a
  manifest pair, so the next person to move that overlay gets a number rather than a
  rendered-only finding on one card. That loop closing is the machinery working.

---

## Re-running this audit

```bash
npm run check        # contrast (incl. non-text 3:1, logo stops, email literals),
                     # token lint, theme completeness, barrel types
npm run check:ci     # the above plus axe and visual regression
npm run build        # rollup-plugin-dts resolution — what check:dts only approximates
```

No gate can see the *Carried forward* section, or Open 4, 6, 7 and 9 — architecture,
duplication, API shape and documentation are judgement. That is why this file exists and why
the audit is worth repeating by hand each release.
