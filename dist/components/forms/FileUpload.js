"use client";
import { jsx, jsxs } from "react/jsx-runtime";
import * as React from "react";
import { useMergedRef } from "../_merge-refs.js";
import { Icon } from "../primitives/Icon.js";
const cx = (...a) => a.filter(Boolean).join(" ");
const KB = 1024;
function formatBytes(n) {
  if (n == null) return "";
  const u = ["B", "KB", "MB", "GB"];
  let i = 0, v = n;
  while (v >= KB && i < u.length - 1) {
    v /= KB;
    i++;
  }
  return (i === 0 ? v : v.toFixed(v < 10 ? 1 : 0)) + " " + u[i];
}
const FileUpload = React.forwardRef(function FileUpload2({
  files = [],
  onFiles,
  onRemove,
  accept,
  multiple,
  maxSize,
  disabled,
  title = "Drop files here",
  hint,
  className,
  ...rest
}, forwardedRef) {
  const [over, setOver] = React.useState(0);
  const [rejected, setRejected] = React.useState(null);
  const inputRef = React.useRef(null);
  const setInputRef = useMergedRef(inputRef, forwardedRef);
  const take = (list) => {
    const arr = Array.from(list || []);
    if (!arr.length) return;
    const tooBig = maxSize ? arr.filter((f) => f.size > maxSize) : [];
    setRejected(tooBig.length ? tooBig.map((f) => f.name).join(", ") + " \u2014 over " + formatBytes(maxSize) : null);
    const ok = maxSize ? arr.filter((f) => f.size <= maxSize) : arr;
    if (ok.length && onFiles) onFiles(multiple ? ok : ok.slice(0, 1));
  };
  return /* @__PURE__ */ jsxs("div", { className: cx(className), ...rest, children: [
    /* @__PURE__ */ jsxs(
      "label",
      {
        className: "lw-dropzone",
        "data-over": over > 0 ? "true" : void 0,
        "data-disabled": disabled ? "true" : void 0,
        onDragEnter: (e) => {
          e.preventDefault();
          if (!disabled) setOver((o) => o + 1);
        },
        onDragOver: (e) => e.preventDefault(),
        onDragLeave: () => setOver((o) => Math.max(0, o - 1)),
        onDrop: (e) => {
          e.preventDefault();
          setOver(0);
          if (!disabled) take(e.dataTransfer.files);
        },
        children: [
          /* @__PURE__ */ jsx(
            "input",
            {
              ref: setInputRef,
              type: "file",
              accept,
              multiple,
              disabled,
              onChange: (e) => {
                take(e.target.files);
                e.target.value = "";
              }
            }
          ),
          /* @__PURE__ */ jsx(Icon, { name: "upload", size: 20 }),
          /* @__PURE__ */ jsx("span", { className: "lw-dz-title", children: title }),
          /* @__PURE__ */ jsx("span", { className: "lw-dz-hint", children: hint || (accept ? accept + (maxSize ? " \xB7 up to " + formatBytes(maxSize) : "") : maxSize ? "Up to " + formatBytes(maxSize) : "or click to browse") })
        ]
      }
    ),
    rejected && /* @__PURE__ */ jsx("div", { className: "lw-error", role: "alert", children: rejected }),
    files.length > 0 && /* @__PURE__ */ jsx("div", { className: "lw-file-list", children: files.map((f, i) => /* @__PURE__ */ jsxs(
      "div",
      {
        className: "lw-file-row",
        "data-state": f.state,
        style: f.progress != null ? { "--lw-file-pct": f.progress + "%" } : void 0,
        children: [
          /* @__PURE__ */ jsx("span", { className: "lw-file-ic", children: /* @__PURE__ */ jsx(Icon, { name: f.state === "error" ? "x-circle" : f.state === "done" ? "check" : "file", size: 16 }) }),
          /* @__PURE__ */ jsxs("span", { className: "lw-file-main", children: [
            /* @__PURE__ */ jsx("span", { className: "lw-file-name", children: f.name }),
            f.state === "uploading" && f.progress != null ? /* @__PURE__ */ jsx("span", { className: "lw-file-bar", children: /* @__PURE__ */ jsx("i", {}) }) : /* @__PURE__ */ jsx("span", { className: "lw-file-meta", children: f.error || formatBytes(f.size) })
          ] }),
          onRemove && /* @__PURE__ */ jsx("button", { type: "button", className: "lw-icon-btn", "aria-label": "Remove " + f.name, onClick: () => onRemove(f), children: /* @__PURE__ */ jsx(Icon, { name: "close", size: 15 }) })
        ]
      },
      f.id ?? f.name + i
    )) })
  ] });
});
export {
  FileUpload,
  formatBytes
};
