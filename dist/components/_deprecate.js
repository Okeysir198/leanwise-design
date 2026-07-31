const seen = /* @__PURE__ */ new Set();
function deprecate(component, prop, message) {
  const id = component + "#" + prop;
  if (seen.has(id)) return;
  seen.add(id);
  if (typeof process !== "undefined" && process.env && false) return;
  if (typeof console === "undefined" || !console.warn) return;
  console.warn("[@leanwise/design] " + component + ": " + message);
}
function __resetDeprecations() {
  seen.clear();
}
export {
  __resetDeprecations,
  deprecate
};
