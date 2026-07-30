# Changelog

All notable changes to `@leanwise/design`. The format is
[Keep a Changelog](https://keepachangelog.com/en/1.1.0/); the versioning is semver.

**Deprecation policy.** A component, class or token that is going away is warned for one
MINOR and removed in the next MAJOR. Nothing is deleted outright — v1.0 removed
`.lw-theme-toggle` and `.lw-code-tabs` without a cycle, which was survivable at one consumer
and would not be at five.

## [Unreleased]

Nothing yet.

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

