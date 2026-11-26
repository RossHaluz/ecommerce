import React from "react";
import ProductInfo from "./_components/product-info";
import { getSimilarProducts } from "@/actions/get-data";
import { fetchShopRate } from "@/lib/api/exchange-rate";
import { loadProduct } from "./load-product";
import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { buildAlternates } from "@/lib/seo/alternates";
import { buildBreadcrumbJsonLd } from "@/lib/seo/breadcrumb-json-ld";
import { SITE_URL } from "@/lib/seo/site-url";
import { brandedModelName } from "@/lib/seo/model-brand";
import SimilarProducts from "./_components/similar-products/similar-products";
import { TrailBreadcrumbs } from "@/components/seo/trail-breadcrumbs";
import { Separator } from "@/components/ui/separator";
import { JsonLd } from "@/components/seo/json-ld";
import { buildProductJsonLd } from "@/entities/product/model/product-json-ld";
import { buildProductMeta } from "@/entities/product/model/product-meta";
import { buildProductHeading } from "@/entities/product/model/product-heading";
import { buildProductBreadcrumbs } from "@/entities/product/model/product-breadcrumbs";
import { toProductCard } from "@/entities/product/model/product-card";
import { splitSimilar } from "@/entities/product/model/split-similar";
import type { Product } from "@/lib/types";
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

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const { productId } = params;
  const { product } = await loadProduct(productId, params.locale);

  return {
    alternates: buildAlternates(`/product/${productId}`, params.locale),
    ...buildProductMeta(product),
  };
}

const ProductPage = async ({ params }: ProductPageProps) => {
  const { productId, locale } = params;
  // Без цього getTranslations у дочірніх компонентах читає мову з headers() — сторінка стає динамічною.
  setRequestLocale(locale);
  const [{ product }, similarProducts, t, shopRate] = await Promise.all([
    // Вигаданий товар — справжня 404; стара адреса перейменованого — постійна переадресація.
    loadProduct(productId, locale),
    getSimilarProducts(productId),
    getTranslations("nav"),
    fetchShopRate(),
  ]);

  const heading = buildProductHeading(product);
  const similar = splitSimilar<Product>((similarProducts ?? []).map(toProductCard), Boolean(product.isArchived));
  const trail = buildProductBreadcrumbs({ ...product, title: heading });

  return (
    <div className="container my-6 flex flex-col gap-4">
      <TrailBreadcrumbs trail={trail} homeLabel={t("home")} />
      <JsonLd data={buildProductJsonLd(product, shopRate?.usdToUah ?? null)} />
      <JsonLd
        data={buildBreadcrumbJsonLd(trail, {
          siteUrl: SITE_URL,
          locale,
          homeLabel: t("home"),
          currentPath: `/product/${productId}`,
        })}
      />
      <TrackViewItem
        item={{ id: product.id, title: product.title, price: product.price, categories: product.categories }}
      />
      <Separator />
      <ProductInfo initialData={product} heading={heading} soldAlternatives={similar.inSoldBox} />
      <Separator />
      <SimilarProducts
        similarProducts={similar.below}
        model={product.models?.length === 1 ? brandedModelName(product.models[0].model.name) : undefined}
      />
    </div>
  );
};

export default ProductPage;
