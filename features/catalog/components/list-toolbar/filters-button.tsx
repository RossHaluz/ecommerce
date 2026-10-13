"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { SlidersHorizontal } from "lucide-react";
import { activeFilterCount } from "../../lib/list-filters";
import { useListFilters } from "../../hooks/use-list-filters";
import { FiltersSheet } from "./filters-sheet";

const BUTTON = "flex h-11 shrink-0 items-center gap-1.5 rounded-[10px] border border-[#CFCFCF] bg-white px-3.5 text-[15px] font-extrabold text-[#2E2E2E]";

/** Заглушка для Suspense: та сама кнопка, щоб у кешованому HTML нічого не стрибало. */
export const FiltersButtonPlaceholder = () => {
  const t = useTranslations("filters");
  return (
    <span className={BUTTON} aria-hidden>
      <SlidersHorizontal size={18} />
      {t("filters")}
    </span>
  );
};

export const FiltersButton = () => {
  const t = useTranslations("filters");
  const { filters, apply } = useListFilters();
  const [open, setOpen] = useState(false);
  const count = activeFilterCount(filters);

  return (
    <>
      <button type="button" onClick={() => setOpen(true)} className={BUTTON}>
        <SlidersHorizontal size={18} aria-hidden />
        {t("filters")}
        {count > 0 && <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-[#2E2E2E] px-1 text-xs text-white">{count}</span>}
      </button>
      <FiltersSheet open={open} onOpenChange={setOpen} filters={filters} onApply={apply} />
    </>
  );
};
