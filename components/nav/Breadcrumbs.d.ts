import * as React from "react";

export interface Crumb { label: React.ReactNode; href?: string }
export interface BreadcrumbsProps extends React.HTMLAttributes<HTMLElement> { items?: Crumb[] }
/**
 * Mono, so the trail reads as a PATH rather than as a sentence. The last crumb is the
 * current page: it is rendered as plain text with `aria-current`, not as a link to
 * where you already are. Pass the full ancestry — a truncated trail is the one thing
 * breadcrumbs exist to prevent.
 */
export declare function Breadcrumbs(props: BreadcrumbsProps): React.JSX.Element;