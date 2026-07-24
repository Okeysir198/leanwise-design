import { forwardRef } from 'react';
import type {
  AnchorHTMLAttributes,
  ButtonHTMLAttributes,
  ReactNode,
  Ref,
} from 'react';

/* =============================================================================
   <Button> — the .lw-btn primitive with variant + optional trailing arrow.
   Forwards its ref; renders a native <button> (default) or <a> (as="a"). Native
   focus is never broken — no custom focus management, :focus-visible comes from
   the package CSS.

   Variants map 1:1 to the package classes:
     primary → .lw-btn-primary  (orange — the one CTA per view)
     brand   → .lw-btn-brand    (teal — secondary emphasis)
     ink     → .lw-btn-ink      (navy — high-contrast neutral)
     ghost   → .lw-btn-ghost    (outlined)
     link    → .lw-btn-link     (inline text link)
   ============================================================================= */

export type ButtonVariant = 'primary' | 'brand' | 'ink' | 'ghost' | 'link';

const VARIANT_CLASS: Record<ButtonVariant, string> = {
  primary: 'lw-btn-primary',
  brand: 'lw-btn-brand',
  ink: 'lw-btn-ink',
  ghost: 'lw-btn-ghost',
  link: 'lw-btn-link',
};

type CommonProps = {
  /** Visual variant. Default `primary`. */
  variant?: ButtonVariant;
  /** Appends an animated trailing arrow (`<span class="arrow">→</span>`). */
  arrow?: boolean;
  className?: string;
  children?: ReactNode;
};

export type ButtonProps = CommonProps &
  (
    | ({ as?: 'button' } & Omit<
        ButtonHTMLAttributes<HTMLButtonElement>,
        keyof CommonProps
      >)
    | ({ as: 'a'; href?: string } & Omit<
        AnchorHTMLAttributes<HTMLAnchorElement>,
        keyof CommonProps
      >)
  );

export const Button = forwardRef<HTMLElement, ButtonProps>(function Button(
  props,
  ref,
) {
  const { variant = 'primary', arrow, className, children, as, ...rest } = props;
  const cls = ['lw-btn', VARIANT_CLASS[variant], className ?? '']
    .filter(Boolean)
    .join(' ');

  const content = (
    <>
      {children}
      {arrow ? (
        <span className="arrow" aria-hidden="true">
          →
        </span>
      ) : null}
    </>
  );

  if (as === 'a') {
    return (
      <a
        ref={ref as Ref<HTMLAnchorElement>}
        className={cls}
        {...(rest as AnchorHTMLAttributes<HTMLAnchorElement>)}
      >
        {content}
      </a>
    );
  }

  return (
    <button
      // type="button" so it never accidentally submits a host form.
      type="button"
      ref={ref as Ref<HTMLButtonElement>}
      className={cls}
      {...(rest as ButtonHTMLAttributes<HTMLButtonElement>)}
    >
      {content}
    </button>
  );
});
