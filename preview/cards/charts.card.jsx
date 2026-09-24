// @dsCard group="Charts" name="Chart palette" subtitle="--chart-1..5 as swatches and a grouped bar chart; the order is the series order" viewport="1000x720"
const { Card, CardHeader, CardTitle, CardDescription, CardContent } = window.LeanWiseDesign_f2d907;

const SERIES = ["Contracts", "Policy", "Support", "Wiki", "Email"];
const DATA = [
  ["Mon", [42, 30, 22, 12, 8]],
  ["Tue", [48, 28, 26, 10, 12]],
  ["Wed", [55, 34, 20, 14, 9]],
  ["Thu", [51, 38, 24, 9, 14]],
  ["Fri", [60, 36, 28, 11, 10]],
];
const MAX = 60;

lwCard("Chart palette", "Five series maximum; beyond that, group into Other.", (
  <>
    <div className="grid grid-cols-5 gap-4">
      {SERIES.map((s, i) => (
        <div key={s} className="flex flex-col gap-1.5">
          <div className="h-14 rounded-md" style={{ background: `var(--chart-${i + 1})` }} />
          <span className="font-mono text-xs">--chart-{i + 1}</span>
        </div>
      ))}
    </div>
    <Card>
      <CardHeader>
        <CardTitle>Answers by source</CardTitle>
        <CardDescription>Last five working days</CardDescription>
      </CardHeader>
      <CardContent>
        <div role="img" aria-label="Grouped bar chart of answers by source per day" className="flex h-56 items-end gap-8 border-b">
          {DATA.map(([day, vals]) => (
            <div key={day} className="flex flex-1 flex-col items-center gap-2">
              <div className="flex h-48 w-full items-end gap-1">
                {vals.map((v, i) => (
                  <div key={i} className="flex-1 rounded-t-sm" style={{ height: `${(v / MAX) * 100}%`, background: `var(--chart-${i + 1})` }} />
                ))}
              </div>
            </div>
          ))}
        </div>
        <div className="text-muted-foreground mt-2 flex gap-8 text-xs">
          {DATA.map(([day]) => <span key={day} className="flex-1 text-center">{day}</span>)}
        </div>
        <div className="mt-4 flex flex-wrap gap-4 text-xs">
          {SERIES.map((s, i) => (
            <span key={s} className="flex items-center gap-1.5">
              <span className="size-2.5 rounded-sm" style={{ background: `var(--chart-${i + 1})` }} />{s}
            </span>
          ))}
        </div>
      </CardContent>
    </Card>
  </>
));
