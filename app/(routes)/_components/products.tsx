"use client";
import React, { FC } from "react";
import Pagination from "@/components/pagination";
import ProductItem from "../(main)/categories/[categoryId]/_components/product-item";
import { useSelector } from "react-redux";
import { selectCurrentCustomizer } from "@/redux/customizer/selectors";
import { cn } from "@/lib/utils";

interface ProductsProps {
  products: {
    id: string;
    title: string;
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
    filterIds: string;
    page: string;
    modelId: string;
  };
}

const Products: FC<ProductsProps> = ({
  products,
  page,
  totalPages,
  searchParams,
}) => {
  const currentCustomizer = useSelector(selectCurrentCustomizer);

  return (
    <div className="flex flex-col gap-[30px] w-full">
      <ul
        className={cn("grid grid-cols-1 gap-5 lg:gap-[30px]", {
          "grid-cols-1": currentCustomizer === "list",
          "grid-cols-2 lg:grid-cols-3": currentCustomizer === "grid",
        })}
      >
        {products?.map((item) => {
          return <ProductItem key={item?.id} item={item} />;
        })}
      </ul>

      {totalPages > 1 && (
        <Pagination
          currentPage={page}
          totalPages={totalPages}
          searchParams={searchParams}
        />
      )}
    </div>
  );
};

export default Products;
