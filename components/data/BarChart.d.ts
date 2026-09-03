import * as React from "react";

export interface ChartSeries {
  name: string;
  data: number[];
  /** Override the categorical token. Use a `--lw-chart-N`, never a raw hex. */
  color?: string;
}
export interface ChartProps extends React.HTMLAttributes<HTMLDivElement> {
  labels: string[];
  series: ChartSeries[];
  height?: number;
  /** Accessible name AND the caption of the data table behind the picture. */
  label: string;
}
export interface BarChartProps extends ChartProps { stacked?: boolean }
export interface LineChartProps extends ChartProps { area?: boolean   /**
   * BCP-47 tag for `Intl` number formatting in the point tooltips. Omit to
   * follow the browser. Added in v1.10.0 — the formatter was a module-level
   * singleton with no locale, so a chart in a Vietnamese view still grouped
   * its numbers the browser's way.
   */
  locale?: string;
}
/**
 * A thin tokenised layer over the two shapes a dashboard needs, not a charting
 * engine. Series colours come from `--lw-chart-1..8`, which lift a tier on the
 * dark ground; every chart renders its numbers as a visually hidden table,
 * because a picture of data is not readable and a summary is not the data.
 */
export declare function BarChart(props: BarChartProps): React.JSX.Element;
