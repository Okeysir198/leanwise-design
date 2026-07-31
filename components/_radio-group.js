"use client";
import * as React from "react";

/**
 * The single-choice-set keyboard contract — internal, shared by every control
 * that renders a mutually exclusive row of buttons (`Segmented`, `ThemeToggle`).
 *
 * WHY this exists at all: those controls announced themselves with
 * `aria-pressed`, which describes N INDEPENDENT toggles. A screen-reader user
 * was told "three toggle buttons, one pressed" for a widget where turning one on
 * turns the others off, and was given no set size, no position in the set, and
 * no arrow-key navigation. `role="radiogroup"` + `role="radio"` + `aria-checked`
 * is the pattern for one-of-N (WAI-ARIA APG, Radio Group).
 *
 * A radiogroup owes the keyboard three things beyond the role:
 *   - ONE tab stop for the whole group (roving tabindex), so Tab enters and
 *     leaves rather than walking every option — the same argument Calendar's
 *     42-cell grid makes.
 *   - Arrow keys move AND select. That is the APG contract for a radio group,
 *     not an embellishment: with focus-only movement the checked option and the
 *     focused option diverge and there is no key that reconciles them.
 *   - Home/End to the ends.
 *
 * Focus is moved imperatively against the CURRENT DOM rather than in an effect:
 * the target button already exists (unlike Calendar's cells, which are rebuilt
 * when the month changes), so there is nothing to wait for.
 *
 * @param values  the option values, in DOM order
 * @param value   the selected value, or undefined/null for none
 * @param select  called with the newly chosen value
 */
export function useRadioGroup(values, value, select) {
  const ref = React.useRef(null);

  const at = values.indexOf(value);

  /* Exactly one tabbable member. With nothing selected the FIRST option takes
     the tab stop — a group where every member is tabindex="-1" is a group the
     keyboard cannot reach at all. */
  const tabIndexFor = (i) => (at === -1 ? (i === 0 ? 0 : -1) : (i === at ? 0 : -1));

  const onKeyDown = (e) => {
    const n = values.length;
    if (!n) return;
    const d = e.key === "ArrowRight" || e.key === "ArrowDown" ? 1
      : e.key === "ArrowLeft" || e.key === "ArrowUp" ? -1 : 0;
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
