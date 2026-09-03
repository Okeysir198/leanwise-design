const seen = /* @__PURE__ */ new Set();
function warnOnce(component, topic, message) {
  const id = component + "#" + topic;
  if (seen.has(id)) return;
  seen.add(id);
  if (typeof process !== "undefined" && process.env && false) return;
  if (typeof console === "undefined" || !console.warn) return;
  console.warn("[@leanwise/design] " + component + ": " + message);
}
function deprecate(component, prop, message) {
  warnOnce(component, prop, message);
}
function __resetDeprecations() {
  seen.clear();
}
export {
  __resetDeprecations,
  deprecate,
  warnOnce
};
