// @dsCard group="Components" name="Overlays" subtitle="DropdownMenu, ContextMenu, Popover, HoverCard, Tooltip and Dialog — rendered open" viewport="1200x820"
const {
  Button, Input, Label,
  DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuLabel, DropdownMenuItem,
  DropdownMenuSeparator, DropdownMenuShortcut,
  Popover, PopoverTrigger, PopoverContent,
  Tooltip, TooltipTrigger, TooltipContent, TooltipProvider,
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter,
  HoverCard, HoverCardTrigger, HoverCardContent,
  ContextMenu, ContextMenuTrigger, ContextMenuContent, ContextMenuItem, ContextMenuSeparator, ContextMenuShortcut,
} = window.LeanWiseDesign_f2d907;

/* Non-modal so every surface stays open at once; pinned instead of centred. */
/* A context menu has no `open` prop: fire the right-click it listens for once mounted. */
function RightClicked({ children }) {
  const ref = React.useRef(null);
  React.useEffect(() => {
    const t = ref.current.querySelector('[data-slot="context-menu-trigger"]');
    const r = t.getBoundingClientRect();
    t.dispatchEvent(new MouseEvent("contextmenu", { bubbles: true, clientX: r.left + 24, clientY: r.top + 24 }));
  }, []);
  return <div ref={ref}>{children}</div>;
}

const PIN = "top-auto left-auto translate-x-0 translate-y-0 max-w-sm";

lwCard("Overlays", "Every surface paints on --popover; the dialogs are shown non-modal so every surface fits one frame.", (
  <div className="flex flex-col gap-40">
    <div className="flex gap-56">
      <DropdownMenu open modal={false}>
        <DropdownMenuTrigger asChild><Button variant="outline">Actions</Button></DropdownMenuTrigger>
        <DropdownMenuContent align="start" className="w-48">
          <DropdownMenuLabel>Source</DropdownMenuLabel>
          <DropdownMenuItem>Re-index<DropdownMenuShortcut>⌘R</DropdownMenuShortcut></DropdownMenuItem>
          <DropdownMenuItem>Rename</DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem variant="destructive">Delete</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <Popover open>
        <PopoverTrigger asChild><Button variant="outline">Share</Button></PopoverTrigger>
        <PopoverContent align="start" aria-label="Share link" onOpenAutoFocus={(e) => e.preventDefault()}>
          <div className="flex flex-col gap-2">
            <Label htmlFor="p-link">Link</Label>
            <Input id="p-link" readOnly defaultValue="lw.ai/s/8f2k" />
          </div>
        </PopoverContent>
      </Popover>
    </div>
    <div className="flex gap-56">
      <HoverCard open>
        <HoverCardTrigger asChild><a href="#okafor" className="self-start text-sm font-medium underline underline-offset-4">@rokafor</a></HoverCardTrigger>
        <HoverCardContent align="start" className="w-64">
          <div className="flex flex-col gap-1">
            <span className="text-sm font-semibold">R. Okafor</span>
            <span className="text-muted-foreground text-sm">Legal ops · owns Contracts / 2024</span>
          </div>
        </HoverCardContent>
      </HoverCard>
      <RightClicked>
        <ContextMenu modal={false}>
          <ContextMenuTrigger className="text-muted-foreground flex h-24 w-56 items-center justify-center rounded-md border border-dashed text-sm">Right-click a source</ContextMenuTrigger>
          <ContextMenuContent className="w-48">
            <ContextMenuItem>Open<ContextMenuShortcut>⌘O</ContextMenuShortcut></ContextMenuItem>
            <ContextMenuItem>Re-index</ContextMenuItem>
            <ContextMenuSeparator />
            <ContextMenuItem variant="destructive">Remove</ContextMenuItem>
          </ContextMenuContent>
        </ContextMenu>
      </RightClicked>
    </div>
    <TooltipProvider>
    <Tooltip open>
      <TooltipTrigger asChild><Button variant="ghost" className="self-start">Hover target</Button></TooltipTrigger>
      <TooltipContent side="right">Tooltips name, never explain</TooltipContent>
    </Tooltip>
    </TooltipProvider>
    <Dialog open modal={false}>
      <DialogContent className={`${PIN} top-32 right-8`} onOpenAutoFocus={(e) => e.preventDefault()}>
        <DialogHeader>
          <DialogTitle>Invite members</DialogTitle>
          <DialogDescription>They join as viewers; change roles later.</DialogDescription>
        </DialogHeader>
        <Input placeholder="name@company.com" aria-label="Email" />
        <DialogFooter><Button variant="outline">Cancel</Button><Button>Send invite</Button></DialogFooter>
      </DialogContent>
    </Dialog>
  </div>
));
