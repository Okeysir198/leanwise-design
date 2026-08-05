/**
 * Lay a small directed graph onto a routing lattice — the geometry behind
 * `Flow`'s branching mode.
 *
 * ── Why a lattice of DOM cells and not an SVG ───────────────────────────────
 * The nodes have to stay real HTML cards with real text: the flagship consumer
 * asserts `main.innerText.length > 400` on 24 URLs with JavaScript disabled, and
 * it renders both locales from one tree, so a drawing whose geometry is computed
 * from measured label widths is wrong in one language by construction. An overlay
 * `<svg>` sized to a content-driven grid needs either `getBoundingClientRect()`
 * — which is JavaScript, on a component that must stay server-safe — or
 * `preserveAspectRatio="none"`, which shears every stroke and radius.
 *
 * So connectivity is drawn by CSS borders on grid cells, generalising the single
 * segment `.lw-flow-edge` already is into a box-drawing tile vocabulary. Every
 * function here is PURE: no DOM, no hooks, no browser global. That is load-
 * bearing — `check:rsc` fails the build otherwise, and `Flow` would have to take
 * `"use client"`, which would push a client boundary into every consumer's
 * server-rendered page.
 *
 * ── The lattice ────────────────────────────────────────────────────────────
 * Node column `k` sits at lattice column `2k + 1`; lane `l` at lattice row
 * `2l + 1`. The even tracks between them are the gutters the connectors route
 * through. Coordinates are 1-based because they are emitted straight into
 * `grid-column-start` / `grid-row-start`, which are 1-based grid LINES.
 *
 * ── The one shape this cannot draw well ────────────────────────────────────
 * An edge spanning more than one column routes horizontally along its SOURCE's
 * lane and turns down in the gutter immediately before its target. If another
 * node occupies that lane in a column between the two, the connector passes
 * behind it. Fixing that properly needs virtual nodes and a real channel
 * assignment, which is a great deal of machinery for a marketing diagram of six
 * boxes. `column` and `lane` overrides on the node are the escape hatch, and the
 * failure is visible rather than silent.
 */

/* Direction bits, OR-ed per cell. The names are the tile's arms, not the
   direction of travel — a cell entered from the left and left downward has both
   `L` and `D`, and is drawn as the corner └ rotated to match. */
const U = 1;
const D = 2;
const L = 4;
const R = 8;

const OPPOSITE = { [U]: D, [D]: U, [L]: R, [R]: L };

/** `6` -> `"u d"`. A space-separated token list so CSS can use `~=`. */
function maskToTokens(mask) {
  const out = [];
  if (mask & U) out.push('u');
  if (mask & D) out.push('d');
  if (mask & L) out.push('l');
  if (mask & R) out.push('r');
  return out.join(' ');
}

/**
 * Longest-path layering over FORWARD edges only.
 *
 * Longest path rather than shortest, so a node sits one column after its LAST
 * dependency — which is what makes a merge look like a merge. Shortest path
 * would place the second input of a fan-in in column 0 and draw its connector
 * across the whole diagram.
 */
function assignColumns(nodes, forward) {
  const index = new Map(nodes.map((n, i) => [n.id, i]));
  const column = new Map(nodes.map((n) => [n.id, 0]));
  const incoming = new Map(nodes.map((n) => [n.id, []]));
  for (const e of forward) incoming.get(e.to)?.push(e.from);

  /* Relax |V| times. Cycles are already excluded from `forward`, so this
     terminates; the bound is a belt-and-braces guard, not the algorithm. */
  for (let pass = 0; pass < nodes.length; pass++) {
    let moved = false;
    for (const n of nodes) {
      const preds = incoming.get(n.id) ?? [];
      if (!preds.length) continue;
      const want = Math.max(...preds.map((p) => column.get(p) ?? 0)) + 1;
      if (want > (column.get(n.id) ?? 0)) {
        column.set(n.id, want);
        moved = true;
      }
    }
    if (!moved) break;
  }

  /* An explicit `column` wins, and is clamped so it can never precede a
     dependency — a hand-placed node that outranks its own input would draw a
     backwards arrow that means nothing. */
  for (const n of nodes) {
    if (typeof n.column === 'number') {
      const floor = Math.max(0, ...(incoming.get(n.id) ?? []).map((p) => (column.get(p) ?? 0) + 1));
      column.set(n.id, Math.max(n.column, floor));
    }
  }

  /* Stable within a column: source order, so the consumer controls lane order by
     ordering `nodes`, which is the only lever that needs no new prop. */
  const lanes = new Map();
  const lane = new Map();
  for (const n of [...nodes].sort((a, b) => index.get(a.id) - index.get(b.id))) {
    const c = column.get(n.id);
    const next = lanes.get(c) ?? 0;
    lane.set(n.id, typeof n.lane === 'number' ? n.lane : next);
    lanes.set(c, Math.max(next, (typeof n.lane === 'number' ? n.lane : next)) + 1);
  }

  return { column, lane };
}

/**
 * Split declared edges into forward and back.
 *
 * A back edge is one whose target is already on the stack during a depth-first
 * walk — i.e. it closes a cycle. Detecting it is what keeps `assignColumns`
 * terminating, and it is also the honest classification: an explicit
 * `kind: 'back'` is respected, but a cycle the consumer did not label still has
 * to be routed as a loop or the layering never settles.
 */
function splitEdges(nodes, edges) {
  const ids = new Set(nodes.map((n) => n.id));
  const clean = edges.filter((e) => ids.has(e.from) && ids.has(e.to) && e.from !== e.to);

  const out = new Map(nodes.map((n) => [n.id, []]));
  for (const e of clean) out.get(e.from).push(e);

  const forward = [];
  const back = [];
  const state = new Map(); // undefined | 1 = on stack | 2 = done

  const walk = (id) => {
    state.set(id, 1);
    for (const e of out.get(id) ?? []) {
      if (e.kind === 'back' || state.get(e.to) === 1) back.push(e);
      else {
        forward.push(e);
        if (state.get(e.to) !== 2) walk(e.to);
      }
    }
    state.set(id, 2);
  };
  for (const n of nodes) if (!state.has(n.id)) walk(n.id);

  return { forward, back };
}

/**
 * The ordered list of lattice cells a connector passes through, endpoints
 * included. Endpoints are node cells and are skipped when marking.
 */
function pathCells(a, b, backRow) {
  const seq = [[a.c, a.r]];

  if (backRow === undefined) {
    /* Forward: run along the source's lane to the gutter before the target,
       then turn. */
    for (let c = a.c + 1; c <= b.c - 1; c++) seq.push([c, a.r]);
    if (b.r !== a.r) {
      const turn = b.c - 1;
      const step = b.r > a.r ? 1 : -1;
      for (let r = a.r + step; r !== b.r + step; r += step) seq.push([turn, r]);
    }
  } else {
    /* Back: drop out of the source into the return row, run against the flow,
       climb into the target. Routed below every lane so it never collides with
       the trunk. */
    for (let r = a.r + 1; r <= backRow; r++) seq.push([a.c, r]);
    const step = b.c < a.c ? -1 : 1;
    for (let c = a.c + step; c !== b.c; c += step) seq.push([c, backRow]);
    for (let r = backRow; r >= b.r + 1; r--) seq.push([b.c, r]);
  }

  seq.push([b.c, b.r]);
  return seq;
}

/**
 * Build everything `Flow` needs to render the branching form.
 *
 * Returns `null` when the graph is a plain consecutive chain, which is the
 * signal for `Flow` to take its original code path unchanged — the existing
 * markup, classes and visual baselines must not move for consumers who never
 * asked for branching.
 */
export function planGraph(nodes, edges) {
  if (!nodes.length || !edges.length) return null;

  const { forward, back } = splitEdges(nodes, edges);
  const { column, lane } = assignColumns(nodes, forward);

  const cols = Math.max(...nodes.map((n) => column.get(n.id))) + 1;
  const rows = Math.max(...nodes.map((n) => lane.get(n.id))) + 1;

  /* Lattice coordinates, 1-based grid lines. */
  const at = new Map(
    nodes.map((n) => [n.id, { c: column.get(n.id) * 2 + 1, r: lane.get(n.id) * 2 + 1 }])
  );

  const latticeCols = cols * 2 - 1;
  const backRow = back.length ? rows * 2 : undefined;
  const latticeRows = back.length ? rows * 2 : rows * 2 - 1;

  const occupied = new Set([...at.values()].map((p) => `${p.c}:${p.r}`));
  const cells = new Map(); // "c:r" -> { c, r, mask, kind, label }

  const mark = (c, r, bit, kind, label) => {
    const key = `${c}:${r}`;
    if (occupied.has(key)) return; // never draw through a node
    const cur = cells.get(key) ?? { c, r, mask: 0, kind: 'forward', label: undefined };
    cur.mask |= bit;
    if (kind === 'back') cur.kind = 'back';
    if (label && !cur.label) cur.label = label;
    cells.set(key, cur);
  };

  for (const e of [...forward, ...back.map((b) => ({ ...b, kind: 'back' }))]) {
    const a = at.get(e.from);
    const b = at.get(e.to);
    if (!a || !b) continue;
    const seq = pathCells(a, b, e.kind === 'back' ? backRow : undefined);
    for (let i = 0; i < seq.length - 1; i++) {
      const [c1, r1] = seq[i];
      const [c2, r2] = seq[i + 1];
      const dir = c2 > c1 ? R : c2 < c1 ? L : r2 > r1 ? D : U;
      mark(c1, r1, dir, e.kind, e.label);
      mark(c2, r2, OPPOSITE[dir], e.kind, e.label);
    }
  }

  /* DOM order is column-major then lane, so the narrow-width stack — which drops
     the lattice and simply flows — still reads in dependency order. */
  const ordered = [...nodes].sort((a, b) => {
    const ca = column.get(a.id) - column.get(b.id);
    return ca !== 0 ? ca : lane.get(a.id) - lane.get(b.id);
  });

  /* The successors table is the REAL content of a branching diagram: the cards
     say what exists, only this says what leads to what. Same argument, and the
     same `.lw-sr-only` delivery, as the data table under every chart. */
  const successors = new Map(nodes.map((n) => [n.id, []]));
  for (const e of [...forward, ...back]) successors.get(e.from)?.push(e);

  return {
    cols: latticeCols,
    rows: latticeRows,
    /* Track lists travel as custom properties rather than as a `grid-template-*`
       declaration, because `repeat()` will not take a `var()` count and the
       consumer's contract allows `--lw-*` properties and nothing else. */
    tracks: Array.from({ length: latticeCols }, (_, i) =>
      i % 2 === 0 ? 'minmax(0, 1fr)' : 'var(--lw-flow-edge, 28px)'
    ).join(' '),
    rowTracks: Array.from({ length: latticeRows }, (_, i) =>
      i % 2 === 0 ? 'auto' : 'var(--lw-flow-edge, 28px)'
    ).join(' '),
    place: (id) => at.get(id),
    depth: (id) => column.get(id),
    order: ordered,
    connectors: [...cells.values()].map((c) => ({ ...c, tokens: maskToTokens(c.mask) })),
    successors,
  };
}

/** Is this a plain consecutive chain — the shape `Flow` already drew? */
export function isChain(nodes, edges) {
  if (!edges) return true;
  const index = new Map(nodes.map((n, i) => [n.id, i]));
  return edges.every((e) => {
    const pair = Array.isArray(e) ? e : [e.from, e.to];
    const a = index.get(pair[0]);
    const b = index.get(pair[1]);
    return a !== undefined && b !== undefined && b === a + 1;
  });
}
