"use client";

import { useInfiniteQuery } from "@tanstack/react-query";
import { queryKeys } from "@/lib/query-keys";
import { fetchProductPage, type ProductPage } from "../fetch-product-page";
import { DEFAULT_LIST_PARAMS, sameListParams, type ListParams } from "../lib/list-params";
import { useListParams } from "./use-list-params";

export interface CatalogScope {
  categoryId?: string;
  modelId?: string;
}

/**
 * Сервер рендерить одну сторінку (`renderedFor`) і може її кешувати. Якщо адреса
 * просить ту саму — це готові дані; інакше вони лише тримають місце, поки
 * вантажиться потрібна сторінка, щоб список не блимав порожнечею.
 */
export const useProductList = (
  scope: CatalogScope,
  firstPage: ProductPage,
  renderedFor: ListParams = DEFAULT_LIST_PARAMS
) => {
  const params = useListParams();
  const source = { ...scope, searchParams: params };
  const serverPage = { pages: [firstPage], pageParams: [firstPage.page] };
  const isServerPage = sameListParams(params, renderedFor);

  return useInfiniteQuery({
    // Стартова сторінка в ключі: ?page=3 не повинен показати закешовану першу.
    queryKey: [...queryKeys.productList(source), params.page],
    queryFn: ({ pageParam }) => fetchProductPage(source, pageParam),
    initialPageParam: params.page,
    initialData: isServerPage ? serverPage : undefined,
    placeholderData: isServerPage ? undefined : serverPage,
    getNextPageParam: (last) => (last.page < last.totalPages ? last.page + 1 : undefined),
  });
};
