import { Fragment, jsx, jsxs } from "react/jsx-runtime";
const cx = (...a) => a.filter(Boolean).join(" ");
function PromptInput({ value, onChange, onSubmit, placeholder = "Ask anything about your documents\u2026", hint = "\u23CE to send \xB7 \u21E7\u23CE newline", label = "Prompt", tools, action, disabled, className, children, ...rest }) {
  const onKeyDown = (e) => {
    if (disabled) return;
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      onSubmit && onSubmit();
    }
  };
  return /* @__PURE__ */ jsxs("div", { className: cx("lw-prompt", className), ...rest, children: [
    /* @__PURE__ */ jsx(
      "textarea",
      {
        value,
        onChange: (e) => onChange && onChange(e.target.value),
        onKeyDown,
        placeholder,
        rows: 2,
        disabled,
        "aria-label": label
      }
    ),
    /* @__PURE__ */ jsx("div", { className: "lw-prompt-foot", children: children || /* @__PURE__ */ jsxs(Fragment, { children: [
      tools,
      /* @__PURE__ */ jsx("span", { className: "spacer" }),
      /* @__PURE__ */ jsx("span", { className: "lw-prompt-hint", children: hint }),
      action
    ] }) })
  ] });
}
export {
  PromptInput
};
