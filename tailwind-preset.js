/**
 * LeanWise Design System — Tailwind v3 preset.
 *
 *   // tailwind.config.js
 *   export default {
 *     presets: [require("@leanwise/design/tailwind-preset")],
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

/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class", '[data-theme="dark"]'],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: { "2xl": "1400px" },
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
        cta: {
          DEFAULT: "hsl(var(--cta) / <alpha-value>)",
          foreground: "hsl(var(--cta-foreground) / <alpha-value>)",
          soft: "hsl(var(--cta-soft) / <alpha-value>)",
        },
        // Teal as TEXT. `text-brand` for a link/active label — NOT `text-primary`,
        // which is the fill color and scores 2.49 on white.
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
      },

      borderRadius: {
        sm: "var(--lw-radius-sm)",
        DEFAULT: "var(--lw-radius-md)",
        md: "var(--lw-radius-md)",
        lg: "var(--lw-radius-lg)",
        xl: "var(--lw-radius-xl)",
        "2xl": "var(--lw-radius-2xl)",
      },

      fontFamily: {
        sans: ["Geist", "-apple-system", "BlinkMacSystemFont", "Segoe UI", "system-ui", "sans-serif"],
        mono: ["Geist Mono", "ui-monospace", "SFMono-Regular", "Menlo", "monospace"],
      },

      // The fluid role scale. `text-h1` is a real utility, so a heading never
      // hand-rolls a clamp().
      fontSize: {
        h1: ["var(--lw-text-h1)", { lineHeight: "var(--lw-lh-tight)", letterSpacing: "var(--lw-tracking-tighter)", fontWeight: "600" }],
        h2: ["var(--lw-text-h2)", { lineHeight: "var(--lw-lh-snug)", letterSpacing: "var(--lw-tracking-tight)", fontWeight: "600" }],
        h3: ["var(--lw-text-h3)", { lineHeight: "1.18", letterSpacing: "var(--lw-tracking-tight)", fontWeight: "600" }],
        lead: ["var(--lw-text-lead)", { lineHeight: "1.6" }],
        eyebrow: ["var(--lw-text-eyebrow)", { letterSpacing: "var(--lw-tracking-eyebrow)", fontWeight: "500" }],
      },

      boxShadow: {
        sm: "var(--lw-shadow-sm)",
        DEFAULT: "var(--lw-shadow-md)",
        md: "var(--lw-shadow-md)",
        lg: "var(--lw-shadow-lg)",
        focus: "var(--lw-focus-ring)",
      },

      transitionTimingFunction: { out: "var(--lw-ease-out)" },
      transitionDuration: { fast: "var(--lw-duration-fast)", DEFAULT: "var(--lw-duration)" },

      backgroundImage: { "gradient-brand": "var(--lw-gradient-brand)" },

      keyframes: {
        "accordion-down": { from: { height: "0" }, to: { height: "var(--radix-accordion-content-height)" } },
        "accordion-up": { from: { height: "var(--radix-accordion-content-height)" }, to: { height: "0" } },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
};
