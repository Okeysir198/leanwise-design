const LW = window.LeanWiseDesign_f2d907;
const { Flow, Disclosure } = LW;

ReactDOM.createRoot(document.getElementById("flow-h")).render(
  <Flow nodes={[
    { id: "parse", icon: "file", label: "Parse", sub: "PDF, DOCX and XLSX to a page-addressed text stream." },
    { id: "extract", icon: "layers", label: "Extract", sub: "Fields lifted per document type, each with its source span." },
    { id: "validate", icon: "shield", label: "Validate", sub: "Checkpoints run against the extracted fields.", current: true },
    { id: "review", icon: "eye", label: "Review", sub: "A person confirms or corrects, with the passage attached." },
  ]} />
);

ReactDOM.createRoot(document.getElementById("flow-v")).render(
  <Flow orientation="vertical" nodes={[
    { id: "corpus", icon: "database", label: "Point it at a corpus", sub: "A folder, a bucket or a share. Nothing is copied out." },
    { id: "fixtures", icon: "check", label: "Write ten fixtures", sub: "Questions you already know the answer to.",
      detail: <Disclosure summary="What a fixture looks like">
        <p>A question, the document it should be answered from, and the passage that answers it. Ten is enough to
        tell a working retrieval configuration from a plausible one.</p>
      </Disclosure> },
    { id: "measure", icon: "chart", label: "Measure, then decide", sub: "The score is on your documents, not a public benchmark." },
  ]} />
);

ReactDOM.createRoot(document.getElementById("flow-gap")).render(
  <Flow
    nodes={[
      { id: "now", label: "Shipping", sub: "Retrieval, evaluation, review." },
      { id: "next", label: "In build", sub: "Checkpoint authoring." },
      { id: "later", label: "Not scheduled", sub: "No date is claimed, so no edge is drawn to it." },
    ]}
    edges={[["now", "next"]]}
  />
);
