/* Compile a class list through the real Tailwind v4 + theme.css. Under v4 an
   unknown utility emits NOTHING, so presence is the only honest test. */
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { createRequire } from "node:module";
import { pathToFileURL } from "node:url";

export async function compile(ROOT, classes) {
  const req = createRequire(path.join(ROOT, "package.json"));
  const postcss = (await import(pathToFileURL(req.resolve("postcss")))).default;
  const tw = (await import(pathToFileURL(req.resolve("@tailwindcss/postcss")))).default;
  const tmp = fs.mkdtempSync(path.join(os.tmpdir(), "lw-tw-"));
  try {
    const probe = path.join(tmp, "probe.html");
    fs.writeFileSync(probe, `<div class="${[...classes].join(" ")}"></div>`);
    const entry = `@import "tailwindcss" source(none);\n@source "${probe}";\n@import "${path.join(ROOT, "theme.css")}";\n`;
    return (await postcss([tw()]).process(entry, { from: path.join(ROOT, ".lw-probe.css") })).css;
  } finally {
    fs.rmSync(tmp, { recursive: true, force: true });
  }
}

/* Tailwind escapes selectors; this is the form a class takes in the output. */
export const selectorOf = (cls) => "." + cls.replace(/[:/[\]().%]/g, (c) => "\\" + c);
