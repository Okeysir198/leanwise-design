# Contributing to @leanwise/design

## Before you add anything

**Prove it is not already here.** Two treatments of one interaction is not a style choice —
it is a bug that takes a year to notice, because nothing renders both side by side until
someone builds a page that does.

## The checklist

The eleven-step checklist lives in **README §"Adding a component"** and is not duplicated
here on purpose: a checklist in two files is a checklist that disagrees with itself within a
release. Read it there, in order. A component that skips a step is the one that drifts.

Use it as the PR template verbatim.

## Before you open the PR

```bash
npm run check     # the four fast gates. The only path to remember.
                  #   check:contrast  every token pair >= WCAG AA, plus the
                  #                   non-text 3:1 boundaries and focus rings
                  #   check:tokens    raw hex/colour, palette escapes, raw
                  #                   durations and z-indexes, missing React import
                  #   check:themes    every themable channel re-pointed in every
                  #                   theme scope; tokens.json not stale
                  #   check:dts       react.d.ts covers every runtime export
npm run dts       # after adding or removing a barrel export
npm run tokens    # after changing any token — commit tokens.json with it
```

All four must pass. `check:dts` is the one whose failure mode is a broken
`npm run build`: add the export to `react.js` AND the declaration to the component's own
`.d.ts`, then regenerate. The lint is the load-bearing part of this package — a shared token file
does not make products consistent on its own, and nothing else stops a dev writing
`bg-emerald-500` next to it.

Then, by hand, the three things no gate can see:

1. **Both grounds.** Light and `.lw-band-dark`. A component that only works on one is not
   finished.
2. **Both densities.** Default and inside `[data-density="compact"]`. Anything with a height
   reads a density token or explains in a comment why it does not.
3. **Keyboard only.** Tab to it, operate it, leave it. A visible `:focus-visible` ring at
   every stop, and focus never lands somewhere with no role.

## Where the docs live

`README.md` is the source of truth and the component index — every component is named there.
`CHANGELOG.md` is what moved. `REVIEW.md` is the standing audit: read finding 1 before you
touch the CSS layers.

## Versioning

Semver, and every change lands in `CHANGELOG.md` under `[Unreleased]` in the same PR.
Deprecations are warned for one minor and removed in the next major — never deleted outright.

## What does NOT belong here

- A component one product needs and nobody else does. Build it there; promote it when a
  second product asks.
- Styling inside a `.jsx`. The CSS layer is the single source of styling, which is what keeps
  the React and vanilla consumers from drifting apart.
- A raw hex, a Tailwind palette escape, or an icon path drawn a second time.
