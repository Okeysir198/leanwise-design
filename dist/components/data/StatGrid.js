import { jsx } from "react/jsx-runtime";
import { Grid } from "../layout/Grid.js";
const cx = (...a) => a.filter(Boolean).join(" ");
function StatGrid({ className, ...rest }) {
  return /* @__PURE__ */ jsx(Grid, { className: cx("lw-stat-grid", className), ...rest });
}
export {
  StatGrid
};
