/** @type {import('@ladle/react').Config} */
export default {
  // Stories are auto-discovered in `.ladle/**.stories.tsx`. The docs site is dev-only
  // (not shipped to consumers): `pnpm ladle` serves it, `pnpm ladle:build` emits a static
  // build under `ladle-build/`. Each story imports `.ladle/css.ts` so components render
  // against the real token core + .lw-* layer.
  mode: 'full',
  title: '@leanwise/design',
};
