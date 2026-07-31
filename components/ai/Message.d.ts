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
export declare function Message(props: MessageProps): React.JSX.Element;