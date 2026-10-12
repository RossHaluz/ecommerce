import type { Product } from "@/lib/types";

/** Знімок товару на момент ♡: з ним список рендериться миттєво, а ціна «тоді» дає «ціна знизилась». */
export interface FavoriteItem {
  id: string;
  productName: string;
  title: string;
  image?: string;
  catalogNumber: string;
  savedPrice: number;
}

export const toFavoriteItem = (product: Product): FavoriteItem => ({
  id: product.id,
  productName: product.product_name,
  title: product.title,
  image: product.images?.[0]?.url,
  catalogNumber: product.catalog_number,
  savedPrice: Number(product.price) || 0,
});
