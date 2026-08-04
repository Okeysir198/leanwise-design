import * as React from "react";

/** `title` and `role` carry richer meanings here than the DOM attributes of the
 *  same name, so the inherited ones have to be removed or the interface does not
 *  extend cleanly. Same shape as `StoryCardProps`. */
export interface ArticleCardProps extends Omit<React.HTMLAttributes<HTMLElement>, "title" | "role"> {
  title: React.ReactNode;
  /** The standfirst. */
  dek?: React.ReactNode;
  href?: string;
  /** Renders as `.lw-eyebrow` — the same type as a section eyebrow. */
  category?: React.ReactNode;
  /** Inert `.lw-pill`s here: the whole card is already the link, and a link inside a link is unreachable. */
  tags?: React.ReactNode[];
  author?: React.ReactNode;
  /** The author's job title. */
  role?: React.ReactNode;
  date?: React.ReactNode;
  dateTime?: string;
  avatar?: string;
  readMinutes?: number;
  /** An `<img>` (or any node) for `.lw-card-media` — the card's bleed-to-edge top slot. */
  cover?: React.ReactNode;
  /**
   * Replaces the anchor ELEMENT when `href` is set. Default `"a"`. It receives
   * what the raw `<a>` would: `href`, `className` and `children`.
   */
  linkAs?: React.ElementType;
}
/**
 * A blog / resources index entry, composed from `Card` + `CardHead`/`CardTitle`/
 * `CardBody`/`CardFoot` + `.lw-card-media` + `Byline` + `.lw-pill`. There is no
 * `.lw-post` class behind it and there is not going to be — a row of these is a
 * `Grid`, and the article page itself is a `Split`.
 */
export declare function ArticleCard(props: ArticleCardProps): React.JSX.Element;
