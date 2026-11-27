import { test } from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { ROOT } from "./_root.mjs";
import { FOCUS_CONTROLS, FOCUS_FIELDS, FOCUS_OUTLINE } from "../scripts/lib/theme.mjs";

const css = fs.readFileSync(path.join(ROOT, "theme.css"), "utf8");
/* Every px value in the first capture group of `re` over theme.css. */
const px = (re) => [...(css.match(re)?.[1] ?? "").matchAll(/-?[\d.]+px/g)].map((m) => parseFloat(m[0]));
const OUTLINE = /@layer base \{\s*:focus-visible \{([^}]*)\}/;
const slots = (sel) => [...sel.matchAll(/\[data-slot\$?="([\w-]+)"\]/g)].map((m) => m[1]);
/* Items and content surfaces mark focus with a background (or nothing); a ring there is the bug. */
const SURFACE = /(-content|^command.*|-list|-viewport|^(dropdown-menu|context-menu|select|command)-item)$/;

test("focus: the generic outline is layered, so stock outline-hidden on a surface wins", () => {
  const unlayered = css.replace(/@layer base \{[\s\S]*?\n\}\n/g, "");
  assert.ok(/@layer base \{\s*:focus-visible \{/.test(css), "generic :focus-visible must sit in @layer base");
  assert.ok(!/^:focus-visible \{/m.test(unlayered), "no unlayered generic :focus-visible");
  assert.ok(!/^\[data-slot\]:focus-visible/m.test(css), "no ring on every [data-slot]: that paints menus and popovers");
});

test("focus: the unlayered ring names controls only, never a content surface or menu item", () => {
  const all = [...slots(FOCUS_CONTROLS), ...slots(FOCUS_FIELDS)];
  assert.ok(all.length >= 10, "read the selector lists");
  for (const s of all) assert.ok(!SURFACE.test(s), `${s} is a surface/item, not a control`);
  assert.ok(css.includes(FOCUS_FIELDS), "theme.css carries FOCUS_FIELDS");
  assert.ok(!/[\s,(]input(?!:not|-)\b/.test(FOCUS_FIELDS), "bare input would ring the borderless CommandInput");
});

test("focus: focus-room's room equals the reach of both rings in theme.css", () => {
  const room = px(/@utility focus-room \{([^}]*)\}/);
  const [width, offset] = px(OUTLINE);
  const ring = Math.max(...px(/:focus-visible \{\s*outline: none;[^}]*box-shadow:([^;]*);/));
  assert.ok(room.length === 3 && room[0] > 0, "read @utility focus-room");
  assert.deepEqual(room, [room[0], -room[0], room[0]], "padding, negative margin, scroll-padding");
  assert.equal(width + offset, room[0], "outline width + offset");
  assert.equal(ring, room[0], "the control ring's outer spread");
});

test("focus: stock Table keeps the ring whole: an inset row outline, scroll room on its container", () => {
  /* Read the emitted rules: each sits in its own @layer base block, from STOCK_OVERRIDES. */
  const layered = (sel) => px(new RegExp(`@layer base \\{\\s*${sel.replace(/[[\]"]/g, "\\$&")} \\{([^}]*)\\}`));
  const [width, offset] = px(OUTLINE);
  const [row] = layered('[data-slot="table-row"]:focus-visible');
  const [room] = layered('[data-slot="table-container"]');
  assert.ok(width > 0, "read the generic outline");
  assert.ok(row <= -width, `the row outline (offset ${row}px) must sit wholly inside the row, in @layer base`);
  assert.ok(room >= width + offset, `the table container's scroll room (${room}px) must cover the ring's reach, in @layer base`);
});
