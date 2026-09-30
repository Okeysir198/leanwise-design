/* Rendered contrast: what the viewer actually sees, measured in the page.
   A token pair can pass while the pixel fails — an alpha ink (text-muted-foreground/70),
   an `opacity-*` on the element or any ancestor, a translucent ground (bg-input/30).
   `probe` runs in the browser: every colour goes through a canvas (so oklch, color-mix and
   rgba all resolve the way Chromium paints them), alpha and the opacity chain multiply,
   and the ink is composited over the stacked grounds beneath it.
     text        >= 4.5:1 (>= 3:1 when large: 24px, or 18.66px bold)
     icon (svg drawn in currentColor)          >= 3:1
     control border (input, select, checkbox)  >= 3:1
   Disabled content is exempt (WCAG 1.4.3/1.4.11). A node may opt out with
   data-contrast-expect="<why>". Returns { problems, checked }. */

export const FLOORS = { text: 4.5, large: 3, icon: 3, border: 3 };

/* Serialised into the page by page.evaluate — it may not close over module scope. */
export function probe(FLOORS) {
  const cv = document.createElement("canvas");
  cv.width = cv.height = 1;
  const ctx = cv.getContext("2d", { willReadFrequently: true });
  const rgba = (css) => {
    ctx.clearRect(0, 0, 1, 1);
    ctx.fillStyle = "rgba(0,0,0,0)";
    ctx.fillStyle = css;
    ctx.fillRect(0, 0, 1, 1);
    const [r, g, b, a] = ctx.getImageData(0, 0, 1, 1).data;
    return [r / 255, g / 255, b / 255, a / 255];
  };
  const over = ([r, g, b, a], [R, G, B]) => [a * r + (1 - a) * R, a * g + (1 - a) * G, a * b + (1 - a) * B];
  const lum = (c) => {
    const [r, g, b] = c.map((v) => (v <= 0.04045 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4));
    return 0.2126 * r + 0.7152 * g + 0.0722 * b;
  };
  const ratio = (a, b) => { const [x, y] = [lum(a), lum(b)].sort((m, n) => n - m); return (x + 0.05) / (y + 0.05); };
  const opacityOf = (el) => { let o = 1; for (let n = el; n instanceof Element; n = n.parentElement) o *= +getComputedStyle(n).opacity; return o; };
  /* The ground under el: its own and its ancestors' backgrounds, stacked, over the canvas. */
  const groundOf = (el, self = true) => {
    const layers = [];
    for (let n = self ? el : el.parentElement; n instanceof Element; n = n.parentElement) {
      const c = rgba(getComputedStyle(n).backgroundColor);
      if (c[3] > 0) layers.push(c);
      if (c[3] >= 1) break;
    }
    let g = [1, 1, 1];
    const root = rgba(getComputedStyle(document.documentElement).backgroundColor);
    if (root[3] > 0) g = over(root, g);
    for (const l of layers.reverse()) g = over(l, g);
    return g;
  };
  const disabled = (el) => !!el.closest(':disabled, [aria-disabled="true"], [data-disabled], fieldset[disabled]');
  const shown = (el) => { const r = el.getBoundingClientRect(); return r.width > 0 && r.height > 0 && el.checkVisibility({ opacityProperty: false, visibilityProperty: true }); };
  const name = (el) => {
    const s = el.getAttribute("data-slot");
    const t = (el.textContent || "").trim().slice(0, 30);
    return `<${el.tagName.toLowerCase()}${s ? ` data-slot="${s}"` : ""}${el.getAttribute("class") ? ` class="${el.getAttribute("class").slice(0, 80)}"` : ""}>${t ? ` "${t}"` : ""}`;
  };
  const problems = [];
  let checked = 0;
  const judge = (el, kind, ink, floor) => {
    if (el.closest("[data-contrast-expect]")) return;
    const ground = groundOf(el);
    const eff = [...ink.slice(0, 3), ink[3] * opacityOf(el)];
    const r = ratio(over(eff, ground), ground);
    checked++;
    if (r < floor) problems.push(`${kind} ${r.toFixed(2)}:1 (< ${floor}) ${name(el)}`);
  };

  for (const el of document.body.querySelectorAll("*")) {
    if (!shown(el) || disabled(el) || el.closest("svg, .recharts-wrapper")) continue;
    const text = [...el.childNodes].some((n) => n.nodeType === 3 && n.textContent.trim());
    if (text) {
      const cs = getComputedStyle(el);
      const px = parseFloat(cs.fontSize), bold = +cs.fontWeight >= 700;
      judge(el, "text", rgba(cs.color), px >= 24 || (bold && px >= 18.66) ? FLOORS.large : FLOORS.text);
    }
    if (/^(input|textarea|select-trigger|checkbox|radio-group-item)$/.test(el.getAttribute("data-slot") || "")) {
      const cs = getComputedStyle(el);
      if (parseFloat(cs.borderTopWidth) > 0 && el.getAttribute("data-state") !== "checked") {
        /* A border sits on the ground OUTSIDE the control. */
        const ink = rgba(cs.borderTopColor), ground = groundOf(el, false);
        const r = ratio(over([...ink.slice(0, 3), ink[3] * opacityOf(el)], ground), ground);
        checked++;
        if (!el.closest("[data-contrast-expect]") && r < FLOORS.border) problems.push(`border ${r.toFixed(2)}:1 (< ${FLOORS.border}) ${name(el)}`);
      }
    }
  }
  for (const svg of document.body.querySelectorAll("svg")) {
    if (!shown(svg) || disabled(svg) || svg.closest(".recharts-wrapper")) continue;
    const drawn = [svg, ...svg.querySelectorAll("*")].some((n) => /currentcolor/i.test(`${n.getAttribute("stroke")} ${n.getAttribute("fill")}`));
    if (drawn) judge(svg, "icon", rgba(getComputedStyle(svg).color), FLOORS.icon);
  }
  return { problems, checked };
}
