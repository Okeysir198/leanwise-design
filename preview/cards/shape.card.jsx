// @dsCard group="Foundations" name="Radius, borders, focus" subtitle="One --radius drives four steps; focus is a solid brand ring" viewport="1000x760"
const { Button, Input } = window.LeanWiseDesign_f2d907;

const RADII = ["rounded-sm", "rounded-md", "rounded-lg", "rounded-xl", "rounded-full"];

lwCard("Radius, borders, focus", "Tab through the bottom row: every control shows the same ring.", (
  <>
    <section className="flex flex-col gap-3">
      <h2 className="text-sm font-semibold">Radius</h2>
      <div className="flex flex-wrap gap-6">
        {RADII.map((r) => (
          <div key={r} className="flex flex-col items-center gap-2">
            <div className={`bg-accent border-primary size-20 border ${r}`} />
            <span className="font-mono text-xs">{r}</span>
          </div>
        ))}
      </div>
    </section>
    <section className="flex flex-col gap-3">
      <h2 className="text-sm font-semibold">Borders and elevation</h2>
      <div className="grid grid-cols-3 gap-6">
        <div className="rounded-lg border p-6 text-sm">border</div>
        <div className="border-input rounded-lg border p-6 text-sm">border-input</div>
        <div className="bg-card rounded-lg border p-6 text-sm shadow-sm">card + shadow-sm</div>
      </div>
    </section>
    <section className="flex flex-col gap-3">
      <h2 className="text-sm font-semibold">Focus</h2>
      <div className="flex flex-wrap items-center gap-4">
        <Button autoFocus>Focused button</Button>
        <Button variant="outline">Outline</Button>
        <Input className="w-64" placeholder="Focus me" aria-label="Focus demo" />
      </div>
    </section>
  </>
));
