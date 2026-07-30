const cx = (...a) => a.filter(Boolean).join(" ");


/** The agent's steps on a hairline spine. Users trust what they can watch —
 *  and a trace is the cheapest way to make a slow answer feel accountable. */
export function AgentTrace({ steps = [], className, ...rest }) {
  return (
    <ol className={cx("lw-trace", className)} {...rest}>
      {steps.map((s, i) => (
        <li key={i} data-state={s.state || "pending"}>
          <span className="step">{s.label}</span>
          {s.meta && <span className="meta">{s.meta}</span>}
        </li>
      ))}
    </ol>
  );
}
