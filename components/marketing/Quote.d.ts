import * as React from "react";

/** `role` here is the speaker's job title, not the ARIA attribute — hence the `Omit`. */
export interface QuoteProps extends Omit<React.BlockquoteHTMLAttributes<HTMLQuoteElement>, "role"> {
  /** Required for the attribution line to render at all — an unattributable quote is an invented one. */
  name?: React.ReactNode;
  role?: React.ReactNode;
}
/**
 * A standalone pull quote. Shares its brand spine with `StoryCard`'s quote
 * through one declaration block in `marketing.css`
 * (`.lw-quote, .lw-story .lw-story-quote`) — one drawing, one owner. `StoryCard`
 * cannot express a quote outside a case-study card, which is why this exists.
 */
export declare function Quote(props: QuoteProps): React.JSX.Element;
