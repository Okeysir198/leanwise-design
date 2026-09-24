// @dsCard group="Components" name="Data" subtitle="Data table (TanStack): selection, sorting, row actions, status filter, pagination and Empty — plus Progress, Skeleton and Avatar" viewport="1100x1000"
const {
  Table, TableHeader, TableBody, TableRow, TableHead, TableCell,
  Badge, Progress, Skeleton, Avatar, AvatarFallback, Button, Checkbox, Input,
  ToggleGroup, ToggleGroupItem,
  DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuLabel, DropdownMenuItem, DropdownMenuSeparator,
  Empty, EmptyHeader, EmptyTitle, EmptyDescription,
  useReactTable, getCoreRowModel, getSortedRowModel, getFilteredRowModel, getPaginationRowModel, flexRender,
  ArrowUpDownIcon, MoreHorizontalIcon,
} = window.LeanWiseDesign_f2d907;

const DATA = [
  { id: "s1", source: "Contracts / 2024", owner: "RO", docs: 1284, hit: 94, status: "Live" },
  { id: "s2", source: "Policy handbook", owner: "JT", docs: 312, hit: 88, status: "Live" },
  { id: "s3", source: "Contracts / 2023", owner: "RO", docs: 1109, hit: 86, status: "Syncing" },
  { id: "s4", source: "Support transcripts", owner: "ML", docs: 9015, hit: 71, status: "Stale" },
  { id: "s5", source: "HR procedures", owner: "JT", docs: 204, hit: 90, status: "Live" },
  { id: "s6", source: "Legacy wiki", owner: "ML", docs: 476, hit: 0, status: "Failed" },
  { id: "s7", source: "Sales playbooks", owner: "RO", docs: 88, hit: 79, status: "Live" },
];
const STATUS = {
  Live: "border-transparent bg-success text-success-foreground",
  Syncing: "border-transparent bg-info-soft text-info-soft-foreground",
  Stale: "border-transparent bg-warning text-warning-foreground",
  Failed: "border-transparent bg-destructive-soft text-destructive-soft-foreground",
};

const columns = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={table.getIsAllPageRowsSelected() || (table.getIsSomePageRowsSelected() && "indeterminate")}
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox checked={row.getIsSelected()} onCheckedChange={(value) => row.toggleSelected(!!value)} aria-label={`Select ${row.original.source}`} />
    ),
    enableSorting: false,
  },
  {
    accessorKey: "source",
    header: ({ column }) => (
      <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
        Source<ArrowUpDownIcon />
      </Button>
    ),
    cell: ({ row }) => <div className="font-medium">{row.getValue("source")}</div>,
  },
  {
    accessorKey: "owner",
    header: "Owner",
    cell: ({ row }) => <Avatar className="size-7"><AvatarFallback className="text-xs">{row.getValue("owner")}</AvatarFallback></Avatar>,
  },
  {
    accessorKey: "docs",
    header: () => <div className="text-right">Docs</div>,
    cell: ({ row }) => <div className="text-right tabular-nums">{row.getValue("docs").toLocaleString("en-US")}</div>,
  },
  {
    accessorKey: "hit",
    header: "Hit rate",
    cell: ({ row }) => (
      <div className="flex w-40 items-center gap-2">
        <Progress value={row.getValue("hit")} className="h-1.5" aria-label={`${row.original.source} hit rate`} />
        <span className="w-9 text-right text-xs tabular-nums">{row.getValue("hit")}%</span>
      </div>
    ),
  },
  {
    accessorKey: "status",
    header: "Status",
    filterFn: (row, id, value) => value === "all" || row.getValue(id) === value,
    cell: ({ row }) => <Badge className={STATUS[row.getValue("status")]}>{row.getValue("status")}</Badge>,
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="size-8 p-0">
            <span className="sr-only">Open menu for {row.original.source}</span>
            <MoreHorizontalIcon />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Actions</DropdownMenuLabel>
          <DropdownMenuItem>Re-index now</DropdownMenuItem>
          <DropdownMenuItem>Copy source ID</DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem variant="destructive">Remove source</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    ),
  },
];

function DataTable() {
  const [sorting, setSorting] = React.useState([]);
  const [columnFilters, setColumnFilters] = React.useState([]);
  const [rowSelection, setRowSelection] = React.useState({ s1: true });
  const table = useReactTable({
    data: DATA,
    columns,
    getRowId: (r) => r.id,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onRowSelectionChange: setRowSelection,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    initialState: { pagination: { pageSize: 5 } },
    state: { sorting, columnFilters, rowSelection },
  });
  const status = table.getColumn("status").getFilterValue() ?? "all";

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-3">
        <Input
          placeholder="Filter sources…"
          aria-label="Filter sources"
          value={table.getColumn("source").getFilterValue() ?? ""}
          onChange={(e) => table.getColumn("source").setFilterValue(e.target.value)}
          className="max-w-xs"
        />
        <ToggleGroup type="single" variant="outline" size="sm" value={status} aria-label="Status"
          onValueChange={(v) => table.getColumn("status").setFilterValue(v || "all")}>
          {["all", "Live", "Stale", "Failed", "Archived"].map((s) => (
            <ToggleGroupItem key={s} value={s}>{s === "all" ? "All" : s}</ToggleGroupItem>
          ))}
        </ToggleGroup>
      </div>
      <div className="overflow-hidden rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((hg) => (
              <TableRow key={hg.id}>
                {hg.headers.map((h) => (
                  <TableHead key={h.id}>{h.isPlaceholder ? null : flexRender(h.column.columnDef.header, h.getContext())}</TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id} data-state={row.getIsSelected() && "selected"}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="p-0">
                  <Empty>
                    <EmptyHeader>
                      <EmptyTitle>No results</EmptyTitle>
                      <EmptyDescription>No sources match that filter.</EmptyDescription>
                    </EmptyHeader>
                  </Empty>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-end gap-2">
        <div className="text-muted-foreground flex-1 text-sm">
          {table.getFilteredSelectedRowModel().rows.length} of {table.getFilteredRowModel().rows.length} row(s) selected.
        </div>
        <Button variant="outline" size="sm" onClick={() => table.previousPage()} disabled={!table.getCanPreviousPage()}>Previous</Button>
        <Button variant="outline" size="sm" onClick={() => table.nextPage()} disabled={!table.getCanNextPage()}>Next</Button>
      </div>
    </div>
  );
}

lwCard("Data", "Numbers right-aligned and tabular; status is a Badge carrying a role colour, never a raw hue.", (
  <>
    <DataTable />
    <div className="flex flex-col gap-3" role="status" aria-busy="true" aria-label="Loading">
      <Skeleton className="h-5 w-1/3" />
      <Skeleton className="h-10 w-full" />
      <Skeleton className="h-10 w-full" />
    </div>
  </>
));
