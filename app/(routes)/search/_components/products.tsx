import React, { FC } from "react";
import Pagination from "@/components/pagination";
import ProductItem from "../../categories/[categoryId]/_components/product-item";

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
  searchParams: {
    filterIds: string;
    page: string;
  };
}

const Products: FC<ProductsProps> = ({
  products,
  page,
  totalPages,
  searchParams,
}) => {
  return (
    <div className="flex flex-col gap-[30px]">
      <ul className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3 lg:gap-[30px]">
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
