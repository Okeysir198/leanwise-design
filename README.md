# @leanwise/design — LeanWise Design System (LDS v4)

The canonical token core for every LeanWiseAI product. **Depend on it; never copy it.**

Its predecessor (`DESIGN-SYSTEM.md`) shared token *values* by asking humans to hand-sync
two files. That failed: `--s-6` came to mean 24px in the marketing site and `--s6` 32px in
rag-service — a hyphen apart, 8px different — and a third product (VSS) initially shipped
with no LeanWise brand at all. This package remediated that: all three products — the
marketing site, VSS/Ask (via the Tailwind preset), and rag-service — now consume it, so
consistency is a dependency, not a discipline.

## Install

```jsonc
// package.json
"dependencies": {
  "@leanwise/design": "github:Okeysir198/leanwise-design#v0.6.5"
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

**1. Brand fills carry NAVY ink, not white.** Measured, not assumed:

| | white text | navy `#0B1220` text |
|---|---|---|
| teal `#14B8A6` | 2.49 ✗ | **7.52** ✓ |
| orange `#F97316` | 2.80 ✗ | **6.68** ✓ |

White-on-brand fails WCAG AA. `bin/lw-contrast-check.mjs` enforces this on every token change.

**2. A fill color and a text color are different tokens.** A color bright enough to fill a
button is too bright to read as text on white. Teal-500 as a link scores 2.49.

```tsx
<Button>Save</Button>          {/* bg-primary — the teal FILL */}
<a className="text-brand">   {/* brand-700 — teal as TEXT (5.06) */}
```
Same for `success` / `success-on`, `warning` / `warning-on`, `destructive` / `destructive-on`,
and — since v0.6.7 — `cta` / `cta-on`. Every one of those `-on` utilities is theme-aware: the
dark shade on light, the 400-tier on dark, so you never hand-write a theme conditional for ink.

**3. `--primary` is teal. Orange is a variant, not a token.** LDS says "one orange CTA per
view", but shadcn's `--primary` drives the *default* Button — putting orange there would make
every button a CTA. So:

```tsx
<Button>Ask</Button>                       // teal, the default, use freely
<Button variant="cta">Start free trial</Button>  // ORANGE — max ONE per view (linted)
```

And the corollary that catches everyone: **shadcn's `--accent` is a hover *surface*, not a
brand color.** Overriding it with a saturated color makes every ghost-button hover shout.
Per-tenant themes override `--primary` and `--ring`; never `--accent`.

## Logo

`assets/` holds the brand logo, and **this package is its source of truth**:

```
assets/logo-icon.png        the square icon mark
assets/logo-leanwise.png    the full wordmark
```

Import it (`import logo from "@leanwise/design/assets/logo-leanwise.png"`) or copy the PNG
into your app's `public/` — copying is fine, but **copy from here**, never from another app,
so every product serves the same file and a logo update is a version bump, not a scavenger
hunt.

**The logo is never tinted.** Do not run it through `--primary`, a CSS `filter`, tenant
`brandVars()`, or any recolor — the mark ships in its own colors and stays that way, on
light and dark alike.

## v0.3.0 marketing primitives (`lw.css`)

Five additive primitives, all token-driven:

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

## v0.4.0 scroll-driven motion + browser frame (`lw.css`)

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

## v0.5.0 SOTA interaction layer (`lw.css`)

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

Returns `{}` when there is no tenant color, so tokens fall through to LeanWise teal — **there
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
assets/                 the brand logo PNGs — the source of truth (see Logo)
lib/brand.js            brandVars() / inkOn() / monogram() (+ brand.d.ts)
bin/                    the contrast gate and the token lint
```

Colors are authored **once**, as an HSL triple, and derived into a usable color:

```css
--lw-brand-500-c: 173.4 80.4% 40%;            /* authored */
--lw-brand-500:   hsl(var(--lw-brand-500-c)); /* derived  */
```

The triple exists because Tailwind composes `hsl(var(--primary))` and needs bare channels; the
derived value exists because vanilla CSS needs a real color. Holding H/S/L as separate numbers
is also what lets `brandVars()` synthesize tints at runtime. Edit the triple; never the derived
line; never a hex in an app.

## Spacing is named by value

`--lw-space-24` is 24px. Always. The old scale had `--s-6` = 24px in one repo and `--s6` = 32px
in another, and nobody noticed for months.
