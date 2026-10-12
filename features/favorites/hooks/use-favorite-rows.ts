"use client";

import { useQuery } from "@tanstack/react-query";
import { getFavoriteProducts } from "@/actions/get-data";
import { queryKeys } from "@/lib/query-keys";
import { useHydratedSelector } from "@/hooks/use-hydrated-selector";
import { selectFavorites } from "@/redux/favorites/selectors";
import { toFavoriteRow } from "../model/favorite-status";

/** Знімок рендериться одразу; свіжі ціна й наявність доїжджають і уточнюють рядки. */
export const useFavoriteRows = () => {
  const items = useHydratedSelector(selectFavorites);
  const slugs = items.map((item) => item.productName).sort();
  const { data } = useQuery({
    queryKey: queryKeys.favoriteProducts(slugs),
    queryFn: () => getFavoriteProducts(slugs),
    enabled: slugs.length > 0,
    staleTime: 60_000,
  });

  return items.map((item) => toFavoriteRow(item, data ? data[item.productName] : undefined));
};
