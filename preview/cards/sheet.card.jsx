// @dsCard group="Components" name="Sheet" subtitle="Side sheet with a form; footer actions Cancel then Save, primary last" viewport="1200x720"
const {
  Button, Input, Label,
  Sheet, SheetTrigger, SheetContent, SheetHeader, SheetTitle, SheetDescription, SheetFooter, SheetClose,
} = window.LeanWiseDesign_f2d907;

lwCard("Sheet", "The stock Sheet from the right, rendered open.", (
  <Sheet open modal={false}>
    <SheetTrigger asChild><Button variant="outline" className="self-start">Edit source</Button></SheetTrigger>
    <SheetContent onOpenAutoFocus={(e) => e.preventDefault()}>
      <SheetHeader>
        <SheetTitle>Edit source</SheetTitle>
        <SheetDescription>Changes re-index the source on save.</SheetDescription>
      </SheetHeader>
      <div className="grid flex-1 auto-rows-min gap-6 px-4">
        <div className="grid gap-3">
          <Label htmlFor="sheet-name">Name</Label>
          <Input id="sheet-name" defaultValue="Contracts / 2024" />
        </div>
        <div className="grid gap-3">
          <Label htmlFor="sheet-path">Folder</Label>
          <Input id="sheet-path" defaultValue="/legal/contracts/2024" />
        </div>
      </div>
      <SheetFooter className="flex-row justify-end">
        <SheetClose asChild><Button variant="outline">Cancel</Button></SheetClose>
        <Button type="submit">Save changes</Button>
      </SheetFooter>
    </SheetContent>
  </Sheet>
));
