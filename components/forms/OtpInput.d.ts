import * as React from "react";

export interface OtpInputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "onChange" | "value" | "type" | "maxLength"> {
  /** Digits expected. Default 6. */
  length?: number;
  value?: string;
  defaultValue?: string;
  /** Receives digits only — non-digits are stripped as they are typed or pasted. */
  onChange?(code: string): void;
  /**
   * Fires once when the code reaches `length`, and not again for the same
   * value — re-submitting a one-time code is how a valid code becomes a
   * "replayed" error.
   */
  onComplete?(code: string): void;
  invalid?: boolean;
}
export declare const OtpInput: React.ForwardRefExoticComponent<
  OtpInputProps & React.RefAttributes<HTMLInputElement>
>;
