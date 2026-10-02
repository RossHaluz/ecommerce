"use client";
import { FC, useEffect, useRef } from "react";
import { useTranslations } from "next-intl";
import NotFoundItems from "@/components/not-found-items";
import { useListParams, useProductList, type CatalogScope } from "@/features/catalog";
import type { ProductPage } from "@/features/catalog/fetch-product-page";
import type { ListParams } from "@/features/catalog/lib/list-params";
import { ProductListLayout } from "./product-list-layout";

interface LiveProductsProps {
  scope: CatalogScope;
  firstPage: ProductPage;
  renderedFor?: ListParams;
}

/** Список, що слідує за адресою: сторінка, сортування, наявність. */
export const LiveProducts: FC<LiveProductsProps> = ({ scope, firstPage, renderedFor }) => {
  const t = useTranslations("filters");
  const { page: urlPage } = useListParams();
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isPlaceholderData } =
    useProductList(scope, firstPage, renderedFor);
  const previousPage = useRef(urlPage);

  // Лише на зміну сторінки, а не на «Показати ще» і не на перше відкриття.
  useEffect(() => {
    if (previousPage.current === urlPage) return;
    previousPage.current = urlPage;
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [urlPage]);

  const pages = data.pages;
  const lastPage = pages[pages.length - 1];
  const items = pages.flatMap((p) => p.products);

  // Фільтр з адреси (напр. «в наявності») може не дати нічого — раніше це казав сервер.
  if (!isPlaceholderData && items.length === 0) {
    return <NotFoundItems text={t("notFoundInCategory")} />;
  }

  return (
    <ProductListLayout
      items={items}
      page={lastPage.page}
      totalPages={lastPage.totalPages}
      canShowMore={Boolean(hasNextPage)}
      isFetchingMore={isFetchingNextPage}
      isStale={isPlaceholderData}
      onShowMore={() => fetchNextPage()}
    />
  );
};
