import { test } from "node:test";
import assert from "node:assert/strict";
import { read } from "./_root.mjs";

// A scroll reveal hides content until it is scrolled to. Any reader that cannot
// scroll — print, a crawler, a browser without view timelines, reduced motion —
// must get the content shown, so the hiding may only exist inside the gate.
const css = read("marketing.css").replace(/\/\*[\s\S]*?\*\//g, "");

function chainAt(idx) {
  const stack = [];
  let start = 0;
  for (let i = 0; i < idx; i++) {
    if (css[i] === "{") { stack.push(css.slice(start, i).trim()); start = i + 1; }
    else if (css[i] === "}") { stack.pop(); start = i + 1; }
    else if (css[i] === ";") start = i + 1;
  }
  return stack;
}

// Every scroll-driven animation, not one by name: each hides content until scrolled to.
// Declarations only: the @supports condition contains the same text in parentheses.
const uses = [...css.matchAll(/(?<!\()animation-timeline\s*:\s*view\(\)/g)];

test("the reveal is used", () => {
  assert.ok(uses.length >= 2, "expected the reveal and the flow draw-in — the gate checks measure too little");
});

test("every scroll-driven animation sits inside both gates, screen only", () => {
  for (const m of uses) {
    const chain = chainAt(m.index).join(" | ");
    assert.match(chain, /@supports\s*\(\s*animation-timeline\s*:\s*view\(\)\s*\)/, `outside @supports: ${chain}`);
    assert.match(chain, /@media\s+screen\s+and\s*\(\s*prefers-reduced-motion\s*:\s*no-preference\s*\)/,
      `not gated to screen + no-preference (print or reduced motion would hide content): ${chain}`);
  }
});

test("the range is a percentage, never a length", () => {
  const ranges = [...css.matchAll(/animation-range\s*:([^;}]+)/g)].map((m) => m[1]);
  assert.ok(ranges.length > 0, "no animation-range found");
  for (const r of ranges) assert.doesNotMatch(r, /\d(px|rem|em|vh|svh|dvh)\b/, `a length range never finishes on a short element: ${r.trim()}`);
});

test("each scroll-driven keyframe is defined once", () => {
  for (const name of ["lwReveal", "lwFlowIn"]) {
    assert.equal((css.match(new RegExp(`@keyframes\\s+${name}\\b`, "g")) ?? []).length, 1, name);
  }
});
