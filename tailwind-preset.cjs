/**
 * LeanWise Design System — Tailwind v3 preset.
 *
 *   // tailwind.config.js
 *   export default {
 *     presets: [require("@leanwise/design/tailwind-preset")],   // resolves to tailwind-preset.cjs
 *     content: ["./index.html", "./src/**\/*.{ts,tsx}"],
 *   }
 *
 * The point of registering cta/success/warning/brand here (and not just in CSS)
 * is that it makes `bg-cta` and `text-success` REAL utilities. Without them, a dev
 * reaches for `bg-[hsl(var(--cta))]` — an arbitrary-value escape that bypasses the
 * design system and cannot be linted. VSS had eleven of those. Give people the
 * utility they want and the escape hatch stops being tempting.
 *
 * Every color resolves through `hsl(var(--x) / <alpha-value>)`, so `bg-primary/15`
 * works — which is what badges and chips need.
 */

/* .cjs, not .js — package.json declares "type": "module" for react.js / brand.js /
   hooks.js, which would make a .js file here ESM: a CJS tailwind.config.js doing
   require() of it throws ERR_REQUIRE_ESM, and `module.exports` inside ESM exports
   nothing at all. The extension is what pins this one file to CommonJS.

   The guard below stays for browser-side tooling that reads this file without a
   module wrapper: in Node the `var` redeclares the wrapper's own parameter without
   touching it, so the real module object survives; in a browser it hoists to
   undefined and gets a shim. */
if (typeof module === "undefined") { var module = { exports: {} }; }

/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class", '[data-theme="dark"]'],
  theme: {
    container: {
      center: true,
      padding: "var(--lw-space-16)",
      screens: { "2xl": "var(--lw-col-page)" },
    },
    extend: {
      colors: {
        border: "hsl(var(--border) / <alpha-value>)",
        input: "hsl(var(--input) / <alpha-value>)",
        ring: "hsl(var(--ring) / <alpha-value>)",
        background: "hsl(var(--background) / <alpha-value>)",
        foreground: "hsl(var(--foreground) / <alpha-value>)",

        primary: {
          DEFAULT: "hsl(var(--primary) / <alpha-value>)",
          foreground: "hsl(var(--primary-foreground) / <alpha-value>)",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary) / <alpha-value>)",
          foreground: "hsl(var(--secondary-foreground) / <alpha-value>)",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive) / <alpha-value>)",
          foreground: "hsl(var(--destructive-foreground) / <alpha-value>)",
          soft: "hsl(var(--danger-soft) / <alpha-value>)",
          on: "hsl(var(--danger-on) / <alpha-value>)",
        },
        muted: {
          DEFAULT: "hsl(var(--muted) / <alpha-value>)",
          foreground: "hsl(var(--muted-foreground) / <alpha-value>)",
        },
        accent: {
          DEFAULT: "hsl(var(--accent) / <alpha-value>)",
          foreground: "hsl(var(--accent-foreground) / <alpha-value>)",
        },
        popover: {
          DEFAULT: "hsl(var(--popover) / <alpha-value>)",
          foreground: "hsl(var(--popover-foreground) / <alpha-value>)",
        },
        card: {
          DEFAULT: "hsl(var(--card) / <alpha-value>)",
          foreground: "hsl(var(--card-foreground) / <alpha-value>)",
        },

        // --- LeanWise additions -------------------------------------------
        // The one high-energy action color. `variant="cta"` on Button; nowhere else.
        // The fourth status — idle / pending / draft. `bg-neutral` / `text-neutral-on`.
        neutral: {
          DEFAULT: "hsl(var(--neutral) / <alpha-value>)",
          foreground: "hsl(var(--neutral-foreground) / <alpha-value>)",
          soft: "hsl(var(--neutral-soft) / <alpha-value>)",
          on: "hsl(var(--neutral-on) / <alpha-value>)",
        },
        cta: {
          DEFAULT: "hsl(var(--cta) / <alpha-value>)",
          foreground: "hsl(var(--cta-foreground) / <alpha-value>)",
          soft: "hsl(var(--cta-soft) / <alpha-value>)",
          // `text-cta-on` — orange as TEXT. NOT `text-cta`, which is the fill and
          // scores 2.80 on white. Mirrors success/warning/danger `-on`.
          on: "hsl(var(--cta-on) / <alpha-value>)",
        },
        info: {
          DEFAULT: "hsl(var(--info) / <alpha-value>)",
          foreground: "hsl(var(--info-foreground) / <alpha-value>)",
          soft: "hsl(var(--info-soft) / <alpha-value>)",
          on: "hsl(var(--info-on) / <alpha-value>)",
        },
        /* The modal/drawer backdrop — a ROLE that re-points on dark, not a
           hand-rolled `bg-black/50`. Not an hsl() wrapper: --lw-scrim is already a
           full colour with an alpha baked in. */
        scrim: "var(--lw-scrim)",
        // Cyan as TEXT. `text-brand` for a link/active label — NOT `text-primary`,
        // which is the fill color. Since v0.8.0 the brand fill also reads on white (5.68),
        // but the role token stays because DARK re-points it to brand-400.
        brand: "hsl(var(--brand) / <alpha-value>)",
        success: {
          DEFAULT: "hsl(var(--success) / <alpha-value>)",
          foreground: "hsl(var(--success-foreground) / <alpha-value>)",
          soft: "hsl(var(--success-soft) / <alpha-value>)",
          on: "hsl(var(--success-on) / <alpha-value>)",
        },
        warning: {
          DEFAULT: "hsl(var(--warning) / <alpha-value>)",
          foreground: "hsl(var(--warning-foreground) / <alpha-value>)",
          soft: "hsl(var(--warning-soft) / <alpha-value>)",
          on: "hsl(var(--warning-on) / <alpha-value>)",
        },
        navy: "hsl(var(--navy) / <alpha-value>)",

        /* shadcn's sidebar block. Eight derivations of existing roles, zero new
           tokens — see shadcn.css. `DEFAULT` is the `--sidebar` spelling; the older
           `--sidebar-background` name is emitted by shadcn.css for consumers whose
           vendored sidebar.tsx predates the rename, but is not given a utility here
           because `bg-sidebar` already covers it. */
        sidebar: {
          DEFAULT: "hsl(var(--sidebar) / <alpha-value>)",
          foreground: "hsl(var(--sidebar-foreground) / <alpha-value>)",
          primary: "hsl(var(--sidebar-primary) / <alpha-value>)",
          "primary-foreground": "hsl(var(--sidebar-primary-foreground) / <alpha-value>)",
          accent: "hsl(var(--sidebar-accent) / <alpha-value>)",
          "accent-foreground": "hsl(var(--sidebar-accent-foreground) / <alpha-value>)",
          border: "hsl(var(--sidebar-border) / <alpha-value>)",
          ring: "hsl(var(--sidebar-ring) / <alpha-value>)",
        },

        /* The categorical ramp. NOT wrapped in hsl() and NOT carrying <alpha-value>:
           --lw-chart-* are full colours with no channel-triple sibling, so there is
           nothing to compose an alpha into. `bg-chart-1/40` therefore does not work
           in v3; use a soft token or color-mix if you need a tint. */
        chart: {
          1: "var(--chart-1)", 2: "var(--chart-2)", 3: "var(--chart-3)", 4: "var(--chart-4)",
          5: "var(--chart-5)", 6: "var(--chart-6)", 7: "var(--chart-7)", 8: "var(--chart-8)",
          9: "var(--chart-9)", 10: "var(--chart-10)", 11: "var(--chart-11)", 12: "var(--chart-12)",
        },
      },

      // Every tier in the token scale is registered. A MISSING tier is the quiet
      // failure mode here: `rounded-full` / `shadow-xl` still compile, because
      // Tailwind falls back to its own stock value — so the utility renders
      // off-system and nothing lints. The token lint is a deny-list; it cannot
      // see a tier the preset never registered.
      /* Component geometry (v1.2) — the vocabulary the shadcn registry renders
         against, so a registry <Button> and a `.lw-btn` cannot drift.
         theme.css carries the same keys; check:presence fails if they diverge. */
      spacing: {
        "btn-x": "var(--lw-btn-pad-x)",
        "btn-x-sm": "var(--lw-btn-pad-x-sm)",
        "btn-x-lg": "var(--lw-btn-pad-x-lg)",
        "btn-gap": "var(--lw-btn-gap)",
        "chip-y": "var(--lw-chip-pad-y)",
        "chip-x": "var(--lw-chip-pad-x)",
        "chip-gap": "var(--lw-chip-gap)",
        "cell-x": "var(--lw-cell-pad-x)",
        "cell-y": "var(--lw-cell-pad-y)",
        "field-pad-x": "var(--lw-field-pad-x)",
        "control-sm": "var(--lw-control-h-sm)",
        "control-md": "var(--lw-control-h-md)",
        "control-lg": "var(--lw-control-h-lg)",
        "row": "var(--lw-row-h)",
        "card-pad": "var(--lw-card-pad)",
        "stack-gap": "var(--lw-stack-gap)",
        "switch-w": "var(--lw-switch-w)",
        "switch-h": "var(--lw-switch-h)",
        "switch-thumb": "var(--lw-switch-thumb)",
        "switch-gap": "var(--lw-switch-gap)",
        "check": "var(--lw-check-size)",
        "icon-sm": "var(--lw-btn-icon-sm)",
        "icon": "var(--lw-btn-icon)",
        "icon-lg": "var(--lw-btn-icon-lg)",
      },
      lineHeight: {
        "control": "var(--lw-lh-snug)",
      },
      letterSpacing: {
        "th": "var(--lw-th-tracking)",
        "btn": "var(--lw-btn-tracking)",
      },

      borderRadius: {
        none: "0",
        xs: "var(--lw-radius-xs)",
        sm: "var(--lw-radius-sm)",
        DEFAULT: "var(--lw-radius-md)",
        md: "var(--lw-radius-md)",
        lg: "var(--lw-radius-lg)",
        xl: "var(--lw-radius-xl)",
        "2xl": "var(--lw-radius-2xl)",
        full: "var(--lw-radius-pill)",
      },

      fontFamily: {
        sans: ["Geist", "-apple-system", "BlinkMacSystemFont", "Segoe UI", "system-ui", "sans-serif"],
        mono: ["Geist Mono", "ui-monospace", "SFMono-Regular", "Menlo", "monospace"],
      },

      // The fluid role scale. `text-h1` is a real utility, so a heading never
      // hand-rolls a clamp().
      fontSize: {
        /* Two micro-sizes the registry needs; the six semantic roles follow.
           NOTE these must live in THIS block — an earlier second `fontSize:` key
           in the same object literal is silently discarded, which is how the
           first attempt at this shipped nothing. */
        "th": ["var(--lw-th-text)", { letterSpacing: "var(--lw-th-tracking)" }],
        "chip": "var(--lw-chip-text)",
        // Marketing/hero display — one notch above h1, weight 500 (lighter editorial
        // voice than the 600 headings). `text-display` on a landing/auth hero headline.
        display: ["var(--lw-text-display)", { lineHeight: "var(--lw-lh-tight)", letterSpacing: "var(--lw-tracking-tighter)", fontWeight: "500" }],
        h1: ["var(--lw-text-h1)", { lineHeight: "var(--lw-lh-tight)", letterSpacing: "var(--lw-tracking-tighter)", fontWeight: "600" }],
        h2: ["var(--lw-text-h2)", { lineHeight: "var(--lw-lh-snug)", letterSpacing: "var(--lw-tracking-tight)", fontWeight: "600" }],
        h3: ["var(--lw-text-h3)", { lineHeight: "1.18", letterSpacing: "var(--lw-tracking-tight)", fontWeight: "600" }],
        lead: ["var(--lw-text-lead)", { lineHeight: "1.6" }],
        eyebrow: ["var(--lw-text-eyebrow)", { letterSpacing: "var(--lw-tracking-eyebrow)", fontWeight: "500" }],
      },

      boxShadow: {
        none: "none",
        xs: "var(--lw-shadow-xs)",
        sm: "var(--lw-shadow-sm)",
        DEFAULT: "var(--lw-shadow-md)",
        md: "var(--lw-shadow-md)",
        lg: "var(--lw-shadow-lg)",
        xl: "var(--lw-shadow-xl)",
        // shadow-2xl and shadow-inner have no token behind them, so they are
        // pinned to the nearest tier rather than left to resolve to Tailwind's
        // stock BLACK shadows — which would defeat the navy tint and its dark
        // re-point on the two utilities most likely to be reached for on a modal.
        "2xl": "var(--lw-shadow-xl)",
        inner: "var(--lw-shadow-sm)",
        focus: "var(--lw-focus-ring)",
        "focus-danger": "var(--lw-focus-ring-danger)",
      },

      /* `out` overrides Tailwind's stock name on purpose — the house curve should
         be what every `ease-out` gets, not only the ones that remembered a custom
         name. `emphasis` and `spring` are additive: no stock name to collide with,
         and both tokens have existed in tokens.css since 1.0 with nothing exposing
         them. `in` / `in-out` are deliberately absent — they are byte-identical to
         Tailwind's stock curves, so a second home for them buys nothing.
         theme.css carries the same three; check:presence fails if they diverge. */
      transitionTimingFunction: {
        out: "var(--lw-ease-out)",
        emphasis: "var(--lw-ease-emphasis)",
        spring: "var(--lw-ease-spring)",
      },
      transitionDuration: { fast: "var(--lw-duration-fast)", DEFAULT: "var(--lw-duration)", slow: "var(--lw-duration-slow)" },

      backgroundImage: {
        // The hero/brand panel gradient (navy → cyan, following the mark).
        "gradient-brand": "var(--lw-gradient-brand)",
        // The soft radial brand glow behind auth cards and empty hero states. Registered
        // as a real utility so nobody has to reach for an arbitrary value to get it —
        // that escape hatch is exactly how VSS's auth card ended up keyed to --accent
        // (a hover surface) instead of the brand, rendering an invisible grey wash.
        "brand-wash": "radial-gradient(40rem at 50% -10%, hsl(var(--primary) / 0.18), transparent)",
        // The editorial auth/landing aside: two cyan radial washes over the base. Keyed to
        // --primary so it themes per tenant. `bg-hero-aside` — a real utility, no arbitrary
        // value, so it stays lintable (the escape hatch is exactly the --accent footgun above).
        "hero-aside":
          "radial-gradient(60rem at 12% 8%, hsl(var(--primary) / 0.16), transparent 55%), radial-gradient(48rem at 88% 96%, hsl(var(--primary) / 0.12), transparent 55%)",
        // A faint hairline lattice for texture over the aside, keyed to the border token so
        // it disappears correctly in dark mode. Layer as `bg-hero-aside bg-hairline-grid`.
        "hairline-grid":
          "repeating-linear-gradient(0deg, hsl(var(--border) / 0.55) 0 1px, transparent 1px 88px), repeating-linear-gradient(90deg, hsl(var(--border) / 0.55) 0 1px, transparent 1px 88px)",
      },

      keyframes: {
        "accordion-down": { from: { height: "0" }, to: { height: "var(--radix-accordion-content-height)" } },
        "accordion-up": { from: { height: "var(--radix-accordion-content-height)" }, to: { height: "0" } },
        // Editorial entrance motion. `fade-up` is the signature hero/message reveal (rise +
        // fade); the two others are calmer variants for panels and cards. The global
        // prefers-reduced-motion block in tokens.css neutralizes all of them — no per-use guard.
        "fade-up": { from: { opacity: "0", transform: "translateY(10px)" }, to: { opacity: "1", transform: "none" } },
        "fade-in": { from: { opacity: "0" }, to: { opacity: "1" } },
        "scale-in": { from: { opacity: "0", transform: "scale(0.97) translateY(6px)" }, to: { opacity: "1", transform: "none" } },
        // Logo-rail loop: duplicate the track once in markup so -100% is seamless.
        // Neutralized by the global prefers-reduced-motion block in tokens.css.
        marquee: { from: { transform: "translateX(0)" }, to: { transform: "translateX(-100%)" } },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        // `animate-rise` is the one to reach for on a hero block or a chat message.
        rise: "fade-up var(--lw-duration-slow) var(--lw-ease-out) both",
        "fade-in": "fade-in var(--lw-duration-slow) var(--lw-ease-out) both",
        "scale-in": "scale-in var(--lw-duration-slow) var(--lw-ease-out) both",
        marquee: "marquee 40s linear infinite",
      },
    },
  },
};
