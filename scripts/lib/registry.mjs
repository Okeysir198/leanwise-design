/* The LeanWise shadcn registry: registry.json (the index) and r/<item>.json
   (what `npx shadcn add @leanwise/<item>` fetches), both built from here and
   src/palette.mjs. Blocks live in registry/blocks/ and are inlined verbatim. */
import fs from "node:fs";
import path from "node:path";
import { ramp, themes } from "../../src/palette.mjs";
import { RADIUS } from "./theme.mjs";

const HOMEPAGE = "https://github.com/Okeysir198/leanwise-design";
const NS = "@leanwise";

const rampVars = Object.fromEntries(Object.entries(ramp).map(([k, v]) => [`brand-${k}`, v]));

const FOCUS_FIELDS =
  ':is(input, textarea, select, [data-slot="input"], [data-slot="textarea"], [data-slot="select-trigger"], [data-slot="input-group"]):focus-visible';

const POINTER =
  'button:not(:disabled), [role="button"]:not([aria-disabled="true"]), [role="tab"], [role="menuitem"], [role="menuitemcheckbox"], [role="menuitemradio"], [role="option"], [role="switch"], [role="checkbox"], [role="radio"], a[href], summary, select, label[for], input[type="checkbox"], input[type="radio"]';

export const SIDEBAR_ACTIVE = '[data-sidebar="menu-button"][data-active="true"], [data-sidebar="menu-sub-button"][data-active="true"]';

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
    description: "Theme + fonts + the two behaviours stock shadcn lacks: a pointer cursor on every interactive element and a solid brand focus ring.",
    registryDependencies: [`${NS}/leanwise-font`, `${NS}/leanwise-font-mono`],
    cssVars,
    css: {
      "@layer base": {
        [POINTER]: { cursor: "pointer" },
        [SIDEBAR_ACTIVE]: { "box-shadow": "inset 3px 0 0 var(--sidebar-primary)" },
      },
      /* Unlayered on purpose: beats the layered ring-ring/50 utilities of stock components. */
      ":focus-visible": { outline: "2px solid var(--ring)", "outline-offset": "2px" },
      "[data-slot]:focus-visible": {
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
    docs: "The call to action is amber, one per view, on the stock Button: <Button className=\"bg-cta text-cta-foreground hover:bg-cta/90\">. Status fills: bg-success/warning/info/destructive with their -foreground; soft callouts: bg-info-soft text-info-soft-foreground border-info-border.",
  },
  block("kpi-tile", "KPI tile", "A metric on a Card: label, value, trend delta, hint.", ["card"], ["class-variance-authority", "lucide-react"]),
  block("state-view", "State view", "Empty, loading and error states on shadcn Empty.", ["empty", "spinner"], ["lucide-react"]),
  block("file-upload", "File upload", "Drop zone + browse button + removable file list.", ["button"], ["lucide-react"]),
  block("section-nav", "Section nav", "In-page section navigation: a thin rail, the current section marked by a brand segment.", []),
  block("app-shell", "App shell", "Collapsible sidebar nav and a sticky top bar on shadcn Sidebar.", ["sidebar", "separator"]),
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
