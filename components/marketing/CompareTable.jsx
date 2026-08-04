import { Icon } from "../primitives/Icon.jsx";

const cx = (...a) => a.filter(Boolean).join(" ");

/**
 * A feature matrix — rows are capabilities, columns are plans, every cell is
 * the same yes/no/value.
 *
 * DISTINCT FROM `Table` BY MEANING, NOT BY LOOKS. `Table` is a DATA table: rows
 * are records, cells are values, it sorts and paginates. This one never sorts,
 * never paginates and has one repeated cell type. They read alike and behave
 * nothing alike, which is why one class cannot serve both without growing a
 * modifier for every difference.
 *
 * A cell is `true`, `false`/`null`, or a string. The booleans render as TWO
 * DIFFERENT GLYPHS — `check` in `--lw-success-on`, `minus` in `--lw-fg-subtle`
 * — each with its own `.lw-sr-only` word. Never colour alone, and never a typed
 * `✓`, which would be the same drawing a second time in the font and would be
 * announced as punctuation. Note `--lw-success` is a FILL and fails AA as text;
 * `--lw-success-on` is the theme-aware text variant.
 *
 * Server-safe: no state, no effects, no `"use client"`.
 */
export function CompareTable({
  columns = [],
  groups = [],
  caption,
  yesLabel = "Included",
  noLabel = "Not included",
  className,
  ...rest
}) {
  const cell = (v) => {
    if (v === true) {
      return (
        <span className="lw-compare-yes">
          <Icon name="check" size={16} />
          <span className="lw-sr-only">{yesLabel}</span>
        </span>
      );
    }
    if (v === false || v == null) {
      return (
        <span className="lw-compare-no">
          <Icon name="minus" size={16} />
          <span className="lw-sr-only">{noLabel}</span>
        </span>
      );
    }
    return v;
  };

  return (
    <div className="lw-compare-scroll">
      <table className={cx("lw-compare", className)} {...rest}>
        {caption && <caption>{caption}</caption>}
        <thead>
          <tr>
            {/* The corner outranks both sticky axes, so it needs its own class
                rather than a `:first-child` guess about what a consumer put
                there. */}
            <td className="lw-compare-corner" />
            {columns.map((c) => (
              <th key={c.key} scope="col" data-featured={c.featured || undefined}>{c.label}</th>
            ))}
          </tr>
        </thead>
        {/* One <tbody> per group — valid HTML, and it keeps a group's label row
            and its rows in one element for the sticky/zebra cascade. */}
        {groups.map((g, gi) => (
          <tbody key={gi}>
            {g.label && (
              <tr className="lw-compare-group">
                <th scope="colgroup" colSpan={columns.length + 1}>{g.label}</th>
              </tr>
            )}
            {g.rows.map((r, ri) => (
              <tr key={ri}>
                <th scope="row">{r.label}</th>
                {columns.map((c, ci) => (
                  <td key={c.key} data-featured={c.featured || undefined}>{cell(r.values[ci])}</td>
                ))}
              </tr>
            ))}
          </tbody>
        ))}
      </table>
    </div>
  );
}
