import { test } from "node:test";
import assert from "node:assert/strict";
import { renderBlock } from "./_render.mjs";

// Renders the shipped block. In the graph form the drawing is not the content:
// the visually hidden successors table is, so it is what most of this checks.
const render = (props) => renderBlock("registry/blocks/flow.tsx", "Flow", props);
const text = (html) => html.replace(/<[^>]+>/g, "").replace(/&amp;/g, "&").trim();

function table(html) {
  const t = html.match(/<table[^>]*>([\s\S]*?)<\/table>/);
  if (!t) return null;
  const rows = [...t[1].matchAll(/<tr>([\s\S]*?)<\/tr>/g)].map((r) => r[1]);
  const body = rows.filter((r) => /<th scope="row">/.test(r)).map((r) => ({
    head: text(r.match(/<th scope="row">([\s\S]*?)<\/th>/)[1]),
    cell: text(r.match(/<td>([\s\S]*?)<\/td>/)[1]),
  }));
  return { tag: t[0].slice(0, t[0].indexOf(">") + 1), caption: text(t[1].match(/<caption>([\s\S]*?)<\/caption>/)?.[1] ?? ""), body };
}
const items = (html) => [...html.matchAll(/<li\b[^>]*>/g)].map((m) => m[0]);
const exposed = (html) => items(html).filter((li) => !li.includes('aria-hidden="true"'));
const at = (html, label) => {
  const li = items(html).find((x) => x.includes("lw-flow-node") && html.slice(html.indexOf(x)).match(/<h3[^>]*>([^<]*)/)?.[1] === label);
  const m = li?.match(/--flow-c:(\d+);--flow-r:(\d+)/);
  return m ? [Number(m[1]), Number(m[2])] : null;
};

// The fan-in the consumer's product page publishes: two inputs meet at one check.
const WORKFLOW = {
  label: "How a submission is checked",
  tableLabels: { step: "Step", leadsTo: "Leads to", none: "Nothing — this is a result" },
  nodes: [
    { id: "pack", label: "Compliance package", kind: "input" },
    { id: "standard", label: "Connect TSS", kind: "input" },
    { id: "check", label: "One check", kind: "step", current: true },
    { id: "result", label: "A status per value", kind: "output" },
    { id: "batch", label: "Statuses across the batch", kind: "output" },
  ],
  edges: [
    { from: "pack", to: "check" },
    { from: "standard", to: "check" },
    { from: "check", to: "result" },
    { from: "check", to: "batch" },
  ],
};

test("graph: a successors table names the diagram and has one row per node", async () => {
  const t = table(await render(WORKFLOW));
  assert.ok(t, "no successors table");
  assert.equal(t.caption, WORKFLOW.label);
  assert.equal(t.body.length, WORKFLOW.nodes.length);
});

test("graph: the fan-in is stated in words, and no cell is empty", async () => {
  const rows = Object.fromEntries(table(await render(WORKFLOW)).body.map((r) => [r.head.slice(3), r.cell]));
  assert.equal(rows["Compliance package"], "03 One check");
  assert.equal(rows["Connect TSS"], "03 One check");
  assert.equal(rows["One check"], "04 A status per value; 05 Statuses across the batch");
  assert.equal(rows["A status per value"], WORKFLOW.tableLabels.none);
  assert.equal(rows["Statuses across the batch"], WORKFLOW.tableLabels.none);
});

test("graph: a merge sits after its last input", async () => {
  const html = await render(WORKFLOW);
  assert.deepEqual(at(html, "Compliance package"), [1, 1]);
  assert.deepEqual(at(html, "Connect TSS"), [1, 3]);
  assert.deepEqual(at(html, "One check"), [3, 1]);
  assert.deepEqual(at(html, "A status per value"), [5, 1]);
});

test("graph: the drawing adds no accessible noise", async () => {
  const html = await render(WORKFLOW);
  assert.ok(items(html).length > WORKFLOW.nodes.length, "no connector cells drawn");
  assert.equal(exposed(html).length, WORKFLOW.nodes.length, "a connector cell is exposed to assistive tech");
  assert.equal((html.match(/aria-current="step"/g) ?? []).length, 1);
});

test("graph: the hidden table is held to 1px", async () => {
  const tag = table(await render(WORKFLOW)).tag.replace(/&amp;/g, "&").replace(/&gt;/g, ">");
  for (const cls of ["sr-only", "table-fixed", "[&>caption]:absolute"]) assert.ok(tag.includes(cls), `table lacks ${cls}: ${tag}`);
});

test("graph: a cycle is drawn as a back edge and terminates", async () => {
  const html = await render({
    label: "Loop", tableLabels: { step: "Step", leadsTo: "Leads to" },
    nodes: [{ id: "a", label: "A" }, { id: "b", label: "B" }, { id: "c", label: "C" }],
    edges: [{ from: "a", to: "b" }, { from: "b", to: "c" }, { from: "c", to: "a" }],
  });
  assert.match(html, /data-edge-kind="back"/);
});

test("graph: a non-string label is named by `text` in the table", async () => {
  // A number is a valid non-string label; a successor cell must not print it as "".
  const withText = WORKFLOW.nodes.map((n) => (n.id === "check" ? { ...n, label: 3, text: "One check" } : n));
  const rows = Object.fromEntries(table(await render({ ...WORKFLOW, nodes: withText })).body.map((r) => [r.head.slice(3), r.cell]));
  assert.equal(rows["Compliance package"], "03 One check");
});

test("chain: consecutive object-form edges draw the chain", async () => {
  const html = await render({
    nodes: [{ id: "a", label: "Upload" }, { id: "b", label: "Check" }, { id: "c", label: "Read" }],
    edges: [{ from: "a", to: "b" }, { from: "b", to: "c" }],
  });
  assert.match(html, /^<ol\b/);
  assert.equal(table(html), null, "a chain has no successors table");
  assert.equal(exposed(html).length, 3);
});

test("chain: a link left out of edges is not drawn", async () => {
  const html = await render({
    nodes: [{ id: "a", label: "A" }, { id: "b", label: "B" }, { id: "c", label: "C" }],
    edges: [["a", "b"]],
  });
  assert.equal((html.match(/lw-flow-edge/g) ?? []).length, 1);
});
