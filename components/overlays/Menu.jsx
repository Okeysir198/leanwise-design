"use client";
import * as React from "react";
import { DropdownMenu } from "radix-ui";
import { Icon } from "../primitives/Icon.jsx";
import { Layer, useLayer } from "./_layer.js";
import { toSideAlign } from "./Popover.jsx";
const cx = (...a) => a.filter(Boolean).join(" ");

/**
 * The action menu. Since v2.0.0 it is Radix DropdownMenu (non-modal) wearing
 * the Popover's surface — `.lw-popover` on the content, so there is still one
 * shadow, one radius and one motion in the system, not two that drift apart.
 *
 * Keyboard is the whole point of a menu component, and it is Radix's now:
 * arrows move focus, Home/End jump, typing a letter jumps to the next row
 * starting with it, Esc closes and returns focus to the trigger, Down/Up on
 * the trigger open onto the first/last row. Focus MOVES with the highlight —
 * a menu that paints a highlight while focus stays on the trigger tells a
 * screen reader nothing has changed. `[data-highlighted]` is the visual.
 *
 * Non-modal on purpose: a modal menu makes the rest of the page inert and
 * disables outside pointer events, so a second click on another trigger is
 * swallowed instead of opening the other menu.
 *
 * `linkAs` replaces the anchor ELEMENT (default `"a"`) for rows that carry an
 * `href` — a router's Link, so a menu destination navigates client-side and
 * keeps any prefix that Link applies. It receives what the raw <a> would:
 * `href`, `className`, the menuitem ARIA, `tabIndex`, `children` and a ref,
 * so it must forward unknown props AND the ref, or the row has no keyboard.
 * A row without an href is a <div role="menuitem">, never replaced.
 */
export function Menu({ items = [], trigger, onSelect, label, placement = "bottom-start", matchWidth, linkAs = "a", className, ...rest }) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const layer = useLayer();
  const { side, align } = toSideAlign(placement);

  const choose = (it) => {
    it.onSelect ? it.onSelect(it) : onSelect && onSelect(it.value, it);
  };

  return (
    <DropdownMenu.Root modal={false} {...pickRoot(rest)}>
      <DropdownMenu.Trigger asChild ref={setAnchorEl}>{trigger}</DropdownMenu.Trigger>
      <DropdownMenu.Portal container={layer?.container ?? undefined}>
        <Layer from={anchorEl}>
          <DropdownMenu.Content
            side={side} align={align} sideOffset={6} collisionPadding={8}
            aria-label={label} data-match-width={matchWidth ? "" : undefined}
            className="lw-popover" {...omitRoot(rest)}>
            {/* role="none": the menuitems below belong to the content's
                role="menu", not to this layout div. */}
            <div role="none" className={cx("lw-menu", className)}>
              {items.map((it, i) => {
                if (it.type === "separator") return <DropdownMenu.Separator key={i} className="lw-menu-sep" />;
                if (it.type === "label") return <DropdownMenu.Label key={i} className="lw-menu-label">{it.label}</DropdownMenu.Label>;
                const checkable = it.checked != null;
                const rowClass = cx("lw-menu-item", it.danger && "danger");
                const body = (
                  <>
                    {/* One lead slot for both a check and an icon, so checkable
                        and plain rows keep their labels on the same x. */}
                    {(checkable || it.icon) && (
                      <span className="lw-menu-lead">
                        {checkable
                          ? <DropdownMenu.ItemIndicator><Icon name="checkmark" size={14} /></DropdownMenu.ItemIndicator>
                          : <Icon name={it.icon} size={15} />}
                      </span>
                    )}
                    <span className="lw-menu-text">{it.label}</span>
                    {it.kbd && <span className="lw-menu-kbd">{it.kbd}</span>}
                  </>
                );
                const key = it.value ?? i;
                if (checkable) {
                  return (
                    <DropdownMenu.CheckboxItem key={key} className={rowClass} checked={!!it.checked}
                      disabled={it.disabled} onSelect={() => choose(it)}>
                      {body}
                    </DropdownMenu.CheckboxItem>
                  );
                }
                if (it.href) {
                  const LinkAs = linkAs;
                  return (
                    <DropdownMenu.Item key={key} asChild className={rowClass} disabled={it.disabled} onSelect={() => choose(it)}>
                      <LinkAs href={it.href}>{body}</LinkAs>
                    </DropdownMenu.Item>
                  );
                }
                return (
                  <DropdownMenu.Item key={key} className={rowClass} disabled={it.disabled} onSelect={() => choose(it)}>
                    {body}
                  </DropdownMenu.Item>
                );
              })}
            </div>
          </DropdownMenu.Content>
        </Layer>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
}

/* `open` / `defaultOpen` / `onOpenChange` belong to the Root; everything else
   in `...rest` lands on the content, as it did on the Popover before. */
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
