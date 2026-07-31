"use client";
import { Fragment, jsx, jsxs } from "react/jsx-runtime";
import { Icon } from "../primitives/Icon.js";
import { Button } from "../primitives/Button.js";
const cx = (...a) => a.filter(Boolean).join(" ");
const SIGN = { add: "+", del: "\u2212", mod: "~" };
function DiffReview({ hunks = [], decisions = {}, onDecide, onAcceptAll, onRejectAll, label = "Proposed changes", className, ...rest }) {
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
            l.kind && /* @__PURE__ */ jsx("span", { className: "lw-sr-only", children: l.kind === "add" ? "added: " : l.kind === "del" ? "removed: " : "changed: " }),
            l.text
          ] })
        ] }, i)) }),
        /* @__PURE__ */ jsxs("div", { className: "lw-diff-foot", children: [
          /* @__PURE__ */ jsx("span", { className: "lw-diff-state", children: d === "accepted" ? "Accepted" : d === "rejected" ? "Rejected" : h.note || "" }),
          d ? /* @__PURE__ */ jsxs(Button, { size: "sm", variant: "ghost", onClick: () => onDecide && onDecide(h.id, null), children: [
            /* @__PURE__ */ jsx(Icon, { name: "undo", size: 14 }),
            "Undo"
          ] }) : /* @__PURE__ */ jsxs(Fragment, { children: [
            /* @__PURE__ */ jsx(Button, { size: "sm", variant: "ghost", onClick: () => onDecide && onDecide(h.id, "rejected"), children: "Reject" }),
            /* @__PURE__ */ jsx(Button, { size: "sm", onClick: () => onDecide && onDecide(h.id, "accepted"), children: "Accept" })
          ] })
        ] })
      ] }, h.id);
    }),
    hunks.length > 1 && /* @__PURE__ */ jsxs("div", { className: "lw-diff-foot", children: [
      /* @__PURE__ */ jsx("span", { className: "lw-diff-state", "aria-live": "polite", children: pending ? pending + " of " + hunks.length + " still to review" : "All " + hunks.length + " reviewed" }),
      /* @__PURE__ */ jsx(Button, { size: "sm", variant: "ghost", onClick: onRejectAll, disabled: !pending, children: "Reject all" }),
      /* @__PURE__ */ jsx(Button, { size: "sm", onClick: onAcceptAll, disabled: !pending, children: "Accept all" })
    ] })
  ] });
}
export {
  DiffReview
};
