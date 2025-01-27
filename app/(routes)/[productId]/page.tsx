import axios from "axios";
import React, { FC } from "react";
import ProductInfo from "./_components/product-info";
import Advantages from "./_components/advantages";
import ProductDetails from "./_components/product-details";
import { getProductDetails } from "@/actions/get-data";

interface ProductPageProps {
  params: {
    productId: string;
  };
}

const ProductPage: FC<ProductPageProps> = async ({ params }) => {
  const { productId } = params;

  const data = await getProductDetails(productId);

  return (
    <div className="container mt-6 mb-6 lg:mt-12">
      {data?.product && <ProductInfo initialData={data?.product} />}

      <Advantages />
      {data?.product && <ProductDetails initialData={data?.product} />}
    </div>
  );
};

export default ProductPage;
