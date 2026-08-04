import * as React from "react";

export interface PlanFeature {
  label: React.ReactNode;
  /**
   * Defaults to `true`. A `false` row renders the `minus` glyph in
   * `--lw-fg-subtle` plus an `.lw-sr-only` word — two glyphs and a word, never
   * colour alone.
   */
  included?: boolean;
}

/** The standard CTA. The object form is what makes `linkAs` reachable. */
export interface PlanCta {
  label: React.ReactNode;
  href?: string;
}

export interface PlanCardProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "children"> {
  name: React.ReactNode;
  /** A mono sub-line under the plan name. */
  tagline?: React.ReactNode;
  /**
   * OPTIONAL, and its absence is a supported, finished state — nothing reserves
   * a price slot, so a card with no price closes up rather than showing a gap.
   * A component that forced a placeholder here would force a consumer with no
   * published price to invent one.
   */
  price?: React.ReactNode;
  /** Currency or per-seat unit, beside the price in `--lw-fg-subtle`. */
  unit?: React.ReactNode;
  /** Billing period, beside the price in `--lw-fg-subtle`. */
  period?: React.ReactNode;
  desc?: React.ReactNode;
  features?: PlanFeature[];
  /** A ReactNode for full control, or `{ label, href }` for the standard CTA. */
  cta?: React.ReactNode | PlanCta;
  /**
   * Adds a brand border and `--lw-brand-glow`, and nothing else. For a DARK
   * featured plan set `data-band="dark"` on the card instead — every child ink
   * re-points with zero overrides.
   */
  featured?: boolean;
  /** Text for an absolutely-positioned `.lw-pill` on the card's top edge. */
  ribbon?: React.ReactNode;
  /**
   * `.lw-sr-only` word that leads an included row. Default `"Included"`. The
   * glyph is aria-hidden, so without this an included and an excluded row read
   * out identically; it is a prop because the primary consumer is bilingual.
   */
  includedLabel?: string;
  /** The excluded twin. Default `"Not included"`. */
  excludedLabel?: string;
  /**
   * Replaces the anchor ELEMENT when `cta` is given in object form. Default
   * `"a"`. It receives what the raw `<a>` would: `href`, `className` and
   * `children`.
   */
  linkAs?: React.ElementType;
}

/**
 * A pricing plan card. `price` is optional and a card without one is complete
 * — see `PlanCardProps["price"]`.
 *
 * There is deliberately no `PlanGrid` (use `<Grid min={280}>`) and no
 * `BillingToggle` (use `<Segmented>` inside `.lw-plans-head`).
 */
export declare function PlanCard(props: PlanCardProps): React.JSX.Element;
