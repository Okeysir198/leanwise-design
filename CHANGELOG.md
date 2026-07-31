# Changelog

All notable changes to `@leanwise/design`. The format is
[Keep a Changelog](https://keepachangelog.com/en/1.1.0/); the versioning is semver.

**Deprecation policy.** A component, class or token that is going away is warned for one
MINOR and removed in the next MAJOR. Nothing is deleted outright — **v1.1.0** removed
`.lw-theme-toggle` and `.lw-code-tabs` without a cycle, which was survivable at one consumer
and would not be at five. (The CSS comments say "deleted in v1.0"; that is the design
project's own numbering. No `v1.0.x` tag exists in this repository — the tag list goes
`v0.9.0` → `v1.1.1` — so the deletion reached consumers in v1.1.0.)

**Reading this file across the v1.1.0 break.** Every tag from `v0.1.0` to `v0.9.0` is
documented below. Two of the three consumers are still pinned inside that range; `leanwise-ai` has since moved to 1.1.8 (this line said `#v0.8.1` until 2026-07-31, and was wrong) — `leanwise-ai`
`#v1.1.8`, `P20260707-vss` `#v0.2.3`, `P20260706-rag-service` `#v0.2.2`. The v0.x entries are
carried forward from the changelog that shipped in the pre-1.1.0 tree (`git show
v0.9.0:CHANGELOG.md`), which v1.1.0's wholesale replacement overwrote; the per-version
**Consumers** notes and the breaking markers were added afterwards by diffing the tags. Six
versions are breaking: **0.1.4** (dependency URL), **0.2.0** (removal), **0.7.0**, **0.8.0**
and **0.9.0** (visual, palette), and **1.1.0** (everything). `v0.2.2` additionally ships a
`package.json` that reports the wrong version.

## [Unreleased]

### Added

- **`theme.css` — the Tailwind v4 registration layer.** `tailwind-preset.cjs` has always been
  the v3 artifact; there was no v4 equivalent, so a v4 consumer either hand-wrote the whole
  bridge or did without. `tss-app` hand-wrote ~600 lines of it and still lost all six
  `fontSize` roles, all four `backgroundImage` surfaces, both custom durations, the container
  and every one of the six keyframes — so every Radix overlay in that app opened with no
  animation and `animate-accordion-down` compiled to nothing.

  Import it AFTER `shadcn.css`. It complements that file rather than replacing it: `shadcn.css`
  declares the alias VALUES on its seven-selector list (which is what makes a `[data-band]`
  subtree re-theme), `theme.css` only registers names with the compiler.

  Two structural notes worth reading before adopting:
  - Colours, shadows, focus rings and the brand surfaces are in `@theme inline`, because a
    plain `@theme` resolves their `var()` **at `:root`** and freezes the palette for any
    subtree theme. Measured: 30 of 35 `--lw-shadow-*` declarations and 11 of 13
    `--lw-focus-ring*` sit inside a theme scope.
  - The cost of `inline` is that `--color-*` are **not** on `:root`. Grep for `var(--color-`
    before adopting.

- **`check:presence` (`lw-presence.mjs`) — the presence gate.** Every other gate here is a
  deny-list or a value check over names that already exist; none can see an ABSENCE, which in
  Tailwind v4 is the dominant failure mode because an unresolvable utility emits no CSS and
  errors nothing. Four checks: v3 <-> v4 parity in both directions, the bare-key rule (a
  `--x-*: initial` reset removes the unsuffixed `x` utility along with the tiers), shadcn
  property completeness, and — because the first three only compare text files — an actual
  compile of the documented import chain asserting all 83 registered utilities emit.

  Mutation-checked nine ways before being trusted, and it found two bugs in itself doing so:
  a `name.includes("--")` guard that was true for every custom property and so skipped the
  entire reverse-parity check, and a `filter(Boolean)` that dropped v3's `DEFAULT` arms and
  made `--radius` and `--shadow` look like v4-only inventions.

- **shadcn's `sidebar` block and the `chart` ramp**, in `shadcn.css` and both Tailwind
  artifacts. Every shadcn consumer has had to hand-derive these; `tss-app` wrote all eight
  sidebar names itself and its comment recorded the ask verbatim — *"No `--lw-sidebar-*` role
  exists … requested upstream as a v1.2 role."*

  It costs **zero new tokens**: a sidebar is a subtle surface with muted ink, the active item
  is the muted surface, the rail is a line. All eight are existing roles, so they re-point on
  dark and inside a band for free. Emitted as channel triples because shadcn's `sidebar.tsx`
  composes them as `hsl(var(--sidebar-border))`.

  `--sidebar-background` is also emitted — shadcn renamed it to `--sidebar`, and which one a
  consumer's vendored component reads depends on when they scaffolded it. Same value, not a
  second decision; deprecated for one MINOR and removed in v2.0.

  All eight `--lw-chart-*` are aliased as `--chart-1..8` (shadcn reads 1-5). ⚠️ Unlike every
  other alias here these are **full colours, not triples** — `--lw-chart-*` has no `-c`
  sibling — so do not wrap them in `hsl()`. In v4 `bg-chart-1/40` still works via `color-mix`;
  in v3 it cannot, which is the one place the two artifacts differ in capability.

- `ease-emphasis` and `ease-spring` in the v3 preset and `theme.css`. Both tokens have existed
  in `tokens.css` since 1.0 with nothing exposing them. Purely additive — no stock Tailwind
  name to collide with. `ease-in` / `ease-in-out` are deliberately still absent: measured
  against Tailwind's stock curves they are byte-identical, so registering them would buy a
  second home for a value nobody is changing.

### Changed — the one non-additive edit in 1.2

- **The nine bare-element rules moved out of `base.css` into a new `reset.css`.** Un-layered
  element rules beat every Tailwind utility regardless of specificity, so
  `button { background: none; border: 0; padding: 0 }` stripped the padding and background off
  every `<Button>` in a Tailwind app, and `body { font-size: … }` overrode the type scale.

  That made `base.css` un-importable by exactly the consumers the README told to import it —
  the recipe said *"shared controls — never dropped"* for "VSS, tss-app" — and it is why
  tss-app refuses both `base.css` and `product.css` and therefore consumes zero `.lw-*`
  components. The README recipe is corrected in the same release.

  Same rules, same values: verified by normalising `reset.css + base.css` against the previous
  `base.css` — 205 rules on both sides, none lost, none gained. The only ordering change is the
  iOS 16px input rule moving earlier, which is inert because no bare-element rule follows it.

  **Migration — one line, one consumer.** A vanilla consumer that imports `lw.css` needs
  nothing; the shim now pulls `reset.css` first. A vanilla consumer that imports `base.css`
  directly — that is `leanwise-ai`, in `src/routes/__root.tsx` — adds:

  ```js
  import '@leanwise/design/reset.css';   // before base.css
  ```

  A **Tailwind** consumer should NOT import `reset.css`: preflight already covers the useful
  half, and the opinionated `button` and `body` rules are the half that does the damage.

  Guarded by `check:presence`, which asserts the split in BOTH directions — the component
  layers must contain no un-anchored selectors, and `reset.css` must contain nothing else.
  Checking only one direction would let the split quietly un-split from the other side. The
  four deliberate exceptions (a forced-colors tab rule, three `[data-collapsed]` opt-ins) are
  in a checked-in exemption list, each with its reason.

### Fixed

- **The consumers table said `leanwise-ai` was pinned at `#v0.8.1`. It is on `#v1.1.8`.**
  Eighteen tags of drift that did not exist, on the flagship consumer, in the table anyone
  reasons from when deciding whether a change is safe to ship. Corrected in `CLAUDE.md` and
  above, with the one-line command to verify a row against the consumer's own `package.json`.
  Real drift today is VSS (`#v0.2.3`) and rag-service (`#v0.2.2`).

### Notes

- `tailwindcss` + `@tailwindcss/postcss` are now devDependencies, pinned `^4` — deliberately
  looser than any consumer's pin, so a namespace change in a newer Tailwind fails here before
  it reaches an app.

## [1.1.8] — 2026-07-31

Two documentation defects, both of the kind this package exists to argue against: a fact
with two homes, drifting silently.

### Removed

- **The `./components/*` subpath export.** README states in two places that "there is no deep
  path into `components/`, so a component can move without breaking a consumer" — and
  `package.json` had exported `./components/*` since v1.1.5, quietly making every file path
  under `components/` public API. The documented contract is the intended one, so the export
  goes rather than the guarantee. Removing it inside a minor is a deliberate exception to the
  deprecation policy on two grounds: it was never documented (so nothing could have been
  written against it in good faith), and all three consumers are pinned pre-1.1.0, so the
  installed-user count is zero. **This is the cheapest moment it will ever be.** Import from
  `@leanwise/design/react`.

### Fixed

- **README's install pin said `#v1.1.6` while the package was `1.1.7`.** A consumer copying
  that line installs the previous release — and it resolves, installs and builds, so nothing
  anywhere notices. A version number in a document is a second home for
  `package.json#version`, sitting on the front page of the package whose whole thesis is that
  consistency should be a dependency rather than a discipline.

### Added

- **`stale-install-pin`**, a self-check rule, so the above cannot recur: the
  `leanwise-design#vX.Y.Z` spec in `README.md`/`CONTRIBUTING.md` must equal
  `package.json#version`. Deliberately narrow — it matches only the dependency-spec form, not
  prose about older versions, of which the CHANGELOG and the consumer table are legitimately
  full. It also fails if the install pin disappears entirely, so the rule cannot end up
  asserting nothing.

## [1.1.7] — 2026-07-31

Closed every item the v1.1.6 audit left open. Three of them were **live user-facing defects
that every gate reported green on** — none was found by reading the code; each was found by
building the measurement that had been missing.

### Fixed — user-facing

- **The diff review surface was invisible for OS-dark visitors.** `--lw-chart-1..8` and
  `--lw-diff-add/-del/-mod` (and their `-line` variants) re-pointed only behind a class
  selector. A visitor whose OS prefers dark and whose page sets no class — the default for a
  plain marketing page, and the most common deployment there is — got the **light** diff
  grounds on a navy page, so `.lw-diff-line .t` painted `--lw-fg` #E7ECF3 over `--lw-diff-add`
  #E7F9ED: **1.08:1**. Confirmed in Chromium before and after, across all eight combinations
  of {OS light/dark} × {no class, `data-theme=light`, `data-theme=dark`, `class=dark`}.
- **The theme cookie was restored.** v0.6.5 wrote the choice to a `lw-theme` cookie
  specifically so a server could read it and emit `<html data-theme>` in the first byte. The
  v1.1.0 wholesale replacement rewrote the hook with `localStorage` only and dropped it —
  nothing errored, and SSR consumers simply flashed the wrong theme on every reload. There is
  now **one writer**, `persist()` in `hooks.js`; `ThemeToggle` had its own copy of the write,
  which is how it missed the cookie to begin with. `hooks.d.ts` also gained the `THEME_KEY`,
  `paint` and `persist` declarations it had always been missing.
- **Four template landmark gaps.** `ai-app-shell` and `docs-page` carried a `<main>` with no
  `id` and no skip link — missed by the v1.1.5 sweep — and `email`/`pitch-deck` had no main
  landmark at all.
- **The `Segmented` selected state** would have shipped unstyled: the move to `aria-checked`
  left three CSS selectors keying on `aria-pressed`. The selectors now match all three
  spellings, because the CSS layer is the contract the **vanilla** consumers render against
  too and they still author the old markup.

### Added — gates

- **`lw-bundle.mjs` + `check:bundle`.** `_ds_bundle.js` had no generator in this repo; it was
  cut in the design project, so a `.jsx` fix was invisible to `check:a11y` and `check:visual`
  until the next wholesale sync. **34 source files had drifted** by the time the generator
  landed. esbuild, React from the page globals via a CJS shim, `--check` fails on staleness.
  It also fails when a card reads a namespace key that does not exist — a card reading an
  absent key renders blank, and axe scores blank as clean.
- **`lw-templates.mjs` + `check:templates`** — the only gate that opens a `.dc.html`. Asserts
  the twelve `ds-base.js` and twelve `support.js` are byte-identical (naming the odd one out,
  not just "they differ"), that no template loads the `lw.css`/`app.css` shims alongside the
  real layers, and that `lang`, a main landmark and a *resolvable* skip link are present.
- **A third canonical contrast scope**, `light ⊕ media-dark`, merged in **source order** — a
  `:root` inside a media query and a top-level `:root` have identical specificity, so a naive
  spread reports a palette the browser never paints. Plus `darkScopeDivergence()`, comparing
  the two dark scopes token-for-token, which is what caught the chart family since no manifest
  pair names it. **86 pairs → 135.**
- **`check:visual` can now fail, and does.** A real pixel diff replaces byte-exact SHA
  equality, via a hand-rolled `node:zlib` PNG decoder verified against Chromium's own decoder
  (max channel delta 0) — dependencies stay at four. Two per-shot rules (Δ>8 over 0.02%; Δ>48
  over 0.002%) from a *measured* noise floor of ~2 px in 816 shots. CI records the **base
  ref's** baseline on its own runner, so both sides come off one machine. No usable base ref
  → loud skip at exit 0. `[visual-ok]` in the head commit downgrades a failure to a report,
  because `--update` is meaningless when the baseline dies with the runner.

### Changed — API

- **`Table` and `DataGrid` converged on one column contract**: `columns[].header` and
  `onSort({ key, dir })`. `label` collided with the form-control sense of the word used
  everywhere else in the package, and an object argument extends where a positional one
  cannot. `Table` also adopts DataGrid's top-level `sort={{key, dir}}` — its per-column
  `c.sort` meant a `sort` prop landed in `...rest` and was spread onto `<table>` as an invalid
  DOM attribute. **All legacy spellings still work**, warn once per component per prop, and
  are removed at v2.0.0.
- **`Segmented` and `ThemeToggle` are real radio groups** — `role="radiogroup"` /
  `role="radio"` / `aria-checked`, one tab stop, Arrow/Home/End to move and select.
  `aria-pressed` describes N *independent* toggles. It is kept where the controls genuinely
  are independent (`RichText`'s bold + italic) or clearable (`Feedback`'s thumbs, which a
  radio cannot do). `DatePicker`'s presets became `aria-current` — they are shortcut actions,
  not a selection state.
- **The two logical APIs that were lying.** `data-side="start"` (Drawer) and
  `data-edge="start"` (Calendar) were implemented as left/right, so an RTL consumer asked for
  the start edge and got the end one. Now `inset-inline` / `border-inline-*` / logical radii,
  with `--lw-dir` flipping the drawer keyframes (a `translateX` cannot mirror itself), plus a
  general physical→logical sweep of the three layers. **Two remain physical on purpose and say
  so in a comment**: `.lw-safe-x` (`env(safe-area-inset-*)` describes a notch, which does not
  swap with writing direction) and `.lw-select`'s `padding-right` (coupled to
  `background-position`, which has no logical form).
- Chart series and x-labels no longer key on their name or label — repeated month names across
  a two-year range collided, and React drops or duplicates children on a duplicate key. Also
  fixed in `ActivityFeed`'s day buckets, which the audit had not listed.
- `ActivityFeed` no longer calls `Date.now()` during render (a hydration mismatch), mirroring
  the fix `Calendar` got in v1.1.5.

### Changed — cards

- **18 `.pane` and 20 `.lbl` local copies deleted.** Each card's inline `<style>` follows the
  `<link>`, so every local copy won and the shared rule was dead for two-thirds of the cards.
  Measured from computed styles rather than read: the `.pane` copies differed **only in
  `gap`**, and `.pane.dark` was forcing a palette value where `.lw-band-dark` already
  re-points the role (contrast *improves* by deleting it, 4.86 → 5.02). The genuine
  differences — Combobox and Menu need a `min-height` because the listbox opens inside the
  pane — were kept and documented.
- **`preview/_vendor/`**: React, ReactDOM and `@babel/standalone` vendored at their exact
  pinned versions with a SHA-256 table. The cards loaded them from unpkg, which made both
  browser gates network-dependent and unrunnable air-gapped. Proved offline by loading all 34
  cards with every non-`file:` request aborted.
- **`preview/_fonts.css` deleted** — 140 KB of base64 mirroring `fonts/` with no generator
  linking them. `_card.css` → `../tokens.css` → `fonts.css` → `fonts/*.woff2` already resolves
  from any card depth; measured over `file://` with identical glyph advances.

### Documentation

- The pre-1.1.0 changelog gap is filled: **all 27 tags from v0.1.0 to v0.9.0**, with
  per-version consumer notes and breaking markers derived by diffing the tags.
- Two corrections to the standing audit. `deck-stage.js` is a **vendored upstream starter**
  (`@ds-adherence-ignore`, overwritten by the next `copy_starter_component`) and must *not* be
  gated or tokenised — a local fix there is lost silently. And the `PRINT_BASELINE_CSS` mirror
  it was said to carry is actually in `support.js`, all twelve copies.
- **rag-service was never install-drifted.** `git show v0.2.2:package.json` reports `0.2.1` —
  the bump was missed when that tag was cut, so the pin resolves *correctly* to a tree
  reporting the older number and no reinstall can change it. The fix is a pin bump to
  `#v0.2.3`. CLAUDE.md had recorded this as drift and told the next person to fix the install
  first, a step that could never have worked.

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

## [1.1.0] — 2026-07-30

> ### ⚠️ This is not a release. It is a repository replacement.
>
> `a07a90f` discarded the v0.9.0 tree and wrote the contents of the Claude Design project
> (`f2d90781-f891-45e3-bc88-ddb55e6f9444`) over it — 305 files. Nothing was migrated; the old
> tree was deleted and a newer, independently-authored one was committed in its place. Git
> history is intact and `v0.9.0` still marks the old tree, but there is **no incremental diff
> to review**: every v0.x → v1.1.0 question is "did the new tree happen to keep this?", not
> "what changed?".
>
> **There is no `v1.1.0` git tag, and no `v1.0.x` at all.** The tag list goes `v0.9.0` →
> `v1.1.1`. A consumer cannot pin `#v1.1.0`; the first pinnable version on this side of the
> break is **`#v1.1.1`**. The version numbering came from the design project, which had its
> own 1.0; that 1.0 never existed as a tag here. Where the CSS and this file's deprecation
> policy say "deleted in v1.0", the deletion reached consumers in v1.1.0 — i.e. **in the same
> step as everything else**, with no deprecation cycle.
>
> The Fixed / Added / Changed sections below describe the new tree relative to the design
> project's own previous state — that is what the authoring surface knew about, and it is why
> they read as an ordinary release. For what this step does to a consumer
> sitting on a v0.x pin — which is all three of them — read **§Breaking for a v0.x consumer**
> at the foot of this entry instead. It is the only accurate account of the step.

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
- ~~**No import path changed in this release.**~~ **This line is wrong and was wrong when it
  was written.** It is true *inside the design project*, whose previous version already had
  `hooks.js` and a flat `react.js`; it is false for every consumer of this repository, all of
  which were on v0.x. Four import paths changed and one export was deleted outright — see
  §Breaking for a v0.x consumer below. `email.css` and `tokens.json` are new subpath exports.
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

### Breaking for a v0.x consumer

Measured by diffing `v0.9.0` against `a07a90f`, not inferred from the commit message.

**What survived, and can be relied on.** No `--lw-*` token was dropped — the v1.1.0
`tokens.css` is a strict superset of v0.9.0's, including the `--lw-duration-*` legacy aliases
kept since v0.6.0. Exactly three `.lw-*` classes disappeared: `.lw-btn-primary`,
`.lw-btn-amber` and `.lw-italic-amber`. `.lw-theme-toggle` and `.lw-code-tabs` also lost their
rules (they survive only as comments and one dead selector) — those are the two the
deprecation policy at the top of this file names, and they went without a cycle. Everything
else in `lw.css` — the whole marketing and motion layer, `.lw-spotlight`, `.lw-aurora`,
`.lw-tilt`, `.lw-draw`, `.lw-browser-frame`, `.lw-hero-dark`, `.lw-counter`, `.lw-logo-rail`,
`.lw-scroll-*` — is carried forward. The Tailwind preset kept every utility family and added
`neutral`.

So the CSS is close to safe. The **JavaScript entry points are not**:

| v0.9.0 | v1.1.0 | What a consumer must do |
|---|---|---|
| `./react` → `dist/react/index.js` **+ `.cjs`** | `./react` → `./react.js`, ESM-only | The `require` condition is gone. A CJS consumer of `@leanwise/design/react` breaks outright. |
| `./counter` → `lib/counter.js` | **deleted** | `leanwise-ai` imports this. Restored as a one-major shim in **v1.1.5** — do not bump into v1.1.0–v1.1.4 with that import live. |
| `./brand` → `lib/brand.js` | `./brand.js` | Path is stable; the subpath still resolves. |
| `./tailwind-preset` → `tailwind-preset.js` (ESM) | `tailwind-preset.cjs` | The file extension and module format changed. An ESM Tailwind config that did `require(...)` — or `export default` against the old ESM file — needs revisiting; v1.1.5 fixed README's snippet for exactly this. |
| named icons `Check`, `Warning`, `Cross`, `Dash`, `Sun`, `Moon`, `Auto`, `Play`, `Step`, `File`, `ChevronRight` | **unexported** | Only `<Icon name="…">` remains. Every `<Check />` call site is a build error. |
| `useTheme`, `useReveal`, `useSpotlight`, `useDeterministicCascade` from `/react` | moved to `/hooks` | Change the import specifier. They are not re-exported from `/react`. |
| `bin` field: `lw-token-lint`, `lw-contrast-check` | **removed** | The CLIs are no longer installed binaries; they live at `templates/_tooling/*.mjs` and, since v1.1.5, are not shipped in `files` at all. A consumer running `lw-token-lint` in CI loses it. Invoke the script from a checkout, per CLAUDE.md. |
| `dist/` committed and exported | dropped | **`main`/`exports` point at `.jsx`/`.js` source.** The consumer's bundler now does the transform. A consumer that does not transpile `node_modules` — the exact failure v0.1.1 fixed for `brand.ts` — will not build. |

**A silent behavioural regression, still live.** v0.6.5 made `useTheme.setTheme` write the
`lw-theme` **cookie** as well as `localStorage`, specifically so `leanwise-ai`'s SSR could
resolve `<html data-theme>` on the next full load with no flash. The v1.1.0 `hooks.js`
`useTheme` writes `localStorage` only. `grep -c document.cookie hooks.js` is 0 at every
version since. Nothing fails; the theme flashes on reload. Whoever bumps `leanwise-ai` past
v0.8.1 has to re-add it or move the SSR read to something else.

**Sequencing.** Because there is no reviewable diff, a bug found after the bump is not
attributable. Fix rag-service's install drift first and in its own commit, then bump, then
migrate the CSS layers — the order CLAUDE.md §Consumers sets out.

## [0.9.0] — 2026-07-25

> ⚠️ **Visual breaking change.** No API, token *name* or utility changed, so nothing needs a
> code edit — but every `variant="cta"`, `bg-cta`, `.lw-btn-primary` and CTA badge changes
> hue. Eyeball each consumer before bumping.

### Changed
- **The CTA ramp is amber, not orange.** `--lw-cta-500` moves `24.6 95% 53.1%` (`#F97316`,
  Tailwind's stock `orange-500`) → `43 98% 50%` (`#FCB603`), with the 400/600/700/soft tiers
  re-hued to match. Cyan and navy are unchanged — this touches only the accent.

  At 43° the amber sits ~144° from the logo cyan (187.6°), i.e. near-complementary. That
  separation is the point: it is what keeps the accent legible as an *accent* rather than
  reading as a second brand color. Lemon (55°+) was rejected on two counts — it goes flat
  against the navy paper, and it cannot produce a 700 tier that holds AA as text on white
  without turning olive.

  The value is deliberately ~2° off `#EAB308`, which is what tss-app carried and which is
  Tailwind's stock `yellow-500`. Shipping a stock palette value as the accent of a bespoke
  system is the same mistake that left the brand teal on stock `teal-500` for five versions;
  the 2° also buys a slightly better fill ratio (10.54 vs 9.76 under navy ink).

  Amber is a light fill at every usable tier, so `--lw-on-cta` stays navy — the rule that ink
  follows the fill's lightness is unchanged, and it still disagrees with brand (white ink).

  All 64 MANIFEST pairs pass AA. Prose across `tokens.css`, `shadcn.css`, `lw.css` and both
  bins was updated to say "amber" where it said "orange"; `lw-token-lint`'s `multiple-cta`
  rule is unaffected and still enforces one CTA per file.

## [0.8.1] — 2026-07-25

### Fixed
- **The logo SVGs now carry `width`/`height` as well as `viewBox`.** A viewBox-only SVG has an
  intrinsic *ratio* but no intrinsic *size*, so `mask-size: contain` has nothing to resolve
  against and the dark-ground masked mark rendered as nothing at all. The authored SVGs through
  v0.7.1 carried both; the v0.8.0 traced ones dropped them.

**Consumers:** if you are pinned at `v0.8.0`, you are shipping the invisible masked mark. This
is a one-line pin move with no other change — `v0.8.0`'s tag does not contain the fix, because
the fix commit (`d6f075c`) landed after the tag was cut and was released here.
`leanwise-ai` is pinned at `#v0.8.1`, so it has it.

## [0.8.0] — 2026-07-25

> ⚠️ **Visual breaking change, and it reverses a documented rule.** Eyeball every consumer
> before bumping. `--lw-on-brand` is now WHITE, not navy — the inverse of the rule v0.1.0
> shipped and enforced. Rebuild: a `dist/` built against v0.7.x still serves the old ramp.

### Changed
- **The brand ramp was re-sampled from the mark, properly this time.** v0.7.0 moved the hue into
  the right band but sampled by averaging across the whole gradient, landing brand-500 at
  `192° 78% 47%`. Measuring solid ink only — eroding anti-aliased edges first, since they drift
  toward black and drag the reading — and taking endpoints as percentiles along the gradient axis
  gives a tight agreement across all five source renditions: cyan `187.6° 88% 32%`, navy
  `205.2° 97% 23.5%`. v0.7.x was 4° too blue, 10 saturation points flat, and **15 lightness points
  too light**; the navy was **31 saturation points** flat. It rendered as pale sky against a deep
  teal mark.

  brand-500 is now `185° 82% 26.5%` (`#0C727B`) — the mark's colour taken ~5 points darker. That
  gap is deliberate: at the mark's own L=32% the fill sits exactly on the ink crossover (white
  4.24, navy 4.39 — *neither* clears AA) and any darker hover drops navy to 4.06. The CONNECT deck
  had independently landed on `#0C757C` for the same reason.
- **Ink is now chosen by the fill's lightness, not by whether it is "the brand".** White on the
  new brand fill is 5.68; navy would be 2.96. CTA orange and the status fills are still light and
  keep navy, via the new `--lw-on-status-c`. The old rule ("brand fills carry navy ink") was
  correct while brand-500 was a *light* cyan where white scored 2.56 — the premise changed.
- **`--lw-brand-text-c` now points at brand-500 on light** (5.68 on white), so the fill/text split
  collapses for brand. It still re-points to brand-400 on dark, so keep using the role token.
- **`inkOn()` measures both inks and returns the winner** instead of testing `luminance > 0.35`.
  The real crossover is 0.190, so every fill in between picked white when navy was readable. It
  never bit while brand-500 sat at 0.36 — and would have the moment this release moved it to 0.135.

### Added
- **`--lw-logo-cyan`** (`#0A8799`) — the mark's true cyan. The only token that exists purely for
  artwork, and no UI rule may consume it: too dark to read on the navy paper (4.05), too light to
  carry white ink (4.25). The logo keeps it because a logo carries no text; the gate checks the
  SVG stops against this rather than brand-500.
- **`--lw-on-status-c`** — navy ink for the success/warning fills, split out from `--lw-on-brand-c`
  now that the two disagree.
- `tools/trace-logo.py` + `assets/logo-paths.json`.

### Fixed
- **`--destructive` was unreadable in dark mode.** `shadcn.css`'s dark block pointed it at
  `--lw-danger-on-c` (`#F87171`, the *text* tier) while its foreground stayed near-white —
  **2.33:1** on every destructive confirm button. The gate missed it because the MANIFEST is
  written in `--lw-*` names and never checked that shadcn alias pair.
- **The logo is now an autotrace of `logo-4.png`** rather than authored geometry: mark IoU
  **0.991** and wordmark **0.975**, against 0.845 for the hand-fitted hexagon. Costs bytes — the
  mark is 29 KB (11 KB gzipped) vs 1.3 KB — and the trace settings sit where fidelity plateaus,
  since a 4× trace buys +0.004 IoU for +60% bytes.

**Consumers:** any hand-written rule that assumed navy ink on a brand fill is now wrong and
will fail AA. Search for the assumption, not for a token name — nothing was renamed, so the
lint cannot find it for you. **Do not stop at this tag**: it ships the sizeless logo SVGs that
v0.8.1 fixes.

## [0.7.1] — 2026-07-25

### Added
- **The contrast gate now checks the logo's gradient stops against `tokens.css`.**
  `logo-mark.svg` / `logo-lockup.svg` must carry literal stops — CSS custom properties do not
  cascade into an SVG loaded through `<img>`, so a `var()` there silently always renders its
  fallback. That literal was a second, unguarded home for a brand value: `lw-token-lint` walks
  `.ts`/`.tsx` under a consumer's `src/`, so it cannot see a `.svg` in this repo. Moving the
  ramp would have shipped a stale-coloured logo with every gate green — v0.7.0 moved the hue
  19°, so the next move would have done exactly that. Reuses the existing tokens.css resolver;
  fails with the offending file, the stop, and the value it should have.

### Changed
- **`assets/build-logo.py` derives the gradient from `tokens.css`** instead of hardcoding
  `#1A4D7E` / `#1AB0D5`. The file's own instruction ("regenerate when the ramp moves") was
  false while the generator held its own copy of the colour.
- **`logo-lockup.svg` is 39% smaller — 19,085 → 11,617 bytes** (brotli ~4.0 KB → ~2.3 KB).
  The traced wordmark carried two-decimal coordinates; it renders at `scale(0.24)` inside a
  128-unit viewBox at 36px, so one hundredth of a unit is ~0.0007 CSS px — three orders of
  magnitude below a device pixel. Rounded to integers; the mark is byte-identical and the
  wordmark is visually unchanged.

### Fixed
- The teal→cyan sweep in v0.7.0 missed `bin/lw-contrast-check.mjs` — its header still cited
  `#14B8A6`/2.49 and seven MANIFEST labels still said "teal". The tool whose job is to be
  authoritative about the brand was naming the wrong colour in the output it prints on failure.
  Also `README.md`'s rule 3, its `<Button>` example, the `brandVars()` note, and the install
  pin (still `#v0.6.5`).
- `README.md`'s Logo section listed only the two PNGs and stated "the logo is never tinted" —
  both wrong since v0.7.0 added the SVGs and a `currentColor` mono variant that is *meant* to be
  tinted (via inline or `mask`, never `<img>`).
- Removed a dead `.lw-nav.scrolled .lw-logo .mark` rule in leanwise-ai: `.mark` is rendered only
  by `<Logo onDark />` in the footer, so the selector could never match.

**Consumers:** no action. Additive plus doc corrections; the smaller lockup is byte-different
but visually identical.

## [0.7.0] — 2026-07-25

> ⚠️ **Visual breaking change.** The brand hue moves from teal to cyan. Nothing in the API
> changes and every contrast pair still passes AA, but every surface keyed to `--primary` /
> `--lw-brand-*` changes colour. **Eyeball a consumer before you bump its pin**, and rebuild —
> a `dist/` built against v0.6.x still serves teal.

### Changed
- **The brand is now cyan `#1AB0D5` (192°), derived from the logo.** All five renditions of the
  mark — including the two already shipping — sample to a 184–208° cyan/azure band, centre ≈196°.
  The ramp had been at 173.4°: Tailwind's stock `teal-500`, ~20° off the mark, matching neither
  the logo nor the CONNECT Mastery deck (whose own accent, `#148CA0`, is the logo cyan). The navy
  anchor was already correct at 209.4° and is unchanged.

  The ramp is **lightness-corrected, not hue-rotated.** A straight rotation to 192° at fixed S/L
  drops navy-on-`brand-600` to 3.63 (fails AA) and pushes `brand-500`'s luminance to 0.258 —
  below `inkOn()`'s 0.35 crossover — which would flip per-tenant `--primary-foreground` to white
  on cyan, the exact failure the contrast gate exists to prevent. Corrected values:

  | | new | was | floor |
  |---|---|---|---|
  | navy ink on `brand-500` (Button fill) | 7.33 | 7.53 | 4.5 |
  | navy ink on `brand-600` (Button hover) | 4.99 | 5.01 | 4.5 |
  | `brand-700` AS TEXT on white (links) | **5.87** | 5.06 | 4.5 |
  | `brand-400` as text on dark paper | 8.66 | 10.07 | 4.5 |
  | `inkOn()` luminance of `brand-500` | 0.361 → navy | 0.372 → navy | >0.35 |

  The logo's own cyan `#00849C` lands between `brand-600` and `brand-700`, so the mark's colour
  is the text tier and the fill tier is a lightened version of it.
- `--lw-gradient-brand` stop order flipped to **navy → cyan**, following the mark (the hexagon
  runs navy at the lower-left into cyan at the upper-right).

### Added
- **A vector logo — the first one this package has ever had.** `assets/logo-mark.svg`,
  `logo-mark-mono.svg` (currentColor, for dark grounds), `logo-lockup.svg` (mark + wordmark),
  regenerated by `assets/build-logo.py`. Every prior asset in every repo was raster; the nav
  rendered a 938×332 PNG at 36px tall, thinning the hexagon's hairline to ~1.4px, which is what
  the site review reported as *"the logo is thinner than the original"*. It was never distorted —
  the hexagon measures 0.873 shipping vs 0.869 in the source art.

  The mark is authored geometry (regular pointy-top hexagon + two stroked polylines + two node
  dots) fitted to the original raster by coordinate descent, IoU 0.845. Only the wordmark is
  traced. `logo-icon.png` / `logo-leanwise.png` keep their filenames and are now re-exported
  **from** the SVG, so nothing referencing them by URL breaks.

### Fixed
- Docs that stated the old teal as fact — the contrast table in `README.md` and `tokens.css`,
  the three rules in `CLAUDE.md`, and the "teal" prose in `shadcn.css` / `lw.css` /
  `tailwind-preset.js`. `CLAUDE.md` now also records the v0.2.x consumers' upgrade sequence and
  rag-service's pin/install drift (pinned `v0.2.2`, resolved `0.2.1`).

**Consumers:** no code edit, but this is where a hardcoded brand hex goes visibly stale.
rag-service's `src/routes/admin/w.$slug.tsx` default `#14B8A6` is the old `teal-500` — it has
been wrong since this release and still is.

## [0.6.7] — 2026-07-25

### Added
- **`--lw-cta-text` / `text-cta-on` — orange as TEXT is now reachable.** `--lw-cta-text-c`
  had been authored since the palette landed but never derived to a usable color, and the
  Tailwind preset had no `cta.on` key — unlike success/warning/danger, which each ship a
  theme-aware `-on` token *and* a real utility. The documented rule "a fill color is not a
  text color" was therefore unshippable for the CTA: the only way to render #92400E was
  `text-[hsl(var(--lw-cta-text-c))]`, the arbitrary-token escape `lw-token-lint` rejects.
  The palette literal is now `--lw-cta-700-c` (ramp-consistent with 400/500/600, and
  `--lw-cta-700` is exposed), and `--lw-cta-text-c` becomes the theme-aware alias —
  `cta-700` on light, `cta-400` on dark — exactly mirroring `--lw-brand-text-c`.
- Two contrast-gate pairs covering the new alias by **role token** rather than literal, so
  re-pointing `--lw-cta-text-c` fails the gate in the theme it breaks. 61 → 63 pairs.

### Changed
- `--lw-cta-text-c` still resolves to #92400E on light, so any consumer already reaching for
  it keeps its current value; on dark it now correctly flips to #FB923C instead of staying
  at the light shade. This is a behavior change only for dark-theme usage of that triple.

### Fixed
- **Docs:** `CLAUDE.md` claimed the contrast gate checks "26 pairs" — it has been
  manifest-driven for several releases and now checks 63. Replaced the frozen count with a
  description of how coverage is added, and noted why role-token entries beat literal ones.
- **Docs:** `story-card.tsx` warned that `.lw-story` is *not* in the package and lives in
  `leanwise-ai/src/styles/resources.css`. It ships in `lw.css` today, so the note was sending
  consumers to duplicate CSS that already exists — now warns against the local copy instead.

**Consumers:** a consumer already reaching for `--lw-cta-text-c` in dark mode gets a different
(correct) colour. If you carry a local `.lw-story` copy, delete it — it is shadowing the
package's.

## [0.6.6] — 2026-07-24

### Added
- **Ladle docs site** (`pnpm ladle` to serve, `pnpm ladle:build` for a static build). Stories
  live in `.ladle/**.stories.tsx` and import the real token core + `.lw-*` layer via
  `.ladle/css.ts`, so every primitive — Button/Eyebrow/Card, ThemeToggle, CodeBlock, Console,
  StoryCard, FeatureGrid, LogoRail — renders against the live design system. Dev-only (not
  shipped to consumers); `build/` is gitignored.

**Consumers:** no action — dev-only. (Ladle was removed entirely at v1.1.0; there is no
docs site in the current tree.)

## [0.6.5] — 2026-07-24

### Fixed
- **`useTheme.setTheme` now persists the `lw-theme` cookie too**, not just `localStorage`.
  The site's SSR resolves `<html data-theme>` from the cookie, so writing it on toggle
  means the very next reload is SSR-correct — no reliance on the blocking head script and
  no one-frame fixup of the toggle's active indicator.

**Consumers:** this behaviour was **lost again at v1.1.0** and has not come back. See
§Breaking for a v0.x consumer.

## [0.6.4] — 2026-07-24

### Fixed
- **`useTheme` aborted hydration** — the store read the DOM at module init, so the server
  snapshot was `system` while the client's first snapshot read `<html data-theme>` and
  differed. React then bailed on hydration, which left every JS handler on the page
  unattached (form submit, CTA navigation). Now a fixed SSR default (`light`) is used for
  BOTH the server snapshot and the client's first render, and the real stored value is read
  in a mount effect (the toggle's active indicator corrects by one frame; the page theme is
  already correct via the blocking head script). `readStoredTheme` now reads `localStorage`
  (the user's choice, incl. `system`) rather than the resolved `<html>` attribute.

**Consumers:** an SSR consumer on v0.6.0–v0.6.3 has a dead page, not a cosmetic bug. This is
the floor for any React SSR consumer in the 0.6 line.

## [0.6.3] — 2026-07-24

### Fixed
- **`CodeBlock` raw-code path** — the `<pre class="lw-code">` for the non-highlighted
  `code` prop missed the `tabIndex={0}` added in v0.6.2 (only the `highlightedHtml` path
  had it). Both code paths are now keyboard-scrollable. (The site only uses the highlighted
  path; this keeps the package internally consistent.)

## [0.6.2] — 2026-07-24

More axe-found a11y on the code surface, surfaced once `CodeBlock` carried a `filename`
on a scanned page.

### Fixed
- **`CodeBlock` filename pill failed `color-contrast`** — `.lw-console-h .url` used
  `--lw-fg-subtle` on `--lw-bg-inset` (4.48, just under AA). Now `--lw-fg-muted` (7.40).
- **`CodeBlock` scrollable `<pre>` failed `scrollable-region-focusable`** — the `.lw-code`
  pre now carries `tabIndex={0}` so a keyboard reader can scroll long lines.

## [0.6.1] — 2026-07-24

Accessibility fixes found by the site's axe e2e gate consuming v0.6.0.

### Fixed
- **`ThemeToggle` segment buttons had no accessible name** — with `showLabels={false}` the
  Light/Dark/System segments were icon-only and failed `button-name`. Each segment now carries
  `aria-label="${label} theme"`.
- **`Console` file-tree failed `aria-required-children`/`aria-required-parent`** — the
  `role="listbox"` lived on a wrapper `<div>` around a `<ul>` of `<li role="option">`, so the
  listbox did not directly own its options. The `<ul>` is now itself the `role="listbox"`
  (options are direct children), and `.lw-file-tree` resets the `<ul>` defaults.

**Consumers:** v0.6.1–v0.6.3 are all a11y fixes to v0.6.0 components. If you adopted the React
layer at v0.6.0 and run an axe gate, these are the fixes it is reporting.

## [0.6.0] — 2026-07-24

The first release with a **component layer** and a **derived contrast gate**. Still strictly
additive — no token or class was removed or renamed, and every prior consumer (the marketing
site, VSS, rag-service) resolves unchanged.

### Added — React component library (`src/react/` → `dist/react/`)
A compiled component layer on top of the token core. `react`/`react-dom` are peer deps;
`dist/` is committed because a `github:` install does not run lifecycle scripts. Import via
`@leanwise/design/react`. The token/CSS layer is unchanged, so non-React consumers are
unaffected.

- `Button`, `Eyebrow`, `Card` — the high-frequency primitives, rendering the existing `.lw-*`
  classes; ref-forwarding, native semantics, correct focus.
- `ThemeToggle` + `useTheme` — an accessible segmented light/dark/system switch (roving focus
  + arrow/Home/End). `useTheme` drives the three-layer `[data-theme]` model via
  `useSyncExternalStore`, persists to `localStorage`, and is SSR-safe.
- `CodeBlock` — `.lw-code` surface; takes server-highlighted HTML (`tok-*` spans) or raw code;
  optional filename header and an accessible `tabs` mode (roving-focus `role=tablist`).
- `Console` — `.lw-console.log` shell with a `.lw-file-tree` pane (`role=listbox`) and a
  `.lw-run-controls` playback row, for composable interactive demos.
- `StoryCard`, `FeatureGrid`, `LogoRail` — the marketing composites; the optional testimonial
  quote renders **only** when quote + person + role are all present (the no-fabrication rule,
  enforced at runtime).
- `icons/` — a small inline-SVG set (`currentColor`, `aria-hidden` unless titled).
- Hooks — `useReveal`, `useSpotlight`, `useDeterministicCascade` (playback that starts
  **complete** and never randomises — the static-state-is-complete contract).

### Added — token + CSS foundation
- **Seven-tier z-index** — `--lw-z-base…-modal`.
- **Motion token scale** — `--lw-dur-xs…xl`, five easings, `--lw-stagger`, and named
  ambient-loop durations; legacy `--lw-duration-*` kept as aliases.
- **Elevation taxonomy** — five-step `--lw-shadow-xs…xl` (+ `-focus-ring`, `-brand-glow`).
- **Three-layer theme model** — `:root[data-theme="dark"]` cascade-final, alongside `.dark`,
  `[data-theme="dark"]`, and the `@media (prefers-color-scheme: dark)` fallback; `.light`
  kept as a deprecated alias.
- **Band isolation** — `:where(.lw-band-dark)` / `:where(.lw-band-light)`.
- **Layout primitives** — `.lw-features`/`.lw-feature`, `.lw-story` (+ `.lw-story-quote`),
  `.lw-monogram`, `.lw-logo-cell` move into the package so the components are self-contained
  (per-customer `[data-mark]` optical sizing stays consumer-side).
- **Console primitives** — `.lw-code` (+ `tok-*` token spans), `.lw-theme-toggle`,
  `.lw-file-tree`, `.lw-code-tabs`, `.lw-status-chip`, `.lw-run-controls`.

### Changed
- **CSS self-check lint** — `lw-token-lint` now self-checks `lw.css` (default / `--css`): a raw
  `<n>s` duration or positive `z-index` literal in a `.lw-*` rule fails the build.
- **Derived contrast gate** — `bin/lw-contrast-check.mjs` reads the color graph from
  `tokens.css` via a composition manifest (add a pair, it is checked), alpha-composites the
  `.lw-code` / `-on-dark*` tokens, and enforces dark-block parity. 61 pairs, up from 27.

### Fixed
- **System-dark soft tints** — the `@media (prefers-color-scheme: dark)` block was missing the
  four `-soft` re-points the other dark forms carry, so a status badge hit 1.75:1 (the exact
  v0.1.2 regression) on the pure system-dark path. All four dark forms now agree; the parity
  guard makes drift a build failure.

**Consumers:** additive. Two of the three components introduced here — `.lw-theme-toggle` and
`.lw-code-tabs` — are the two classes v1.1.0 deleted without a deprecation cycle. If you adopt
them now, you will pay for them at the v1.1.x bump.

## [0.5.0] — 2026-07-22

### Added — SOTA interaction layer (`lw.css`)
- **`.lw-spotlight`** — cursor-tracking radial brand highlight on cards; consumer sets
  `--lw-mx`/`--lw-my` from `pointermove`. No JS → card unchanged.
- **`.lw-shine`** — one-shot shine sweep across a button face on hover.
- **`.lw-aurora`** — two slow counter-drifting brand blobs for dark grounds (sibling to
  `.lw-wash`; pick one). Claims both `::before`/`::after`, so never apply to an element
  that already owns a pseudo.
- **`.lw-tilt-scene` / `.lw-tilt`** — subtle perspective lean + glow on hover for framed
  screenshots.
- **`::view-transition` defaults** — short fade timings for routers that opt into the View
  Transitions API; disabled entirely under `prefers-reduced-motion`.

**Consumers:** additive, opt-in by class. All of it survived v1.1.0 intact.

## [0.4.0] — 2026-07-22

### Added — scroll-driven motion + browser frame (`lw.css`)
All progressive enhancement — double-gated behind `@supports (animation-timeline: …)` AND
`prefers-reduced-motion: no-preference`; the static state is always complete.

- **`.lw-scroll-fade`** — fade + 14px rise keyed to the element's own `view()` timeline.
- **`.lw-scroll-progress`** — `scaleX` rail driven by root scroll; consumer sizes/positions
  the bar; static state is full.
- **`.lw-draw`** — SVG line-draw on scroll. Set `--lw-draw-len` (path length in px) on the
  path; unsupporting browsers and reduced motion get the fully drawn path.
- **`.lw-browser-frame`** — browser chrome around a screenshot: `.lw-browser-bar` with
  three `<i>` dots + `.lw-browser-url` address pill, `--lw-brand-glow` shadow.

**Consumers:** additive, opt-in by class.

## [0.3.2] — 2026-07-22

### Added — motion utilities (`lw.css`)
- Card glow, row hover, and flow-line utilities, plus a drifting dark wash.
- **`--lw-brand-glow`** soft brand halo token for hover-glow surfaces.

## [0.3.1] — 2026-07-22

### Changed — dark grounds own their text/control roles
- Band headings + links, the on-dark ghost button, and the bare-em accent now resolve
  against the dark ground they sit on rather than inheriting light-page roles.

**Consumers:** anything already inside a `.lw-band-dark` changes ink. This is a correction —
the inherited light-page roles were unreadable — but it is a visual change on an existing
surface, not an addition.

## [0.3.0] — 2026-07-22

### Added — five additive marketing primitives (`lw.css`)
- **`.lw-hero-dark`** — full-bleed dark hero (navy-deep ground, masked hairline grid,
  radial brand wash, on-dark text roles; brand-400 accent text).
- **`.lw-counter`** — SSR-final count-up stat number; the `animateCounter` JS helper
  animates 0 → `data-target` when invoked, markup ships the final value so no JS still
  renders the correct number.
- **`.lw-bar` / `.lw-meter`** — token-filled data-viz bars via the `--lw-bar-value`
  custom property, with dark-context variants.
- **`.lw-logo-rail`** (+`.marquee`) — logo wall with an optional 40s loop; static wrap
  under reduced motion. Tailwind consumers get a matching `animate-marquee` utility.
- **`.lw-console.log`** — mono stream rows (`.lw-console-line`, with `.ok/.warn/.err`
  tones) inside the existing console frame; `.lw-console-caret` adds a reduced-motion-gated
  blinking caret.

### Added — contrast gate
- New `brand-400` on `navy-deep` pair (9.37) to cover the dark-hero accent text.

**Consumers:** additive. `animateCounter` is the `./counter` subpath export — the one v1.1.0
deleted and v1.1.5 restored as a shim.

## [0.2.3] — 2026-07-22

### Added
- **Brand logo assets** — `assets/logo-icon.png` and `assets/logo-leanwise.png`; the
  package is now the source of truth for the logo (apps copy from here, never re-tint it).
  `package.json` exports `./assets/*` and includes `assets/` in `files`.

### Changed
- `package.json` bumped to 0.2.3; README gains a Logo section and an accurate
  consumers note (VSS via the Tailwind preset, alongside the marketing site and
  rag-service).

### Fixed
- Lands the previously uncommitted v0.2.2 tree: token-lint palette-escape prefixes, the
  container preset via the `--lw-col-page` token, `CLAUDE.md`, and the CI workflow.

**Consumers:** `P20260707-vss` is pinned here. This is the first tag whose `package.json`
version is correct again after the v0.2.2 mismatch below — a `>= 0.2.2` runtime check
finally tells the truth at this tag.

## [0.2.2] — 2026-07-16

> ⚠️ **This tag's `package.json` says `0.2.1`.** The version bump was missed when the tag was
> cut, so an install from `#v0.2.2` reports `0.2.1` while containing v0.2.2 content, and any
> `version >= 0.2.2` check is false. This is the incident CLAUDE.md's tag invariant exists to
> prevent, and it is **not** installer drift — the lie is committed at the tag.
> `P20260706-rag-service` is pinned at `#v0.2.2` and therefore reports `0.2.1`; that is the
> "install drift" its notes describe, and no reinstall will fix it. The tag must not be moved
> (see the release policy) — the fix is to bump the pin to `#v0.2.3` or later.

### Added — editorial motion + display type
- **Entrance motion** — `animate-rise` / `fade-in` / `scale-in` (fade-up keyframe), timed
  by a new `--lw-duration-slow` (500ms) first-paint token.
- **Auth/landing aside backgrounds** — `bg-hero-aside` + `bg-hairline-grid` background-image
  utilities for the split-panel pattern, keyed to `--primary` / `--border` so they theme
  per tenant and disappear correctly in dark mode.
- **`--lw-text-display`** — a weight-500 hero size one notch above h1.

## [0.2.1] — 2026-07-13

### Added
- **`bg-brand-wash` utility** — registered gradient keyed to `--primary`, so the brand-wash
  pattern stops reaching for an arbitrary value.

### Fixed
- **Tightened the arbitrary-value lint rule.** It only matched `[hsl(var(`, so an escape
  hidden deeper inside an arbitrary value slipped through (an auth card carried
  `[background:radial-gradient(...,hsl(var(--accent)/0.25),...)]`, keyed to `--accent` —
  shadcn's hover surface — so the wash rendered as an invisible grey tint). The rule now
  matches any `var(--…)` inside `[ ]`.

**Consumers:** the tightened rule can turn a previously-green consumer red. That is the
point — it is finding real `--accent` footguns — but budget for it, and do not reach for
`// lw-token-lint-allow` without a reviewer.

## [0.2.0] — 2026-07-13

> ⚠️ **BREAKING.** The compatibility layer is gone. A consumer importing
> `@leanwise/design/compat/legacy-rag.css` (an exported subpath) or `compat/legacy-lw.css`
> gets an unresolved module, not a fallback.

### Removed — BREAKING
- **Compatibility layer dropped.** `compat/legacy-rag.css` and `compat/legacy-lw.css` are
  removed. Every consumer now reads canonical `--lw-*` tokens directly. The shims preserved
  exactly the ambiguity the design system exists to kill — two names for one value
  (`--paper` AND `--lw-bg-subtle`), and `--amber` resolving to teal because a palette
  change was never carried through the CSS.

### Added
- **Ready-to-use color aliases** the shims had been synthesising inline, so no app hand-rolls
  `hsl(var(--x-c) / 0.14)` again: `--lw-on-brand` / `-on-cta` / `-on-danger` (ink on a fill,
  theme-independent), `--lw-brand-soft` / `--lw-brand-line`, the `--lw-success-on` /
  `-soft`, `-warning-on` / `-soft`, `-danger-on` / `-soft` pairs, and `--lw-fg-ghost`
  (decorative hairline text).

**Consumers:** rename every legacy variable to its `--lw-*` equivalent before bumping, then
drop the `compat/` import. The aliases added here are the replacements for the ones the shims
synthesised; there is no automatic mapping, because the shims' whole problem was that the
mapping was ambiguous.

## [0.1.4] — 2026-07-13

### Changed
- Package install URL and README now point at `Okeysir198/leanwise-design`. LeanWise code
  does not belong in another company's GitHub org.

### Added
- `compat/legacy-lw.css` — a legacy vocabulary shim for the marketing site, the sibling of
  the rag shim. (Both are deleted one release later, at v0.2.0. The rationale for adding a
  shim and then removing it within a day is not recorded in the history; the removal
  rationale is.)

**Consumers:** ⚠️ **the git dependency URL changed.** A `package.json` pointing at the old
org resolves to a repository that is not this one. Every consumer's dep must become
`github:Okeysir198/leanwise-design#<tag>`.

## [0.1.3] — 2026-07-13

### Fixed
- **Ink on a brand fill must not follow the theme.** The rag shim mapped
  `--cta-ink` / `--accent-ink` to `var(--lw-fg)`, which re-points to near-white in dark.
  The teal and orange fills are the same color in both themes, so their ink must be too —
  otherwise the dark-mode CTA rendered white on `#F97316` at 2.80, failing AA. Pinned to
  `--lw-on-cta` / `--lw-on-brand`, which resolve to the navy palette token and never
  re-point. Caught by looking at the rendered page, not by the build.

## [0.1.2] — 2026-07-13

### Fixed — dark soft tints + per-theme contrast scoping
Two bugs, one of which shipped and was caught by looking at a screenshot.

- **The `-soft` chip tints were never re-pointed for dark**, so a success badge rendered
  `#34D399` text on `#DCFCE7` — contrast 1.75, effectively invisible. Dark tints added.
- **The contrast gate could not have caught that** — it regex-scanned the whole stylesheet,
  so the dark block's redeclarations overwrote the light ones and it compared pairs that
  never co-occur. `:root` and `.dark` are now parsed as separate scopes.
- **The gate then found a third:** the `-700` status shades clear AA on white (5.02) but
  only reach ~3.1 on their own soft tint — and a badge IS text on the tint. Status text is
  now the `-800` shades (`--lw-success-text` / `-warning-text` / `-danger-text`), which
  clear both. This is exactly why fill and text are separate tokens.

**Consumers:** status badge text changes shade (`-700` → `-800`). Visually small, and the
old value was failing AA on its own tint.

## [0.1.1] — 2026-07-13

### Fixed
- **Ship the brand helper as JS + `.d.ts`, not raw TS.** Vite does not transpile TypeScript
  inside `node_modules`, so a package that exports a `.ts` file cannot be imported by any
  consumer. Shipped real JS with hand-written types.

**Consumers:** v0.1.0's `./brand` export is unusable. This is the floor for anyone importing
`brandVars()`. Note the same class of failure returns at v1.1.0, which exports `.jsx` source
and requires the consumer's bundler to transform `node_modules`.

## [0.1.0] — 2026-07-13

### Added — the canonical token core (LDS v4)
Replaces `DESIGN-SYSTEM.md`'s hand-sync model, which failed exactly as its own closing line
predicted: `--s-6` came to mean 24px in one product and `--s6` 32px in another, and a third
(VSS) shipped stock shadcn zinc with no LeanWise brand.

- **Colors authored once as an HSL triple, derived into a usable color** — so the same file
  serves Tailwind (which composes `hsl(var(--x))` and needs bare channels) and vanilla CSS
  (which needs a real color) with no build step and no second copy.
- **Brand fills carry NAVY ink, not white.** White on the brand teal is 2.49 and on the CTA
  orange 2.80 — both fail WCAG AA. Navy lands at 7.52 / 6.68. `bin/lw-contrast-check.mjs`
  enforces this on every token change. *(This rule is reversed at v0.8.0, once the brand fill
  became dark enough that white was the readable ink.)*
- **A fill color is not a text color.** Teal-500 as a link on white is 2.49; links are
  `--lw-brand-700` (5.06). Same split for `success` / `warning` — every semantic ships a
  fill, an ink, and an as-text token.
- **`--primary` is teal; orange is a variant, not a token.** shadcn's `--primary` drives
  the default `Button`; mapping it to orange would make every button a CTA. "One orange per
  view" is linted.
- **`bin/lw-token-lint`** is the load-bearing part: a shared token file does not make
  products consistent when nothing stops a dev writing `bg-emerald-500` beside it. Fails on
  raw hex, Tailwind palette escapes, arbitrary-value token access, and >1 `variant="cta"`
  per view.

