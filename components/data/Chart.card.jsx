const LW = window.LeanWiseDesign_f2d907;
const { BarChart, LineChart, ActivityFeed } = LW;
const labels=["Mon","Tue","Wed","Thu","Fri","Sat","Sun"];
const NOW = new Date(2026,6,30,14,0,0).getTime();

function Demo(){
  return (<>
    <div><span className="lbl-eyebrow lbl-above">queries by ground — stacked</span>
      <BarChart stacked label="Queries by grounding, last 7 days" labels={labels}
        series={[{name:"Grounded",data:[820,910,1180,1040,1320,410,300]},{name:"Ungrounded",data:[120,90,160,140,180,60,40]}]} height={170} />
    </div>
    <div><span className="lbl-eyebrow lbl-above">p95 latency</span>
      <LineChart area label="p95 latency in ms, last 7 days" labels={labels}
        series={[{name:"Retrieval",data:[180,172,210,190,240,150,140]},{name:"Generation",data:[420,400,460,430,510,380,360]}]} height={170} />
    </div>
    <div><span className="lbl-eyebrow lbl-above">activity</span>
      <ActivityFeed now={NOW} items={[
        {title:"Index rebuilt for contracts/2024", when:NOW-1000*60*8, meta:"41,208 chunks", icon:"check", tone:"success", unread:true},
        {title:"3 documents skipped — unsupported encoding", when:NOW-1000*60*95, icon:"alert", tone:"warning", unread:true},
        {title:"R. Okafor invited J. Tran to the workspace", when:NOW-1000*60*60*26, icon:"users"},
        {title:"Embedding failed after 2 retries", when:NOW-1000*60*60*72, icon:"x-circle", tone:"danger"},
      ]} />
    </div>
  </>);
}
ReactDOM.createRoot(document.getElementById("light")).render(<Demo />);
ReactDOM.createRoot(document.getElementById("dark")).render(<Demo />);
