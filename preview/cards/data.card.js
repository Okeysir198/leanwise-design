/* GENERATED from data.card.jsx by scripts/lib/card-build.mjs — do not edit. */
(() => {
  const {
    Table,
    TableHeader,
    TableBody,
    TableRow,
    TableHead,
    TableCell,
    Badge,
    Progress,
    Skeleton,
    Avatar,
    AvatarFallback,
    Button,
    Checkbox,
    Input,
    ToggleGroup,
    ToggleGroupItem,
    DropdownMenu,
    DropdownMenuTrigger,
    DropdownMenuContent,
    DropdownMenuLabel,
    DropdownMenuItem,
    DropdownMenuSeparator,
    Empty,
    EmptyHeader,
    EmptyTitle,
    EmptyDescription,
    useReactTable,
    getCoreRowModel,
    getSortedRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    flexRender,
    ArrowUpDownIcon,
    MoreHorizontalIcon
  } = window.LeanWiseDesign_f2d907;
  const DATA = [
    { id: "s1", source: "Contracts / 2024", owner: "RO", docs: 1284, hit: 94, status: "Live" },
    { id: "s2", source: "Policy handbook", owner: "JT", docs: 312, hit: 88, status: "Live" },
    { id: "s3", source: "Contracts / 2023", owner: "RO", docs: 1109, hit: 86, status: "Syncing" },
    { id: "s4", source: "Support transcripts", owner: "ML", docs: 9015, hit: 71, status: "Stale" },
    { id: "s5", source: "HR procedures", owner: "JT", docs: 204, hit: 90, status: "Live" },
    { id: "s6", source: "Legacy wiki", owner: "ML", docs: 476, hit: 0, status: "Failed" },
    { id: "s7", source: "Sales playbooks", owner: "RO", docs: 88, hit: 79, status: "Live" }
  ];
  const STATUS = {
    Live: "border-transparent bg-success text-success-foreground",
    Syncing: "border-transparent bg-info-soft text-info-soft-foreground",
    Stale: "border-transparent bg-warning text-warning-foreground",
    Failed: "border-transparent bg-destructive-soft text-destructive-soft-foreground"
  };
  const columns = [
    {
      id: "select",
      header: ({ table }) => /* @__PURE__ */ React.createElement(
        Checkbox,
        {
          checked: table.getIsAllPageRowsSelected() || table.getIsSomePageRowsSelected() && "indeterminate",
          onCheckedChange: (value) => table.toggleAllPageRowsSelected(!!value),
          "aria-label": "Select all"
        }
      ),
      cell: ({ row }) => /* @__PURE__ */ React.createElement(Checkbox, { checked: row.getIsSelected(), onCheckedChange: (value) => row.toggleSelected(!!value), "aria-label": `Select ${row.original.source}` }),
      enableSorting: false
    },
    {
      accessorKey: "source",
      header: ({ column }) => /* @__PURE__ */ React.createElement(Button, { variant: "ghost", onClick: () => column.toggleSorting(column.getIsSorted() === "asc") }, "Source", /* @__PURE__ */ React.createElement(ArrowUpDownIcon, null)),
      cell: ({ row }) => /* @__PURE__ */ React.createElement("div", { className: "font-medium" }, row.getValue("source"))
    },
    {
      accessorKey: "owner",
      header: "Owner",
      cell: ({ row }) => /* @__PURE__ */ React.createElement(Avatar, { className: "size-7" }, /* @__PURE__ */ React.createElement(AvatarFallback, { className: "text-xs" }, row.getValue("owner")))
    },
    {
      accessorKey: "docs",
      header: () => /* @__PURE__ */ React.createElement("div", { className: "text-right" }, "Docs"),
      cell: ({ row }) => /* @__PURE__ */ React.createElement("div", { className: "text-right tabular-nums" }, row.getValue("docs").toLocaleString("en-US"))
    },
    {
      accessorKey: "hit",
      header: "Hit rate",
      cell: ({ row }) => /* @__PURE__ */ React.createElement("div", { className: "flex w-40 items-center gap-2" }, /* @__PURE__ */ React.createElement(Progress, { value: row.getValue("hit"), className: "h-1.5", "aria-label": `${row.original.source} hit rate` }), /* @__PURE__ */ React.createElement("span", { className: "w-9 text-right text-xs tabular-nums" }, row.getValue("hit"), "%"))
    },
    {
      accessorKey: "status",
      header: "Status",
      filterFn: (row, id, value) => value === "all" || row.getValue(id) === value,
      cell: ({ row }) => /* @__PURE__ */ React.createElement(Badge, { className: STATUS[row.getValue("status")] }, row.getValue("status"))
    },
    {
      id: "actions",
      enableHiding: false,
      cell: ({ row }) => /* @__PURE__ */ React.createElement(DropdownMenu, null, /* @__PURE__ */ React.createElement(DropdownMenuTrigger, { asChild: true }, /* @__PURE__ */ React.createElement(Button, { variant: "ghost", className: "size-8 p-0" }, /* @__PURE__ */ React.createElement("span", { className: "sr-only" }, "Open menu for ", row.original.source), /* @__PURE__ */ React.createElement(MoreHorizontalIcon, null))), /* @__PURE__ */ React.createElement(DropdownMenuContent, { align: "end" }, /* @__PURE__ */ React.createElement(DropdownMenuLabel, null, "Actions"), /* @__PURE__ */ React.createElement(DropdownMenuItem, null, "Re-index now"), /* @__PURE__ */ React.createElement(DropdownMenuItem, null, "Copy source ID"), /* @__PURE__ */ React.createElement(DropdownMenuSeparator, null), /* @__PURE__ */ React.createElement(DropdownMenuItem, { variant: "destructive" }, "Remove source")))
    }
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
      state: { sorting, columnFilters, rowSelection }
    });
    const status = table.getColumn("status").getFilterValue() ?? "all";
    return /* @__PURE__ */ React.createElement("div", { className: "flex flex-col gap-4" }, /* @__PURE__ */ React.createElement("div", { className: "flex items-center gap-3" }, /* @__PURE__ */ React.createElement(
      Input,
      {
        placeholder: "Filter sources\u2026",
        "aria-label": "Filter sources",
        value: table.getColumn("source").getFilterValue() ?? "",
        onChange: (e) => table.getColumn("source").setFilterValue(e.target.value),
        className: "max-w-xs"
      }
    ), /* @__PURE__ */ React.createElement(
      ToggleGroup,
      {
        type: "single",
        variant: "outline",
        size: "sm",
        value: status,
        "aria-label": "Status",
        onValueChange: (v) => table.getColumn("status").setFilterValue(v || "all")
      },
      ["all", "Live", "Stale", "Failed", "Archived"].map((s) => /* @__PURE__ */ React.createElement(ToggleGroupItem, { key: s, value: s }, s === "all" ? "All" : s))
    )), /* @__PURE__ */ React.createElement("div", { className: "overflow-hidden rounded-md border" }, /* @__PURE__ */ React.createElement(Table, null, /* @__PURE__ */ React.createElement(TableHeader, null, table.getHeaderGroups().map((hg) => /* @__PURE__ */ React.createElement(TableRow, { key: hg.id }, hg.headers.map((h) => /* @__PURE__ */ React.createElement(TableHead, { key: h.id }, h.isPlaceholder ? null : flexRender(h.column.columnDef.header, h.getContext())))))), /* @__PURE__ */ React.createElement(TableBody, null, table.getRowModel().rows.length ? table.getRowModel().rows.map((row) => /* @__PURE__ */ React.createElement(TableRow, { key: row.id, "data-state": row.getIsSelected() && "selected" }, row.getVisibleCells().map((cell) => /* @__PURE__ */ React.createElement(TableCell, { key: cell.id }, flexRender(cell.column.columnDef.cell, cell.getContext()))))) : /* @__PURE__ */ React.createElement(TableRow, null, /* @__PURE__ */ React.createElement(TableCell, { colSpan: columns.length, className: "p-0" }, /* @__PURE__ */ React.createElement(Empty, null, /* @__PURE__ */ React.createElement(EmptyHeader, null, /* @__PURE__ */ React.createElement(EmptyTitle, null, "No results"), /* @__PURE__ */ React.createElement(EmptyDescription, null, "No sources match that filter.")))))))), /* @__PURE__ */ React.createElement("div", { className: "flex items-center justify-end gap-2" }, /* @__PURE__ */ React.createElement("div", { className: "text-muted-foreground flex-1 text-sm" }, table.getFilteredSelectedRowModel().rows.length, " of ", table.getFilteredRowModel().rows.length, " row(s) selected."), /* @__PURE__ */ React.createElement(Button, { variant: "outline", size: "sm", onClick: () => table.previousPage(), disabled: !table.getCanPreviousPage() }, "Previous"), /* @__PURE__ */ React.createElement(Button, { variant: "outline", size: "sm", onClick: () => table.nextPage(), disabled: !table.getCanNextPage() }, "Next")));
  }
  lwCard("Data", "Numbers right-aligned and tabular; status is a Badge carrying a role colour, never a raw hue.", /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement(DataTable, null), /* @__PURE__ */ React.createElement("div", { className: "flex flex-col gap-3", role: "status", "aria-busy": "true", "aria-label": "Loading" }, /* @__PURE__ */ React.createElement(Skeleton, { className: "h-5 w-1/3" }), /* @__PURE__ */ React.createElement(Skeleton, { className: "h-10 w-full" }), /* @__PURE__ */ React.createElement(Skeleton, { className: "h-10 w-full" }))));
})();
