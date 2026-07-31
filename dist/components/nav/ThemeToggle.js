"use client";
import { jsx } from "react/jsx-runtime";
import * as React from "react";
import { Icon } from "../primitives/Icon.js";
import { paint, persist, THEME_KEY } from "../../hooks.js";
import { useRadioGroup } from "../_radio-group.js";
const cx = (...a) => a.filter(Boolean).join(" ");
const LABELS = { light: "Light", dark: "Dark", system: "Auto" };
const GLYPHS = { light: "sun", dark: "moon", system: "monitor" };
function ThemeToggle({ value, onChange, modes = ["light", "dark"], className, ...rest }) {
  const [internal, setInternal] = React.useState(modes.includes("system") ? "system" : modes[0]);
  React.useEffect(() => {
    if (value !== void 0) return;
    try {
      const saved = localStorage.getItem(THEME_KEY);
      if (saved && modes.includes(saved)) {
        setInternal(saved);
        paint(saved);
      }
    } catch (e) {
    }
  }, [value]);
  const mode = value !== void 0 ? value : internal;
  const apply = (m) => {
    if (value === void 0) setInternal(m);
    onChange && onChange(m);
    if (value === void 0) persist(m);
    paint(m);
  };
  const { ref, onKeyDown, tabIndexFor } = useRadioGroup(modes, mode, apply);
  return /* @__PURE__ */ jsx(
    "div",
    {
      ref,
      className: cx("lw-segmented", className),
      role: "radiogroup",
      "aria-label": "Colour theme",
      onKeyDown,
      ...rest,
      children: modes.map((m, i) => /* @__PURE__ */ jsx(
        "button",
        {
          type: "button",
          role: "radio",
          "aria-checked": mode === m,
          tabIndex: tabIndexFor(i),
          onClick: () => apply(m),
          "aria-label": LABELS[m] || m,
          title: LABELS[m] || m,
          children: /* @__PURE__ */ jsx(Icon, { name: GLYPHS[m] || "monitor", size: 16 })
        },
        m
      ))
    }
  );
}
export {
  ThemeToggle
};
