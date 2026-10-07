"use client";

import { useTranslations } from "next-intl";
import { SuggestInput } from "@/components/ui/suggest-input";
import { useSuggestions } from "@/hooks/use-suggestions";
import { searchWarehouses } from "../api/np-search";
import type { WarehouseOption } from "../model/np-options";

interface WarehouseFieldProps {
  id: string;
  /** Без обраного міста поле вимкнене: відділення шукаємо лише в ньому. */
  cityRef: string;
  value: string;
  onType: (text: string) => void;
  onPick: (warehouse: WarehouseOption) => void;
  invalid?: boolean;
  describedBy?: string;
  className?: string;
}

export const WarehouseField = ({ id, cityRef, value, onType, onPick, invalid, describedBy, className }: WarehouseFieldProps) => {
  const t = useTranslations("novaPoshta");
  const query = value.trim();
  const { items, loading } = useSuggestions((signal) => searchWarehouses(cityRef, query, signal), `${cityRef}|${query}`, Boolean(cityRef));

  return (
    <SuggestInput
      id={id}
      value={value}
      onChange={onType}
      options={items}
      optionKey={(warehouse) => warehouse.ref}
      renderOption={(warehouse) => (
        <span className="flex flex-col gap-0.5">
          <span className="text-[15px] font-bold text-[#2E2E2E]">{warehouse.title}</span>
          {warehouse.hint && <span className="text-[13px] text-[#6B6B6B]">{warehouse.hint}</span>}
        </span>
      )}
      onPick={onPick}
      loading={loading}
      loadingText={t("searching")}
      emptyText={t("noWarehouse")}
      placeholder={cityRef ? t("warehousePlaceholder") : t("pickCityFirst")}
      disabled={!cityRef}
      invalid={invalid}
      describedBy={describedBy}
      className={className}
    />
  );
};
