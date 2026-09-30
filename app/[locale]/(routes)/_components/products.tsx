"use client";
import React, { FC, useCallback, useEffect, useRef } from "react";
import ProductItem from "./product-item";
import { useSelector, useDispatch } from "react-redux";
import { selectCurrentCustomizer } from "@/redux/customizer/selectors";
import { cn } from "@/lib/utils";
import { LoaderCircle } from "lucide-react";
import {
  selectIsLoading,
  selectIsLoadMore,
  selectItems,
  selectPage,
  selectSearchParams,
  selectTotalPages,
} from "@/redux/items/selector";
import { setCurrentPage, setInitialItems, setLoadMore } from "@/redux/items/slice";
import {
  getAllProducts,
  getCategoryModelsProducts,
  getCategoryProducts,
  getProductsByModel,
} from "@/redux/items/operetions";
import { useRouter } from "next/navigation";
import { Product } from "@/lib/types";
import { Button } from "@/components/ui/button";
import RefreshIcon from "/public/refresh.svg";
import Pagination from "@/components/pagination";
import { useHydratedSelector } from "@/hooks/use-hydrated-selector";

interface ProductsProps {
  products: Product[];
  page: number;
  totalPages: number;
  searchParams: {
    page: string;
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
  const currentCustomizer = useHydratedSelector(selectCurrentCustomizer);
  const isLoading = useSelector(selectIsLoading);
  const items = useSelector(selectItems);
  const total = useSelector(selectTotalPages);
  const currentPage = useSelector(selectPage);
  const params = useSelector(selectSearchParams);
  const loaderRef = useRef<HTMLDivElement | null>(null);
  const dispatch = useDispatch();
  const router = useRouter();
  const restoringRef = useRef(false);
  const isLoadMore = useSelector(selectIsLoadMore);

  // Ініціалізація початкових товарів
 useEffect(() => {
   if (!isLoadMore) {
     dispatch(setInitialItems({ products, page, totalPages, searchParams }));
   }
 }, [products, page, totalPages, searchParams, dispatch]);

  // useEffect(() => {
  //   const pageFromUrl = Number(searchParams?.page || 1);
  //   console.log("pageFromUrl", pageFromUrl);

  //   if (pageFromUrl > 1) {
  //     restoringRef.current = true;
  //     const loadPages = async () => {
  //       dispatch(
  //         setInitialItems({ products: [], page: 1, totalPages, searchParams })
  //       );
  //       for (let i = 0; i <= pageFromUrl; i++) {
  //         await loadMore(i);
  //       }
  //       restoringRef.current = false;
  //     };
  //     loadPages();
  //   }
  // }, [searchParams?.page]);

  const loadMore = useCallback(
    async () => {

      if (isLoading || currentPage >= total) return;
        const nextPage = +currentPage + 1;
        dispatch(setCurrentPage(nextPage));
        dispatch(setLoadMore(true));
        
      //  if(!restoringRef?.current){
      //    const newUrl = `?${new URLSearchParams({
      //      ...params,
      //      page: String(nextPage),
      //    })}`;
      //    router.replace(newUrl, { scroll: false });
      //  }

      if (categoryId && modelId) {
        dispatch(
          getCategoryModelsProducts({
            categoryId,
            page: String(nextPage),
            modelName: modelId,
            stockStatus: searchParams.stockStatus,
            sortByPrice: searchParams.sortByPrice,
            pageSize: "50",
          }) as any
        );
      } else if (categoryId) {
        dispatch(
          getCategoryProducts({
            page: nextPage,
            searchParams: params,
            categoryId,
          }) as any
        );
      } else if (modelId) {
        dispatch(
          getProductsByModel({
            page: String(nextPage),
            modelName: modelId,
            stockStatus: searchParams.stockStatus,
            sortByPrice: searchParams.sortByPrice,
            pageSize: 52,
            searchValue: searchParams?.searchValue,
          }) as any
        );
      } else {
        dispatch(
          getAllProducts({
            page: nextPage,
            searchParams: params,
          }) as any
        );
      }
    },
    [
      isLoading,
      currentPage,
      total,
      params,
      dispatch,
      categoryId,
      modelId,
      searchParams,
    ]
  );

  // useEffect(() => {
  //   const observer = new IntersectionObserver(
  //     (entries) => {
  //       if (entries[0].isIntersecting) loadMore();
  //     },
  //     { threshold: 0.8 }
  //   );

  //   if (loaderRef.current) observer.observe(loaderRef.current);

  //   return () => {
  //     if (loaderRef.current) observer.unobserve(loaderRef.current);
  //   };
  // }, [loadMore]);

  return (
    <div className="flex flex-col gap-6 w-full">
      <ul
        className={cn("grid grid-cols-1 gap-3", {
          "grid-cols-1": currentCustomizer === "list",
          "grid-cols-2 lg:grid-cols-4": currentCustomizer === "grid",
        })}
      >
        {items?.map((item: Product, index: number) => (
          <ProductItem key={item.id} item={item} index={index} />
        ))}
      </ul>

      <div className="flex flex-col gap-2">
        <Button
          type="button"
          className="flex items-center gap-4 max-w-max border border-solid shadow-md text-[#111111] bg-white hover:text-white mx-auto"
          disabled={isLoading || currentPage >= totalPages}
          onClick={loadMore}
        >
          <RefreshIcon
            className={cn("", {
              "animate-spin transform transition-all duration-300": isLoading,
            })}
          />
          Показати більше
        </Button>

        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          searchParams={searchParams}
        />
      </div>
    </div>
  );
};

export default Products;
