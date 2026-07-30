import * as React from "react";

export interface StoryCardProps extends React.HTMLAttributes<HTMLElement> {
  logo?: React.ReactNode;
  title?: React.ReactNode;
  body?: React.ReactNode;
  /** The headline number. One per story. */
  result?: React.ReactNode;
  /** All three of quote/person/role, or the quote does not render. */
  quote?: React.ReactNode;
  person?: React.ReactNode;
  role?: React.ReactNode;
  href?: string;
}
export declare function StoryCard(props: StoryCardProps): JSX.Element;