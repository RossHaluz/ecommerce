"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { useIsSmallScreen } from "@/hooks/useIsSmallScreen";
import { DEFAULT_FILTERS, SORTS, STOCKS, type ListFilters } from "../../lib/list-filters";
import { FilterOptionGroup } from "./filter-option-group";
import { useFilterLabels } from "./use-filter-labels";

interface FiltersSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  filters: ListFilters;
  onApply: (next: ListFilters) => void;
}

/** Вибір — чернетка до «Показати»: список не перезавантажується на кожен тап. */
export const FiltersSheet = ({ open, onOpenChange, filters, onApply }: FiltersSheetProps) => {
  const t = useTranslations("filters");
  const labels = useFilterLabels();
  const isPhone = useIsSmallScreen(1023);
  const [draft, setDraft] = useState(filters);

  const handleOpenChange = (next: boolean) => {
    if (next) setDraft(filters);
    onOpenChange(next);
  };
  const apply = (next: ListFilters) => {
    onApply(next);
    onOpenChange(false);
  };

  return (
    <Sheet open={open} onOpenChange={handleOpenChange}>
      <SheetContent
        side={isPhone ? "bottom" : "right"}
        className="flex flex-col gap-0 bg-white p-0 text-[#484848] max-lg:max-h-[90vh] max-lg:rounded-t-2xl sm:max-w-[420px]"
      >
        <SheetHeader className="space-y-0 px-4 pb-2 pr-12 pt-4 text-left">
          <SheetTitle className="text-xl font-extrabold text-[#2E2E2E]">{t("title")}</SheetTitle>
          <SheetDescription className="sr-only">{t("title")}</SheetDescription>
        </SheetHeader>
        <div className="flex min-h-0 flex-1 flex-col gap-5 overflow-y-auto px-4 py-2">
          <FilterOptionGroup legend={t("sortFirst")} name="sort" options={SORTS} labels={labels.sort} value={draft.sort} onChange={(sort) => setDraft({ ...draft, sort })} />
          <FilterOptionGroup legend={t("availability")} name="stock" options={STOCKS} labels={labels.stock} value={draft.stock} onChange={(stock) => setDraft({ ...draft, stock })} />
        </div>
        <div className="flex gap-2.5 border-t border-[#EEEEEE] px-4 pb-4 pt-3">
          <button type="button" onClick={() => apply(DEFAULT_FILTERS)} className="h-[52px] rounded-lg border border-[#CFCFCF] px-5 text-[15px] font-extrabold text-[#2E2E2E]">
            {t("reset")}
          </button>
          <button type="button" onClick={() => apply(draft)} className="h-[52px] flex-1 rounded-lg bg-[#C0092A] text-base font-extrabold text-white">
            {t("apply")}
          </button>
        </div>
      </SheetContent>
    </Sheet>
  );
};
