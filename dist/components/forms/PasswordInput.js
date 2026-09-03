"use client";
import { jsx, jsxs } from "react/jsx-runtime";
import * as React from "react";
import { Icon } from "../primitives/Icon.js";
const cx = (...a) => a.filter(Boolean).join(" ");
const PasswordInput = React.forwardRef(function PasswordInput2({
  size,
  invalid,
  /* These NAME THE CURRENT STATE, per the note above — "the password is
     hidden", not "show the password". The first version of this shipped the
     actions as defaults and contradicted its own contract two lines up. */
  revealLabel = "Password hidden",
  hideLabel = "Password visible",
  capsLockLabel = "Caps Lock is on",
  onCapsLockChange,
  className,
  ...rest
}, ref) {
  const [revealed, setRevealed] = React.useState(false);
  const [caps, setCaps] = React.useState(false);
  const readCaps = (e) => {
    if (typeof e.getModifierState !== "function") return;
    const on = e.getModifierState("CapsLock");
    setCaps(on);
    onCapsLockChange?.(on);
  };
  return /* @__PURE__ */ jsxs("div", { className: cx("lw-pw", className), children: [
    /* @__PURE__ */ jsxs(
      "div",
      {
        className: cx(
          "lw-input-group",
          size === "sm" && "lw-input-group-sm",
          size === "lg" && "lw-input-group-lg"
        ),
        children: [
          /* @__PURE__ */ jsx(
            "input",
            {
              ref,
              type: revealed ? "text" : "password",
              "aria-invalid": invalid ? "true" : void 0,
              onKeyUp: readCaps,
              onKeyDown: readCaps,
              onBlur: () => setCaps(false),
              ...rest
            }
          ),
          /* @__PURE__ */ jsx(
            "button",
            {
              type: "button",
              className: "lw-icon-btn lw-hit",
              "aria-pressed": revealed,
              "aria-label": revealed ? hideLabel : revealLabel,
              title: revealed ? hideLabel : revealLabel,
              onClick: () => setRevealed((v) => !v),
              "data-testid": "password-reveal",
              children: /* @__PURE__ */ jsx(Icon, { name: revealed ? "eye-off" : "eye", size: 16 })
            }
          )
        ]
      }
    ),
    /* @__PURE__ */ jsx("p", { className: "lw-help lw-pw-caps", role: "status", "data-on": caps ? "true" : void 0, children: caps ? capsLockLabel : "" })
  ] });
});
export {
  PasswordInput
};
