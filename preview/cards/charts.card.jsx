// @dsCard group="Charts" name="Charts" subtitle="Stock Chart (ChartContainer, ChartTooltip, ChartLegend) over recharts; series colours are --chart-1..5 in series order" viewport="1100x820"
const {
  Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter,
  ChartContainer, ChartTooltip, ChartTooltipContent, ChartLegend, ChartLegendContent,
  Bar, BarChart, Area, AreaChart, CartesianGrid, XAxis, YAxis,
} = window.LeanWiseDesign_f2d907;

const barData = [
  { day: "Mon", contracts: 42, policy: 30, support: 22 },
  { day: "Tue", contracts: 48, policy: 28, support: 26 },
  { day: "Wed", contracts: 55, policy: 34, support: 20 },
  { day: "Thu", contracts: 51, policy: 38, support: 24 },
  { day: "Fri", contracts: 60, policy: 36, support: 28 },
];
const barConfig = {
  contracts: { label: "Contracts", color: "var(--chart-1)" },
  policy: { label: "Policy", color: "var(--chart-2)" },
  support: { label: "Support", color: "var(--chart-3)" },
};

const areaData = [
  { month: "January", answered: 186, escalated: 80 },
  { month: "February", answered: 305, escalated: 200 },
  { month: "March", answered: 237, escalated: 120 },
  { month: "April", answered: 273, escalated: 190 },
  { month: "May", answered: 209, escalated: 130 },
  { month: "June", answered: 314, escalated: 140 },
];
const areaConfig = {
  answered: { label: "Answered", color: "var(--chart-1)" },
  escalated: { label: "Escalated", color: "var(--chart-4)" },
};

lwCard("Charts", "Five series maximum; beyond that, group into Other. Colour comes from ChartConfig, never a literal.", (
  <>
    <div className="grid grid-cols-3 gap-4 sm:grid-cols-5">
      {[1, 2, 3, 4, 5].map((i) => (
        <div key={i} className="flex flex-col gap-1.5">
          <div className="h-10 rounded-md" style={{ background: `var(--chart-${i})` }} />
          <span className="font-mono text-xs">--chart-{i}</span>
        </div>
      ))}
    </div>
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle>Answers by source</CardTitle>
          <CardDescription>Last five working days</CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer config={barConfig} className="min-h-[240px] w-full" role="img" aria-label="Bar chart of answers by source per day">
            <BarChart accessibilityLayer data={barData}>
              <CartesianGrid vertical={false} />
              <XAxis dataKey="day" tickLine={false} tickMargin={10} axisLine={false} />
              <ChartTooltip content={<ChartTooltipContent />} />
              <ChartLegend content={<ChartLegendContent />} />
              <Bar dataKey="contracts" fill="var(--color-contracts)" radius={4} />
              <Bar dataKey="policy" fill="var(--color-policy)" radius={4} />
              <Bar dataKey="support" fill="var(--color-support)" radius={4} />
            </BarChart>
          </ChartContainer>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Questions over time</CardTitle>
          <CardDescription>January to June</CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer config={areaConfig} className="min-h-[240px] w-full" role="img" aria-label="Stacked area chart of answered and escalated questions per month">
            <AreaChart accessibilityLayer data={areaData} margin={{ left: 12, right: 12 }}>
              <CartesianGrid vertical={false} />
              <XAxis dataKey="month" tickLine={false} axisLine={false} tickMargin={8} tickFormatter={(v) => v.slice(0, 3)} />
              <ChartTooltip cursor={false} content={<ChartTooltipContent indicator="dot" />} />
              <Area dataKey="escalated" type="natural" fill="var(--color-escalated)" fillOpacity={0.4} stroke="var(--color-escalated)" stackId="a" />
              <Area dataKey="answered" type="natural" fill="var(--color-answered)" fillOpacity={0.4} stroke="var(--color-answered)" stackId="a" />
              <ChartLegend content={<ChartLegendContent />} />
            </AreaChart>
          </ChartContainer>
        </CardContent>
        <CardFooter className="text-muted-foreground text-sm">Answered up 5.2% this month</CardFooter>
      </Card>
    </div>
  </>
));
