// @dsCard group="Components" name="Date picker" subtitle="Calendar in a Popover — a single date and a two-month range, rendered open" viewport="1200x720"
const { Button, Calendar, Popover, PopoverTrigger, PopoverContent, CalendarIcon } = window.LeanWiseDesign_f2d907;

/* Fixed dates so the specimen never moves with the clock. */
const TODAY = new Date(2026, 8, 24);
const RANGE = { from: new Date(2026, 8, 8), to: new Date(2026, 8, 19) };

lwCard("Date picker", "The stock date picker: an outline Button trigger, a Calendar inside PopoverContent.", (
  <div className="flex flex-wrap gap-64">
    <Popover open>
      <PopoverTrigger asChild>
        <Button variant="outline" className="w-60 justify-start text-left font-normal"><CalendarIcon />September 24th, 2026</Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start" aria-label="Choose a date" onOpenAutoFocus={(e) => e.preventDefault()}>
        <Calendar mode="single" selected={TODAY} today={TODAY} defaultMonth={TODAY} />
      </PopoverContent>
    </Popover>
    <Popover open>
      <PopoverTrigger asChild>
        <Button variant="outline" className="w-72 justify-start text-left font-normal"><CalendarIcon />Sep 08, 2026 – Sep 19, 2026</Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start" aria-label="Choose a range" onOpenAutoFocus={(e) => e.preventDefault()}>
        <Calendar mode="range" selected={RANGE} today={TODAY} defaultMonth={RANGE.from} numberOfMonths={2} />
      </PopoverContent>
    </Popover>
  </div>
));
