import * as React from "react";

export interface FlowNode {
  id: string;
  label: React.ReactNode;
  /** A sub-line under the title, in `--lw-fg-subtle`. */
  sub?: React.ReactNode;
  /** An `Icon` NAME, never a drawing. Unknown names warn and draw UNKNOWN. */
  icon?: string;
  /**
   * Marks this node active. Emits real `aria-current="step"` and marks the node
   * POSITIVELY — brand border, `--lw-brand-glow`, a weight step on the title.
   * The other nodes are never dimmed: reduced-opacity text is a contrast
   * failure axe reports, not a hierarchy.
   */
  current?: boolean;
  /**
   * Extra content inside the node. Compose `<Disclosure>` here for a node that
   * expands — `Flow` deliberately grows no state of its own, and `Disclosure`
   * is a native `<details>` that works with zero JavaScript.
   */
  detail?: React.ReactNode;
}

export interface FlowProps extends Omit<React.HTMLAttributes<HTMLElement>, "children"> {
  nodes?: FlowNode[];
  /**
   * Which consecutive links are drawn, as `[fromId, toId]`. Defaults to the
   * full sequential chain. A pair that is not adjacent in `nodes` cannot be
   * drawn by a linear chain and is ignored.
   */
  edges?: [string, string][];
  /**
   * `horizontal` (default) flows as columns and reverts to the stack under
   * `--lw-bp-md`; `vertical` stacks at every width.
   */
  orientation?: "horizontal" | "vertical";
  /** The container element. Default `"ol"`; the items follow it. */
  as?: React.ElementType;
}

/**
 * An animated flow diagram — a pipeline, an onboarding sequence, a roadmap.
 *
 * The static state (SSR, no JS, reduced motion) is the COMPLETE diagram. All
 * motion lives in `marketing.css`, double-gated behind
 * `@supports (animation-timeline: view())` and
 * `@media (prefers-reduced-motion: no-preference)`; scroll only replays it.
 *
 * Server-safe: no state, no effects, no `"use client"`.
 */
export declare function Flow(props: FlowProps): React.JSX.Element;
