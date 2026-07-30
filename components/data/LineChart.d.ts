import * as React from "react";
import type { ChartProps } from "./BarChart";

export interface LineChartProps extends ChartProps {
  /** Fill under the line at 12% — for a single series, or two that do not cross. */
  area?: boolean;
}
/** The line and area chart. Same tokenised layer as `BarChart`. */
export declare function LineChart(props: LineChartProps): JSX.Element;
