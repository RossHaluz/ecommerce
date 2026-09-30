"use client";

import { useInfiniteQuery } from "@tanstack/react-query";
import { queryKeys } from "@/lib/query-keys";
import { fetchProductPage, type ProductListSource, type ProductPage } from "../fetch-product-page";

/**
 * Перша сторінка приходить із сервера як initialData — тож товари є в
 * SSR-HTML з першого рендеру (раніше їх клали в Redux у useEffect: порожній
 * HTML для пошуковика, затримка для людей, а на частині сторінок — порожньо).
 */
export const useProductList = (source: ProductListSource, firstPage: ProductPage) =>
  useInfiniteQuery({
    // Стартова сторінка в ключі: ?page=3 не повинен показати закешовану першу.
    queryKey: [...queryKeys.productList(source), firstPage.page],
    queryFn: ({ pageParam }) => fetchProductPage(source, pageParam),
    initialPageParam: firstPage.page,
    initialData: { pages: [firstPage], pageParams: [firstPage.page] },
    getNextPageParam: (last) => (last.page < last.totalPages ? last.page + 1 : undefined),
  });
