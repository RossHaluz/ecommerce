"use client";
import React, { FC, useState } from "react";
import ProductNavigation from "./product-navagation";
import ProductDesc from "./product-desc";
import ProductCharacteristics from "./product-characteristics";
import ProductReview from "./product-reviews";

interface ProductDetailsProps {
  initialData: {
    description: string;
    id: string;
    productCharacteristics: {
      id: string;
      name: string;
      characteristic: {
        name: string;
      };
    }[];
    reviews: {
      id: string;
      userName: string;
      userEmail: string;
      evaluation: number;
      feedback: string;
      photos: {
        id: string;
        url: string;
      }[];
    }[];
  };
}

const ProductDetails: FC<ProductDetailsProps> = ({ initialData }) => {
  const [currentNavigation, setCurrentNavigation] = useState("desc");

  const { description, productCharacteristics, reviews } = initialData;

  return (
    <div className="flex flex-col gap-[15px] py-[30px]">
      <ProductNavigation
        currentNavigation={currentNavigation}
        setCurrentNavigation={setCurrentNavigation}
      />

      {currentNavigation === "desc" && (
        <ProductDesc description={description} />
      )}
      {currentNavigation === "characteristic" && (
        <ProductCharacteristics
          productCharacteristics={productCharacteristics}
        />
      )}
      {currentNavigation === 'review' && <ProductReview reviews={reviews}/>}
    </div>
  );
};

export default ProductDetails;
