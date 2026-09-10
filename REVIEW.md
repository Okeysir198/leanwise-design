# LeanWise Design — review

Standing audit. `CHANGELOG.md` records what moved; this file records what is true, what is
still open, and why. Re-read it before touching the CSS layers or the gates.

**Scope:** the token core and five CSS layers, the React barrel and its components, the gates,
packaging, the ten templates and the specimen cards.

⚠ **Read items 12 and 13 before deleting any CSS.** The v3.0.0 sweep nearly deleted three live
public classes, and the three rules that stopped it are written down in 13 — they are not obvious
and they are not derivable from a grep.

Counts are deliberately not restated in prose — `npm run check` prints them all. A number in a
document is a second home that goes stale, and this line has proved it twice: it read "83
exports … 5 gates" when the barrel exported 82 and there were six, and then "442 tokens, eight
theme scopes" against an actual 283 across twelve.

**Last pass:** v3.1.5 — see the verdict below. **Previous passes:** v3.0.1, v2.0.0, v1.13.0. It found a `:root[data-theme="dark"]` block that was value-identical to
`.dark, [data-theme=dark]` and had been maintained in parallel for the life of the package; 25
derived roles that stayed on the PAGE theme inside `.lw-page-dark` because that ground joined
the band list in v1.4.0 and never joined the re-derive list (the demo writes `class="dark
lw-page-dark"`, so it carried the fix by hand — advisory `page-dark-derived-roles`); a CI
workflow running six of the gates `npm run check` runs, from its own hand-kept list; and the
ground specimen card that three releases of this file said was needed and that did not exist.
Every one of those is the same shape as the earlier passes, and the fixes are the same shape
too: a rule that states the invariant (`rederiveCompleteness`, the root-block refusal, the
`doc-count` and `readme-coverage` lint), a fixture that renders the path nobody demos
(`ground.card.html`), and one list instead of two (`package.json#scripts.check`, and
`templates/_shared/` in place of twelve copies).

---

## Verdict

**v3.1.5 is the pass where the recurring shape appeared in the PALETTE, and the demo that could
not fail was a swatch row.** The light lifts `--lw-surface-1..3` shipped at hue 45° and 2.5–7.1%
below a pure-white page in v1.13.0 — a cream, and a cream that far from white does not read as the
same paper lifted, it reads as a beige patch on a cold screen. Every recessed ground in the system
wore it: sidebar, table head, segmented shell, KPI, filter chip, `code`, user bubble, menu and row
hover. It shipped through three minors and was reported from outside, not by a gate, and the reason
is the one this file keeps writing down: **`colors-neutrals` demos the tiers as a ramp of adjacent
swatches, which is the one arrangement in which a tier cannot look wrong.** A ramp answers "do
these step evenly"; nobody had ever rendered a tinted ground and the page ground in one frame,
which is the question a consumer's screen asks on every load. `preview/colors-surfaces.html` now
does, and it is a fixture rather than a rule for the same reason as `ground.card.html`: the defect
is a judgement about a relationship, and no ratio expresses it. Contrast could not have caught it —
every pair involved passed, and the fix (all three tiers lighter, hue 38°) *raised* the
`--lw-text-3` floor from 4.61 to 4.75.

Two second homes came with it, both the same shape as the v3.0.0 `email.css` finding.
`shadcn.css` set `--card` and `--popover` to `--lw-bg-subtle-c` on light directly under a comment
reading "the same as the page on light, and LIFT on dark" — **the prose and the value disagreed in
adjacent lines, and the prose was right**; every shadcn Card, Popover, Dialog and Sheet painted a
tint on an untinted page. And `PitchDeck` / `Email` carried a cool blue-grey literal set (`#F6F8FB`,
`#DDE3EC`, `#CBD3DE`, `#42506A` …) that no token accounts for, beside `#FFFFFF` slides from the same
files. `check:contrast` asserts `email.css`'s literals in both directions since v3.0.0; **nothing
asserts a `.dc.html` template's literals in either direction**, and item 2's note that the templates
are read as text rather than rendered is exactly why. That is the next rule worth writing: a
template literal that is not a token value, or is a token value under the wrong role, is mechanically
findable in text — no runtime needed.

**`dist/` stays committed here, and that is not negotiable by tooling.** The Claude Design
project deleted its copy this pass, correctly for that surface: its compiler scans every file
in the project and read all seventy mirrors as duplicate exports of the `.jsx` sources they came
from. In THIS repository the same directory is load-bearing — every consumer installs from a
**git tag**, and `prepublishOnly` does not fire on one, so `exports`'s `default`
(`./dist/react.js`) would resolve to a file that does not exist. (`prepare` *does* fire on a git
install and is the supported alternative; declined — it moves the failure from a stale tree a gate
catches to a consumer-side build a nobody catches.) Removing it
here would break four consumers on their next install with a bare module-not-found. So the two
surfaces differ on purpose: generated output lives in git and not in the design project, and
`check:build` is what keeps the committed copy honest. **The general rule survives** — a fact
with two homes needs something comparing them — but the comparator here is a gate, not a copy.

**Earlier passes are not restated here.** v3.0.1, v3.0.0, v2.0.0, v1.13.0 and v1.3.x each have
a verdict in `git` and a full entry in `CHANGELOG.md`; what they *taught* is the list below,
which is the part that has to stay readable. Three of them are worth naming in one line each,
because their lessons are still load-bearing: **v3.0.0** executed the deprecation policy rather
than describing it, and found four live defects doing it — a policy written down and not executed
is a second home for every fact it touches. **v2.0.0** moved every floating and modal surface
onto Radix behind the same `.lw-*` CSS, and the thesis did not change: styling stays in the CSS
layer, Radix supplies positioning, focus, scroll lock and ARIA, nothing visual. **v1.13.0** was
the pass where the second homes were found by a script rather than by a reader, which is the
direction all of this should keep going — this file names the shape, a gate finds the instances.

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

- **`.lw-page-dark` joined the dark band list and not the re-derive list** (v1.4.0 → v1.13.0).
  Twenty-five derived roles stayed on the page theme inside it. The only page in the package
  that uses it, `MarketingLanding`, writes `class="dark lw-page-dark"` — the second class
  carried the re-derive, so the one demo of the ground was the one ground that could not fail.

- **The `DatePicker` specimen rendered a CLOSED Popover** (v3.0.0). The calendar grid never
  entered the DOM, so axe scored a card that contained no calendar and eight cells per month sat
  at 2.28:1 in every consumer. The demo state (closed) and the failure state (open) are different
  DOMs, and only one of them was ever measured.

- **`.lw-ground` and `.lw-sheen` in the forced-colors block** (v3.0.0). Neither class exists. A
  selector that matches nothing looks exactly like a selector that matches and finds nothing wrong.

- **The email literal check ran one way** (v3.0.0). Every watched token's hex was present, so it
  was green; three hexes in the file that no token accounted for had drifted. **Half a comparison
  reads exactly like a whole one.**

- **The hex comments in tokens.css were nobody's job** (v3.1.5). 16 of 77 were wrong, and they are
  the only human-readable form of the palette — so every literal copied out of the token core was
  copied out of a value nothing checked. Three off-by-one literals in one afternoon came through
  them, including one written by the repo while fixing another. The triple was gated from the day
  the contrast check existed; the sentence beside it was decoration until `hex-comment`.

- **The surface tiers were only ever demoed as a ramp** (v3.1.5). Four adjacent swatches answer
  "do these step evenly" and cannot answer "does this ground belong to this page", which is the
  only question a consumer's screen asks. Three minors of a visibly wrong palette, reported from
  outside.

In every case the demo path (a class on `<html>`, a light-mode screenshot, a fresh checkout,
a card with prose in it, a filled button, a swatch beside its neighbour) worked perfectly.
**Test the path nobody demos.**

---

## Open

Nothing here is known to be broken. These are judgement calls and second homes.

### 1. `_ds_manifest.json` duplicated the bundle header — CLOSED in v3.0.0

`tools/_manifest.mjs` lets each generator patch only its own keys onto what is on disk, and
refuses a key the manifest does not already have — so a generator corrects an existing fact
rather than inventing one, and two generators can run in either order. All four facts were wrong
when they first ran, which is the argument for computing them.
### 2. The `.dc.html` templates are not rendered by any gate

`lw-templates.mjs` reads them as text. The cards get axe and pixel diffs; the ten templates —
the thing a person actually looks at — get neither, because they need the `<x-dc>` runtime to
render. Whether that runtime can be driven headless here is unknown and worth half a day.
**The text-only half is now CLOSED** — `check:template-literals` asserts that every `#RRGGBB` in a
`.dc.html` is a token's resolved value, and it found two defects on its first run: `PitchDeck`
carrying `--lw-on-navy-3`'s pre-v1.1.3 value, and `Email`'s footer at **2.83:1**, below AA in a
shipped template. **The rendering half is still open**, and it is the larger one: nothing here
knows whether a template's layout survives, whether its dark mode inverts, or whether the token
it painted is the RIGHT token for the ground it sits on. That last one is why the gate asserts
only "a token" and not "the correct token" — see item 14.

### 3. `preview/_vendor` and the packed cards — CLOSED in v3.0.0

The cards in the published package had never been functional: they referenced `preview/_card.css`
and `_ds_bundle.js`, neither of which shipped. v3.0.0 ships what they need and swapped the React
development pair for production (1.19 MB → 142 KB) to afford it. **The assertion is the part worth
keeping:** `check:pack` resolves every relative `href`/`src` in every packed card against the
installed tree and refuses to pass having read fewer than 100. Neither `MUST_PACK` nor the
`exports` walk could have caught it — both check what a consumer *imports*, and a card is loaded
by a browser. Eight releases.
### 4. `deck-stage.js` was vendored and ungateable — CLOSED in v4.0.0

2,969 lines under `templates/pitch-deck/`, carrying its own dark palette in Claude's coral
(`#D97757`), `@ds-adherence-ignore` on line 1, and a header saying the next
`copy_starter_component` **overwrites the file** — so tokenising it would have been undone
upstream and any local fix lost silently. The template went with it at v4.0.0. The rule it
leaves behind: **a file this repo cannot patch and cannot gate does not belong in it**, however
good the artefact is. *(An earlier revision claimed it mirrored `PRINT_BASELINE_CSS` into
another repo — that was wrong. The mirror is in `support.js`, which arrives from the design
project and is still here.)*

### 5. `.lw-editor-body` duplicated `.lw-prose` — CLOSED in v2.0.0

`RichText.jsx` emits `lw-prose lw-editor-body`; the editor class keeps only its own delta (the
box, the caret, the placeholder, `--lw-prose-max: none`). Done in one commit **with the bundle
regenerated in the same change** — a `.jsx` edit is invisible to both browser gates until
`npm run bundle`, so splitting the two would have landed the change with its verification
deferred.
### 6. `_ds_manifest.json`'s `components` array went stale — CLOSED in v3.0.0

Twelve entries behind, found by verifying against the filesystem rather than by reading. The
load-bearing half (`cards`) was clean, because both browser gates enumerate from it in both
directions — which is the whole lesson: the half nothing reads is the half that rots. Now written
by the generator that computes it; see item 1.
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
- **v1.13.0 legitimately moves 34 of 160 visual shots**, so its CI run needs `[visual-ok]`
  in the head commit message. Every one is accounted for in the CHANGELOG entry: new rows on
  `colors-neutrals`, `motion` and `type-scale`, the prose specimen on `spacing-shadows`, the
  lead at −4px and `.lw-h3` at +1px from the line-height tokens, and a 0.045% soft tint on
  `data.card` from the warm surfaces. No dark shot changed colour. An override is only honest
  when the accounting exists — do not carry the marker forward into the next commit.
- `Feedback` and `RichText` keep `aria-pressed` deliberately — thumbs can be cleared, and bold +
  italic are genuinely simultaneous. Documented, but the reasoning lives only in the source.
- The `:dir(rtl)` fallback in the drawer uses `[dir="rtl"]`, which needs the attribute set. No
  consumer sets it yet, so RTL is *correct in principle and untested in practice*.
- `email.css` was removed at v4.0.0. The gap that killed it is worth remembering rather than the
  file: nothing here renders a template, so its layout was asserted by nothing for its whole life,
  and only its colours were ever gated.
- **Correction to a claim this file used to make:** the a11y worker was reported as leaking a
  Chromium process when a card throws. It does not — `playwright-core`'s `bootstrap.js`
  registers a `process.on("exit")` reaper, confirmed by process counts either side of a
  throw-without-close repro. Both gates now wrap in `try/finally` anyway, because closing what
  you open beats depending on an undocumented exit hook, but nobody should re-file this as a
  leak.

### 8. The consumer bump, which is now a real plan rather than a warning

Two consumers (VSS, rag-service) are pinned pre-1.1.0; the other five sit between `#v1.7.1`
and `#v1.12.0` — CLAUDE.md §Consumers has the enumerated table. Diffing the tags says the risk is
not where it looked:
**zero `--lw-*` tokens were dropped** and the preset kept every utility family, so the CSS
surface is close to safe. The break is in the **JS entry points** — `./counter` deleted (restored
v1.1.5), `./react` off `dist/` to ESM source, `tailwind-preset.js` → `.cjs`, the eleven named
icon exports replaced by `<Icon name>`, four hooks moved from `./react` to `./hooks`, `bin`
dropped. Also: **rag-service was never install-drifted** — the `v0.2.2` tag's own `package.json`
says `0.2.1`, so the pin resolves correctly to a tree reporting the older number, and no
reinstall changes that. Bump it to `#v0.2.3`.

### 9. `Button`'s `type` defaulted to HTML's `submit` — CLOSED in v2.0.0

Flipped to `"button"` at the major, never at a patch: silently stopping `<form onSubmit>` +
`<Button>Save</Button>` from submitting is a worse patch-release failure than the wrong-op it
replaces. One consumer needed `type="submit"` and the CHANGELOG migration note names the grep.
### 10. `product.css` overrode the token band's default ink — CLOSED in v2.0.0

The `product.css` rule is deleted and the role wins: dark-band ink is `--lw-fg` in both load
orders (9.42:1 → 15.78:1 in an app). It was two treatments of one thing decided by which layer
you happened to load — and a raw `--lw-on-dark-2` tier overriding a role is what README rule 12
already forbids.
### 11. `lw-visual`'s `decoded()` is not airtight

v1.3.0 added an image-decode wait and recorded three runs agreeing to 0.0001%. During the
1.3.1 accounting, ONE scaffold recording of `site-chrome.card__light` showed an extra 726-pixel
band on `.brand-mark` — the per-theme background image, the exact flake `decoded()` exists to
close. It did not reproduce: re-recording gave the same 733 px as the other three shots, and
three self-consistency runs of the working tree agree to 0.0001%. So the residual rate is
roughly **one bad shot per 312 recordings** on this box, and it lands on the one element whose
image is swapped by the theme flip. Not worth a fix on this evidence; worth recording, because
the next unexplained 0.03% on a card carrying the mark is probably this and not a regression.

### 12. Nothing asserts that a selector in a layer names a class the package defines

Found by the forced-colors bug in v3.0.0: `@media (forced-colors: active)` hid `.lw-ground` and
`.lw-sheen`, and neither is a rule anywhere — the ground is `.lw-page-ground` and `.lw-sheen` was
never defined at all. **A selector that matches nothing costs nothing and reports nothing**, so it
can sit in a layer for years being read as protection. `check:tokens` lints what a declaration
*says*; `check:presence` asserts a registered utility *compiles*; `dynamic-class` asserts a prop
value *has* a rule. None of them asks the inverse of the last one: does this compound selector name
something that exists?

The rule is cheap — collect every `.lw-*` token from every selector, and fail on one that heads no
rule anywhere in the layers — and the reason it was not written with the fix is that the exemption
list is the hard part: `.lw-page-ground` legitimately appears in `base.css` while being defined in
`marketing.css`, a consumer-authored class may legitimately be styled here, and a hover/state
compound naming a live class is fine. Write it when a second instance appears; one known subject is
hard to keep honest (the same reasoning as the reset-leak sweep in item 7).

### 13. The sweep's own method has a hole this pass only half-closed

`dynamic-class` (v3.0.0) covers the case where a component composes a class from a typed prop. It
does not cover a class a **consumer** composes, a class named only in a `.dc.html` template's
runtime expression, or a class a vanilla page authors that this repo has never seen. Every
"is this rule reachable" question in the v3.0.0 sweep was ultimately answered by grepping seven
trees plus this one, and that is a lower bound, not an answer. The three rules the sweep actually
held — **a scale is one unit, a family is one unit, a documented recipe is one unit** — are what
kept it safe, not the greps. Record them here because the next sweep will want them:

- a scale (`.lw-mt-*`) survives if ANY rung is used; delete a scale only when no rung is
- a family (`.lw-auth-*`) survives if any sibling is used, because a vanilla page composes members
- a standalone decorative effect no component emits, no card demonstrates, no template lays out and
  no consumer writes is the only safe category, and it is where all 33 deletions came from

### 14. "A token" is not "the right token", and only an eye closes that gap

`check:template-literals` proves a template's `#F7F6F5` is *some* token's value. It cannot say
whether that ground should have been the muted tier at all — `email.css` needed exactly that
judgement at v3.1.5 (subtle sits 1.6% off white, which a mail client renders as no frame) and no
rule could have reached it. The same hole exists one level up: a component painting
`--lw-bg-muted` where `--lw-bg-subtle` was meant passes every gate in this repo.

This is the standing division of labour with the Claude Design project, and it is worth stating
as a rule rather than rediscovering it: **a gate settles whether a value belongs to the system;
a person or a fixture settles whether it belongs HERE.** v3.1.5 is the worked example — the
defect was found by an eye, the fix was verified by the gates, and the durable output was
neither the diagnosis nor the hex values (which were wrong) but `colors-surfaces.html`, a
fixture both browser gates now measure forever. Judge a visual pass by what fixture it leaves
behind.

---

## The v4.0.0 lean pass — EXECUTED at v4.0.0

Asked for at v3.1.5: make the system lean. The inventory below is what a sweep would actually
touch, with the verdict on each, because **five of the six candidates named in the ask are either
already done, load-bearing, or a breaking change that has to wait for the major** — and saying
which is which is the useful half.

| Candidate | Verdict |
|---|---|
| The 26 unimported components | **Already gone.** Removed in v3.0.0 after being marked at v2.0.0; CHANGELOG 3.0.0 §"Removed — announced at v2.0.0" names every one. Nothing to cut. |
| The marketing layer (13 components + `marketing.css`) | **Keep.** It is the layer with a live external consumer (`leanwise-ai`), six specimen cards, and the `MarketingLanding` template. "Products don't ship marketing pages" is false for this org — the marketing site *is* a product. |
| The 47 specimen cards + their `.card.js` twins | **Keep the twins; they are not duplicates.** v1.13.0 pre-compiles each `.card.jsx` so the cards run without `@babel/standalone` (3.1 MB out of the clone). The `.html` loads the `.js`; delete it and every card goes blank. The near-duplicate PAIRS (`Menu` + `Menu-open`, `Dialog-open`, `DatePicker`, `Table-collapse`) each exist because a closed overlay measures the trigger, not the surface — the v3.0.0 calendar defect is what they are for. |
| The 12 templates | **DONE in v4.0.0 — `pitch-deck` cut.** It is the one template that is not this design system: 2,969 vendored lines carrying Claude's coral `#D97757`, `@ds-adherence-ignore` on line 1, exempt from the lint, and overwritten wholesale by the next `copy_starter_component`. A template nothing gates and nobody can safely patch is a liability, not a starting point. The other eleven are one `.dc.html` each over `_shared/`, which is the cheapest thing in the repo. |
| `email.css` + the `Email` template | **DONE — deprecated at v3.1.5, carried through the v3.2.0 minor, removed at v4.0.0.** `"./email.css"` is a published export, so deletion is breaking. The case for removing it is item 7's: it cannot use logical properties, so it is a physical-property island; `check:contrast` asserts its literals and **nothing asserts its layout**; and its literals drifted twice (v3.0.0, and again at v3.1.5 in the `Email` template). Revisit only when a product actually sends mail. |
| README | **Restructure, don't delete.** Done at v3.1.5: the index and the recipes stayed, the archaeology came out — 44 version references down to the install pin, with each "since v1.3.1" anecdote kept as the rule it taught. The `readme-coverage` lint reads the index half, so every barrel export kept its row. |

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
  ever upgrades. GitHub Packages is what makes a version range possible. (An earlier revision
  of this bullet said `exports` points at source and `dist/` ships nowhere. That was v1.1.0's
  decision and it was reversed in v1.2: `exports` resolves `default` to `./dist/*.js` with
  `source` beside it, `files` includes `dist`, and `check:build` fails when it is stale.)

---

## What is healthy

- **The token core.** HSL channels plus derived roles, every theme scope re-pointed and gated,
  contrast measured from the parsed cascade in three canonical scopes rather than asserted in
  prose — and, since v1.13.0, the re-derive list asserted against both band lists.
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
npm run check        # every browserless gate — package.json#scripts.check is the list
npm run check:ci     # the above plus axe and visual regression
npm run build        # rollup-plugin-dts resolution — what check:dts only approximates
```

No gate can see the *Carried forward* section, or Open 2, 3, 4 and 8 — architecture, vendoring,
API shape and release planning are judgement. That is why this file exists and why the audit is
worth repeating by hand each release.
