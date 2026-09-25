/* The consumer token lint: a deny-list over app source. */
import { readdirSync, readFileSync, statSync } from "node:fs";
import { dirname, extname, join, relative } from "node:path";
import { fileURLToPath } from "node:url";

/* The theme's colour roles. Only these are flagged inside an arbitrary value: a layout
   var such as stock shadcn's `w-[var(--sidebar-width)]` or `h-[var(--radix-…)]` is not a
   theme colour and has no registered utility to use instead. */
const TOKENS = JSON.parse(readFileSync(join(dirname(fileURLToPath(import.meta.url)), "..", "..", "tokens.json"), "utf8"));
const ROLES = new Set([...Object.keys(TOKENS.light), ...Object.keys(TOKENS.brand).map((k) => `brand-${k}`)]);

const EXT = new Set([".tsx", ".ts", ".jsx", ".js", ".mdx", ".html", ".vue", ".svelte"]);
const PALETTES = "slate|gray|zinc|neutral|stone|red|orange|amber|yellow|lime|green|emerald|teal|cyan|sky|blue|indigo|violet|purple|fuchsia|pink|rose";
const PREFIX = "bg|text|border|ring|ring-offset|fill|stroke|from|to|via|accent|caret|divide|outline|decoration|shadow|placeholder";

export const RULES = [
  { id: "raw-hex", re: /#(?:[0-9a-fA-F]{8}|[0-9a-fA-F]{6}|[0-9a-fA-F]{3,4})\b(?![-\w])/g,
    msg: "raw hex colour — use a theme role (bg-primary, text-muted-foreground…)",
    skipLine: /^\s*(\/\/|\*|\/\*)|&#/ },
  { id: "palette-class", re: new RegExp(`\\b(?:${PREFIX})-(?:${PALETTES})-\\d{2,3}\\b`, "g"),
    msg: "raw Tailwind palette class — use a theme role (bg-success, text-destructive…)" },
  { id: "arbitrary-var", re: /\[[^\]\s]*var\(--([\w-]+)/g, keep: (m) => ROLES.has(m[1]),
    msg: "theme colour reached through an arbitrary value — use the registered utility (bg-primary)" },
];

export function walk(p, out = []) {
  if (statSync(p).isFile()) { if (EXT.has(extname(p))) out.push(p); return out; }
  for (const e of readdirSync(p)) {
    if (e === "node_modules" || e.startsWith(".") || e === "dist" || e === "build") continue;
    walk(join(p, e), out);
  }
  return out;
}

/* { problems, files } over every source file under `paths`. */
export function lint(paths, cwd = process.cwd()) {
  const problems = [];
  let files = 0;
  for (const p of paths) {
    for (const file of walk(p)) {
      files++;
      const rel = relative(cwd, file);
      const src = readFileSync(file, "utf8");
      src.split("\n").forEach((line, i) => {
        for (const r of RULES) {
          if (r.skipLine?.test(line)) continue;
          const hits = r.keep ? [...line.matchAll(r.re)].filter(r.keep).map((m) => m[0]) : line.match(r.re) ?? [];
          for (const hit of new Set(hits)) problems.push(`${rel}:${i + 1}  [${r.id}]  ${hit}  — ${r.msg}`);
        }
      });
      const ctas = (src.match(/variant=\{?["']cta["']\}?/g) ?? []).length;
      if (ctas > 1) problems.push(`${rel}  [multiple-cta]  ${ctas}x variant="cta" — the amber CTA is one per view; demote the rest`);
    }
  }
  return { problems, files };
}
