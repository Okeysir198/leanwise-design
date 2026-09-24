// @dsCard group="Foundations" name="Colors" subtitle="shadcn roles, LeanWise roles and the brand ramp — toggle Dark to see every role re-point" viewport="1120x1180"
const { Card, CardContent } = window.LeanWiseDesign_f2d907;

const GROUPS = [
  ["Surfaces", ["background", "foreground", "card", "popover", "muted", "muted-foreground", "border", "input"]],
  ["Brand", ["primary", "primary-foreground", "secondary", "accent", "ring", "navy", "cta", "cta-foreground"]],
  ["Status", ["success", "warning", "info", "destructive", "info-soft", "info-border", "destructive-soft", "destructive-border"]],
  ["Sidebar", ["sidebar", "sidebar-foreground", "sidebar-primary", "sidebar-accent", "sidebar-border"]],
];
const RAMP = ["50", "100", "200", "300", "400", "500", "600", "700", "800", "900"];

function Swatch({ name }) {
  return (
    <div className="flex flex-col gap-1.5">
      <div className="h-14 rounded-md border" style={{ background: `var(--${name})` }} />
      <span className="font-mono text-xs">--{name}</span>
    </div>
  );
}

lwCard("Colors", "Every colour is a CSS variable from theme.css; a component names the role, never the value.", (
  <>
    {GROUPS.map(([title, names]) => (
      <section key={title} className="flex flex-col gap-3">
        <h2 className="text-sm font-semibold">{title}</h2>
        <div className="grid grid-cols-4 gap-4 md:grid-cols-8">
          {names.map((n) => <Swatch key={n} name={n} />)}
        </div>
      </section>
    ))}
    <section className="flex flex-col gap-3">
      <h2 className="text-sm font-semibold">Brand ramp</h2>
      <Card className="py-4">
        <CardContent className="grid grid-cols-10 gap-2">
          {RAMP.map((s) => (
            <div key={s} className="flex flex-col gap-1.5">
              <div className="h-12 rounded-md" style={{ background: `var(--brand-${s})` }} />
              <span className="font-mono text-xs">{s}</span>
            </div>
          ))}
        </CardContent>
      </Card>
    </section>
  </>
));
