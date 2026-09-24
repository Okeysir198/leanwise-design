#!/usr/bin/env node
/* lw-token-lint <src...> — no raw hex, no Tailwind palette classes, no arbitrary
   var(), one variant="cta" per file. Theme roles only. */
import { existsSync } from "node:fs";
import { lint } from "../scripts/lib/lint.mjs";
import { report } from "../scripts/lib/report.mjs";

const paths = process.argv.slice(2).filter((a) => !a.startsWith("-"));
if (!paths.length) { console.error("usage: lw-token-lint <src-dir>..."); process.exit(2); }
for (const p of paths) if (!existsSync(p)) { console.error(`lw-token-lint: no such path: ${p}`); process.exit(2); }
const { problems, files } = lint(paths);
process.exit(report("lw-token-lint", { problems, checked: files, minChecked: 1, summary: `token lint: ${files} file(s) clean.` }));
