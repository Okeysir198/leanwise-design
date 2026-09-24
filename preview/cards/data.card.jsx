// @dsCard group="Components" name="Data" subtitle="Table with status badges, Progress, Skeleton and Avatar" viewport="1000x760"
const {
  Table, TableHeader, TableBody, TableRow, TableHead, TableCell, TableCaption,
  Badge, Progress, Skeleton, Avatar, AvatarFallback,
} = window.LeanWiseDesign_f2d907;

const ROWS = [
  ["Contracts / 2024", "RO", "1,284", 94, "Live"],
  ["Policy handbook", "JT", "312", 88, "Live"],
  ["Support transcripts", "ML", "9,015", 71, "Stale"],
  ["Legacy wiki", "RO", "476", 0, "Failed"],
];
const STATUS = {
  Live: "border-transparent bg-success text-success-foreground",
  Stale: "border-transparent bg-warning text-warning-foreground",
  Failed: "border-transparent bg-destructive-soft text-destructive-soft-foreground",
};

lwCard("Data", "Numbers right-aligned and tabular; status is a Badge carrying a role colour, never a raw hue.", (
  <>
    <div className="rounded-lg border">
      <Table>
        <TableCaption className="pb-3">Sources in this workspace</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="pl-4">Source</TableHead>
            <TableHead>Owner</TableHead>
            <TableHead className="text-right">Docs</TableHead>
            <TableHead className="w-48">Hit rate</TableHead>
            <TableHead className="pr-4">Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {ROWS.map(([src, owner, docs, hit, st]) => (
            <TableRow key={src}>
              <TableCell className="pl-4 font-medium">{src}</TableCell>
              <TableCell><Avatar className="size-7"><AvatarFallback className="text-xs">{owner}</AvatarFallback></Avatar></TableCell>
              <TableCell className="text-right tabular-nums">{docs}</TableCell>
              <TableCell>
                <div className="flex items-center gap-2">
                  <Progress value={hit} className="h-1.5" aria-label={`${src} hit rate`} />
                  <span className="w-9 text-right text-xs tabular-nums">{hit}%</span>
                </div>
              </TableCell>
              <TableCell className="pr-4"><Badge className={STATUS[st]}>{st}</Badge></TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
    <div className="flex flex-col gap-3" aria-busy="true" aria-label="Loading">
      <Skeleton className="h-5 w-1/3" />
      <Skeleton className="h-10 w-full" />
      <Skeleton className="h-10 w-full" />
    </div>
  </>
));
