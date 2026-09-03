const LW = window.LeanWiseDesign_f2d907;
const { DatePicker, FileUpload, Stepper, Field, Stack } = LW;

function Demo(){
  const [d,setD]=React.useState(new Date(2026,6,24));
  const [r,setR]=React.useState({start:new Date(2026,6,20),end:new Date(2026,6,29)});
  const [files,setFiles]=React.useState([
    {id:1,name:"contracts-2024-q1.pdf",size:2411724,state:"done"},
    {id:2,name:"handbook-v9.docx",size:840112,state:"uploading",progress:62},
    {id:3,name:"scan-0042.tiff",size:51203344,state:"error",error:"Unsupported format — PDF, DOCX or TXT"},
  ]);
  return (
    <Stack gap={16}>
      <span className="lbl-eyebrow lbl-above">stepper — the marker carries the state</span>
      <Stepper current={2} steps={[{label:"Connect"},{label:"Map fields"},{label:"Review"},{label:"Publish"}]} />
      <Field label="Effective date"><DatePicker value={d} onChange={setD} label="Effective date" /></Field>
      <Field label="Reporting period" help="Presets first — the grid is for the tenth case."><DatePicker range value={r} onChange={setR} label="Reporting period" /></Field>
      <span className="lbl-eyebrow lbl-above">upload</span>
      <FileUpload multiple accept=".pdf,.docx,.txt" maxSize={20*1024*1024} files={files}
        onFiles={fs=>setFiles(x=>[...x,...fs.map((f,i)=>({id:Date.now()+i,name:f.name,size:f.size,state:"queued"}))])}
        onRemove={f=>setFiles(x=>x.filter(y=>y.id!==f.id))} />
    </Stack>
  );
}
ReactDOM.createRoot(document.getElementById("light")).render(<Demo />);
ReactDOM.createRoot(document.getElementById("dark")).render(<Demo />);
