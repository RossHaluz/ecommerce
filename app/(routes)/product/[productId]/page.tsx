import React, { FC } from "react";
import ProductInfo from "./_components/product-info";
import {
  getProductDetails,
  getSearchProducts,
  getSimilarProducts,
} from "@/actions/get-data";
import type { Metadata } from "next";
import SimilarProducts from "./_components/similar-products/similar-products";

interface ProductPageProps {
  params: {
    productId: string;
  };
}

export async function generateStaticParams() {
  const data = await getSearchProducts({});

  return data?.products?.map((item: { product_name: string }) => ({
    productId: item?.product_name,
  }));
}

export async function generateMetadata({
  params,
}: ProductPageProps): Promise<Metadata> {
  const { productId } = params;
  const data = await getProductDetails(productId);
  const productName = data?.product?.title || "Товар";
  const catalog_number = data?.product?.catalog_number;
  const models = data?.product?.models
    ?.map((item: any) => item?.model?.name)
    .join(", ");

  return {
    title: `Купити ${productName.toLowerCase()} ${catalog_number} на Audi (Ауді) ${models} за вигідною ціною в магазині Audiparts`,
    description: `Купити ${productName} на Audi (Ауді) ${models} в інтернет-магазині. Каталожний номер ${catalog_number} ✓ Більше 4000 оригінальних деталей. ✓ Зачастини на Audi (Ауді) під модель A4, A5, A6, A7, A8, Q5, Q7, Q8. Доставка протягом 2-3 днів по всій Україні.`,
  };
}

const ProductPage: FC<ProductPageProps> = async ({ params }) => {
  const { productId } = params;
  const data = await getProductDetails(productId);
  const similarProducts = await getSimilarProducts(productId);

  return (
    <>
      <div className="container my-6 flex flex-col gap-4">
        {data?.product && <ProductInfo initialData={data?.product} />}
        <SimilarProducts similarProducts={similarProducts} />
      </div>
    </>
  );
};

export default ProductPage;
