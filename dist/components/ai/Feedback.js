"use client";
import { jsx, jsxs } from "react/jsx-runtime";
import * as React from "react";
import { Icon } from "../primitives/Icon.js";
const cx = (...a) => a.filter(Boolean).join(" ");
function Feedback({
  value,
  onChange,
  onComment,
  commentPlaceholder = "What was wrong?",
  note,
  upLabel = "Helpful",
  downLabel = "Not helpful",
  cancelLabel = "Cancel",
  sendLabel = "Send",
  className,
  ...rest
}) {
  const [open, setOpen] = React.useState(false);
  const [text, setText] = React.useState("");
  const set = (v) => {
    const next = value === v ? null : v;
    onChange && onChange(next);
    if (next === "down" && onComment) setOpen(true);
  };
  return /* @__PURE__ */ jsxs("div", { className: cx(className), ...rest, children: [
    /* @__PURE__ */ jsxs("div", { className: "lw-feedback", children: [
      /* @__PURE__ */ jsx("button", { type: "button", className: "lw-icon-btn", "aria-label": upLabel, "aria-pressed": value === "up", onClick: () => set("up"), children: /* @__PURE__ */ jsx(Icon, { name: "thumbs-up", size: 15 }) }),
      /* @__PURE__ */ jsx("button", { type: "button", className: "lw-icon-btn", "aria-label": downLabel, "aria-pressed": value === "down", onClick: () => set("down"), children: /* @__PURE__ */ jsx(Icon, { name: "thumbs-down", size: 15 }) }),
      note && /* @__PURE__ */ jsx("span", { className: "lw-feedback-note", children: note })
    ] }),
    open && onComment && /* @__PURE__ */ jsxs(
      "form",
      {
        className: "lw-feedback-form",
        onSubmit: (e) => {
          e.preventDefault();
          onComment(text);
          setOpen(false);
          setText("");
        },
        children: [
          /* @__PURE__ */ jsx(
            "textarea",
            {
              className: "lw-textarea",
              rows: 2,
              value: text,
              autoFocus: true,
              "aria-label": commentPlaceholder,
              placeholder: commentPlaceholder,
              onChange: (e) => setText(e.target.value)
            }
          ),
          /* @__PURE__ */ jsxs("div", { className: "lw-feedback-actions", children: [
            /* @__PURE__ */ jsx("button", { type: "button", className: "lw-btn lw-btn-ghost lw-btn-sm", onClick: () => setOpen(false), children: cancelLabel }),
            /* @__PURE__ */ jsx("button", { type: "submit", className: "lw-btn lw-btn-sm", disabled: !text.trim(), children: sendLabel })
          ] })
        ]
      }
    )
  ] });
}
export {
  Feedback
};
