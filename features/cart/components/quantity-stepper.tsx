"use client";

import { useTranslations } from "next-intl";
import { Minus, Plus } from "lucide-react";
import { cn } from "@/lib/utils";

interface QuantityStepperProps {
  value: number;
  max: number;
  onChange: (quantity: number) => void;
  size?: "md" | "lg";
  /** Назва товару — щоб скрінрідер казав «Менше: Накладка дверки», а не просто «Менше». */
  label: string;
}

/** «+» сірий на залишку: людина бачить межу заздалегідь, а не отримує відмову після натискання. */
export const QuantityStepper = ({ value, max, onChange, size = "md", label }: QuantityStepperProps) => {
  const t = useTranslations("cart");
  const height = size === "lg" ? "h-[52px]" : "h-11";
  const button = cn("flex w-11 items-center justify-center text-[#2E2E2E] disabled:text-[#C4C4C4]", height);

  return (
    <div className={cn("flex shrink-0 items-center rounded-lg border border-[#CFCFCF] bg-white", height)}>
      <button type="button" className={button} disabled={value <= 1} onClick={() => onChange(value - 1)} aria-label={`${t("decrease")}: ${label}`}>
        <Minus size={18} aria-hidden />
      </button>
      <output aria-live="polite" className="min-w-[28px] text-center text-base font-extrabold text-[#2E2E2E]">
        {value}
      </output>
      <button type="button" className={button} disabled={value >= max} onClick={() => onChange(value + 1)} aria-label={`${t("increase")}: ${label}`}>
        <Plus size={18} aria-hidden />
      </button>
    </div>
  );
};
