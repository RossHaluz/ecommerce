import {
  getAllProducts,
  getCategoryByModel,
  getCategoryDetails,
  getProductsByModel,
  getSearchProducts,
} from "@/actions/get-data";
import type { Product } from "@/lib/types";
import { toProductCard } from "@/entities/product/model/product-card";
import type { ProductListIdentity } from "@/lib/query-keys";

export interface ProductPage {
  products: Product[];
  page: number;
  totalPages: number;
}

/** Те, що визначає ендпоінт списку — зрізи каталогу, а не довільні провайдери. */
export type ProductListSource = ProductListIdentity;

/** Відповідь API списку → сторінка з легкими картками (і для SSR, і для «Показати ще»). */
export const toProductPage = (data: any, fallbackPage = 1): ProductPage => ({
  products: (data?.products ?? []).map(toProductCard),
  page: Number(data?.meta?.page ?? fallbackPage),
  totalPages: Number(data?.meta?.totalPages ?? fallbackPage),
});

/** Одна сторінка списку для будь-якого зрізу каталогу. */
export async function fetchProductPage(
  { categoryId, modelId, searchParams }: ProductListSource,
  page: number
): Promise<ProductPage> {
  const { sortByPrice, stockStatus, searchValue } = searchParams;
  const common = { page: String(page), sortByPrice, stockStatus };

  if (categoryId && modelId) {
    return toProductPage(await getCategoryByModel({ ...common, categoryId, modelName: modelId, pageSize: "50" }), page);
  }
  if (categoryId) {
    return toProductPage(await getCategoryDetails({ ...common, categoryId, pageSize: "50" }), page);
  }
  if (modelId) {
    return toProductPage(await getProductsByModel({ ...common, modelName: modelId, searchValue, pageSize: 52 }), page);
  }
  if (searchValue) {
    return toProductPage(await getSearchProducts({ ...common, searchValue }), page);
  }
  return toProductPage(await getAllProducts({ ...common, pageSize: 52 }), page);
}
