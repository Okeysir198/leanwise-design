import * as React from "react";

export interface CardProps extends React.HTMLAttributes<HTMLElement> {
  /** Adds pointer, focus ring and press state, and makes it a real control. */
  interactive?: boolean;
  /** Hover lift + brand halo. Opt-in; stands down under reduced motion. */
  glow?: boolean;
  selected?: boolean;
  href?: string;
  as?: string;
}
export declare function Card(props: CardProps): React.JSX.Element;
export declare function CardHead(props: React.HTMLAttributes<HTMLDivElement>): React.JSX.Element;
export declare function CardTitle(props: React.HTMLAttributes<HTMLElement> & { as?: string }): React.JSX.Element;
export declare function CardBody(props: React.HTMLAttributes<HTMLParagraphElement>): React.JSX.Element;
export declare function CardFoot(props: React.HTMLAttributes<HTMLDivElement>): React.JSX.Element;