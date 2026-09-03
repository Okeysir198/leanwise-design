/**
 * The automatic-runtime shim the browser bundle gives `react/jsx-runtime`.
 *
 * WHY. `_ds_bundle.js` compiles this repo's .jsx with the CLASSIC transform
 * (`React.createElement`), so nothing first-party ever imports
 * `react/jsx-runtime`. Radix's dist does: it ships pre-compiled against the
 * AUTOMATIC runtime and calls `jsx()` / `jsxs()`. Until v2.0 the shim for that
 * specifier was `module.exports = globalThis.React` — and React's main export
 * has no `jsx`, which is the exact `TypeError: jsx is not a function` that
 * blanked every specimen card from v1.2 to v1.3 (see lw-bundle.mjs). Bundling
 * Radix over that shim would have reproduced it on the first overlay.
 *
 * `createJsxRuntime(React)` builds a real runtime over `React.createElement`.
 * It is a plain function so `test/bundle-shim.test.mjs` can exercise it in
 * Node against the real React; `JSX_RUNTIME_SHIM_SOURCE` is the same function
 * serialised, so the bytes the bundle carries ARE the bytes under test.
 */

export function createJsxRuntime(React) {
  var createElement = React.createElement;
  var hasOwn = Object.prototype.hasOwnProperty;
  /* `key` arrives as a third argument in the automatic runtime, not on props;
     `children` rides on props (a single node for jsx(), an array for jsxs()).
     createElement wants both the other way round, so copy the props, lift
     `children` out, and re-attach `key` only when it was actually given —
     `key: undefined` on the config would still be seen by React as "a key was
     passed" in some paths. jsxs() hands over an array the compiler has
     already proven static; spreading it as varargs is what stops React from
     asking for a key on each element. */
  function j(type, props, key) {
    var config = {};
    var children;
    var hasChildren = false;
    for (var k in props) {
      if (!hasOwn.call(props, k)) continue;
      if (k === "children") { children = props[k]; hasChildren = true; }
      else config[k] = props[k];
    }
    if (key !== undefined) config.key = key;
    if (!hasChildren) return createElement(type, config);
    if (Array.isArray(children)) return createElement.apply(null, [type, config].concat(children));
    return createElement(type, config, children);
  }
  function jsxDEV(type, props, key) { return j(type, props, key); }
  return { jsx: j, jsxs: j, jsxDEV: jsxDEV, Fragment: React.Fragment };
}

/** CommonJS module text: what `ds:jsx-runtime` and `ds:jsx-dev-runtime` load. */
export const JSX_RUNTIME_SHIM_SOURCE =
  `module.exports = (${createJsxRuntime.toString()})(globalThis.React);\n`;
