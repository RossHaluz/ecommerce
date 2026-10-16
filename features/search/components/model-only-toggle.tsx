"use client";

import { useTranslations } from "next-intl";
import { cn } from "@/lib/utils";

interface ModelOnlyToggleProps {
  modelName: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
}

/** «Лише для Q8 (2018–2023)» — звужує підказки й результати до обраної Audi. */
export const ModelOnlyToggle = ({ modelName, checked, onChange }: ModelOnlyToggleProps) => {
  const t = useTranslations("search");

  return (
    <label className="flex min-h-[44px] cursor-pointer items-center gap-3 rounded-lg bg-[#F7F7F7] px-3 text-sm font-bold text-[#2E2E2E]">
      <input type="checkbox" checked={checked} onChange={(event) => onChange(event.target.checked)} className="peer sr-only" />
      <span
        aria-hidden
        className={cn(
          "relative h-6 w-10 shrink-0 rounded-full bg-[#CFCFCF] transition-colors peer-focus-visible:ring-2 peer-focus-visible:ring-[#C0092A]",
          "after:absolute after:left-0.5 after:top-0.5 after:h-5 after:w-5 after:rounded-full after:bg-white after:transition-transform",
          checked && "bg-[#C0092A] after:translate-x-4",
        )}
      />
      {t("onlyForModel", { model: modelName })}
    </label>
  );
};
