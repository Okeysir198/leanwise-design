// The build. Written and committed so the only thing standing between this package
// and a real dist/ is `npm i && npm run build` on a machine that can install.
//
// It lives in templates/_tooling/ for the reason the README gives about the other
// Node scripts: every other directory is compiled into the browser bundle, and a
// config that imports "tsup" cannot be. `npm run build` passes --config.
//
// WHY a build at all, when the point of shipping .jsx was that a component is one
// file to read and patch: because that choice made every consumer put this package
// inside babel-loader's `include`, and a dependency that needs a build-config change
// to install is a dependency a team eventually vendors instead. Vendoring is the one
// outcome the token lint exists to prevent, so the tax has to go.
//
// The .jsx stays in the package and `sourcemap: true` points at it, so "one file to
// read and patch" survives: a consumer stepping into Button lands in Button.jsx.
import { defineConfig } from "tsup";

export default defineConfig({
  // Paths are relative to the package root, which is two levels up from this file —
  // tsup resolves entry against cwd, and cwd is where npm run was invoked.
  entry: {
    index: "react.js",
    react: "react.js",
    brand: "brand.js",
    hooks: "hooks.js",
  },
  format: ["esm"],
  target: "es2020",
  // React is the consumer's, always. Bundling it would give an app two Reacts and
  // the hook errors that come with them.
  external: ["react", "react-dom", "react/jsx-runtime"],
  dts: true,
  sourcemap: true,
  clean: true,
  treeshake: true,
  // The CSS ships unbuilt on purpose: it already works, consumers' bundlers handle
  // @import, and running it through a bundler would rewrite the asset URLs in
  // marketing.css (the hero mark, the hex lattice) to hashed names the README
  // documents by their real filenames.
  loader: { ".jsx": "jsx" },
  esbuildOptions(options) {
    options.jsx = "automatic";
  },
});
