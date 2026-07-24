import { defineConfig } from 'tsup';

/* =============================================================================
   tsup build for the React component layer.

   Output → dist/react/:
     index.mjs  (ESM)
     index.js   (CJS)
     index.d.ts (types, rolled up)

   react / react-dom are peer deps → kept external (never bundled). The build
   targets modern browsers + Node (Cloudflare-Workers-friendly: no Node-only
   built-ins like 'fs'/'path'). d.ts generation reads src/react/tsconfig.json so
   JSX + the React JSX-runtime import-source resolve correctly.
   ============================================================================= */

export default defineConfig({
  entry: ['src/react/index.ts'],
  format: ['esm', 'cjs'],
  dts: {
    resolve: true,
    // Point at the React-scoped tsconfig so tsup doesn't depend on a root one.
    tsconfig: 'src/react/tsconfig.json',
  },
  treeshake: true,
  external: ['react', 'react-dom'],
  clean: true,
  outDir: 'dist/react',
  target: ['chrome100', 'firefox100', 'safari15', 'node18'],
  platform: 'neutral',
  jsx: 'automatic',
  esbuildOptions(opts) {
    // Keep the published ESM clean (no dev-only conditions leaking).
    opts.conditions = ['production'];
  },
});
