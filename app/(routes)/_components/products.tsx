"use client";
import React, { FC, memo, useCallback, useEffect, useRef } from "react";
import ProductItem from "../(main)/categories/[categoryId]/_components/product-item";
import { useSelector } from "react-redux";
import { selectCurrentCustomizer } from "@/redux/customizer/selectors";
import { cn } from "@/lib/utils";
import { LoaderCircle } from "lucide-react";
import {
  selectIsLoading,
  selectItems,
  selectPage,
  selectSearchParams,
  selectTotalPages,
} from "@/redux/items/selector";
import { useDispatch } from "react-redux";
import { setInitialItems } from "@/redux/items/slice";
import { getAllProducts, getCategoryProducts } from "@/redux/items/operetions";
import { Product } from "@/actions/get-data";

interface ProductsProps {
  products: {
    id: string;
    title: string;
    product_name: string;
    price: string;
    article: string;
    maxPrice: string;
    catalog_number: string;
    productOptions: any[];
    images: {
      id: string;
      url: string;
    }[];
  }[];
  page: number;
  totalPages: number;
  searchParams: {
    page: string;
    stockStatus?: string;
    sortByPrice?: string;
    searchValue?: string;
    modelId?: string;
  };
  categoryId?: string;
}

const MemoizedProductItem = memo(ProductItem);

const Products: FC<ProductsProps> = ({
  products,
  page,
  totalPages,
  searchParams,
  categoryId,
}) => {
  const currentCustomizer = useSelector(selectCurrentCustomizer);
  const isLoading = useSelector(selectIsLoading);
  const items = useSelector(selectItems);
  const total = useSelector(selectTotalPages);
  const currentPage = useSelector(selectPage);
  const params = useSelector(selectSearchParams);
  const loaderRef = useRef<HTMLDivElement | null>(null);
  const dispatch = useDispatch();

  

useEffect(() => {
  if (!items || items.length === 0) {
    dispatch(setInitialItems({ products, page, totalPages, searchParams }));
  }
}, [products, page, totalPages, searchParams, dispatch]); 

  const loadMore = useCallback(async () => {
    if (!isLoading && currentPage < total) {
      if (categoryId) {
        dispatch(
          getCategoryProducts({
            page: +currentPage + 1,
            searchParams: params,
            categoryId,
          }) as any
        );
      } else {
        dispatch(
          getAllProducts({
            page: +currentPage + 1,
            searchParams: params,
          }) as any
        );
      }
    }
  }, [isLoading, currentPage, total, params, dispatch]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          loadMore();
        }
      },
      { threshold: 1.0 }
    );

    if (loaderRef.current) {
      observer.observe(loaderRef.current);
    }

    return () => {
      if (loaderRef.current) {
        observer.unobserve(loaderRef.current);
      }
    };
  }, [loadMore]);

  return (
    <div className="flex flex-col gap-4 w-full">
      <ul
        className={cn("grid grid-cols-1 gap-3", {
          "grid-cols-1": currentCustomizer === "list",
          "grid-cols-2 lg:grid-cols-4": currentCustomizer === "grid",
        })}
      >
        {items?.map((item: Product, index: number) => {
          return (
            <MemoizedProductItem key={item?.id} item={item} index={index} />
          );
        })}
      </ul>

      {currentPage < totalPages && (
        <div ref={loaderRef} className="flex justify-center p-4">
          {isLoading && (
            <LoaderCircle className="animate-spin h-6 w-6 text-gray-500" />
          )}
        </div>
      )}

      {/* {totalPages > 1 && (
        <Pagination
          currentPage={page}
          totalPages={totalPages}
          searchParams={searchParams}
        />
      )} */}
    </div>
  );
};

export default Products;
