import { ENDPOINTS } from "./endpoints";
import { request, STORE_ID } from "./http";
import type { SearchSuggestions } from "@/features/search/model/types";

// Ціна залежить від покупця (роздріб чи дроп), тож з токеном і без спільного кешу.
export const fetchSearchSuggestions = (query: string, modelSlug?: string) =>
  request<SearchSuggestions>(ENDPOINTS.searchSuggest(STORE_ID), {
    auth: true,
    revalidate: false,
    params: { q: query, model: modelSlug },
  });

/** Лічильник запитів на бекенді — з нього видно, що шукають, а в каталозі немає. */
export const recordSearchQuery = (query: string) =>
  request<unknown>(ENDPOINTS.search(), { method: "POST", revalidate: false, body: { query } });
