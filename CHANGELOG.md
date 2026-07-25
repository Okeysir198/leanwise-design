# Changelog

All notable changes to **@leanwise/design** are documented here. The format is based on
[Keep a Changelog 1.1.0](https://keepachangelog.com/en/1.1.0/), and this project adheres to
[Semantic Versioning](https://semver.org/spec/v2.0.0.html).

Each release is pinned as a git tag; consumers depend on a tag, not a branch, so a token
change is a reviewable one-line bump on each consumer's schedule. Dates are commit dates
(`git log -1 <tag>`), in the commit's local timezone.

## [Unreleased]

_Nothing yet._

## [0.8.0] — 2026-07-25

**Visual breaking change, and it reverses a documented rule.** Eyeball every consumer before
bumping. `--lw-on-brand` is now WHITE, not navy.

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

## [0.7.0] — 2026-07-25

> **Visual breaking change.** The brand hue moves from teal to cyan. Nothing in the API changes
> and every contrast pair still passes AA, but every surface keyed to `--primary` / `--lw-brand-*`
> changes colour. **Eyeball a consumer before you bump its pin**, and rebuild — a `dist/` built
> against v0.6.x still serves teal.

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

## [0.6.6] — 2026-07-24

### Added
- **Ladle docs site** (`pnpm ladle` to serve, `pnpm ladle:build` for a static build). Stories
  live in `.ladle/**.stories.tsx` and import the real token core + `.lw-*` layer via
  `.ladle/css.ts`, so every primitive — Button/Eyebrow/Card, ThemeToggle, CodeBlock, Console,
  StoryCard, FeatureGrid, LogoRail — renders against the live design system. Dev-only (not
  shipped to consumers); `build/` is gitignored.

## [0.6.5] — 2026-07-24

### Fixed
- **`useTheme.setTheme` now persists the `lw-theme` cookie too**, not just `localStorage`.
  The site's SSR resolves `<html data-theme>` from the cookie, so writing it on toggle
  means the very next reload is SSR-correct — no reliance on the blocking head script and
  no one-frame fixup of the toggle's active indicator.

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

## [0.3.2] — 2026-07-22

### Added — motion utilities (`lw.css`)
- Card glow, row hover, and flow-line utilities, plus a drifting dark wash.
- **`--lw-brand-glow`** soft brand halo token for hover-glow surfaces.

## [0.3.1] — 2026-07-22

### Changed — dark grounds own their text/control roles
- Band headings + links, the on-dark ghost button, and the bare-em accent now resolve
  against the dark ground they sit on rather than inheriting light-page roles.

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

## [0.2.2] — 2026-07-16

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

## [0.2.0] — 2026-07-13

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

## [0.1.4] — 2026-07-13

### Changed
- Package install URL and README now point at `Okeysir198/leanwise-design`. LeanWise code
  does not belong in another company's GitHub org.

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

## [0.1.1] — 2026-07-13

### Fixed
- **Ship the brand helper as JS + `.d.ts`, not raw TS.** Vite does not transpile TypeScript
  inside `node_modules`, so a package that exports a `.ts` file cannot be imported by any
  consumer. Shipped real JS with hand-written types.

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
  enforces this on every token change.
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

[Unreleased]: https://github.com/Okeysir198/leanwise-design/compare/v0.6.6...HEAD
[0.6.6]: https://github.com/Okeysir198/leanwise-design/releases/tag/v0.6.6
[0.6.5]: https://github.com/Okeysir198/leanwise-design/releases/tag/v0.6.5
[0.6.4]: https://github.com/Okeysir198/leanwise-design/releases/tag/v0.6.4
[0.6.3]: https://github.com/Okeysir198/leanwise-design/releases/tag/v0.6.3
[0.6.2]: https://github.com/Okeysir198/leanwise-design/releases/tag/v0.6.2
[0.6.1]: https://github.com/Okeysir198/leanwise-design/releases/tag/v0.6.1
[0.6.0]: https://github.com/Okeysir198/leanwise-design/releases/tag/v0.6.0
[0.5.0]: https://github.com/Okeysir198/leanwise-design/releases/tag/v0.5.0
[0.4.0]: https://github.com/Okeysir198/leanwise-design/releases/tag/v0.4.0
[0.3.2]: https://github.com/Okeysir198/leanwise-design/releases/tag/v0.3.2
[0.3.1]: https://github.com/Okeysir198/leanwise-design/releases/tag/v0.3.1
[0.3.0]: https://github.com/Okeysir198/leanwise-design/releases/tag/v0.3.0
[0.2.3]: https://github.com/Okeysir198/leanwise-design/releases/tag/v0.2.3
[0.2.2]: https://github.com/Okeysir198/leanwise-design/releases/tag/v0.2.2
[0.2.1]: https://github.com/Okeysir198/leanwise-design/releases/tag/v0.2.1
[0.2.0]: https://github.com/Okeysir198/leanwise-design/releases/tag/v0.2.0
[0.1.4]: https://github.com/Okeysir198/leanwise-design/releases/tag/v0.1.4
[0.1.3]: https://github.com/Okeysir198/leanwise-design/releases/tag/v0.1.3
[0.1.2]: https://github.com/Okeysir198/leanwise-design/releases/tag/v0.1.2
[0.1.1]: https://github.com/Okeysir198/leanwise-design/releases/tag/v0.1.1
[0.1.0]: https://github.com/Okeysir198/leanwise-design/releases/tag/v0.1.0
