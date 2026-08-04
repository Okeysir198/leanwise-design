import { Icon } from "./Icon.jsx";

const cx = (...a) => a.filter(Boolean).join(" ");

/** A disclosure row — the FAQ answer, the "show the detail" toggle.
 *
 *  It is a native `<details>`/`<summary>` and not a scripted accordion, and
 *  that is the whole design: the pattern is COMPLETE with zero JavaScript. The
 *  page opens and closes every row before hydration, with a failed bundle, and
 *  with JS off — where a scripted accordion is a list of dead headings. There
 *  is no `open` state here and no effect; the browser owns the state.
 *
 *  Uncontrolled on purpose. `defaultOpen` is applied once, and React only
 *  re-applies a DOM prop when the prop itself changes, so a re-render of the
 *  parent does not slam a row the reader just opened. A consumer that needs to
 *  know observes `onToggle`, which the element fires itself — passing `open`
 *  instead makes it controlled, and then the consumer owns re-opening it.
 *
 *  The chevron is `<Icon name="chevron-down">`, never a CSS triangle: one
 *  drawing, one owner. The CSS rotates it on `[open]`; there is no height
 *  animation, because `<details>` cannot animate its own height portably and
 *  the motion policy is a 100-200ms state change either way.
 */
export function Disclosure({ summary, defaultOpen = false, className, children, ...rest }) {
  return (
    <details className={cx("lw-disclosure", className)} open={defaultOpen || undefined} {...rest}>
      {/* The label is wrapped so the flex row has two children to push apart —
          bare text plus an svg would leave the chevron's position dependent on
          how many text nodes the caller happened to pass. */}
      <summary><span>{summary}</span><Icon name="chevron-down" size={18} /></summary>
      <div className="lw-disclosure-body">{children}</div>
    </details>
  );
}
