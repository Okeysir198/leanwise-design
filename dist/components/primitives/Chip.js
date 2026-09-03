import { jsx } from "react/jsx-runtime";
import { normTone } from "../_tone.js";
const cx = (...a) => a.filter(Boolean).join(" ");
function Chip({ tone: toneIn = "brand", className, children, ...rest }) {
  const tone = normTone("Chip", toneIn);
  return /* @__PURE__ */ jsx("span", { className: cx("lw-chip", tone !== "brand" && `lw-chip-${tone}`, className), ...rest, children });
}
export {
  Chip
};
