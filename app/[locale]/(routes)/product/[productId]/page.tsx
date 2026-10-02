import React from "react";
import ProductInfo from "./_components/product-info";
import {
  getProductDetails,
  getSimilarProducts,
} from "@/actions/get-data";
import type { Metadata } from "next";
import { buildAlternates } from "@/lib/seo/alternates";
import SimilarProducts from "./_components/similar-products/similar-products";
import Breadcrumbs from "@/components/breadcrumb";
import { Separator } from "@/components/ui/separator";
import { JsonLd } from "@/components/seo/json-ld";
import { buildProductJsonLd } from "@/entities/product/model/product-json-ld";
import { buildProductMeta } from "@/entities/product/model/product-meta";
import { toProductCard } from "@/entities/product/model/product-card";

interface ProductPageProps {
  params: {
    locale: string;
    productId: string;
  };
}

export async function generateMetadata({
  params,
}: ProductPageProps): Promise<Metadata> {
  const { productId } = params;
  const data = await getProductDetails(productId);

  return {
    alternates: buildAlternates(`/product/${productId}`, params.locale),
    ...(data?.product && buildProductMeta(data.product)),
  };
}

const ProductPage = async ({
  params,
}: ProductPageProps) => {
  const { productId } = params;
  const data = await getProductDetails(productId);
  const similarProducts = await getSimilarProducts(productId);

  return (
    <>
      <div className="container my-6 flex flex-col gap-4">
        <Breadcrumbs productName={data?.product?.title} />
        <Separator />
        {data?.product && (
          <>
            <JsonLd data={buildProductJsonLd(data.product)} />
            <ProductInfo initialData={data.product} />
          </>
        )}
        <Separator />
        <SimilarProducts similarProducts={(similarProducts ?? []).map(toProductCard)} />
      </div>
    </>
  );
};

export default ProductPage;
