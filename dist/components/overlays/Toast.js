import { jsx, jsxs } from "react/jsx-runtime";
import { Icon } from "../primitives/Icon.js";
const cx = (...a) => a.filter(Boolean).join(" ");
function Toast({
  tone = "info",
  label,
  onClose,
  toneLabels = { ok: "done", warn: "warn", err: "error", info: "info" },
  dismissLabel = "Dismiss",
  children,
  className,
  ...rest
}) {
  const k = label || toneLabels[tone] || toneLabels.info;
  return (
    /* No role here. The enclosing ToastRegion is the live region; a role="status"
       or role="alert" INSIDE it nests two, which is why an announcement could
       come twice or not at all. An error toast raises the REGION's urgency
       instead — one live region, one politeness setting. */
    /* @__PURE__ */ jsxs("div", { className: cx("lw-toast", tone !== "info" && tone, className), ...rest, children: [
      /* @__PURE__ */ jsx("span", { className: "k", children: k }),
      /* @__PURE__ */ jsx("span", { className: "msg", children }),
      onClose && /* @__PURE__ */ jsx("button", { type: "button", className: "lw-icon-btn", "aria-label": dismissLabel, title: dismissLabel, onClick: onClose, children: /* @__PURE__ */ jsx(Icon, { name: "close", size: 15 }) })
    ] })
  );
}
function ToastRegion({ className, children, urgent, label = "Notifications", ...rest }) {
  return /* @__PURE__ */ jsx(
    "div",
    {
      className: cx("lw-toast-region", className),
      role: "region",
      "aria-live": urgent ? "assertive" : "polite",
      "aria-label": label,
      ...rest,
      children
    }
  );
}
export {
  Toast,
  ToastRegion
};
