"use client";
import { jsx } from "react/jsx-runtime";
import * as React from "react";
import { Icon } from "../primitives/Icon.js";
import { Menu } from "../overlays/Menu.js";
import { useRadioGroup } from "../_radio-group.js";
const cx = (...a) => a.filter(Boolean).join(" ");
function LocaleSwitcher({
  value,
  onChange,
  locales = [],
  localeLabels = {},
  label = "Language",
  compact = false,
  className,
  ...rest
}) {
  const codes = locales.length ? locales : Object.keys(localeLabels);
  const nameOf = (code) => localeLabels[code] || code;
  const apply = (code) => code !== value && onChange?.(code);
  if (compact && codes.length === 2) {
    const other = codes[0] === value ? codes[1] : codes[0];
    return /* @__PURE__ */ jsx(
      "button",
      {
        type: "button",
        className: cx("lw-icon-btn", "lw-hit", "lw-locale-compact", className),
        "aria-label": label + ": " + nameOf(value) + " \u2192 " + nameOf(other),
        title: label + ": " + nameOf(value) + " \u2192 " + nameOf(other),
        onClick: () => apply(other),
        "data-testid": "locale-toggle",
        lang: other,
        ...rest,
        children: /* @__PURE__ */ jsx(Icon, { name: "globe", size: 18 })
      }
    );
  }
  if (compact) {
    return /* @__PURE__ */ jsx(
      Menu,
      {
        label,
        placement: "bottom-end",
        items: codes.map((code) => ({
          value: code,
          label: nameOf(code),
          /* `checked` makes each row a `menuitemcheckbox`, so the current
             language is announced as checked rather than merely styled. */
          checked: code === value,
          onSelect: () => apply(code)
        })),
        trigger: /* @__PURE__ */ jsx(
          "button",
          {
            type: "button",
            className: cx("lw-icon-btn", "lw-hit", "lw-locale-compact", className),
            "aria-label": label + ": " + nameOf(value),
            title: label + ": " + nameOf(value),
            "data-testid": "locale-compact",
            ...rest,
            children: /* @__PURE__ */ jsx(Icon, { name: "globe", size: 18 })
          }
        )
      }
    );
  }
  const { ref, onKeyDown, tabIndexFor } = useRadioGroup(codes, value, apply);
  return /* @__PURE__ */ jsx(
    "div",
    {
      ref,
      className: cx("lw-segmented", className),
      role: "radiogroup",
      "aria-label": label,
      onKeyDown,
      "data-testid": "locale-switcher",
      ...rest,
      children: codes.map((code, i) => /* @__PURE__ */ jsx(
        "button",
        {
          type: "button",
          role: "radio",
          "aria-checked": value === code,
          tabIndex: tabIndexFor(i),
          onClick: () => apply(code),
          lang: code,
          children: nameOf(code)
        },
        code
      ))
    }
  );
}
export {
  LocaleSwitcher
};
