"use client";
import * as React from "react";
function useRadioGroup(values, value, select) {
  const ref = React.useRef(null);
  const at = values.indexOf(value);
  const tabIndexFor = (i) => at === -1 ? i === 0 ? 0 : -1 : i === at ? 0 : -1;
  const onKeyDown = (e) => {
    const n = values.length;
    if (!n) return;
    const d = e.key === "ArrowRight" || e.key === "ArrowDown" ? 1 : e.key === "ArrowLeft" || e.key === "ArrowUp" ? -1 : 0;
    let next = null;
    if (d) next = ((at === -1 ? 0 : at) + d + n) % n;
    else if (e.key === "Home") next = 0;
    else if (e.key === "End") next = n - 1;
    else return;
    e.preventDefault();
    select(values[next]);
    const el = ref.current && ref.current.querySelectorAll('[role="radio"]')[next];
    if (el) el.focus();
  };
  return { ref, onKeyDown, tabIndexFor };
}
export {
  useRadioGroup
};
