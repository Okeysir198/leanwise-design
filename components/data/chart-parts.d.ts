/** Shared chart internals — the plot geometry and the a11y table both charts
 *  render. INTERNAL: deliberately not re-exported from react.js, because the
 *  frame is an implementation detail of BarChart/LineChart, not a contract.
 *  It carries types anyway so the .jsx/.d.ts pairing holds for every component
 *  file without exception.
 */
import type * as React from "react";

export interface ChartSeries {
  name: string;
  data: number[];
  /** Overrides the SERIES(i) palette slot. */
  color?: string;
}

export interface ChartFrame {
  w: number;
  pad: { t: number; r: number; b: number; l: number };
  /** Y-axis tick values, ascending; the last is the plot ceiling. */
  ts: number[];
  top: number;
  iw: number;
  ih: number;
  /** Maps a data value to its y coordinate in the SVG viewBox. */
  y: (v: number) => number;
}

export declare const cx: (...a: Array<string | false | null | undefined>) => string;
/** The i-th chart palette slot, wrapping at 8. */
export declare const SERIES: (i: number) => string;
export declare const nf: Intl.NumberFormat;
export declare const CHART_W: number;
export declare const CHART_PAD: { t: number; r: number; b: number; l: number };

export declare function ticks(max: number, n?: number): number[];
export declare function frame(max: number, height: number): ChartFrame;

export interface DataTableProps {
  labels: string[];
  series: ChartSeries[];
  caption: string;
}
export declare function DataTable(props: DataTableProps): React.JSX.Element;

export interface LegendProps {
  series: ChartSeries[];
}
export declare function Legend(props: LegendProps): React.JSX.Element | null;

export interface GridProps {
  f: ChartFrame;
}
export declare function Grid(props: GridProps): React.JSX.Element;
