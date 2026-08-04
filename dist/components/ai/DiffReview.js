"use client";
import { Fragment, jsx, jsxs } from "react/jsx-runtime";
import { Icon } from "../primitives/Icon.js";
import { Button } from "../primitives/Button.js";
const cx = (...a) => a.filter(Boolean).join(" ");
const SIGN = { add: "+", del: "\u2212", mod: "~" };
function DiffReview({
  hunks = [],
  decisions = {},
  onDecide,
  onAcceptAll,
  onRejectAll,
  label = "Proposed changes",
  acceptLabel = "Accept",
  rejectLabel = "Reject",
  undoLabel = "Undo",
  acceptAllLabel = "Accept all",
  rejectAllLabel = "Reject all",
  acceptedLabel = "Accepted",
  rejectedLabel = "Rejected",
  kindLabels = { add: "added: ", del: "removed: ", mod: "changed: " },
  formatProgress = (p, t) => p ? p + " of " + t + " still to review" : "All " + t + " reviewed",
  className,
  ...rest
}) {
  const pending = hunks.filter((h) => !decisions[h.id]).length;
  return /* @__PURE__ */ jsxs("div", { className: cx("lw-diff", className), role: "group", "aria-label": label, ...rest, children: [
    hunks.map((h) => {
      const d = decisions[h.id];
      return /* @__PURE__ */ jsxs("div", { className: "lw-diff-hunk", "data-decision": d, children: [
        /* @__PURE__ */ jsxs("div", { className: "lw-diff-head", children: [
          /* @__PURE__ */ jsx(Icon, { name: "file", size: 14, className: "lw-diff-ic" }),
          /* @__PURE__ */ jsxs("span", { className: "lw-diff-file", children: [
            h.file,
            h.range ? " \xB7 " + h.range : ""
          ] })
        ] }),
        /* @__PURE__ */ jsx("div", { className: "lw-diff-lines", children: h.lines.map((l, i) => /* @__PURE__ */ jsxs("div", { className: "lw-diff-line", "data-kind": l.kind, children: [
          /* @__PURE__ */ jsx("span", { className: "n", children: l.n ?? "" }),
          /* @__PURE__ */ jsx("span", { className: "s", "aria-hidden": "true", children: SIGN[l.kind] || "" }),
          /* @__PURE__ */ jsxs("span", { className: "t", children: [
            l.kind && /* @__PURE__ */ jsx("span", { className: "lw-sr-only", children: kindLabels[l.kind] ?? kindLabels.mod }),
            l.text
          ] })
        ] }, i)) }),
        /* @__PURE__ */ jsxs("div", { className: "lw-diff-foot", children: [
          /* @__PURE__ */ jsx("span", { className: "lw-diff-state", children: d === "accepted" ? acceptedLabel : d === "rejected" ? rejectedLabel : h.note || "" }),
          d ? /* @__PURE__ */ jsxs(Button, { size: "sm", variant: "ghost", onClick: () => onDecide && onDecide(h.id, null), children: [
            /* @__PURE__ */ jsx(Icon, { name: "undo", size: 14 }),
            undoLabel
          ] }) : /* @__PURE__ */ jsxs(Fragment, { children: [
            /* @__PURE__ */ jsx(Button, { size: "sm", variant: "ghost", onClick: () => onDecide && onDecide(h.id, "rejected"), children: rejectLabel }),
            /* @__PURE__ */ jsx(Button, { size: "sm", onClick: () => onDecide && onDecide(h.id, "accepted"), children: acceptLabel })
          ] })
        ] })
      ] }, h.id);
    }),
    hunks.length > 1 && /* @__PURE__ */ jsxs("div", { className: "lw-diff-foot", children: [
      /* @__PURE__ */ jsx("span", { className: "lw-diff-state", "aria-live": "polite", children: formatProgress(pending, hunks.length) }),
      /* @__PURE__ */ jsx(Button, { size: "sm", variant: "ghost", onClick: onRejectAll, disabled: !pending, children: rejectAllLabel }),
      /* @__PURE__ */ jsx(Button, { size: "sm", onClick: onAcceptAll, disabled: !pending, children: acceptAllLabel })
    ] })
  ] });
}
export {
  DiffReview
};
