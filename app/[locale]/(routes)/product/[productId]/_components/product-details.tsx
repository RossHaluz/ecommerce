"use client";
import { FC } from "react";
import ProductNavigation from "./product-navagation";
import ProductDesc from "./product-desc";

interface ProductDetailsProps {
  initialData: {
    description?: string;
  };
}

const ProductDetails: FC<ProductDetailsProps> = ({ initialData }) => {
  const { description } = initialData;

  if (!description) return null;

  return (
    <div className="flex flex-col gap-[15px]">
      <ProductNavigation />
      <ProductDesc description={description} />
    </div>
  );
};

export default ProductDetails;
