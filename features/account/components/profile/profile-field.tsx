import { forwardRef, type InputHTMLAttributes } from "react";

interface ProfileFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
}

/** A bordered field on white, so it reads as something to type into rather than as plain text. */
export const ProfileField = forwardRef<HTMLInputElement, ProfileFieldProps>(({ label, error, id, ...input }, ref) => (
  <label htmlFor={id} className="flex flex-col gap-1.5 text-[13px] font-extrabold text-[#6B6B6B]">
    {label}
    <input
      ref={ref}
      id={id}
      aria-invalid={Boolean(error)}
      className="h-12 w-full rounded-[10px] border border-[#CFCFCF] bg-white px-3.5 text-base font-normal text-[#2E2E2E] outline-none transition-colors placeholder:text-[#8A8A8A] focus:border-[#2E2E2E] focus:ring-2 focus:ring-[#2E2E2E]/15 aria-[invalid=true]:border-[#C0092A] read-only:bg-[#F7F7F7] read-only:text-[#6B6B6B]"
      {...input}
    />
    {error && <span className="text-[13px] font-semibold text-[#C0092A]">{error}</span>}
  </label>
));

ProfileField.displayName = "ProfileField";
