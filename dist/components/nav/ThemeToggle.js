"use client";
import { jsx } from "react/jsx-runtime";
import * as React from "react";
import { Icon } from "../primitives/Icon.js";
import { paint, persist, THEME_EVENT, THEME_KEY } from "../../hooks.js";
import { useRadioGroup } from "../_radio-group.js";
const cx = (...a) => a.filter(Boolean).join(" ");
const THEME_LABELS = { light: "Light", dark: "Dark", system: "Auto" };
const GLYPHS = { light: "sun", dark: "moon", system: "monitor" };
function ThemeToggle({
  value,
  onChange,
  modes = ["light", "dark"],
  label = "Colour theme",
  modeLabels = THEME_LABELS,
  compact = false,
  formatCompactLabel = (l, current, next) => l + ": " + current + ". " + next,
  className,
  ...rest
}) {
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
  React.useEffect(() => {
    if (value !== void 0) return;
    const on = (e) => {
      if (modes.includes(e.detail)) setInternal(e.detail);
    };
    window.addEventListener(THEME_EVENT, on);
    return () => window.removeEventListener(THEME_EVENT, on);
  }, [value, modes.join(",")]);
  const mode = value !== void 0 ? value : internal;
  const apply = (m) => {
    if (value === void 0) setInternal(m);
    onChange && onChange(m);
    if (value === void 0) persist(m);
    paint(m);
  };
  if (compact) {
    const next = modes[(Math.max(0, modes.indexOf(mode)) + 1) % modes.length];
    const name = formatCompactLabel(label, modeLabels[mode] || mode, modeLabels[next] || next);
    return /* @__PURE__ */ jsx(
      "button",
      {
        type: "button",
        className: cx("lw-icon-btn", "lw-hit", "lw-theme-compact", className),
        "aria-label": name,
        title: name,
        onClick: () => apply(next),
        ...rest,
        children: /* @__PURE__ */ jsx(Icon, { name: GLYPHS[mode] || "monitor", size: 18 })
      }
    );
  }
  const { ref, onKeyDown, tabIndexFor } = useRadioGroup(modes, mode, apply);
  return /* @__PURE__ */ jsx(
    "div",
    {
      ref,
      className: cx("lw-segmented", className),
      role: "radiogroup",
      "aria-label": label,
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
          "aria-label": modeLabels[m] || m,
          title: modeLabels[m] || m,
          children: /* @__PURE__ */ jsx(Icon, { name: GLYPHS[m] || "monitor", size: 16 })
        },
        m
      ))
    }
  );
}
export {
  THEME_LABELS,
  ThemeToggle
};
