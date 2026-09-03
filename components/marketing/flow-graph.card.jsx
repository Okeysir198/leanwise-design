const LW = window.LeanWiseDesign_f2d907;
const { Flow } = LW;

/* The headers are the CONSUMER's words in the CONSUMER's locale — the component
   ships no English for them. A bilingual consumer supplies both. */
const T = { step: "Step", leadsTo: "Leads to", none: "End of the flow" };

ReactDOM.createRoot(document.getElementById("fg-merge")).render(
  <Flow
    label="How a submission is checked"
    tableLabels={T}
    nodes={[
      { id: "docs", icon: "file", label: "The evidence", sub: "The documents as they are.", kind: "input" },
      { id: "std", icon: "grid", label: "The standard", sub: "The workbook they are measured against.", kind: "input" },
      { id: "check", icon: "shield", label: "Checked together", sub: "Every declared value, against the standard and against the rest of the pack.", current: true },
      { id: "result", icon: "check", label: "A status per value", sub: "Not a score to interpret.", kind: "output" },
      { id: "batch", icon: "chart", label: "What failed, across the batch", sub: "The same answer, aggregated.", kind: "output" },
    ]}
    edges={[
      { from: "docs", to: "check" },
      { from: "std", to: "check" },
      { from: "check", to: "result" },
      { from: "check", to: "batch" },
    ]}
  />
);

ReactDOM.createRoot(document.getElementById("fg-fan")).render(
  <Flow
    label="One source, three destinations"
    tableLabels={T}
    nodes={[
      { id: "src", icon: "database", label: "One source", sub: "Read once." },
      { id: "a", label: "First destination" },
      { id: "b", label: "Second destination" },
      { id: "c", label: "Third destination" },
    ]}
    edges={[
      { from: "src", to: "a" },
      { from: "src", to: "b" },
      { from: "src", to: "c" },
    ]}
  />
);

ReactDOM.createRoot(document.getElementById("fg-back")).render(
  <Flow
    label="A review that can send work back"
    tableLabels={T}
    nodes={[
      { id: "draft", icon: "file", label: "Draft" },
      { id: "review", icon: "eye", label: "Review" },
      { id: "publish", icon: "check", label: "Publish", kind: "terminal" },
    ]}
    edges={[
      { from: "draft", to: "review" },
      { from: "review", to: "publish" },
      { from: "review", to: "draft", kind: "back", label: "changes requested" },
    ]}
  />
);

/* ⚠ REGRESSION SPECIMEN, and the only reason it is on this card.
   `layout="auto"` sends an all-consecutive flow to the CHAIN renderer, and for
   one release that renderer received the raw `edges` prop rather than the
   normalised one — so the object form documented by v1.6.0 destructured as an
   array and threw "object is not iterable" during SSR. Every other specimen here
   branches, which is exactly why nothing caught it: the crash lived in the path
   the new type invites and the new card never took. `check:a11y` fails a card on
   an uncaught page error, so this renders the guard as a gate. */
ReactDOM.createRoot(document.getElementById("fg-chain-obj")).render(
  <Flow
    nodes={[
      { id: "one", icon: "file", label: "First" },
      { id: "two", icon: "shield", label: "Second" },
      { id: "three", icon: "check", label: "Third" },
    ]}
    edges={[
      { from: "one", to: "two" },
      { from: "two", to: "three" },
    ]}
  />
);
