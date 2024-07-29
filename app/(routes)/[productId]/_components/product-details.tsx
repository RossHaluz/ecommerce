"use client";
import React, { FC, useState } from "react";
import ProductNavigation from "./product-navagation";
import ProductDesc from "./product-desc";

interface ProductDetailsProps {
  initialData: {
    description: string;
    id: string;
  };
}

const ProductDetails: FC<ProductDetailsProps> = ({ initialData }) => {
  const [currentNavigation, setCurrentNavigation] = useState("desc");

  const { description } = initialData;

  return (
    <div className="flex flex-col gap-[15px] py-[30px]">
      <ProductNavigation
        currentNavigation={currentNavigation}
        setCurrentNavigation={setCurrentNavigation}
      />

      {currentNavigation === "desc" && (
        <ProductDesc description={description} />
      )}
    </div>
  );
};

export default ProductDetails;
