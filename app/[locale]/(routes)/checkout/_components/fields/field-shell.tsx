import type { ReactNode } from "react";

interface FieldShellProps {
  id: string;
  label: string;
  required?: boolean;
  /** «(необов'язково)» поруч із підписом. */
  optionalNote?: string;
  error?: string;
  children: ReactNode;
}

/** Підпис над полем і помилка під ним — однакові для всіх полів оформлення. */
export const FieldShell = ({ id, label, required, optionalNote, error, children }: FieldShellProps) => (
  <div className="flex min-w-0 flex-col gap-1.5">
    <label htmlFor={id} className="text-sm font-bold text-[#484848]">
      {label}
      {required && <span className="text-[#C0092A]"> *</span>}
      {optionalNote && <span className="font-normal text-[#6B6B6B]"> {optionalNote}</span>}
    </label>
    {children}
    {error && (
      <p id={`${id}-error`} role="alert" className="m-0 text-[13px] font-bold text-[#A30722]">
        {error}
      </p>
    )}
  </div>
);
