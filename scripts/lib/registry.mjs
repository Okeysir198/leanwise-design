/* The LeanWise shadcn registry: registry.json (the index) and r/<item>.json
   (what `npx shadcn add @leanwise/<item>` fetches), both built from here and
   src/palette.mjs. Blocks live in registry/blocks/ and are inlined verbatim. */
import fs from "node:fs";
import path from "node:path";
import { ramp, themes } from "../../src/palette.mjs";
import { RADIUS, FOCUS_CONTROLS, FOCUS_FIELDS } from "./theme.mjs";

const HOMEPAGE = "https://github.com/Okeysir198/leanwise-design";
const NS = "@leanwise";

const rampVars = Object.fromEntries(Object.entries(ramp).map(([k, v]) => [`brand-${k}`, v]));


const POINTER =
  'button:not(:disabled), [role="button"]:not([aria-disabled="true"]), [role="tab"], [role="menuitem"], [role="menuitemcheckbox"], [role="menuitemradio"], [role="option"], [role="switch"], [role="checkbox"], [role="radio"], a[href], summary, select, label[for], input[type="checkbox"], input[type="radio"]';


const block = (name, title, description, registryDependencies, dependencies = []) => ({
  name,
  type: "registry:block",
  title,
  description,
  ...(dependencies.length ? { dependencies } : {}),
  registryDependencies,
  files: [{ path: `registry/blocks/${name}.tsx`, type: "registry:component", target: `components/${name}.tsx` }],
});

/* shadcn overwrites a project's existing vars only for the theme item named on
   the command line, so leanwise-base carries the vars itself. */
const cssVars = {
  theme: {
    "color-brand": "var(--brand-600)",
    ...Object.fromEntries(Object.keys(ramp).map((k) => [`color-brand-${k}`, `var(--brand-${k})`])),
  },
  light: { radius: RADIUS, ...rampVars, ...themes.light },
  dark: themes.dark,
};

export const ITEMS = [
  {
    name: "leanwise-theme",
    type: "registry:theme",
    title: "LeanWise theme",
    description: "LeanWise colours for shadcn/ui: cyan primary, navy, the amber cta, status roles and the brand-50..900 ramp, light and dark.",
    cssVars,
  },
  {
    name: "leanwise-font",
    type: "registry:font",
    title: "Geist",
    description: "Geist as --font-sans.",
    font: {
      family: "'Geist Variable', sans-serif",
      provider: "google",
      import: "Geist",
      variable: "--font-sans",
      subsets: ["latin", "latin-ext", "vietnamese"],
      dependency: "@fontsource-variable/geist",
    },
  },
  {
    name: "leanwise-font-mono",
    type: "registry:font",
    title: "Geist Mono",
    description: "Geist Mono as --font-mono.",
    font: {
      family: "'Geist Mono Variable', monospace",
      provider: "google",
      import: "Geist_Mono",
      variable: "--font-mono",
      subsets: ["latin", "latin-ext", "vietnamese"],
      selector: "code, kbd, pre, samp",
      dependency: "@fontsource-variable/geist-mono",
    },
  },
  {
    name: "leanwise-base",
    type: "registry:theme",
    title: "LeanWise base",
    description: "Theme + fonts + the behaviours stock shadcn lacks: a pointer cursor on every interactive element, a solid brand focus ring, and a findable scroll thumb.",
    registryDependencies: [`${NS}/leanwise-font`, `${NS}/leanwise-font-mono`],
    cssVars,
    css: {
      "@layer base": {
        [POINTER]: { cursor: "pointer" },
        html: { "scrollbar-color": "var(--scrollbar) transparent" },
        /* Layered so a stock outline-hidden (menus, popovers, command lists) still wins. */
        ":focus-visible": { outline: "2px solid var(--ring)", "outline-offset": "2px" },
      },
      /* Unlayered: beats the stock ScrollArea thumb's bg-border without forking it. */
      '[data-slot="scroll-area-thumb"]': { "background-color": "var(--scrollbar)" },
      /* Compact card density, keyed on the stock default so call-site padding still wins. */
      '[data-slot="card"].py-6': { "padding-block": "1rem" },
      '[data-slot="card"].gap-6': { gap: "1rem" },
      '[data-slot="card-header"].px-6, [data-slot="card-content"].px-6, [data-slot="card-footer"].px-6': { "padding-inline": "1rem" },
      '[data-slot="card-header"].border-b[class~="[.border-b]:pb-6"]': { "padding-bottom": "1rem" },
      '[data-slot="card-footer"].border-t[class~="[.border-t]:pt-6"]': { "padding-top": "1rem" },
      "@media (pointer: coarse)": { '[data-slot="sidebar-wrapper"]': { "--sidebar-width-icon": "3.75rem !important" } },
      /* Unlayered on purpose: beats the layered ring-ring/50 utilities of stock controls. */
      [`${FOCUS_CONTROLS}:focus-visible`]: {
        outline: "none",
        "--tw-ring-color": "var(--ring)",
        "box-shadow": "0 0 0 2px var(--background), 0 0 0 4px var(--ring)",
      },
      [FOCUS_FIELDS]: {
        outline: "none",
        "border-color": "var(--ring)",
        "box-shadow": "0 0 0 1px var(--ring)",
      },
    },
    docs: "The call to action is amber, one per view, on the stock Button: <Button className=\"bg-cta text-cta-foreground hover:bg-cta/90\">. Status fills: bg-success/warning/info/destructive with their -foreground; soft callouts: bg-info-soft text-info-soft-foreground border-info-border. Metric tiles: the stock dashboard-01 block (npx shadcn add dashboard-01, or copy its section-cards.tsx).",
  },
  block("state-view", "State view", "Empty, loading and error states on shadcn Empty.", ["empty", "spinner"], ["lucide-react"]),
  block("file-upload", "File upload", "Drop zone on Empty + browse button + removable file list on Item, with optional Progress.", ["button", "empty", "item", "progress"], ["lucide-react"]),
  block("section-nav", "Section nav", "In-page section navigation: a thin rail, the current section marked by a brand segment.", []),
  block("login-card", "Login card", "One-column sign-in page: a single Card centred on the muted ground, logo + title + description header, a notice slot and the form.", ["card"]),
  block("app-shell", "App shell", "The stock sidebar-07 shape with the nav as data: collapsible Sidebar, grouped menu with badges, rail, and a header with trigger + Breadcrumb slot.", ["sidebar", "separator", "breadcrumb"]),
];

const SCHEMA = "https://ui.shadcn.com/schema/registry.json";
const ITEM_SCHEMA = "https://ui.shadcn.com/schema/registry-item.json";
const json = (o) => JSON.stringify(o, null, 2) + "\n";

export const buildRegistryJson = () =>
  json({ $schema: SCHEMA, name: "leanwise", homepage: HOMEPAGE, items: ITEMS });

function buildItem(ROOT, item) {
  const out = { $schema: ITEM_SCHEMA, ...item };
  if (item.files) {
    out.files = item.files.map((f) => ({ ...f, content: fs.readFileSync(path.join(ROOT, f.path), "utf8") }));
  }
  return json(out);
}

/** { "<relative path>": () => content } for gen.mjs's outputs map. */
export function registryOutputs(ROOT) {
  const out = { "registry.json": buildRegistryJson, "r/registry.json": buildRegistryJson };
  for (const item of ITEMS) out[`r/${item.name}.json`] = () => buildItem(ROOT, item);
  return out;
}
