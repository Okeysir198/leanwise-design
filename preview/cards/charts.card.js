/* GENERATED from charts.card.jsx by scripts/lib/card-build.mjs — do not edit. */
(() => {
  const {
    Card,
    CardHeader,
    CardTitle,
    CardDescription,
    CardContent,
    CardFooter,
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
    ChartLegend,
    ChartLegendContent,
    Bar,
    BarChart,
    Area,
    AreaChart,
    CartesianGrid,
    XAxis,
    YAxis
  } = window.LeanWiseDesign_f2d907;
  const barData = [
    { day: "Mon", contracts: 42, policy: 30, support: 22 },
    { day: "Tue", contracts: 48, policy: 28, support: 26 },
    { day: "Wed", contracts: 55, policy: 34, support: 20 },
    { day: "Thu", contracts: 51, policy: 38, support: 24 },
    { day: "Fri", contracts: 60, policy: 36, support: 28 }
  ];
  const barConfig = {
    contracts: { label: "Contracts", color: "var(--chart-1)" },
    policy: { label: "Policy", color: "var(--chart-2)" },
    support: { label: "Support", color: "var(--chart-3)" }
  };
  const areaData = [
    { month: "January", answered: 186, escalated: 80 },
    { month: "February", answered: 305, escalated: 200 },
    { month: "March", answered: 237, escalated: 120 },
    { month: "April", answered: 273, escalated: 190 },
    { month: "May", answered: 209, escalated: 130 },
    { month: "June", answered: 314, escalated: 140 }
  ];
  const areaConfig = {
    answered: { label: "Answered", color: "var(--chart-1)" },
    escalated: { label: "Escalated", color: "var(--chart-4)" }
  };
  lwCard("Charts", "Five series maximum; beyond that, group into Other. Colour comes from ChartConfig, never a literal.", /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement("div", { className: "grid grid-cols-3 gap-4 sm:grid-cols-5" }, [1, 2, 3, 4, 5].map((i) => /* @__PURE__ */ React.createElement("div", { key: i, className: "flex flex-col gap-1.5" }, /* @__PURE__ */ React.createElement("div", { className: "h-10 rounded-md", style: { background: `var(--chart-${i})` } }), /* @__PURE__ */ React.createElement("span", { className: "font-mono text-xs" }, "--chart-", i)))), /* @__PURE__ */ React.createElement("div", { className: "grid grid-cols-1 gap-6 md:grid-cols-2" }, /* @__PURE__ */ React.createElement(Card, null, /* @__PURE__ */ React.createElement(CardHeader, null, /* @__PURE__ */ React.createElement(CardTitle, null, "Answers by source"), /* @__PURE__ */ React.createElement(CardDescription, null, "Last five working days")), /* @__PURE__ */ React.createElement(CardContent, null, /* @__PURE__ */ React.createElement(ChartContainer, { config: barConfig, className: "min-h-[240px] w-full", role: "img", "aria-label": "Bar chart of answers by source per day" }, /* @__PURE__ */ React.createElement(BarChart, { accessibilityLayer: true, data: barData }, /* @__PURE__ */ React.createElement(CartesianGrid, { vertical: false }), /* @__PURE__ */ React.createElement(XAxis, { dataKey: "day", tickLine: false, tickMargin: 10, axisLine: false }), /* @__PURE__ */ React.createElement(ChartTooltip, { content: /* @__PURE__ */ React.createElement(ChartTooltipContent, null) }), /* @__PURE__ */ React.createElement(ChartLegend, { content: /* @__PURE__ */ React.createElement(ChartLegendContent, null) }), /* @__PURE__ */ React.createElement(Bar, { dataKey: "contracts", fill: "var(--color-contracts)", radius: 4 }), /* @__PURE__ */ React.createElement(Bar, { dataKey: "policy", fill: "var(--color-policy)", radius: 4 }), /* @__PURE__ */ React.createElement(Bar, { dataKey: "support", fill: "var(--color-support)", radius: 4 }))))), /* @__PURE__ */ React.createElement(Card, null, /* @__PURE__ */ React.createElement(CardHeader, null, /* @__PURE__ */ React.createElement(CardTitle, null, "Questions over time"), /* @__PURE__ */ React.createElement(CardDescription, null, "January to June")), /* @__PURE__ */ React.createElement(CardContent, null, /* @__PURE__ */ React.createElement(ChartContainer, { config: areaConfig, className: "min-h-[240px] w-full", role: "img", "aria-label": "Stacked area chart of answered and escalated questions per month" }, /* @__PURE__ */ React.createElement(AreaChart, { accessibilityLayer: true, data: areaData, margin: { left: 12, right: 12 } }, /* @__PURE__ */ React.createElement(CartesianGrid, { vertical: false }), /* @__PURE__ */ React.createElement(XAxis, { dataKey: "month", tickLine: false, axisLine: false, tickMargin: 8, tickFormatter: (v) => v.slice(0, 3) }), /* @__PURE__ */ React.createElement(ChartTooltip, { cursor: false, content: /* @__PURE__ */ React.createElement(ChartTooltipContent, { indicator: "dot" }) }), /* @__PURE__ */ React.createElement(Area, { dataKey: "escalated", type: "natural", fill: "var(--color-escalated)", fillOpacity: 0.4, stroke: "var(--color-escalated)", stackId: "a" }), /* @__PURE__ */ React.createElement(Area, { dataKey: "answered", type: "natural", fill: "var(--color-answered)", fillOpacity: 0.4, stroke: "var(--color-answered)", stackId: "a" }), /* @__PURE__ */ React.createElement(ChartLegend, { content: /* @__PURE__ */ React.createElement(ChartLegendContent, null) })))), /* @__PURE__ */ React.createElement(CardFooter, { className: "text-muted-foreground text-sm" }, "Answered up 5.2% this month")))));
})();
