"use client";
import * as React from "react";
import { Tabs as RadixTabs } from "radix-ui";
const cx = (...a) => a.filter(Boolean).join(" ");


/** Tabs on Radix Tabs — roving tabindex, arrow keys, Home/End and RTL come from
 *  the primitive; the DS keeps its own contract on top:
 *
 *  - Selection AND focus move together (`activationMode="automatic"`). A roving
 *    tabindex that changes the selected tab but leaves focus on the old one
 *    strands the keyboard user on a `tabindex="-1"` button.
 *  - No wrapper element. `Root asChild` merges into the `List`, so the DOM is
 *    the same `div.lw-tabs[role="tablist"] > button[role="tab"]*` the CSS layer
 *    and every consumer selector already address.
 *  - `aria-controls` is OURS. Radix emits `aria-controls` pointing at a
 *    `TabsContent` id whether or not one is rendered, and a consumer that owns
 *    its own panel never renders one — a dangling reference, which axe scores as
 *    a serious `aria-valid-attr-value`. Passing `t.controls` AFTER the
 *    primitive's props overrides it, and `undefined` REMOVES the attribute.
 *    The same goes for `id`. */
export function Tabs({ tabs = [], value, onChange, label, className, ...rest }) {
  return (
    <RadixTabs.Root asChild value={value} onValueChange={onChange} activationMode="automatic">
      <RadixTabs.List className={cx("lw-tabs", className)} aria-label={label} {...rest}>
        {tabs.map(t => (
          <RadixTabs.Trigger key={t.value} value={t.value} id={t.id} aria-controls={t.controls}>
            {t.label}{t.count != null && <span className="count">{t.count}</span>}
          </RadixTabs.Trigger>
        ))}
      </RadixTabs.List>
    </RadixTabs.Root>
  );
}
