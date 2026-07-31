# CLAUDE.md

Guidance for Claude Code when working in this repository.

## What this is

**`@leanwise/design` v1.2.0** — the LeanWise design system. Tokens, five CSS layers, a Tailwind
preset, ~65 React components across eight categories, twelve page templates, and the **gates**
that turn the style guide into build failures.

The repo is the **working copy of a Claude Design project** (`f2d90781-f891-45e3-bc88-ddb55e6f9444`,
"LeanWise Design"). The design project is the authoring surface; this repo is what consumers
install. Edits made here do **not** flow back — see "The design-project round-trip" below.

`README.md` is the user-facing doc and the component index. `CONTRIBUTING.md` is the PR
checklist. `REVIEW.md` is the standing audit — **read its finding 1 before touching the CSS
layers.** This file is the *maintainer* doc: the things none of those say.

### Commands

```bash
npm install
npm run check          # contrast + self-check + themes + barrel types + bundle + templates.
npm run check:ci       # the above plus a11y + visual (both need a browser)
npm run check:a11y     # axe over every @dsCard — needs `npx playwright install chromium`
npm run check:visual   # every card x light/dark x comfortable/compact. --self-test checks the
                       #   PNG comparator itself; --record/--compare are what CI drives.
npm run tokens         # regenerate tokens.json (DTCG). GENERATED and COMMITTED — see below.
npm run dts            # regenerate react.d.ts from react.js. Also generated and committed.
npm run bundle         # regenerate _ds_bundle.js from the .jsx sources. Ditto — run it after ANY .jsx edit.
npm run build          # esbuild, per file, tools/lw-build.mjs -> dist/ (COMMITTED)
```

**CI runs them all** (`.github/workflows/ci.yml`, every push/PR). Local `npm run check` is
deliberately the six that need no browser.

`npm run check:tokens` runs the **self-check** (`--css`) — the raw-duration and
raw-z-index rules over `base.css` / `marketing.css` / `product.css`, plus the
missing-React-import rule over `components/**/*.jsx`. The TSX rules (raw hex,
palette escape, arbitrary `var()`, one-CTA-per-view) only fire against *consumer* source:
point it at one by hand before any pin bump — `node tools/lw-token-lint.mjs
<consumer>/src`. A green CI here proves contrast, theme parity and CSS discipline, **not**
token discipline downstream.

## Layout

```
tokens.css        THE source of truth — HSL channel triples + derived colors, all theme scopes.
                    Authored once as a triple; the derived line is generated. Edit the triple;
                    NEVER the derived line; never a hex in a consumer.
base.css          shared controls — the layer every surface needs.
marketing.css     grounds + hero. product.css    app surfaces.
                    Load order: tokens -> base -> marketing and/or product.
lw.css / app.css  @import SHIMS kept for one major. Do NOT load them alongside the real
                    layers — you get the rules twice.
email.css         literal hex + table layout on purpose: mail clients have no custom properties.
                    That makes it a SECOND HOME for palette values, so the contrast gate
                    asserts its literals against tokens.css — six had drifted, including the
                    v1.1.3 muted floor. Move a token, move the literal with it.
shadcn.css        maps --primary/--background/--accent onto tokens (no values of its own).
fonts.css+fonts/  Geist + Geist Mono, self-hosted, incl. Vietnamese subsets.
react.js/.d.ts    the barrel — re-exports every components/<cat>/*.jsx.
brand.js hooks.js runtime per-tenant theming; the hooks the components share.
tailwind-preset.cjs  registers cta/success/warning/brand/navy as REAL utilities so nobody
                    reaches for the bg-[hsl(var(--x))] escape hatch.
components/       ai data forms layout marketing nav overlays primitives —
                    .jsx + .d.ts pairs, plus *.card.html preview cards.
                    Ships .jsx SOURCE deliberately: the consumer's bundler does the transform.
                    Styling lives in the CSS layer, never in a .jsx.
templates/        twelve page templates, each *.dc.html + ds-base.js + support.js + .thumbnail.
                    ds-base.js and support.js are GENERATED and byte-identical across all
                    twelve — never hand-edit one copy.
tools/            the gates + _css.mjs (the shared CSS reader). ROOT is ONE level up.
                    MOVED here from templates/_tooling in v1.2: the old location needed a
                    `"!templates/_tooling"` + re-include pair in `files`, which packs under npm
                    and NOT under pnpm — so the `bin` was missing in a pnpm consumer and the
                    token lint silently stopped running there.
preview/          thirteen foundation cards + _card.css/_card.js + _vendor/.
                    _vendor/ holds React, ReactDOM and @babel/standalone as PINNED, hashed
                    UMD copies (see its README). The cards used to load them from unpkg, which
                    made both browser gates network-dependent and unrunnable air-gapped.
                    _fonts.css was DELETED in v1.1.7: 140 KB of base64 mirroring fonts/ with no
                    generator. _card.css @imports ../tokens.css -> fonts.css -> fonts/*.woff2,
                    and those URLs resolve relative to fonts.css, so they are correct from any
                    card depth — measured over file://, identical glyph metrics without it.
                    A wholesale re-pull would reintroduce it; it is redundant HERE, not there.
_ds_bundle.js     compiled browser bundle, namespace `LeanWiseDesign_f2d907`. The cards render
                    from THIS, not from components/*.jsx. GENERATED by `npm run bundle`
                    (esbuild, `lw-bundle.mjs`) and COMMITTED — until v1.1.6 it was built in the
                    design project with no generator here, so a .jsx fix was invisible to
                    check:a11y and check:visual until the next wholesale sync; 34 sources had
                    drifted by the time the generator landed, and v1.1.3 had mirrored two ARIA
                    fixes in by hand. `check:bundle` now fails when it is stale.
                    **Edit a .jsx, run `npm run bundle`, commit both.**
_ds_manifest.json   A card declares itself with a first-line `<!-- @dsCard group="..." -->`
                    marker; the a11y and visual gates enumerate cards from that marker.
tokens.json       GENERATED by `npm run tokens`, and COMMITTED. See below.
react.d.ts        GENERATED by `npm run dts` from react.js, and COMMITTED. Never hand-edit.
```

`tokens.json` is generated, and committed anyway. It is in `package.json#exports`, and every
consumer installs from a git tag — where a file generated at publish time does not exist, so
the subpath 404s. The cost of committing a generated file is that it can go stale silently,
so `check:themes` fails when `tokens.json` does not match what `tokens.css` would generate:
**change a token, run `npm run tokens`, commit both.**

## The gates — all must stay green

- **`lw-contrast-check.mjs`** — the WCAG AA gate. Parses `tokens.css` per theme block, resolves
  `var()` chains, evaluates a derived MANIFEST, and **enforces dark-block parity**. It also
  asserts the **logo SVG gradient stops** (`offset 0` -> navy-700, `offset 1` -> logo-cyan)
  match `tokens.css` — the gradient stops must be literal hex because custom properties do not
  cascade into an SVG loaded through `<img>`, so this is the only guard on that second home for
  a brand value. It asserts **`email.css`'s literals** the same way and for the same reason.
  It also carries a **non-text group (WCAG 1.4.11, 3:1)** for control boundaries and focus
  indicators — until v1.1.5 every pair was a TEXT pair, `AA_LARGE` was dead code, and control
  borders were shipping at 1.47:1. Run it on every token change.

  **THREE canonical scopes since v1.1.7: light, `.dark`, and `light ⊕ media-dark`.** The third
  is what a browser computes for a user whose OS prefers dark and whose page sets no class —
  the default for a plain marketing page, and so the most common deployment of all. It was
  measured by nothing, and it was broken: `--lw-chart-1..8` and `--lw-diff-*` re-pointed only
  behind a class selector, so that visitor got the LIGHT diff grounds on a navy page and
  `.lw-diff-line .t` painted `--lw-fg` #E7ECF3 over #E7F9ED — **1.08:1, a blank diff surface**.
  The scope is merged in SOURCE ORDER, not as a spread: a `:root` in a media query and a
  top-level `:root` have identical specificity, so a naive `{...light, ...media}` reports a
  palette the browser never paints. `darkScopeDivergence()` now compares the two dark scopes
  token-for-token and fails by name — which is what caught the chart family, since no manifest
  pair names it.
- **`lw-token-lint.mjs`** — a **deny-list, not a contract checker**: raw hex, palette escape,
  arbitrary `var()` inside `[…]`, more than one `variant="cta"` per file. It cannot see a
  utility the preset no longer registers, so a removed utility compiles, lints green, and
  renders unstyled. **Grep the consumers before you remove a utility.** Its no-arg SELF-CHECK
  mode also asserts every `components/**/*.jsx` that references `React.` imports it: the build
  sets `jsx: "automatic"`, which injects `jsx`/`jsxs` but NOT the `React` binding, so eighteen
  components shipped a `ReferenceError` that the cards could not see (they get React as a UMD
  global) and the build did not catch.
- **`lw-tokens-dtcg.mjs`** — the DTCG generator; `--check` fails when a channel is not
  re-pointed in *every* theme scope. This is what stops a token existing in light and silently
  inheriting in dark.
- **`lw-a11y.mjs`** — axe over every `@dsCard`. serious/critical fail; moderate/minor report.
  A node may opt out of ONE rule with `data-a11y-expect="<rule-id>"` — for a specimen that
  exists to demonstrate a failure (the neutrals card prints text-4's sub-AA ratio as the
  point of the row). Never exempt a whole card or a whole rule; the attribute is greppable
  so the exemptions stay countable. There is exactly one today.
- **`lw-dts-barrel.mjs`** — generates `react.d.ts` from `react.js`; `--check` fails when the
  committed file is stale. The barrel's types were hand-written next to a barrel whose runtime
  exports are the real list, and drifted: four re-exports pointed at a sibling's file and **31
  components had no types at all**. The first broke `npm run build` outright (rollup-plugin-dts
  rejects a re-export the target does not declare), taking `prepublishOnly` with it; the other
  31 failed quietly, as a type error in the consumer. Add the export to `react.js` and the
  declaration to the component's `.d.ts`, then `npm run dts`.
- **`lw-bundle.mjs`** — builds `_ds_bundle.js` with esbuild; `--check` fails when the committed
  copy is not what the current sources produce. This is what makes the two browser gates test
  the `.jsx` they claim to: without it a component fix sat unmeasured until the design project
  re-cut the bundle. React is **not** bundled — `react`/`react-dom` resolve to CommonJS shims
  over `globalThis.React`/`ReactDOM`, so esbuild's `__toESM` copies the whole runtime object and
  the shim cannot lag React's API. The namespace surface is the barrel's exports **plus** every
  uppercase-first export of a module the barrel pulls in (that is what keeps `SERIES`,
  `DataTable`, `Legend`, `IconNames` reachable from a card); when both a barrel name and a
  sibling collide — `chart-parts.jsx` exports a chart-axis `Grid`, `layout/Grid.jsx` the layout
  one — the barrel wins and the loser is listed in the header's `unexposedExports`. Two
  NON-barrel modules exporting one uppercase name is a hard error, because nothing there can
  pick a winner. It also greps every card for names read off the namespace and fails on one
  that is missing, since a card that reads an absent key renders blank and axe scores blank as
  clean. Full rationale is in the file's own header.
- **`_cards.mjs`** — not a gate, but the list BOTH browser gates enumerate. They used to walk
  for `.html` files whose first 200 bytes contain `@dsCard`, which had two silent-pass holes:
  an empty result is a pass (`Promise.all([])` resolves, and the a11y gate prints "0 cards —
  no violations"), and a card whose preamble grew past 200 bytes dropped out of both gates
  with no diagnostic. It now cross-checks `_ds_manifest.json` against the filesystem and
  errors on disagreement in either direction.
- **`lw-templates.mjs`** — the only gate that opens a `.dc.html`. Three of the others read CSS,
  one reads the barrel, two drive a browser; every rule this file states about `templates/**`
  was enforced by memory alone. It asserts (a) `ds-base.js` and `support.js` are byte-identical
  across all twelve — "never hand-edit one copy" was previously undetectable, and it reports the
  ODD ONE OUT rather than just "they differ", because with twelve copies the useful answer is
  which to revert; (b) no template loads the `lw.css`/`app.css` shims alongside the real layers
  (it strips comments and script bodies first — three templates DISCUSS `app.css` in prose, and
  a substring match that flags prose gets muted, which is worse than no gate); (c) `lang`, a
  main landmark, and a skip link whose target actually exists. It found four real gaps the
  moment it ran: `ai-app-shell` and `docs-page` had a `<main>` with no `id` and no skip link —
  missed by the v1.1.5 sweep — and `email`/`pitch-deck` had no landmark at all. **A sweep with
  no gate behind it is a one-time event.** `NO_SKIP_LINK` is the greppable exemption list, same
  discipline as `data-a11y-expect` on the cards.
- **`lw-visual.mjs`** — every card x light/dark x comfortable/compact. Through v1.1.6 this gate
  **could not fail in CI and never had**: comparison was a byte-exact PNG match (valid only on
  the machine that recorded it) and `.visual/` is gitignored, so every run recorded 136 fresh
  shots and compared nothing. Both halves are fixed:
  - **A pixel diff**, via a hand-rolled PNG decoder on `node:zlib` (IHDR + inflated IDATs + the
    five unfilter modes). Deps stay at four. It is verified against **Chromium's own decoder**
    — same bytes through `<img>` → canvas → `getImageData`, max channel delta 0. That check is
    the one that matters: a subtly-wrong unfilter passes every self-consistency test you can
    write, and fails that one. `--self-test` runs it.
  - **Two per-shot rules**, because neither alone works: soft (channel Δ>8 over **0.02%** of
    pixels) catches a whole-page tint; strong (Δ>48 over **0.002%**) catches a 1px hairline
    recoloured along 1200px, which is 0.038% of a shot and invisible to any 0.1% area rule.
    The thresholds come from a MEASURED noise floor — 816 shots across six runs, 815
    byte-identical, one moved 0.0002%. **Raise them only with an observed percentage quoted;
    never round up "to be safe."** Known blind spot, documented rather than tuned away: small
    area + moderate delta on one card sits under both.
  - **CI records the BASE REF's baseline on its own runner** (`$RUNNER_TEMP`, since
    `actions/checkout` runs `git clean -ffdx`), re-checking out HEAD's `tools/` so
    both sides are scored by the same comparator. Needs `fetch-depth: 0`. No usable base ref
    (force-push, shallow, first commit) → loud skip at exit 0, never a silent pass.
  - **`[visual-ok]` in the head commit message** downgrades a failure to a report. This exists
    because `--update` is meaningless in CI — the baseline dies with the runner — so without it
    every intentional CSS change would be permanently red and unmergeable. Deliberately
    awkward and greppable (`git log --grep`), the same property that keeps `data-a11y-expect`
    honest. The diff artifact uploads on `if: always()`, because the overridden run is exactly
    the one worth looking at.

## Facts worth not re-deriving

- **Brand.** Cyan `#0C727B` (`--lw-brand-500`, white ink 5.66), navy `#024576` (`--lw-navy-700`),
  amber `#FCB603` (`--lw-cta-500`, navy ink 10.54). `--lw-logo-cyan` `#0A8799` is **artwork-only**
  — no UI rule may consume it. The palette was sampled FROM the mark, not picked; if you re-tune
  it, re-sample the mark and erode the anti-aliased edges first.
- **Ink follows the FILL's lightness, not the brand.** White on brand teal; navy on the amber CTA
  and the status fills. Do not "restore" a uniform rule — the contrast gate will fail.
- **A fill color is usually not a text color.** Hence the three-way `fill` / `text` / `ink` split.
  Brand is the exception: brand-500 reads on white, so `--lw-brand-text-c` points at the fill on
  light and at brand-400 on dark.
- **`brand-text` is the LINK shade; `brand-on` is the ink for the brand TINT.** They are not
  interchangeable — `brand-text` on `--lw-brand-soft` measures 3.98 over an inset, which is
  what `.lw-chip` and `.lw-avatar` shipped through v1.1.2. `--lw-brand-on` (added v1.1.3)
  mirrors `--lw-success-on`: brand-700 on light, brand-300 on dark. Every `background:
  var(--lw-brand-soft)` rule pairs with `color: var(--lw-brand-on)`.
- **A derived role must be re-derived in every scope that re-points its channel.**
  `--lw-fg: hsl(var(--lw-fg-c))` is substituted where it is DECLARED, so a scope that only
  re-points `--lw-fg-c` inherits the page-theme COLOR. This bit `.dark` (used as a scoped
  subtree throughout the layers), every `shadcn.css` alias, and the two chart-chrome tokens.
  At `<html>` it happens to work, because the declaration and the override land on the same
  element — which is why it survived: the case everyone demos is the one that cannot fail.
  The `:where(...)` block at the foot of `tokens.css` is where a new role goes.
- **A keyframe name is GLOBAL and last-wins.** `lwPulse` was defined in `base.css` and again
  in `product.css`; product's won for every consumer in the supported load order, and no gate
  can see a name collision. Prefix new animations distinctly.
- **A TIER is theme-invariant; a ROLE re-points.** `--lw-text-3` / `--lw-surface-2` are the
  same value in both themes on purpose. Paint a tier and your card renders light-mode ink on
  navy — 3.5:1. In anything that can be seen on both grounds, reach for the role
  (`--lw-fg-subtle`, `--lw-bg-inset`). The specimen cards got this wrong in five places.
- **A muted token is only as good as the darkest surface it lands on.** `--lw-text-3` was AA
  against white and 4.07 on `--lw-surface-3`, where `code` and `.lbl` actually sit. When you
  move a muted tier, check it against surface-3, not the page.
- **Opacity is not hierarchy.** `opacity: .42` on a masked graphic is fine; the same rule on
  text is a contrast cut the token system cannot see. Carry the recede in ink and size.
- **`--primary` is cyan; amber is the `cta` *variant*, one per view.** Shadcn's `--primary` drives
  the default Button — amber there makes every button a CTA. `--accent` is a ghost-button *hover
  surface*, not a brand color; per-tenant theming overrides `--primary`/`--ring` only.
- **Density is scoped, not global.** `--lw-control-h-*`, `--lw-row-h`, `--lw-card-pad`,
  `--lw-stack-gap` are driven by `data-density`. The 44px coarse-pointer minimum lives on the
  token, so anything with a height reads a density token or carries a comment saying why not.
- **The theme choice is written to TWO stores because it has TWO readers.** `localStorage` is
  for this document; the `lw-theme` **cookie** is the only one of the two a *server* can read,
  and it is what lets an SSR consumer emit `<html data-theme>` in the first byte instead of
  flashing the wrong theme. v0.6.5 added it for exactly that; the v1.1.0 wholesale replacement
  rewrote the hook with `localStorage` only and dropped it. Nothing failed, no gate could see
  it, and the flash came back for a year. Restored in v1.1.7, with **one writer** —
  `persist()` in `hooks.js`. `ThemeToggle` had its own copy of the write, which is how it
  missed the cookie in the first place.
- **A logical CSS property is a promise about direction; keep it or do not make it.**
  `data-side="start"` and `data-edge="start"` are logical APIs that were implemented as
  left/right, so an RTL consumer asked for the start edge and got the end one — the API name
  was the only correct part. Now on `inset-inline`/`border-inline-*`/logical radii, with
  `--lw-dir` flipping the drawer keyframes (a `translateX` cannot mirror itself). **Two things
  are physical on purpose and carry comments saying so:** `.lw-safe-x` (`env(safe-area-inset-*)`
  describes a notch, which does not swap with writing direction) and `.lw-select`'s
  `padding-right` (coupled to `background-position`, which has no logical form — convert one
  without the other and RTL gets the gap opposite the chevron).

## The design-project round-trip

The Claude Design project is the authoring surface. This repo was replaced wholesale from it at
v1.1.0. There is **no sync**: a change made here is invisible to the design project, and the next
wholesale pull would overwrite it.

- Small, surgical changes (a token, a gate, a bug in one component): make them here, and mirror
  them into the design project by hand if the project is still being authored against.
- Anything structural: make it in the design project and re-pull.

Pulling is `DesignSync list_files` / `get_file` against project id
`f2d90781-f891-45e3-bc88-ddb55e6f9444`. Two things that cost a session to learn:
**DesignSync is not reachable from subagents** — do the fetches in the main loop — and
`get_file` caps at 256 KiB and reports `truncated: true` rather than silently clipping.

**Do not re-pull `_ds_bundle.js`.** Since v1.1.6 it is built here by `npm run bundle` from these
sources, and `check:bundle` asserts it. Overwriting it with the design project's copy reopens the
exact drift the generator closed — and unlike a stale `.jsx`, the browser gates would go on
reporting green.

## Releasing — the tag invariant (do not get this wrong)

The git tag, `package.json#version`, and the committed content **must all agree.** This bit us
before: `v0.2.2` was cut without bumping past `0.2.1`, so every installed copy *reported* `0.2.1`
while containing v0.2.2 content, and any `version >= 0.2.2` check lies. For a package whose thesis
is "consistency is a dependency, not a discipline," the metadata lie is the defect that most
directly undercuts the pitch.

To release `vX.Y.Z`:

1. Make the change. Run `npm run check` green; run the browser gates or let CI.
2. Bump `package.json#version` **in the same commit**.
3. `git tag vX.Y.Z` on that commit, `git push && git push --tags`.
4. Bump the pin in each consumer and refresh its lockfile.

**Never move a published tag** to fix a missed bump — cut the next version. A re-pointed tag
breaks reproducibility for anyone who already fetched the tarball, and surfaces as a confusing
cache error rather than a clean update.

### The lockfile-no-op gotcha

After moving a consumer's pin, `npm/pnpm install` may say **"up to date"** and keep the *old*
resolved commit — git deps are cached by hash and the lockfile pins the old one. Verify:

```bash
grep "leanwise-design" <consumer>/<lockfile>   # resolved commit must be the new tag's SHA
```

If it did not move: `rm -rf node_modules/@leanwise/design` and reinstall explicitly. "Up to date"
is not "on the new version."

## Consumers

| Consumer | Pin | Consumes | Package manager |
|---|---|---|---|
| `leanwise-ai` | `#v1.1.8` | `tokens.css` + `lw.css` + `./assets` + `./react` | pnpm |
| `P20260707-vss/frontend` | `#v0.2.3` | `tokens.css` + `shadcn.css` + preset + `./brand` | pnpm |
| `P20260706-rag-service/frontend` | `#v0.2.2` (reports **0.2.1** — see below) | `tokens.css`, vanilla | npm |

**This table is hand-maintained, and it has been wrong.** It read `#v0.8.1` for `leanwise-ai`
until 2026-07-31, when the real pin was `#v1.1.8` — eighteen tags of drift that did not exist.
The cost is not cosmetic: the entry is what anyone reasons from when deciding whether a change
is safe to ship, and it pointed at the flagship consumer. Verify against the consumer's own
`package.json` before trusting a row:

```bash
node -p "require('/srv/share/01_project-dev/leanwise-ai/package.json').dependencies['@leanwise/design']"
```

Real drift today is **VSS alone** (`#v0.2.3`) and **rag-service** (`#v0.2.2`).

**rag-service is NOT install-drifted.** This was recorded as drift for several releases and it is
wrong, which cost a diagnosis: `git show v0.2.2:package.json` says `"version": "0.2.1"` — the bump
was missed when that tag was cut, so pinning `#v0.2.2` *correctly* resolves a tree that reports
`0.2.1`. No reinstall or lockfile refresh can change that. The fix is a pin bump to `#v0.2.3` (the
first tag whose version matches its own content), not a reinstall. This is the exact failure the
release section below exists to prevent, caught from the other end.

**There is no `v1.1.0` tag, and no `v1.0.x` at all** — the tags go `v0.9.0` → `v1.1.1`. "v1.1.0" is
the *design project's* number for the wholesale replacement; the first version a consumer can
actually pin past that break is `#v1.1.1`.

**All three are many versions behind and none can be bumped in one jump.** The replacement
restructured the CSS layers, moved the CLIs under `templates/_tooling` (moved again to `tools/`
in v1.2), dropped `dist/` (restored in v1.2 — see below), and pointed
`main` at a flat `./react.js`. Diffing the tags says where the risk actually is: **zero `--lw-*`
tokens were dropped** (the new `tokens.css` is a strict superset, legacy `--lw-duration-*` aliases
included) and the Tailwind preset kept every utility family, so the CSS surface is close to safe.
**The break is in the JS entry points** — `./counter` was deleted (leanwise-ai imports it; restored
only at v1.1.5), `./react` lost its `require` condition and moved off `dist/` to ESM `.jsx` source,
`tailwind-preset.js` became `.cjs`, the eleven named icon exports (`Check`, `Sun`, …) gave way to
`<Icon name>`, `useTheme`/`useReveal`/`useSpotlight`/`useDeterministicCascade` moved from `./react`
to `./hooks`, and the `bin` field went away, so the CLIs are no longer installed binaries.

Before any consumer bump:

1. rag-service hardcodes the brand at `src/routes/admin/w.$slug.tsx:720,728`
   (`draft.branding?.accent || "#14B8A6"`) — the only real brand hardcode in any consumer. It must
   move or tenants inherit a stale default.
2. VSS spreads brand utilities across ~63 sites in *components*, so its QA is component-by-component;
   rag-service concentrates ~98 in `src/styles/chat.css` + `app.css`.
3. A pin bump without a rebuild still serves the old palette from `dist/`.

Sequence pin bump -> layer migration, so breakage is attributable to one or the other.

## What not to do here

- Don't edit a derived color line — edit the `-c` triple. The triple is what Tailwind composes and
  what `brandVars()` synthesizes tints from.
- Don't load `lw.css`/`app.css` alongside `base.css` + `marketing.css`/`product.css`.
- Don't hand-edit `ds-base.js` or `support.js` in one template — twelve copies, all generated.
- Don't hand-patch `_ds_bundle.js` to make a card render (v1.1.3 did, for two ARIA fixes). Fix the
  `.jsx` and run `npm run bundle`; a hand-patch makes the browser gates pass against something no
  source file says.
- Don't add a 4/8-digit hex (`#RGBA`, `#RRGGBBAA`) thinking the lint catches it — `raw-hex` only
  matches 3/6 digits. Keep hex out of `tokens.css` entirely (it is HSL).
- Don't style inside a `.jsx`. The CSS layer is the single source of styling; that is what keeps
  the React and vanilla consumers from drifting.
- Don't ship with a gate red, and don't add a consumer-side escape hatch
  (`// lw-token-lint-allow`) without a reviewer — it disables the arbitrary-token rule for that
  line, the rule that exists because of a real `--accent` footgun.
- Don't grow this into a shadcn replacement. Each consumer still owns its own shadcn copy for
  `Button`/`Select`/form primitives; this package owns the *contract* those copies render against.
  A component that needs a token belongs here; one that needs product logic does not.

## Ownership

LeanWise code → personal account **Okeysir198** (never the Vietsol org). The git dep is
`github:Okeysir198/leanwise-design#<tag>`. See the user's global CLAUDE.md for which account owns
which project folder.
