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

## [1.3.4] — 2026-08-04

Responsive. Everything below was found by measuring `documentElement.scrollWidth` against
the viewport at thirteen widths — not by looking at screenshots, which is the point: **a
too-wide element does not clip, wrap, throw, or fail an axe rule.** The document simply
grows a horizontal scrollbar. Neither this package's visual gate (one fixed viewport) nor
its a11y gate (which does not measure document width) can see any of it, and neither could
the flagship consumer's suite, whose two projects happened to sit at 1280 and 412.

### Fixed

- **`.lw-topbar` collapses at `--lw-bp-lg`, not `--lw-bp-md`.** The md figure was measured
  against a bar carrying a nav and nothing else, and no consumer ships that bar: the real
  one carries brand + nav + a control cluster + a CTA on one 56px row that does not wrap
  and whose children do not shrink, so its width is the SUM of its parts — 933px on the
  flagship marketing site. Between 769px and 932px the bar overflowed the viewport and,
  because `.lw-topbar` is not a scroll container, dragged the whole document with it: every
  page scrolled sideways on an iPad in portrait. Measured at 820px, not inferred.

  All four queries moved together (`nav`, `nav-center nav`, `.lw-topbar-toggle`, the panel's
  `nav`) and now read `1023.98px` / `1024px` rather than `1023` / `1024`, which left a
  sub-pixel hole on a fractional-DPR viewport where neither matched and the bar had no
  navigation at all.

- **`Console` no longer forces its own minimum width.** Its inline
  `grid-template-columns` used bare `max-content` for the gutter and every cell — a hard
  minimum that hugs when there is room and refuses to give any back when there is not. On a
  320px phone the columns summed to 296px inside a 280px frame and `overflow: hidden` cut
  the last field off every line. Every track now carries a zero floor. Only the component
  could fix this: an inline style outranks every stylesheet, so no consumer override and no
  media query could reach it.

- **`.lw-grid` and `.lw-card-grid` cap their track minimum at `100%`.** `minmax(320px, 1fr)`
  is a DEFINITE minimum, so `.lw-grid-2` overflowed every container narrower than 320px
  instead of narrowing its last column.

- **`.lw-story` gives its text column a zero floor and stacks below `--lw-bp-sm`**;
  `.lw-console-log`'s tracks likewise. `1fr` is `minmax(auto, 1fr)`, and an `auto` minimum
  is the item's min-content — one long token then grows the column past its grid track.

- **`.lw-hero-dark > .lw-container > *` is capped at `max-inline-size: 100%`.**
  `align-items: flex-start` is right for the hero's own parts, but it makes every child
  shrink-to-fit, and a shrink-to-fit box sizes against its content rather than its parent.

- **Coarse-pointer targets reach 44px**: `.lw-topbar .brand`, `.lw-topbar nav a`,
  `.lw-segmented button` and `.lw-pill-link` via the `.lw-hit` ::after (vertical growth into
  space that is already empty); `.lw-footer-link` via real padding, because stacked 33px
  rows with 44px hit boxes would overlap and each link would steal from its neighbour.
  `.lw-topbar nav a` also takes a real `min-inline-size: 44px` — a locale switch is two 39px
  links side by side, and grown targets there overlap horizontally for the same reason.
  **Hit-tested with `elementFromPoint`, not measured with `getBoundingClientRect`** — the
  whole point of `.lw-hit` is that the bounding box lies, and the overlap is invisible to it.

### Added

- **`ThemeToggle` gains `compact`** — one button showing the current mode and advancing on
  press, instead of one segment per mode. For a bar too narrow to spend 144px on a setting:
  the segmented form was the single item that pushed a 375px phone bar to 469px. The trade
  is real and opt-in — a cycle hides its destination and costs up to N−1 presses — so a wide
  bar should keep the segmented control. `formatCompactLabel` names the accessible label,
  which must carry both the current mode and the next one: neither alone is usable without
  sight. Renders a plain `<button>`, not a one-radio radiogroup.

- **`.lw-topbar-collapse` / `.lw-topbar-narrow`** — the bar's width contract for anything
  that is not the nav. The first is present only above `--lw-bp-lg`, the second only below,
  so a consumer renders both affordances and the breakpoint picks one. The package supplies
  the mechanism; only the app can rank its own actions (a marketing CTA survives every
  width, a theme picker does not have to).

- **`THEME_EVENT`**, fired by `paint()` with the chosen mode. The theme has one source of
  truth and any number of views onto it, and the collapse contract means a bar and a panel
  now each render a `ThemeToggle`. `ThemeToggle` listens, so the copy that is off-screen
  cannot drift and come back highlighting a mode that is not the page's.

- **`TopBar` wraps the brand name in `.brand-name`**, so a bar below 360px can drop the
  wordmark and keep the mark. A bare text node cannot be targeted; the link's accessible
  name is unchanged, so nothing is lost to assistive tech.

### Consumers

`leanwise-ai` moves to `#v1.3.4` and passes 443 e2e tests, including a new
`responsive.spec.ts` that asserts no document scrolls sideways at 320/375/820/1280/1920 in
both locales.

## [1.3.3] — 2026-08-04

### Fixed

- **`CompareTable`'s scroll container is now keyboard-reachable** (`tabIndex={0}` plus a
  named `role="region"`). A box that scrolls must be focusable, or a keyboard-only reader
  cannot reach the columns past the fold — and on a phone this matrix always scrolls, so
  those columns were simply unreachable. axe reports it as `scrollable-region-focusable`
  (serious).

  Worth noting how it was found: the violation only exists at a viewport narrow enough for
  the overflow to be real, so every desktop scan — including this package's own, which
  shoots a fixed wide viewport — reported clean. It surfaced in the flagship consumer's
  mobile project. **A11y gates that only run at one width test one width.**



### Fixed

- **`.lw-compare-scroll` now establishes a containing block (`position: relative`), which
  stops the comparison matrix scrolling the whole PAGE sideways on a phone.**

  `overflow` does not clip an absolutely-positioned descendant whose containing block lies
  outside the scroller. Every truthy/falsy cell in the matrix carries a `.lw-sr-only` span
  so state is never colour alone (README rule 6), and `.lw-sr-only` is
  `position: absolute !important`. With the scroller `position: static` those spans
  resolved against an ancestor further up, escaped the clip, and extended the document's
  scrollable width — **measured at 478px against a 375px viewport** on a five-column
  matrix, on the flagship consumer's `/pricing`.

  The failure shape is worth remembering: the *accessibility affordance* was breaking the
  mobile layout, and because the escaping boxes are 1px each, nothing looked wrong — the
  page simply scrolled. Neither a width cap, nor `overflow: hidden`, nor removing the
  sticky headers changed it; only a containing block did. No gate caught it, because
  `check:visual` shoots a fixed viewport and axe does not measure document width.

  Sticky row and column headers were verified to still pin with the fix in place.



> **Four gaps, all found by the flagship consumer rebuilding against 1.3.0, and all of them
> invisible from inside this repository.** Every one is the same shape: the package's own
> documentation described a thing it did not actually ship, and no gate could tell the
> difference — because every specimen that would have exposed it was loading the very file the
> documentation tells a consumer to drop.
>
> `marketing.card.html` and `site-chrome.card.html` no longer load `product.css`. That single
> line is what turned two cards into a presence gate, and it immediately found a **fifth**
> stranded component nobody had reported: `.lw-icon`, the entire layout contract for the icon
> set, sitting in the app layer while half the marketing components draw through it.
>
> Two machine-readable advisories ship with this release (`stranded-marketing-css`,
> `hardcoded-display-text`, both `affects: <1.3.1`), so `npx lw-doctor` tells a pinned consumer
> directly. Both derivations were **watched failing** before they were trusted.

### Fixed

- **`Tabs`, `Pagination`, `EmptyState`, `Avatar` and `Icon` promoted from `product.css` to
  `base.css`** — 26 rules, verbatim, with a tombstone at each vacated site.

  `ArticleCard` renders a `Byline`, `Byline` renders an `Avatar`, and both are **marketing**
  components. So a site composing this package's own documented article-index recipe — `Tabs`
  for the category filter, `Pagination` under the index, `EmptyState` for no results, `Byline`
  on each card — rendered a 0×0 avatar, an unstyled tab strip, unstyled page buttons and a
  centred paragraph in place of the empty state, unless it also loaded the whole 118 KB
  app-surface layer. The flagship consumer had been doing exactly that: a `?url` import of
  `product.css` on two public routes, ~24 KB gzip of rules for components those pages do not
  render.

  This is the third correction of the same defect (`fb2d3ad`, then v1.3.0's `.lw-btn`), and
  the lesson is unchanged: **a component's CSS must live in a layer its own consumers load.**
  The `:is(.dark, …)` / `.lw-band-dark` patches came in the SAME commit this time — three for
  `.lw-empty`, six for `.lw-code .lw-tabs` — rather than being left for a follow-up, which is
  the one thing `fb2d3ad` got wrong and v1.3.0 had to repair.

  One ordering hazard, audited the way `fb2d3ad` audited its own: `.lw-pag-size { width: auto }`
  beats `.lw-select { width: 100% }` on **source order alone**, not specificity. It won across
  the file boundary and it still wins inside `base.css` only because the forms block is ~700
  lines above it. Every other promoted selector was checked against `marketing.css` and the
  remaining `product.css` for an equal-specificity rule that used to come after it; there are
  none. 148 of 156 visual shots are byte-identical under the move, which is the proof that
  "verbatim" is accurate.

- **`.lw-icon` — the fifth, and nobody found it by reading.** `check:visual` did, the moment
  the two marketing cards stopped loading `product.css`. `Icon` is a **primitive**;
  `SiteFooter`, `AnnounceBar`, `FeatureGrid`, `PlanCard`, `CompareTable`, `Steps`,
  `EmptyState`, `Disclosure`, `NavToggle` and `Button` all name a glyph through it. Without
  its one rule an `<svg>` takes the UA's `display: inline`, sits on the text baseline and grows
  its own line box — a footer link carrying an `external` marker measured **39px instead of
  27px**. Promoted to `base.css`.

- **`<Hero>` did not establish a dark band for its own subtree — a contrast trap that every
  consumer had to correct by hand.** `.lw-hero-dark` paints navy but was **not** in
  `tokens.css`'s band-selector list, so every role token inside a hero resolved against the
  **light** palette on navy paper. `marketing.css` papered over exactly the four elements
  anyone demos — `.lw-h1`, `.lw-lead`, `.lw-eyebrow`, `.lw-btn-ghost` — from the
  `--lw-on-dark-*` tiers; anything else a consumer put in a hero was on its own. A `Byline` in
  a hero measured **1.5:1** on its name (`--lw-fg`) and **3.36:1** on its role and date
  (`--lw-fg-subtle`). `.lw-section.dark` escaped only by accident: its class list literally
  contains `dark`, which the band list already names.

  Fixed in **`tokens.css`, not in `Hero.jsx`**, for two reasons. The band is a token SCOPE, so
  tokens.css is the only place the gates can see it; and a vanilla consumer writing
  `<section class="lw-hero-dark">` by hand is a supported consumer, so a fix that only reached
  the React wrapper would let the two drift — which is what the "no styling in a `.jsx`" rule
  exists to prevent. `.lw-page-light .lw-hero-dark` joins the **light** band list in the same
  change, and that pairing is load-bearing: inside `.lw-page-light` the hero goes transparent
  and the light page owns the ground, so an unconditional dark band there would paint
  near-white ink on white — the same trap, mirrored. Both blocks are `:where()` at specificity
  0, so the light one wins on source order for the elements both match. **Do not reorder them.**

- **`ButtonProps` had no `type`, so a Cancel button submitted the form.**
  `React.HTMLAttributes<HTMLElement>` — the base every polymorphic component here extends —
  omits `type`; it lives on `ButtonHTMLAttributes`. A `<button>` inside a `<form>` defaults to
  `type="submit"`, so a Cancel or Delete `<Button>` submitted the form, and the prop that would
  have fixed it did not compile. The flagship consumer's admin console fell back to a raw
  `<button className="lw-btn">`, which defeats the component.

  `type` is now declared and forwarded **only when a `<button>` is what renders** — destructured
  out of `...rest`, so it can no longer ride onto an `<a>` or a router `Link`. The **default is
  deliberately unchanged** (undefined, i.e. HTML's `submit`): flipping it would silently stop
  `<form onSubmit>` + `<Button>Save</Button>` from submitting, and a silent no-op is a worse
  patch-release failure than the one being fixed. Recorded as a v2.0.0 candidate in `REVIEW.md`.

  The same audit covered every component on that base. `Card`, `SourceChip` and `NavItem`
  already emit `type="button"` at runtime and already honour an override through `...rest` — but
  none of the three DECLARED the prop, so the override was a type error. All three declare it
  now; no runtime behaviour changed. `Chip` is not affected: it is always a `<span>`.

- **Every user-visible English string is now a prop.** `ArticleCard.readMinutes` rendered the
  literal `"N min read"`, which is wrong on every page of a bilingual site — and this package
  is consumed by a site that serves English and Vietnamese from one component tree. Auditing
  the rest of the tree found **~70 more**, across 25 components, none of them reachable by a
  prop: `Dialog`/`Drawer`/`Toast` (`Close`, `Dismiss`, `Notifications`, the four tone words),
  `ThemeToggle` (Light/Dark/Auto and its radiogroup name), `RichText` (ten toolbar accessible
  names the `tools` prop could only filter, never rename, plus the link `window.prompt`),
  `DiffReview` (nine words in the accept/reject flow), `Pagination` (the result count and every
  button name), `ActivityFeed` (Today/Yesterday/This week/Earlier and the whole relative-time
  string), `DataGrid`, `FilterBar`, `FileUpload`, `Combobox`, `Calendar`, `Field`, `Stepper`,
  `ToolCall`, `Artifact`, `Feedback`, `SourceChip`, `StatMeter`, `CodeBlock`, `AppBar`,
  `TopBar`, `Breadcrumbs`, `Sidebar`, `BottomNav`, `CommandPalette` and the charts'
  screen-reader table header.

  Every one is now a prop **whose default is the string it replaced**, so the upgrade is purely
  additive. Words are `*Label` props; anything that interpolates a number is a `format*`
  function, because a translation reorders the parts and a template with the number in a fixed
  position is the same bug one layer down. Closed sets (`stateLabels`, `bucketLabels`,
  `toneLabels`, `kindLabels`, `modeLabels`) are keyed maps; `RichText`'s `toolLabels` merges by
  tool ID so a partial map leaves the rest in English rather than blanking a button's name.

### Changed

- **`ArticleCard.readTime` replaces `readMinutes`** — a pre-formatted `React.ReactNode`, not a
  number, so the consumer supplies the localised string. `readMinutes` still works, warns once
  per component (`_deprecate.js`, silent in production), and is removed in **v2.0.0**. It is
  the only deprecation in this release.
- **`marketing.card.html` and `site-chrome.card.html` load `base.css` + `marketing.css` and
  nothing else.** They loaded `product.css` through v1.3.0, which is precisely why neither
  browser gate could see any of the above: the specimen was loading the file the documented
  recipe tells a consumer to drop. Do not add it back.
- **`marketing.card.html` gained the specimens the fixes needed** — a `Byline` inside the dark
  hero (role tokens on navy, the band proof), and a `Tabs` + `EmptyState` + `Pagination` block
  rendered on a base+marketing page. Its declared viewport grows 1600 → 1900.

### Gates

- **`check:contrast` gained a BAND SCOPE rule**, because the hero trap was invisible to
  everything this repository already had. The pair gate measures TOKENS, and both tokens in the
  pair were correct — it was the *scope* that was wrong, which no pair can express. And
  `check:a11y` could not see it either, **structurally**: `.lw-hero-dark` carries two decorative
  pseudo-elements, so axe answers *"background color could not be determined due to a pseudo
  element"* and files the finding as `incomplete`. `lw-a11y.mjs` reads `violations` only —
  correctly, since incompletes are mostly noise — so a hero could hold 1.5:1 text and the gate
  printed "no violations". Measured on the marketing card: **four serious incompletes, zero
  violations.**

  The new rule states the invariant instead: *a selector used as an ancestor scope to re-ink
  descendants from the `--lw-on-dark*` family is declaring itself a dark ground, and must appear
  in `tokens.css`'s dark band list.* Hand-patching a child's ink because the ground is dark IS
  the band's job, done manually and incompletely. 43 descendant rules scanned; two exemptions
  (`.lw-code`, `.lw-code-head`), named in `BAND_SCOPE_EXEMPT` with the reason, greppable and
  countable, the same discipline as `data-a11y-expect` and `NO_SKIP_LINK`. **Watched failing**
  on the restored defect: it names `.lw-hero-dark` and its five descendant rules, and exits 1.
- **`advisories.json` gained `stranded-marketing-css` (high) and `hardcoded-display-text`
  (medium)**, both `affects: <1.3.1`, both with a `derive` registered in `lw-doctor` and both
  watched failing on a planted defect. Neither is in `COUNTS_THE_FIX`: both count the DEFECT, so
  both derive **0** in a fixed tree, which is the stronger shape. The display-text count is an
  explicit PROXY — literal-string `aria-label`/`title`/`placeholder`/`alt` attributes, 21 at
  v1.3.0 — and `countMeans` says so, because a proxy presented as a total is exactly the
  hand-maintained fact this file was written to replace.

### Visual

**8 of 156 shots move, and none of them is a regression.** Scored twice: once against v1.3.0
as tagged, and once in isolation — the same cards and the same `_ds_bundle.js` on v1.3.0's CSS
— so the content growth cannot hide a CSS change. The isolation run is the one that matters:

| shots | delta | why |
|---|---|---|
| `marketing.card` × light, light-compact | 0.0246% (1466 px) | the `Byline` in the hero, one text line, at exactly `y 685–696` — role tokens resolving dark inside `.lw-hero-dark`. **The fix.** |
| `marketing.card` × dark, dark-compact | 0.0010% — under tolerance | on the dark ground `<html class="dark">` had already re-pointed the roles, so the band fix changes almost nothing. Exactly what the diagnosis predicts, and the best confirmation of it. |
| `site-chrome.card` × 4 | 0.0311% (733 px) each | the dark footer's inherited ink. `product.css`'s `.lw-band-dark, [data-band="dark"] { color: var(--lw-on-dark-2) }` is no longer loaded, so `tokens.css`'s band `color: var(--lw-fg)` applies: **9.42:1 → 15.78:1**, a brightening, and the rendering a real base+marketing consumer already gets. |
| the other 148 | 0 | **verbatim relocation, proved.** |

Against v1.3.0 as tagged, `marketing.card` × 4 additionally reports a **dimension** change
(1280×3852 → 1280×4649 and siblings) from the added specimens and prose; that is why the
isolation run exists, since a dimension change makes a pixel diff impossible.

> **One observation worth recording rather than tuning away.** A single scaffold recording of
> `site-chrome.card__light` showed an extra 726-px band on `.brand-mark` — the per-theme
> background image losing its decode race, the flake v1.3.0's `decoded()` was written to close.
> It did not reproduce: re-recording gave 733 px, matching the other three shots exactly, and
> three self-consistency runs of the working tree agree to 0.0001%. So `decoded()` is not
> airtight, at roughly one bad shot per 312 recordings on this box. Noted in `REVIEW.md`.

## [1.3.0] — 2026-08-04

> **Read this before anything else in this entry.** **Every React specimen card in this
> package rendered blank from v1.2.0 through v1.2.1**, and both browser gates reported green
> for the whole of it. `check:a11y` scored the explanatory prose around 26 empty React roots;
> `check:visual` compared two equally blank plates. So **the a11y and visual results this
> package published for its React components across two minor releases measured nothing** —
> not "measured less", *nothing*. The moment the bundle was repaired, axe found four real
> serious `color-contrast` failures at **2.28:1** on a control that had been shipping that way
> the whole time (see *Fixed*, first two entries).
>
> The guard that should have caught it was `document.body.innerText.trim().length > 0`. It
> could not fail: every card wraps its roots in several paragraphs of prose. That is this
> repository's own recurring shape — *the case everyone demos is the one that cannot fail* —
> and it is the fourth time a gate here has been found to be a hypothesis rather than a gate.
> The guard has been rebuilt to fail on an uncaught page error and on any empty React root,
> and it was **watched failing** on the replanted defect before it was trusted.
>
> A machine-readable advisory ships with this release (`advisories.json`,
> id `blank-specimen-cards`, severity **high**, affects `<1.3.0`), so `npx lw-doctor` tells a
> pinned consumer directly.

### Added

- **`.lw-prose` + `Prose`** (`base.css`, `components/primitives/`). The read surface for
  sanitized markdown HTML — the one block in the package that styles descendants of markup it
  did not author. Owl spacing (`> * + *`) over a UA-margin reset, so the gap is a token rather
  than an em of whichever block was larger; `scroll-margin-block-start` on every heading,
  which is load-bearing because `.lw-topbar` is sticky and a `#fragment` link otherwise lands
  the heading under the bar. `h2`/`h3` are **grouped onto the existing scale rules**
  (`.lw-h2, .lw-prose h2`) rather than restated, and `h4` takes body size + semibold with no
  new `--lw-text-h4` token — one rule does not justify a scale step.
  - **It carries no dark-ground rules at all**, and that is the point: every value is a role,
    so `.lw-band-dark` re-points the whole article. The new card renders the same markup on
    both grounds from one component to prove it.
  - **The code rule is guarded, and the guard is the rule.** Block code is the always-dark
    `.lw-code` surface the consumer emits, so `.lw-prose pre` gets `margin-block` and nothing
    else; the chip is `.lw-prose :not(pre) > code`. Promoting a bare `code` rule here is what
    put a light chip behind that dark surface and failed `check:a11y` earlier in this cycle.
    The specimen's `tok-keyword`/`tok-string` spans exist to keep that gated: axe scores a
    semi-transparent foreground as *incomplete*, so a `tok-comment` span alone cannot fail the
    run — measured, with the guard removed.
- **`.lw-disclosure` + `Disclosure`** (`base.css`, `components/primitives/`). A native
  `<details>`/`<summary>` row: the FAQ pattern **complete with zero JavaScript**, so it works
  before hydration, with a failed bundle, and with JS off. No height animation and no new
  keyframe — `<details>` cannot animate its own height portably and the motion policy is a
  100–200ms state change either way, so only the chevron moves. The chevron is
  `<Icon name="chevron-down">`, never a CSS triangle. `summary` joins the consolidated
  pointer-affordance list at the foot of `base.css`: it is the one control the UA gives a text
  cursor, being neither a button nor a link.
- **`.lw-topbar-toggle` / `.lw-topbar-panel` + `NavToggle`** (`base.css`,
  `components/nav/`). The narrow-bar navigation. Below `--lw-bp-md` the bar's own `nav` is
  hidden "because the app supplies its own" — every consumer then supplied one, and the
  marketing site's was broken. This is that one, shipped once, and it removes the last reason a
  marketing site would import `product.css`.
  - **Deliberately not `Drawer`.** A drawer is a modal `<dialog>` in the top layer that makes
    the page inert, so it owns a focus trap, a scrim and a return-focus contract; a nav
    disclosure hangs under the bar and needs none of them. Two interactions, so README rule 9
    is not in play.
  - `position: absolute` under the sticky bar, which is already its containing block. The bar
    carries `backdrop-filter`, so it is *also* a containing block for `position: fixed`
    descendants — the consumer's hand-rolled overlay shipped broken on exactly that, resolving
    `inset: 0` against the 56px bar. Absolute under sticky has no such failure; anything
    reworked to `fixed` has to become a sibling of the `<header>`.
  - **`.lw-topbar-panel[hidden] { display: none }` is mandatory and fails silently without
    it** — the panel's own `display: flex` outranks the UA `[hidden]` default. The toggle's
    display rule is scoped under `.lw-topbar` for the same class of reason: it composes
    `.lw-icon-btn`, whose `display: inline-flex` is in `product.css` and loads afterwards at
    equal specificity.
  - One new keyframe, `lwNavPanelIn`, verified unused before it was added — a keyframe name is
    global and last-wins, and no gate can see a collision.
- **`menu` glyph** in `Icon.jsx` (79 glyphs). Three rules on the same 24-grid as `list`; its
  partner is the existing `close`.
- **Two `@dsCard` specimens**: `components/primitives/prose.card.html` (Prose + Disclosure on
  both grounds) and `components/nav/TopBarMobile.card.html` (the toggle and panel, open and
  closed, on both grounds — the frame forces the media-query state because both browser gates
  render at a fixed 1280px viewport).
- **`.lw-plan*` + `PlanCard`** (`marketing.css`, `components/marketing/`). The word "pricing"
  appeared nowhere in this package, so every consumer wrote its own; the one that prompted this
  had `.lw-price.featured` restating **five child colours** to make a plan dark. `.lw-plan`
  composes `.lw-card` and adds four declarations — column, gap, full height, positioning
  context. Border, radius, padding and the hover/focus faces are not restated.
  - **`price` is optional, and a card without one is COMPLETE, not pending.** Nothing reserves
    the slot: no `min-block-size`, no placeholder, no `content: "—"`. This is the reason the
    component exists rather than living in the consumer — the primary consumer publishes no
    price, no currency and no range, and a component that reserved the slot would force it to
    invent one. An invented price is a fabrication, which is the failure mode that codebase
    keeps relapsing into. The new card renders three no-price plans beside one priced plan to
    prove the layout is finished either way.
  - **`.lw-plan-featured` adds a brand border and `--lw-brand-glow` and nothing else.** A dark
    featured plan is `data-band="dark"` on the card, with zero child overrides — the band
    re-points every role token. That is the deleted override pile.
  - An excluded feature carries a **different glyph** (`minus`, not a greyed `check`), a muted
    ink and an `.lw-sr-only` word that *leads* the row, so the state survives greyscale, colour
    blindness and a screen reader. The glyphs are `<Icon name>`; a typed `✓` would be the same
    drawing a second time in the font and would be announced as punctuation.
- **`.lw-compare*` + `CompareTable`** (`marketing.css`, `components/marketing/`). A feature
  matrix, **distinct from `.lw-table` by meaning, not by looks**: `Table` is a data table (rows
  are records, cells are values, it sorts and paginates); this never sorts and has one repeated
  cell type. Sticky on both axes, with the three z-indexes as **tokens** — `--lw-z-local-2` for
  the column header, `--lw-z-local-1` for the row header, `--lw-z-local-3` for the corner, in
  that order because the corner overlaps both axes. Every sticky cell carries `--lw-bg`, or the
  content it is meant to pin over scrolls straight under it. `border-collapse: separate` is
  load-bearing, not a style: a sticky cell in a collapsed table loses its borders to the
  collapse model.
  - **The featured column is `--lw-bg-subtle`, deliberately NOT `--lw-brand-soft`.** `--lw-fg`
    on `--lw-brand-soft` is a pair nothing in this system composes today, so a brand tint would
    have entered the derived contrast manifest as a brand-new measurement in *three* scopes
    (light, `.dark`, media-dark) for a decorative ground. `--lw-fg` on `--lw-bg-subtle` is
    already asserted. The brand signal is carried by `--lw-brand-line` edges instead, which is
    a non-text 1.4.11 boundary rather than a text ground.
  - Cells are `--lw-success-on` (the theme-aware **text** variant), never `--lw-success`, which
    is a fill and fails AA as text.
- **`.lw-flow*` + `Flow`** (`marketing.css`, `components/marketing/`) — the largest item here.
  A horizontal or vertical chain of labelled nodes joined by edges: a processing pipeline, an
  onboarding sequence, a roadmap. The consumer being rebuilt against it hand-rolls **eight**
  one-off diagram components behind eight private CSS namespaces; this is the one owned, gated,
  contrast-tested pattern that replaces all eight.
  - **The motion contract, which is why those eight kept regressing.** The SSR / no-JS /
    `prefers-reduced-motion` state is the **COMPLETE** diagram — every node and every edge fully
    drawn, every label at full ink. The component emits no motion and no "not yet revealed"
    class; the draw-in lives entirely in the CSS, double-gated behind
    `@supports (animation-timeline: view())` **and**
    `@media (prefers-reduced-motion: no-preference)`, and scroll only *replays* it. Verified
    three ways: under `reducedMotion: "reduce"` (`animation-name` computes to `none`, every
    opacity `1`, every transform `none`), with **JavaScript disabled entirely** against plain
    markup carrying the same classes, and below `--lw-bp-md`.
  - **An inactive node is never dimmed with `opacity`.** Axe scores reduced-opacity text as a
    contrast failure and the consumer shipped that bug once. The active node is marked
    POSITIVELY — brand border, `--lw-brand-glow`, a weight step on the title (600 vs 500,
    measured) and a brand lift on the index — and every other node stays at full ink. The state
    is real `aria-current="step"`, not a class that only changes colour.
  - **One new keyframe, `lwFlowPulse`, verified unused before it was named** — a keyframe name
    is global and last-wins, and no gate can see a collision.
  - **No `--lw-dur-*` and no `--lw-stagger`, and that is not an oversight.**
    `animation-duration`, `animation-delay` and `animation-iteration-count` are *ignored* while
    `animation-timeline` names a progress-based timeline — the progress of the view range is
    the clock. A time token written there would document an intent the browser discards, which
    is worse than none, because the next reader would trust it. The per-sibling offset is
    therefore a **range** offset, a local knob with a fallback like every other knob in the
    file, and the index comes from `:nth-child` rather than a style attribute so a
    vanilla-HTML consumer gets the identical cascade (capped at 8, the ceiling
    `useDeterministicCascade` already uses). A time-based pulse on the current node was drafted
    and cut: it would have been a second `animation` on the same element as the draw-in, and
    the shorthand resets `animation-timeline`, so the current node would have silently lost its
    scroll binding.
  - **`grid-auto-columns` repeats its track list**, so `minmax(0, 1fr) auto` sizes every node
    at 1fr and every connector at its own width with no per-child class. The stacked geometry
    is five local knobs, so it is written **once** and merely *set* twice — on
    `.lw-flow-vertical` and inside the `--lw-bp-md` query. Restating the edge block inside the
    media query is how one drawing quietly becomes two.
  - **Server-safe: no state, no effects, no `"use client"`.** A node that expands to reveal
    detail is the consumer composing `Disclosure` into `detail` — a native `<details>`, itself
    complete with zero JavaScript — rather than `Flow` growing state.
  - Not the `.lw-draw` / `.lw-flow-line` machinery: those are SVG stroke geometry and need a
    path with a known length, and a DOM chain of arbitrary-height cards has none.
- **Two more `@dsCard` specimens**: `components/marketing/pricing.card.html` (plans **including
  the no-price variant**, a `data-band="dark"` plan, `.lw-plans-head`, and the matrix) and
  `components/marketing/flow.card.html` (horizontal, vertical, a current node, a composed
  `Disclosure`, a suppressed edge, and the reduced-motion note).
- **Five pairs added to the contrast `MANIFEST`** — `success-on`/`bg-subtle`,
  `fg-subtle`/`bg-subtle`, `fg-muted`/`bg-subtle`, `fg`/`bg-subtle` and `brand-text`/`bg`. All
  five are the manifest's known blind spot in the shape the diff grounds and the footer heading
  already document: `.lw-compare :is(th,td)[data-featured]` declares the **ground** and nothing
  else, while the ink arrives from four other rules, so the composed-pair walk — which needs
  both in one rule — sees none of them. 148 pairs → 153, all passing.

#### Deliberately NOT added, in the pricing set

Recorded because this is the pair most likely to be re-litigated, and because
`.lw-theme-toggle` and `.lw-code-tabs` were both deleted for being exactly this kind of
duplicate:

- **No `.lw-plans` grid class and no `PlanGrid`.** A row of plans is `<Grid min={280}>`, which
  already auto-fits and stretches; `.lw-plan` sets `block-size: 100%` so unequal feature counts
  still share one CTA baseline. `PlanGrid` would be `Grid` with one number baked in, and the
  first row wanting a different minimum would fork it.
- **No billing-toggle class and no `BillingToggle`.** A billing period is a two-way *exclusive*
  choice, which is `Segmented` — a real `radiogroup` with arrow-key navigation and a set size,
  none of which a bespoke toggle would re-earn. What ships instead is the **composition**:
  `.lw-plans-head` holding an eyebrow, a `<Segmented>` and an optional savings `.lw-pill`. The
  period stays the consumer's state, which is the point — a `BillingToggle` would have owned it
  and become a second treatment of one interaction.

### Changed

- **The dark-ground patches for the promoted form controls moved to `base.css`** — the gap
  `fb2d3ad` left open. That commit promoted the form/control face out of `product.css` and
  kept the `:is(.dark, [data-band="dark"], .lw-band-dark)` patches behind, correctly observing
  that they outrank the promoted rules on specificity and so their *position* is not
  load-bearing. What that missed is the case the promotion exists for: a page loading
  base + marketing never sees `product.css` at all, so it had the controls with none of their
  dark-band treatment — on a site that puts its contact form on a dark ground. **Position is
  not load-bearing; presence is.** Moved for `.lw-input`, `.lw-textarea`, `.lw-select`,
  `.lw-input-group`, `.lw-switch`, `.lw-check` and `.lw-segmented`, plus the
  `prefers-reduced-motion` stand-down for the switch knob (the promoted controls' only
  motion). The patches for `.lw-prompt`, the bare `[data-focus-demo]` hook and the
  table/kpi/empty/eyebrow family were never promoted and stay in `product.css`; tombstones
  mark each vacated site. Verbatim relocation — `check:visual` scored **zero** movement on
  every form, control and topbar card against a HEAD baseline, which is the measurement that
  matters here, since every card loads base + marketing + product and therefore renders the
  exact cascade this reorders.

- **Site chrome and editorial: `SiteFooter`, `Steps`, `Quote`, `Byline`, `ArticleCard`,
  `AnnounceBar`** (`marketing.css` + `components/marketing/`). Six things every marketing
  consumer had rebuilt locally, and each one is here for a reason a local copy cannot have:
  - **`SiteFooter`.** A dark footer is `data-band="dark"`, never a hard-coded navy tier. The
    consumer this replaces painted `--lw-navy-900` and then restated five child inks on top
    of it — and its own code comment recorded that the one it got wrong, brand-500 as an 11px
    mono heading on navy, **failed AA on every page in both locales**. The band re-points
    `--lw-brand-text` to brand-400 for free, so no child carries a dark variant. Named
    `SiteFooter`, not `Footer`: `CardFoot` exists, the bundle namespace is flat, and
    `lw-bundle.mjs` makes that collision a hard error. The current-page marker is an ink lift
    **plus** a weight step **plus** a brand rule — never colour alone, and never a typed `▸`.
    An entry with no `href` renders as an inert `.lw-footer-note`, deliberately absent from
    the pointer-affordance list. Replaces the hand-rolled footer (seven inline styles) in
    `templates/marketing-landing`.
  - **`Steps`.** One drawing for a company timeline, a roadmap and a numbered "how it works"
    — three separate components in the consumer, which nothing rendered side by side.
    **Deliberately no state axis**: `Stepper` owns wizard state and its ARIA; a timeline has
    none, because every entry already happened. The marker text is real markup, never CSS
    `counter()`.
  - **`Quote`.** The spine is **one declaration block, two selectors**
    (`.lw-quote, .lw-story .lw-story-quote`), replacing the standalone `.lw-story-quote`
    rule. `StoryCard`'s quote only renders inside that composition, so a testimonial band
    needed its own class — and the moment it had one, the drawing had two owners unless they
    shared the declaration.
  - **`Byline` / `.lw-article-head` / `.lw-pill-link`.** The three atoms article chrome was
    actually missing. There is **no** `.lw-article` grid and **no** `.lw-post` card: the
    article + contents layout is `.lw-split`, the index card is `Card` + `CardHead`/`Body`/
    `Foot` + `Byline` inside a `Grid`, and `ArticleCard` is that composition written down.
  - **`AnnounceBar`.** Exists upstream for exactly one rule:
    `.lw-announce + .lw-topbar { inset-block-start: var(--lw-announce-h, 36px) }`. A sticky
    header under a sticky announcement otherwise scrolls up underneath it, and a consumer
    hand-rolling the strip cannot reach into the package's header to offset it — so it
    re-declares the header and inherits none of its later fixes.

  Every knob is a local custom property with a fallback (`--lw-steps-marker`,
  `--lw-announce-h`), the `--lw-grid-min` / `--lw-split-rail` form: no new design token, no
  DTCG kind, no obligation to re-point in twelve theme scopes.

- **Contrast manifest: `brand-text` on `bg-subtle`** (`.lw-footer-head`). The composed-pair
  walk cannot see it — the ink is on the heading and the ground is on `.lw-footer`, two
  different rules, the same shape as the diff surface in group G2. Light 5.35, dark and
  media-dark 7.48.

- **`linkAs` — the router escape hatch, on every component that renders a navigation
  anchor.** `TopBar`, `Breadcrumbs`, `AppBar`, `Sidebar`/`NavItem`, `BottomNav`,
  `StoryCard`, `FeatureGrid`, `Menu`, `ActivityFeed` and `SourceList` hard-coded `<a
  href>`, so a client-routed consumer got a **full document reload** on every in-chrome
  link — and in a path-prefixed bilingual app (`/vi/...`), the raw anchor drops the
  prefix and lands a Vietnamese reader back on the English site. There was no way to
  reach the element short of forking the component. `linkAs?: React.ElementType`
  defaults to `"a"` and receives exactly what the raw anchor received — `href`,
  `children`, `className`, and `aria-current` where applicable — so it is inert unless
  passed. A prop, not a context provider: the package has no runtime context surface and
  one link element is not the thing to open it with.
  - It replaces the **anchor only**. Every one of these components already degrades an
    item with no `href` to a `<button>` (focusable, announced as a control); `linkAs`
    never reaches that branch, so the degradation still holds.
  - **`Button`, `Card` and `SourceChip` deliberately do NOT get one** — their existing
    `as` prop already renders a consumer element with `href` forwarded, and a second
    mechanism for one behaviour is what README rule 9 forbids. Their `as` was typed
    `as?: string`, though, so the mechanism existed at runtime and **failed to compile**
    for the only use it has; it is now `React.ElementType`. Type-only, non-breaking —
    `string` is a subset.


- **`.lw-icon-btn` promoted from `product.css` to `base.css`**, and split from
  `.lw-dialog-close` on the way. `fb2d3ad` promoted layout, the form controls and
  `.lw-topbar`; this release promoted their dark-ground patches and added the mobile nav —
  and `.lw-icon-btn` was the last piece of the header still on the wrong side of the line.
  `.lw-topbar-toggle` composes it, `AnnounceBar`'s dismiss control is one and `SiteFooter`'s
  social row is a line of them: three marketing surfaces on a page with no reason to load
  `product.css`. Until now the toggle got its `display`, position and focus ring from
  `base.css` and none of the shared icon-button face. Closes **REVIEW open item 6**.
  - `.lw-dialog-close` stayed — a dialog is an app surface — but it is now a **delta**, not a
    second copy. `Dialog.jsx` emits `lw-icon-btn lw-dialog-close` and `product.css` keeps only
    the optical margin. The two were never two treatments; they were one face written under
    two names in one selector list, which is the shape `CONTRIBUTING.md` opens with.

- **`.lw-eyebrow`'s dark-ground patch promoted to `base.css`**, with `.lw-icon-btn` and for
  the same reason. The hexagon node is the one part of the motif pinned to a TIER, so on a
  dark band the label re-points to the dark subtle ink while its node stays brand-500 — a cyan
  too dark for navy. `marketing.css` patches `.lw-section.dark` and `.lw-hero-dark`; a plain
  `.lw-band-dark` was the hole, and the patch for it lived in a layer a marketing page never
  loads. REVIEW open item 6's "same class, one file over"; closed with it.

- **`.lw-pill-link` joined the consolidated pointer-affordance list** at the foot of
  `base.css`. It has to live there and not beside its own rules in `marketing.css`, because a
  later `cursor: default` silently cancels an earlier pointer and that list is what stays last
  in the file.

- **`_ds_manifest.json`'s `components` array refreshed** — it was 12 entries behind the
  filesystem (the whole v1.3.0 component set). The `cards` array, which is the load-bearing
  half (both browser gates enumerate from it), was verified clean in both directions with all
  four marker attributes matching byte-for-byte. See REVIEW open item 1 for why this array
  should stop being hand-maintained at all.

- **Layout, the form controls and `.lw-topbar` moved from `product.css` to `base.css`.**
  Verbatim relocation — not one declaration changed. This is the same correction that put
  `.lw-btn` in `base.css`, applied in the other direction: `base.css` is the layer nobody
  drops, `marketing.css` is what a marketing site adds, `product.css` is app surfaces — and
  the layout primitives (`.lw-page`, `.lw-stack`, `.lw-cluster`, `.lw-grid`, `.lw-split`,
  `.lw-scroll`), the field and control face (`.lw-field`/`.lw-label`/`.lw-help`/`.lw-error`,
  `.lw-input`/`.lw-textarea`/`.lw-select` and every state, `.lw-input-group`, `.lw-switch`,
  `.lw-check`, `.lw-segmented`) and the site header (`.lw-topbar`) were all on the app side of
  that line. A marketing site that correctly dropped `product.css` got correct buttons, cards
  and heroes — with unstyled layout and an unstyled header.

  `.lw-topbar` was the proof: `.lw-topbar .brand-mark` was **already** in `base.css` while
  every other rule of the same component sat in the other layer.

  Three notes for anyone reading the diff:
  - The forms block is placed after `base.css`'s pills section and before its console section,
    which keeps the consolidated pointer-affordance list at the **foot** of `base.css` last. A
    later `cursor: default` silently cancels an earlier pointer, and that list names
    `.lw-switch`, `.lw-check`, `.lw-select` and `.lw-segmented button`.
  - The `:is(.dark, …)`-scoped patches for those controls stay in `product.css`. They outrank
    the promoted rules on specificity, so their position is not load-bearing — but a page
    loading only `base.css` now has the controls without their dark-band treatment.
  - Two `@media (forced-colors: active)` rules in `base.css` — `.lw-select { background-image:
    none }` and the `.lw-segmented button:is([aria-checked],[aria-pressed])` Highlight border —
    were being beaten on source order by the equal-specificity `product.css` rules that loaded
    after them. With those rules now **above** the forced-colors block in the same file, the
    forced-colors overrides take effect for the first time. Latent bug, fixed by the reorder.
  - Tombstone comments mark each vacated site in `product.css`.

- **`README.md`'s install pin corrected to `#v1.2.1`** — it still said `#v1.2.0` while
  `package.json` said `1.2.1`, which failed `lw-token-lint --css` with `stale-install-pin`.

### Fixed

- **Every React specimen card had been rendering BLANK since v1.2, and both browser gates
  reported green through all of it.** `lw-bundle.mjs`'s header says it uses the classic JSX
  transform "because the cards get React as a UMD global" — but esbuild's `jsx` API option is
  only a DEFAULT, and a reachable `tsconfig.json` overrides it per file. v1.2 added one,
  carrying `"jsx": "react-jsx"` (correct for `tsc --noEmit` over the `.d.ts` files, fatal
  here). So every component switched to the automatic runtime, which resolves through the
  jsx-runtime shim to `globalThis.React` — and React's main export has no `jsx`/`jsxs`.
  Result: `TypeError: import_jsx_runtimeN.jsx is not a function` on **every** component.
  `lw-a11y.mjs` refuses a card whose body is empty, but these cards carry explanatory prose
  around their React roots, so `innerText.trim().length > 0` was satisfied by the copy while
  the specimen itself was missing — axe scored the prose. `lw-visual.mjs` compared two
  equally blank plates. The fix is `tsconfigRaw: { compilerOptions: {} }` in the shared `JSX`
  options. **`_ds_bundle.js` must be regenerated** (`npm run bundle`) for the fix to reach
  the gates. With the corrected bundle, axe immediately found four real `color-contrast`
  violation groups on `.lw-btn-link` in `Button.card.html` and `primitives.card.html` that
  the blank plates had been hiding. Both are fixed below, and the *guard* is fixed too:

- **`lw-a11y.mjs`'s blank-card guard was decoration, and now is not.** Two rules replace
  `innerText.length > 0`, and each catches a failure mode the other structurally cannot:
  (1) an **uncaught page error** fails the card — the direct signal, which the v1.2 defect
  emitted on every card and nobody was listening for; (2) **every container passed to
  `createRoot`/`hydrateRoot`/`render` must end up with at least one element child** — the
  structural signal, which survives a failure that throws nothing at all. The recorder is an
  `addInitScript` that installs a setter for `window.ReactDOM` and stores a `Proxy` over the
  object the UMD wrapper assigns, because `global.ReactDOM = {}` lands *before* the factory
  fills it and a naive wrap would wrap nothing. The wait also short-circuits on the error flag,
  so a dead card reports its own `TypeError` in about a second instead of burning a 15s
  timeout and then guessing. **Watched failing**: the defect was replanted in
  `lw-bundle.mjs`, the bundle rebuilt, and the gate named the exact
  `TypeError: (0 , import_jsx_runtime12.jsx) is not a function` on the first card it reached.

- **`.lw-btn` had no `background` and no `border` of its own — so a base-only page rendered
  every button with the UA button face and a `2px outset` bevel, and `.lw-btn-link` at
  2.28:1.** This is the four serious axe failures above, and the root cause is neither the
  link variant's token pairing nor its disabled/loading treatment: it is **the v1.2.0 reset
  split, one layer over**. `reset.css`'s `button { background: none; border: 0; padding: 0 }`
  used to sit at the top of `base.css`; splitting it out (advisory
  `base-css-unusable-in-tailwind`) made `base.css` importable by a Tailwind app and left the
  button family leaning on a file that a vanilla consumer — and every specimen card, and the
  README's own marketing recipe — does not load. Nine of the ten `.lw-btn` variants declare a
  `background`, so on them the leak shows only as a bevel; **`.lw-btn-link` and a
  variant-less `.lw-btn` declare none**, so they painted on Chromium's `buttonface`: `#EFEFEF`
  on light, and under `color-scheme: dark` **`#6B6B6B`, against `--lw-brand-400` = 2.28:1**.
  A sweep of every element on all 39 cards found the leak in exactly one place — 87 `.lw-btn`
  instances, and no other `.lw-*` class — so the fix is two declarations on `.lw-btn`.
  - **The failing cells were `rest` and `hover`, not `loading` or `disabled`.** The first
    reports misread `.cell:nth-child(32)`/`(33)` as the right-hand columns; they are the link
    row's first two. The state is fully reachable by a user, so **no `data-a11y-expect`
    opt-out was added, and none would have been justified** — the exemption count in this
    repository stays at one.
  - The rule this establishes, written into the CSS: **a property that carries a COLOUR is
    `base.css`'s to state, because a colour `base.css` does not state is a colour the contrast
    gate cannot see.** Geometry (`box-sizing`) stays the reset's job — that one fails visibly.
  - Measured consequence: every non-ghost button is **4px narrower** (the UA border was adding
    2px a side to an `auto` width) and loses its bevel. Height is unchanged at 40px, and the
    grid geometry of `Button.card`'s matrix is byte-identical at 417px. `check:visual`
    attributes 48 of its 52 moved shots to exactly this; every card that moved has a
    non-ghost button, and every card that did not either has no button or has only
    `variant="ghost"`, which declared its own border all along.

- **`lw-visual.mjs` had no image-decode wait**, so it flipped `data-theme` and screenshot in
  the same task. Fine for colour, wrong for artwork: a per-theme `background-image`
  (`.brand-mark`) is a fresh resource request at flip time, and the dark shot raced it —
  measured at **0.0293%** drift on a card carrying the logo, against a noise floor of 0.0002%
  and a soft threshold of 0.02%. The first workaround was to take the logo out of the card,
  i.e. to edit the specimen to suit the gate; that is reverted. `decoded()` now awaits
  `decode()` on every `<img>` **and** on every `url()` found in a computed `background-image`
  (including `::before`/`::after` — a CSS background exposes no load event, and re-requesting
  the same URL through a throwaway `Image()` hits the same memory cache), then lets two frames
  pass. Verified over three independent full runs of all 156 shots: worst drift **0.0001%**,
  and the logo card never moved.


## [1.2.0] — 2026-07-31

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

### Added — the registry, the geometry it renders against, and a drift signal

- **A shadcn registry: `registry/` + a committed `r/`.** Both shadcn consumers use ZERO of
  this package's 82 React components — they vendor shadcn's and hand-align them, which is how
  tss-app came to re-type `padding: 0 18px`, the control heights, the focus rule and the table
  header from scratch. Nine items, seeded from those already-aligned components with their
  rationale intact, minus that app's product vocabulary (its badge carried twenty
  `parsing`/`checking`/`queue` variants that mean nothing to a second app).

  ```bash
  npx shadcn@latest add ./node_modules/@leanwise/design/r/button.json
  ```

  No static host needed: `r/` is committed for the same reason `tokens.json` and `react.d.ts`
  are — every consumer installs from a git tag, where a publish-time artifact does not exist.

- **~30 component-geometry tokens**, and the `.lw-*` CSS now reads them. The rule is
  deliberately narrow — tokenise a literal iff a second implementation must reproduce it
  exactly, or it varies by density/theme. That is ~30, not the ~120 literals in the layer: a
  token is a promise of stability *and* a second home that can drift. Values are identical to
  the literals they replace, so this is a pixel no-op (`check:visual`: 136 shots, no change).

- **`check:registry`** — compiles every design-system class the registry components use and
  fails if one emits nothing. A registry that has drifted from the CSS is worse than none,
  because it looks authoritative. It found four real gaps on its first run: `leading-control`,
  `bg-scrim` and `px-field-pad-x` were never registered, and a spacing key had been named
  `field-x` while the component said `field-pad-x`.

  It also had three false positives of its own, all the same shape: Tailwind escapes a class
  name into the selector with a literal backslash and appends the variant's pseudo *or
  attribute*, so `hover:bg-cta/90` emits `.hover\:bg-cta\/90:hover` and
  `aria-invalid:border-x` emits `.aria-invalid\:border-x[aria-invalid="true"]`. Matching the
  raw class name called all of them dead — and the `aria-invalid` one produced a wrong
  diagnosis ("v4 has no such variant") and a `@custom-variant` that a direct probe then showed
  was unnecessary. The gate was wrong, not the compiler.

- **The token lint's TSX rules now run over `registry/`** — the first time those rules have
  ever run inside this repo.

- **`advisories.json` + `npx lw-doctor`.** A consumer cannot see any of this from inside their
  own repo: their installed tree is self-consistent and gives no signal that a later release
  fixed something they are living with. `lw-doctor` reads the version installed **locally** and
  fetches the advisories from the repo **tip** — the newest release is the only thing that
  knows what is wrong with the older ones.

  Every count is measured by a named gate, and `check:advisories` re-derives all seven from the
  tree and fails if one drifts. That earned itself twice on its first run, catching two
  different off-by-one bugs in its own rule counter.

### Added — the two missing roles

- **`--lw-info`, the fifth status — and it is a VIOLET, not a blue.** `shadcn.css` declined to
  emit `--info` for four minors on the grounds that *"every blue here already means brand or
  link"*. That is an objection to the COLOUR, not to the role: a real app needs a fifth state,
  and tss-app proved it by deriving its own `--tss-phase2` from `--lw-chart-4` — this exact
  violet — for this exact reason. A dark fill, so white ink like `neutral` and `danger`.
  Measured: 7.83:1 as a fill, 8.48:1 (light) / 7.57:1 (dark) as a chip.

  ⚠️ **Look before adopting.** tss-app's hand-rolled `--info` is byte-identical to its
  `--primary`, so an info badge there is currently painted in the brand colour. That is a
  coincidence, not a role, and taking this token changes it.

- **`--lw-chart-9..12`**, extending the categorical ramp to twelve. Deliberately NOT tints of
  existing members — a tint of `chart-1` is precisely what makes two series hard to tell apart
  in a legend, and `color-mix(chart-N 62%, bg)` is the shape tss-app had to invent for want of
  these.

- **A categorical-separation gate**, in `lw-contrast-check`. Contrast is the wrong measure for
  a series colour: two of them can each clear AA against the page and still be
  indistinguishable *from each other*. CIE76 dE over all 198 pairs in all three scopes.

  The floor is **measured, not invented** — 19, just under the tightest pair in the shipped
  v1.1.8 ramp (`chart-1` vs `chart-7`, dE 20.0 in both dark scopes). So the existing palette
  passes as-is and anything new must be at least as separable as the closest existing pair.
  That chart-1/chart-7 pair is genuinely tight and is the first thing for a future palette
  pass; widening it moves every chart in every consumer, so it does not belong in a release
  whose claim is that no pixel moved.

  The gate immediately earned itself: indigo at 232° measured dE 13.5 against `chart-4`'s
  violet, and green at 120° measured 13.4 against the new `chart-9`. Eleven saturated hues
  leave no gap wide enough, so `chart-10` is a muted **taupe** — the best candidate constrained
  to a ≥28° hue gap only reached 23.5, while dropping that constraint and letting dE decide
  gives **39.7**. Chroma and lightness separate a colour as well as hue does; hue distance is a
  proxy, dE is what a reader experiences.

  It also found a bug in itself on the first run: `toLab` divided by 255 when this file's
  resolved channels are already 0–1, collapsing every colour to near-black and reporting dE 0.2
  between obviously different hues.

### Added — packaging, and the four defects it had been hiding

- **`"use client"` — 27 modules now declare it; the package had ZERO.** `<Combobox>`,
  `<DataGrid>`, `<Dialog>` and `useTheme()` all threw the moment an App Router page rendered
  them from a server component — which is the default for every page in every Next app since
  2023, and therefore for every app this system is meant to be the foundation of.

  The directive is in the SOURCE, per file. A build-time banner cannot work: a bundled chunk
  carries only one directive, so it would have to mark everything client and throw away the
  **50 server-safe** components. `check:rsc` gates it **both** ways, so "put it on everything"
  is not the cheap fix — a server component is the one that ships the consumer no JS.

  `Icon` was one `React.useEffect` away from being client, and it is imported by a third of
  the barrel — one dev-only `console.warn` would have dragged Avatar, Button, Chip, the nav
  and half the data components across the boundary with it. It warns during render instead.

- **`dist/` is built and COMMITTED.** It had never existed for any consumer: `prepublishOnly`
  is the only hook and a git install runs no lifecycle script. Built per file with esbuild
  (77 files, 400 KB, no sourcemaps — they were larger than the code and would churn every
  diff). `exports` gains a `source` condition pointing at the `.jsx`, which still ships.

- **`check:types` — and there was no `tsconfig.json` at all, so `tsc` had never run over the
  72 hand-written `.d.ts` files that ARE this package's public API.** The first run found
  **87 errors**:
  - 72 × `Cannot find namespace 'JSX'` — React 19 removed the global namespace.
  - 13 × interfaces that did not extend cleanly, because a prop shadows a DOM attribute of
    the same name with a different type (`title`, `onChange`, `size`, `prefix`, `role`). A
    consumer passing `title={<span/>}` to `<Artifact>` got a type error.
  - `iconNames` declared twice.
  - `IconName` listed **46 of the 78 real glyphs** — so `<Icon name="filter" />`, which the
    component renders perfectly, was a type error. It is generated from `Icon.jsx` now.

  `skipLibCheck: false` is set deliberately and must not be softened: TypeScript's default of
  `true` skips `.d.ts` files, which is exactly why all of the above survived.

- **`check:pack`** — `npm pack`, install the tarball into a scratch dir, and assert the
  package works from *there*. Every distribution defect this package shipped was invisible to
  every other gate, because every other gate runs against the working tree where the files
  exist whether or not `files` would pack them.

- **`forwardRef` on the five composite form controls** (`Combobox`, `DatePicker`,
  `FileUpload`, `RichText`, `Segmented`). The five simple controls have had it since v1.0;
  these five did not, which made them the ones a real form could not use. The ref is
  redirected to the FOCUSABLE element via `useImperativeHandle` — a form library calls
  `.focus()` on what it is given, and focusing a wrapper `<div>` does nothing.

### Changed — packaging

- **The gates moved from `templates/_tooling/` to `tools/`.** The old location needed a
  `"!templates/_tooling"` exclusion plus a re-include in `files` — a pattern npm honours and
  **pnpm does not** — so the `lw-token-lint` bin was simply absent in a pnpm install, and a
  consumer wrote a 53-line workaround whose own header calls it *"a lint that silently stops
  linting."* `tools/` needs no exclusion and the bin now packs unconditionally.

- **`templates/` no longer ships. The tarball is 1.06 MB → 0.64 MB.** It was 1.4 MB, 816 KB of
  it twelve BYTE-IDENTICAL copies of `support.js`, and it shipped **broken** regardless: every
  `ds-base.js` in it loads `_ds_bundle.js`, which `files` has never carried, so a consumer who
  opened a packed template got a blank page. Authoring artifacts — the same verdict `REVIEW.md`
  §3 already reached for the preview cards. `check:pack` asserts they stay out.

### Acceptance — measured against a real consumer, not a fixture

`tss-app` (Next 16 App Router + Tailwind v4 + shadcn, 261 components) compiled with and
without `theme.css`, over its whole source tree:

| | classes emitted |
|---|---|
| today | 1375 |
| `+ theme.css` | 1375 |

**Nothing lost, nothing gained — and both halves matter.** Nothing lost is the safety result:
adopting `theme.css` cannot break a page. Nothing *gained* is the honest one: Tailwind only
emits a utility it finds in source, and tss-app does not yet write `text-h1`,
`bg-gradient-brand`, `animate-rise` or `duration-fast` anywhere. What the file delivers is the
vocabulary being *available* — and the deletion below — not new CSS appearing on its own.

> **Correction.** An earlier run of this measurement reported "19 classes gained" and it was
> wrong. That probe rewrote the import to an absolute path inside the design-system repo and
> did not pass `source(none)`, so Tailwind's automatic source detection scanned
> **`leanwise-design/preview/*.html`** and emitted the classes those files use. The number
> described this repo's own preview cards, not the consumer. The corrected probe pins the
> sources; the reproducible lesson is that a Tailwind A/B whose two sides read different
> directories is measuring the directories.

Of the 203 Tailwind-namespace names tss-app hand-registers, **70 are byte-identical to
`theme.css` and can be deleted verbatim** (that measurement is over declarations, not
compilation, and is unaffected by the above), 130 are genuinely product vocabulary
(`--status-*`, `--validation-*`, `--score-*`, `--tool-*`, `--syntax-*`), and exactly **three
are deliberate overrides that must be KEPT**:

- `--radius` — tss-app pins `lg`, the system defaults to `md`. Deleting it would re-tier every
  `rounded` from 12px to 8px *and* the six recharts tooltips that read `var(--radius)`.
- `--shadow` — tss-app pins `sm`, the system defaults to `md`. Deleting it makes every default
  Button and six Badge variants heavier.
- `--color-sidebar` — reads the older `--sidebar-background`; both spellings are emitted, so
  this one is free either way.

That is the whole migration risk, enumerated. It is three lines.

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

