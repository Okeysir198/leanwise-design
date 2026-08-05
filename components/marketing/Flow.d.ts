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
  /**
   * Node shape, drawn with radius and border weight — never colour alone.
   * Branching form only.
   */
  kind?: "step" | "decision" | "input" | "output" | "terminal";
  /**
   * Force the layer (0-based). Derived by longest path when omitted, and clamped
   * so a node can never precede a node it depends on. Branching form only.
   */
  column?: number;
  /** Force the lane within the layer. Derived from source order when omitted. */
  lane?: number;
}

/** The object form. Only branching needs it; `[from, to]` still works. */
export interface FlowEdge {
  from: string;
  to: string;
  /** Named on the connector's row in the successors table. */
  label?: string;
  /**
   * `back` routes the edge below every lane and draws it dashed. A cycle is
   * detected and treated as `back` whether or not it is declared — the layering
   * would not otherwise settle.
   */
  kind?: "forward" | "back";
}

/** Headers for the branching form's successors table. */
export interface FlowTableLabels {
  /** Column header over the node names. */
  step: string;
  /** Column header over the successors. */
  leadsTo: string;
  /** Cell text for a node with no successors. Defaults to an em dash. */
  none?: string;
}

export interface FlowProps extends Omit<React.HTMLAttributes<HTMLElement>, "children"> {
  nodes?: FlowNode[];
  /**
   * Which links are drawn. `[fromId, toId]` tuples or `FlowEdge` objects.
   *
   * In the CHAIN form this only SELECTS from the sequential chain — a pair that
   * is not adjacent in `nodes` cannot be drawn by a chain. Supplying such a pair
   * is what switches on the branching form (see `layout`), where any pair draws.
   */
  edges?: ([string, string] | FlowEdge)[];
  /**
   * `horizontal` (default) flows as columns and reverts to the stack under
   * `--lw-bp-md`; `vertical` stacks at every width. Chain form only.
   */
  orientation?: "horizontal" | "vertical";
  /**
   * `auto` (default) picks the chain whenever every edge joins consecutive
   * nodes, so every consumer written before v1.6.0 renders byte-identically.
   * `chain` pins the original behaviour; `graph` forces the lattice.
   */
  layout?: "auto" | "chain" | "graph";
  /**
   * Names the diagram and captions its successors table. **Required in the
   * branching form** — warns in the console when omitted.
   */
  label?: string;
  /**
   * The successors table's headers. **Required in the branching form**, and a
   * PROP rather than a literal on purpose: v1.3.1 moved ~70 hardcoded English
   * strings out of this package and a bilingual consumer must supply its own.
   */
  tableLabels?: FlowTableLabels;
  /** The container element. Default `"ol"`; the items follow it. Chain form only. */
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
 *
 * **Two forms.** A chain — the original, a linear row of cards. And a graph
 * (v1.6.0), selected by any edge joining non-consecutive nodes, which lays the
 * nodes on a routing lattice so a fan-out, a merge and a loop all draw.
 *
 * ⚠ **In the graph form the drawing is not the content.** "01 leads to 02 AND
 * 03" is the entire payload of a branching diagram and a lattice of bordered
 * cells says it in pixels alone, so the graph form also emits an `.lw-sr-only`
 * successors table — the same device, for the same reason, as the data table
 * under every chart. That is why `label` and `tableLabels` are required there.
 */
export declare function Flow(props: FlowProps): React.JSX.Element;
