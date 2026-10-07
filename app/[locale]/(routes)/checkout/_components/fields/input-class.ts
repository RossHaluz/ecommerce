import { cn } from "@/lib/utils";

/** 16px шрифт обов'язковий: менший змушує iOS збільшувати сторінку при фокусі. */
export const inputClass = (hasError: boolean) =>
  cn(
    "h-12 w-full min-w-0 rounded-lg bg-white px-3 text-base text-[#2E2E2E] outline-none placeholder:text-[#9A9A9A]",
    hasError ? "border-2 border-[#C0092A]" : "border border-[#CFCFCF] focus:border-2 focus:border-[#484848]"
  );
