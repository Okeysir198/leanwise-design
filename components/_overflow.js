"use client";
import * as React from "react";

/**
 * `useOverflow()` — does this scroll container actually have content past its
 * inline end, right now?
 *
 * Returns a ref to put on the scroller. While there is more content in the
 * inline direction than fits, the element carries `data-overflow="true"`; the
 * attribute is removed the moment it fits, or the reader scrolls to the end.
 * The CSS hint (`.lw-table-wrap[data-overflow="true"]` in base.css) hangs off
 * that attribute and nothing else.
 *
 * WHY AN ATTRIBUTE AND NOT A CLASS ON THE COMPONENT. Three reasons, and the
 * third is the one that decided it:
 *
 *   1. A vanilla consumer — no React, no effect — gets EXACTLY what it got
 *      before. The hint is opt-in by measurement, so a hand-written
 *      `.lw-table-wrap` in a marketing page cannot acquire a fade it has no way
 *      to clear.
 *   2. Anything that can measure its own scroller can set the attribute: a
 *      Svelte port, a server that knows its column count, a test. The contract
 *      is one attribute, not one framework.
 *   3. A permanent fade is worse than none. A table that fits, or one the
 *      reader has already scrolled to the end of, is finished — a gradient
 *      there says "there is more" about content that does not exist, which is
 *      the same lie a scrollbar-less overflow tells, pointing the other way.
 *
 * SCROLL AS WELL AS RESIZE. The size observer catches the container changing
 * and the CONTENT changing (both are observed — a table that gains rows can
 * gain width, and `ResizeObserver` on the scroller alone never fires for that).
 * The scroll listener catches the reader reaching the end, which no observer
 * reports.
 *
 * RTL: `scrollLeft` is negative in a right-to-left scroller in every engine
 * that follows the spec, so the distance travelled is its magnitude. Comparing
 * against the remaining distance rather than a signed position is what makes
 * one line of arithmetic correct in both directions.
 */
export function useOverflow() {
  const ref = React.useRef(null);

  /* No dependency array on purpose. The thing being measured is the RENDERED
     width, so the measurement has to follow every render — a re-sort, a filter,
     a column shown or hidden all change it and none of them are values this
     hook could list. The subscription it rebuilds is two observations (the port
     and its one or two children), which is cheaper than the wrong answer. */
  React.useEffect(() => {
    const el = ref.current;
    if (!el) return undefined;

    /* 1px of slack: `scrollWidth` and `clientWidth` are integers rounded from
       fractional layout, so a table that fits exactly can report a 1px
       difference on a fractional device pixel ratio and flash a fade forever. */
    const measure = () => {
      const remaining = el.scrollWidth - el.clientWidth - Math.abs(el.scrollLeft);
      if (remaining > 1) el.setAttribute("data-overflow", "true");
      else el.removeAttribute("data-overflow");
    };

    measure();

    let ro;
    if (typeof ResizeObserver !== "undefined") {
      ro = new ResizeObserver(measure);
      ro.observe(el);
      /* The scrolled content, not just the port: a column that grows changes
         `scrollWidth` without changing the box this hook is attached to. */
      for (const child of el.children) ro.observe(child);
    }
    el.addEventListener("scroll", measure, { passive: true });

    return () => {
      if (ro) ro.disconnect();
      el.removeEventListener("scroll", measure);
    };
  });

  return ref;
}
