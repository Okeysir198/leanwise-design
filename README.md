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
  "@leanwise/design": "github:Okeysir198/leanwise-design#v0.2.3"
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
Same for `success` / `success-on` and `warning` / `warning-on`.

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
