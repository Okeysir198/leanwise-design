"use client";
import { Fragment, jsx, jsxs } from "react/jsx-runtime";
import * as React from "react";
import { DropdownMenu } from "radix-ui";
import { Icon } from "../primitives/Icon.js";
import { Layer, useLayer } from "./_layer.js";
import { toSideAlign } from "./Popover.js";
const cx = (...a) => a.filter(Boolean).join(" ");
function Menu({ items = [], trigger, onSelect, label, placement = "bottom-start", matchWidth, linkAs = "a", className, ...rest }) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const layer = useLayer();
  const { side, align } = toSideAlign(placement);
  const choose = (it) => {
    it.onSelect ? it.onSelect(it) : onSelect && onSelect(it.value, it);
  };
  return /* @__PURE__ */ jsxs(DropdownMenu.Root, { modal: false, ...pickRoot(rest), children: [
    /* @__PURE__ */ jsx(DropdownMenu.Trigger, { asChild: true, ref: setAnchorEl, children: trigger }),
    /* @__PURE__ */ jsx(DropdownMenu.Portal, { container: layer?.container ?? void 0, children: /* @__PURE__ */ jsx(Layer, { from: anchorEl, children: /* @__PURE__ */ jsx(
      DropdownMenu.Content,
      {
        side,
        align,
        sideOffset: 6,
        collisionPadding: 8,
        "aria-label": label,
        "data-match-width": matchWidth ? "" : void 0,
        className: "lw-popover",
        ...omitRoot(rest),
        children: /* @__PURE__ */ jsx("div", { role: "none", className: cx("lw-menu", className), children: items.map((it, i) => {
          if (it.type === "separator") return /* @__PURE__ */ jsx(DropdownMenu.Separator, { className: "lw-menu-sep" }, i);
          if (it.type === "label") return /* @__PURE__ */ jsx(DropdownMenu.Label, { className: "lw-menu-label", children: it.label }, i);
          const checkable = it.checked != null;
          const rowClass = cx("lw-menu-item", it.danger && "danger");
          const body = /* @__PURE__ */ jsxs(Fragment, { children: [
            (checkable || it.icon) && /* @__PURE__ */ jsx("span", { className: "lw-menu-lead", children: checkable ? /* @__PURE__ */ jsx(DropdownMenu.ItemIndicator, { children: /* @__PURE__ */ jsx(Icon, { name: "checkmark", size: 14 }) }) : /* @__PURE__ */ jsx(Icon, { name: it.icon, size: 15 }) }),
            /* @__PURE__ */ jsx("span", { className: "lw-menu-text", children: it.label }),
            it.kbd && /* @__PURE__ */ jsx("span", { className: "lw-menu-kbd", children: it.kbd })
          ] });
          const key = it.value ?? i;
          if (checkable) {
            return /* @__PURE__ */ jsx(
              DropdownMenu.CheckboxItem,
              {
                className: rowClass,
                checked: !!it.checked,
                disabled: it.disabled,
                onSelect: () => choose(it),
                children: body
              },
              key
            );
          }
          if (it.href) {
            const LinkAs = linkAs;
            return /* @__PURE__ */ jsx(DropdownMenu.Item, { asChild: true, className: rowClass, disabled: it.disabled, onSelect: () => choose(it), children: /* @__PURE__ */ jsx(LinkAs, { href: it.href, children: body }) }, key);
          }
          return /* @__PURE__ */ jsx(DropdownMenu.Item, { className: rowClass, disabled: it.disabled, onSelect: () => choose(it), children: body }, key);
        }) })
      }
    ) }) })
  ] });
}
const ROOT_KEYS = ["open", "defaultOpen", "onOpenChange"];
function pickRoot(rest) {
  const out = {};
  for (const k of ROOT_KEYS) if (k in rest) out[k] = rest[k];
  return out;
}
function omitRoot(rest) {
  const out = { ...rest };
  for (const k of ROOT_KEYS) delete out[k];
  return out;
}
export {
  Menu
};
