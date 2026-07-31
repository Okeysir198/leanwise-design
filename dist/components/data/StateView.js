import { jsx, jsxs } from "react/jsx-runtime";
import { Icon } from "../primitives/Icon.js";
import { Skeleton } from "../primitives/Skeleton.js";
const cx = (...a) => a.filter(Boolean).join(" ");
const PRESETS = {
  empty: { icon: "inbox", title: "Nothing here yet" },
  loading: { icon: null, title: "Loading\u2026" },
  error: { icon: "x-circle", title: "Something went wrong", description: "The request failed. Nothing was changed.", actionLabel: "Try again" },
  offline: { icon: "webhook", title: "You are offline", description: "Reconnect to load this. Anything you have typed is kept.", actionLabel: "Retry" },
  denied: { icon: "lock", title: "You do not have access", description: "Ask a workspace admin for permission to view this." }
};
function StateView({ variant = "empty", icon, title, description, action, actionLabel, onAction, lines = 3, className, children, ...rest }) {
  const p = PRESETS[variant] || PRESETS.empty;
  if (variant === "loading") {
    return /* @__PURE__ */ jsxs("div", { className: cx("lw-state", className), "data-variant": "loading", role: "status", "aria-busy": "true", ...rest, children: [
      /* @__PURE__ */ jsx("span", { className: "lw-sr-only", children: title || p.title }),
      /* @__PURE__ */ jsx(Skeleton, { lines })
    ] });
  }
  const isAlert = variant === "error" || variant === "offline";
  const label = actionLabel || p.actionLabel;
  return /* @__PURE__ */ jsxs(
    "div",
    {
      className: cx("lw-state", className),
      "data-variant": variant,
      role: isAlert ? "alert" : void 0,
      ...rest,
      children: [
        (icon || p.icon) && /* @__PURE__ */ jsx("span", { className: "lw-state-ic", children: /* @__PURE__ */ jsx(Icon, { name: icon || p.icon, size: 20 }) }),
        /* @__PURE__ */ jsx("span", { className: "lw-state-title", children: title || p.title }),
        (description || p.description) && /* @__PURE__ */ jsx("p", { className: "lw-state-desc", children: description || p.description }),
        children,
        (action || label && onAction) && /* @__PURE__ */ jsx("div", { className: "lw-state-actions", children: action || /* @__PURE__ */ jsx("button", { type: "button", className: "lw-btn lw-btn-sm", onClick: onAction, children: label }) })
      ]
    }
  );
}
export {
  StateView
};
