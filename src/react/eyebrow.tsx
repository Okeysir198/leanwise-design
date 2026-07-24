import type { HTMLAttributes, ReactNode } from 'react';

/* =============================================================================
   <Eyebrow> — the signature mono, uppercase, wide-tracked label with a teal
   dot. Renders `.lw-eyebrow`. `muted` swaps to the faint tier (`.lw-eyebrow.muted`).
   ============================================================================= */

export type EyebrowProps = Omit<HTMLAttributes<HTMLDivElement>, 'children'> & {
  /** Use the faint tier (`.lw-eyebrow.muted`) — for secondary section labels. */
  muted?: boolean;
  children?: ReactNode;
};

export function Eyebrow({ muted, className, children, ...rest }: EyebrowProps) {
  const cls = ['lw-eyebrow', muted ? 'muted' : '', className ?? '']
    .filter(Boolean)
    .join(' ');
  return (
    <div className={cls} {...rest}>
      {children}
    </div>
  );
}
