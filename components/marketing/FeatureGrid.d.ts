import * as React from "react";

export interface Feature { title: React.ReactNode; body: React.ReactNode; href?: string; more?: string }
export interface FeatureGridProps extends React.HTMLAttributes<HTMLDivElement> { features?: Feature[] }
/**
 * Numbered features on a hairline-divided grid; the brand edge draws in on hover, and
 * stands down under `prefers-reduced-motion`. Three, six or nine features — the grid
 * is 3-up above `--lw-bp-lg` and a row of two leaves a hole that reads as a missing
 * item. `more` is the link text and only renders with an `href`.
 */
export declare function FeatureGrid(props: FeatureGridProps): JSX.Element;