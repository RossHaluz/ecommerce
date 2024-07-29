import React, { FC } from "react";
import ProductItem from "./product-item";

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
}

const Products: FC<ProductsProps> = ({ products }) => {

  return (
    <ul className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3 lg:gap-[30px]">
      {products?.map((item) => {
        return <ProductItem key={item?.id} item={item} />;
      })}
    </ul>
  );
};

export default Products;
