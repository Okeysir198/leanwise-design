/* Focus clip: is each focus ring painted whole, or does a scroll/clip ancestor cut it?
   `probe` runs in the page after a real key press (keyboard modality). It focuses every
   visible, enabled control in the Tab order (tabindex -1 is skipped: a roving item shares
   its tabbable sibling's geometry), lets the browser scroll it into view as Tab does, reads
   the ring's reach from computed style, and compares the ring with the padding box of each
   clipping ancestor on its containing-block chain. Opt out with data-focus-expect="<why>".
   Returns { problems, checked, focused }. Serialised into the page: no module scope, so the
   selector comes in as an argument. */
export const FOCUSABLE = 'a[href], area[href], button, input:not([type="hidden"]), select, textarea, summary, iframe, [contenteditable=""], [contenteditable="true"], [tabindex]';
export function probe(focusable) {
  const px = (v) => parseFloat(v) || 0;
  const clear = (c) => /transparent|rgba\([^)]*,\s*0\)|\/\s*0\)/.test(c);
  /* What paints outside the border box: the outline, and each outer box-shadow, keyed so a
     before/after pair can be compared, with how far each reaches. Transparent ones paint nothing. */
  const paintOf = (el) => {
    const cs = getComputedStyle(el);
    const out = [];
    if (cs.outlineStyle !== "none" && px(cs.outlineWidth) > 0 && !clear(cs.outlineColor))
      out.push({ key: `outline ${cs.outlineStyle} ${cs.outlineWidth} ${cs.outlineOffset} ${cs.outlineColor}`, reach: px(cs.outlineWidth) + px(cs.outlineOffset) });
    /* Split on commas outside parentheses; each shadow is [color] x y [blur [spread]] [inset]. */
    for (const sh of cs.boxShadow === "none" ? [] : cs.boxShadow.split(/,(?![^(]*\))/)) {
      if (/\binset\b/.test(sh) || clear(sh)) continue;
      const [x = 0, y = 0, blur = 0, spread = 0] = [...sh.replace(/\([^)]*\)/g, "").matchAll(/-?[\d.]+px/g)].map((m) => px(m[0]));
      if (spread + blur > 0) out.push({ key: sh.trim(), reach: spread + blur + Math.max(Math.abs(x), Math.abs(y)) });
    }
    return out;
  };
  const visible = (el) => {
    const r = el.getBoundingClientRect();
    if (r.width <= 1 || r.height <= 1) return false; /* sr-only and the like */
    const cs = getComputedStyle(el);
    return cs.visibility !== "hidden" && !el.closest("[inert], [hidden], [aria-hidden='true']") && el.checkVisibility?.() !== false;
  };
  const clips = (cs) => cs.overflowX !== "visible" || cs.overflowY !== "visible";
  /* A transform/filter/contain makes an element the containing block of fixed descendants. */
  const holdsFixed = (cs) => cs.transform !== "none" || cs.filter !== "none" || cs.perspective !== "none" ||
    /paint|layout|strict|content/.test(cs.contain) || /transform|filter/.test(cs.willChange);
  /* The ancestors that can clip el: its containing-block chain, not every DOM ancestor. */
  const clippersOf = (el) => {
    const out = [];
    let pos = getComputedStyle(el).position;
    for (let n = el.parentElement; n && n !== document.body && n !== document.documentElement; n = n.parentElement) {
      const cs = getComputedStyle(n);
      const containing =
        pos === "fixed" ? holdsFixed(cs)
        : pos === "absolute" ? cs.position !== "static" || holdsFixed(cs)
        : true;
      if (!containing) continue;
      if (clips(cs)) out.push(n);
      pos = cs.position;
    }
    return out;
  };
  const name = (el) => {
    const t = el.tagName.toLowerCase();
    const slot = el.getAttribute("data-slot");
    const label = (el.getAttribute("aria-label") || el.textContent || "").trim().replace(/\s+/g, " ").slice(0, 30);
    return `${t}${slot ? `[data-slot=${slot}]` : ""}${label ? ` "${label}"` : ""}`;
  };
  const describe = (el) => {
    const cls = typeof el.className === "string" ? el.className.trim().split(/\s+/).filter((c) => /overflow|scroll|truncate|clip/.test(c)).join(" ") : "";
    const slot = el.getAttribute("data-slot");
    return `<${el.tagName.toLowerCase()}${slot ? ` data-slot=${slot}` : ""}${cls ? ` class="${cls}"` : ""}>`;
  };

  const problems = [];
  let checked = 0, focused = 0;
  const els = [...document.querySelectorAll(focusable)].filter((el) =>
    el.tabIndex >= 0 && !el.disabled && el.getAttribute("aria-disabled") !== "true" && !el.closest("[data-focus-expect]") && visible(el));
  for (const el of els) {
    /* The ring is what focus ADDS: a decorative shadow present at rest is not a ring. */
    if (document.activeElement === el) el.blur(); /* an autofocused control: read it at rest */
    const rest = new Set(paintOf(el).map((p) => p.key));
    el.focus({ focusVisible: true });
    if (document.activeElement !== el || !el.matches(":focus-visible")) continue;
    focused++;
    const reach = Math.max(0, ...paintOf(el).filter((p) => !rest.has(p.key)).map((p) => p.reach));
    if (reach > 0.5) {
      checked++;
      const b = el.getBoundingClientRect();
      const ring = { left: b.left - reach, top: b.top - reach, right: b.right + reach, bottom: b.bottom + reach };
      for (const c of clippersOf(el)) {
        const r = c.getBoundingClientRect();
        /* The padding box: clientLeft/Top skip the border, clientWidth/Height skip the scrollbar. */
        const box = { left: r.left + c.clientLeft, top: r.top + c.clientTop };
        box.right = box.left + c.clientWidth;
        box.bottom = box.top + c.clientHeight;
        /* Only a side where the control itself is inside the box: a control larger than its
           scroller, or scrolled half out of it, is a layout question, not a ring one. */
        const cut = [["left", -1], ["top", -1], ["right", 1], ["bottom", 1]]
          .filter(([side, d]) => d * (b[side] - box[side]) <= 0.5 && d * (ring[side] - box[side]) > 0.5)
          .map(([side]) => side);
        if (cut.length) {
          problems.push(`${name(el)} ring (${reach}px) cut on ${cut.join("/")} by ${describe(c)}`);
          break;
        }
      }
    }
  }
  document.activeElement?.blur?.();
  return { problems, checked, focused };
}
