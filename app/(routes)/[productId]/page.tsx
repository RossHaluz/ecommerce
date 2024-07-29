import axios from "axios";
import React, { FC } from "react";
import ProductInfo from "./_components/product-info";
import Advantages from "./_components/advantages";
import ProductDetails from "./_components/product-details";

interface ProductPageProps {
  params: {
    productId: string;
  };
}

const ProductPage: FC<ProductPageProps> = async ({ params }) => {
  const { productId } = params;

  const { data } = await axios.get(
    `${process.env.BACKEND_URL}/api/${process.env.STORE_ID}/products/${productId}`
  );

  return (
    <div className="container py-[10px] lg:py-[30px]">
      {data && <ProductInfo initialData={data} />}

      <Advantages />
      {data && <ProductDetails initialData={data} />}
    </div>
  );
};

export default ProductPage;
