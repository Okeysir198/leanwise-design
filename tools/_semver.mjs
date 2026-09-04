/**
 * The two-function semver the doctor needs — enough for "1.2.0"-style tags.
 * Split out of lw-doctor.mjs in v2.2.1 so it can be unit-tested: the doctor
 * runs on import (consumer mode is top-level), so a test could not reach
 * `satisfies` without executing it.
 */
export const cmp = (a, b) => {
  const pa = String(a).replace(/^v/, "").split(".").map(Number);
  const pb = String(b).replace(/^v/, "").split(".").map(Number);
  for (let i = 0; i < 3; i++) if ((pa[i] ?? 0) !== (pb[i] ?? 0)) return (pa[i] ?? 0) - (pb[i] ?? 0);
  return 0;
};

/**
 * A range is one or more comparators separated by whitespace, ALL of which must
 * hold (`">=1.4.0 <1.13.0"`). Until v2.2.1 only the first comparator was read and
 * the rest rode along inside its version string, so a two-sided range compared
 * against `NaN` and matched EVERY version — the first 2.x consumer was told a
 * 1.13.0 advisory still applied to it.
 */
export const satisfies = (version, range) => {
  const parts = String(range).trim().split(/\s+/);
  return parts.every((part) => {
    const m = part.match(/^([<>]=?)(.+)$/);
    if (!m) return version === part;
    const c = cmp(version, m[2]);
    return { "<": c < 0, "<=": c <= 0, ">": c > 0, ">=": c >= 0 }[m[1]];
  });
};
