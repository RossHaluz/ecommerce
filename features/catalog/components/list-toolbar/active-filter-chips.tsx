"use client";

import { useTranslations } from "next-intl";
import { X } from "lucide-react";
import { DEFAULT_FILTERS } from "../../lib/list-filters";
import { useListFilters } from "../../hooks/use-list-filters";
import { useFilterLabels } from "./use-filter-labels";

/** Що зараз звужує список — видно й знімається одним кліком, без повторного відкриття вікна. */
export const ActiveFilterChips = () => {
  const t = useTranslations("filters");
  const labels = useFilterLabels();
  const { filters, apply, reset } = useListFilters();
  const chips = [
    filters.stock !== DEFAULT_FILTERS.stock && { name: labels.stock[filters.stock], clear: () => apply({ ...filters, stock: DEFAULT_FILTERS.stock }) },
    filters.sort !== DEFAULT_FILTERS.sort && { name: labels.sort[filters.sort], clear: () => apply({ ...filters, sort: DEFAULT_FILTERS.sort }) },
  ].filter((chip): chip is { name: string; clear: () => void } => Boolean(chip));

  if (!chips.length) return null;

  return (
    <div className="hidden flex-wrap items-center gap-2 md:flex">
      {chips.map((chip) => (
        <button
          key={chip.name}
          type="button"
          onClick={chip.clear}
          aria-label={t("remove", { name: chip.name })}
          className="flex h-8 items-center gap-1.5 rounded-full bg-[#2E2E2E] pl-3 pr-2.5 text-[13px] font-bold text-white"
        >
          {chip.name}
          <X size={14} strokeWidth={3} aria-hidden />
        </button>
      ))}
      {chips.length > 1 && (
        <button type="button" onClick={reset} className="h-8 px-1 text-[13px] font-bold text-[#C0092A] underline">
          {t("resetAll")}
        </button>
      )}
    </div>
  );
};
