// @dsCard group="Components" name="Overlays" subtitle="DropdownMenu, Popover, Tooltip and Dialog — rendered open" viewport="1200x820"
const {
  Button, Input, Label,
  DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuLabel, DropdownMenuItem,
  DropdownMenuSeparator, DropdownMenuShortcut,
  Popover, PopoverTrigger, PopoverContent,
  Tooltip, TooltipTrigger, TooltipContent, TooltipProvider,
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter,
} = window.LeanWiseDesign_f2d907;

/* Non-modal so every surface stays open at once; pinned instead of centred. */
const PIN = "top-auto left-auto translate-x-0 translate-y-0 max-w-sm";

lwCard("Overlays", "Every surface paints on --popover; the dialogs are shown non-modal so all four fit one frame.", (
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
        <PopoverContent align="start" onOpenAutoFocus={(e) => e.preventDefault()}>
          <div className="flex flex-col gap-2">
            <Label htmlFor="p-link">Link</Label>
            <Input id="p-link" readOnly defaultValue="lw.ai/s/8f2k" />
          </div>
        </PopoverContent>
      </Popover>
    </div>
    <TooltipProvider>
    <Tooltip open>
      <TooltipTrigger asChild><Button variant="ghost" className="self-start">Hover target</Button></TooltipTrigger>
      <TooltipContent side="right">Tooltips name, never explain</TooltipContent>
    </Tooltip>
    </TooltipProvider>
    <Dialog open modal={false}>
      <DialogContent className={`${PIN} top-8 right-8`} onOpenAutoFocus={(e) => e.preventDefault()}>
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
