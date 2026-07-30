import * as React from "react";
import { Icon } from "../primitives/Icon.jsx";
const cx = (...a) => a.filter(Boolean).join(" ");

const fmt = (v) => (typeof v === "string" ? v : JSON.stringify(v, null, 2));

/**
 * One tool invocation. `AgentTrace` shows THAT a step ran; this shows what it
 * did — arguments in, result out, how long it took. Pair them: the trace is the
 * spine, the tool calls are the evidence hanging off it.
 *
 * Collapsed by default, because an argument blob is something a user opens when
 * the answer looks wrong, not something to read on every turn.
 */
export function ToolCall({ name, summary, args, result, error, state = "ok", duration, defaultOpen, className, ...rest }) {
  const [open, setOpen] = React.useState(!!defaultOpen);
  const uid = React.useId();
  const st = error ? "error" : state;
  return (
    <div className={cx("lw-tool", className)} data-state={st} {...rest}>
      <button type="button" className="lw-tool-head" aria-expanded={open} aria-controls={uid} onClick={() => setOpen(o => !o)}>
        <Icon name={open ? "chevron-down" : "chevron-right"} size={14} />
        <span className="lw-tool-dot" aria-hidden="true" />
        <span className="lw-tool-name">{name}</span>
        <span className="lw-tool-sum">{summary}</span>
        {duration != null && <span className="lw-tool-dur">{duration}ms</span>}
        {/* The dot is the sighted signal; the word is the one a screen reader gets. */}
        <span className="lw-sr-only">{st === "running" ? "running" : st === "error" ? "failed" : st === "pending" ? "pending" : "succeeded"}</span>
      </button>
      {open && (
        <div className="lw-tool-body" id={uid}>
          {args != null && <><span className="k">arguments</span><pre>{fmt(args)}</pre></>}
          {error ? <><span className="k">error</span><pre style={{ color: "var(--lw-danger-on)" }}>{fmt(error)}</pre></>
            : result != null && <><span className="k">result</span><pre>{fmt(result)}</pre></>}
        </div>
      )}
    </div>
  );
}
