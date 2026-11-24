import { usdToUah } from "@/lib/format/price";
import { buildProductHeading, type ProductHeadingSource } from "./product-heading";
import { productHref } from "./product-href";
import { productImageUrl } from "./product-image-url";
import { isInStock } from "./is-in-stock";
import { merchantProductType, type CategoryPaths } from "./merchant-product-type";

export interface MerchantFeedSource extends ProductHeadingSource {
  product_name: string;
  article?: string | null;
  description?: string | null;
  price: number | string;
  quantity: number;
  catalog_number?: string | null;
  images?: { url: string }[];
  condition?: "used" | "new";
  categories?: { categoryId: string }[];
}

export interface MerchantFeedItem {
  id: string;
  title: string;
  description: string;
  link: string;
  imageLink: string;
  additionalImageLinks: string[];
  price: string;
  availability: "in_stock";
  condition: "used" | "new";
  brand: "Audi";
  mpn?: string;
  productType?: string;
}

// Google takes at most 10 extra photos per offer.
const MAX_EXTRA_IMAGES = 10;

/**
 * One Google Shopping offer, or null when Google would reject it: no price («договірна»), no photo, out of stock
 * (backorder needs a date we do not have) or an unknown condition (left empty, Google assumes «new»).
 * The id is the article — the same id Google gave the products it found on the site, so the feed replaces them.
 */
export function toMerchantFeedItem(
  product: MerchantFeedSource,
  { siteUrl, usdToUahRate, categoryPaths }: { siteUrl: string; usdToUahRate: number; categoryPaths?: CategoryPaths }
): MerchantFeedItem | null {
  const priceUsd = Number(product.price);
  const images = (product.images ?? []).map((image) => productImageUrl(image.url)).filter((url): url is string => url !== null);
  if (!(priceUsd > 0) || images.length === 0 || !isInStock(product.quantity) || !product.condition) return null;

  const title = buildProductHeading(product);
  const productType =
    categoryPaths && merchantProductType((product.categories ?? []).map((ref) => ref.categoryId), categoryPaths);
  return {
    id: product.article || product.product_name,
    title,
    description: product.description?.trim() || title,
    link: `${siteUrl}${productHref(product.product_name)}`,
    imageLink: images[0],
    additionalImageLinks: images.slice(1, 1 + MAX_EXTRA_IMAGES),
    price: `${usdToUah(priceUsd, usdToUahRate)} UAH`,
    availability: "in_stock",
    condition: product.condition,
    brand: "Audi",
    ...(product.catalog_number && { mpn: product.catalog_number }),
    ...(productType && { productType }),
  };
}
