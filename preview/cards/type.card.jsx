// @dsCard group="Foundations" name="Type scale" subtitle="Geist and Geist Mono, the app scale and the fluid display sizes" viewport="1000x900"
const SCALE = [
  ["text-display", "Knowledge, answered"],
  ["text-display-sm", "Knowledge, answered"],
  ["text-3xl", "Page title"],
  ["text-2xl", "Section heading"],
  ["text-xl", "Card title"],
  ["text-lg", "Lead paragraph"],
  ["text-base", "Long-form body copy reads at sixteen pixels."],
  ["text-sm", "App body copy and controls sit at fourteen."],
  ["text-xs", "Captions and meta — the floor."],
];

lwCard("Type scale", "Size and line-height come in pairs; tracking tightens as size grows.", (
  <div className="flex flex-col divide-y">
    {SCALE.map(([cls, sample]) => (
      <div key={cls} className="grid grid-cols-[10rem_1fr] items-baseline gap-6 py-3">
        <span className="text-muted-foreground font-mono text-xs">{cls}</span>
        <span className={`${cls} ${/display|3xl|2xl/.test(cls) ? "font-semibold tracking-tight" : ""}`}>{sample}</span>
      </div>
    ))}
    <div className="grid grid-cols-[10rem_1fr] items-baseline gap-6 py-3">
      <span className="text-muted-foreground font-mono text-xs">font-mono</span>
      <span className="font-mono text-sm">const answer = await ask("policy?") // 0.94</span>
    </div>
  </div>
));
