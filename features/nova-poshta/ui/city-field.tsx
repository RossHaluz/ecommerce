"use client";

import { useTranslations } from "next-intl";
import { SuggestInput } from "@/components/ui/suggest-input";
import { useSuggestions } from "@/hooks/use-suggestions";
import { searchCities } from "../api/np-search";
import type { CityOption } from "../model/np-options";

const MIN_QUERY = 2;

interface CityFieldProps {
  id: string;
  value: string;
  onType: (text: string) => void;
  onPick: (city: CityOption) => void;
  invalid?: boolean;
  describedBy?: string;
  className?: string;
}

export const CityField = ({ id, value, onType, onPick, invalid, describedBy, className }: CityFieldProps) => {
  const t = useTranslations("novaPoshta");
  const query = value.trim();
  const { items, loading } = useSuggestions((signal) => searchCities(query, signal), query, query.length >= MIN_QUERY);

  return (
    <SuggestInput
      id={id}
      value={value}
      onChange={onType}
      options={items}
      optionKey={(city) => city.ref}
      renderOption={(city) => <span className="text-[15px] text-[#2E2E2E]">{city.label}</span>}
      onPick={onPick}
      loading={loading}
      loadingText={t("searching")}
      emptyText={query.length >= MIN_QUERY ? t("noCity") : undefined}
      placeholder={t("cityPlaceholder")}
      invalid={invalid}
      describedBy={describedBy}
      className={className}
    />
  );
};
