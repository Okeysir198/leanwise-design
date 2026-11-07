/* The browser for the rendered checks. `LW_CDP` attaches to a running headful browser,
   for machines where a headless one falls back to software rendering. */
export async function openBrowser() {
  const { chromium } = await import("playwright");
  return process.env.LW_CDP ? chromium.connectOverCDP(process.env.LW_CDP) : chromium.launch();
}
