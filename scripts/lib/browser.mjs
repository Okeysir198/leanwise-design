/* The browser for the rendered checks. `LW_CDP` attaches to a running headful browser,
   for machines where a headless one falls back to software rendering. `debugPort` opens a
   launched browser's CDP endpoint too, for a check that drives it over raw CDP. */
export async function openBrowser({ debugPort } = {}) {
  const { chromium } = await import("playwright");
  return process.env.LW_CDP
    ? chromium.connectOverCDP(process.env.LW_CDP)
    : chromium.launch(debugPort ? { args: [`--remote-debugging-port=${debugPort}`] } : {});
}
