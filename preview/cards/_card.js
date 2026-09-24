/* Card chrome: a title, a subtitle and a light/dark toggle (the `.dark` class on <html>).
   `?theme=dark` opens a card dark. */
(() => {
  const R = window.React;
  const root = document.documentElement;
  if (new URLSearchParams(location.search).get("theme") === "dark") root.classList.add("dark");

  function Chrome({ title, subtitle, children }) {
    const [dark, setDark] = R.useState(root.classList.contains("dark"));
    const toggle = () => { root.classList.toggle("dark", !dark); setDark(!dark); };
    return R.createElement("div", { className: "flex min-h-svh flex-col gap-6 p-8" },
      R.createElement("header", { className: "flex items-start justify-between gap-6" },
        R.createElement("div", { className: "flex flex-col gap-1" },
          R.createElement("h1", { className: "text-2xl font-semibold tracking-tight" }, title),
          subtitle && R.createElement("p", { className: "text-muted-foreground max-w-prose text-sm" }, subtitle)),
        R.createElement("button", {
          type: "button", onClick: toggle, "aria-pressed": dark,
          className: "border-input hover:bg-accent h-8 shrink-0 rounded-md border px-3 text-sm font-medium",
        }, dark ? "Light" : "Dark")),
      R.createElement("main", { className: "flex flex-col gap-8" }, children));
  }

  window.lwCard = (title, subtitle, body) => {
    const el = document.getElementById("root");
    window.ReactDOM.createRoot(el).render(R.createElement(Chrome, { title, subtitle }, body));
  };
})();
