#!/usr/bin/env node
/* lw-focus-clip --cdp <url> [--widths 390,768,1280] <page-url>...
   Sweeps live pages for focus rings cut by a scroll/clip container. It drives a browser you
   already run, over the Chrome DevTools Protocol: start one with --remote-debugging-port
   and pass its http endpoint (or set LW_CDP). It never launches a browser itself.
   Each page is loaded at every width, put in keyboard modality, and every control in the Tab
   order is focused; a ring a clipping ancestor cuts is a problem. The fix is `focus-room` on
   that container. A node may opt out with data-focus-expect="<why>". */
import { probe } from "../scripts/lib/focus-clip.mjs";
import { report } from "../scripts/lib/report.mjs";

const argv = process.argv.slice(2);
const opt = (f) => { const i = argv.indexOf(f); return i >= 0 ? argv.splice(i, 2)[1] : undefined; };
const cdp = (opt("--cdp") ?? process.env.LW_CDP)?.replace(/\/$/, "");
const widths = (opt("--widths") ?? "390,768,1280").split(",").map(Number).filter((n) => n > 0);
const urls = argv.filter((a) => !a.startsWith("-"));
if (!cdp || !urls.length || !widths.length || urls.length !== argv.length) {
  console.error("usage: lw-focus-clip --cdp <http://host:port> [--widths 390,768,1280] <page-url>...\n" +
    "  (or set LW_CDP; the browser must already be running with --remote-debugging-port)");
  process.exit(2);
}
if (typeof WebSocket === "undefined") {
  console.error(`lw-focus-clip needs Node 22 or later (a global WebSocket); this is Node ${process.versions.node}.`);
  process.exit(2);
}

/* One tab, driven over its own websocket. */
async function openTab() {
  const res = await fetch(`${cdp}/json/new?about:blank`, { method: "PUT" });
  if (!res.ok) throw new Error(`${cdp}/json/new answered ${res.status}`);
  const target = await res.json();
  const ws = new WebSocket(target.webSocketDebuggerUrl);
  await new Promise((ok, fail) => { ws.onopen = ok; ws.onerror = () => fail(new Error(`cannot open ${target.webSocketDebuggerUrl}`)); });
  let seq = 0, onLoad = () => {};
  const pending = new Map();
  /* A socket that drops mid-sweep fails every request in flight instead of hanging. */
  ws.onclose = ws.onerror = () => { for (const { fail } of pending.values()) fail(new Error("the CDP connection closed")); pending.clear(); };
  ws.onmessage = ({ data }) => {
    const m = JSON.parse(data);
    if (m.method === "Page.loadEventFired") onLoad();
    if (!pending.has(m.id)) return;
    const { ok, fail } = pending.get(m.id);
    pending.delete(m.id);
    m.error ? fail(new Error(`${m.error.message} ${m.error.data ?? ""}`)) : ok(m.result);
  };
  const send = (method, params = {}) => new Promise((ok, fail) => {
    const id = ++seq;
    pending.set(id, { ok, fail });
    ws.send(JSON.stringify({ id, method, params }));
  });
  /* Navigate and resolve on the load event (or fail on a navigation error or a timeout). */
  const navigate = (url) => new Promise((ok, fail) => {
    const timer = setTimeout(() => fail(new Error(`${url} did not fire load within 60s`)), 60000);
    onLoad = () => { clearTimeout(timer); ok(); };
    send("Page.navigate", { url }).then((r) => {
      /* No loaderId: a same-document navigation (a #fragment), which fires no load event. */
      if (r.errorText || !r.loaderId) { clearTimeout(timer); r.errorText ? fail(new Error(r.errorText)) : ok(); }
    }, fail);
  });
  const close = async () => { ws.close(); await fetch(`${cdp}/json/close/${target.id}`).catch(() => {}); };
  return { send, navigate, close };
}

const evaluate = async (send, expression) => {
  const r = await send("Runtime.evaluate", { expression, awaitPromise: true, returnByValue: true });
  if (r.exceptionDetails) throw new Error(r.exceptionDetails.exception?.description ?? r.exceptionDetails.text);
  return r.result.value;
};

const problems = [];
let checked = 0;
const tab = await openTab();
try {
  await tab.send("Page.enable");
  /* A background tab takes no focus and runs no animation frames: front it, and emulate a
     focused page so a browser window behind another still answers :focus-visible. */
  await tab.send("Page.bringToFront");
  await tab.send("Emulation.setFocusEmulationEnabled", { enabled: true });
  for (const url of urls) {
    for (const width of widths) {
      await tab.send("Emulation.setDeviceMetricsOverride", { width, height: 900, deviceScaleFactor: 1, mobile: width < 768 });
      try { await tab.navigate(url); } catch (e) { problems.push(`${url} [${width}px] did not load: ${e.message}`); continue; }
      /* A client-rendered page draws its controls after load: wait for fonts, then until the
         control count is non-zero and steady for 500ms (10s at most). */
      await evaluate(tab.send, `document.fonts.ready.then(() => new Promise((done) => {
        let last = -1, steady = 0;
        const t0 = Date.now(), tick = setInterval(() => {
          const n = document.querySelectorAll("a[href], button, input, select, textarea, [tabindex]").length;
          steady = n > 0 && n === last ? steady + 1 : 0;
          last = n;
          if (steady >= 5 || Date.now() - t0 > 10000) { clearInterval(tick); done(); }
        }, 100);
      }))`);
      /* A real key press: programmatic focus then shows :focus-visible, as it does for Tab. */
      for (const type of ["keyDown", "keyUp"]) await tab.send("Input.dispatchKeyEvent", { type, key: "Shift", code: "ShiftLeft", windowsVirtualKeyCode: 16 });
      const r = await evaluate(tab.send, `(${probe})()`);
      if (!r.focused) problems.push(`${url} [${width}px] no control took :focus-visible — this page was not measured`);
      checked += r.checked;
      for (const m of r.problems) problems.push(`${url} [${width}px] ${m}`);
    }
  }
} finally {
  await tab.close();
}
process.exit(report("lw-focus-clip", {
  problems, checked, minChecked: 1,
  summary: `focus clip: ${checked} focus ring(s) painted whole over ${urls.length} page(s) x ${widths.length} width(s).`,
  footer: "Give the clipping container room for the ring: add the `focus-room` utility from theme.css to it.",
}));
