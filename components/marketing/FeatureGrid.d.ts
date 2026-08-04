import * as React from "react";

export interface Feature { title: React.ReactNode; body: React.ReactNode; href?: string; more?: string }
export interface FeatureGridProps extends React.HTMLAttributes<HTMLDivElement> {
  features?: Feature[];
  /**
   * Replaces the anchor ELEMENT for features that carry an `href`. Default
   * `"a"`. Pass a router's Link so the tile navigates client-side and keeps any
   * path prefix that Link applies. It receives what the raw `<a>` would:
   * `href`, `className` and `children`. A feature without an href stays a
   * `<div>`.
   */
  linkAs?: React.ElementType;
}
/**
 * Numbered features on a hairline-divided grid; the brand edge draws in on hover, and
 * stands down under `prefers-reduced-motion`. Three, six or nine features — the grid
 * is 3-up above `--lw-bp-lg` and a row of two leaves a hole that reads as a missing
 * item. `more` is the link text and only renders with an `href`.
 */
export declare function FeatureGrid(props: FeatureGridProps): React.JSX.Element;