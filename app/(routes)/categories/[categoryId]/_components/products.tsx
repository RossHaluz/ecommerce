'use client'
import React, { FC } from "react";
import ProductItem from "./product-item";
import Pagination from "@/components/pagination";
import { useOrigin } from "@/hooks/use-origin";

interface ProductsProps {
  products: {
    id: string;
    title: string;
    price: string;
    article: string;
    maxPrice: string;
    productOptions: any[];
    images: {
      id: string;
      url: string;
    }[];
  }[];
  page: number;
  totalPages: number;
  categortId: string;
}

const Products: FC<ProductsProps> = ({ products, page, totalPages, categortId }) => {
const baseUrl = useOrigin();

  return (
    <div className="flex flex-col gap-[30px]">
    <ul className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3 lg:gap-[30px]">
      {products?.map((item) => {
        return <ProductItem key={item?.id} item={item} />;
      })}
    </ul>

    <Pagination currentPage={page} totalPages={totalPages} basePath={`${baseUrl}/categories/${categortId}`}/>
    </div>
  );
};

export default Products;
