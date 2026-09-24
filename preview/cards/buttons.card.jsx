// @dsCard group="Components" name="Buttons" subtitle="Stock shadcn Button: six variants, four sizes, the amber CTA, loading and disabled" viewport="1000x700"
const { Button, Spinner } = window.LeanWiseDesign_f2d907;

const VARIANTS = ["default", "secondary", "outline", "ghost", "link", "destructive"];

lwCard("Buttons", "Amber is a CTA — one per view: bg-cta text-cta-foreground on the stock Button.", (
  <>
    <section className="flex flex-col gap-3">
      <h2 className="text-sm font-semibold">Variants</h2>
      <div className="flex flex-wrap items-center gap-3">
        {VARIANTS.map((v) => <Button key={v} variant={v}>{v}</Button>)}
      </div>
    </section>
    <section className="flex flex-col gap-3">
      <h2 className="text-sm font-semibold">Call to action</h2>
      <div className="flex flex-wrap items-center gap-3">
        <Button size="lg" className="bg-cta text-cta-foreground hover:bg-cta/90">Start free trial</Button>
        <Button size="lg" variant="outline">Book a demo</Button>
      </div>
    </section>
    <section className="flex flex-col gap-3">
      <h2 className="text-sm font-semibold">Sizes and states</h2>
      <div className="flex flex-wrap items-center gap-3">
        <Button size="sm">Small</Button>
        <Button>Default</Button>
        <Button size="lg">Large</Button>
        <Button size="icon" variant="outline" aria-label="Add">+</Button>
        <Button disabled><Spinner />Saving</Button>
        <Button disabled variant="outline">Disabled</Button>
      </div>
    </section>
  </>
));
