import * as React from "react";

export interface UploadFile {
  id?: string | number;
  name: string;
  size?: number;
  state?: "queued" | "uploading" | "done" | "error";
  /** 0–100. Shown as a bar while `state === "uploading"`. */
  progress?: number;
  /** Shown in place of the size when `state === "error"`. Say what and why. */
  error?: string;
}
export interface FileUploadProps extends React.HTMLAttributes<HTMLDivElement> {
  /** The list you are tracking. The component does not upload — you do. */
  files?: UploadFile[];
  onFiles?(files: File[]): void;
  onRemove?(file: UploadFile): void;
  accept?: string;
  multiple?: boolean;
  /** Bytes. Oversize files are rejected by name, with the limit stated. */
  maxSize?: number;
  disabled?: boolean;
  /* --- Display text. Every user-visible string this component renders is a
     prop, because a component library cannot hold display text (v1.3.1). --- */
  title?: string;
  hint?: string;
  /** The `role="alert"` rejection message. `limit` is `maxSize` already formatted. */
  formatRejected?(names: string, limit: string): React.ReactNode;
  /** The default hint, when `hint` is not given. `limit` is pre-formatted or null. */
  formatHint?(accept: string | undefined, limit: string | null): React.ReactNode;
  formatRemoveLabel?(fileName: string): string;
}
/** Dropzone + file list. The zone is a `<label>` around a real file input. */
/** forwardRef since v1.2 — the ref reaches the file <input>, so react-hook-form's
 *  register(), a Controller's field.ref and .focus()-on-error all work. */
export declare const FileUpload: React.ForwardRefExoticComponent<
  FileUploadProps & React.RefAttributes<HTMLInputElement>
>;
/** "1.4 MB". Exported because a caller building its own row needs the same one. */
export declare function formatBytes(n?: number): string;
