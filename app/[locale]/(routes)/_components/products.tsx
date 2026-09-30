"use client";
import { FC } from "react";
import { useTranslations } from "next-intl";
import ProductItem from "./product-item";
import { selectCurrentCustomizer } from "@/redux/customizer/selectors";
import { useHydratedSelector } from "@/hooks/use-hydrated-selector";
import { useProductList, useWarmProductRoute } from "@/features/catalog";
import { cn } from "@/lib/utils";
import { Product } from "@/lib/types";
import { Button } from "@/components/ui/button";
import RefreshIcon from "/public/refresh.svg";
import Pagination from "@/components/pagination";

interface ProductsProps {
  products: Product[];
  page: number;
  totalPages: number;
  searchParams: {
    page?: string;
    stockStatus?: string;
    sortByPrice?: string;
    searchValue?: string;
  };
  categoryId?: string;
  modelId?: string;
}

const Products: FC<ProductsProps> = ({
  products,
  page,
  totalPages,
  searchParams,
  categoryId,
  modelId,
}) => {
  const t = useTranslations("common");
  const currentCustomizer = useHydratedSelector(selectCurrentCustomizer);
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } = useProductList(
    { categoryId, modelId, searchParams },
    { products, page: Number(page), totalPages: Number(totalPages) }
  );

  const pages = data.pages;
  const items = pages.flatMap((p) => p.products);
  const lastPage = pages[pages.length - 1];
  useWarmProductRoute(items[0]?.product_name);

  return (
    <div className="flex flex-col gap-6 w-full">
      <ul
        className={cn("grid grid-cols-1 gap-3", {
          "grid-cols-1": currentCustomizer === "list",
          "grid-cols-2 lg:grid-cols-4": currentCustomizer === "grid",
        })}
      >
        {items.map((item, index) => (
          <ProductItem key={item.id} item={item} index={index} />
        ))}
      </ul>

      <div className="flex flex-col gap-2">
        <Button
          type="button"
          className="flex items-center gap-4 max-w-max border border-solid shadow-md text-[#111111] bg-white hover:text-white mx-auto"
          disabled={!hasNextPage || isFetchingNextPage}
          onClick={() => fetchNextPage()}
        >
          <RefreshIcon
            className={cn({
              "animate-spin transform transition-all duration-300": isFetchingNextPage,
            })}
          />
          {t("showMore")}
        </Button>

        <Pagination
          currentPage={lastPage.page}
          totalPages={lastPage.totalPages}
          searchParams={{ ...searchParams, page: searchParams.page ?? "1" }}
        />
      </div>
    </div>
  );
};

export default Products;
