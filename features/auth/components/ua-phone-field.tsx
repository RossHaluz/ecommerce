"use client";

import { forwardRef, type ComponentProps } from "react";
import CustomInputMask from "@/utils/phone-mask";
import { cn } from "@/lib/utils";

// The country code is fixed text, so a person types only the 9 digits they know by heart.
export const UA_NATIONAL_MASK = "99 999 99 99";
export const UA_NATIONAL_PATTERN = /^\d{2} \d{3} \d{2} \d{2}$/;

// react-input-mask reads `children` as a render function, so a plain input's children cannot pass through.
type Props = Omit<ComponentProps<"input">, "ref" | "children"> & { invalid?: boolean };

export const UaPhoneField = forwardRef<HTMLInputElement, Props>(({ invalid, className, ...props }, ref) => (
  <span
    className={cn(
      "flex h-[52px] overflow-hidden rounded-[10px] border-2 bg-white",
      invalid ? "border-[#C0092A]" : "border-[#2E2E2E]",
      className
    )}
  >
    <span className="flex items-center border-r border-[#E0E0E0] bg-[#F7F7F7] px-3.5 text-base font-bold text-[#2E2E2E]" aria-hidden>
      +380
    </span>
    <CustomInputMask
      {...props}
      ref={ref}
      mask={UA_NATIONAL_MASK}
      type="tel"
      inputMode="tel"
      autoComplete="tel-national"
      className="min-w-0 flex-1 border-0 px-3.5 text-[17px] font-semibold text-[#2E2E2E] outline-none"
    />
  </span>
));
UaPhoneField.displayName = "UaPhoneField";

/** «+380 67 383 42 83» (what was sent) → «67 383 42 83» (what the field shows). */
export const toNational = (phone: string) => phone.replace(/^\+380\s?/, "");
