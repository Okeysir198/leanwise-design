/* The specimen cards. Each is authored as preview/cards/<name>.card.jsx, whose first line is
     // @dsCard group="" name="" subtitle="" viewport=""
   and generates <name>.card.html (that marker as its first line, the shared page shell)
   and <name>.card.js (classic JSX over the global React). */
import fs from "node:fs";
import path from "node:path";
import esbuild from "esbuild";

export const CARDS_DIR = "preview/cards";

const list = (ROOT, ext) =>
  fs.readdirSync(path.join(ROOT, CARDS_DIR)).filter((f) => f.endsWith(ext)).sort();

export async function buildCards(ROOT) {
  const out = {};
  for (const f of list(ROOT, ".card.jsx")) {
    const src = fs.readFileSync(path.join(ROOT, CARDS_DIR, f), "utf8");
    const { code } = await esbuild.transform(src, {
      loader: "jsx", jsx: "transform", jsxFactory: "React.createElement", jsxFragment: "React.Fragment",
      format: "iife", target: "es2020", tsconfigRaw: { compilerOptions: {} }, sourcefile: f,
    });
    const base = f.replace(/\.card\.jsx$/, "");
    out[`${CARDS_DIR}/${base}.card.js`] = `/* GENERATED from ${f} by scripts/lib/card-build.mjs — do not edit. */\n${code}`;
    out[`${CARDS_DIR}/${base}.card.html`] = page(marker(ROOT, f), base);
  }
  return out;
}

function marker(ROOT, f) {
  const first = fs.readFileSync(path.join(ROOT, CARDS_DIR, f), "utf8").split("\n", 1)[0];
  const m = first.match(/^\/\/ @dsCard (.*)$/);
  if (!m) throw new Error(`${CARDS_DIR}/${f}: first line is not a // @dsCard marker`);
  return m[1].trim();
}
const attrs = (s) => Object.fromEntries([...s.matchAll(/([a-z]+)="([^"]*)"/g)].map((x) => [x[1], x[2]]));

const page = (mark, base) => `<!-- @dsCard ${mark} -->
<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${attrs(mark).name}</title>
<link rel="stylesheet" href="../../fonts.css">
<link rel="stylesheet" href="../preview.css">
<script src="../_vendor/react.js"></script>
<script src="../_vendor/react-dom.js"></script>
<script src="../../_ds_bundle.js"></script>
<script src="_card.js"></script>
</head>
<body>
<div id="root"></div>
<script src="${base}.card.js"></script>
</body>
</html>
`;

/** The manifest's `cards`, from each card's marker. */
const GROUPS = ["Foundations", "Components", "Blocks", "Charts"];

export function readCardMeta(ROOT) {
  const cards = list(ROOT, ".card.jsx").map((f) => {
    const a = attrs(marker(ROOT, f));
    if (!GROUPS.includes(a.group)) throw new Error(`${CARDS_DIR}/${f}: group "${a.group}" is not one of ${GROUPS.join(", ")}`);
    return { path: `${CARDS_DIR}/${f.replace(/\.jsx$/, ".html")}`, group: a.group, viewport: a.viewport, subtitle: a.subtitle, name: a.name };
  });
  return cards.sort((a, b) => GROUPS.indexOf(a.group) - GROUPS.indexOf(b.group));
}
