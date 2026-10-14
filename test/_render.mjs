import fs from "node:fs";
import path from "node:path";
import esbuild from "esbuild";
import { ROOT } from "./_root.mjs";

/** Bundle a shipped block with esbuild and render it with react-dom/server. */
export async function renderBlock(file, name, props) {
  const out = await esbuild.build({
    stdin: {
      contents: `import { ${name} } from "./${file}";
        import { createElement } from "react";
        import { renderToStaticMarkup } from "react-dom/server";
        export default (props) => renderToStaticMarkup(createElement(${name}, props));`,
      resolveDir: ROOT,
      loader: "tsx",
    },
    alias: { "@/lib/utils": path.join(ROOT, "preview/src/lib/utils.ts") },
    bundle: true, write: false, format: "esm", platform: "node", jsx: "automatic",
    external: ["react", "react-dom", "react-dom/server", "clsx", "tailwind-merge"],
  });
  const tmp = path.join(ROOT, "node_modules", `.render-${process.pid}-${name}.mjs`);
  fs.writeFileSync(tmp, out.outputFiles[0].text);
  try {
    return (await import(tmp)).default(props);
  } finally {
    fs.rmSync(tmp, { force: true });
  }
}
