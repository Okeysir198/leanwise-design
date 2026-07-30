import * as React from "react";

export interface PromptInputProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "onChange" | "onSubmit"> {
  value?: string;
  onChange?: (value: string) => void;
  onSubmit?: () => void;
  placeholder?: string;
  /** Mono affordance line. Set "" to hide. */
  hint?: React.ReactNode;
  /** Left-side controls: attach, model picker, scope. */
  tools?: React.ReactNode;
  /** The send button. */
  action?: React.ReactNode;
  /** Replaces the whole footer row — tools, hint and action together. */
  children?: React.ReactNode;
  disabled?: boolean;
}
export declare function PromptInput(props: PromptInputProps): JSX.Element;