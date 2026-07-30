const cx = (...a) => a.filter(Boolean).join(" ");

/**
 * The icon set. One 24-grid, one stroke weight, `currentColor` only — so an
 * icon inherits the ink of whatever it sits in and can never introduce a colour
 * the tokens do not know about.
 *
 * Paths, never a font: an icon font ships one glyph height for every icon and
 * fails visibly while the font loads. Sized in px because icons align to text,
 * not to the space scale.
 *
 * Decorative by default (`aria-hidden`). Pass `label` only when the icon is the
 * sole content of a control and nothing else names it.
 */
const ICONS = {
  sidebar: ["M4 5.5A2 2 0 0 1 6 3.5h12a2 2 0 0 1 2 2v13a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2z", "M10 3.5v17"],
  "sidebar-right": ["M4 5.5A2 2 0 0 1 6 3.5h12a2 2 0 0 1 2 2v13a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2z", "M14 3.5v17"],
  plus: ["M12 5v14", "M5 12h14"],
  paperclip: ["M13.4 6.6 7.7 12.3a3.2 3.2 0 0 0 4.5 4.5l6.4-6.4a5 5 0 0 0-7.1-7.1l-6.6 6.6a6.8 6.8 0 0 0 9.6 9.6l3.2-3.2"],
  filter: ["M4 6.5h16", "M7 12h10", "M10 17.5h4"],
  send: ["M12 19.5V5", "M6 11l6-6 6 6"],
  book: ["M19.5 3H7a2.5 2.5 0 0 0-2.5 2.5v13A2.5 2.5 0 0 1 7 16h12.5z", "M4.5 18.5A2.5 2.5 0 0 1 7 21h12.5v-5"],
  quote: ["M10.4 6.6C7.6 7.9 5.9 10.3 5.9 13.2v4.2h5.4v-5.1H8.6c0-1.7.7-3 2.1-3.9z", "M19.1 6.6c-2.8 1.3-4.5 3.7-4.5 6.6v4.2H20v-5.1h-2.7c0-1.7.7-3 2.1-3.9z"],
  list: ["M9 6.5h11", "M9 12h11", "M9 17.5h11", "M4.6 6.5h.01", "M4.6 12h.01", "M4.6 17.5h.01"],
  close: ["M6.5 6.5l11 11", "M17.5 6.5l-11 11"],
  copy: ["M9.5 8.5h9a1 1 0 0 1 1 1v9a1 1 0 0 1-1 1h-9a1 1 0 0 1-1-1v-9a1 1 0 0 1 1-1z", "M5.5 15.5a1 1 0 0 1-1-1v-9a1 1 0 0 1 1-1h9a1 1 0 0 1 1 1"],
  retry: ["M19.5 12a7.5 7.5 0 1 1-2.2-5.3", "M19.5 4.5V9H15"],
  download: ["M12 4.5v10.5", "M7.5 11l4.5 4.5 4.5-4.5", "M5 19.5h14"],
  spark: ["M12 3.5l2.1 5.4 5.4 2.1-5.4 2.1L12 18.5l-2.1-5.4L4.5 11l5.4-2.1z"],
  layers: ["M12 3.5l8 4.3-8 4.3-8-4.3z", "M4 12.6l8 4.3 8-4.3"],
  check: ["M12 3.5a8.5 8.5 0 1 0 0 17 8.5 8.5 0 0 0 0-17", "M8.5 12.3l2.6 2.6 4.6-5.2"],
  users: ["M9 4.5a3.3 3.3 0 1 0 0 6.6 3.3 3.3 0 0 0 0-6.6", "M3.5 20a5.5 5.5 0 0 1 11 0", "M16 5.6a3.3 3.3 0 0 1 0 5.4", "M17.2 20a5.6 5.6 0 0 0-1.7-3.9"],
  settings: ["M12 9a3 3 0 1 0 0 6 3 3 0 0 0 0-6", "M12 3.5v2.2", "M12 18.3v2.2", "M5.2 7.6l1.9 1.1", "M16.9 15.3l1.9 1.1", "M5.2 16.4l1.9-1.1", "M16.9 8.7l1.9-1.1"],
  clock: ["M12 3.5a8.5 8.5 0 1 0 0 17 8.5 8.5 0 0 0 0-17", "M12 7.5V12l3.4 2"],
  search: ["M10.8 4.2a6.6 6.6 0 1 0 0 13.2 6.6 6.6 0 0 0 0-13.2", "M15.6 15.6l4.2 4.2"],
  key: ["M15.4 3.6a5 5 0 0 0-4.4 7.3L3.5 18.4V20.5h2.1l1-1v-1.8h1.8l1-1h1.8l1.6-1.6a5 5 0 1 0 1.6-9.5", "M17 7.6h.01"],
  database: ["M12 3.5c4 0 7.2 1.1 7.2 2.5S16 8.5 12 8.5 4.8 7.4 4.8 6S8 3.5 12 3.5", "M4.8 6v12c0 1.4 3.2 2.5 7.2 2.5s7.2-1.1 7.2-2.5V6", "M4.8 12c0 1.4 3.2 2.5 7.2 2.5s7.2-1.1 7.2-2.5"],
  shield: ["M12 3.2l7 2.6v5.4c0 4.2-2.8 7.5-7 9.6-4.2-2.1-7-5.4-7-9.6V5.8z", "M8.9 11.9l2.2 2.2 4-4.4"],
  code: ["M9 7.5L4.5 12 9 16.5", "M15 7.5L19.5 12 15 16.5"],
  webhook: ["M8.6 10.4a3.9 3.9 0 1 1 5.6 3.5", "M12 14a4 4 0 1 0 3.7 5.5", "M15.7 19.5H8.2", "M8.3 14.2A4 4 0 1 0 4.6 9"],
  alert: ["M12 3.8l8.5 15.2H3.5z", "M12 9.6v4.1", "M12 16.6h.01"],
  rocket: ["M13.5 4.6c3.2-1.1 5.9-.9 5.9-.9s.2 2.7-.9 5.9c-.9 2.6-3.7 5.4-6 7l-3.2-.5-2.3-2.3-.5-3.2c1.6-2.3 4.4-5.1 7-6z", "M14.8 8.9h.01", "M8.6 16.4l-3 3", "M6.2 12.6L4 13.4l1.6 1.6", "M11.4 17.8l.8-2.2 1.6 1.6"],
  "chevron-down": ["M6.5 9.5l5.5 6 5.5-6"],
  sun: ["M12 8.2a3.8 3.8 0 1 0 0 7.6 3.8 3.8 0 0 0 0-7.6", "M12 2.8v2.1", "M12 19.1v2.1", "M4.9 4.9l1.5 1.5", "M17.6 17.6l1.5 1.5", "M2.8 12h2.1", "M19.1 12h2.1", "M4.9 19.1l1.5-1.5", "M17.6 6.4l1.5-1.5"],
  moon: ["M20 14.4A8.4 8.4 0 0 1 9.6 4a8.5 8.5 0 1 0 10.4 10.4"],
  monitor: ["M4.5 5h15a1 1 0 0 1 1 1v9a1 1 0 0 1-1 1h-15a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1z", "M9 20h6", "M12 16v4"],
  edit: ["M4.5 19.5h4L20 8a2.1 2.1 0 0 0-3-3L5.5 16.5z"],
  "chevron-left": ["M14.5 6.5l-6 5.5 6 5.5"],
  "chevron-right": ["M9.5 6.5l6 5.5-6 5.5"],
  "chevron-up": ["M6.5 14.5l5.5-6 5.5 6"],
  user: ["M12 4.6a3.6 3.6 0 1 0 0 7.2 3.6 3.6 0 0 0 0-7.2", "M5.2 20a6.8 6.8 0 0 1 13.6 0"],
  "arrow-up": ["M12 19.5V5", "M6 11l6-6 6 6"],
  "arrow-down": ["M12 4.5V19", "M18 13l-6 6-6-6"],
  "arrow-right": ["M4.5 12h15", "M13.5 6l6 6-6 6"],
  "arrow-left": ["M19.5 12h-15", "M10.5 6l-6 6 6 6"],
  trash: ["M5 7.5h14", "M9.5 7.5V5.6a1.1 1.1 0 0 1 1.1-1.1h2.8a1.1 1.1 0 0 1 1.1 1.1v1.9", "M6.9 7.5l.8 11.1a1.6 1.6 0 0 0 1.6 1.4h5.4a1.6 1.6 0 0 0 1.6-1.4l.8-11.1", "M10.4 11v5.4", "M13.6 11v5.4"],
  external: ["M14 4.5h5.5V10", "M19.5 4.5L11 13", "M17.5 14v4.5a1.5 1.5 0 0 1-1.5 1.5H6a1.5 1.5 0 0 1-1.5-1.5V8A1.5 1.5 0 0 1 6 6.5h4.5"],
  info: ["M12 3.5a8.5 8.5 0 1 0 0 17 8.5 8.5 0 0 0 0-17", "M12 11.2v5.2", "M12 7.7h.01"],
  more: ["M6 12h.01", "M12 12h.01", "M18 12h.01"],
  file: ["M13.5 3.5H7A1.5 1.5 0 0 0 5.5 5v14A1.5 1.5 0 0 0 7 20.5h10a1.5 1.5 0 0 0 1.5-1.5V8.5z", "M13.5 3.5v5h5"],
  chart: ["M4.5 19.5h15", "M7.6 19.5v-6.2", "M12 19.5V6.4", "M16.4 19.5v-4.1"],

  /* ---- Added for the control layer (Popover, Menu, Combobox, DataGrid,
     DatePicker, Upload, Notifications, AI review). One pass, not one at a time:
     Rule 8 ("name a glyph, never draw one") only holds while adding one is cheap. */
  calendar: ["M5 6.5h14a1 1 0 0 1 1 1v11a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1v-11a1 1 0 0 1 1-1z", "M4 10.5h16", "M8.5 4v4", "M15.5 4v4"],
  upload: ["M12 15.5V4.5", "M7.5 9L12 4.5 16.5 9", "M5 19.5h14"],
  /* A thumbtack seen head-on: a cap, a tapering shaft, a point. The first pass drew
     it at an angle, which at 16px read as an unidentifiable wedge — a glyph has to
     survive the size it is actually used at, and pin is used in a 12px column head. */
  pin: ["M8.5 4h7", "M10.5 4v6l-2.5 3h8l-2.5-3V4", "M12 13v7"],
  grip: ["M9 6h.01", "M15 6h.01", "M9 12h.01", "M15 12h.01", "M9 18h.01", "M15 18h.01"],
  columns: ["M4.5 5h15a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1h-15a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1z", "M9.5 5v14", "M15 5v14"],
  /* `check` is the CIRCLED check and predates this set; `checkmark` is the bare
     one a menu item and a checkbox need. Two glyphs, two names, no renaming — a
     rename here would silently repoint every existing consumer. */
  checkmark: ["M5 12.8l4.6 4.7L19 7.5"],
  minus: ["M5 12h14"],
  "x-circle": ["M12 3.5a8.5 8.5 0 1 0 0 17 8.5 8.5 0 0 0 0-17", "M9.2 9.2l5.6 5.6", "M14.8 9.2l-5.6 5.6"],
  "more-vertical": ["M12 6h.01", "M12 12h.01", "M12 18h.01"],
  "chevrons-up-down": ["M8 10l4-4 4 4", "M8 14l4 4 4-4"],
  /* Direction is never ONE cue (rule 6). The first pass distinguished asc from desc
     by line length alone — three bars getting shorter versus longer, which nobody
     reads as a direction at a glance and nothing reads in a 13px table header. Both
     now carry an arrow as well, so the sort direction survives being small. */
  "sort-asc": ["M4.5 7h7", "M4.5 12h5", "M4.5 17h3", "M17 18.5V7.5", "M14 10.5l3-3 3 3"],
  "sort-desc": ["M4.5 7h7", "M4.5 12h5", "M4.5 17h3", "M17 7.5v11", "M14 15.5l3 3 3-3"],
  eye: ["M2.8 12S6.5 5.8 12 5.8 21.2 12 21.2 12 17.5 18.2 12 18.2 2.8 12 2.8 12z", "M12 9.2a2.8 2.8 0 1 0 0 5.6 2.8 2.8 0 0 0 0-5.6"],
  "eye-off": ["M9.9 5.9A8 8 0 0 1 12 5.8c5.5 0 9.2 6.2 9.2 6.2a17 17 0 0 1-3 3.7", "M6.3 7.9A17 17 0 0 0 2.8 12S6.5 18.2 12 18.2a8.3 8.3 0 0 0 3.3-.7", "M10 10a2.8 2.8 0 0 0 3.9 3.9", "M4.5 4.5l15 15"],
  lock: ["M6.5 10.5h11a1 1 0 0 1 1 1v7a1 1 0 0 1-1 1h-11a1 1 0 0 1-1-1v-7a1 1 0 0 1 1-1z", "M8.5 10.5V8a3.5 3.5 0 0 1 7 0v2.5"],
  mail: ["M4.5 5.5h15a1 1 0 0 1 1 1v11a1 1 0 0 1-1 1h-15a1 1 0 0 1-1-1v-11a1 1 0 0 1 1-1z", "M4 7l8 5.5L20 7"],
  link: ["M10.5 13.5a4 4 0 0 0 5.7 0l2.6-2.6a4 4 0 0 0-5.7-5.7l-1.5 1.5", "M13.5 10.5a4 4 0 0 0-5.7 0l-2.6 2.6a4 4 0 0 0 5.7 5.7l1.5-1.5"],
  image: ["M4.5 4.5h15a1 1 0 0 1 1 1v13a1 1 0 0 1-1 1h-15a1 1 0 0 1-1-1v-13a1 1 0 0 1 1-1z", "M9 10.2a1.7 1.7 0 1 0 0-3.4 1.7 1.7 0 0 0 0 3.4", "M20.5 15.5l-4.8-4.8L5 19.5"],
  folder: ["M3.5 6.5a1 1 0 0 1 1-1h4.3l2 2.5h8.7a1 1 0 0 1 1 1v9.5a1 1 0 0 1-1 1h-15a1 1 0 0 1-1-1z"],
  star: ["M12 3.8l2.6 5.3 5.8.8-4.2 4.1 1 5.8-5.2-2.8-5.2 2.8 1-5.8-4.2-4.1 5.8-.8z"],
  bell: ["M18 9.5a6 6 0 1 0-12 0c0 5-2 6.5-2 6.5h16s-2-1.5-2-6.5", "M13.7 19.5a2 2 0 0 1-3.4 0"],
  inbox: ["M6.3 5h11.4a1 1 0 0 1 .95.68l1.85 5.5a1 1 0 0 1 .05.32v6.5a1 1 0 0 1-1 1h-15a1 1 0 0 1-1-1V11.5a1 1 0 0 1 .05-.32l1.85-5.5A1 1 0 0 1 6.3 5z", "M3.6 12.5h4.4l1.5 3h5l1.5-3h4.4"],
  play: ["M8 5.5l10 6.5-10 6.5z"],
  pause: ["M9 5.5v13", "M15 5.5v13"],
  mic: ["M12 3.5a2.8 2.8 0 0 1 2.8 2.8v5.4a2.8 2.8 0 0 1-5.6 0V6.3A2.8 2.8 0 0 1 12 3.5", "M5.5 11a6.5 6.5 0 0 0 13 0", "M12 17.5v3"],
  "mic-off": ["M9.2 6.3a2.8 2.8 0 0 1 5.6 0v5.4a2.8 2.8 0 0 1-.3 1.3", "M14.5 14.9a2.8 2.8 0 0 1-5.3-1.2V9.8", "M5.5 11a6.5 6.5 0 0 0 10.4 5.2", "M18.5 11v.6", "M12 17.5v3", "M4.5 4.5l15 15"],
  "thumbs-up": ["M7.5 20V9.5l4-6a2 2 0 0 1 3 2.2L13.8 9h4.7a2 2 0 0 1 2 2.4l-1.4 6.5a2 2 0 0 1-2 1.6z", "M7.5 9.5H4.8a1 1 0 0 0-1 1V19a1 1 0 0 0 1 1h2.7"],
  "thumbs-down": ["M16.5 4v10.5l-4 6a2 2 0 0 1-3-2.2l.7-3.3H5.5a2 2 0 0 1-2-2.4l1.4-6.5A2 2 0 0 1 6.9 4z", "M16.5 14.5h2.7a1 1 0 0 0 1-1V5a1 1 0 0 0-1-1h-2.7"],
  maximize: ["M9 4.5H4.5V9", "M15 4.5h4.5V9", "M15 19.5h4.5V15", "M9 19.5H4.5V15"],
  minimize: ["M4.5 9H9V4.5", "M19.5 9H15V4.5", "M19.5 15H15v4.5", "M4.5 15H9v4.5"],
  undo: ["M4.5 12a7.5 7.5 0 1 0 2.2-5.3", "M4.5 4.5V9H9"],
  help: ["M12 3.5a8.5 8.5 0 1 0 0 17 8.5 8.5 0 0 0 0-17", "M9.6 9.4a2.5 2.5 0 0 1 4.9.6c0 1.7-2.5 2.5-2.5 2.5", "M12 16.5h.01"]
};

/* Drawn when a name is not in the set. Deliberately generic — it must read as
   "a glyph is missing here", never as a real icon someone might ship. Rendering
   NOTHING was the old behaviour and it was worse: an empty but space-occupying
   slot silently breaks an icon column's rhythm, and the gap is invisible in
   review while the console warning scrolls past. */
const UNKNOWN = ["M5.5 5.5h13v13h-13z", "M9.4 9.4l5.2 5.2", "M14.6 9.4l-5.2 5.2"];

export function Icon({ name, size = 16, strokeWidth = 1.6, label, className, style, ...rest }) {
  const known = ICONS[name];
  // Loud AND visible. The warning is what caught nine silently-missing glyphs, so
  // it stays; but the slot now draws UNKNOWN rather than returning null, because
  // an empty-but-space-occupying slot breaks an icon column's rhythm in a way
  // that is easy to miss in review while the warning scrolls past.
  if (!known && typeof console !== "undefined") {
    console.warn(`Icon: no glyph named "${name}". Known names: ${Object.keys(ICONS).join(", ")}`);
  }
  const paths = known || UNKNOWN;
  // The size goes inline, not just on the presentation attributes: any class rule
  // (`.lw-btn svg { width: 16px }`) outranks a presentation attribute, which
  // silently made `size` inert inside buttons. Inline keeps `size` authoritative.
  return (
    <svg className={cx("lw-icon", className)} width={size} height={size} viewBox="0 0 24 24"
      style={{ width: size, height: size, ...style }}
      fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round"
      role={label ? "img" : undefined} aria-label={label} aria-hidden={label ? undefined : "true"}
      data-unknown={known ? undefined : "true"} {...rest}>
      {paths.map((d, i) => <path key={i} d={d} />)}
    </svg>
  );
}
/** Every glyph name, in declaration order. Exported capitalised as well, so it
 *  reaches window.<Namespace> — a set nobody can enumerate is a set people
 *  guess at, and a guessed name renders nothing. */
export const iconNames = Object.keys(ICONS);
export const IconNames = iconNames;
