// @dsCard group="Components" name="Input group, Button group, Kbd, Item" subtitle="Addons around an input, joined buttons, key hints and list rows with actions" viewport="1200x760"
const {
  Button, Kbd, KbdGroup,
  InputGroup, InputGroupAddon, InputGroupInput, InputGroupText, InputGroupButton, InputGroupTextarea,
  ButtonGroup, ButtonGroupSeparator,
  Item, ItemGroup, ItemMedia, ItemContent, ItemTitle, ItemDescription, ItemActions,
  SearchIcon, CopyIcon, ArrowUpIcon, ChevronsUpDownIcon, PlusIcon, MoreHorizontalIcon, FileTextIcon, BadgeCheckIcon, ChevronRightIcon,
} = window.LeanWiseDesign_f2d907;

const Section = ({ title, children }) => (
  <section className="flex flex-col gap-3">
    <h2 className="text-muted-foreground text-sm font-medium">{title}</h2>
    {children}
  </section>
);

const Row = ({ title, meta }) => (
  <Item role="listitem">
    <ItemMedia variant="icon"><FileTextIcon /></ItemMedia>
    <ItemContent>
      <ItemTitle>{title}</ItemTitle>
      <ItemDescription>{meta}</ItemDescription>
    </ItemContent>
    <ItemActions>
      <Button variant="ghost" size="icon" aria-label={`More actions for ${title}`}><MoreHorizontalIcon /></Button>
      <Button variant="outline" size="sm">Re-index</Button>
    </ItemActions>
  </Item>
);

lwCard("Input group, Button group, Kbd, Item", "Four stock primitives for composing controls and rows.", (
  <div className="grid gap-10 md:grid-cols-2">
    <div className="flex flex-col gap-10">
      <Section title="Input group">
        <InputGroup>
          <InputGroupInput placeholder="Search…" aria-label="Search" />
          <InputGroupAddon><SearchIcon /></InputGroupAddon>
          <InputGroupAddon align="inline-end">12 results</InputGroupAddon>
        </InputGroup>
        <InputGroup>
          <InputGroupAddon><InputGroupText>https://</InputGroupText></InputGroupAddon>
          <InputGroupInput defaultValue="lw.ai/s/8f2k" aria-label="Share link" />
          <InputGroupAddon align="inline-end">
            <InputGroupButton size="icon-xs" aria-label="Copy link"><CopyIcon /></InputGroupButton>
          </InputGroupAddon>
        </InputGroup>
        <InputGroup>
          <InputGroupTextarea placeholder="Ask about your documents…" aria-label="Question" />
          <InputGroupAddon align="block-end">
            <InputGroupText>Cited from 12 sources</InputGroupText>
            <InputGroupButton variant="default" size="icon-xs" className="ml-auto rounded-full" aria-label="Send"><ArrowUpIcon /></InputGroupButton>
          </InputGroupAddon>
        </InputGroup>
      </Section>
      <Section title="Button group">
        <div className="flex flex-wrap gap-4">
          <ButtonGroup>
            <Button variant="outline">Archive</Button>
            <Button variant="outline">Report</Button>
            <Button variant="outline">Snooze</Button>
          </ButtonGroup>
          <ButtonGroup>
            <Button>Publish</Button>
            <ButtonGroupSeparator />
            <Button size="icon" aria-label="More publish options"><ChevronsUpDownIcon /></Button>
          </ButtonGroup>
        </div>
      </Section>
      <Section title="Kbd">
        <p className="text-muted-foreground flex flex-wrap items-center gap-2 text-sm">
          Open the palette with <KbdGroup><Kbd>⌘</Kbd><Kbd>K</Kbd></KbdGroup>, submit with <Kbd>Enter</Kbd>, close with <Kbd>Esc</Kbd>.
        </p>
      </Section>
    </div>
    <Section title="Item">
      <ItemGroup className="divide-y rounded-lg border">
        <Row title="Contracts / 2024" meta="1,204 documents · synced 4 min ago" />
        <Row title="Support transcripts" meta="8,930 documents · stale" />
        <Item role="listitem">
          <ItemMedia variant="icon"><PlusIcon /></ItemMedia>
          <ItemContent>
            <ItemTitle>Add a source</ItemTitle>
            <ItemDescription>SharePoint, Drive, Confluence or upload.</ItemDescription>
          </ItemContent>
          <ItemActions><Button size="sm">Connect</Button></ItemActions>
        </Item>
      </ItemGroup>
      <Item variant="outline" size="sm" asChild>
        <a href="#verified">
          <ItemMedia><BadgeCheckIcon className="size-5" /></ItemMedia>
          <ItemContent><ItemTitle>Your workspace is verified.</ItemTitle></ItemContent>
          <ItemActions><ChevronRightIcon className="size-4" /></ItemActions>
        </a>
      </Item>
    </Section>
  </div>
));
