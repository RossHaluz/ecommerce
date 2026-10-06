import React from "react";
import ProductInfo from "./_components/product-info";
import { getSimilarProducts } from "@/actions/get-data";
import { fetchProductDetails } from "@/lib/api";
import { notFoundOn404 } from "@/lib/api/not-found-on-404";
import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { buildAlternates } from "@/lib/seo/alternates";
import SimilarProducts from "./_components/similar-products/similar-products";
import Breadcrumbs from "@/components/breadcrumb";
import { Separator } from "@/components/ui/separator";
import { JsonLd } from "@/components/seo/json-ld";
import { buildProductJsonLd } from "@/entities/product/model/product-json-ld";
import { buildProductMeta } from "@/entities/product/model/product-meta";
import { toProductCard } from "@/entities/product/model/product-card";
import { TrackViewItem } from "./_components/track-view-item";

interface ProductPageProps {
  params: {
    locale: string;
    productId: string;
  };
}

// Порожній список: товари рендеряться при першому запиті й далі віддаються з кешу
// (ціна/наявність оновлюються за revalidate каталогу). Без цього — рендер на кожен
// перехід, і на повільному телефоні товар відкривався ~2 с.
export const generateStaticParams = () => [];

export async function generateMetadata({
  params,
}: ProductPageProps): Promise<Metadata> {
  const { productId } = params;
  const data = await fetchProductDetails(productId).catch(notFoundOn404);

  return {
    alternates: buildAlternates(`/product/${productId}`, params.locale),
    ...(data?.product && buildProductMeta(data.product)),
  };
}

const ProductPage = async ({
  params,
}: ProductPageProps) => {
  const { productId } = params;
  // Без цього getTranslations у дочірніх компонентах читає мову з headers() — сторінка стає динамічною.
  setRequestLocale(params.locale);
  const [data, similarProducts] = await Promise.all([
    // Проданий чи вигаданий товар — справжня 404, а не порожній каркас зі статусом 200.
    fetchProductDetails(productId).catch(notFoundOn404),
    getSimilarProducts(productId),
  ]);

  return (
    <>
      <div className="container my-6 flex flex-col gap-4">
        <Breadcrumbs productName={data?.product?.title} />
        <Separator />
        {data?.product && (
          <>
            <JsonLd data={buildProductJsonLd(data.product)} />
            <TrackViewItem item={{ id: data.product.id, title: data.product.title, price: data.product.price }} />
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
