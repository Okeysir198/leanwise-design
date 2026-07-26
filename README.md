# @leanwise/design — LeanWise Design System (LDS v4)

The canonical token core for every LeanWiseAI product. **Depend on it; never copy it.**

Its predecessor (`DESIGN-SYSTEM.md`) shared token *values* by asking humans to hand-sync
two files. That failed: `--s-6` came to mean 24px in the marketing site and `--s6` 32px in
rag-service — a hyphen apart, 8px different — and a third product (VSS) initially shipped
with no LeanWise brand at all. This package remediated that: all three products — the
marketing site, VSS/Ask (via the Tailwind preset), and rag-service — now consume it, so
consistency is a dependency, not a discipline.

## The brand: two anchors, one accent

| | | |
|---|---|---|
| **cyan** `#0C727B` `--lw-brand-500` | the brand | every fill, `--primary`, the default button |
| **navy** `#024576` `--lw-navy-700` | the ground | dark surfaces, heading ink on light |
| **amber** `#FCB603` `--lw-cta-500` | the accent | one CTA per view, nothing else |

Cyan and navy are the logo's own two gradient stops — the palette is derived from the mark, not
picked from a swatch book. Amber is the one deliberate addition, placed ~144° from the cyan
(near-complementary) so it can never read as a second brand color. See `assets/build-logo.py`
and the Logo section below.

## Install

```jsonc
// package.json
"dependencies": {
  "@leanwise/design": "github:Okeysir198/leanwise-design#v0.9.0"
}
```

Pinned to a tag: a token change is a reviewable one-line bump in each app, on that app's
schedule. Drift becomes visible instead of silent.

## Use it — Tailwind + shadcn app (VSS, tss-app)

```js
// tailwind.config.js
export default {
  presets: [require("@leanwise/design/tailwind-preset")],
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  plugins: [require("tailwindcss-animate")],
};
```
```css
/* src/styles/globals.css */
@import "@leanwise/design/fonts.css";
@import "@leanwise/design/tokens.css";
@import "@leanwise/design/shadcn.css";
@tailwind base;
@tailwind components;
@tailwind utilities;
```

## Use it — vanilla CSS (marketing, rag-service)

```css
@import "@leanwise/design/fonts.css";
@import "@leanwise/design/tokens.css";
@import "@leanwise/design/lw.css";              /* marketing: the .lw-* classes */
```

## Use it — React components (v0.6+)

A compiled component layer renders the `.lw-*` classes above with correct, accessible
behavior — `react`/`react-dom` are peer deps. The token/CSS layer is unchanged, so this
is strictly additive; non-React apps keep consuming `tokens.css`/`lw.css` directly.

```ts
import { Button, ThemeToggle, CodeBlock, Console, StoryCard, FeatureGrid, LogoRail } from '@leanwise/design/react';
```

- **Primitives**: `Button`, `Eyebrow`, `Card` (ref-forwarding, native semantics, correct focus).
- **Theme**: `ThemeToggle` + `useTheme` — an accessible segmented light/dark/system control.
  `useTheme` drives the three-layer `[data-theme]` model, persists to `localStorage` AND the
  `lw-theme` cookie, and is **SSR-safe** — the server snapshot and the client's first render
  must agree (a fixed default), or React aborts hydration. See `src/react/use-theme.ts`.
- **Code**: `CodeBlock` — the `.lw-code` surface; takes server-highlighted HTML (`tok-*`
  spans from refractor) or raw code, optional filename header, accessible `tabs` mode.
- **Console**: `Console` — `.lw-console.log` shell with a `.lw-file-tree` (`role=listbox`)
  and `.lw-run-controls` for composable interactive demos; pair with `useDeterministicCascade`.
- **Composites**: `StoryCard` (the optional testimonial quote renders **only** when quote +
  person + role are all set — the no-fabrication rule, enforced at runtime), `FeatureGrid`,
  `LogoRail`, plus an inline-SVG `icons` set and `useReveal`/`useSpotlight`/`useDeterministicCascade` hooks.

`github:` installs run no lifecycle scripts, so the build output (`dist/react/`) is committed
at tag time; `pnpm build` (tsup) regenerates it. Full release notes live in `CHANGELOG.md`.

## The three rules that are not obvious

**1. Ink is chosen by the fill's LIGHTNESS, not by whether it's "the brand".** Measured, not
assumed — and this reversed in v0.8.0, when brand-500 was re-sampled from the logo and came out
20 points darker:

| | white text | navy `#0B1220` text |
|---|---|---|
| cyan `#0C727B` (brand) | **5.66** ✓ | 3.31 ✗ |
| amber `#FCB603` (CTA) | 1.77 ✗ | **10.54** ✓ |
| green `#16A34A` (success) | 3.30 ✗ | **5.69** ✓ |

The dark brand fill takes WHITE; the light CTA and status fills take NAVY. Through v0.7.x the
rule read "brand fills carry navy ink" — correct while brand-500 was a *light* cyan where white
scored 2.56. The premise changed, not the reasoning. `bin/lw-contrast-check.mjs` enforces both.

**2. A fill color and a text color are usually different tokens.** A color bright enough to fill
a button is normally too bright to read as text. Brand is the exception since v0.8.0 — the fill
is dark enough to read on white at 5.66 — but the split still holds for every status and the CTA,
so keep using the role token rather than reaching for a tier.

```tsx
<Button>Save</Button>        {/* bg-primary — the cyan FILL, white label */}
<a className="text-brand">   {/* theme-aware: brand-500 on light, brand-400 on dark */}
```
Same for `success` / `success-on`, `warning` / `warning-on`, `destructive` / `destructive-on`,
and `cta` / `cta-on`. Every one of those `-on` utilities is theme-aware: the dark shade on
light, the 400-tier on dark, so you never hand-write a theme conditional for ink.

**3. `--primary` is cyan. Amber is a variant, not a token.** LDS says "one amber CTA per
view", but shadcn's `--primary` drives the *default* Button — putting amber there would make
every button a CTA. So:

```tsx
<Button>Ask</Button>                             // cyan, the default, use freely
<Button variant="cta">Start free trial</Button>  // AMBER — max ONE per view (linted)
```

And the corollary that catches everyone: **shadcn's `--accent` is a hover *surface*, not a
brand color.** Overriding it with a saturated color makes every ghost-button hover shout.
Per-tenant themes override `--primary` and `--ring`; never `--accent`.

## Logo

`assets/` holds the brand logo, and **this package is its source of truth**:

```
assets/logo-paths.json      the traced GEOMETRY (see below) — not hand-editable
assets/logo-mark.svg        the hexagon mark, brand gradient — use on light grounds
assets/logo-mark-mono.svg   the same geometry in currentColor — for dark grounds
assets/logo-lockup.svg      mark + LEANWISE AI wordmark
assets/logo-icon.png        raster fallback of the mark (favicons, apple-touch-icon)
assets/logo-leanwise.png    raster fallback of the lockup (JSON-LD, crawlers)
```

Geometry and colour are generated separately, and only one of them is cheap to change:

- **Geometry** is an autotrace of `logo-4.png` (the rendition Truong pointed at), committed as
  `logo-paths.json` so `build-logo.py` needs nothing but the stdlib. Through v0.7.x the mark was
  *authored* — a regular hexagon plus fitted polylines — and topped out at **IoU 0.845**; the
  trace reaches **0.991** for the mark and **0.975** for the wordmark. Re-run
  `tools/trace-logo.py` (needs `vtracer`) **only when the art changes**.
- **Colour** is resolved from `tokens.css` at build time. Run `python3 assets/build-logo.py` after
  any brand/navy change — never hand-edit an SVG.

Fidelity costs bytes: the traced mark is 29 KB (11 KB gzipped) against 1.3 KB for the old
authored one. Settings were chosen where fidelity plateaus — a 4× trace buys +0.004 IoU for +60%
bytes, which is not worth it.

**The gradient stops are literal hexes.** CSS custom properties do not cascade into an SVG loaded
through `<img>`, so a `var()` there renders its fallback forever. That makes the SVG a second home
for a brand value, so `bin/lw-contrast-check.mjs` fails if the two disagree — `lw-token-lint`
cannot see inside `.svg`, so that gate is the only thing guarding it.

**The mark's cyan is not `brand-500`.** `--lw-logo-cyan` (`#0A8799`, 187.6° 88% 32%) is the only
token that exists purely for artwork, and no UI rule may consume it: it is too dark to read on the
navy paper (4.06) and too light to carry white ink (4.25). `brand-500` is deliberately ~5 points
darker so white ink clears AA — a compromise the logo does not have to make, because a logo
carries no text.

**The gradient variant is never tinted.** Do not run `logo-mark.svg` through `--primary`, a CSS
`filter`, or tenant `brandVars()`. When you need the mark to take the surrounding ink — a dark
footer, a coloured band — use `logo-mark-mono.svg`, which is `currentColor` by design. Note it
must be **inlined or used as a CSS `mask`**: `currentColor` inside an SVG loaded through `<img>`
resolves against that SVG's own root, not your document, so it would paint black.
`leanwise-ai/src/styles/chrome.css` (`.lw-logo .mark`) is the reference implementation.

Import it (`import logo from "@leanwise/design/assets/logo-mark.svg"`) or copy into your app's
`public/` — copying is fine, but **copy from here**, never from another app.

## The marketing layer (`lw.css`)

Only the marketing site consumes this layer; apps take `shadcn.css` instead. Everything here
is token-driven and additive. Release history is in `CHANGELOG.md` — this is the reference.

### Primitives

- **`.lw-hero-dark`** — full-bleed dark hero: deep-navy ground, masked hairline grid,
  subtle radial brand wash; on-dark text roles for descendants. Brand accent text on
  dark is `--lw-brand-400` (checked against `navy-deep` by the contrast gate).
- **`.lw-counter`** — count-up stat number (mono, tabular-nums). The JS helper
  `import { animateCounter } from "@leanwise/design/counter"` animates from 0 to
  `data-target` when invoked; markup ships the FINAL value, so no JS (and any
  reduced-motion preference) still renders the correct number.
- **`.lw-bar` / `.lw-meter`** — horizontal token-filled bars; width via the
  `--lw-bar-value` custom property (or an explicit `.fill` child). Dark-context
  variants inside `.lw-section.dark` / `.lw-hero-dark`.
- **`.lw-logo-rail`** — logo wall; add `.marquee` (with the track duplicated once as
  two `.lw-logo-track`s) for a slow 40s loop. Reduced motion falls back to a static
  wrap. Tailwind consumers get a matching `animate-marquee` utility from the preset.
- **`.lw-console.log`** — mono stream rows (`.lw-console-line`, with `.ok/.warn/.err`
  tones) inside the existing console frame; `.lw-console-caret` adds a blinking caret,
  static under reduced motion.

### Scroll-driven motion + browser frame

All progressive enhancement — double-gated behind `@supports (animation-timeline: …)`
AND `prefers-reduced-motion: no-preference`; the static state is always complete:

- **`.lw-scroll-fade`** — fade + 14px rise keyed to the element's own `view()` timeline.
  Layer on top of an IO reveal, never instead of it.
- **`.lw-scroll-progress`** — scaleX rail driven by root scroll (`scroll(root block)`).
  Consumer sizes/positions the bar; static state is full.
- **`.lw-draw`** — SVG line-draw on scroll. Set `--lw-draw-len` (path length in px) on
  the path; unsupporting browsers and reduced motion get the fully drawn path.
- **`.lw-browser-frame`** — browser chrome around a screenshot: `.lw-browser-bar` with
  three `<i>` dots + `.lw-browser-url` address pill, `--lw-brand-glow` shadow. Pure CSS.

### Interaction

- **`.lw-spotlight`** — cursor-tracking radial brand highlight on cards; consumer sets
  `--lw-mx`/`--lw-my` from pointermove. No JS → card unchanged.
- **`.lw-shine`** — one-shot shine sweep across a button face on hover.
- **`.lw-aurora`** — two slow counter-drifting brand blobs for dark grounds (sibling to
  `.lw-wash`; pick one).
- **`.lw-tilt-scene` / `.lw-tilt`** — subtle perspective lean + glow on hover for framed
  screenshots.
- **`::view-transition` defaults** — short fade timings for routers that opt into the
  View Transitions API; disabled entirely under reduced motion.

## Enforcement

```bash
npx lw-contrast-check          # every token pair ≥ WCAG AA. Run on token changes.
npx lw-token-lint src          # run in CI. This is what keeps the system alive.
```

The lint fails on raw hex, on Tailwind palette escapes (`bg-emerald-500`), on arbitrary-value
token access (`bg-[hsl(var(--primary))]` — use `bg-primary`), and on more than one
`variant="cta"` per view. **It is the load-bearing part of this package.** A shared token file
does not make products consistent; nothing stops a dev writing `bg-emerald-500` next to it.
That is precisely how the last system died.

## Per-tenant theming

```tsx
import { brandVars } from "@leanwise/design/brand";

<div style={brandVars(org?.accent)}>…</div>   // scope to the workspace, not <html>
```

Returns `{}` when there is no tenant color, so tokens fall through to LeanWise cyan — **there
is no "no-brand" state**. Tenant hexes are clamped (lightness into a legible band, saturation
floored) because a customer will eventually pick `#000000` or `#FFFF00`, and the ink on top is
chosen from the *clamped* color by measured luminance.

## Layout

```
tokens.css              the source of truth — HSL triples + derived colors, light + dark
shadcn.css              maps --primary/--background/… → tokens
tailwind-preset.js      Tailwind v3 consumers
lw.css                  .lw-* marketing layer (+ 44px touch targets, iOS zoom guard)
fonts/ + fonts.css      Geist + Geist Mono, self-hosted, incl. Vietnamese subsets
assets/                 the logo: traced geometry + generated SVG/PNG (see Logo)
tools/                  trace-logo.py — re-traces the art (needs vtracer; rare)
lib/brand.js            brandVars() / inkOn() / monogram() (+ brand.d.ts)
bin/                    the contrast gate and the token lint
```

Colors are authored **once**, as an HSL triple, and derived into a usable color:

```css
--lw-brand-500-c: 185.0 82.0% 26.5%;          /* authored */
--lw-brand-500:   hsl(var(--lw-brand-500-c)); /* derived  */
```

The triple exists because Tailwind composes `hsl(var(--primary))` and needs bare channels; the
derived value exists because vanilla CSS needs a real color. Holding H/S/L as separate numbers
is also what lets `brandVars()` synthesize tints at runtime. Edit the triple; never the derived
line; never a hex in an app.

## Spacing is named by value

`--lw-space-24` is 24px. Always. The old scale had `--s-6` = 24px in one repo and `--s6` = 32px
in another, and nobody noticed for months.
