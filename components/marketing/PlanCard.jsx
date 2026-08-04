import { Icon } from "../primitives/Icon.jsx";

const cx = (...a) => a.filter(Boolean).join(" ");

/**
 * A pricing plan. Composes `.lw-card` — border, radius and padding come from
 * there, and this adds only the column geometry.
 *
 * **`price` IS OPTIONAL, AND A CARD WITHOUT ONE IS COMPLETE.** Nothing in the
 * CSS reserves a price slot: no `min-block-size`, no placeholder, no `content`.
 * A plan with no `price` simply renders no price element and the column closes
 * up. That is the reason this component exists rather than living in the
 * consumer — the site that prompted it publishes no price, no currency and no
 * range, and a component that reserved the slot would force it to invent one.
 * An invented price is a fabrication, which is the exact failure mode that
 * codebase keeps relapsing into.
 *
 * `featured` adds a brand edge and a lift and NOTHING else. For a dark featured
 * plan, put `data-band="dark"` on the card: every child ink re-points with zero
 * overrides. The consumer this replaces restated five child colours to do it.
 *
 * An excluded feature is never colour alone — it gets a DIFFERENT GLYPH
 * (`minus`, not `check`), a muted ink and an `.lw-sr-only` word, so it survives
 * greyscale, colour blindness and a screen reader.
 *
 * There is deliberately **no `PlanGrid` and no `BillingToggle`**. `<Grid
 * min={280}>` already auto-fits and stretches; a billing period is a two-way
 * exclusive choice, which is `Segmented`. Both non-additions are recorded in
 * the README and the CHANGELOG, because this is the item most likely to be
 * re-litigated. `.lw-theme-toggle` was deleted for being exactly this kind of
 * duplicate.
 */
export function PlanCard({
  name,
  tagline,
  price,
  unit,
  period,
  desc,
  features = [],
  cta,
  featured,
  ribbon,
  includedLabel = "Included",
  excludedLabel = "Not included",
  linkAs = "a",
  className,
  ...rest
}) {
  // Destructured out of `rest` above so it can never leak onto a DOM node.
  const Link = linkAs;
  // `cta` is a ReactNode when the consumer wants full control, or `{ label,
  // href }` when it just wants the standard CTA — the object form is what makes
  // `linkAs` reachable, and a marketing site behind a router needs it or the
  // plan CTA does a full page load.
  const ctaObject = cta && typeof cta === "object" && !cta.$$typeof && cta.label;

  return (
    <div className={cx("lw-card", "lw-plan", featured && "lw-plan-featured", className)} {...rest}>
      {ribbon && <span className="lw-pill lw-plan-ribbon">{ribbon}</span>}

      <div>
        <h3 className="lw-plan-name">{name}</h3>
        {tagline && <span className="lw-plan-tagline">{tagline}</span>}
      </div>

      {/* Rendered only when there is a price. This absence IS the feature. */}
      {price != null && (
        <p className="lw-plan-price">
          <span className="price">{price}</span>
          {unit && <span className="unit">{unit}</span>}
          {period && <span className="period">{period}</span>}
        </p>
      )}

      {desc && <p className="lw-plan-desc">{desc}</p>}

      {features.length > 0 && (
        <ul className="lw-plan-features">
          {features.map((f, i) => {
            const included = f.included !== false;
            return (
              // The glyph is aria-hidden, so WITHOUT this word an included and
              // an excluded row are read out identically. It leads the row so
              // it is announced as "Included: SSO", and it is a prop because
              // the primary consumer is bilingual. Absolutely positioned, so it
              // is not a flex item and takes no gap.
              <li className="lw-plan-feature" key={i} data-included={included ? "true" : "false"}>
                <span className="lw-sr-only">{included ? includedLabel : excludedLabel}: </span>
                <Icon name={included ? "check" : "minus"} size={16} />
                <span>{f.label}</span>
              </li>
            );
          })}
        </ul>
      )}

      {cta && (
        <div className="lw-plan-foot">
          {ctaObject
            // The classes, not <Button>: Button is "use client", and importing
            // it would drag this whole card across the server/client boundary
            // for no behaviour it needs. `brand`, never `cta` — the amber is
            // one per VIEW, and a plans row renders three of these.
            ? <Link className={cx("lw-btn", featured ? "lw-btn-brand" : "lw-btn-ghost")} href={cta.href}>{cta.label}</Link>
            : cta}
        </div>
      )}
    </div>
  );
}
