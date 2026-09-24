# @leanwise/design

The LeanWise brand as a **shadcn/ui theme and registry**. You build with stock shadcn
components; this package supplies the colours, type, focus ring and a handful of brand
blocks, so every LeanWise app looks like one product without anyone forking a component.

What ships:

| Path | What it is |
|---|---|
| `theme.css` | The whole theme for Tailwind v4 + shadcn: every role as a CSS variable, light and `.dark`, registered as utilities (`bg-primary`, `bg-cta`, `text-muted-foreground`…), the type scale, the radius, the solid focus ring, pointer cursors |
| `r/*.json`, `registry.json` | The shadcn registry: `leanwise-theme`, `leanwise-font`, `leanwise-font-mono`, `leanwise-base`, and the blocks `kpi-tile`, `state-view`, `file-upload`, `app-shell` |
| `marketing.css` | Plain-CSS layer for marketing sites (hero, sections, plans, footer), over theme variables only |
| `fonts.css`, `fonts/` | Geist + Geist Mono, self-hosted, Vietnamese subsets included |
| `assets/` | Logo mark, lockups, favicon, hero artwork |
| `brand` | `brandVars(hex, scheme)` — per-tenant theming |
| `hooks` | `useTheme`, `useReducedMotion`, `THEME_KEY` |
| `tokens.json` | The palette as DTCG, resolved to hex, for tools that cannot read CSS |
| `lw-token-lint` | The consumer lint (bin) |

Everything is generated from one file, `src/palette.mjs`.

## The rule: shadcn first

Every UI decision goes down this list and stops at the first step that works.

1. **A stock shadcn component or block, used the shadcn way.** `npx shadcn add button`.
   Composition, variants and props as the shadcn docs show them. The theme already makes it
   LeanWise.
2. **Stock component + a brand role.** When the brand needs something shadcn has no variant
   for, reach it through a theme variable or a `@leanwise` registry item — never by editing
   the component. The CTA is the example: a stock `Button` with
   `className="bg-cta text-cta-foreground hover:bg-cta/90"`.
3. **Build your own — only when shadcn has nothing.** Then build it from shadcn primitives
   and theme roles, and if a second app will need it, it belongs in this registry.

Keep local edits to installed components small, so `npx shadcn add <name> --diff` keeps
showing you real upstream changes.

## Quick start

A Tailwind v4 app with shadcn:

```bash
npx shadcn@latest init --base radix
npm i github:Okeysir198/leanwise-design#v5.0.0
```

In your global CSS, after Tailwind:

```css
@import "tailwindcss";
@import "@leanwise/design/fonts.css";
@import "@leanwise/design/theme.css";
```

`theme.css` replaces the colour block `shadcn init` writes into your CSS — delete that block
(`:root`, `.dark`, `@theme inline`) so there is one source.

Add the registry to `components.json`:

```json
{
  "registries": {
    "@leanwise": "https://raw.githubusercontent.com/Okeysir198/leanwise-design/v5.0.0/r/{name}.json"
  }
}
```

Then install the base and whatever blocks you need:

```bash
npx shadcn add @leanwise/leanwise-base
npx shadcn add @leanwise/app-shell @leanwise/kpi-tile
npx shadcn add button card dialog table   # stock, as always
```

Dark mode is the `.dark` class on an ancestor (shadcn's convention). `useTheme()` from
`@leanwise/design/hooks` toggles it and remembers the choice.

## The brand

- **Three fixed anchors**, asserted exact by `npm run check`:
  cyan `#0C727B` (`--primary`), navy `#024576` (`--navy`), amber `#FCB603` (`--cta`).
  Everything else is derived from the logo gradient, navy to cyan.
- **Logo**: `assets/logo-lockup.svg` on light, `assets/logo-lockup-ondark.svg` on navy,
  `assets/logo-mark.svg` alone, `assets/logo-favicon.svg` for the tab. Never recolour it.
- **One CTA per view.** Amber is the single high-energy action on a screen. Everything else
  is the default (cyan) button or quieter. `lw-token-lint` counts `variant="cta"` per file.
- **Ink follows the fill.** White on cyan and on navy; navy on amber and on warning.
- **Focus is a solid brand ring**, never faded. `theme.css` states it unlayered, so it wins
  over the `ring-ring/50` stock components carry — no component needs editing.
- **Borders** are quiet (`border`); **control boundaries** are stronger (`input`, 3:1 on
  every surface) so a text field reads as a field.
- **Pointer cursor** on everything interactive — buttons, tabs, menu items, options,
  switches, links, `summary`. `theme.css` sets it.
- **Info and error messages are soft.** Use `bg-info-soft text-info-soft-foreground
  border-info-border` (and the `destructive-soft` trio) for alerts and callouts; the solid
  fills are for badges and buttons.
- **Charts** use `chart-1`..`chart-5`, checked for separation under normal vision and all
  three dichromacies.

## Roles

Every role is a CSS variable in `:root` and `.dark`, and a Tailwind colour: `bg-<role>`,
`text-<role>`, `border-<role>`, `ring-<role>`, `fill-<role>`, with `/<opacity>`.

| Role | Use |
|---|---|
| `background` / `foreground` | The page and its text |
| `card`, `popover` (+ `-foreground`) | Raised surfaces |
| `primary` (+ `-foreground`) | Cyan. Default buttons, links, selection |
| `secondary` (+ `-foreground`) | Quiet cyan-tinted buttons and chips |
| `muted` / `muted-foreground` | Recessed surfaces; secondary text |
| `accent` (+ `-foreground`) | Hover and active surface for ghost items — not a brand colour |
| `destructive` (+ `-foreground`) | Errors, delete |
| `destructive-soft`, `-soft-foreground`, `-border` | Error alerts and callouts |
| `info` (+ `-foreground`) | Informational fill |
| `info-soft`, `info-soft-foreground`, `info-border` | Info alerts and callouts |
| `success`, `warning` (+ `-foreground`) | Status fills |
| `cta` (+ `-foreground`) | The amber call to action — one per view |
| `navy` (+ `-foreground`) | Brand dark panels and bands |
| `border` | Dividers, card edges |
| `input` | Control boundaries (3:1) |
| `ring` | Focus |
| `chart-1` … `chart-5` | Data series |
| `sidebar`, `sidebar-foreground`, `sidebar-primary`(`-foreground`), `sidebar-accent`(`-foreground`), `sidebar-border`, `sidebar-ring` | shadcn's sidebar |
| `brand-50` … `brand-900`, `brand` | The cyan ramp (`brand` = 600). For illustration and data, not UI state |

Never write a hex or a Tailwind palette class (`bg-blue-500`) in app code, and never reach a
role through an arbitrary value (`bg-[var(--primary)]`) — use the utility.

## Type

Geist for text, Geist Mono for code and figures. App body is 14px (`text-sm`); 12px
(`text-xs`) is the floor.

| Utility | Size / line height |
|---|---|
| `text-xs` | 12 / 16 |
| `text-sm` | 14 / 20 — body |
| `text-base` | 16 / 24 |
| `text-lg` | 18 / 28 |
| `text-xl` | 20 / 28 |
| `text-2xl` | 24 / 32 |
| `text-3xl` | 30 / 36 |
| `text-display-sm` | fluid 28–48, marketing |
| `text-display` | fluid 38–72, marketing |

Radius: `--radius` is 0.625rem; `rounded-sm/md/lg/xl` scale from it.

## Marketing sites

`marketing.css` is plain CSS over the theme variables — no JavaScript, works with or
without React.

```css
@import "tailwindcss";
@import "@leanwise/design/fonts.css";
@import "@leanwise/design/theme.css";
@import "@leanwise/design/marketing.css";
```

| Classes | For |
|---|---|
| `lw-container`, `lw-section`, `lw-section-head`, `lw-section-muted` | Page rhythm |
| `lw-page-ground`, `lw-page-dark`, `lw-aurora` | Page backgrounds |
| `lw-site-header`, `lw-site-brand`, `lw-site-nav`, `lw-announce` | Site chrome |
| `lw-hero`, `lw-hero-compact`, `lw-hero-actions`, `lw-display`, `lw-display-sm`, `lw-eyebrow`, `lw-lead` | Hero and display type |
| `lw-features`, `lw-feature`, `lw-feature-icon`, `lw-steps`, `lw-step` | Feature grids and flows |
| `lw-plans`, `lw-plan`, `lw-plan-featured`, `lw-compare` | Pricing and comparison |
| `lw-stat-row`, `lw-logo-rail`, `lw-quote`, `lw-media-plate`, `lw-prose` | Proof and content |
| `lw-footer`, `lw-cookie` | Footer and consent |

Dark follows `.dark`. Ambient motion is off unless an ancestor sets `data-ambient="on"`,
and `prefers-reduced-motion` always stops it.

## Per-tenant theming

A tenant's accent colour re-points the brand roles for its workspace only:

```tsx
import { brandVars } from "@leanwise/design/brand";

<div style={brandVars(org.accent, resolvedTheme)}>…</div>
```

One hex in; `--primary`, `--primary-foreground`, `--ring`, the sidebar twins and the
`--brand-50..900` ramp out, with lightness clamped so white ink still clears AA. Returns
`{}` for no usable colour, so the LeanWise theme applies unchanged. Scope it to the
workspace element, not `<html>`. The CTA, navy and status roles never change per tenant.

## Agent tooling

For Claude Code and other agents building LeanWise UIs:

- **shadcn MCP** — search and install stock and `@leanwise` items from the agent. This repo
  ships `.mcp.json`; in an app, add the same:
  ```json
  { "mcpServers": { "shadcn": { "command": "npx", "args": ["shadcn@latest", "mcp"] } } }
  ```
- **The official shadcn skill** — `npx skills add shadcn/ui`.
- **The `leanwise-ui` skill** — `skills/leanwise-ui/SKILL.md` in this package: the
  shadcn-first order, theme roles only, one CTA per view. Copy it into your app's
  `.claude/skills/`.
- **The lint** — `npx lw-token-lint src` before every commit and in CI.

## The lint

```bash
npx lw-token-lint src
```

Fails on a raw hex, a Tailwind palette class (`bg-blue-500`), a role reached through an
arbitrary value (`bg-[var(--primary)]`), or more than one `variant="cta"` in a file. It also
fails when it finds no source files, so a wrong path cannot pass.

## Developing this package

```bash
npm install
npm run gen        # src/palette.mjs -> theme.css, tokens.json
npm run check      # generated files current, tests, types, lint, contrast, presence
npm run check:ci   # + pack, a11y, visual self-test (needs `npx playwright install chromium`)
```

A new role is a change to `src/palette.mjs`, then `npm run gen` — never a local override in
an app. `check contrast` then holds it to the contract: every text pair 4.5:1, controls and
focus 3:1, the anchors exact, the chart series separable under colour blindness, and every
non-status colour inside the brand hue band.

## References

- shadcn theming — https://ui.shadcn.com/docs/theming
- shadcn registry — https://ui.shadcn.com/docs/registry
- shadcn MCP — https://ui.shadcn.com/docs/mcp
- shadcn skills — https://ui.shadcn.com/docs/skills
