"use client";
import * as React from "react";
const cx = (...a) => a.filter(Boolean).join(" ");


/** Initials by default; an image only when there is one. Never a generated
 *  face — a placeholder person is a fabrication.
 *
 *  ⚠️ A BROKEN `src` FALLS BACK TO THE INITIALS. It used to render the browser's
 *  broken-image glyph, which is the one outcome worse than no picture: the
 *  initials were already computed and sitting right there unused. An avatar URL
 *  is the most expirable thing in a session — a signed URL, a deleted upload, a
 *  CDN that 404s — so this is the common path, not the edge. */
export function Avatar({ name = "", src, size = "md", className, ...rest }) {
  const [broken, setBroken] = React.useState(false);
  /* Reset when the URL changes, or one 404 would suppress every later image. */
  React.useEffect(() => setBroken(false), [src]);
  const initials = name.trim().split(/\s+/).slice(0, 2).map(w => w[0] || "").join("").toUpperCase();
  return (
    <span className={cx("lw-avatar", size === "sm" && "lw-avatar-sm", size === "lg" && "lw-avatar-lg", className)} title={name || undefined} {...rest}>
      {src && !broken ? <img src={src} alt={name} onError={() => setBroken(true)} /> : initials}
    </span>
  );
}
