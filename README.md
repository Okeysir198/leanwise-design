# @leanwise/design — LeanWise Design System

The brand foundation for every LeanWiseAI product: one token core, three CSS layers, the
React component layer, and twelve starting templates. **Depend on it; never copy it.**

```
tokens.css        the source of truth — HSL triples, light + dark, both re-pointed
fonts.css         Geist + Geist Mono, self-hosted, incl. Vietnamese subsets
shadcn.css        maps --primary/--background/… onto the tokens
tailwind-preset.cjs Tailwind v3 consumers (CommonJS — a tailwind.config.js requires it)
base.css          the SHARED layer — reset, type, buttons, cards, chips, pointer list
marketing.css     the MARKETING layer (grounds, hero, features, stories, ambient motion)
product.css       the PRODUCT layer (layout, forms, data, overlays, app shell, AI)
email.css         the EMAIL layer — literal values, tables, no var(). See Email below
lw.css app.css    SHIMS for the old two-layer names. Kept one major; do not mix
                  them with the files above, or the same rules apply twice
components/       the React layer — components + their specimen cards, thin
                  wrappers over the CSS above (no styling of their own)
templates/        twelve starting points (see Templates)
assets/           the logo — generated SVG/PNG, this package is its source of truth
preview/          FOUNDATION cards (brand, colour, type, spacing, motion)
```

**Load order is always `tokens.css` → `base.css` → the layer you need.** An app takes
`product.css`; a marketing page takes `marketing.css`; a page that is both takes both, in that
order. Nothing can drop `tokens.css` or `base.css`.

The names are load-bearing, because the previous two-layer split got this wrong: `.lw-btn`
lived in `lw.css`, "the marketing layer", so an app that dropped it got correct layout, forms,
tables and overlays — and unstyled buttons. The shared controls now live in `base.css`, which
is the layer nobody drops. `lw.css` and `app.css` remain as shims for one full major; **do not
load a shim alongside the real files**, or the same rules apply twice and the cascade between
the two layers reorders.

---

## Contents

**Getting in:** [Install](#install) · [The brand](#the-brand-two-anchors-one-accent) ·
[Components](#components) · [Templates](#templates)
**The reasoning:** [The rules that are not obvious](#the-rules-that-are-not-obvious) ·
[Adding a component](#adding-a-component) · [Enforcement](#enforcement)
**The layers:** [Email](#email) · [Mobile](#mobile) · [Charts](#charts) · [Motion](#motion) ·
[Accessibility](#accessibility)
**The foundations:** [Responsive](#responsive) · [Spacing](#spacing-is-named-by-value) ·
[Density](#density) · [HSL triples](#why-colours-are-authored-as-hsl-triples) ·
[Per-tenant theming](#per-tenant-theming) · [Logo](#logo)

Two companion files: `CHANGELOG.md` for what moved, `REVIEW.md` for the current audit and
what is still open. `CONTRIBUTING.md` points back here — the checklist lives in one place.

---

## Install

```jsonc
"dependencies": { "@leanwise/design": "github:Okeysir198/leanwise-design#v1.1.6" }
```

```css
/* Tailwind + shadcn app (VSS, tss-app) */
@import "@leanwise/design/fonts.css";
@import "@leanwise/design/tokens.css";
@import "@leanwise/design/shadcn.css";
@import "@leanwise/design/base.css";      /* shared controls — never dropped */
@import "@leanwise/design/product.css";   /* app surfaces */
```
```js
// tailwind.config.cjs — the preset is CJS, so `require` needs a CJS config file.
module.exports = { presets: [require("@leanwise/design/tailwind-preset")] };

// tailwind.config.js in a "type": "module" package — import it instead.
// `export default { presets: [require(…)] }` is a ReferenceError there.
import preset from "@leanwise/design/tailwind-preset";
export default { presets: [preset] };
```

```css
/* vanilla CSS (marketing, rag-service) */
@import "@leanwise/design/tokens.css";
@import "@leanwise/design/base.css";
@import "@leanwise/design/marketing.css";
```

```ts
// React
import { Button, Field, Table, PromptInput } from "@leanwise/design/react";
```

The React entry re-exports `.jsx` source rather than a build artefact — deliberately, so a
component is one file to read and patch, and so the CSS layer stays the single source of
styling. The cost is that your bundler must apply its JSX transform to this dependency.
Vite's dependency pre-bundling does it with no configuration; a hand-rolled webpack config
may need this package inside `babel-loader`'s `include`.

**Everything documented here ships.** `package.json` declares the subpath exports, so the
import lines above resolve: `/react` (the barrel — every component), `/brand` (`brandVars`),
`/hooks` (`useTheme`, `useReveal`, `useSpotlight`, `useDeterministicCascade`,
`useReducedMotion`, `animateCounter`), `/tailwind-preset`, and each stylesheet by name.
Nothing else is importable — there is no deep path into `components/`, so a component can
move without breaking a consumer.

`useTheme` and `ThemeToggle` read and write the same `lw-theme` key and paint the same
`.dark` + `data-theme` pair, so an app can use either or both without them desyncing.

---

## The brand: two anchors, one accent

| | | |
|---|---|---|
| **cyan** `#0C727B` `--lw-brand-500` | the brand | every fill, `--primary`, the default button |
| **navy** `#024576` `--lw-navy-700` | the ground | dark surfaces, heading ink on light |
| **amber** `#FCB603` `--lw-cta-500` | the accent | one CTA per view, nothing else |

Cyan and navy are the logo's own two gradient stops — the palette is derived from the mark,
not picked from a swatch book. Amber sits ~144° from the cyan so it can never read as a
second brand colour.

---

## Components

**Two kinds of card.** A composition card per folder shows how the pieces go
together; a *state matrix* card shows one control against every state it can be in, on both
grounds. The matrix is not decoration — the axis is what finds bugs. `Button.card` caught
disabled being painted from the `surface-3`/`text-4` tiers, which no dark scope re-points, so a
disabled button on navy stayed a pale grey block; `forms-states.card` caught the `InputGroup`
invalid state above. Neither is visible on one ground, and neither is visible without the
state axis.

Every component is a thin wrapper over the `.lw-*` CSS in `base.css` / `marketing.css` / `product.css` —
they add no styling of their own, so the React and vanilla consumers cannot drift apart.
Every interactive component ships `:hover`, `:focus-visible`, `:disabled` and a dark-ground
rule; every transform stands down under `prefers-reduced-motion`.

### Primitives — `components/primitives/`

| Component | Purpose |
|---|---|
| `Button` | `variant`: brand · cta · ink · ghost · danger · link. `size`: sm/md/lg. `iconOnly`, `loading` |
| `Card` + `CardHead` `CardTitle` `CardBody` `CardFoot` | The surface. `interactive` makes it a real control, not a div with a click handler |
| `Chip` | Status atom. `tone`: brand · success · warning · danger · neutral |
| `Eyebrow` | The signature mono/uppercase label, tipped with a hexagon node |
| `Avatar` | Initials by default; an image only when there is one |
| `Skeleton` | `shape` or `lines={n}`. Shaped like the thing it replaces |
| `Icon` | The icon set — `IconNames.length` glyphs, the count that cannot go stale. One 24-grid, one stroke weight, `currentColor` only. `name` `size` `label`. The ONLY place an icon path is drawn: components name a glyph, they never redraw one |
| `.lw-icon-btn` | Class, not a component: the borderless icon control. Owns the 28px hit area, hover ink and brand focus ring — use it instead of hand-styling a bare `<button>` |

### Layout — `components/layout/`

| Component | Purpose |
|---|---|
| `Page` | The 1400px app-shell width |
| `Container` | The 1200px reading column |
| `Stack` | Vertical rhythm. `gap` = a spacing token |
| `Cluster` | A wrapping row. `justify`, `align` |
| `Grid` | Auto-fit columns. `min` is the only knob — no breakpoint needed |
| `Split` | Main column + rail. Collapses at `--lw-bp-lg` |
| `Section` | A page band. `dark` flips every descendant's ink |

### Forms — `components/forms/`

| Component | Purpose |
|---|---|
| `Field` | **The unit.** Wires `htmlFor`, `aria-describedby`, `aria-invalid`. `label` `help` `error` `required` `optional` |
| `Input` | `size`, `invalid` |
| `InputGroup` | An input with a `prefix` / `suffix` inside one focus ring |
| `Textarea` | |
| `Select` | `options` as strings or `{value,label}`. CSS chevron |
| `Switch` | For a setting that applies immediately |
| `Checkbox` | `radio` for the round variant |
| `Segmented` | 2–4 mutually exclusive views |
| `Calendar` | The date grid. Real buttons with a roving tabindex, so Tab enters and leaves once instead of walking 42 days; month and weekday names come from `Intl` |
| `DatePicker` | The date field, on `Popover`. `range` adds the preset rail — "Last 7 days" is what a user wants nine times out of ten, and building it from two grid clicks is a chore |
| `FileUpload` | Dropzone + file list. The zone is a `<label>` around a real file input, so click, keyboard and the a11y name are the platform's. Rejects by name, with the limit stated |
| `RichText` | Editor **chrome** — toolbar plus a prose surface on the type scale. The engine is deliberately not the system's; pass `children` and you keep the chrome with your own surface: `<RichText tools={["bold","italic","ul"]}><EditorContent editor={editor} /></RichText>`. The default surface is `contenteditable` + `execCommand` — a demonstrable shim, fine for a comment box, **swap it before shipping a document editor** |
| `Stepper` | Wizard progress. The marker carries the state — the number becomes a check — so it survives greyscale. Only done and error steps are clickable |
| `Combobox` | Single and multi-select with filtering, on `Popover`. Focus stays in the input and `aria-activedescendant` names the active row — the ARIA 1.2 pattern, and the opposite of `Menu`. `onSearch` hands filtering to the caller: the options passed ARE the result |

### Data — `components/data/`

| Component | Purpose |
|---|---|
| `Table` | `columns` + `rows`. A column with `num` gets mono tabular-nums, right-aligned. `sortable` + `onSort` renders the header as a real button with a caret |
| `KpiTile` | `icon` + `accent` draw a tinted subject chip; the delta sits on the number's baseline beside it. `accent` is the SUBJECT's family, `tone` judges the movement — two different facts |
| `StatMeter` | A number with a unit, a bar and a target marker — a reading, not a decoration |
| `EmptyState` | `icon` (a glyph name) `title` `description` `action` — exactly one action |
| `StateView` | **The five states as one set**: empty · loading · error · offline · denied. Shipping only `empty` is how the other four get invented per product. `error`/`offline` announce with `role="alert"`; `loading` uses `role="status"` + `aria-busy` |
| `Console` | `lines[].cells` renders aligned subgrid columns (`num` right-aligns); `text` stays free-running and spans the stream. Never pad mono text with runs of spaces |
| `CodeBlock` | Server-highlighted `html`, or raw `code`. Copy control on by default with `code`, confirming in place |
| `DataGrid` | **Not an extension of `Table`.** Sticky header, resizable and pinnable columns, bulk selection, optional windowing. Reach for `Table` first — a static list should not pay for grid machinery |
| `Progress` | Determinate only, with real `role="progressbar"` values. Indeterminate work is a `Skeleton` — a bar that moves without knowing its extent reports a number it does not have |
| `Pagination` | Page navigation AND the result count, because the count is the control's feedback. `cursor` mode is prev/next only, for an API that cannot count |
| `FilterBar` + `Toolbar` | Applied filters as removable chips. A filter you cannot see is one you forget you set, and then the empty result looks like a broken product |
| `BarChart` `LineChart` | A thin tokenised layer, not a charting engine. Series come from `--lw-chart-1..8`; every chart renders its numbers as a hidden table |
| `ActivityFeed` | Notifications and activity — the same list with a different verb. Day-bucketed; unread is a dot plus weight, never a tint alone |

### Navigation — `components/nav/`

| Component | Purpose |
|---|---|
| `TopBar` | Sticky app chrome. `brand` `links` `actions` |
| `AppBar` | **Use this, not a hand-written bar.** Brand + breadcrumbs + actions on `TopBar`, with an optional rail toggle. The lead holder is `flex: 0 1 auto` because TopBar already ships a `flex: 1` spacer — a second claimant splits the slack and ellipsises the breadcrumbs with a third of the row empty, which is exactly what five hand-written copies did |
| `Sidebar` + `NavItem` | The product rail. `collapsed` → 60px icon rail |
| `Tabs` | Roving tabindex: arrow keys, Home/End — selection AND focus move together |
| `Breadcrumbs` | Mono, so it reads as a path |
| `CommandPalette` | ⌘K, on the native `<dialog>` — modal, so the page behind it is inert. **It does not bind the shortcut**; a component that installs a global key handler cannot be turned off on the screen where ⌘K means something else. Scored subsequence match, so "opdb" finds "Open database" |
| `BottomNav` | The touch answer to `Sidebar`. Three to five DESTINATIONS, never actions (warns past five). Reserves the home indicator from `--lw-safe-bottom`, and takes its 44px target from the bar height rather than padding |
| `ThemeToggle` | Light / dark by default (`modes` adds `"system"` where a product honours it). Driven by `value`/`onChange` — never uncontrolled beside a themed wrapper, which paints half a theme |

### Overlays — `components/overlays/`

| Component | Purpose |
|---|---|
| `Dialog` | The native `<dialog>`. Focus trap, Esc and inertness are the platform's |
| `Toast` + `ToastRegion` | `tone`: info · ok · warn · err. Errors use `role="alert"`. `onClose` adds a dismiss control |
| `Tooltip` | Hints only. Does not exist on touch |
| `Popover` | **The one floating surface.** Menu, Combobox, DatePicker and every filter panel are this plus contents. Top-layer, so it escapes an ancestor's `overflow: hidden` without a portal. `placement` flips only when the preferred side does not fit; dismissal is explicit, because `popover="auto"`'s light-dismiss cannot tell the trigger from the outside world |
| `Drawer` | The side sheet — a modal that enters from an edge, so it is the same native `<dialog>`. `side`: start · end · bottom (the touch answer to a centred dialog) |
| `Menu` | The action menu, on `Popover`. Arrows, Home/End, typeahead, Esc-returns-focus. `items` take `icon` (a glyph name), `kbd`, `checked` (→ `menuitemcheckbox`), `danger`, `separator` and `label` rows |

### AI — `components/ai/`

| Component | Purpose |
|---|---|
| `PromptInput` | The primary input. Enter sends, Shift+Enter newlines. `tools` `action`, or children to own the whole footer row |
| `Message` | One turn. `role` ai/user (user mirrors right in a bubble), `avatar`, `streaming` shows the caret |
| `SourceChip` | The citation atom — a numbered mono chip |
| `SourceList` | The provenance panel |
| `ConfidenceMeter` | Number **and** bar. Neutral ink below 60% |
| `AgentTrace` | `steps` with `pending`/`active`/`done`/`error` |
| `ToolCall` | One invocation — args in, result out, duration. `AgentTrace` says a step RAN; this says what it did. Collapsed by default, because an argument blob is evidence a user opens when the answer looks wrong |
| `DiffReview` | Accept or reject the model's edits per hunk. The gutter carries `+`/`−`/`~` as well as the ground, so it reads in greyscale — and the diff tokens are GROUNDS, the text on top stays `--lw-fg` |
| `Artifact` | The versioned side surface for generated output. `onEdit` is not decoration: it is where "an AI surface is never the only path to an outcome" is enforced |
| `Feedback` | Thumbs plus a correction path. A rating with nowhere to say what was wrong collects a number nobody can act on |

### Marketing — `components/marketing/`

| Component | Purpose |
|---|---|
| `Hero` | The hero band. On its own: navy ground, honeycomb texture, the mark oversized at the upper right. Inside `.lw-page-dark` it goes transparent and the page owns the background (`assets/hero-mark.svg`, `assets/hero-mark-ink.svg`, `assets/hex-lattice.svg`, `assets/hex-lattice-ink.svg` — copy all four) |
| `FeatureGrid` | Numbered features; the brand edge draws in on hover |
| `StoryCard` | The quote renders **only** with quote + person + role |
| `LogoRail` | Marks are masked to one ink; a mark without `src` degrades to a mono wordmark. `marquee` for a slow loop; static under reduced motion |

---

## Templates

Twelve starting points under `templates/`. Each is one `.dc.html` entry plus a `ds-base.js`
whose single `base` line points at this package.

| Template | What it starts |
|---|---|
| `marketing-landing` | One continuous ground — `.lw-page-dark` or `.lw-page-light`, fixed and centre-symmetric, switchable from the template's `theme` tweak: centred hero, features, grounded-answer proof, use cases, CTA, footer |
| `ai-app-shell` | Sidebar, ask surface with streaming answer and inline citations, sources + trace rail |
| `dashboard` | KPI tiles, sortable table, run log, empty state |
| `settings` | Sectioned settings with help/error patterns and a destructive-action block |
| `docs-page` | Three-column docs: nav rail, prose with code and callouts, on-this-page |
| `pitch-deck` | 1920×1080 deck on the LeanWise palette, one amber CTA at the close |
| `list-detail` | **List → detail → edit.** The back-office default: filtered list, detail rail, edit mode behind one unsaved-changes guard, bulk actions in a selection bar, and role-gated destructive controls |
| `search-results` | **Search + filter + results.** Faceted search, applied-filter chips, and three distinct states — no query yet, no results, results. Those first two are different screens |
| `onboarding-wizard` | **Multi-step form.** Validates on advance, never loses work going back, resumes from a draft, ends on a review screen that can still reach every field |
| `auth` | **Five auth screens** on one split layout: sign in, SSO/passkey, two-factor, accept-invite, reset — with the lockout and failure states |
| `export-report` | **Work that takes longer than a click.** Queue it, show row-based progress, choose a delivery, and make a failure retryable without rebuilding the request |
| `email` | **Transactional email.** A 600px table-based email that survives Outlook: literal values, padded-anchor buttons, one max-width breakpoint, and a plain-text version beside it |

### The patterns those templates settle

A component library is not a product kit; the decisions between the components are what
actually get re-litigated per team. Each template above exists to settle a set of them:

| Decision | Settled in |
|---|---|
| Detail in a rail vs. a drawer; unsaved-changes guard in ONE place, not per button | `list-detail` |
| Bulk selection bar REPLACES the toolbar (two rows where one was jumps the table) | `list-detail` |
| Role-gated UI: **disable and explain**, never hide — a hidden control reads as "the product cannot do this" and becomes a bug report | `list-detail` |
| Undo over confirm for reversible bulk actions; confirm stays for destructive ones | `list-detail` |
| Facets additive within a group, exclusive across; query and facets live in the URL | `search-results` |
| Empty ≠ no-results ≠ loading — three screens, three jobs | `search-results`, `StateView` |
| Validate on advance, not per keystroke; help text stands down when an error appears | `onboarding-wizard` |
| Draft persistence per change, not per step | `onboarding-wizard` |
| Never confirm whether an email has an account | `auth` |
| State the lockout rule BEFORE it fires | `auth` |
| Queue anything slower than a click; progress from rows done, not time elapsed | `export-report` |
| A failure names the row and the reason, and retries without a rebuild | `export-report` |

---

## The rules that are not obvious

**1. Ink is chosen by the fill's LIGHTNESS, not by whether it is "the brand".** Measured:

| | white text | navy `#0B1220` text |
|---|---|---|
| cyan `#0C727B` (brand) | **5.66** ✓ | 3.31 ✗ |
| amber `#FCB603` (CTA) | 1.77 ✗ | **10.54** ✓ |
| green `#16A34A` (success) | 3.30 ✗ | **5.69** ✓ |

The dark brand fill takes WHITE; the light CTA and status fills take NAVY. Never memorise
the outcome — re-measure when a fill changes, because the answer follows the lightness.
`lw-contrast-check.mjs` enforces every pair.

**2. A fill colour and a text colour are usually different tokens.** A colour bright enough
to fill a button is normally too bright to read as text. Use the role token, not a tier:

```tsx
<Button>Save</Button>        {/* bg-primary — the cyan FILL, white label */}
<a className="text-brand">   {/* theme-aware: brand-500 on light, brand-400 on dark */}
```
Same for `success`/`success-on`, `warning`/`warning-on`, `destructive`/`destructive-on`,
`cta`/`cta-on`. Every `-on` utility is theme-aware, so you never hand-write a conditional.

**3. `--primary` is cyan. Amber is a variant, not a token.** shadcn's `--primary` drives the
*default* Button, so putting amber there would make every button a CTA:

```tsx
<Button>Ask</Button>                             // cyan, the default, use freely
<Button variant="cta">Start free trial</Button>  // AMBER — max ONE per view (linted)
```

And the corollary that catches everyone: **shadcn's `--accent` is a hover *surface*, not a
brand colour.** Per-tenant themes override `--primary` and `--ring`; never `--accent`.

**4. Invalid state is driven by `aria-invalid`, not a class.** The attribute is what a
screen reader reads, so binding the colour to it makes the two impossible to desync. The catch
is a control whose frame is drawn by a PARENT: `InputGroup` put the attribute on the inner
input and drew the border on the wrapper, so through v1.0 an invalid group announced an error
that nothing showed. It selects with `:has()` now — still no class, still one source of truth.

**5. A field shows help text OR an error, never both.** A field with both is a field whose
error is easy to miss. `Field` enforces this at runtime.

**6. Direction is never colour alone.** A KPI delta and a stat delta carry an arrow icon as
well as ink; a toast carries a mono status word as well as a tint; a chip pairs a dot with
its tint. Every one of these survives greyscale and a colour-blind reader.

**7. Direction and judgement are separate props.** `KpiTile` takes `direction` (which way the
number moved — the arrow) and `tone` (whether that is good — the ink). They agree for revenue
and disagree for latency, so a component that fuses them paints every latency improvement red.

**8. One drawing, one owner.** No component redraws an icon it could name. `Message`,
`ThemeToggle`, `Dialog`, `Toast`, `CodeBlock`, `Table`, `KpiTile`, `StatMeter`, `EmptyState` and
`FeatureGrid` all import `Icon` and pass a name. A second copy of a path is a second thing to
keep in step, and it is always the copy that is a stroke-weight behind. This includes typed
glyphs: a `▲` in a delta string, a `→` in a link label and a `↑` from CSS `content` are all
icons drawn by the font instead of by the set, at the font's weight rather than the system's.

**8b. A chip class never lands on the glyph.** Box styling goes on a WRAPPER (`.lw-kpi-badge`),
because `Icon` writes its size inline and inline size outranks any class rule — a box rule that
lands on the svg paints a tinted 16px square instead of a 34px chip. Where both must be
supported, qualify the tag (`span.lw-kpi-icon`) rather than renaming, so the stylesheet and the
compiled component are never out of step at the same moment.

**8c. Alignment is grid columns, never padded text.** `Console` takes `cells`; a mono string
padded with runs of spaces only looks aligned in the source, at one width, until a value grows
past what the author counted. The same rule is why `Table` has a `num` column type instead of
right-padded strings.

**9. One control, one class.** v1.0 deleted `.lw-theme-toggle` and `.lw-code-tabs`: each was a
second implementation of a control the system already had, with its own radius and its own
selected state. `.lw-segmented` and `.lw-tabs` are the only ones now. Two treatments of one
interaction is not a style choice — it is a bug that takes a year to notice, because nothing
ever renders both side by side until someone builds a page that does.

---

## Email

`email.css` is a separate layer, and separate for a reason worth stating: **an email is not
a web page with fewer features.** It is a document rendered by thirty engines, several of
which predate flexbox, most of which strip `<link>`, and one of which renders through Word.

Three rules follow, and they are the opposite of the rules everywhere else here:

1. **Values are literal.** `var()` does not resolve in Outlook, and one that falls back to
   nothing paints black on black. Every value is the resolved hex from `tokens.css`, copied
   deliberately — so this file is a **second home for brand values** and must be regenerated
   when the palette moves. `lw-token-lint` skips it for that reason; the contrast gate is what
   guards the pairs.
2. **Layout is tables.** Not taste — Outlook has no flex and no grid.
3. **The classes are a convenience, not the contract.** Ship every rule that matters inline on
   the element too; this file is where the values are written down once for the inliner.

Buttons are padded **anchors** in a table cell, never `<button>` — a button element does
nothing in most clients, and a bare anchor gives a 15px tap target. The amber CTA takes navy
ink here for exactly the reason it does in the app: white on `#FCB603` is 1.77. And ship the
plain-text part: it is what a text-only client renders and what spam filters weigh.

## Mobile

Safe areas are tokens — `--lw-safe-top/right/bottom/left` — so a layout reserves the notch
and the home indicator without every component writing `env()` itself, and the fallback is
stated once. `env()` resolves to 0 on a desktop browser, which is correct: **the token is
additive, never a minimum**, so `calc(56px + var(--lw-safe-bottom))` is right on every device.

`BottomNav` is the destination bar; `Drawer side="bottom"` is the touch answer to a centred
dialog. Controls already reach 44px on a coarse pointer from the density tokens, so nothing
here needs a second touch rule.

**12. An AI surface is never the ONLY path to an outcome.** Every generated artifact has a
manual editor; every agent action has a manual equivalent. That is why `Artifact` takes
`onEdit` and why it is documented as required-in-spirit rather than optional — much cheaper to
assert once than to retrofit into seven components later.

---

## Responsive

Five breakpoints, declared as tokens so the value is quotable in a review:
`--lw-bp-sm` 480 · `--lw-bp-md` 768 · `--lw-bp-lg` 1024 · `--lw-bp-xl` 1280 · `--lw-bp-2xl` 1536.

Every hand-written media query in the CSS layers uses one of those five numbers and
nothing else — audited, and it now holds: v1.0 shipped three queries at 860px and 900px
(the iOS zoom guard, the feature-grid collapse, the centred nav) that answered to no token.
The zoom guard and the centred nav are at `md`, the feature grid at `lg`. A media query cannot
read a `var()`, so each one writes the number and names its token in a comment — that comment
is the only thing tying the two together, which is why it is not optional.

Only `md` and `lg` are load-bearing today; `sm`, `xl` and `2xl` are declared and unused. That
is deliberate — a layout that needs one has a token waiting, and an undeclared number in a
review is the thing to catch, not an unused declared one.

Most layouts need no query at all: `Grid` auto-fits, `Cluster` wraps, `Split` collapses at
`--lw-bp-lg`. Controls reach a 44px target on a coarse pointer without changing the desktop
size, so density and the touch minimum are not forced to be one number.

## Charts

Eight categorical series, `--lw-chart-1..8`, and they are not a rainbow. The first three
are the brand's own family — cyan, navy, amber — because a one- or two-series chart is the
common case and it should look like this product. The rest are spaced by hue **and** by
lightness, so they stay apart in greyscale and to a colour-blind reader. Every series lifts a
tier on the dark ground, the same reason the focus ring switches to brand-400 there.

`--lw-chart-N` is a **fill**. Label a slice in `--lw-fg`, not in its own series colour — and
rule 6 still holds, so a chart carries direct labels or a pattern, never colour alone.

**The policy, so it does not have to be re-argued:** `BarChart` and `LineChart` are ~120 lines
of tokenised SVG each, with a hidden data table. That is the right trade for a dashboard — no
dependency, no bundle cost, the correct palette by default — and it will not survive brushing,
zoom, mixed axes or stacked-and-grouped. **The trigger to adopt a real charting library is the
third chart type, not a feature request on the first two.** Say no to the scatter plot rather
than growing these two files into a library nobody chose.

## Motion

Restrained by policy: 100–200ms on state change, no entrance choreography, and nothing that
moves without the user causing it. The three ambient exceptions are all *signals* — the
skeleton shimmer, the streaming caret, the active trace dot — and each has a static fallback.
`marketing.css` ships opt-in motion (scroll fade, spotlight, shine, aurora,
tilt, marquee), double-gated behind `@supports (animation-timeline: …)` and
`prefers-reduced-motion: no-preference`; the static state is always complete.

Durations: `--lw-dur-xs` 100 · `sm` 180 · `md` 240 · `lg` 400 · `xl` 800.
House curve: `--lw-ease-out: cubic-bezier(.22,1,.36,1)`.

## Accessibility

WCAG AA on every token pair, enforced by the contrast gate — **measured, 35/35 pairs in both
themes**, in a browser against the real cascade rather than a parse of the file. Three holes
that the pair list could not see, because in each case the pair was right and something else
was wrong:

- `--lw-fg-faint` measures **2.54** on white. tokens.css has always declared it decorative,
  and 14 rules in the CSS layers used it as text anyway — nav group labels, breadcrumb
  separators, tab counts, prompt hints, trace and source metadata, placeholders. All now take
  `--lw-fg-subtle` (4.83). `fg-faint` survives only on `:disabled` states, which WCAG exempts
  and which are meant to read as unavailable, and on the three places it is a fill or a border.
- The `--lw-on-*` ink **channels** pointed at role tokens (`var(--lw-text-1-c)`). The derived
  colours were theme-safe by accident — substituted at `:root`, so frozen to the light palette
  — but a Tailwind consumer composing `hsl(var(--lw-on-cta-c))` inside a dark scope re-resolved
  `text-1` to near-white and put 1.77 ink on the amber. They are literal triples now: a fill
  that does not follow the theme cannot take an ink that does.
- `--lw-neutral-text` had a derived colour while its three siblings had only channels. Those
  tiers are light-theme values (2.42–2.89 on the dark paper), so the derived name was an
  invitation to fail silently on dark. None of the four has one now; `--lw-success-on` and its
  siblings are the theme-aware roles, as rule 2 already said. Every interactive component
ships a visible `:focus-visible` ring (the ring switches to the brand-400 tier on dark,
where the 500 ring disappears into the navy), correct ARIA, and full keyboard operation —
`Tabs` implements roving tabindex and moves focus with it, `Dialog` delegates the focus trap
to the platform and generates its own label ids, `Field` wires `aria-describedby` /
`aria-invalid` and names `required` for a screen reader, `Toast` distinguishes `alert` from
`status`, `ConfidenceMeter` and `StatMeter`'s bar carry `role="meter"` with real values, and
a `Button` that is `loading` keeps its focus ring but refuses the click.

Nothing is focusable without a role. `StatMeter interactive` renders a `<button>` rather than
a `<div tabindex="0">`, and a `SourceList` entry with no URL renders as a button rather than an
`<a>` with no `href` — an anchor without a target is not reachable by keyboard and is not
announced as a control.

## Enforcement

```bash
npm run check        # the four fast gates — what a contributor runs
npm run check:ci     # the above plus the two that need a browser

npm run check:contrast   # every token pair ≥ WCAG AA
npm run check:tokens     # raw hex, palette escapes, arbitrary-value access, >1 CTA
npm run check:themes     # every themable CHANNEL re-pointed in every theme scope
npm run check:dts        # react.d.ts covers every runtime export of react.js
npm run check:a11y       # axe over every card, both grounds (serious/critical fail)
npm run check:visual     # every card × light/dark × comfortable/compact
npm run tokens           # tokens.css → tokens.json (DTCG, for Tokens Studio)
npm run dts              # react.js → react.d.ts (generated, committed)
```

**`check:dts` exists because the barrel had two homes for one fact.** `react.js` is the
runtime export list; `react.d.ts` was hand-written beside it and drifted — four re-exports
named a sibling's file, which broke `npm run build` outright, and thirty-one components had
no types at all, which broke only the consumer. The generator joins `react.js` to each
component's own `.d.ts` so neither can drift from the other again.

**`check:themes` exists because of a specific bug in this system's history.**
`--lw-neutral-text` had a derived colour while its three siblings had only channels, so it
silently froze to the light palette on dark. A generator that walks all the theme scopes is
the cheapest place to catch that class of thing, and it is the same pass that emits the
Figma tokens — one generator, no hand-maintained second copy.

**`check:visual` is nearly free because the cards already exist.** They are the right fixture
set — one per folder, plus a state matrix where there is a state axis — and shooting each on
both grounds AND both densities is what protects the CSS layers from each other. A
change that only breaks compact-on-dark is exactly the one no human notices. A missing
baseline records rather than fails, so adding a card never breaks the PR that adds it.

**But the gate cannot currently fail in CI, and never has.** `.visual/` is gitignored, so
every CI run has 136 missing baselines, records all of them, and compares nothing. It is
genuinely useful locally for a before/after within one session, and it says so out loud
rather than printing "no visual change". Making it real in CI means recording the baselines
inside the CI image — not committing this box's, which would make CI permanently red rather
than green, because a byte-exact PNG match is only valid on the machine that recorded it.

**`check:a11y` closes the one hole the contrast gate cannot see.** That gate proves token
PAIRS in isolation; axe proves the palette as actually composed, plus rendered ARIA — a role
that is wrong in composition, a control with no accessible name, a heading order that only
breaks inside a card.

The scripts live in `templates/_tooling/` because every other directory is compiled into the
browser bundle and a Node script cannot be. Through v1.0 they resolved the package root one
level up from there — i.e. `templates/tokens.css`, a file that has never existed — so the gate
this section calls load-bearing could not actually run. Fixed, and reached through
`npm run check` so no consumer has to know the path.

The lint fails on raw hex, on Tailwind palette escapes (`bg-emerald-500`), on arbitrary-value
token access (`bg-[hsl(var(--primary))]` — use `bg-primary`), and on more than one
`variant="cta"` per view. **It is the load-bearing part of this package.** A shared token file
does not make products consistent on its own; nothing stops a dev writing `bg-emerald-500`
next to it.

---

## Adding a component

The checklist, in order. A component that skips a step is the one that drifts.

1. **Prove it is not already here.** Two treatments of one interaction is not a style choice —
   it is a bug that takes a year to notice, because nothing renders both side by side until
   someone builds a page that does. `.lw-theme-toggle` and `.lw-code-tabs` were both deleted for
   this reason.
2. **Write the CSS first**, in `base.css` (shared), `marketing.css` or `product.css`, against tokens only —
   no raw hex, no raw px outside the icon scale. The component must render correctly as plain
   HTML with those classes and no JavaScript at all.
3. **Add `Name.jsx` + `Name.d.ts`** side by side in the right folder. The JSX is a thin wrapper
   that emits those classes and holds no styling of its own, so the React and vanilla consumers
   cannot drift apart.
4. **Name an icon, never draw one.** `import { Icon } from "../primitives/Icon.jsx"` and pass a
   name. If the glyph does not exist, add it to `Icon.jsx` and to the `IconName` union — once.
5. **Both grounds.** Check it on light and on `.lw-band-dark`. A component that only works on one
   is not finished.
6. **Keyboard and ARIA before visuals are final.** Real roles, a visible `:focus-visible` ring,
   and nothing focusable without a role or a key handler. Status is never colour alone.
   - The ring is **solid**, never a translucent halo. `var(--lw-focus-ring)` is a 2px brand band;
     `--lw-focus-ring-danger` is its error twin. A washed ring has no defined edge, so it reads as
     a glow, and being translucent it mixes with whatever ground sits behind it — one ring then
     looks like a different colour per surface.
   - **On a brand-filled control, use `outline` + `outline-offset: 2px` instead** — checked switch,
     checked checkbox/radio, filled buttons. A brand ring flush against a brand fill is 1:1
     against it and reads as the control getting 2px bigger. The gap must be *transparent* so it
     shows the real local ground, which is why it is an outline: a transparent box-shadow layer
     paints nothing (it does not mask the layer beneath), and a gap painted from `--lw-bg` would
     show a white sliver on every `bg-subtle` surface.
7. **A pointer cursor is a promise.** Everything clickable gets `cursor: pointer` from the
   consolidated list at the foot of `base.css`; nothing inert does. A KPI tile and a table row stay
   `auto` — a pointer over text that does nothing is a lie. Watch declaration ORDER: a later
   `cursor: default` on a base class silently cancels `.lw-card-interactive`, which is how the
   interactive `StatMeter` lost its pointer for two releases.
8. **Re-export from `react.js`**, so the component is reachable at
   `@leanwise/design/react` — there is no deep path into `components/`.
9. **Add it to the folder's composition card**, and give it a state card of its own if it has a
   state axis (rest / hover / invalid / disabled) a composition cannot show.
10. **Update this README's table.** An undocumented component is one a consumer will rebuild.
11. **Paint from ROLES, never raw tiers.** `--lw-fg`, `--lw-fg-subtle`, `--lw-bg`, `--lw-bg-subtle`,
    `--lw-line` re-point under every theme scope; `--lw-text-1`, `--lw-surface-1`, `--lw-border-1`
    do not. A raw tier looks correct on light and silently freezes on dark — and it is worse when
    only *part* of an element uses one, as when a status dot's fill re-pointed and its halo did not.

---

## Logo

`assets/` holds the brand logo, and **this package is its source of truth**:

```
assets/logo-mark.svg        the hexagon mark, brand gradient — for light grounds
assets/logo-mark-mono.svg   the same geometry in currentColor — for dark grounds
assets/logo-lockup.svg      mark + LEANWISE AI wordmark
assets/logo-lockup-ondark.svg  the lockup with the wordmark in white — dark grounds
assets/logo-icon.png        raster fallback of the mark (favicons, apple-touch-icon)
assets/logo-leanwise.png    raster fallback of the lockup (JSON-LD, crawlers)
```

**Geometry** is an autotrace of the master art (IoU 0.991 mark, 0.975 wordmark) — re-trace
only when the art changes, never hand-edit the paths. **Colour** is resolved from `tokens.css`
at build time — regenerate after any brand or navy change, never hand-edit an SVG.

**The gradient stops are literal hexes.** CSS custom properties do not cascade into an SVG
loaded through `<img>`, so a `var()` there renders its fallback forever. That makes the SVG a
second home for a brand value, and `lw-contrast-check.mjs` fails if the two disagree —
`lw-token-lint` cannot see inside `.svg`, so that gate is the only thing guarding it.

**The mark's cyan is not `brand-500`.** `--lw-logo-cyan` (`#0A8799`) exists purely for artwork
and no UI rule may consume it: it is too dark to read on the navy paper (4.06) and too light
to carry white ink (4.25). `brand-500` is ~5 points darker so white ink clears AA — a
compromise the logo does not have to make, because a logo carries no text.

**The gradient variant is never tinted.** Do not run `logo-mark.svg` through `--primary`, a
CSS `filter`, or tenant `brandVars()`. When the mark must take the surrounding ink, use
`logo-mark-mono.svg`, which is `currentColor` by design — and note it must be **inlined or
used as a CSS `mask`**: `currentColor` inside an SVG loaded through `<img>` resolves against
that SVG's own root, not your document, so it would paint black.

---

## Per-tenant theming

```tsx
import { brandVars } from "@leanwise/design/brand";
import { useTheme } from "@leanwise/design/hooks";

const { resolved } = useTheme();
<div style={brandVars(org?.accent, resolved)}>…</div>   // the workspace, not <html>
```

Returns `{}` when there is no tenant colour, so tokens fall through to LeanWise cyan —
**there is no "no-brand" state**. Tenant hexes are clamped (lightness to 20–50%, saturation
floored at 26%) because a customer will eventually pick `#FFFF00`, and the ink
on top is chosen from the *clamped* colour by measured luminance — `brandRamp()` exposes
that decision, `clampedHex()` the colour actually painted, `isInBand()` whether the clamp
moved anything (show the customer, don't silently correct them). A grey or black pick has no
hue to honour, so it falls through to cyan rather than have a hue invented for it — flooring
the saturation of `#888888` would ship a red-brown nobody chose.

The second argument is the **resolved** scheme, and it decides one thing: which tier answers
as brand *text* (500 on light, 400 on dark). The fill tiers are theme-agnostic. Pass
`useTheme().resolved` and it re-renders on a theme change.

**Why the function returns both channels and derived colours.** A custom property is
substituted at computed-value time on the element that *declares* it, so `--lw-brand-500`
— declared at `:root` — resolves against `:root`'s channel and inherits as a finished
colour. Overriding the channel on a subtree does not move it. Values read *through* `var()`
at use time (the alpha mixes, `hsl(var(--primary) / .15)`) do follow. Both are set.

---

## Why colours are authored as HSL triples

```css
--lw-brand-500-c: 185.0 82.0% 26.5%;          /* authored */
--lw-brand-500:   hsl(var(--lw-brand-500-c)); /* derived  */
```

The triple exists because Tailwind composes `hsl(var(--primary))` and needs bare channels;
the derived value exists because vanilla CSS needs a real colour. Holding H/S/L as separate
numbers is also what lets `brandVars()` synthesize tints at runtime. Edit the triple; never
the derived line; never a hex in an app.

## Spacing is named by value

`--lw-space-24` is 24px. Always. An index name states nothing about its value, so two scales
a hyphen apart can mean different pixels and read as identical.

## Density

That rule is also what stops density living in the space scale: re-pointing `--lw-space-24`
to 16px in compact mode would break the one promise the token's name makes. So density is a
**second, semantic layer that consumes the literal scale**. The px scale is what you compose
from; these are what components paint with, and only these move:

`--lw-control-h-sm/md/lg` · `--lw-field-pad-x` · `--lw-row-h` · `--lw-cell-pad-y` ·
`--lw-card-pad` · `--lw-stack-gap`

```html
<div data-density="compact">   <!-- a grid, a rail, a workspace — not <html> -->
```

**It scopes, it does not globalise**, the same way `brandVars()` goes on the workspace. A
dashboard is compact in its table and comfortable in its filter bar, and that is correct.

**The 44px coarse-pointer minimum overrides density, never the other way round** — and it is
set on the TOKEN in `tokens.css`, not on each control, so it reaches every control that reads
the token including the ones not written yet. Compact is a desktop affordance; the hand does
not get smaller because a table wants more rows. The corollary: **never write a control height
in a `@media (pointer: coarse)` block again** — a height on the control outranks the token the
touch block already lifted, which is the bug that guard is there to prevent.

Marketing bands read none of these; a hero has one size. `.lw-btn` does read them, because a
button in a compact toolbar is a control, not a band — a marketing page sets no density
attribute, so it resolves to the 40px default and nothing there moves.

### What density reaches, and what it does not

Deliberate, and worth knowing before you set the attribute on a whole workspace and expect a
uniformly denser app.

| Responds to `data-density` | Does not |
|---|---|
| `.lw-input` `.lw-select` `.lw-textarea` `.lw-input-group` `.lw-combo` | `.lw-topbar` (56px) |
| `.lw-btn` and every size | `.lw-nav-item`, `.lw-sidebar` |
| `.lw-dgrid` rows and header, `.lw-menu-item`, `.lw-option` | `.lw-avatar`, `.lw-msg-avatar` |
| `.lw-card` padding, `Stack` gaps, `.lw-cal-preset` | `.lw-toast`, `.lw-kpi-badge` (34px), `.lw-source` (18px) |

**The chrome staying put is the point, not an oversight.** A compact table inside a
comfortable shell is the common case and it is what reads correctly — a 32px top bar looks
broken, and an avatar that shrinks with a table makes a person's face a density setting.
Extend the tokens into the shell only when a product asks for it, and add the row to this
table when you do.
