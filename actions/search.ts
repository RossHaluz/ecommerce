"use server";

import * as api from "@/lib/api";
import { isSafePathSegment } from "@/lib/validation/path-segments";
import { NO_SUGGESTIONS, type SearchSuggestions } from "@/features/search/model/types";
import { searchQueryOf } from "@/features/search/model/search-query";

/** Підказки під полем пошуку; збій бекенда — порожній список, а не помилка посеред набору. */
export const getSearchSuggestions = async (raw: unknown, modelSlug?: unknown): Promise<SearchSuggestions> => {
  const query = searchQueryOf(raw);
  if (!query) return NO_SUGGESTIONS;
  try {
    return await api.fetchSearchSuggestions(query, isSafePathSegment(modelSlug) ? modelSlug : undefined);
  } catch (error) {
    console.error("[search] suggest:", error);
    return NO_SUGGESTIONS;
  }
};

export const recordSearch = async (raw: unknown): Promise<void> => {
  const query = searchQueryOf(raw);
  if (!query) return;
  // Лише статистика: її збій не має заважати покупцю перейти до результатів.
  await api.recordSearchQuery(query).catch((error) => console.error("[search] record:", error));
};
