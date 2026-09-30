import {
  getAllProducts,
  getCategoryByModel,
  getCategoryDetails,
  getProductsByModel,
  getSearchProducts,
} from "@/actions/get-data";
import type { Product } from "@/lib/types";
import type { ProductListIdentity } from "@/lib/query-keys";

export interface ProductPage {
  products: Product[];
  page: number;
  totalPages: number;
}

/** Те, що визначає ендпоінт списку — зрізи каталогу, а не довільні провайдери. */
export type ProductListSource = ProductListIdentity;

const toPage = (data: any, fallbackPage: number): ProductPage => ({
  products: data?.products ?? [],
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
    return toPage(await getCategoryByModel({ ...common, categoryId, modelName: modelId, pageSize: "50" }), page);
  }
  if (categoryId) {
    return toPage(await getCategoryDetails({ ...common, categoryId, pageSize: "50" }), page);
  }
  if (modelId) {
    return toPage(await getProductsByModel({ ...common, modelName: modelId, searchValue, pageSize: 52 }), page);
  }
  if (searchValue) {
    return toPage(await getSearchProducts({ ...common, searchValue }), page);
  }
  return toPage(await getAllProducts({ ...common, pageSize: 52 }), page);
}
