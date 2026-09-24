/* Sabotage proofs: each check goes red on the fault it exists to catch. */
import { test } from "node:test";
import assert from "node:assert/strict";
import { mkdtempSync, writeFileSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import * as palette from "../src/palette.mjs";
import { checkContrast } from "../scripts/lib/contrast.mjs";
import { lint } from "../scripts/lib/lint.mjs";
import { buildTokensJson } from "../scripts/lib/tokens-json.mjs";
import { read } from "./_root.mjs";

const themeCss = read("theme.css");
const clone = () => structuredClone({ ANCHORS: palette.ANCHORS, ramp: palette.ramp, themes: palette.themes });
const run = (p, css = themeCss) => checkContrast({ ...p, themeCss: css });
const fails = (p, re, css) => {
  const { problems } = run(p, css);
  assert.ok(problems.some((m) => re.test(m)), `expected ${re} in:\n${problems.join("\n")}`);
};

test("contrast: the shipped palette is clean and non-vacuous", () => {
  const { problems, checked } = run(clone());
  assert.deepEqual(problems, []);
  assert.ok(checked >= 300);
});

test("contrast: sabotage goes red", () => {
  let p = clone(); p.themes.light["muted-foreground"] = "oklch(0.75 0.03 235)";
  fails(p, /light: --muted-foreground on --background/);
  p = clone(); p.themes.dark.input = "oklch(0.3 0.05 220)";
  fails(p, /dark: --input on --background .* \(< 3\)/);
  p = clone(); p.themes.dark["chart-2"] = p.themes.dark["chart-1"];
  fails(p, /chart-1\/chart-2 dE/);
  p = clone(); p.themes.light.accent = "oklch(0.95 0.05 140)";
  fails(p, /--accent .* off-brand/);
  p = clone(); p.themes.light.primary = "#0C727C";
  fails(p, /anchor cyan/);
  fails(clone(), /anchor amber .* theme\.css/, themeCss.replaceAll("#FCB603", "#FCB604"));
  p = clone(); delete p.themes.dark.info;
  fails(p, /dark: role --info is missing/);
});

test("lint: catches each rule, passes clean source, refuses nothing", () => {
  const dir = mkdtempSync(join(tmpdir(), "lw-lint-"));
  try {
    writeFileSync(join(dir, "ok.tsx"), 'export const A = () => <Button className="bg-primary text-primary-foreground" variant="cta" />;\n');
    assert.deepEqual(lint([dir]).problems, []);
    writeFileSync(join(dir, "bad.tsx"), [
      'const a = "#0c727b";',
      '<div className="bg-blue-500 text-emerald-600" />',
      '<div className="bg-[var(--primary)]" />',
      '<Button variant="cta" /><Button variant="cta" />',
    ].join("\n"));
    const ids = lint([dir]).problems.map((m) => m.match(/\[([\w-]+)\]/)[1]);
    for (const id of ["raw-hex", "palette-class", "arbitrary-var", "multiple-cta"]) assert.ok(ids.includes(id), id);
    assert.equal(lint([dir]).files, 2);
  } finally {
    rmSync(dir, { recursive: true, force: true });
  }
});

test("tokens.json is DTCG, resolved to hex, anchors exact", () => {
  const t = JSON.parse(buildTokensJson());
  assert.equal(t.anchor.cyan.$value, "#0C727B");
  assert.equal(t.light.cta.$value, "#FCB603");
  for (const g of ["light", "dark"]) for (const v of Object.values(t[g])) assert.match(v.$value, /^#[0-9A-F]{6}$/);
});

test("every check subcommand is wired into an npm script", () => {
  const pkg = JSON.parse(read("package.json"));
  const all = Object.values(pkg.scripts).join(" ");
  for (const c of ["lint", "contrast", "presence", "a11y", "visual", "pack"]) assert.match(all, new RegExp(`check\\.mjs ${c}\\b`), c);
});
