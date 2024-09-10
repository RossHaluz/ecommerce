import React, { FC } from "react";
import ProductItem from "./product-item";
import Pagination from "@/components/pagination";

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
  pageSize: number;
  totalItem: number;
  totalPages: number;
}

const Products: FC<ProductsProps> = ({ products, page, pageSize, totalItem, totalPages }) => {

  return (
    <div className="flex flex-col gap-[30px]">
    <ul className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3 lg:gap-[30px]">
      {products?.map((item) => {
        return <ProductItem key={item?.id} item={item} />;
      })}
    </ul>
    
    <Pagination currentPage={page} totalPages={totalPages} basePath={'http://localhost:3000/categories/19d55698-7ba2-43ec-b86b-0dd5acbcd34a'}/>
    </div>
  );
};

export default Products;
