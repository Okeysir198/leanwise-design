// @dsCard group="Components" name="Alert dialog" subtitle="AlertDialog rendered open and modal — the one overlay that blocks the page" viewport="1000x640"
const {
  AlertDialog, AlertDialogContent, AlertDialogHeader, AlertDialogTitle, AlertDialogDescription,
  AlertDialogFooter, AlertDialogCancel, AlertDialogAction, Button,
} = window.LeanWiseDesign_f2d907;

lwCard("Alert dialog", "Reserved for destructive or irreversible steps; the safe choice is the default focus.", (
  <>
    <Button variant="destructive" className="self-start">Delete source</Button>
    <AlertDialog open>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Delete this source?</AlertDialogTitle>
          <AlertDialogDescription>1,284 documents and every answer that cites them go with it. This cannot be undone.</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Keep source</AlertDialogCancel>
          <AlertDialogAction variant="destructive">Delete</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  </>
));
