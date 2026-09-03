import * as React from "react";

export interface MessageProps extends React.HTMLAttributes<HTMLDivElement> {
  role?: "ai" | "user";
  /** Overrides the mono role label. */
  who?: React.ReactNode;
  /** Glyph or initials in the role badge. Defaults to a sparkle for `ai`, a
   *  person glyph for `user` — the badge marks the ROLE, not an identity. */
  avatar?: React.ReactNode;
  streaming?: boolean;
  footer?: React.ReactNode;
}
/** @deprecated Unused by any consumer as of v2.0; candidate for removal in v3.0 — say so in an issue if you adopt it. */
export declare function Message(props: MessageProps): React.JSX.Element;