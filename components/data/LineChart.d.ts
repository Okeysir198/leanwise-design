import * as React from "react";
import type { ChartProps } from "./BarChart";

export interface LineChartProps extends ChartProps {
  /** Fill under the line at 12% — for a single series, or two that do not cross. */
  area?: boolean;
  /**
   * BCP-47 tag for `Intl` number formatting in the point tooltips. Omit to
   * follow the browser. Added in v1.10.0 — the formatter was a module-level
   * singleton with no locale, so a chart in a Vietnamese view still grouped
   * its numbers the browser's way.
   */
  locale?: string;
}
/** The line and area chart. Same tokenised layer as `BarChart`. */
export declare function LineChart(props: LineChartProps): React.JSX.Element;
