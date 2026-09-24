/* The palette's contract, asserted from src/palette.mjs and the generated theme.css.
   Returns { problems, checked } — each assertion made counts toward `checked`. */
import { cr } from "./oklch.mjs";
import { toRgb, toOk, toHex, obj } from "./parse.mjs";
import { deltaE76, deltaE76Cvd } from "./color.mjs";

const SURFACES = ["background", "card", "popover", "muted", "secondary", "sidebar"];
/* Non-text UI (WCAG 1.4.11): control boundaries and the focus ring. */
const NON_TEXT = ["input", "ring", "sidebar-ring", "primary"];
const STATUS = /^(cta|warning|success|info|destructive)(-|$)/;
const CHART = /^chart-\d$/;
export const FLOORS = { text: 4.5, nonText: 3, chartNormal: 19, chartCvd: 15, spiritHue: [190, 260], spiritChroma: 0.02 };

export function pairsFor(t) {
  const pairs = [];
  for (const role of Object.keys(t)) {
    const fg = `${role}-foreground`;
    if (t[fg]) pairs.push([fg, role, FLOORS.text]);
  }
  for (const s of SURFACES) {
    if (!t[s]) continue;
    for (const ink of ["foreground", "muted-foreground"]) pairs.push([ink, s, FLOORS.text]);
    for (const n of NON_TEXT) if (t[n]) pairs.push([n, s, FLOORS.nonText]);
  }
  for (const link of ["primary", "destructive"]) pairs.push([link, "background", FLOORS.text]);
  /* Alpha inks stock components paint, composited over what they sit on:
     inactive Tabs trigger (text-foreground/60, light) and the destructive Alert
     (text-destructive, description text-destructive/90, on card or the soft tint). */
  for (const s of ["muted", "background"]) pairs.push(["foreground", s, FLOORS.text, 0.6, "light"]);
  for (const s of ["card", "destructive-soft"]) for (const a of [1, 0.9]) pairs.push(["destructive", s, FLOORS.text, a]);
  return pairs;
}

export function checkContrast({ ANCHORS, ramp, themes, themeCss }) {
  const problems = [];
  let checked = 0;
  const need = (ok, msg) => { checked++; if (!ok) problems.push(msg); };

  for (const [name, t] of Object.entries(themes)) {
    /* Parity: a role in one theme and not the other silently inherits. */
    for (const other of Object.keys(themes)) for (const k of Object.keys(themes[other]))
      need(k in t, `${name}: role --${k} is missing (present in ${other})`);

    for (const [fg, bg, floor, alpha = 1, only] of pairsFor(t)) {
      if (!(fg in t) || !(bg in t) || (only && only !== name)) continue;
      const b = toRgb(t[bg]), f = toRgb(t[fg]).map((c, i) => alpha * c + (1 - alpha) * b[i]);
      const r = cr(f, b);
      need(r >= floor, `${name}: --${fg}${alpha < 1 ? `/${alpha * 100}` : ""} on --${bg} is ${r.toFixed(2)}:1 (< ${floor})`);
    }

    const charts = Object.keys(t).filter((k) => CHART.test(k)).sort();
    need(charts.length === 5, `${name}: expected chart-1..5, found ${charts.length}`);
    for (let i = 0; i < charts.length; i++) for (let j = i + 1; j < charts.length; j++) {
      const a = obj(toRgb(t[charts[i]])), b = obj(toRgb(t[charts[j]]));
      const n = deltaE76(a, b), c = deltaE76Cvd(a, b);
      need(n >= FLOORS.chartNormal, `${name}: ${charts[i]}/${charts[j]} dE ${n.toFixed(1)} (< ${FLOORS.chartNormal}, normal vision)`);
      need(c.d >= FLOORS.chartCvd, `${name}: ${charts[i]}/${charts[j]} dE ${c.d.toFixed(1)} under ${c.kind} (< ${FLOORS.chartCvd})`);
    }

    /* Brand spirit: everything that is not status or chart stays in the cyan-navy
       hue band, or is a near-neutral. */
    for (const [k, v] of Object.entries(t)) {
      if (STATUS.test(k) || CHART.test(k)) continue;
      const [, C, H] = toOk(v);
      const [lo, hi] = FLOORS.spiritHue;
      need(C < FLOORS.spiritChroma || (H >= lo && H <= hi),
        `${name}: --${k} ${v} is off-brand (OKLCH hue ${H.toFixed(0)}, chroma ${C.toFixed(3)}; want hue ${lo}..${hi} or chroma < ${FLOORS.spiritChroma})`);
    }
  }

  /* The three anchors are exact, in the palette and in the shipped CSS. */
  const where = { cyan: [["light", "primary"], ["ramp", "600"]], navy: [["light", "navy"], ["ramp", "900"]], amber: [["light", "cta"], ["dark", "cta"]] };
  for (const [name, hex] of Object.entries(ANCHORS)) {
    for (const [scope, key] of where[name]) {
      const v = scope === "ramp" ? ramp[key] : themes[scope][key];
      need(v && toHex(v) === hex.toUpperCase(), `anchor ${name} ${hex}: ${scope}.${key} is ${v}`);
    }
    need(new RegExp(`:\\s*${hex}\\s*;`, "i").test(themeCss), `anchor ${name} ${hex} does not appear as a value in theme.css`);
  }
  return { problems, checked };
}
