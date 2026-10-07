"use client";

import { useQuery } from "@tanstack/react-query";
import { getProductsByModel } from "@/actions/get-data";
import { queryKeys } from "@/lib/query-keys";
import type { OrderItem } from "@/redux/order/slice";
import { pickSuggestions, suggestionModel } from "../model/suggestions";

// Запас на «Показати ще» й на те, що частина вже в кошику.
const FETCH = 12;

/** Схожі для кошика: товари в наявності для тієї самої машини, без уже покладених. */
export const useCartSuggestions = (items: OrderItem[] | undefined) => {
  const modelName = suggestionModel(items);
  const { data } = useQuery({
    queryKey: queryKeys.cartSuggestions(modelName ?? ""),
    queryFn: () => getProductsByModel({ modelName: modelName ?? "", stockStatus: "in_stock", pageSize: FETCH }),
    enabled: Boolean(modelName),
    staleTime: 5 * 60_000,
  });
  return pickSuggestions(data?.products, items);
};
