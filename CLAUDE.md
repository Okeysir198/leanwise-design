# CLAUDE.md

Guidance for Claude Code when working in this repository.

## What this is

**`@leanwise/design`** — the LeanWise design system: tokens, the CSS layers, a Tailwind preset, the React
components, twelve page templates, and the **gates** that turn the style guide into build failures.
(**`package.json` is the authority for the version**, and README §Components for the component list —
a version or a count repeated in prose is one that disagrees, which is what the `doc-count` and
`stale-install-pin` lint rules refuse.) ⚠ **`components/ai/` is CSS-only since v3.0.0** — its React
wrappers were the largest block of that release's announced removals and no consumer had ever
imported one; the rules, two specimen cards and `templates/ai-app-shell` are what remain, and they
are the surface a consumer copies. The repo is the working copy of a Claude Design
project (`f2d90781-f891-45e3-bc88-ddb55e6f9444`): that project is the authoring surface, this repo is what
consumers install, and edits here do **not** flow back.

`README.md` is the user-facing doc and component index; `CONTRIBUTING.md` the PR checklist; `REVIEW.md` the
standing audit (**read its finding 1 before touching the CSS layers**); `CHANGELOG.md` the incident record.
**This file states the RULE; the CHANGELOG entry it names carries the story, and each tool's own header
carries its full rationale.**

### Commands

```bash
npm install
npm test               # node --test over test/. Helpers with tests today: tools/_css, _png, _semver,
                       #   _jsx-shim, brand.js — plus repo.test.mjs, which asserts every gate is reachable
                       #   from an npm script and that CI runs the scripts.
npm run check          # every gate that needs no browser. package.json#scripts.check IS the list — do
                       #   not restate it here; it has been wrong every time it was.
npm run check:ci       # the above plus check:pack, a11y and visual (the last two need a browser)
npm run check:a11y     # axe over every @dsCard — needs `npx playwright install chromium`
npm run check:visual   # every card x light/dark x comfortable/compact. --self-test checks the PNG
                       #   comparator itself. Baselines: `.visual/`, ~63 MB, gitignored.
npm run tokens         # -> tokens.json (DTCG)     npm run cards    # *.card.jsx -> *.card.js
npm run dts            # -> react.d.ts             npm run assets   # on-dark art <- the -ink SVGs
npm run bundle         # -> _ds_bundle.js          npm run registry # -> r/*.json
npm run build          # -> dist/, per file        npm run favicon  # -> assets/logo-favicon.svg
```

CI runs `npm run check`, then `check:pack`, then the two browser gates (`.github/workflows/ci.yml`, every
push/PR); `package.json#scripts.check` is the one list of gate names and `test/repo.test.mjs` keeps it so.
Shared helpers in `tools/`: `_cards` `_color` `_css` `_generated` `_jsx-shim` `_png` `_report` `_semver`
`_tw-probe`. `_generated` is the one generated-and-staleness-checked harness; `_report` is the one report
shape, and carries the rule that **a gate must refuse to pass vacuously** — reading zero of the thing it
measures is a failure, not a clean run.

## Layout

```
tokens.css     THE source of truth — HSL channel triples + derived colors, every theme scope.
base.css       shared controls, the layer every surface needs: layout, type, buttons, icon + icon button,
     pills/cards/chips, avatar, empty state, form field + control face, console + code, tabs, pagination,
     the TABLE and its wrap, top bar + mobile nav, .lw-toc/.lw-crumbs, prose, disclosure, and the
     pointer-affordance list (which must stay LAST in the file).
marketing.css  grounds + hero + site chrome (footer, announce, plans, matrix, flow, editorial)
product.css    app surfaces: data grid, overlays + the portal layer, app shell and rails, AI, mobile bars
reset.css      the nine bare-element rules. Vanilla consumers want it; Tailwind apps must NOT import it.
email.css      literal hex + table layout on purpose — a SECOND HOME for palette values, so
     check:contrast asserts its literals. Move a token, move the literal.
shadcn.css     maps --primary/--background/--accent onto tokens (no values of its own).
theme.css      the v4 spelling of the vocabulary tailwind-preset.cjs states for v3 — the preset registers
     cta/success/warning/brand/navy as REAL utilities so nobody reaches for bg-[hsl(var(--x))].
fonts.css+fonts/   Geist + Geist Mono, self-hosted, incl. Vietnamese subsets.
react.js/.d.ts     the barrel — re-exports every components/<cat>/*.jsx.
brand.js hooks.js  runtime per-tenant theming; the hooks the components share.
components/    ai data forms layout marketing nav overlays primitives — .jsx + .d.ts pairs + *.card.html
     previews (script: the <name>.card.jsx beside them). ai/ holds ONLY cards: v3.0.0 removed its
     components and kept its CSS, so those two cards are the only thing measuring those rules.
     overlays/ is Radix-backed since v2.0.0 and renders through overlays/_layer.js, the portal
     layer (.lw-layer/.lw-layer-modal + .lw-backdrop).
       _overflow.js    useOverflow() sets data-overflow="true" on a scroller with content past its inline
           end. THE CONTRACT IS THE ATTRIBUTE, not the hook.
       _merge-refs.js  one node into a local + a forwarded ref — NOT useImperativeHandle(..., []), which
           binds whatever node existed at mount.
       _radio-group.js the one-of-N keyboard contract (role=radiogroup/radio + aria-checked + arrows) for
           Segmented/ThemeToggle; aria-pressed describes N INDEPENDENT toggles.
       _tone.js/.d.ts  the ONE tone vocabulary — and NOTHING else since v3.0.0, which retired the
           five legacy spellings and with them normTone/normToneMap. check:tone IMPORTS TONES from
           here rather than restating it, which it did for eleven releases.
       _deprecate.js   one-time console notices, deduped by component+prop, silent in production.
templates/     twelve page templates, each *.dc.html + .thumbnail; ds-base.js and support.js live ONCE in
     templates/_shared/.
tools/         the gates + the shared helpers; ROOT is ONE level up.
preview/       foundation cards + _card.css/_card.js + _vendor/ (React + ReactDOM as PINNED, hashed UMD
     copies — a CDN made both browser gates network-dependent). PRODUCTION builds since v3.0.0, and
     preview/ SHIPS: every card.html loads three things from here, none of which used to be in
     `files`, so no published card had ever rendered. Do not restore _fonts.css.
_ds_bundle.js  the browser bundle, namespace LeanWiseDesign_f2d907. The cards render from THIS.
_ds_manifest.json  a card declares itself with a first-line <!-- @dsCard group="..." --> marker; both
     browser gates enumerate cards from that marker. Its `namespace`+`components` are written by
     lw-bundle and its `tokens`+`themes` by lw-tokens-dtcg (tools/_manifest.mjs) — hand-editing any
     of the four fails a --check. `cards` and `templates` are still authored here.
tokens.json react.d.ts dist/ r/ assets/*  — all GENERATED and COMMITTED.
thumbnail.html + .thumbnail  the package's own thumbnail and the markup it was rasterised from. No
     tool here reads or writes either; the design project does. Keep them, and do not re-file
     thumbnail.html as dead — the v3.0.0 sweep flagged it, and it is not.
```

**Load order: tokens -> base -> marketing and/or product.** A marketing page needs base + marketing and
NOTHING more; whatever a marketing component reaches belongs in base.css. Three rules fell out of getting
there (CHANGELOG 1.3.0 / 1.3.1): **position is not load-bearing, PRESENCE is**; **a specimen must load
exactly its documented recipe**; **a property carrying a COLOUR is base.css's to state**.

**Ships `.jsx` SOURCE deliberately** — the consumer's bundler does the transform, and styling lives in the
CSS layer, NEVER in a `.jsx`. **Everything generated here is committed**, because every consumer installs
from a **git tag**: a git install runs no lifecycle script, `prepublishOnly` never fires, so a file built
at publish time exists for nobody and an `exports` subpath pointing at one 404s. The cost is silent
staleness, hence a `--check` per generator in `npm run check` — **change the source, run the generator,
commit both.** ⚠ `templates/_shared/` has **no generator here** (those two files arrive from the design
project), so `check:templates` hard-fails any sibling copy a re-pull puts back beside a template.


## The gates — all must stay green

Every `check:*` in `package.json#scripts`.

| script | asserts | fails on |
|---|---|---|
| `check:presence` | v3 preset ⟷ v4 `theme.css` are one vocabulary; every `--x-*: initial` reset ships its bare `--x`; shadcn.css declares every property shadcn's components read; the documented import chain **actually compiles** through real Tailwind | a name in one spelling only, a missing bare key, a missing shadcn property, a registered name that yields no utility |
| `check:rsc` | `"use client"` is correct **both ways**, per file, in the SOURCE | a client file without the directive **or** a server-safe file with one — asserting only the first makes "put it on everything" the cheap fix, which throws away every server component |
| `check:build` | `dist/` is what the current `.jsx` produces, per file (per-file so the directive can mean something) | a stale `dist/` |
| `check:types` | `tsc --noEmit` | any type error |
| `check:registry` | `r/` is byte-current with `registry/`; every Tailwind class a registry component uses compiles; the TSX token rules run over `registry/`; an item importing `radix-ui` yields at least one `lw-*` class | a stale `r/`, a class emitting nothing, a Radix wrapper wrapping no design-system class |
| `check:advisories` | `lw-doctor --self-check` re-derives every advisory's `count` from the tree | an advisory gone stale — the hand-maintained fact the tool exists to replace |
| `check:favicon` | `assets/logo-favicon.svg` is current with `assets/logo-mark.svg` | a stale favicon |
| `check:contrast` | WCAG AA pairs + the scope rules — see below | see below |
| `check:tone` | every literal in a `tone`/`accent` union is canonical, **and** every advertised value has a CSS selector matching what the component emits. Reads `TONES` from `components/_tone.js` rather than restating it | a misspelled tone, one of the five spellings retired at v3.0.0, a value with no rule, a rule with no value — and reading fewer than twenty values at all |
| `check:tokens` | the token lint — see below | see below |
| `check:themes` | `tokens.json` matches what `tokens.css` generates, and every channel is re-pointed in *every* theme scope | a stale `tokens.json`; a token that exists in light and silently inherits in dark |
| `check:dts` | `react.d.ts` is generated from `react.js` | a stale barrel. Add the export to `react.js` and the declaration to the component's `.d.ts`, then `npm run dts` |
| `check:bundle` | `_ds_bundle.js` is what the current sources produce — see below | a stale bundle, a Radix version the lockfile moved without a rebuild, a card reading a namespace key that does not exist |
| `check:templates` | `ds-base.js`/`support.js` exist ONLY in `templates/_shared/`, and every `.dc.html` loads `../_shared/support.js` then `../_shared/ds-base.js` in that order; `lang`, a main landmark, a skip link whose target exists | a sibling copy beside a template, a wrong load order, a missing landmark. `NO_SKIP_LINK` is the greppable exemption list |
| `check:cards` | every `<name>.card.js` is current with its `.card.jsx`, and no card carries an inline `text/babel` block | a stale compiled card — a browser gate measuring something no source file says |
| `check:assets` | each on-dark artwork twin is current with its `-ink` source (a token-driven substitution, never a hand-edit) | a stale generated SVG |
| `check:pack` | `npm pack`, install the tarball into a scratch dir, and USE it — the only gate not run against the working tree; since v3.0.0 it also resolves every relative `href`/`src` in every packed `*.card.html` | a `files` list that drops something. This is how `dist/` was never built for anyone, how the `lw-token-lint` bin went missing under pnpm, and how every shipped card loaded three files the tarball did not carry for eight releases |
| `check:a11y` | axe over every `@dsCard` — see below | serious/critical violations; moderate/minor report only |
| `check:visual` | every card × light/dark × comfortable/compact — see below | a per-shot pixel diff over threshold |

`_cards.mjs` is not a gate but is the list BOTH browser gates enumerate: it cross-checks
`_ds_manifest.json` against the filesystem and errors on disagreement in either direction.
⚠ **Whenever you add or change a gate, sabotage it and watch it go red.** A green gate is not the check;
several incidents in the CHANGELOG are a gate reporting clean while measuring nothing.

**`check:contrast`** parses `tokens.css` per theme block, resolves `var()` chains, evaluates a derived
MANIFEST, enforces **dark-block parity**, carries a **non-text group (WCAG 1.4.11, 3:1)** for control
boundaries and focus indicators, and asserts the literal hex living outside tokens.css (logo gradient
stops, artwork strokes, `email.css`) because custom properties reach none of them. ⚠ **The email
assertion runs BOTH ways since v3.0.0**: every watched token's hex must be in `email.css`, *and* every
hex in `email.css` must be a watched token's value or a named `EMAIL_EXEMPT` entry. The first half alone
was green while three literals sat on values a token re-tune had moved away from — a second home is only
safe while something compares the two, in both directions. Three rules in it are
load-bearing:

- ⚠ **BAND SCOPE.** A selector used as an ancestor scope to re-ink descendants from the `--lw-on-dark*`
  family must appear in tokens.css's dark band list. No token PAIR can express that failure — both tokens
  are correct and the SCOPE is wrong — and `check:a11y` cannot either, because a decorative pseudo-element
  files it as `incomplete`. Exemptions live in `BAND_SCOPE_EXEMPT`. (History: CHANGELOG 1.3.1, 1.4.0.)
- ⚠ **RE-DERIVE COMPLETENESS** (`rederiveCompleteness()`). The re-derive `:where()` list at the foot of
  tokens.css must be a superset of BOTH band lists and restate every derived role the dark band re-points.
  **It is a gated list, not a convention.** Theme blocks are matched by member, and the gate refuses the
  return of the `:root[data-theme="dark"]` block deleted in v1.13.0.
- **Three canonical scopes: light, `.dark`, and `light ⊕ media-dark`** — the third is what a browser
  computes when the OS prefers dark and the page sets no class, the default for a plain marketing page.
  ⚠ It merges in SOURCE ORDER, not as a spread: a `:root` in a media query and a top-level `:root` have
  identical specificity, so a naive `{...light, ...media}` reports a palette the browser never paints.
  `darkScopeDivergence()` fails by name on a family no manifest pair mentions (CHANGELOG 1.1.7).

**`check:tokens`** is a **deny-list, not a contract checker.** Its TSX rules (raw hex, palette escape,
arbitrary `var()` in `[…]`, >1 `variant="cta"` per file) fire only against *consumer* source — run `node
tools/lw-token-lint.mjs <consumer>/src` by hand before any pin bump. `--css` self-checks the layers (raw
duration, raw z-index, `legacy-duration`, `keyframe-name`, `breakpoint-spelling`, `missing-react-import`,
`dynamic-class`) and the docs (`doc-count`, `readme-coverage`, `stale-install-pin`). ⚠ **It cannot see a
utility the preset no longer registers** — a removed utility compiles, lints green and renders unstyled,
so **grep the consumers before you remove one.** ⚠ `raw-hex` matches 3/6 digits only.

⚠ **`dynamic-class` (v3.0.0) is the rule for the class NO grep can find.** Several components compose the
class from a prop — `` `lw-btn-${variant}` ``, `` `lw-chip-${tone}` ``, `` `lw-stack-${gap}` ``,
`` `lw-cluster-${gap}` `` — so `.lw-btn-ink` appears nowhere except base.css defining itself: not in
`components/`, not in a card, not in a consumer. **The v3.0.0 dead-CSS sweep put `.lw-btn-ink`,
`.lw-cluster-16` and `.lw-cluster-24` on its delete list for exactly that reason**, and all three are
live public API. The rule reads each prop's union from the sibling `.d.ts` and requires a matching
selector, so it fails both ways — a union value the CSS cannot paint, and a rule the next sweep is about
to delete. It reads the DEFAULT guard (`gap !== 16 && …`) instead of keeping a list of defaults.
**Before deleting any `.lw-*` rule, check whether a template literal builds its name.**

**`check:a11y`** — a node may opt out of ONE rule with `data-a11y-expect="<rule-id>"` (never a whole card
or rule; exactly one today). ⚠ **It reads `violations`, not `incomplete`, a blind spot with a known
shape:** axe cannot resolve a background behind a pseudo-element, so every decorative surface here is
invisible to its contrast rule. Do not "fix" it by failing on incompletes — assert the token SCOPE instead.
**It runs axe's `aria-dialog-name`**, the one non-WCAG rule enabled, because a Radix Dialog with neither
`title` nor `label` is a `role="dialog"` with no name; that is closed for DIALOGS ONLY, since the
open-state cards render each surface OPEN — **a closed overlay is still invisible to it.** And **prose is
not evidence of anything**: an uncaught page error fails the card, and every container passed to
`createRoot`/`hydrateRoot`/`render` must have an element child. (History: CHANGELOG 1.3.0.)

**`check:bundle`** — React is **not** bundled (CommonJS shims over `globalThis.React`/`ReactDOM`); the
namespace is the barrel's exports plus every uppercase-first export of a module it pulls in, and every card
is grepped for the names it reads off it. Mechanics in the file's header.
⚠ **`tsconfigRaw: { compilerOptions: {} }` in the shared `JSX` options is load-bearing — do not remove
it.** esbuild's `jsx` API option is only a DEFAULT: a reachable `tsconfig.json` overrides it per file, and
this repo has one carrying `"jsx": "react-jsx"` (right for `tsc --noEmit`, fatal here). **If you touch that
object, open a card in a browser and confirm a component paints — a green gate is not the check.** (1.3.0)
⚠ Since v2.0.0: `react/jsx-runtime` resolves to `tools/_jsx-shim.mjs`, pinned by
`test/bundle-shim.test.mjs`; `radix-ui` is INLINED with its version in the header, so **`npm ci` fetches it
and `check:pack` is no longer air-gapped**; and `lw-rsc` reads any `from "radix-ui"` import as a client
signal, so every overlay is `"use client"` by rule, not by a hand-kept list.

**`check:visual`** diffs pixels with a PNG decoder verified against Chromium's own (max channel delta 0);
`--self-test` runs that, and the decoder, the CI base-ref recording and the image-decode wait are in the
file's header. **Two per-shot rules, because neither alone works:** soft (channel Δ>8 over **0.02%** of
pixels) catches a whole-page tint; strong (Δ>48 over **0.002%**) catches a 1px hairline recoloured along
1200px — 0.038% of a shot, invisible to any 0.1% area rule. Thresholds come from a MEASURED noise floor:
816 shots, 815 byte-identical, one moved 0.0002%. **Raise them only with an observed percentage quoted;
never round up "to be safe."** ⚠ Fix a drifting shot in the CSS or accept it below; **never edit a specimen
to suit a gate.**
⚠ **`[visual-ok]` in the head commit message** downgrades a failure to a report. It exists because
`--update` is meaningless in CI (the baseline dies with the runner), so without it every intentional CSS
change would be permanently red and unmergeable. Deliberately awkward and greppable (`git log --grep`), the
property that keeps `data-a11y-expect` honest too. **Account for it**: the CHANGELOG entry says how many
shots moved and why they all moved.
`components/marketing/ground.card.html` renders the three page grounds, each stage under `contain: paint`
so their `position: fixed` layers stay inside their stage. Without it the grounds measured by nothing.



## Facts worth not re-deriving

### Colour

- **Brand.** Cyan `#0C727B` (`--lw-brand-500`, white ink 5.66), navy `#024576` (`--lw-navy-700`), amber
  `#FCB603` (`--lw-cta-500`, navy ink 10.54). `--lw-logo-cyan` and `--lw-art-*` are **artwork-only**. The
  palette was sampled FROM the mark; re-tuning means re-sampling it.
- **Ink follows the FILL's lightness, not the brand** — white on brand teal, navy on the amber CTA and the
  status fills. Do not "restore" a uniform rule; the contrast gate will fail.
- **A fill color is usually not a text color**, hence the `fill`/`text`/`ink` split; brand is the exception
  (`--lw-brand-text-c` is the fill on light, brand-400 on dark). **`brand-text` is the LINK shade,
  `brand-on` the ink for the brand TINT** — 3.98 over `--lw-brand-soft`, so every
  `background: var(--lw-brand-soft)` pairs with `color: var(--lw-brand-on)`.
- ⚠ **A derived role must be re-derived in every scope that re-points its channel.**
  `--lw-fg: hsl(var(--lw-fg-c))` is substituted where it is DECLARED, so a scope re-pointing only
  `--lw-fg-c` inherits the page-theme COLOR. At `<html>` it happens to work, because declaration and
  override land on one element — **the case everyone demos is the one that cannot fail.** The
  `:where(...)` block at the foot of tokens.css is where a new role goes.
- **A TIER is theme-invariant; a ROLE re-points.** Paint `--lw-text-3`/`--lw-surface-2` and your card
  renders light ink on navy, 3.5:1; over both grounds reach for `--lw-fg-subtle`/`--lw-bg-inset`.
- **A muted token is only as good as the darkest surface it lands on** — check it against `--lw-surface-3`,
  not the page. And **opacity is not hierarchy**: fine on a masked graphic, but on text it is a contrast
  cut the token system cannot see. Carry the recede in ink and size.
- **The two themes share the INK hue, not the paper hue.** Light surfaces and borders sit on hue 45 (warm
  paper), the page stays white, the one shadow ink is `--lw-shadow-ink-c`; dark roles point at named navy
  primitives (`--lw-navy-paper/raised/inset-c`, `--lw-on-navy-1..4-c`, `--lw-navy-line-*-c`).
- **`--primary` is cyan; amber is the `cta` *variant*, one per view** — shadcn's `--primary` drives the
  default Button, so amber there makes every button a CTA. `--accent` is a ghost-button *hover surface*,
  not a brand color; per-tenant theming overrides `--primary`/`--ring` only.

### Layers, grounds, scope

- **`.lw-media-plate` (v2.3.0) is the mat under a raster whose own background is fixed** — a
  screenshot that cannot be re-pointed at the page's theme. It lives in `base.css` beside the media
  rules; `--lw-media-plate-pad` is the one knob.

- **A keyframe name is GLOBAL and last-wins**, so `check:tokens` gates uniqueness and `/^lw[A-Z]/`.
  **`Section`'s `rule` is a hairline owning the boundary *above* it** — one owner per boundary.
- **The three page grounds are ONE parameterised rule set** — which SVG, which alpha, which glow stops are
  `--lw-ground-*` knobs. ⚠ The `url()`s stay in explicit selector rules: **Firefox resolves a `url()`
  inside a custom property against the DOCUMENT**, not the stylesheet. `.lw-page-ground` resolves off
  `[data-theme]` on `<html>`, not a consumer-picked class, because a theme class in the HTML makes the
  document cookie-dependent and `s-maxage` with no `Vary` then caches it on URL alone.
- ⚠ **A hero on a themed ground must NOT carry a band scope.** `.lw-hero-dark` is in the dark band list
  because a standalone hero is always navy; inside `.lw-page-ground` that pinned it dark while the ground
  painted white — 1.09:1 sitewide for every default-theme visitor. Fixed by re-pointing its channels to
  `inherit` in marketing.css. Two earlier attempts put it in the LIGHT band list and inverted the bug in
  dark mode: **the band block sets the property ON the hero, and an element's own declaration beats one
  inherited from `<html>` however the selectors weigh.** Specificity is not what decides it.
- ⚠ **`.lw-topbar nav > a`, not `nav a`** — equivalent only while `TopBar` renders links as direct
  children; with a panel nested in that `<nav>`, the bar's padding and its 44px floor would hit every
  dropdown item. A `<summary>` trigger then falls out of those rules, so **`.lw-navmenu > summary` had to
  be added back to all three.**
- **`NavMenu` is a native `<details>`, not `Menu`/`Popover`** — those paint on **product.css**, which a
  marketing site drops, and `role="menu"` is wrong for site navigation (APG): it is a disclosure containing
  links. Escape-to-close and close-on-route-change are the **consumer's**, stated in the `.d.ts`.

### Overlays, motion, density

- ⚠ **A portal inherits from its CONTAINER, not its trigger — so the layer mirrors the scope.** A Radix
  portal renders under `OverlayProvider`'s container, outside the `.dark`/`.lw-band-dark`/`brandVars()`
  subtree the trigger sat in; `_layer.js` restates those classes on `.lw-layer`. Put the provider INSIDE
  the themed element, never above it, and **never inside `.lw-topbar`** — its `backdrop-filter` becomes the
  containing block for `position: fixed` and the layer scrolls with the bar.
- **Dialog, Drawer and CommandPalette return focus to their OPENER on close.** Radix's default is its own
  `Trigger`, which a controlled panel (`open` + `onClose`, no `trigger`) never has, so focus fell to
  `<body>` on every Escape. **A caller's own `onCloseAutoFocus` still wins.** Both `Dialog` and `Drawer`
  also declare `onOpenAutoFocus`, `onCloseAutoFocus`, `onEscapeKeyDown` and `onInteractOutside` — the
  runtime always passed them through, but untyped there was no way to cancel a Radix default.
- **Why `Select`, `Switch`, `Checkbox` and `Toast` stay native.** A `<select>` is the right control on every
  phone and the form controls submit with scripts off; `Toast` is a live region, and a portalled one leaves
  the `aria-live` region it was announced from. Radix earns its place only for positioning, focus, scroll
  lock and a described tooltip.
- **Ambient motion has one switch, OFF by default.** `--lw-ambient-play` is the play-state of every
  decorative loop, `paused` at `:root`; `data-ambient="on"` runs a subtree, `"off"` parks one. Both
  selectors declare one custom property and no paint, and are named on `lw-presence`'s
  `LAYER_PURITY_EXEMPT`. Frame 0 is every loop's resting frame, so paused and running paint the same still.
- **Density is scoped, not global** — `--lw-control-h-*`, `--lw-row-h`, `--lw-card-pad`, `--lw-stack-gap`
  read `data-density`, and **the 44px coarse-pointer minimum lives on the token**, so anything with a
  height reads a density token or carries a comment saying why not.
- ⚠ **Under a coarse pointer prefer REAL size to a `.lw-hit` overlay wherever an overlay would be clipped
  or would overlap a neighbour.** The v2.1.x sweep went both ways: sortable `th` buttons,
  `.lw-input-group > input`, `.lw-segmented`, `.lw-tabs [role=tab]`, `.lw-nav-item` and `.lw-skip` took
  real height (the space below a header cell belongs to the first data row, and an overlay there steals
  that row's taps); overlay close buttons took `.lw-hit`; and the AppBar menu button and compact locale
  toggle needed real size because `.lw-hit` was **clipped by an ancestor's `overflow: hidden`** and
  **overlapped by a neighbour's own overlay**, where the later one in the DOM took the tap.

### Type, components, theming

- **`--lw-font-display` is the display face and defaults to Geist** — a serif there means re-checking
  `--lw-tracking-tighter`, measured for Geist. The measures are tokens too (`--lw-measure-prose` 68ch,
  `--lw-measure` 60ch, `--lw-measure-sm` 46ch), and **`--lw-text-2xs` (12px) is the type FLOOR**: the
  smallest size any rule in the layers may state. Raise the floor in one place.
- **`Table collapse="cards"` is a CONTAINER query on `.lw-table-wrap[data-collapse]`, not a media query** —
  what is too narrow is the table's track, not the screen. **The DOM does not change**: one real `<table>`
  at every width, re-laid-out by CSS, so nothing is measured and server and client cannot disagree about
  which form to emit. Hence three rules — explicit `role="table"/"rowgroup"/"row"/"columnheader"/"cell"`
  **only when `collapse` is set** (block layout drops a table's implicit semantics); the header row hidden
  and each detail cell printing its column from `data-label` (a visually-hidden header would announce the
  column twice); and the `<details>` holding the CONTROL, not the cells, because the parser foster-parents
  a non-cell child of a `<tr>` out of the table. Without `@container` the table scrolls as before.
  ⚠ Sorting survives the collapse through `Menu`, which paints on **product.css**. ⚠ And a
  `.lw-table-wrap` inside a grid or flex item needs a **`min-width: 0` ancestor**, or it grows past its
  pane instead of scrolling and there is nothing for the overflow hint to hint at.
- **`LogoRail mode="mono"` draws the image under `grayscale()`; the default MASK reads ALPHA and nothing
  else** — a JPEG, a PNG on a white card, or opaque-white lettering in a filled shape all mask to one blob.
  The right fix is a re-cut silhouette; `mono` is for a mark you cannot re-cut. ⚠ The mask form is measured
  by no card: the gates open cards over `file://`, where Chromium refuses a cross-origin mask.
- **The theme choice is written to TWO stores because it has TWO readers.** `localStorage` is for this
  document; the `lw-theme` **cookie** is the only one a *server* can read, and is what lets an SSR consumer
  emit `<html data-theme>` in the first byte. **One writer** — `persist()` in `hooks.js`; a component with
  its own copy of the write is how the cookie was lost for a year with no gate able to see it.
- **A logical CSS property is a promise about direction; keep it or do not make it.** `data-side`/
  `data-edge="start"` are on `inset-inline`/`border-inline-*`/logical radii, with `--lw-dir` flipping the
  drawer keyframes. **Two things are physical on purpose and carry comments saying so:** `.lw-safe-x` (a
  notch does not swap with writing direction) and `.lw-select`'s `padding-right` (coupled to
  `background-position`, which has no logical form).


## The design-project round-trip

`DesignSync` reads AND writes the project (`f2d90781-f891-45e3-bc88-ddb55e6f9444`), so the two are
kept in step by pushing, not by hand-mirroring. **Pushed in full on 2026-09-04**, when the project
was found at **v1.1.8** — fifteen releases behind, still carrying `templates/_tooling`, `lw.css`,
`app.css` and twelve `ds-base.js`/`support.js` pairs — while the repo was at v2.3.0. Everything from
v1.13.0 onward existed only in git, and the project is the surface a wholesale re-pull would have
restored from.

**To push:** `list_files` for the structural diff, then `finalize_plan` (globs for the writes, exact
paths for the deletes; the user approves the list), then `write_files` in batches of ≤256 with
`localPath` so contents never enter the model's context, then `delete_files`. Three things that cost
a session: **`CLAUDE.md` and `.claude/` are RESERVED** and rejected regardless of the plan (this file
therefore lives only in git); **`DesignSync` is not reachable from subagents** — call it in the main
loop; and `get_file` caps at 256 KiB, reporting `truncated: true`.

⚠ Push the generated artifacts too (`_ds_bundle.js`, `dist/`, `tokens.json`, `react.d.ts`, `r/`,
`*.card.js`) rather than leaving the project's older copies in place. Stale generated files are the
one thing a re-pull can reintroduce that no gate here would catch: `check:bundle` compares the bundle
against the sources it finds, so a stale bundle arriving WITH stale sources agrees with itself.

## Releasing — the tag invariant (do not get this wrong)

The git tag, `package.json#version`, and the committed content **must all agree.** This bit us before:
`v0.2.2` was cut without bumping past `0.2.1`, so every installed copy *reported* `0.2.1` while containing
v0.2.2 content, and any `version >= 0.2.2` check lies. For a package whose thesis is "consistency is a
dependency, not a discipline," the metadata lie is the defect that most directly undercuts the pitch.

To release `vX.Y.Z`:

1. Make the change. Run `npm run check` green; run the browser gates or let CI.
2. **Promote `## [Unreleased]` to `## [X.Y.Z] — <date>` in `CHANGELOG.md`, and leave a new empty
   `[Unreleased]` above it.** `CONTRIBUTING.md` already requires every change to land under
   `[Unreleased]`; nothing promoted it, so this step did not exist and the omission was invisible — the
   file still looked maintained.
3. **Re-point any `advisories.json` entry whose `fixedIn` names the release you are about to cut**, and
   check that every `fixedIn` in the file names a tag that will exist: `node -e "…"` against `git tag -l`,
   or simply eyeball it — count them, the file is short.
4. Bump `package.json#version` **in the same commit** as 1–3. (`stale-install-pin` will also make you move
   the README's `#vX.Y.Z` install line.)
5. `git tag vX.Y.Z` on that commit, `git push && git push --tags`.
6. Bump the pin in each consumer and refresh its lockfile. Enumerate them — see §Consumers.

**Never move a published tag** to fix a missed bump — cut the next version. A re-pointed tag breaks
reproducibility for anyone who already fetched the tarball, and surfaces as a confusing cache error rather
than a clean update.

**Steps 2 and 3 were added on 2026-09-03, after both failed at once.** v1.7.2 was written up in the
CHANGELOG and in an advisory (`fixedIn: 1.7.2`) and then never cut — so `lw-doctor`, the tool whose entire
purpose is telling a consumer which release fixes their defect, pointed at a tag that does not exist. Then
v1.8.0 was cut following steps 1–4 exactly as written, and recorded nothing, because the procedure did not
ask. **A four-step procedure that omits the two steps that keep the record honest will be followed
correctly and still lose the record.**

### The lockfile-no-op gotcha

After moving a consumer's pin, `npm/pnpm install` may say **"up to date"** and keep the *old* resolved
commit — git deps are cached by hash and the lockfile pins the old one. Verify with `grep
"leanwise-design" <consumer>/<lockfile>`; the resolved commit must be the new tag's SHA. If it did not
move, `rm -rf node_modules/@leanwise/design` and reinstall explicitly. "Up to date" is not "on the new
version."

## Consumers

Verified 2026-09-04 by enumeration (below), not by memory.

| Consumer | Pin | Consumes | PM |
|---|---|---|---|
| `leanwise-ai` | `#v2.3.0` | `tokens` `fonts` `reset` `base` `marketing` `product` + `./react` `./hooks` | pnpm |
| `leanwise-inspect/frontend` | `#v2.2.2` | `tokens` `fonts` `shadcn` `theme` `base` `product` + `./react` `./hooks` `./components` | npm |
| `P20251121-tss-app/frontend` | `#v1.7.1` | `tokens` `fonts` `shadcn` `theme` `base` | npm |
| `4DXs_plan/app` | `#v1.7.1` | `tokens` `fonts` `reset` `base` `marketing` `product` + `./react` | npm |
| `P20260806-sop/apps/web` | `#v1.7.1` | `tokens` `fonts` `shadcn` `theme` `base` `product` | npm |
| `P20260707-vss/frontend` | `#v0.2.3` | `tokens` `fonts` `shadcn` + preset + `./brand` | pnpm |
| `P20260706-rag-service/frontend` | `#v0.2.2` (reports **0.2.1**) | `tokens` `fonts`, vanilla | npm |

**Drift today (2026-09-05, by the loop).** **Every consumer is now behind**: v3.0.0 is cut and no pin
has moved — deliberately, because a two-major jump is its own piece of work. `leanwise-ai` `#v2.3.0` and
`leanwise-inspect` `#v2.2.2` are one major back; ⚠ this table went stale TWICE in one morning because
releases landed from another session between writing it and committing it — **run the loop below, do not
hand-edit a row.** **Three sit on `#v1.7.1`** (tss-app, 4DXs_plan, sop) and must cross BOTH v2.0.0 and
v3.0.0 — each release's **§Migration — per consumer, what to grep** lists the removals against every
tree, and v3.0.0's is one line (`leanwise-ai/src/routes/admin.posts.$id.tsx:602`, `<Toast tone="ok">`). **VSS (`#v0.2.3`) and rag-service (`#v0.2.2`) are pre-1.1**
and cannot be bumped in one jump: v1.1.0 broke the **JS entry points**, not the CSS surface. Sequence pin
bump → layer migration, so breakage is attributable to one or the other. (There is no `v1.1.0` tag and no
`v1.0.x` at all — the tags go `v0.9.0` → `v1.1.1`.)

⚠ **rag-service is NOT install-drifted.** `git show v0.2.2:package.json` says `"version": "0.2.1"` — the
bump was missed when that tag was cut, so pinning `#v0.2.2` *correctly* resolves a tree reporting `0.2.1`.
No reinstall changes that; the fix is a pin bump to `#v0.2.3`, the first tag whose version matches itself.

**This table is hand-maintained and has been wrong three times** — by eighteen tags on the flagship
consumer, by three missing rows, and by a seventh consumer the loop could not see because it looked only
one directory deep (`*/apps/web/` was added for it). A missing row reads as "nobody depends on that".
`lw-doctor` inverts **version** lookup, not **consumer enumeration** — it cannot tell this file that a
consumer exists. So enumerate:

```bash
for d in /srv/share/01_project-dev/*/ /srv/share/01_project-dev/*/frontend/ \
         /srv/share/01_project-dev/*/app/ /srv/share/01_project-dev/*/apps/web/; do
  pin=$(grep -o '"@leanwise/design": *"[^"]*"' "$d/package.json" 2>/dev/null | sed 's/.*: *"//;s/"$//')
  [ -n "$pin" ] && printf '%-46s %s\n' "${d#/srv/share/01_project-dev/}" "$pin"
done | sort -u
```

Before any bump: (1) rag-service hardcodes the brand at `src/routes/admin/w.$slug.tsx:720,728`
(`draft.branding?.accent || "#14B8A6"`), the only real brand hardcode in any consumer; (2) VSS spreads
brand utilities across ~63 sites in *components* (QA component-by-component) while rag-service concentrates
~98 in `src/styles/chat.css` + `app.css`; (3) a pin bump without a rebuild still serves the old palette
from `dist/`; (4) run `node tools/lw-token-lint.mjs <consumer>/src` — the TSX rules never fire in CI here.

## What not to do here

- Don't edit a derived color line — edit the `-c` triple. The triple is what Tailwind composes and what
  `brandVars()` synthesizes tints from.
- Don't put `OverlayProvider` above the themed element, or inside `.lw-topbar` (see Facts).
- Don't put a copy of `ds-base.js` or `support.js` beside a template. They live ONCE in
  `templates/_shared/`, there is no generator for them here, and `check:templates` fails a sibling.
- Don't hand-patch `_ds_bundle.js` or a `.card.js` to make a card render (v1.1.3 did). Fix the source and
  re-run the generator; a hand-patch makes the browser gates pass against something no source file says.
- Don't add a 4/8-digit hex (`#RGBA`, `#RRGGBBAA`) thinking the lint catches it — `raw-hex` matches 3/6
  digits only. Keep hex out of `tokens.css` entirely (it is HSL).
- Don't style inside a `.jsx`; the CSS layer is the single source of styling, which is what keeps the React
  and vanilla consumers from drifting. And don't state a sub-12px size in a layer.
- Don't edit a specimen to suit a gate. That is how a gate quietly stops measuring.
- Don't ship with a gate red, and don't add a consumer-side escape hatch (`// lw-token-lint-allow`) without
  a reviewer — it disables the arbitrary-token rule for that line, which exists because of a real
  `--accent` footgun.
- Don't grow this into a shadcn replacement. Each consumer owns its own shadcn copy for `Button`/`Select`/
  form primitives; this package owns the *contract* those copies render against. A component that needs a
  token belongs here; one that needs product logic does not.

## Ownership

LeanWise code → personal account **Okeysir198** (never the Vietsol org). The git dep is
`github:Okeysir198/leanwise-design#<tag>`. See the user's global CLAUDE.md for which account owns which
project folder.
