// @dsCard group="Components" name="Accordion & Collapsible" subtitle="Single-open Accordion and a Collapsible list, both expanded" viewport="1200x640"
const {
  Button, Accordion, AccordionItem, AccordionTrigger, AccordionContent,
  Collapsible, CollapsibleTrigger, CollapsibleContent, ChevronsUpDownIcon,
} = window.LeanWiseDesign_f2d907;

lwCard("Accordion & Collapsible", "Accordion for a set of sections; Collapsible for one show-more region.", (
  <div className="grid gap-12 md:grid-cols-2">
    <Accordion type="single" collapsible defaultValue="cite" className="w-full">
      <AccordionItem value="cite">
        <AccordionTrigger>How are answers cited?</AccordionTrigger>
        <AccordionContent>Every sentence links to the paragraph it rests on. No citation, no answer.</AccordionContent>
      </AccordionItem>
      <AccordionItem value="perm">
        <AccordionTrigger>Who can see an answer?</AccordionTrigger>
        <AccordionContent>Only people who can already open every source it draws on.</AccordionContent>
      </AccordionItem>
      <AccordionItem value="eval">
        <AccordionTrigger>How is quality measured?</AccordionTrigger>
        <AccordionContent>Evaluations run nightly against your own question sets.</AccordionContent>
      </AccordionItem>
    </Accordion>
    <Collapsible defaultOpen className="flex w-full max-w-sm flex-col gap-2">
      <div className="flex items-center justify-between gap-4 px-4">
        <h2 className="text-sm font-semibold">3 sources syncing</h2>
        <CollapsibleTrigger asChild>
          <Button variant="ghost" size="icon" className="size-8" aria-label="Toggle sources"><ChevronsUpDownIcon /></Button>
        </CollapsibleTrigger>
      </div>
      <div className="rounded-md border px-4 py-2 font-mono text-sm">Contracts / 2024</div>
      <CollapsibleContent className="flex flex-col gap-2">
        <div className="rounded-md border px-4 py-2 font-mono text-sm">Support transcripts</div>
        <div className="rounded-md border px-4 py-2 font-mono text-sm">Policies</div>
      </CollapsibleContent>
    </Collapsible>
  </div>
));
