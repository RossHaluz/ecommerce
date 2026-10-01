import { isInStock } from "./is-in-stock";
import { productImageUrl } from "./product-image-url";

/** Лише поля товару, які потрібні розмітці. */
export interface ProductJsonLdSource {
  title: string;
  description?: string | null;
  catalog_number?: string | null;
  article?: string | null;
  price: number | string;
  quantity: number;
  images?: { url: string }[];
}

/**
 * schema.org Product для пошуковиків. Ціна в базі зберігається в USD.
 * Коли ціна 0 («договірна»), offers не додаємо: Google відкидає пропозицію з нульовою ціною.
 */
export function buildProductJsonLd(product: ProductJsonLdSource) {
  const price = Number(product.price);
  const images = (product.images ?? [])
    .map((image) => productImageUrl(image.url))
    .filter((url): url is string => url !== null);

  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.title,
    description: product.description || product.title,
    // Магазин продає лише оригінальні деталі Audi (підтверджено власником 2026-10-01).
    brand: { "@type": "Brand", name: "Audi" },
    ...(product.catalog_number && { mpn: product.catalog_number }),
    ...(product.article && { sku: product.article }),
    ...(images.length > 0 && { image: images }),
    ...(price > 0 && {
      offers: {
        "@type": "Offer",
        price,
        priceCurrency: "USD",
        availability: isInStock(product.quantity)
          ? "https://schema.org/InStock"
            : "https://schema.org/BackOrder",
      },
    }),
  };
}
