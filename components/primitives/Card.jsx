const cx = (...a) => a.filter(Boolean).join(" ");


/**
 * The surface. `interactive` is not cosmetic — it adds the pointer, the focus
 * ring and the press state a clickable card legally needs, and switches the
 * element to a button unless you pass `href`.
 *
 * `tone` is the judgement the card carries on its own surface — the before/after
 * pair a marketing page needs to read as failure versus success, not as two
 * equal columns. It is a STATIC inset ring, the same geometry as selection
 * (no layout, cannot shift a grid row), and it does not repaint the text: body
 * copy keeps `--lw-fg-muted`, because a judgement that recolours the prose is
 * louder than the prose. `glow` stays what it was — the hover affordance.
 *
 * `dashed` is the surface for something that does not exist yet: no fill, a
 * dashed outline. A concept beside a shipping product must not wear the same
 * card, or the row claims they are equals.
 *
 * `divided` reads the card as rows — the head and each row edge to edge with a
 * hairline between — and turns a tone into a bar along the top.
 */
export function Card({ interactive = false, glow = false, tone, dashed = false, divided = false, selected, as, className, children, ...rest }) {
  const Tag = as || (interactive ? (rest.href ? "a" : "button") : "div");
  return (
    <Tag
      className={cx("lw-card", interactive && "lw-card-interactive", glow && "lw-card-glow", tone && `lw-card-${tone}`, dashed && "lw-card-dashed", divided && "lw-card-divided", className)}
      /* aria-pressed, not aria-selected: the latter is only valid on
         gridcell/option/row/tab, so on a div or a button it was invalid and
         ignored. data-selected drives the CSS either way. */
      aria-pressed={interactive && selected != null ? !!selected : undefined}
      data-selected={selected ? "true" : undefined}
      type={Tag === "button" ? "button" : undefined}
      {...rest}
    >{children}</Tag>
  );
}
export function CardHead({ className, children, ...rest }) { return <div className={cx("lw-card-head", className)} {...rest}>{children}</div>; }
export function CardTitle({ as: Tag = "h3", className, children, ...rest }) { return <Tag className={cx("lw-card-title", className)} {...rest}>{children}</Tag>; }
export function CardBody({ className, children, ...rest }) { return <p className={cx("lw-card-body", className)} {...rest}>{children}</p>; }
