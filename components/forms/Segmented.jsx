"use client";
import * as React from "react";
import { useRadioGroup } from "../_radio-group.js";
const cx = (...a) => a.filter(Boolean).join(" ");


/** 2-4 mutually exclusive views. Above four, use Select — a segmented control
 *  that scrolls has stopped being a segmented control.
 *
 *  `radiogroup` / `radio` / `aria-checked`, not `aria-pressed`: the options are
 *  ONE choice, and `aria-pressed` describes N independent toggles — it told a
 *  screen-reader user the wrong thing about the widget and gave them no set size
 *  and no arrow-key path through it. See `_radio-group.js`. */
/* forwardRef, for the same reason Input.jsx gives — see Combobox.jsx.
   A radiogroup's ref is the GROUP, not a button — that is what receives focus
   management and what a Controller scrolls to. useRadioGroup already owns an
   internal one, so the forwarded ref is redirected at the same node. */
export const Segmented = React.forwardRef(function Segmented({ options = [], value, onChange, label, className, ...rest }, forwardedRef) {
  const opts = options.map(o => (typeof o === "string" ? { value: o, label: o } : o));
  const { ref, onKeyDown, tabIndexFor } = useRadioGroup(
    opts.map(o => o.value), value, (v) => onChange && onChange(v)
  );
  React.useImperativeHandle(forwardedRef, () => ref.current, []);
  return (
    <div ref={ref} className={cx("lw-segmented", className)} role="radiogroup" aria-label={label}
      onKeyDown={onKeyDown} {...rest}>
      {opts.map((o, i) => (
        <button key={o.value} type="button" role="radio" aria-checked={value === o.value}
          tabIndex={tabIndexFor(i)} onClick={() => onChange && onChange(o.value)}>{o.label}</button>
      ))}
    </div>
  );
});
