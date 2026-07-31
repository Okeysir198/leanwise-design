"use client";
import { jsx } from "react/jsx-runtime";
import * as React from "react";
import { useMergedRef } from "../_merge-refs.js";
import { useRadioGroup } from "../_radio-group.js";
const cx = (...a) => a.filter(Boolean).join(" ");
const Segmented = React.forwardRef(function Segmented2({ options = [], value, onChange, label, className, ...rest }, forwardedRef) {
  const opts = options.map((o) => typeof o === "string" ? { value: o, label: o } : o);
  const { ref, onKeyDown, tabIndexFor } = useRadioGroup(
    opts.map((o) => o.value),
    value,
    (v) => onChange && onChange(v)
  );
  const setGroupRef = useMergedRef(ref, forwardedRef);
  return /* @__PURE__ */ jsx(
    "div",
    {
      ref: setGroupRef,
      className: cx("lw-segmented", className),
      role: "radiogroup",
      "aria-label": label,
      onKeyDown,
      ...rest,
      children: opts.map((o, i) => /* @__PURE__ */ jsx(
        "button",
        {
          type: "button",
          role: "radio",
          "aria-checked": value === o.value,
          tabIndex: tabIndexFor(i),
          onClick: () => onChange && onChange(o.value),
          children: o.label
        },
        o.value
      ))
    }
  );
});
export {
  Segmented
};
