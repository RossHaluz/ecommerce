"use client";

import { useState, type KeyboardEvent } from "react";
import { useRouter } from "@/i18n/routing";
import { recordSearch } from "@/actions/search";
import { useMyModel } from "@/features/car-model/hooks/use-my-model";
import { searchQueryOf } from "../model/search-query";
import { searchModelFilter } from "../model/search-model-filter";
import { looksLikeOe } from "../model/exact-oe";
import { productHref, searchResultsHref } from "../model/results-href";
import { useSearchSuggest } from "./use-search-suggest";
import { useRecentQueries } from "./use-recent-queries";

/** Усе, чим живе поле пошуку: набране, відкрита панель, «лише для моєї Audi», клавіатура й переходи. */
export const useSearchBox = () => {
  const router = useRouter();
  const { current, remembered } = useMyModel();
  const myModel = current ?? remembered ?? null;
  const [value, setValue] = useState("");
  const [isOpen, setOpen] = useState(false);
  const [onlyMyModel, setOnlyMyModel] = useState(true);
  const [activeIndex, setActiveIndex] = useState(-1);
  const recentQueries = useRecentQueries();

  const modelSlug = searchModelFilter(value, onlyMyModel, myModel?.modelName ?? null);
  const suggest = useSearchSuggest(value, modelSlug);
  const products = suggest.data?.products ?? [];

  const close = () => {
    setOpen(false);
    setActiveIndex(-1);
  };

  const search = (raw: string) => {
    const query = searchQueryOf(raw);
    if (!query) return;
    setValue(query);
    recentQueries.remember(query);
    void recordSearch(query);
    close();
    router.push(searchResultsHref(query, modelSlug));
  };

  /** Перехід за підказкою: запит лишається в історії, панель закривається. */
  const leave = () => {
    const query = searchQueryOf(value);
    if (query) recentQueries.remember(query);
    close();
  };

  const openProduct = (slug: string) => {
    leave();
    router.push(productHref(slug));
  };

  const onKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Escape") return close();
    if (event.key === "ArrowDown" || event.key === "ArrowUp") {
      event.preventDefault();
      setOpen(true);
      const step = event.key === "ArrowDown" ? 1 : -1;
      setActiveIndex((index) => Math.max(-1, Math.min(products.length - 1, index + step)));
      return;
    }
    if (event.key === "Enter" && activeIndex >= 0 && products[activeIndex]) {
      event.preventDefault();
      openProduct(products[activeIndex].slug);
    }
  };

  return {
    value,
    setValue: (next: string) => {
      setValue(next);
      setActiveIndex(-1);
      setOpen(true);
    },
    isOpen,
    open: () => setOpen(true),
    close,
    activeIndex,
    onKeyDown,
    search,
    leave,
    suggestions: suggest.data,
    isLoading: suggest.isFetching,
    hasQuery: Boolean(searchQueryOf(value)),
    myModel,
    /** Для OE-номера перемикач моделі нічого не змінює, тож його не показуємо. */
    canNarrowByModel: Boolean(myModel) && !looksLikeOe(value),
    onlyMyModel,
    setOnlyMyModel,
    modelSlug,
    recentQueries,
  };
};

export type SearchBoxState = ReturnType<typeof useSearchBox>;
