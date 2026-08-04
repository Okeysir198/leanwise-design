"use client";
import * as React from "react";
import { useMergedRef } from "../_merge-refs.js";
import { Icon } from "../primitives/Icon.jsx";
const cx = (...a) => a.filter(Boolean).join(" ");

const KB = 1024;
export function formatBytes(n) {
  if (n == null) return "";
  const u = ["B", "KB", "MB", "GB"];
  let i = 0, v = n;
  while (v >= KB && i < u.length - 1) { v /= KB; i++; }
  return (i === 0 ? v : v.toFixed(v < 10 ? 1 : 0)) + " " + u[i];
}

/**
 * The dropzone is a LABEL wrapping a real file input, so the click target, the
 * keyboard path and the accessible name are the platform's rather than a div
 * with a handler on it. Drag is the enhancement; click and Enter are the control.
 *
 * The drag counter is not decoration: dragleave fires when the pointer crosses
 * onto a CHILD element, so a boolean flag flickers off every time the cursor
 * passes over the icon inside the zone.
 */
/* forwardRef, for the same reason Input.jsx gives: without it react-hook-form's
   register(), a Controller's field.ref, an imperative .focus() on a validation
   error and every scroll-to-error silently do nothing. The five simple controls
   have had this since v1.0; these five composites did not, which made them the
   ones a real form could not use.

   The ref is redirected to the FOCUSABLE element via a merged callback ref rather
   than to the wrapper — a form library calls .focus() on what it is given, and
   focusing a <div> does nothing. Here that is the file <input>. */
export const FileUpload = React.forwardRef(function FileUpload({
  files = [], onFiles, onRemove, accept, multiple, maxSize, disabled,
  title = "Drop files here", hint,
  formatRejected = (names, limit) => names + " \u2014 over " + limit,
  formatHint = (a, limit) => (a ? a + (limit ? " \u00b7 up to " + limit : "") : limit ? "Up to " + limit : "or click to browse"),
  formatRemoveLabel = (name) => "Remove " + name,
  className, ...rest
}, forwardedRef) {
  const [over, setOver] = React.useState(0);
  const [rejected, setRejected] = React.useState(null);
  const inputRef = React.useRef(null);
  const setInputRef = useMergedRef(inputRef, forwardedRef);

  const take = (list) => {
    const arr = Array.from(list || []);
    if (!arr.length) return;
    const tooBig = maxSize ? arr.filter(f => f.size > maxSize) : [];
    // Say WHICH file and WHY, with the limit — "upload failed" is not a message.
    setRejected(tooBig.length ? formatRejected(tooBig.map(f => f.name).join(", "), formatBytes(maxSize)) : null);
    const ok = maxSize ? arr.filter(f => f.size <= maxSize) : arr;
    if (ok.length && onFiles) onFiles(multiple ? ok : ok.slice(0, 1));
  };

  return (
    <div className={cx(className)} {...rest}>
      <label className="lw-dropzone" data-over={over > 0 ? "true" : undefined} data-disabled={disabled ? "true" : undefined}
        onDragEnter={(e) => { e.preventDefault(); if (!disabled) setOver(o => o + 1); }}
        onDragOver={(e) => e.preventDefault()}
        onDragLeave={() => setOver(o => Math.max(0, o - 1))}
        onDrop={(e) => { e.preventDefault(); setOver(0); if (!disabled) take(e.dataTransfer.files); }}>
        <input ref={setInputRef} type="file" accept={accept} multiple={multiple} disabled={disabled}
          onChange={(e) => { take(e.target.files); e.target.value = ""; }} />
        <Icon name="upload" size={20} />
        <span className="lw-dz-title">{title}</span>
        <span className="lw-dz-hint">{hint || formatHint(accept, maxSize ? formatBytes(maxSize) : null)}</span>
      </label>
      {rejected && <div className="lw-error" role="alert">{rejected}</div>}
      {files.length > 0 && (
        <div className="lw-file-list">
          {files.map((f, i) => (
            <div key={f.id ?? f.name + i} className="lw-file-row" data-state={f.state}
              style={f.progress != null ? { "--lw-file-pct": f.progress + "%" } : undefined}>
              <span className="lw-file-ic">
                <Icon name={f.state === "error" ? "x-circle" : f.state === "done" ? "check" : "file"} size={16} />
              </span>
              <span className="lw-file-main">
                <span className="lw-file-name">{f.name}</span>
                {f.state === "uploading" && f.progress != null
                  ? <span className="lw-file-bar"><i /></span>
                  : <span className="lw-file-meta">{f.error || formatBytes(f.size)}</span>}
              </span>
              {onRemove && (
                <button type="button" className="lw-icon-btn" aria-label={formatRemoveLabel(f.name)} onClick={() => onRemove(f)}>
                  <Icon name="close" size={15} />
                </button>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
});
