---
name: leanwise-ui
description: Build or change UI in a LeanWise app (any project using @leanwise/design, shadcn/ui and Tailwind v4). Use when adding a page, component, form, dialog, table, dashboard, marketing section, or changing colours, buttons or styling in such an app.
---

# LeanWise UI

LeanWise apps are **stock shadcn/ui** themed by `@leanwise/design`. The theme does the
branding; your job is to compose stock pieces and use theme roles.

## Decide in this order — stop at the first that works

1. **Stock shadcn component or block, used the shadcn way.** Search first with the shadcn
   MCP (`search_items_in_registries`, `view_items_in_registries`) across the stock registry,
   then `@leanwise`. Install with `npx shadcn@latest add <name>`.
2. **Stock + a brand role.** Need a brand look shadcn has no variant for? Use a theme role
   in `className`, or a `@leanwise/*` registry item. Do not edit the component to brand it.
   The CTA is a stock `Button` with `className="bg-cta text-cta-foreground hover:bg-cta/90"`.
3. **Build your own — only if shadcn has nothing.** Build from shadcn primitives and theme
   roles. If another app would need it, propose it for the `@leanwise` registry instead.

If the official shadcn skill is not installed, install it: `npx skills add shadcn/ui`, and
follow its component guidance.

## Rules

- **Theme roles only**: `bg-primary`, `text-muted-foreground`, `border-input`, `bg-cta`,
  `bg-info-soft`, `chart-1`… No hex, no `rgb()`, no Tailwind palette classes
  (`bg-blue-500`, `text-gray-600`), no `bg-[var(--x)]` arbitrary values.
- **One CTA per view.** Amber `cta` is the single most important action on a screen; every
  other action is the default (cyan) button or quieter.
- **Alerts and callouts are soft**: `bg-info-soft text-info-soft-foreground border-info-border`,
  and the `destructive-soft` trio for errors. Solid status fills are for badges.
- **Dark mode is `.dark`** on an ancestor; every role already has a dark value. Never write
  `dark:` colour overrides with literal colours.
- **A role that does not exist is a change to `@leanwise/design`** (`src/palette.mjs`), not
  a local CSS variable or override in the app. Say so instead of inventing one.
- **Keep local edits to installed shadcn components small**, so
  `npx shadcn add <name> --diff` keeps showing real upstream changes.
- Do not fork, copy or restyle a stock component to "make it LeanWise" — the theme already
  did that.

## Verify

```bash
npx lw-token-lint src
```

It fails on raw hex, palette classes, arbitrary `var()` and more than one `variant="cta"`
per file. Run it before you finish, and fix what it reports rather than silencing it.
