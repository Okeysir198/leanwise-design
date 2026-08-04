import { Card, CardHead, CardTitle, CardBody, CardFoot } from "../primitives/Card.jsx";
import { Byline } from "./Byline.jsx";
const cx = (...a) => a.filter(Boolean).join(" ");


/**
 * A blog / resources index entry.
 *
 * There is NO `.lw-post` class behind this and there deliberately is not going
 * to be: the card is `.lw-card` + `CardHead`/`CardBody`/`CardFoot` +
 * `.lw-card-media` + `.lw-byline` + `.lw-pill`, all of which this system already
 * ships. A row of them is a `Grid`. CONTRIBUTING's first rule is to prove a
 * thing is not already here, and for the index card the honest answer was that
 * it already was — what was missing were the two atoms (`.lw-byline`,
 * `.lw-pill-link`) and somewhere to write the composition down. This is that.
 *
 * The whole card is the link, so there is ONE tab stop rather than one per tag
 * and one per title. That is also why `tags` render as inert `.lw-pill`s here:
 * a link inside a link is invalid HTML and unreachable by keyboard. Tags become
 * `.lw-pill-link` anchors on the article page itself, where they are the only
 * link in their row.
 *
 * `linkAs` replaces the anchor ELEMENT (default `"a"`) — a router's Link, so the
 * card navigates client-side and keeps whatever path prefix that Link applies.
 * It receives what the raw <a> would: `href`, `className` and `children`.
 */
export function ArticleCard({
  title, dek, href, category, tags = [], author, role, date, dateTime, avatar,
  readMinutes, cover, linkAs = "a", className, ...rest
}) {
  return (
    <Card as={href ? linkAs : "div"} interactive={Boolean(href)} href={href}
      className={cx(className)} {...rest}>
      {cover && <span className="lw-card-media">{cover}</span>}
      {category && <CardHead><span className="lw-eyebrow">{category}</span></CardHead>}
      <CardTitle>{title}</CardTitle>
      {dek && <CardBody>{dek}</CardBody>}
      {tags.length > 0 && (
        <div className="lw-cluster">
          {tags.map((t, i) => <span className="lw-pill" key={i}>{t}</span>)}
        </div>
      )}
      {(author || date || readMinutes != null) && (
        <CardFoot>
          {/* Read time rides the byline's own `.date` face (mono, xs, subtle)
              rather than inventing a class for one number. */}
          <Byline name={author} role={role} date={date} dateTime={dateTime} src={avatar} size="sm">
            {readMinutes != null && <span className="date">{readMinutes} min read</span>}
          </Byline>
        </CardFoot>
      )}
    </Card>
  );
}
