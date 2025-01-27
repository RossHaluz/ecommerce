"use client";
import React, { FC } from "react";
import ProductItem from "./product-item";
import Pagination from "@/components/pagination";
import { useSelector } from "react-redux";
import { selectCurrentCustomizer } from "@/redux/customizer/selectors";
import { cn } from "@/lib/utils";

interface ProductsProps {
  products: {
    product: {
      id: string;
      title: string;
      price: string;
      article: string;
      catalog_number: string;
      maxPrice: string;
      productOptions: any[];
      images: {
        id: string;
        url: string;
      }[];
    };
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
    <div className="flex flex-col gap-[30px]">
      <ul
        className={cn("grid grid-cols-1 gap-5 lg:gap-[30px]", {
          "grid-cols-1": currentCustomizer === "list",
          "grid-cols-2 lg:grid-cols-3": currentCustomizer === "grid",
        })}
      >
        {products?.map((item) => {
          return <ProductItem key={item?.product?.id} item={item?.product} />;
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
