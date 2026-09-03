import * as React from "react";

export interface PasswordMeterProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * 0–4. YOURS to compute — from zxcvbn, a server policy, a length rule.
   * This component scores nothing: a design system that shipped its own
   * estimator would be making a security claim it cannot support, and would
   * disagree with the server that actually enforces the rule.
   */
  level?: number;
  /* --- Display text. --- */
  /** The word beside the bar. Never colour alone — four bars are one picture. */
  label?: React.ReactNode;
  /** Or a lookup by level, when the word follows the score. */
  labels?: Record<number, React.ReactNode>;
}
export declare function PasswordMeter(props: PasswordMeterProps): React.JSX.Element;
