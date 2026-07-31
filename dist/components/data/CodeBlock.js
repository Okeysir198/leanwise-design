"use client";
import { jsx, jsxs } from "react/jsx-runtime";
import * as React from "react";
import { Icon } from "../primitives/Icon.js";
const cx = (...a) => a.filter(Boolean).join(" ");
function CodeBlock({ code, html, filename, lang, copy = true, className, ...rest }) {
  const [copied, setCopied] = React.useState(false);
  const canCopy = copy && typeof code === "string" && code.length > 0;
  React.useEffect(() => {
    if (!copied) return;
    const t = setTimeout(() => setCopied(false), 1600);
    return () => clearTimeout(t);
  }, [copied]);
  const onCopy = () => {
    try {
      navigator.clipboard.writeText(code).then(() => setCopied(true), () => {
      });
    } catch (e) {
    }
  };
  return /* @__PURE__ */ jsxs("figure", { className: cx("lw-code", className), ...rest, children: [
    (filename || lang || canCopy) && /* @__PURE__ */ jsxs("figcaption", { className: "lw-code-head", children: [
      /* @__PURE__ */ jsx("span", { className: "fn", children: filename }),
      /* @__PURE__ */ jsxs("span", { className: "end", children: [
        lang && /* @__PURE__ */ jsx("span", { className: "lang", children: lang }),
        canCopy && /* @__PURE__ */ jsx(
          "button",
          {
            type: "button",
            className: "lw-icon-btn",
            onClick: onCopy,
            "aria-label": copied ? "Copied" : "Copy code",
            title: copied ? "Copied" : "Copy code",
            children: /* @__PURE__ */ jsx(Icon, { name: copied ? "check" : "copy", size: 15 })
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ jsx("pre", { children: /* @__PURE__ */ jsx("code", { dangerouslySetInnerHTML: html ? { __html: html } : void 0, children: html ? void 0 : code }) })
  ] });
}
export {
  CodeBlock
};
