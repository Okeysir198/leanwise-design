import { test } from "node:test";
import assert from "node:assert/strict";
import { renderBlock } from "./_render.mjs";

// Renders the shipped block, not a copy of its logic. aria-current="page" on a
// #hash link tells a screen reader the link points at the page it is on.
const renderNav = (items) => renderBlock("registry/blocks/section-nav.tsx", "SectionNav", { items });

const current = (html) => [...html.matchAll(/<a[^>]*href="([^"]*)"[^>]*aria-current="([^"]*)"|<a[^>]*aria-current="([^"]*)"[^>]*href="([^"]*)"/g)]
  .map((m) => (m[1] ? [m[1], m[2]] : [m[4], m[3]]));

test("a current #hash item is aria-current=location", async () => {
  const html = await renderNav([{ title: "One", href: "#one" }, { title: "Two", href: "#two", current: true }]);
  assert.deepEqual(current(html), [["#two", "location"]]);
});

test("a current route item stays aria-current=page", async () => {
  const html = await renderNav([{ title: "Profile", href: "/settings/profile", current: true }, { title: "Billing", href: "/settings/billing" }]);
  assert.deepEqual(current(html), [["/settings/profile", "page"]]);
});

test("both values are styled as current", async () => {
  const html = await renderNav([{ title: "A", href: "#a", current: true }]);
  for (const v of ["page", "location"]) assert.match(html, new RegExp(`aria-\\[current=${v}\\]:text-primary`), `aria-current=${v} has no current style`);
});
