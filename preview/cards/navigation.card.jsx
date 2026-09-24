// @dsCard group="Components" name="Navigation" subtitle="Breadcrumb, Tabs (both list variants) and Pagination — stock shadcn" viewport="1000x640"
const {
  Breadcrumb, BreadcrumbList, BreadcrumbItem, BreadcrumbLink, BreadcrumbPage, BreadcrumbSeparator, BreadcrumbEllipsis,
  Tabs, TabsList, TabsTrigger, TabsContent, Separator,
  Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationPrevious, PaginationNext, PaginationEllipsis,
} = window.LeanWiseDesign_f2d907;

lwCard("Navigation", "Breadcrumb says where you are, Tabs switch views of one object, Pagination moves through a list.", (
  <>
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem><BreadcrumbLink href="#">Workspace</BreadcrumbLink></BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem><BreadcrumbEllipsis /></BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem><BreadcrumbLink href="#">Sources</BreadcrumbLink></BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem><BreadcrumbPage>Contracts / 2024</BreadcrumbPage></BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
    <Separator />
    <Tabs defaultValue="overview">
      <TabsList>
        <TabsTrigger value="overview">Overview</TabsTrigger>
        <TabsTrigger value="documents">Documents</TabsTrigger>
        <TabsTrigger value="settings">Settings</TabsTrigger>
        <TabsTrigger value="audit" disabled>Audit</TabsTrigger>
      </TabsList>
      <TabsContent value="overview" className="text-muted-foreground pt-2 text-sm">1,284 documents · last synced 4 minutes ago.</TabsContent>
      <TabsContent value="documents" className="pt-2 text-sm">Documents</TabsContent>
      <TabsContent value="settings" className="pt-2 text-sm">Settings</TabsContent>
    </Tabs>
    <Tabs defaultValue="week">
      <TabsList variant="line">
        <TabsTrigger value="day">Day</TabsTrigger>
        <TabsTrigger value="week">Week</TabsTrigger>
        <TabsTrigger value="month">Month</TabsTrigger>
      </TabsList>
      <TabsContent value="day" className="pt-2 text-sm">Today</TabsContent>
      <TabsContent value="week" className="pt-2 text-sm">This week</TabsContent>
      <TabsContent value="month" className="pt-2 text-sm">This month</TabsContent>
    </Tabs>
    <Pagination>
      <PaginationContent>
        <PaginationItem><PaginationPrevious href="#" /></PaginationItem>
        <PaginationItem><PaginationLink href="#">1</PaginationLink></PaginationItem>
        <PaginationItem><PaginationLink href="#" isActive>2</PaginationLink></PaginationItem>
        <PaginationItem><PaginationLink href="#">3</PaginationLink></PaginationItem>
        <PaginationItem><PaginationEllipsis /></PaginationItem>
        <PaginationItem><PaginationNext href="#" /></PaginationItem>
      </PaginationContent>
    </Pagination>
  </>
));
