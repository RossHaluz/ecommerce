import { CACHE_TAGS, ENDPOINTS } from "./endpoints";
import { request, orNull, STORE_ID } from "./http";
import type { Meta, Product } from "@/lib/types";
import type { RelatedCategory } from "@/components/seo/related-category-links";

export interface ProductsResponse {
  products: Product[];
  meta: Meta;
  /** Лише у відповіді по моделі: категорії з її товарами. */
  related?: { categories: RelatedCategory[] };
}

export interface ProductListParams {
  page?: string | number;
  sortByPrice?: string;
  stockStatus?: string;
  pageSize?: string | number;
  searchValue?: string;
  modelId?: string;
}

const CATALOG_TTL = 300;
const DEFAULT_PAGE_SIZE = 52;

export function fetchProducts(params: ProductListParams = {}) {
  return request<ProductsResponse>(ENDPOINTS.products(STORE_ID), {
    params: { ...params, pageSize: params.pageSize ?? DEFAULT_PAGE_SIZE },
    revalidate: CATALOG_TTL,
    tags: [CACHE_TAGS.catalog],
  });
}

export const getProducts = (params: ProductListParams = {}) =>
  orNull("products", fetchProducts(params));

/**
 * Товари, сумісні з конкретною моделлю Audi.
 *
 * `pageSize` тут тепер справді враховується. Раніше функція приймала параметр
 * і молча хардкодила 52 — виклик з іншим значенням тихо не працював.
 */
export function fetchProductsByModel(
  modelSlug: string,
  params: ProductListParams = {}
) {
  return request<ProductsResponse>(
    ENDPOINTS.productsByModel(STORE_ID, modelSlug),
    {
      params: { ...params, pageSize: params.pageSize ?? DEFAULT_PAGE_SIZE },
      revalidate: CATALOG_TTL,
      tags: [CACHE_TAGS.catalog, CACHE_TAGS.models],
    }
  );
}

export const getProductsByModel = (
  modelSlug: string,
  params: ProductListParams = {}
) => orNull("productsByModel", fetchProductsByModel(modelSlug, params));

/** Кидає `ApiError`: сторінка товару відрізняє «немає» (404) від «бекенд лежить» (помилка). */
export function fetchProductDetails(productSlug: string) {
  return request<any>(ENDPOINTS.productDetails(STORE_ID, productSlug), {
    revalidate: CATALOG_TTL,
    tags: [CACHE_TAGS.product(productSlug)],
  });
}

/** Допоміжний блок: порожній список кращий за зламану сторінку товару. */
export const getSimilarProducts = (productSlug: string) =>
  orNull(
    "similarProducts",
    request<any>(ENDPOINTS.similarProducts(STORE_ID, productSlug), {
      revalidate: CATALOG_TTL,
      tags: [CACHE_TAGS.product(productSlug)],
    })
  );
