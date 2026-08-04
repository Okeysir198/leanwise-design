import { Fragment, jsx, jsxs } from "react/jsx-runtime";
import { Icon } from "../primitives/Icon.js";
const cx = (...a) => a.filter(Boolean).join(" ");
function Artifact({
  title,
  version,
  versionCount,
  onPrevVersion,
  onNextVersion,
  onRevert,
  onEdit,
  actions,
  prevVersionLabel = "Previous version",
  nextVersionLabel = "Next version",
  editLabel = "Edit manually",
  revertLabel = "Revert",
  className,
  children,
  ...rest
}) {
  const canPrev = version > 1;
  const canNext = versionCount != null && version < versionCount;
  return /* @__PURE__ */ jsxs("div", { className: cx("lw-artifact", className), ...rest, children: [
    /* @__PURE__ */ jsxs("div", { className: "lw-artifact-head", children: [
      /* @__PURE__ */ jsx(Icon, { name: "file", size: 15, className: "lw-artifact-ic" }),
      /* @__PURE__ */ jsx("span", { className: "lw-artifact-title", children: title }),
      version != null && /* @__PURE__ */ jsxs(Fragment, { children: [
        /* @__PURE__ */ jsx("button", { type: "button", className: "lw-icon-btn", "aria-label": prevVersionLabel, disabled: !canPrev, onClick: onPrevVersion, children: /* @__PURE__ */ jsx(Icon, { name: "chevron-left", size: 15 }) }),
        /* @__PURE__ */ jsxs("span", { className: "lw-artifact-ver", children: [
          "v",
          version,
          versionCount ? " / " + versionCount : ""
        ] }),
        /* @__PURE__ */ jsx("button", { type: "button", className: "lw-icon-btn", "aria-label": nextVersionLabel, disabled: !canNext, onClick: onNextVersion, children: /* @__PURE__ */ jsx(Icon, { name: "chevron-right", size: 15 }) })
      ] })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "lw-artifact-body", children }),
    (onRevert || onEdit || actions) && /* @__PURE__ */ jsxs("div", { className: "lw-artifact-foot", children: [
      onEdit && /* @__PURE__ */ jsxs("button", { type: "button", className: "lw-btn lw-btn-ghost lw-btn-sm", onClick: onEdit, children: [
        /* @__PURE__ */ jsx(Icon, { name: "edit", size: 14 }),
        editLabel
      ] }),
      onRevert && /* @__PURE__ */ jsxs("button", { type: "button", className: "lw-btn lw-btn-ghost lw-btn-sm", onClick: onRevert, children: [
        /* @__PURE__ */ jsx(Icon, { name: "undo", size: 14 }),
        revertLabel
      ] }),
      /* @__PURE__ */ jsx("span", { className: "lw-spacer" }),
      actions
    ] })
  ] });
}
export {
  Artifact
};
