import { Avatar } from "../primitives/Avatar.jsx";
const cx = (...a) => a.filter(Boolean).join(" ");


/**
 * Author, role, date. The face is the existing `Avatar` — initials unless a real
 * `src` is supplied, never a generated portrait, because a placeholder person is
 * a fabrication.
 *
 * The date is a real <time> with a machine-readable `dateTime` when the caller
 * supplies an ISO string, so the same markup serves the reader and the crawler.
 */
export function Byline({ name, role, date, dateTime, src, size = "md", className, children, ...rest }) {
  return (
    <div className={cx("lw-byline", className)} {...rest}>
      {name && <Avatar name={name} src={src} size={size} />}
      {name && <span className="name">{name}</span>}
      {role && <span className="role">{role}</span>}
      {date && <time className="date" dateTime={dateTime}>{date}</time>}
      {children}
    </div>
  );
}
