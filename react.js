/**
 * The React entry point — `import { Button, Field } from "@leanwise/design/react"`.
 *
 * Re-export only. Every component is a thin wrapper over the .lw-* CSS in
 * base.css / marketing.css / product.css, so importing a component is NOT
 * enough: the consuming app must also import tokens.css and base.css plus the
 * layer it lives in (product.css for app surfaces, marketing.css for marketing
 * pages). A component with no stylesheet renders unstyled HTML,
 * by design — there is no styling inside the JS to fall back on.
 */

/* primitives */
export { Avatar } from "./components/primitives/Avatar.jsx";
export { Button } from "./components/primitives/Button.jsx";
export { Card, CardHead, CardTitle, CardBody, CardFoot } from "./components/primitives/Card.jsx";
export { Chip } from "./components/primitives/Chip.jsx";
export { Eyebrow } from "./components/primitives/Eyebrow.jsx";
export { Skeleton } from "./components/primitives/Skeleton.jsx";
export { Icon, iconNames } from "./components/primitives/Icon.jsx";
export { Disclosure } from "./components/primitives/Disclosure.jsx";
export { Prose } from "./components/primitives/Prose.jsx";

/* layout */
export { Page } from "./components/layout/Page.jsx";
export { Container } from "./components/layout/Container.jsx";
export { Stack } from "./components/layout/Stack.jsx";
export { Cluster } from "./components/layout/Cluster.jsx";
export { Grid } from "./components/layout/Grid.jsx";
export { Split } from "./components/layout/Split.jsx";
export { Section } from "./components/layout/Section.jsx";

/* forms */
export { Field } from "./components/forms/Field.jsx";
export { Input } from "./components/forms/Input.jsx";
export { InputGroup } from "./components/forms/InputGroup.jsx";
export { Textarea } from "./components/forms/Textarea.jsx";
export { Select } from "./components/forms/Select.jsx";
export { Switch } from "./components/forms/Switch.jsx";
export { Checkbox } from "./components/forms/Checkbox.jsx";
export { Segmented } from "./components/forms/Segmented.jsx";
export { Combobox } from "./components/forms/Combobox.jsx";
export { Calendar } from "./components/forms/Calendar.jsx";
export { DatePicker, RANGE_PRESETS } from "./components/forms/DatePicker.jsx";
export { FileUpload, formatBytes } from "./components/forms/FileUpload.jsx";
export { Stepper } from "./components/forms/Stepper.jsx";
export { RichText } from "./components/forms/RichText.jsx";

/* data */
export { Table } from "./components/data/Table.jsx";
export { KpiTile } from "./components/data/KpiTile.jsx";
export { StatMeter } from "./components/data/StatMeter.jsx";
export { EmptyState } from "./components/data/EmptyState.jsx";
export { StateView } from "./components/data/StateView.jsx";
export { Console } from "./components/data/Console.jsx";
export { CodeBlock } from "./components/data/CodeBlock.jsx";
export { Pagination } from "./components/data/Pagination.jsx";
export { DataGrid } from "./components/data/DataGrid.jsx";
export { Progress } from "./components/data/Progress.jsx";
export { FilterBar, Toolbar } from "./components/data/FilterBar.jsx";
export { BarChart } from "./components/data/BarChart.jsx";
export { LineChart } from "./components/data/LineChart.jsx";
export { ActivityFeed, timeAgo } from "./components/data/ActivityFeed.jsx";

/* nav */
export { TopBar } from "./components/nav/TopBar.jsx";
export { NavMenu } from "./components/nav/NavMenu.jsx";
export { AppBar } from "./components/nav/AppBar.jsx";
export { Sidebar, NavItem } from "./components/nav/Sidebar.jsx";
export { Tabs } from "./components/nav/Tabs.jsx";
export { Breadcrumbs } from "./components/nav/Breadcrumbs.jsx";
export { ThemeToggle } from "./components/nav/ThemeToggle.jsx";
export { CommandPalette, score } from "./components/nav/CommandPalette.jsx";
export { BottomNav } from "./components/nav/BottomNav.jsx";
export { NavToggle } from "./components/nav/NavToggle.jsx";

/* overlays */
export { Dialog } from "./components/overlays/Dialog.jsx";
export { Toast, ToastRegion } from "./components/overlays/Toast.jsx";
export { Tooltip } from "./components/overlays/Tooltip.jsx";
export { Popover } from "./components/overlays/Popover.jsx";
export { Menu } from "./components/overlays/Menu.jsx";
export { Drawer } from "./components/overlays/Drawer.jsx";

/* ai */
export { PromptInput } from "./components/ai/PromptInput.jsx";
export { Message } from "./components/ai/Message.jsx";
export { SourceChip } from "./components/ai/SourceChip.jsx";
export { SourceList } from "./components/ai/SourceList.jsx";
export { ConfidenceMeter } from "./components/ai/ConfidenceMeter.jsx";
export { AgentTrace } from "./components/ai/AgentTrace.jsx";
export { ToolCall } from "./components/ai/ToolCall.jsx";
export { DiffReview } from "./components/ai/DiffReview.jsx";
export { Artifact } from "./components/ai/Artifact.jsx";
export { Feedback } from "./components/ai/Feedback.jsx";

/* marketing */
export { Hero } from "./components/marketing/Hero.jsx";
export { FeatureGrid } from "./components/marketing/FeatureGrid.jsx";
export { StoryCard } from "./components/marketing/StoryCard.jsx";
export { LogoRail } from "./components/marketing/LogoRail.jsx";
/* --- v1.3.0 site chrome + editorial. Added by the marketing.css task; if this
   block conflicts with another in-flight change, these six lines are the whole
   of it. `SiteFooter`, NOT `Footer`: `CardFoot` exists, the browser bundle's
   namespace is flat, and lw-bundle.mjs makes a collision a hard error. --- */
export { SiteFooter } from "./components/marketing/SiteFooter.jsx";
export { Steps } from "./components/marketing/Steps.jsx";
export { Quote } from "./components/marketing/Quote.jsx";
export { Byline } from "./components/marketing/Byline.jsx";
export { ArticleCard } from "./components/marketing/ArticleCard.jsx";
export { AnnounceBar } from "./components/marketing/AnnounceBar.jsx";
/* --- v1.3.0 pricing, comparison, flow. Added by the marketing.css task; these
   three lines are the whole of it. There is deliberately NO `PlanGrid` (use
   `<Grid min={280}>`) and NO `BillingToggle` (use `<Segmented>` inside
   `.lw-plans-head`) — see the README and the CHANGELOG. `CompareTable`, NOT
   `Compare`: the browser bundle's namespace is flat and lw-bundle.mjs makes a
   collision with `Table`/`DataGrid` naming a hard error to reason about. --- */
export { PlanCard } from "./components/marketing/PlanCard.jsx";
export { CompareTable } from "./components/marketing/CompareTable.jsx";
export { Flow } from "./components/marketing/Flow.jsx";

/* Per-tenant theming and the runtime hooks live behind their own subpaths so an
   app that does not theme never pays for them: "@leanwise/design/brand" and
   "@leanwise/design/hooks". */
