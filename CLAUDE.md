# CLAUDE.md

## What this is

`@leanwise/design` — the LeanWise brand as a **shadcn/ui theme and registry**. Consumers run
stock shadcn on Tailwind v4, import `theme.css`, and install `@leanwise/*` registry items.
`package.json` is the authority for the version. README.md is the user-facing doc.

The repo is also the working copy of a Claude Design project
(`f2d90781-f891-45e3-bc88-ddb55e6f9444`); see "Claude Design sync".

## Rules

- **shadcn first.** 1) stock component/block used the shadcn way; 2) stock + a brand role via
  a theme variable or a registry item; 3) build our own only when shadcn has nothing. Never
  fork a stock component to brand it — the CTA is a stock `Button` with
  `bg-cta text-cta-foreground hover:bg-cta/90`.
- **One colour source: `src/palette.mjs`.** `theme.css` and `tokens.json` are generated from
  it (`npm run gen`), and so are the registry's `cssVars`. A new role is a palette change,
  never a local override in a consumer.
- **Three anchors are exact**: cyan `#0C727B` = primary, navy `#024576`, amber `#FCB603` = cta.
  Everything else is OKLCH derived from the logo gradient.
- **Non-status, non-chart colours stay in the brand hue band** (OKLCH hue 190–260, or
  chroma < 0.02). Status (`destructive`, `success`, `warning`, `info`, `cta`) and `chart-*`
  are the only exceptions.
- **Ink follows the fill** — white on cyan/navy, navy on amber/warning.
- **Focus is a solid ring**, stated unlayered in `theme.css` so it beats stock `ring-ring/50`.
- **Under Tailwind v4 an unknown utility emits NOTHING.** Presence (does it compile?) is the
  only honest test; `check presence` does it for every role.
- **Every check refuses to pass vacuously**, and every check was sabotaged (break → red →
  restore) when it was written. Do the same for any check you add or change.
- **Everything generated is committed**, because consumers install from a git tag and no
  publish step runs. Change the source, run the generator, commit both.
- No history in code or docs: no "was", no version stories, no compat aliases.

## Layout

```
src/palette.mjs        THE source: ANCHORS, the cyan ramp, themes.light/.dark role maps
scripts/gen.mjs        every generated file; --check fails on a stale one
scripts/check.mjs      the checks: lint | contrast | presence | a11y | visual | pack
scripts/{assets,favicon,affordance,forced-colors,templates}.mjs   standalone generators/checks
scripts/lib/           oklch, theme (theme.css), tokens-json, registry (r/), bundle (preview
                       bundle + preview.css + manifest), card-build, tw, contrast, lint, color,
                       png, cards, css, generated, parse, report
theme.css tokens.json  GENERATED
registry/ registry.json r/   shadcn registry source and its built items
marketing.css          plain-CSS marketing layer over theme variables
fonts.css fonts/ assets/   Geist, logo and artwork
brand.js hooks.js      brandVars(hex, scheme); useTheme, useReducedMotion, THEME_KEY
bin/lw-token-lint.mjs  the consumer lint
skills/leanwise-ui/    the agent skill consumers copy
registry/blocks/       OUR blocks (app-shell, state-view, file-upload, section-nav): the one
                       copy; the preview compiles them directly
preview/src/ui/        stock new-york-v4 shadcn, UNMODIFIED; shadcn-blocks/ = stock blocks
                       (sidebar-07, login-04), unmodified; index.ts = the bundle namespace
preview/cards/*.card.jsx   card sources -> generated .card.js/.card.html (@dsCard marker)
templates/*/*.dc.html  Claude Design templates over the namespace (x-import)
```

## Commands

```bash
npm run gen         # theme.css, tokens.json, r/, preview bundle + cards + manifest, logo assets
npm run check       # gen/assets --check, tests, tsc, lint, contrast, presence, affordance, templates
npm run check:ci    # + pack, a11y, forced-colors, visual --self-test (needs `npx playwright install chromium`)
npm run lint -- <dir>   # token lint (default: registry/)
node scripts/check.mjs visual --record | --compare [--dir d] [--report-only]
```

| check | asserts |
|---|---|
| `lint` | no raw hex, no Tailwind palette class, no `[var(--x)]`, ≤1 `variant="cta"` per file |
| `contrast` | text pairs ≥4.5 in both themes; `input`/`ring`/`primary` ≥3:1 on every surface; role parity light⇄dark; anchors exact in palette and theme.css; chart-1..5 pairwise dE76 ≥19 normal and ≥15 worst dichromacy; brand hue band |
| `presence` | every role/ramp/type/radius utility compiles through Tailwind + theme.css |
| `a11y` | axe (WCAG 2.1 A/AA) over every `@dsCard` page, light and `.dark`; serious/critical fail. A node may opt out of one rule with `data-a11y-expect="<rule-id>"` |
| `visual` | every card x light/dark, per-shot soft/strong pixel rules; `--record` a baseline, then `--compare` |
| `pack` | `npm pack`, install the tarball in a scratch app, resolve every export, compile theme.css from it, parse `r/`, run the bin both ways |

`test/checks.test.mjs` holds the contrast and lint sabotage proofs; keep one per rule.

## Adding a stock component or block

1. Search shadcn first (MCP in `.mcp.json`). Copy the item's files from
   `https://ui.shadcn.com/r/styles/new-york-v4/<name>.json` UNMODIFIED into `preview/src/ui/`
   (blocks: `preview/src/shadcn-blocks/<block>/`); add npm deps as devDependencies.
2. Export it from `preview/src/index.ts`, `npm run gen`, `npm run check && npm run check:a11y`.
3. An a11y failure is fixed in the card markup or `src/palette.mjs`, never in a stock file.

## Gotchas

- Stock blocks hard-code sample content (`Acme`, `/placeholder.svg`, `/avatars/*`); leave it,
  consumers edit it after `shadcn add`.
- Stock data-table and blocks use TanStack Table **v9** (`useTable`, `FlexRender`); templates,
  which cannot call hooks, use `constructTable`.
- Templates need a literal `<main>` and must be served over http (`python3 -m http.server`).
- UI rules live in README §Brand: action order (right-aligned, primary last), sidebar
  current-page bar via `data-active`, `@leanwise/section-nav` in content, pointer cursor.
- If git has no identity configured, commit with `git -c user.name=… -c user.email=…`.

## Releasing

The git tag, `package.json#version` and the content must agree.

1. `npm run check` green; `npm run check:ci` green.
2. Bump `package.json#version` and the `#vX.Y.Z` in README's install and registry URLs, in
   one commit.
3. `git tag vX.Y.Z`, `git push && git push --tags`.
4. Bump each consumer's pin and verify its lockfile resolved the new tag's SHA
   (`grep leanwise-design <lockfile>`). npm can report "up to date" on the old commit; the fix
   is `npm install github:Okeysir198/leanwise-design#vX.Y.Z` explicitly.

Never move a published tag — cut the next version.

## Claude Design sync

`DesignSync` reads and writes the project. It is not reachable from subagents — main loop only.

1. **Version probe first**: `get_file package.json`, read `version`.
2. **The plan**: `git diff --name-status v<that>..HEAD`. `A`/`M` lines are writes, `D` lines
   are deletes — a delete is never implied by a write glob.
3. `list_files` for the structural diff (it sees adds/deletes only, never content drift).
4. `finalize_plan` — globs for writes, exact paths for deletes (pass `deletes: []` when none;
   it is required); the user approves.
5. `write_files` in batches of ≤256 with `localPath`, so contents never enter context.
6. `delete_files`.

`CLAUDE.md` and `.claude/` are reserved there and rejected. Do not push `dist/` or
`node_modules/`. Push generated files (`theme.css`, `tokens.json`, `r/`, `registry.json`)
with their sources. `get_file` caps at 256 KiB. Anything computed in the project is a
claim: re-derive every colour here and run `npm run check` before trusting it.

## Consumers

Before bumping a consumer's pin: `npx lw-token-lint <consumer>/src`.

## Ownership

Git dep: `github:Okeysir198/leanwise-design#<tag>`.
