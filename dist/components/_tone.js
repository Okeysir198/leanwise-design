import { deprecate } from "./_deprecate.js";
const TONES = ["brand", "success", "warning", "danger", "neutral", "info", "cta"];
const LEGACY = {
  ok: "success",
  warn: "warning",
  err: "danger",
  pos: "success",
  neg: "danger"
};
function normTone(component, value, prop = "tone") {
  if (value == null) return value;
  const canonical = LEGACY[value];
  if (!canonical) return value;
  deprecate(
    component,
    `${prop}=${value}`,
    `${prop}="${value}" is deprecated \u2014 use ${prop}="${canonical}". One vocabulary across every component: success | warning | danger | neutral | brand | info | cta. The old names are accepted for one minor and removed at the next major.`
  );
  return canonical;
}
function normToneMap(component, map, prop) {
  if (!map) return map;
  const out = {};
  for (const [key, value] of Object.entries(map)) out[normTone(component, key, prop) ?? key] = value;
  return out;
}
export {
  TONES,
  normTone,
  normToneMap
};
