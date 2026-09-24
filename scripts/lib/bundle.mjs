/* The Claude Design preview surface, generated from preview/src + the cards + templates:
     preview/_vendor/     React 19 + ReactDOM 19 as classic scripts (window.React / ReactDOM)
     _ds_bundle.js        classic <script>; exposes window.LeanWiseDesign_f2d907
     preview/preview.css  Tailwind v4 + theme.css over everything the preview renders
     _ds_manifest.json    namespace, components, cards, templates, tokens, themes
   React and ReactDOM are NOT bundled: the page loads them as UMD globals first.
   Every builder returns { "relative/path": content }. */
import fs from "node:fs";
import path from "node:path";
import { createRequire } from "node:module";
import { pathToFileURL } from "node:url";
import esbuild from "esbuild";
import { buildCards, readCardMeta } from "./card-build.mjs";

export const NAMESPACE = "LeanWiseDesign_f2d907";
const ENTRY = "preview/src/index.ts";
const SRC = "preview/src";

/* A real automatic JSX runtime over the global React: Radix and sonner ship
   pre-compiled against `react/jsx-runtime`. */
const JSX_RUNTIME = `var R = globalThis.React;
function jsx(type, props, key) { return R.createElement(type, key === undefined ? props : Object.assign({}, props, { key: key })); }
module.exports = { Fragment: R.Fragment, jsx: jsx, jsxs: jsx, jsxDEV: jsx };
`;
const SHIMS = {
  react: "module.exports = globalThis.React;\n",
  "react-dom": "module.exports = globalThis.ReactDOM;\n",
  "jsx-runtime": JSX_RUNTIME,
};

function resolvePlugin(ROOT) {
  const src = path.join(ROOT, SRC);
  const ts = (p) => [p + ".tsx", p + ".ts"].find((f) => fs.existsSync(f));
  return {
    name: "lw-preview",
    setup(b) {
      b.onResolve({ filter: /^react$/ }, () => ({ path: "react", namespace: "shim" }));
      b.onResolve({ filter: /^react-dom(\/.*)?$/ }, () => ({ path: "react-dom", namespace: "shim" }));
      b.onResolve({ filter: /^react\/jsx(-dev)?-runtime$/ }, () => ({ path: "jsx-runtime", namespace: "shim" }));
      b.onLoad({ filter: /.*/, namespace: "shim" }, (a) => ({ contents: SHIMS[a.path], loader: "js" }));
      b.onResolve({ filter: /^(cn|@\/lib\/utils)$/ }, () => ({ path: ts(path.join(src, "lib/utils")) }));
      b.onResolve({ filter: /^next-themes$/ }, () => ({ path: ts(path.join(src, "shims/next-themes")) }));
      b.onResolve({ filter: /^@\/(registry\/new-york-v4\/)?ui\// }, (a) => ({
        path: ts(path.join(src, "ui", a.path.replace(/^.*\/ui\//, ""))),
      }));
    },
  };
}

const version = (ROOT, pkg) =>
  JSON.parse(fs.readFileSync(path.join(ROOT, "node_modules", pkg, "package.json"), "utf8")).version;

/** Which file each exposed name comes from, by esbuild's own export analysis. */
async function exportMap(ROOT) {
  const index = fs.readFileSync(path.join(ROOT, ENTRY), "utf8");
  const files = [...index.matchAll(/export \* from "\.\/([^"]+)"/g)].map((m) => `${SRC}/${m[1]}.tsx`);
  const probe = await esbuild.build({
    entryPoints: files, absWorkingDir: ROOT, bundle: false, write: false, metafile: true,
    format: "esm", outdir: "probe", jsx: "preserve", tsconfigRaw: { compilerOptions: {} },
  });
  const out = [];
  for (const o of Object.values(probe.metafile.outputs)) {
    for (const name of o.exports) out.push({ name, sourcePath: o.entryPoint });
  }
  for (const m of index.matchAll(/export \{ (\w+) \} from "([^"]+)"/g)) {
    out.push({ name: m[1], sourcePath: m[2].startsWith(".") ? `${SRC}/${m[2].slice(2)}.ts` : `node_modules/${m[2]}` });
  }
  return out.sort((a, b) => a.sourcePath.localeCompare(b.sourcePath) || a.name.localeCompare(b.name));
}

export async function buildBundle(ROOT) {
  const components = await exportMap(ROOT);
  const res = await esbuild.build({
    stdin: {
      contents: `import * as NS from "./${ENTRY}";\nglobalThis.${NAMESPACE} = Object.assign(globalThis.${NAMESPACE} || {}, NS);\n`,
      resolveDir: ROOT, sourcefile: "ds-entry.js", loader: "js",
    },
    absWorkingDir: ROOT, bundle: true, write: false, format: "iife", target: "es2020",
    jsx: "automatic", tsconfigRaw: { compilerOptions: {} }, legalComments: "none",
    define: { "process.env.NODE_ENV": '"production"' }, minify: true,
    plugins: [resolvePlugin(ROOT)],
  });
  const inlined = ["radix-ui", "sonner", "lucide-react", "class-variance-authority", "clsx", "tailwind-merge"]
    .map((name) => ({ name, version: version(ROOT, name) }));
  const header = { format: 4, namespace: NAMESPACE, generator: "scripts/lib/bundle.mjs", esbuild: esbuild.version, components, inlinedExternals: inlined };
  return { "_ds_bundle.js": `/* @ds-bundle: ${JSON.stringify(header)} */\n${res.outputFiles[0].text}` };
}

/* React 19 ships no UMD, and stock shadcn needs 19 (ref is a prop; no forwardRef).
   These are classic scripts that set window.React / window.ReactDOM. */
export async function buildVendor(ROOT) {
  const build = async (contents, plugins) => (await esbuild.build({
    stdin: { contents, resolveDir: ROOT, loader: "js" }, absWorkingDir: ROOT, bundle: true, write: false,
    format: "iife", target: "es2020", minify: true, legalComments: "none",
    define: { "process.env.NODE_ENV": '"production"' }, plugins,
  })).outputFiles[0].text;
  const globalReact = {
    name: "global-react",
    setup(b) {
      b.onResolve({ filter: /^react$/ }, () => ({ path: "react", namespace: "shim" }));
      b.onLoad({ filter: /.*/, namespace: "shim" }, () => ({ contents: SHIMS.react, loader: "js" }));
    },
  };
  const head = (pkg) => `/* ${pkg}@${version(ROOT, pkg)} production, as a classic script. GENERATED by scripts/lib/bundle.mjs. */\n`;
  return {
    "preview/_vendor/react.js": head("react") + (await build('globalThis.React = require("react");\n', [])),
    "preview/_vendor/react-dom.js": head("react-dom") + (await build(
      'globalThis.ReactDOM = Object.assign({}, require("react-dom"), require("react-dom/client"));\n', [globalReact])),
  };
}

export async function buildPreviewCss(ROOT) {
  const req = createRequire(path.join(ROOT, "package.json"));
  const postcss = (await import(pathToFileURL(req.resolve("postcss")))).default;
  const tw = (await import(pathToFileURL(req.resolve("@tailwindcss/postcss")))).default;
  const entry = [
    '@import "tailwindcss" source(none);',
    '@import "tw-animate-css";',
    '@import "../theme.css";',
    '@source "./src";',
    '@source "./cards";',
    '@source "../templates/*/*.dc.html";',
    "",
  ].join("\n");
  const from = path.join(ROOT, "preview", "preview.entry.css");
  const css = (await postcss([tw()]).process(entry, { from })).css;
  return { "preview/preview.css": "/* GENERATED by scripts/lib/bundle.mjs — do not edit. */\n" + css };
}

/* ---- manifest ------------------------------------------------------------ */

const attrs = (s) => Object.fromEntries([...s.matchAll(/([a-z-]+)="([^"]*)"/g)].map((m) => [m[1], m[2]]));

function readTemplates(ROOT) {
  const dir = path.join(ROOT, "templates");
  const out = [];
  for (const d of fs.readdirSync(dir).filter((d) => !d.startsWith("_")).sort()) {
    const folder = `templates/${d}`;
    for (const f of fs.readdirSync(path.join(dir, d)).filter((f) => f.endsWith(".dc.html"))) {
      const m = fs.readFileSync(path.join(dir, d, f), "utf8").match(/<!-- @template ([^>]*)-->/);
      if (!m) throw new Error(`${folder}/${f}: no <!-- @template name="" description="" --> marker`);
      const a = attrs(m[1]);
      const t = { name: a.name, description: a.description, folder, entryPath: `${folder}/${f}` };
      if (fs.existsSync(path.join(dir, d, ".thumbnail"))) t.thumbnail = { path: `${folder}/.thumbnail`, kind: "captured" };
      out.push(t);
    }
  }
  return out;
}

function kindOf(name, value) {
  if (/^--font-/.test(name)) return "fontFamily";
  if (/^--radius/.test(name)) return "radius";
  if (/oklch|#[0-9a-f]{3,8}\b|rgb|hsl/i.test(value)) return "color";
  return "other";
}

function readTokens(ROOT) {
  const css = fs.readFileSync(path.join(ROOT, "theme.css"), "utf8");
  const block = (sel) => {
    const i = css.indexOf(`\n${sel} {`);
    return i < 0 ? "" : css.slice(i, css.indexOf("\n}", i));
  };
  const tokens = [...block(":root").matchAll(/(--[\w-]+):\s*([^;]+);/g)]
    .map(([, name, value]) => ({ name, value: value.trim(), kind: kindOf(name, value), definedIn: "theme.css" }));
  const themes = /\n\.dark \{/.test(css) ? [{ selector: ".dark", label: "Dark" }] : [];
  return { tokens, themes };
}

function readFonts(ROOT) {
  const css = fs.readFileSync(path.join(ROOT, "fonts.css"), "utf8");
  return [...css.matchAll(/@font-face\s*\{([^}]*)\}/g)].map(([, b]) => {
    const get = (p) => (b.match(new RegExp(`${p}:\\s*([^;]+);`)) || [])[1]?.trim();
    return {
      family: get("font-family").replace(/['"]/g, ""),
      weight: get("font-weight"),
      style: get("font-style"),
      unicodeRange: get("unicode-range"),
      cssPath: "fonts.css",
      files: [...b.matchAll(/url\(\.\/([^)]+)\)/g)].map((m) => m[1]),
    };
  });
}

export async function buildManifest(ROOT, components) {
  components ??= await exportMap(ROOT);
  const { tokens, themes } = readTokens(ROOT);
  const manifest = {
    namespace: NAMESPACE,
    components,
    startingPoints: [],
    cards: readCardMeta(ROOT),
    templates: readTemplates(ROOT),
    hasThumbnailHtml: fs.existsSync(path.join(ROOT, "thumbnail.html")),
    globalCssPaths: ["fonts.css", "preview/preview.css"],
    tokens,
    themes,
    fonts: readFonts(ROOT),
    brandFonts: [
      { family: "Geist", status: "ok", tokens: ["--font-sans"], path: "fonts.css" },
      { family: "Geist Mono", status: "ok", tokens: ["--font-mono"], path: "fonts.css" },
    ],
    source: "spa",
  };
  return { "_ds_manifest.json": JSON.stringify(manifest, null, 2) + "\n" };
}

/** Every preview output. Cards first: the CSS scans the compiled card sources. */
export async function buildPreview(ROOT) {
  return {
    ...(await buildVendor(ROOT)),
    ...(await buildCards(ROOT)),
    ...(await buildBundle(ROOT)),
    ...(await buildPreviewCss(ROOT)),
    ...(await buildManifest(ROOT)),
  };
}
