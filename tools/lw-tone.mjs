/**
 * ONE TONE VOCABULARY, and every advertised value has a rule behind it.
 *
 * Seven components spelled the same five judgements six different ways —
 * "warning" three ways, "danger" three, "success" three — for releases, because
 * this was the ONLY load-bearing invariant in the package left to memory. Every
 * other one has a script. Naming conventions do not survive on discipline; the
 * eleven gates beside this one are the proof that the team already knows that.
 *
 * TWO CHECKS, and the second is the one that would have caught StatMeter:
 *
 *   1. SPELLING — every literal in a `tone`/`accent` union is either canonical
 *      or a declared legacy alias reached through `LegacyTone`. A new component
 *      inventing `err` fails here.
 *
 *   2. THE VALUE HAS A RULE — every canonical value a component advertises has a
 *      CSS selector that matches what the component actually emits. This is the
 *      "does it emit anything" check applied to tones, and it catches the
 *      inverse drift too: `StatMeter` typed two values while `.lw-bar[data-tone]`
 *      implemented five, so three working tones could not be written down and
 *      nothing noticed for as long as the type had been wrong.
 *
 * ⚠️ IT CANNOT PASS VACUOUSLY. Finding no components, or no selectors, is a
 * failure and not a clean run — the mistake `_cards.mjs` and `lw-visual.mjs`
 * both record having made. `--self-test` proves it by feeding the checker a
 * component that misspells a tone and one that advertises a value with no rule,
 * and requiring both to be caught.
 */

import { readFileSync, readdirSync, statSync } from "node:fs";
import { join } from "node:path";
import { report } from "./_report.mjs";

const ROOT = new URL("..", import.meta.url).pathname;
const TONES = ["brand", "success", "warning", "danger", "neutral", "info", "cta"];
const LEGACY = ["ok", "warn", "err", "pos", "neg"];

/** How each component turns a tone into something CSS can match. */
const EMITTERS = [
  { component: "Chip", file: "components/primitives/Chip.d.ts", prop: "tone",
    css: ["base.css"], selector: (v) => `.lw-chip-${v}`, exempt: ["brand"] },
  { component: "Toast", file: "components/overlays/Toast.d.ts", prop: "tone",
    css: ["product.css"], selector: (v) => `.lw-toast.${v}`, exempt: ["info"] },
  { component: "Progress", file: "components/data/Progress.d.ts", prop: "tone",
    css: ["product.css"], selector: (v) => `.lw-progress[data-tone="${v}"]` },
  { component: "ActivityFeed", file: "components/data/ActivityFeed.d.ts", prop: "tone",
    css: ["product.css"], selector: (v) => `.lw-feed-item[data-tone="${v}"]` },
  { component: "Console", file: "components/data/Console.d.ts", prop: "tone",
    css: ["base.css"], selector: (v) => `.lw-console-line.${v}` },
  { component: "StatMeter", file: "components/data/StatMeter.d.ts", prop: "tone",
    css: ["marketing.css"], selector: (v) => `[data-tone="${v}"]` },
  { component: "KpiTile", file: "components/data/KpiTile.d.ts", prop: "accent",
    css: ["product.css"], selector: (v) => `[data-accent="${v}"]`, exempt: ["brand"] },
  { component: "KpiTile", file: "components/data/KpiTile.d.ts", prop: "tone",
    css: ["product.css"], selector: (v) => `.lw-kpi .d.${v}` },
];

/** The literals in `prop?: Extract<Tone, "a" | "b"> | LegacyTone;`. */
function advertised(source, prop) {
  const line = new RegExp(`^\\s*${prop}\\?:([^;]+);`, "m").exec(source);
  if (!line) return null;
  const decl = line[1];
  return {
    values: [...decl.matchAll(/"([a-z]+)"/g)].map((m) => m[1]),
    legacyViaAlias: /\bLegacyTone\b/.test(decl),
  };
}

function check(emitters, read) {
  const problems = [];
  let checked = 0;

  for (const e of emitters) {
    const source = read(e.file);
    const found = advertised(source, e.prop);
    if (!found) {
      problems.push(`${e.component}.${e.prop}: no declaration found in ${e.file}`);
      continue;
    }
    const css = e.css.map(read).join("\n");

    for (const value of found.values) {
      checked++;
      if (LEGACY.includes(value) && !found.legacyViaAlias) {
        problems.push(
          `${e.component}.${e.prop}: "${value}" is a deprecated spelling written out inline — ` +
            `use the canonical name and let \`| LegacyTone\` carry the old one`,
        );
        continue;
      }
      if (!TONES.includes(value)) {
        problems.push(
          `${e.component}.${e.prop}: "${value}" is not in the vocabulary — ` +
            `one of ${TONES.join(" | ")} (see components/_tone.js)`,
        );
        continue;
      }
      if (e.exempt?.includes(value)) continue;
      if (!css.includes(e.selector(value))) {
        problems.push(
          `${e.component}.${e.prop}: advertises "${value}" but ${e.css.join("/")} has no ` +
            `\`${e.selector(value)}\` — the prop compiles and paints nothing`,
        );
      }
    }
  }
  return { problems, checked };
}

const readFile = (f) => readFileSync(join(ROOT, f), "utf8");

if (process.argv.includes("--self-test")) {
  const fake = {
    "bad-spelling.d.ts": `  tone?: "ok" | "success";`,
    "no-rule.d.ts": `  tone?: Extract<Tone, "success" | "info"> | LegacyTone;`,
    "fake.css": ".lw-fake-success { color: red; }",
  };
  const read = (f) => fake[f] ?? readFile(f);
  const one = check([{ component: "Bad", file: "bad-spelling.d.ts", prop: "tone",
    css: ["fake.css"], selector: (v) => `.lw-fake-${v}` }], read);
  const two = check([{ component: "Gap", file: "no-rule.d.ts", prop: "tone",
    css: ["fake.css"], selector: (v) => `.lw-fake-${v}` }], read);

  const ok1 = one.problems.some((p) => p.includes('"ok" is a deprecated spelling'));
  const ok2 = two.problems.some((p) => p.includes('advertises "info"') && p.includes("paints nothing"));
  console.log(`  ${ok1 ? "ok  " : "FAIL"} an inline legacy spelling is caught`);
  console.log(`  ${ok2 ? "ok  " : "FAIL"} a value with no CSS rule is caught`);
  if (!ok1 || !ok2) process.exit(1);
  console.log("lw-tone --self-test: both failure modes are detectable");
  process.exit(0);
}

const { problems, checked } = check(EMITTERS, readFile);

// A gate that checked nothing must not report a clean run — `minChecked` is
// what refuses it (see _report.mjs).
process.exit(report("lw-tone", {
  problems,
  checked,
  minChecked: 20,
  summary:
    `lw-tone      OK — ${checked} tone value(s) across ${EMITTERS.length} prop(s), one vocabulary, ` +
    `every advertised value backed by a rule`,
  footer: `The vocabulary is ${TONES.join(" | ")} — components/_tone.js.`,
}));
