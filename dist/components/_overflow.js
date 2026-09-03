"use client";
import * as React from "react";
function useOverflow() {
  const ref = React.useRef(null);
  React.useEffect(() => {
    const el = ref.current;
    if (!el) return void 0;
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
export {
  useOverflow
};
