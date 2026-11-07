/* Builds theme.css — the whole LeanWise theme for a Tailwind v4 + shadcn/ui app —
   from src/palette.mjs. Also the one place the non-colour scales live. */
import { ramp, themes } from "../../src/palette.mjs";

/**
 * Unlayered overrides of STOCK shadcn defaults, keyed on the stock class so a call-site
 * utility (tailwind-merge drops the default) still wins. ONE table: theme.css prints it,
 * the registry's leanwise-base spreads it, and test/stock-keys.test.mjs fails when a
 * `keys` class disappears from the stock source (a shadcn bump would otherwise make the
 * rule silently match nothing).
 */
export const STOCK_OVERRIDES = [
  { why: "The stock ScrollArea thumb paints bg-border, too faint to find on a card.",
    sel: ['[data-slot="scroll-area-thumb"]'], decl: { "background-color": "var(--scrollbar)" },
    keys: [["scroll-area", 'data-slot="scroll-area-thumb"']] },
  { why: 'Stock Switch paints "off" with --input, a teal-grey too close to the primary "on".',
    sel: ['[data-slot="switch"][data-state="unchecked"]'], decl: { "background-color": "var(--switch-track)" },
    keys: [["switch", "data-unchecked:bg-input"]] },
  { why: "Stock inactive Tabs trigger is text-foreground/60: 4.5:1 exactly on muted, under once rendered.",
    sel: ['[data-slot="tabs-trigger"].text-foreground\\/60:not([data-state="active"]):not(:hover)'],
    decl: { color: "var(--muted-foreground)" },
    keys: [["tabs", "text-foreground/60"]] },
  { why: "The neutral secondary chip has no edge: on a selected row it is the same tint as the ground and disappears. The soft status chips all carry a -border role; this gives it one (not while focused, where the stock focus border wins).",
    sel: ['[data-slot="badge"].bg-secondary:not(:focus-visible)'], decl: { "border-color": "var(--accent-border)" },
    keys: [["badge", "bg-secondary"]] },
  { why: "Stock Alert description is text-destructive/90: an alpha-faded fill ink that fails 4.5 on the deepened destructive-soft tint; full --destructive reads the same and passes.",
    sel: ['[class*="alert-description"] [data-slot="alert-description"]'],
    decl: { color: "var(--destructive)" },
    keys: [["alert", "text-destructive/90"]] },
  { why: "Stock Command search icon is opacity-50: 2.0:1 on the popover, under the 3:1 an icon needs.",
    sel: ['[data-slot="command-input-wrapper"] svg.opacity-50'], decl: { opacity: "1" },
    keys: [["command", "size-4 shrink-0 opacity-50"]] },
  { why: "Stock dark invalid fields fade the border to destructive/50: 2.7:1, under the 3:1 a control boundary needs.",
    sel: ['.dark [data-slot="input"][aria-invalid="true"]', '.dark [data-slot="textarea"][aria-invalid="true"]',
          '.dark [data-slot="native-select"][aria-invalid="true"]', '.dark [data-slot="select-trigger"][aria-invalid="true"]',
          '.dark [data-slot="checkbox"][aria-invalid="true"]', '.dark [data-slot="radio-group-item"][aria-invalid="true"]'],
    decl: { "border-color": "var(--destructive)" },
    keys: [["input", "dark:aria-invalid:border-destructive/50"], ["textarea", "dark:aria-invalid:border-destructive/50"],
           ["native-select", "dark:aria-invalid:border-destructive/50"], ["select", "dark:aria-invalid:border-destructive/50"],
           ["checkbox", "dark:aria-invalid:border-destructive/50"], ["radio-group", "dark:aria-invalid:border-destructive/50"]] },
];

/** `{selector: declarations}` for the registry's cssVars/css object. */
export const stockOverridesObject = () =>
  Object.fromEntries(STOCK_OVERRIDES.map((r) => [r.sel.join(", "), r.decl]));

const STOCK_OVERRIDES_CSS = STOCK_OVERRIDES.map((r) =>
  `${r.why ? `/* ${r.why} */\n` : ""}${r.sel.join(",\n")} {\n${Object.entries(r.decl)
    .map(([k, v]) => `  ${k}: ${v};`).join("\n")}\n}\n`).join("\n");

export const FONTS = {
  sans: '"Geist", ui-sans-serif, system-ui, -apple-system, "Segoe UI", sans-serif',
  mono: '"Geist Mono", ui-monospace, SFMono-Regular, Menlo, monospace',
};

/* App type scale: size / line-height. 14 is app body, 12 the floor. */
export const TYPE = {
  xs: ["0.75rem", "1rem"],
  sm: ["0.875rem", "1.25rem"],
  base: ["1rem", "1.5rem"],
  lg: ["1.125rem", "1.75rem"],
  xl: ["1.25rem", "1.75rem"],
  "2xl": ["1.5rem", "2rem"],
  "3xl": ["1.875rem", "2.25rem"],
  /* Marketing display — fluid. */
  "display-sm": ["clamp(1.75rem, 3.4vw, 3rem)", "1.1"],
  display: ["clamp(2.375rem, 5vw, 4.5rem)", "1.05"],
};

/* Stock slots that are controls and carry a focus ring. */
export const FOCUS_CONTROLS =
  ':is([data-slot="button"], [data-slot$="-trigger"]:not([data-slot$="sub-trigger"]), [data-slot="checkbox"], [data-slot="radio-group-item"], ' +
  '[data-slot="switch"], [data-slot="toggle"], [data-slot="toggle-group-item"], [data-slot="slider-thumb"], ' +
  '[data-slot="badge"], [data-slot="sidebar-menu-button"], [data-slot="sidebar-menu-sub-button"], ' +
  '[data-slot="pagination-link"], [data-slot="alert-dialog-action"], [data-slot="alert-dialog-cancel"], ' +
  '[data-slot="dialog-close"], [data-slot="sheet-close"], [data-slot="sidebar-menu-action"], ' +
  '[data-slot="sidebar-group-action"], [data-slot="sidebar-rail"], [data-slot="navigation-menu-link"])';
/* Stock field slots, native fields outside any slot, and the input group around its control. */
export const FOCUS_FIELDS =
  ':is([data-slot="input"], [data-slot="textarea"], [data-slot="select-trigger"], [data-slot="native-select"], [data-slot="sidebar-input"], ' +
  'input:not([data-slot]):not([type="checkbox"]):not([type="radio"]), textarea:not([data-slot]), select:not([data-slot])):focus-visible, ' +
  '[data-slot="input-group"]:has([data-slot="input-group-control"]:focus-visible)';

export const RADIUS = "0.625rem";

const decl = (obj, indent = "  ") =>
  Object.entries(obj).map(([k, v]) => `${indent}--${k}: ${v};`).join("\n");

/* Every palette role, plus the ramp, becomes a Tailwind colour utility. */
const colorNames = Object.keys(themes.light);

export function buildThemeCss({ strict = false } = {}) {
  const rampVars = Object.fromEntries(Object.entries(ramp).map(([k, v]) => [`brand-${k}`, v]));
  const themeInline = {
    ...Object.fromEntries(colorNames.map((n) => [`color-${n}`, `var(--${n})`])),
    ...Object.fromEntries(Object.keys(ramp).map((k) => [`color-brand-${k}`, `var(--brand-${k})`])),
    "color-brand": "var(--brand-600)",
    "font-sans": "var(--font-sans)",
    "font-mono": "var(--font-mono)",
    "radius-sm": "calc(var(--radius) * 0.6)",
    "radius-md": "calc(var(--radius) * 0.8)",
    "radius-lg": "var(--radius)",
    "radius-xl": "calc(var(--radius) * 1.4)",
  };
  /* Emitted unconditionally (`static`) so plain CSS such as marketing.css can read
     the scale even where no utility uses it. */
  const typeScale = Object.fromEntries(
    Object.entries(TYPE).flatMap(([k, [size, lh]]) => [
      [`text-${k}`, size],
      [`text-${k}--line-height`, lh],
    ]),
  );

  const reset = strict
    ? "  /* strict: Tailwind's stock palette is cleared, so bg-emerald-500 emits nothing. */\n" +
      "  --color-*: initial;\n  --color-white: #fff;\n  --color-black: #000;\n" +
      "  --color-transparent: transparent;\n  --color-current: currentColor;\n"
    : "";
  return `/* GENERATED by \`npm run gen\` from src/palette.mjs — do not edit.
   LeanWise theme for Tailwind v4 + shadcn/ui. Import once, after tailwindcss:
     @import "tailwindcss";
     @import "@leanwise/design/${strict ? "theme-strict" : "theme"}.css";${strict ? `
   theme-strict.css is theme.css with Tailwind's stock colour palette removed, so a raw
   palette class compiles to nothing instead of an off-brand colour.` : ""}                                  */

@custom-variant dark (&:is(.dark *));

:root {
  --radius: ${RADIUS};
  --font-sans: ${FONTS.sans};
  --font-mono: ${FONTS.mono};
${decl(rampVars)}
${decl(themes.light)}
}

.dark {
  color-scheme: dark;
${decl(themes.dark)}
}

@theme inline {
${reset}${decl(themeInline)}
}

@theme static {
${decl(typeScale)}
}

@layer base {
  * {
    @apply border-border outline-ring;
  }
  body {
    @apply bg-background text-foreground font-sans;
    font-size: var(--text-sm);
    line-height: var(--text-sm--line-height);
    -webkit-font-smoothing: antialiased;
  }
  /* Every interactive element shows the pointer — shadcn's Button no longer does. */
  button:not(:disabled),
  [role="button"]:not([aria-disabled="true"]),
  [role="tab"], [role="menuitem"], [role="menuitemcheckbox"], [role="menuitemradio"],
  [role="option"], [role="switch"], [role="checkbox"], [role="radio"],
  a[href], summary, select, label[for], input[type="checkbox"], input[type="radio"] {
    cursor: pointer;
  }
  /* Native scrollbars take the thumb role and follow the theme (color-scheme). */
  html {
    scrollbar-color: var(--scrollbar) transparent;
  }
}

${STOCK_OVERRIDES_CSS}
/* On touch the collapsed sidebar rail widens so its menu buttons clear 44px. Stock
   SidebarProvider sets --sidebar-width-icon as an inline style, which only !important
   in a stylesheet can override. */
@media (pointer: coarse) {
  [data-slot="sidebar-wrapper"] {
    --sidebar-width-icon: 3.75rem !important;
  }
}

/* Focus is a SOLID brand ring, never faded.
   1. The generic outline sits in @layer base, so a stock \`outline-hidden\` on a menu,
      popover or command list still wins: content surfaces show no ring.
   2. The ring override is UNLAYERED so it beats the \`ring-ring/50\` utilities stock
      controls carry — but only on CONTROLS (stock gives them a ring), never on a
      *-content surface or an item that marks focus with a background.
   3. Fields: border + 1px ring. A borderless input inside a composite (Command, the
      input-group control) is not a field; its group is. */
@layer base {
  :focus-visible {
    outline: 2px solid var(--ring);
    outline-offset: 2px;
  }
}
${FOCUS_CONTROLS}:focus-visible {
  outline: none;
  --tw-ring-color: var(--ring);
  box-shadow: 0 0 0 2px var(--background), 0 0 0 4px var(--ring);
}
${FOCUS_FIELDS} {
  outline: none;
  border-color: var(--ring);
  box-shadow: 0 0 0 1px var(--ring);
}
`;
}
