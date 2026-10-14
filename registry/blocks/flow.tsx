import * as React from "react"

import { cn } from "@/lib/utils"

/* A flow diagram — a pipeline, an onboarding sequence, a roadmap. Styled by
   `@leanwise/design/marketing.css` (the `.lw-flow*` classes); import it.

   The static state (server render, no JavaScript, reduced motion, print) is the
   complete diagram. The component has no state and no effects, so it renders on
   the server; the draw-in lives in marketing.css behind the motion gate.

   Two forms. A chain when every edge joins consecutive nodes: a row of cards.
   A graph when any edge does not: nodes on a routing lattice whose connectors are
   CSS borders on grid cells, so a fan-out, a merge and a loop all draw without an
   SVG or a measurement. In the graph form the drawing is not the content — "01
   leads to 02 and 03" is said in pixels alone — so it also renders a visually
   hidden successors table, and `label` and `tableLabels` are required. */

type FlowNode = {
  id: string
  label: React.ReactNode
  /** Plain-text name for the successors table when `label` is not a string. */
  text?: string
  sub?: React.ReactNode
  /** A decorative icon element, e.g. a lucide icon. */
  icon?: React.ReactNode
  /** The one node the surrounding copy is about: `aria-current="step"`. Others are never dimmed. */
  current?: boolean
  /** Extra content inside the node, e.g. a native <details>. */
  detail?: React.ReactNode
  /** Shape, drawn by radius and border — never colour alone. Graph form only. */
  kind?: "step" | "decision" | "input" | "output" | "terminal"
  /** Force the layer (0-based), clamped so a node never precedes a dependency. Graph form only. */
  column?: number
  /** Force the lane within the layer. Graph form only. */
  lane?: number
}

type FlowEdge = {
  from: string
  to: string
  /** Named after the successor in the table. */
  label?: string
  /** `back` routes below every lane, dashed. A cycle is detected as `back` either way. */
  kind?: "forward" | "back"
}

type FlowTableLabels = {
  /** Header over the node names. */
  step: string
  /** Header over the successors. */
  leadsTo: string
  /** Text for a node with no successors. Defaults to an em dash; never an empty cell. */
  none?: string
}

type FlowProps = Omit<React.ComponentProps<"div">, "children"> & {
  nodes?: FlowNode[]
  /** `[from, to]` tuples or `FlowEdge` objects. Defaults to the full sequential chain. */
  edges?: ([string, string] | FlowEdge)[]
  /** Chain form: `horizontal` (stacks below 768px) or `vertical`. */
  orientation?: "horizontal" | "vertical"
  /** `auto` picks the chain when every edge is consecutive; `chain` and `graph` force one. */
  layout?: "auto" | "chain" | "graph"
  /** Names the diagram and captions its successors table. Required in the graph form. */
  label?: string
  /** The successors table's headers, in the consumer's language. Required in the graph form. */
  tableLabels?: FlowTableLabels
  /** Chain form container. Default `ol`. */
  as?: "ol" | "ul" | "div"
}

function Flow({ nodes = [], edges, orientation = "horizontal", layout = "auto", label, tableLabels, as, className, ...props }: FlowProps) {
  const list = edges?.map((e) => (Array.isArray(e) ? { from: e[0], to: e[1] } : e))
  const graph =
    layout !== "chain" && list?.length && (layout === "graph" || !isChain(nodes, list))
      ? planGraph(nodes, list)
      : null

  if (graph) return <FlowGraph graph={graph} label={label} tableLabels={tableLabels} className={className} {...props} />
  return <FlowChain nodes={nodes} edges={list} orientation={orientation} as={as} className={className} {...props} />
}

function NodeBody({ node, index }: { node: FlowNode; index: string }) {
  return (
    <>
      <span className="lw-flow-head">
        {node.icon && <span className="lw-flow-icon" aria-hidden="true">{node.icon}</span>}
        {/* The index is markup, not CSS counter(): generated content is not selectable. */}
        <span className="lw-flow-index">{index}</span>
      </span>
      <h3 className="lw-flow-title">{node.label}</h3>
      {node.sub && <p className="lw-flow-sub">{node.sub}</p>}
      {node.detail}
    </>
  )
}

const pad = (i: number) => String(i + 1).padStart(2, "0")

function FlowChain({
  nodes,
  edges,
  orientation,
  as,
  className,
  ...props
}: Omit<FlowProps, "edges" | "layout" | "label" | "tableLabels"> & { nodes: FlowNode[]; edges?: FlowEdge[] }) {
  const Tag = as ?? "ol"
  const Item = Tag === "div" ? "div" : "li"
  // NUL cannot occur in an id, so no key can forge the separator.
  const linked = edges ? new Set(edges.map((e) => `${e.from}\u0000${e.to}`)) : null
  const hasEdge = (a: string, b: string) => (linked ? linked.has(`${a}\u0000${b}`) : true)

  const children: React.ReactNode[] = []
  nodes.forEach((n, i) => {
    if (i > 0 && hasEdge(nodes[i - 1].id, n.id)) {
      children.push(<Item key={`edge-${i}`} className="lw-flow-edge" aria-hidden="true" />)
    }
    children.push(
      <Item key={n.id} className="lw-flow-node" aria-current={n.current ? "step" : undefined}>
        <NodeBody node={n} index={pad(i)} />
      </Item>
    )
  })

  return (
    <Tag
      data-slot="flow"
      className={cn("lw-flow", orientation === "vertical" && "lw-flow-vertical", className)}
      {...(props as React.HTMLAttributes<HTMLElement>)}
    >
      {children}
    </Tag>
  )
}

function FlowGraph({
  graph,
  label,
  tableLabels,
  className,
  ...props
}: Omit<React.ComponentProps<"div">, "children"> & { graph: Graph; label?: string; tableLabels?: FlowTableLabels }) {
  const index = new Map(graph.order.map((n, i) => [n.id, i]))
  const num = (id: string) => pad(index.get(id) ?? 0)
  const name = (id: string) => {
    const n = graph.order.find((x) => x.id === id)
    return n?.text ?? (typeof n?.label === "string" ? n.label : "")
  }

  warnOnce(!label, "Flow: the graph form needs `label` — it names the diagram and captions its successors table.")
  warnOnce(!tableLabels, "Flow: the graph form needs `tableLabels` — the successors table's headers, in your language.")

  return (
    <div data-slot="flow" className={cn("lw-flow-wrap", className)} {...props}>
      {/* The content. A table is a minimum-width box that overflow does not clip,
          so `table-fixed` and an out-of-flow caption are what hold it to 1px. */}
      <table className="sr-only table-fixed [&>caption]:absolute [&>caption]:w-px [&>caption]:overflow-hidden">
        {label && <caption>{label}</caption>}
        {tableLabels && (
          <thead>
            <tr>
              <th scope="col">{tableLabels.step}</th>
              <th scope="col">{tableLabels.leadsTo}</th>
            </tr>
          </thead>
        )}
        <tbody>
          {graph.order.map((n) => {
            const next = graph.successors.get(n.id) ?? []
            return (
              <tr key={n.id}>
                <th scope="row">
                  {num(n.id)} {n.text ?? n.label}
                </th>
                {/* One string, never a span per successor: an element box is
                    measured at its full width wherever the hidden cell sits. */}
                <td>
                  {next.length
                    ? next.map((e) => `${num(e.to)} ${name(e.to)}${e.label ? ` (${e.label})` : ""}`).join("; ")
                    : tableLabels?.none ?? "—"}
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>

      {/* The drawing. `ul`: a graph with a fan-out has no single order. */}
      <ul
        className="lw-flow lw-flow-graph"
        style={{ "--flow-tracks": graph.tracks, "--flow-row-tracks": graph.rowTracks } as React.CSSProperties}
      >
        {graph.order.map((n) => {
          const p = graph.place(n.id)
          return (
            <li
              key={n.id}
              className="lw-flow-node"
              aria-current={n.current ? "step" : undefined}
              data-kind={n.kind}
              style={{ "--flow-c": p.c, "--flow-r": p.r, "--flow-depth": graph.depth(n.id) } as React.CSSProperties}
            >
              <NodeBody node={n} index={num(n.id)} />
            </li>
          )
        })}
        {graph.connectors.map((c) => (
          <li
            key={`e-${c.c}-${c.r}`}
            className="lw-flow-cell"
            data-edge={c.tokens}
            data-edge-kind={c.kind === "back" ? "back" : undefined}
            aria-hidden="true"
            style={{ "--flow-c": c.c, "--flow-r": c.r } as React.CSSProperties}
          />
        ))}
      </ul>
    </div>
  )
}

const warned = new Set<string>()
function warnOnce(condition: boolean, message: string) {
  if (!condition || warned.has(message) || typeof console === "undefined") return
  warned.add(message)
  console.warn(message)
}

/* ── Layout: pure functions, no DOM, so the component stays server-safe ──────────
   Node column k sits on lattice column 2k+1 and lane l on lattice row 2l+1; the
   even tracks between them are gutters the connectors route through. Coordinates
   are 1-based grid lines. An edge spanning several columns runs along its source's
   lane and turns in the gutter before its target, so it passes behind any node in
   that lane in between; `column` and `lane` on a node are the escape hatch. */

const U = 1
const D = 2
const L = 4
const R = 8
const OPPOSITE: Record<number, number> = { [U]: D, [D]: U, [L]: R, [R]: L }

type Cell = { c: number; r: number }
type Connector = Cell & { mask: number; kind: "forward" | "back"; label?: string; tokens: string }
type Graph = {
  tracks: string
  rowTracks: string
  place: (id: string) => Cell
  depth: (id: string) => number
  order: FlowNode[]
  connectors: Connector[]
  successors: Map<string, FlowEdge[]>
}

/** `6` → `"u d"`, a token list CSS reads with `~=`. Arms of the tile, not direction of travel. */
function maskToTokens(mask: number) {
  const out: string[] = []
  if (mask & U) out.push("u")
  if (mask & D) out.push("d")
  if (mask & L) out.push("l")
  if (mask & R) out.push("r")
  return out.join(" ")
}

/** Longest-path layering over forward edges, so a merge sits after its LAST input. */
function assignColumns(nodes: FlowNode[], forward: FlowEdge[]) {
  const order = new Map(nodes.map((n, i) => [n.id, i]))
  const column = new Map(nodes.map((n) => [n.id, 0]))
  const incoming = new Map<string, string[]>(nodes.map((n) => [n.id, []]))
  for (const e of forward) incoming.get(e.to)?.push(e.from)

  for (let pass = 0; pass < nodes.length; pass++) {
    let moved = false
    for (const n of nodes) {
      const preds = incoming.get(n.id) ?? []
      if (!preds.length) continue
      const want = Math.max(...preds.map((p) => column.get(p) ?? 0)) + 1
      if (want > (column.get(n.id) ?? 0)) {
        column.set(n.id, want)
        moved = true
      }
    }
    if (!moved) break
  }

  for (const n of nodes) {
    if (typeof n.column === "number") {
      const floor = Math.max(0, ...(incoming.get(n.id) ?? []).map((p) => (column.get(p) ?? 0) + 1))
      column.set(n.id, Math.max(n.column, floor))
    }
  }

  // Lane order is source order within a column: ordering `nodes` is the lever.
  const lanes = new Map<number, number>()
  const lane = new Map<string, number>()
  for (const n of [...nodes].sort((a, b) => (order.get(a.id) ?? 0) - (order.get(b.id) ?? 0))) {
    const c = column.get(n.id) ?? 0
    const next = lanes.get(c) ?? 0
    const l = typeof n.lane === "number" ? n.lane : next
    lane.set(n.id, l)
    lanes.set(c, Math.max(next, l) + 1)
  }
  return { column, lane }
}

/** An edge into a node still on the depth-first stack closes a cycle: it is a back edge. */
function splitEdges(nodes: FlowNode[], edges: FlowEdge[]) {
  const ids = new Set(nodes.map((n) => n.id))
  const clean = edges.filter((e) => ids.has(e.from) && ids.has(e.to) && e.from !== e.to)
  const out = new Map<string, FlowEdge[]>(nodes.map((n) => [n.id, []]))
  for (const e of clean) out.get(e.from)?.push(e)

  const forward: FlowEdge[] = []
  const back: FlowEdge[] = []
  const state = new Map<string, 1 | 2>()
  const walk = (id: string) => {
    state.set(id, 1)
    for (const e of out.get(id) ?? []) {
      if (e.kind === "back" || state.get(e.to) === 1) back.push(e)
      else {
        forward.push(e)
        if (state.get(e.to) !== 2) walk(e.to)
      }
    }
    state.set(id, 2)
  }
  for (const n of nodes) if (!state.has(n.id)) walk(n.id)
  return { forward, back }
}

/** The lattice cells a connector passes through, endpoints included. */
function pathCells(a: Cell, b: Cell, backRow?: number): [number, number][] {
  const seq: [number, number][] = [[a.c, a.r]]
  if (backRow === undefined) {
    for (let c = a.c + 1; c <= b.c - 1; c++) seq.push([c, a.r])
    if (b.r !== a.r) {
      const turn = b.c - 1
      const step = b.r > a.r ? 1 : -1
      for (let r = a.r + step; r !== b.r + step; r += step) seq.push([turn, r])
    }
  } else {
    for (let r = a.r + 1; r <= backRow; r++) seq.push([a.c, r])
    const step = b.c < a.c ? -1 : 1
    for (let c = a.c + step; c !== b.c; c += step) seq.push([c, backRow])
    for (let r = backRow; r >= b.r + 1; r--) seq.push([b.c, r])
  }
  seq.push([b.c, b.r])
  return seq
}

function planGraph(nodes: FlowNode[], edges: FlowEdge[]): Graph | null {
  if (!nodes.length || !edges.length) return null

  const { forward, back } = splitEdges(nodes, edges)
  const { column, lane } = assignColumns(nodes, forward)
  const cols = Math.max(...nodes.map((n) => column.get(n.id) ?? 0)) + 1
  const rows = Math.max(...nodes.map((n) => lane.get(n.id) ?? 0)) + 1

  const at = new Map<string, Cell>(nodes.map((n) => [n.id, { c: (column.get(n.id) ?? 0) * 2 + 1, r: (lane.get(n.id) ?? 0) * 2 + 1 }]))
  const latticeCols = cols * 2 - 1
  const backRow = back.length ? rows * 2 : undefined
  const latticeRows = back.length ? rows * 2 : rows * 2 - 1

  const occupied = new Set([...at.values()].map((p) => `${p.c}:${p.r}`))
  const cells = new Map<string, Omit<Connector, "tokens">>()
  const mark = (c: number, r: number, bit: number, kind: "forward" | "back", label?: string) => {
    const key = `${c}:${r}`
    if (occupied.has(key)) return
    const cur = cells.get(key) ?? { c, r, mask: 0, kind: "forward" as const, label: undefined }
    cur.mask |= bit
    if (kind === "back") cur.kind = "back"
    if (label && !cur.label) cur.label = label
    cells.set(key, cur)
  }

  for (const e of [...forward, ...back.map((b) => ({ ...b, kind: "back" as const }))]) {
    const a = at.get(e.from)
    const b = at.get(e.to)
    if (!a || !b) continue
    const seq = pathCells(a, b, e.kind === "back" ? backRow : undefined)
    for (let i = 0; i < seq.length - 1; i++) {
      const [c1, r1] = seq[i]
      const [c2, r2] = seq[i + 1]
      const dir = c2 > c1 ? R : c2 < c1 ? L : r2 > r1 ? D : U
      mark(c1, r1, dir, e.kind === "back" ? "back" : "forward", e.label)
      mark(c2, r2, OPPOSITE[dir], e.kind === "back" ? "back" : "forward", e.label)
    }
  }

  // Column-major DOM order, so the narrow-width stack still reads in dependency order.
  const ordered = [...nodes].sort((a, b) => {
    const ca = (column.get(a.id) ?? 0) - (column.get(b.id) ?? 0)
    return ca !== 0 ? ca : (lane.get(a.id) ?? 0) - (lane.get(b.id) ?? 0)
  })

  const successors = new Map<string, FlowEdge[]>(nodes.map((n) => [n.id, []]))
  for (const e of [...forward, ...back]) successors.get(e.from)?.push(e)

  return {
    // Custom properties, because repeat() takes no var() count.
    tracks: Array.from({ length: latticeCols }, (_, i) => (i % 2 === 0 ? "minmax(0, 1fr)" : "var(--flow-edge, 28px)")).join(" "),
    rowTracks: Array.from({ length: latticeRows }, (_, i) => (i % 2 === 0 ? "auto" : "var(--flow-edge, 28px)")).join(" "),
    place: (id) => at.get(id) ?? { c: 1, r: 1 },
    depth: (id) => column.get(id) ?? 0,
    order: ordered,
    connectors: [...cells.values()].map((c) => ({ ...c, tokens: maskToTokens(c.mask) })),
    successors,
  }
}

/** Is every edge between consecutive nodes — the chain the plain form draws? */
function isChain(nodes: FlowNode[], edges: FlowEdge[]) {
  const index = new Map(nodes.map((n, i) => [n.id, i]))
  return edges.every((e) => {
    const a = index.get(e.from)
    const b = index.get(e.to)
    return a !== undefined && b !== undefined && b === a + 1
  })
}

export { Flow, type FlowNode, type FlowEdge, type FlowTableLabels, type FlowProps }
