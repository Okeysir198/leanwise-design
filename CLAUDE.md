# CLAUDE.md

Guidance for Claude Code when working in this repository.

## What this is

The **`@leanwise/design` token core** — the canonical source of colors, radii, type scale,
motion, and the WCAG contrast contract for every LeanWise product. **Tokens + a Tailwind preset
+ two enforcement CLIs**, plus an **optional React layer** (`./react`) that renders the `.lw-*`
marketing classes.

The token core is the product; the React layer is a convenience on top of it and only
`leanwise-ai` consumes it. **It is not a shadcn replacement** — each consumer still owns its own
shadcn copy for `Button`/`Select`/form primitives, and this package owns the *contract* those
copies render against. Do not grow `./react` into a general component library; a component that
needs a token belongs here, a component that needs product logic does not.

README is the user-facing doc; this file is the *maintainer* doc.

### Commands

```bash
pnpm check        # WCAG gate — node bin/lw-contrast-check.mjs. Run on EVERY token change.
pnpm build        # tsup → dist/react (esm + cjs + d.ts). Also runs on prepublishOnly.
pnpm ladle        # component preview harness for src/react (ladle.config.mjs)
npx lw-token-lint <consumer>/src
```

This repo uses **pnpm** (`pnpm-lock.yaml` at root); consumers vary — see the table below.

### Consumers (the suite — keep them in lockstep)

| Consumer | Pin | Installed | Consumes | Package manager |
|---|---|---|---|---|
| `leanwise-ai` | `#v0.8.1` | 0.8.1 | `tokens.css` + `lw.css` (the `.lw-*` marketing layer) + `./assets` + `./react` | pnpm |
| `P20260707-vss/frontend` | `#v0.2.3` | 0.2.3 | `tokens.css` + `shadcn.css` + Tailwind preset + `./brand` | pnpm |
| `P20260706-rag-service/frontend` | `#v0.2.2` | **0.2.1 — drifted** | `tokens.css` (vanilla CSS, no preset) | npm |

All three are behind the current tag (**v0.9.0**, which moved the CTA ramp to amber).

A token change is a reviewable one-line bump in each consumer, on that consumer's schedule.
**Suite skew is the failure mode** — when one consumer lags, it re-hand-rolls the very patterns
the package factored out (leanwise-ai hand-composed `--lw-brand-500-c` radials for a release
because `bg-hero-aside`/`bg-brand-wash` didn't exist at its pinned tag). After any release, bump
all three; the lockfile-check gotcha below is how a "bump" silently no-ops.

### The v0.2.x consumers — read before bumping them

VSS and rag-service are ~7 minor versions behind and were **deliberately left on their pins**
when v0.7.0 moved the brand hue. Do not bump them in one jump:

1. **rag-service's install is drifted** — pinned `v0.2.2`, `node_modules` resolved `0.2.1`. Its
   current build was never verified against its own pin, so any bug you see there may predate
   the token change entirely. Fix the drift and rebuild *first*, in its own commit.
2. **Then** bump each to current, and eyeball. VSS spreads brand utilities across ~63 sites in
   *components* (`SourceViewer.tsx`, `ui/button.tsx`, `Landing.tsx`), not stylesheets, so its QA
   is component-by-component. rag-service concentrates ~98 in `src/styles/chat.css` + `app.css`.
3. rag-service also hardcodes the brand at `src/routes/admin/w.$slug.tsx:720,728`
   (`draft.branding?.accent || "#14B8A6"` and the matching placeholder) — the only real brand
   hardcode in any consumer. It must move to the new cyan or tenants inherit a stale default.
4. Their `dist/` builds bake the old teal. A pin bump without a rebuild still serves teal.

Sequence drift-fix → version bump → hue change, so breakage is attributable to one of the three.

## Layout

```
tokens.css          THE source of truth — HSL channel triples + derived colors, light + dark.
                      Authored once as a triple (--lw-brand-500-c: 185 82% 26.5%) and derived
                      (--lw-brand-500: hsl(var(--lw-brand-500-c))). Edit the triple; NEVER the
                      derived line; never a hex in a consumer.
assets/             the logo. logo-mark.svg (gradient, for <img>), logo-mark-mono.svg
                      (currentColor, for inlining on dark), logo-lockup.svg (mark + wordmark),
                      plus PNG fallbacks re-exported FROM the SVGs. build-logo.py regenerates
                      all of them — edit that, never the SVG by hand. See "The logo" below.
shadcn.css          maps --primary/--background/--accent/… onto tokens (no values of its own).
tailwind-preset.js  Tailwind v3 preset — registers cta/success/warning/brand/navy as REAL
                      utilities so devs never reach for the bg-[hsl(var(--x))] escape hatch.
lw.css              the .lw-* marketing classes (+ 44px touch targets, iOS-zoom guard) — only
                      leanwise-ai consumes this layer.
fonts.css + fonts/  Geist + Geist Mono, self-hosted, incl. Vietnamese subsets.
lib/brand.js        brandVars() / inkOn() / monogram() — runtime per-tenant theming.
                      lib/counter.js is exported as ./counter.
bin/                the two CLIs (below).
src/react/          SOURCE of the ./react layer — Button, Eyebrow, Card, CodeBlock, Console,
                      StoryCard, FeatureGrid, LogoRail, ThemeToggle + hooks/ + icons/. Renders
                      the .lw-* classes and bundles NO css: the consumer imports lw.css itself.
                      react/react-dom are peerDeps. Edit here, never in dist/.
dist/react/         BUILD OUTPUT (tsup.config.ts) — committed because consumers install this
                      package straight from a git tag, so there is no publish step to build it.
                      A token change alone needs no rebuild; a src/react change DOES — run
                      `pnpm build` and commit dist/ in the same commit, or the tag ships stale
                      components. build/ is the built ladle preview — gitignored, not shipped.
```

## The two CLIs — both must stay green

`bin/lw-token-lint.mjs` — **the load-bearing part of the package.** A shared token file does not
make products consistent; nothing stops a dev writing `bg-emerald-500` next to it. This turns the
style guide into build failures. Four rules: `raw-hex`, `palette-escape` (covers
`bg|text|border|ring|fill|stroke|from|to|via|accent|caret|divide|outline|decoration` + the
Tailwind palette names), `arbitrary-token` (any `var(--…)` inside `[…]`), and `>1 variant="cta"`
per file. **It is a deny-list, not a contract checker** — it cannot detect a utility the preset
no longer registers, so a removed utility compiles, lints green, and renders unstyled. The
current consumers are safe only by coincidence; if you remove a utility, grep the consumers for
it before cutting the tag.

`bin/lw-contrast-check.mjs` — the WCAG AA gate. Parses `tokens.css` for the authored triples,
scoped per block (`:root` and `.dark` separately — scanning the whole file lets the last
declaration win and silently resolves a light token to its dark value), and fails if any of the
pair in the MANIFEST drops under 4.5:1 (64 pairs as of v0.9.0). **Run it on every token change.**
It exists because white-on-CTA (2.80 on the old orange; 1.77 on today's amber) shipped in a doc
for months; a number in CI catches what an eyeball doesn't.

Coverage is manifest-driven: `MANIFEST` at the top of the script is the single place a pair is
added, and the resolver supplies the color by chasing `var()` chains. That is what makes a
**role-token entry** (`fg: "cta-text"`) worth more than a literal one (`fg: "cta-400"`) — it
fails the moment someone re-points the alias, in the theme they broke it in. Prefer role tokens
when adding coverage; keep the literal entry too when the palette value itself is load-bearing.

```bash
node bin/lw-contrast-check.mjs     # all MANIFEST pairs ≥ AA
npx lw-token-lint <consumer>/src   # run in each consumer
```

## The logo (and how the brand was sampled)

The palette is derived FROM the mark, not the other way round — and getting that *approximately*
right is not the same as getting it right. Two rounds of this:

- **v0.7.0** moved the ramp off Tailwind's stock `teal-500` (173°) into the mark's band, but
  sampled by averaging across the whole gradient. That put brand-500 at 192° 78% **47%**.
- **v0.8.0** re-sampled properly: solid ink only, **eroding anti-aliased edges first** (they drift
  toward black and drag the reading), endpoints taken as percentiles along the gradient axis, and
  cross-checked over all five renditions in `leanwise-ai/feedbacks/.../Pictures`. They agree
  tightly — cyan **187.6° 88% 32%**, navy **205.2° 97% 23.5%**. v0.7.x was 4° too blue, 10 points
  flat, and **15 points too light**; the navy was **31 saturation points** flat. It read as pale
  sky against a deep teal mark, which is exactly what Truong reported.

If you re-tune the brand again: re-sample the mark, erode the edges, and **check the CONNECT deck**
(`presentation/leanwise-ai-presentation.html`, `--accent`). The deck independently landed on
`#0C757C`, ~5 points darker than the mark — which is where white ink clears AA. That is not a
coincidence, it is the constraint. Do not pick from a palette.

**`--lw-logo-cyan` is not `brand-500`, on purpose.** The mark's own cyan fits no UI role: too dark
to read on the navy paper (4.05), too light to carry white ink (4.25). brand-500 is ~5 points
darker so the fill works. The logo carries no text, so it keeps the true colour. That is the only
token here that exists purely for artwork, and no UI rule may consume it.

`assets/build-logo.py` regenerates the SVGs — never hand-edit them. Geometry is an **autotrace**
of `logo-4.png` committed as `assets/logo-paths.json` (mark IoU 0.991, wordmark 0.975); the old
authored hexagon topped out at 0.845. `tools/trace-logo.py` re-traces, needs `vtracer`, and should
run only when the ART changes — a colour change is just `build-logo.py`. Its docstring records the
one bug worth remembering: **vtracer puts a `transform="translate(...)"` on every path**, and
extracting only `d` silently stacks every subpath at the origin.

The one rule that lives here rather than there: the gradient stops are **literal hexes**, because
CSS custom properties do not cascade into an SVG loaded through `<img>`. That is a second home
for a brand value, so it is generated from `tokens.css` and **`lw-contrast-check` fails if the two
disagree** — `lw-token-lint` cannot see inside `.svg`, so this is the only thing guarding it.

## Three rules that are not obvious (defended by the contrast gate)

1. **Ink follows the fill's LIGHTNESS, not the brand.** v0.8.0 re-sampled brand-500 off the mark
   and it came out 20 points darker, which flipped this: white on teal `#0C727B` is 5.68 and navy
   is 3.31, so `--lw-on-brand` is now WHITE. The CTA amber and the status fills are still light, so
   they keep navy — that is `--lw-on-cta` / `--lw-on-status`. Do not "restore" the old rule; the
   gate will fail.
2. **A fill color is usually not a text color.** Still true for status and CTA. Brand is now the
   exception: brand-500 reads on white at 5.68, so `--lw-brand-text-c` points at the fill on
   light and at brand-400 on dark.
   This is the three-way `fill` / `text` / `ink` split — most systems conflate it.
3. **`--primary` is cyan; amber is the `cta` *variant*, one per view.** Shadcn's `--primary`
   drives the default Button; putting amber there makes every button a CTA. And `--accent` is a
   ghost-button **hover surface**, not a brand color — per-tenant theming overrides
   `--primary`/`--ring` only (via `brandVars()`), never `--accent`.

## Releasing — the tag invariant (do not get this wrong)

The git tag, `package.json#version`, and the committed content **must all agree.** This bit us:
`v0.2.2` was cut without bumping `package.json` past `0.2.1`, so every installed copy *reported*
`0.2.1` while containing v0.2.2 content — and any future `version >= 0.2.2` check lies. For a
package whose thesis is "consistency is a dependency, not a discipline," the metadata lie is the
one defect that most directly undercuts the pitch.

To release `vX.Y.Z`:

1. Make the token/preset change. Run **both** CLIs green from the package root.
2. Bump `package.json#version` to `X.Y.Z` **in the same commit** as the change.
3. `git tag vX.Y.Z` on that commit and `git push && git push --tags`.
4. Bump the pin in **all three consumers** (`#vX.Y(Z-1)` → `#vX.Y.Z`) and refresh each lockfile.

**Do not move a published tag** (force-push a tag someone may have cached) to fix a missed bump —
cut the next version instead. A re-pointed tag breaks reproducibility for anyone who already
fetched the tarball, and the hash mismatch surfaces as a confusing cache error, not a clean
update.

### The lockfile-no-op gotcha

After moving a consumer's pin, `pnpm install` / `npm install` may report **"up to date"** and
keep the *old* resolved commit — npm/pnpm cache git deps by commit hash and the lockfile's
`resolved` entry pins the old one. Always verify the install actually moved:

```bash
grep "leanwise-design" <consumer>/<lockfile>   # resolved commit must be the new tag's SHA
grep -c "lw-text-display" <consumer>/node_modules/@leanwise/design/tokens.css   # a marker added in the new tag
```

If it didn't move: `rm -rf node_modules/@leanwise/design` and reinstall explicitly
(`npm install @leanwise/design@github:Okeysir198/leanwise-design#vX.Y.Z`). "up to date" is not
"on the new version."

## What not to do here

- **Don't edit a derived color line** (`--lw-x: hsl(var(--lw-x-c))`) — edit the `-c` triple. The
  triple is what Tailwind composes and what `brandVars()` synthesizes tints from.
- **Don't add a 4/8-digit hex** (`#RGBA`, `#RRGGBBAA`) thinking the lint catches it — `raw-hex`
  only matches 3/6 digits. Keep hex out of `tokens.css` triples entirely (they're HSL).
- **Don't `--on-dark*` in a triple-aware way** — those tokens are raw hex/rgba, the one
  inconsistency; they can't be re-tinted by `brandVars()`. Leave them unless you're migrating the
  whole set.
- **Don't ship without both bins green**, and don't add a consumer-side escape hatch
  (`// lw-token-lint-allow`) without a reviewer's eyes — it disables the arbitrary-token rule for
  that line, the rule that exists because of a real `--accent` footgun.

## Ownership

LeanWise code → personal account **Okeysir198** (never the Vietsol org). The git dep is
`github:Okeysir198/leanwise-design#<tag>`. See the user's global CLAUDE.md for which account owns
which project folder.
