// @dsCard group="Components" name="Navigation" subtitle="Tabs (both list variants), Separator and Avatar in a page header" viewport="1000x640"
const {
  Tabs, TabsList, TabsTrigger, TabsContent, Separator,
  Avatar, AvatarFallback, AvatarGroup, Button,
} = window.LeanWiseDesign_f2d907;

lwCard("Navigation", "Tabs switch views of one object; the sidebar (see Blocks) switches objects.", (
  <>
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-3 text-sm">
        <a href="#" className="text-muted-foreground hover:text-foreground">Workspace</a>
        <span className="text-muted-foreground" aria-hidden>/</span>
        <span className="font-medium">Sources</span>
      </div>
      <AvatarGroup>
        <Avatar><AvatarFallback>RO</AvatarFallback></Avatar>
        <Avatar><AvatarFallback>JT</AvatarFallback></Avatar>
        <Avatar><AvatarFallback>ML</AvatarFallback></Avatar>
      </AvatarGroup>
    </div>
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
    <div className="flex items-center gap-2">
      <Button variant="outline" size="sm">Previous</Button>
      <Button variant="outline" size="sm" aria-current="page" className="bg-accent">1</Button>
      <Button variant="ghost" size="sm">2</Button>
      <Button variant="ghost" size="sm">3</Button>
      <Button variant="outline" size="sm">Next</Button>
    </div>
  </>
));
