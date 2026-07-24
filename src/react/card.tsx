import type { ElementType, HTMLAttributes, ReactNode } from 'react';

/* =============================================================================
   <Card> — the `.lw-card` surface. Opt-in affordances:
     • `glow`      → adds `.lw-card-glow`   (brand border + shadow on hover)
     • `spotlight` → adds `.lw-spotlight`   (cursor radial highlight; needs the
                     useSpotlight driver mounted somewhere upstream)
     • `hover`     → adds `.lw-card.hover`  (lift on hover)
   `as` lets it render as any element (default `div`; use `article`, `a`, etc.).

   Forwards props (onClick, href when `as="a"`, aria-*). The package CSS owns
   all visuals; this component only emits classNames.
   ============================================================================= */

export type CardProps = HTMLAttributes<HTMLElement> & {
  /** Brand border-glow on hover (`.lw-card-glow`). */
  glow?: boolean;
  /** Cursor spotlight on hover (`.lw-spotlight`). */
  spotlight?: boolean;
  /** Lift + border emphasis on hover (`.lw-card.hover`). */
  hover?: boolean;
  /** Render as a different element. Default `div`. */
  as?: ElementType;
  children?: ReactNode;
};

export function Card({
  glow,
  spotlight,
  hover,
  as: Tag = 'div',
  className,
  children,
  ...rest
}: CardProps) {
  const cls = [
    'lw-card',
    glow ? 'lw-card-glow' : '',
    spotlight ? 'lw-spotlight' : '',
    hover ? 'hover' : '',
    className ?? '',
  ]
    .filter(Boolean)
    .join(' ');
  const Component = Tag as ElementType;
  return (
    <Component className={cls} {...rest}>
      {children}
    </Component>
  );
}
