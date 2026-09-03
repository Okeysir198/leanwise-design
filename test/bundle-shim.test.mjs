/**
 * The automatic-runtime shim the browser bundle hands `react/jsx-runtime`
 * (tools/_jsx-shim.mjs). Radix's dist calls `jsx()` / `jsxs()`; the old shim
 * exported React itself, which has neither — the v1.2–v1.3 blank-card bug.
 * The bundle carries `createJsxRuntime.toString()`, so this tests the bytes
 * the cards run, not a lookalike.
 */
import { test } from "node:test";
import assert from "node:assert/strict";
import { createRequire } from "node:module";
import { createJsxRuntime, JSX_RUNTIME_SHIM_SOURCE } from "../tools/_jsx-shim.mjs";

const require = createRequire(import.meta.url);
const React = require("react");
const rt = createJsxRuntime(React);

test("exports the four names the automatic runtime is imported for", () => {
  assert.equal(typeof rt.jsx, "function");
  assert.equal(typeof rt.jsxs, "function");
  assert.equal(typeof rt.jsxDEV, "function");
  assert.equal(rt.Fragment, React.Fragment);
});

test("jsx(): props copied, children lifted, key set only when given", () => {
  const el = rt.jsx("a", { href: "/x", children: "hi" });
  assert.equal(el.type, "a");
  assert.equal(el.props.href, "/x");
  assert.equal(el.props.children, "hi");
  assert.equal(el.key, null);
  assert.equal("key" in el.props, false);

  const keyed = rt.jsx("li", { children: "one" }, "k1");
  assert.equal(keyed.key, "k1");
  assert.equal(keyed.props.key, undefined);

  const bare = rt.jsx("br", {});
  assert.equal(bare.props.children, undefined);
});

test("jsxs(): a static children array is spread, so no key warning fires", () => {
  const warnings = [];
  const orig = console.error;
  console.error = (...a) => warnings.push(a.join(" "));
  try {
    const el = rt.jsxs("ul", { children: [rt.jsx("li", { children: "a" }), rt.jsx("li", { children: "b" })] });
    assert.equal(el.props.children.length, 2);
    // Force validation the way a render would: createElement validates on
    // construction, which is why spreading (varargs) vs. passing the array
    // (a dynamic list) is the difference that matters.
    const { renderToStaticMarkup } = require("react-dom/server");
    assert.equal(renderToStaticMarkup(el), "<ul><li>a</li><li>b</li></ul>");
  } finally {
    console.error = orig;
  }
  assert.deepEqual(warnings.filter((w) => /unique "key"/.test(w)), []);
});

test("Fragment children and nested elements render", () => {
  const { renderToStaticMarkup } = require("react-dom/server");
  const el = rt.jsx(rt.Fragment, { children: rt.jsx("b", { children: rt.jsx("i", { children: "x" }) }) });
  assert.equal(renderToStaticMarkup(el), "<b><i>x</i></b>");
});

test("the serialised shim is the same function, evaluated as CommonJS", () => {
  assert.match(JSX_RUNTIME_SHIM_SOURCE, /^module\.exports = \(function createJsxRuntime\(React\)/);
  const mod = { exports: {} };
  const prevReact = globalThis.React;
  globalThis.React = React;
  try {
    new Function("module", "exports", JSX_RUNTIME_SHIM_SOURCE)(mod, mod.exports);
  } finally {
    globalThis.React = prevReact;
  }
  assert.equal(typeof mod.exports.jsx, "function");
  assert.equal(mod.exports.Fragment, React.Fragment);
  assert.equal(mod.exports.jsx("p", { children: "q" }).props.children, "q");
});
