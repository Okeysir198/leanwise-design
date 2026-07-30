# Changelog

All notable changes to `@leanwise/design`. The format is
[Keep a Changelog](https://keepachangelog.com/en/1.1.0/); the versioning is semver.

**Deprecation policy.** A component, class or token that is going away is warned for one
MINOR and removed in the next MAJOR. Nothing is deleted outright — v1.0 removed
`.lw-theme-toggle` and `.lw-code-tabs` without a cycle, which was survivable at one consumer
and would not be at five.

## [Unreleased]

Nothing yet.

## [1.1.6] — 2026-07-30

Documentation truth-up, plus one real defect found while checking it.

### Fixed — `email.css` drift, now gated

`email.css` carries literal hex on purpose (mail clients have no custom properties), which
makes it a second home for palette values — and six had drifted from `tokens.css`:
`--lw-text-2`, `--lw-text-3`, `--lw-border-1`, `--lw-border-2`, `--lw-surface-1` and the dark
`--lw-fg-muted`. `--lw-text-3` was the one that mattered: v1.1.3 moved the muted floor to
clear AA on surface-3, and email kept the old `#6B7684` — so the one surface that cannot be
re-themed after it is sent had the pre-fix value baked in. `emailLiterals()` in the contrast
gate now asserts them, the same way `logoStops()` asserts the SVG gradient.

### Changed

- **`REVIEW.md` rewritten.** The standing audit had gone stale in a way that would mislead the
  next reader: it said the browser gates "have never executed" (they run, and a11y is green
  across 34 cards), said the build had never run, and told the reader to flip `exports` to
  `dist/` — the opposite of the deliberate v1.1.0 decision that `dist/` is a type-check
  artifact, neither shipped nor exported. Its token count and gate count were both wrong.
  Now ranked by what would hurt most to leave, with `_ds_bundle.js` named as the one
  structural gap.

## [1.1.5] — 2026-07-30

A full-codebase review. Five parallel passes over the tokens and layers, the React
components, the gates, packaging, and the templates and cards. The theme through almost all
of it is the same: **things that were true at the root and wrong everywhere else**, and
**gates that could not fail.**

### Fixed — the palette and the layers

- **`.dark` re-pointed the channels but never re-derived the roles.** `--lw-bg: hsl(var(--lw-bg-c))`
  is substituted where it is DECLARED, so on a non-root `<div class="dark">` every
  `background: var(--lw-bg)` kept the PAGE theme's value — a white card on navy. `.dark` is
  used as a scoped subtree throughout the layers. It worked at `<html>` because there the
  declaration and the override land on the same element, which is exactly why it survived:
  the case everyone demos is the one that cannot fail.
- **The same bug in `shadcn.css`, for every alias.** Declared on `:root` only, so inside a
  band `bg-success-soft text-success-on` rendered the light tint with the light ink.
- **`--lw-chart-grid` / `--lw-chart-axis` were missing from the band re-derive**, so a
  dark-band chart drew light gridlines while its series correctly went dark.
- **`@keyframes lwPulse` was declared twice** — an opacity blink in `base.css`, a brand halo
  in `product.css`. Keyframe names are global and last-wins, so in the supported load order
  the "live" dot stopped blinking and grew a cyan ring, and a marketing-only page got the
  opposite. Renamed to `lwTracePulse`.
- **The CTA's loading spinner was invisible on dark.** It defaulted to `--lw-fg`, which is
  near-white on dark, and the amber fill does not flip. The label is `color: transparent`
  at that moment, so the button had no visible content at all.
- **`::selection` pinned a light tier** (`--lw-brand-100`), putting near-white ink on a
  near-white ground at ~1.1:1 on dark.
- **Control borders failed WCAG 1.4.11** at 1.47:1 light and 1.76:1 dark. Fixed with a new
  `--lw-line-control` role rather than by darkening `--lw-line-strong`, which would have
  dragged every divider in the system along with it.
- **The dark focus ring contradicted its own documented contract** — `tokens.css` explains at
  length why the translucent halo was removed, and all four dark scopes still shipped it, with
  `product.css` overriding band-dark to a third value. Now solid 2px everywhere.
- **`--lw-focus-ring-danger` existed in two scopes of six.**
- **Nine hairline alphas inline** (0.03 0.04 0.05 0.10 0.12 0.16 0.22 0.35 0.45), two lines
  below a comment saying the `--lw-on-dark-*` family "exists to stop exactly that sprawl" —
  so dark borders did not match across table, kpi, empty, features, story and segmented.
- **The modal scrim was a literal repeated at three `::backdrop` rules**, matching no token.
- **`.lw-run-controls .lw-btn { min-height: 36px }`** was unconditional and higher-specificity
  than the coarse-pointer 44px floor, so every console playback button was a 36px touch target.
- **Interactive chips and pills had no `:focus-visible`** — the only controls in the package
  without one, despite being listed in the pointer-affordance block.
- **No `forced-colors` support anywhere.** Windows High Contrast strips `box-shadow`, which is
  how all 41 focus indicators are drawn, while the paired `outline: none` survives — so a
  forced-colors user had no focus indicator at all.
- **The Tailwind preset never registered `radius-xs`/`pill` or `shadow-xs`/`xl`/`2xl`/`inner`,**
  so those utilities silently resolved to Tailwind's stock black shadows and default radii.
- **One screen-reader utility under two names** — `.visually-hidden` in `base.css`,
  `.lw-sr-only` in `product.css`, with different clip techniques.

### Fixed — the gates

- **`tokens.json`'s `base` theme was the DARK palette.** The DTCG generator read the selector
  alone, and the `:root` nested inside `@media (prefers-color-scheme: dark)` has selector
  `:root` — so the whole dark palette overwrote light. Designers pulling the file into Tokens
  Studio got dark labelled base, and the re-point gate was comparing dark against a base that
  was already dark: it reported "every themable channel re-pointed" with no discriminating
  power left. The theme is now decided by the at-rule plus the selector.
- **`KIND()` typed the text COLOUR ramp as `dimension`,** because `--lw-text` is overloaded
  (`text-1` is a colour, `text-sm` a size) and the name was tested before the value. The `-c`
  channels came out `color`, so the two halves of one token disagreed.
- **Zero cards was a pass** in both browser gates: an empty walk resolves immediately and
  prints "0 cards — no violations". Both now enumerate from `_ds_manifest.json` cross-checked
  against the filesystem, and disagreement in either direction is an error.
- **The token lint skipped every selector without `.lw-`** — bare elements, `:root`, `*`,
  `@keyframes` steps — and had no colour rule over the package's own layers at all. A hex in
  `product.css` was invisible to all six gates simultaneously. Added `raw-color`, which
  accepts token-derived alpha tints and rejects literals.
- **The contrast manifest had no non-text pairs,** so `AA_LARGE` was dead code and WCAG 1.4.11
  — control boundaries and focus indicators — was measured by nothing. axe does not close it
  either; its contrast rule is text-only.
- **The composed-pair walk dropped 33 of 122 rules with no diagnostic.** Skips are counted now.
- **`_css.mjs` brace-walked without string or `url()` awareness** and swallowed unbalanced
  braces, so one brace inside a string would have silently corrupted every rule after it for
  all three static gates. It also returned each rule's body INCLUDING its nested children, so
  a parent absorbed its descendants' declarations.
- **CI never ran `npm run build`** — the only step in `prepublishOnly` it did not exercise,
  and the exact failure `check:dts` was written for.
- The React-import rule matched one exact spelling, and a missing `components/` directory was
  a pass.

### Fixed — the React layer

- **No component forwarded a ref**, including every form control. `react-hook-form`'s
  `register()`, a Controller's `field.ref`, imperative `.focus()` and scroll-to-error all
  failed silently. `Input`, `Textarea`, `Select`, `Checkbox` and `Switch` now forward.
- **Selecting a menu item dropped focus to `<body>`.** `Popover` renders `{open && children}`,
  so the focused row unmounts on close; Escape restored focus and nothing else did.
- **A nameless `role="dialog"` was permanently in the DOM** for every Popover, Menu, Combobox
  and DatePicker on the page, open or not.
- **`role="menu"` owned a roleless `div`,** not its menu items.
- **`role="grid"` in Calendar had 42 gridcells as direct children** — no rows, no rowgroup, and
  the weekday strip was `aria-hidden`, so there were no column headers either. Its roving
  tabindex could also land on a `disabled` cell, at which point NO cell was focusable and the
  keyboard user was stuck; disabled dates are `aria-disabled` now.
- **`onClose` fired twice on Escape** in Dialog, Drawer and CommandPalette — the platform fires
  `cancel` then `close`, and both were wired to the same handler.
- **`aria-current="page"` on every crumb without an `href`,** so a non-linked ancestor announced
  itself as the current page.
- **Nested live regions** — `Toast` carried `role="status"`/`"alert"` inside an `aria-live`
  `ToastRegion`.
- **`aria-controls` in Combobox pointed at a `<ul>` that only exists when open and non-empty.**
- **The RichText counter read the DOM during render,** so with an uncontrolled editor it never
  moved off 0. Its `role="toolbar"` also promised arrow-key roving over ten real tab stops.
- **DataGrid's width effect read a stale `widths` and keyed on `columns.length`,** so
  reordering columns kept the previous widths.
- **ThemeToggle never painted the restored theme on mount,** and a CONTROLLED toggle wrote the
  global `localStorage` key behind its host's back.
- `Card`'s `aria-selected` was invalid on a div/button and simply ignored; `Skeleton`'s
  `lines` branch dropped `className`; `Tabs` was keyboard-inert when `value` matched no tab;
  `Field`'s error message was unassociated unless the caller passed `htmlFor`; `Icon` and
  `BottomNav` warned during render.

### Fixed — templates and cards

- **No template had `lang` on `<html>`.** Every card does, so this was template-specific drift,
  and the a11y gate never saw it because it enumerates `@dsCard` files only. Consumers copy
  these as starting points.
- **Nine templates had no main landmark and none had a skip link,** despite three putting a
  long sidebar ahead of the content.
- **The card ratio readouts never flattened alpha,** so every ratio published against a `-soft`
  tint was computed against the full-strength colour — the entire soft-tint column of the
  status card, printed as measured data. The swatch path had fixed this locally and carries a
  comment about it; the ratio and hex paths never did.
- **The status card paired `*-text` with `*-soft`** — the link shade with the tint — which is
  the mis-pairing `--lw-*-on` was added to prevent. Its neutral row also borrowed
  `--lw-on-danger` because `--lw-on-neutral` did not exist.
- The Brand card had no specimen for `--lw-brand-on`, the token added in v1.1.3 to fix a
  shipped 3.98 contrast bug.
- The card runtime overwrote a `data-theme` the host had already set.

### Added

- `--lw-on-neutral` — neutral was the one status family of five with no ink token, so
  `shadcn.css` aliased `--neutral-foreground` to `--lw-on-danger-c` to borrow its white.
- `--lw-line-control` — the WCAG 1.4.11 control boundary, distinct from the `line-strong`
  divider.
- `--lw-scrim`, `--lw-on-dark-wash`, `--lw-on-dark-fill-strong`, `--lw-on-dark-line-strong`,
  `--lw-on-dark-border`, `--lw-on-dark-border-hover`, `--lw-on-dark-sheen`.
- `.lw-skip`, and `.lw-sr-only` promoted to `base.css`.
- `templates/_tooling/_cards.mjs` — the cross-checked card list both browser gates enumerate.
- `tailwind-preset.d.cts`, `components/data/chart-parts.d.ts`.

### Changed

- **`package.json#exports`**: added `./package.json` (bundler version probes and
  `require.resolve` were getting `ERR_PACKAGE_PATH_NOT_EXPORTED` from a closed map),
  `./components/*` for deep imports, a `types` condition on `./tailwind-preset`, and `./counter`
  back as a one-major shim — it was exported at v0.8.1, `leanwise-ai` imports it, and removing
  it silently is what this file's own deprecation policy forbids.
- `files` no longer ships `templates/_tooling`, whose scripts import devDependencies.
- README's install pin, its Tailwind snippet (`export default` + `require` is a
  `ReferenceError` in an ESM config), and the gate count in README, CONTRIBUTING and REVIEW.

### Known gaps, unchanged

- `check:visual` still cannot fail in CI. `_ds_bundle.js` is still generated in the design
  project with no generator here, so the cards render from it rather than from the `.jsx`
  sources these fixes touched.

## [1.1.4] — 2026-07-30

Two shipped-package defects, plus the cleanup pass that found them.

### Fixed

- **`npm run build` was broken, and with it `prepublishOnly`.** `react.d.ts` was a hand-written
  types barrel beside `react.js`, which is the real export list, and the two had drifted: four
  re-exports pointed at a sibling's file (`Container` from `Page`, `Split` from `Grid`,
  `InputGroup` from `Input`, `SourceList` from `SourceChip`) and **31 components had no types at
  all** — Icon, DataGrid, both charts, Popover, Menu, Drawer, Combobox, DatePicker and more.
  rollup-plugin-dts refuses a re-export the target does not declare, so `dts: true` failed hard
  on the first of those; the other 31 failed quietly, as an error in the consumer's editor.
  `react.d.ts` is now GENERATED from `react.js` by `lw-dts-barrel.mjs` (`npm run dts`), covers
  all 82 exports plus 71 `*Props` types, and `check:dts` fails when the committed file is stale.
- **The published package threw `ReferenceError: React is not defined` on import.** Eighteen
  components called `React.useRef` / `useId` / `useState` without importing React. The build
  sets `jsx: "automatic"`, which injects `jsx`/`jsxs` from `react/jsx-runtime` and *not* the
  `React` binding — so the JSX compiled, the build passed, and the preview cards worked because
  they get React as a UMD global. Only a consumer bundling the package saw it. The import is
  added, and `check:tokens`'s self-check now asserts it for every `components/**/*.jsx`.

Both had been broken for at least two releases: the build fails on any clean checkout, and a
bundling consumer could not import the package at all. The preview cards hid the second one —
they get React as a UMD global, so every gate that renders a card was green.

### Changed — the cleanup pass

- **The two browser gates run in 9.0s, down from 84.2s.** Each card is navigated ONCE and the
  theme swapped in place (the document is identical across the matrix), across four worker
  pages, waiting on fonts and a mounted root rather than a flat 250ms sleep — which was 47.6s
  of the 84.2s on its own. axe is injected per page instead of recompiled on all 68
  navigations. All 136 visual shots come back byte-identical to baselines recorded by the old
  code, which is what proves the rewrite behaviour-preserving.
- **`lw-a11y` refuses to score a card that rendered nothing.** 21 cards pull React and Babel
  from unpkg; on a CDN failure axe found no violations in an empty div and the gate exited 0.
  It also freezes transitions like `lw-visual` does — flipping the theme in place starts every
  colour transition at once, and axe reading a half-finished frame scored an `.lw-input` at
  1.18 between its two themes.
- **One CSS parser (`templates/_tooling/_css.mjs`) instead of three.** The `@import` defect was
  found once, hand-fixed twice, and was still live in the third copy — the same defect that
  gutted `tokens.json` and made the parity gate vacuous at v1.1.2. `tokens.json` regenerates
  byte-identical through the shared parser.
- **Contrast coverage is now DERIVED from the CSS layers, not only declared.** The MANIFEST
  lists pairs someone thought of; its failure mode is silent green. The gate now also scores
  every rule declaring both a token colour and a token background, skipping WCAG-exempt
  disabled states and scoping band-locked rules to their ground. It found two live AA failures
  on its first run, both invisible to the manifest AND to both card gates because no card
  renders either rule: `.lw-file-tree li[data-active]` at 3.98 (a site the v1.1.3
  `--lw-brand-on` sweep missed, because the rule spans three lines and the sweep was line-wise)
  and `.lw-pill.brand` at 2.18 on dark (theme-invariant TIERS paired with an ink that
  re-points).
- `ThemeToggle` writes the theme through `hooks.js`'s `paint()` / `THEME_KEY` instead of its own
  copy; the comment there said "the hook and the component must never disagree", which
  documented the coupling rather than removing it.
- `BarChart` / `LineChart` share `frame()` and `<Grid>` from `chart-parts.jsx` — the plot
  geometry had two homes. Verified identical element trees for bars, stacked bars and areas.
- 34 hand-expanded three-way dark selectors collapsed to `:is()` (identical specificity;
  `check:visual` confirms byte-identical rendering). `Popover`'s capture-phase scroll handler
  and `DataGrid`'s column resize coalesce to one update per frame. `preview/_card.js` resolves
  the page ground once per hydrate instead of a forced layout per swatch, and has one coalesced
  re-hydrate trigger instead of two.

## [1.1.3] — 2026-07-30

A whole-codebase review. Every finding traces to the same shape: **a gate that could not see
the thing it existed to police, and a defect living in that blind spot.** The gates were
widened first, then the defects they surfaced were fixed.

### Fixed — the gates

- **`check:themes` was vacuous.** The DTCG generator skipped the file's main `:root` because
  the leading `@import url("./fonts.css");` — a statement at-rule, terminated by `;` rather
  than a block — was glued onto the next selector capture and read as an at-rule. The entire
  palette (`brand`, `navy`, `cta`, `surface`, `text`, `border`) was dropped, so "every channel
  re-pointed" was measured over a set that contained none of them. `tokens.json` shipped
  gutted at v1.1.2. Base token count went 141 → 271 on the fix; the gate is now verified to
  fail when a dark re-point is removed. A token that is both a group and a leaf
  (`brand-500` beside `brand-500-c`) no longer overwrites its own channels.
- **The contrast gate could not read an alpha tint.** `--lw-brand-soft` is authored
  `hsl(var(--lw-brand-500-c) / 0.14)` where every status tint gets an opaque `-c` channel, so
  it parsed as a derived line and was dropped — leaving the one soft chip the manifest could
  not measure as the brand one, in the group whose own comment calls it "the documented bug
  floor". Alpha tints now resolve, and a translucent BACKGROUND is flattened over every
  surface tier it can land on, scored at the worst — a `.lw-chip` sits on a card as often as
  on the page.
- **An unresolved pair blamed the wrong side.** The MISS message printed `entry.fg` whether
  or not the fg was the problem, which sent a reader hunting a token that resolved perfectly.
- **`declarationsIn` required a trailing `;`**, silently dropping a block's final declaration
  — and a dropped channel reads downstream as "unresolved", not as the authoring slip it is.
- **`check:visual` cannot fail and said so as "no visual change".** It has never had a
  committed baseline, so every run recorded and reported success. It now states plainly when
  nothing was compared. Baselines are byte-exact PNG matches and therefore machine-local;
  `.visual/` is fully ignored, and CI must record its own inside its image.
- **`npm ci` in CI had no lockfile to install from.** `package-lock.json` is now committed.
- **`lw-token-lint` threw a raw ENOENT** on a mistyped path instead of naming its two modes.
- **`lw-a11y` had no way to exempt a deliberate failure.** `data-a11y-expect="<rule-id>"` opts
  one node out of one rule, so the neutrals card can keep publishing text-4's sub-AA ratio —
  which is the row's entire point — without the gate demanding the card contradict itself.

### Fixed — what the widened gates found

- **`--lw-text-3` was AA against white only** (4.83), and measured **4.07** on `--lw-surface-3`
  — where `code`, `.lbl` and most muted captions actually sit. A floor measured against the
  lightest surface is not a floor. Now `220 8.9% 43.3%` (#656B78): 5.34 on the page, 4.51 on
  an inset. **`--lw-fg-subtle` on dark** had the identical hole (4.47 on a raised card) and is
  now `57.5%`.
- **New `--lw-brand-on`** — the ink for the brand tint, mirroring `--lw-success-on`. `.lw-chip`
  and `.lw-avatar` painted `--lw-brand-text` (the *link* shade) on `--lw-brand-soft`: **3.98**
  over an inset. Brand was the only family in the soft-chip group without its own ink, which
  is exactly why the omission went unnoticed while all four statuses were covered.
- **`role="feed"` on `ActivityFeed` → `role="group"`.** That role obliges `aria-posinset` /
  `aria-setsize`, managed focus and `role="article"` children — none implemented, and the
  group headings between items cannot be feed children at all. Claiming a role you do not
  honour is worse than claiming none.
- **`RichText`'s toolbar carried `aria-controls="rt"`** — a literal IDREF pointing at nothing,
  in every instance on the page. It now references the editor body's real `useId`, and is
  omitted entirely when a caller brings their own surface.
- **The specimen cards reached past the roles to the tiers.** `--lw-text-3` / `--lw-surface-2`
  are theme-invariant by design, so a card that paints them renders light-mode ink on navy
  (3.5:1). Swapped for `--lw-fg-subtle` / `--lw-bg-inset` in the motion, spacing and radii
  cards — the same mistake `base.css` already documents for `surface-3`/`text-4`.
- **The swatch cards never re-hydrated on a theme flip.** `_card.js` listened for
  `prefers-color-scheme` but not for `.dark` / `data-theme` on `<html>` — which is how a theme
  is actually toggled. The swatches kept light-mode ink over a dark-mode plate: navy on the
  dark `cta-soft` tint measured **1.26**, on the card whose purpose is publishing ratios. Its
  ink picker also ignored alpha, reading a `-soft` tint as its fully opaque channel.
- **Opacity used as hierarchy.** `.sw span` at 85% measured 3.81 over the danger fill, and the
  marketing logo rail's `opacity: 0.42` — right for a masked graphic — put the `.is-text`
  wordmark at **2.77**. Both now carry the recede in ink and size instead.
- **`.lw-diff-line .n`** painted line numbers from `--lw-fg-faint`, the tier documented
  "decorative only, fails AA as body text", over the tinted add/mod row fills. The ~40 other
  `fg-faint` uses are disabled states, which WCAG exempts, and are left alone.

`check:a11y` goes from **43 violation groups to zero**; the contrast manifest from 64 to 75
pairs, all passing.

## [1.1.2] — 2026-07-30

### Fixed
- **`tokens.json` was gitignored while `package.json#exports` published it.** Every consumer
  installs from a git tag, so the `./tokens.json` subpath resolved to nothing. It is now
  generated AND committed — and because a committed generated file goes stale silently,
  `check:themes` now fails when it no longer matches what `tokens.css` would produce.
- The changelog's `[Unreleased]` section described the v1.1.0 baseline — Popover, Menu,
  Combobox, DataGrid, the density layer — as unreleased, while the README documented all of
  it as shipped. Rolled under `[1.1.0]`.

### Removed
- `scraps/` and `uploads/` — 23 build screenshots, 684 KB, referenced by nothing.

## [1.1.1] — 2026-07-30

No rendered output changes. Two gates that reported success they had not earned, and the
debt the second one was hiding.

### Fixed
- **The contrast gate never measured a pair.** Three defects, each masking the next. Its CSS
  splitter treated everything since the last `}` as a selector, so the leading
  `@import url("./fonts.css");` was glued onto the first `:root` — the palette block never
  matched and every channel resolved as "unresolved token". Parity matched theme blocks by
  exact selector text, but `tokens.css` authors them as lists
  (`:where(.lw-band-dark, [data-band="dark"])`) and scopes the system-preference block with a
  bare `:root`. And `:root` / `.dark, …` are each authored across several blocks, of which
  only the first was read. Now: 64/64 pairs at AA, parity and logo-gradient clean.
- **`check:tokens` pointed at `src`**, which does not exist in this package — the script threw
  ENOENT rather than running. It now uses `--css`, the intended in-repo mode.
- The 18 raw values that surfaced once the lint ran: 13 durations and 5 z-indexes across
  `base.css`, `marketing.css` and `product.css`.

### Added
- Names for those 18 values — every literal preserved exactly, so nothing moves on screen.
  `--lw-dur-press` 60ms, `--lw-dur-spin` 700ms, `--lw-dur-spin-slow` 2.4s, `--lw-dur-ground`
  26s, `--lw-dur-comb` 14s, `--lw-dur-breathe` 24s, `--lw-dur-sheen` 19s, `--lw-dur-shimmer`
  1.4s, `--lw-dur-caret-stream` 1s, `--lw-dur-trace` 1.6s, `--lw-dur-tool` 1.4s.
- `--lw-z-local-1..4` — a local tier BELOW `--lw-z-raised`, for ordering a component against
  itself (a data grid's header over its pinned column over its cells). Collapsing those onto
  one page-level token would have flattened the component's internal order.

## [1.1.0]

Baseline. See the README for the full component index.

> **[0.9.0] and earlier — see git history.** `v0.1.1` through `v0.9.0` predate this file;
> v1.1.0 replaced the repository wholesale from the Claude Design project, and the entries
> were not carried across. `git log v0.1.1..v1.1.0` is the record. This matters more than it
> looks: all three consumers are pinned in that range (`v0.8.1`, `v0.2.3`, `v0.2.2`), so the
> gap covers exactly the span a consumer bump has to reason about. Reconstructing it is the
> prerequisite for the first bump, not an archival nicety.

### Fixed
- **`check:tokens` CSS self-check read only `lw.css`** — which the layer split turned into a
  two-line `@import` shim, so the raw-duration and raw-z-index rules were checking nothing.
  It now scans the three real layers (`base.css`, `marketing.css`, `product.css`) and names
  the file in each finding.
- Post-split doc drift: README (component-wrapper line, `check:visual` note, "Adding a
  component" step 2) and the `react.js` header still named `lw.css`/`app.css`; comments in
  `base.css`, `marketing.css`, `product.css`, `lw-visual.mjs` and the primitives card did too.
  All now name the real layers.
- `preview/type-eyebrow.html` was the one card still loading the shims; it loads
  `base.css` + `marketing.css` + `product.css` directly now.
- README's template table was missing the `email` row (it said twelve, listed eleven);
  `package.json`'s description said "six templates".

### Added
- **Density layer.** `--lw-control-h-sm/md/lg`, `--lw-field-pad-x`, `--lw-row-h`,
  `--lw-cell-pad-y`, `--lw-card-pad`, `--lw-stack-gap`, driven by `data-density="compact"`
  / `"comfortable"`. A semantic layer over the literal px scale — the space scale is
  unchanged, and `--lw-space-24` is still 24px always. Scoped, not global. The 44px
  coarse-pointer minimum is now set on the tokens, so it reaches every control that reads
  them, including ones not written yet.
- **`Popover`** — the system's one floating surface, promoted to the top layer. Menu,
  Combobox, DatePicker and the filter panels will all be built on it.
- **`Menu`** — the action menu on `Popover`: arrow keys, Home/End, typeahead, Esc returns
  focus to the trigger, `menuitemcheckbox` rows, destructive rows on the danger role ink.
- 32 icons for the incoming control layer: `calendar`, `upload`, `pin`, `grip`, `columns`,
  `checkmark`, `minus`, `x-circle`, `more-vertical`, `chevrons-up-down`, `sort-asc`,
  `sort-desc`, `eye`, `eye-off`, `lock`, `mail`, `link`, `image`, `folder`, `star`, `bell`,
  `inbox`, `play`, `pause`, `mic`, `mic-off`, `thumbs-up`, `thumbs-down`, `maximize`,
  `minimize`, `undo`, `help`.
  `checkmark` is the BARE check; `check` remains the circled one. Two glyphs, two names — a
  rename would have silently repointed every existing consumer.
- **`Combobox`** — single and multi-select with filtering, tokens, async `onSearch`, and the
  ARIA 1.2 `aria-activedescendant` pattern so focus never leaves the input.
- **`Drawer`** — the side sheet on the native `<dialog>`; `side`: start / end / bottom.
- `Popover` gained `triggerAria` (default true). Set false when the trigger owns its own
  ARIA — `Combobox`'s input carries `role="combobox"` and `aria-expanded` itself.
- **`Calendar`** + **`DatePicker`** — roving-tabindex date grid, `Intl` month and weekday
  names, range mode with a preset rail (Today / 7 / 30 / 90).
- **`DataGrid`** — sticky header, resizable and pinnable columns, bulk selection with a
  selection bar that replaces the toolbar, optional row windowing. Separate from `Table` on
  purpose.
- **`Pagination`** (numbered and cursor modes, with the result count), **`FilterBar`** +
  **`Toolbar`** (applied filters as removable chips).
- **`FileUpload`** — dropzone as a `<label>` around a real input, per-file progress and
  error, drag-counter so `dragleave` on a child does not flicker the state.
- **`Stepper`** — horizontal and vertical wizard progress.
- **`BarChart`** + **`LineChart`** and the `--lw-chart-1..8` categorical palette (light and
  dark), each chart shipping its numbers as a visually hidden table.
- **`ActivityFeed`** — day-bucketed notifications and activity, `timeAgo` exported.
- **`CommandPalette`** — ⌘K on the native `<dialog>`, scored subsequence match; it does not
  bind the shortcut itself.
- Cards: **Density** (Spacing), **Popover, Menu** (Overlays), **Combobox** and
  **DatePicker, FileUpload, Stepper** (Forms), **DataGrid, Pagination, filters** and
  **Charts, ActivityFeed** (Data), **CommandPalette** (Navigation); `Drawer` joins the
  overlays composition card.
- **AI layer**: `ToolCall`, `DiffReview` (+ `--lw-diff-*` grounds, light and dark),
  `Artifact`, `Feedback`.
- **`StateView`** — empty / loading / error / offline / denied as one set, with the right
  announcement role per variant.
- **Five templates**: `list-detail`, `search-results`, `onboarding-wizard`, `auth`,
  `export-report` — each settling a documented set of pattern decisions (README §Templates).
- **`email.css`** — the email layer: literal values, table layout, padded-anchor buttons, one
  max-width breakpoint, a `prefers-color-scheme` block that assumes the client will recolour
  anyway. Plus a `templates/email` transactional template that ships its plain-text part.
- **Mobile**: `--lw-safe-top/right/bottom/left`, `--lw-bottom-nav-h`, `--lw-mobile-bar-h`, and
  **`BottomNav`** — destinations only, 44px from the bar height, home indicator from the token.
- **`RichText`** — editor chrome with a swappable engine.
- **Gates**: `check:themes` (every themable channel re-pointed in every scope, and the same
  pass emits DTCG `tokens.json` for Tokens Studio), `check:a11y` (axe over every card, both
  grounds), `check:visual` (every card × light/dark × comfortable/compact). `npm run check` is
  the three fast ones; `npm run check:ci` is all five. GitHub Actions workflow included.
- `CHANGELOG.md` and `CONTRIBUTING.md`.
- `ROADMAP.md` — the gap analysis and the sequenced plan to v2.

### Changed
- **The CSS layers are split and renamed** so the names match the contents:
  `base.css` (reset, type, buttons, cards, chips, pointer list) · `marketing.css` (grounds,
  hero, features, stories, ambient motion) · `product.css` (layout, forms, data, overlays,
  shell, AI). `lw.css` and `app.css` remain as `@import` shims for one full major — **do not
  load a shim alongside the real files**, or the same rules apply twice and the cascade between
  layers reorders. Load order is `tokens` → `base` → `marketing` and/or `product`.
- **`AppBar`** — brand + breadcrumbs + actions on `TopBar`, replacing the row five templates
  each hand-wrote (two of them with the flex wrong).
- `sort-asc` / `sort-desc` redrawn with an arrow: the first pass signalled direction by line
  length alone, which is one cue where rule 6 requires two. `pin` redrawn head-on — the angled
  version read as an unidentifiable wedge at 16px.
- `check:themes` now exempts `--lw-on-*`, which is the rule rather than a hole in it: those
  inks sit on fills that do not follow the theme, so an ink that did would put 1.77 on the amber.
- `tsup.config.js` and a `build` script are committed. The exports still point at source —
  **flip them to `dist/` in the same commit as the first successful build**, not before.
- `SourceList`, `InputGroup`, `Split` and `Container` now live in their own
  `Name.jsx` + `Name.d.ts` pairs instead of riding inside a sibling. They were documented
  API with no types of their own and were invisible to any tool that walks the pair.
  **No import path changed** — everything still comes from `@leanwise/design/react`.
- Control faces (`.lw-input`, `.lw-select`, `.lw-input-group`, `.lw-textarea`, `.lw-btn`
  and its sizes) read the density tokens instead of literal heights.

### Notes for consumers
- **No import path changed in this release.** Everything still comes from
  `@leanwise/design/react`, `/brand`, `/hooks` and the stylesheets by name. `email.css` and
  `tokens.json` are new subpath exports.
- **Density is opt-in.** Without a `data-density` attribute every control keeps its current
  size, so this release changes nothing visually unless you ask it to.
- **`REVIEW.md` is the current audit** — what is true, what is still open, and the order to do
  it in. Two items this release does not attempt: the real build (tsup, so consumers stop
  paying the `babel-loader` tax) and the move off the `github:` dependency to a registry.
- **One correction to the install**, which was wrong before this release too: an app needs
  `lw.css` as well as `app.css`, because `.lw-btn` lives there. See README §Install; the layer
  rename that fixes it properly is finding 1 in `REVIEW.md`.

### Fixed
- The README stated the component count three different ways (50, 51, 52) while the build
  exposed more than any of them. The count is no longer written down anywhere it can go
  stale; `IconNames.length` remains the pattern for anything that must be quotable.
- The per-control heights in `app.css`'s `@media (pointer: coarse)` block are gone. They
  would have outranked the density token the same block now raises.

