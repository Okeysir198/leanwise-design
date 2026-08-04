"use client";
import { Fragment, jsx, jsxs } from "react/jsx-runtime";
import * as React from "react";
import { Icon } from "../primitives/Icon.js";
const cx = (...a) => a.filter(Boolean).join(" ");
const fmt = (v) => typeof v === "string" ? v : JSON.stringify(v, null, 2);
function ToolCall({
  name,
  summary,
  args,
  result,
  error,
  state = "ok",
  duration,
  defaultOpen,
  stateLabels = { running: "running", error: "failed", pending: "pending", ok: "succeeded" },
  argsLabel = "arguments",
  errorLabel = "error",
  resultLabel = "result",
  formatDuration = (ms) => ms + "ms",
  className,
  ...rest
}) {
  const [open, setOpen] = React.useState(!!defaultOpen);
  const uid = React.useId();
  const st = error ? "error" : state;
  return /* @__PURE__ */ jsxs("div", { className: cx("lw-tool", className), "data-state": st, ...rest, children: [
    /* @__PURE__ */ jsxs("button", { type: "button", className: "lw-tool-head", "aria-expanded": open, "aria-controls": uid, onClick: () => setOpen((o) => !o), children: [
      /* @__PURE__ */ jsx(Icon, { name: open ? "chevron-down" : "chevron-right", size: 14 }),
      /* @__PURE__ */ jsx("span", { className: "lw-tool-dot", "aria-hidden": "true" }),
      /* @__PURE__ */ jsx("span", { className: "lw-tool-name", children: name }),
      /* @__PURE__ */ jsx("span", { className: "lw-tool-sum", children: summary }),
      duration != null && /* @__PURE__ */ jsx("span", { className: "lw-tool-dur", children: formatDuration(duration) }),
      /* @__PURE__ */ jsx("span", { className: "lw-sr-only", children: stateLabels[st] ?? stateLabels.ok })
    ] }),
    open && /* @__PURE__ */ jsxs("div", { className: "lw-tool-body", id: uid, children: [
      args != null && /* @__PURE__ */ jsxs(Fragment, { children: [
        /* @__PURE__ */ jsx("span", { className: "k", children: argsLabel }),
        /* @__PURE__ */ jsx("pre", { children: fmt(args) })
      ] }),
      error ? /* @__PURE__ */ jsxs(Fragment, { children: [
        /* @__PURE__ */ jsx("span", { className: "k", children: errorLabel }),
        /* @__PURE__ */ jsx("pre", { className: "err", children: fmt(error) })
      ] }) : result != null && /* @__PURE__ */ jsxs(Fragment, { children: [
        /* @__PURE__ */ jsx("span", { className: "k", children: resultLabel }),
        /* @__PURE__ */ jsx("pre", { children: fmt(result) })
      ] })
    ] })
  ] });
}
export {
  ToolCall
};
