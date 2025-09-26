import React, { FC } from "react";
import SimilarProductsSlider from "./similar-products-slider";

interface SimilarProductsProps {
  similarProducts: {
    id: string;
    title: string;
    price: string;
    quantity: number;
    product_name: string;
    catalog_number: string;
    article: string;
    images: {
      id: string;
      url: string;
    }[];
  }[];
}

const SimilarProducts: FC<SimilarProductsProps> = ({ similarProducts }) => {
  return (
    <div className="flex flex-col gap-4 py-6">
      {similarProducts?.length > 0 && (
        <h2 className="text-xl font-bold">Також вас можуть зацікавити:</h2>
      )}
      <SimilarProductsSlider similarProducts={similarProducts} />
    </div>
  );
};

export default SimilarProducts;
