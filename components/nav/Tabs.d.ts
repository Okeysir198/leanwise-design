import * as React from "react";

export interface Tab {
  value: string;
  label: React.ReactNode;
  count?: number | string;
  /** id of the tabpanel this tab controls. */
  controls?: string;
  /** id of the tab itself, for the panel's aria-labelledby. */
  id?: string;
}
export interface TabsProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "onChange"> {
  tabs?: Tab[];
  value?: string;
  onChange?: (value: string) => void;
  /** Accessible name for the tablist. */
  label?: string;
}
export declare function Tabs(props: TabsProps): JSX.Element;