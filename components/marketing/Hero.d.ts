import * as React from "react";

export interface HeroProps extends React.HTMLAttributes<HTMLElement> {
  eyebrow?: React.ReactNode;
  title?: React.ReactNode;
  lead?: React.ReactNode;
  /** Two buttons at most. The amber CTA is one of them, once. */
  actions?: React.ReactNode;
  aside?: React.ReactNode;
}
export declare function Hero(props: HeroProps): JSX.Element;