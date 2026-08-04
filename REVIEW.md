# LeanWise Design — review

Standing audit. `CHANGELOG.md` records what moved; this file records what is true, what is
still open, and why. Re-read it before touching the CSS layers or the gates.

**Scope:** the token core and five CSS layers, the React barrel and its components, the gates,
packaging, the twelve templates and the specimen cards.

Counts are deliberately not restated in prose — `npm run check` prints them all. A number in a
document is a second home that goes stale, and this line has proved it twice: it read "83
exports … 5 gates" when the barrel exported 82 and there were six, and then "442 tokens, eight
theme scopes" against an actual 283 across twelve.

**Last pass:** v1.3.1, which found that the promotion v1.3.0 called finished was not, that the
specimens which should have said so were loading the file the documentation tells consumers to
drop, and that the package's own hero had never established the token scope it paints.

---

## Verdict

**v1.3.1 is the pass where the recurring shape stopped being a story about gates and became a
story about FIXTURES.** v1.3.0 declared the layer promotion finished and the README said a
marketing page needed two stylesheets. Both browser gates agreed — because
`marketing.card.html` and `site-chrome.card.html` were themselves loading `product.css`. A
specimen that loads the file its documented recipe tells you to drop cannot see anything
stranded in it, no matter how good the gate reading it is. Deleting one `<link>` from two cards
found five more stranded components, one of which (`.lw-icon`, the entire layout contract for
the icon set) nobody had reported and nobody found by reading.

The second finding is worse, because it is a gate that cannot fail for a reason no amount of
care would have surfaced. `.lw-hero-dark` painted navy without establishing the dark token
scope, so a `Byline` in a hero rendered at **1.5:1**. `check:contrast` could not see it — both
tokens in the pair are correct, it is the SCOPE that is wrong, which no pair can express. And
`check:a11y` could not see it either: the hero carries two decorative pseudo-elements, so axe
answers *"background color could not be determined due to a pseudo element"* and files it as
`incomplete`, which `lw-a11y.mjs` does not read. **Four serious incompletes, zero violations.**
Every hero in every consumer sits behind that hole. A new band-scope rule in `check:contrast`
now states the invariant directly, and was watched failing.

The system audits itself to a degree it did not before — **and v1.3.0 was the pass that proved
the qualifier still matters.** Two of the gates this file most trusted, `check:a11y` and
`check:visual`, had been reporting green on **26 blank cards for two minor releases**, and the
first thing the repaired bundle produced was four serious `color-contrast` failures at 2.28:1 on
a control that had been shipping that way the whole time. The defect was not in the gates'
*logic*; it was that the one thing a browser gate has to establish first — *did the specimen
render?* — was asserted by a test that could not fail.

That is now the fourth gate in this repository found to be a hypothesis rather than a gate
(byte-exact PNG comparison, the missing templates gate, the un-generated bundle, and this). The
pattern is stable enough to plan around: **when you add a gate, sabotage the thing it watches
and confirm it goes red, in the same sitting.** Both v1.3.0 gate changes were watched failing
before they were trusted.

What is left is genuinely small and mostly judgement. There is no known correctness bug in what
ships to a browser today — but that sentence was also true of the last two audits, and it was
wrong both times for the same reason.

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
- **`check:a11y`'s render guard was `innerText.length > 0`.** Every card wraps its React roots
  in explanatory prose, so the guard passed on prose alone — the demo case (a card that renders)
  and the failure case (a card that does not) are indistinguishable to it. It reported 39 cards
  clean while inspecting the copy around 26 holes.
- **`.lw-btn` had no `background` of its own**, and every variant that *does* declare one hid
  it. Only the two with no fill — `link`, and a bare `.lw-btn` — showed the UA button face, so
  nine of ten variants demoed perfectly.
- **The marketing specimens loaded `product.css`.** The card that exists to prove a marketing
  page needs two stylesheets was loading three. Every stranded rule rendered perfectly in the
  demo and unstyled in the consumer.
- **`.lw-hero-dark` patched the four elements anyone puts in a hero** — `.lw-h1`, `.lw-lead`,
  `.lw-eyebrow`, `.lw-btn-ghost` — and left the whole role-token system resolving light on
  navy for anything else. The demo hero is the one hero that cannot fail.

In every case the demo path (a class on `<html>`, a light-mode screenshot, a fresh checkout,
a card with prose in it, a filled button) worked perfectly. **Test the path nobody demos.**

---

## Closed in v1.3.0

Full detail in the CHANGELOG. What is worth carrying forward:

### The two browser gates were measuring nothing, and one live defect fell out of fixing them

- **Every React specimen card rendered blank from v1.2.0 to v1.2.1.** esbuild's `jsx` API
  option is only a default; v1.2's new `tsconfig.json` (`"jsx": "react-jsx"`, correct for
  `tsc`) overrode it per file, so every component emitted `react/jsx-runtime` imports and threw
  `TypeError: import_jsx_runtime.jsx is not a function`. `check:a11y` scored the prose around 26
  empty roots; `check:visual` compared two equally blank plates. Fixed with `tsconfigRaw` in
  `lw-bundle.mjs`, and the guard rebuilt: an uncaught page error fails the card, and every
  `createRoot` container must end up with an element child. Watched failing on the replanted
  defect.
- **`.lw-btn` declared neither `background` nor `border`**, so a page loading `base.css`
  without a reset got the UA bevel on every button and the UA `buttonface` behind
  `.lw-btn-link` — **2.28:1** under `color-scheme: dark`, four serious axe failures in the
  rest and hover cells. This is a *consequence of the v1.2.0 reset split*, not of the link
  variant's tokens, and it establishes a rule the layers now follow: **a property carrying a
  colour is `base.css`'s to state; geometry may lean on the reset, because geometry fails
  visibly.** No `data-a11y-expect` opt-out was added — the state is reachable — so the
  exemption count stays at one.
- **`lw-visual` had no image-decode wait**, so a per-theme `background-image` raced the dark
  shot (0.0293% drift measured, floor 0.0002%). The first fix had been to delete the logo from
  the card; that is the wrong direction and is reverted. Three full runs now agree to 0.0001%.

### The layer promotion finished

`fb2d3ad` moved layout, the form controls and `.lw-topbar` into `base.css` but left their
`:is(.dark, …)` patches behind, on the correct observation that their *position* is not
load-bearing. v1.3.0 moved them anyway, with `.lw-icon-btn` (split from `.lw-dialog-close`,
which stayed as a delta) and `.lw-eyebrow`'s dark hexagon patch. **Position is not
load-bearing; presence is** — a page that never loads the file never sees the rule at
whatever specificity. A marketing page now needs `base.css` + `marketing.css` and nothing else,
which was the whole objective.

---

## Closed in v1.3.1

Full detail in the CHANGELOG. What is worth carrying forward:

### A specimen must load exactly what its documented recipe loads

Five components — `Avatar`, `EmptyState`, `Tabs`, `Pagination` and `Icon` — were still in
`product.css`, so the package's own article-index recipe rendered unstyled anywhere it was
followed. The flagship consumer had a `?url` import of `product.css` on two public routes as a
workaround. The rule this establishes is not about layers, which v1.3.0 already covered; it is
about fixtures: **a card that loads more than its recipe cannot measure the recipe.** The
`.lw-icon` find is the proof — one rule, reachable from ten marketing components, invisible to
every gate and every reading, found by `check:visual` within minutes of the `<link>` coming out.

### A contrast trap two gates were structurally unable to see

`.lw-hero-dark` was never in `tokens.css`'s band list. `check:contrast` measures token PAIRS
and both tokens were right; `check:a11y` files any contrast finding inside the hero as
`incomplete`, because the hero has decorative pseudo-elements and axe will not guess a
background it cannot resolve. So the surface with the most decorative machinery in the package
was also the one surface where the a11y gate was silent. The new band-scope rule in
`check:contrast` closes it by stating the invariant instead of measuring the render, and was
watched failing on the restored defect.

### A component library must not hold display text

~70 user-visible English literals across 25 components, none reachable by a prop. All are props
now, defaulting to what they replaced. The API rule worth keeping: **anything that interpolates
a number is a `format*` function, never a template with the number in a fixed position** — a
translation reorders the parts, so a `prefix`/`suffix` pair is the same bug one layer down.

### `HTMLAttributes<HTMLElement>` omits `type`

Four components (`Button`, `Card`, `SourceChip`, `NavItem`) render a `<button>` on a props base
that has no `type`. Three of them already emitted `type="button"` and already honoured an
override at runtime; the prop simply did not compile. `Button` emitted nothing, so a Cancel
button submitted the form. Worth remembering as a class: `React.HTMLAttributes<HTMLElement>` is
the right base for a POLYMORPHIC component and the wrong base for anything that can be a form
control, and TypeScript reports the gap at the call site rather than in the library.

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

### 5. `.lw-editor-body` is still a second treatment of `.lw-prose` — de-dup SKIPPED, deliberately

`product.css`'s `.lw-editor-body` (the `RichText` surface) and the new `.lw-prose` are two
treatments of one thing: a block of authored rich text sized on the type scale. The v1.3.0 plan
was to group the editor's selectors onto the `.lw-prose` blocks and reduce `.lw-editor-body` to
its editor-only delta. It was **not done**, and the reason is worth recording rather than
re-deciding:

- The convergence is a real visual change to `RichText` — `h2` moves from `--lw-text-h3` to the
  h2 step, block spacing from `0.7em` to `--lw-space-20`, line-height from 1.65 to
  `--lw-lh-relaxed`, list indent from `1.4em` to `--lw-space-24`, and the surface gains a 68ch
  measure it does not have today.
- It also requires `RichText.jsx` to emit `className="lw-prose lw-editor-body"`, and a `.jsx`
  edit is only visible to the two browser gates after `npm run bundle`. So the change would have
  landed with its verification deferred — the one shape this repo has paid for repeatedly.

Do it in one commit, with the bundle regenerated in the same commit, and read the `RichText`
card's diff rather than the gate summary. Until then the duplication is known, bounded and
recorded here, which is better than a half-verified merge.

### 6. `_ds_manifest.json`'s `components` array had gone 12 entries stale

Found while verifying the manifest against the filesystem for v1.3.0. The `cards` array — the
load-bearing half, since both browser gates enumerate from it and `_cards.mjs` cross-checks it
in both directions — was clean, with all four marker attributes matching byte-for-byte. The
`components` array was not: it was missing the entire v1.3.0 component set. Refreshed by hand
here, which is exactly the treatment open item 1 says it should stop needing. Two non-barrel
names (`CHART_W`, `CHART_PAD`) and `chart-parts.jsx`'s losing `Grid` are still absent by
design — the array describes the namespace surface, and `lw-bundle.mjs` already computes that
list. **Fold it into the bundle generator and this item and item 1 both close.**

### 9. `Button`'s `type` default is still HTML's `submit` — a v2.0.0 candidate

`Card`, `SourceChip` and `NavItem` all default to `type="button"`; `Button` defaults to
nothing, i.e. `submit`. That inconsistency is the house rule being applied everywhere except
the one component it matters most for. It was NOT changed in 1.3.1 on purpose: flipping it
would silently stop `<form onSubmit>` + `<Button>Save</Button>` from submitting, and a silent
no-op is a worse patch-release failure than the wrong-op it replaces. Change it at the next
major, together with the `readMinutes` removal.

### 10. `product.css` overrides the token band's default ink, and the two disagree

`product.css` carries `.lw-band-dark, [data-band="dark"] { color: var(--lw-on-dark-2) }`, which
outranks `tokens.css`'s band block (`:where(…) { color: var(--lw-fg) }`, specificity 0). So the
SAME dark band renders one default ink on a marketing page (base + marketing → `--lw-fg`,
15.78:1 on the footer ground) and a dimmer one in an app (base + product → `--lw-on-dark-2` at
70% white, 9.42:1). Both clear AA comfortably, so nothing is broken — but it is two treatments
of one thing, decided by which layer you happen to load, which is the shape CONTRIBUTING's
first rule exists to catch.

Measured, not guessed: it is the entire remaining delta on `site-chrome.card` in the 1.3.1
visual run — 733 pixels, 8 inherited nodes, all of them `color`. Resolving it moves pixels on
every dark band in every consumer either way, so it is a minor, not a patch. The likely answer
is to delete the `product.css` rule and let the role win, since a raw `--lw-on-dark-2` tier
overriding a role is the thing rule 11 of the README already forbids.

### 11. `lw-visual`'s `decoded()` is not airtight

v1.3.0 added an image-decode wait and recorded three runs agreeing to 0.0001%. During the
1.3.1 accounting, ONE scaffold recording of `site-chrome.card__light` showed an extra 726-pixel
band on `.brand-mark` — the per-theme background image, the exact flake `decoded()` exists to
close. It did not reproduce: re-recording gave the same 733 px as the other three shots, and
three self-consistency runs of the working tree agree to 0.0001%. So the residual rate is
roughly **one bad shot per 312 recordings** on this box, and it lands on the one element whose
image is swapped by the theme flip. Not worth a fix on this evidence; worth recording, because
the next unexplained 0.03% on a card carrying the mark is probably this and not a regression.

### 7. Smaller

- **Nothing gates the *geometric* half of the reset leak.** `check:a11y` now catches a UA
  colour reaching a `.lw-*` control, because a colour is contrast. It cannot see the `2px
  outset` bevel that the same gap put on every button — that was found by a one-off sweep of
  every computed style on all 39 cards, not by a gate. The sweep is cheap and could become one
  (fail on `border-style: outset|inset` or a `buttonface` background inside a `.lw-*` subtree);
  it was not added here because `.lw-btn` was the only offender and a gate with one known
  subject is hard to keep honest. If a second one appears, build it.
- **`check:a11y` reads `violations` and not `incomplete`, and that is a real blind spot with a
  known shape.** axe files a contrast finding as `incomplete` whenever it cannot resolve the
  background — most often *"could not be determined due to a pseudo element"*. Every decorative
  surface in this package (the hero, the grounds, the aurora) is therefore a hole in the a11y
  gate, not a gap in its rules. The 1.3.1 band-scope rule covers the hero case by asserting the
  token scope instead of the render; nothing covers the general case. Promoting `incomplete` to
  a failure is not the answer — it is mostly noise — but a report of incompletes *by card*,
  reviewed per release, would have surfaced this years earlier.
- **This release legitimately moves 52 of 136 visual shots**, so its CI run needs `[visual-ok]`
  in the head commit message. Every one is accounted for in the release notes: 48 are the
  removed UA button bevel, 4 are `marketing.card`'s and `Icon.card`'s intended content growth.
  An override is only honest when the accounting exists — do not carry the marker forward into
  the next commit.
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

### 8. The consumer bump, which is now a real plan rather than a warning

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
  planted bad card reference, the visual gate on a real pixel change; in v1.3.0, the rebuilt
  a11y render guard on the replanted jsx-runtime defect (it named the exact `TypeError` on the
  first card it reached) and the new advisory's `derive` on a deliberately wrong count. A gate
  nobody has seen fail is a hypothesis, not a gate — this repo has now shipped **four** of
  those, and each one hid a defect for months. The a11y render guard is the newest and the
  worst: it hid a defect that made *two other gates* meaningless at the same time.
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

No gate can see the *Carried forward* section, or Open 2, 3, 4, 5 and 8 — architecture, vendoring,
API shape and release planning are judgement. That is why this file exists and why the audit is
worth repeating by hand each release.
