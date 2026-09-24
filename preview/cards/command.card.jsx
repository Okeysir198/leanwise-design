// @dsCard group="Components" name="Command palette" subtitle="CommandDialog opened by ⌘K — groups, shortcuts and an empty state" viewport="1200x720"
const {
  Button, Kbd, KbdGroup,
  CommandDialog, CommandInput, CommandList, CommandEmpty, CommandGroup, CommandItem, CommandShortcut,
  SearchIcon, FileTextIcon, PlusIcon, UserIcon, CreditCardIcon, SettingsIcon,
} = window.LeanWiseDesign_f2d907;

lwCard("Command palette", "The stock CommandDialog, rendered open. The trigger shows its shortcut with Kbd.", (
  <div className="flex flex-col gap-6">
    <Button variant="outline" className="text-muted-foreground w-72 justify-start">
      <SearchIcon />Search sources and actions…
      <KbdGroup className="ml-auto"><Kbd>⌘</Kbd><Kbd>K</Kbd></KbdGroup>
    </Button>
    <CommandDialog open modal={false}>
      <CommandInput placeholder="Type a command or search…" />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        <CommandGroup heading="Sources">
          <CommandItem><FileTextIcon />Contracts / 2024</CommandItem>
          <CommandItem><FileTextIcon />Support transcripts</CommandItem>
          <CommandItem><PlusIcon />Add a source</CommandItem>
        </CommandGroup>
        <CommandGroup heading="Settings">
          <CommandItem><UserIcon />Profile<CommandShortcut>⌘P</CommandShortcut></CommandItem>
          <CommandItem><CreditCardIcon />Billing<CommandShortcut>⌘B</CommandShortcut></CommandItem>
          <CommandItem><SettingsIcon />Settings<CommandShortcut>⌘S</CommandShortcut></CommandItem>
        </CommandGroup>
      </CommandList>
    </CommandDialog>
  </div>
));
