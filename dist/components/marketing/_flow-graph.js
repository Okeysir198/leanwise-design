const U = 1;
const D = 2;
const L = 4;
const R = 8;
const OPPOSITE = { [U]: D, [D]: U, [L]: R, [R]: L };
function maskToTokens(mask) {
  const out = [];
  if (mask & U) out.push("u");
  if (mask & D) out.push("d");
  if (mask & L) out.push("l");
  if (mask & R) out.push("r");
  return out.join(" ");
}
function assignColumns(nodes, forward) {
  const index = new Map(nodes.map((n, i) => [n.id, i]));
  const column = new Map(nodes.map((n) => [n.id, 0]));
  const incoming = new Map(nodes.map((n) => [n.id, []]));
  for (const e of forward) incoming.get(e.to)?.push(e.from);
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
  for (const n of nodes) {
    if (typeof n.column === "number") {
      const floor = Math.max(0, ...(incoming.get(n.id) ?? []).map((p) => (column.get(p) ?? 0) + 1));
      column.set(n.id, Math.max(n.column, floor));
    }
  }
  const lanes = /* @__PURE__ */ new Map();
  const lane = /* @__PURE__ */ new Map();
  for (const n of [...nodes].sort((a, b) => index.get(a.id) - index.get(b.id))) {
    const c = column.get(n.id);
    const next = lanes.get(c) ?? 0;
    lane.set(n.id, typeof n.lane === "number" ? n.lane : next);
    lanes.set(c, Math.max(next, typeof n.lane === "number" ? n.lane : next) + 1);
  }
  return { column, lane };
}
function splitEdges(nodes, edges) {
  const ids = new Set(nodes.map((n) => n.id));
  const clean = edges.filter((e) => ids.has(e.from) && ids.has(e.to) && e.from !== e.to);
  const out = new Map(nodes.map((n) => [n.id, []]));
  for (const e of clean) out.get(e.from).push(e);
  const forward = [];
  const back = [];
  const state = /* @__PURE__ */ new Map();
  const walk = (id) => {
    state.set(id, 1);
    for (const e of out.get(id) ?? []) {
      if (e.kind === "back" || state.get(e.to) === 1) back.push(e);
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
function pathCells(a, b, backRow) {
  const seq = [[a.c, a.r]];
  if (backRow === void 0) {
    for (let c = a.c + 1; c <= b.c - 1; c++) seq.push([c, a.r]);
    if (b.r !== a.r) {
      const turn = b.c - 1;
      const step = b.r > a.r ? 1 : -1;
      for (let r = a.r + step; r !== b.r + step; r += step) seq.push([turn, r]);
    }
  } else {
    for (let r = a.r + 1; r <= backRow; r++) seq.push([a.c, r]);
    const step = b.c < a.c ? -1 : 1;
    for (let c = a.c + step; c !== b.c; c += step) seq.push([c, backRow]);
    for (let r = backRow; r >= b.r + 1; r--) seq.push([b.c, r]);
  }
  seq.push([b.c, b.r]);
  return seq;
}
function planGraph(nodes, edges) {
  if (!nodes.length || !edges.length) return null;
  const { forward, back } = splitEdges(nodes, edges);
  const { column, lane } = assignColumns(nodes, forward);
  const cols = Math.max(...nodes.map((n) => column.get(n.id))) + 1;
  const rows = Math.max(...nodes.map((n) => lane.get(n.id))) + 1;
  const at = new Map(
    nodes.map((n) => [n.id, { c: column.get(n.id) * 2 + 1, r: lane.get(n.id) * 2 + 1 }])
  );
  const latticeCols = cols * 2 - 1;
  const backRow = back.length ? rows * 2 : void 0;
  const latticeRows = back.length ? rows * 2 : rows * 2 - 1;
  const occupied = new Set([...at.values()].map((p) => `${p.c}:${p.r}`));
  const cells = /* @__PURE__ */ new Map();
  const mark = (c, r, bit, kind, label) => {
    const key = `${c}:${r}`;
    if (occupied.has(key)) return;
    const cur = cells.get(key) ?? { c, r, mask: 0, kind: "forward", label: void 0 };
    cur.mask |= bit;
    if (kind === "back") cur.kind = "back";
    if (label && !cur.label) cur.label = label;
    cells.set(key, cur);
  };
  for (const e of [...forward, ...back.map((b) => ({ ...b, kind: "back" }))]) {
    const a = at.get(e.from);
    const b = at.get(e.to);
    if (!a || !b) continue;
    const seq = pathCells(a, b, e.kind === "back" ? backRow : void 0);
    for (let i = 0; i < seq.length - 1; i++) {
      const [c1, r1] = seq[i];
      const [c2, r2] = seq[i + 1];
      const dir = c2 > c1 ? R : c2 < c1 ? L : r2 > r1 ? D : U;
      mark(c1, r1, dir, e.kind, e.label);
      mark(c2, r2, OPPOSITE[dir], e.kind, e.label);
    }
  }
  const ordered = [...nodes].sort((a, b) => {
    const ca = column.get(a.id) - column.get(b.id);
    return ca !== 0 ? ca : lane.get(a.id) - lane.get(b.id);
  });
  const successors = new Map(nodes.map((n) => [n.id, []]));
  for (const e of [...forward, ...back]) successors.get(e.from)?.push(e);
  return {
    cols: latticeCols,
    rows: latticeRows,
    /* Track lists travel as custom properties rather than as a `grid-template-*`
       declaration, because `repeat()` will not take a `var()` count and the
       consumer's contract allows `--lw-*` properties and nothing else. */
    tracks: Array.from(
      { length: latticeCols },
      (_, i) => i % 2 === 0 ? "minmax(0, 1fr)" : "var(--lw-flow-edge, 28px)"
    ).join(" "),
    rowTracks: Array.from(
      { length: latticeRows },
      (_, i) => i % 2 === 0 ? "auto" : "var(--lw-flow-edge, 28px)"
    ).join(" "),
    place: (id) => at.get(id),
    depth: (id) => column.get(id),
    order: ordered,
    connectors: [...cells.values()].map((c) => ({ ...c, tokens: maskToTokens(c.mask) })),
    successors
  };
}
function isChain(nodes, edges) {
  if (!edges) return true;
  const index = new Map(nodes.map((n, i) => [n.id, i]));
  return edges.every((e) => {
    const pair = Array.isArray(e) ? e : [e.from, e.to];
    const a = index.get(pair[0]);
    const b = index.get(pair[1]);
    return a !== void 0 && b !== void 0 && b === a + 1;
  });
}
export {
  isChain,
  planGraph
};
