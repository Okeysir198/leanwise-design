/* The consumer token lint: a deny-list over app source. */
import { readdirSync, readFileSync, statSync } from "node:fs";
import { extname, join, relative } from "node:path";

const EXT = new Set([".tsx", ".ts", ".jsx", ".js", ".mdx", ".html", ".vue", ".svelte"]);
const PALETTES = "slate|gray|zinc|neutral|stone|red|orange|amber|yellow|lime|green|emerald|teal|cyan|sky|blue|indigo|violet|purple|fuchsia|pink|rose";
const PREFIX = "bg|text|border|ring|ring-offset|fill|stroke|from|to|via|accent|caret|divide|outline|decoration|shadow|placeholder";

export const RULES = [
  { id: "raw-hex", re: /#(?:[0-9a-fA-F]{8}|[0-9a-fA-F]{6}|[0-9a-fA-F]{3,4})\b(?![-\w])/g,
    msg: "raw hex colour — use a theme role (bg-primary, text-muted-foreground…)",
    skipLine: /^\s*(\/\/|\*|\/\*)|&#/ },
  { id: "palette-class", re: new RegExp(`\\b(?:${PREFIX})-(?:${PALETTES})-\\d{2,3}\\b`, "g"),
    msg: "raw Tailwind palette class — use a theme role (bg-success, text-destructive…)" },
  { id: "arbitrary-var", re: /\[[^\]\s]*var\(--[\w-]+/g,
    msg: "theme var reached through an arbitrary value — use the registered utility (bg-primary)" },
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
          for (const hit of new Set(line.match(r.re) ?? [])) problems.push(`${rel}:${i + 1}  [${r.id}]  ${hit}  — ${r.msg}`);
        }
      });
      const ctas = (src.match(/variant=\{?["']cta["']\}?/g) ?? []).length;
      if (ctas > 1) problems.push(`${rel}  [multiple-cta]  ${ctas}x variant="cta" — the amber CTA is one per view; demote the rest`);
    }
  }
  return { problems, files };
}
