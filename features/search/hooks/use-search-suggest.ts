"use client";

import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { getSearchSuggestions } from "@/actions/search";
import { useDebouncedValue } from "@/hooks/use-debounced-value";
import { queryKeys } from "@/lib/query-keys";
import { searchQueryOf } from "../model/search-query";

const TYPING_PAUSE_MS = 250;
const ONE_MINUTE = 60_000;

/** Підказки для того, що набрано; поки йде новий запит, видно попередні — список не блимає. */
export const useSearchSuggest = (value: string, modelSlug: string | null) => {
  const query = searchQueryOf(useDebouncedValue(value, TYPING_PAUSE_MS));

  return useQuery({
    queryKey: queryKeys.searchSuggest(query ?? "", modelSlug),
    queryFn: () => getSearchSuggestions(query, modelSlug ?? undefined),
    enabled: Boolean(query),
    staleTime: ONE_MINUTE,
    placeholderData: keepPreviousData,
  });
};
