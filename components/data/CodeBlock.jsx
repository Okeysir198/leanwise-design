"use client";
import * as React from "react";
import { Icon } from "../primitives/Icon.jsx";

const cx = (...a) => a.filter(Boolean).join(" ");


/** Takes pre-highlighted HTML (tok-* spans) or raw code. Never highlights in
 *  the browser — that is the server's job and a runtime cost users pay twice.
 *
 *  The copy control is on by default whenever raw `code` is present: a snippet
 *  a reader has to select by hand is a snippet they mis-copy. It confirms in
 *  place rather than raising a toast — the feedback belongs where the click was. */
export function CodeBlock({
  code, html, filename, lang, copy = true,
  copyLabel = "Copy code", copiedLabel = "Copied",
  className, ...rest
}) {
  const [copied, setCopied] = React.useState(false);
  const canCopy = copy && typeof code === "string" && code.length > 0;
  React.useEffect(() => {
    if (!copied) return;
    const t = setTimeout(() => setCopied(false), 1600);
    return () => clearTimeout(t);
  }, [copied]);
  const onCopy = () => {
    try { navigator.clipboard.writeText(code).then(() => setCopied(true), () => {}); } catch (e) {}
  };
  return (
    <figure className={cx("lw-code", className)} {...rest}>
      {(filename || lang || canCopy) && (
        <figcaption className="lw-code-head">
          <span className="fn">{filename}</span>
          <span className="end">
            {lang && <span className="lang">{lang}</span>}
            {canCopy && (
              <button type="button" className="lw-icon-btn" onClick={onCopy}
                aria-label={copied ? copiedLabel : copyLabel} title={copied ? copiedLabel : copyLabel}>
                <Icon name={copied ? "check" : "copy"} size={15} />
              </button>
            )}
          </span>
        </figcaption>
      )}
      <pre><code dangerouslySetInnerHTML={html ? { __html: html } : undefined}>{html ? undefined : code}</code></pre>
    </figure>
  );
}
